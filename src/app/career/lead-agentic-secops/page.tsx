import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Lead, Agentic SecOps | Careers",
  description: "Join Trench as Lead, Agentic SecOps and drive customer transformation from traditional SOC to an agentic operating model.",
};

export default function LeadAgenticSecOpsPage() {
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
                  Lead, Agentic SecOps
                </h1>

                <div className="job-tags-row">
                  <span className="job-tag job-tag-dept">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    Security Operations
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
                <p>&quot;We are rewriting how Security Operations is practised.&quot;</p>
              </div>

              <div className="job-section-card">
                <h2>ABOUT TRENCH</h2>
                <p>
                  The attack landscape is changing faster than traditional Security Operations can keep up. AI is changing the speed and scale of attacks, while security teams continue to operate with more tools, more alerts, more rules and more manual investigation. We believe this model is reaching its limit. Trench is building an agentic approach to Security Operations where AI agents take on detection, investigation and response, enabling security teams to operate with greater speed, coverage and autonomy.
                </p>
                <p>
                  We are looking for a Lead, Agentic SecOps who believes in this transformation and wants to drive it with customers. This is not a traditional SOC leadership role. You will help forward-looking security teams move from the traditional SOC model to an agentic operating model and drive measurable transformation outcomes.
                </p>
              </div>

              <div className="job-section-card">
                <h2>THE ROLE</h2>
                <p>
                  You will work at the intersection of Security Operations, AI agents and customer transformation. You will understand how a customer&apos;s SOC operates today, identify where traditional processes create friction, design the agentic operating model and work with the customer to put it into production. You will be part security operator, part transformation leader and part customer advisor.
                </p>
              </div>

              <div className="job-section-card">
                <h2>WHAT YOU&apos;LL OWN</h2>
                <ul>
                  <li><strong>Customer transformation:</strong> Assess existing SOC operations across people, processes, tools and workflows. Define what should be automated, redesigned or eliminated, and lead the transition to an agentic model.</li>
                  <li><strong>Agentic SecOps workflows:</strong> Design and operationalize workflows across detection, triage, threat hunting, investigation, threat intelligence and response.</li>
                  <li><strong>Hands-on security operations:</strong> Investigate real threats, validate detections, review AI-generated investigations, tune workflows and identify gaps. You should be comfortable going deep into customer environments.</li>
                  <li><strong>Human + Agent operating model:</strong> Help customers determine what agents should handle autonomously, where humans should remain in the loop and how trust and control should be maintained.</li>
                  <li><strong>Transformation outcomes:</strong> Drive measurable improvements in alert noise, investigation effort, detection coverage, response time, analyst workload and autonomous resolution.</li>
                  <li><strong>Product feedback loop:</strong> Work closely with Product and Engineering to turn customer learnings, security gaps and emerging attack patterns into better agents and workflows.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>MINDSET</h2>
                <ul>
                  <li>You believe the SOC is changing. The answer to increasing security complexity is not simply more analysts and more tools.</li>
                  <li>You are an operator first. You understand the reality behind alert queues, false positives, escalations, investigation fatigue and detection gaps.</li>
                  <li>You challenge the status quo. You understand the existing SOC deeply enough to know what should remain, what should change and what should disappear.</li>
                  <li>You care about outcomes. Automation is not the goal. A fundamentally better Security Operations function is.</li>
                  <li>You are comfortable creating the playbook. Agentic SecOps is still being defined. You should enjoy operating in ambiguity, experimenting and learning from production environments.</li>
                  <li>Most importantly, you believe in the transformation and want to drive it.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>WHAT WE&apos;RE LOOKING FOR</h2>
                <ul>
                  <li>6 to 12 years in Security Operations, detection engineering, threat hunting, incident response or security engineering.</li>
                  <li>Strong hands-on understanding of modern SOC operations.</li>
                  <li>Experience with SIEM, SOAR, XDR, EDR, cloud, identity and security telemetry.</li>
                  <li>Strong detection engineering, investigation and incident response skills.</li>
                  <li>Fluency with MITRE ATT&CK and modern threat hunting.</li>
                  <li>Experience working directly with security teams, SOC leaders or CISOs.</li>
                  <li>Strong understanding of security automation and where human judgement is still required.</li>
                  <li>Excellent customer-facing communication and ownership mindset.</li>
                  <li>Strong curiosity around AI agents and their application to Security Operations.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>BONUS POINTS</h2>
                <ul>
                  <li>Experience operating or transforming a SOC.</li>
                  <li>Splunk, Microsoft Sentinel or other SIEM experience.</li>
                  <li>SOAR and security automation experience.</li>
                  <li>AI or LLM-based security workflow experience.</li>
                  <li>MSSP, consulting, threat intelligence or purple-team experience.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>WHY THIS ROLE</h2>
                <p>
                  You will help define what an Agentic SOC actually looks like in production. You will work with customers who are ready to rethink how Security Operations should work and help answer a fundamental question: What should a SOC look like when AI agents can investigate, reason and respond at machine speed?
                </p>
                <p>
                  We are not simply building another security product. We are building the next operating model for Security Operations.
                </p>
              </div>

              <div className="job-apply-card">
                <h2>HOW TO APPLY</h2>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.65, marginBottom: '1.25rem', fontSize: '1.05rem' }}>
                  Send your application to <a href="mailto:career@trenchsecurity.ai?subject=Application for Lead, Agentic SecOps" style={{ color: 'var(--color-primary-100)', fontWeight: 600, textDecoration: 'underline' }}>career@trenchsecurity.ai</a> with a short note about one of these:
                </p>
                <ul style={{ color: 'var(--color-neutral-600)', lineHeight: 1.7, fontSize: '1.02rem', paddingLeft: '1.5rem', marginBottom: '1.25rem' }}>
                  <li>A SOC transformation you have led</li>
                  <li>A security workflow you have automated</li>
                  <li>A difficult detection or investigation problem you solved</li>
                  <li>Your view on what the SOC should look like in the age of AI agents</li>
                </ul>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.6, marginBottom: '0', fontSize: '1.02rem' }}>
                  No formal cover letter needed. Show us how you think. Show us how you operate.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
