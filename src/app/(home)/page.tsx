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
import CustomerSection from "@/components/sections/CustomerSection";
import CTASection from "@/components/sections/CTASection";
import Collaborations from "@/components/Collaborations";
// import Highlight from "@/components/sections/Highlight";
// import PartnerSection from "@/components/PartnerSection";
// import { TweaksPanel } from "@/components/tweaks-panel";
// import VariationSlack from "@/components/variation-slack";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* HERO BLOCK */}
      <Hero />

      {/* SOCIAL PROOF BLOCK */}
      <SocialProof />

      {/* AI SIEM RIBBON */}
      <SiemRibbon />

      {/* CUSTOMER SECTION */}
      <CustomerSection />

      {/* COMPARISON BLOCK */}
      <section className="content-block-full" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        <ScrollReveal direction="up" className="text-center" distance={40} style={{ marginBottom: "3rem" }}>
          <TextReveal text="This is Your Trench" as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
          <TextReveal text="One AI Platform. Three Outcomes." as="h2" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          <ScrollReveal delay={0.5} direction="none">
            <p className="body-lead" style={{ maxWidth: '800px', margin: '0 auto' }}>Trench unifies your entire security stack into one agentic platform, so your lean team operates like an enterprise SOC.</p>
          </ScrollReveal>
        </ScrollReveal>
        <div className="container-full">
          <ComparisonTable />
        </div>
      </section>

      {/* BRAND RIBBON BLOCK */}
      <BrandBanner />

      {/* PROCESS BLOCK */}
      <section className="content-block-full" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        <div className="container-full">
          <ProcessSteps />
        </div>
      </section>

      {/* PARTNER BLOCK */}


      {/* HEADLESS SECOPS BLOCK */}
      {/* <section className="content-block-full" style={{ paddingTop: "2rem", paddingBottom: "6rem" }}>
        <div className="container-full">
          <VariationSlack />
        </div>
      </section> */}

      {/* CTA BLOCK */}
      <CTASection />

      <div className="container-wide">
        <Collaborations />
      </div>

      {/* AWARD SHOWCASE BLOCK */}


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
