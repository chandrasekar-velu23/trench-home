#!/usr/bin/env bash
# Pre-launch assertions. Run after `npm run build`; exits non-zero on any failure.
# Covers the seven launch blockers, the pre-launch and follow-up audit items,
# and the AEO output (server-rendered content, llms.txt, structured data).
set -uo pipefail
cd "$(dirname "$0")/.."
FAIL=0
chk() { # chk <label> <expected> <actual>
  if [ "$2" = "$3" ]; then printf '  ✅ %s\n' "$1"
  else printf '  ❌ %s (expected %s, got %s)\n' "$1" "$2" "$3"; FAIL=1; fi
}
yes() { [ "$1" ] && echo 1 || echo 0; }              # 1 if the command produced output
has() { grep -qE -- "$1" "$2" 2>/dev/null && echo 1 || echo 0; }
count() { grep -cE -- "$1" "$2" 2>/dev/null || true; }

echo "── Blocker 1: indexability & social metadata ──"
chk "robots.txt: Allow: / for all agents"  1 "$(has '^Allow: /$' dist/robots.txt)"
chk "robots.txt: no site-wide Disallow"    0 "$(count '^Disallow: /$' dist/robots.txt)"
chk "single robots meta on /"              1 "$(count 'name="robots"' dist/index.html)"
chk "no noindex on /"                      0 "$(count 'noindex' dist/index.html)"
chk "no 'Figma Make App' anywhere in dist" 0 "$(grep -rl 'Figma Make App' dist --include=*.html | wc -l | tr -d ' ')"
chk "single description meta on /"         1 "$(count 'name="description"' dist/index.html)"

echo "── Blocker 2: hosting config ──"
chk "vercel.json present"                  1 "$(yes "$(ls vercel.json 2>/dev/null)")"
chk "install pinned to npm ci"             1 "$(has '"installCommand": "npm ci"' vercel.json)"
chk "5 security headers"                   5 "$(grep -cE 'X-Content-Type-Options|X-Frame-Options|X-XSS-Protection|Referrer-Policy|Permissions-Policy' vercel.json)"
chk "no catch-all rewrite (real 404s)"     0 "$(count '"rewrites"' vercel.json)"
chk "404.html exists"                      1 "$(yes "$(ls dist/404.html 2>/dev/null)")"
chk "404.html is noindex"                  1 "$(count 'name="robots" content="noindex' dist/404.html)"
for r in /home /careers /career/soc-analyst; do
  chk "301 for $r"                         1 "$(has "\"source\": \"$r\"" vercel.json)"
done

echo "── Blocker 3: production API ──"
for f in api/submit-form.ts api/community-signup.ts api/_lib/forms.ts; do
  chk "$f"                                 1 "$(yes "$(ls $f 2>/dev/null)")"
done
chk "dead src/api removed"                 0 "$(yes "$(ls -d src/api 2>/dev/null)")"
chk "no fake-success in forms"             0 "$(grep -l 'show success to user' src/connect/ConnectClient.tsx src/for-mssps/ForMSSPsClient.tsx 2>/dev/null | wc -l | tr -d ' ')"

echo "── Blocker 4: tracking stack ──"
chk "GTM script loader"                    1 "$(count 'GTM-P4DNDLW4.\);' dist/index.html)"
chk "GTM noscript frame"                   1 "$(count 'ns.html\?id=GTM-P4DNDLW4' dist/index.html)"
chk "GA4 gtag.js loaded"                   1 "$(count 'gtag/js\?id=G-E1SQD3N78D' dist/index.html)"
chk "GA4 configured"                       1 "$(count "gtag\('config', 'G-E1SQD3N78D'\)" dist/index.html)"
chk "no GA placeholder"                    0 "$(count 'G-XXXXXXXXXX' dist/index.html)"
chk "Clarity tag loaded"                  1 "$(count 'clarity.ms/tag/y14biiygt7' dist/index.html)"
chk "ContentSquare tag loaded"            1 "$(count 'contentsquare.net/uxa/915bc8852a0d2.js' dist/index.html)"
chk "Mailchimp connected site"             1 "$(count 'chimpstatic' dist/index.html)"
chk "GSC meta token"                       1 "$(count 'oYp5PFy7iOQQ' dist/index.html)"
chk "GSC file token"                       1 "$(yes "$(ls dist/googlec87b45408e1ef533.html 2>/dev/null)")"

echo "── Blocker 5 / sitemap: every URL is a real page ──"
missing=0; n=0
# Read line by line: the homepage URL strips to an empty path, which a
# word-splitting for-loop would silently drop.
while IFS= read -r p; do
  n=$((n+1)); f="dist${p}/index.html"; [ -z "$p" ] && f="dist/index.html"
  [ -f "$f" ] || { echo "     missing prerender for ${p:-/}"; missing=$((missing+1)); }
