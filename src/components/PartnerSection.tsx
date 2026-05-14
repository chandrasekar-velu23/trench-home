"use client";

import Image from "next/image";
import ScrollReveal from "./animations/ScrollReveal";
import TextReveal from "./animations/TextReveal";

export default function PartnerSection() {
  return (
    <section className="partner-section">
      <div className="container-full">
        <ScrollReveal direction="up" className="text-center" distance={40}>
          <TextReveal text="Microsoft ISV Partner" as="h2" className="title-medium" style={{ justifyContent: "center", width: "100%" }} />
        </ScrollReveal>

        <div className="logo-container">
          <ScrollReveal delay={0.2} direction="up">
            <div className="logo-wrapper">
              <Image
                src="/Partner/CRMJetty-logo.svg"
                alt="CRMJetty - Microsoft ISV Partner"
                width={200}
                height={44}
                className="partner-logo"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style jsx>{`
        .partner-section {
          padding: 4rem 0;
          background: transparent;
          color: #111111;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .logo-wrapper {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 16px;
          padding: 2rem 3rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .logo-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
          border-color: rgba(13, 65, 225, 0.1);
        }

        .partner-logo {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .partner-section {
            padding: 3rem 1rem;
          }

          .logo-wrapper {
            padding: 1.5rem 2rem;
          }
        }
      `}</style>
    </section>
  );
}
