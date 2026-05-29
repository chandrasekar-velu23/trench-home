"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import "./for-mssps.css";

/* ── Custom SVGs for high-performance visual aesthetics ── */
const IconSecurity = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconHero = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a5 5 0 0 1 5 5v3.5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
  </svg>
);

const IconUpskill = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 14 4-4" />
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="M6 12.5V16a6 6 0 0 0 12 0v-3.5" />
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

const IconLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const VALUE_PROPS = [
  {
    icon: <IconSecurity />,
    title: "More coverage. Less overhead.",
    desc: "Trench agents handle detection, investigation and response automatically. Your analysts focus on high-value decisions, not alert triage."
  },
  {
    icon: <IconZap />,
    title: "Deploy in 2 weeks. No disruption.",
    desc: "Trench works alongside your existing stack. No ripping and replacing. No retraining. Start delivering value to clients immediately."
  },
  {
    icon: <IconHero />,
    title: "You look like the hero. Trench does the work.",
    desc: "Actionable outcomes delivered inside your clients' collaboration tools. Your brand. Trench intelligence."
  },
  {
    icon: <IconUpskill />,
    title: "Your analysts become AI Security Engineers.",
    desc: "Trench upskills your SOC team to orchestrate AI agents. Better outcomes for your clients. Better careers for your analysts."
  }
];

const COMPLIANCE_BADGES = [
  { src: "/certificates/AICPA-SOC.svg", alt: "SOC 2 Type II" },
  { src: "/certificates/GDPR.svg", alt: "GDPR Compliant" },
  { src: "/certificates/ISO.svg", alt: "ISO 27001" }
];

export default function ForMSSPsClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const email = formData.get("email") as string;
      const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'protonmail.com', 'zoho.com'];
      const domain = email.split('@')[1]?.toLowerCase();
      
      if (domain && freeProviders.includes(domain)) {
        setEmailError("Please provide an official company email. Personal emails are not allowed.");
        setIsSubmitting(false);
        return;
      }
      setEmailError("");

      const data = {
        fullName: formData.get("fullName") as string,
        email: email,
        companyName: formData.get("companyName") as string,
        message: (formData.get("message") as string) || ""
      };

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Form submission failed");
      }

      const result = await response.json();

      if (result.status === "success") {
        setIsSuccess(true);
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // For backup, show success to user (same UX standard as connect/page.tsx)
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" as const },
    transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <main className="mssp-page page-main">
      <div className="container-wide">
        <div className="mssp-inner">

          {/* ── LEFT: Content ── */}
          <div className="mssp-left">
            <motion.div {...fade(0)}>
              <div className="mssp-eyebrow">
                <span className="mssp-eyebrow-dot" />
                BUILT FOR MSSPS WHO WANT TO LEAD WITH AI
              </div>
              <h1 className="mssp-title">
                Offer your clients the new operating system for <span>Security Operations.</span>
              </h1>
              <p className="mssp-subtitle">
                You cannot scale your MSSP on manual SOC workflows. Co-sell Trench and deliver Headless SecOps to every client, without rebuilding your delivery model.
              </p>
            </motion.div>

            <motion.div className="mssp-props" {...fade(0.05)}>
              {VALUE_PROPS.map((p, i) => (
                <div className="mssp-prop" key={i}>
                  <div className="mssp-prop-icon">{p.icon}</div>
                  <div className="mssp-prop-body">
                    <h3 className="mssp-prop-title">
                      {p.title}
                    </h3>
                    <p className="mssp-prop-desc">{p.desc}</p>
                  </div>
                </div>
              ))}

              <div className="mssp-reassurance">
                Simple partner pricing. Predictable margins. Built for MSSP economics.
              </div>
            </motion.div>

            {/* Compliance badges */}
            <motion.div className="mssp-trust" {...fade(0.1)}>
              <span className="mssp-trust-label">Compliance &amp; Security</span>
              <div className="mssp-trust-items">
                {COMPLIANCE_BADGES.map(b => (
                  <div className="mssp-cert-badge" key={b.alt} title={b.alt}>
                    <Image
                      src={b.src}
                      alt={b.alt}
                      width={44}
                      height={44}
                      className="mssp-cert-img"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Form Card ── */}
          <motion.div
            className="mssp-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSuccess ? (
              <motion.div
                className="mssp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Brand Badge */}
                <div className="mssp-success-badge">
                  <span className="mssp-success-pulse-dot" />
                  MSSP Partnership Initialized
                </div>

                {/* Animated Glowing Success Icon */}
                <div className="mssp-success-glow-wrapper">
                  <div className="mssp-success-icon-ring" />
                  <div className="mssp-success-icon-ring mssp-success-icon-ring--delay" />
                  <div className="mssp-success-brand-icon">
                    <IconSuccess />
                  </div>
                </div>

                <h3 className="mssp-success-title">Welcome to the Trench</h3>
                
                <p className="mssp-success-desc">
                  Every castle needs a Trench. Yours is on its way.
                </p>

              </motion.div>
            ) : (
              <>
                <h2 className="mssp-form-title">Let us build this together.</h2>
                <p className="mssp-form-sub">We will get back to you within one business day.</p>

                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mssp-field">
                    <label htmlFor="fullName" className="mssp-label">Full Name <span>*</span></label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="Your name"
                      className="mssp-input"
                      autoComplete="name"
                    />
                  </div>

                  {/* Email */}
                  <div className="mssp-field">
                    <label htmlFor="email" className="mssp-label">Work Email <span>*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className="mssp-input"
                      autoComplete="email"
                      onChange={(e) => {
                        if (emailError) {
                          const domain = e.target.value.split('@')[1]?.toLowerCase();
                          const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'protonmail.com', 'zoho.com'];
                          if (!freeProviders.includes(domain)) {
                            setEmailError("");
                          }
                        }
                      }}
                      style={emailError ? { borderColor: '#ef4444' } : {}}
                    />
                    {emailError && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>{emailError}</div>}
                  </div>

                  {/* Company Name */}
                  <div className="mssp-field">
                    <label htmlFor="companyName" className="mssp-label">Company Name <span>*</span></label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      required
                      placeholder="Your company name"
                      className="mssp-input"
                      autoComplete="organization"
                    />
                  </div>

                  {/* Anything you want us to know? */}
                  <div className="mssp-field">
                    <label htmlFor="message" className="mssp-label">
                      Anything you want us to know? <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your current client base, target integrations, or custom requirements..."
                      className="mssp-textarea"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="mssp-submit">
                    {isSubmitting ? (
                      <>
                        <span className="mssp-spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <IconSend />
                        Start the Partnership
                      </>
                    )}
                  </button>

                  <p className="mssp-support-helper">
                    For support, reach out to us at <a href="mailto:ask@trenchsecurity.ai">ask@trenchsecurity.ai</a>
                  </p>

                  <p className="mssp-legal">
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
