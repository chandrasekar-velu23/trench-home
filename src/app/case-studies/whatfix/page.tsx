"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function WhatfixCaseStudyPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-20% 0px -80% 0px" });

    document.querySelectorAll("h2[id]").forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="case-study-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-wrapper">
            <Image
              src="/customers/Whatfix.svg"
              alt="Whatfix Logo"
              width={160}
              height={45}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <h1>How Whatfix Built Its Trench: Headless SecOps, One Decision Layer</h1>
          <p className="hero-subtitle">
            The complete SecOps engine : detection, investigation, hunting and response, runs inside the collaboration layer where Whatfix's team already works. No dedicated console. No context switching. Security that moves at the speed of the business.
          </p>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-value">100%</span>
              <span className="metric-label">SecOps workflows automated on Slack</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">&lt; 10 MINs</span>
              <span className="metric-label">Across all SLAs</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">24x7</span>
              <span className="metric-label">Resilience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-container">
          <span className="quote-mark">“</span>
          <p className="quote-text">
            An investigation that used to take our team close to an hour now closes in under 10 minutes without leaving Slack. Trench didn't just automate our security workflows, it brought the entire SecOps engine into the tool our team already lives in. That's a completely different way to run security.
          </p>
          <div className="quote-author">
            <p className="author-name">Achyuth</p>
            <p className="author-title">Head of Security, Whatfix</p>
          </div>
        </div>
      </section>

      <section className="main-content-section">
        <div className="content-grid">
          <article className="article-content">
            <h2 id="company-profile">COMPANY PROFILE</h2>
            <h3>Whatfix: When Security Has to Move at the Speed of the Business</h3>
            <p>
              Whatfix is an AI-native digital adoption platform that maximizes software ROI with in-app guidance, simulation training, and adoption analytics. As its infrastructure scaled across cloud environments, identity systems, and SaaS integrations, the security challenge wasn't just technical, it was operational. A lean, high-velocity team couldn't afford to run security from a separate tool that nobody checked in real time.
            </p>
            <p>
              The answer wasn't to hire a bigger SOC. It was to bring the entire SecOps engine inside the collaboration layer where the team already worked and let autonomous agents handle everything else. That vision led them to Trench Security's Agentic AI System.
            </p>

            <h2 id="challenges">CHALLENGES</h2>
            <h3>The Problem: Reactive Security, Blind Spots, and a SOC Disconnected from the Team</h3>
            <p>
              Whatfix's security posture was constrained by the limits of traditional, rule-based operations. Detection logic was untuned, hunting was time consuming, and security workflows lived in multiple tools and email threads entirely separate with poor context from where the team made decisions.
            </p>

            <h4>Untuned Detection Rules at Scale</h4>
            <p>
              Thousands of SIEM rules were active without lifecycle management, MITRE mapping, or performance review producing low-fidelity signals with no way to distinguish precision detections from noise generators.
            </p>

            <h4>Limited Attack Surface Coverage</h4>
            <p>
              Coverage across cloud, identity, endpoint, network, and SaaS was fragmented. Without a unified view, visibility gaps across MITRE ATT&CK tactics went undetected and unaddressed.
            </p>

            <h4>No Continuous Threat Hunting</h4>
            <p>
              Proactive hunting required manual effort and analyst availability — a luxury a lean team rarely had. Threats were only found if they announced themselves.
            </p>

            <h4>SecOps Isolated from Where the Team Works</h4>
            <p>
              Security alerts lived in separate tools and email threads, disconnected from the collaboration layer where decisions were made. Constant context switching slowed every response.
            </p>

            <h2 id="transformation">TRANSFORMATION</h2>
            <h3>From Static Rules to an Agentic Detection & Automation Engine</h3>

            <div className="comparison-grid">
              <div className="comparison-card before">
                <h4>BEFORE TRENCH</h4>
                <ul>
                  <li>Limited monitoring coverage and visibility gaps</li>
                  <li>Detection rules accumulated without systematic tuning or MITRE mapping</li>
                  <li>Fragmented MITRE coverage, blind to attack surface</li>
                  <li>No proactive threat hunting</li>
                  <li>Email alerts, no workflow structure</li>
                  <li>Manually maintained institutional knowledge or playbooks</li>
                </ul>
              </div>
              <div className="comparison-card after">
                <h4>AFTER TRENCH</h4>
                <ul>
                  <li>24×7 autonomous monitoring powered by Agents</li>
                  <li>High-fidelity detections, high-quality investigations</li>
                  <li>100% visibility on blindspots and coverage gaps</li>
                  <li>Continuous autonomous hunting at scale</li>
                  <li>100% workflows automated end-to-end via Slack</li>
                  <li>Self-learning knowledge base across all playbooks and new scenarios</li>
                </ul>
              </div>
            </div>

            <h2 id="adoption-story">ADOPTION STORY</h2>
            <h3>How the Whatfix SOC Team Made Trench Their Own</h3>
            <p>
              Trench deployed alongside Whatfix's existing environment with no rip-and-replace and no downtime. But the real shift wasn't technical, it was operational. For the first time, Whatfix's complete SecOps engine moved inside Slack: the collaboration layer where their team already worked, made decisions, and moved fast.
            </p>
            <p>
              Detection findings, investigation workflows, hunt results, and response actions - all of it now flows directly into the channels where the team operates. The right signal reaches the right person with full context, without a portal login or context switch. Security stopped being something the team went to check. It became something that came to them.
            </p>
            <p>
              On the detection side, thousands of rules were evaluated and distilled into a precision set of high-fidelity use cases - each MITRE-mapped across cloud, identity, endpoint, and network. Achieving 5X coverage velocity in under 30 days. Autonomous threat hunts ran continuously across every environment, proactively surfacing supply chain compromises, malicious container artifacts, and active extortion campaigns that never triggered a single conventional alert. Response time across investigation and resolution dropped to under 10 minutes, from a baseline of over 70.
            </p>
          </article>

          <aside className="sticky-sidebar">
            <nav className="table-of-contents">
              <a href="#company-profile" className={activeSection === "company-profile" ? "active" : ""}>COMPANY PROFILE</a>
              <a href="#challenges" className={activeSection === "challenges" ? "active" : ""}>CHALLENGES</a>
              <a href="#transformation" className={activeSection === "transformation" ? "active" : ""}>TRANSFORMATION</a>
              <a href="#adoption-story" className={activeSection === "adoption-story" ? "active" : ""}>ADOPTION STORY</a>
            </nav>
          </aside>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>READY TO BUILD YOUR TRENCH?</h2>
          <h3>Headless SecOps for Teams That Move Fast</h3>
          <div className="cta-actions">
            <Link href="/connect">
              <Button>
                REQUEST A DEMO
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .case-study-container {
          min-height: 100vh;
          background-color: #ffffff;
          padding-top: 6rem;
          color: #111;
        }

        .hero-section {
          padding: 4rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo-wrapper {
          margin-bottom: 2rem;
          padding: 1rem;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          display: inline-block;
        }

        .hero-section h1 {
          font-size: clamp(1.75rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: #000;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          line-height: 1.6;
          color: #444;
          max-width: 800px;
          margin-bottom: 3rem;
        }

        .metrics-grid {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .metric-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 12px;
          flex: 1;
          min-width: 200px;
          border: 1px solid #eaeaea;
        }

        .metric-value {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: var(--color-primary-100, #0052FF);
        }

        .metric-label {
          font-size: 1rem;
          font-weight: 600;
          color: #555;
        }

        .quote-section {
          padding: 4rem 1rem;
          margin: 4rem auto;
          max-width: 1200px;
          display: flex;
          justify-content: center;
        }

        .quote-container {
          max-width: 1100px;
          width: 100%;
          position: relative;
          padding: 2.5rem 2rem;
          background: var(--color-primary-100, #0052FF);
          border-radius: 24px;
          border: none;
          text-align: center;
        }

        .quote-mark {
          display: block;
          font-size: 4rem;
          color: rgba(255, 255, 255, 0.3);
          line-height: 1;
          font-family: serif;
          margin-bottom: 1.5rem;
        }

        .quote-text {
          font-size: clamp(1.125rem, 2vw, 1.35rem);
          line-height: 1.6;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 2rem;
          letter-spacing: 0;
          font-style: normal;
        }

        .quote-author {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .author-name {
          font-weight: 700;
          font-size: 1.125rem;
          color: #ffffff;
          margin: 0;
        }

        .author-title {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          margin: 0;
        }

        .main-content-section {
          padding: 4rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 250px;
          gap: 4rem;
        }

        .article-content {
          max-width: 800px;
        }

        .article-content h2 {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 800;
          color: #111;
          margin: 4rem 0 1.5rem;
          scroll-margin-top: 100px;
          padding-bottom: 0.5rem;
         
        }

        .article-content h2:first-of-type {
          margin-top: 0;
        }

        .article-content h3 {
          font-size: clamp(1.25rem, 3vw, 1.5rem);
          font-weight: 700;
          color: #222;
          margin: 2rem 0 1rem;
        }

        .article-content h4 {
          font-size: clamp(1.1rem, 2.5vw, 1.2rem);
          font-weight: 600;
          color: #333;
          margin: 1.5rem 0 0.75rem;
        }

        .article-content p {
          font-size: clamp(1rem, 2vw, 1.1rem);
          line-height: 1.8;
          color: #444;
          margin-bottom: 1.5rem;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin: 2rem 0 3rem;
        }

        .comparison-card {
          padding: 1.5rem;
          border-radius: 12px;
        }

        .comparison-card.before {
          background-color: #fff5f5;
          border: 1px solid #ffe3e3;
        }

        .comparison-card.before h4 {
          color: #e03131;
          margin-top: 0;
        }

        .comparison-card.after {
          background-color: #f3f0ff;
          border: 1px solid #e5dbff;
        }

        .comparison-card.after h4 {
          color: var(--color-primary-100, #0052FF);
          margin-top: 0;
        }

        .comparison-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .comparison-card li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          font-size: clamp(0.95rem, 2vw, 1.05rem);
          line-height: 1.5;
          color: #333;
        }

        .comparison-card.before li::before {
          content: "×";
          position: absolute;
          left: 0;
          color: #e03131;
          font-weight: bold;
        }

        .comparison-card.after li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--color-primary-100, #0052FF);
          font-weight: bold;
        }

        .sticky-sidebar {
          position: sticky;
          top: 100px;
          align-self: start;
        }

        .table-of-contents {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-left: 2px solid #eaeaea;
          padding-left: 1.5rem;
        }

        .table-of-contents a {
          color: #666;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .table-of-contents a:hover,
        .table-of-contents a.active {
          color: var(--color-primary-100, #0052FF);
        }

        .table-of-contents a.active {
          font-weight: 700;
        }

        .cta-section {
          background-color: #ffffff;
          color: #111;
          padding: 6rem 1rem;
          text-align: center;
          margin-top: 2rem;
          border-top: 1px solid #eaeaea;
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .cta-container h2 {
          font-size: clamp(1.25rem, 4vw, 2rem);
          font-weight: 800;
          color: var(--color-primary-100, #0052FF);
          margin-bottom: 0.5rem;
        }

        .cta-container h3 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 2.5rem;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
        }


        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          .sticky-sidebar {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr;
          }
          .quote-container {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
