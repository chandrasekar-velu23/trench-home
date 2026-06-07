"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import { postsData } from "./postsData";

const LinkedinIcon = ({ size = 24, color = "currentColor", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function BlogClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts = postsData
    .filter(post => {
      const matchesFilter = activeFilter === "All" || post.category === activeFilter;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => new Date(b.publishedTime).getTime() - new Date(a.publishedTime).getTime());

  const filters = ["All", "Product", "Security", "Technical", "Trends", "MSSP"];

  return (
    <main className="page-main overflow-hidden" style={{ background: "#F8FAFC" }}>
      <div className="container-wide">
        <ScrollReveal direction="up" className="text-center">
          <TextReveal text="Blog" as="h1" className="title-lg" delay={0.2} style={{ justifyContent: "center", width: "100%" }} />
          <p className="body-lead" style={{ maxWidth: '800px', margin: '2rem auto' }}>
            For security champions and leaders who think differently about defense.
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
                  <article 
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    style={{
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'all 0.25s ease-out'
                  }} className="blog-card">
                    {/* Image Area */}
                    <div style={{ aspectRatio: '16/9', background: '#F1F5F9', overflow: 'hidden', position: 'relative' }}>
                      {post.image ? (
                        <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0D41E1 0%, #E0E7FF 100%)', opacity: 0.1 }}></div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.5rem' }}>{post.date}</span>
                      <h3 className="title-sm" style={{ marginBottom: '0.75rem', transition: 'color 0.2s', fontSize: '1.15rem' }}>{post.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.5rem', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: post.description.replace(/<[^>]+>/g, "") }} />

                      {/* Author */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 'auto', marginBottom: '1.5rem' }}>
                        {post.author.avatar ? (
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                            <Image src={post.author.avatar} alt={post.author.name} fill style={{ objectFit: 'cover' }} />
                          </div>
                        ) : (
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0D41E1', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            {post.author.name}
                            {post.author.name === "Gurucharan R" && (
                              <Link 
                                href="https://www.linkedin.com/in/gurucharanraghunathan/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                title="If Headless SecOps sparked a question or a thought, Gurucharan would love to hear it. Connect with him on LinkedIn"
                                onClick={(e) => e.stopPropagation()}
                                style={{ display: 'inline-flex', color: '#64748B', transition: 'color 0.2s' }}
                              >
                                <LinkedinIcon size={14} />
                              </Link>
                            )}
                          </div>
                          {post.author.role && (
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{post.author.role}</div>
                          )}
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
                        <span style={{ color: '#0D41E1', fontWeight: 700 }} className="arrow">→</span>
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

      <style jsx global>{`
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(13, 65, 225, 0.08);
          border-color: #0D41E1 !important;
        }
        .blog-card:hover .arrow {
          transform: translateX(4px);
        }
        .arrow {
          transition: transform 0.2s;
        }
      `}</style>
    </main>
  );
}
