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
        .job-details-section h2 {
          font-family: var(--font-primary);
          font-size: 1.5rem;
          font-weight: 800;
          color: #000000;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .job-details-section p, .job-details-section li {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--color-neutral-600);
          margin-bottom: 1rem;
        }
        .job-details-section ul {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
      `}} />
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', position: 'relative', zIndex: 10, paddingBottom: '80px' }}>
        <div className="page-main overflow-hidden" style={{ backgroundColor: '#ffffff', paddingTop: '160px' }}>
          <div className="container-wide" style={{ maxWidth: '800px' }}>

            <Link href="/career" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-100)', fontWeight: 600, marginBottom: '2rem', textDecoration: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Careers
            </Link>

            <ScrollReveal direction="up">
              <h1 className="title-md" style={{ color: '#000000', marginBottom: '1rem', fontSize: '2.5rem' }}>
                Lead, Agentic SecOps
              </h1>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--color-neutral-500)', fontSize: '1rem', fontWeight: 500, marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <span>Bengaluru, India</span>
                <span>•</span>
                <span>Full-time</span>
                <span>•</span>
                <span>6–12 years experience</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} className="job-details-section">
              <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#000000', fontStyle: 'italic', borderLeft: '4px solid var(--color-primary-100)', paddingLeft: '1.5rem', margin: '2rem 0' }}>
                "We are rewriting how Security Operations is practised."
              </p>

              <h2>TRENCH SECURITY · AGENTIC SECOPS · CUSTOMER TRANSFORMATION</h2>
              <p>
                The attack landscape is changing faster than traditional Security Operations can keep up. AI is changing the speed and scale of attacks, while security teams continue to operate with more tools, more alerts, more rules and more manual investigation. We believe this model is reaching its limit. Trench is building an agentic approach to Security Operations where AI agents take on detection, investigation and response, enabling security teams to operate with greater speed, coverage and autonomy.
              </p>
              <p>
                We are looking for a Lead, Agentic SecOps who believes in this transformation and wants to drive it with customers. This is not a traditional SOC leadership role. You will help forward-looking security teams move from the traditional SOC model to an agentic operating model and drive measurable transformation outcomes.
              </p>

              <h2>THE ROLE</h2>
              <p>
                You will work at the intersection of Security Operations, AI agents and customer transformation. You will understand how a customer's SOC operates today, identify where traditional processes create friction, design the agentic operating model and work with the customer to put it into production. You will be part security operator, part transformation leader and part customer advisor.
              </p>

              <h2>WHAT YOU'LL OWN</h2>
              <ul>
                <li><strong>Customer transformation:</strong> Assess existing SOC operations across people, processes, tools and workflows. Define what should be automated, redesigned or eliminated, and lead the transition to an agentic model.</li>
                <li><strong>Agentic SecOps workflows:</strong> Design and operationalize workflows across detection, triage, threat hunting, investigation, threat intelligence and response.</li>
                <li><strong>Hands-on security operations:</strong> Investigate real threats, validate detections, review AI-generated investigations, tune workflows and identify gaps. You should be comfortable going deep into customer environments.</li>
                <li><strong>Human + Agent operating model:</strong> Help customers determine what agents should handle autonomously, where humans should remain in the loop and how trust and control should be maintained.</li>
                <li><strong>Transformation outcomes:</strong> Drive measurable improvements in alert noise, investigation effort, detection coverage, response time, analyst workload and autonomous resolution.</li>
                <li><strong>Product feedback loop:</strong> Work closely with Product and Engineering to turn customer learnings, security gaps and emerging attack patterns into better agents and workflows.</li>
              </ul>

              <h2>MINDSET</h2>
              <ul>
                <li>You believe the SOC is changing. The answer to increasing security complexity is not simply more analysts and more tools.</li>
                <li>You are an operator first. You understand the reality behind alert queues, false positives, escalations, investigation fatigue and detection gaps.</li>
                <li>You challenge the status quo. You understand the existing SOC deeply enough to know what should remain, what should change and what should disappear.</li>
                <li>You care about outcomes. Automation is not the goal. A fundamentally better Security Operations function is.</li>
                <li>You are comfortable creating the playbook. Agentic SecOps is still being defined. You should enjoy operating in ambiguity, experimenting and learning from production environments.</li>
                <li>Most importantly, you believe in the transformation and want to drive it.</li>
              </ul>

              <h2>WHAT WE'RE LOOKING FOR</h2>
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

              <h2>BONUS POINTS</h2>
              <ul>
                <li>Experience operating or transforming a SOC.</li>
                <li>Splunk, Microsoft Sentinel or other SIEM experience.</li>
                <li>SOAR and security automation experience.</li>
                <li>AI or LLM-based security workflow experience.</li>
                <li>MSSP, consulting, threat intelligence or purple-team experience.</li>
              </ul>

              <h2>WHY THIS ROLE</h2>
              <p>
                You will help define what an Agentic SOC actually looks like in production. You will work with customers who are ready to rethink how Security Operations should work and help answer a fundamental question: What should a SOC look like when AI agents can investigate, reason and respond at machine speed?
              </p>
              <p>
                We are not simply building another security product. We are building the next operating model for Security Operations.
              </p>

              <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, color: '#000000', marginBottom: '1rem' }}>HOW TO APPLY</h2>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.6, marginBottom: '1rem', fontSize: '1.05rem' }}>
                  Send your application to <a href="mailto:career@trenchsecurity.ai?subject=Application for Lead, Agentic SecOps" style={{ color: 'var(--color-primary-100)', fontWeight: 600, textDecoration: 'underline' }}>career@trenchsecurity.ai</a> with a short note about one of these:
                </p>
                <ul style={{ color: 'var(--color-neutral-600)', lineHeight: 1.7, fontSize: '1.05rem', paddingLeft: '1.5rem' }}>
                  <li>A SOC transformation you have led</li>
                  <li>A security workflow you have automated</li>
                  <li>A difficult detection or investigation problem you solved</li>
                  <li>Your view on what the SOC should look like in the age of AI agents</li>
                </ul>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.6, marginBottom: '0', fontSize: '1.05rem', marginTop: '1rem' }}>
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
