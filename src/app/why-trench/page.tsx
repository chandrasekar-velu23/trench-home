"use client";

import React from "react";
import Image from "next/image";
import "./why-trench.css";
import {
  ShieldCheck,
  Rocket,
  Heart,
  Scale,
  Lightbulb,
  Handshake,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import BrandBanner from "@/components/BrandBanner";

const COFOUNDERS = [
  {
    name: "Gurucharan Raghunathan",
    role: "Cofounder & CEO",
    desc: "Seasoned product professional; built platforms at Microsoft and Radware.",
    img: "/team/GR.png",
  },
  {
    name: "Michael Wilson",
    role: "Cofounder & CTO",
    desc: "Technology leader; expertise in scalable networking at Radware, Avaya, and Nortel.",
    img: "/team/MR.png",
  },
];

const SUB_TEAMS = [
  {
    title: "AI Researchers",
    members: [
      { name: "Guru Raghav Saravanan", img: "/team/gururaghav.jpg" },
      { name: "Harish Narayan", img: "/team/harish.jpg" },
      { name: "Shriram K S", img: "/team/sriram.jpg" },
    ],
  },
  {
    title: "Detection Engineers",
    members: [
      { name: "Hari Prasath Selvan", img: "/team/hari.png" },
      { name: "Dinesh Kumar V", img: "/team/Dinesh.jpg" },
      { name: "Anusha Pejathaya", img: "/team/anu.jpg" },
      { name: "Sheikha Batha", img: "/team/sheikha.jpg" },
    ],
  },
];

const VALUES = [
  {
    icon: Heart,
    title: "Customer Obsession",
    desc: "Prioritize understanding and exceeding customer expectations to guide decision-making.",
  },
  {
    icon: Scale,
    title: "Integrity & Transparency",
    desc: "Build trust through honesty, ethical behavior, and open communication.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Creativity",
    desc: "Encourage out-of-the-box thinking to stay ahead in the market.",
  },
  {
    icon: Handshake,
    title: "Trust & Respect",
    desc: "Foster a culture of respect among employees, customers, and stakeholders.",
  },
];

export default function WhyTrenchPage() {
  return (
    <main className="page-main overflow-hidden">

      {/* ── SECTION 1: HERO / THESIS ── */}
      <section className="content-block wt-section">
        <div className="container-wide">
          <ScrollReveal direction="up" className="text-center">
            <TextReveal
              text="Our Thesis is Simple."
              as="h3"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text="Velocity is the new risk. Minutes is the new standard."
              as="h1"
              className="wt-title-hero"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
            <ScrollReveal delay={0.4} direction="none">
              <div className="wt-hero-body">
                <p>
                  Adversaries deploy attacks in minutes. Your security team should detect and respond in minutes too,at scale, not someday.
                  Every existing SIEM, detection workflow, and security operations tool was built for a slower world. That world no longer exists.
                  We're rebuilding the operating system for security teams: AI-native, agent-powered, with the sophistication to connect signals, reason about intent, and act before threats take hold.
                </p>
                <p className="wt-hero-accent">
                  Because when attackers are moving at machine speed, your defense can't afford to walk.
                </p>
              </div>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 2: MISSION & VISION ── */}
      <section className="content-block wt-section wt-section--tinted">
        <div className="container-wide">
          <div className="grid-2 wt-mv-grid">

            {/* Mission card */}
            <ScrollReveal direction="left">
              <div className="wt-card">
                <div className="wt-card-icon">
                  <ShieldCheck size={28} strokeWidth={1.8} />
                </div>
                <TextReveal text="Mission" as="h4" className="wt-eyebrow" />
                <TextReveal
                  text="Velocity with Operational Intelligence at scale."
                  as="h4"
                  className="wt-title-section"
                  delay={0.2}
                />
              </div>
            </ScrollReveal>

            {/* Vision card */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="wt-card">
                <div className="wt-card-icon">
                  <Rocket size={28} strokeWidth={1.8} />
                </div>
                <TextReveal text="Vision" as="h4" className="wt-eyebrow" />
                <TextReveal
                  text="The new operating system in the Agentic Era for Headless security operations"
                  as="h4"
                  className="wt-title-section"
                  delay={0.2}
                />
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* ── Full-bleed ribbon ── */}
        <div className="wt-quote-ribbon">
          <ScrollReveal direction="up" className="text-center">
            <TextReveal
              text="And That's Why"
              as="h4"
              className="wt-eyebrow wt-eyebrow--white"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text="Every castle needs a Trench. Castles without trenches fall. We're here to make sure yours doesn't."
              as="h2"
              className="wt-title-quote wt-title-quote--white"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 3: LEADERSHIP ── */}
      <section className="content-block wt-section">
        <div className="container-wide">
          <ScrollReveal
            direction="up"
            className="text-center"
            style={{ marginBottom: "3rem" }}
          >
            <TextReveal
              text="The Castle Builders"
              as="h3"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text="United to solve cybersecurity's hardest problem at machine speed."
              as="h2"
              className="wt-title-section"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
          </ScrollReveal>

          {/* Cofounders */}
          <div className="cofounders-grid">
            {COFOUNDERS.map((person, i) => (
              <ScrollReveal
                key={person.name}
                direction="up"
                delay={i * 0.15}
                className="cofounder-card"
              >
                <div className="cofounder-photo-wrap">
                  <Image
                    src={person.img}
                    alt={person.name}
                    width={240}
                    height={240}
                    className="cofounder-photo"
                    quality={90}
                  />
                </div>
                <div className="cofounder-info">
                  <h3 className="cofounder-name">{person.name}</h3>
                  <p className="eyebrow-role">{person.role}</p>
                  <p className="body-text-small">{person.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Sub-teams */}
          <div className="sub-teams-container">
            {SUB_TEAMS.map((team, index) => (
              <ScrollReveal
                key={team.title}
                direction="up"
                delay={index * 0.2}
                className="sub-team-section"
              >
                <TextReveal
                  text={team.title}
                  as="h4"
                  className="wt-eyebrow"
                  style={{ justifyContent: "center", width: "100%", marginBottom: "1.75rem" }}
                />
                <div className="team-members-grid">
                  {team.members.map((m, i) => (
                    <ScrollReveal key={m.name} direction="up" delay={i * 0.1} className="member-card">
                      <div className="member-photo-wrap">
                        <Image
                          src={m.img}
                          alt={m.name}
                          width={160}
                          height={160}
                          className="member-photo"
                          quality={85}
                        />
                      </div>
                      <span className="member-name">{m.name}</span>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: VALUES ── */}
      <section className="content-block wt-section wt-section--tinted">
        <div className="container-wide">
          <ScrollReveal
            direction="up"
            className="text-center"
            style={{ marginBottom: "3rem" }}
          >
            <TextReveal
              text="Our DNA"
              as="h4"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text="Company Values"
              as="h2"
              className="wt-title-section"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
          </ScrollReveal>

          <div className="grid-2" style={{ gap: "1.75rem" }}>
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={i} direction="up" delay={i * 0.1} className="value-item">
                  <div className="value-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="value-title">{val.title}</h3>
                  <p className="body-text">{val.desc}</p>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BRAND BANNER ── */}
      <BrandBanner variant="primary" />

      {/* ── SECTION 5: CAREERS ── */}
      <section className="content-block wt-section">
        <div className="container-wide text-center">
          <ScrollReveal direction="up">
            <TextReveal
              text="Join the Mission"
              as="h4"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text="Ready to enable AI for your SOC?"
              as="h2"
              className="wt-title-section"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%", marginBottom: "1.5rem" }}
            />
            <ScrollReveal delay={0.4} direction="none">
              <p className="body-lead" style={{ marginBottom: "2.5rem" }}>
                Excited about joining a dynamic team? Send resumes to{" "}
                <a href="mailto:careers@trenchsecurity.com" className="wt-email-link">
                  careers@trenchsecurity.com
                </a>
                .
              </p>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
