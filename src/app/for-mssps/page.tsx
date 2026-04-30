"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import Button from "@/components/ui/Button";

export default function ForMSSPsPage() {
  return (
    <main className="page-main overflow-hidden">
      <div className="container-wide">
        <ScrollReveal direction="up" className="text-center">
          <TextReveal text="Partnerships" as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
          <TextReveal text="For MSSPs" as="h1" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          <p className="body-lead" style={{ maxWidth: '800px', margin: '2rem auto' }}>
            Scale your managed security services with Trench. Our multi-tenant platform is built for providers who need enterprise-grade power with operational efficiency.
          </p>
        </ScrollReveal>

        <section className="padding-section">
          <div className="grid-2" style={{ gap: '3rem' }}>
            <ScrollReveal direction="up">
              <div style={{ background: '#FFFFFF', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(13, 65, 225, 0.1)', height: '100%' }}>
                <h2 className="title-md" style={{ color: '#0D41E1' }}>Multi-Tenant Architecture</h2>
                <p className="body-text" style={{ marginTop: '1.5rem' }}>
                  Manage all your clients from a single pane of glass. Separate data, custom policies, and unified reporting for every customer.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div style={{ background: '#FFFFFF', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(13, 65, 225, 0.1)', height: '100%' }}>
                <h2 className="title-md" style={{ color: '#0D41E1' }}>White-Label Ready</h2>
                <p className="body-text" style={{ marginTop: '1.5rem' }}>
                  Deliver Trench's AI-native capabilities under your own brand. Custom logos, colors, and reporting templates to match your identity.
                </p>
              </div>
            </ScrollReveal>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <Button>Partner with Trench</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
