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
          padding: 8rem 0;
          display: flex;
          flex-direction: column;
        }

        .section-header {
          max-width: 900px;
          margin: 0 auto 4rem;
          text-align: center;
          padding: 0 2rem;
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
          margin-bottom: 1.5rem;
        }

        .sub-headline {
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .main-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          max-width: 1300px;
          margin: 0 auto;
          align-items: center;
          padding: 0 2rem;
        }

        @media (min-width: 1024px) {
          .main-grid-layout {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 5rem;
          }
        }

        .tab-button {
          flex: 1;
          padding: 1rem;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.05);
          background: #ffffff;
          color: var(--color-text-secondary);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
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
          font-size: 24px;
          margin-bottom: 4px;
          opacity: 0.3;
          font-family: var(--font-primary);
        }
        .tab-button.active .tab-number {
          opacity: 1;
        }

        .visual-card-container {
          background: transparent;
          position: relative;
          width: 100%;
          min-height: 400px;
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 1024px) {
          .visual-card-container {
            height: 600px;
          }
        }

        .visual-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        :global(.custom-process-component) {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          background: transparent !important;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .step-indicator {
          font-size: 14px;
          letter-spacing: 0.2em;
          color: var(--color-primary-100);
          margin-bottom: 1.5rem;
          font-weight: 800;
          font-family: var(--font-primary);
        }
        
        .content-container {
          padding: 2rem 0;
        }

        .title-lg {
          margin-bottom: 1.5rem;
        }

        .body-text-p {
          color: var(--color-text-secondary);
          margin-bottom: 2.5rem;
        }

        .badges-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .badge-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .tick-wrapper {
          flex-shrink: 0;
          padding-top: 2px;
        }
        .badge-label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .process-wrapper { padding: 4rem 0; }
          .section-header { margin-bottom: 3rem; }
          .main-grid-layout { gap: 3rem; padding: 0 1.5rem; }
          .visual-card-container { height: 400px; }
          .tab-button { padding: 0.75rem; }
          .tab-number { font-size: 20px; }
          .badge-label { font-size: 0.9rem; }
        }

      `}</style>
    </div>
  );
}
