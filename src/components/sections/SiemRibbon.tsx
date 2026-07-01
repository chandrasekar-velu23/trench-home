"use client";

import React from "react";

export default function SiemRibbon() {
  return (
    <section className="siem-ribbon">
      <div className="container-wide">
        <p className="siem-text">
          <span>AI built for </span>
          <span className="text-highlight">Actionability</span>
          <span>, not just Visibility.</span>
        </p>
      </div>
      <style jsx>{`
        .siem-ribbon {
          padding: 4rem 0;
          background: var(--color-primary-100);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .siem-text {
          font-size: 2rem;
          font-weight: bold;
          font-style: italic;
          text-align: center;
          color: #FFFFFF;
        }

        .text-highlight {
          background: linear-gradient(45deg, #FFB547, #FFB547);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 768px) {
          .siem-ribbon {
            padding: 2rem 1rem;
          }

          .siem-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
