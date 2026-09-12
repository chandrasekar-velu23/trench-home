import { lazy, useState, type ComponentType } from 'react'

type PageModule = { default: ComponentType<any> }
type Loader = () => Promise<PageModule>

// One loader per page, so every page ships as its own chunk. The same loader
// backs React.lazy (in-app navigation) and preloadRoute() (first paint).
const loaders = {
  home: () => import('./home/Home'),
  whyTrench: () => import('./why-trench/page'),
  howItWorks: () => import('./how-it-works/page'),
  pricing: () => import('./pricing/page'),
  integrations: () => import('./integrations/page'),
  career: () => import('./career/page'),
  aiLeadSecurityRd: () => import('./career/ai-lead-security-rd/page'),
  aiMlLead: () => import('./career/ai-ml-lead/page'),
  leadAgenticSecOps: () => import('./career/lead-agentic-secops/page'),
  productMarketingIntern: () => import('./career/product-marketing-intern/page'),
  blog: () => import('./blog/page'),
  blogPost: () => import('./blog/BlogPostRoute'),
  announcements: () => import('./announcements/page'),
  announcement: () => import('./announcements/AnnouncementRoute'),
  forMssps: () => import('./for-mssps/page'),
  connect: () => import('./connect/page'),
  webinars: () => import('./resources/webinars/page'),
  trenchLabs: () => import('./resources/trench-labs/page'),
  events: () => import('./resources/events/page'),
  community: () => import('./resources/community/page'),
  bplSignup: () => import('./resources/community/bpl-signup/page'),
  caseStudies: () => import('./case-studies/page'),
  whatfix: () => import('./case-studies/whatfix/page'),
  sbfe: () => import('./case-studies/sbfe/page'),
  ocrolus: () => import('./case-studies/ocrolus/page'),
  newsletterSignup: () => import('./newsletter-signup/page'),
  newsletterSignout: () => import('./newsletter-signout/page'),
} satisfies Record<string, Loader>

export type RouteKey = keyof typeof loaders

/**
 * Exact paths. /home, /careers and /career/soc-analyst are also 301'd by
 * vercel.json; they stay here so a stale in-app link still lands somewhere.
 * Every indexable path must also have an entry in seo/routes.ts — the
 * prerender step fails the build if the two disagree.
 */
export const STATIC_PATHS: Record<string, RouteKey> = {
  '/': 'home',
  '/home': 'home',
  '/why-trench': 'whyTrench',
  '/how-it-works': 'howItWorks',
  '/pricing': 'pricing',
  '/integrations': 'integrations',
  '/career': 'career',
  '/careers': 'career',
  '/career/soc-analyst': 'career',
  '/career/ai-lead-security-rd': 'aiLeadSecurityRd',
  '/career/ai-ml-lead': 'aiMlLead',
  '/career/lead-agentic-secops': 'leadAgenticSecOps',
  '/career/product-marketing-intern': 'productMarketingIntern',
  '/blog': 'blog',
  '/announcements': 'announcements',
  '/for-mssps': 'forMssps',
  '/connect': 'connect',
  '/resources/webinars': 'webinars',
  '/resources/trench-labs': 'trenchLabs',
  '/resources/events': 'events',
  '/resources/community': 'community',
  '/resources/community/bpl-signup': 'bplSignup',
  '/case-studies': 'caseStudies',
  '/case-studies/whatfix': 'whatfix',
  '/case-studies/sbfe': 'sbfe',
  '/case-studies/ocrolus': 'ocrolus',
  '/newsletter-signup': 'newsletterSignup',
  '/newsletter-signout': 'newsletterSignout',
}

/** Paths that only exist as redirects; excluded from prerender and sitemap. */
export const ALIAS_PATHS = ['/home', '/careers', '/career/soc-analyst']

export type RouteMatch = { key: RouteKey; slug?: string }

export function resolveRoute(pathname: string): RouteMatch | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const key = STATIC_PATHS[path]
  if (key) return { key }
  const blog = path.match(/^\/blog\/([^/]+)$/)
  if (blog) return { key: 'blogPost', slug: decodeURIComponent(blog[1]) }
  const announcement = path.match(/^\/announcements\/([^/]+)$/)
  if (announcement) return { key: 'announcement', slug: decodeURIComponent(announcement[1]) }
  return null
}

/**
 * A lazy page that renders synchronously once its chunk is loaded. main.tsx
 * preloads the landing route before mounting, so first paint never suspends
 * and the prerendered markup is swapped for the live tree in one commit.
 */
function lazyPage(load: Loader) {
  let loaded: ComponentType<any> | undefined
  const preload = () =>
    load().then((mod) => {
      loaded = mod.default
      return mod
    })
  const Lazy = lazy(preload)

  function Page(props: Record<string, unknown>) {
    // Freeze the choice for this mount: switching from Lazy to the loaded
    // component later would change the element type and remount the page.
    const [Component] = useState<ComponentType<any>>(() => loaded ?? Lazy)
    return <Component {...props} />
  }

  return { Page, preload }
}

const entries = Object.fromEntries(
  Object.entries(loaders).map(([key, load]) => [key, lazyPage(load)]),
) as Record<RouteKey, ReturnType<typeof lazyPage>>

export const pages = Object.fromEntries(
  Object.entries(entries).map(([key, entry]) => [key, entry.Page]),
) as Record<RouteKey, ComponentType<any>>

export function preloadRoute(pathname: string): Promise<unknown> {
  const match = resolveRoute(pathname)
  return match ? entries[match.key].preload() : Promise.resolve()
}
