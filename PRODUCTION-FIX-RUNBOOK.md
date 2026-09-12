# Production Fix Runbook — Trench Website UI Migration

**New codebase (target):** `c:\TRENCH\UX\Landing-Design` — Vite 8 + React 19 + Tailwind 4 SPA, git repo, HEAD `6186202`
**Old codebase (reference/source of truth):** `c:\TRENCH\WEBSITE\trench-home-main` — Next.js 16.2.4 App Router, currently live on `https://www.trenchsecurity.ai`
**Companion doc:** `MIGRATION-AUDIT.md` (already present in this repo) — the parity inventory. This runbook is the *fix*; that one is the *checklist*.
**Date:** 2026-09-10

---

## Table of Contents

- [0. Read this first — root cause & architecture decision](#0-read-this-first--root-cause--architecture-decision)
- [1. Prerequisites](#1-prerequisites)
- [2. Blocker 1 — Deindexing + wrong social metadata](#2-blocker-1--deindexing--wrong-social-metadata)
- [3. Blocker 2 — No SPA fallback (deep links 404)](#3-blocker-2--no-spa-fallback-deep-links-404)
- [4. Blocker 3 — Forms lose every lead](#4-blocker-3--forms-lose-every-lead)
- [5. Blocker 4 — Entire tracking stack orphaned](#5-blocker-4--entire-tracking-stack-orphaned)
- [6. Blocker 5 — Five indexed URLs have no route](#6-blocker-5--five-indexed-urls-have-no-route)
- [7. Blocker 6 — Zero environment variables](#7-blocker-6--zero-environment-variables)
- [8. Blocker 7 (found in this pass) — Broken favicon & OG image](#8-blocker-7-found-in-this-pass--broken-favicon--og-image)
- [9. The durable fix — prerender + generated sitemap](#9-the-durable-fix--prerender--generated-sitemap)
- [10. Asset parity sweep](#10-asset-parity-sweep)
- [11. Verification](#11-verification)
- [12. Deploy & cutover](#12-deploy--cutover)
- [13. Acceptance checklist](#13-acceptance-checklist)

---

## 0. Read this first — root cause & architecture decision

### One root cause behind all six blockers

A **Figma Make scaffold** (`figma-make-app`, Vite + `.figma/make/*`) was used as the shell, and the old Next.js source tree was copied into `src/` without the Next.js runtime. The result:

- The scaffold's *own* defaults still govern the production build (`.figma/make/site.json` says `robots.index: false` → blocker 1).
- The Next.js files that provided the head, analytics, routing, metadata and API layer were copied in but **nothing imports them** — `src/layout.tsx` and `src/api/**` are dead modules (blockers 3, 4). `next` is not in `package.json`; they survive `vite build` only because Vite tree-shakes unreferenced modules and `npm run build` is `vite build` with **no `tsc` typecheck**.
- A hand-rolled `pushState` router in `App.tsx` replaced the file-system router, so per-route HTML, metadata and the 404 boundary all disappeared (blockers 2, 5).
- `process.env.*` reads were carried over from a Node/Next context into a browser bundle (blocker 6).

Fix the scaffold's assumptions and re-attach every layer that Next.js used to provide. That is what this runbook does.

### Architecture decision — stay on Vite, add a prerender step

| | Option A — **Keep Vite SPA + prerender** ✅ recommended | Option B — Port the new UI into the old Next.js app |
|---|---|---|
| Effort | ~1–2 days | ~1–2 weeks |
| UI risk | None — components ship as built | High — Tailwind 4 utilities must be re-verified on every page (see `MIGRATION-AUDIT.md` §11: the *old* repo has no Tailwind, so classes behave differently there) |
| SEO ceiling | Full — static per-route HTML with real meta + JSON-LD | Full |
| Forms | Vercel serverless functions (§4) | Next Route Handlers (already written) |
| Keeps | Tailwind 4, Figma-Make workflow, current build speed | Next Metadata API, `next-sitemap`, `next/image` |

**Go with Option A.** The UI is finished and Tailwind 4 is correctly wired here; re-hosting it inside Next.js re-opens the styling risk the audit flagged and buys nothing this runbook does not deliver.

### The one thing you cannot skip

A plain SPA serves **one** `index.html` for all 40 URLs. Google renders JS and will mostly cope — but **LinkedIn, X/Twitter, Slack, WhatsApp and Facebook unfurlers do not execute JavaScript**. They read the raw HTML response. On a plain SPA every single share of every blog post shows the homepage title and image.

The old site has **40 indexed URLs**, per-post OG images and `BlogPosting` JSON-LD. Losing that is a marketing regression, not a technical nicety.

→ **§9 (prerender) is mandatory, not optional.** It also permanently fixes the sitemap drift behind blocker 5.

### Order of work

Do §1 → §9 in order. §2–§8 are independent of each other, but **§9 depends on §2, §5 and §8** being done first.

---

## 1. Prerequisites

Run everything from the new codebase in **Git Bash** (PowerShell equivalents noted where they differ).

```bash
cd "c:/TRENCH/UX/Landing-Design"

# 1. Branch off — never fix directly on main
git checkout -b fix/production-blockers

# 2. Confirm you are on the right tree
git log --oneline -1        # expect 6186202 illustration updated

# 3. Path shortcuts used throughout this runbook
export OLD="c:/TRENCH/WEBSITE/trench-home-main"
export NEW="c:/TRENCH/UX/Landing-Design"
```

PowerShell:
```powershell
$OLD = "c:\TRENCH\WEBSITE\trench-home-main"
$NEW = "c:\TRENCH\UX\Landing-Design"
```

### Install the dependencies the fixes need

```bash
npm install @vercel/analytics
npm install -D @vercel/node tsx
```

| Package | Why | Where used |
|---|---|---|
| `@vercel/analytics` | Vercel Analytics parity with the old site (`<Analytics />`) | §5 |
| `@vercel/node` | TypeScript types for serverless function handlers (**dev only** — runtime is supplied by Vercel) | §4 |
| `tsx` | Lets the prerender script import `postsData.ts` / `announcementsData.ts` directly | §9 |

> Do **not** install `next`. Nothing in the shipped app should need it after §4 and §5.

---

## 2. Blocker 1 — Deindexing + wrong social metadata

### Evidence (verified in your current `dist/`)

```bash
$ cat dist/robots.txt
User-agent: *
Disallow: /
```

`dist/index.html` contains **two of every critical tag** — the correct one from `index.html`, then the Figma scaffold's injected one:

```html
<meta name="description" content="Trench is an agentic OS for security operations..." />
<meta name="robots"      content="index, follow" />
<meta property="og:title" content="Trench Security | Agentic SecOps Platform" />
<meta property="og:description" content="Trench is an agentic OS..." />
...
<meta name="description" content="Create stunning, mobile-responsive landing pages with a premium design using color theory and custom fonts to enhance brand presence and engagement.">
<meta name="robots"      content="noindex, nofollow">
<meta property="og:title" content="Figma Make App">
<meta property="og:description" content="Create stunning, mobile-responsive landing pages...">
```

**This is worse than a deindex.** `.figma/make/site.json` has no `title` key, so `vite.config.ts` falls back to its literal default and stamps **`og:title = "Figma Make App"`** on the production build. Share any page today and the preview card reads *"Figma Make App"* with Figma's boilerplate description.

Root cause — `vite.config.ts`, the `figmaSiteConfiguration()` plugin:
- `const title = config.title ?? "Figma Make App"` → injects that as `og:title`
- `const robotsTxt = config.robots?.index === false ? 'User-agent: *\nDisallow: /\n' : ''` → `generateBundle()` `emitFile`s it, **overwriting your correct `public/robots.txt`**
- `if (config.robots?.index === false)` → injects `noindex, nofollow`
- `if (description)` → injects the scaffold description on top of yours

### Fix — remove the plugin, keep all SEO in `index.html`

The plugin's only other job is filling `<!-- figma:head-start -->`-style comment slots, which are all empty in your `index.html`. Removing it is safe and eliminates four defects in one edit.

**2a. `vite.config.ts`** — delete the plugin from the array and drop its now-unused import:

```diff
 import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
 import react from '@vitejs/plugin-react'
 import tailwindcss from '@tailwindcss/vite'
 import path from 'node:path'
 
-import siteConfiguration from './.figma/make/site.json' with { type: 'json' }
-
```

```diff
     plugins: [
       react(),
       tailwindcss(),
-      figmaSiteConfiguration(siteConfiguration),
       figmaErrorOverlayReplay(),
       figmaReactRefreshBoundaryFallback(),
       figmaMakeKitPlugin({ storiesGlob: '/src/**/*.stories.{ts,tsx,js,jsx}' }),
       trenchApiPlugin(),
     ],
```

Then delete the whole `type FigmaSiteConfiguration = {...}` block and the `function figmaSiteConfiguration(...) {...}` function (they become dead code). Leave `figmaErrorOverlayReplay`, `figmaReactRefreshBoundaryFallback` and `figmaMakeKitPlugin` alone — they are `apply: 'serve'` dev-only helpers and never touch the production build.

**2b. `.figma/make/site.json`** — belt and braces, in case Figma Make tooling re-adds the plugin:

```json
{
  "title": "Trench | Agentic OS for Actionable SecOps",
  "description": "Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically.",
  "robots": {
    "index": true
  },
  "accessibility": {
    "addBypassLinks": false,
    "ignoreReducedMotion": false
  }
}
```

**2c. `public/robots.txt`** — already correct and already present. Leave it. With the plugin gone, nothing overwrites it. (§9 regenerates it too, as a third safety net.)

### Verify

```bash
npm run build
cat dist/robots.txt                                        # expect Allow: / — NOT Disallow
grep -c 'name="robots"'      dist/index.html               # expect 1
grep -c 'name="description"' dist/index.html               # expect 1
grep -c 'og:title'           dist/index.html               # expect 1
grep -i 'noindex\|Figma Make App' dist/index.html          # expect NO output
```

All five must pass before you move on.

---

## 3. Blocker 2 — No SPA fallback (deep links 404)

`App.tsx:179` reads `window.location.pathname` and renders from a `getRouteComponent()` chain. That works **only if the server returns `index.html` for every path**. There is no `vercel.json`, no `netlify.toml`, no `_redirects` — so `/why-trench`, every `/blog/*`, every refresh, and every crawler hit returns a hard 404.

### Fix — create `vercel.json` at the repo root

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/integrations/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Why each line matters

| Setting | Reason |
|---|---|
| `rewrites` with `(?!api/)` | Catch-all SPA fallback, but never swallow `/api/*` (§4). Vercel checks the filesystem *before* rewrites, so the prerendered files from §9 win — the rewrite only catches genuinely unknown paths. |
| `cleanUrls: true` | `/why-trench` resolves to `dist/why-trench/index.html` without a trailing slash or `.html` suffix. Required for §9 output to be reachable. |
| `trailingSlash: false` | Matches the old site's canonical URLs (`https://www.trenchsecurity.ai/blog`, no slash). Prevents duplicate-URL indexing. |
| `headers` | Reproduces the five security headers and the integrations cache rule from the old `next.config.ts`. See `MIGRATION-AUDIT.md` §10. |

> **Note on the 404 page.** With a catch-all rewrite, unknown paths return HTTP **200** with the SPA's "404 Page Not Found" text (`App.tsx`). That is a *soft 404* — Google dislikes it. After §9, add real 404 handling: either keep the soft 404 and accept it, or set a `notFound` route. Given the audit found the old site had **no `not-found.tsx` at all**, the SPA fallback is already an improvement. Ship it, then improve.

### Verify locally

```bash
npm run build
npx vercel dev --listen 3000
# then, in another shell:
curl -sI http://localhost:3000/why-trench          | head -1   # expect 200
curl -sI http://localhost:3000/blog/modernizing-soc-using-agentic-ai | head -1   # expect 200
curl -sI http://localhost:3000/api/submit-form     | head -1   # expect 405, NOT 200 HTML
```

---

## 4. Blocker 3 — Forms lose every lead

### Two separate faults

**Fault 1 — no production API.** `/api/*` exists in exactly two places, and neither ships:

| Location | Status |
|---|---|
| `vite.config.ts` → `trenchApiPlugin()` | `configureServer` + `configurePreviewServer` only → **dev and `vite preview` only, never in production** |
| `src/api/submit-form/route.ts`, `src/api/community-signup/route.ts` | Import `next/server`; `next` is **not installed**. Nothing imports them; Vite tree-shakes them. Dead code that merely looks reassuring. |

In production `POST /api/submit-form` hits the §3 catch-all rewrite and returns **`index.html` with status 200**.

**Fault 2 — the failure is hidden from the prospect.** `ConnectClient.tsx:143-149` and `ForMSSPsClient.tsx:154-157`:

```ts
} catch (error) {
  console.error('Form submission error:', error);
  // For production: show success to user but log the error
  setIsSuccess(true);          // ← lead destroyed, prospect thanked
}
```

Response 200 + HTML → `response.json()` throws → `catch` → `setIsSuccess(true)`. And `compiler.removeConsole` behaviour aside, `console.error` in a browser goes nowhere anyone watches. **Every demo request and every MSSP partner enquiry is silently deleted while the prospect sees a thank-you screen.** This is the most commercially damaging blocker of the six.

### Fix — one shared implementation, two runtimes

Single source of truth in `api/_lib/`, consumed by both the Vercel function (production) and the Vite middleware (local dev). Vercel excludes `_`-prefixed paths from routing, so `api/_lib/` never becomes an endpoint.

**4a. Delete the dead Next handlers**

```bash
rm -rf src/api
```

**4b. Create `api/_lib/forms.ts`**

```ts
// Shared form-handling logic. Used by the Vercel serverless functions in
// production and by the Vite dev middleware locally, so the two can never drift.
//
// Payload shapes below MUST stay byte-compatible with scripts/code.gs in the old
// repo — that Apps Script routes on `category` / `formType` and writes to three
// separate Google Sheet tabs. See MIGRATION-AUDIT.md section 5.3.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LINKEDIN_RE =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+\/?.*$/

const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com',
  'msn.com', 'yahoo.com', 'ymail.com', 'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me', 'aol.com', 'gmx.com', 'gmx.net', 'zoho.com',
  'mail.com', 'yandex.com', 'rediffmail.com',
]

export type HandlerResult = {
  httpStatus: number
  body: { status: 'success' | 'error'; message: string; timestamp?: string }
}

function ok(message: string): HandlerResult {
  return {
    httpStatus: 200,
    body: { status: 'success', message, timestamp: new Date().toISOString() },
  }
}

function fail(httpStatus: number, message: string): HandlerResult {
  return { httpStatus, body: { status: 'error', message } }
}

function isCompanyEmail(email: string): boolean {
  const domain = email.split('@').pop()?.toLowerCase().trim()
  return !!domain && !PERSONAL_EMAIL_DOMAINS.includes(domain)
}

/**
 * Forwards to the Google Apps Script webhook and THROWS on any failure.
 * Never swallow this — a rejected forward means the lead was not recorded.
 */
async function forwardToAppsScript(payload: Record<string, unknown>): Promise<void> {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
  if (!scriptUrl) {
    throw new Error('GOOGLE_APPS_SCRIPT_URL is not configured')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  try {
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow', // Apps Script /exec issues a 302 to script.googleusercontent.com
      signal: controller.signal,
    })

    if (!res.ok) throw new Error(`Apps Script HTTP ${res.status}`)

    const text = await res.text()
    let parsed: { status?: string; message?: string }
    try {
      parsed = JSON.parse(text)
    } catch {
      throw new Error(`Apps Script returned non-JSON: ${text.slice(0, 200)}`)
    }

    if (parsed.status && parsed.status !== 'success') {
      throw new Error(parsed.message || 'Apps Script rejected the submission')
    }
  } finally {
    clearTimeout(timeout)
  }
}

/** POST /api/submit-form — Connect and MSSP enquiries. */
export async function handleSubmitForm(
  body: Record<string, any>,
): Promise<HandlerResult> {
  const category = body.companyName ? 'MSSP' : 'Connect'

  const requiredFields =
    category === 'MSSP'
      ? ['fullName', 'email', 'companyName']
      : ['fullName', 'email', 'teamSize', 'intent']

  const missing = requiredFields.filter(
    (f) => !body[f] || String(body[f]).trim() === '',
  )
  if (missing.length > 0) {
    return fail(400, `Missing required fields: ${missing.join(', ')}`)
  }

  if (!EMAIL_RE.test(String(body.email))) {
    return fail(400, 'Invalid email format')
  }

  const nameParts = String(body.fullName || '').trim().split(/\s+/)

  const payload = {
    category,
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    fullName: body.fullName,
    email: body.email,
    contactNumber: body.contactNumber || '',
    company: body.companyName || body.company || '',
    teamSize: body.teamSize || 'MSSP Partner',
    intent: body.intent || 'MSSP Partnership',
    message: body.message || '',
    timestamp: new Date().toISOString(),
  }

  try {
    await forwardToAppsScript(payload)
  } catch (err) {
    console.error('[submit-form] Apps Script forward failed:', err)
    return fail(502, 'We could not record your request. Please email ask@trenchsecurity.ai.')
  }

  return ok('Form submitted successfully')
}

/** POST /api/community-signup — BlueTeam Premier League signups. */
export async function handleCommunitySignup(
  body: Record<string, any>,
): Promise<HandlerResult> {
  const { firstName, lastName, email, phone, designation, linkedin } = body

  if (
    !firstName?.trim() || !lastName?.trim() || !email?.trim() ||
    !phone?.trim() || !designation?.trim() || !linkedin?.trim()
  ) {
    return fail(
      400,
      'All fields (First Name, Last Name, Phone, Email, Designation, LinkedIn) are required.',
    )
  }

  if (!EMAIL_RE.test(String(email).trim())) {
    return fail(400, 'Please enter a valid email address.')
  }

  if (!isCompanyEmail(String(email).trim())) {
    return fail(
      400,
      'Please provide a valid company email address. Personal email domains (Gmail, Outlook, Yahoo, etc.) are not accepted.',
    )
  }

  if (!LINKEDIN_RE.test(String(linkedin).trim().toLowerCase())) {
    return fail(
      400,
      'Please provide a valid LinkedIn profile link (e.g., https://linkedin.com/in/yourname).',
    )
  }

  const payload = {
    category: 'BPL Community Signup',
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone).trim(),
    designation: String(designation).trim(),
    linkedin: String(linkedin).trim(),
    timestamp: new Date().toISOString(),
  }

  try {
    await forwardToAppsScript(payload)
  } catch (err) {
    console.error('[community-signup] Apps Script forward failed:', err)
    return fail(502, 'We could not complete your signup. Please email ask@trenchsecurity.ai.')
  }

  return ok('Signup confirmed! Welcome to the BlueTeam Premier League.')
}
```

> **Deliberate change from the old behaviour.** The old `/api/submit-form` used Next's `after()` to reply `200` instantly and forward in the background; the old `/api/community-signup` caught Apps Script errors and still returned `success` (audit defect #17 — silent data loss). Both are replaced with **await-and-report-honestly**. A 1–3 s spinner is a fair price for never losing a lead again.

**4c. Create `api/submit-form.ts`**

```ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleSubmitForm } from './_lib/forms'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {})
    const { httpStatus, body: payload } = await handleSubmitForm(body)
    return res.status(httpStatus).json(payload)
  } catch (err) {
    console.error('[api/submit-form] unhandled:', err)
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
```

**4d. Create `api/community-signup.ts`**

```ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleCommunitySignup } from './_lib/forms'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {})
    const { httpStatus, body: payload } = await handleCommunitySignup(body)
    return res.status(httpStatus).json(payload)
  } catch (err) {
    console.error('[api/community-signup] unhandled:', err)
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}
```

**4e. Rewrite `trenchApiPlugin()` in `vite.config.ts` to reuse the same logic**

Replace the entire existing `function trenchApiPlugin(): Plugin { ... }` with:

```ts
/**
 * Dev/preview-only bridge so `vite dev` exercises the SAME handlers that run as
 * Vercel functions in production. Production traffic never reaches this plugin.
 */
function trenchApiPlugin(): Plugin {
  const ROUTES: Record<string, 'submit' | 'community'> = {
    '/api/submit-form': 'submit',
    '/api/community-signup': 'community',
  }

  const handler = async (req: any, res: any, next: any) => {
    const url = req.url?.split('?')[0]
    const kind = url ? ROUTES[url] : undefined
    if (!kind) return next()

    const send = (status: number, payload: unknown) => {
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(payload))
    }

    if (req.method !== 'POST') {
      return send(405, { status: 'error', message: 'Method not allowed' })
    }

    let raw = ''
    req.on('data', (c: any) => (raw += c))
    req.on('end', async () => {
      try {
        // Imported lazily so editing api/_lib/forms.ts hot-reloads without
        // restarting the dev server.
        const { handleSubmitForm, handleCommunitySignup } = await import(
          './api/_lib/forms'
        )
        const body = JSON.parse(raw || '{}')
        const result =
          kind === 'submit'
            ? await handleSubmitForm(body)
            : await handleCommunitySignup(body)
        send(result.httpStatus, result.body)
      } catch (err: any) {
        console.error('[trenchApiPlugin]', err)
        send(500, { status: 'error', message: err?.message || 'Internal server error' })
      }
    })
  }

  return {
    name: 'trench-api-plugin',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}
```

**4f. Type-check the new `api/` folder — `tsconfig.json`**

```diff
-  "include": ["src", "vite.config.ts"]
+  "include": ["src", "api", "vite.config.ts"]
```

**4g. Stop faking success — `src/connect/ConnectClient.tsx`**

Add error state alongside the existing state (near the top of the component, next to `isSubmitting` / `isSuccess`):

```ts
const [submitError, setSubmitError] = useState<string | null>(null)
```

Replace the `catch` block at **lines 143-149**:

```diff
     } catch (error) {
       console.error('Form submission error:', error);
-
-      // For production: show success to user but log the error
-      // This ensures good UX even if backend fails temporarily
-      setIsSuccess(true);
+      setSubmitError(
+        error instanceof Error && error.message
+          ? error.message
+          : 'Something went wrong. Please email ask@trenchsecurity.ai and we will follow up.'
+      );
     } finally {
       setIsSubmitting(false);
     }
```

Also clear the error when a new attempt starts — at the top of the submit handler, beside `setIsSubmitting(true)`:

```ts
setSubmitError(null)
```

And render it just above the submit button inside the form:

```tsx
{submitError && (
  <p role="alert" style={{ color: '#B42318', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
    {submitError}
  </p>
)}
```

**4h. Same three edits in `src/for-mssps/ForMSSPsClient.tsx`** — the `catch` block is at **lines 154-157**:

```diff
     } catch (error) {
       console.error("Form submission error:", error);
-      // For backup, show success to user (same UX standard as connect/page.tsx)
-      setIsSuccess(true);
+      setSubmitError(
+        error instanceof Error && error.message
+          ? error.message
+          : "Something went wrong. Please email ask@trenchsecurity.ai and we will follow up."
+      );
     } finally {
```

> `src/resources/community/bpl-signup/page.tsx` already handles failure correctly (`setErrors({ form: ... })` at lines 171-184). **No change needed** — and with §4b returning a real `502`, its existing error path finally works.

### Verify

```bash
npm run build
npx vercel dev --listen 3000

# 405 on GET
curl -sI -X GET http://localhost:3000/api/submit-form | head -1

# 400 on missing fields
curl -s -X POST http://localhost:3000/api/submit-form \
  -H 'Content-Type: application/json' -d '{}'

# Real submission — check the Google Sheet "Form Submissions" tab
curl -s -X POST http://localhost:3000/api/submit-form \
  -H 'Content-Type: application/json' \
  -d '{"fullName":"Test Lead","email":"test@example.com","teamSize":"1-10","intent":"Demo","message":"runbook test"}'

# BPL: personal domain must be rejected
curl -s -X POST http://localhost:3000/api/community-signup \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"A","lastName":"B","email":"a@gmail.com","phone":"+1234567890","designation":"Analyst","linkedin":"https://linkedin.com/in/ab"}'
```

Requires `GOOGLE_APPS_SCRIPT_URL` in `.env` first — see §7.

---

## 5. Blocker 4 — Entire tracking stack orphaned

### Evidence

`src/layout.tsx` (6.6 KB) contains **every** analytics tag — GTM `GTM-P4DNDLW4`, GA4 `G-E1SQD3N78D`, Microsoft Clarity `y14biiygt7`, ContentSquare `915bc8852a0d2`, the Mailchimp connected-site script, `<Analytics />`, jQuery, and the Google Search Console meta token. It imports `next/font/local`, `next/font/google`, `next/script`, `@vercel/analytics/next` and `@/components/*`, none of which resolve here.

**Nothing imports it.** `src/main.tsx` imports only `./App` and `./index.css`.

What actually ships is `index.html` with a placeholder: `G-XXXXXXXXXX`. So the live site would have **zero** working analytics, and the Search Console meta token would be gone (the `public/googlec87b45408e1ef533.html` file method survives, so verification itself holds — but only via that one method).

### Fix — port the tags into `index.html`, delete the orphan

**5a. Replace the `<head>` of `index.html`** — full working file:

```html
<!doctype html>
<html lang="en">

<head>
  <!-- figma:head-start -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Trench | Agentic OS for Actionable SecOps</title>
  <meta name="description" content="Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically." />
  <meta name="keywords" content="Cybersecurity, SecOps, Agentic SecOps, SOC Automation, SIEM, Security Operations, Enterprise Security, Cloud Security, Trench Security" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="author" content="Trench Security" />
  <link rel="canonical" href="https://www.trenchsecurity.ai" />

  <!-- Google Search Console (meta method; the /googlec87b45408e1ef533.html file method also stays) -->
  <meta name="google-site-verification" content="oYp5PFy7iOQQx5URYjzRrVn_etEIbG1qLxoRQ3PPB-4" />

  <link rel="icon" href="/trench.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Trench Security" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content="https://www.trenchsecurity.ai" />
  <meta property="og:title" content="Trench | Agentic OS for Actionable SecOps" />
  <meta property="og:description" content="Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically." />
  <meta property="og:image" content="https://www.trenchsecurity.ai/logo/trench-logo.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Trench SecOps Platform" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://www.trenchsecurity.ai" />
  <meta name="twitter:title" content="Trench | Agentic OS for Actionable SecOps" />
  <meta name="twitter:description" content="Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically." />
  <meta name="twitter:image" content="https://www.trenchsecurity.ai/logo/trench-logo.png" />

  <!-- jQuery — kept for parity: GTM tags in container GTM-P4DNDLW4 may depend on it -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

  <!-- Google Tag Manager -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P4DNDLW4');
  </script>

  <!-- Google Analytics 4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-E1SQD3N78D"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-E1SQD3N78D');
  </script>

  <!-- Mailchimp connected site -->
  <script id="mcjs">
    !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/e293fdae0e4a09d187dabd8c1/5358e9752afc32c595d726957.js");
  </script>

  <!-- ContentSquare -->
  <script defer src="https://t.contentsquare.net/uxa/915bc8852a0d2.js"></script>

  <!-- Microsoft Clarity -->
  <script>
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y14biiygt7");
  </script>
  <!-- figma:head-end -->
</head>

<body style="background-color: #EDE7D9;">
  <!-- figma:body-start -->
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4DNDLW4"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
  </noscript>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
  <!-- figma:body-end -->
</body>

</html>
```

**5b. Wire Vercel Analytics — `src/main.tsx`**

```ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import { inject } from '@vercel/analytics'
import App from './App'
import './index.css'

inject()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**5c. Fire GA4 pageviews on client-side navigation — `src/App.tsx`**

An SPA loads `index.html` once, so `gtag('config', ...)` fires exactly one `page_view`. GA4 Enhanced Measurement *can* pick up History changes, but do not rely on a dashboard toggle for your primary traffic metric. Add an explicit event where the router already centralises route state.

Add near the other `useEffect` hooks (after the `popstate` effect around line 199):

```ts
  // GA4 + GTM pageview on SPA route change. index.html fires the first one.
  const isFirstRoute = React.useRef(true)
  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false
      return
    }
    const w = window as any
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'page_view', {
        page_path: currentRoute,
        page_location: window.location.href,
        page_title: document.title,
      })
    }
    w.dataLayer?.push({ event: 'spa_pageview', page_path: currentRoute })
  }, [currentRoute])
```

> Tell whoever owns GTM that `spa_pageview` is available as a custom-event trigger — several tags in `GTM-P4DNDLW4` may currently be firing on All Pages and will otherwise only fire once per session.

**5d. Delete the orphan**

```bash
rm src/layout.tsx
```

Check nothing referenced it (should print nothing):

```bash
grep -rn "layout" src --include="*.tsx" --include="*.ts" | grep -i "from.*layout"
```

> `src/loading.tsx` is also unreferenced. Harmless — leave or delete.

### ⚠️ Still unresolved from code alone

`MIGRATION-AUDIT.md` §4 flagged this and it still stands: **GTM container `GTM-P4DNDLW4` may fire tags that appear nowhere in either repo** — Hotjar, LinkedIn Insight Tag, Google Ads conversions, a consent platform. Export the container JSON and review it before cutover. No amount of code reading substitutes for that.

### Verify

```bash
npm run build
grep -c 'GTM-P4DNDLW4'   dist/index.html    # expect 2 (script + noscript)
grep -c 'G-E1SQD3N78D'   dist/index.html    # expect 2 (src + config)
grep -c 'y14biiygt7'     dist/index.html    # expect 1
grep -c '915bc8852a0d2'  dist/index.html    # expect 1
grep -c 'chimpstatic'    dist/index.html    # expect 1
grep -c 'oYp5PFy7iOQQ'   dist/index.html    # expect 1
grep -c 'G-XXXXXXXXXX'   dist/index.html    # expect 0
```

Then in a browser on the preview deployment: GTM Preview mode connects, GA4 Realtime shows the session, Clarity records, and navigating `/` → `/why-trench` → `/blog` produces three `page_view` events.

---

## 6. Blocker 5 — Five indexed URLs have no route

### Exact gap (verified by diffing sitemaps and `App.tsx`)

| URL | In old sitemap | In new sitemap | Route in `App.tsx` | Page file | Result today |
|---|---|---|---|---|---|
| `/how-it-works` | ✅ | ✅ | ❌ | ❌ | **404 — and it is in your own sitemap** |
| `/career/ai-lead-security-rd` | ✅ | ❌ dropped | ❌ | ❌ | **404 on an indexed URL** |
| `/career/ai-ml-lead` | ✅ | ❌ dropped | ❌ | ❌ | **404 on an indexed URL** |
| `/career/lead-agentic-secops` | ✅ | ❌ dropped | ❌ | ❌ | **404 on an indexed URL** |
| `/career/soc-analyst` | ✅ | ❌ dropped | ❌ | ❌ | **404 on an indexed URL** |
| `/blog/trench-agentic-secops-skills-vs-playbooks` | ✅ | ❌ dropped | ✅ works | ✅ in `postsData` | Route fine — **sitemap is just stale** |

Two distinct problems: four career pages and `/how-it-works` were **never ported**, and the sitemap was **hand-copied and drifted**. §9 removes the second problem permanently by generating the sitemap from the route table.

Also note `/how-it-works` is linked from the **Footer** on the old site, so it carries internal link equity, not just sitemap presence.

### 6a. Copy the five page files from the old repo

```bash
cd "c:/TRENCH/UX/Landing-Design"

# how-it-works
mkdir -p src/how-it-works
cp "$OLD/src/app/how-it-works/page.tsx" src/how-it-works/page.tsx

# the four missing career pages
for job in ai-lead-security-rd ai-ml-lead lead-agentic-secops soc-analyst; do
  mkdir -p "src/career/$job"
  cp "$OLD/src/app/career/$job/page.tsx" "src/career/$job/page.tsx"
done

# confirm
find src/how-it-works src/career -type f | sort
```

PowerShell:
```powershell
New-Item -ItemType Directory -Force src\how-it-works | Out-Null
Copy-Item "$OLD\src\app\how-it-works\page.tsx" src\how-it-works\page.tsx
foreach ($job in 'ai-lead-security-rd','ai-ml-lead','lead-agentic-secops','soc-analyst') {
  New-Item -ItemType Directory -Force "src\career\$job" | Out-Null
  Copy-Item "$OLD\src\app\career\$job\page.tsx" "src\career\$job\page.tsx"
}
```

### 6b. Strip the Next.js-isms from each copied file

Each old page starts with a `Metadata` export that has no meaning here (metadata now lives in the §9 route table). In **all five** files:

1. **Delete the metadata export and its import:**

```diff
-import type { Metadata } from "next";
-
-export const metadata: Metadata = {
-  title: "SOC Analyst (Level 1-2) | Careers",
-  description: "Join Trench as a SOC Analyst and be on the frontline...",
-};
```

   Keep the titles/descriptions handy — you will paste them into `seo/routes.ts` in §9.

2. **Leave `next/image`, `next/link` and `next/navigation` imports alone.** `vite.config.ts` already aliases all three to `src/compat/` shims, along with `@/components/animations/ScrollReveal`, `TextReveal`, `BrandBanner`, `CTASection`, `HeadlessSecOpsModes`, `Section3Visual` and `ui/Button`. The existing ported pages rely on exactly this.

3. **Check for any other `@/components/*` import** that has no shim:

```bash
grep -hoE "from '@/components/[^']*'" src/how-it-works/page.tsx src/career/*/page.tsx | sort -u
```

   Cross-check each hit against the alias list in `vite.config.ts` and against `ls src/compat`. Anything unaliased needs either a shim or an inline replacement.

4. **Match the new visual theme.** The old pages use the old palette (`#0D41E1` brand blue); this codebase uses cream/navy (`#EDE7D9` background, `#3152B9` blue). Compare against the already-ported `src/career/product-marketing-intern/page.tsx` and align colours, spacing and the `page-main` wrapper the same way.

### 6c. Wire the routes — `src/App.tsx`

Add to the import block (after line 15, `ProductMarketingInternPage`):

```ts
import HowItWorksPage from './how-it-works/page'
import AiLeadSecurityRdPage from './career/ai-lead-security-rd/page'
import AiMlLeadPage from './career/ai-ml-lead/page'
import LeadAgenticSecOpsPage from './career/lead-agentic-secops/page'
import SocAnalystPage from './career/soc-analyst/page'
```

Add to `getRouteComponent()` — immediately after the existing `product-marketing-intern` check (around line 288):

```ts
    if (path === '/how-it-works') {
      return <HowItWorksPage />
    }
    if (path === '/career/ai-lead-security-rd') {
      return <AiLeadSecurityRdPage />
    }
    if (path === '/career/ai-ml-lead') {
      return <AiMlLeadPage />
    }
    if (path === '/career/lead-agentic-secops') {
      return <LeadAgenticSecOpsPage />
    }
    if (path === '/career/soc-analyst') {
      return <SocAnalystPage />
    }
```

### 6d. Restore the four jobs to the careers listing

`src/career/page.tsx` currently has a one-entry `jobs` array (only the intern role). Copy the four missing entries from the old listing — `$OLD/src/app/career/CareerListings.tsx` and `$OLD/src/app/career/page.tsx` — keeping the exact `link` paths:

```ts
{ /* ...title, type, description from the old repo... */ link: "/career/ai-lead-security-rd" },
{ /* ... */ link: "/career/ai-ml-lead" },
{ /* ... */ link: "/career/lead-agentic-secops" },
{ /* ... */ link: "/career/soc-analyst" },
```

> If any of those four roles is genuinely closed, **do not just delete the URL** — it is indexed and has inbound links. Add a `redirects` entry in `vercel.json` pointing it to `/career` with a `301`:
> ```json
> "redirects": [
>   { "source": "/career/soc-analyst", "destination": "/career", "permanent": true }
> ]
> ```

### 6e. Restore the Footer link to `/how-it-works`

The old Footer links it under Company. Confirm the new footer (in `src/App.tsx`) carries all five: `/why-trench`, `/for-mssps`, `/integrations`, `/how-it-works`, `/career`.

```bash
grep -nE "'/why-trench'|'/for-mssps'|'/integrations'|'/how-it-works'|'/career'" src/App.tsx
```

### Verify

```bash
npm run build
npx vercel dev --listen 3000
for p in /how-it-works /career/ai-lead-security-rd /career/ai-ml-lead \
         /career/lead-agentic-secops /career/soc-analyst; do
  printf '%-40s %s\n' "$p" "$(curl -so /dev/null -w '%{http_code}' http://localhost:3000$p)"
done
```

All five must return `200` **and** render real content — open each in a browser; the SPA fallback returns 200 even for the "404 Page Not Found" component, so status alone is not proof.

---

## 7. Blocker 6 — Zero environment variables

### The two-runtime rule

| Runtime | How to read config | Notes |
|---|---|---|
| **Browser bundle** (`src/**`) | `import.meta.env.VITE_*` | `process.env` **does not exist**. Anything here is public — never put a secret in a `VITE_` var. |
| **Serverless functions** (`api/**`) | `process.env.*` | Real Node runtime on Vercel. Secrets are safe here. |
| **Build config** (`vite.config.ts`) | `process.env.*` | Runs in Node at build time. Already does this for `FIGMA_PUBLIC_URL` / `PORT` — fine. |

Good news: a grep confirms **no file under `src/` reads `process.env` or `import.meta.env`**. The only offenders were `src/api/**`, which §4a deleted. So there is nothing to migrate — only to *provide*, for the new `api/` functions.

### 7a. Create `.env.example` (commit this)

```bash
cat > .env.example <<'EOF'
# ─── Server-only (Vercel serverless functions in api/) ───────────────────────
# Google Apps Script Web App endpoint. Receives Connect / MSSP / BPL form
# payloads and writes them to the Google Sheet + sends transactional email.
# See MIGRATION-AUDIT.md section 5.3.
GOOGLE_APPS_SCRIPT_URL=

# Where form notifications are sent from/to (used by the Apps Script itself;
# kept here for reference and future server-side email fallback).
ADMIN_EMAIL=ask@trenchsecurity.ai

# ─── Client-exposed (must be prefixed VITE_, ends up in the JS bundle) ───────
# Nothing required today. Forms POST to relative /api/* paths.
# VITE_SITE_URL=https://www.trenchsecurity.ai
EOF
```

### 7b. Create your local `.env` (never commit)

```bash
cat > .env <<'EOF'
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbwMckarxMykK9AW8s60Fc5DJxEhi41Ahwh28ssz2zqdraQpAfY1uQb4BbFylwcQWzC7/exec
ADMIN_EMAIL=ask@trenchsecurity.ai
EOF
```

### 7c. Confirm `.gitignore` covers env files

```bash
grep -qE '^\.env' .gitignore || printf '\n# env\n.env\n.env.*\n!.env.example\n' >> .gitignore
grep -n "env" .gitignore
```

### 7d. Set the variables in Vercel

Vercel dashboard → Project → **Settings → Environment Variables**. Add to **Production, Preview and Development**:

| Name | Value |
|---|---|
| `GOOGLE_APPS_SCRIPT_URL` | `https://script.google.com/macros/s/AKfycbwMckarxMykK9AW8s60Fc5DJxEhi41Ahwh28ssz2zqdraQpAfY1uQb4BbFylwcQWzC7/exec` |
| `ADMIN_EMAIL` | `ask@trenchsecurity.ai` |

Or via CLI:

```bash
npx vercel env add GOOGLE_APPS_SCRIPT_URL production
npx vercel env add GOOGLE_APPS_SCRIPT_URL preview
npx vercel env add GOOGLE_APPS_SCRIPT_URL development
npx vercel env add ADMIN_EMAIL production
```

> **Deliberate improvement.** The old repo used `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`, which shipped an unauthenticated webhook URL into the browser bundle (audit defect #8). It is only ever read server-side, so the prefix is dropped here. The old `NEXT_PUBLIC_GOOGLE_SHEET_URL` and `NEXT_PUBLIC_GOOGLE_SHEET_ID` were never read by code at all and are not carried over.

### Verify

```bash
npm run build
grep -rl "script.google.com" dist/assets/ 2>/dev/null && echo "LEAK: Apps Script URL is in the client bundle" || echo "OK: no Apps Script URL in client bundle"
```

---

## 8. Blocker 7 (found in this pass) — Broken favicon & OG image

Not in your list of six, but it ships broken.

| Reference | In `index.html` | Reality |
|---|---|---|
| `og:image` / `twitter:image` | `https://www.trenchsecurity.ai/logo/trench-og-image.png` | ❌ **`public/logo/trench-og-image.png` does not exist** → every social preview has no image |
| favicon | `/src/imports/Icon.png` | Builds to `/assets/Icon-zB2oErOc.png` — works, but a **source path in `index.html` is fragile** and diverges from the old site's `/trench.svg` |
| `apple-touch-icon` | not referenced | ❌ Missing here *and* in the old repo (audit defect #5) |
| `public/trench.svg` | — | ❌ Missing (old site's favicon) |

### Fix

```bash
cd "c:/TRENCH/UX/Landing-Design"

# 1. Favicon parity with the live site
cp "$OLD/public/trench.svg" public/trench.svg

# 2. OG image — reuse the 1200x630 logo the old site uses
cp "$OLD/public/logo/trench-logo.png" public/logo/trench-og-image.png

# 3. Verify
for f in trench.svg logo/trench-og-image.png logo/trench-logo.png; do
  [ -e "public/$f" ] && echo "OK      public/$f" || echo "MISSING public/$f"
done
```

**4. Create `public/apple-touch-icon.png`** — a 180×180 PNG of the Trench mark. Export from `public/logo/Icon.webp` or the brand kit. (The old site references this path and 404s; fixing it here closes a long-standing gap.)

The `index.html` in §5a already points at `/trench.svg` and `/apple-touch-icon.png`, and at `/logo/trench-logo.png` for OG — so once these files exist, that block is correct.

> **Recommended follow-up:** design a purpose-built 1200×630 OG card rather than reusing the logo. `trench-logo.png` is a logo, not a social card — it will letterbox in LinkedIn and X. Ship the copy now, improve the asset later.

---

## 9. The durable fix — prerender + generated sitemap

**Do §2, §5, §6 and §8 first.**

### What this solves

| Problem | Before | After |
|---|---|---|
| Social previews on 40 URLs | Every share shows the homepage card | Correct per-page title, description and image |
| Per-route `<title>` / description / canonical | One set for all 40 URLs | Real per-route metadata in the HTML response |
| `BlogPosting` JSON-LD (15 posts) | Gone (was in the old `blog/[slug]/page.tsx`) | Restored |
| Sitemap drift (blocker 5's second half) | Hand-copied, 5 URLs already missing | Generated from the route table — cannot drift |
| Crawl reliability | Depends on JS rendering | Static HTML at every path |
| `robots.txt` correctness | Overwritten by the Figma plugin | Written explicitly by the build |

The script copies `dist/index.html` once per route, rewrites the head tags, and writes `dist/<route>/index.html`. The SPA still hydrates and takes over navigation — nothing about the runtime UX changes. Crawlers and unfurlers get real HTML; users get the SPA.

### 9a. Create `seo/routes.ts`

Static route metadata, transcribed from `MIGRATION-AUDIT.md` §8.2. Blog and announcement routes are derived from the data files, so they are not listed here.

```ts
// Per-route SEO metadata. Consumed by scripts/prerender-seo.ts to emit static
// HTML and sitemap.xml. Values mirror MIGRATION-AUDIT.md section 8.2 so the new
// site keeps the exact titles, descriptions and canonicals Google has indexed.

export const SITE_URL = 'https://www.trenchsecurity.ai'
export const SITE_NAME = 'Trench Security'
export const TITLE_TEMPLATE = (t: string) => `${t} | Trench Security`
export const DEFAULT_TITLE = 'Trench | Agentic OS for Actionable SecOps'
export const DEFAULT_DESCRIPTION =
  "Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically."
export const DEFAULT_OG_IMAGE = '/logo/trench-logo.png'

export type RouteMeta = {
  path: string
  title: string          // already fully formed — no template applied
  description: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

export const STATIC_ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  {
    path: '/why-trench',
    title: TITLE_TEMPLATE('Why Trench'),
    description:
      'Security Operations is a systems design problem. Not a monitoring problem. Learn why we built Trench to fix it.',
  },
  {
    path: '/how-it-works',
    title: TITLE_TEMPLATE('How It Works'),
    description:
      'Trench simplifies security operations by unifying visibility, detection, and response into a single, automated workflow.',
  },
  {
    path: '/integrations',
    title: TITLE_TEMPLATE('Integrations'),
    description:
      'Agentless, API-native integrations across your entire security stack. Trench connects to your tools in minutes — no agents, no friction.',
  },
  {
    path: '/for-mssps',
    title: TITLE_TEMPLATE('MSSPs'),
    description:
      'Offer your clients the new operating system for Security Operations. Co-sell Trench and deliver Headless SecOps to every client, without rebuilding your delivery model.',
  },
  {
    path: '/connect',
    title: TITLE_TEMPLATE('Connect'),
    description:
      'You cannot run a modern security operation on a legacy system. Let us show you what the new operating system looks like for your stack.',
  },
  {
    path: '/career',
    title: TITLE_TEMPLATE('Careers'),
    description: 'Join Trench and help us build the future of agentic security operations.',
  },
  {
    path: '/career/ai-lead-security-rd',
    title: TITLE_TEMPLATE('AI Lead, Security R&D | Careers'),
    description:
      'Join Trench as AI Lead, Security R&D and build the technical foundation behind agentic Security Operations.',
  },
  {
    path: '/career/ai-ml-lead',
    title: TITLE_TEMPLATE('AI/ML Lead, Applied AI for Security | Careers'),
    description:
      "Join Trench as AI/ML Lead, Applied AI for Security and build the models that power Trench's detection brain.",
  },
  {
    path: '/career/lead-agentic-secops',
    title: TITLE_TEMPLATE('Lead, Agentic SecOps | Careers'),
    description:
      'Join Trench as Lead, Agentic SecOps and drive customer transformation from traditional SOC to an agentic operating model.',
  },
  {
    path: '/career/product-marketing-intern',
    title: TITLE_TEMPLATE('Product Marketing Intern | Careers'),
    description:
      "Join Trench as a Product Marketing Intern and own Trench's voice and product messaging.",
  },
  {
    path: '/career/soc-analyst',
    title: TITLE_TEMPLATE('SOC Analyst (Level 1-2) | Careers'),
    description:
      'Join Trench as a SOC Analyst and be on the frontline of our Security Operations Center, helping identify, assess, and respond to cyber threats.',
  },
  {
    path: '/blog',
    title: TITLE_TEMPLATE('Blog'),
    description:
      'Insights, research, and perspectives on AI-native SecOps, agentic automation, and the future of security operations — for security champions who think differently.',
    image: '/blog-cover-images/introducing-headless-secops-for-the-agentic-world.webp',
  },
  {
    path: '/announcements',
    title: 'Announcements | Trench Security',
    description:
      'Stay up to date with the latest news, awards, and milestones from Trench Security — the agentic SecOps platform built for actionable threat detection and response.',
    image: '/awards/2025 Products Awards Winner.png',
  },
  {
    path: '/case-studies/ocrolus',
    title: TITLE_TEMPLATE('Ocrolus Case Study'),
    description:
      'How Ocrolus modernised security operations with Trench — faster detection, less noise, and a lean team operating like an enterprise SOC.',
  },
  {
    path: '/case-studies/sbfe',
    title: TITLE_TEMPLATE('SBFE Case Study'),
    description:
      'How SBFE cut alert noise and accelerated investigation with Trench’s agentic SecOps platform.',
  },
  {
    path: '/case-studies/whatfix',
    title: TITLE_TEMPLATE('Whatfix Case Study'),
    description:
      'How Whatfix scaled threat detection and response without scaling headcount, using Trench.',
  },
  {
    path: '/resources/trench-labs',
    title: TITLE_TEMPLATE('Trench Labs'),
    description:
      'Original security research, threat reports and technical deep dives from the Trench Labs team.',
  },
  {
    path: '/resources/webinars',
    title: TITLE_TEMPLATE('Webinars'),
    description:
      'On-demand webinars on agentic SecOps, AI-native detection engineering and modern SOC operating models.',
  },
  {
    path: '/resources/community',
    title: TITLE_TEMPLATE('Community'),
    description:
      'Join the Trench security community — the BlueTeam Premier League, events and practitioner meetups.',
  },
  {
    path: '/resources/community/bpl-signup',
    title: TITLE_TEMPLATE('BlueTeam Premier League Signup'),
    description:
      'Sign up for the BlueTeam Premier League — Trench’s community competition for security practitioners.',
  },
  {
    path: '/resources/events',
    title: TITLE_TEMPLATE('Events'),
    description:
      'Upcoming and past Trench Security events, conferences and community meetups.',
  },
  {
    path: '/newsletter-signup',
    title: TITLE_TEMPLATE('Subscribe to Trench Digest'),
    description:
      'Get weekly zero-day breakdowns, cloud defense blueprints, and actionable security insights—straight from the digital trenches.',
  },
  {
    path: '/newsletter-signout',
    title: TITLE_TEMPLATE('Unsubscribe from Trench Digest'),
    description: 'Unsubscribe from the Trench Security newsletter.',
  },
  {
    // Excluded from the sitemap on the old site; pricing tiers are commercially
    // sensitive. Prerendered so the page works, but kept out of the index.
    path: '/pricing',
    title: TITLE_TEMPLATE('Pricing'),
    description: 'Trench pricing and packaging.',
    noindex: true,
  },
]
```

> **Fill in the real copy** for the three case studies and five resources pages. The descriptions above are placeholders written from context — those eight pages have **no metadata at all** in the old repo (they are `'use client'`, audit defect #2), so there is nothing authoritative to copy. Have marketing approve them.

### 9b. Create `scripts/prerender-seo.ts`

```ts
/**
 * Post-build SEO pass.
 *
 * 1. Clones dist/index.html once per route, rewriting the head so each URL
 *    serves its own title / description / canonical / OG / Twitter tags.
 *    Social unfurlers (LinkedIn, X, Slack) never execute JS, so this is the
 *    only way an SPA can produce correct share cards.
 * 2. Injects BlogPosting JSON-LD on blog posts (parity with the old Next app).
 * 3. Generates sitemap.xml and robots.txt from the same route table, so the
 *    sitemap can never drift from the routes that actually exist.
 *
 * Run automatically via the `postbuild` npm script.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { postsData } from '../src/blog/postsData'
import { announcementsData } from '../src/announcements/announcementsData'
import {
  STATIC_ROUTES,
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  TITLE_TEMPLATE,
  type RouteMeta,
} from '../seo/routes'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

// ── helpers ──────────────────────────────────────────────────────────────────

const abs = (p: string) =>
  p.startsWith('http') ? p : `${SITE_URL}${p.startsWith('/') ? '' : '/'}${encodeURI(p)}`

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const stripHtml = (s: string) =>
  s.replace(/<[^>]+>/g, '').replace(/&#\d+;/g, '').replace(/\s+/g, ' ').trim()

/** Replaces a <meta name="..."> / <meta property="..."> content value. */
function setMeta(html: string, kind: 'name' | 'property', key: string, value: string): string {
  const re = new RegExp(`(<meta\\s+${kind}="${key}"\\s+content=")[^"]*(")`, 'i')
  if (re.test(html)) return html.replace(re, `$1${escapeAttr(value)}$2`)
  // Not in the template — append before </head> so nothing is silently dropped.
  return html.replace(
    '</head>',
    `  <meta ${kind}="${key}" content="${escapeAttr(value)}" />\n</head>`,
  )
}

function setTitle(html: string, title: string): string {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(title)}</title>`)
}

function setCanonical(html: string, url: string): string {
  return html.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${escapeAttr(url)}$2`,
  )
}

function injectBeforeHeadEnd(html: string, snippet: string): string {
  return html.replace('</head>', `${snippet}\n</head>`)
}

// ── build the full route table ───────────────────────────────────────────────

type Route = RouteMeta & { jsonLd?: object; lastmod?: string }

function buildRoutes(): Route[] {
  const routes: Route[] = STATIC_ROUTES.map((r) => ({ ...r }))

  // 15 blog posts
  for (const post of postsData) {
    const description = stripHtml(post.description).substring(0, 160).trim()
    routes.push({
      path: `/blog/${post.slug}`,
      title: TITLE_TEMPLATE(post.title),
      description,
      image: post.image,
      type: 'article',
      lastmod: post.modifiedTime,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        image: abs(post.image),
        datePublished: post.publishedTime,
        dateModified: post.modifiedTime,
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          // Old repo pointed at /logo.png, which 404s (audit defect #4). Fixed.
          logo: { '@type': 'ImageObject', url: abs('/logo/trench-logo.png') },
        },
        description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${post.slug}`,
        },
      },
    })
  }

  // announcements
  for (const item of announcementsData) {
    routes.push({
      path: `/announcements/${item.slug}`,
      title: TITLE_TEMPLATE(item.title),
      description: item.seoDescription,
      image: item.coverImage ?? DEFAULT_OG_IMAGE,
      type: 'article',
      lastmod: item.publishedISO,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: item.title,
        image: abs(item.coverImage ?? DEFAULT_OG_IMAGE),
        datePublished: item.publishedISO,
        description: item.seoDescription,
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: abs('/logo/trench-logo.png') },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/announcements/${item.slug}`,
        },
      },
    })
  }

  return routes
}

// ── site-wide JSON-LD, injected on the homepage ──────────────────────────────

const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs('/logo/trench-logo.png'),
  sameAs: ['https://www.linkedin.com/company/trenchsecurity/'],
  contactPoint: [
    { '@type': 'ContactPoint', email: 'ask@trenchsecurity.ai', contactType: 'sales' },
  ],
}

// ── main ─────────────────────────────────────────────────────────────────────

function main() {
  const shellPath = join(DIST, 'index.html')
  if (!existsSync(shellPath)) {
    throw new Error(`dist/index.html not found — run "vite build" first.`)
  }

  const shell = readFileSync(shellPath, 'utf8')
  const routes = buildRoutes()
  const seen = new Set<string>()

  for (const route of routes) {
    if (seen.has(route.path)) {
      throw new Error(`Duplicate route in table: ${route.path}`)
    }
    seen.add(route.path)

    const url = route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`
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

    if (route.noindex) {
      html = setMeta(html, 'name', 'robots', 'noindex, nofollow')
    }

    const ld: object[] = []
    if (route.jsonLd) ld.push(route.jsonLd)
    if (route.path === '/') ld.push(ORGANIZATION_JSONLD)
    for (const obj of ld) {
      html = injectBeforeHeadEnd(
        html,
        `  <script type="application/ld+json">${JSON.stringify(obj)}</script>`,
      )
    }

    // '/' is dist/index.html itself; everything else gets dist/<path>/index.html
    const outPath =
      route.path === '/' ? shellPath : join(DIST, route.path, 'index.html')
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html, 'utf8')
  }

  // ── sitemap.xml (excludes noindex routes, matching the old exclude list) ──
  const now = new Date().toISOString()
  const indexable = routes.filter((r) => !r.noindex)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((r) => {
    const loc = r.path === '/' ? SITE_URL : `${SITE_URL}${r.path}`
    return `<url><loc>${escapeXml(loc)}</loc><lastmod>${
      r.lastmod ?? now
    }</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`
  })
  .join('\n')}
</urlset>
`
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8')

  // ── robots.txt — written explicitly so nothing can ever emit Disallow: / ──
  writeFileSync(
    join(DIST, 'robots.txt'),
    `# *
User-agent: *
Allow: /

# Host
Host: ${SITE_URL}

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
`,
    'utf8',
  )

  console.log(
    `[prerender-seo] ${routes.length} routes written ` +
      `(${indexable.length} in sitemap), robots.txt regenerated.`,
  )
}

main()
```

### 9c. Wire it into the build — `package.json`

```diff
   "scripts": {
     "dev": "vite --host 0.0.0.0",
     "build": "vite build",
+    "postbuild": "tsx scripts/prerender-seo.ts",
+    "typecheck": "tsc --noEmit",
     "preview": "vite preview",
     "format": "oxfmt"
   },
```

`npm run build` triggers `postbuild` automatically, so Vercel needs no extra configuration.

> Add `typecheck` to CI (or at least run it before every deploy). The absence of a typecheck in `build` is precisely why two files importing a non-existent `next` package sat in the tree undetected.

### 9d. Also drop `public/sitemap.xml`

It is now generated. Keeping a stale hand-copy invites the same drift that caused blocker 5.

```bash
git rm public/sitemap.xml
```

Keep `public/robots.txt` — harmless, and the script overwrites it in `dist/` anyway.

### Verify

```bash
npm run build

# route count
find dist -name index.html | wc -l          # expect 41 (40 routes + the / shell)

# sitemap freshness — must contain all 5 previously missing URLs
for u in /how-it-works /career/ai-lead-security-rd /career/ai-ml-lead \
         /career/lead-agentic-secops /career/soc-analyst \
         /blog/trench-agentic-secops-skills-vs-playbooks; do
  grep -q "$u<" dist/sitemap.xml && echo "OK      $u" || echo "MISSING $u"
done

# /pricing must be excluded and noindexed
grep -q "/pricing<" dist/sitemap.xml && echo "FAIL: pricing in sitemap" || echo "OK: pricing excluded"
grep -q 'noindex' dist/pricing/index.html && echo "OK: pricing noindexed" || echo "FAIL"

# per-route metadata actually differs
grep -o '<title>[^<]*' dist/index.html
grep -o '<title>[^<]*' dist/why-trench/index.html
grep -o '<title>[^<]*' dist/blog/modernizing-soc-using-agentic-ai/index.html

# per-post OG image
grep -o 'og:image" content="[^"]*' dist/blog/modernizing-soc-using-agentic-ai/index.html

# JSON-LD present on posts
grep -c 'application/ld+json' dist/blog/modernizing-soc-using-agentic-ai/index.html   # expect 1
grep -c 'application/ld+json' dist/index.html                                          # expect 1 (Organization)
```

Then validate a post URL in [Google's Rich Results Test](https://search.google.com/test/rich-results) and a couple of URLs in the **LinkedIn Post Inspector** once deployed.

---

## 10. Asset parity sweep

`public/` here has 301 files; the old site's has ~300 across the same directory names, so the bulk was copied. Confirm nothing referenced is missing.

```bash
cd "c:/TRENCH/UX/Landing-Design"

# Every /public path referenced from src — report anything that does not resolve
grep -rhoE '"(/[A-Za-z0-9 _%().,-]+\.(png|jpg|jpeg|webp|svg|gif|pdf|mp4|avif))"' src \
  --include="*.tsx" --include="*.ts" | tr -d '"' | sort -u | while read -r p; do
  [ -e "public$p" ] || echo "MISSING $p"
done
```

Already confirmed clean: all **15 blog cover images** resolve, and `public/robots.txt`, `public/sitemap.xml`, `public/googlec87b45408e1ef533.html`, `public/logo/trench-logo.png`, `public/castle.mp4`, `public/TRENCH SIGNAL.pdf` are all present.

### Carry-over items worth fixing now

| Item | Action |
|---|---|
| `public/TRENCH SIGNAL.pdf` — **12.2 MB** in the repo | Move to Vercel Blob / S3 and update the `/resources/trench-labs` link. Filenames with spaces are fragile; rename to `trench-signal.pdf` if you keep it local. |
| `public/fonts/` — ~110 unused static weights | Only the two variable TTFs load. Prune (large deploy-size win). |
| `public/mc.js`, `public/file.svg`, `public/next.svg`, `public/globe.svg` | Unreferenced leftovers. Delete. |
| Filenames with spaces (`2025 Products Awards Winner.png`, `headless secops/`, `datalake 1.png`) | Normalise to kebab-case **and** update every reference, including `seo/routes.ts`. |

> **Do not touch** `public/BPL/BPL LOGO.png` or `public/logo/trench-logo.png` filenames. `scripts/code.gs` in the old repo hardcodes them via `raw.githubusercontent.com/chandrasekar-velu23/trench-home/refs/heads/main/...` for transactional email logos. See §12 for the required Apps Script change.

---

## 11. Verification

### 11a. Add a build assertion script

Create `scripts/verify-build.sh` and run it after every build. It fails loudly on any regression of the seven blockers.

```bash
#!/usr/bin/env bash
set -uo pipefail
FAIL=0
chk() { # chk <label> <expected> <actual>
  if [ "$2" = "$3" ]; then printf '  ✅ %s\n' "$1"
  else printf '  ❌ %s (expected %s, got %s)\n' "$1" "$2" "$3"; FAIL=1; fi
}

echo "── Blocker 1: indexability & social metadata ──"
chk "robots.txt allows crawling" 1 "$(grep -c 'Allow: /' dist/robots.txt)"
chk "no Disallow: /"             0 "$(grep -c 'Disallow: /' dist/robots.txt)"
chk "single robots meta"         1 "$(grep -c 'name="robots"' dist/index.html)"
chk "no noindex"                 0 "$(grep -c 'noindex' dist/index.html)"
chk "no Figma Make App og:title" 0 "$(grep -c 'Figma Make App' dist/index.html)"
chk "single description meta"    1 "$(grep -c 'name="description"' dist/index.html)"

echo "── Blocker 4: tracking stack ──"
chk "GTM present"        2 "$(grep -c 'GTM-P4DNDLW4' dist/index.html)"
chk "GA4 present"        2 "$(grep -c 'G-E1SQD3N78D' dist/index.html)"
chk "no GA placeholder"  0 "$(grep -c 'G-XXXXXXXXXX' dist/index.html)"
chk "Clarity present"    1 "$(grep -c 'y14biiygt7' dist/index.html)"
chk "ContentSquare"      1 "$(grep -c '915bc8852a0d2' dist/index.html)"
chk "Mailchimp"          1 "$(grep -c 'chimpstatic' dist/index.html)"
chk "GSC meta token"     1 "$(grep -c 'oYp5PFy7iOQQ' dist/index.html)"

echo "── Blocker 5 + section 9: routes & sitemap ──"
for u in /how-it-works /career/ai-lead-security-rd /career/ai-ml-lead \
         /career/lead-agentic-secops /career/soc-analyst \
         /blog/trench-agentic-secops-skills-vs-playbooks; do
  chk "sitemap has $u" 1 "$(grep -c "$u<" dist/sitemap.xml)"
  chk "prerendered $u" 1 "$([ -f "dist$u/index.html" ] && echo 1 || echo 0)"
done
chk "pricing excluded from sitemap" 0 "$(grep -c '/pricing<' dist/sitemap.xml)"

echo "── Blocker 6: no secret leaked to the client ──"
chk "Apps Script URL not in bundle" 0 \
  "$(grep -rl 'script.google.com' dist/assets/ 2>/dev/null | wc -l | tr -d ' ')"

echo "── Blocker 7: assets ──"
for f in trench.svg apple-touch-icon.png logo/trench-og-image.png logo/trench-logo.png; do
  chk "public/$f exists" 1 "$([ -f "dist/$f" ] && echo 1 || echo 0)"
done

echo
[ "$FAIL" -eq 0 ] && echo "ALL CHECKS PASSED" || { echo "BUILD VERIFICATION FAILED"; exit 1; }
```

```bash
chmod +x scripts/verify-build.sh
npm run build && ./scripts/verify-build.sh
```

### 11b. Local runtime checks

```bash
npx vercel dev --listen 3000
```

| Check | Expected |
|---|---|
| `curl -sI localhost:3000/why-trench \| head -1` | `200` |
| `curl -sI localhost:3000/blog/modernizing-soc-using-agentic-ai \| head -1` | `200` |
| `curl -s localhost:3000/blog/modernizing-soc-using-agentic-ai \| grep -o '<title>[^<]*'` | the **post** title, not the homepage title |
| `curl -sI -X GET localhost:3000/api/submit-form \| head -1` | `405` |
| Connect form, valid data | success screen **and** a new row in the `Form Submissions` tab |
| Connect form with `GOOGLE_APPS_SCRIPT_URL` unset | **visible error message**, not a fake thank-you |
| BPL form with `a@gmail.com` | rejection message about company email |
| Hard-refresh on `/resources/webinars` | page renders, no 404 |
| Navigate `/` → `/why-trench` → `/blog` | three GA4 `page_view` events in the Network tab |

### 11c. Post-deploy checks (preview URL)

```bash
PREVIEW="https://<your-preview>.vercel.app"

curl -s "$PREVIEW/robots.txt"
curl -s "$PREVIEW/sitemap.xml" | grep -c "<loc>"          # expect 39
curl -s "$PREVIEW/googlec87b45408e1ef533.html"
curl -sI "$PREVIEW/" | grep -iE "x-frame-options|x-content-type|referrer-policy|permissions-policy|x-xss"
curl -sI "$PREVIEW/integrations/aws.png" | grep -i cache-control   # 31536000, immutable
```

Then: GTM Preview connects · GA4 Realtime shows the session · Clarity records · LinkedIn Post Inspector on `$PREVIEW/blog/<slug>` shows the **post's** card · Rich Results Test finds `BlogPosting`.

---

## 12. Deploy & cutover

### 12a. Recommended path — reuse the existing Vercel project

The live domain, DNS and SSL are already attached to Vercel project **`trench-home`** (`prj_db2mW1d0fdPgf5vwGDy6xuGkA5dW`, org `team_VO319051phyld1JVUugmJ0B6`). Pointing that project at the new repo keeps the domain and certificates untouched — no DNS change, no propagation window, and instant rollback via Vercel's deployment history.

1. Push this branch, open a PR, merge to `main` in the **new** repo.
2. Vercel → project `trench-home` → **Settings → Git** → change the connected repository to the new one.
3. Vercel → **Settings → Build & Development Settings** → confirm Framework = **Vite**, Build Command = `npm run build`, Output Directory = `dist`. (`vercel.json` already declares these.)
4. Add the §7d environment variables **before** the first production deploy.
5. Deploy to **Preview** first. Run §11c against the preview URL.
6. Only then **Promote to Production**.

**Alternative** — create a fresh Vercel project, verify on its preview URL, then move the `www.trenchsecurity.ai` and apex domains over. Cleaner separation, but incurs a DNS/SSL step. Lower the DNS TTL to 300 s at least 24 h beforehand if you go this way.

### 12b. Before you promote

- [ ] **Export the GTM container `GTM-P4DNDLW4`** and inventory every tag. Hotjar, LinkedIn Insight Tag, Ads conversions and any consent tool live there and are invisible to both repos. Re-point anything that assumed a multi-page-load site at the `spa_pageview` event from §5c.
- [ ] **Update `scripts/code.gs` in Google Apps Script.** `BRAND_LOGO_URL` and `BPL_LOGO_URL` are hardcoded to `raw.githubusercontent.com/chandrasekar-velu23/trench-home/refs/heads/main/...`. If the new UI lives in a different repo, **every transactional email loses its logo**. Change both to `https://www.trenchsecurity.ai/logo/trench-logo.png` and `https://www.trenchsecurity.ai/BPL/BPL%20LOGO.png`, then redeploy the Web App. Also remove the test functions containing a personal email address (`code.gs:482, 508, 520, 529`).
- [ ] Confirm the Apps Script deployment is live and "Who has access" is unchanged.
- [ ] Confirm `FROM_ALIAS` (`ask@trenchsecurity.ai`) is still verified in Gmail → Accounts → Send mail as.
- [ ] Confirm all three Google Sheet tabs exist: `Form Submissions`, `Job Applications`, `BPL Submissions`.
- [ ] Snapshot the baseline: GA4 traffic, GSC coverage and impressions, Lighthouse scores.
- [ ] Note the current production deployment ID in Vercel — your rollback target.

### 12c. Immediately after promoting

```bash
curl -s https://www.trenchsecurity.ai/robots.txt              # Allow: /
curl -s https://www.trenchsecurity.ai/sitemap.xml | grep -c "<loc>"
curl -s https://www.trenchsecurity.ai/googlec87b45408e1ef533.html
curl -sI https://www.trenchsecurity.ai/how-it-works | head -1  # 200
```

Then submit one **real** Connect form and confirm the row lands in the Google Sheet. Do not skip this — it is the check that would have caught blocker 3.

### 12d. First 72 hours

- [ ] Re-submit the sitemap in Google Search Console.
- [ ] Watch GSC Coverage for new errors (especially soft 404s from the §3 catch-all).
- [ ] GA4 sessions within normal variance of the baseline.
- [ ] Clarity and ContentSquare recording sessions.
- [ ] Form submissions arriving in all relevant Sheet tabs.
- [ ] Vercel logs: no spike in 4xx/5xx, no `api/*` function errors.
- [ ] Keep the previous deployment promotable for **at least 7 days**.

---

## 13. Acceptance checklist

Nothing ships to production until every P0 row is ticked.

### P0 — blocks deployment

- [ ] `dist/robots.txt` contains `Allow: /` and **no** `Disallow: /`
- [ ] Exactly **one** `robots`, `description`, `og:title` and `og:description` meta per page
- [ ] **Zero** occurrences of `noindex` or `Figma Make App` anywhere in `dist/`
- [ ] `vercel.json` present: catch-all rewrite excluding `/api/`, `cleanUrls`, `trailingSlash: false`, 5 security headers, integrations cache header
- [ ] Every one of the 40 routes returns **200** and renders real content (not the SPA 404 component)
- [ ] `src/api/` deleted; `api/submit-form.ts`, `api/community-signup.ts`, `api/_lib/forms.ts` created
- [ ] `POST /api/submit-form` writes a row to the `Form Submissions` tab — verified with a real submission
- [ ] `POST /api/community-signup` writes a row to the `BPL Submissions` tab and rejects `gmail.com`
- [ ] **No form shows success when the backend fails** — verified by unsetting `GOOGLE_APPS_SCRIPT_URL`
- [ ] `GET /api/submit-form` returns **405**, not HTML
- [ ] GTM `GTM-P4DNDLW4` fires (verified in GTM Preview) and the `<noscript>` iframe is the first element in `<body>`
- [ ] GA4 `G-E1SQD3N78D` fires `page_view` on load **and** on SPA navigation
- [ ] Clarity `y14biiygt7`, ContentSquare `915bc8852a0d2`, Mailchimp connected-site script all load
- [ ] Vercel Analytics reporting
- [ ] GSC meta token `oYp5PFy7iOQQx5URYjzRrVn_etEIbG1qLxoRQ3PPB-4` in `<head>`; `/googlec87b45408e1ef533.html` serves
- [ ] `src/layout.tsx` deleted
- [ ] `GOOGLE_APPS_SCRIPT_URL` and `ADMIN_EMAIL` set in Vercel Production; **not** present in `dist/assets/`
- [ ] `.env` gitignored; `.env.example` committed
- [ ] `dist/sitemap.xml` contains all 39 indexable URLs including the 5 previously missing ones
- [ ] `/pricing` excluded from the sitemap **and** carries `noindex`
- [ ] `npm run build && ./scripts/verify-build.sh` → **ALL CHECKS PASSED**
- [ ] `npm run typecheck` → zero errors

### P1 — before or immediately after cutover

- [ ] Per-route `<title>`, description and canonical differ correctly across `/`, `/why-trench`, `/blog`, and a sample post
- [ ] Per-post `og:image` correct; LinkedIn Post Inspector shows the **post's** card
- [ ] `BlogPosting` JSON-LD validates on all 15 posts; `Organization` JSON-LD on `/`
- [ ] `public/trench.svg`, `public/apple-touch-icon.png`, `public/logo/trench-og-image.png` all exist and serve
- [ ] All 5 restored pages match the new cream/navy theme, not the old blue
- [ ] Careers listing shows all 5 roles with correct links
- [ ] Footer links to `/how-it-works`
- [ ] All 40 integration logos load; category filters work
- [ ] Pricing calculator returns identical numbers to the old site for identical inputs
- [ ] Both PDFs download; PDF.js viewer works on `/resources/trench-labs`
- [ ] YouTube, LinkedIn and Luma embeds render
- [ ] `react-phone-number-input` renders correctly on `/connect` and `/for-mssps`
- [ ] Responsive verified at 375 / 768 / 1024 / 1440 / 1920
- [ ] `code.gs` logo URLs re-pointed and the Apps Script redeployed

### P2 — post-launch

- [ ] GSC: sitemap accepted, no new coverage errors, no soft-404 spike
- [ ] Core Web Vitals not regressed
- [ ] GA4 traffic within variance of baseline
- [ ] Lighthouse Performance / A11y / Best Practices / SEO ≥ previous scores
- [ ] Social previews correct on LinkedIn, X and Slack
- [ ] 12.2 MB PDF moved off `public/`
- [ ] Unused font weights pruned
- [ ] GTM container audited and documented

---

## Appendix — every file you touch

| File | Action | Blocker |
|---|---|---|
| `vite.config.ts` | Remove `figmaSiteConfiguration` plugin + its type/function; rewrite `trenchApiPlugin` | 1, 3 |
| `.figma/make/site.json` | `robots.index: true`, add real `title`/`description` | 1 |
| `vercel.json` | **Create** — rewrites, headers, cleanUrls | 2 |
| `src/api/` | **Delete** (dead Next handlers) | 3 |
| `api/_lib/forms.ts` | **Create** — shared validation + Apps Script forward | 3 |
| `api/submit-form.ts` | **Create** — Vercel function | 3 |
| `api/community-signup.ts` | **Create** — Vercel function | 3 |
| `src/connect/ConnectClient.tsx` | Remove fake success; add error state + render | 3 |
| `src/for-mssps/ForMSSPsClient.tsx` | Remove fake success; add error state + render | 3 |
| `index.html` | Replace `<head>`; add GTM `<noscript>` to `<body>` | 4, 7 |
| `src/main.tsx` | Add `inject()` from `@vercel/analytics` | 4 |
| `src/App.tsx` | Add SPA pageview effect; 5 imports; 5 route branches; footer link | 4, 5 |
| `src/layout.tsx` | **Delete** (orphaned) | 4 |
| `src/how-it-works/page.tsx` | **Copy** from old repo, strip `Metadata` | 5 |
| `src/career/ai-lead-security-rd/page.tsx` | **Copy** from old repo, strip `Metadata` | 5 |
| `src/career/ai-ml-lead/page.tsx` | **Copy** from old repo, strip `Metadata` | 5 |
| `src/career/lead-agentic-secops/page.tsx` | **Copy** from old repo, strip `Metadata` | 5 |
| `src/career/soc-analyst/page.tsx` | **Copy** from old repo, strip `Metadata` | 5 |
| `src/career/page.tsx` | Restore 4 job entries | 5 |
| `.env.example` | **Create** (commit) | 6 |
| `.env` | **Create** (gitignored) | 6 |
| `.gitignore` | Ensure `.env*` ignored, `.env.example` allowed | 6 |
| `tsconfig.json` | Add `"api"` to `include` | 3 |
| `package.json` | Add `postbuild`, `typecheck`; add 3 deps | 9 |
| `public/trench.svg` | **Copy** from old repo | 7 |
| `public/logo/trench-og-image.png` | **Copy** from old repo | 7 |
| `public/apple-touch-icon.png` | **Create** (180×180) | 7 |
| `public/sitemap.xml` | **Delete** (now generated) | 9 |
| `seo/routes.ts` | **Create** — per-route metadata table | 9 |
| `scripts/prerender-seo.ts` | **Create** — prerender + sitemap + robots | 9 |
| `scripts/verify-build.sh` | **Create** — build assertions | 11 |

---

*Ground truth for this runbook was established by reading both codebases and inspecting the existing `dist/` output on 2026-09-10. Items marked "verify externally" (the GTM container, the Vercel dashboard, Google Apps Script, DNS) cannot be determined from source code.*
