import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Trench and help us build the future of agentic security operations.",
  alternates: {
    canonical: "https://www.trenchsecurity.ai/career",
  },
};

const JOBS = [
  {
    id: "product-marketing-intern",
    title: "Product Marketing Intern",
    department: "Marketing",
    location: "Bengaluru, India",
    type: "Paid · 6 Months · Fresher or 1+ yr exp",
    description: "Cybersecurity is drowning in noise. We don't need someone to generate content. We need someone to make the industry stop scrolling.",
    link: "/career/product-marketing-intern"
  }
];

export default function CareerPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .career-card {
          padding: 2.5rem;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background-color: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .career-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
        }
      `}} />
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        {/* Explicit white background to override any body gradients */}
        <div className="page-main overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
          <div className="container-wide">
            <ScrollReveal direction="up" className="text-center" style={{ marginBottom: '4rem' }}>
              <TextReveal text="Careers at Trench" as="h1" className="title-lg" style={{ justifyContent: "center", width: "100%", color: 'var(--color-primary-100)' }} />
              <p className="body-lead" style={{ maxWidth: '800px', margin: '1.5rem auto 0', color: 'var(--color-neutral-600)' }}>
                We're on a mission to build the first truly agentic operating system for security operations. Join us in making the impossible possible.
              </p>
            </ScrollReveal>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {JOBS.map((job, index) => (
                  <ScrollReveal 
                    key={job.id} 
                    direction="up" 
                    delay={index * 0.1}
                  >
                    <div className="career-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <div style={{ marginBottom: '1rem' }}>
                          <span className="phase-badge">Active Hiring</span>
                        </div>
                        <h2 className="title-sm" style={{ marginBottom: '0.5rem', fontSize: '1.75rem', color: '#000000' }}>{job.title}</h2>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--color-neutral-500)', fontSize: '0.9rem', fontWeight: 500 }}>
                          <span>{job.department}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <Link href={job.link} className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 1.5rem', fontSize: '0.9rem', fontFamily: 'var(--font-poppins), sans-serif', textDecoration: 'none' }}>
                        View Details
                      </Link>
                    </div>
                    
                    <p className="body-text" style={{ marginBottom: '0', color: 'var(--color-neutral-600)', fontStyle: 'italic' }}>
                      "{job.description}"
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            <ScrollReveal direction="up" delay={0.4} style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
              <h3 className="title-sm" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000000' }}>Don't see a perfect fit?</h3>
              <p className="body-text" style={{ marginBottom: '1.5rem', color: 'var(--color-neutral-600)' }}>
                We're always looking for exceptional talent to join our team. Send us your resume and tell us how you can help Trench.
              </p>
              <a href="mailto:career@trenchsecurity.ai" className="btn-secondary" style={{ display: 'inline-block', padding: '0.8rem 1.5rem', fontSize: '0.9rem', fontFamily: 'var(--font-poppins), sans-serif', textDecoration: 'none' }}>
                Get in Touch
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
