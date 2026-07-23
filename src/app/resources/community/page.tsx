"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ShieldAlert, Award, Terminal, ArrowRight, Zap, Target, Calendar, Trophy, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import "../resources.css";

export default function CommunityPage() {
  return (
    <main className="resources-page overflow-hidden">
      {/* Hero Header & Unified BPL Showcase */}
      <section className="resources-hero" style={{ paddingBottom: "2rem", maxWidth: "1200px" }}>
        <ScrollReveal direction="up" className="text-center" style={{ marginBottom: "3rem" }}>
          <span className="resources-eyebrow">BlueTeam Premier League</span>
          <h1 className="resources-title" style={{ letterSpacing: "-0.03em", textAlign: "center" }}>Play Between The Lines</h1>
          <p className="resources-desc" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            More than an event, it is an exclusive cybersecurity league where Blue Teams compete through ideas, strategy, and collaboration rather than on a playing field.
          </p>
        </ScrollReveal>

        {/* Unified BPL Showcase Card */}
        <ScrollReveal direction="up" delay={0.2} className="bpl-hero-showcase">
          {/* Logo Section */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/BPL/BPL LOGO.png"
              alt="BlueTeam Premier League (BPL) Logo"
              width={340}
              height={340}
              className="bpl-logo-img"
              priority
              quality={95}
            />
          </div>

          {/* Details & Vision */}
          <div className="bpl-hero-text">
            <span className="bpl-badge" style={{ alignSelf: "flex-start" }}>Founding Edition: Bangalore</span>
            <h2 className="bpl-title" style={{ fontSize: "2.25rem", margin: 0, fontWeight: "800" }}>BlueTeam Premier League (BPL)</h2>
            <p className="bpl-desc" style={{ fontSize: "16px", margin: 0, lineHeight: "1.7", color: "var(--color-neutral-600)" }}>
              The BlueTeam Premier League (BPL), organized by Trench Security, is a highly curated cybersecurity gathering inspired by premier sporting leagues. Far from traditional, dry conferences, BPL focuses on conversation, collaboration, and active engagement. It's a space where security practitioners connect, exchange real-world SOC experiences, and have fun after hours.
            </p>
            <a
              href="https://luma.com/calendar/cal-FwLKyNupiOO86Mg?period=past"
              target="_blank"
              rel="noopener noreferrer"
              className="bpl-cta"
              style={{ alignSelf: "flex-start" }}
            >
              <span>Join the League</span>
              <ArrowRight size={16} style={{ marginLeft: "8px" }} />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Main Sections Wrapper */}
      <section className="resources-container">
        {/* Video Showcase Section */}
        <div className="community-video-section" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
          <ScrollReveal direction="up" style={{ marginBottom: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h3 className="resources-title" style={{ fontSize: "28px", marginBottom: "0.75rem", textAlign: "center" }}>See BPL in Action</h3>
            <p className="resources-desc" style={{ fontSize: "16px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
              Explore after-hours meetups, live gaming challenges, and security practice sessions.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2} className="w-full">
            <div className="video-frame-wrapper">
              <iframe 
                className="video-frame"
                src="https://www.youtube.com/embed/AEnT-jVCr-4?si=rb546GDye_MNRdM1" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Vision & Objectives Grid */}
        <div style={{ marginTop: "6rem", marginBottom: "4rem" }}>
          <ScrollReveal direction="up" style={{ marginBottom: "3.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h3 className="resources-title" style={{ fontSize: "28px", textAlign: "center", margin: "0 0 0.5rem" }}>League Vision & Objectives</h3>
            <p className="resources-desc" style={{ fontSize: "16px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
              Built to foster authentic connection, strategic collaboration, and competitive excellence.
            </p>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            <ScrollReveal direction="up" delay={0.1} className="resources-card">
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(13, 65, 225, 0.06)", color: "var(--color-primary-100)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Users size={20} />
              </div>
              <h4 className="event-title" style={{ fontSize: "18px", marginBottom: "0.5rem" }}>Network with Leaders</h4>
              <p className="event-description" style={{ fontSize: "13px", marginBottom: 0 }}>
                Directly connect and engage with CISOs, security directors, and industry pioneers in an informal, low-pressure setting.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="resources-card">
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(13, 65, 225, 0.06)", color: "var(--color-primary-100)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <ShieldAlert size={20} />
              </div>
              <h4 className="event-title" style={{ fontSize: "18px", marginBottom: "0.5rem" }}>Exchange Real SOC Experiences</h4>
              <p className="event-description" style={{ fontSize: "13px", marginBottom: 0 }}>
                Share war stories, incident response blueprints, and practical orchestration strategies from live production networks.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} className="resources-card">
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(13, 65, 225, 0.06)", color: "var(--color-primary-100)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Trophy size={20} />
              </div>
              <h4 className="event-title" style={{ fontSize: "18px", marginBottom: "0.5rem" }}>Sports League Theme</h4>
              <p className="event-description" style={{ fontSize: "13px", marginBottom: 0 }}>
                Enjoy a premier fantasy league format with championship trophies, structured gamified modules, and friendly competitive spirit.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Luma Calendar Upcoming Events CTA Card */}
        <div style={{ marginTop: "6rem", marginBottom: "4rem" }}>
          <ScrollReveal direction="up" className="text-center">
            <div className="event-calendar-card" style={{
              background: "linear-gradient(135deg, rgba(13, 65, 225, 0.04) 0%, rgba(13, 65, 225, 0.01) 100%)",
              border: "1px solid rgba(13, 65, 225, 0.1)",
              borderRadius: "24px",
              padding: "3.5rem 2rem",
              maxWidth: "900px",
              margin: "0 auto",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(13, 65, 225, 0.02)"
            }}>
              <Calendar size={48} style={{ color: "var(--color-primary-100)", marginBottom: "1.5rem" }} />
              <h3 className="resources-title" style={{ fontSize: "28px", marginBottom: "1rem" }}>Upcoming BPL Meetups & Match Days</h3>
              <p className="resources-desc" style={{ fontSize: "16px", maxWidth: "600px", margin: "0 auto 2rem" }}>
                Keep track of our next live sessions, capture-the-flag competitions, and social mixer events. Subscribe to our calendar on Luma to get automatic invitations.
              </p>
              <a
                href="https://luma.com/calendar/cal-FwLKyNupiOO86Mg?period=past"
                target="_blank"
                rel="noopener noreferrer"
                className="bpl-cta"
                style={{ display: "inline-flex", gap: "8px", alignItems: "center", margin: "0 auto" }}
              >
                <span>Follow Calendar on Luma</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
