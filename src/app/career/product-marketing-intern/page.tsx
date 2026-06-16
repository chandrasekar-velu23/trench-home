import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Product Marketing Intern | Careers",
  description: "Join Trench as a Product Marketing Intern and own Trench's voice and product messaging.",
};

export default function ProductMarketingInternPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
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
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Careers
            </Link>

            <ScrollReveal direction="up">
              <h1 className="title-md" style={{ color: '#000000', marginBottom: '1rem', fontSize: '2.5rem' }}>
                Product Marketing Intern
              </h1>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--color-neutral-500)', fontSize: '1rem', fontWeight: 500, marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <span>Bengaluru, India</span>
                <span>•</span>
                <span>Paid</span>
                <span>•</span>
                <span>6 Months</span>
                <span>•</span>
                <span>Fresher or 1+ year experience</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1} className="job-details-section">
              <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#000000', fontStyle: 'italic', borderLeft: '4px solid var(--color-primary-100)', paddingLeft: '1.5rem', margin: '2rem 0' }}>
                "Cybersecurity is drowning in noise. We don't need someone to generate content. We need someone to make the industry stop scrolling."
              </p>

              <h2>ABOUT TRENCH</h2>
              <p>
                The legacy SIEM is dead. Bloated toolchains, alert storms, SOC playbooks written for a world that no longer exists. Trench is an AI-native cybersecurity platform built on one conviction: security teams deserve decisions, not more data. We are not improving the status quo. We are replacing it.
              </p>

              <h2>THE ROLE</h2>
              <p>
                You will own Trench's voice and product messaging across every channel -- the bridge between what we build and why the world should care. LinkedIn posts that make a CISO stop scrolling. One-pagers that reframe how buyers think. Videos that make agentic SecOps feel obvious.
              </p>

              <h2>WHAT YOU'LL OWN</h2>
              <ul>
                <li><strong>Social:</strong> Strategy, cadence, and platform voice across LinkedIn, X, and short-form video.</li>
                <li><strong>Product Messaging:</strong> Positioning and persona-specific narratives for CISOs, SOC analysts, and buyers.</li>
                <li><strong>Collateral:</strong> One-pagers, battle cards, and event materials that turn product depth into buyer clarity.</li>
                <li><strong>Video + Events:</strong> Short-form storytelling and Trench's end-to-end presence at industry events.</li>
              </ul>

              <h2>MINDSET</h2>
              <ul>
                <li>Features don't sell. Problems do. Product messaging is the job, not a byproduct of it.</li>
                <li>Cybersecurity is complex. Making it simple without dumbing it down is rare -- and exactly what we need.</li>
                <li>Volume is not the goal. Impact is. You know the difference between content that exists and content that matters.</li>
                <li>You ship before you ask for feedback. Ambiguity is the environment, not the exception.</li>
              </ul>

              <h2>SKILLS</h2>
              <ul>
                <li>Tech background with genuine curiosity toward cybersecurity -- domain interest is non-negotiable.</li>
                <li>Strong writing with a distinct voice across formats -- taglines, messaging docs, social posts.</li>
                <li>Ability to read dense technical content and extract the story buried inside it.</li>
                <li>Comfortable with design and video tools, or hungry to learn fast.</li>
              </ul>

              <h2>WHAT WE'RE NOT LOOKING FOR</h2>
              <ul>
                <li>Someone who uses AI to generate content and calls it done.</li>
                <li>Someone with no real interest in technology or cybersecurity.</li>
                <li>Someone who measures success by volume -- posts, assets, impressions.</li>
                <li>Someone who treats messaging as separate from the product.</li>
              </ul>

              <h2>WHAT YOU GET</h2>
              <ul>
                <li>Build a career as a next-generation storyteller in the AI-native marketing world -- before most people know that's the career to build.</li>
                <li>Real ownership over Trench's voice and messaging at the stage when both are still being defined.</li>
                <li>Direct access to the founding team across product, sales, and strategy.</li>
                <li>A portfolio that proves you can make one of the most complex domains feel urgent and human.</li>
              </ul>

              <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <h3 className="title-sm" style={{ color: '#000000', marginBottom: '1.5rem' }}>Ready to make the industry stop scrolling?</h3>
                <a href="mailto:career@trenchsecurity.ai?subject=Application for Product Marketing Intern" className="btn-primary" style={{ display: 'inline-block', padding: '1rem 2.5rem', fontSize: '1rem', fontFamily: 'var(--font-poppins), sans-serif', textDecoration: 'none' }}>
                  Apply for this position
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
