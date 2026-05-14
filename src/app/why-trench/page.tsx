"use client";

import React from "react";
import Image from "next/image";
import "./why-trench.css";
import { Trophy, Layers, Network, Users } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import BrandBanner from "@/components/BrandBanner";
import CTASection from "@/components/sections/CTASection";

const COFOUNDERS = [
  {
    name: "Gurucharan Raghunathan",
    role: "Cofounder & CEO",
    desc: "Built products at Microsoft and Radware. Saw the systems design problem in security up close. Built Trench to fix it.",
    img: "/team/gurucharan.png",
    linkedin: "https://www.linkedin.com/in/gurucharanraghunathan/",
  },
  {
    name: "Michael Wilson",
    role: "Cofounder & CTO",
    desc: "Scaled networks at Radware, Avaya and Nortel. Knows what ground-up architecture looks like. Building it again for security operations.",
    img: "/team/Michael.jpg",
    linkedin: "https://www.linkedin.com/in/michael-wilson-rebello-b719a86/",
  },
];

const SUB_TEAMS = [
  {
    title: "AI Researchers",
    members: [
      { name: "Guru Raghav Saravanan", img: "/team/gururaghav.jpg", linkedin: "#" },
      { name: "Harish Narayan", img: "/team/harish.jpg", linkedin: "#" },
    ],
  },
  {
    title: "Detection Engineers",
    members: [
      { name: "Hari Prasath Selvan", img: "/team/hari.png", linkedin: "#" },
      { name: "Dinesh Kumar V", img: "/team/Dinesh.jpg", linkedin: "#" },
      { name: "Anusha Pejathaya", img: "/team/anu.jpg", linkedin: "#" },
      { name: "Sheikha Batha", img: "/team/sheikha.jpg", linkedin: "#" },
    ],
  },
];

const VALUES = [
  {
    icon: Trophy,
    title: "Champions First",
    desc: "We exist for the security champions who protect everything others build. Their mission drives every decision we make at Trench.",
  },
  {
    icon: Layers,
    title: "Integrity by Design",
    desc: "We build trust the same way we build products, from the ground up, with nothing hidden and nothing bolted on.",
  },
  {
    icon: Network,
    title: "Systems Thinkers",
    desc: "We do not iterate on broken systems. We question the foundation, redesign the architecture and build what should have existed from the start. We grow sharper with every problem we face. That is the Trench way.",
  },
  {
    icon: Users,
    title: "One Trench, One Team",
    desc: "We move fast, think ground up and hold each other to the highest standard. Anyone can build around a broken system. It takes a different kind of mindset to rebuild it at Trench.",
  },
];

