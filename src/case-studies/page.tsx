import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/animations/ScrollReveal'
import CTASection from '@/components/sections/CTASection'
import { caseStudies } from './caseStudiesData'
import '../resources/resources.css'

// Listing only. Each card links to the existing /case-studies/<slug> page.
export default function CaseStudiesPage() {
  return (
    <main className="resources-page overflow-hidden">
      <section className="resources-hero">
        <ScrollReveal direction="up" className="text-center">
          <span className="resources-eyebrow">Customer Stories</span>
          <h1 className="resources-title">Case Studies</h1>
          <p className="resources-desc">
            How security teams replaced legacy SIEMs and manual SOC workflows with the Trench Agentic Operating System:
            the approach, and the results.
          </p>
        </ScrollReveal>
      </section>

      <section className="resources-container">
        <div className="case-study-grid">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.slug} direction="up" delay={i * 0.1} className="resources-card case-study-card">
              <div className="case-study-logo">
                <img src={cs.logo} alt={`${cs.company} logo`} width={160} height={45} loading="lazy" decoding="async" />
              </div>
              <h2 className="case-study-card-title">
                <Link href={cs.href}>{cs.title}</Link>
              </h2>
              <p className="case-study-card-summary">{cs.summary}</p>
              <ul className="case-study-metrics">
                {cs.metrics.map((m) => (
                  <li key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </li>
                ))}
              </ul>
              <Link href={cs.href} className="resources-btn" aria-label={`Read the ${cs.company} case study`}>
                <span>Read the case study</span>
                <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div style={{ marginTop: '6rem' }}>
        <CTASection />
      </div>

      <style>{`
        .case-study-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2rem;
          max-width: 1240px;
          margin: 0 auto;
        }
        .case-study-card { gap: 1rem; }
        .case-study-logo { height: 44px; display: flex; align-items: center; }
        .case-study-logo img { height: 36px; width: auto; max-width: 170px; object-fit: contain; }
        .case-study-card-title {
          font-family: var(--font-primary);
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.35;
          color: var(--color-neutral-800, #2B2B2B);
          margin: 0;
          text-wrap: balance;
        }
        .case-study-card-title a { color: inherit; text-decoration: none; }
        .case-study-card-title a:hover { color: var(--color-primary-100); }
        .case-study-card-summary {
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--color-neutral-600);
          margin: 0;
        }
        .case-study-metrics {
          list-style: none;
          margin: 0.25rem 0 0;
          padding: 1rem 0 0;
          border-top: 1px solid rgba(49, 82, 185, 0.12);
          display: grid;
          gap: 0.7rem;
        }
        .case-study-metrics li {
          display: grid;
          grid-template-columns: 6.75rem 1fr;
          gap: 0.75rem;
          align-items: baseline;
        }
        .case-study-metrics strong {
          font-family: var(--font-primary);
          font-weight: 800;
          font-size: 1rem;
          color: var(--color-primary-100);
          font-variant-numeric: tabular-nums;
        }
        .case-study-metrics span { font-size: 0.82rem; line-height: 1.5; color: var(--color-neutral-600); }
        @media (max-width: 1100px) { .case-study-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) {
          .case-study-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .case-study-metrics li { grid-template-columns: 5.75rem 1fr; }
        }
      `}</style>
    </main>
  )
}
