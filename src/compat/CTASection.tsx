import React from 'react';
import Link from 'next/link';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CTASection({
  title = "Ready to build your Trench?",
  subtitle = "Experience how Trench transforms security operations into autonomous, actionable defense with Zero Latency Threat Detection.",
  buttonText = "Request a Demo",
  buttonHref = "/connect"
}: CTASectionProps) {
  return (
    <section className="cta-section" style={{
      padding: "4rem 1.5rem",
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        maxWidth: "1100px",
        width: "100%",
        background: "#3152B9",
        borderRadius: "24px",
        padding: "3.5rem 2.5rem",
        color: "#FFFFFF",
        textAlign: "center",
        boxShadow: "0 20px 45px rgba(49, 82, 185, 0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        position: "relative",
        overflow: "hidden"
      }}>
        <h2 style={{
          fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
          fontWeight: 900,
          color: "#FFFFFF",
          fontFamily: "'Bricolage Grotesque', 'Bricolage Grotesque Fallback: Arial', 'Bricolage Grotesque Fallback: Roboto', sans-serif",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          margin: 0
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: "1.05rem",
          color: "#E2E8F0",
          maxWidth: "680px",
          margin: "0 auto",
          lineHeight: 1.6,
          fontFamily: "'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif"
        }}>
          {subtitle}
        </p>
        <Link
          href={buttonHref}
          style={{
            marginTop: "0.75rem",
            background: "#FFFFFF",
            color: "#3152B9",
            fontWeight: 800,
            fontSize: "1rem",
            padding: "0.95rem 2.25rem",
            borderRadius: "100px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease"
          }}
        >
          {buttonText} →
        </Link>
      </div>
    </section>
  );
}
