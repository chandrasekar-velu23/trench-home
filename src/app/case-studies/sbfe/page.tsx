"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function SBFECaseStudyPage() {
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
              src="/customers/SBFE.png"
              alt="SBFE Logo"
              width={160}
              height={45}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <h1>How SBFE Built Its Trench: Actionable SecOps for U.S. Small Business Financial Exchange</h1>
          <p className="hero-subtitle">
            From SumoLogic bottlenecks and manual workflows to a fully headless, actionable security operation, running 24x7 on the Trench Agentic Operating System.
          </p>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-value">One Platform</span>
              <span className="metric-label">Agentic SIEM + SOC: detection, investigation, and response unified</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">Full Visibility</span>
              <span className="metric-label">Across all connected log sources unified, normalized, monitored in real time</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">&lt; 10 MINs</span>
              <span className="metric-label">Every escalation arrives with full context and a clear recommended action</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">24x7</span>
              <span className="metric-label">Autonomous coverage, no shift gaps, no blind spots in connected sources</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-container">
          <span className="quote-mark">“</span>
          <p className="quote-text">
            As a small security team, we needed a tool that could help us build rules, escalate material events, and evolve over time, essentially an extension of our own team. Within a few days of implementing Trench we were already working more efficiently, and a few weeks in, things have only gotten smoother. Trench has become a solid part of our security program.
          </p>
          <div className="quote-author">
            <p className="author-name">Pete Tannish</p>
            <p className="author-title">Head of Enterprise Risk &amp; Technology, SBFE</p>
          </div>
        </div>
      </section>

      <section className="main-content-section">
        <div className="content-grid">
          <article className="article-content">
            <h2 id="company-profile">COMPANY PROFILE</h2>
            <h3>SBFE: The Trusted Source for U.S. Small Business Credit Data</h3>
            <p>
              The Small Business Financial Exchange (SBFE) is an industry trade association formed in 2001. Over 140 U.S. small business lenders are members. SBFE's mission is to be the trusted source for small business data, delivering solutions and data-driven insights that drive access to capital and the growth of small businesses.
            </p>
            <p>
              SBFE operates as a central repository for aggregating credit payment performance data , a closed, "give to get" exchange that provides data received from member lenders to major credit reporting bureaus for inclusion in risk management products. The sensitivity of that data and the trust of over 140 member institutions set the bar for what security must deliver: coverage that is continuous, auditable, and never dependent on manual effort.
            </p>
            <div className="tags-row">
              <span className="tag">Financial Services</span>
              <span className="tag">Credit Data Infrastructure</span>
              <span className="tag">GLBA</span>
              <span className="tag">Federal Data Protection</span>
              <span className="tag">140+ Member Lenders</span>
              <span className="tag">Est. 2001</span>
            </div>

            <h2 id="challenges">CHALLENGES</h2>
            <h3>The Problem: Growing Infrastructure, Rising Complexity, and Security That Could Not Keep Pace</h3>
            <p>
              SBFE's security posture was constrained by the limits of a conventional model , a legacy SIEM paired with manual SOC workflows , that could not scale alongside an expanding, data-sensitive environment.
            </p>

            <h4>A Legacy SIEM and Manual SOC That Could Not Scale</h4>
            <p>
              SBFE operated a conventional security model , a legacy SIEM for log collection and detection, paired with manual SOC workflows for triage, investigation, and response. As the infrastructure grew across cloud, identity, endpoints, and SaaS, the gap between alert volume and available analyst capacity widened. Maintaining detection logic, managing escalations, and tracking investigation status required continuous human effort that compounded with every new environment addition.
            </p>

            <h4>No Consolidated Detection Posture or Coverage Visibility</h4>
            <p>
              Without a unified view of what was being detected and where critical assets sat relative to known attack techniques, understanding coverage gaps required manual effort the team could not consistently sustain. As new assets were added to the environment, default monitoring coverage was not guaranteed , posture had to be actively tracked rather than built in.
            </p>

            <h4>Security Operations That Needed to Scale Without Proportional Headcount</h4>
            <p>
              With over 140 member institutions depending on SBFE data, the security function carried obligations that demanded scale. Manual triage, fragmented workflows, and coverage dependent on shift schedules created an operating model that could not sustainably match the pace of a growing threat environment.
            </p>

            <h4>Compliance Posture That Depended on Manual Assembly</h4>
            <p>
              Maintaining a structured, continuous audit record for a data-intensive environment required manual effort that competed directly with active security operations. Every compliance review demanded time the team needed to spend elsewhere. A built-in, continuous compliance trail , not one assembled after the fact , was a clear operational requirement.
            </p>

            <h2 id="transformation">TRANSFORMATION</h2>
            <h3>From a Legacy SIEM and Manual SOC to One Integrated Agentic Platform</h3>

            <div className="comparison-grid">
              <div className="comparison-card before">
                <h4>BEFORE TRENCH</h4>
                <ul>
                  <li>Legacy SIEM combined with a manual SOC model: detection, investigation, and response managed across separate tools and workflows with significant human overhead</li>
                  <li>No consolidated view of detection posture or MITRE ATT&amp;CK coverage , understanding coverage required ongoing manual effort</li>
                  <li>Detection rules and investigation configurations required continuous manual upkeep as the environment scaled</li>
                  <li>Alert volume and investigation workload grew faster than the team could absorb , every triage cycle required analyst time</li>
                  <li>Security workflows lived outside the team's primary collaboration environment, creating context-switching overhead</li>
                  <li>Escalation workflows lacked structured context , teams received notifications without severity, scope, or recommended next steps</li>
                  <li>Producing a structured audit record required significant manual effort drawn from active security operations</li>
                </ul>
              </div>
              <div className="comparison-card after">
                <h4>AFTER TRENCH</h4>
                <ul>
                  <li>One integrated agentic platform combining SIEM and SOC: detection, investigation, hunting, and response running continuously on the Trench Agentic SIEM</li>
                  <li>Critical asset coverage established in weeks , full MITRE ATT&amp;CK posture visible and continuously updated</li>
                  <li>Detection rules authored and deployed automatically from live threat intel through Intent Graph , no manual configuration, no tuning cycles</li>
                  <li>Every alert auto-investigated 24x7 , each escalation arrives with full context: what happened, blast radius, and recommended next action in under 10 minutes</li>
                  <li>100% headless SecOps , all findings, investigations, and response actions surface inside the team's collaboration tools with full context</li>
                  <li>Every escalation arrives with full context of what happened and what needs to be done in under 10 minutes</li>
                  <li>Every detection, investigation, and closure timestamped with a full audit trail , compliance posture is continuous and built in</li>
                </ul>
              </div>
            </div>

            <h2 id="adoption-story">ADOPTION STORY</h2>
            <h3>SBFE Built an Actionable SOC: Powered by the Trench Agentic SIEM</h3>

            <h4>One Platform Replacing a Legacy SIEM and Manual SOC</h4>
            <p>
              SBFE replaced its legacy SIEM and the manual SOC workflows it required with Trench's security-first, data lake-centric Agentic SIEM , one integrated platform where detection, investigation, threat hunting, and response run continuously, without separate tooling or human orchestration between them. Every log source across endpoints, identity, cloud, network, and SaaS now flows into a unified data layer. What previously required a SIEM for ingestion, a separate workflow for triage, and analyst time for every investigation is now a single, continuously operating agentic system.
            </p>

            <h4>Detection Posture Rebuilt Around Intent Graph and MITRE Coverage</h4>
            <p>
              Trench's Intent Graph became the foundation of SBFE's new detection posture , reasoning about the behavioral purpose behind every signal, not just the individual event. Rather than evaluating alerts in isolation, Intent Graph reasons across relationships, sequences, and context to identify what is genuinely suspicious versus expected activity. MITRE ATT&amp;CK-aligned detection rules now deploy automatically from live threat intel, with critical asset coverage established in weeks and every new asset onboarded with its default detection workflow enabled from day one.
            </p>

            <h4>Automated Investigation: Every Escalation Arrives With Context</h4>
            <p>
              Every alert now enters an automated investigation loop , context gathered, timeline built, blast radius scoped, case closed. Every escalation that reaches a human arrives with the complete picture: what happened, the scope of impact, and a clear recommended action, in under 10 minutes. Response and remediation cycles that previously required significant analyst time now close before the next shift starts.
            </p>

            <h4>Headless SecOps: Security That Comes to the Team</h4>
            <p>
              For a team where security operations needed to scale without proportional headcount, the headless model was the right architectural fit. Security findings, investigation outcomes, and escalations surface directly inside the collaboration layer the team already uses , no console login, no context switching, no separate tool to monitor. Security became something that came to the team, fully reasoned and ready to act on.
            </p>
            <p>
              The compliance posture changed fundamentally. Every detection, every investigation, every closure is timestamped with a full audit trail , built continuously as Trench operates, not assembled under pressure. The result is a compliance record that is always current, always complete, and available on demand.
            </p>

            <h4>Autonomous Threat Hunting Across the Full Attack Surface</h4>
            <p>
              Trench's autonomous threat hunting agents run continuously across SBFE's environment , proactively surfacing threats that evade rule-based detection. Behavioral anomalies, lateral movement indicators, and insider risk signals that no static rule set can anticipate are identified and surfaced before they become incidents. For an organization where data integrity underpins the trust of over 140 member institutions, proactive coverage across the full attack surface is not optional.
            </p>
          </article>

          <aside className="sticky-sidebar">
            <nav className="table-of-contents">
              <a href="#company-profile" className={activeSection === "company-profile" ? "active" : ""}>COMPANY PROFILE</a>
              <a href="#challenges" className={activeSection === "challenges" ? "active" : ""}>CHALLENGES</a>
              <a href="#transformation" className={activeSection === "transformation" ? "active" : ""}>TRANSFORMATION</a>
              <a href="#adoption-story" className={activeSection === "adoption-story" ? "active" : ""}>ADOPTION STORY</a>
            </nav>
            <div className="sidebar-cta-card">
              <p className="sidebar-cta-label">SEE TRENCH IN ACTION</p>
              <h4 className="sidebar-cta-title">Agentic OS for Actionable SecOps</h4>
              <Link href="/connect" style={{ marginTop: '0.4rem' }}>
                <Button>Request a Demo</Button>
              </Link>
            </div>
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
          font-size: clamp(1.5rem, 3.5vw, 2.25rem);
          font-weight: 800;
          color: var(--color-primary-100, #0052FF);
        }

        .metric-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: #555;
          line-height: 1.4;
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

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1.5rem 0 2rem;
        }

        .tag {
          font-size: 0.8rem;
          font-weight: 600;
          color: #555;
          background: #f1f3f5;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid #e0e0e0;
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
          content: "x";
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

        .sidebar-cta-card {
          margin-top: 2rem;
          padding: 1.25rem 1.5rem;
          border: 1.5px solid rgba(0, 82, 255, 0.18);
          border-radius: 14px;
          background: #f8f9ff;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .sidebar-cta-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-primary-100, #0052FF);
          margin: 0;
          text-transform: uppercase;
        }

        .sidebar-cta-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #111;
          margin: 0;
          line-height: 1.45;
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
          .metrics-grid {
            gap: 1rem;
          }
          .metric-card {
            min-width: 150px;
          }
        }
      `}</style>
    </div>
  );
}
