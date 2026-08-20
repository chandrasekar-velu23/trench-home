import type { Metadata } from "next";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import CareerListings from "./CareerListings";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Trench and help us build the future of agentic security operations.",
  alternates: {
    canonical: "https://www.trenchsecurity.ai/career",
  },
};

const JOBS = [
  {
    id: "lead-agentic-secops",
    title: "AI Security Lead",
    department: "Security Operations",
    location: "Bengaluru, India",
    type: "Full-time, 6-12 years experience",
    description: "We are rewriting how Security Operations is practised. This is not a traditional SOC leadership role. You will help forward-looking security teams move from the traditional SOC model to an agentic operating model.",
    link: "/career/lead-agentic-secops"
  },
  {
    id: "ai-ml-lead",
    title: "AI/ML Lead",
    department: "AI & ML",
    location: "Bengaluru, India",
    type: "Full-time, 8-15 years experience",
    description: "We are building the detection brain for Agentic SecOps. This is a hands-on leadership role to build the models that power Trench's detection brain, from security-focused SLMs and UEBA to synthetic data, evaluation and production MLOps.",
    link: "/career/ai-ml-lead"
  },
  {
    id: "product-marketing-intern",
    title: "Product Marketing Intern",
    department: "Marketing",
    location: "Bengaluru, India",
    type: "Paid, 6 Months, Fresher or 1+ yr exp",
    description: "Cybersecurity is drowning in noise. We don't need someone to generate content. We need someone to make the industry stop scrolling.",
    link: "/career/product-marketing-intern"
  },
  {
    id: "ai-lead-security-rd",
    title: "R&D AI Tech Lead",
    department: "Engineering",
    location: "Bengaluru, India",
    type: "Full-time, 6-12 years experience",
    description: "We are building the technical core of Agentic SecOps. This is a builder's leadership role, you will set technical direction, lead a small senior team and stay hands-on.",
    link: "/career/ai-lead-security-rd"
  },
  {
    id: "soc-analyst",
    title: "SOC Analyst (Level 1-2)",
    department: "Security Operations",
    location: "On-site",
    type: "Full-time, 2+ Years experience",
    description: "Be on the frontline of our Security Operations Center, helping to identify, assess, and respond to cyber threats using industry-leading tools and AI-based threat intelligence.",
    link: "/career/soc-analyst"
  }
];

