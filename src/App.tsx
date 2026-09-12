import React, { useState, useEffect, Suspense, startTransition } from 'react'
import trenchLogo from '@/imports/Trench_Logo.png'
import blogIcon from './Icon/blog.webp'
import labsIcon from './Icon/labs.webp'
import webinarIcon from './Icon/webinar.webp'
import communityIcon from './Icon/community.webp'
import announcementIcon from './Icon/announcement.webp'
import caseStudiesIcon from './Icon/case-studies.webp'

// Pages are code-split and resolved from the route table in ./routes
import { pages, resolveRoute, preloadRoute } from './routes'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import RouteEffects from './components/RouteEffects'
import FloatingNewsletterButton from './components/FloatingNewsletterButton'
import { markInitialMountComplete } from './lib/useReveal'

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function IconLinkedin({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  )
}

function IconYoutube({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function IconEye({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconZap({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconTarget({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconMail({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IconMapPin({ size = 15, color = 'currentColor', style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconLink({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function IconAward({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )
}

function IconArrowRight({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function IconX({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconChevronDown({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// Static Announcement Data for Header Bar.
// Kept literal rather than derived from postsData so the 202 KB posts module
// stays out of the entry bundle — update this when a newer post ships.
const announcements = [
  {
    badge: 'BLOG',
    text: 'Read our latest blog post: Trench Agentic SecOps: Skills vs. Playbooks',
    cta: 'Read Article',
    link: '/blog/trench-agentic-secops-skills-vs-playbooks',
  },
  {
    badge: 'AWARD',
    text: "Announcement: Trench Security is the 2026 Winner of \u2018Products That Count\u2019",
    cta: 'Read more',
    link: '/announcements/products-that-count-2026',
  },
]

// Main navigation links
const navLinks = [
  { label: 'Why Trench?', path: '/why-trench' },
  { label: 'Integrations', path: '/integrations' },
]

// Resources dropdown items
const resourcesDropdown = [
  { label: 'Blogs', path: '/blog', icon: blogIcon },
  { label: 'Case Studies', path: '/case-studies', icon: caseStudiesIcon },
  { label: 'Trench Labs', path: '/resources/trench-labs', icon: labsIcon },
  { label: 'Webinars', path: '/resources/webinars', icon: webinarIcon },
  { label: 'Community', path: '/resources/community', icon: communityIcon },
  { label: 'Announcements', path: '/announcements', icon: announcementIcon },
]

export default function App({ initialPath }: { initialPath?: string } = {}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(true)
  // initialPath is set when prerendering at build time, where there is no window.
  const [currentRoute, setCurrentRoute] = useState(() => initialPath ?? (window.location.pathname || '/'))
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourcesRef = React.useRef<HTMLLIElement>(null)

  // Scroll reveals skip their entrance animation only during this first mount,
  // so prerendered content that is already on screen never flickers.
  useEffect(() => {
    const t = window.setTimeout(markInitialMountComplete, 0)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      // A transition keeps the current page on screen while the next page's
      // chunk loads, instead of flashing the Suspense fallback.
      startTransition(() => setCurrentRoute(window.location.pathname || '/'))
      setMenuOpen(false)
      setResourcesOpen(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      const targetAttr = target.getAttribute('target')
      const isDownload = target.hasAttribute('download')

      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        targetAttr !== '_blank' &&
        !isDownload &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault()
        if (window.location.pathname !== href) {
          window.history.pushState({}, '', href)
          window.dispatchEvent(new PopStateEvent('popstate'))
        }
      }
    }
    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])

  // Warm the next page's chunk on hover or keyboard focus so the click renders instantly.
  useEffect(() => {
    const warm = (e: Event) => {
      const href = (e.target as Element | null)?.closest?.('a')?.getAttribute('href')
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        preloadRoute(href.split(/[?#]/)[0]).catch(() => {})
      }
    }
    document.addEventListener('pointerover', warm, { passive: true })
    document.addEventListener('focusin', warm)
    return () => {
      document.removeEventListener('pointerover', warm)
      document.removeEventListener('focusin', warm)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hardcoded brand theme (cream/navy)
  const currentTheme = {
    bg: '#EDE7D9',
    textColor: '#2B2B2B',
    textMuted: '#4A4A4A',
    cardBg: '#EDE7D9',
    cardHoverBg: '#E4DCCB',
    headerBg: scrolled ? 'rgba(237, 231, 217, 0.96)' : 'transparent',
    video: '/castle.mp4',
    videoKey: 'castle',
    btnBg: '#FFFFFF',
    btnBorder: 'rgba(49,82,185,0.25)',
    btnColor: '#3152B9',
  }

  // Top-level nav links (no dropdown items here)
  const leadLinks = [
    { label: 'Home', path: '/' },
    { label: 'Why Trench?', path: '/why-trench' },
    { label: 'Integrations', path: '/integrations' },
  ]
  const partnerLink = { label: 'Partners', path: '/for-mssps' }

  const getRouteComponent = () => {
    const match = resolveRoute(currentRoute || '/')
    if (!match) return <NotFound />
    const Page = pages[match.key]
    if (match.key === 'home') {
      return (
        <Page
          currentTheme={currentTheme}
          scrolled={scrolled}
          showAnnouncement={showAnnouncement}
        />
      )
    }
    if (match.slug !== undefined) return <Page slug={match.slug} />
    return <Page />
  }

  return (
    <div style={{ backgroundColor: currentTheme.bg, color: currentTheme.textColor, transition: 'background-color 0.3s ease, color 0.3s ease', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── NAV & ANNOUNCEMENT HEADER ── */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Top News & Announcement Trigger Bar */}
        {showAnnouncement && (
          <div className="announcement-bar" style={{
            backgroundColor: '#3152B9',
            color: '#FFFFFF',
            height: 38,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}>
            <div className="ticker-wrapper" style={{
              overflow: 'hidden',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              maskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 48px), transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 48px), transparent)',
            }}>
              <div className="ticker-track" style={{
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                animation: 'marqueeTicker 55s linear infinite',
                willChange: 'transform',
              }}>
                {[...announcements, ...announcements, ...announcements].map((item, idx) => (
                  <div key={idx} className="ticker-item" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    marginRight: 48,
                    fontSize: 12.5,
                    color: '#FFFFFF',
                    fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                  }}>
                    <span className="ticker-badge" style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.22)',
                      color: '#FFFFFF',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 100,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                    }}>{item.badge}</span>
                    <span style={{ marginRight: 4 }}>{item.text}</span>
                    <a href={item.link} className="ticker-link" style={{
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(255, 255, 255, 0.18)',
                      textDecoration: 'none',
                      padding: '2px 10px',
                      borderRadius: 100,
                      fontSize: 11,
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'background-color 0.2s',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)')}
                    >
                      {item.cta}
                      <IconArrowRight size={11} color="#FFFFFF" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              aria-label="Close news announcement"
              style={{
                background: '#3152B9',
                border: 'none',
                color: 'rgba(255,255,255,0.85)',
                cursor: 'pointer',
                padding: '4px 12px 4px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 10,
                boxShadow: '-8px 0 12px #3152B9',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
            >
              <IconX size={15} />
            </button>
          </div>
        )}

        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '12px 24px' : '16px 24px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <nav style={{
            width: '100%',
            maxWidth: scrolled ? 1040 : 1380,
            backgroundColor: scrolled
              ? 'rgba(241, 235, 222, 0.92)'
              : currentTheme.headerBg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: scrolled ? '1px solid rgba(49, 82, 185, 0.15)' : '1px solid transparent',
            borderRadius: scrolled ? 100 : 16,
            padding: scrolled ? '10px 28px' : '14px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? 76 : 94,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: scrolled ? '0 12px 30px -10px rgba(0,0,0,0.08)' : 'none',
          }}>
            <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img
                src={trenchLogo}
                alt="Trench Security"
                style={{ height: scrolled ? 36 : 42, width: 'auto', display: 'block', transition: 'height 0.4s ease' }}
              />
            </a>

            <ul style={{ display: 'flex', gap: 6, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }} className="hidden-mobile">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.path}
                    style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 15, fontWeight: 500, color: currentTheme.textColor, textDecoration: 'none', padding: '8px 14px', borderRadius: 100, transition: 'all 0.2s', display: 'block' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#3152B9';
                      e.currentTarget.style.backgroundColor = 'rgba(49, 82, 185, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = currentTheme.textColor;
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}

              {/* Resources dropdown */}
              <li ref={resourcesRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setResourcesOpen((o) => !o)}
                  style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 15, fontWeight: 500, color: resourcesOpen ? '#3152B9' : currentTheme.textColor, background: resourcesOpen ? 'rgba(49,82,185,0.05)' : 'none', border: 'none', padding: '8px 14px', borderRadius: 100, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#3152B9';
                    e.currentTarget.style.backgroundColor = 'rgba(49,82,185,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    if (!resourcesOpen) {
                      e.currentTarget.style.color = currentTheme.textColor;
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  Resources
                  <span style={{ display: 'inline-flex', transition: 'transform 0.2s', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <IconChevronDown size={14} color="currentColor" />
                  </span>
                </button>

                {resourcesOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(49,82,185,0.12)',
                    borderRadius: 14,
                    boxShadow: '0 16px 36px -8px rgba(0,0,0,0.12), 0 4px 12px rgba(49,82,185,0.06)',
                    padding: '8px',
                    minWidth: 220,
                    zIndex: 200,
                  }}>
                    {resourcesDropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.path}
                        onClick={() => setResourcesOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '10px 14px',
                          borderRadius: 8,
                          fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                          fontSize: 14.5,
                          fontWeight: 600,
                          color: '#18181B',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(49,82,185,0.07)';
                          e.currentTarget.style.color = '#3152B9';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#18181B';
                        }}
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          style={{
                            width: 26,
                            height: 26,
                            objectFit: 'contain',
                            display: 'block',
                            filter: 'contrast(1.22) brightness(0.88) saturate(1.25)',
                            flexShrink: 0,
                          }}
                        />
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>

              <li key="Partner">
                <a href="/for-mssps"
                  style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 15, fontWeight: 500, color: currentTheme.textColor, textDecoration: 'none', padding: '8px 14px', borderRadius: 100, transition: 'all 0.2s', display: 'block' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#3152B9';
                    e.currentTarget.style.backgroundColor = 'rgba(49, 82, 185, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = currentTheme.textColor;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Partner
                </a>
              </li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <a href="/connect"
                className="hidden-mobile"
                style={{
                  fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#EDE7D9',
                  backgroundColor: '#3152B9',
                  textDecoration: 'none',
                  padding: scrolled ? '10px 24px' : '12px 28px',
                  borderRadius: 100,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#253D8F')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3152B9')}
              >
                Get Started
              </a>

              <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
                style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexDirection: 'column', gap: 5 }}
                className="hamburger"
              >
                <span style={{ display: 'block', width: 22, height: 1.5, backgroundColor: currentTheme.textColor, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
                <span style={{ display: 'block', width: 22, height: 1.5, backgroundColor: currentTheme.textColor, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
                <span style={{ display: 'block', width: 22, height: 1.5, backgroundColor: currentTheme.textColor, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
              </button>
            </div>
          </nav>
        </div>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 24,
            right: 24,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid rgba(49,82,185,0.15)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            padding: '16px 24px 24px',
            zIndex: 99,
          }} className="mobile-menu">
            {navLinks.map((link) => (
              <a key={link.label} href={link.path} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 15, fontWeight: 500, color: '#2B2B2B', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(49,82,185,0.08)' }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ paddingTop: 4, borderBottom: '1px solid rgba(49,82,185,0.08)' }}>
              <p style={{ margin: '8px 0 4px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Resources</p>
              {resourcesDropdown.map((item) => (
                <a key={item.label} href={item.path} onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: '#18181B',
                    textDecoration: 'none',
                    padding: '10px 8px',
                    borderRadius: 8,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    style={{
                      width: 26,
                      height: 26,
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'contrast(1.22) brightness(0.88) saturate(1.25)',
                      flexShrink: 0,
                    }}
                  />
                  {item.label}
                </a>
              ))}
            </div>
            <a key="Partner" href="/for-mssps" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 15, fontWeight: 500, color: '#2B2B2B', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(49,82,185,0.08)' }}
            >
              Partner
            </a>
            <a href="/connect" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', marginTop: 16, fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 14, fontWeight: 700, color: '#EDE7D9', backgroundColor: '#3152B9', textDecoration: 'none', padding: '12px 20px', borderRadius: 8, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em' }}
            >
              Get Started
            </a>
          </div>
        )}
      </header>

      {/* ── ROUTED MAIN CONTENT ── */}
      <div style={{ flex: 1, paddingTop: showAnnouncement ? 38 : 0 }}>
        <ErrorBoundary resetKey={currentRoute}>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            {getRouteComponent()}
            <RouteEffects path={currentRoute} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(49,82,185,0.12)', backgroundColor: currentTheme.bg, transition: 'background-color 0.3s ease', marginTop: 'auto' }}>
        <div style={{ maxWidth: 1380, margin: '0 auto', padding: '60px 32px 40px' }}>

          {/* ── PARTNERSHIPS & AWARDS SECTION ── */}
          <div style={{
            marginBottom: 50,
            paddingBottom: 40,
            borderBottom: '1px solid rgba(49,82,185,0.12)',
          }}>
            <p style={{
              margin: '0 0 24px',
              fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: currentTheme.textMuted,
              textTransform: 'uppercase',
            }}>
              Partnerships &amp; Awards
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 28,
            }}>
              <img src="/awards/strip/microsoft-isv.webp" alt="Microsoft ISV Partner" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
              <img src="/awards/strip/iaa.webp" alt="Indian Achievers Award" style={{ height: 50, width: 'auto', objectFit: 'contain' }} />
              <img src="/awards/strip/cyseck.webp" alt="CySecK" style={{ height: 46, width: 'auto', objectFit: 'contain' }} />
              <img src="/awards/strip/inc42.webp" alt="Inc42 AI Startup to Watch" style={{ height: 54, width: 'auto', objectFit: 'contain' }} />
              <img src="/awards/strip/products-that-count-2026.webp" alt="2025 Product Awards Winner" style={{ height: 54, width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>

          {/* ── MAIN FOOTER LINKS GRID ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 50 }}>
            {/* Brand Column */}
            <div>
              <a href="/" style={{ textDecoration: 'none' }}>
                <img src={trenchLogo} alt="Trench Security" style={{ height: 32, width: 'auto', display: 'block', marginBottom: 16 }} />
              </a>
              <p style={{ margin: '0 0 20px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 14, lineHeight: 1.6, color: currentTheme.textMuted, maxWidth: 260 }}>
                The agentic operating system for modern security operations.
              </p>

              {/* Contact Email & Social Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                <a href="mailto:ask@trenchsecurity.ai" style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 13.5, fontWeight: 600, color: '#3152B9', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <IconMail size={15} color="#3152B9" />
                  ask@trenchsecurity.ai
                </a>

                {/* Social Icons Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <a
                    href="https://www.linkedin.com/company/trenchsecurity/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 14px',
                      borderRadius: 8,
                      backgroundColor: 'rgba(49,82,185,0.08)',
                      color: '#3152B9',
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      border: '1px solid rgba(49,82,185,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#3152B9';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(49,82,185,0.08)';
                      e.currentTarget.style.color = '#3152B9';
                    }}
                  >
                    <IconLinkedin size={16} color="currentColor" />
                    LinkedIn
                  </a>

                  <a
                    href="https://www.youtube.com/@Trench_Security"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 14px',
                      borderRadius: 8,
                      backgroundColor: 'rgba(49,82,185,0.08)',
                      color: '#3152B9',
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      border: '1px solid rgba(49,82,185,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF0000';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#FF0000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(49,82,185,0.08)';
                      e.currentTarget.style.color = '#3152B9';
                      e.currentTarget.style.borderColor = 'rgba(49,82,185,0.15)';
                    }}
                  >
                    <IconYoutube size={16} color="currentColor" />
                    YouTube
                  </a>
                </div>
              </div>

              {/* Office Locations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <span style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 11.5, fontWeight: 800, color: currentTheme.textColor, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 2 }}>
                    US OFFICE:
                  </span>
                  <span style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 13, color: currentTheme.textMuted, lineHeight: 1.5, display: 'block' }}>
                    1407 Canal Rd, Princeton, NJ 08540-8635
                  </span>
                </div>

                <div>
                  <span style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 11.5, fontWeight: 800, color: currentTheme.textColor, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 2 }}>
                    INDIA OFFICE:
                  </span>
                  <span style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 13, color: currentTheme.textMuted, lineHeight: 1.5, display: 'block' }}>
                    4th Flr, The Hub @ Raj Serenity,<br />
                    Yelenahalli, Begur,<br />
                    Bangalore-560068, Karnataka
                  </span>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            {[
              {
                title: 'Platform',
                links: [
                  { label: 'Why Trench', path: '/why-trench' },
                  { label: 'How It Works', path: '/how-it-works' },
                  { label: 'Pricing', path: '/pricing' },
                  { label: 'Integrations', path: '/integrations' },
                  { label: 'For MSSPs', path: '/for-mssps' },
                ]
              },
              {
                title: 'Resources',
                links: [
                  { label: 'Blog', path: '/blog' },
                  { label: 'Case Studies', path: '/case-studies' },
                  { label: 'Announcements', path: '/announcements' },
                  { label: 'Community', path: '/resources/community' },
                  { label: 'Trench Labs', path: '/resources/trench-labs' },
                  { label: 'Webinars', path: '/resources/webinars' },
                ]
              },
              {
                title: 'Company',
                links: [
                  { label: 'Careers', path: '/careers' },
                  { label: 'Connect', path: '/connect' },
                  { label: 'Compliance & Trust', path: 'https://compliance.trenchsecurity.ai/' },
                ]
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ margin: '0 0 20px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 14, fontWeight: 800, color: currentTheme.textColor, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {col.title}
                </h4>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.path}
                        target={link.path.startsWith('http') ? '_blank' : undefined}
                        rel={link.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 14, color: currentTheme.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#3152B9')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = currentTheme.textMuted)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div style={{ paddingTop: 28, borderTop: '1px solid rgba(49,82,185,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <p style={{ margin: 0, fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 13, color: currentTheme.textMuted }}>
              &copy; 2026 Trench Security, Inc. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'Privacy Policy', href: 'https://compliance.trenchsecurity.ai/' },
                { label: 'Terms of Service', href: 'https://compliance.trenchsecurity.ai/' },
                { label: 'Cookie Policy', href: 'https://compliance.trenchsecurity.ai/' },
              ].map((link) => (
                <a key={link.label} href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 13, color: currentTheme.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#3152B9')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = currentTheme.textMuted)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Graphic */}
          <div style={{ marginTop: 40, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <img
              src="/footer.webp"
              alt="Trench Footer Graphic"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', maxWidth: 1380, height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </footer>

      <FloatingNewsletterButton path={currentRoute} />

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  )
}
