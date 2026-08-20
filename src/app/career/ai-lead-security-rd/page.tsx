import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "R&D AI Tech Lead | Careers",
  description: "Join Trench as R&D AI Tech Lead and build the technical foundation behind agentic Security Operations.",
};

export default function AILeadSecurityRDPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .job-details-container {
          max-width: 860px;
          margin: 0 auto;
        }

        .job-back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-primary-100);
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 2rem;
          text-decoration: none;
          transition: transform 0.2s ease;
        }
        .job-back-link:hover {
          transform: translateX(-3px);
        }

        .job-header-card {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .phase-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #0D41E1;
          text-transform: uppercase;
          background: rgba(13, 65, 225, 0.08);
          border: 1px solid rgba(13, 65, 225, 0.15);
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          font-family: var(--font-poppins), sans-serif;
          line-height: 1.2;
        }
        .phase-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0D41E1;
          display: inline-block;
        }

        .job-title {
          font-size: 2.6rem;
          font-weight: 800;
          color: #000000;
          margin: 0.75rem 0 1.25rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .job-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          align-items: center;
        }

        .job-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          font-family: var(--font-poppins), sans-serif;
          white-space: nowrap;
        }
        .job-tag-dept {
          background: rgba(13, 65, 225, 0.07);
          color: #0D41E1;
        }
        .job-tag-loc {
          background: rgba(16, 185, 129, 0.07);
          color: #059669;
        }
        .job-tag-type {
          background: rgba(245, 158, 11, 0.08);
          color: #b45309;
        }

        .job-quote-callout {
          background: #f8fafc;
          border-left: 4px solid var(--color-primary-100);
          border-radius: 0 12px 12px 0;
          padding: 1.35rem 1.75rem;
          margin: 2rem 0 2.5rem;
        }
        .job-quote-callout p {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e293b;
          font-style: italic;
          line-height: 1.6;
          margin: 0;
        }

        .job-section-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.07);
          border-radius: 16px;
          padding: 2rem 2.25rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .job-section-card h2 {
          font-family: var(--font-primary);
          font-size: 1.25rem;
          font-weight: 800;
          color: #000000;
          margin-top: 0;
          margin-bottom: 1.25rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .job-section-card p {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--color-neutral-700);
          margin-bottom: 1rem;
        }
        .job-section-card p:last-child {
          margin-bottom: 0;
        }

        .job-section-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .job-section-card li {
          position: relative;
          padding-left: 1.75rem;
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--color-neutral-700);
        }

        .job-section-card li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-primary-100);
        }

        .job-apply-card {
          background: #f8fafc;
          border: 1px solid rgba(13, 65, 225, 0.15);
          border-radius: 16px;
          padding: 2.25rem;
          margin-top: 2.5rem;
          text-align: left;
        }
        .job-apply-card h2 {
          font-family: var(--font-primary);
          font-size: 1.35rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 1rem;
          letter-spacing: 0.03em;
        }

        @media (max-width: 640px) {
          .job-title { font-size: 2rem; }
          .job-section-card { padding: 1.5rem; }
          .job-apply-card { padding: 1.5rem; }
        }
      `}} />
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', position: 'relative', zIndex: 10, paddingBottom: '80px' }}>
        <div className="page-main overflow-hidden" style={{ backgroundColor: '#ffffff', paddingTop: '160px' }}>
          <div className="job-details-container">

            <Link href="/career" className="job-back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Careers
            </Link>

            <ScrollReveal direction="up">
              <div className="job-header-card">
                <div>
                  <span className="phase-badge">Active Hiring</span>
                </div>
                <h1 className="job-title">
                  R&D AI Tech Lead
                </h1>

                <div className="job-tags-row">
                  <span className="job-tag job-tag-dept">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    Engineering
                  </span>
                  <span className="job-tag job-tag-loc">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Bengaluru, India
                  </span>
                  <span className="job-tag job-tag-type">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Full-time, 6-12 years experience
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="job-quote-callout">
                <p>&quot;We are building the technical core of Agentic SecOps.&quot;</p>
              </div>

              <div className="job-section-card">
                <h2>ABOUT TRENCH</h2>
                <p>
                  Security Operations is entering a fundamentally different era. AI is changing how detection, investigation and response can be performed, while the scale and complexity of security telemetry continues to grow. Trench is building an agentic operating system for Security Operations.
                </p>
                <p>
                  We are looking for an R&D AI Tech Lead to build the technical foundation behind this vision: the security data platform, AI agent infrastructure and engineering systems that power Trench. This is a builder&apos;s leadership role. You will set technical direction, lead a small senior team and stay hands-on.
                </p>
              </div>

              <div className="job-section-card">
                <h2>THE ROLE</h2>
                <p>
                  You will work across Security Data, AI Agents and Platform Infrastructure. You will solve hard technical problems around high-scale security telemetry, AI agent infrastructure and reliable production systems. You will work closely with the CTO and product team to turn these systems into the foundation for Trench&apos;s next generation of Security Operations.
                </p>
              </div>

              <div className="job-section-card">
                <h2>WHAT YOU&apos;LL OWN</h2>
                <ul>
                  <li><strong>Security data platform:</strong> Architect and scale our security data platform across storage, schemas, partitioning, retention and high-speed queries over security telemetry.</li>
                  <li><strong>Data pipelines:</strong> Build high-throughput ingestion, parsing, normalization and enrichment across cloud, endpoint, identity, network and SaaS sources.</li>
                  <li><strong>AI agents & infrastructure:</strong> Build the infrastructure and gateway layer powering detection, investigation and response agents, including orchestration, observability, cost controls and guardrails.</li>
                  <li><strong>Platform & DevOps:</strong> Own the infrastructure that keeps Trench reliable and secure across cloud, IaC, CI/CD, containers and observability.</li>
                  <li><strong>Lead the team:</strong> Hire, mentor and grow engineers while setting technical direction and raising the engineering bar.</li>
                  <li><strong>Stay hands-on:</strong> Write production Go and Python and use AI copilots and agentic tooling to accelerate how we build.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>MINDSET</h2>
                <ul>
                  <li>You are a builder. You solve hard problems and ship production systems.</li>
                  <li>You think in systems. You can move across data, AI and infrastructure without losing the bigger picture.</li>
                  <li>You use AI by default. You believe AI should fundamentally change how engineering teams build.</li>
                  <li>You have strong technical judgement. You know when to build, when to use existing technology and when to go deep.</li>
                  <li>You move fast. You are comfortable with ambiguity, take ownership and have a bias to ship.</li>
                  <li>You want to build something new. We are not adding AI to another SIEM. We are building the technical foundation for a different way of doing Security Operations.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>WHAT WE&apos;RE LOOKING FOR</h2>
                <ul>
                  <li>6 to 12 years building and operating data-intensive backend or platform systems.</li>
                  <li>Deep experience with data storage and processing at scale.</li>
                  <li>Strong understanding of columnar, vector and key-value databases.</li>
                  <li>Experience building high-throughput pipelines using Kafka, Pub/Sub or similar technologies.</li>
                  <li>Strong Go and Python skills.</li>
                  <li>Experience with data mesh or domain-oriented architectures.</li>
                  <li>Experience leading engineers while remaining technically hands-on.</li>
                  <li>High ownership, startup mindset and bias to ship.</li>
                  <li>Cybersecurity exposure or the ability to quickly understand security data and SOC workflows.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>BONUS POINTS</h2>
                <ul>
                  <li>Open-source database or infrastructure contributions.</li>
                  <li>Experience building AI agents or agentic systems in production.</li>
                  <li>AI gateway or agent orchestration experience.</li>
                  <li>Strong use of Claude, copilots or agentic development tooling.</li>
                  <li>SIEM, security data platform, detection engineering or MITRE ATT&CK experience.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>WHY THIS ROLE</h2>
                <p>
                  You will help build the infrastructure behind a new operating model for Security Operations. You will work on problems such as:
                </p>
                <ul style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                  <li>How do we process massive volumes of security telemetry efficiently?</li>
                  <li>How do we build AI agents that can reason over security data reliably?</li>
                  <li>How do we make those agents production-ready, observable and controllable?</li>
                </ul>
                <p>
                  If these problems excite you, this is the role.
                </p>
              </div>

              <div className="job-apply-card">
                <h2>HOW TO APPLY</h2>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.65, marginBottom: '1rem', fontSize: '1.05rem' }}>
                  Email <a href="mailto:career@trenchsecurity.ai?subject=Application for R&D AI Tech Lead" style={{ color: 'var(--color-primary-100)', fontWeight: 600, textDecoration: 'underline' }}>career@trenchsecurity.ai</a> with a short note about something hard you&apos;ve built. It could be a data platform, high-scale pipeline, open-source contribution or AI-agent system. Include your GitHub and LinkedIn.
                </p>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.6, marginBottom: '0', fontSize: '1.02rem' }}>
                  No formal cover letter needed. Show us what you&apos;ve built. Show us how you think.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
