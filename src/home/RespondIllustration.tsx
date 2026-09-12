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

export default function RespondIllustration() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // Step sequence: 1 -> 2 -> 3 -> 4 -> 5
  // Step 1: THREAT DETECTED
  // Step 2: AGENT INVESTIGATES
  // Step 3: CONTEXT CORRELATED
  // Step 4: RESPONSE TRIGGERED
  // Step 5: THREAT CLOSED & METRICS CONFIRMED
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    { label: 'THREAT\nDETECTED', stepNum: 1 },
    { label: 'AGENT\nINVESTIGATES', stepNum: 2 },
    { label: 'CONTEXT\nCORRELATED', stepNum: 3 },
    { label: 'RESPONSE\nTRIGGERED', stepNum: 4 },
    { label: 'THREAT\nCLOSED', stepNum: 5 },
  ]

  const tasks = [
    { text: 'Querying SIEM logs...', triggerStep: 2 },
    { text: 'Checking identity context...', triggerStep: 2 },
    { text: 'Mapping blast radius...', triggerStep: 3 },
    { text: 'Correlating IOCs...', triggerStep: 3 },
    { text: 'Triggering containment...', triggerStep: 4 },
  ]

  const metrics = [
    { label: 'Detection → Response', value: '< 5 min' },
    { label: 'Alert → Closed', value: '< 10 min' },
    { label: 'Human Review', value: 'Decisions only' },
    { label: 'Coverage', value: 'Full stack' },
  ]

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

  // Ultra-smooth timed process pipeline:
  // Step activates (number visible + active blue pulse) ->
  // then number smoothly morphs into tick mark ->
  // then advances to next step.
  useEffect(() => {
    let tickTimer: NodeJS.Timeout
    let advanceTimer: NodeJS.Timeout

    // Number transitions to tick mark after active processing window
    tickTimer = setTimeout(() => {
      setCompletedSteps((prev) => (prev.includes(currentStep) ? prev : [...prev, currentStep]))
    }, 650)

    // Advance to next step or loop back to 1
    advanceTimer = setTimeout(() => {
      if (currentStep < 5) {
        setCurrentStep((prev) => prev + 1)
      } else {
        // Hold on all 5 completed ticks for celebration, then smoothly reset loop
        setTimeout(() => {
          setCompletedSteps([])
          setCurrentStep(1)
        }, 2200)
      }
    }, 1450)

    return () => {
      clearTimeout(tickTimer)
      clearTimeout(advanceTimer)
    }
  }, [currentStep])

  const handleStepClick = (stepNum: number) => {
    setCurrentStep(stepNum)
    const newCompleted: number[] = []
    for (let i = 1; i <= stepNum; i++) {
      newCompleted.push(i)
    }
    setCompletedSteps(newCompleted)
  }

  const allClosed = completedSteps.includes(5)

  // Calculate dynamic baseline progress line percentage based on active/completed steps
  const activeLineWidth = completedSteps.length >= 5
    ? 100
    : Math.max(0, ((completedSteps.length) / 4) * 100)

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
        @keyframes tickPop {
          0% { transform: scale(0.3) rotate(-15deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(49, 82, 185, 0.45); }
          50% { box-shadow: 0 0 0 6px rgba(49, 82, 185, 0); }
        }
        @keyframes activeGlow {
          0%, 100% { box-shadow: 0 0 0 3px rgba(49, 82, 185, 0.22), 0 4px 14px rgba(49, 82, 185, 0.18); }
          50% { box-shadow: 0 0 0 6px rgba(49, 82, 185, 0.35), 0 6px 20px rgba(49, 82, 185, 0.28); }
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
        {/* Top 5-Step Pipeline */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          {/* Continuous Horizontal Baseline across all 5 circles (clean, no unwanted arrows) */}
          <div
            style={{
              position: 'absolute',
              top: 17,
              left: '8%',
              width: '84%',
              height: 2,
              background: 'rgba(49, 82, 185, 0.2)',
              borderRadius: 1,
              pointerEvents: 'none',
              zIndex: 1,
              overflow: 'hidden',
            }}
          >
            {/* Active progressive line filling smoothly between completed circles */}
            <div
              style={{
                height: '100%',
                width: `${activeLineWidth}%`,
                background: BRAND_BLUE,
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: 1,
              }}
            />
          </div>

          {/* 5 Step Nodes (Numbered Circles that smoothly transition into Tick Marks one by one) */}
          {steps.map((step) => {
            const isLiveActive = step.stepNum === currentStep
            const isTicked = completedSteps.includes(step.stepNum)

            return (
              <div
                key={step.label}
                onClick={() => handleStepClick(step.stepNum)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: '1 1 0',
                  position: 'relative',
                  zIndex: 2,
                  cursor: 'pointer',
                }}
              >
                {/* Circle Indicator: Displays number, then tick mark appears with smooth spring animation */}
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: WHITE,
                    border: isTicked || isLiveActive
                      ? `2.2px solid ${BRAND_BLUE}`
                      : '1.8px solid rgba(49, 82, 185, 0.26)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isLiveActive
                      ? '0 0 0 4px rgba(49, 82, 185, 0.22), 0 4px 14px rgba(49, 82, 185, 0.22)'
                      : isTicked
                      ? '0 2px 10px rgba(49, 82, 185, 0.14)'
                      : '0 1px 4px rgba(0, 0, 0, 0.03)',
                    boxSizing: 'border-box',
                    transform: isLiveActive ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: isLiveActive ? 'activeGlow 2s ease-in-out infinite' : 'none',
                  }}
                >
                  {/* Step Number (1, 2, 3, 4, 5) — visible until step is ticked */}
                  <span
                    style={{
                      position: 'absolute',
                      fontSize: 13,
                      fontWeight: 800,
                      color: isLiveActive ? BRAND_BLUE : TEXT_MUTED,
                      fontFamily: "'Poppins', Arial, sans-serif",
                      opacity: isTicked ? 0 : 1,
                      transform: isTicked
                        ? 'scale(0.25) rotate(-25deg)'
                        : isLiveActive
                        ? 'scale(1.05)'
                        : 'scale(1)',
                      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      pointerEvents: 'none',
                      lineHeight: 1,
                    }}
                  >
                    {step.stepNum}
                  </span>

                  {/* Tick Mark (Checkmark) — smoothly appears one by one with spring pop animation */}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={BRAND_BLUE}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: 'absolute',
                      opacity: isTicked ? 1 : 0,
                      transform: isTicked ? 'scale(1) rotate(0deg)' : 'scale(0.2) rotate(25deg)',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      pointerEvents: 'none',
                    }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                {/* Vertical connecting line from circle to card */}
                <div
                  style={{
                    width: 2,
                    height: 14,
                    background: BRAND_BLUE,
                    opacity: isTicked || isLiveActive ? 1 : 0.25,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Step Card Box */}
                <div
                  style={{
                    width: '90%',
                    maxWidth: 96,
                    padding: '7px 4px',
                    borderRadius: 8,
                    background: WHITE,
                    border: isTicked || isLiveActive
                      ? `1.5px solid ${BRAND_BLUE_BORDER}`
                      : '1px solid rgba(49, 82, 185, 0.18)',
                    textAlign: 'center',
                    boxShadow: isLiveActive
                      ? '0 4px 14px rgba(49, 82, 185, 0.2)'
                      : isTicked
                      ? '0 2px 8px rgba(49, 82, 185, 0.08)'
                      : '0 1px 3px rgba(0, 0, 0, 0.02)',
                    boxSizing: 'border-box',
                    transform: isLiveActive ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 8.5,
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      lineHeight: 1.35,
                      color: isTicked || isLiveActive ? BRAND_BLUE : TEXT_DARK,
                      whiteSpace: 'pre-line',
                      textTransform: 'uppercase',
                      fontFamily: "'Poppins', Arial, sans-serif",
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {step.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Section: Two Panels Side by Side */}
        <div
          style={{
            display: 'flex',
            gap: 14,
            marginTop: 4,
          }}
        >
          {/* Left Panel: AI AGENT ACTIVITY */}
          <div
            style={{
              flex: '1 1 0',
              background: WHITE,
              borderRadius: 14,
              border: `1.5px solid ${BRAND_BLUE_BORDER}`,
              padding: '16px 18px',
              boxSizing: 'border-box',
              boxShadow: currentStep >= 2 && currentStep <= 4
                ? '0 4px 16px rgba(49, 82, 185, 0.12)'
                : '0 2px 10px rgba(49, 82, 185, 0.04)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: BRAND_BLUE,
                textTransform: 'uppercase',
                marginBottom: 12,
                fontFamily: "'Poppins', Arial, sans-serif",
              }}
            >
              AI AGENT ACTIVITY
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {tasks.map((task, idx) => {
                const isTaskActive = currentStep >= task.triggerStep
                const isHighlight = idx === 4 ? currentStep >= 4 : currentStep === task.triggerStep

                return (
                  <div
                    key={task.text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      opacity: isTaskActive ? 1 : 0.45,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: isHighlight
                          ? BRAND_BLUE
                          : isTaskActive
                          ? 'rgba(49, 82, 185, 0.65)'
                          : 'rgba(49, 82, 185, 0.22)',
                        flexShrink: 0,
                        animation: isHighlight && idx === 4 ? 'dotPulse 1.2s infinite' : 'none',
                        transition: 'background 0.3s ease',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: isHighlight ? 700 : 500,
                        color: isHighlight ? BRAND_BLUE : TEXT_DARK,
                        letterSpacing: '0.01em',
                        transition: 'color 0.3s ease',
                        fontFamily: "'Poppins', Arial, sans-serif",
                      }}
                    >
                      {task.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Panel: RESPONSE METRICS */}
          <div
            style={{
              flex: '1 1 0',
              background: WHITE,
              borderRadius: 14,
              border: `1.5px solid ${BRAND_BLUE_BORDER}`,
              padding: '16px 18px',
              boxSizing: 'border-box',
              boxShadow: allClosed || currentStep === 5
                ? '0 4px 18px rgba(49, 82, 185, 0.18)'
                : '0 2px 10px rgba(49, 82, 185, 0.04)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: BRAND_BLUE,
                textTransform: 'uppercase',
                marginBottom: 10,
                fontFamily: "'Poppins', Arial, sans-serif",
              }}
            >
              RESPONSE METRICS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {metrics.map((metric, idx) => (
                <div
                  key={metric.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: idx < metrics.length - 1 ? '1px dashed rgba(49, 82, 185, 0.15)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 500,
                      color: TEXT_DARK,
                      fontFamily: "'Poppins', Arial, sans-serif",
                    }}
                  >
                    {metric.label}
                  </span>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: BRAND_BLUE,
                      whiteSpace: 'nowrap',
                      transform: allClosed ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.3s ease',
                      fontFamily: "'Poppins', Arial, sans-serif",
                    }}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Very Bottom Footer (Trench Brand Guidelines: No em-dashes, use →) */}
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
          <span>DETECT</span>
          <span style={{ color: BRAND_BLUE }}>→</span>
          <span>INVESTIGATE</span>
          <span style={{ color: BRAND_BLUE }}>→</span>
          <span>CORRELATE</span>
          <span style={{ color: BRAND_BLUE }}>→</span>
          <span>CLOSE</span>
        </div>
      </div>
    </div>
  )
}