export default function CareerPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ── Controls Card ── */
        .career-controls-card {
          max-width: 1000px;
          margin: 0 auto 2.5rem;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 0.85rem 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .career-controls-card.is-open {
          padding: 1.25rem 1.5rem;
          box-shadow: 0 8px 30px rgba(13, 65, 225, 0.06);
          border-color: rgba(13, 65, 225, 0.2);
        }

        /* ── Search Bar ── */
        .career-search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .career-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-neutral-400);
          pointer-events: none;
          z-index: 2;
        }
        .career-search-input {
          width: 100%;
          padding: 0.85rem 7.5rem 0.85rem 2.85rem;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #f8fafc;
          font-size: 0.95rem;
          font-family: var(--font-poppins), sans-serif;
          color: #000;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .career-search-input::placeholder {
          color: var(--color-neutral-400);
        }
        .career-search-input:focus {
          border-color: var(--color-primary-100);
          box-shadow: 0 0 0 3px rgba(13, 65, 225, 0.08);
          background: #ffffff;
        }

        /* ── Actions inside search bar ── */
        .career-search-actions {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          z-index: 2;
        }
        .career-search-clear {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-neutral-400);
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          transition: color 0.15s ease;
        }
        .career-search-clear:hover {
          color: var(--color-neutral-700);
        }
        .career-filter-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: #ffffff;
          color: var(--color-neutral-600);
          font-size: 0.8rem;
          font-weight: 600;
          font-family: var(--font-poppins), sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .career-filter-toggle-btn:hover,
        .career-filter-toggle-btn.active {
          border-color: #0D41E1;
          color: #0D41E1;
          background: rgba(13, 65, 225, 0.04);
        }
        .career-filter-toggle-btn.has-filters {
          background: #0D41E1;
          color: #ffffff;
          border-color: #0D41E1;
        }
        .career-filter-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #ffffff;
          color: #0D41E1;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .career-chevron-icon {
          transition: transform 0.25s ease;
        }
        .career-chevron-icon.rotate {
          transform: rotate(180deg);
        }

        /* ── Collapsible Drawer ── */
        .career-dropdown-drawer {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
          transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .career-dropdown-drawer.show {
          max-height: 400px;
          opacity: 1;
          pointer-events: auto;
          margin-top: 1.15rem;
        }

        /* ── Filters Layout inside Drawer ── */
        .career-filters-container {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-top: 0.5rem;
          padding-bottom: 0.85rem;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .career-filter-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .career-filter-label {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          min-width: 105px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-neutral-500);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: var(--font-poppins), sans-serif;
          flex-shrink: 0;
        }
        .career-filter-label svg {
          color: var(--color-neutral-400);
        }
        .career-filter-pills {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .career-filter-pill {
          padding: 0.32rem 0.85rem;
          border-radius: 100px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #f8fafc;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--color-neutral-600);
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: var(--font-poppins), sans-serif;
          white-space: nowrap;
        }
        .career-filter-pill:hover {
          border-color: rgba(13, 65, 225, 0.4);
          color: #0D41E1;
          background: rgba(13, 65, 225, 0.04);
        }
        .career-filter-pill.active {
          background: #0D41E1;
          color: #ffffff;
          border-color: #0D41E1;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(13, 65, 225, 0.25);
        }

        /* ── Controls Footer ── */
        .career-controls-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .career-results-count {
          font-size: 0.85rem;
          color: var(--color-neutral-500);
          font-family: var(--font-poppins), sans-serif;
        }
        .career-results-count strong {
          color: #000000;
          font-weight: 600;
        }
        .career-clear-all {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
          border: 1px solid rgba(220, 38, 38, 0.2);
          background: rgba(220, 38, 38, 0.04);
          color: #dc2626;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-poppins), sans-serif;
          transition: all 0.15s ease;
        }
        .career-clear-all:hover {
          background: rgba(220, 38, 38, 0.1);
          border-color: #dc2626;
        }
        .career-close-drawer-btn {
          padding: 0.25rem 0.85rem;
          border-radius: 6px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: #ffffff;
          color: var(--color-neutral-700);
          font-size: 0.8rem;
          font-weight: 600;
          font-family: var(--font-poppins), sans-serif;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .career-close-drawer-btn:hover {
          background: #f1f5f9;
          border-color: rgba(0, 0, 0, 0.2);
        }

        /* ── Compact Phase Badge ── */
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

        /* ── Job Cards ── */
        .career-card {
          padding: 2.25rem 2.5rem;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background-color: #ffffff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .career-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
          border-color: rgba(13, 65, 225, 0.15);
        }
        .career-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .career-card-info {
          flex: 1;
          min-width: 280px;
        }
        .career-card-action {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        /* ── Sized-down Global Secondary Button ── */
        :global(.career-view-details-btn) {
          width: 142px !important;
          height: 37px !important;
          transition: transform 0.2s ease, opacity 0.2s ease !important;
        }
        :global(.career-view-details-btn:hover) {
          transform: scale(1.03) !important;
        }
        :global(.career-view-details-btn .button-text) {
          font-size: 11px !important;
          letter-spacing: 1.1px !important;
          font-weight: 700 !important;
          margin-top: -1px !important;
        }

        /* ── Tags on Cards ── */
        .career-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .career-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.75rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          font-family: var(--font-poppins), sans-serif;
          white-space: nowrap;
        }
        .career-tag-dept {
          background: rgba(13, 65, 225, 0.07);
          color: #0D41E1;
        }
        .career-tag-loc {
          background: rgba(16, 185, 129, 0.07);
          color: #059669;
        }
        .career-tag-type {
          background: rgba(245, 158, 11, 0.08);
          color: #b45309;
        }

        /* ── Empty State ── */
        .career-empty-state {
          text-align: center;
          padding: 4rem 2rem;
          border: 2px dashed rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fafafa;
        }
        .career-reset-btn {
          padding: 0.55rem 1.25rem;
          border-radius: 8px;
          border: 1px solid #0D41E1;
          background: transparent;
          color: #0D41E1;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-poppins), sans-serif;
          transition: all 0.2s ease;
        }
        .career-reset-btn:hover {
          background: #0D41E1;
          color: #ffffff;
        }

        /* ── Mobile Responsive ── */
        @media (max-width: 640px) {
          .career-controls-card { padding: 0.75rem; }
          .career-card { padding: 1.5rem; }
          .career-search-input { padding-right: 6.5rem; }
          .career-filter-label { min-width: 100%; margin-bottom: -0.25rem; }
          .career-tag-row { gap: 0.35rem; }
          .career-tag { font-size: 0.75rem; padding: 0.25rem 0.6rem; }
          .career-card-header { flex-direction: column; align-items: flex-start; }
          .career-card-action { width: 100%; }
          :global(.career-view-details-btn) { width: 100% !important; }
        }
      `}} />
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        <div className="page-main overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
          <div className="container-wide">
            <ScrollReveal direction="up" className="text-center" style={{ marginBottom: '2.5rem' }}>
              <TextReveal text="Careers at Trench" as="h1" className="title-lg" style={{ justifyContent: "center", width: "100%", color: 'var(--color-primary-100)' }} />
              <p className="body-lead" style={{ maxWidth: '800px', margin: '1.25rem auto 0', color: 'var(--color-neutral-600)' }}>
                We're on a mission to build the first truly agentic operating system for security operations. Join us in making the impossible possible.
              </p>
            </ScrollReveal>

            <CareerListings jobs={JOBS} />
          </div>
        </div>
      </main>
    </>
  );
}
