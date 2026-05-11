"use client";

import React from "react";

export default function SiemRibbon() {
  return (
    <section className="siem-ribbon">
      <div className="container-wide">
        <p className="siem-text">
          <span style={{ color: "#FFFFFF", fontSize: "2rem", fontWeight: "bold", fontStyle: "italic", textAlign: "center" }}>AI for </span>
          <span style={{ color: "#FFFFFF", fontSize: "2rem", fontWeight: "bold", fontStyle: "italic", textAlign: "center", background: "linear-gradient(45deg, #FFB547, #FFB547)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Actionability</span>
          <span style={{ color: "#FFFFFF", fontSize: "2rem", fontWeight: "bold", fontStyle: "italic", textAlign: "center" }}>, not just Visibility.</span>
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
          font-size: 2rem; /* h2 equivalent size */
          font-weight: bold;
          font-style: italic;
          text-align: center;
          color: #FFFFFF;
        }
      `}</style>
    </section>
  );
}
