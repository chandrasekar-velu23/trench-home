import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "AI/ML Lead, Applied AI for Security | Careers",
  description: "Join Trench as AI/ML Lead, Applied AI for Security and build the models that power Trench's detection brain.",
};

export default function AIMLLeadPage() {
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
                  AI/ML Lead, Applied AI for Security
                </h1>

                <div className="job-tags-row">
                  <span className="job-tag job-tag-dept">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    AI & ML
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
                    Full-time, 8-15 years experience
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="job-quote-callout">
                <p>&quot;We are building the detection brain for Agentic SecOps.&quot;</p>
              </div>

              <div className="job-section-card">
                <h2>ABOUT TRENCH</h2>
                <p>
                  Security Operations is entering a fundamentally different era. AI can change how security signals are understood, correlated and acted upon. But building reliable AI for Security Operations requires more than putting an LLM on top of security data.
                </p>
                <p>
                  Trench is building an agentic operating system for Security Operations. We are looking for an AI/ML Lead, Applied AI for Security to build the models that power Trench&apos;s detection brain, from security-focused SLMs and UEBA to synthetic data, evaluation and production MLOps.
                </p>
                <p>
                  This is a hands-on leadership role. You will set the ML direction, build models that work on real security data and help turn research into production.
                </p>
              </div>

              <div className="job-section-card">
                <h2>THE ROLE</h2>
                <p>
                  You will work across Applied AI, Security ML and MLOps. You will solve hard problems around understanding security telemetry, detecting anomalous behaviour, fine-tuning models for security tasks and building reliable AI systems that operate in production. You will work closely with Security R&D, Detection Engineering and Platform teams to turn model capabilities into trustworthy security outcomes.
                </p>
              </div>

              <div className="job-section-card">
                <h2>WHAT YOU&apos;LL OWN</h2>
                <ul>
                  <li><strong>Security SLMs:</strong> Fine-tune small language models for security tasks such as alert triage, investigation summarization, detection generation and log understanding using approaches such as SFT, LoRA and QLoRA.</li>
                  <li><strong>UEBA & anomaly detection:</strong> Build models that identify anomalous, risky and malicious behaviour across high-cardinality security telemetry using unsupervised, sequence and graph-based approaches.</li>
                  <li><strong>Synthetic security data:</strong> Build pipelines to generate attack and behavioural data for training, augmentation and testing where real-world labels are scarce.</li>
                  <li><strong>ML in production:</strong> Own training, feature engineering, model serving, inference, monitoring, drift detection and feedback loops across the ML lifecycle.</li>
                  <li><strong>Evaluation & red-teaming:</strong> Build rigorous evaluation frameworks, benchmarks and guardrails so models can be measured before and after deployment.</li>
                  <li><strong>Lead the direction:</strong> Stay hands-on, define the ML roadmap and mentor the team as it grows.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>MINDSET</h2>
                <ul>
                  <li>You are a builder. You take models from experiments to production, not just notebooks and papers.</li>
                  <li>You care about measurement. You don&apos;t ship a model you cannot evaluate.</li>
                  <li>You understand the problem before the model. You know when to fine-tune, when to prompt, when to use RAG and when a traditional ML approach is better.</li>
                  <li>You use AI by default. You actively explore agentic frameworks and AI tooling to solve real problems.</li>
                  <li>You work with messy data. Real security data is noisy, incomplete and constantly changing. You enjoy solving that problem.</li>
                  <li>You want to build something new. We are not adding AI to another SIEM. We are building models that can fundamentally change how Security Operations detects and responds to threats.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>WHAT WE&apos;RE LOOKING FOR</h2>
                <ul>
                  <li>8 to 15 years of strong applied ML experience with a track record of shipping ML to production.</li>
                  <li>Hands-on LLM / SLM fine-tuning using SFT, LoRA, QLoRA or similar techniques.</li>
                  <li>Strong judgement on fine-tuning vs prompting vs RAG.</li>
                  <li>Experience building Agentic AI using frameworks such as LangGraph, CrewAI, Agno or similar.</li>
                  <li>Strong MLOps experience across training, serving, experiment tracking, model registry and monitoring.</li>
                  <li>Experience with anomaly detection, UEBA, sequence or graph models.</li>
                  <li>Strong Python and modern ML stack including PyTorch and Hugging Face.</li>
                  <li>Strong evaluation discipline and production mindset.</li>
                  <li>High ownership and comfort working with real-world data.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>BONUS POINTS</h2>
                <ul>
                  <li>Security, fraud or anomaly detection experience.</li>
                  <li>SIEM, EDR, identity or security telemetry experience.</li>
                  <li>Synthetic data generation and programmatic labelling.</li>
                  <li>Model optimization, quantization, distillation or GPU optimization.</li>
                  <li>AI agents with tool use and production workflows.</li>
                  <li>Feature stores and ML over columnar or streaming data.</li>
                  <li>Open-source ML contributions.</li>
                </ul>
              </div>

              <div className="job-section-card">
                <h2>WHY THIS ROLE</h2>
                <p>
                  You will build the intelligence behind a new operating model for Security Operations. The problems are hard:
                </p>
                <ul style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
                  <li>How do we make models understand security telemetry?</li>
                  <li>How do we detect behaviour that static rules cannot?</li>
                  <li>How do we train reliable models when security labels are scarce?</li>
                  <li>How do we make AI agents measurably better over time?</li>
                </ul>
                <p>
                  If these problems excite you, this is the role.
                </p>
              </div>

              <div className="job-apply-card">
                <h2>HOW TO APPLY</h2>
                <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.65, marginBottom: '1rem', fontSize: '1.05rem' }}>
                  Email <a href="mailto:career@trenchsecurity.ai?subject=Application for AI/ML Lead, Applied AI for Security" style={{ color: 'var(--color-primary-100)', fontWeight: 600, textDecoration: 'underline' }}>career@trenchsecurity.ai</a> with a short note about a model you took to production and how you evaluated it. Include your GitHub, papers or LinkedIn.
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
