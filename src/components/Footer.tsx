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
            src="/logo/trench-logo.png"
            alt="Trench Logo"
            width={160}
            height={32}
            className="footer-logo-img"
          />
          <div className="footer-certs">
            <span className="footer-certs-label">Certified</span>
            <div className="footer-certs-badges">
              <Image
                src="/certificates/AICPA SOC.svg"
                alt="AICPA SOC"
                width={77}
                height={77}
                className="footer-cert-badge"
              />
              <Image
                src="/certificates/GDPR.svg"
                alt="GDPR"
                width={95}
                height={95}
                className="footer-cert-badge"
              />
              <Image
                src="/certificates/ISO.svg"
                alt="ISO"
                width={77}
                height={77}
                className="footer-cert-badge"
              />
            </div>
          </div>
        </div>

        {/* Column 2 — Legal */}
        <div className="footer-col link-column">
          <h4 className="footer-heading">Legal</h4>
          <Link href="#">Privacy policy</Link>
          <Link href="#">Cookies notice</Link>
          <Link href="#">Trust center</Link>
        </div>

        {/* Column 3 — Platform */}
        <div className="footer-col link-column">
          <h4 className="footer-heading">Platform</h4>
          <Link href="/why-trench">Why Trench?</Link>
          <Link href="/integrations">Integrations</Link>
          <Link href="/how-it-works">How it works?</Link>
        </div>

        {/* Column 4 — Address */}
        <div className="footer-col address-column">
          <h4 className="footer-heading">Address</h4>
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
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-container {
          position: relative;
          width: 100%;
          min-height: 80vh;
          background-image: url('/images/footer.png');
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem 10% 2rem;
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
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          padding: 2.5rem 3rem;
          border-radius: 20px;
          border: 1px solid rgba(13, 65, 225, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        /* ── Brand column ── */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo-img {
          height: 32px;
          width: auto;
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
          color: var(--color-primary-100, #0D41E1);
          opacity: 0.6;
        }

        .footer-certs-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-cert-badge {
          height: 64px;
          width: auto;
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

        /* ── Link columns ── */
        .footer-heading {
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
          color: var(--color-primary-100, #0D41E1);
        }

        .link-column {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .link-column :global(a) {
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .link-column :global(a:hover) {
          color: #0D41E1;
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
          color: var(--color-primary-100, #0D41E1);
          opacity: 0.8;
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
          color: #475569;
          margin: 0;
          line-height: 1.4;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .footer-content {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .address-column {
            grid-column: 1 / -1;
            border-top: 1px solid rgba(13, 65, 225, 0.05);
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
            background-image: url('/images/footer-ph.png');
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
          }
          .footer-cert-badge {
            height: 52px;
          }
        }
      `}</style>
    </footer>
  );
}
