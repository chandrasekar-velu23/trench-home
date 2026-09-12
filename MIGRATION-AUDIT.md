# Trench Security Website — Production Migration Audit & Parity Checklist

**Source of truth:** `C:\TRENCH\WEBSITE\trench-home-main` (branch `main`, commit `1a26793`)
**Live domain:** `https://www.trenchsecurity.ai`
**Audit date:** 2026-09-10
**Purpose:** Complete inventory of the *current production* site so a **new UI-rebuilt codebase** (in a separate folder) can be verified for 1:1 parity on structure, SEO, analytics, integrations, routes and configuration **before** it replaces this deployment on the same domain.

> **How to use this file**
> 1. Build the new UI in a separate folder. Do not modify this repo.
> 2. Walk section by section. Every table has a **`✅ / ❌ / N/A`** column — fill it against the new codebase.
> 3. Section 15 is the go/no-go **pre-deploy gate**. Do not cut the domain over until every P0 row is `✅`.
> 4. Section 14 lists defects found in the *current* code — decide per item whether to carry over or fix during the rebuild.

---

## Table of Contents

1. [Platform & Stack](#1-platform--stack)
2. [Dependency Inventory](#2-dependency-inventory)
3. [Environment Variables](#3-environment-variables)
4. [Analytics, Tags & Tracking Scripts](#4-analytics-tags--tracking-scripts)
5. [Marketing & Form Integrations](#5-marketing--form-integrations)
6. [Backend / API Routes](#6-backend--api-routes)
7. [Complete Route Map](#7-complete-route-map)
8. [SEO Surface — Per-Route Metadata](#8-seo-surface--per-route-metadata)
9. [robots.txt, sitemap.xml & Search Console](#9-robotstxt-sitemapxml--search-console)
10. [Next.js Configuration](#10-nextjs-configuration)
11. [Design System, Fonts & CSS Architecture](#11-design-system-fonts--css-architecture)
12. [Static Assets (`/public`)](#12-static-assets-public)
13. [Component Inventory & Navigation Graph](#13-component-inventory--navigation-graph)
14. [Defects & Technical Debt Found in Current Code](#14-defects--technical-debt-found-in-current-code)
15. [Pre-Deploy Parity Gate (Go / No-Go)](#15-pre-deploy-parity-gate-go--no-go)
16. [Cutover Runbook](#16-cutover-runbook)
- [Appendix A — Quick Reference: Every ID & Key](#appendix-a--quick-reference-every-id--key)
- [Appendix B — Files That Must Be Copied Verbatim](#appendix-b--files-that-must-be-copied-verbatim)

---

## 1. Platform & Stack

| Item | Current Value | New Build | ✅/❌ |
|---|---|---|---|
| Framework | **Next.js 16.2.4** (App Router) | | |
| React | **19.2.4** / react-dom 19.2.4 | | |
| Language | TypeScript 5.x, `strict: true`, target `ES2017` | | |
| Router type | App Router (`src/app`), **no** `pages/` dir | | |
| Path alias | `@/*` → `./src/*` | | |
| Styling | **Plain CSS** — global + per-route stylesheets + 1 CSS Module. **No Tailwind, no PostCSS config, no CSS-in-JS lib.** | | |
| Package manager | npm (`package-lock.json` present) | | |
| Build scripts | `dev`, `build`, `start`, `lint`, **`postbuild: next-sitemap`** | | |
| Host | **Vercel** | | |
| Vercel project | name `trench-home`, id `prj_db2mW1d0fdPgf5vwGDy6xuGkA5dW` | | |
| Vercel org/team | `team_VO319051phyld1JVUugmJ0B6` (`chandrasekar-velus-projects`) | | |
| Vercel plan | `hobby` (per OIDC claim — verify in dashboard before prod cutover) | | |
| Git remote | `https://github.com/chandrasekar-velu23/trench-home.git` | | |
| Deploy branch | `main` | | |
| Middleware | **None** (no `middleware.ts`) | | |

> ⚠️ **Critical:** `postbuild: next-sitemap` is what generates `robots.txt` + `sitemap.xml`. If the new codebase drops this script, **SEO indexing breaks silently on deploy.**

---

## 2. Dependency Inventory

### Production dependencies

| Package | Version | Actually imported? | Used in | Carry over? |
|---|---|---|---|---|
| `next` | 16.2.4 | ✅ | everywhere | Required |
| `react` / `react-dom` | 19.2.4 | ✅ | everywhere | Required |
| `@vercel/analytics` | ^2.0.1 | ✅ | `src/app/layout.tsx` (`<Analytics />`) | **Required — analytics parity** |
| `framer-motion` | ^12.38.0 | ✅ (17 files) | animations, Navbar, Hero, FAQ, ComparisonTable, all `*Client.tsx` | Required if animations kept |
| `lucide-react` | ^1.8.0 | ✅ (12 files) | icons in Navbar, FAQ, resources, why-trench | Required |
| `lenis` | ^1.3.23 | ✅ (1 file) | `src/components/LenisProvider.tsx` — smooth scroll | Required for scroll feel |
| `react-phone-number-input` | ^3.4.17 | ✅ (2 files) | `connect/ConnectClient.tsx`, `for-mssps/ForMSSPsClient.tsx` | Required for forms |
| `next-sitemap` | ^4.2.3 | ✅ (postbuild) | `next-sitemap.config.js` | **Required — SEO** |
| `sharp` | ^0.34.5 | implicit | Next.js image optimization | Required |
| `gsap` | ^3.15.0 | ❌ **UNUSED** | no import found | Drop |
| `ogl` | ^1.0.11 | ❌ **UNUSED** | no import found | Drop |
| `next-seo` | ^7.2.0 | ❌ **UNUSED** | metadata is done natively via Next `Metadata` API | Drop |

### Dev dependencies

`@types/node ^20`, `@types/react ^19`, `@types/react-dom ^19`, `eslint ^9`, `eslint-config-next 16.2.4`, `typescript ^5`

ESLint config: `eslint.config.mjs` (flat config) — `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`, with `globalIgnores(['.next/**','out/**','build/**','next-env.d.ts'])`.

> **Note:** `gsap`, `ogl`, `next-seo` are unimported. Safe to remove in the new build.

---

## 3. Environment Variables

### `.env` — all `NEXT_PUBLIC_`, i.e. exposed in the client bundle

| Variable | Value | Consumed by | ✅/❌ |
|---|---|---|---|
| `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` | `https://script.google.com/macros/s/<REDACTED-see-Vercel-env>/exec` | `api/submit-form/route.ts`, `api/community-signup/route.ts` | |
| `NEXT_PUBLIC_GOOGLE_SHEET_URL` | `https://docs.google.com/spreadsheets/d/12SIh6juJYamU4py1WWZ8Oz42QagUfwfNsXoJZszD2l8/edit` | reference only (not read in code) | |
| `NEXT_PUBLIC_ADMIN_EMAIL` | `ask@trenchsecurity.ai` | `api/submit-form/route.ts` (`ADMIN_EMAIL`) | |
| `NEXT_PUBLIC_GOOGLE_SHEET_ID` | `12SIh6juJYamU4py1WWZ8Oz42QagUfwfNsXoJZszD2l8` | `api/submit-form/route.ts` (`SHEET_ID` — declared but currently unused) | |

### `.env.local` — local dev only, **do not migrate**

| Variable | Notes |
|---|---|
| `VERCEL_OIDC_TOKEN` | `[REDACTED]` — auto-generated by Vercel CLI, environment `development`, **already expired**. Never commit; regenerate via `vercel link` / `vercel env pull`. |

### Migration actions

- [ ] Re-create all four `NEXT_PUBLIC_*` vars in **Vercel → Project → Settings → Environment Variables** for `Production`, `Preview`, `Development`.
- [ ] `.gitignore` currently ignores `.env*` — new repo must do the same.
- [ ] These are `NEXT_PUBLIC_`, so they ship to the browser. The Apps Script URL is effectively public today and is unauthenticated. It is **only read inside Route Handlers**, so the prefix is unnecessary — consider renaming to a server-only `GOOGLE_APPS_SCRIPT_URL` in the new build.

> `.gitignore` also contains blanket `*.md`, `*.json` and `*.gs` rules. That is why `scripts/code.gs` and this audit file are untracked. Reconsider those globs in the new repo — they silently exclude `package.json`-adjacent config and all documentation.

---

## 4. Analytics, Tags & Tracking Scripts

All injected from **`src/app/layout.tsx`** `<head>` unless stated. **Every one of these must be reproduced in the new build's root layout.**

| # | Tool | ID / Key | Load strategy | Location | ✅/❌ |
|---|---|---|---|---|---|
| 1 | **Google Tag Manager** | `GTM-P4DNDLW4` | `<Script id="google-tag-manager" strategy="afterInteractive">` inline loader | `layout.tsx` `<head>` | |
| 2 | **GTM `<noscript>` fallback** | `https://www.googletagmanager.com/ns.html?id=GTM-P4DNDLW4` | hidden iframe (0×0) | `layout.tsx` first child of `<body>` | |
| 3 | **Google Analytics 4 (gtag)** | `G-E1SQD3N78D` | `<Script src="https://www.googletagmanager.com/gtag/js?id=G-E1SQD3N78D" strategy="afterInteractive">` + inline `gtag('config', ...)` | `layout.tsx` `<head>` | |
| 4 | **Mailchimp Connected Site** | user `e293fdae0e4a09d187dabd8c1`, script `5358e9752afc32c595d726957` | raw `<script dangerouslySetInnerHTML>` (id `mcjs`) | `layout.tsx` `<head>` | |
| 5 | **ContentSquare (UXA)** | `915bc8852a0d2` → `https://t.contentsquare.net/uxa/915bc8852a0d2.js` | `<Script strategy="afterInteractive" defer>` | `layout.tsx` `<head>` | |
| 6 | **Microsoft Clarity** | `y14biiygt7` | `<Script id="microsoft-clarity" strategy="afterInteractive">` inline loader | `layout.tsx` `<head>` | |
| 7 | **Vercel Analytics** | (auto — project-scoped) | `<Analytics />` from `@vercel/analytics/next` | `layout.tsx` `<body>` | |
| 8 | **jQuery 3.7.1** | `https://code.jquery.com/jquery-3.7.1.min.js` | `strategy="beforeInteractive"` | `layout.tsx` `<head>` | |
| 9 | **Google Site Verification (meta)** | `oYp5PFy7iOQQx5URYjzRrVn_etEIbG1qLxoRQ3PPB-4` | `metadata.verification.google` | `layout.tsx` | |
| 10 | **Google Site Verification (file)** | `googlec87b45408e1ef533.html` | static file | `public/googlec87b45408e1ef533.html` | |
| 11 | **Standalone Mailchimp loader** | same IDs as #4 | static file, **not referenced by any page** | `public/mc.js` | |

### ❗ Tools you asked about that are **NOT** present

| Tool | Status | Action |
|---|---|---|
| **Hotjar** | ❌ **Not implemented anywhere in this codebase.** | Session recording / heatmaps are covered instead by **ContentSquare** (#5) and **Microsoft Clarity** (#6). If Hotjar is expected in production, it is either (a) injected via **GTM container `GTM-P4DNDLW4`** — check the container, not the repo — or (b) genuinely absent. **Verify inside GTM before assuming parity.** |
| **Brevo tracking script** (`sib` / Brevo conversations tracker) | ❌ Not present. Brevo appears **only as embedded forms** (see §5.1). | If a Brevo tracker exists in prod, it is in GTM. |
| **Segment / Amplitude / Mixpanel / PostHog / Intercom / Drift** | ❌ Not present | — |
| **LinkedIn Insight Tag / Meta Pixel / Google Ads conversion** | ❌ Not in repo | Likely fired via **GTM**. Audit the GTM container. |
| **Cookie consent / CMP** (OneTrust, Cookiebot, etc.) | ❌ Not in repo | Legal/compliance content lives on the separate `compliance.trenchsecurity.ai` property. If a CMP is required, it is in GTM or missing entirely. |

> 🔴 **Highest-risk unknown in this whole migration:** GTM container `GTM-P4DNDLW4` may fire an arbitrary number of additional tags (Hotjar, LinkedIn Insight, Ads conversions, consent tools) that **do not appear in this repo at all**. Export the GTM container JSON and diff it as part of the cutover. Nothing in the codebase can tell you what is inside it.

---

## 5. Marketing & Form Integrations

### 5.1 Brevo (Sendinblue) — 3 distinct form endpoints

Account/form host: **`https://752fd23d.sibforms.com`**

| Where | Type | Endpoint (truncated) | File |
|---|---|---|---|
| Newsletter signup page | **iframe embed** | `.../v2/serve/MUIFAIR-imKeHwoy4wEPS3EQhm5xzqSeIShteaATv-zdhnDzif0dhG-8zS-K2MOjaLAv1vkobILuxIBMUqKVX_...` | `src/app/newsletter-signup/page.tsx` |
| Newsletter unsubscribe page | **iframe embed** | `.../v2/serve/MUIFAKd8z70xGK5NmtSUVA6i0uNfcKXrg8LGITaqe4tyt_za6-mgxJn1CqDy25CvWGI-2S_IjCTwEp77PWTPA9...` | `src/app/newsletter-signout/page.tsx` |
| `BrevoForm` component | **native POST form** | `.../v2/serve/MUIFAP0ZzfwyqXbs8gGzizNkcY7TCcW7nGIh-NQzScXep4NGXvG5zJurbxTh9Mv6WDBy-cVSKP0xw-076bd...` | `src/components/BrevoForm.tsx` — ⚠️ **currently unreferenced / dead code** |

**Brevo form fields (`BrevoForm.tsx`):** `FIRSTNAME` (req), `LASTNAME`, `EMAIL` (req), `SMS` + `SMS__COUNTRY_CODE` (req, options `+1 +44 +61 +91 +49 +33 +81 +86 +55`), `COMPANY:name` (req), `JOB_TITLE` (req), `LINKEDIN`, hidden `email_address_check` (honeypot), hidden `locale=en`.

**Brevo support script:** `https://sibforms.com/forms/end-form/build/main.js` (`strategy="lazyOnload"`) plus an inline config block setting `window.REQUIRED_CODE_ERROR_MESSAGE`, `window.LOCALE`, `window.EMAIL_INVALID_MESSAGE`, `window.SMS_INVALID_MESSAGE`, `window.REQUIRED_ERROR_MESSAGE`, `window.GENERIC_INVALID_MESSAGE`, `window.INVALID_NUMBER`, `window.INVALID_DATE`, `window.REQUIRED_MULTISELECT_MESSAGE`, `window.translation`, `window.AUTOHIDE`.

> **Exact form-serve URLs must be copied verbatim** — they are signed tokens tied to specific Brevo lists. Retyping or truncating them breaks list routing.

### 5.2 Mailchimp

| Item | Value |
|---|---|
| Connected-site script | `https://chimpstatic.com/mcjs-connected/js/users/e293fdae0e4a09d187dabd8c1/5358e9752afc32c595d726957.js` (inline in `layout.tsx`, duplicated in `public/mc.js`) |
| Embedded form action | `https://trenchsecurity.us1.list-manage.com/subscribe/post?u=e293fdae0e4a09d187dabd8c1&id=692ac1a3f3&f_id=003177e1f0` |
| Data center | `us1` |
| Audience / List ID | `692ac1a3f3` |
| Honeypot field | `b_e293fdae0e4a09d187dabd8c1_692ac1a3f3` |
| Merge fields | `FNAME`(1), `LNAME`(2), `EMAIL`(0), `PHONE`(4), `COMPANY`(6), `MMERGE7`=Designation(7), `MMERGE8`=LinkedIn(8), `ADDRESS`(3), `BIRTHDAY`(5) |
| Validation script | `//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js` + large inline SMS/country-init block (`window.MC.smsPhoneData`, default country `IN`) |
| Stylesheet | `//cdn-images.mailchimp.com/embedcode/classic-061523.css` |
| Referral badge | `https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg` → `http://eepurl.com/KucTsuKU17` |
| File | `src/components/NewsletterForm.tsx` — ⚠️ **currently unreferenced / dead code** |

> **Decision needed:** Mailchimp *tracking* (the connected-site script in `layout.tsx`) is live, but the Mailchimp *form* component is orphaned — Brevo has replaced it for actual signups. Confirm whether Mailchimp should be retired entirely in the new build, or the connected-site script kept.

### 5.3 Google Apps Script + Google Sheets — the real form backend

**Script source:** `scripts/code.gs` (23.5 KB), deployed as a Web App at `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`. **Not part of the Next.js build** — it lives in Google Apps Script. Migration does not change it, but the new site must keep posting the same payload shape.

`CONFIG` block:

| Key | Value |
|---|---|
| `RECIPIENT_EMAIL` | `ask@trenchsecurity.ai` |
| `FROM_ALIAS` | `ask@trenchsecurity.ai` (must be verified in Gmail → Accounts → Send mail as) |
| `SHEET_NAME` | `Form Submissions` |
| `JOB_SHEET_NAME` | `Job Applications` |
| `BPL_SHEET_NAME` | `BPL Submissions` |
| `BRAND_NAME` | `Trench Security` |
| `BRAND_LOGO_URL` | `https://raw.githubusercontent.com/chandrasekar-velu23/trench-home/refs/heads/main/public/logo/trench-logo.png` |
| `BPL_LOGO_URL` | `https://raw.githubusercontent.com/chandrasekar-velu23/trench-home/refs/heads/main/public/BPL/BPL%20LOGO.png` |
| `LUMA_CALENDAR_URL` | `https://luma.com/calendar/cal-FwLKyNupiOO86Mg?period=past` |
| `DRIVE_FOLDER_NAME` | `Trench Job Applications` |

**`doPost(e)` routing — 3 branches:**

1. `data.category === 'BPL Community Signup'` **or** `data.formType === 'bpl_signup'` → `handleBplSignup()` → writes the `BPL Submissions` tab, sends admin email (`sendBplAdminEmail`) + branded welcome email (`sendBplWelcomeEmail`)
2. `data.formType === 'job_application'` → `handleJobApplication()` → writes the `Job Applications` tab + Drive upload to `Trench Job Applications`
3. otherwise → Connect / MSSP path → `getOrCreateSheet()` + `appendToSheet()` on `Form Submissions`, then `sendAdminEmail()` + `sendReceiverEmail()`

Placeholder guard: submissions where `email` is empty or `your-email@example.com` are rejected with `'A valid dynamic email address is required.'`

> 🔴 **Migration blocker if changed:** `BRAND_LOGO_URL` and `BPL_LOGO_URL` are **hardcoded `raw.githubusercontent.com` links to `chandrasekar-velu23/trench-home` on branch `main`**. If the new UI lives in a **different repo**, or those files move/rename, **all transactional emails lose their logos**. Either keep those exact paths alive in the old repo, or update `code.gs` and redeploy the Apps Script (recommended: repoint to `https://www.trenchsecurity.ai/logo/trench-logo.png`).

> ℹ️ Route 2 (`job_application`) exists in the backend, but **no page in the current site posts `formType: 'job_application'`** — the career pages have no application form. The Apps Script handler is ready if the new build adds one.

### 5.4 Third-party embeds

| Embed | URL / ID | Page |
|---|---|---|
| YouTube | `https://www.youtube.com/embed/AEnT-jVCr-4?si=rb546GDye_MNRdM1` | `resources/webinars` / `case-studies/ocrolus` |
| YouTube | `https://www.youtube.com/embed/PJxtlsN3BgA?si=Iqv2HES563j34x57` | `resources/*` |
| LinkedIn post embeds ×4 | `urn:li:share:7435234786530635776`, `urn:li:share:7481890378548199424`, `urn:li:ugcPost:7432069015587549184`, `urn:li:ugcPost:7472365101044486144` | `resources/events` |
| Luma calendar | `https://luma.com/calendar/cal-FwLKyNupiOO86Mg?period=past` | `resources/events`, `code.gs` |
| PDF.js (CDN) | `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js` + `pdf.worker.min.js` | `resources/trench-labs` (PDF viewer) |
| Microsoft Marketplace | `https://marketplace.microsoft.com/en-us/product/trenchdragonai.trenchonms?tab=Overview` | announcements / blog |
| Compliance / Trust center | `https://compliance.trenchsecurity.ai/` (3 links: Privacy policy, Cookies notice, Trust center) | `Footer.tsx` |
| LinkedIn company | `https://www.linkedin.com/company/trenchsecurity/` | `Footer.tsx` |
| Contact email | `mailto:ask@trenchsecurity.ai` | `Footer.tsx` |
| Wix CDN images | 21 refs to `https://static.wixstatic.com/media/...` (legacy blog imagery, still hot-linked) | `postsData.ts` blog bodies |

> ⚠️ `next.config.ts` sets `images.remotePatterns: []`. Therefore **all `static.wixstatic.com` images must be rendered with plain `<img>`, not `next/image`.** If the new UI converts them to `next/image`, they throw at runtime. Either keep `<img>`, add `static.wixstatic.com` to `remotePatterns`, or (recommended) **self-host those 21 images into `/public`**.

### 5.5 Citation / reference outbound links (content integrity)

`nvd.nist.gov/vuln` · `www.gartner.com/en/information-technology/glossary/cybersecurity-mesh` · `www.ibm.com/reports/threat-intelligence` · `www.microsoft.com/en-us/security/security-insider/threat-landscape/microsoft-digital-defense-report-2025` · `www.sans.org/webcasts/sans-detection-engineering-survey/` · `www.jisem-journal.com/index.php/journal/article/view/14648` · `www.momtestbook.com/` · `www.linkedin.com/company/products-that-count/` · team profiles: `linkedin.com/in/raghusrao`, `/in/mayur-rao`, `/in/gurucharanraghunathan`, `/in/michael-wilson-rebello-b719a86`

---

## 6. Backend / API Routes

Only two Route Handlers exist. Both are excluded from the sitemap via `exclude: ['/api/*']`.

### `POST /api/submit-form` — `src/app/api/submit-form/route.ts`

- **Consumers:** `src/app/connect/ConnectClient.tsx:124`, `src/app/for-mssps/ForMSSPsClient.tsx:134`
- **Category inference:** `body.companyName` present → `MSSP`, else → `Connect`
- **Required fields:** MSSP → `fullName`, `email`, `companyName`; Connect → `fullName`, `email`, `teamSize`, `intent`
- **Email regex:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Normalisation:** splits `fullName` on whitespace → `firstName` / `lastName`; defaults `teamSize` → `'MSSP Partner'`, `intent` → `'MSSP Partnership'`
- **Outbound payload keys:** `category, firstName, lastName, fullName, email, contactNumber, company, teamSize, intent, message, timestamp`
- **Delivery:** uses Next.js **`after()`** — responds `200` immediately, forwards to Apps Script in the background
- **`GET`** returns `405`
- **Responses:** `{status:'success'|'error', message, timestamp}`; `400` on validation, `500` on throw

### `POST /api/community-signup` — `src/app/api/community-signup/route.ts`

- **Consumer:** `src/app/resources/community/bpl-signup/page.tsx:161`
- **Required:** `firstName, lastName, email, phone, designation, linkedin` (all non-empty)
- **Business-email gate:** rejects 20 personal domains — `gmail.com, googlemail.com, outlook.com, hotmail.com, live.com, msn.com, yahoo.com, ymail.com, icloud.com, me.com, mac.com, protonmail.com, proton.me, aol.com, gmx.com, gmx.net, zoho.com, mail.com, yandex.com, rediffmail.com`
- **LinkedIn URL regex:** `/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+\/?.*$/`
- **Outbound payload:** `{category:'BPL Community Signup', firstName, lastName, email (lowercased), phone, designation, linkedin, timestamp}`
- **Delivery:** **synchronous** `await` to Apps Script; failure is caught, logged, and the user still receives `success`
- **No `GET` handler**

> **Parity requirement:** the new UI's forms must send **identical field names and the same `category` / `formType` values**, or `code.gs` routes submissions to the wrong sheet (or drops them).

---

## 7. Complete Route Map

**40 URLs currently in the sitemap.** All routes below must exist at the same path in the new build, or a `301` redirect must be configured.

### Static pages (14)

| Route | File | Rendering | ✅/❌ |
|---|---|---|---|
| `/` | `src/app/(home)/page.tsx` | Server (route group `(home)`, not in URL) | |
| `/why-trench` | `src/app/why-trench/page.tsx` | Server | |
| `/how-it-works` | `src/app/how-it-works/page.tsx` | Server | |
| `/integrations` | `src/app/integrations/page.tsx` + `IntegrationsClient.tsx` | Server shell + client | |
| `/for-mssps` | `src/app/for-mssps/page.tsx` + `ForMSSPsClient.tsx` | Server shell + client | |
| `/connect` | `src/app/connect/page.tsx` + `ConnectClient.tsx` | Server shell + client | |
| `/career` | `src/app/career/page.tsx` + `CareerListings.tsx` | Server | |
| `/blog` | `src/app/blog/page.tsx` + `BlogClient.tsx` | Server shell + client | |
| `/announcements` | `src/app/announcements/page.tsx` + `AnnouncementsClient.tsx` + `AnnouncementsListClient.tsx` | Server shell + client | |
| `/pricing` | `src/app/pricing/page.tsx` | **Client** (`'use client'`) | |
| `/newsletter-signup` | `src/app/newsletter-signup/page.tsx` | Server (Brevo iframe) | |
| `/newsletter-signout` | `src/app/newsletter-signout/page.tsx` | Server (Brevo iframe) | |
| `/resources/events` | `src/app/resources/events/page.tsx` | **Client** | |
| `/resources/community/bpl-signup` | `src/app/resources/community/bpl-signup/page.tsx` | **Client** | |

### Resources (3 more)

| Route | File | Rendering |
|---|---|---|
| `/resources/trench-labs` | `src/app/resources/trench-labs/page.tsx` | **Client** (PDF.js viewer) |
| `/resources/webinars` | `src/app/resources/webinars/page.tsx` | **Client** |
| `/resources/community` | `src/app/resources/community/page.tsx` | **Client** |

Shared stylesheet for all five: `src/app/resources/resources.css`.

### Career detail (5)

`/career/ai-lead-security-rd` · `/career/ai-ml-lead` · `/career/lead-agentic-secops` · `/career/product-marketing-intern` · `/career/soc-analyst`

### Case studies (3) — all `'use client'`

`/case-studies/ocrolus` · `/case-studies/sbfe` · `/case-studies/whatfix`

### Dynamic: `/blog/[slug]` — 15 posts (SSG via `generateStaticParams`)

Data: `src/app/blog/postsData.ts` (1093 lines).
Interface `BlogPost`: `slug, title, category, date, image, description, author{name, role, avatar}, publishedTime, modifiedTime, tableOfContents[{id, title}], body`.

| # | Slug | Cover image | Category |
|---|---|---|---|
| 1 | `trench-agentic-secops-skills-vs-playbooks` | `/blog-cover-images/Agentic-SecOps-maturity-path-cover.png` | Technical |
| 2 | `ai-changed-the-threat-landscape-why-are-we-still-defending-like-its-2020` | `/blog-cover-images/the-evolution-of-cyber-defence.png` | — |
| 3 | `the-agent-is-not-the-product-the-foundation-is` | `/blog-cover-images/The-Agent-Is-Not-the-Product.-The-Foundation-Is.png` | — |
| 4 | `introducing-headless-secops-for-the-agentic-world` | `/blog-cover-images/introducing-headless-secops-for-the-agentic-world.webp` | — |
| 5 | `trench-ai-now-available-on-microsoft-marketplace` | `/blog-cover-images/trench-ai-now-available-on-microsoft-marketplace.jpg` | Product |
| 6 | `ai-in-the-security-operations-clearing-the-clutter` | `/blog-cover-images/ai-in-the-security-operations-clearing-the-clutter.webp` | — |
| 7 | `how-modern-cisos-demonstrate-real-roi-with-ai-native-soc-platforms` | `/blog-cover-images/how-modern-cisos-demonstrate-real-roi-with-ai-native-soc-platforms.png` | — |
| 8 | `launching-trench-agentic-threat-detection-mesh` | `/blog-cover-images/Launching-Trench-Agentic-Threat-Detection-Mesh.png` | Product |
| 9 | `launching-real-time-data-safety-in-ai-native-security-operations` | `/blog-cover-images/launching-u201creal-time-data-safetyu201d-in-ai-native-security-operations.png` | Product |
| 10 | `modernizing-soc-using-agentic-ai` | `/blog-cover-images/modernizing-soc-using-agentic-ai.png` | — |
| 11 | `optimizing-your-ai-soc-a-practical-guide-to-offensive-validation-and-tuning` | `/blog-cover-images/optimizing-your-ai-soc-a-practical-guide-to-offensive-validation-and-tuning.png` | — |
| 12 | `unlocking-the-power-of-ai-for-mssps` | `/blog-cover-images/unlocking-the-power-of-ai-for-mssps.png` | MSSP |
| 13 | `why-mid-sized-companies-struggle-with-soc-automation-and-how-to-fix-it` | `/blog-cover-images/why-mid-sized-companies-struggle-with-soc-automation-and-how-to-fix-it.png` | — |
| 14 | `why-should-you-enable-ai-in-your-soc` | `/blog-cover-images/why-should-you-enable-ai-in-your-soc.png` | — |
| 15 | `actionable-secops-in-the-real-world` | `/blog-cover-images/actionable-secops-in-the-real-world.webp` | — |

All 15 cover images verified present in `/public`. ✅
Category distribution: Technical ×4, Product ×3, Security ×3, Trends ×3, MSSP ×1, Research ×1.
Detail page layout component: `src/app/blog/[slug]/BlogClientLayout.tsx`.

### Dynamic: `/announcements/[slug]` — 2 items

Data: `src/app/announcements/announcementsData.ts`.
Interface `Announcement`: `slug, date, publishedISO, category, categoryColor ('accent'|'primary'|'secondary'), title, excerpt, coverImage (string|null), coverImageAlt, badge (string|null), badgeAlt, seoDescription, content: ContentBlock[]`.
`ContentBlock` union: `intro | paragraph | heading | closing` (all `{text}`) · `richIntro {segments: RichSegment[]}` · `list {items: string[]}` · `innovations {items: [{label, desc}]}` · `button {text, href, external?}`.
`RichSegment` = `{ text, href?, external? }`.

| Slug | Cover |
|---|---|
| `trench-ai-now-available-on-microsoft-marketplace` | `/blog-cover-images/trench-ai-now-available-on-microsoft-marketplace.webp` |
| `products-that-count-2026` | award badge (see `/public/awards`) |

Detail component: `src/app/announcements/[slug]/AnnouncementDetailClient.tsx`.

### Special files

| File | Present | Notes |
|---|---|---|
| `src/app/layout.tsx` | ✅ | Root layout — **all analytics live here** |
| `src/app/error.tsx` | ✅ | Error boundary |
| `src/app/loading.tsx` | ✅ | Suspense fallback |
| `src/app/favicon.ico` | ✅ | |
| `src/app/not-found.tsx` | ❌ **MISSING** | 404s fall back to the Next.js default. **Add one in the new build.** |

---

## 8. SEO Surface — Per-Route Metadata

### 8.1 Root defaults (`src/app/layout.tsx`) — must be replicated exactly

```
metadataBase:   https://www.trenchsecurity.ai

title.default:  "Trench | Agentic OS for Actionable SecOps"
title.template: "%s | Trench Security"

description:    "Trench is the new operating system for security operations. An agentic platform
                 that does what your SIEM can't and your SOC never gets to, automatically."

keywords:       Cybersecurity, SecOps, Agentic SecOps, SOC Automation, SIEM,
                Security Operations, Enterprise Security, Cloud Security, Trench Security

authors:        [{ name: "Trench Security" }]
creator:        "Trench Security"
publisher:      "Trench Security"

verification.google: "oYp5PFy7iOQQx5URYjzRrVn_etEIbG1qLxoRQ3PPB-4"

robots:         index: true, follow: true
                googleBot: index:true, follow:true,
                           "max-video-preview": -1,
                           "max-image-preview": "large",
                           "max-snippet": -1

icons.icon:     "/trench.svg"
icons.apple:    "/apple-touch-icon.png"            <-- FILE DOES NOT EXIST

openGraph:      title       "Trench | Agentic OS for Actionable SecOps"
                description (same as default description)
                url         "https://www.trenchsecurity.ai"
                siteName    "Trench Security"
                locale      "en_US"
                type        "website"
                images      [{ url: "/logo/trench-logo.png", width: 1200, height: 630,
                               alt: "Trench SecOps Platform" }]

twitter:        card        "summary_large_image"
                title       (same)
                description (same)
                images      ["/logo/trench-logo.png"]

<html lang="en" suppressHydrationWarning>
<body className="antialiased font-secondary" suppressHydrationWarning>
```

### 8.2 Per-route metadata

| Route | `title` | `description` | `canonical` | OG/Twitter | ✅/❌ |
|---|---|---|---|---|---|
| `/` | *(inherits default)* | *(inherits)* | `https://www.trenchsecurity.ai` | inherits | |
| `/why-trench` | `Why Trench` | "Security Operations is a systems design problem. Not a monitoring problem. Learn why we built Trench to fix it." | `/why-trench` | inherits | |
| `/how-it-works` | `How It Works` | "Trench simplifies security operations by unifying visibility, detection, and response into a single, automated workflow." | `/how-it-works` | inherits | |
| `/integrations` | `Integrations` | "Agentless, API-native integrations across your entire security stack. Trench connects to your tools in minutes — no agents, no friction." | `/integrations` | inherits | |
| `/for-mssps` | `MSSPs` | "Offer your clients the new operating system for Security Operations. Co-sell Trench and deliver Headless SecOps to every client, without rebuilding your delivery model." | `/for-mssps` | inherits | |
| `/connect` | `Connect` | "You cannot run a modern security operation on a legacy system. Let us show you what the new operating system looks like for your stack." | `/connect` | inherits | |
| `/career` | `Careers` | "Join Trench and help us build the future of agentic security operations." | `/career` | inherits | |
| `/career/ai-lead-security-rd` | `AI Lead, Security R&D \| Careers` | "Join Trench as AI Lead, Security R&D and build the technical foundation behind agentic Security Operations." | ❌ none | inherits | |
| `/career/ai-ml-lead` | `AI/ML Lead, Applied AI for Security \| Careers` | "Join Trench as AI/ML Lead, Applied AI for Security and build the models that power Trench's detection brain." | ❌ none | inherits | |
| `/career/lead-agentic-secops` | `Lead, Agentic SecOps \| Careers` | "Join Trench as Lead, Agentic SecOps and drive customer transformation from traditional SOC to an agentic operating model." | ❌ none | inherits | |
| `/career/product-marketing-intern` | `Product Marketing Intern \| Careers` | "Join Trench as a Product Marketing Intern and own Trench's voice and product messaging." | ❌ none | inherits | |
| `/career/soc-analyst` | `SOC Analyst (Level 1-2) \| Careers` | "Join Trench as a SOC Analyst and be on the frontline of our Security Operations Center, helping identify, assess, and respond to cyber threats." | ❌ none | inherits | |
| `/blog` | `Blog` | "Insights, research, and perspectives on AI-native SecOps, agentic automation, and the future of security operations — for security champions who think differently." | `/blog` | **explicit OG + Twitter**, image `https://www.trenchsecurity.ai/blog-cover-images/Headless-SecOps-for-the-Agentic-World.png` ⚠️ **404** | |
| `/blog/[slug]` | `post.title` | `post.description` stripped of HTML tags + numeric entities, truncated to **160 chars** | `/blog/{slug}` | full OG `type:"article"` + `publishedTime`, `modifiedTime`, `authors:[post.author.name]`, absolute image 1200×630; Twitter `summary_large_image`. **Unknown slug → `robots:{index:false, follow:false}` + title "Article Not Found"** | |
| `/announcements` | `Announcements \| Trench Security` | "Stay up to date with the latest news, awards, and milestones from Trench Security — the agentic SecOps platform built for actionable threat detection and response." | `/announcements` | explicit OG + Twitter, image `/awards/2025 Products Awards Winner.png` (note the **spaces in the filename**), plus its own `keywords` array | |
| `/announcements/[slug]` | `item.title` | `item.seoDescription` | `/announcements/{slug}` | OG `type:"article"` + `publishedTime: item.publishedISO`, image = `item.coverImage` or fallback `/logo/trench-logo.png`, alt = `item.coverImageAlt`. **Unknown slug → noindex + "Announcement Not Found"** | |
| `/newsletter-signup` | `Subscribe to Trench Digest` | "Get weekly zero-day breakdowns, cloud defense blueprints, and actionable security insights—straight from the digital trenches." | ❌ none | inherits | |
| `/newsletter-signout` | `Unsubscribe from Trench Digest` | "Unsubscribe from the Trench Security newsletter." | ❌ none | inherits | |
| `/pricing` | ❌ **none** | ❌ none | ❌ none | inherits | |
| `/case-studies/ocrolus` | ❌ **none** | ❌ none | ❌ none | inherits | |
| `/case-studies/sbfe` | ❌ **none** | ❌ none | ❌ none | inherits | |
| `/case-studies/whatfix` | ❌ **none** | ❌ none | ❌ none | inherits | |
| `/resources/community` | ❌ **none** | ❌ none | ❌ none | inherits | |
| `/resources/community/bpl-signup` | ❌ **none** | ❌ none | ❌ none | inherits | |
| `/resources/events` | ❌ **none** | ❌ none | ❌ none | inherits | |
| `/resources/trench-labs` | ❌ **none** | ❌ none | ❌ none | inherits | |
| `/resources/webinars` | ❌ **none** | ❌ none | ❌ none | inherits | |

> **Why 8 pages have no metadata:** they are all `'use client'` page components. Next.js **cannot export `metadata` from a Client Component**. This is a real SEO gap in production today — those pages inherit only the site-wide title and description, so they compete with each other in search results.
>
> **Fix pattern for the new build:** split each into a Server `page.tsx` that exports `metadata` and renders a `<XClient />`. This is exactly the pattern already used correctly by `/connect`, `/for-mssps`, `/integrations`, `/blog` and `/announcements`.

### 8.3 Structured data (JSON-LD)

**Only one implementation exists:** `src/app/blog/[slug]/page.tsx:103-135`, injected via `<script type="application/ld+json" dangerouslySetInnerHTML>`.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "post.title",
  "image": "absoluteUrl(post.image)",
  "datePublished": "post.publishedTime",
  "dateModified": "post.modifiedTime",
  "author":    { "@type": "Person", "name": "post.author.name", "jobTitle": "post.author.role" },
  "publisher": { "@type": "Organization", "name": "Trench Security",
                 "logo": { "@type": "ImageObject",
                           "url": "https://www.trenchsecurity.ai/logo.png" } },
  "description": "post.description, tags stripped, 160 chars",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "{BASE_URL}/blog/{slug}" }
}
```

⚠️ `publisher.logo.url` → `/logo.png` is a **404**. The real file is `/logo/trench-logo.png`.

**Not present anywhere:** `Organization`, `WebSite` (+ `SearchAction`), `BreadcrumbList`, `FAQPage` (despite a real FAQ component on the homepage), `JobPosting` (despite 5 career pages), `Product` / `SoftwareApplication`, `Article` on announcements. **These are all upside opportunities for the new build** — but adding them is a *change*, not parity. Decide deliberately.

---

## 9. robots.txt, sitemap.xml & Search Console

### Generation

`next-sitemap.config.js` — runs on `postbuild`:

```js
siteUrl:              'https://www.trenchsecurity.ai'
generateRobotsTxt:    true
generateIndexSitemap: false      // single flat sitemap.xml, no index file
changefreq:           'daily'
priority:             0.7
sitemapSize:          5000
exclude:              ['/api/*', '/pricing']
robotsTxtOptions.policies: [{ userAgent: '*', allow: '/' }]
```

### Current `public/robots.txt`

```
# *
User-agent: *
Allow: /

# Host
Host: https://www.trenchsecurity.ai

# Sitemaps
Sitemap: https://www.trenchsecurity.ai/sitemap.xml
```

### Current `public/sitemap.xml`

- **40 `<url>` entries**, all `changefreq=daily`, `priority=0.7`, `lastmod` from the last build (`2026-09-07T03:12:07Z`)
- Homepage listed as `https://www.trenchsecurity.ai` (**no trailing slash**)
- `/pricing` and `/api/*` correctly excluded
- **Includes** all 15 blog slugs, both announcement slugs, all 5 career pages, all 3 case studies, all 5 resources pages, both newsletter pages

Full URL list (verify the new build produces exactly these 40):

```
/                                       /career/soc-analyst
/announcements                          /case-studies/ocrolus
/announcements/products-that-count-2026 /case-studies/sbfe
/announcements/trench-ai-now-available-on-microsoft-marketplace
                                        /case-studies/whatfix
/blog                                   /connect
/blog/actionable-secops-in-the-real-world
                                        /for-mssps
/blog/ai-changed-the-threat-landscape-why-are-we-still-defending-like-its-2020
                                        /how-it-works
/blog/ai-in-the-security-operations-clearing-the-clutter
                                        /integrations
/blog/how-modern-cisos-demonstrate-real-roi-with-ai-native-soc-platforms
                                        /newsletter-signout
/blog/introducing-headless-secops-for-the-agentic-world
                                        /newsletter-signup
/blog/launching-real-time-data-safety-in-ai-native-security-operations
                                        /resources/community
/blog/launching-trench-agentic-threat-detection-mesh
                                        /resources/community/bpl-signup
/blog/modernizing-soc-using-agentic-ai  /resources/events
/blog/optimizing-your-ai-soc-a-practical-guide-to-offensive-validation-and-tuning
                                        /resources/trench-labs
/blog/the-agent-is-not-the-product-the-foundation-is
                                        /resources/webinars
/blog/trench-agentic-secops-skills-vs-playbooks
                                        /why-trench
/blog/trench-ai-now-available-on-microsoft-marketplace
/blog/unlocking-the-power-of-ai-for-mssps
/blog/why-mid-sized-companies-struggle-with-soc-automation-and-how-to-fix-it
/blog/why-should-you-enable-ai-in-your-soc
/career
/career/ai-lead-security-rd
/career/ai-ml-lead
/career/lead-agentic-secops
/career/product-marketing-intern
```

> ⚠️ `/pricing` is excluded from the sitemap **but is still crawlable and indexable** — it has no `robots: noindex` metadata and `robots.txt` allows `/`. Sitemap exclusion is not deindexing. If pricing is meant to be private, add `robots: { index: false, follow: false }` via a Server metadata export in the new build.

### Verification tokens (must survive migration)

| Method | Token | Location |
|---|---|---|
| Meta tag | `oYp5PFy7iOQQx5URYjzRrVn_etEIbG1qLxoRQ3PPB-4` | `layout.tsx` → `metadata.verification.google` |
| HTML file | `google-site-verification: googlec87b45408e1ef533.html` | `public/googlec87b45408e1ef533.html` |

**Losing either can drop Search Console access.** Copy both verbatim.

### Migration checklist

- [ ] `next-sitemap` installed and the `postbuild` script wired
- [ ] `next-sitemap.config.js` copied with identical `siteUrl`, `exclude`, `generateIndexSitemap:false`
- [ ] Post-deploy: fetch `/robots.txt` and `/sitemap.xml` and **diff URL-for-URL against the 40 above**
- [ ] Both verification tokens present
- [ ] Re-submit the sitemap in Search Console after cutover
- [ ] Any renamed/removed route gets a **301** in `next.config.ts` `redirects()`

---

## 10. Next.js Configuration

`next.config.ts` — reproduce all of this.

### Images

```js
formats:        ["image/avif", "image/webp"]
remotePatterns: []                      // NO external hosts allowed via next/image
unoptimized:    false
qualities:      [100, 75, 85, 90, 95]
deviceSizes:    [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
imageSizes:     [16, 32, 48, 64, 96, 128, 256, 384]
```

> `qualities` is required in Next 16 for any non-default `quality` prop. If the new UI uses e.g. `quality={80}`, **80 must be added to this array** or the build errors.

### Security headers (`async headers()`)

Applied to `/(.*)`:

| Header | Value | ✅/❌ |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | |
| `X-Frame-Options` | `SAMEORIGIN` | |
| `X-XSS-Protection` | `1; mode=block` | |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | |

Applied to `/integrations/(.*)`:

| Header | Value |
|---|---|
| `Cache-Control` | `public, max-age=31536000, immutable` |

> **No CSP header is set.** That is what allows the ~10 third-party scripts to load. If the new build adds a CSP, it must allowlist at minimum: `googletagmanager.com`, `google-analytics.com`, `clarity.ms`, `t.contentsquare.net`, `chimpstatic.com`, `sibforms.com`, `752fd23d.sibforms.com`, `code.jquery.com`, `s3.amazonaws.com`, `cdnjs.cloudflare.com`, `cdn-images.mailchimp.com`, `static.wixstatic.com`, `youtube.com`, `linkedin.com`, `luma.com`, `digitalasset.intuit.com`.
>
> Note `X-Frame-Options: SAMEORIGIN` — this site frames *others*, it is not framed. Fine as-is.

### Compiler

```js
compiler.removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false
```

> Consequence: `console.log` / `console.warn` are stripped in production. `sendEmailNotification()` in `api/submit-form` does nothing but `console.log`, so **it is a complete no-op in production**.

### Dev

`allowedDevOrigins: getLocalIPs()` — enumerates non-internal IPv4 addresses via `os.networkInterfaces()` so LAN devices can reach the dev server. Dev-only; safe to keep or drop.

### Not configured (confirm the new build does not need them)

`redirects()`, `rewrites()`, `basePath`, `trailingSlash`, `output`, `i18n`, `experimental`, `env`, and **no `middleware.ts` file exists**.

---

## 11. Design System, Fonts & CSS Architecture

### Fonts

| Font | Source | CSS variable | Config |
|---|---|---|---|
| **Poppins** | `next/font/google` | `--font-poppins` | subsets `["latin"]`, weights `400,500,600,700,800` |
| **Bricolage Grotesque** | `next/font/local` | `--font-bricolage` | `public/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf`, `display:swap` |
| **Space Grotesk** | `next/font/local` | `--font-space-grotesk` | `public/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf`, `display:swap` |

All three variables are applied on `<html className={...}>`. Body uses `font-secondary`.

Semantic aliases in `:root`:
`--font-primary: var(--font-bricolage), sans-serif` · `--font-secondary: var(--font-space-grotesk), sans-serif`

> `public/fonts/` holds **112 files** (full static families for both). Only the **2 variable `.ttf` files** are actually loaded. The other ~110 static weights are dead weight — safe to prune in the new build (large size win).

### Color tokens (`:root` in `src/app/globals.css`)

```css
/* Primary (blue scale) */
--color-primary-100: #0D41E1;   /* brand blue — used everywhere */
--color-primary-200: #1E3EB0;   /* hover */
--color-primary-300: #1F3A8A;
--color-primary-400: #1E2A5A;

/* Secondary accents */
--color-secondary-cyan:    #34E1FF;
--color-secondary-amber:   #FFB547;
--color-secondary-magenta: #FF3B81;

/* Neutrals (light-mode optimised) */
--color-neutral-100: #F1F5F9;   --color-neutral-500: #64748B;
--color-neutral-200: #E2E8F0;   --color-neutral-600: #475569;
--color-neutral-300: #CBD5E1;   --color-neutral-700: #1E293B;
--color-neutral-400: #94A3B8;

/* Semantic */
--color-bg-primary:   #0D41E1;   --color-text-primary:   #000000;
--color-bg-secondary: #FFFFFF;   --color-text-secondary: #1E293B;
--color-bg-dark:      #0A0A0A;   --color-text-inverse:   #FFFFFF;

--color-border-default: rgba(0, 0, 0, 0.1);
--color-border-strong:  rgba(0, 0, 0, 0.2);

/* CTA */
--color-cta-primary:          var(--color-primary-100);
--color-cta-primary-hover:    var(--color-primary-200);
--color-cta-secondary:        transparent;
--color-cta-secondary-border: var(--color-primary-100);
```

Hardcoded brand blue also appears inline as `#0D41E1` (hover `#0b36c2`) in `FloatingNewsletterButton`, `BrevoForm`, `NewsletterForm`, `ClickSpark` (`sparkColor="#0D41E1"`), and in the `code.gs` email templates. **Keep `#0D41E1` as the single brand blue.**

### Stylesheet inventory (~6,564 lines total)

| File | Lines | Scope |
|---|---|---|
| `src/app/globals.css` | 1979 | Design tokens, typography scale, layout primitives, utility-ish classes |
| `src/app/resources/resources.css` | 845 | `/resources/*` (all 5 pages) |
| `src/app/for-mssps/for-mssps.css` | 642 | `/for-mssps` |
| `src/app/announcements/announcements.css` | 621 | `/announcements` + detail |
| `src/app/connect/connect.css` | 601 | `/connect` |
| `src/app/integrations/integrations.css` | 580 | `/integrations` |
| `src/app/pricing/pricing-calculator.module.css` | 479 | `/pricing` (**CSS Module** — the only one in the repo) |
| `src/components/Navbar.css` | 443 | Navbar |
| `src/app/why-trench/why-trench.css` | 374 | `/why-trench` |
| `src/app/pricing/pricing-calculator.css` | 1 | effectively empty |

### Custom class vocabulary defined in `globals.css`

**Layout:** `.container-full` `.container-wide` `.container-nav` `.content-block` `.content-block-full` `.grid-2` `.grid-3` `.d-flex` `.flex-row` `.flex-col` `.flex-1` `.items-center` `.justify-center` `.justify-between` `.w-full` `.h-full` `.fixed-top`
**Typography:** `.h1`–`.h6` `.eyebrow` `.title-lg` `.body-lead` `.body-text` `.fw-light` `.fw-normal` `.fw-medium` `.fw-semibold` `.fw-bold` `.fw-extrabold`
**Surfaces:** `.glass-card` `.bg-dark` `.bg-light` `.bg-primary` `.border-default` `.border-strong`
**CTA:** `.btn-primary` `.btn-secondary` `.master-cta-btn` `.master-cta-grid` `.cta-banner-link` `.hover-back`
**Content:** `.blog-grid` `.blog-post-image` `.blog-post-prose` `.article-column` `.anchor-container` `.mobile-toc-card` `.mobile-toc-list` `.like-btn`
**Forms:** `.form-input` and `.PhoneInput*` overrides for `react-phone-number-input` (`.PhoneInputCountry`, `.PhoneInputCountryIcon`, `.PhoneInputCountryIconImg`, `.PhoneInputCountrySelect`, `.PhoneInputInput`)
**Responsive helpers:** `.mobile-stack` `.mobile-center` `.hide-mobile`

> 🔴 **Biggest styling trap in this migration.**
> The JSX is *full* of Tailwind-looking classes (`w-full`, `bg-[#0a0a0a]/50`, `rounded-3xl`, `md:grid-cols-2`, `backdrop-blur-xl`, `text-gray-400`, `space-y-5`, `antialiased`…) — but **Tailwind is not installed**. Verified: **0 matches for "tailwind" in `package-lock.json`**, no `tailwind.config.*`, no `postcss.config.*`, no `@tailwind`/`@import "tailwindcss"`/`@theme`/`@apply` in any stylesheet.
> A handful of those names (`.w-full`, `.flex-1`, `.grid-2`, `.items-center`) coincidentally exist in `globals.css`; **the rest are inert**. What actually renders is hand-written CSS only.
>
> **Implication for the new UI:** if you adopt real Tailwind, many components will *suddenly* pick up styles they never had, and the layout will shift in unpredictable places — particularly `BrevoForm`, `NewsletterForm`, the newsletter pages, and every `*Client.tsx`. Either (a) go Tailwind and **re-verify every page visually**, or (b) stay on plain CSS and strip the dead classes. **Do not assume the current class names describe the current appearance.**

---

## 12. Static Assets (`/public`)

**Total: ~323 MB.** Aggressive pruning is the single largest performance win available.

| Directory | Files | Contents |
|---|---|---|
| `fonts/` | 112 | Bricolage Grotesque + Space Grotesk (only 2 variable TTFs used) |
| `integrations/` | 60 | Vendor logos — served with 1-year immutable cache |
| `blog/` | 22 | Legacy blog imagery |
| `blog-cover-images/` | 15 | Blog + announcement covers (all 15 verified present) |
| `images/` | 12 | General site imagery |
| `team/` | 12 | Team headshots |
| `BPL/` | 8 | BlueTeam Premier League assets (incl. `BPL LOGO.png`, used by `code.gs`) |
| `awards/` | 6 | Incl. `2025 Products Awards Winner.png` (OG image for `/announcements`) |
| `certificates/` | 6 | Compliance badges |
| `Advisor/` | 4 | Advisor photos |
| `assets/` | 4 | Misc |
| `logo/` | 4 | `trench-logo.png`, `trench-logo.webp`, `trench-logo-white.webp`, `Icon.webp` |
| `social/` | 4 | `DK.webp`, `SB.webp`, `SD.webp`, `SKI.webp` |
| `steps/` | 4 | Process step graphics (incl. `datalake-1.webp`) |
| `customers/` | 3 | Customer logos |
| `Icon/` | 1 | `feedback icon.svg` |

### Root-level files

| File | Size | Purpose | Keep? |
|---|---|---|---|
| `TRENCH SIGNAL.pdf` | **12.2 MB** | Report download (`/resources/trench-labs`) | ⚠️ move to CDN/Blob — see §14 |
| `Zero Latency Threat Detection.pdf` | 637 KB | Report download | Keep or move |
| `trench.svg` | 10.7 KB | **Favicon** (`metadata.icons.icon`) | **Required** |
| `googlec87b45408e1ef533.html` | 53 B | **Google Search Console verification** | **Required** |
| `robots.txt` | — | Generated by `next-sitemap` | Regenerated at build |
| `sitemap.xml` | 7.9 KB | Generated by `next-sitemap` | Regenerated at build |
| `new-footer.webp` | 166 KB | Footer background | Keep |
| `mc.js` | 248 B | Mailchimp loader — **unreferenced** | Drop |
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | — | `create-next-app` leftovers, unused | Drop |

### Broken asset references — verified by resolving every `/public` path found in `src/`

| Referenced path | Referenced from | Status |
|---|---|---|
| `/apple-touch-icon.png` | `layout.tsx` → `metadata.icons.apple` | ❌ **MISSING** — no Apple touch icon is served |
| `/logo.png` | `blog/[slug]` JSON-LD `publisher.logo.url` | ❌ **MISSING** — should be `/logo/trench-logo.png` |
| `/blog-cover-images/Headless-SecOps-for-the-Agentic-World.png` | `/blog` OG + Twitter image | ❌ **MISSING** — the real file is `introducing-headless-secops-for-the-agentic-world.webp`. **The blog index has a broken social preview image today.** |
| `/TRENCH%20SIGNAL.pdf` | resources page link | ⚠️ URL-encoded reference; the actual file is `public/TRENCH SIGNAL.pdf` (literal space). Works on Vercel but is fragile — **rename to `trench-signal.pdf`** in the new build |

> Filenames containing **spaces** (`2025 Products Awards Winner.png`, `BPL LOGO.png`, `TRENCH SIGNAL.pdf`, `feedback icon.svg`) and **mojibake** (`launching-u201creal-time-data-safetyu201d-in-ai-native-security-operations.png` — mangled curly quotes) should be normalised to kebab-case in the new build. **If you rename them, update every reference**, including `code.gs` (`BPL_LOGO_URL`), the OG metadata, and `postsData.ts`.

---

## 13. Component Inventory & Navigation Graph

`src/components/` — 33 files, ~8,900 lines.

### Layout & chrome (rendered on every page via `layout.tsx`)

Provider nesting order in `<body>`:
`<Analytics />` → `<LenisProvider>` → `<NavigationLoaderProvider>` → `<Navbar />` + `<ClickSpark>{children}</ClickSpark>` + `<Footer />` + `<FloatingNewsletterButton />`

| Component | Lines | Role | ✅/❌ |
|---|---|---|---|
| `Navbar.tsx` (+ `Navbar.css`) | 377 | Primary nav, rotating announcement bar, mobile menu, `/connect` CTA | |
| `Footer.tsx` | 714 | Footer nav, contact, compliance links, socials | |
| `LenisProvider.tsx` | 31 | Smooth-scroll wrapper (`lenis`) | |
| `NavigationLoader.tsx` | 79 | Route-transition loader | |
| `animations/ClickSpark.tsx` | 182 | Global click effect — `sparkColor="#0D41E1"`, `sparkSize={15}`, `sparkRadius={25}`, `sparkCount={12}`, `duration={500}` | |
| `FloatingNewsletterButton.tsx` | 96 | Fixed bottom-left CTA → `/newsletter-signup`. Auto-expands after 2.5s once, collapses after 8s. Persists via `localStorage["trench_newsletter_expanded"]`. **Hidden on `/newsletter-signup` and any `/pricing*`** | |

### Homepage composition (render order — `src/app/(home)/page.tsx`)

```
<Hero />
<SocialProof />
<SiemRibbon />
<CustomerSection />
Comparison block:
    TextReveal "This is Your Trench"            (h3.eyebrow)
    TextReveal "One AI Platform. Three Outcomes." (h2.title-lg, delay 0.2)
    ScrollReveal p.body-lead "Trench unifies your entire security stack into one
        agentic platform, so your lean team operates like an enterprise SOC."
    <ComparisonTable />
<ProcessSteps />
<Collaborations />
<FAQ />
<CTASection />
```
`<BrandBanner />` is imported but **commented out**. `VariationSlack` / `TweaksPanel` imports are commented out.

### Section components

`sections/CTASection.tsx` (288) · `sections/Highlight.tsx` (227) · `sections/CustomerSection.tsx` (208) · `sections/respondprocess.tsx` (205) · `sections/ingestprocess.tsx` (180) · `sections/detectionprocess.tsx` (180) · `sections/SiemRibbon.tsx` (50)

### Animation primitives (`framer-motion`)

`ScrollReveal.tsx` (48 — props `direction`, `distance`, `delay`, `className`, `style`) · `TextReveal.tsx` (68 — props `text`, `as`, `className`, `delay`, `style`) · `MouseInteract.tsx` (49) · `AdvancedTimeline.tsx` (41) · `Parallax.tsx` (26)

### Content components

`ComparisonTable.tsx` (801) · `SocialProof.tsx` (428) · `ProcessSteps.tsx` (349) · `Hero.tsx` (343) · `FAQ.tsx` (156) · `Collaborations.tsx` (100) · `BrandBanner.tsx` (80) · `ui/Button.tsx` (160)

### Dead / orphaned components — unreferenced, safe to drop

| File | Lines | Note |
|---|---|---|
| `VariationTeams.tsx` | 743 | A/B variant, unused |
| `Section3Visual.tsx` | 727 | unused |
| `variation-slack.tsx` | 707 | referenced only inside a commented-out import |
| `VariationClaude.tsx` | 621 | unused |
| `NewsletterForm.tsx` | 431 | Mailchimp form — **orphaned** |
| `HeadlessSecOpsModes.jsx` | 350 | the only `.jsx` file in the repo; unused |
| `BrevoForm.tsx` | 249 | Brevo native form — **orphaned** (pages use iframes instead) |

**~3,828 lines (≈43% of `src/components`) is dead code. Do not port it.**

### Utilities

`src/utils/countries.ts` — country list for the phone inputs.

### Navigation graph

**Navbar** (`src/components/Navbar.tsx:13-27`):

```
Home            -> /
Why Trench?     -> /why-trench
Integrations    -> /integrations
Resources (dropdown)
    Blogs         -> /blog                    icon BookOpen
    Trench Labs   -> /resources/trench-labs   icon FlaskConical
    Webinars      -> /resources/webinars      icon Video
    Community     -> /resources/community     icon Trophy
    Announcements -> /announcements           icon Megaphone
Partners        -> /for-mssps
[CTA button]    -> /connect      (class "hide-mobile" on desktop; also present in mobile menu)
Logo            -> /
```

**Announcement bar** (rotating, rendered in both desktop and mobile variants):
`/announcements/products-that-count-2026` and `/blog/the-agent-is-not-the-product-the-foundation-is`

**Footer** (`src/components/Footer.tsx`):

```
Contact:  mailto:ask@trenchsecurity.ai
Legal:    Privacy policy | Cookies notice | Trust center
          -> https://compliance.trenchsecurity.ai/   (all three, target=_blank rel="noopener noreferrer")
Company:  Why Trench?   -> /why-trench
          For MSSPs     -> /for-mssps
          Integrations  -> /integrations
          How it works? -> /how-it-works
          Careers       -> /career
Social:   LinkedIn -> https://www.linkedin.com/company/trenchsecurity/
Bottom:   2 more compliance.trenchsecurity.ai links
```

> ⚠️ **Orphan pages — reachable only by direct URL or sitemap, with no nav link:** `/pricing`, `/newsletter-signout`, `/resources/events`. `/how-it-works` appears in the footer only. The 3 `/case-studies/*` pages are linked from `SocialProof` / `CustomerSection` content, not from nav. Decide during the rebuild whether to link or drop them.

### Integrations catalog — 40 vendors (`src/app/integrations/IntegrationsClient.tsx`)

Each entry: `{ id, name, cat, logo: "/integrations/*.png", desc }`

| Category | Count | Vendors |
|---|---|---|
| `siem` | 7 | Microsoft Sentinel, Elastic Security, Anvilogic *(id typo: `anivilogic`)*, Sumo Logic, Splunk, Hunters, Defender for Identity |
| `cloud` | 5 | AWS, Microsoft Azure, Google Cloud, Wiz, CrowdStrike CNAPP |
| `endpoint` | 5 | Microsoft Defender, PAN Cortex XDR, SentinelOne, CrowdStrike Falcon, AWS GuardDuty |
| `email` | 5 | Abnormal Security, Proofpoint, Gmail, Exchange Online, Defender for Office 365 |
| `threat` | 5 | Recorded Future, IPinfo, DNSlytics, Spur, Reversing Labs |
| `collab` | 4 | Slack, Microsoft Teams, Office 365, Google Workspace |
| `case` | 3 | PagerDuty, Jira, ServiceNow |
| `identity` | 3 | Okta, Microsoft Entra ID, CrowdStrike Identity |
| `data` | 2 | Snowflake, Databricks |
| `network` | 1 | VirusTotal |

All 40 logos live in `public/integrations/` (60 files — 20 spare). Served with `Cache-Control: public, max-age=31536000, immutable`.

### Pricing calculator model (`src/app/pricing/page.tsx`)

Client-side calculator. Module keys `'inv' | 'det' | 'resp' | 'exp'`.
`Assumptions` shape: `tiers[]`, `multipliers[]`, `sourceBuckets[{label, surcharge}]`, `highVolumeSurcharge`, `annualDiscount`, `storageSavingsLow`, `storageSavingsHigh`, `moduleSavings`, `implementation{pct, points[]}`, `modules: Record<ModuleKey, ModuleDefinition>`, `tierNames[{max, name, desc}]`.
`ModuleDefinition` = `{ name, level, base, points[] }`.

Ingest tiers (monthly USD): Bring your own SIEM/Data lake `$0` · Under 50 GB/day `$2,400` · 50–100 GB/day `$3,840` · 100–300 GB/day `$7,400` · 300–500 GB/day `$10,200` · 500–750 GB/day `$13,200` · 750 GB/day–1 TB/day `$15,000`.

> **Commercially sensitive and currently publicly indexable.** See §9.

---

## 14. Defects & Technical Debt Found in Current Code

Decide per item: **carry over as-is** (pure parity) or **fix during the rebuild**.

| # | Severity | Issue | Location | Recommended action |
|---|---|---|---|---|
| 1 | 🔴 **P0** | `import { text } from "stream/consumers";` — a **Node.js core module imported into a shared/client component**. Unused; a stray auto-import. Risks bundling failure. | `src/components/Footer.tsx:5` | **Delete the line.** Do not port. |
| 2 | 🔴 **P0** | **8 pages have zero SEO metadata** because they are `'use client'`: `/pricing`, 3× `/case-studies/*`, 5× `/resources/*` | see §8.2 | Split into Server `page.tsx` (exports `metadata`) + `XClient.tsx`. Pattern already used by `/connect`. |
| 3 | 🔴 **P0** | `/blog` OG & Twitter image is a **404** (`Headless-SecOps-for-the-Agentic-World.png` does not exist) | `src/app/blog/page.tsx` | Point to `/blog-cover-images/introducing-headless-secops-for-the-agentic-world.webp` |
| 4 | 🟠 **P1** | JSON-LD `publisher.logo.url` → `https://www.trenchsecurity.ai/logo.png` — **404** | `src/app/blog/[slug]/page.tsx:120` | Change to `/logo/trench-logo.png` |
| 5 | 🟠 **P1** | `metadata.icons.apple: "/apple-touch-icon.png"` — **file does not exist** | `layout.tsx` | Generate a 180×180 PNG and add it |
| 6 | 🟠 **P1** | `src/app/not-found.tsx` **missing** — 404s render the bare Next.js default with no Navbar/Footer | `src/app/` | Add a branded 404 page |
| 7 | 🟠 **P1** | **12.2 MB PDF** (`TRENCH SIGNAL.pdf`) served from `/public` — bloats every deployment | `public/` | Move to Vercel Blob / S3 / CDN |
| 8 | 🟠 **P1** | `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` exposed to the browser though it is **only read server-side** in Route Handlers | `.env`, both API routes | Rename to `GOOGLE_APPS_SCRIPT_URL` (drop the `NEXT_PUBLIC_` prefix) |
| 9 | 🟠 **P1** | `/pricing`, with full price tiers, is **indexable** — excluded from the sitemap only | `src/app/pricing/page.tsx` | Add `robots: { index:false, follow:false }`, or accept it publicly |
| 10 | 🟡 **P2** | **~3,828 lines of dead components** across 7 files | `src/components/` | Do not port |
| 11 | 🟡 **P2** | 3 unused npm deps: `gsap`, `ogl`, `next-seo` | `package.json` | Drop |
| 12 | 🟡 **P2** | ~110 unused static font files (only 2 variable TTFs load) | `public/fonts/` | Prune |
| 13 | 🟡 **P2** | Tailwind-style class names everywhere with **no Tailwind installed** — they are inert | across JSX | See §11 warning. Pick one system and be consistent. |
| 14 | 🟡 **P2** | 21 blog images hot-linked from `static.wixstatic.com` — external dependency, no CDN control, **incompatible with `next/image`** given `remotePatterns: []` | `postsData.ts` | Self-host into `/public/blog/` |
| 15 | 🟡 **P2** | `code.gs` logos hardcoded to `raw.githubusercontent.com/chandrasekar-velu23/trench-home/main/...` | `scripts/code.gs:11-12` | Repoint to `https://www.trenchsecurity.ai/logo/...` so emails survive a repo change |
| 16 | 🟡 **P2** | `code.gs` contains test functions with a **personal email** (`chandrasekar.v2304@gmail.com`) and a sample LinkedIn URL | `scripts/code.gs:482, 508, 520, 529` | Remove before any handover |
| 17 | 🟡 **P2** | `/api/community-signup` swallows Apps Script failures and still returns `success` — **silent data loss** | `route.ts:118-126` | Log to an alerting channel, or surface a soft warning |
| 18 | 🟡 **P2** | Dead code in `api/submit-form`: `getGoogleSheetsToken()` always returns `null`; `SHEET_ID`/`SHEET_NAME` declared but unused; `sendEmailNotification()` only `console.log`s — and `removeConsole` strips it in production, so it is a **no-op** | `api/submit-form/route.ts` | Delete, or wire a real fallback (e.g. Resend/SES) |
| 19 | 🟡 **P2** | `public/mc.js` duplicates the Mailchimp loader already inline in `layout.tsx`, and is referenced by nothing | `public/mc.js` | Delete |
| 20 | 🔵 **P3** | `create-next-app` boilerplate left in `README.md` (still claims the project uses the Geist font); leftover SVGs; empty `~/` directory; `pricing-calculator.css` is 1 line | repo root, `public/` | Clean up |
| 21 | 🔵 **P3** | Filenames with spaces + mojibake (`launching-u201creal-time-data-safetyu201d-...`) | `public/` | Normalise to kebab-case **and update all references** |
| 22 | 🔵 **P3** | Integration id typo `anivilogic` (the vendor is **Anvilogic**) | `IntegrationsClient.tsx` | Fix the id |
| 23 | 🔵 **P3** | jQuery 3.7.1 loaded `beforeInteractive` **site-wide**, but only the orphaned Mailchimp form needs it — render-blocking on every page | `layout.tsx` | Drop if `NewsletterForm` is not revived |
| 24 | 🔵 **P3** | No `Organization` / `WebSite` / `BreadcrumbList` / `FAQPage` / `JobPosting` JSON-LD despite having the content for all of them | site-wide | Rich-results upside |
| 25 | 🔵 **P3** | `.gitignore` has blanket `*.md`, `*.json`, `*.gs` rules — silently excludes documentation and `code.gs` from version control | `.gitignore` | Scope these rules in the new repo |
| 26 | 🔵 **P3** | `/resources/events` is in the sitemap but has **no inbound internal link** | nav | Link it or drop it |

---

## 15. Pre-Deploy Parity Gate (Go / No-Go)

Run every check against the **new build's Vercel preview deployment** before pointing the domain at it.

### P0 — Blocks deployment

- [ ] **All 40 sitemap URLs resolve `200`** on the new build (or have an explicit `301`). Diff `/sitemap.xml` line-by-line against §9.
- [ ] `/robots.txt` matches §9 (`Host` + `Sitemap` lines present).
- [ ] `next-sitemap` installed **and** `"postbuild": "next-sitemap"` present in `package.json`.
- [ ] `next-sitemap.config.js` present with identical `siteUrl`, `generateIndexSitemap:false`, `exclude:['/api/*','/pricing']`.
- [ ] **GTM `GTM-P4DNDLW4`** fires — verify in GTM Preview / Tag Assistant.
- [ ] **GTM `<noscript>` iframe** present as the first child of `<body>`.
- [ ] **GA4 `G-E1SQD3N78D`** fires a `page_view` — verify in GA4 Realtime.
- [ ] **Microsoft Clarity `y14biiygt7`** records a session.
- [ ] **ContentSquare `915bc8852a0d2`** script loads (Network tab).
- [ ] **Mailchimp connected-site script** loads (`chimpstatic.com/.../e293fdae0e4a09d187dabd8c1/5358e9752afc32c595d726957.js`).
- [ ] **Vercel Analytics** `<Analytics />` present and reporting.
- [ ] **Google verification meta tag** `oYp5PFy7iOQQx5URYjzRrVn_etEIbG1qLxoRQ3PPB-4` in `<head>`.
- [ ] **`/googlec87b45408e1ef533.html`** returns the verification string.
- [ ] `metadataBase` = `https://www.trenchsecurity.ai`.
- [ ] Root `title.template` = `"%s | Trench Security"`, `title.default` = `"Trench | Agentic OS for Actionable SecOps"`.
- [ ] All **canonical URLs** from §8.2 present and absolute.
- [ ] **`POST /api/submit-form`** works end-to-end → row lands in Sheet tab **`Form Submissions`** + admin email received. Test **both** Connect and MSSP payload shapes.
- [ ] **`POST /api/community-signup`** works end-to-end → row lands in tab **`BPL Submissions`** + welcome email received. Test that a `gmail.com` address is **rejected**.
- [ ] All 4 `NEXT_PUBLIC_*` env vars set in **Vercel Production**.
- [ ] All **5 security headers** present on `/` (`curl -I`).
- [ ] `Cache-Control: public, max-age=31536000, immutable` on `/integrations/*`.
- [ ] **Brevo iframes** render on `/newsletter-signup` and `/newsletter-signout` with the **exact** signed serve URLs.
- [ ] No `stream/consumers` import (defect #1) anywhere.
- [ ] Production build succeeds: `npm run build` with **zero** errors.

### P1 — Fix before, or immediately after, cutover

- [ ] All **15 blog slugs** render at `/blog/[slug]` with correct covers, table of contents and body.
- [ ] Both **announcement slugs** render at `/announcements/[slug]`.
- [ ] **JSON-LD `BlogPosting`** present on every blog post — validate with the [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] OG image renders for `/`, `/blog`, `/announcements` and a sample post — check with the LinkedIn Post Inspector and the Twitter Card Validator.
- [ ] Fonts load: Bricolage Grotesque, Space Grotesk, Poppins — no FOUT/FOIT regression.
- [ ] Brand blue `#0D41E1` consistent everywhere.
- [ ] **Navbar** links match §13 exactly (incl. the Resources dropdown and both rotating announcement links).
- [ ] **Footer** links match §13 exactly (incl. all 3 `compliance.trenchsecurity.ai` links and `mailto:ask@trenchsecurity.ai`).
- [ ] All **40 integration logos** load on `/integrations`; category filters work.
- [ ] **Pricing calculator** produces identical numbers for identical inputs (spot-check every tier in §13).
- [ ] `FloatingNewsletterButton` behaviour matches: 2.5s auto-expand, 8s collapse, `localStorage` key `trench_newsletter_expanded`, hidden on `/newsletter-signup` and `/pricing*`.
- [ ] Lenis smooth scroll active; `ClickSpark` fires with the same params.
- [ ] `error.tsx` + `loading.tsx` present; **`not-found.tsx` added**.
- [ ] Every `/public` reference resolves — re-run the broken-asset check in §12.
- [ ] Both PDFs downloadable.
- [ ] YouTube (×2), LinkedIn (×4) and Luma embeds render on `/resources/*` and `/case-studies/ocrolus`.
- [ ] PDF.js viewer works on `/resources/trench-labs`.
- [ ] `react-phone-number-input` renders correctly on `/connect` and `/for-mssps` (its CSS overrides live in `globals.css`).
- [ ] Mobile nav + responsive breakpoints verified at 375 / 768 / 1024 / 1440 / 1920.

### P2 — Post-launch verification (first 72h)

- [ ] Google Search Console: sitemap re-submitted, **no new coverage errors**.
- [ ] GSC **Core Web Vitals** not regressed vs. the previous build.
- [ ] GA4 sessions/pageviews within normal variance of the pre-cutover baseline.
- [ ] Clarity + ContentSquare recording sessions.
- [ ] Form submissions still arriving in **all three** Sheet tabs.
- [ ] No spike in 404s (Vercel logs).
- [ ] Lighthouse: Performance / Accessibility / Best Practices / SEO ≥ previous scores.
- [ ] Social previews correct across LinkedIn, X/Twitter and Slack unfurls.

### ⚠️ Unresolvable from the codebase — verify externally

- [ ] **Export the GTM container `GTM-P4DNDLW4`** and inventory every tag inside it. **Hotjar, LinkedIn Insight Tag, Google Ads conversions and any consent-management platform would live here and are invisible to this audit.**
- [ ] **Vercel dashboard:** custom domains (`trenchsecurity.ai` **and** `www`), the apex→www redirect, SSL certs, and any Edge Config / redirects configured **in the dashboard rather than in code**.
- [ ] **Vercel plan** reads `hobby` in the OIDC claim — confirm whether production actually runs on Pro/Enterprise (affects analytics retention, function limits, and concurrency).
- [ ] **DNS:** current A/CNAME records and TTLs (lower them **before** cutover), plus email records (SPF/DKIM/DMARC — do not disturb; `ask@trenchsecurity.ai` deliverability depends on them).
- [ ] **Google Apps Script:** deployment is live, "Execute as" / "Who has access" unchanged, `FROM_ALIAS` still verified in Gmail, and the Sheet `12SIh6juJYamU4py1WWZ8Oz42QagUfwfNsXoJZszD2l8` still has all three tabs.
- [ ] **Brevo:** all 3 form serve URLs still active and mapped to the right lists.
- [ ] **Mailchimp:** decide keep vs. retire (audience `692ac1a3f3`).
- [ ] `compliance.trenchsecurity.ai` is a **separate property** — unaffected by this migration, but confirm it stays reachable (5 footer links depend on it).

---

## 16. Cutover Runbook

### Phase 1 — Build (new folder, no changes to this repo)

1. Scaffold the new project. Match: Next.js 16.2.4, React 19.2.4, TypeScript strict, App Router, `@/*` → `./src/*`.
2. Copy verbatim: `next.config.ts` (§10), `next-sitemap.config.js` (§9), `.gitignore` (scoped per defect #25).
3. Copy `/public` — **minus** the prune list in §12 (unused fonts, leftover SVGs, `mc.js`) and **plus** the missing files from §12 (`apple-touch-icon.png`).
4. Port `src/app/layout.tsx` **analytics block first**, before any UI work. All 11 items in §4.
5. Port both API routes (§6) unchanged — the payload contract to `code.gs` must not drift.
6. Port `postsData.ts` and `announcementsData.ts` unchanged (their slugs are live SEO URLs).
7. Build the new UI. Skip the 7 dead components in §13.
8. Add the missing `not-found.tsx`; fix the P0/P1 defects from §14.

### Phase 2 — Verify on preview

9. `npm run build` — must pass clean.
10. Deploy to a **Vercel preview** URL.
11. Work §15 P0 top to bottom. **Any P0 red = stop.**
12. Work §15 P1.
13. Crawl the preview (Screaming Frog or similar) and **diff the URL list against the 40 in §9**.

### Phase 3 — Cutover

14. Lower DNS TTL to 300s **at least 24h in advance**.
15. Snapshot the baseline: GA4 traffic, GSC coverage/impressions, Lighthouse scores.
16. Note the current production deployment ID in Vercel — this is the instant-rollback target.
17. Point the Vercel project at the new repo/branch, **or** promote the new deployment to production.
18. Confirm `www.trenchsecurity.ai` serves the new build; confirm the apex redirect still works.
19. Immediately re-check: `/robots.txt`, `/sitemap.xml`, `/googlec87b45408e1ef533.html`, GA4 Realtime, and one form submission end-to-end.

### Phase 4 — Post-launch

20. Re-submit the sitemap in Search Console.
21. Work §15 P2 over 72 hours.
22. Keep the old deployment available for instant rollback for **at least 7 days**.
23. Restore DNS TTL.
24. If any asset filenames changed, add `301` redirects in `next.config.ts` `redirects()`.

---

## Appendix A — Quick Reference: Every ID & Key

| Service | Identifier |
|---|---|
| Google Tag Manager | `GTM-P4DNDLW4` |
| Google Analytics 4 | `G-E1SQD3N78D` |
| Microsoft Clarity | `y14biiygt7` |
| ContentSquare UXA | `915bc8852a0d2` |
| Mailchimp user | `e293fdae0e4a09d187dabd8c1` |
| Mailchimp script | `5358e9752afc32c595d726957` |
| Mailchimp audience | `692ac1a3f3` (`f_id=003177e1f0`, dc `us1`) |
| Brevo form host | `752fd23d.sibforms.com` |
| Google verification (meta) | `oYp5PFy7iOQQx5URYjzRrVn_etEIbG1qLxoRQ3PPB-4` |
| Google verification (file) | `googlec87b45408e1ef533.html` |
| Google Sheet ID | `12SIh6juJYamU4py1WWZ8Oz42QagUfwfNsXoJZszD2l8` |
| Apps Script deployment | `<REDACTED>` |
| Vercel project | `trench-home` / `prj_db2mW1d0fdPgf5vwGDy6xuGkA5dW` |
| Vercel org | `team_VO319051phyld1JVUugmJ0B6` |
| Luma calendar | `cal-FwLKyNupiOO86Mg` |
| GitHub repo | `chandrasekar-velu23/trench-home` |
| Admin email | `ask@trenchsecurity.ai` |
| Brand blue | `#0D41E1` (hover `#0b36c2`) |
| Sheet tabs | `Form Submissions`, `Job Applications`, `BPL Submissions` |
| Drive folder | `Trench Job Applications` |

## Appendix B — Files That Must Be Copied Verbatim

```
next-sitemap.config.js                       SEO generation config
public/googlec87b45408e1ef533.html           Search Console verification
public/trench.svg                            favicon
public/logo/trench-logo.png                  OG image + Apps Script email logo
public/BPL/BPL LOGO.png                      Apps Script BPL email logo
src/app/blog/postsData.ts                    15 live blog URLs + content
src/app/announcements/announcementsData.ts    2 live announcement URLs + content
src/app/api/submit-form/route.ts             Apps Script payload contract
src/app/api/community-signup/route.ts        Apps Script payload contract
scripts/code.gs                              reference only — lives in Google Apps Script,
                                             not deployed with the site
```

---

*Generated by static analysis of the repository at commit `1a26793`. Items marked "verify externally" cannot be determined from source code and require access to the Vercel dashboard, the GTM container, Google Apps Script, Brevo and Mailchimp.*
