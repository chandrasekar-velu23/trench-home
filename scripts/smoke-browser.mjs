// Headless-browser smoke test of the production build. Run before every push:
//
//   npm run build && npm run verify && npm run smoke
//
// Serves dist/ the way Vercel will (clean URLs, vercel.json redirects, no
// trailing slash, 404.html with a 404 status) and drives headless Chrome
// against it. Every request to another origin is aborted, so no real
// analytics, pixels or form backends are touched. Set CHROME_PATH to use a
// specific browser binary.
import http from 'node:http'
import { readFileSync, existsSync, statSync, rmSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import puppeteer from 'puppeteer-core'

const PROJECT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(PROJECT, 'dist')
const PORT = Number(process.env.SMOKE_PORT || 4610)
const BASE = `http://localhost:${PORT}`

// Edge is last: on Windows a headless Edge hands off to a running Edge and exits.
const BROWSER = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((p) => p && existsSync(p))

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/ not found — run "npm run build" first.')
  process.exit(1)
}
if (!BROWSER) {
  console.error('No Chrome or Chromium found. Install Chrome or set CHROME_PATH.')
  process.exit(1)
}

const vercel = JSON.parse(readFileSync(join(PROJECT, 'vercel.json'), 'utf8'))
const REDIRECTS = new Map(vercel.redirects.map((r) => [r.source, r.destination]))
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json',
  '.pdf': 'application/pdf', '.ico': 'image/x-icon',
}

// Simulated backend failure (Apps Script unreachable). The forms must show an
// error, never a thank-you screen.
const API_FAILURE = { status: 'error', message: 'We could not record your request. Please email ask@trenchsecurity.ai.' }

const server = http.createServer((req, res) => {
  const url = new URL(req.url, BASE)
  const p = decodeURIComponent(url.pathname)
  if (p.startsWith('/api/')) {
    res.writeHead(req.method === 'POST' ? 502 : 405, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(req.method === 'POST' ? API_FAILURE : { status: 'error', message: 'Method not allowed' }))
  }
  if (REDIRECTS.has(p)) {
    res.writeHead(308, { Location: REDIRECTS.get(p) })
    return res.end()
  }
  if (p.length > 1 && p.endsWith('/')) {
    res.writeHead(308, { Location: p.slice(0, -1) })
    return res.end()
  }
  const candidates = p === '/' ? ['/index.html'] : [p, `${p}/index.html`, `${p}.html`]
  for (const c of candidates) {
    const f = join(DIST, c)
    if (existsSync(f) && statSync(f).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[extname(f)] ?? 'application/octet-stream' })
      return res.end(readFileSync(f))
    }
  }
  res.writeHead(404, { 'Content-Type': MIME['.html'] })
  res.end(readFileSync(join(DIST, '404.html')))
})

// Aborted third-party requests surface as these; they are expected here.
const IGNORED_CONSOLE = /net::ERR_FAILED|net::ERR_BLOCKED|Failed to load resource/i

async function openPage(browser, path) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 900 })
  const errors = []
  const blocked = new Set()
  await page.setRequestInterception(true)
  page.on('request', (r) => {
    const u = r.url()
    if (u.startsWith(BASE) || u.startsWith('data:') || u.startsWith('blob:')) return r.continue()
    blocked.add(new URL(u).host)
    r.abort()
  })
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error' && !IGNORED_CONSOLE.test(m.text())) errors.push(`console: ${m.text().slice(0, 200)}`)
  })
  const response = await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 45000 })
  // createRoot marks its container; wait for the live tree to replace the static markup.
  await page
    .waitForFunction(
      () => Object.keys(document.getElementById('root') ?? {}).some((k) => k.startsWith('__reactContainer')),
      { timeout: 15000 },
    )
    .catch(() => {})
  await new Promise((r) => setTimeout(r, 400))
  return { page, response, errors, blocked }
}

function inspect(page) {
  return page.evaluate(() => {
    const root = document.getElementById('root')
    const body = document.body.innerText
    return {
      mounted: Object.keys(root ?? {}).some((k) => k.startsWith('__reactContainer')),
      h1: document.querySelector('#root h1')?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 50) ?? '',
      chars: root?.innerText.length ?? 0,
      crashed: !!document.querySelector('[role="alert"]') && /failed to load/i.test(body),
      notFound: /404 Page Not Found|Article Not Found|Announcement Not Found/.test(body),
    }
  })
}

