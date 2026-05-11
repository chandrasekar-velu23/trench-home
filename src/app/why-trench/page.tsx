// "use client";

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
import { getStrapiData } from "@/lib/strapi";

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
      { name: "Harish Narayan", img: "/team/harish.jpg" },],
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

export default async function WhyTrenchPage() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

  const queryString = 
    "?populate[0]=hero" +
    "&populate[1]=mission_vision.icon" +
    "&populate[2]=ribbon" +
    "&populate[3]=founder.profile" +
    "&populate[4]=team_members.profile" +
    "&populate[5]=cores_values.icon" +
    "&populate[6]=join_cta";

  const strapiData = await getStrapiData(`/api/why-trench-page${queryString}`);
  const data = strapiData?.data || {};

  const hero = data.hero || {};
  const missionVision = data.mission_vision || [];
  const ribbon = data.ribbon || {};
  const founder = data.founder || [];
  const teamMembers = data.team_members || [];
  const coreValues = data.cores_values || [];
  const joinCta = data.join_cta || {};

  return (
    <main className="page-main overflow-hidden">

      {/* ── SECTION 1: HERO / THESIS ── */}
      <section className="content-block wt-section">
        <div className="container-wide">
          <ScrollReveal direction="up" className="text-center">
            <TextReveal
              text={hero.eyebrows_text || "Our Thesis is Simple."}
              /* text="Our Thesis is Simple." */
              as="h3"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text={hero.title || "Velocity is the new risk. Minutes is the new standard."}
              /* text="Velocity is the new risk. Minutes is the new standard." */
              as="h1"
              className="wt-title-hero"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
            <ScrollReveal delay={0.4} direction="none">
              <div className="wt-hero-body">
                {hero.description ? (
                  <p>{hero.description}</p>
                ) : (
                  <>
                    {/* Old static content commented out but preserved as fallback structure */}
                    <p>
                      Adversaries deploy attacks in minutes. Your security team should detect and respond in minutes too,at scale, not someday.
                      Every existing SIEM, detection workflow, and security operations tool was built for a slower world. That world no longer exists.
                      We're rebuilding the operating system for security teams: AI-native, agent-powered, with the sophistication to connect signals, reason about intent, and act before threats take hold.
                    </p>
                    <p className="wt-hero-accent">
                      Because when attackers are moving at machine speed, your defense can't afford to walk.
                    </p>
                  </>
                )}
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
                  {missionVision[0]?.icon?.url ? (
                    <Image src={`${baseUrl}${missionVision[0].icon.url}`} alt="Icon" width={28} height={28} unoptimized />
                  ) : (
                    <ShieldCheck size={28} strokeWidth={1.8} />
                  )}
                </div>
                <TextReveal text={missionVision[0]?.title || "Mission"} /* text="Mission" */ as="h4" className="wt-eyebrow" />
                <TextReveal
                  text={missionVision[0]?.description || "Velocity with Operational Intelligence at scale."}
                  /* text="Velocity with Operational Intelligence at scale." */
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
                  {missionVision[1]?.icon?.url ? (
                    <Image src={`${baseUrl}${missionVision[1].icon.url}`} alt="Icon" width={28} height={28} unoptimized />
                  ) : (
                    <Rocket size={28} strokeWidth={1.8} />
                  )}
                </div>
                <TextReveal text={missionVision[1]?.title || "Vision"} /* text="Vision" */ as="h4" className="wt-eyebrow" />
                <TextReveal
                  text={missionVision[1]?.description || "The new operating system in the Agentic Era for Headless security operations"}
                  /* text="The new operating system in the Agentic Era for Headless security operations" */
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
              text={data.eyebrows_text || ribbon.ribbon_text || "And That's Why"}
              /* text="And That's Why" */
              as="h4"
              className="wt-eyebrow wt-eyebrow--white"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text={ribbon.hightlight_text || "Every castle needs a Trench. Castles without trenches fall. We're here to make sure yours doesn't."}
              /* text="Every castle needs a Trench. Castles without trenches fall. We're here to make sure yours doesn't." */
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
              text={data.team_titles || "The Castle Builders"}
              /* text="The Castle Builders" */
              as="h3"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text={data.team_section_title || "United to solve cybersecurity's hardest problem at machine speed."}
              /* text="United to solve cybersecurity's hardest problem at machine speed." */
              as="h2"
              className="wt-title-section"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
          </ScrollReveal>

          {/* Cofounders */}
          <div className="cofounders-grid">
            {(founder.length > 0 ? founder : COFOUNDERS).map((person: any, i: number) => {
              const personImg = person.profile?.url ? `${baseUrl}${person.profile.url}` : (person.img || "/team/default.png");
              const personName = person.Name || person.name;
              const personDesc = person.notes || person.desc;
              return (
              <ScrollReveal
                key={personName}
                direction="up"
                delay={i * 0.15}
                className="cofounder-card"
              >
                <div className="cofounder-photo-wrap">
                  <Image
                    src={personImg}
                    alt={personName}
                    width={240}
                    height={240}
                    className="cofounder-photo"
                    quality={90}
                    unoptimized={!!person.profile?.url}
                  />
                </div>
                <div className="cofounder-info">
                  <h3 className="cofounder-name">{personName}</h3>
                  <p className="eyebrow-role">{person.role}</p>
                  <p className="body-text-small">{personDesc}</p>
                </div>
              </ScrollReveal>
            )})}
          </div>

          {/* Sub-teams / Team Members */}
          <div className="sub-teams-container">
            {teamMembers.length > 0 ? (
              <ScrollReveal direction="up" className="sub-team-section">
                <TextReveal
                  text="Team Members"
                  as="h4"
                  className="wt-eyebrow"
                  style={{ justifyContent: "center", width: "100%", marginBottom: "1.75rem" }}
                />
                <div className="team-members-grid">
                  {teamMembers.map((m: any, i: number) => {
                    const mImg = m.profile?.url ? `${baseUrl}${m.profile.url}` : "/team/default.png";
                    const mName = m.Name;
                    return (
                    <ScrollReveal key={mName} direction="up" delay={i * 0.1} className="member-card">
                      <div className="member-photo-wrap">
                        <Image src={mImg} alt={mName} width={160} height={160} className="member-photo" quality={85} unoptimized={!!m.profile?.url} />
                      </div>
                      <span className="member-name">{mName}</span>
                    </ScrollReveal>
                  )})}
                </div>
              </ScrollReveal>
            ) : (
              /* --- OLD HARDCODED SUB_TEAMS LOGIC (Fallback) --- */
              SUB_TEAMS.map((team, index) => (
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
              ))
              /* --- END OLD HARDCODED SUB_TEAMS LOGIC --- */
            )}
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
              text={data.core_values || "Our DNA"}
              /* text="Our DNA" */
              as="h3"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text="Company Values"
              /* text="Company Values" */
              as="h2"
              className="wt-title-section"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%" }}
            />
          </ScrollReveal>

          <div className="grid-2" style={{ gap: "1.75rem" }}>
            {(coreValues.length > 0 ? coreValues : VALUES).map((val: any, i: number) => {
              const valTitle = val.title;
              const valDesc = val.description || val.desc;
              // Check if we have a valid image from CMS
              const hasImageUrl = !!val.icon?.url;
              // If not, fallback to the original Lucide React icon from VALUES array
              const Icon = hasImageUrl ? null : VALUES[i % VALUES.length].icon;
              return (
                <ScrollReveal key={i} direction="up" delay={i * 0.1} className="value-item">
                  <div className="value-icon">
                    {hasImageUrl ? (
                      <Image src={`${baseUrl}${val.icon.url}`} alt={valTitle} width={22} height={22} unoptimized />
                    ) : (
                      Icon && <Icon size={22} strokeWidth={1.8} />
                    )}
                  </div>
                  <h3 className="value-title">{valTitle}</h3>
                  <p className="body-text">{valDesc}</p>
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
              text={joinCta.eyebrows_text || "Join the Mission"}
              /* text="Join the Mission" */
              as="h4"
              className="wt-eyebrow"
              style={{ justifyContent: "center", width: "100%" }}
            />
            <TextReveal
              text={joinCta.title || "Ready to enable AI for your SOC?"}
              /* text="Ready to enable AI for your SOC?" */
              as="h2"
              className="wt-title-section"
              delay={0.2}
              style={{ justifyContent: "center", width: "100%", marginBottom: "1.5rem" }}
            />
            <ScrollReveal delay={0.4} direction="none">
              <p className="body-lead" style={{ marginBottom: "2.5rem" }}>
                {joinCta.subtile || "Excited about joining a dynamic team? Send resumes to"}{" "}
                {/* Excited about joining a dynamic team? Send resumes to{" "} */}
                <a href={`mailto:${joinCta.career_mail || "career@trenchsecurity.ai"}`} className="wt-email-link">
                  {joinCta.career_mail || "career@trenchsecurity.ai"}
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
