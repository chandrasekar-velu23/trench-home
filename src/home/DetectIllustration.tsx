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

// 6 tactics arranged in clockwise order around the center Intent Graph:
// 0: LATERAL MOVEMENT (~12 o'clock)
// 1: PRIV ESCALATION  (~2 o'clock)
// 2: DATA EXFIL       (~4 o'clock)
// 3: C2 COMMS         (~6 o'clock)
// 4: INITIAL ACCESS   (~8 o'clock)
// 5: PERSISTENCE      (~10 o'clock)
const TACTICS = [
  {
    id: 'lateral',
    label: 'LATERAL\nMOVEMENT',
    width: 90,
    cardPos: { x: 175, y: 27 },
    line: { x1: 175, y1: 106, x2: 175, y2: 44 },
    pulse: { fromX: 175, toX: 175, fromY: 106, toY: 44 },
  },
  {
    id: 'priv',
    label: 'PRIV\nESCALATION',
    width: 90,
    cardPos: { x: 292, y: 80 },
    line: { x1: 205, y1: 124, x2: 259, y2: 97 },
    pulse: { fromX: 205, toX: 259, fromY: 124, toY: 97 },
  },
  {
    id: 'exfil',
    label: 'DATA\nEXFIL',
    width: 78,
    cardPos: { x: 292, y: 200 },
    line: { x1: 205, y1: 156, x2: 259, y2: 183 },
    pulse: { fromX: 205, toX: 259, fromY: 156, toY: 183 },
  },
  {
    id: 'c2',
    label: 'C2\nCOMMS',
    width: 76,
    cardPos: { x: 175, y: 222 },
    line: { x1: 175, y1: 174, x2: 175, y2: 205 },
    pulse: { fromX: 175, toX: 175, fromY: 174, toY: 205 },
  },
  {
    id: 'initial',
    label: 'INITIAL\nACCESS',
    width: 84,
    cardPos: { x: 58, y: 200 },
    line: { x1: 145, y1: 156, x2: 91, y2: 183 },
    pulse: { fromX: 145, toX: 91, fromY: 156, toY: 183 },
  },
  {
    id: 'persistence',
    label: 'PERSISTENCE',
    width: 92,
    cardPos: { x: 58, y: 80 },
    line: { x1: 145, y1: 124, x2: 83, y2: 93 },
    pulse: { fromX: 145, toX: 83, fromY: 124, toY: 93 },
  },
]