let failures = 0
const fail = (msg) => {
  failures++
  console.log(`  ❌ ${msg}`)
}
const pass = (msg) => console.log(`  ✅ ${msg}`)

const profile = join(tmpdir(), `trench-smoke-${Date.now()}`)

server.listen(PORT, async () => {
  const browser = await puppeteer.launch({
    executablePath: BROWSER,
    headless: true,
    userDataDir: profile,
    args: ['--no-first-run', '--no-default-browser-check', '--mute-audio', ...(process.env.CI ? ['--no-sandbox'] : [])],
  })
  try {
    // ── 1. every page loads, mounts and renders real content ──
    const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
    const paths = [...sitemap.matchAll(/<loc>https:\/\/www\.trenchsecurity\.ai([^<]*)<\/loc>/g)].map((m) => m[1] || '/')
    paths.push('/pricing')
    console.log(`── ${paths.length} routes: status, mount, content, console errors ──`)
    const blockedHosts = new Set()
    for (const path of paths) {
      const { page, response, errors, blocked } = await openPage(browser, path)
      blocked.forEach((h) => blockedHosts.add(h))
      const info = await inspect(page)
      const problems = []
      if (response.status() !== 200) problems.push(`HTTP ${response.status()}`)
      if (!info.mounted) problems.push('React did not mount')
      if (info.notFound) problems.push('rendered not-found view')
      if (info.crashed) problems.push('error boundary shown')
      if (info.chars < 200) problems.push(`only ${info.chars} chars of text`)
      if (!info.h1) problems.push('no <h1>')
      problems.push(...errors)
      if (problems.length) fail(`${path} — ${problems.join('; ')}`)
      else pass(`${path.padEnd(58)} ${String(info.chars).padStart(6)} chars  h1: ${info.h1}`)
      await page.close()
    }
    console.log(`   (third-party hosts blocked: ${[...blockedHosts].sort().join(', ') || 'none'})`)

    // ── 2. unknown URL: real 404 status, not-found view, noindex ──
    console.log('── 404 handling ──')
    {
      const { page, response } = await openPage(browser, '/this-page-does-not-exist')
      const info = await inspect(page)
      const robots = await page.$eval('meta[name="robots"]', (m) => m.content).catch(() => '')
      if (response.status() === 404) pass('unknown URL returns HTTP 404')
      else fail(`unknown URL returned HTTP ${response.status()}`)
      if (info.notFound) pass('unknown URL shows the not-found view')
      else fail('unknown URL did not show the not-found view')
      if (robots.includes('noindex')) pass('404 page is noindex')
      else fail(`404 robots meta is "${robots}"`)
      await page.close()
    }

    // ── 3. redirects from vercel.json ──
    console.log('── redirects ──')
    for (const [from, to] of REDIRECTS) {
      const { page, response } = await openPage(browser, from)
      const landed = new URL(page.url()).pathname
      if (landed === to && response.status() === 200) pass(`${from} -> ${to}`)
      else fail(`${from} landed on ${landed} (${response.status()})`)
      await page.close()
    }

    // ── 4. in-app navigation: no reload, head updated, pageview fired ──
    console.log('── in-app navigation + analytics ──')
    {
      const { page, errors } = await openPage(browser, '/')
      await page.evaluate(() => {
        window.__noReload = true
      })
      if (await page.evaluate(() => document.documentElement.hasAttribute('data-landing'))) {
        pass('landing page renders without the entrance animation')
      } else fail('data-landing missing on the landing page')
      for (const [href, title] of [
        ['/why-trench', 'Why Trench | Trench Security'],
        ['/blog', 'Blog | Trench Security'],
      ]) {
        await page.evaluate((h) => document.querySelector(`a[href="${h}"]`)?.click(), href)
        await page.waitForFunction((h) => location.pathname === h, { timeout: 10000 }, href).catch(() => {})
        await new Promise((r) => setTimeout(r, 1200))
        const state = await page.evaluate(() => ({
          path: location.pathname,
          title: document.title,
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          sameDocument: window.__noReload === true,
          pageviews: (window.dataLayer || []).filter((e) => e && e[0] === 'event' && e[1] === 'page_view').map((e) => e[2]?.page_path),
          spa: (window.dataLayer || []).filter((e) => e && e.event === 'spa_pageview').map((e) => e.page_path),
        }))
        if (state.path === href && state.sameDocument) pass(`click to ${href} navigates without a reload`)
        else fail(`click to ${href}: path ${state.path}, reloaded ${!state.sameDocument}`)
        if (state.title === title) pass(`title updated: "${state.title}"`)
        else fail(`title after ${href} is "${state.title}"`)
        if (state.canonical === `https://www.trenchsecurity.ai${href}`) pass(`canonical updated: ${state.canonical}`)
        else fail(`canonical after ${href} is ${state.canonical}`)
        if (state.pageviews.includes(href) && state.spa.includes(href)) pass(`GA4 page_view + GTM spa_pageview fired for ${href}`)
        else fail(`no pageview for ${href} (gtag: ${state.pageviews}, gtm: ${state.spa})`)
      }
      if (!(await page.evaluate(() => document.documentElement.hasAttribute('data-landing')))) {
        pass('pages reached by navigation get the entrance animation')
      } else fail('data-landing still set after navigating')
      if (errors.length) fail(`console errors during navigation: ${errors.join(' | ')}`)
      else pass('no console errors during navigation')
      await page.close()
    }

    // ── 5. forms: a backend failure must show an error, not a thank-you ──
    console.log('── forms (backend forced to fail) ──')
    {
      const { page } = await openPage(browser, '/connect')
      await page.type('input[name="fullName"]', 'Smoke Test')
      await page.type('input[name="email"]', 'smoke.test@acme-example.com')
      await page.type('input[type="tel"]', '+14155552671')
      for (const name of ['teamSize', 'intent']) {
        await page.evaluate((n) => {
          const select = document.querySelector(`select[name="${n}"]`)
          select.value = [...select.options].find((o) => o.value).value
          select.dispatchEvent(new Event('change', { bubbles: true }))
        }, name)
      }
      await page.click('button[type="submit"]')
      await page.waitForSelector('[role="alert"]', { timeout: 10000 }).catch(() => {})
      const alert = await page.$eval('[role="alert"]', (el) => el.textContent.trim()).catch(() => '')
      const thanked = await page.evaluate(() => /thank you|we.ll be in touch|received/i.test(document.body.innerText))
      if (alert && !thanked) pass(`/connect shows the error: "${alert.slice(0, 70)}…"`)
      else fail(`/connect on backend failure — alert "${alert}", thank-you shown: ${thanked}`)
      await page.close()
    }
    // ── 6. floating newsletter button ──
    console.log('── floating newsletter button ──')
    {
      const { page } = await openPage(browser, '/')
      if (await page.$('a.floating-newsletter-btn')) pass('shown on /')
      else fail('floating newsletter button missing on /')
      await page.evaluate(() => document.querySelector('a.floating-newsletter-btn')?.click())
      await page.waitForFunction(() => location.pathname === '/newsletter-signup', { timeout: 10000 }).catch(() => {})
      await new Promise((r) => setTimeout(r, 800))
      const state = await page.evaluate(() => ({ path: location.pathname, btn: !!document.querySelector('a.floating-newsletter-btn') }))
      if (state.path === '/newsletter-signup' && !state.btn) pass('opens /newsletter-signup (the Brevo form) and hides itself there')
      else fail(`after click: path ${state.path}, button still shown ${state.btn}`)
      await page.close()
    }

    // ── 7. BPL announcement on the homepage ──
    console.log('── BPL announcement ──')
    {
      const { page } = await openPage(browser, '/')
      const cards = await page.$$eval('.home-bpl-card h3', (hs) => hs.map((h) => h.textContent.trim()))
      if (cards.length === 3) pass(`3 cards: ${cards.join(' · ')}`)
      else fail(`expected 3 BPL cards, found ${cards.length}`)
      await page.evaluate(() => document.querySelector('a.home-bpl-cta')?.click())
      await page.waitForFunction(() => location.pathname === '/resources/community', { timeout: 10000 }).catch(() => {})
      const path = await page.evaluate(() => location.pathname)
      if (path === '/resources/community') pass('"Read more" opens /resources/community')
      else fail(`"Read more" landed on ${path}`)
      await page.close()
    }

    // ── 8. case studies listing keeps the existing URLs ──
    console.log('── case studies ──')
    {
      const { page } = await openPage(browser, '/case-studies')
      const links = await page.$$eval('main a[href^="/case-studies/"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))].sort())
      const expected = ['/case-studies/ocrolus', '/case-studies/sbfe', '/case-studies/whatfix']
      if (JSON.stringify(links) === JSON.stringify(expected)) pass(`lists exactly the existing URLs: ${links.join(', ')}`)
      else fail(`case study links: ${links.join(', ')}`)
      await page.evaluate(() => document.querySelector('main a[href="/case-studies/sbfe"]')?.click())
      await page.waitForFunction(() => location.pathname === '/case-studies/sbfe', { timeout: 10000 }).catch(() => {})
      await new Promise((r) => setTimeout(r, 800))
      const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent ?? '')
      if (h1.includes('SBFE')) pass('card opens the existing SBFE page')
      else fail(`card navigation landed on h1 "${h1}"`)
      await page.close()
    }

    // ── 9. YouTube facade: no player until the visitor asks for it ──
    console.log('── video facade ──')
    {
      const { page } = await openPage(browser, '/resources/webinars')
      const before = await page.$$eval('iframe', (f) => f.length)
      await page.click('.lite-youtube-btn')
      await new Promise((r) => setTimeout(r, 500))
      const src = await page.$eval('.lite-youtube iframe', (f) => f.getAttribute('src')).catch(() => '')
      if (before === 0) pass('no YouTube player loaded with the page')
      else fail(`${before} iframe(s) loaded before any click`)
      if (src.includes('youtube-nocookie.com/embed/qS4_wimD8Eo')) pass('click loads the privacy-enhanced player')
      else fail(`after click iframe src is "${src}"`)
      await page.close()
    }
    // ── 10. readable with JavaScript disabled (crawlers, and first paint) ──
    console.log('── with JavaScript disabled ──')
    for (const path of ['/', '/why-trench', '/blog/modernizing-soc-using-agentic-ai', '/case-studies', '/resources/webinars']) {
      const page = await browser.newPage()
      await page.setJavaScriptEnabled(false)
      await page.setRequestInterception(true)
      page.on('request', (r) => (r.url().startsWith(BASE) ? r.continue() : r.abort()))
      await page.goto(BASE + path, { waitUntil: 'load' })
      const info = await page.evaluate(() => {
        const h1 = document.querySelector('h1')
        return {
          h1: !!h1 && h1.getBoundingClientRect().height > 0,
          // innerText skips hidden elements, so this is text a visitor can see
          chars: document.querySelector('main')?.innerText.trim().length ?? 0,
        }
      })
      if (info.h1 && info.chars > 200) pass(`${path}: headline + ${info.chars} chars visible`)
      else fail(`${path} without JS: headline visible ${info.h1}, ${info.chars} visible chars`)
      await page.close()
    }

    // ── 11. build-time <head> style copies are gone once the app starts ──
    {
      const page = await browser.newPage()
      await page.setRequestInterception(true)
      page.on('request', (r) => (r.url().startsWith(BASE) ? r.continue() : r.abort()))
      await page.goto(BASE + '/case-studies/ocrolus', { waitUntil: 'networkidle0' })
      const left = await page.evaluate(() => document.querySelectorAll('style[data-ssr-style]').length)
      if (left === 0) pass('head style copies removed at start-up')
      else fail(`${left} head style copies left after start-up — page CSS would leak into other pages`)
      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
    try {
      rmSync(profile, { recursive: true, force: true })
    } catch {
      // Chrome can hold the profile briefly after exit; the OS temp dir cleans it up.
    }
    console.log(failures ? `\nSMOKE TEST FAILED (${failures})` : '\nSMOKE TEST PASSED')
    process.exitCode = failures ? 1 : 0
  }
})
