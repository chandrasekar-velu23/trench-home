import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";


const JOBS = [
  {
    id: "ai-lead-security-rd",
    title: "AI Lead, Security R&D",
    department: "Engineering",
    location: "Bengaluru, India",
    type: "Full-time · 6-12 years experience",
    description: "We are building the technical core of Agentic SecOps. This is a builder's leadership role, you will set technical direction, lead a small senior team and stay hands-on.",
    link: "/career/ai-lead-security-rd"
  },
  {
    id: "ai-ml-lead",
    title: "AI/ML Lead, Applied AI for Security",
    department: "AI & ML",
    location: "Bengaluru, India",
    type: "Full-time · 8-15 years experience",
    description: "We are building the detection brain for Agentic SecOps. This is a hands-on leadership role to build the models that power Trench's detection brain, from security-focused SLMs and UEBA to synthetic data, evaluation and production MLOps.",
    link: "/career/ai-ml-lead"
  },
  {
    id: "lead-agentic-secops",
    title: "Lead, Agentic SecOps",
    department: "Security Operations",
    location: "Bengaluru, India",
    type: "Full-time · 6-12 years experience",
    description: "We are rewriting how Security Operations is practised. This is not a traditional SOC leadership role. You will help forward-looking security teams move from the traditional SOC model to an agentic operating model.",
    link: "/career/lead-agentic-secops"
  },
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
          border: 1px solid rgba(49, 82, 185, 0.12);
          background-color: #EDE7D9;
          box-shadow: 0 10px 30px rgba(49, 82, 185, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .career-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(49, 82, 185, 0.09);
        }
      `}} />
      <main style={{ backgroundColor: '#EDE7D9', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        {/* Explicit cream background to override any body gradients */}
        <div className="page-main overflow-hidden" style={{ backgroundColor: '#EDE7D9' }}>
          <div className="container-wide">
            <ScrollReveal direction="up" className="text-center" style={{ marginBottom: '2rem' }}>
              <TextReveal text="Careers at Trench" as="h1" className="title-lg" style={{ justifyContent: "center", width: "100%", color: 'var(--color-primary-100)' }} />
              <p className="body-lead" style={{ maxWidth: '800px', margin: '1.5rem auto 0', color: 'var(--color-neutral-600)' }}>
                We're on a mission to build the first truly agentic operating system for security operations. Join us in making the impossible possible.
              </p>
            </ScrollReveal>

            {/* Hero Image */}
            <div style={{ width: '100%', maxWidth: '100%', height: 'auto', marginTop: '2rem', marginBottom: '3rem', borderRadius: '16px', overflow: 'hidden' }}>
              <Image src="/career.webp" alt="Careers Hero" width={1200} height={400} style={{ width: '100%', height: 'auto', display: 'block' }} priority />
            </div>

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
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link href={job.link} className="btn-secondary" style={{ display: 'inline-block', padding: '0.8rem 1.5rem', fontSize: '0.9rem', fontFamily: 'var(--font-poppins), sans-serif', textDecoration: 'none', backgroundColor: '#3152B9', border: '1px solid #3152B9', color: '#FFFFFF', borderRadius: '999px', fontWeight: 700 }}>
                          View Details
                        </Link>
                      </div>
                    </div>
                    
                    <p className="body-text" style={{ marginBottom: '0', color: 'var(--color-neutral-600)', fontStyle: 'italic' }}>
                      "{job.description}"
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            <ScrollReveal direction="up" delay={0.4} style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', backgroundColor: '#EDE7D9', borderRadius: '16px', border: '1px solid rgba(49, 82, 185, 0.12)' }}>
              <h3 className="title-sm" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000000' }}>Don't see a perfect fit?</h3>
              <p className="body-text" style={{ marginBottom: '0', color: 'var(--color-neutral-600)' }}>
                We're always looking for exceptional talent to join our team. Send your resume to <a href="mailto:career@trenchsecurity.ai" style={{ color: 'var(--color-primary-100)', fontWeight: 600, textDecoration: 'underline' }}>career@trenchsecurity.ai</a> and tell us how you can help Trench.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
