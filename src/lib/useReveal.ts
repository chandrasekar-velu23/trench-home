import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal state that is safe for prerendered, hydrated pages and for
 * Core Web Vitals.
 *
 * - Server render and hydration: visible. The HTML crawlers read and the first
 *   paint both show the content, and hydration requires the client's first
 *   render to match that HTML. (An element held at opacity 0 until JavaScript
 *   ran was what delayed LCP.)
 * - Just after hydration: anything on screen stays as it is, so nothing
 *   flickers. Anything below the fold is hidden before it is ever seen, then
 *   reveals on scroll as designed.
 * - Later in-app navigations animate as before. Reduced-motion users never see
 *   the animation.
 */
export type RevealPhase = 'shown' | 'hidden' | 'revealing'

let initialMount = true

/** Called once by App after the first commit. */
export function markInitialMountComplete() {
  initialMount = false
}

/** True during the server render and the hydration of the landing page. */
export function isInitialMount() {
  return initialMount
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function useReveal<T extends Element>(rootMargin = '0px', threshold = 0) {
  const ref = useRef<T>(null)
  const [phase, setPhase] = useState<RevealPhase>(() =>
    typeof window === 'undefined' || initialMount ? 'shown' : 'hidden',
  )

  // Layout effect: runs before the browser paints the result of this commit.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setPhase('shown')
      return
    }
    if (initialMount) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) return // on screen at load: leave it
      setPhase('hidden') // below the fold: hide it before it is seen
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('revealing')
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { ref, phase }
}