export default function WhyTrenchPage() {
  return (
    <main className="page-main overflow-hidden">

      {/* ── SECTION 1: HERO / THESIS (Manifesto) ── */}
      <section className="content-block wt-section manifesto-section">
        <div className="container-wide">
          <ScrollReveal direction="up" className="text-center">
            <TextReveal
              text="Our Thesis is Simple."
              as="h3"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <h1 className="wt-manifesto-title">You cannot patch your way out of a design flaw.</h1>

            <div className="wt-manifesto-content">
              <ScrollReveal delay={0.2} direction="up">
                <p className="wt-manifesto-para">
                  Security Operations is a systems design problem. Not a monitoring problem.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4} direction="up">
                <p className="wt-manifesto-para">
                  Frontier AI is making blindspots the default, not the exception. The old model of a SIEM with a SOC layer on top is breaking.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.6} direction="up">
                <p className="wt-manifesto-para">
                  We are not adding AI to a broken pipeline. We are rebuilding the system itself, with Actionability as the first principle.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.8} direction="up">
                <p className="wt-manifesto-para">
                  Built ground up for the next generation of security champions. From cognitive overload to cognitive harmony, that is the transformation we are here to deliver.
                </p>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 2: MISSION & VISION (Minimal) ── */}
      <section className="content-block wt-section wt-section--tinted">
        <div className="container-wide">
          <div className="wt-mv-clean grid-2">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="wt-mv-item">
                <span className="wt-mv-label">Mission</span>
                <p className="wt-mv-statement">
                  Make Actionability the new standard in security operations.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="wt-mv-item">
                <span className="wt-mv-label">Vision</span>
                <p className="wt-mv-statement">
                  A world where security teams are decisive at machine speed without cognitive overload.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Castle Statement (Brand Moment) ── */}
        <div className="wt-quote-ribbon">
          <ScrollReveal direction="up" className="text-center">
            <h2 className="wt-castle-statement">
              Every castle needs a modern Trench. We built one, from the ground up.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 3: LEADERSHIP (Team) ── */}
      <section className="content-block wt-section">
        <div className="container-wide">
          {/* Founders Section */}
          <ScrollReveal
            direction="up"
            className="text-center"
            style={{ marginBottom: "3rem" }}
          >
            <TextReveal
              text="THE TRENCH BUILDERS"
              as="h3"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text="United to solve the hardest problem in security, at machine speed."
              as="h2"
              className="wt-title-section"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
          </ScrollReveal>

          <div className="cofounders-grid-new">
            {COFOUNDERS.map((person, i) => (
              <ScrollReveal
                key={person.name}
                direction="up"
                delay={i * 0.15}
                className="cofounder-card-refined"
              >
                <div className="cofounder-photo-wrap-refined">
                  <Image
                    src={person.img}
                    alt={person.name}
                    width={144}
                    height={144}
                    className="cofounder-photo-refined"
                    quality={90}
                  />
                </div>
                <div className="cofounder-info-refined">
                  <h3 className="cofounder-name-refined">{person.name}</h3>
                  <p className="eyebrow-role-refined">{person.role}</p>
                  <p className="body-text-small-refined">{person.desc}</p>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link-refined">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Diggers Section */}
          <ScrollReveal
            direction="up"
            className="text-center"
            style={{ marginBottom: "2rem", marginTop: "4rem" }}
          >
            <TextReveal
              text="THE TRENCH DIGGERS"
              as="h3"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
          </ScrollReveal>

          <div className="team-members-grid-refined">
            {SUB_TEAMS.flatMap(team =>
              team.members.map(m => ({ ...m, role: team.title.replace(/s$/, '') }))
            ).map((m, i) => (
              <ScrollReveal key={m.name} direction="up" delay={i * 0.1} className="member-card-refined">
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="member-link-refined">
                  <div className="member-photo-wrap-refined">
                    <Image
                      src={m.img}
                      alt={m.name}
                      width={120}
                      height={120}
                      className="member-photo-refined"
                      quality={85}
                    />
                  </div>
                  <div className="member-info-refined">
                    <h4 className="member-name-refined">{m.name}</h4>
                    <p className="member-role-refined">{m.role}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: VALUES (Typography-led with Icons) ── */}
      <section className="content-block wt-section wt-section--tinted">
        <div className="container-wide">
          <ScrollReveal
            direction="up"
            className="text-center"
            style={{ marginBottom: "3rem" }}
          >
            <TextReveal
              text="OUR DNA"
              as="h4"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text="What Trench Values."
              as="h2"
              className="wt-title-section"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
          </ScrollReveal>

          <div className="grid-2 wt-values-grid-new">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={i} direction="up" delay={i * 0.1} className="value-item-new">
                  <div className="value-icon-new">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="value-content-new">
                    <h3 className="value-title-new">{val.title}</h3>
                    <p className="body-text-new">{val.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
      <BrandBanner />
      {/* ── SECTION 5: CAREERS (Centered Layout) ── */}
      <section className="content-block wt-section careers-section">
        <div className="container-wide text-center">
          <ScrollReveal direction="up">
            <h3 className="wt-careers-title">The foundation needs the right hands.</h3>
            <span className="wt-eyebrow" style={{ justifyContent: "center", marginBottom: "0.5rem" }}>JOIN THE TRENCH</span>
            <p className="wt-careers-text">
              Write us at{" "}
              <a href="mailto:career@trenchsecurity.ai" className="wt-email-link">
                career@trenchsecurity.ai
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <CTASection />

    </main>
  );
}
