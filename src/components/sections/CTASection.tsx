"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
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
              src="/images/clouds.png"
              alt=""
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
              src="/images/clouds.png"
              alt=""
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
                <Button className="cta-btn-primary" onClick={handleCTAClick}>
                  Show Me the Trench
                </Button>
                <Button
                  variant="secondary"
                  className="cta-btn-secondary"
                  onClick={handleCTAClick}
                >
                  Take a Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          padding: 6rem 0;
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
          width: 340px;
          height: auto;
          z-index: 0;
          pointer-events: none;
          opacity: 0.55;
          transition: opacity 0.6s ease, transform 0.15s ease-out;
          filter: blur(1px);
        }

        .cta-cloud.hidden {
          opacity: 0;
        }

        .cta-cloud.visible {
          opacity: 0.55;
        }

        .cta-cloud-left {
          left: -80px;
          top: 50%;
          margin-top: -100px;
        }

        .cta-cloud-right {
          right: -80px;
          top: 50%;
          margin-top: -120px;
        }

        /* ── Card ── */
        .cta-card {
          background: rgba(248, 250, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(13, 65, 225, 0.1);
          border-radius: 24px;
          padding: 3.5rem;
          position: relative;
          z-index: 2;
          box-shadow: 0 12px 40px -12px rgba(13, 65, 225, 0.08);
        }

        .cta-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          position: relative;
          z-index: 2;
        }

        .cta-text {
          max-width: 600px;
        }

        .cta-eyebrow {
          display: block;
          font-family: var(--font-primary);
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--color-primary-100);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 1rem;
          opacity: 0.85;
        }

        .cta-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #0d41e1;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .cta-subtitle {
          font-size: 1.125rem;
          color: var(--color-neutral-500);
          margin: 0;
          line-height: 1.6;
        }

        .cta-actions {
          display: flex;
          gap: 1.25rem;
          flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .cta-content {
            flex-direction: column;
            text-align: center;
            gap: 2.5rem;
          }
          .cta-title {
            font-size: 1.875rem;
          }
          .cta-cloud {
            width: 240px;
          }
          .cta-cloud-left {
            left: -40px;
          }
          .cta-cloud-right {
            right: -40px;
          }
        }

        @media (max-width: 640px) {
          .cta-card {
            padding: 2.5rem 1.5rem;
          }
          .cta-actions {
            flex-direction: column;
            width: 100%;
          }
          :global(.cta-btn-primary),
          :global(.cta-btn-secondary) {
            width: 100% !important;
          }
          .cta-cloud {
            width: 160px;
            opacity: 0.35;
          }
          .cta-cloud.visible {
            opacity: 0.35;
          }
          .cta-cloud-left {
            left: -20px;
            margin-top: -60px;
          }
          .cta-cloud-right {
            right: -20px;
            margin-top: -80px;
          }
        }
      `}</style>
    </section>
  );
}
