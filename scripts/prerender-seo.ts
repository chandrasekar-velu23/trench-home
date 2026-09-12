/**
 * Post-build prerender. Runs after the client build (dist/) and the SSR build
 * (dist-server/). For every route it:
 *
 * 1. Server-renders the page and writes the markup into #root, so each URL's
 *    HTML response carries the full page content. Search engines read it
 *    without rendering JavaScript, and so do AI crawlers (GPTBot, ClaudeBot,
 *    PerplexityBot, ...) that never execute it — the basis for being cited in
 *    AI answers.
 * 2. Rewrites <head>: title, description, canonical, Open Graph and Twitter.
 * 3. Emits JSON-LD: Organization, WebSite and FAQPage on the homepage;
 *    BlogPosting, NewsArticle and JobPosting on detail pages; BreadcrumbList on
 *    every inner page.
 *
 * It then writes sitemap.xml, robots.txt, llms.txt, llms-full.txt and 404.html
 * from the same route table, and fails the build if the app router and the SEO
 * table disagree, so a page cannot ship without metadata or vice versa.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { postsData } from '../src/blog/postsData'
import { announcementsData } from '../src/announcements/announcementsData'
import { faqItems } from '../src/home/faqData'
import { caseStudies } from '../src/case-studies/caseStudiesData'
import { PAGE_VIDEOS, isoDuration, type VideoMeta } from '../seo/videos'
import {
  STATIC_ROUTES,
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  TITLE_TEMPLATE,
  type RouteMeta,
} from '../seo/routes'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SERVER_ENTRY = join(ROOT, 'dist-server', 'entry-server.js')
const LOGO = '/logo/trench-logo.png'
const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const CONTACT_EMAIL = 'ask@trenchsecurity.ai'

type ServerEntry = {
  render: (path: string) => Promise<string>
  STATIC_PATHS: Record<string, string>
  ALIAS_PATHS: string[]
  resolveRoute: (path: string) => { key: string } | null
}

type Route = RouteMeta & { jsonLd?: object[]; lastmod?: string }

// ── string helpers ───────────────────────────────────────────────────────────
// Every replace() that inserts page content uses a function replacer: copy and
// JSON can contain "$&" or "$1", which a replacement string would expand.

const abs = (p: string) =>
  p.startsWith('http') ? p : `${SITE_URL}${p.startsWith('/') ? '' : '/'}${encodeURI(p)}`

const urlFor = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`)

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const stripTags = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

/** JSON safe to place inside <script>: no "</script>" or "<!--" sequences. */
const jsonForScript = (obj: object) => JSON.stringify(obj).replace(/</g, '\\u003c')

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  mdash: '—', ndash: '–', hellip: '…', middot: '·',
}

function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') {
      const cp = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m
    }
    return NAMED_ENTITIES[e.toLowerCase()] ?? m
  })
}

/** The page's own content — its <main> element, without site nav and footer. */
function mainOf(html: string): string {
  const start = html.indexOf('<main')
  const end = html.lastIndexOf('</main>')
  return start >= 0 && end > start ? html.slice(start, end + '</main>'.length) : html
}

