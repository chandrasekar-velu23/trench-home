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
  { icon: <IconDemo />, cls: "connect-prop-icon--blue", title: "Custom Demo", desc: "Get a tailored walkthrough of the platform based on your stack and threat model." },
  { icon: <IconShield />, cls: "connect-prop-icon--indigo", title: "Security Assessment", desc: "Understand your coverage gaps and see how Trench maps to MITRE ATT&CK." },
  { icon: <IconPricing />, cls: "connect-prop-icon--green", title: "Pricing & Deployment", desc: "Discuss agentless setup options and transparent, predictable pricing models." },
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
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        company: formData.get('company') as string,
        teamSize: formData.get('teamSize') as string,
        intent: formData.get('intent') as string,
        message: formData.get('message') as string,
        ipAddress: await getClientIP(),
        userAgent: navigator.userAgent
      };
      
      console.log('Form data collected:', data);
      
      // Send to Google Apps Script
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
      console.log('Script URL from env:', scriptUrl);
      
      if (!scriptUrl) {
        throw new Error('Google Apps Script URL not configured');
      }
      
      console.log('Sending request to:', scriptUrl);
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        console.log('Raw response:', responseText);
        throw new Error('Invalid response from server');
      }
      
      console.log('Parsed result:', result);
      
      if (result.status === 'success') {
        setIsSuccess(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Show error to user for debugging
      alert(`Form submission failed: ${error.message}. Check console for details.`);
      
      // Don't show success on error for debugging
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to get client IP (simple implementation)
  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'Not available';
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
              {/* <p className="connect-eyebrow">
                <span className="connect-eyebrow-dot" />
                Book a Demo
              </p> */}
              <h1 className="connect-title">
                Ready to secure<br />
                <span>your stack?</span>
              </h1>
              <p className="connect-subtitle">
                See how Trench can help your team unify data, automate investigations,
                and close threats in minutes — not days.
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
                <div className="connect-success-title">Request Received!</div>
                <p className="connect-success-desc">
                  Thank you for your interest in Trench. One of our security specialists
                  will be in touch within one business day.
                </p>
                <button
                  className="connect-submit"
                  onClick={() => setIsSuccess(false)}
                  style={{ width: "auto", padding: "0.75rem 2rem" }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <div className="connect-form-title">Get in Touch</div>
                <p className="connect-form-sub">Fill out the form and we'll reach out to you shortly.</p>

                <form onSubmit={handleSubmit}>
                  {/* Name row */}
                  <div className="connect-row">
                    <div className="connect-field">
                      <label htmlFor="firstName" className="connect-label">First Name <span>*</span></label>
                      <input type="text" id="firstName" name="firstName" required className="connect-input" autoComplete="given-name" />
                    </div>
                    <div className="connect-field">
                      <label htmlFor="lastName" className="connect-label">Last Name <span>*</span></label>
                      <input type="text" id="lastName" name="lastName" required className="connect-input" autoComplete="family-name" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="connect-field">
                    <label htmlFor="email" className="connect-label">Work Email <span>*</span></label>
                    <input type="email" id="email" name="email" required className="connect-input" autoComplete="work email" />
                  </div>

                  {/* Company + Team size */}
                  <div className="connect-row">
                    <div className="connect-field">
                      <label htmlFor="company" className="connect-label">Company</label>
                      <input type="text" id="company" name="company" className="connect-input" autoComplete="organization" />
                    </div>
                    <div className="connect-field">
                      <label htmlFor="teamSize" className="connect-label">Team Size</label>
                      <select id="teamSize" name="teamSize" className="connect-select" defaultValue="">
                        <option value="" disabled>Select…</option>
                        <option>1–10</option>
                        <option>11–50</option>
                        <option>51–200</option>
                        <option>201–500</option>
                        <option>500+</option>
                      </select>
                    </div>
                  </div>

                  {/* Intent */}
                  <div className="connect-field">
                    <label htmlFor="intent" className="connect-label">What are you looking for? <span>*</span></label>
                    <select id="intent" name="intent" required className="connect-select" defaultValue="">
                      <option value="" disabled>Select…</option>
                      <option>Custom Demo</option>
                      <option>Security Assessment</option>
                      <option>Pricing & Deployment</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="connect-field">
                    <label htmlFor="message" className="connect-label">How can we help? <span>*</span></label>
                    <textarea id="message" name="message" required className="connect-textarea" />
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
                        Get in Touch
                      </>
                    )}
                  </button>

                  <p className="connect-legal">
                    <IconLock />
                    By submitting, you agree to our{" "}
                    <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
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
