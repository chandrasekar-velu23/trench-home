import { faqItems } from './faqData'
import { useReveal } from '../lib/useReveal'
import { Users as BplUsersIcon, ShieldAlert as BplShieldIcon, Trophy as BplTrophyIcon } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import trenchLogo from '@/imports/Trench_Logo.png'
import VariationSlack from '../variation-slack'
import VariationClaude from '../VariationClaude'
import VariationTeams from '../VariationTeams'
import UnifyIllustration from './UnifyIllustration'
import DetectIllustration from './DetectIllustration'
import RespondIllustration from './RespondIllustration'
import { DataPlaneTelemetryOptimizer, ControlPlaneAgenticSIEM, ActionPlaneAgenticSOC } from './outcomes'
import outcomesStyles from './outcomes/index.module.css'

// ── Inline SVG icons ──────────────────────────────────────────────────────────

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

function IconLayers({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function IconRadar({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
      <line x1="12" y1="12" x2="19.07" y2="4.93" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconRefreshCw({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  )
}

function IconSearch({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconMessageSquare({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function IconCheckCircle({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function IconShield({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

function IconTrendingUp({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
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

function IconSun({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
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

function IconArrowLeft({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function IconShieldHeart({ size = 48, color = '#3152B9' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L8 10V22C8 32 15 40 24 44C33 40 40 32 40 22V10L24 4Z" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 32C24 32 16 26.5 16 21.5C16 19 18 17 20.5 17C22 17 23.3 17.8 24 19C24.7 17.8 26 17 27.5 17C30 17 32 19 32 21.5C32 26.5 24 32 24 32Z" fill={color} />
    </svg>
  )
}

function IconMoon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

type ThemeMode = 'default' | 'white' | 'black'

// ── FAQ Section ─────────────────────────────────────────────────────────────

function FAQSection({ currentTheme }: { currentTheme: any }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section style={{ maxWidth: 1380, margin: '0 auto', padding: '110px 32px' }}>
      {/* Header */}
      <div style={{ maxWidth: 700, marginBottom: 56 }}>
        <p style={{
          margin: '0 0 14px',
          fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#3152B9',
        }}>
          Got Questions?
        </p>
        <h2 style={{
          margin: 0,
          fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
          fontSize: 'clamp(32px, 4.5vw, 52px)',
          fontWeight: 800,
          color: currentTheme.textColor,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          We thought you might.
        </h2>
      </div>

      {/* FAQ Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {faqItems.map((item, i) => {
          const isOpen = openIdx === i
          return (
            <div
              key={i}
              style={{
                borderTop: i === 0 ? `1px solid rgba(49,82,185,0.15)` : 'none',
                borderBottom: `1px solid rgba(49,82,185,0.15)`,
              }}
            >
              {/* Question Row */}
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '26px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 24,
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  fontWeight: 700,
                  color: isOpen ? '#3152B9' : currentTheme.textColor,
                  lineHeight: 1.3,
                  transition: 'color 0.2s ease',
                }}>
                  {item.q}
                </span>
                {/* Plus / Minus icon */}
                <span style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: `1.5px solid ${isOpen ? '#3152B9' : 'rgba(49,82,185,0.25)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isOpen ? '#3152B9' : 'transparent',
                  transition: 'all 0.2s ease',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    {isOpen
                      ? <path d="M2 7h10" stroke="#F3EDE2" strokeWidth="2" strokeLinecap="round" />
                      : <>
                          <path d="M7 2v10" stroke="#3152B9" strokeWidth="2" strokeLinecap="round" />
                          <path d="M2 7h10" stroke="#3152B9" strokeWidth="2" strokeLinecap="round" />
                        </>
                    }
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <div style={{
                maxHeight: isOpen ? '400px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <p style={{
                  margin: 0,
                  paddingBottom: 28,
                  fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: currentTheme.textMuted,
                  maxWidth: 780,
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Scroll Reveal Component ───────────────────────────────────────────────────

// BlueTeam Premier League highlights shown on the homepage. Copy matches the
// "League Vision & Objectives" cards on /resources/community.
const BPL_HIGHLIGHTS = [
  {
    Icon: BplUsersIcon,
    title: 'Network with Leaders',
    text: 'Directly connect and engage with CISOs, security directors, and industry pioneers in an informal, low-pressure setting.',
  },
  {
    Icon: BplShieldIcon,
    title: 'Exchange Real SOC Experiences',
    text: 'Share war stories, incident response blueprints, and practical orchestration strategies from live production networks.',
  },
  {
    Icon: BplTrophyIcon,
    title: 'Sports League Theme',
    text: 'Enjoy a premier fantasy league format with championship trophies, structured gamified modules, and friendly competitive spirit.',
  },
]

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  // Visible in the prerendered HTML and never hidden when already on screen at
  // load, so the hero paints immediately (LCP). See lib/useReveal.
  const { ref, phase } = useReveal<HTMLDivElement>('0px', 0.05)
  const visible = phase !== 'hidden'

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition:
          phase === 'revealing'
            ? `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
            : undefined,
      }}
    >
      {children}
    </div>
  )
}

function MockupLandscapeWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const w = el.offsetWidth
      if (w > 0) {
        setScale(Math.min(1, w / 750))
      }
    }
    update()
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
    } else {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: 750,
        aspectRatio: '3 / 2',
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      }}
    >
      <div
        style={{
          width: 750,
          height: 500,
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Home({
  currentTheme,
  scrolled,
  showAnnouncement,
}: {
  currentTheme: any
  scrolled: boolean
  showAnnouncement: boolean
}) {
  const [activeStep, setActiveStep] = useState(0)
  const [activeApp, setActiveApp] = useState<'slack' | 'teams' | 'claude'>('slack')
  const [isCollabHovered, setIsCollabHovered] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false)

  const testimonials = [
    {
      quote: "Finally a platform built ground up for lean security teams. Trench gives a small team the detection power of an enterprise SOC, without the complexity, without the overhead.",
      name: "Senthil Kumar Iyyappan,",
      role: "CISO, Ocrolus, Ex-Freshworks",
    },
    {
      quote: "As a small security team, we needed a tool that could help us build rules, escalate material events, and evolve over time, essentially an extension of our own team. Within a few days of implementing Trench we were already working more efficiently, and a few weeks in, things have only gotten smoother. Trench has become a solid part of our security program.",
      name: "Pete Tannish,",
      role: "Head of Enterprise Risk & Technology, SBFE",
    },
    {
      quote: "The shift from legacy SIEM to Trench was not about replacing a tool. It was about adopting an entirely new operating model, one where security is agentic, continuous, and built for the pace of an AI-native business. Every phase of the transition compounded on the last, and the result is a security operation that scales with Ocrolus. Security finally feels actionable.",
      name: "Anupam Mandal,",
      role: "Head of Security Operations, Ocrolus",
    },
    {
      quote: "An investigation that used to take our team close to an hour now closes in under 10 minutes without leaving Slack. Trench didn't just automate our security workflows, it brought the entire SecOps engine into the tool our team already lives in. That's a completely different way to run security.",
      name: "Achyuth,",
      role: "Head of Security, Whatfix",
    },
    {
      quote: "Trench is a foundational transformation in how security operations work. A real unified platform, not bolted-on AI, that reasons about threats across your entire stack. This is what modern SecOps should look like.",
      name: "Subhro Banerjee,",
      role: "Senior Global IT Security Leader | Lifescience MNC",
    },
  ]

  const appList: Array<'slack' | 'teams' | 'claude'> = ['slack', 'teams', 'claude']

  useEffect(() => {
    if (isCollabHovered) return
    const interval = setInterval(() => {
      setActiveStep((prevStep) => {
        if (prevStep < 3) {
          return prevStep + 1
        } else {
          setActiveApp((prevApp) => {
            const nextIdx = (appList.indexOf(prevApp) + 1) % appList.length
            return appList[nextIdx]
          })
          return 0
        }
      })
    }, 3200)
    return () => clearInterval(interval)
  }, [isCollabHovered])

  useEffect(() => {
    if (isTestimonialHovered) return
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isTestimonialHovered, testimonials.length])

  const navLinks = ['Why Trench?', 'Capabilities', 'Integrations', 'Resources', 'Partners']

  const steps = [
    {
      label: 'Detect',
      icon: <IconSearch size={18} color="#F3EDE2" />,
      desc: 'Suspicious sign-in flagged with full context and user behaviour analysis across every connected source.',
    },
    {
      label: 'Verify',
      icon: <IconMessageSquare size={18} color="#F3EDE2" />,
      desc: 'Trench DMs the impacted user directly. No analyst needed to triage the first touchpoint.',
    },
    {
      label: 'Approve',
      icon: <IconCheckCircle size={18} color="#F3EDE2" />,
      desc: 'On-call engineer receives a one-click approval prompt in Slack, Teams, or Claude. No console switching.',
    },
    {
      label: 'Remediate',
      icon: <IconShield size={18} color="#F3EDE2" />,
      desc: 'Sessions revoked, tokens killed, and ticket filed automatically. Full loop closed in minutes.',
    },
  ]

  const capabilities = [
    {
      tag: 'Unify',
      stepLabel: 'STEP 1, UNIFY',
      image: '/headless secops/unifiy.webp',
      heading: 'Connect everything. Miss nothing.',
      body: 'Trench connects to every log source, tool and data stream across your stack, cloud, endpoint, identity, network and SaaS. No agents to deploy. No data duplication. Clean, normalized and ready for detection from day one.',
      bullets: [
        'Native integrations across your entire stack',
        'Agentless connector-based setup',
        'Auto-normalized, enriched, and searchable',
      ]
    },
    {
      tag: 'Detect',
      stepLabel: 'STEP 2, DETECT',
      image: '/headless secops/detect.webp',
      heading: 'Detection driven by intent, not just rules.',
      body: 'Trench\'s Intent Graph continuously maps attacker behavior, correlates signals across your entire data footprint and auto-generates detections aligned to real-world threats, not static rules written last quarter.',
      bullets: [
        'Intent Graph detects based on attacker behavior, not signatures',
        'Real-time threat correlation across your stack',
        'MITRE ATT&CK aligned. Always current.',
      ]
    },
    {
      tag: 'Respond',
      stepLabel: 'STEP 3, RESPOND',
      image: '/headless secops/respond.webp',
      heading: 'From alert to closed in minutes.',
      body: 'When a threat is detected, Trench agents automatically investigate, correlate context and trigger response workflows. Your team gets actionable outcomes inside their collaboration tools. No context switching. No cognitive overload.',
      bullets: [
        'Automated investigation and triage',
        'Decisions delivered to your collaboration tools',
        'Your team focuses on decisions. Not busywork.',
      ]
    },
  ]

  const outcomes = [
    {
      word: 'Visibility',
      image: '/outcomes/visibility.webp',
      desc: 'Every signal from every source, unified and searchable from day one.',
    },
    {
      word: 'Velocity',
      image: '/outcomes/velocity.webp',
      desc: 'Detection and response measured in seconds, not shifts.',
    },
    {
      word: 'Actionability',
      image: '/outcomes/actionability.webp',
      desc: 'End-to-end automated remediation that closes the loop without analyst overhead.',
    },
  ]

  const partners = [
    { label: 'Microsoft ISV Partner', icon: <IconLink size={13} color={currentTheme.textMuted} /> },
    { label: 'AICPA SOC', icon: <IconShield size={13} color={currentTheme.textMuted} /> },
    { label: 'ISO 27001', icon: <IconCheckCircle size={13} color={currentTheme.textMuted} /> },
    { label: 'GDPR', icon: <IconShield size={13} color={currentTheme.textMuted} /> },
    { label: 'CySecK', icon: <IconAward size={13} color={currentTheme.textMuted} /> },
    { label: 'Inc42', icon: <IconTrendingUp size={13} color={currentTheme.textMuted} /> },
  ]

  const integrations = [
    'Okta', 'CrowdStrike', 'AWS', 'Azure', 'Google Cloud', 'Slack',
    'Microsoft Teams', 'GitHub', 'Jira', 'Splunk', 'Datadog', 'Palo Alto',
  ]

  const announcements = [
    {
      badge: 'NEWS',
      text: 'Trench SecOps v2.0 Released: Autonomous Incident Triage & Zero-Setup Remediation',
      cta: 'Explore Release',
      link: '#capabilities',
    },
    {
      badge: 'NEW',
      text: '250+ Agentless SIEM & Cloud Security Connectors now Live',
      cta: 'View Connectors',
      link: '#integrations',
    },
    {
      badge: 'AWARD',
      text: 'Named 2026 Winner by Products That Count for Actionable AI SecOps',
      cta: 'Learn More',
      link: '#resources',
    },
  ]

  return (
    <main style={{ backgroundColor: currentTheme.bg, fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", color: currentTheme.textColor, transition: 'background-color 0.3s ease, color 0.3s ease' }}>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ maxWidth: 1380, margin: '0 auto', padding: showAnnouncement ? '140px 32px 40px' : '100px 32px 40px', transition: 'padding 0.3s ease' }}>
        <div className="hero-row" style={{ display: 'flex', alignItems: 'center', gap: 48, maxWidth: 1280, margin: '0 auto' }}>
          {/* ── Left: Text Content ── */}
          <div className="hero-content" style={{ flex: '1 1 50%', minWidth: 0 }}>
          
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px 6px 6px', border: '1px solid rgba(49,82,185,0.15)', borderRadius: 100, width: 'fit-content', marginBottom: 24, backgroundColor: 'rgba(49,82,185,0.03)' }}>
                <span style={{ backgroundColor: '#E67E41', color: '#F3EDE2', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 8px', borderRadius: 100, fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif" }}>
                  2026 WINNER
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: currentTheme.textMuted, fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif" }}>
                  <IconAward size={13} color="#E67E41" />
                  Products That Count
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="hero-title" style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', color: currentTheme.textColor, margin: '0 0 20px', maxWidth: 780 }}>
                The Operating System<br />
                <span style={{ color: '#3152B9' }}>for Actionable SecOps.</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="hero-subtitle" style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 15.5, fontWeight: 400, lineHeight: 1.65, color: currentTheme.textMuted, margin: '0 0 32px', maxWidth: 580 }}>
                An agentic platform doing what SIEMs cannot and SOC teams never reach, automatically. Unify your entire security stack so a lean team operates like an enterprise SOC.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="home-hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#capabilities"
                  style={{
                    fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: '#F3EDE2',
                    backgroundColor: '#3152B9',
                    textDecoration: 'none',
                    padding: '8px 8px 8px 24px',
                    borderRadius: 100,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    letterSpacing: '0.01em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    boxShadow: '0 4px 14px rgba(49,82,185,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#253D8F';
                    e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3152B9';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  Explore Trench
                  <span style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <IconArrowRight size={14} color="#F3EDE2" />
                  </span>
                </a>
                <a href="#how-it-works"
                  style={{
                    fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: currentTheme.textColor,
                    backgroundColor: 'transparent',
                    textDecoration: 'none',
                    padding: '12px 26px',
                    borderRadius: 100,
                    border: '1px solid rgba(49,82,185,0.25)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#3152B9';
                    e.currentTarget.style.backgroundColor = 'rgba(49,82,185,0.05)';
                    e.currentTarget.style.color = '#3152B9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(49,82,185,0.25)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = currentTheme.textColor;
                  }}
                >
                  See how it works
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Right: Video ── */}
          <div className="hero-media" style={{ flex: '1 1 50%', minWidth: 0 }}>
            <Reveal delay={250}>
              <div className="hero-video-container" style={{
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
              }}>
                <video
                  key={currentTheme.videoKey}
                  src={currentTheme.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: 'auto', display: 'block', border: 'none', outline: 'none' }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SLIDER SECTION ── */}
      <Reveal>
        <section
          onMouseEnter={() => setIsTestimonialHovered(true)}
          onMouseLeave={() => setIsTestimonialHovered(false)}
          style={{
            maxWidth: 1380,
            margin: '0 auto',
            padding: '48px 32px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <IconShieldHeart size={40} color="#3152B9" />
          </div>

          <h2 style={{
            fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 800,
            color: '#3152B9',
            letterSpacing: '-0.02em',
            margin: '0 0 18px',
          }}>
            Loved by Modern Security Leaders
          </h2>

          <div style={{ maxWidth: 720, margin: '0 auto', minHeight: 130, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p
              key={`quote-${currentTestimonial}`}
              className="testimonial-fade-item"
              style={{
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: currentTheme.textColor,
                margin: '0 0 16px',
                maxWidth: 680,
                textAlign: 'center',
              }}
            >
              &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
            </p>

            <h4
              key={`name-${currentTestimonial}`}
              className="testimonial-fade-item"
              style={{
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: '#3152B9',
                margin: '0 0 3px',
              }}
            >
              {testimonials[currentTestimonial].name}
            </h4>

            <p
              key={`role-${currentTestimonial}`}
              className="testimonial-fade-item"
              style={{
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: currentTheme.textMuted,
                margin: '0 0 20px',
              }}
            >
              {testimonials[currentTestimonial].role}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 4 }}>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
              className="testimonial-nav-btn"
              style={{
                width: 44,
                height: 44,
                borderRadius: 100,
                border: '1.5px solid rgba(49,82,185,0.3)',
                backgroundColor: currentTheme.btnBg,
                color: '#3152B9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 14px rgba(49,82,185,0.08)',
              }}
            >
              <IconArrowLeft size={16} color="currentColor" />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {testimonials.map((_, index) => {
                const isActive = index === currentTestimonial;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className="testimonial-dot-btn"
                    style={{
                      width: isActive ? 26 : 10,
                      height: 10,
                      borderRadius: 100,
                      backgroundColor: isActive ? '#3152B9' : 'transparent',
                      border: isActive ? 'none' : '1.5px solid rgba(49,82,185,0.4)',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 2px 10px rgba(49,82,185,0.35)' : 'none',
                    }}
                  />
                );
              })}
            </div>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="testimonial-nav-btn"
              style={{
                width: 44,
                height: 44,
                borderRadius: 100,
                border: '1.5px solid rgba(49,82,185,0.3)',
                backgroundColor: currentTheme.btnBg,
                color: '#3152B9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 14px rgba(49,82,185,0.08)',
              }}
            >
              <IconArrowRight size={16} color="currentColor" />
            </button>
          </div>
        </section>
      </Reveal>

      {/* ── ACTIONABILITY RIBBON ── */}
      <section style={{ backgroundColor: '#3152B9', padding: '80px 24px', textAlign: 'center', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{
          margin: 0,
          fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
          fontSize: 'clamp(24px, 4vw, 42px)',
          fontWeight: 800,
          fontStyle: 'normal',
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          position: 'relative',
          zIndex: 1,
        }}>
          AI built for <span style={{ color: '#E67E41' }}>Actionability</span>, not just Visibility.
        </h2>
      </section>

      {/* ── CUSTOMER LOGOS SECTION ── */}
      <Reveal>
        <section style={{ maxWidth: 1380, margin: '0 auto', padding: '110px 32px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 16px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: '#3152B9', textTransform: 'uppercase' }}>
            TRUSTED BY
          </p>

          <h2 style={{
            fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800,
            color: '#3152B9',
            letterSpacing: '-0.02em',
            margin: '0 0 20px',
          }}>
            Securing Forward-Thinking Teams
          </h2>

          <p style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 15.5, fontWeight: 400, color: currentTheme.textMuted, margin: '0 0 64px', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            Trench empowers modern security teams to operate at the speed of AI.
          </p>

          {/* Double-Bezel Grid of Logo Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {/* Whatfix */}
            <div style={{
              border: '1px solid rgba(49, 82, 185, 0.12)',
              borderRadius: 24,
              padding: '40px 32px',
              backgroundColor: currentTheme.cardBg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
              boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(49, 82, 185, 0.25)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(49, 82, 185, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(49, 82, 185, 0.12)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.01)';
              }}
            >
              <img
                src="/customers/Whatfix.svg"
                alt="Whatfix"
                style={{ height: 42, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
              <a
                href="/case-studies/whatfix"
                style={{
                  fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#3152B9',
                  backgroundColor: 'rgba(49,82,185,0.06)',
                  textDecoration: 'none',
                  padding: '8px 24px',
                  borderRadius: 100,
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3152B9'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(49,82,185,0.06)'; e.currentTarget.style.color = '#3152B9'; }}
              >
                Case Study
              </a>
            </div>

            {/* Ocrolus */}
            <div style={{
              border: '1px solid rgba(49, 82, 185, 0.12)',
              borderRadius: 24,
              padding: '40px 32px',
              backgroundColor: currentTheme.cardBg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
              boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(49, 82, 185, 0.25)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(49, 82, 185, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(49, 82, 185, 0.12)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.01)';
              }}
            >
              <img
                src="/customers/ocrolus-logo-1.png"
                alt="Ocrolus"
                style={{ height: 42, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
              <a
                href="/case-studies/ocrolus"
                style={{
                  fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#3152B9',
                  backgroundColor: 'rgba(49,82,185,0.06)',
                  textDecoration: 'none',
                  padding: '8px 24px',
                  borderRadius: 100,
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3152B9'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(49,82,185,0.06)'; e.currentTarget.style.color = '#3152B9'; }}
              >
                Case Study
              </a>
            </div>

            {/* SBFE */}
            <div style={{
              border: '1px solid rgba(49, 82, 185, 0.12)',
              borderRadius: 24,
              padding: '40px 32px',
              backgroundColor: currentTheme.cardBg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
              boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(49, 82, 185, 0.25)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(49, 82, 185, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(49, 82, 185, 0.12)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.01)';
              }}
            >
              <img
                src="/customers/SBFE.png"
                alt="SBFE"
                style={{ height: 42, width: 'auto', display: 'block', objectFit: 'contain' }}
              />
              <a
                href="/case-studies/sbfe"
                style={{
                  fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#3152B9',
                  backgroundColor: 'rgba(49,82,185,0.06)',
                  textDecoration: 'none',
                  padding: '8px 24px',
                  borderRadius: 100,
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#3152B9'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(49,82,185,0.06)'; e.currentTarget.style.color = '#3152B9'; }}
              >
                Case Study
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── ONE AGENTIC PLATFORM: THREE OUTCOMES ── */}
      <Reveal>
        <section style={{ backgroundColor: 'rgba(49,82,185,0.04)', borderTop: '1px solid rgba(49,82,185,0.1)', borderBottom: '1px solid rgba(49,82,185,0.1)', padding: '110px 32px' }}>
          <div style={{ maxWidth: 1380, margin: '0 auto' }}>
            {/* Main Section Header */}
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <p style={{ margin: '0 0 12px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: '#3152B9', textTransform: 'uppercase' }}>
                THIS IS YOUR TRENCH
              </p>
              <h2 style={{
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                color: '#3152B9',
                letterSpacing: '-0.02em',
                margin: '0 0 18px',
              }}>
                One Agentic Platform: Three Outcomes
              </h2>
              <p style={{
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.65,
                color: currentTheme.textMuted,
                maxWidth: 720,
                margin: '0 auto',
              }}>
                Trench unifies your entire security stack into one agentic platform, so your lean team operates like an enterprise SOC.
              </p>
            </div>

            {/* ── UNIFIED BLUE PLATFORM CARD CONTAINER ── */}
            <div className={outcomesStyles.bluePlatformContainer}>
              {/* ── ROW 1: TOP OUTCOMES CARDS (Background Color Fill #F3EDE2, not primary blue) ── */}
              <div className={outcomesStyles.outcomesGrid}>
                {outcomes.map((item) => (
                  <div
                    key={item.word}
                    className={outcomesStyles.outcomeCard}
                  >
                    <h4 className={outcomesStyles.outcomeTitle}>
                      {item.word}
                    </h4>
                    <p className={outcomesStyles.outcomeDesc}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* ── ROW 2: CLUBBED SINGLE CARD FOR THE 3 PLANES (Data Plane | Control Plane | Action Plane) ── */}
              <div className={outcomesStyles.planesClubbedCard}>
                <div className={outcomesStyles.planesGrid}>
                  {/* Column 1: Data Plane */}
                  <div className={outcomesStyles.planeColumn}>
                    <h4 className={outcomesStyles.planeTitle}>
                      Data Plane
                    </h4>
                    <span className={outcomesStyles.planeSubtitle}>
                      Telemetry Optimizer
                    </span>
                    <span className={outcomesStyles.planeFlow}>
                      Collect &nbsp;&rarr;&nbsp; Normalize &nbsp;&rarr;&nbsp; Enrich &nbsp;&rarr;&nbsp; Optimize
                    </span>
                    <img src="/outcomes/data-plane.webp" alt="Data Plane" className={outcomesStyles.planeImage} />
                  </div>

                  {/* Column 2: Control Plane (Divider on left on desktop, top divider on mobile) */}
                  <div className={outcomesStyles.planeColumnWithDivider}>
                    <h4 className={outcomesStyles.planeTitle}>
                      Control Plane
                    </h4>
                    <span className={outcomesStyles.planeSubtitle}>
                      Agentic SIEM
                    </span>
                    <span className={outcomesStyles.planeFlow}>
                      Correlate &nbsp;&rarr;&nbsp; Detect &nbsp;&rarr;&nbsp; Reason &nbsp;&rarr;&nbsp; Prioritize
                    </span>
                    <img src="/outcomes/control-plane.webp" alt="Control Plane" className={outcomesStyles.planeImage} />
                  </div>

                  {/* Column 3: Action Plane (Divider on left on desktop, top divider on mobile) */}
                  <div className={outcomesStyles.planeColumnWithDivider}>
                    <h4 className={outcomesStyles.planeTitle}>
                      Action Plane
                    </h4>
                    <span className={outcomesStyles.planeSubtitle}>
                      Agentic SOC
                    </span>
                    <span className={outcomesStyles.planeFlow}>
                      Investigate &nbsp;&rarr;&nbsp; Remediate &nbsp;&rarr;&nbsp; Respond &nbsp;&rarr;&nbsp; Automate
                    </span>
                    <img src="/outcomes/action-plane.webp" alt="Action Plane" className={outcomesStyles.planeImage} />
                  </div>
                </div>
              </div>

              {/* ── ROW 3: SPLIT INTO THREE CARDS (TASC, Intent Graph, Headless SecOps) ── */}
              <div className={outcomesStyles.bottomSplitGrid}>
                {/* Card 1: TASC */}
                <div className={outcomesStyles.bottomFeatureCard}>
                  <div className={outcomesStyles.bottomFeatureIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 90 90">
                      <circle cx="45" cy="45" r="45" fill="#DFDDDE"/>
                      <path stroke="#3152B9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" d="M42.8 17.197a7.5 7.5 0 0 1 2.196 5.303 7.5 7.5 0 0 1 15 0 9 9 0 0 1 7.701 13.659 9.003 9.003 0 0 1 0 17.679A9 9 0 0 1 59.996 67.5a7.5 7.5 0 0 1-15 0 7.5 7.5 0 0 1-15 0 9 9 0 0 1-7.701-13.662 9.003 9.003 0 0 1 0-17.679A9 9 0 0 1 29.996 22.5a7.5 7.5 0 0 1 12.803-5.303"/>
                      <path stroke="#3152B9" strokeLinecap="round" strokeWidth="4.5" d="M40.461 30v5.94M30 40.5h6.156m17.913 0h6.156m-6.156 8.922h6.156M30 49.425h6.156m4.305 4.635V60m9.075-5.94V60m-.03-30v5.94m-10.35 17.964h11.913a3 3 0 0 0 3-3V38.94a3 3 0 0 0-3-3H39.156a3 3 0 0 0-3 3v11.964a3 3 0 0 0 3 3Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className={outcomesStyles.bottomFeatureTitle}>
                      TASC
                    </h4>
                    <span className={outcomesStyles.bottomFeatureSubtitle}>
                      (Trench Agentic Schema Context)
                    </span>
                  </div>
                </div>

                {/* Card 2: Intent Graph */}
                <div className={outcomesStyles.bottomFeatureCard}>
                  <div className={outcomesStyles.bottomFeatureIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 90 90">
                      <circle cx="45" cy="45" r="45" fill="#DFDDDE"/>
                      <path fill="#3152B9" d="M45 75q-3.75 0-6.375-2.625T36 66a9.6 9.6 0 0 1 .15-1.65l-6.225-3.525q-1.2 1.05-2.7 1.614T24 63q-3.75 0-6.375-2.625T15 54t2.625-6.375T24 45q1.8 0 3.375.675t2.85 1.875l8.925-4.5a9 9 0 0 1 .186-3.375A8.7 8.7 0 0 1 40.8 36.6l-2.55-3.9q-.525.15-1.089.225A9 9 0 0 1 36 33q-3.75 0-6.375-2.625T27 24t2.625-6.375T36 15t6.375 2.625T45 24q0 1.5-.486 2.889A9.5 9.5 0 0 1 43.2 29.4l2.625 3.9q.6-.15 1.125-.225T48.075 33q1.275 0 2.4.3t2.175.9l4.95-4.05A8.3 8.3 0 0 1 57 27q0-3.75 2.625-6.375T66 18t6.375 2.625T75 27t-2.625 6.375T66 36q-1.275 0-2.4-.336a10.2 10.2 0 0 1-2.175-.939l-4.95 4.125q.3.75.45 1.539t.15 1.611q0 3.75-2.625 6.375T48.075 51q-1.8 0-3.411-.675a9.6 9.6 0 0 1-2.889-1.875l-8.85 4.425q.15.675.114 1.35t-.189 1.35l6.3 3.6a8.9 8.9 0 0 1 2.664-1.614Q43.278 56.997 45 57q3.75 0 6.375 2.625T54 66t-2.625 6.375T45 75M24 57q1.275 0 2.139-.864T27 54t-.864-2.136T24 51t-2.136.864T21 54t.864 2.139T24 57m12-30q1.275 0 2.139-.864T39 24t-.864-2.136T36 21t-2.136.864T33 24t.864 2.139T36 27m9 42q1.275 0 2.139-.864T48 66t-.864-2.136T45 63t-2.136.864T42 66t.864 2.139T45 69m3-24q1.275 0 2.139-.864T51 42t-.864-2.136T48 39t-2.136.864T45 42t.864 2.139T48 45m18-15q1.275 0 2.139-.864T69 27t-.864-2.136T66 24t-2.136.864T63 27t.864 2.139T66 30"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className={outcomesStyles.bottomFeatureTitle}>
                      Intent Graph
                    </h4>
                    <span className={outcomesStyles.bottomFeatureSubtitle}>
                      Entity &mdash; Behavior &mdash; Relationships
                    </span>
                  </div>
                </div>

                {/* Card 3: Headless SecOps */}
                <div className={outcomesStyles.bottomFeatureCard}>
                  <div className={outcomesStyles.bottomFeatureIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 90 90">
                      <circle cx="45" cy="45" r="45" fill="#DFDDDE"/>
                      <path fill="#3152B9" d="M70.814 54.767c0-2.07-.012-3.277-.205-4.137-.146-.655-.354-.935-.822-1.216-.536-.32-1.353-.579-2.832-.733l.436-4.164c1.728.18 3.25.528 4.548 1.308 1.575.944 2.389 2.264 2.753 3.889.318 1.42.308 3.175.308 5.053 0 1.876.01 3.63-.308 5.05-.364 1.624-1.178 2.944-2.753 3.888-1.299.78-2.82 1.128-4.548 1.309l-.436-4.162c1.48-.154 2.296-.414 2.832-.736.468-.281.676-.56.822-1.215.193-.86.205-2.066.205-4.134m-55.814 0c0-1.878-.013-3.634.305-5.053.364-1.624 1.181-2.944 2.756-3.89 1.299-.779 2.82-1.127 4.548-1.307l.218 2.082.215 2.082c-1.478.154-2.294.412-2.829.733-.468.281-.676.56-.823 1.216-.192.86-.204 2.067-.204 4.137 0 2.068.012 3.273.204 4.134.147.655.355.934.823 1.215.536.321 1.35.582 2.83.736l-.216 2.08-.218 2.082c-1.729-.18-3.25-.529-4.549-1.309-1.574-.944-2.39-2.264-2.755-3.888-.318-1.42-.305-3.174-.305-5.05"/>
                      <path fill="#3152B9" d="M65.231 54.768c0-3.339-.001-5.926-.147-8.02-.232-3.335-.812-4.922-1.867-5.994-.855-.868-2.044-1.42-4.237-1.72-2.258-.308-5.247-.313-9.517-.313h-8.928c-4.27 0-7.259.005-9.516.314-2.194.3-3.383.85-4.238 1.72-1.055 1.071-1.635 2.658-1.867 5.992-.146 2.095-.147 4.682-.147 8.02 0 3.34.001 5.927.147 8.021.232 3.334.812 4.921 1.867 5.993.855.869 2.044 1.42 4.238 1.72 2.257.308 5.247.313 9.516.313h8.928c4.27 0 7.26-.005 9.517-.313 2.194-.3 3.382-.851 4.237-1.72 1.055-1.072 1.635-2.659 1.867-5.993.146-2.094.147-4.682.147-8.02m4.186 0c0 3.285 0 6.04-.158 8.312-.249 3.573-.91 6.456-3.06 8.639-1.76 1.787-3.983 2.565-6.652 2.93-2.607.355-5.934.351-10.084.351h-8.928c-4.15 0-7.477.004-10.083-.351-2.67-.365-4.893-1.143-6.652-2.93-2.15-2.183-2.812-5.066-3.06-8.64-.16-2.272-.159-5.026-.159-8.311s0-6.04.158-8.312c.249-3.573.911-6.456 3.06-8.64 1.76-1.787 3.983-2.565 6.653-2.93 2.606-.355 5.934-.35 10.083-.35h8.928c4.15 0 7.477-.005 10.084.35 2.669.365 4.892 1.143 6.652 2.93 2.15 2.184 2.811 5.067 3.06 8.64.159 2.272.158 5.026.158 8.312M47.093 21.28a2.093 2.093 0 1 0-4.186-.001 2.093 2.093 0 0 0 4.186 0m4.186 0a6.279 6.279 0 1 1-12.558-.001 6.279 6.279 0 0 1 12.558 0"/>
                      <path fill="#3152B9" d="M42.906 36.628V25.465a2.093 2.093 0 0 1 4.186 0v11.163a2.093 2.093 0 0 1-4.186 0m9.219 23.434a2.093 2.093 0 0 1 2.491 3.364c-2.713 2.01-6.032 3.202-9.617 3.202s-6.904-1.191-9.618-3.203a2.093 2.093 0 0 1 2.491-3.363c2.033 1.507 4.487 2.38 7.127 2.38s5.094-.873 7.126-2.38m-1.544-10.876c0-.94.188-1.86.556-2.597.327-.654 1.036-1.589 2.235-1.589s1.908.935 2.234 1.589c.369.737.556 1.657.556 2.597s-.187 1.86-.556 2.597c-.326.654-1.036 1.59-2.234 1.59-1.199 0-1.908-.936-2.235-1.59-.368-.737-.556-1.657-.556-2.597m-16.744 0c0-.94.188-1.86.556-2.597.326-.654 1.036-1.589 2.235-1.589s1.908.935 2.234 1.589c.369.737.556 1.657.556 2.597s-.187 1.86-.556 2.597c-.326.654-1.036 1.59-2.234 1.59-1.199 0-1.909-.936-2.235-1.59-.368-.737-.556-1.657-.556-2.597"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className={outcomesStyles.bottomFeatureTitle}>
                      Headless SecOps
                    </h4>
                    <span className={outcomesStyles.bottomFeatureSubtitle}>
                      Autonomous &mdash; Always On &mdash; No L1/L2
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      </Reveal>

      {/* ── CAPABILITIES / HEADLESS SECOPS ── */}
      <section id="capabilities" style={{ maxWidth: 1380, margin: '0 auto', padding: '110px 32px' }}>
        
        {/* Headless SecOps Main Header */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ margin: '0 0 14px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: '#3152B9', textTransform: 'uppercase' }}>
              From cognitive overload to cognitive harmony.
            </p>
            <h2 style={{
              margin: '0 0 20px',
              fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 800,
              color: '#3152B9',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}>
              Introducing Headless SecOps.
            </h2>
            <p style={{
              margin: '0 auto',
              fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: currentTheme.textMuted,
              textTransform: 'uppercase',
              maxWidth: 720,
              lineHeight: 1.6,
            }}>
              No alerts. No rules. No dashboards. Your SecOps, inside your collaboration tools.
            </p>
          </div>
        </Reveal>

        {/* Capability Rows */}
        <div style={{ marginTop: 60, display: 'flex', flexDirection: 'column', gap: 64 }}>
          {capabilities.map((cap, idx) => (
            <Reveal key={cap.tag} delay={idx * 100}>
              <div style={{
                display: 'flex',
                flexDirection: idx % 2 !== 0 ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 80,
                padding: '40px 0',
                flexWrap: 'wrap',
              }}>
                
                {/* Text Side */}
                <div style={{ flex: '1 1 450px', maxWidth: 540 }}>
                  <p style={{ margin: '0 0 16px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#3152B9', textTransform: 'uppercase' }}>
                    {cap.stepLabel}
                  </p>
                  
                  <h3 style={{ margin: '0 0 20px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: currentTheme.textColor, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                    {cap.heading}
                  </h3>
                  
                  <p style={{ margin: '0 0 32px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 15, lineHeight: 1.7, color: currentTheme.textMuted }}>
                    {cap.body}
                  </p>

                  {/* Bullet Points with Check Icons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {cap.bullets.map((bullet) => (
                      <div key={bullet} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: 'rgba(49,82,185,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <IconCheckCircle size={14} color="#3152B9" />
                        </div>
                        <span style={{ fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 14, fontWeight: 600, color: currentTheme.textColor }}>
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graphic / Visual Side */}
                <div style={{
                  flex: '1 1 500px',
                  maxWidth: 620,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                  {cap.tag === 'Unify' ? (
                    <UnifyIllustration />
                  ) : cap.tag === 'Detect' ? (
                    <DetectIllustration />
                  ) : cap.tag === 'Respond' ? (
                    <RespondIllustration />
                  ) : (
                    <img src={cap.image} alt={cap.tag} style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }} />
                  )}
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── HOW TRENCH WORKS INSIDE COLLABORATION ── */}
      <Reveal>
        <section
          id="how-it-works"
          onMouseEnter={() => setIsCollabHovered(true)}
          onMouseLeave={() => setIsCollabHovered(false)}
          style={{ backgroundColor: '#3152B9', border: 'none', transition: 'background-color 0.3s ease', borderRadius: 24, margin: '40px 24px', overflow: 'hidden' }}
        >
          <div style={{ maxWidth: 1380, margin: '0 auto', padding: '110px 32px' }}>
            
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ margin: '0 0 14px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: '#E67E41', textTransform: 'uppercase' }}>
                How Trench Works Inside Collaboration
              </p>
              <h2 style={{
                margin: '0 0 16px',
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 800,
                color: '#F3EDE2',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}>
                We bring SecOps to where you work.
              </h2>
              <p style={{
                margin: '0 auto 36px',
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: 'rgba(243,237,226,0.8)',
                maxWidth: 640,
                lineHeight: 1.6,
              }}>
                From detection to remediation, inside Slack, Teams, or Claude.
              </p>

              {/* Tab switch buttons */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.16)', padding: '6px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)' }}>
                {[
                  { id: 'slack', label: 'Slack' },
                  { id: 'teams', label: 'Microsoft Teams' },
                  { id: 'claude', label: 'Claude' },
                ].map((tab) => {
                  const isActive = activeApp === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveApp(tab.id as any);
                        setActiveStep(0);
                      }}
                      style={{
                        padding: '10px 24px',
                        borderRadius: 100,
                        border: 'none',
                        fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                        color: isActive ? '#3152B9' : 'rgba(255,255,255,0.8)',
                        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Steps Horizontal Row */}
            {(() => {
              const appSteps = {
                slack: [
                  { label: 'Detect', desc: 'Suspicious sign-in flagged with full context.' },
                  { label: 'Verify', desc: 'Trench asks the impacted user, in DM.' },
                  { label: 'Approve', desc: 'Security engineer is paged for one-click approval.' },
                  { label: 'Remediate', desc: 'Tokens revoked, sessions killed, ticket closed.' },
                ],
                teams: [
                  { label: 'Detect', desc: 'DLP + UEBA correlate a bulk download anomaly.' },
                  { label: 'Verify', desc: 'Trench AI checks intent with the data owner.' },
                  { label: 'Approve', desc: 'Engineer green-lights containment in one tap.' },
                  { label: 'Contain', desc: 'Endpoint quarantined, DLP block live, ticket filed.' },
                ],
                claude: [
                  { label: 'Query', desc: 'Ask Trench about any security signal in natural language.' },
                  { label: 'Analyse', desc: 'Trench surfaces charts, anomalies and risk patterns inline.' },
                  { label: 'Investigate', desc: 'Go deeper with follow-up queries across your entire stack.' },
                  { label: 'Act', desc: 'Get a recommendation and take action, inside Claude.' },
                ],
              };
              const currentSteps = appSteps[activeApp];
              return (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 20,
                  marginBottom: 48,
                  marginTop: 24,
                }}>
                  {currentSteps.map((step, i) => {
                    const isActive = activeStep === i;
                    return (
                      <div
                        key={step.label}
                        onClick={() => {
                          setActiveStep(i);
                        }}
                        style={{
                          backgroundColor: isActive ? 'rgba(243,237,226,0.08)' : 'rgba(243,237,226,0.02)',
                          border: isActive ? '1.5px solid #E67E41' : '1px solid rgba(243,237,226,0.12)',
                          padding: '24px',
                          borderRadius: 16,
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          textAlign: 'left',
                          boxShadow: isActive ? '0 10px 25px rgba(230,126,65,0.15)' : 'none',
                          transform: isActive ? 'translateY(-2px)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{
                            fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            color: isActive ? '#E67E41' : 'rgba(243,237,226,0.5)',
                          }}>
                            0{i + 1}
                          </span>
                          <h3 style={{
                            margin: 0,
                            fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                            fontSize: 16,
                            fontWeight: 700,
                            color: isActive ? '#F3EDE2' : 'rgba(243,237,226,0.7)',
                          }}>
                            {step.label}
                          </h3>
                        </div>
                        <p style={{
                          margin: 0,
                          fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: isActive ? 'rgba(243,237,226,0.9)' : 'rgba(243,237,226,0.5)',
                        }}>
                          {step.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Equal Sized Mockup Viewport in 3:2 Landscape Proportion */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', transition: 'all 0.3s ease' }}>
              <MockupLandscapeWrapper>
                {activeApp === 'slack' && <VariationSlack hideLeft={true} activeStepOverride={activeStep + 1} />}
                {activeApp === 'teams' && <VariationTeams hideLeft={true} activeStepOverride={activeStep + 1} />}
                {activeApp === 'claude' && <VariationClaude hideLeft={true} activeStepOverride={activeStep + 1} />}
              </MockupLandscapeWrapper>
            </div>

            {/* ── TRENCH PRINCIPLE CARD (moved inside collaboration section) ── */}
            <Reveal delay={100}>
              <div style={{
                marginTop: 48,
                padding: '36px 40px',
                backgroundColor: 'rgba(243,237,226,0.06)',
                border: '1px solid rgba(243,237,226,0.15)',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 28,
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.3s ease, background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(230,126,65,0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(243,237,226,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(243,237,226,0.15)';
                e.currentTarget.style.backgroundColor = 'rgba(243,237,226,0.06)';
              }}
              >
                {/* Subtle decorative glow */}
                <div style={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 180,
                  height: 180,
                  background: 'radial-gradient(circle, rgba(230,126,65,0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <div style={{ flex: '1 1 300px', zIndex: 1 }}>
                  <p style={{ margin: '0 0 8px', fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: '#E67E41', textTransform: 'uppercase' }}>
                    The Trench Principle
                  </p>
                  <h3 style={{ margin: 0, fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 800, color: '#F3EDE2', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    No alerts. No rules. No dashboards.
                  </h3>
                </div>
                <p style={{ flex: '1 1 280px', margin: 0, fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif", fontSize: 14, color: 'rgba(243,237,226,0.75)', lineHeight: 1.65, zIndex: 1 }}>
                  Your SecOps lives inside the collaboration tools your team already uses: Slack, Teams, or Claude. Security without the context switch.
                </p>
              </div>
            </Reveal>

          </div>
        </section>
      </Reveal>

      {/* ── CTA SECTION ── */}
      <Reveal>
        <section id="contact" className="home-cta-section" style={{ maxWidth: 1380, margin: '0 auto', padding: '0 32px 110px' }}>
          <div className="home-cta-card" style={{
            position: 'relative',
            backgroundColor: currentTheme.cardBg,
            borderRadius: 24,
            border: `1px solid rgba(49,82,185,0.15)`,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(48px, 6vw, 72px) clamp(36px, 5vw, 80px)',
            gap: 40,
            minHeight: 200,
            transition: 'background-color 0.3s ease',
            boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
          }}>
            {/* Left content */}
            <div className="home-cta-text" style={{ flex: '1 1 auto', zIndex: 2 }}>
              <p style={{
                margin: '0 0 12px',
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#3152B9',
              }}>
                Every Castle Needs a Trench.
              </p>
              <h2 style={{
                margin: '0 0 16px',
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 800,
                color: currentTheme.textColor,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>
                Our Trench Protects Your Castle.
              </h2>
              <p style={{
                margin: '0 0 32px',
                fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                fontSize: 14.5,
                color: currentTheme.textMuted,
                lineHeight: 1.6,
                maxWidth: 420,
              }}>
                The Agentic Operating System for your security stack: protecting everything you have built, 24/7.
              </p>
              <a
                href="/connect"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#F3EDE2',
                  backgroundColor: '#3152B9',
                  padding: '8px 8px 8px 24px',
                  borderRadius: 100,
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 14px rgba(49,82,185,0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2541A0';
                  e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3152B9';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                Dig In
                <span style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconArrowRight size={14} color="#F3EDE2" />
                </span>
              </a>
            </div>

            {/* Castle Image */}
            <div className="home-cta-image-wrapper" style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              zIndex: 2,
            }}>
              <img
                src="/CTA/mini-castle-cta.webp"
                alt="Trench protects your castle"
                className="home-cta-image"
                style={{
                  height: 'clamp(168px, 21.6vw, 264px)',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── BPL COMMUNITY ANNOUNCEMENT ── */}
      <Reveal>
        <section className="home-bpl-section" aria-labelledby="home-bpl-title">
          <div className="home-bpl-head">
            <div className="home-bpl-intro">
              <img
                src="/BPL/bpl-logo-160.webp"
                alt="BlueTeam Premier League logo"
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="home-bpl-logo"
              />
              <div className="home-bpl-copy">
                <p className="home-bpl-eyebrow">Community</p>
                <h2 id="home-bpl-title" className="home-bpl-title">BlueTeam Premier League</h2>
                <p className="home-bpl-lead">
                  An exclusive cybersecurity league, organised by Trench, where blue teams compete through ideas,
                  strategy and collaboration rather than on a playing field.
                </p>
              </div>
            </div>
            <a href="/resources/community" className="home-bpl-cta">
              Read more
              <span className="home-bpl-cta-arrow">
                <IconArrowRight size={14} color="#F3EDE2" />
              </span>
            </a>
          </div>

          <div className="home-bpl-cards">
            {BPL_HIGHLIGHTS.map(({ Icon, title, text }) => (
              <article key={title} className="home-bpl-card">
                <div className="home-bpl-card-icon">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <style>{`
            /* Poppins is the body face for this block; declared once and inherited. */
            .home-bpl-section { max-width: 1380px; margin: 0 auto; padding: 0 32px 110px; font-family: 'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif; }
            /* Head is a 2-column grid, not wrapping flex: the CTA keeps its own
               column and never collides with the lead paragraph at mid widths. */
            .home-bpl-head { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; column-gap: 40px; row-gap: 24px; margin-bottom: 40px; }
            .home-bpl-intro { display: flex; align-items: center; gap: 24px; min-width: 0; }
            .home-bpl-logo { width: 84px; height: 84px; object-fit: contain; flex-shrink: 0; }
            .home-bpl-copy { min-width: 0; }
            .home-bpl-eyebrow { margin: 0 0 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #3152B9; }
            .home-bpl-title { margin: 0 0 12px; font-size: clamp(26px, 3.4vw, 38px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; color: #2B2B2B; text-wrap: balance; }
            .home-bpl-lead { margin: 0; font-size: 15px; line-height: 1.65; color: #4A4A4A; max-width: 58ch; }
            .home-bpl-cta { display: inline-flex; align-items: center; justify-content: center; gap: 12px; white-space: nowrap; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #F3EDE2; background-color: #3152B9; padding: 8px 8px 8px 24px; border-radius: 100px; text-decoration: none; box-shadow: 0 4px 14px rgba(49, 82, 185, 0.25); transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            .home-bpl-cta:hover, .home-bpl-cta:focus-visible { background-color: #2541A0; transform: translateY(-1px) scale(1.02); }
            .home-bpl-cta:focus-visible { outline: 2px solid #E67E41; outline-offset: 3px; }
            .home-bpl-cta-arrow { width: 28px; height: 28px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
            /* auto-fit keeps the cards even at every width instead of stepping 3 -> 1. */
            .home-bpl-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
            .home-bpl-card { display: flex; flex-direction: column; background-color: #EDE7D9; border: 1px solid rgba(49, 82, 185, 0.15); border-radius: 20px; padding: 28px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease; }
            .home-bpl-card:hover { transform: translateY(-4px); border-color: rgba(49, 82, 185, 0.3); box-shadow: 0 16px 44px rgba(49, 82, 185, 0.09); }
            .home-bpl-card-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(49, 82, 185, 0.06); color: #3152B9; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; flex-shrink: 0; }
            .home-bpl-card h3 { margin: 0 0 8px; font-size: 17px; font-weight: 700; color: #2B2B2B; }
            .home-bpl-card p { margin: 0; font-size: 14px; line-height: 1.6; color: #4A4A4A; }

            /* Tablet: CTA drops under the copy, still left-aligned with it. */
            @media (max-width: 1024px) {
              .home-bpl-head { grid-template-columns: minmax(0, 1fr); }
              .home-bpl-cta { justify-self: start; }
            }
            /* Mobile: logo stacks above the copy so the title gets full width. */
            @media (max-width: 768px) {
              .home-bpl-section { padding: 0 20px 80px; }
              .home-bpl-head { margin-bottom: 32px; row-gap: 20px; }
              .home-bpl-intro { flex-direction: column; align-items: flex-start; gap: 16px; }
              .home-bpl-logo { width: 64px; height: 64px; }
              .home-bpl-lead { font-size: 14.5px; }
              .home-bpl-cta { width: 100%; padding: 10px 10px 10px 24px; justify-content: space-between; }
              .home-bpl-card { padding: 24px; border-radius: 16px; }
            }
            @media (prefers-reduced-motion: reduce) {
              .home-bpl-cta, .home-bpl-card { transition: none; }
              .home-bpl-cta:hover, .home-bpl-cta:focus-visible, .home-bpl-card:hover { transform: none; }
            }
          `}</style>
        </section>
      </Reveal>

      {/* ── FAQ SECTION ── */}
      <FAQSection currentTheme={currentTheme} />

      {/* footer removed, managed by App.tsx */}

      <style>{`
        /* Hero CTAs: side by side and centred on mobile, matching the centred
           headline above them. They shrink rather than wrap, so the pair stays
           on one row down to the narrowest phones. */
        @media (max-width: 768px) {
          .home-hero-ctas {
            justify-content: center;
            flex-wrap: nowrap;
            gap: 10px !important;
            width: 100%;
          }
          .home-hero-ctas > a {
            font-size: 12.5px !important;
            white-space: nowrap;
            flex: 0 1 auto;
            min-width: 0;
          }
          .home-hero-ctas > a:first-child { padding: 7px 7px 7px 18px !important; }
          .home-hero-ctas > a:last-child { padding: 10px 18px !important; }
        }
        @media (max-width: 360px) {
          .home-hero-ctas > a { font-size: 11.5px !important; }
          .home-hero-ctas > a:first-child { padding: 6px 6px 6px 14px !important; }
          .home-hero-ctas > a:last-child { padding: 9px 14px !important; }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
        @media (max-width: 640px) {
          [style*="borderRight: '1px solid rgba(49,82,185"] {
            border-right: none !important;
            border-bottom: 1px solid rgba(49,82,185,0.12) !important;
          }
        }

        /* ── Home CTA Responsive ── */
        @media (max-width: 860px) {
          .home-cta-section {
            padding: 0 20px 60px !important;
          }
          .home-cta-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 36px 28px !important;
            gap: 32px !important;
          }
          .home-cta-text {
            width: 100% !important;
          }
          .home-cta-text p {
            max-width: 100% !important;
          }
          .home-cta-image-wrapper {
            width: 100% !important;
            justify-content: center !important;
          }
          .home-cta-image {
            height: auto !important;
            max-height: 240px !important;
            width: min(100%, 320px) !important;
          }
        }
        @media (max-width: 480px) {
          .home-cta-section {
            padding: 0 16px 48px !important;
          }
          .home-cta-card {
            padding: 28px 20px !important;
            gap: 24px !important;
            border-radius: 20px !important;
          }
          .home-cta-image {
            max-height: 200px !important;
            width: min(100%, 280px) !important;
          }
        }

        /* ── Hero row layout (desktop = row, mobile = column) ── */
        .hero-row {
          flex-direction: row !important;
        }
        .hero-content {
          text-align: left !important;
        }

        /* ── Hero responsive padding ── */
        @media (max-width: 1024px) {
          .hero-section {
            padding-top: 130px !important;
            padding-bottom: 32px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .hero-row {
            gap: 32px !important;
          }
        }
        @media (max-width: 768px) {
          .hero-row {
            flex-direction: column !important;
            text-align: center !important;
            gap: 32px !important;
          }
          .hero-content {
            text-align: center !important;
          }
          .hero-content > div {
            justify-content: center !important;
          }
          .hero-media {
            flex: 1 1 100% !important;
            width: 100% !important;
          }
          .hero-section {
            padding-top: 145px !important;
            padding-bottom: 28px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .hero-title {
            font-size: clamp(26px, 7vw, 38px) !important;
            margin-bottom: 14px !important;
          }
          .hero-subtitle {
            font-size: 14px !important;
            margin-bottom: 22px !important;
          }
          .hero-video-container {
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            padding-top: 155px !important;
            padding-bottom: 24px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .hero-title {
            font-size: clamp(22px, 8vw, 32px) !important;
            margin-bottom: 12px !important;
          }
          .hero-subtitle {
            font-size: 13.5px !important;
            margin-bottom: 18px !important;
          }
        }
        /* ── Testimonials Carousel Controls & Fade ── */
        @keyframes testimonialItemFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .testimonial-fade-item {
          animation: testimonialItemFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .testimonial-nav-btn:hover {
          background-color: #3152B9 !important;
          color: #FFFFFF !important;
          border-color: #3152B9 !important;
          transform: scale(1.12);
          box-shadow: 0 6px 20px rgba(49, 82, 185, 0.3) !important;
        }
        .testimonial-nav-btn:active {
          transform: scale(0.92);
        }
        .testimonial-dot-btn:hover {
          border-color: #3152B9 !important;
          background-color: rgba(49, 82, 185, 0.25) !important;
          transform: scale(1.2);
        }
        .testimonial-dot-btn:active {
          transform: scale(0.9);
        }
      `}</style>
    </main>
  )
}
