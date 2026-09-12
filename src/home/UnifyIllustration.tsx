import React, { useState, useEffect, useRef } from 'react'

// Trench Official Brand Colors (from Trench Brand Guidelines)
const BRAND_BLUE = '#3152B9'
const BRAND_BLUE_LIGHT = 'rgba(49, 82, 185, 0.07)'
const BRAND_BLUE_BORDER = '#3152B9'
const BRAND_CREAM = '#EDE7D9'
const TEXT_DARK = '#2B2B2B'
const TEXT_MUTED = '#4A4A4A'
const WHITE = '#FFFFFF'

const BASE_WIDTH = 600
const BASE_HEIGHT = 400 // 3:2 aspect ratio (600 : 400 = 3 : 2)

export default function UnifyIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // Looped process pipeline:
  // 0: Source to Data Engine packet travel
  // 1: PARSE
  // 2: NORMALIZE
  // 3: ENRICH
  // 4: VALIDATE
  // 5: Engine to Lake packet travel
  // 6: Lake processing (cube float, pills shimmer)
  const [phase, setPhase] = useState(3)
  const [activeSourceIndex, setActiveSourceIndex] = useState(0)

  // Responsive scale hook: scales 600x400 proportionally to fit any screen size (mobile, tablet, desktop)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateScale = () => {
      const w = el.offsetWidth
      if (w > 0) {
        setScale(w / BASE_WIDTH)
      }
    }
    updateScale()

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateScale)
      ro.observe(el)
      return () => ro.disconnect()
    } else {
      window.addEventListener('resize', updateScale)
      return () => window.removeEventListener('resize', updateScale)
    }
  }, [])

  // 5 Source shapes with fixed vertical centers corresponding to height 230px:
  // Button height: 38px, Gap: 10px -> Centers: 19, 67, 115, 163, 211
  const sources = [
    {
      id: 'cloud',
      label: 'CLOUD',
      y: 19,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      ),
    },
    {
      id: 'endpoint',
      label: 'ENDPOINT',
      y: 67,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      id: 'identity',
      label: 'IDENTITY',
      y: 115,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: 'network',
      label: 'NETWORK',
      y: 163,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <path d="M5 16v-4h14v4" />
          <line x1="12" y1="8" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      id: 'saas',
      label: 'SaaS',
      y: 211,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
  ]

  const engineSteps = ['PARSE', 'NORMALIZE', 'ENRICH', 'VALIDATE']

  // Automated looped process pipeline
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => {
        const next = (prev + 1) % 7
        if (next === 0) {
          setActiveSourceIndex((s) => (s + 1) % 5)
        }
        return next
      })
    }, 950)
    return () => clearInterval(timer)
  }, [])

  const isCurrentStep = (stepName: string) => {
    if (phase === 1 && stepName === 'PARSE') return true
    if (phase === 2 && stepName === 'NORMALIZE') return true
    if (phase === 3 && stepName === 'ENRICH') return true
    if (phase === 4 && stepName === 'VALIDATE') return true
    return false
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: BASE_WIDTH,
        aspectRatio: '3 / 2', // Strictly preserves 3:2 landscape proportion across all screens
        position: 'relative',
        background: BRAND_CREAM,
        borderRadius: 24,
        border: '1px solid rgba(49, 82, 185, 0.18)',
        boxShadow: '0 8px 32px rgba(49, 82, 185, 0.08)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes dashFlow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes cubeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes pillShimmer {
          0%, 100% { box-shadow: 0 0 0 0 rgba(49, 82, 185, 0); }
          50% { box-shadow: 0 0 0 3px rgba(49, 82, 185, 0.28); }
        }
      `}</style>

      {/* Proportional 3:2 Landscape Viewport scaled via GPU */}
      <div
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          boxSizing: 'border-box',
          padding: '24px 22px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: "'Poppins', Arial, sans-serif",
          pointerEvents: 'auto',
        }}
      >
        {/* Top Section Layout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Left Column: SOURCES (5 Shapes) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: 114,
              height: 230,
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {sources.map((src, idx) => {
              const isActive = idx === activeSourceIndex
              return (
                <button
                  key={src.id}
                  onClick={() => setActiveSourceIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    height: 38,
                    width: 114,
                    padding: '0 12px',
                    borderRadius: 10,
                    background: WHITE,
                    border: isActive ? `2px solid ${BRAND_BLUE_BORDER}` : '1px solid rgba(49, 82, 185, 0.18)',
                    color: isActive ? BRAND_BLUE : TEXT_DARK,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: "'Poppins', Arial, sans-serif",
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isActive ? '0 4px 14px rgba(49, 82, 185, 0.2)' : '0 1px 3px rgba(0,0,0,0.03)',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    style={{
                      color: isActive ? BRAND_BLUE : TEXT_MUTED,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {src.icon}
                  </span>
                  <span>{src.label}</span>
                </button>
              )
            })}
          </div>

          {/* Connectors from each Source shape to Data Engine card (All 5 shapes linked with dashed lines) */}
          <svg
            width="36"
            height="230"
            viewBox="0 0 36 230"
            style={{
              flexShrink: 0,
              pointerEvents: 'none',
              zIndex: 1,
              display: 'block',
            }}
            fill="none"
          >
            {sources.map((src, idx) => {
              const isActive = idx === activeSourceIndex
              return (
                <React.Fragment key={src.id}>
                  {/* Horizontal dashed line linking this source shape directly to Data Engine */}
                  <line
                    x1="0"
                    y1={src.y}
                    x2="36"
                    y2={src.y}
                    stroke={isActive ? BRAND_BLUE : 'rgba(49, 82, 185, 0.28)'}
                    strokeWidth={isActive ? 2 : 1.2}
                    strokeDasharray="4 3"
                    style={{
                      animation: isActive ? 'dashFlow 1s linear infinite' : 'none',
                      transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                    }}
                  />
                  {/* Flowing data packet when this source is active during Phase 0 */}
                  {isActive && phase === 0 && (
                    <circle
                      cx="0"
                      cy={src.y}
                      r="3.5"
                      fill={BRAND_BLUE}
                      style={{ filter: 'drop-shadow(0 0 4px #3152B9)' }}
                    >
                      <animate
                        attributeName="cx"
                        from="0"
                        to="36"
                        dur="0.95s"
                        repeatCount="1"
                      />
                    </circle>
                  )}
                </React.Fragment>
              )
            })}
          </svg>

          {/* Middle Column: DATA ENGINE */}
          <div
            style={{
              width: 124,
              height: 230,
              background: BRAND_BLUE_LIGHT,
              borderRadius: 16,
              border: '1px solid rgba(49, 82, 185, 0.16)',
              padding: '14px 10px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
              boxShadow: phase >= 1 && phase <= 4 ? '0 0 16px rgba(49, 82, 185, 0.15)' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: BRAND_BLUE,
                letterSpacing: '0.07em',
                textAlign: 'center',
                textTransform: 'uppercase',
                fontFamily: "'Poppins', Arial, sans-serif",
              }}
            >
              DATA ENGINE
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: '100%' }}>
              {engineSteps.map((step, idx) => {
                const isActive = isCurrentStep(step) || (phase === 0 && step === 'ENRICH')
                return (
                  <React.Fragment key={step}>
                    <button
                      onClick={() => setPhase(idx + 1)}
                      style={{
                        width: '100%',
                        padding: '7px 4px',
                        borderRadius: 8,
                        background: isActive ? BRAND_BLUE : WHITE,
                        color: isActive ? WHITE : BRAND_BLUE,
                        border: isActive ? `1.5px solid ${BRAND_BLUE}` : '1px solid rgba(49, 82, 185, 0.18)',
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        textAlign: 'center',
                        cursor: 'pointer',
                        fontFamily: "'Poppins', Arial, sans-serif",
                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                        boxShadow: isActive
                          ? '0 4px 14px rgba(49, 82, 185, 0.32)'
                          : '0 1px 3px rgba(0, 0, 0, 0.03)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {step}
                    </button>
                    {idx < engineSteps.length - 1 && (
                      <svg
                        width="8"
                        height="5"
                        viewBox="0 0 8 5"
                        fill="none"
                        style={{
                          transform: phase === idx + 1 ? 'translateY(1px)' : 'translateY(0)',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        <path
                          d="M4 5L0.5 0.5H7.5L4 5Z"
                          fill={BRAND_BLUE}
                          opacity={phase === idx + 1 ? 1 : 0.6}
                        />
                      </svg>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Solid Blue Connecting Arrow from Data Engine to Unified Lake with Packet animation */}
          <div style={{ width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
            <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
              <line x1="0" y1="7" x2="20" y2="7" stroke={BRAND_BLUE} strokeWidth="2.2" strokeLinecap="round" />
              <polygon points="18,2 28,7 18,12" fill={BRAND_BLUE} />
              {/* Travelling pulse when transitioning from engine to lake */}
              {phase === 5 && (
                <circle cx="10" cy="7" r="3" fill={BRAND_BLUE} style={{ filter: 'drop-shadow(0 0 4px #3152B9)' }}>
                  <animate attributeName="cx" from="0" to="24" dur="0.95s" repeatCount="1" />
                </circle>
              )}
            </svg>
          </div>

          {/* Right Column: UNIFIED MESH DATA LAKE */}
          <div
            style={{
              flex: '1 1 0',
              minWidth: 190,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                background: BRAND_BLUE_LIGHT,
                borderRadius: 16,
                border: '1px solid rgba(49, 82, 185, 0.16)',
                padding: '14px 14px 10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: phase === 6 ? '0 0 18px rgba(49, 82, 185, 0.18)' : 'none',
                transition: 'box-shadow 0.4s ease',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: BRAND_BLUE,
                  letterSpacing: '0.07em',
                  lineHeight: 1.35,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                  fontFamily: "'Poppins', Arial, sans-serif",
                }}
              >
                UNIFIED MESH<br />DATA LAKE
              </div>

              {/* 3D Isometric Data Lake Illustration (datalake.webp) */}
              <img
                src="/datalake.webp"
                alt="Unified Mesh Data Lake"
                style={{
                  width: 174,
                  height: 132,
                  display: 'block',
                  objectFit: 'contain',
                  animation: 'cubeFloat 4s ease-in-out infinite',
                }}
              />
            </div>

            {/* Under Lake: 3 Pills */}
            <div style={{ display: 'flex', gap: 6, width: '100%', justifyContent: 'center' }}>
              {['SEARCHABLE', 'ENRICHED', 'NORMALIZED'].map((pill, idx) => (
                <div
                  key={pill}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 100,
                    border: `1.2px solid ${BRAND_BLUE_BORDER}`,
                    background: WHITE,
                    color: BRAND_BLUE,
                    fontSize: 7.5,
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    fontFamily: "'Poppins', Arial, sans-serif",
                    animation: phase === 6 ? `pillShimmer 1.2s ease-in-out infinite ${idx * 0.18}s` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Under DATA ENGINE: Agentless Setup Button/Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div
            style={{
              padding: '5px 20px',
              borderRadius: 100,
              border: `1.5px solid ${BRAND_BLUE_BORDER}`,
              background: WHITE,
              color: BRAND_BLUE,
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', Arial, sans-serif",
              boxShadow: '0 2px 8px rgba(49, 82, 185, 0.1)',
            }}
          >
            AGENTLESS SETUP
          </div>
        </div>

        {/* Bottom Footer (Trench Brand Guidelines: No em-dashes, use →) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 14,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: TEXT_MUTED,
            textTransform: 'uppercase',
            fontFamily: "'Poppins', Arial, sans-serif",
          }}
        >
          <span>SOURCES</span>
          <span style={{ color: BRAND_BLUE }}>→</span>
          <span>ENGINE</span>
          <span style={{ color: BRAND_BLUE }}>→</span>
          <span>UNIFIED LAYER</span>
        </div>
      </div>
    </div>
  )
}
