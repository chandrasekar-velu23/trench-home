"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top-fade" />
      <div className="footer-content">
        {/* Column 1 — Brand + Certs */}
        <div className="footer-col footer-brand-col">
          <Image
            src="/logo/trench-logo.webp"
            alt="Trench Logo"
            width={176}
            height={35}
            className="footer-logo-img"
          />
          <div className="footer-certs">
            <span className="footer-certs-label">Certified</span>
            <div className="footer-certs-badges">
              <Image
                src="/certificates/AICPA SOC.svg"
                alt="AICPA SOC"
                width={85}
                height={85}
                className="footer-cert-badge"
              />
              <Image
                src="/certificates/GDPR.svg"
                alt="GDPR"
                width={105}
                height={105}
                className="footer-cert-badge"
              />
              <Image
                src="/certificates/ISO.svg"
                alt="ISO"
                width={85}
                height={85}
                className="footer-cert-badge"
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
        </div>

        {/* Column 4 — Address & Contact */}
        <div className="footer-col address-column">
          <h4 className="footer-heading">Address & Contact</h4>
          <div className="addresses-container">
            <div className="address-item">
              <h5 className="address-label">India Office:</h5>
              <address className="footer-address">
                <p>Trench Security Private Limited,</p>
                <p>4th Flr, TheHub@RaiSerenity, Khatha No:10, Yelеnahali, Begur,</p>
                <p>Bangalore South, Bangalore-560068, Karnataka</p>
              </address>
            </div>
            <div className="address-item">
              <h5 className="address-label">US Office:</h5>
              <address className="footer-address">
                <p>Trench Security Inc</p>
                <p>16192 Coastal Highway, Lewes, DE 19958</p>
              </address>
            </div>
            <div className="address-item">
              <h5 className="address-label">Support:</h5>
              <address className="footer-address">
                <p>Reach out to us at</p>
                <p>
                  <a href="mailto:ask@trenchsecurity.ai" className="footer-contact-link">
                    ask@trenchsecurity.ai
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>
        <div className="footer-bottom-logos">
          <Image
            src="/awards/ISV-Partner-logo-new.png"
            alt="microsoft-ISV"
            width={132}
            height={29}
            className="footer-partner-badge"
          />
          <Image
            src="/awards/Logo_IAA.webp"
            alt="Indian Achievers Award"
            width={88}
            height={44}
            className="footer-partner-badge"
          />
          <Image
            src="/awards/CySecK Logo PNG@900x.webp"
            alt="CySecK"
            width={88}
            height={44}
            className="footer-partner-badge"
          />
        </div>
        <div className="footer-bottom-bar">
          <span className="copyright">© 2026 Trench Security, Inc.</span>
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
          background-image: url('/images/footer.webp');
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 5rem 10% 2.5rem; /* Snug bottom padding and elegant top padding */
          color: #1E293B;
          margin-top: 0;
        }

        .footer-top-fade {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 220px;
          background: linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.85) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.15) 75%, transparent 100%);
          z-index: 1;
          pointer-events: none;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 3fr;
          gap: 2.5rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          background: rgba(255, 255, 255, 0.45); /* Premium light frosted neutral glass */
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 2.5rem 3rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
        }

        /* ── Brand column ── */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo-img {
          height: 35.2px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          display: block;
        }

        /* ── Certification badges ── */
        .footer-certs {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .footer-certs-label {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #334155; /* Neutral dark Slate 700 */
          opacity: 0.8;
        }

        .footer-certs-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-cert-badge {
          height: 70.4px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          opacity: 0.7;
          transition: opacity 0.25s ease, transform 0.25s ease;
          filter: grayscale(15%);
        }

        .footer-cert-badge:hover {
          opacity: 1;
          transform: scale(1.06);
          filter: grayscale(0%);
        }

        .footer-partner-badge {
          height: auto;
          width: auto;
          max-height: 44px;
          max-width: 100%;
          object-fit: contain;
          opacity: 0.7;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .footer-partner-badge:hover {
          opacity: 1;
          transform: scale(1.06);
        }

        .footer-bottom-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          width: 100%;
          grid-column: 1 / -1;
        }

        /* ── Link columns ── */
        .footer-heading {
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
          color: var(--color-primary-100, #0D41E1); /* Brand primary blue color only */
        }

        .link-column {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .link-column :global(a) {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b; /* High-contrast neutral Slate 800 */
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .link-column :global(a:hover) {
          color: #0f172a; /* Solid neutral dark Slate 900 */
          text-decoration: underline;
        }

        /* ── Address column ── */
        .address-column {
          display: flex;
          flex-direction: column;
        }

        .addresses-container {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .address-item {
          flex: 1;
          min-width: 200px;
        }

        .address-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          color: #1e293b; /* Solid neutral dark Slate 800 */
          opacity: 0.9;
        }

        .footer-address {
          font-style: normal;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .footer-address p {
          font-size: 0.85rem;
          font-weight: 500;
          color: #1e293b; /* High-contrast Slate 800 */
          margin: 0;
          line-height: 1.4;
        }

        .footer-contact-link {
          color: #0f172a; /* Solid neutral dark Slate 900 */
          text-decoration: underline;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .footer-contact-link:hover {
          color: #475569; /* Slate 600 */
        }

        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          grid-column: 1 / -1;
          border-top: 1px solid rgba(15, 23, 42, 0.08); /* Pure neutral Slate border */
          padding-top: 1.5rem;
          margin-top: 1rem;
          font-size: 0.85rem;
          color: #1e293b; /* High-contrast Slate 800 */
          font-weight: 500;
        }

        .bottom-links {
          display: flex;
          gap: 1.5rem;
        }

        .bottom-link {
          color: #1e293b; /* High-contrast Slate 800 */
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
          font-weight: 600;
        }

        .bottom-link:hover {
          color: #0f172a; /* Solid neutral Slate 900 */
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .footer-content {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .address-column {
            grid-column: 1 / -1;
            border-top: 1px solid rgba(15, 23, 42, 0.05); /* Pure neutral border */
            padding-top: 1.5rem;
          }
        }

        @media (max-width: 900px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem 2rem;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
          }
          .address-column {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            background-image: url('/images/footer-ph.webp');
          }
          .footer-bottom-logos {
            flex-wrap: wrap;
            gap: 1rem;
            border-top: none;
          }
          .footer-partner-badge {
            background: #FFFFFF;
            padding: 0.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
          .footer-content {
            grid-template-columns: 1fr;
            gap: 1.75rem;
            padding: 2rem 1.5rem;
            background: transparent;
            border: none;
            backdrop-filter: none;
          }
          .footer-address p {
            color: #000000;
          }
          .link-column :global(a) {
            color: #000000;
          }
          .footer-cert-badge {
            height: 57.2px;
          }
        }
      `}</style>
    </footer>
  );
}
