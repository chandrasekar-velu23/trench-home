// "use client";

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
import { useScrollAnimation, useNetworkMesh } from '@/components/hooks/useAnimations';


//backend-cms imports
import { getStrapiData } from "@/lib/strapi";

export default async function Home() {
  // 1. Fetch data from Strapi (ensure your Single Type is called 'homepage')
  // We use deep dot notation to populate the dynamic zone and its nested components/media.
  const queryString = "?populate[0]=Blocks&populate[1]=Blocks.Testimonial.avatar&populate[2]=Blocks.compare&populate[3]=Blocks.steps.image&populate[4]=Blocks.faqs&populate[5]=Blocks.Link&populate[6]=Blocks.btn_link&populate[7]=Blocks.BackgroundImage";
  const strapiData = await getStrapiData(`/api/home-page${queryString}`);
  // console.log("CMS Response:", JSON.stringify(strapiData, null, 2));

  const blocks = strapiData?.data?.Blocks || [];

  const heroData = blocks.find(
    (block: any) => block.__component === "sections.hero"
  );
  const socialData = blocks.find((b: any) => b.__component === "sections.social-proof");
  const comparisonData = blocks.find((b: any) => b.__component === "sections.comparisonsection");
  const processData = blocks.find((b: any) => b.__component === "sections.process-steps");
  const ctaData = blocks.find((b: any) => b.__component === "sections.cta-section");
  const faqData = blocks.find((b: any) => b.__component === "sections.faq-section");

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* HERO BLOCK */}
      <Hero data={heroData} />

      {/* SOCIAL PROOF BLOCK */}
      <SocialProof data={socialData} />


      {/* AI SIEM RIBBON */}
      <SiemRibbon />

      {/* COMPARISON BLOCK */}
      <section className="content-block-full" style={{ paddingTop: "6rem", paddingBottom: "2rem" }}>
        <ScrollReveal direction="up" className="text-center" distance={40} style={{ marginBottom: "3rem" }}>
          <TextReveal text={comparisonData?.eyebrows_text || "The Trench Advantage"} as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
          <TextReveal text={comparisonData?.title || "One AI Platform. Three Outcomes."} as="h2" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          <ScrollReveal delay={0.5} direction="none">
            <p className="body-lead" style={{ maxWidth: '800px', margin: '0 auto' }}>{comparisonData?.description || "Trench unifies your entire security stack into one AI-native platform. So your lean team operates like an enterprise SOC."}</p>
          </ScrollReveal>
        </ScrollReveal>
        <div className="container-full">
          <ComparisonTable data={comparisonData} />
        </div>
      </section>

      {/* BRAND RIBBON BLOCK */}
      <BrandBanner />

      {/* PROCESS BLOCK */}
      <section className="content-block-full" style={{ paddingTop: "2rem", paddingBottom: "6rem" }}>
        <div className="container-full">
          <ProcessSteps data={processData} />
        </div>
      </section>

      {/* CTA BLOCK */}
      <CTASection data={ctaData} />

      {/* FAQ BLOCK */}
      <section className="content-block-full padding-section">
        <div className="container-full">
          <ScrollReveal direction="up" className="text-center" distance={40} style={{ marginBottom: "5rem" }}>
            <TextReveal text={faqData?.eyebrows_text || "Got Questions?"} as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
            <TextReveal text={faqData?.title || "We thought you might."} as="h2" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          </ScrollReveal>
          <FAQ data={faqData} />
        </div>
      </section>
    </main>
  );
}
