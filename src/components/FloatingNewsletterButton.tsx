import { useEffect, useState } from 'react'

// Ported from the old site's components/FloatingNewsletterButton.tsx. It links
// to /newsletter-signup, the Brevo subscription form.
const HIDDEN_ON = ['/newsletter-signup', '/newsletter-signout']
// Same key as the old site, so returning visitors are not prompted again.
const PROMPTED_KEY = 'trench_newsletter_expanded'

export default function FloatingNewsletterButton({ path }: { path: string }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  // First visit only: expand the label after 2.5 s, collapse it 8 s later.
  useEffect(() => {
    let prompted = true
    try {
      prompted = !!localStorage.getItem(PROMPTED_KEY)
    } catch {
      // storage blocked — treat as already prompted
    }
    if (prompted) return
    let collapse: number | undefined
    const open = window.setTimeout(() => {
      setExpanded(true)
      try {
        localStorage.setItem(PROMPTED_KEY, 'true')
      } catch {
        // ignore
      }
      collapse = window.setTimeout(() => setExpanded(false), 8000)
    }, 2500)
    return () => {
      window.clearTimeout(open)
      if (collapse) window.clearTimeout(collapse)
    }
  }, [])

  if (HIDDEN_ON.includes(path) || path.startsWith('/pricing')) return null

  const showText = expanded || hovered

  return (
    <div
      className="floating-newsletter"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .floating-newsletter { position: fixed; bottom: 24px; left: 24px; z-index: 50; }
        .floating-newsletter-btn {
          background-color: #3152B9;
          color: #FFFFFF;
          height: 48px;
          border-radius: 9999px;
          font-family: 'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 14px;
          text-decoration: none;
          transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(49, 82, 185, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
        }
        .floating-newsletter-btn:hover, .floating-newsletter-btn:focus-visible {
          background-color: #253D8F;
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(49, 82, 185, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
        }
        .floating-newsletter-btn:focus-visible { outline: 2px solid #E67E41; outline-offset: 3px; }
        .floating-newsletter-btn .btn-text-container {
          display: inline-block;
          max-width: 0;
          opacity: 0;
          transition: max-width 0.4s ease, opacity 0.3s ease;
        }
        .floating-newsletter-btn .btn-text-container.expanded { max-width: 250px; opacity: 1; }
        @media (max-width: 768px) { .floating-newsletter { bottom: 16px; left: 16px; } }
        @media (prefers-reduced-motion: reduce) {
          .floating-newsletter-btn, .floating-newsletter-btn .btn-text-container { transition: none; }
        }
      `,
        }}
      />
      <a
        href="/newsletter-signup"
        className="floating-newsletter-btn"
        aria-label="Subscribe to Trench Digest"
        onClick={() => setExpanded(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <svg
          aria-hidden="true"
          style={{ flexShrink: 0 }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <span className={`btn-text-container${showText ? ' expanded' : ''}`}>SUBSCRIBE TO TRENCH DIGEST</span>
      </a>
    </div>
  )
}