/** Readable plain text, with Markdown-style headings and lists, from rendered HTML. */
function htmlToText(html: string): string {
  return decodeEntities(
    html
      // <select> drops the 250-country phone-code list from form pages.
      .replace(/<(script|style|svg|noscript|template|select)\b[\s\S]*?<\/\1>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<h([1-6])\b[^>]*>/gi, (_m, level: string) => `\n\n${'#'.repeat(Number(level))} `)
      .replace(/<\/h[1-6]>/gi, '\n\n')
      .replace(/<li\b[^>]*>/gi, '\n- ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|section|article|header|footer|ul|ol|blockquote|figure|figcaption|tr|main|nav|aside)>/gi, '\n\n')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/[ \t ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Tag-whitelisted HTML for JobPosting.description, which Google expects as HTML. */
function simpleHtml(html: string): string {
  const keep = new Set(['p', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'strong', 'em', 'b', 'i', 'br'])
  return html
    .replace(/<(script|style|svg|noscript|template|select)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(\/?)([a-z0-9]+)\b[^>]*>/gi, (_m, close: string, tag: string) =>
      keep.has(tag.toLowerCase()) ? `<${close}${tag.toLowerCase()}>` : ' ')
    .replace(/\s+/g, ' ')
    .replace(/<(p|li|h2|h3|h4|strong|em|b|i)>\s*<\/\1>/g, '')
    .trim()
}

// ── <head> rewriting ─────────────────────────────────────────────────────────

function setMeta(html: string, kind: 'name' | 'property', key: string, value: string): string {
  const re = new RegExp(`(<meta\\s+${kind}="${key}"\\s+content=")[^"]*(")`, 'i')
  if (re.test(html)) return html.replace(re, (_m, a: string, b: string) => `${a}${escapeAttr(value)}${b}`)
  // Not in the template — append rather than silently dropping it.
  return html.replace('</head>', () => `  <meta ${kind}="${key}" content="${escapeAttr(value)}" />\n</head>`)
}

function setTitle(html: string, title: string): string {
  return html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escapeAttr(title)}</title>`)
}

function setCanonical(html: string, url: string): string {
  return html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, (_m, a: string, b: string) => `${a}${escapeAttr(url)}${b}`)
}

const injectHead = (html: string, snippet: string) => html.replace('</head>', () => `${snippet}\n</head>`)

const injectBody = (html: string, body: string) =>
  html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)

/**
 * Components keep much of their CSS in inline <style> blocks rendered after
 * the markup they style, often tens of KB down the document. The browser can
 * paint before parsing reaches them, showing the page unstyled or in its
 * desktop layout, and the page then shifts (CLS). A copy in <head> applies from
 * first paint; main.tsx removes the copies at start-up.
 */
function withStyleCopies(html: string, body: string): string {
  for (const [style] of body.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/g)) {
    html = injectHead(html, '  ' + style.replace(/^<style/, '<style data-ssr-style'))
  }
  return html
}

function applyHead(shell: string, route: RouteMeta): string {
  const url = urlFor(route.path)
  const image = abs(route.image ?? DEFAULT_OG_IMAGE)
  let html = shell
  html = setTitle(html, route.title)
  html = setCanonical(html, url)
  html = setMeta(html, 'name', 'description', route.description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:title', route.title)
  html = setMeta(html, 'property', 'og:description', route.description)
  html = setMeta(html, 'property', 'og:image', image)
  html = setMeta(html, 'property', 'og:type', route.type ?? 'website')
  html = setMeta(html, 'name', 'twitter:url', url)
  html = setMeta(html, 'name', 'twitter:title', route.title)
  html = setMeta(html, 'name', 'twitter:description', route.description)
  html = setMeta(html, 'name', 'twitter:image', image)
  if (route.image) {
    // The template's 1200x630 dimensions describe the default card, not this image.
    html = html.replace(/\s*<meta property="og:image:(width|height)"[^>]*>/g, '')
  }
  if (route.noindex) {
    html = setMeta(html, 'name', 'robots', 'noindex, nofollow')
    html = setMeta(html, 'name', 'googlebot', 'noindex, nofollow')
  }
  return html
}

// ── per-route stylesheets ────────────────────────────────────────────────────
// Each page's CSS ships in its own chunk, which the browser would otherwise
// discover only after the page's JavaScript loaded — restyling the page after
// first paint, a large layout shift (CLS). Link each route's stylesheets in its
// HTML instead. Vite's loader sees the <link> already present and skips it.

type ManifestChunk = { file: string; css?: string[]; imports?: string[]; isEntry?: boolean }
const MANIFEST_PATH = join(DIST, '.vite', 'manifest.json')

/** Route key -> source module, read from the loaders in src/routes.tsx. */
function routeModules(): Record<string, string> {
  const source = readFileSync(join(ROOT, 'src', 'routes.tsx'), 'utf8')
  const modules: Record<string, string> = {}
  for (const m of source.matchAll(/(\w+): \(\) => import\('\.\/([^']+)'\)/g)) {
    const base = 'src/' + m[2]
    modules[m[1]] = existsSync(join(ROOT, base + '.tsx')) ? base + '.tsx' : base + '.ts'
  }
  return modules
}

/** Every CSS file a module's chunk needs, following its static imports. */
function stylesheetsFor(manifest: Record<string, ManifestChunk>, moduleId: string, entryCss: Set<string>): string[] {
  const seen = new Set<string>()
  const css: string[] = []
  const visit = (id: string) => {
    if (seen.has(id)) return
    seen.add(id)
    const chunk = manifest[id]
    if (!chunk) return
    for (const file of chunk.css ?? []) if (!entryCss.has(file) && !css.includes(file)) css.push(file)
    for (const imported of chunk.imports ?? []) visit(imported)
  }
  visit(moduleId)
  return css
}

// ── structured data ──────────────────────────────────────────────────────────

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs(LOGO),
  description: DEFAULT_DESCRIPTION,
  email: CONTACT_EMAIL,
  sameAs: ['https://www.linkedin.com/company/trenchsecurity/', 'https://www.youtube.com/@Trench_Security'],
  contactPoint: [{ '@type': 'ContactPoint', email: CONTACT_EMAIL, contactType: 'sales' }],
}

const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
}

const FAQ_PAGE = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const PUBLISHER = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  logo: { '@type': 'ImageObject', url: abs(LOGO) },
}

/** Breadcrumb label: the route title without the site / section suffixes. */
const shortName = (route: RouteMeta) =>
  route.path === '/'
    ? 'Home'
    : route.title.replace(/ \| Trench Security$/, '').replace(/ \| Careers$/, '')

function breadcrumbs(route: Route, byPath: Map<string, Route>) {
  const trail: Route[] = [byPath.get('/')!]
  const parts = route.path.split('/').filter(Boolean)
  for (let i = 1; i <= parts.length; i++) {
    // Only ancestors that are real pages (/resources and /case-studies are not).
    const ancestor = byPath.get('/' + parts.slice(0, i).join('/'))
    if (ancestor) trail.push(ancestor)
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: shortName(r),
      item: urlFor(r.path),
    })),
  }
}

function jobPosting(route: Route, body: string) {
  const job = route.job!
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: simpleHtml(mainOf(body)),
    datePosted: job.datePosted,
    employmentType: job.employmentType,
    directApply: false,
    url: urlFor(route.path),
    hiringOrganization: { '@type': 'Organization', name: SITE_NAME, sameAs: SITE_URL, logo: abs(LOGO) },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
  }
}

// ── video + case-study structured data ──────────────────────────────────────

function videoObject(video: VideoMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: [
      'https://i.ytimg.com/vi/' + video.id + '/maxresdefault.jpg',
      'https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg',
    ],
    uploadDate: video.uploadDate,
    duration: isoDuration(video.durationSeconds),
    embedUrl: 'https://www.youtube.com/embed/' + video.id,
    contentUrl: 'https://www.youtube.com/watch?v=' + video.id,
    publisher: PUBLISHER,
  }
}

/** Google video-sitemap entries for the videos embedded on a page. */
function videoSitemapTags(path: string): string {
  return (PAGE_VIDEOS[path] ?? [])
    .map(
      (v) =>
        '<video:video>' +
        '<video:thumbnail_loc>https://i.ytimg.com/vi/' + v.id + '/maxresdefault.jpg</video:thumbnail_loc>' +
        '<video:title>' + escapeXml(v.name) + '</video:title>' +
        '<video:description>' + escapeXml(v.description.slice(0, 2048)) + '</video:description>' +
        '<video:player_loc>https://www.youtube.com/embed/' + v.id + '</video:player_loc>' +
        '<video:duration>' + v.durationSeconds + '</video:duration>' +
        '<video:publication_date>' + v.uploadDate + '</video:publication_date>' +
        '</video:video>',
    )
    .join('')
}

const CASE_STUDY_LIST = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Trench case studies',
  itemListElement: caseStudies.map((cs, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: urlFor(cs.href),
    name: cs.title,
  })),
}

// ── route table ──────────────────────────────────────────────────────────────

function buildRoutes(): Route[] {
  const routes: Route[] = STATIC_ROUTES.map((r) => ({ ...r }))

  for (const post of postsData) {
    const description = stripTags(post.description).substring(0, 160).trim()
    routes.push({
      path: `/blog/${post.slug}`,
      title: TITLE_TEMPLATE(post.title),
      description,
      image: post.image,
      type: 'article',
      lastmod: post.modifiedTime,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${SITE_URL}/blog/${post.slug}#article`,
          isPartOf: { '@id': WEBSITE_ID },
          headline: post.title,
          description,
          image: abs(post.image),
          datePublished: post.publishedTime,
          dateModified: post.modifiedTime || post.publishedTime,
          articleSection: post.category,
          author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
          // Old repo pointed at /logo.png, which 404s (audit defect #4). Fixed.
          publisher: PUBLISHER,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
        },
      ],
    })
  }

  for (const item of announcementsData) {
    const image = item.coverImage ?? DEFAULT_OG_IMAGE
    routes.push({
      path: `/announcements/${item.slug}`,
      title: TITLE_TEMPLATE(item.title),
      description: item.seoDescription,
      image,
      type: 'article',
      lastmod: item.publishedISO,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: item.title,
          image: abs(image),
          datePublished: item.publishedISO,
          description: item.seoDescription,
          publisher: PUBLISHER,
          mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/announcements/${item.slug}` },
        },
      ],
    })
  }

  return routes
}

/** The router (src/routes.tsx) and the SEO table (seo/routes.ts) must list the same pages. */
function checkCoverage(server: ServerEntry) {
  const appPaths = Object.keys(server.STATIC_PATHS).filter((p) => !server.ALIAS_PATHS.includes(p))
  const seoPaths = STATIC_ROUTES.map((r) => r.path)
  const noMeta = appPaths.filter((p) => !seoPaths.includes(p))
  const noRoute = seoPaths.filter((p) => !appPaths.includes(p))
  if (noMeta.length || noRoute.length) {
    throw new Error(
      'Route table mismatch.\n' +
        `  In src/routes.tsx but missing from seo/routes.ts: ${noMeta.join(', ') || '(none)'}\n` +
        `  In seo/routes.ts but missing from src/routes.tsx: ${noRoute.join(', ') || '(none)'}`,
    )
  }
}

// ── crawler-facing text files ────────────────────────────────────────────────

// AI assistants and answer engines, listed by name so the intent is explicit.
// Everything here is also covered by the "*" group; a crawler that matches a
// named group ignores "*", so the rules are repeated.
const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'meta-externalagent',
  'DuckAssistBot', 'cohere-ai', 'CCBot',
]

const ROBOTS_TXT = `# Search engines and AI assistants are welcome to crawl, index and cite this site.
User-agent: *
Allow: /
Disallow: /api/

# AI crawlers and answer engines (AEO)
${AI_CRAWLERS.map((ua) => `User-agent: ${ua}`).join('\n')}
Allow: /
Disallow: /api/

# Host
Host: ${SITE_URL}

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# LLM-readable site summary: ${SITE_URL}/llms.txt
`

const LLMS_SECTIONS: { heading: string; match: (path: string) => boolean }[] = [
  { heading: 'Platform', match: (p) => ['/why-trench', '/how-it-works', '/integrations', '/for-mssps', '/connect'].includes(p) },
  { heading: 'Customer stories', match: (p) => p === '/case-studies' || p.startsWith('/case-studies/') },
  { heading: 'Blog', match: (p) => p === '/blog' || p.startsWith('/blog/') },
  { heading: 'Announcements', match: (p) => p === '/announcements' || p.startsWith('/announcements/') },
  { heading: 'Resources and community', match: (p) => p.startsWith('/resources/') || p === '/newsletter-signup' },
  { heading: 'Careers', match: (p) => p === '/career' || p.startsWith('/career/') },
]

function buildLlmsTxt(routes: Route[]): string {
  const whatIs = faqItems.find((f) => /what is trench/i.test(f.q))?.a ?? ''
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${DEFAULT_DESCRIPTION}`,
    '',
    whatIs,
    '',
    `Contact: ${CONTACT_EMAIL}. Trust center and policies: https://compliance.trenchsecurity.ai/`,
  ]
  for (const section of LLMS_SECTIONS) {
    const items = routes.filter((r) => !r.noindex && section.match(r.path))
    if (!items.length) continue
    lines.push('', `## ${section.heading}`, '')
    for (const r of items) lines.push(`- [${shortName(r)}](${urlFor(r.path)}): ${r.description}`)
  }
  const videoLines = Object.entries(PAGE_VIDEOS).flatMap(([path, videos]) =>
    videos.map((v) => '- [' + v.name + '](https://www.youtube.com/watch?v=' + v.id + '): ' + v.description + ' Embedded on ' + urlFor(path)),
  )
  if (videoLines.length) lines.push('', '## Videos', '', ...videoLines)
  lines.push('', '## Optional', '', `- [Full text of every page](${SITE_URL}/llms-full.txt)`, '')
  return lines.join('\n')
}

function buildLlmsFullTxt(pages: { route: Route; text: string }[]): string {
  const parts = [
    `# ${SITE_NAME} — full site content`,
    '',
    `> ${DEFAULT_DESCRIPTION}`,
    '',
    `Plain-text copy of every public page on ${SITE_URL}, generated at build time from the same markup the site serves.`,
    '',
    '## Frequently asked questions',
    '',
    ...faqItems.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
  ]
  for (const { route, text } of pages) {
    parts.push('---', '', `# ${shortName(route)}`, '', `URL: ${urlFor(route.path)}`, '', `> ${route.description}`, '', text, '')
  }
  return parts.join('\n')
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const shellPath = join(DIST, 'index.html')
  if (!existsSync(shellPath)) throw new Error('dist/index.html not found — run "vite build" first.')
  if (!existsSync(SERVER_ENTRY)) {
    throw new Error('dist-server/entry-server.js not found — run "vite build --ssr src/entry-server.tsx --outDir dist-server" first.')
  }

  const server = (await import(pathToFileURL(SERVER_ENTRY).href)) as ServerEntry
  const shell = readFileSync(shellPath, 'utf8')
  if (!shell.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> — it was already prerendered. Rebuild first.')
  }

  // Images in this repo are Git LFS objects. A host that checks out without LFS
  // deploys 130-byte pointer files and every image on the site breaks. Fail the
  // Vercel build loudly; elsewhere (CI checks out without LFS) just warn.
  for (const probe of ['logo/trench-og-image.png', 'apple-touch-icon.png']) {
    const file = join(DIST, probe)
    if (existsSync(file) && readFileSync(file).subarray(0, 40).toString('utf8').startsWith('version https://git-lfs')) {
      const message = `dist/${probe} is a Git LFS pointer, not an image. Enable Git LFS for this project (Vercel: Settings -> Git -> Git Large File Storage) and redeploy.`
      if (process.env.VERCEL) throw new Error(message)
      console.warn(`[prerender-seo] warning: ${message}`)
    }
  }

  checkCoverage(server)

  if (!existsSync(MANIFEST_PATH)) throw new Error('dist/.vite/manifest.json not found — the client build needs build.manifest.')
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as Record<string, ManifestChunk>
  const entryCss = new Set(Object.values(manifest).filter((c) => c.isEntry).flatMap((c) => c.css ?? []))
  const modules = routeModules()
  const routes = buildRoutes()
  const byPath = new Map(routes.map((r) => [r.path, r]))
  if (byPath.size !== routes.length) throw new Error('Duplicate path in route table')

  const pages: { route: Route; text: string }[] = []
  const withoutH1: string[] = []

  for (const route of routes) {
    const body = await server.render(route.path)
    if (!body.trim()) throw new Error(`${route.path}: server render returned no markup`)
    if (/(404 Page Not Found|Article Not Found|Announcement Not Found)</.test(body)) {
      throw new Error(`${route.path}: rendered the not-found view — is it missing from src/routes.tsx?`)
    }
    if (!/<h1[\s>]/i.test(body)) withoutH1.push(route.path)

    const ld: object[] = [...(route.jsonLd ?? [])]
    if (route.path === '/') ld.push(ORGANIZATION, WEBSITE, FAQ_PAGE)
    else ld.push(breadcrumbs(route, byPath))
    if (route.job) ld.push(jobPosting(route, body))
    for (const video of PAGE_VIDEOS[route.path] ?? []) ld.push(videoObject(video))
    if (route.path === '/case-studies') ld.push(CASE_STUDY_LIST)

    let html = applyHead(shell, route)
    const match = server.resolveRoute(route.path)
    const moduleId = match ? modules[match.key] : undefined
    if (match && !moduleId) throw new Error(route.path + ': no module for route key "' + match.key + '" in src/routes.tsx')
    for (const href of moduleId ? stylesheetsFor(manifest, moduleId, entryCss) : []) {
      html = injectHead(html, '  <link rel="stylesheet" crossorigin href="/' + href + '">')
    }
    html = withStyleCopies(html, body)
    for (const obj of ld) {
      html = injectHead(html, `  <script type="application/ld+json">${jsonForScript(obj)}</script>`)
    }
    html = injectBody(html, body)

    const outPath = route.path === '/' ? shellPath : join(DIST, route.path, 'index.html')
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html, 'utf8')

    if (!route.noindex) pages.push({ route, text: htmlToText(mainOf(body)) })
  }

  // 404.html — Vercel serves it, with a real 404 status, for any unknown path.
  let notFound = applyHead(shell, {
    path: '/404',
    title: 'Page Not Found | Trench Security',
    description: 'The page you are looking for does not exist or has been moved.',
    noindex: true,
  })
  notFound = notFound.replace(/\s*<link\s+rel="canonical"[^>]*>/i, '')
  const notFoundBody = await server.render('/__not-found__')
  writeFileSync(join(DIST, '404.html'), injectBody(withStyleCopies(notFound, notFoundBody), notFoundBody), 'utf8')

  // sitemap.xml — noindex routes excluded, matching the old exclude list.
  const now = new Date().toISOString()
  const indexable = routes.filter((r) => !r.noindex)
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n' +
    indexable
      .map(
        (r) =>
          '<url><loc>' + escapeXml(urlFor(r.path)) + '</loc><lastmod>' + (r.lastmod ?? now) +
          '</lastmod><changefreq>daily</changefreq><priority>0.7</priority>' + videoSitemapTags(r.path) + '</url>',
      )
      .join('\n') +
    '\n</urlset>\n'
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8')
  writeFileSync(join(DIST, 'robots.txt'), ROBOTS_TXT, 'utf8')
  rmSync(join(DIST, '.vite'), { recursive: true, force: true })
  writeFileSync(join(DIST, 'llms.txt'), buildLlmsTxt(routes), 'utf8')
  writeFileSync(join(DIST, 'llms-full.txt'), buildLlmsFullTxt(pages), 'utf8')

  const words = pages.reduce((n, p) => n + p.text.split(/\s+/).length, 0)
  console.log(
    `[prerender-seo] ${routes.length} routes server-rendered (${indexable.length} in sitemap), ` +
      `404.html, robots.txt, llms.txt and llms-full.txt (${words.toLocaleString('en-US')} words) written.`,
  )
  if (withoutH1.length) {
    console.warn(`[prerender-seo] no <h1> on ${withoutH1.length} page(s): ${withoutH1.join(', ')}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
