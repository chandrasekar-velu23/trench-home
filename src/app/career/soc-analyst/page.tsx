import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "SOC Analyst (Level 1–2) | Careers",
  description: "Join Trench as a SOC Analyst and be on the frontline of our Security Operations Center, helping identify, assess, and respond to cyber threats.",
};

export default function SOCAnalystPage() {
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
                SOC Analyst (Level 1–2)
              </h1>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--color-neutral-500)', fontSize: '1rem', fontWeight: 500, marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <span>On-site</span>
                <span>•</span>
                <span>Security Operations</span>
                <span>•</span>
                <span>2+ Years experience</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} className="job-details-section">
              <h2>COMPANY OVERVIEW</h2>
              <p>
                TrenchSecurity.ai is an advanced cybersecurity solutions provider specializing in AI-powered threat detection, real-time incident response, and cutting-edge security automation. Our mission is to stay ahead of evolving cyber threats and ensure our clients' digital assets are secure and resilient.
              </p>

              <h2>JOB SUMMARY</h2>
              <p>
                We are looking for a motivated and detail-oriented SOC Analyst with 2+ years of hands-on experience in security monitoring, threat analysis, and incident response. You will be on the frontline of our Security Operations Center, helping to identify, assess, and respond to cyber threats using industry-leading tools and AI-based threat intelligence.
              </p>

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

              <h2>REQUIREMENTS</h2>
              <ul>
                <li>Bachelor's degree in Computer Science, Cybersecurity, or related field, or equivalent practical experience.</li>
                <li>2+ years of SOC or information security experience.</li>
                <li>Familiarity with SIEM tools, threat intelligence platforms, and EDR solutions.</li>
                <li>Understanding of TCP/IP, firewalls, VPN, IDS/IPS, and common attack vectors.</li>
                <li>Knowledge of MITRE ATT&CK, NIST, and basic incident response methodologies.</li>
                <li>Scripting or automation skills (e.g., Python, PowerShell) is a plus.</li>
                <li>Certifications such as CompTIA Security+, CySA+, CEH, or Splunk Certified User are advantageous.</li>
              </ul>

              <h2>PREFERRED SKILLS</h2>
              <ul>
                <li>Experience in cloud environments (AWS, Azure, GCP).</li>
                <li>Exposure to AI/ML-driven security tools or SOAR platforms.</li>
                <li>Strong analytical, communication, and teamwork skills.</li>
                <li>A curious, proactive mindset with a passion for cybersecurity.</li>
              </ul>

              <h2>WHAT WE OFFER</h2>
              <ul>
                <li>Opportunity to work with cutting-edge AI-driven cybersecurity tools.</li>
                <li>Collaborative environment with a strong focus on learning and development.</li>
                <li>Competitive salary and benefits package.</li>
                <li>Exposure to complex, real-world security threats across various industries.</li>
              </ul>

              <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, color: '#000000', marginBottom: '1rem' }}>HOW TO APPLY</h2>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.6, marginBottom: '0', fontSize: '1.05rem' }}>
                  Apply now and become part of a mission-driven team that's shaping the future of AI-powered cybersecurity. Send your application to <a href="mailto:career@trenchsecurity.ai?subject=Application for SOC Analyst (Level 1–2)" style={{ color: 'var(--color-primary-100)', fontWeight: 600, textDecoration: 'underline' }}>career@trenchsecurity.ai</a>.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
