import React from 'react'
import ReactDOM from 'react-dom/client'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { preloadRoute } from './routes'
import './index.css'

inject()
// Real-visitor Core Web Vitals (LCP, CLS, INP) per page, in the Vercel
// dashboard. Lab tools can't tell you whether the field metrics are green.
injectSpeedInsights()

// #root holds this page's prerendered markup. Hydrate it in place: React
// attaches to the existing DOM instead of rebuilding it, so the content that
// painted first — and that counts for LCP — stays on screen. The page's chunk
// is loaded first so hydration never waits on it.
// The prerender copies each page's inline <style> blocks into <head> so they
// apply from first paint (scripts/prerender-seo.ts). This module runs after the
// document is parsed, when the originals in #root are in place, so drop the
// copies — otherwise they would keep styling other pages after in-app navigation.
document.querySelectorAll('style[data-ssr-style]').forEach((el) => el.remove())

const root = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

preloadRoute(window.location.pathname)
  .catch(() => {})
  .then(() => {
    if (root.hasChildNodes()) {
      ReactDOM.hydrateRoot(root, app, {
        // On a mismatch React re-renders that part on the client and the page
        // keeps working. Log it so the browser smoke test (console errors) fails.
        onRecoverableError: (error) => console.error('[hydration]', error),
      })
    } else {
      ReactDOM.createRoot(root).render(app)
    }
  })
