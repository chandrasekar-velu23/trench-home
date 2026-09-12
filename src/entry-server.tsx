import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import App from './App'
import { preloadRoute } from './routes'

/**
 * Renders one route to static HTML at build time (scripts/prerender-seo.ts),
 * so each page is readable by search and AI crawlers that never run JavaScript.
 */
export async function render(path: string): Promise<string> {
  // React emits a Suspense boundary's content out of line — inside
  // <div hidden> plus a script that moves it into place — when the page
  // suspended, or when the content is larger than progressiveChunkSize
  // (~12.8 KB by default, smaller than every page here). Out-of-line content
  // is invisible without JavaScript, discounted by crawlers, and revealed late
  // (up to 300 ms of reveal throttling, which delays LCP). So: load the page's
  // chunk first so it cannot suspend, and never split it by size.
  await preloadRoute(path)

  const { prelude } = await prerender(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  )

  const reader = prelude.getReader()
  const decoder = new TextDecoder()
  let html = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    html += decoder.decode(value, { stream: true })
  }
  return html + decoder.decode()
}

// Read by scripts/prerender-seo.ts to check the router against seo/routes.ts.
export { STATIC_PATHS, ALIAS_PATHS, resolveRoute } from './routes'
