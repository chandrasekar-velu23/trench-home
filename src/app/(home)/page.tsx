"use client";

import ProcessSteps from "@/components/ProcessSteps";
import FAQ from "@/components/FAQ";
import ComparisonTable from "@/components/ComparisonTable";
import BrandBanner from "@/components/BrandBanner";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import SiemRibbon from "@/components/sections/SiemRibbon";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* HERO BLOCK */}
      <Hero />

      {/* SOCIAL PROOF BLOCK */}
      <SocialProof />

      {/* AI SIEM RIBBON */}
      <SiemRibbon />

      {/* COMPARISON BLOCK */}
      <section className="content-block-full" style={{ paddingTop: "6rem", paddingBottom: "2rem" }}>
        <ScrollReveal direction="up" className="text-center" distance={40} style={{ marginBottom: "3rem" }}>
          <TextReveal text="The Trench Advantage" as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
          <TextReveal text="One AI Platform. Three Outcomes." as="h2" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          <ScrollReveal delay={0.5} direction="none">
            <p className="body-lead" style={{ maxWidth: '800px', margin: '0 auto' }}>Trench unifies your entire security stack into one AI-native platform — so your lean team operates like an enterprise SOC.</p>
          </ScrollReveal>
        </ScrollReveal>
        <div className="container-full">
          <ComparisonTable />
        </div>
      </section>

      {/* BRAND RIBBON BLOCK */}
      <BrandBanner />

      {/* PROCESS BLOCK */}
      <section className="content-block-full" style={{ paddingTop: "2rem", paddingBottom: "6rem" }}>
        <div className="container-full">
          <ProcessSteps />
        </div>
      </section>

      {/* CTA BLOCK */}
      <CTASection />

      {/* FAQ BLOCK */}
      <section className="content-block-full padding-section">
        <div className="container-full">
          <ScrollReveal direction="up" className="text-center" distance={40} style={{ marginBottom: "5rem" }}>
            <TextReveal text="Got Questions?" as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
            <TextReveal text="We thought you might." as="h2" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          </ScrollReveal>
          <FAQ />
        </div>
      </section>
    </main>
  );
}
