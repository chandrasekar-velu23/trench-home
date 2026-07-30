"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function OcrolusCaseStudyPage() {
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
              src="/customers/ocrolus-logo-1.png"
              alt="Ocrolus Logo"
              width={160}
              height={45}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <h1>How Ocrolus Built Its Trench</h1>
          <p className="hero-subtitle">
            Replacing a Legacy SIEM with an Agentic SecOps Engine. From a solid data foundation to a fully headless, agentic security operation - running 24x7 on the Trench Agentic Operating System.
          </p>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-value">2X</span>
              <span className="metric-label">ROI on security operations</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">100%</span>
              <span className="metric-label">Detection coverage incl. AI workloads</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">&lt; 10 min</span>
              <span className="metric-label">Alert triage & investigation SLA</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">24x7</span>
              <span className="metric-label">Autonomous resilience</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-container">
          <span className="quote-mark">“</span>
          <p className="quote-text">
            The shift from legacy SIEM to Trench was not about replacing a tool. It was about adopting an entirely new operating model, one where security is agentic, continuous, and built for the pace of an AI-native business. Every phase of the transition compounded on the last, and the result is a security operation that scales with Ocrolus. Security finally feels actionable.
          </p>
          <div className="quote-author">
            <p className="author-name">Anupam Mandal</p>
            <p className="author-title">Head of Security Operations, Ocrolus</p>
          </div>
        </div>
      </section>

      <section className="main-content-section">
        <div className="content-grid">
          <article className="article-content">
            <div className="video-wrapper">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/z7mCwOSinqs?si=jWLgMCmXATA_5JkP" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>

            <h2 id="company-profile">COMPANY PROFILE</h2>
            <h3>Ocrolus Inc.: Security Built for the Infrastructure of AI-Native Fintech</h3>
            <p>
              Ocrolus is an AI-native fintech infrastructure company based in New York that powers lending decisions for banks, fintechs, and mortgage companies across the US. Their platform automates underwriting workflows across small-business, mortgage, and consumer lending - classifying financial documents, extracting key data, detecting fraud, and delivering comprehensive cash-flow and income analysis with exceptional precision and reliability. By processing sensitive borrower data at scale across bank statements, pay stubs, and financial documents, Ocrolus enables lenders to make faster, more accurate credit decisions. For a company handling sensitive financial data, maintaining rigorous compliance standards and borrower data protection are not optional; they are table stakes.
            </p>

            <h2 id="the-opportunity">THE OPPORTUNITY</h2>
            <h3>Elevating Security for a Modern, AI-Native Team</h3>
            
            <h4>1. Evolving from log visibility to actionable security outcomes</h4>
            <p>
              As Ocrolus grew, strong log visibility and dashboards were no longer sufficient on their own. The team needed a step change: agentic workflows, automated investigations, and security outcomes that went beyond what happened to what to do about it.
            </p>

            <h4>2. Scaling security outcomes without scaling headcount</h4>
            <p>
              With rapid infrastructure growth across cloud, identity, endpoints, and SaaS, Ocrolus sought a smarter way to keep pace. The goal was clear: empower a lean, high-performing security team to consistently meet SLAs at scale, with automation and intelligence doing the heavy lifting.
            </p>

            <h4>3. Traditional Managed Detection and Response MDR providers could not deliver an agentic SecOps transformation</h4>
            <p>
              Evaluating the MDR market made one thing clear: traditional providers and AI-bolted delivery models were built for a different era. They could manage alerts. They could not reason about intent, adapt to new attack surfaces, or automate the full detection-to-response loop. The operating model itself was the bottleneck.
            </p>

            <h4>4. Monitoring AI adoption and emerging behavioural anomalies</h4>
            <p>
              As Ocrolus rapidly expanded its AI-powered infrastructure, including frontier model workloads, the team recognized that AI-native operations demand AI-native security. Standard detection approaches were not designed with this environment in mind. Ocrolus needed a security layer that could understand context, learn what normal looks like across AI workloads, and surface genuine anomalies in real time. Trench was purpose-built for exactly this challenge.
            </p>

            <h2 id="transformation">TRANSFORMATION</h2>
            <h3>From Static Rules to an Agentic Detection and Automation Engine</h3>

            <div className="comparison-grid">
              <div className="comparison-card before">
                <h4>BEFORE TRENCH</h4>
                <ul>
                  <li>Centralized log visibility and dashboards established a solid data foundation</li>
                  <li>Rapidly expanding AI-native infrastructure requiring deeper behavioral context and continuous workload monitoring</li>
                  <li>Security workflows managed manually, with alerts across multiple tools requiring analyst coordination</li>
                  <li>Incident investigations managed through multi-step analyst workflows across remediation, reporting, and stakeholder communication</li>
                  <li>Threat hunting driven by skilled analysts, with opportunities to extend coverage and integrate real-time intelligence at scale</li>
                </ul>
              </div>
              <div className="comparison-card after">
                <h4>AFTER TRENCH</h4>
                <ul>
                  <li>2X ROI on security operations, delivering real security outcomes</li>
                  <li>AI workload baselines and behavioral anomaly detection through Intent Graph, continuously monitoring frontier model activity</li>
                  <li>Complete headless SecOps experience - all workflows automated end-to-end inside Slack, no console switching, no manual handoffs</li>
                  <li>Full remediation, reporting, and stakeholder communication completed in under an hour, consistently</li>
                  <li>Real-time threat intel feeding dynamic detections - hypothesis-driven autonomous hunting running continuously across the full attack surface</li>
                </ul>
              </div>
            </div>

            <section className="quote-section" style={{ margin: '3rem 0', padding: '0' }}>
              <div className="quote-container">
                <span className="quote-mark">“</span>
                <p className="quote-text">
                  To me, having a SIEM and a SOC as separate entities or vendors does not make sense anymore. Modern security monitoring should integrate them into one solution and that is exactly where Trench is leading the industry.
                </p>
                <div className="quote-author">
                  <p className="author-name">Senthil Kumar Iyyappan</p>
                  <p className="author-title">CISO, Ocrolus</p>
                </div>
              </div>
            </section>

            <h2 id="adoption-story">AGENTIC TRANSFORMATION STORY</h2>
            <p>
              The transition from a legacy SIEM to an AI-powered Agentic SIEM was not simply a technology upgrade for Ocrolus; it was a fundamental rethinking of what security operations could and should look like. As an AI-native fintech handling sensitive financial data at scale, Ocrolus required a security posture that matched the speed, complexity, and intelligence of its own platform. The journey unfolded across four distinct phases, each building on the last to deliver a fully agentic, always-on SecOps engine.
            </p>
            
            <h4 className="phase-heading"><span className="phase-badge">01 PHASE</span> Establishing the Unified Data Foundation</h4>
            <p>
              Every agentic security capability begins with data quality. Trench replaced fragmented, siloed log pipelines with a security-first data lake at the core of the Ocrolus environment. Signals from cloud infrastructure, identity providers, endpoints, SaaS applications, and AI workloads were ingested and normalized in real time - with zero pipeline maintenance.
            </p>
            <p>
              <span className="outcome-badge">The outcome:</span> A single, authoritative source of truth that gave every downstream agent complete, high-fidelity context - the prerequisite for accurate detection, fast investigation, and confident response.
            </p>

            <h4 className="phase-heading"><span className="phase-badge">02 PHASE</span> Replacing Static Rules with Intent Graph Detection</h4>
            <p>
              Legacy SIEMs operate on fixed rules; they flag what has been seen before. As Ocrolus scaled its AI-native infrastructure, the attack surface evolved faster than any ruleset could keep up with. Trench&apos;s Intent Graph changed the detection paradigm entirely.
            </p>
            <p>
              Rather than matching events to known signatures, Intent Graph continuously baselines behavioral patterns across both traditional and AI workloads. It learns what normal looks like - and surfaces anomalies that no pre-written rule would ever catch, including emerging threats specific to frontier model activity.
            </p>
            <p>
              <span className="outcome-badge">The outcome:</span> 100% detection coverage across the full attack surface, including AI workloads, without the noise and false positives that burdened rule-based systems.
            </p>

            <h4 className="phase-heading"><span className="phase-badge">03 PHASE</span> Deploying Purpose-Built Agents Across Every SecOps Workflow</h4>
            <p>
              With the data foundation and detection engine in place, Trench Agentic Studio enabled Ocrolus to deploy specialized agents across every critical security workflow, operating continuously, without human initiation.
            </p>
            <ol className="custom-number-list">
              <li><strong>Detection Agents</strong> evaluate signals through Intent Graph reasoning and live threat intelligence, prioritizing what genuinely demands attention.</li>
              <li><strong>Investigation Agents</strong> auto-triage every alert 24x7, running end-to-end case closure from initial triage through full remediation and stakeholder reporting - in under an hour.</li>
              <li><strong>Hunting Agents</strong> run continuous, hypothesis-driven threat hunts across the full attack surface, augmenting analyst-led investigations with real-time intelligence.</li>
              <li><strong>Response Agents</strong> execute automated playbooks from containment through communication, eliminating manual handoffs and shift-gap risk entirely.</li>
            </ol>
            <p>
              <span className="outcome-badge">The outcome:</span> A fully autonomous SecOps capability that scales with the organization, not with headcount.
            </p>

            <h4 className="phase-heading"><span className="phase-badge">04 PHASE</span> Going Headless - Security That Comes to the Team</h4>
            <p>
              The final and defining shift was operational: eliminating the console entirely. For a lean, high-performing security team managing an AI-native organization, the traditional model of logging into a SIEM to check on security is a friction point that slows response and fragments attention.
            </p>
            <p>
              With Trench&apos;s headless model, every finding, investigation outcome, and response action surfaces directly inside Slack - enriched with full context, supporting evidence, and a clear recommended action. Security stopped being something the team went to check. It became something that came to them.
            </p>
            <p>
              <span className="outcome-badge">The outcome:</span> A security function that integrates seamlessly into the team&apos;s existing workflow, making proactive, intelligent security a natural part of every working day.
            </p>
          </article>

          <aside className="sticky-sidebar">
            <nav className="table-of-contents">
              <a href="#company-profile" className={activeSection === "company-profile" ? "active" : ""}>COMPANY PROFILE</a>
              <a href="#the-opportunity" className={activeSection === "the-opportunity" ? "active" : ""}>THE OPPORTUNITY</a>
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

        .quote-container p.quote-text {
          font-size: clamp(1.125rem, 2vw, 1.35rem);
          line-height: 1.6;
          font-weight: 400;
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

        .quote-container p.author-name {
          font-weight: 700;
          font-size: 1.125rem;
          color: #ffffff;
          margin: 0;
        }

        .quote-container p.author-title {
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

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          margin-bottom: 3rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          background: #000;
        }
        
        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
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

        .phase-heading {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem !important;
        }

        .phase-badge {
          background-color: var(--color-primary-100, #0052FF);
          color: #fff;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .custom-number-list {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          list-style-type: decimal;
        }
        
        .custom-number-list li {
          font-size: clamp(1rem, 2vw, 1.1rem);
          line-height: 1.8;
          color: #444;
          margin-bottom: 0.75rem;
          position: relative;
          padding-left: 0.5rem;
        }

        .custom-number-list li::marker {
          color: var(--color-primary-100, #0052FF);
          font-weight: bold;
        }

        .outcome-badge {
          background: rgba(0, 82, 255, 0.1);
          color: var(--color-primary-100, #0052FF);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.9rem;
          margin-right: 0.5rem;
          display: inline-block;
          border: 1px solid rgba(0, 82, 255, 0.2);
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
          content: "× ";
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
        }
      `}</style>
    </div>
  );
}
