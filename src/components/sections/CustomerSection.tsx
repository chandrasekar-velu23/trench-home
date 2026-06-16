"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

export default function CustomerSection() {
  return (
    <section className="customer-section content-block-full">
      <div className="container-wide">
        <ScrollReveal direction="up" className="text-center" distance={40} style={{ marginBottom: "3rem" }}>
          <TextReveal text="TRUSTED BY" as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
          <TextReveal text="Securing Forward-Thinking Teams" as="h2" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }} />
          <ScrollReveal delay={0.5} direction="none">
            <p className="body-lead" style={{ maxWidth: '800px', margin: '0.5rem auto 0' }}>
              Trench empowers modern security teams to operate at the speed of AI.
            </p>
          </ScrollReveal>
        </ScrollReveal>

        <div className="customer-grid">
          <Link 
            href="/case-studies/whatfix"
            className="customer-card logo-only-card"
            aria-label="Whatfix Case Study"
          >
            <div className="logo-wrapper">
              <Image 
                src="/customers/Whatfix.svg" 
                alt="Whatfix" 
                width={220} 
                height={60} 
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="static-btn">
              Case Study
            </div>
          </Link>
          <div className="customer-card logo-only-card ocrolus-container">
            <div className="logo-wrapper">
              <Image 
                src="/customers/ocrolus-logo-1.png" 
                alt="Ocrolus" 
                width={180} 
                height={50} 
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .customer-section {
          padding: 6rem 0;
          position: relative;
          z-index: 2;
        }

        .customer-grid {
          display: flex;
          gap: 3.5rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 3rem;
        }

        .customer-card {
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 260px;
          height: 120px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .customer-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border-color: var(--color-primary-100);
        }

        .logo-wrapper {
          position: relative;
          width: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(100%);
          transition: filter 0.3s ease;
          margin: 0 auto;
        }

        .customer-card:hover .logo-wrapper {
          filter: grayscale(0%);
        }

        .logo-only-card {
          border: none;
          background: transparent;
          position: relative;
          cursor: pointer;
          height: auto;
          width: fit-content;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0.5rem;
          gap: 0.75rem;
          box-shadow: none;
          text-align: center;
        }

        .ocrolus-container {
          cursor: default;
        }

        .logo-only-card:hover {
          transform: translateY(-4px);
        }

        .ocrolus-container:hover {
          transform: translateY(-4px);
          border-color: transparent;
        }

        .static-btn {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-primary-100, #0052FF);
          background: rgba(0, 82, 255, 0.05);
          padding: 6px 14px;
          border-radius: 20px;
          border: 1px solid rgba(0, 82, 255, 0.15);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          width: max-content;
          margin: 0 auto;
          align-self: center !important;
        }

        .logo-only-card:hover .static-btn {
          background: var(--color-primary-100, #0052FF);
          color: white;
          border-color: var(--color-primary-100, #0052FF);
          box-shadow: 0 4px 12px rgba(0, 82, 255, 0.2);
        }

        @media (max-width: 768px) {
          .customer-section {
            padding: 4rem 1rem;
          }

          .customer-grid {
            gap: 2rem;
            flex-direction: column;
          }

          .customer-card {
            width: 220px;
            height: 100px;
            padding: 1.5rem;
            border-radius: 12px;
          }
          
          .logo-only-card {
            width: auto;
            height: auto;
          }
        }
      `}</style>
    </section>
  );
}
