"use client";

import React from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import "../resources.css";

export default function EventsPage() {
  return (
    <main className="resources-page overflow-hidden">
      {/* Hero Section */}
      <section className="resources-hero">
        <ScrollReveal direction="up" className="text-center">
          <span className="resources-eyebrow">Trench Events</span>
          <h1 className="resources-title">Trench in Action</h1>
          <p className="resources-desc">
            Catch the latest event spotlights, announcements, and presentations from the Trench team.
          </p>
        </ScrollReveal>
      </section>

      {/* LinkedIn Grid */}
      <section className="resources-container" style={{ marginBottom: "5rem" }}>
        <div className="linkedin-grid">
          <ScrollReveal direction="up" delay={0.1} className="linkedin-card">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7481890378548199424?collapsed=1" 
              height="670" 
              style={{ width: "100%", maxWidth: "504px", border: "none", borderRadius: "12px" }} 
              allowFullScreen={true} 
              title="Embedded post"
            />
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2} className="linkedin-card">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7472365101044486144?collapsed=1" 
              height="567" 
              style={{ width: "100%", maxWidth: "504px", border: "none", borderRadius: "12px" }} 
              allowFullScreen={true} 
              title="Embedded post"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="linkedin-card">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7435234786530635776?collapsed=1" 
              height="670" 
              style={{ width: "100%", maxWidth: "504px", border: "none", borderRadius: "12px" }} 
              allowFullScreen={true} 
              title="Embedded post"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4} className="linkedin-card">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7432069015587549184?collapsed=1" 
              height="542" 
              style={{ width: "100%", maxWidth: "504px", border: "none", borderRadius: "12px" }} 
              allowFullScreen={true} 
              title="Embedded post"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <div style={{ marginTop: "6rem" }}>
        <CTASection />
      </div>
    </main>
  );
}
