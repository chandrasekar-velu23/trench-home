"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* <div className="footer-top-fade" /> */}
      <div className="footer-content">
        {/* Header Row — Logo + Compliance */}
        <div className="footer-header-row">
          <Image
            src="/logo/trench-logo.webp"
            alt="Trench Logo"
            width={176}
            height={35}
            className="footer-logo-img"
          />
          <div className="footer-header-badges hide-mobile">
            <span className="footer-header-badge-label">Verified Security & Compliance</span>
            <div className="badge-row">
              <Image
                src="/certificates/AICPA-SOC.svg"
                alt="AICPA SOC"
                width={56}
                height={56}
                className="footer-cert-badge-small"
              />
              <Image
                src="/certificates/GDPR.svg"
                alt="GDPR"
                width={66}
                height={66}
                className="footer-cert-badge-small"
              />
              <Image
                src="/certificates/ISO.svg"
                alt="ISO"
                width={56}
                height={56}
                className="footer-cert-badge-small"
              />
            </div>
          </div>
        </div>

        <div className="footer-header-divider" />

        {/* 4-Column Grid */}
        <div className="footer-columns-grid">
          {/* Column 1 — Brand + Tagline + Partners */}
          <div className="footer-col footer-brand-col">
            <p className="footer-brand-desc">
              The Operating System for Actionable SecOps. Agentic automation built ground up for modern security teams.
            </p>
            <div className="footer-support-item">
              <span className="footer-support-label">Support & Inquiries:</span>
              <a href="mailto:ask@trenchsecurity.ai" className="footer-contact-link">
                ask@trenchsecurity.ai
              </a>
            </div>
            {/* Subtle partners row directly under contact in brand column */}
            <div className="footer-partners-group-brand hide-mobile">
              <span className="footer-support-label">Partnerships & Awards</span>
              <div className="footer-partners-row">
                <Image
                  src="/awards/ISV-Partner-logo-new.png"
                  alt="microsoft-ISV"
                  width={135}
                  height={30}
                  className="footer-partner-badge-small"
                />
                <Image
                  src="/awards/Logo_IAA.webp"
                  alt="Indian Achievers Award"
                  width={84}
                  height={42}
                  className="footer-partner-badge-small"
                />
                <Image
                  src="/awards/CySecK-Logo-PNG@900x.webp"
                  alt="CySecK"
                  width={84}
                  height={42}
                  className="footer-partner-badge-small"
                />
                <Image
                  src="/awards/inc_42 _trench-.png"
                  alt="Inc42"
                  width={50}
                  height={50}
                  className="footer-partner-badge-small"
                />
              </div>
            </div>
          </div>

          {/* Column 2 — Legal */}
          <div className="footer-col link-column">
            <h4 className="footer-heading">Legal</h4>
            <a href="https://compliance.trenchsecurity.ai/" target="_blank" rel="noopener noreferrer">Privacy policy</a>
            <a href="https://compliance.trenchsecurity.ai/" target="_blank" rel="noopener noreferrer">Cookies notice</a>
            <a href="https://compliance.trenchsecurity.ai/" target="_blank" rel="noopener noreferrer">Trust center</a>
          </div>

          {/* Column 3 — Platform */}
          <div className="footer-col link-column">
            <h4 className="footer-heading">Platform</h4>
            <Link href="/why-trench">Why Trench?</Link>
            <Link href="/for-mssps">For MSSPs</Link>
            <Link href="/integrations">Integrations</Link>
            <Link href="/how-it-works">How it works?</Link>
            <Link href="/career">Careers</Link>
          </div>

          {/* Column 4 — Address & Contact */}
          <div className="footer-col address-column">
            <h4 className="footer-heading">Locations</h4>
            <div className="addresses-container">
              <div className="address-item">
                <h5 className="address-label">India Office:</h5>
                <address className="footer-address">
                  <p>Trench Security Private Limited,</p>
                  <p>4th Flr, TheHub@RaiSerenity, Yelеnahali, Begur,</p>
                  <p>Bangalore-560068, Karnataka</p>
                </address>
              </div>
              <div className="address-item">
                <h5 className="address-label">US Office:</h5>
                <address className="footer-address">
                  <p>Trench Security Inc</p>
                  <p>1407 Canal Rd, Princeton, NJ 08540-8635</p>
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Panel (Visible on mobile only) */}
        <div className="footer-mobile-trust-panel show-mobile-only">
          <div className="mobile-trust-group">
            <span className="mobile-trust-label">Security & Compliance</span>
            <div className="mobile-trust-badges">
              <Image
                src="/certificates/AICPA-SOC.svg"
                alt="AICPA SOC"
                width={56}
                height={56}
                className="footer-cert-badge-small"
              />
              <Image
                src="/certificates/GDPR.svg"
                alt="GDPR"
                width={66}
                height={66}
                className="footer-cert-badge-small"
              />
              <Image
                src="/certificates/ISO.svg"
                alt="ISO"
                width={56}
                height={56}
                className="footer-cert-badge-small"
              />
            </div>
          </div>

          <div className="mobile-trust-group">
            <span className="mobile-trust-label">Partnerships & Awards</span>
            <div className="mobile-trust-badges mobile-partners-grid">
              <Image
                src="/awards/ISV-Partner-logo-new.png"
                alt="microsoft-ISV"
                width={135}
                height={30}
                className="footer-partner-badge-small"
              />
              <Image
                src="/awards/Logo_IAA.webp"
                alt="Indian Achievers Award"
                width={84}
                height={42}
                className="footer-partner-badge-small"
              />
              <Image
                src="/awards/CySecK-Logo-PNG@900x.webp"
                alt="CySecK"
                width={84}
                height={42}
                className="footer-partner-badge-small"
              />
              <Image
                src="/awards/inc_42 _trench-.png"
                alt="Inc42"
                width={84}
                height={42}
                className="footer-partner-badge-small"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <span className="copyright">© 2026 Trench Security, Inc.</span>
          <div className="social-links">
            <span className="find-us-label">Find us:</span>
            <a href="https://www.linkedin.com/company/trenchsecurity/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
          <div className="bottom-links">
            <a href="https://compliance.trenchsecurity.ai/" target="_blank" rel="noopener noreferrer" className="bottom-link">
              Security & Trust Center
            </a>
            <a href="https://compliance.trenchsecurity.ai/" target="_blank" rel="noopener noreferrer" className="bottom-link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          position: relative;
          width: 100%;
          min-height: auto;
          background-image: url('/images/footer 1.png');
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
          background-color: #0b1126; /* Deep dark blue to match the rich midnight/space theme */
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 5rem 10% 2.5rem; /* Snug bottom padding and elegant top padding */
          color: #1E293B;
          margin-top: 0;
        }

        /*
        .footer-top-fade {
          position: absolute;
          top: -2px;
          left: 0;
          right: 0;
          height: 160px;
          background: linear-gradient(
            to bottom,
            #ffffff 0%,
            rgba(255, 255, 255, 0.8) 7%,
            rgba(255, 255, 255, 0.45) 18%,
            rgba(255, 255, 255, 0.15) 35%,
            rgba(255, 255, 255, 0.03) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          z-index: 1;
          pointer-events: none;
        }
        */

        .footer-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          background: rgba(255, 255, 255, 0.65); /* Premium light frosted neutral glass */
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 2.5rem 3rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
        }

        .show-mobile-only {
          display: none !important;
        }

        /* ── Header Ribbon (Logo + Certifications) ── */
        .footer-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          gap: 2rem;
          margin-bottom: 1.25rem;
        }

        .footer-header-badges {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .footer-header-badge-label {
          font-size: 0.625rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #334155;
          opacity: 0.8;
          line-height: 1.35;
          text-align: right;
          width: 140px;
        }

        .badge-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .footer-cert-badge-small {
          height: 48px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          opacity: 0.8;
          transition: opacity 0.25s ease, transform 0.25s ease;
          filter: grayscale(10%);
        }

        .footer-cert-badge-small:hover {
          opacity: 1;
          transform: scale(1.06);
          filter: grayscale(0%);
        }

        .footer-header-divider {
          width: 100%;
          height: 1px;
          background: rgba(15, 23, 42, 0.08);
          margin-bottom: 2rem;
        }

        /* ── 4-Column Grid ── */
        .footer-columns-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.8fr 0.8fr 1.1fr;
          gap: 2.5rem;
          width: 100%;
          margin-bottom: 1rem;
        }

        /* ── Brand column ── */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-brand-desc {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.55;
          margin: 0;
          text-align: left;
        }

        .footer-support-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .footer-support-label {
          font-size: 0.65rem;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #1e293b;
        }

        /* ── Partnerships in Brand Column ── */
        .footer-partners-group-brand {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.75rem;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          padding-top: 1rem;
        }

        .footer-partners-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          align-items: center;
          justify-items: start;
          gap: 0.85rem 1.25rem;
        }

        .footer-partner-badge-small {
          height: auto;
          width: auto;
          max-height: 42px;
          max-width: 100%;
          object-fit: contain;
          opacity: 0.75;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .footer-partner-badge-small:hover {
          opacity: 1;
          transform: scale(1.05);
        }

        /* ── Link columns ── */
        .footer-heading {
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
          color: var(--color-primary-100, #0D41E1); /* Brand primary blue */
        }

        .link-column {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .link-column :global(a) {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b; /* Slate 800 */
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .link-column :global(a:hover) {
          color: #0f172a; /* Slate 900 */
          text-decoration: underline;
        }

        /* ── Address column ── */
        .address-column {
          display: flex;
          flex-direction: column;
        }

        .addresses-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .address-item {
          flex: 1;
        }

        .address-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.35rem;
          color: #1e293b;
          opacity: 0.9;
        }

        .footer-address {
          font-style: normal;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .footer-address p {
          font-size: 0.85rem;
          font-weight: 500;
          color: #1e293b;
          margin: 0;
          line-height: 1.4;
        }

        .footer-contact-link {
          color: #0f172a;
          text-decoration: underline;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .footer-contact-link:hover {
          color: #475569;
        }

        /* ── Bottom bar ── */
        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: #1e293b;
          font-weight: 500;
        }

        .bottom-links {
          display: flex;
          gap: 1.5rem;
        }

        .bottom-link {
          color: #1e293b;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
          font-weight: 600;
        }

        .bottom-link:hover {
          color: #0f172a;
        }

        .social-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .find-us-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569; /* Slate 600 */
          margin-right: 0.25rem;
        }

        .social-link {
          color: #1e293b;
          transition: color 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-link:hover {
          color: #0A66C2; /* LinkedIn Blue */
          transform: scale(1.1);
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .footer-columns-grid {
            grid-template-columns: 1.3fr 0.9fr 0.9fr;
          }
          .address-column {
            grid-column: 1 / -1;
            border-top: 1px solid rgba(15, 23, 42, 0.05);
            padding-top: 1.5rem;
          }
        }

        @media (max-width: 900px) {
          .footer-columns-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
          }
          .address-column {
            grid-column: 1 / -1;
          }
          .footer-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .footer-header-badges {
            width: 100%;
            justify-content: space-between;
          }
          .footer-header-badge-label {
            text-align: left;
            width: auto;
          }
        }

        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }

          .show-mobile-only {
            display: flex !important;
          }

          .footer-mobile-trust-panel {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
            border-top: 1px solid rgba(15, 23, 42, 0.08);
            padding-top: 1.5rem;
            margin-top: 0.5rem;
          }

          .mobile-trust-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            width: 100%;
          }

          .mobile-trust-label {
            font-size: 0.65rem;
            font-weight: 850;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #475569;
          }

          .mobile-trust-badges {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.25rem;
            flex-wrap: wrap;
            width: 100%;
          }

          .mobile-partners-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
            justify-items: center;
            align-items: center;
          }

          .footer-container {
            background-image: url('/images/footer-1-ph.png');
          }
          .footer-header-row {
            align-items: center;
            text-align: center;
            margin-bottom: 1.5rem;
          }
          .footer-header-badges {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }
          .footer-header-badge-label {
            text-align: center;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        @media (max-width: 520px) {
          .footer-container {
            padding: 4rem 5% 2rem;
            min-height: 60vh;
          }
          .footer-columns-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          .footer-address p {
            color: #000000;
          }
          .link-column :global(a) {
            color: #000000;
          }
          .footer-cert-badge-small {
            height: 40px;
          }
        }
      `}</style>
    </footer>
  );
}
