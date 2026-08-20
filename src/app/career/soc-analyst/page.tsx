import { redirect } from "next/navigation";

// Hidden for now - redirects to careers listing page
export default function SOCAnalystPage() {
  redirect("/career");
}

/*
import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "SOC Analyst (Level 1-2) | Careers",
  description: "Join Trench as a SOC Analyst and be on the frontline of our Security Operations Center, helping identify, assess, and respond to cyber threats.",
};

export default function SOCAnalystPage() {
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
                  SOC Analyst (Level 1-2)
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
                    On-site
                  </span>
                  <span className="job-tag job-tag-type">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Full-time, 2+ Years experience
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="job-section-card">
                <h2>COMPANY OVERVIEW</h2>
                <p>
                  TrenchSecurity.ai is an advanced cybersecurity solutions provider specializing in AI-powered threat detection, real-time incident response, and cutting-edge security automation. Our mission is to stay ahead of evolving cyber threats and ensure our clients&apos; digital assets are secure and resilient.
                </p>
              </div>

              <div className="job-section-card">
                <h2>JOB SUMMARY</h2>
                <p>
                  We are looking for a motivated and detail-oriented SOC Analyst with 2+ years of hands-on experience in security monitoring, threat analysis, and incident response. You will be on the frontline of our Security Operations Center, helping to identify, assess, and respond to cyber threats using industry-leading tools and AI-based threat intelligence.
                </p>
              </div>

              <div className="job-section-card">
                <h2>KEY RESPONSIBILITIES</h2>
                <ul>
                  <li>Perform security posture assessments for customers, identifying gaps in logging and detection capabilities.</li>
                  <li>Collaborate with new customers to successfully onboard them onto the Trench AI platform.</li>
                  <li>Monitor security alerts/incidents using Trench AI Platform.</li>
                  <li>Triage and investigate potential security incidents and escalate as necessary.</li>
                  <li>Analyze logs, network traffic, and endpoint data to identify indicators of compromise (IOCs).</li>
                  <li>Document findings, create incident reports, and maintain case records.</li>
                  <li>Collaborate with internal teams to respond to threats and provide feedback to improvise detection and playbook capabilities.</li>
                  <li>Conduct basic threat hunting and support proactive detection initiatives.</li>
                  <li>Participate in shift rotations (if 24/7 SOC) and support on-call duties as required.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>REQUIREMENTS</h2>
                <ul>
                  <li>Bachelor&apos;s degree in Computer Science, Cybersecurity, or related field, or equivalent practical experience.</li>
                  <li>2+ years of SOC or information security experience.</li>
                  <li>Familiarity with SIEM tools, threat intelligence platforms, and EDR solutions.</li>
                  <li>Understanding of TCP/IP, firewalls, VPN, IDS/IPS, and common attack vectors.</li>
                  <li>Knowledge of MITRE ATT&CK, NIST, and basic incident response methodologies.</li>
                  <li>Scripting or automation skills (e.g., Python, PowerShell) is a plus.</li>
                  <li>Certifications such as CompTIA Security+, CySA+, CEH, or Splunk Certified User are advantageous.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>PREFERRED SKILLS</h2>
                <ul>
                  <li>Experience in cloud environments (AWS, Azure, GCP).</li>
                  <li>Exposure to AI/ML-driven security tools or SOAR platforms.</li>
                  <li>Strong analytical, communication, and teamwork skills.</li>
                  <li>A curious, proactive mindset with a passion for cybersecurity.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>WHAT WE OFFER</h2>
                <ul>
                  <li>Opportunity to work with cutting-edge AI-driven cybersecurity tools.</li>
                  <li>Collaborative environment with a strong focus on learning and development.</li>
                  <li>Competitive salary and benefits package.</li>
                  <li>Exposure to complex, real-world security threats across various industries.</li>
                </ul>
              </div>

              <div className="job-apply-card">
                <h2>HOW TO APPLY</h2>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.6, marginBottom: '0', fontSize: '1.05rem' }}>
                  Apply now and become part of a mission-driven team that&apos;s shaping the future of AI-powered cybersecurity. Send your application to <a href="mailto:career@trenchsecurity.ai?subject=Application for SOC Analyst (Level 1-2)" style={{ color: 'var(--color-primary-100)', fontWeight: 600, textDecoration: 'underline' }}>career@trenchsecurity.ai</a>.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
*/
