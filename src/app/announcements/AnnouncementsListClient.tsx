"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { announcementsData } from "./announcementsData";
import "./announcements.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: i * 0.08,
    },
  }),
};

export default function AnnouncementsListClient() {
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
          <span className="announcements-eyebrow">News &amp; Announcements</span>
          <h1 className="announcements-title">What&apos;s Happening at Trench</h1>
          <p className="announcements-desc">
            Milestones, awards, and key moments from the team building the future of SecOps.
          </p>
        </motion.div>
      </section>

      {/* Cards grid */}
      <section className="announcements-container">
        <div className="announcements-grid">
          {[...announcementsData]
            .sort((a, b) => new Date(b.publishedISO).getTime() - new Date(a.publishedISO).getTime())
            .map((item, i) => (
            <motion.article
              key={item.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="ann-card"
            >
              {/* Cover image */}
              <Link href={`/announcements/${item.slug}`} className="ann-card-cover-link" aria-label={item.title} tabIndex={-1}>
                <div className="ann-card-cover">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      alt={item.coverImageAlt}
                      fill
                      className="ann-card-cover-img"
                      sizes="(max-width: 768px) 100vw, 560px"
                      priority={i === 0}
                    />
                  ) : (
                    <div className="ann-card-cover-placeholder" />
                  )}
                  {/* Category badge overlaid on image */}
                  <span className={`ann-card-badge badge-${item.categoryColor}`}>
                    {item.category}
                  </span>
                </div>
              </Link>

              {/* Card body */}
              <div className="ann-card-body">
                <p className="ann-card-date">{item.date}</p>
                <h2 className="ann-card-title">
                  <Link href={`/announcements/${item.slug}`} className="ann-card-title-link">
                    {item.title}
                  </Link>
                </h2>
                <p className="ann-card-excerpt">{item.excerpt}</p>
                <Link href={`/announcements/${item.slug}`} className="ann-card-read-more">
                  Read more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
