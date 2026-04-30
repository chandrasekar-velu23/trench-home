"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import ProcessSteps from "@/components/ProcessSteps";

export default function HowItWorksPage() {
  return (
    <main className="page-main overflow-hidden">
      <div className="container-wide">
        <ScrollReveal direction="up" className="text-center">
          <TextReveal text="The Process" as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
          <TextReveal text="How it works?" as="h1" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          <p className="body-lead" style={{ maxWidth: '800px', margin: '2rem auto' }}>
            Trench simplifies security operations by unifying visibility, detection, and response into a single, automated workflow.
          </p>
        </ScrollReveal>

        <section className="padding-section">
          <ProcessSteps />
        </section>
      </div>
    </main>
  );
}
