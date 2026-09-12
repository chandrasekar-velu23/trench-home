import { useEffect, useLayoutEffect } from 'react'
import { STATIC_ROUTES, SITE_URL } from '../../seo/routes'

const META = new Map(STATIC_ROUTES.map((route) => [route.path, route]))

// index.html's gtag('config') already reports the landing page.
let isLandingPage = true

// Compared by path, not "first run", so StrictMode's double effect in
// development doesn't count as a navigation.
const landingPath = typeof window === 'undefined' ? '' : window.location.pathname
let hasNavigated = false

function setAttr(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value)
}

/**
 * Keeps <head> in step with in-app navigation, then reports the pageview.
 *
 * Rendered as the page's next sibling inside the same Suspense boundary, so it
 * commits after the page does: blog and announcement pages have already set
 * their own title by the time this effect runs and reads document.title.
 */
export default function RouteEffects({ path }: { path: string }) {
  // The landing page paints without the .page-main entrance animation (an
  // element first painted at opacity 0 never counts for LCP). From the first
  // navigation on, new pages animate in. A layout effect runs after the new
  // page is inserted but before it paints, so it fades in without a flash.
  useLayoutEffect(() => {
    if (path === landingPath && !hasNavigated) return
    hasNavigated = true
    document.documentElement.removeAttribute('data-landing')
  }, [path])

  useEffect(() => {
    const meta = META.get(path)
    if (meta) {
      const url = path === '/' ? SITE_URL : SITE_URL + path
      document.title = meta.title
      setAttr('meta[name="description"]', 'content', meta.description)
      setAttr('link[rel="canonical"]', 'href', url)
      setAttr('meta[property="og:url"]', 'content', url)
      setAttr('meta[property="og:title"]', 'content', meta.title)
      setAttr('meta[property="og:description"]', 'content', meta.description)
      setAttr('meta[name="twitter:url"]', 'content', url)
      setAttr('meta[name="twitter:title"]', 'content', meta.title)
      setAttr('meta[name="twitter:description"]', 'content', meta.description)
      setAttr('meta[name="robots"]', 'content', meta.noindex ? 'noindex, nofollow' : 'index, follow')
    }

    if (isLandingPage) {
      isLandingPage = false
      return
    }

    const w = window as any
    w.gtag?.('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    })
    w.dataLayer?.push({ event: 'spa_pageview', page_path: path })
  }, [path])

  return null
}
