"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Calendar, User, Clock, Play } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import CTASection from "@/components/sections/CTASection";
import "../resources.css";

interface WebinarItem {
  id: string;
  title: string;
  speaker: string;
  role: string;
  duration: string;
  date: string;
  youtubeId: string;
  isPlaylist?: boolean;
  description: string;
  youtubeUrl: string;
  tag: string;
}

const WEBINAR_ITEMS: WebinarItem[] = [
  {
    id: "episode-1",
    title: "Why AI is the top of mind for Risk management leaders",
    speaker: "Subhro",
    role: "Risk Management Leader",
    duration: "27:30",
    date: "Sept 2025",
    youtubeId: "qS4_wimD8Eo",
    description: "Risk management leaders share their top of mind and insights in the AI transformation process, how organisations are rethinking risk frameworks in a world where AI is both the tool and the threat surface.",
    youtubeUrl: "https://www.youtube.com/watch?v=qS4_wimD8Eo",
    tag: "Risk Management"
  },
  {
    id: "episode-2",
    title: "AI adoption in Security Operations",
    speaker: "Mayank",
    role: "Security Operations Leader",
    duration: "47:42",
    date: "Sept 2025",
    youtubeId: "dwdJ0cXDNks",
    description: "Deep dive discussion on AI adoption trends and operational challenges in modern Security Operations, from alert fatigue to autonomous response, what actually works in practice.",
    youtubeUrl: "https://www.youtube.com/watch?v=dwdJ0cXDNks",
    tag: "Security Operations"
  },
  {
    id: "episode-3",
    title: "CISO Chronicles in the AI Era",
    speaker: "Sammit",
    role: "CISO",
    duration: "32:21",
    date: "Feb 2026",
    youtubeId: "xZPAxU_HhGc",
    description: "Chronicles and strategic perspectives of leading CISOs guiding their organisations through the AI era, governance, trust, and the board-level conversation around AI-native security.",
    youtubeUrl: "https://www.youtube.com/watch?v=xZPAxU_HhGc",
    tag: "CISO Perspectives"
  }
];

