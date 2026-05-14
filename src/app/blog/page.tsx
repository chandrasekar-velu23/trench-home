"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const posts = [
    { 
      title: "Trench AI Now Available on Microsoft Marketplace", 
      category: "Product", 
      date: "May 10, 2026",
      description: "Trench AI is now accessible directly through the Microsoft Marketplace, simplifying procurement.",
      author: { name: "Gurucharan Raghunathan", role: "Cofounder & CEO", avatar: "/team/gurucharan.png" }
    },
    { 
      title: "AI in the Security Operations: Clearing the Clutter", 
      category: "Security", 
      date: "May 05, 2026",
      description: "Learn how to use AI to filter out noise and focus on critical security alerts.",
      author: { name: "Gurucharan Raghunathan", role: "Cofounder & CEO", avatar: "/team/gurucharan.png" }
    },
    { 
      title: "Launching Trench Agentic Threat Detection Mesh", 
      category: "Technical", 
      date: "Apr 28, 2026",
      description: "Watch the demo of our new agentic threat detection mesh in action.",
      author: { name: "Gurucharan Raghunathan", role: "Cofounder & CEO", avatar: "/team/gurucharan.png" }
    },
    { 
      title: "Launching “Real-time data safety” in AI-native Security Operations", 
      category: "Product", 
      date: "Apr 20, 2026",
      description: "Ensuring data safety in real-time is critical for modern SOCs. Here is how we do it.",
      author: { name: "Gurucharan Raghunathan", role: "Cofounder & CEO", avatar: "/team/gurucharan.png" }
    },
    { 
      title: "How Modern CISOs Demonstrate Real ROI with AI-Native SOC Platforms", 
      category: "Trends", 
      date: "Apr 15, 2026",
      description: "A guide for CISOs to measure and present the ROI of AI security tools.",
      author: { name: "Gurucharan Raghunathan", role: "Cofounder & CEO", avatar: "/team/gurucharan.png" }
    },
    { 
      title: "Optimizing Your AI-SOC: A Practical Guide to Offensive Validation and Tuning", 
      category: "Technical", 
      date: "Apr 08, 2026",
      description: "Practical steps to tune your AI-SOC for maximum efficiency and accuracy.",
      author: { name: "Gurucharan Raghunathan", role: "Cofounder & CEO", avatar: "/team/gurucharan.png" }
    },
    { 
      title: "Why Mid-Sized Companies Struggle with SOC Automation (And How to Fix It)", 
      category: "Trends", 
      date: "Mar 30, 2026",
      description: "Common pitfalls in SOC automation for mid-sized companies and solutions.",
      author: { name: "Gurucharan Raghunathan", role: "Cofounder & CEO", avatar: "/team/gurucharan.png" }
    },
    { 
      title: "Unlocking the Power of AI for MSSPs", 
      category: "MSSP", 
      date: "Mar 25, 2026",
      description: "How Managed Security Service Providers can leverage AI to scale their operations.",
      author: { name: "Gurucharan Raghunathan", role: "Cofounder & CEO", avatar: "/team/gurucharan.png" }
    },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === "All" || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters = ["All", "Product", "Security", "Technical", "Trends", "MSSP"];

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

        {/* Filters and Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3rem 0', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748B' }}>Filter By:</span>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '100px',
                  border: activeFilter === filter ? '1px solid transparent' : '1px solid #E2E8F0',
                  background: activeFilter === filter ? '#0D41E1' : '#FFFFFF',
                  color: activeFilter === filter ? '#FFFFFF' : '#0F172A',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                color: '#0F172A',
                fontSize: '0.85rem',
                width: '260px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <section className="padding-section" style={{ paddingTop: 0 }}>
          <div className="grid-3" style={{ gap: '2.5rem' }}>
            {filteredPosts.map((post, i) => (
              <ScrollReveal key={i} delay={i * 0.05} direction="up">
                <article style={{ 
                  cursor: 'pointer', 
                  background: '#FFFFFF', 
                  borderRadius: '20px', 
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  {/* Image Area */}
                  <div style={{ height: '200px', background: '#F1F5F9', overflow: 'hidden' }}>
                     <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0D41E1 0%, #E0E7FF 100%)', opacity: 0.1 }}></div>
                  </div>
                  
                  {/* Content Area */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.5rem' }}>{post.date}</span>
                    <h3 className="title-sm" style={{ marginBottom: '0.75rem', transition: 'color 0.2s', fontSize: '1.15rem' }}>{post.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.5rem', lineHeight: '1.5' }}>{post.description}</p>
                    
                    {/* Author */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto', marginBottom: '1.5rem' }}>
                      {post.author.avatar ? (
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden' }}>
                          <Image src={post.author.avatar} alt={post.author.name} width={32} height={32} style={{ objectFit: 'cover' }} />
                        </div>
                      ) : (
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0D41E1', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>{post.author.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{post.author.role}</div>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        textTransform: 'uppercase', 
                        color: '#0D41E1', 
                        letterSpacing: '0.05em',
                        background: '#E0E7FF',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '100px'
                      }}>
                        {post.category}
                      </span>
                      <span style={{ color: '#0D41E1', fontWeight: 700 }}>→</span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
              No posts found matching your criteria.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