export default function DetectIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // Clockwise detection sweep step:
  // 0: Lateral Movement connects
  // 1: Priv Escalation connects
  // 2: Data Exfil connects
  // 3: C2 Comms connects
  // 4: Initial Access connects
  // 5: Persistence connects
  // 6: Full Graph Correlated -> Trigger fires into Detections card
  // 7: Hold & cycle reset
  const [clockwiseStep, setClockwiseStep] = useState(0)

  const signals = ['LOG', 'ALERT', 'EVENT', 'FLOW', 'INTEL']
  const activeSignalIndex = clockwiseStep % signals.length

  useEffect(() => {
    const timer = setInterval(() => {
      setClockwiseStep((prev) => (prev + 1) % 8)
    }, 850)
    return () => clearInterval(timer)
  }, [])

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
        @keyframes dashFlowForward {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes radarExpand {
          0% { transform: scale(0.88); opacity: 0.8; }
          50% { transform: scale(1.16); opacity: 0.25; }
          100% { transform: scale(0.88); opacity: 0.8; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 4px rgba(49, 82, 185, 0.2), 0 4px 14px rgba(49, 82, 185, 0.15); }
          50% { box-shadow: 0 0 0 8px rgba(49, 82, 185, 0.35), 0 6px 20px rgba(49, 82, 185, 0.3); }
        }
        @keyframes barGrow {
          0% { width: 15%; }
          100% { width: 85%; }
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
          padding: '24px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: "'Poppins', Arial, sans-serif",
          pointerEvents: 'auto',
        }}
      >
        {/* 3-Column Centerpiece Layout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            height: 280,
          }}
        >
          {/* Left Column: RAW SIGNALS */}
          <div
            style={{
              width: 96,
              background: BRAND_BLUE_LIGHT,
              borderRadius: 14,
              border: '1px solid rgba(49, 82, 185, 0.16)',
              padding: '14px 8px 12px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0,
              zIndex: 3,
              boxShadow: clockwiseStep === 0 ? '0 0 16px rgba(49, 82, 185, 0.2)' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: BRAND_BLUE,
                letterSpacing: '0.08em',
                lineHeight: 1.35,
                textAlign: 'center',
                textTransform: 'uppercase',
                marginBottom: 10,
                fontFamily: "'Poppins', Arial, sans-serif",
              }}
            >
              RAW<br />SIGNALS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
              {signals.map((sig, idx) => {
                const isSelected = idx === activeSignalIndex
                return (
                  <div
                    key={sig}
                    onClick={() => setClockwiseStep(idx % 6)}
                    style={{
                      background: WHITE,
                      border: isSelected ? `1.5px solid ${BRAND_BLUE}` : '1px solid rgba(49, 82, 185, 0.16)',
                      borderRadius: 8,
                      padding: '5px 0',
                      textAlign: 'center',
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: isSelected ? BRAND_BLUE : TEXT_DARK,
                      fontFamily: "'Poppins', Arial, sans-serif",
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                      boxShadow: isSelected ? '0 2px 10px rgba(49, 82, 185, 0.2)' : '0 1px 2px rgba(0,0,0,0.02)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {sig}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Center: INTENT GRAPH (Full Radial Canvas) */}
          <div
            style={{
              width: 350,
              height: 280,
              position: 'relative',
              flexShrink: 0,
            }}
          >
            {/* SVG Overlay for Rings, Clockwise Connector Lines, Dashed Arrows, and Data Pulses */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 350,
                height: 280,
                pointerEvents: 'none',
                zIndex: 1,
              }}
              viewBox="0 0 350 280"
            >
              {/* Dashed arrow from RAW SIGNALS into center INTENT GRAPH */}
              <line
                x1="2"
                y1="140"
                x2="134"
                y2="140"
                stroke={BRAND_BLUE}
                strokeWidth="1.8"
                strokeDasharray="4 3"
                style={{
                  animation: 'dashFlowForward 1.2s linear infinite',
                }}
              />
              <polygon points="131,136 141,140 131,144" fill={BRAND_BLUE} />
              {clockwiseStep === 0 && (
                <circle cx="50" cy="140" r="3.5" fill={BRAND_BLUE} style={{ filter: 'drop-shadow(0 0 4px #3152B9)' }}>
                  <animate attributeName="cx" from="6" to="136" dur="0.8s" repeatCount="1" />
                </circle>
              )}

              {/* Dashed arrow from center INTENT GRAPH out to AUTO-GENERATED DETECTIONS */}
              <line
                x1="209"
                y1="140"
                x2="341"
                y2="140"
                stroke={BRAND_BLUE}
                strokeWidth="1.8"
                strokeDasharray="4 3"
                style={{
                  animation: 'dashFlowForward 1.2s linear infinite',
                }}
              />
              <polygon points="338,136 348,140 338,144" fill={BRAND_BLUE} />
              {clockwiseStep >= 6 && (
                <circle cx="280" cy="140" r="3.5" fill={BRAND_BLUE} style={{ filter: 'drop-shadow(0 0 4px #3152B9)' }}>
                  <animate attributeName="cx" from="210" to="342" dur="0.8s" repeatCount="1" />
                </circle>
              )}

              {/* Concentric dashed circles around center (175, 140) */}
              <circle
                cx="175"
                cy="140"
                r="68"
                fill="none"
                stroke="rgba(49, 82, 185, 0.35)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                style={{
                  transformOrigin: '175px 140px',
                  animation: 'radarExpand 3s ease-in-out infinite',
                }}
              />
              <circle
                cx="175"
                cy="140"
                r="46"
                fill="none"
                stroke="rgba(49, 82, 185, 0.35)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* All 6 Clockwise Radial Connector Lines — EXACT ZERO GAP TO CARDS */}
              {TACTICS.map((tactic, idx) => {
                const isConnected = clockwiseStep >= idx && clockwiseStep <= 6
                const isCurrentTarget = clockwiseStep === idx

                return (
                  <React.Fragment key={tactic.id}>
                    {/* Base connecting line (turns into active blue dashed line when connected) */}
                    <line
                      x1={tactic.line.x1}
                      y1={tactic.line.y1}
                      x2={tactic.line.x2}
                      y2={tactic.line.y2}
                      stroke={isConnected ? BRAND_BLUE : 'rgba(49, 82, 185, 0.25)'}
                      strokeWidth={isCurrentTarget ? 2.2 : isConnected ? 1.8 : 1}
                      strokeDasharray={isConnected ? '4 3' : '2 3'}
                      style={{
                        animation: isConnected ? 'dashFlowForward 1.2s linear infinite' : 'none',
                        transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                      }}
                    />

                    {/* Travelling pulse particle along line toward tactic node */}
                    {isCurrentTarget && (
                      <circle
                        cx={tactic.pulse.fromX}
                        cy={tactic.pulse.fromY}
                        r="3.5"
                        fill={BRAND_BLUE}
                        style={{ filter: 'drop-shadow(0 0 4px #3152B9)' }}
                      >
                        <animate
                          attributeName="cx"
                          from={tactic.pulse.fromX}
                          to={tactic.pulse.toX}
                          dur="0.8s"
                          repeatCount="1"
                        />
                        <animate
                          attributeName="cy"
                          from={tactic.pulse.fromY}
                          to={tactic.pulse.toY}
                          dur="0.8s"
                          repeatCount="1"
                        />
                      </circle>
                    )}
                  </React.Fragment>
                )
              })}
            </svg>

            {/* Center Blue Circle: INTENT GRAPH */}
            <div
              style={{
                position: 'absolute',
                left: 175,
                top: 140,
                transform: clockwiseStep === 6
                  ? 'translate(-50%, -50%) scale(1.08)'
                  : 'translate(-50%, -50%) scale(1)',
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: BRAND_BLUE_LIGHT,
                border: `2px solid ${BRAND_BLUE}`,
                boxShadow: clockwiseStep === 6
                  ? '0 0 0 8px rgba(49, 82, 185, 0.25), 0 6px 24px rgba(49, 82, 185, 0.35)'
                  : '0 0 0 4px rgba(49, 82, 185, 0.15), 0 4px 14px rgba(49, 82, 185, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  color: BRAND_BLUE,
                  letterSpacing: '0.05em',
                  lineHeight: 1.25,
                  textAlign: 'center',
                  fontFamily: "'Poppins', Arial, sans-serif",
                }}
              >
                INTENT<br />GRAPH
              </span>
            </div>

            {/* Surrounding 6 Tactic Cards — Each activates in Clockwise Sequence */}
            {TACTICS.map((tactic, idx) => {
              const isConnected = clockwiseStep >= idx && clockwiseStep <= 6
              const isCurrentTarget = clockwiseStep === idx

              return (
                <div
                  key={tactic.id}
                  onClick={() => setClockwiseStep(idx)}
                  style={{
                    position: 'absolute',
                    left: tactic.cardPos.x,
                    top: tactic.cardPos.y,
                    width: tactic.width,
                    boxSizing: 'border-box',
                    background: WHITE,
                    border: isConnected
                      ? `2px solid ${BRAND_BLUE_BORDER}`
                      : '1px solid rgba(49, 82, 185, 0.16)',
                    borderRadius: 8,
                    padding: '5px 4px',
                    fontSize: isConnected ? 8.5 : 8,
                    fontWeight: isConnected ? 800 : 700,
                    letterSpacing: '0.04em',
                    color: isConnected ? BRAND_BLUE : TEXT_DARK,
                    textAlign: 'center',
                    lineHeight: 1.25,
                    whiteSpace: 'pre-line',
                    fontFamily: "'Poppins', Arial, sans-serif",
                    cursor: 'pointer',
                    transform: isCurrentTarget
                      ? 'translate(-50%, -50%) scale(1.06)'
                      : isConnected
                      ? 'translate(-50%, -50%) scale(1.02)'
                      : 'translate(-50%, -50%) scale(1)',
                    boxShadow: isCurrentTarget
                      ? '0 6px 18px rgba(49, 82, 185, 0.28)'
                      : isConnected
                      ? '0 3px 10px rgba(49, 82, 185, 0.12)'
                      : '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: isCurrentTarget ? 5 : 3,
                  }}
                >
                  {tactic.label}
                </div>
              )
            })}

            {/* MITRE ATT&CK ALIGNED Pill (under C2 Comms) */}
            <div
              style={{
                position: 'absolute',
                top: 256,
                left: 175,
                transform: 'translate(-50%, -50%)',
                background: WHITE,
                border: `1.5px solid ${BRAND_BLUE_BORDER}`,
                borderRadius: 100,
                padding: '4px 16px',
                fontSize: 8.5,
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: BRAND_BLUE,
                whiteSpace: 'nowrap',
                fontFamily: "'Poppins', Arial, sans-serif",
                boxShadow: clockwiseStep === 3 || clockwiseStep >= 6
                  ? '0 0 0 3px rgba(49, 82, 185, 0.2), 0 4px 12px rgba(49, 82, 185, 0.18)'
                  : '0 2px 8px rgba(49, 82, 185, 0.08)',
                transition: 'all 0.3s ease',
                zIndex: 4,
              }}
            >
              MITRE ATT&CK ALIGNED
            </div>
          </div>

          {/* Right Column: AUTO-GENERATED DETECTIONS */}
          <div
            style={{
              width: 122,
              background: BRAND_BLUE_LIGHT,
              borderRadius: 14,
              border: '1px solid rgba(49, 82, 185, 0.16)',
              padding: '14px 8px 12px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0,
              zIndex: 3,
              boxShadow: clockwiseStep >= 6 ? '0 0 16px rgba(49, 82, 185, 0.2)' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                color: BRAND_BLUE,
                letterSpacing: '0.07em',
                lineHeight: 1.35,
                textAlign: 'center',
                textTransform: 'uppercase',
                marginBottom: 12,
                fontFamily: "'Poppins', Arial, sans-serif",
              }}
            >
              AUTO-GENERATED<br />DETECTIONS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%' }}>
              {/* Card 1: Inactive skeleton */}
              <div
                style={{
                  background: WHITE,
                  borderRadius: 8,
                  border: '1px solid rgba(49, 82, 185, 0.14)',
                  padding: '7px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                  <div style={{ width: '80%', height: 4, background: '#E2E8F0', borderRadius: 2 }} />
                  <div style={{ width: '55%', height: 3, background: '#F1F5F9', borderRadius: 2 }} />
                </div>
              </div>

              {/* Card 2: ACTIVE Detection */}
              <div
                style={{
                  background: WHITE,
                  borderRadius: 8,
                  border: `2px solid ${BRAND_BLUE_BORDER}`,
                  padding: '8px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transform: clockwiseStep >= 6 ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: clockwiseStep >= 6
                    ? '0 6px 18px rgba(49, 82, 185, 0.3)'
                    : '0 4px 12px rgba(49, 82, 185, 0.15)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: BRAND_BLUE,
                    flexShrink: 0,
                    boxShadow: clockwiseStep >= 6 ? '0 0 6px #3152B9' : 'none',
                  }}
                />
                <div
                  style={{
                    height: 5,
                    background: BRAND_BLUE,
                    borderRadius: 3,
                    width: '85%',
                    animation: clockwiseStep >= 6 ? 'barGrow 0.7s ease-out' : 'none',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>

              {/* Card 3: Inactive skeleton */}
              <div
                style={{
                  background: WHITE,
                  borderRadius: 8,
                  border: '1px solid rgba(49, 82, 185, 0.14)',
                  padding: '7px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                  <div style={{ width: '65%', height: 4, background: '#E2E8F0', borderRadius: 2 }} />
                  <div style={{ width: '40%', height: 3, background: '#F1F5F9', borderRadius: 2 }} />
                </div>
              </div>

              {/* Card 4: Inactive skeleton */}
              <div
                style={{
                  background: WHITE,
                  borderRadius: 8,
                  border: '1px solid rgba(49, 82, 185, 0.14)',
                  padding: '7px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                  <div style={{ width: '75%', height: 4, background: '#E2E8F0', borderRadius: 2 }} />
                  <div style={{ width: '50%', height: 3, background: '#F1F5F9', borderRadius: 2 }} />
                </div>
              </div>
            </div>
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
          <span>SIGNALS</span>
          <span style={{ color: BRAND_BLUE }}>→</span>
          <span>INTENT GRAPH</span>
          <span style={{ color: BRAND_BLUE }}>→</span>
          <span>DETECTIONS</span>
        </div>
      </div>
    </div>
  )
}