export default function WebinarsPage() {
  return (
    <main className="resources-page overflow-hidden">

      {/* Hero */}
      <section className="resources-hero">
        <ScrollReveal direction="up" className="text-center">
          <span className="resources-eyebrow">Webinars &amp; Podcasts</span>
          <h1 className="resources-title">CISO Chronicles in the AI World</h1>
          <p className="resources-desc">
            Info sec leaders sharing their top of mind and insights in the AI transformation process.
            Deep dive discussions featuring perspectives from security leaders across risk, operations, and the C-suite.
          </p>
          <Link
            href="https://youtube.com/playlist?list=PLp-IDMGn5uvAWY34bqcz_JTUj4X943VUi&si=1wT36GG_Ll9qCBjJ"
            target="_blank"
            rel="noopener noreferrer"
            className="resources-btn"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}
          >
            <Play size={14} />
            <span>View Full Playlist on YouTube</span>
            <ExternalLink size={13} />
          </Link>
        </ScrollReveal>
      </section>

      {/* Episode Cards Column */}
      <section className="resources-container">
        <div className="webinar-column">
          {WEBINAR_ITEMS.map((item, i) => (
            <ScrollReveal key={item.id} direction="up" delay={i * 0.1}>
              <article className="webinar-card">

                {/* Left - Embed */}
                <div className="webinar-embed-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.youtubeId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="webinar-iframe"
                  />
                </div>

                {/* Right - Content */}
                <div className="webinar-content">
                  <div className="webinar-top">
                    <span className="resources-badge badge-secondary">{item.tag}</span>
                    <span className="webinar-ep-label">Episode {i + 1}</span>
                  </div>

                  <h2 className="webinar-title">{item.title}</h2>

                  <div className="video-meta-row" style={{ marginBottom: "1rem" }}>
                    <span className="video-meta-item">
                      <User size={13} /> {item.speaker}
                    </span>
                    <span className="video-meta-item">
                      <Clock size={13} /> {item.duration}
                    </span>
                    <span className="video-meta-item">
                      <Calendar size={13} /> {item.date}
                    </span>
                  </div>

                  <p className="webinar-desc">{item.description}</p>

                  <Link
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resources-btn"
                    style={{ alignSelf: "flex-start", marginTop: "auto" }}
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ marginTop: "6rem" }}>
        <CTASection />
      </div>

      <style jsx>{`
        /* Column layout */
        .webinar-column {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Card - side-by-side on desktop */
        .webinar-card {
          display: grid;
          grid-template-columns: 480px 1fr;
          background: #ffffff;
          border: 1px solid var(--color-neutral-200, #E2E8F0);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(13, 65, 225, 0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          /* same height for all cards */
          align-items: stretch;
        }

        .webinar-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(13, 65, 225, 0.1);
          border-color: var(--color-primary-100, #0D41E1);
        }

        /* Embed - fixed 16:9 box */
        .webinar-embed-wrap {
          position: relative;
          width: 100%;
          /* fixed height matching 480px wide at 16:9 */
          height: 270px;
          background: #0b1126;
          flex-shrink: 0;
        }

        .webinar-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        /* Content */
        .webinar-content {
          display: flex;
          flex-direction: column;
          padding: 2rem 2rem 1.75rem;
          gap: 0.75rem;
          /* stretch to fill card height */
          height: 100%;
          min-height: 270px;
          box-sizing: border-box;
        }

        .webinar-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        .webinar-ep-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-neutral-500, #64748B);
        }

        .webinar-title {
          font-family: var(--font-primary);
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.35;
          color: var(--color-text-secondary, #1E293B);
          margin: 0;
          flex-shrink: 0;
          /* clamp to 2 lines so all cards look alike */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .webinar-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--color-neutral-500, #64748B);
          margin: 0;
          /* description takes up available space */
          flex: 1;
          /* clamp to 4 lines for uniform look */
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* button pinned to bottom */
        .webinar-watch-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 13px;
          font-weight: 700;
          color: var(--color-primary-100);
          text-decoration: none;
          padding-top: 0.5rem;
          margin-top: auto;
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .webinar-watch-btn:hover { color: var(--color-primary-200, #1E3EB0); }

        /* TABLET  < 1024px  - keep side by side,
           but reduce embed to fit narrower screen */
        @media (max-width: 1024px) {
          .webinar-card {
            grid-template-columns: 360px 1fr;
          }
          .webinar-embed-wrap {
            height: 203px;
          }
          .webinar-content {
            min-height: 203px;
            padding: 1.5rem;
          }
          .webinar-title {
            font-size: 1.05rem;
          }
        }

        /* MOBILE  < 768px  - stack: embed on top,
           content below. Every card is identical width */
        @media (max-width: 768px) {
          .webinar-column {
            gap: 1.5rem;
          }

          .webinar-card {
            /* single column - embed above, content below */
            grid-template-columns: 1fr;
            border-radius: 16px;
          }

          /* 16:9 full-width embed */
          .webinar-embed-wrap {
            width: 100%;
            height: auto;
            /* aspect-ratio drives the height on mobile */
            aspect-ratio: 16 / 9;
            min-height: 180px;
          }

          .webinar-content {
            padding: 1.25rem 1.25rem 1.5rem;
            min-height: unset;
            height: auto;
            gap: 0.6rem;
          }

          .webinar-title {
            font-size: 1rem;
            line-height: 1.4;
            -webkit-line-clamp: 3;
          }

          .webinar-desc {
            font-size: 0.875rem;
            line-height: 1.6;
            -webkit-line-clamp: 5;
          }

          .video-meta-row {
            flex-wrap: wrap;
            gap: 0.5rem 0.9rem;
            font-size: 0.78rem;
            margin-bottom: 0.5rem !important;
          }

          .webinar-watch-btn {
            font-size: 0.82rem;
            padding-top: 0.4rem;
          }
        }

        /* SMALL PHONES  < 400px */
        @media (max-width: 400px) {
          .webinar-content {
            padding: 1rem;
          }
          .webinar-title {
            font-size: 0.95rem;
          }
          .webinar-desc {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </main>
  );
}
