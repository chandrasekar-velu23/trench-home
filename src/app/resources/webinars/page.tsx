"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Video, ExternalLink, Calendar, User, Clock, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import CTASection from "@/components/sections/CTASection";
import "../resources.css";

interface WebinarItem {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  date: string;
  youtubeId: string; // Used to swap the iframe source
  isPlaylist?: boolean;
  description: string;
}

const WEBINAR_ITEMS: WebinarItem[] = [
  {
    id: "playlist-full",
    title: "CISO Chronicles in the AI World",
    speaker: "Trench Security",
    duration: "Full Playlist",
    date: "Jan 2026",
    youtubeId: "videoseries?list=PLp-IDMGn5uvAWY34bqcz_JTUj4X943VUi",
    isPlaylist: true,
    description: "Info sec leaders sharing their top of mind and insights in the AI transformation process."
  },
  {
    id: "episode-1",
    title: "Episode 1 - Why AI is the top of mind for Risk management leaders | Subhro",
    speaker: "Subhro",
    duration: "27:30",
    date: "Sept 2025",
    youtubeId: "qS4_wimD8Eo",
    description: "Risk management leaders sharing their top of mind and insights in the AI transformation process."
  },
  {
    id: "episode-2",
    title: "Episode 2 - AI adoption in Security Operations | Mayank",
    speaker: "Mayank",
    duration: "47:42",
    date: "Sept 2025",
    youtubeId: "dwdJ0cXDNks",
    description: "Deep dive discussion on AI adoption trends and operational challenges in modern Security Operations."
  },
  {
    id: "episode-3",
    title: "Episode 3 - CISO Chronicles in the AI Era - Sammit",
    speaker: "Sammit",
    duration: "32:21",
    date: "Feb 2026",
    youtubeId: "xZPAxU_HhGc",
    description: "Chronicles and strategic perspectives of leading CISOs guiding their organizations through the AI era."
  }
];

export default function WebinarsPage() {
  const [activeVideo, setActiveVideo] = useState<WebinarItem>(WEBINAR_ITEMS[0]);

  const embedUrl = activeVideo.isPlaylist
    ? `https://www.youtube.com/embed/${activeVideo.youtubeId}`
    : `https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`;

  return (
    <main className="resources-page overflow-hidden">
      {/* Hero Section */}
      <section className="resources-hero">
        <ScrollReveal direction="up" className="text-center">
          <span className="resources-eyebrow">Webinars & Podcasts</span>
          <h1 className="resources-title">Webinars & Podcasts</h1>
          <p className="resources-desc">
            Deep dive discussions and video series on securing modern environments, featuring insights and perspectives from security leaders.
          </p>
        </ScrollReveal>
      </section>

      {/* Webinars Dashboard */}
      <section className="resources-container">
        <ScrollReveal direction="up" delay={0.2} className="podcast-dashboard">
          {/* Left Column: Iframe Player */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="player-panel">
              <iframe
                src={embedUrl}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="resources-card" style={{ padding: "1.5rem 2rem" }}>
              <span className="resources-badge badge-primary">Now Playing</span>
              <h2 className="event-title" style={{ fontSize: "22px", marginBottom: "0.75rem" }}>
                {activeVideo.title}
              </h2>
              <div className="video-meta-row">
                <span className="video-meta-item">
                  <User size={13} /> {activeVideo.speaker}
                </span>
                <span className="video-meta-item">
                  <Clock size={13} /> {activeVideo.duration}
                </span>
                <span className="video-meta-item">
                  <Calendar size={13} /> {activeVideo.date}
                </span>
              </div>
              <p className="event-description" style={{ marginBottom: "1.5rem", fontSize: "15px" }}>
                {activeVideo.description}
              </p>
              
              <Link
                href="https://youtube.com/playlist?list=PLp-IDMGn5uvAWY34bqcz_JTUj4X943VUi&si=1wT36GG_Ll9qCBjJ"
                target="_blank"
                rel="noopener noreferrer"
                className="resources-btn"
                style={{ alignSelf: "flex-start", marginTop: 0 }}
              >
                <span>View Playlist on YouTube</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Sidebar Playlist Index */}
          <div className="playlist-panel">
            <h3 className="playlist-header">Webinar Playlist</h3>
            <div className="playlist-items">
              {WEBINAR_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveVideo(item)}
                  className={`playlist-item ${activeVideo.id === item.id ? "active" : ""}`}
                >
                  <div className="item-thumb-placeholder">
                    {activeVideo.id === item.id ? (
                      <span className="d-flex items-center justify-center" style={{ animation: "pulse 1s infinite" }}>
                        <Play size={18} fill="white" />
                      </span>
                    ) : (
                      <Video size={18} />
                    )}
                  </div>
                  <div className="item-details">
                    <div className="item-title">{item.title}</div>
                    <div className="item-duration">{item.duration} • {item.speaker}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Bottom CTA */}
      <div style={{ marginTop: "6rem" }}>
        <CTASection />
      </div>
    </main>
  );
}
