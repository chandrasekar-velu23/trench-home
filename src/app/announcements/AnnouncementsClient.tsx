"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import "./announcements.css";

/* ---- Types ---- */
type ContentBlock =
  | { type: "intro" | "paragraph" | "heading" | "closing"; text: string }
  | { type: "list"; items: string[] }
  | { type: "innovations"; items: { label: string; desc: string }[] };

interface Announcement {
  id: string;
  date: string;
  category: string;
  categoryColor: "accent" | "primary" | "secondary";
  title: string;
  badge: string | null;
  badgeAlt: string | null;
  content: ContentBlock[];
  cta?: { label: string; href: string };
}

/* ---- Data ---- */
const announcements: Announcement[] = [
  {
    id: "products-that-count-2026",
    date: "July 2026",
    category: "Award",
    categoryColor: "accent",
    title:
      "Trench Security Wins a 2026 Product Award for its Innovation in Cybersecurity",
    badge: "/awards/2025 Products Awards Winner.png",
    badgeAlt: "2026 Products That Count Award Winner Badge",
    content: [
      {
        type: "intro",
        text: "Trench Security is a 2026 Product Awards winner, recognized by Products That Count, the world's largest product community.",
      },
      {
        type: "paragraph",
        text: "Two convictions have guided the Trench journey from day one:",
      },
      {
        type: "list",
        items: [
          "Pick the problem that's genuinely hard.",
          "Build empathetic systems for the people who have to use them.",
        ],
      },
      {
        type: "paragraph",
        text: "Cybersecurity has a gap most industries don't: an adversary that innovates faster than defenders do. That makes value creation a moving target. Threat detection and response has always been broken because monitoring infrastructure was never built for that asymmetry. Trench was built to take on this problem because it's unforgiving, and unforgiving problems are the ones worth solving.",
      },
      {
        type: "paragraph",
        text: "For security teams, empathy comes down to one thing: actionability. It's also the hardest thing to deliver, buried under a mountain of noisy security data. So Trench was built around a single design principle: make actionability the outcome, not an afterthought.",
      },
      {
        type: "heading",
        text: "What's Behind the Award",
      },
      {
        type: "paragraph",
        text: "That design principle shows up in three innovations at the core of the Trench platform:",
      },
      {
        type: "innovations",
        items: [
          {
            label: "Headless SecOps delivery model",
            desc: "A shift away from dashboards and human-gated queues toward an agentic operating model, where AI agents act on threats directly instead of routing everything through a human-in-the-loop bottleneck.",
          },
          {
            label: "Intent graph-based threat detection",
            desc: "Instead of matching signatures or static rules, Trench maps the intent behind activity across an environment, connecting related signals into a graph that reveals what an adversary is actually trying to do.",
          },
          {
            label: "TASC, the world's first semantic layer for security",
            desc: "A layer that gives raw security data shared meaning and context across tools and sources, so detection and response can act on understanding rather than isolated alerts.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Together, these are what turn actionability from a stated goal into a built-in outcome and they're the reason Products That Count recognized Trench this year.",
      },
      {
        type: "closing",
        text: "This recognition from Products That Count validates that bet. Credit goes to the entire Trench Security team. Building products that count, always.",
      },
    ],
  },
  {
    id: "latest-blog-post",
    date: "July 2026",
    category: "Blog",
    categoryColor: "primary",
    title: "The Agent Is Not the Product. The Foundation Is.",
    badge: null,
    badgeAlt: null,
    content: [
      {
        type: "intro",
        text: "Our latest thinking on why the infrastructure beneath an AI agent matters more than the agent itself, and what that means for the future of agentic SecOps.",
      },
    ],
    cta: {
      label: "Read the Full Article",
      href: "/blog/the-agent-is-not-the-product-the-foundation-is",
    },
  },
];

/* ---- Animation variants ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

/* ---- Component ---- */
export default function AnnouncementsClient() {
  return (
    <main className="announcements-page overflow-hidden">
      {/* Hero */}
      <section className="announcements-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <span className="announcements-eyebrow">
            News &amp; Announcements
          </span>
          <h1 className="announcements-title">What&apos;s Happening at Trench</h1>
          <p className="announcements-desc">
            Milestones, awards, and key moments from the team building the future of SecOps.
          </p>
        </motion.div>
      </section>

      {/* Announcements Column */}
      <section className="announcements-container">
        <div className="announcements-column">
          {announcements.map((item, i) => (
            <motion.article
              key={item.id}
              id={item.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="announcement-card"
              aria-label={item.title}
            >
              {/* Card Header */}
              <div className="announcement-card-header">
                <div className="announcement-meta-row">
                  <span className={`announcement-category-badge badge-${item.categoryColor}`}>
                    {item.category}
                  </span>
                  <span className="announcement-date">
                    {item.date}
                  </span>
                </div>
                <h2 className="announcement-card-title">{item.title}</h2>
              </div>

              {/* Badge Image */}
              {item.badge && (
                <div className="announcement-badge-wrap">
                  <Image
                    src={item.badge}
                    alt={item.badgeAlt ?? "Award Badge"}
                    width={200}
                    height={200}
                    className="announcement-badge-img"
                    priority={i === 0}
                  />
                </div>
              )}

              {/* Content Body */}
              <div className="announcement-body">
                {item.content.map((block, bi) => {
                  if (block.type === "intro" || block.type === "paragraph") {
                    return (
                      <p
                        key={bi}
                        className={block.type === "intro" ? "announcement-intro" : "announcement-para"}
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "heading") {
                    return (
                      <h3 key={bi} className="announcement-subheading">
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === "closing") {
                    return (
                      <p key={bi} className="announcement-closing">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ol key={bi} className="announcement-list">
                        {block.items.map((itm: string, ii: number) => (
                          <li key={ii} className="announcement-list-item">
                            <span className="list-number" aria-hidden="true">{ii + 1}</span>
                            {itm}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  if (block.type === "innovations") {
                    return (
                      <div key={bi} className="innovations-grid">
                        {block.items.map((itm: { label: string; desc: string }, ii: number) => (
                          <div key={ii} className="innovation-card">
                            <span className="innovation-number">
                              {String(ii + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <strong className="innovation-label">{itm.label}</strong>
                              <p className="innovation-desc">{itm.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })}

                {/* Optional CTA */}
                {item.cta && (
                  <Link href={item.cta.href} className="announcement-cta">
                    {item.cta.label}
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="announcements-back"
        >
          <Link href="/" className="back-link">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
