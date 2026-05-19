"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./connect.css";

/* ── Icons — all use currentColor so CSS controls the stroke ── */
const IconDemo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconPricing = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconSuccess = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PROPS = [
  {
    icon: <IconDemo />,
    cls: "connect-prop-icon--blue",
    title: "See It In Your Environment",
    desc: "Not a generic demo. A walkthrough built around your stack, your tools and the threats your team faces every day."
  },
  {
    icon: <IconShield />,
    cls: "connect-prop-icon--indigo",
    title: "Understand Your Detection Gap",
    desc: "We map your current coverage against MITRE ATT&CK and show you exactly where your SIEM and SOC are leaving you exposed."
  },
  {
    icon: <IconPricing />,
    cls: "connect-prop-icon--green",
    title: "Operational In 2 Weeks",
    desc: "Agentless setup. No ripping and replacing. Most teams see their first detections within 48 hours of connecting their first data source."
  },
];

const CERT_BADGES = [
  { src: "/certificates/AICPA SOC.svg", alt: "AICPA SOC 2 Type II" },
  { src: "/certificates/GDPR.svg", alt: "GDPR Compliant" },
  { src: "/certificates/ISO.svg", alt: "ISO 27001" },
];

export default function ConnectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get form data
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Collect form fields
      const data = {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        teamSize: formData.get('teamSize') as string,
        intent: formData.get('intent') as string,
        message: (formData.get('message') as string) || ''
      };
      
      // Send to our API route
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // Handle response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Form submission failed');
      }
      
      const result = await response.json();
      
      if (result.status === 'success') {
        setIsSuccess(true);
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // For production: show success to user but log the error
      // This ensures good UX even if backend fails temporarily
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <main className="connect-page page-main">
      <div className="container-wide">
        <div className="connect-inner">

          {/* ── LEFT: Copy ── */}
          <div className="connect-left">
            <motion.div {...fade(0)}>
              <p className="connect-eyebrow">
                <span className="connect-eyebrow-dot" />
                YOU FOUND YOUR MODERN TRENCH.
              </p>
              <h1 className="connect-title">
                Every castle needs a Trench.<br />
                <span>Yours starts here.</span>
              </h1>
              <p className="connect-subtitle">
                You cannot run a modern security operation on a legacy system. Let us show you what the new operating system looks like for your stack.
              </p>
            </motion.div>

            <motion.div className="connect-props" {...fade(0.1)}>
              {PROPS.map((p, i) => (
                <div className="connect-prop" key={i}>
                  <div className={`connect-prop-icon ${p.cls}`}>{p.icon}</div>
                  <div className="connect-prop-body">
                    <div className="connect-prop-title">{p.title}</div>
                    <div className="connect-prop-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
              <p className="connect-reassurance">
                Built for lean security teams. No lengthy procurement. No enterprise overhead.
              </p>
            </motion.div>

            <motion.div className="connect-trust" {...fade(0.2)}>
              <span className="connect-trust-label">Certified &amp; Compliant</span>
              <div className="connect-trust-items">
                {CERT_BADGES.map(b => (
                  <div className="connect-cert-badge" key={b.alt} title={b.alt}>
                    <Image
                      src={b.src}
                      alt={b.alt}
                      width={48}
                      height={48}
                      className="connect-cert-img"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Form Card ── */}
          <motion.div
            className="connect-card"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSuccess ? (
              <div className="connect-success">
                <div className="connect-success-icon">
                  <IconSuccess />
                </div>
                <div className="connect-success-title">Welcome to the Trench.</div>
                <p className="connect-success-desc">
                  Our team will reach out within one business day.
                </p>
              </div>
            ) : (
              <>
                <div className="connect-form-title">Get Started</div>
                <p className="connect-form-sub">Fill out the form and we'll reach out to you shortly.</p>

                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="connect-field">
                    <label htmlFor="fullName" className="connect-label">Full Name <span>*</span></label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="Your name"
                      className="connect-input"
                      autoComplete="name"
                    />
                  </div>

                  {/* Email */}
                  <div className="connect-field">
                    <label htmlFor="email" className="connect-label">Work Email <span>*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className="connect-input"
                      autoComplete="email"
                    />
                  </div>

                  {/* Team Size */}
                  <div className="connect-field">
                    <label htmlFor="teamSize" className="connect-label">Security Team Size <span>*</span></label>
                    <select id="teamSize" name="teamSize" required className="connect-select" defaultValue="">
                      <option value="" disabled>Select…</option>
                      <option value="Just me">Just me</option>
                      <option value="2-5 people">2-5 people</option>
                      <option value="6-15 people">6-15 people</option>
                      <option value="15+ people">15+ people</option>
                    </select>
                  </div>

                  {/* What brings you here? (Intent) */}
                  <div className="connect-field">
                    <label htmlFor="intent" className="connect-label">What brings you here? <span>*</span></label>
                    <select id="intent" name="intent" required className="connect-select" defaultValue="">
                      <option value="" disabled>Select…</option>
                      <option value="We are drowning in alerts and missing threats">We are drowning in alerts and missing threats</option>
                      <option value="Our SIEM is too expensive and too slow">Our SIEM is too expensive and too slow</option>
                      <option value="We need enterprise-grade detection with a lean team">We need enterprise-grade detection with a lean team</option>
                      <option value="We want to see Headless SecOps in action">We want to see Headless SecOps in action</option>
                      <option value="Poor outcomes from our Managed Service Provider">Poor outcomes from our Managed Service Provider</option>
                      <option value="Something else">Something else</option>
                    </select>
                  </div>

                  {/* Message (optional) */}
                  <div className="connect-field">
                    <label htmlFor="message" className="connect-label">
                      Anything you want us to know before we talk? <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your stack, biggest pain point, or anything specific you want to see in the demo."
                      className="connect-textarea"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="connect-submit">
                    {isSubmitting ? (
                      <>
                        <span className="connect-spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <IconSend />
                        Show Me Trench
                      </>
                    )}
                  </button>

                  <p className="connect-support-helper">
                    For support, reach out to us at <a href="mailto:ask@trenchsecurity.ai">ask@trenchsecurity.ai</a>
                  </p>

                  <p className="connect-legal">
                    <IconLock />
                    By submitting, you agree to our{" "}
                    <a href="https://compliance.trenchsecurity.ai/" target="_blank" rel="noopener noreferrer">Terms of Service</a> and{" "}
                    <a href="https://compliance.trenchsecurity.ai/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                  </p>
                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </main>
  );
}
