"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./animations/ScrollReveal";
import MouseInteract from "./animations/MouseInteract";
import TextReveal from "./animations/TextReveal";
import IngestProcess from "./sections/ingestprocess";
import DetectionProcess from "./sections/detectionprocess";
import RespondProcess from "./sections/respondprocess";

const steps = [
  {
    step: "Step 1",
    title: "Ingest",
    subtitle: "Connect everything. Miss nothing.",
    description: "Trench connects to every log source, tool, and data stream across your stack — cloud, endpoint, identity, network, and SaaS. No agents to deploy. No data duplication. Clean, normalized, and ready for detection from day one.",
    badges: ["20+ native integrations", "Agentless connector-based setup", "Auto-normalized, enriched, and searchable"],
    image: "/steps/investigate.svg",
    Component: IngestProcess
  },
  {
    step: "Step 2",
    title: "Detect",
    subtitle: "Detection driven by intent, not just rules.",
    description: "Trench’s Intent Graph continuously maps attacker behavior, correlates signals across your entire data footprint, and auto-generates detections aligned to real-world threats.",
    badges: ["Detects based on attacker behavior, not signatures", "Real-time threat correlation across your stack", "MITRE ATT&CK aligned and continuously updated"],
    image: "/steps/detect.svg",
    Component: DetectionProcess
  },
  {
    step: "Step 3",
    title: "Respond",
    subtitle: "From alert to closed in minutes.",
    description: "When a threat is detected, Trench agents automatically investigate, correlate context, and trigger response workflows — so your team reviews decisions, not alerts.",
    badges: ["Automated investigation and triage", "End-to-end response workflows", "Focus on decisions, not busywork"],
    image: "/steps/respond.svg",
    Component: RespondProcess
  }
];

export default function ProcessSteps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  return (
    <div className="process-wrapper">
      <div className="section-header">
        <ScrollReveal direction="up" distance={30}>
          <span className="eyebrow">ONE PLATFORM. ZERO BLIND SPOTS. TOTAL CONTROL.</span>
          <TextReveal text="How Trench Works." as="h2" className="headline" />
          <p className="sub-headline" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: 600 }}>
            THREE STEPS. FULLY AUTOMATED. ALWAYS ON.
          </p>
        </ScrollReveal>
      </div>

      {/* Step tabs */}
      <div style={{
        display: "flex", gap: "12px", justifyContent: "center",
        maxWidth: "600px", margin: "0 auto 4rem",
      }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setActiveIndex(i)} className={`tab-button ${activeIndex === i ? 'active' : ''}`}>
            <div className="tab-number">
              0{i + 1}
            </div>
            {s.title.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="main-grid-layout">

        {/* Visual Layer (Card) */}
        <div className="visual-card-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%", height: "100%", display: "flex", alignItems: "stretch" }}
            >
              {activeStep.Component ? (
                <activeStep.Component />
              ) : (
                <img src={activeStep.image} alt="Process visual" className="visual-image" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Layer */}
        <div className="content-container">
          <div className="step-indicator">
            {activeStep.step.toUpperCase()} — {activeStep.title.toUpperCase()}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="title-lg" style={{ marginBottom: "1rem" }}>{activeStep.subtitle}</h3>
              <p className="body-text-p" style={{ marginBottom: "2rem" }}>{activeStep.description}</p>

              <div className="badges-grid">
                {activeStep.badges.map((badge, bi) => (
                  <div key={bi} className="badge-item">
                    <div className="tick-wrapper">
                      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.5" cy="12.5" r="12" fill="var(--color-primary-100)" fillOpacity="0.1" />
                        <path d="M8.48535 12.236L10.9854 14.736L15.9854 9.73596" stroke="var(--color-primary-100)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="badge-label">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bars */}
          <div style={{ display: "flex", gap: "6px", marginTop: "3rem" }}>
            {steps.map((s, i) => (
              <div key={i} onClick={() => setActiveIndex(i)} style={{
                height: "4px", flex: 1, borderRadius: "2px", cursor: "pointer",
                background: i === activeIndex ? "var(--color-primary-100)" : i < activeIndex ? "rgba(13, 65, 225, 0.3)" : "rgba(0,0,0,0.1)",
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .process-wrapper {
          width: 100%;
          padding: 6rem 1rem;
          display: flex;
          flex-direction: column;
        }

        .section-header {
          max-width: 800px;
          margin: 0 auto 2rem;
          text-align: center;
        }

        .eyebrow {
          display: block;
          font-family: var(--font-primary);
          font-size: 16px;
          font-weight: 800;
          color: var(--color-primary-100);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 1.5rem;
        }

        :global(.headline) {
          font-family: var(--font-primary);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--color-primary-100);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .sub-headline {
          color: var(--color-text-secondary);
        }

        .main-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          max-width: 1300px;
          margin: 0 auto;
          align-items: stretch;
        }

        @media (min-width: 1024px) {
          .main-grid-layout {
            grid-template-columns: 55% 45%;
            gap: 3rem;
            align-items: stretch;
          }
        }

        .tab-button {
          flex: 1;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.05);
          background: #ffffff;
          color: var(--color-text-secondary);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: inherit;
        }
        .tab-button:hover {
          border-color: rgba(13, 65, 225, 0.2);
          background: rgba(13, 65, 225, 0.02);
        }
        .tab-button.active {
          border-color: var(--color-primary-100);
          background: rgba(13, 65, 225, 0.05);
          color: var(--color-primary-100);
        }
        .tab-number {
          font-size: 20px;
          margin-bottom: 6px;
          opacity: 0.4;
          font-family: var(--font-primary);
        }
        .tab-button.active .tab-number {
          opacity: 1;
        }

        .visual-card-container {
          background: transparent;
          position: relative;
          width: 100%;
          height: 500px;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }

        @media (min-width: 1024px) {
          .visual-card-container {
            height: 560px;
          }
        }

        :global(.custom-process-component) {
          width: 100% !important;
          height: 100% !important;
          min-height: 420px !important;
          padding: 0 !important;
          background: transparent !important;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        @media (min-width: 1024px) {
          :global(.custom-process-component) {
            aspect-ratio: auto !important;
            max-height: 600px !important;
            min-height: 480px !important;
          }
        }

        .step-indicator {
          font-size: 12px;
          letter-spacing: 3px;
          color: var(--color-primary-100);
          margin-bottom: 20px;
          font-weight: 800;
          font-family: var(--font-primary);
        }
        
        .content-container {
          padding: 1rem 0;
        }

        .title-lg {
          font-family: var(--font-primary);
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 700;
          color: var(--color-text-primary);
          line-height: 1.3;
        }

        .body-text-p {
          font-size: 15px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          font-weight: 500;
        }

        .badges-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .badge-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .tick-wrapper {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  );
}
