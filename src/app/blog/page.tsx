"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

export default function BlogPage() {
  const posts = [
    { title: "The Future of AI in SecOps", category: "Trends", date: "Oct 24, 2024" },
    { title: "Defending Against Zero-Day Cloud Attacks", category: "Technical", date: "Oct 18, 2024" },
    { title: "Why Agents are Replacing Static Rules", category: "Product", date: "Oct 12, 2024" },
  ];

  return (
    <main className="page-main overflow-hidden">
      <div className="container-wide">
        <ScrollReveal direction="up" className="text-center">
          <TextReveal text="Insights" as="h3" className="eyebrow" style={{ justifyContent: "center", width: "100%" }} />
          <TextReveal text="Blog" as="h1" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          <p className="body-lead" style={{ maxWidth: '800px', margin: '2rem auto' }}>
            Latest thoughts on AI security, cloud-native defense, and the evolution of the modern SOC.
          </p>
        </ScrollReveal>

        <section className="padding-section">
          <div className="grid-3" style={{ gap: '2.5rem' }}>
            {posts.map((post, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="up">
                <article style={{ cursor: 'pointer' }}>
                  <div style={{ height: '240px', background: '#F1F5F9', borderRadius: '20px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                     <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0D41E1 0%, #E0E7FF 100%)', opacity: 0.1 }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#0D41E1', letterSpacing: '0.1em' }}>{post.category}</span>
                  <h3 className="title-sm" style={{ marginTop: '0.5rem', marginBottom: '0.5rem', transition: 'color 0.2s' }}>{post.title}</h3>
                  <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{post.date}</span>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
