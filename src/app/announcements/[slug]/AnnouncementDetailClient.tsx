"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Announcement, RichSegment } from "../announcementsData";
import CTASection from "@/components/sections/CTASection";
import "../announcements.css";

interface Props {
  item: Announcement;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function AnnouncementDetailClient({ item }: Props) {
  return (
    <main className="announcements-page overflow-hidden">
      {/* Back nav */}
      <div className="announcements-container" style={{ paddingBottom: 0 }}>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/announcements" className="back-link">
            <ArrowLeft size={15} />
            All Announcements
          </Link>
        </motion.div>
      </div>

      {/* Detail card */}
      <section className="announcements-container" style={{ marginTop: "2rem" }}>
        <motion.article
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="announcement-detail-card"
          aria-label={item.title}
        >
          {/* Header */}
          <div className="announcement-card-header">
            <div className="announcement-meta-row">
              <span className={`announcement-category-badge badge-${item.categoryColor}`}>
                {item.category}
              </span>
              <span className="announcement-date">{item.date}</span>
            </div>
            <h1 className="announcement-detail-title">{item.title}</h1>
          </div>

          {/* Badge */}
          {item.badge && (
            <div className="announcement-badge-wrap">
              <Image
                src={item.badge}
                alt={item.badgeAlt}
                width={200}
                height={200}
                className="announcement-badge-img"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="announcement-body">
            {item.content.map((block, bi) => {
              /* Rich intro with inline hyperlinks */
              if (block.type === "richIntro") {
                return (
                  <p key={bi} className="announcement-intro">
                    {block.segments.map((seg: RichSegment, si: number) =>
                      seg.href ? (
                        <a
                          key={si}
                          href={seg.href}
                          target={seg.external ? "_blank" : undefined}
                          rel={seg.external ? "noopener noreferrer" : undefined}
                          className="ann-inline-link"
                        >
                          {seg.text}
                        </a>
                      ) : (
                        <React.Fragment key={si}>{seg.text}</React.Fragment>
                      )
                    )}
                  </p>
                );
              }

              if (block.type === "intro" || block.type === "paragraph") {
                return (
                  <p key={bi} className={block.type === "intro" ? "announcement-intro" : "announcement-para"}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === "heading") {
                return (
                  <h2 key={bi} className="announcement-subheading">
                    {block.text}
                  </h2>
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
                        <span className="innovation-number">{String(ii + 1).padStart(2, "0")}</span>
                        <div>
                          <strong className="innovation-label">{itm.label}</strong>
                          <p className="innovation-desc">{itm.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              if (block.type === "button") {
                return (
                  <div key={bi} style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                    <Link
                      href={block.href}
                      target={block.external ? "_blank" : undefined}
                      rel={block.external ? "noopener noreferrer" : undefined}
                      className="btn-primary"
                      style={{ display: "inline-flex", textDecoration: "none" }}
                    >
                      {block.text}
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </motion.article>

        {/* Footer back nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="announcements-back"
        >
          <Link href="/announcements" className="back-link">
            <ArrowLeft size={16} />
            Back to Announcements
          </Link>
        </motion.div>
      </section>

      {/* CTA — Book a demo */}
      <div style={{ marginTop: "4rem" }}>
        <CTASection />
      </div>
    </main>
  );
}
