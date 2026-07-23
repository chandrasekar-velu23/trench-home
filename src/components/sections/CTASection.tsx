"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(true);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const handleCTAClick = () => {
    setIsRevealed((prev) => !prev);
  };

  return (
    <section
      className="cta-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="container-wide">
        <div className="cta-outer">
          {/* Cloud — Left */}
          <div
            className={`cta-cloud cta-cloud-left ${isRevealed ? "visible" : "hidden"}`}
            style={{
              transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -10}px)`,
            }}
          >
            <Image
              src="/images/clouds.webp"
              alt="Trench SecOps Decorative Cloud Background"
              width={340}
              height={200}
              className="cta-cloud-img"
              aria-hidden="true"
            />
          </div>

          {/* Cloud — Right (mirrored) */}
          <div
            className={`cta-cloud cta-cloud-right ${isRevealed ? "visible" : "hidden"}`}
            style={{
              transform: `translate(${mousePos.x * 18}px, ${mousePos.y * -12}px) scaleX(-1)`,
            }}
          >
            <Image
              src="/images/clouds.webp"
              alt="Trench SecOps Decorative Cloud Background Mirror"
              width={340}
              height={200}
              className="cta-cloud-img"
              aria-hidden="true"
            />
          </div>

          {/* CTA Card */}
          <div className="cta-card">
            <div className="cta-content">
              <div className="cta-text">
                <span className="cta-eyebrow">EVERY CASTLE NEEDS A TRENCH.</span>
                <h2 className="cta-title">
                  Our Trench Protects Your Castle.
                </h2>
                <p className="cta-subtitle">
                  The Agentic Operating System for your security stack protecting everything you have built, 24/7.
                </p>
              </div>
              <div className="cta-actions">
                <Link href="/connect">
                  <Button className="cta-btn-primary">
                    Dig In
                  </Button>
                </Link>
                {/* <Link href="/connect">
                  <Button
                    variant="secondary"
                    className="cta-btn-secondary"
                  >
                    Take a Tour
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          padding: 5rem 0;
          position: relative;
          overflow: visible;
        }

        .cta-outer {
          position: relative;
          z-index: 1;
        }

        /* ── Clouds ── */
        .cta-cloud {
          position: absolute;
          width: 300px;
          height: auto;
          z-index: 0;
          pointer-events: none;
          opacity: 0.5;
          transition: opacity 0.6s ease, transform 0.15s ease-out;
          filter: blur(1px);
        }

        .cta-cloud.hidden { opacity: 0; }
        .cta-cloud.visible { opacity: 0.5; }

        .cta-cloud-left {
          left: -70px;
          top: 50%;
          margin-top: -90px;
        }

        .cta-cloud-right {
          right: -70px;
          top: 50%;
          margin-top: -110px;
        }

        /* ── Card ── */
        .cta-card {
          background: rgba(248, 250, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(13, 65, 225, 0.1);
          border-radius: 24px;
          padding: 2.5rem 3rem;
          position: relative;
          z-index: 2;
          box-shadow: 0 12px 40px -12px rgba(13, 65, 225, 0.08);
          max-width: 900px;
          margin: 0 auto;
        }

        .cta-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          position: relative;
          z-index: 2;
        }

        .cta-text {
          max-width: 520px;
          flex-shrink: 0;
        }

        .cta-eyebrow {
          display: block;
          font-family: var(--font-primary);
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--color-primary-100);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 0.6rem;
          opacity: 0.85;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          color: #0d41e1;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          white-space: normal;
        }

        .cta-subtitle {
          font-size: 1rem;
          color: var(--color-neutral-500);
          margin: 0;
          line-height: 1.5;
          max-width: 480px;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          flex-shrink: 0;
          align-items: center;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .cta-title {
            white-space: normal;
            font-size: 1.75rem;
          }
          .cta-cloud { width: 220px; }
          .cta-cloud-left { left: -30px; }
          .cta-cloud-right { right: -30px; }
        }

        @media (max-width: 768px) {
          .cta-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .cta-card {
            padding: 2rem 1.75rem;
          }
          .cta-title {
            font-size: 1.5rem;
          }
          .cta-subtitle {
            font-size: 0.9rem;
          }
          .cta-actions {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .cta-section {
            padding: 2.5rem 0;
          }
          .cta-card {
            padding: 1.5rem 1.25rem;
          }
          .cta-content {
            gap: 1.25rem;
          }
          .cta-eyebrow {
            font-size: 0.6rem;
            margin-bottom: 0.4rem;
          }
          .cta-title {
            font-size: 1.2rem;
            margin-bottom: 0.4rem;
          }
          .cta-subtitle {
            font-size: 0.8rem;
          }
          .cta-actions {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
            align-items: stretch;
          }
          :global(.cta-btn-primary),
          :global(.cta-btn-secondary) {
            width: 100% !important;
            height: 44px !important;
          }
          :global(.cta-btn-primary .button-text),
          :global(.cta-btn-secondary .button-text) {
            font-size: 12px !important;
            letter-spacing: 1px !important;
          }
          .cta-cloud {
            width: 100px;
            opacity: 0.2;
          }
          .cta-cloud.visible { opacity: 0.2; }
          .cta-cloud-left {
            left: -8px;
            margin-top: -30px;
          }
          .cta-cloud-right {
            right: -8px;
            margin-top: -50px;
          }
        }
      `}</style>
    </section>
  );
}
