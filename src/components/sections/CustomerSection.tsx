"use client";

import React from "react";
import Image from "next/image";
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
          <div className="customer-card">
            <div className="logo-wrapper">
              <Image 
                src="/customers/Whatfix.svg" 
                alt="Whatfix" 
                width={108} 
                height={30} 
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className="customer-card">
            <div className="logo-wrapper">
              <Image 
                src="/customers/ocrolus-logo-1.png" 
                alt="Ocrolus" 
                width={108} 
                height={30} 
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
          gap: 2.5rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .customer-card {
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 170px;
          height: 80px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .customer-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
          border-color: var(--color-primary-100);
        }

        .logo-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(100%);
          transition: filter 0.3s ease;
        }

        .customer-card:hover .logo-wrapper {
          filter: grayscale(0%);
        }

        @media (max-width: 768px) {
          .customer-section {
            padding: 3rem 1rem;
          }

          .customer-grid {
            gap: 1rem;
          }

          .customer-card {
            width: 140px;
            height: 70px;
            padding: 1rem;
            border-radius: 8px;
          }
        }
      `}</style>
    </section>
  );
}