done < <(grep -oE '<loc>[^<]+' dist/sitemap.xml | sed 's#<loc>https://www.trenchsecurity.ai##')
chk "sitemap has 41 URLs"                  41 "$n"
chk "every sitemap URL prerendered"        0 "$missing"
for u in /how-it-works /career/ai-lead-security-rd /career/ai-ml-lead /career/lead-agentic-secops /blog/trench-agentic-secops-skills-vs-playbooks; do
  chk "sitemap has $u"                     1 "$(count "${u}<" dist/sitemap.xml)"
done
chk "soc-analyst not in sitemap"           0 "$(count '/career/soc-analyst<' dist/sitemap.xml)"
chk "pricing not in sitemap"               0 "$(count '/pricing<' dist/sitemap.xml)"
chk "pricing robots noindex"               1 "$(count 'name="robots" content="noindex' dist/pricing/index.html)"

echo "── AEO: content is in the HTML, not only in JavaScript ──"
empty=0; total=0
while IFS= read -r f; do
  total=$((total+1)); grep -q '<div id="root"></div>' "$f" && { echo "     empty #root: $f"; empty=$((empty+1)); }
done < <(find dist -name 'index.html' -o -name '404.html' | grep -v '^dist/assets')
chk "all $total HTML files carry rendered content" 0 "$empty"
# React's streaming format puts suspended content in <div hidden id="S:n"> and
# reveals it with a script: invisible without JavaScript and to crawlers.
chk "no page content inside hidden streaming segments" 0 "$(grep -lE '<div hidden id="S:|\$RC\(' $(find dist -name index.html) dist/404.html | wc -l | tr -d ' ')"
nomain=0
for f in $(find dist -name index.html) dist/404.html; do
  [ "$(grep -o '<main[ >]' "$f" | wc -l | tr -d ' ')" = 1 ] || { echo "     not exactly one <main>: $f"; nomain=$((nomain+1)); }
done
chk "every page has exactly one <main> landmark" 0 "$nomain"
unhoisted=0
for f in $(find dist -name index.html) dist/404.html; do
  [ "$(grep -o '<style data-ssr-style>' "$f" | wc -l)" = "$(grep -o '<style>' "$f" | wc -l)" ] || { echo "     inline styles not copied into <head>: $f"; unhoisted=$((unhoisted+1)); }
done
chk "every inline <style> has a <head> copy (styled from first paint)" 0 "$unhoisted"
chk "home HTML contains FAQ copy"         1 "$(has 'What is Trench\?' dist/index.html)"
chk "home HTML contains site navigation"   1 "$(has 'href="/why-trench"' dist/index.html)"
chk "blog post HTML contains article body" 1 "$(has 'Mid-sized organizations face a cybersecurity paradox' dist/blog/why-mid-sized-companies-struggle-with-soc-automation-and-how-to-fix-it/index.html)"
chk "career page HTML contains job copy"   1 "$(has 'Agentic SecOps' dist/career/ai-lead-security-rd/index.html)"
chk "llms.txt present"                     1 "$(yes "$(ls dist/llms.txt 2>/dev/null)")"
chk "llms.txt lists all 15 blog posts"     15 "$(count '^- \[.*\]\(https://www.trenchsecurity.ai/blog/' dist/llms.txt)"
words=$(wc -w < dist/llms-full.txt 2>/dev/null || echo 0)
chk "llms-full.txt has > 20k words"        1 "$([ "${words:-0}" -gt 20000 ] && echo 1 || echo 0)"
chk "llms.txt advertised in <head>"        1 "$(count 'rel="alternate" type="text/plain"' dist/index.html)"
for bot in GPTBot ClaudeBot PerplexityBot Google-Extended; do
  chk "robots.txt names $bot"              1 "$(count "^User-agent: $bot$" dist/robots.txt)"
done

echo "── Structured data ──"
chk "home: Organization + WebSite + FAQPage" 3 "$(count 'application/ld\+json' dist/index.html)"
chk "home: FAQPage"                        1 "$(count '"@type":"FAQPage"' dist/index.html)"
chk "post: BlogPosting + BreadcrumbList"   2 "$(count 'application/ld\+json' dist/blog/modernizing-soc-using-agentic-ai/index.html)"
chk "post: publisher logo is a real file"  1 "$(yes "$(ls dist/logo/trench-logo.png 2>/dev/null)")"
chk "career: JobPosting"                   1 "$(count '"@type":"JobPosting"' dist/career/ai-ml-lead/index.html)"
chk "announcement: NewsArticle"            1 "$(count '"@type":"NewsArticle"' dist/announcements/products-that-count-2026/index.html)"
chk "no duplicate BlogPosting in body"     1 "$(count '"@type":"BlogPosting"' dist/blog/modernizing-soc-using-agentic-ai/index.html)"

echo "── Per-route metadata ──"
chk "/ title"                              1 "$(count '<title>Trench \| Agentic OS for Actionable SecOps</title>' dist/index.html)"
chk "/why-trench own title"                1 "$(count '<title>Why Trench \| Trench Security</title>' dist/why-trench/index.html)"
chk "/why-trench own canonical"            1 "$(count 'rel="canonical" href="https://www.trenchsecurity.ai/why-trench"' dist/why-trench/index.html)"
chk "post has its own og:image"            1 "$(count 'og:image" content="https://www.trenchsecurity.ai/blog-cover-images/modernizing-soc-using-agentic-ai.png"' dist/blog/modernizing-soc-using-agentic-ai/index.html)"

echo "── Performance ──"
entry=$(ls dist/assets/index-*.js 2>/dev/null | head -1)
entry_kb=$(( $(stat -c%s "$entry" 2>/dev/null || echo 0) / 1024 ))
chk "entry JS chunk < 500 KB (now ${entry_kb} KB)" 1 "$([ "$entry_kb" -gt 0 ] && [ "$entry_kb" -lt 500 ] && echo 1 || echo 0)"
chk "pages are split into chunks"          1 "$([ "$(ls dist/assets/*.js | wc -l)" -gt 20 ] && echo 1 || echo 0)"
chk "no Google Fonts requests"             0 "$(grep -rlE 'fonts\.(googleapis|gstatic)\.com' dist --include=*.html --include=*.css | wc -l | tr -d ' ')"
chk "self-hosted fonts present"            1 "$(yes "$(ls dist/fonts/bricolage-grotesque-latin.woff2 dist/fonts/poppins-400-latin.woff2 2>/dev/null | sed -n 2p)")"
big_video=$(find public -name '*.mp4' -size +5M | wc -l | tr -d ' ')
chk "no video over 5 MB in public/"        0 "$big_video"
chk "BPL video posters present"            7 "$(ls public/BPL/optimized/posters/*.jpg 2>/dev/null | wc -l | tr -d ' ')"
big_img=$(find public -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.webp' \) -size +1200k | wc -l | tr -d ' ')
chk "no image over 1.2 MB in public/"      0 "$big_img"
chk "no Wix-hosted images"                 0 "$(grep -rl 'static.wixstatic.com' src dist --include=*.ts --include=*.tsx --include=*.html 2>/dev/null | wc -l | tr -d ' ')"

echo "── Blocker 6: secrets & env ──"
chk "Apps Script URL not in bundle"        0 "$(grep -rl 'script.google.com' dist 2>/dev/null | wc -l | tr -d ' ')"
chk "no Apps Script deployment id in dist" 0 "$(grep -rl 'AKfycb' dist 2>/dev/null | wc -l | tr -d ' ')"
chk "no spreadsheet link in dist"          0 "$(grep -rl 'docs.google.com/spreadsheets' dist 2>/dev/null | wc -l | tr -d ' ')"
chk "no NEXT_PUBLIC_ value in dist"        0 "$(grep -rl 'NEXT_PUBLIC_' dist 2>/dev/null | wc -l | tr -d ' ')"
chk "client code reads no env vars"        0 "$(grep -rlE 'process\.env|import\.meta\.env' src | wc -l | tr -d ' ')"
chk "form settings never read in src/"     0 "$(grep -rlE 'GOOGLE_APPS_SCRIPT_URL|ADMIN_EMAIL' src | wc -l | tr -d ' ')"
chk "only VITE_ reaches the browser"       1 "$(count "envPrefix: 'VITE_'" vite.config.ts)"
chk "old NEXT_PUBLIC_ names accepted"      1 "$(count 'NEXT_PUBLIC_.{name}' api/_lib/forms.ts)"
chk ".env.example committed"               1 "$(yes "$(ls .env.example 2>/dev/null)")"
chk ".env is gitignored"                   1 "$(git check-ignore -q .env && echo 1 || echo 0)"

echo "── Blocker 7 / icons & manifest ──"
for f in trench.svg apple-touch-icon.png icon-192.png icon-512.png site.webmanifest logo/trench-og-image.png logo/trench-logo.png; do
  chk "dist/$f"                            1 "$(yes "$(ls "dist/$f" 2>/dev/null)")"
done

echo "── Follow-ups & code hygiene ──"
chk "no imports from 'next'"               0 "$(grep -rlE "from ['\"]next['\"]" src | wc -l | tr -d ' ')"
chk "no orphaned Next files"               0 "$(ls src/layout.tsx src/loading.tsx src/compat/next-shim.tsx 'src/blog/[slug]/page.tsx' 2>/dev/null | wc -l | tr -d ' ')"
chk "error boundary wired"                 1 "$(has '<ErrorBoundary' src/App.tsx)"
chk "CI workflow present"                  1 "$(yes "$(ls .github/workflows/ci.yml 2>/dev/null)")"
chk "no insecure http:// self-link"        0 "$(grep -rc 'http://trenchsecurity.ai' src | awk -F: '{s+=$2} END {print s+0}')"
chk "no public .zip"                       0 "$(find public -name '*.zip' | wc -l | tr -d ' ')"
# Every static /public path referenced from source must exist (URL-decoded).
# Matched against a listing of the REAL filenames rather than fs.existsSync:
# Vercel serves from a case-sensitive filesystem, so /Certificates/x.webp is a
# 404 in production even though it resolves on Windows and macOS.
missing_assets=$(node -e '
const fs=require("fs"),path=require("path");
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const real=new Set(walk("public").map(p=>"/"+path.relative("public",p).split(path.sep).join("/")));
const ci=new Map([...real].map(p=>[p.toLowerCase(),p]));
const re=/["\x27`(](\/[A-Za-z0-9 _%().,\-\/]+\.(?:png|jpe?g|webp|svg|gif|pdf|mp4|avif|woff2))(?=["\x27`)\\?#])/g;
const miss=new Set();
for(const f of walk("src").filter(f=>/\.(tsx?|css)$/.test(f))){
  for(const m of fs.readFileSync(f,"utf8").matchAll(re)){
    let p=m[1]; try{p=decodeURIComponent(p)}catch{}
    if(real.has(p)) continue;
    const hit=ci.get(p.toLowerCase());
    miss.add(hit?p+"  (wrong case; on disk: "+hit+")":p);
  }
}
for(const p of miss) console.error("     missing asset "+p);
console.log(miss.size);')
chk "every referenced asset exists (exact case)" 0 "$missing_assets"

echo "── Security ──"
chk "HSTS header"                          1 "$(count 'Strict-Transport-Security' vercel.json)"
chk "CSP: no plugins, no framing, form-action self" 1 "$(grep -c "object-src 'none'; frame-ancestors 'self'; form-action 'self'" vercel.json)"
chk "API responses: no-store + noindex"    1 "$(count 'X-Robots-Tag' vercel.json)"
chk "API: origin allowlist"                1 "$(has 'function originAllowed' api/_lib/forms.ts)"
chk "API: formula-injection guard"         1 "$(has 'export function sheetSafe' api/_lib/forms.ts)"
chk "API: rate limit + honeypot"           1 "$(has 'HONEYPOT_FIELD' api/_lib/forms.ts)"
for p in connect for-mssps resources/community/bpl-signup; do
  chk "honeypot field on /$p"              1 "$(count 'name="company_website"' "dist/$p/index.html")"
done
chk "@vercel/node removed"                 0 "$(grep -c '@vercel/node' package.json)"

echo "── Case studies, newsletter button, BPL ──"
chk "/case-studies prerendered"            1 "$(yes "$(ls dist/case-studies/index.html 2>/dev/null)")"
chk "/case-studies in sitemap"             1 "$(count '/case-studies<' dist/sitemap.xml)"
chk "/case-studies links the 3 existing URLs" 3 "$(grep -oE 'href="/case-studies/(ocrolus|sbfe|whatfix)"' dist/case-studies/index.html | sort -u | wc -l | tr -d ' ')"
chk "/case-studies ItemList JSON-LD"       1 "$(count '"@type":"ItemList"' dist/case-studies/index.html)"
chk "case study breadcrumb passes /case-studies" 1 "$(has '"item":"https://www.trenchsecurity.ai/case-studies"' dist/case-studies/ocrolus/index.html)"
chk "footer links /case-studies"           1 "$(has 'href="/case-studies"' dist/index.html)"
chk "floating newsletter button on /"      1 "$(has 'class="floating-newsletter-btn"' dist/index.html)"
chk "no floating button on /newsletter-signup" 0 "$(grep -c 'class="floating-newsletter-btn"' dist/newsletter-signup/index.html)"
chk "home BPL section"                     1 "$(has 'id="home-bpl-title"' dist/index.html)"
chk "home BPL 'Read more' -> /resources/community" 1 "$(has 'href="/resources/community" class="home-bpl-cta"' dist/index.html)"

echo "── Video indexing ──"
chk "webinars: 3 VideoObject"              3 "$(grep -o '"@type":"VideoObject"' dist/resources/webinars/index.html | wc -l | tr -d ' ')"
chk "community: VideoObject"               1 "$(grep -o '"@type":"VideoObject"' dist/resources/community/index.html | wc -l | tr -d ' ')"
chk "ocrolus: VideoObject"                 1 "$(grep -o '"@type":"VideoObject"' dist/case-studies/ocrolus/index.html | wc -l | tr -d ' ')"
chk "video sitemap: 5 entries"             5 "$(grep -o '<video:video>' dist/sitemap.xml | wc -l | tr -d ' ')"
chk "no YouTube player until clicked"      0 "$(grep -ohE '<iframe[^>]*youtube' dist/resources/webinars/index.html dist/resources/community/index.html dist/case-studies/ocrolus/index.html | wc -l | tr -d ' ')"
chk "llms.txt lists the videos"            5 "$(grep -c 'youtube.com/watch?v=' dist/llms.txt)"
thumbs=0
for id in $(grep -oE "id: '[A-Za-z0-9_-]{11}'" seo/videos.ts | cut -d"'" -f2); do
  [ -f "public/videos/$id-480.webp" ] && [ -f "public/videos/$id-960.webp" ] || { echo "     no self-hosted thumbnail for $id"; thumbs=$((thumbs+1)); }
done
chk "every embedded video has local thumbnails" 0 "$thumbs"
chk "no YouTube request before a click"    0 "$(grep -ohE '(src|srcset)="https://i\.ytimg' dist/resources/webinars/index.html dist/resources/community/index.html dist/case-studies/ocrolus/index.html | wc -l | tr -d ' ')"
chk "metric-matched fallback fonts"        4 "$(grep -c 'font-family: "[A-Za-z ]* Fallback:' src/fonts.css)"

echo "── Core Web Vitals safeguards ──"
hidden_h1=$(grep -lE 'opacity:0[^<]*>(<[^h][^>]*>)*<h1|<h1[^>]*><span style="[^"]*opacity:0' $(find dist -name index.html) 2>/dev/null | wc -l | tr -d ' ')
chk "no page ships its h1 hidden (LCP)"    0 "$hidden_h1"
chk "footer graphic lazy-loaded"           1 "$(has 'src="/footer.webp"[^>]*loading="lazy"' dist/index.html)"
blog_nodim=$(grep -ohE '<img [^>]*src="/blog/[^"]*"[^>]*>' dist/blog/*/index.html | grep -vc 'width=' || true)
chk "blog body images carry width/height (CLS)" 0 "$blog_nodim"
chk "nav icons are WebP"                   0 "$(ls src/Icon/*.png 2>/dev/null | wc -l | tr -d ' ')"
big=$(find public -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.webp' \) -size +700k | wc -l | tr -d ' ')
chk "no image over 700 KB in public/"      0 "$big"
chk "LinkedIn embeds lazy-loaded"          4 "$(grep -o 'loading="lazy"[^>]*linkedin.com/embed\|linkedin.com/embed[^>]*loading="lazy"' dist/resources/events/index.html | wc -l | tr -d ' ')"
chk "PDF viewer uses range requests"       1 "$(has 'disableAutoFetch: true' src/resources/trench-labs/page.tsx)"
chk "client hydrates the prerendered DOM"  1 "$(has 'hydrateRoot' src/main.tsx)"
chk "landing page skips entrance animation (LCP)" 1 "$(has '<html lang="en" data-landing>' dist/index.html)"
chk "page fade-in scoped to navigation"    1 "$(has 'html:not\(\[data-landing\]\) \.page-main' src/index.css)"
# Page CSS must be linked in the HTML, or it arrives with the JS and restyles
# the page after first paint (the layout shift this replaced).
nocss=0
for p in resources/webinars resources/community case-studies connect integrations why-trench; do
  [ "$(grep -c 'rel="stylesheet"' "dist/$p/index.html")" -ge 2 ] || { echo "     no page stylesheet linked in /$p"; nocss=$((nocss+1)); }
done
chk "page stylesheets linked in HTML (CLS)" 0 "$nocss"
chk "build manifest not published"         0 "$(yes "$(ls -d dist/.vite 2>/dev/null)")"

echo
[ "$FAIL" -eq 0 ] && echo "ALL CHECKS PASSED" || { echo "PRE-LAUNCH VERIFICATION FAILED"; exit 1; }
