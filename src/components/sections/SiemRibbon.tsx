"use client";

import React from "react";

export default function SiemRibbon() {
  return (
    <section className="siem-ribbon">
      <div className="container-wide">
        <p className="siem-text" style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: "bold", fontStyle: "italic", textAlign: "center" }}>
          AI SIEM with agents built in not bolted on.
        </p>
      </div>
      <style jsx>{`
        .siem-ribbon {
          padding: 4rem 0;
          background: var(--color-primary-100);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
}
