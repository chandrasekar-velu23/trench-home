"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Copy, 
  ArrowLeft,
  Calendar,
  Clock
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { BlogPost } from "../postsData";
import HeadlessSecOpsModes from "@/components/HeadlessSecOpsModes";
import Section3Visual from "@/components/Section3Visual";

interface BlogClientLayoutProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

export default function BlogClientLayout({ post, relatedPosts }: BlogClientLayoutProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  const articleRef = useRef<HTMLDivElement>(null);

  // Initialize Likes & Comments from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem(`trench-blog-likes-${post.slug}`);
    const storedHasLiked = localStorage.getItem(`trench-blog-liked-${post.slug}`);
    const storedComments = localStorage.getItem(`trench-blog-comments-v3-${post.slug}`);

    // Set initial mock likes count based on title length or random, but consistent
    const initialLikesCount = Math.floor((post.title.length * 7) % 43) + 12;
    setLikes(storedLikes ? parseInt(storedLikes, 10) : initialLikesCount);
    setHasLiked(storedHasLiked === "true");

    // Initialize mock default comments + user comments
    const defaultComments: Comment[] = [];

    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      setComments(defaultComments);
      localStorage.setItem(`trench-blog-comments-v3-${post.slug}`, JSON.stringify(defaultComments));
    }
  }, [post.slug, post.title]);

  // Scroll spy for Table of Contents active heading
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHeadingId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const headings = articleRef.current?.querySelectorAll("h2, h3");
    
    headings?.forEach(heading => {
      observer.observe(heading);
    });

    return () => {
      headings?.forEach(heading => {
        observer.unobserve(heading);
      });
    };
  }, [post.body]);

  // Handle Likes
  const handleLike = () => {
    if (hasLiked) {
      const newCount = likes - 1;
      setLikes(newCount);
      setHasLiked(false);
      localStorage.setItem(`trench-blog-likes-${post.slug}`, newCount.toString());
      localStorage.setItem(`trench-blog-liked-${post.slug}`, "false");
    } else {
      const newCount = likes + 1;
      setLikes(newCount);
      setHasLiked(true);
      localStorage.setItem(`trench-blog-likes-${post.slug}`, newCount.toString());
      localStorage.setItem(`trench-blog-liked-${post.slug}`, "true");
      triggerToast("You liked this article!");
    }
  };

  // Handle Comments Submit
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: newName.trim(),
      text: newText.trim(),
      date: "Just now"
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`trench-blog-comments-v3-${post.slug}`, JSON.stringify(updatedComments));
    
    setNewName("");
    setNewText("");
    triggerToast("Comment posted successfully!");
  };

  // Copy Link to Clipboard
  const copyToClipboard = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    triggerToast("Link copied to clipboard!");
  };

  // Share Article Function
  const handleShare = () => {
    if (typeof window === "undefined") return;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description ? post.description.replace(/<[^>]+>/g, "").substring(0, 100).trim() : post.title,
        url: window.location.href
      }).catch((err) => {
        if (err.name !== "AbortError") {
          copyToClipboard();
        }
      });
    } else {
      copyToClipboard();
    }
  };

  // Trigger Toast Notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Strip the first image container to avoid duplicate cover/body images
  const cleanBody = post.body.replace(/<div class="blog-post-image">[\s\S]*?<\/div>/, "");

  return (
    <main className="page-main" style={{ background: "#F8FAFC" }}>
      {/* Toast Alert */}
      {showToast && (
        <div style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          background: "#0D41E1",
          color: "#FFFFFF",
          padding: "1rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(13, 65, 225, 0.2)",
          zIndex: 9999,
          fontWeight: 700,
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          animation: "slideIn 0.3s ease-out forwards"
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container-wide">
        {/* Navigation back */}
        <Link href="/blog" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#64748B",
          fontWeight: 700,
          fontSize: "0.9rem",
          marginBottom: "2rem",
          transition: "all 0.2s"
        }} className="hover-back">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Hero Section */}
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#0D41E1",
              background: "#E0E7FF",
              padding: "0.3rem 0.8rem",
              borderRadius: "100px",
              letterSpacing: "0.05em"
            }}>
              {post.category}
            </span>
          </div>
          
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#0F172A",
            marginBottom: "1.5rem",
            fontFamily: "var(--font-primary)",
            letterSpacing: "-0.03em"
          }}>
            {post.title}
          </h1>

          {/* Author and Date Meta */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid #E2E8F0"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", position: "relative", border: "2px solid #E2E8F0" }}>
                {post.author.avatar ? (
                  <Image src={post.author.avatar} alt={post.author.name} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#0D41E1", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                    {post.author.name[0]}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "1rem" }}>{post.author.name}</div>
                {post.author.role && (
                  <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{post.author.role}</div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap", color: "#64748B", fontSize: "0.9rem", fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Calendar size={16} /> {post.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Clock size={16} /> 6 min read
              </span>
              <button onClick={handleShare} style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                background: "#E2E8F0",
                color: "#0F172A",
                border: "none",
                padding: "0.4rem 0.95rem",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "0.8rem",
                transition: "all 0.2s"
              }} className="hover-share-btn" title="Share Article" suppressHydrationWarning>
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        </section>


        {/* Two Column Layout: TOC Sidebar + Article Body */}
        <div className="blog-grid">
          {/* Table of Contents Sidebar */}
          <aside className="toc-sidebar">
            <h4 style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#64748B",
              marginBottom: "1.5rem",
              borderBottom: "1px solid #E2E8F0",
              paddingBottom: "0.5rem"
            }}>
              Table of Contents
            </h4>
            {post.tableOfContents && post.tableOfContents.length > 0 ? (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {post.tableOfContents.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${item.id}`}
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: activeHeadingId === item.id ? 700 : 600,
                        color: activeHeadingId === item.id ? "#0D41E1" : "#475569",
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "block",
                        padding: "0.5rem 0.85rem",
                        borderRadius: "8px",
                        background: activeHeadingId === item.id 
                          ? "rgba(13, 65, 225, 0.06)" 
                          : "transparent",
                        borderLeft: activeHeadingId === item.id 
                          ? "3px solid #0D41E1" 
                          : "3px solid transparent",
                        boxShadow: activeHeadingId === item.id 
                          ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.1)" 
                          : "none"
                      }}
                      className="toc-link"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: "0.85rem", color: "#94A3B8" }}>No subheadings available.</p>
            )}

            {/* Quick Share Menu in Sidebar Removed */}
          </aside>

          {/* Main Article Body Column */}
          <div className="article-column">
            {/* Mobile Expandable Table of Contents Card */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="mobile-toc-card">
                <button 
                  onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                  className="mobile-toc-toggle"
                  type="button"
                  suppressHydrationWarning
                >
                  <span>Table of Contents</span>
                  <span style={{ 
                    transform: isMobileTocOpen ? "rotate(180deg)" : "rotate(0deg)", 
                    transition: "transform 0.2s ease-in-out",
                    fontSize: "0.8rem",
                    display: "inline-block"
                  }}>▼</span>
                </button>
                {isMobileTocOpen && (
                  <ul className="mobile-toc-list">
                    {post.tableOfContents.map((item, idx) => (
                      <li key={idx}>
                        <a 
                          href={`#${item.id}`} 
                          onClick={() => setIsMobileTocOpen(false)}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Cover Image nested within right column only */}
            {post.image && (
              <div style={{ 
                width: "100%", 
                aspectRatio: "16/9", 
                borderRadius: "16px", 
                overflow: "hidden", 
                position: "relative", 
                marginBottom: "2.5rem", 
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
                border: "1px solid #E2E8F0"
              }}>
                <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} priority />
              </div>
            )}

            {/* The Rendered HTML Blog Content */}
            <article 
              ref={articleRef} 
              className="blog-post-prose"
              suppressHydrationWarning
            >
              {cleanBody
                .replace(/<p[^>]*>\s*(<!-- INJECT_HEADLESS_SECOPS_DIAGRAM -->)\s*<\/p>/g, "$1")
                .replace(/<p[^>]*>\s*(<!-- INJECT_SECTION3_VISUAL -->)\s*<\/p>/g, "$1")
                .replace(/([\s\S]*)(<img[^>]+>)([\s\S]*)$/, '$1<a href="/connect" style="display:block; cursor:pointer;" class="cta-banner-link">$2</a>$3')
                .split(/(<!-- INJECT_HEADLESS_SECOPS_DIAGRAM -->|<!-- INJECT_SECTION3_VISUAL -->)/g).map((part, index) => {
                if (part === '<!-- INJECT_HEADLESS_SECOPS_DIAGRAM -->') {
                  return (
                    <div key={index} style={{ width: '100%', margin: '40px 0', overflowX: 'auto' }}>
                      <HeadlessSecOpsModes />
                    </div>
                  );
                }
                if (part === '<!-- INJECT_SECTION3_VISUAL -->') {
                  return (
                    <ScrollReveal key={index}>
                      <div style={{ width: '100%', margin: '40px 0', overflowX: 'auto' }}>
                        <Section3Visual />
                      </div>
                    </ScrollReveal>
                  );
                }
                return <div key={index} style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: part }} suppressHydrationWarning />;
              })}
            </article>

            {/* Custom Interactive Section: Likes & Share Widgets Removed */}

            {/* Custom Interactive Section: Comments Module */}
            <section style={{ marginTop: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                <MessageSquare size={24} color="#0D41E1" />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", margin: 0, fontFamily: "var(--font-primary)" }}>
                  Discussion ({comments.length})
                </h3>
              </div>

              {/* Comment submission form */}
              <form onSubmit={handleCommentSubmit} style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                padding: "2rem",
                marginBottom: "2.5rem",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#475569", marginBottom: "0.5rem" }}>Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem",
                        borderRadius: "10px",
                        border: "1px solid #E2E8F0",
                        fontSize: "0.9rem",
                        fontFamily: "inherit",
                        outline: "none",
                        transition: "border 0.2s"
                      }}
                      className="form-input"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#475569", marginBottom: "0.5rem" }}>Your Comment</label>
                    <textarea 
                      placeholder="Write a comment..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      required
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem",
                        borderRadius: "10px",
                        border: "1px solid #E2E8F0",
                        fontSize: "0.9rem",
                        fontFamily: "inherit",
                        outline: "none",
                        resize: "vertical",
                        transition: "border 0.2s"
                      }}
                      className="form-input"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  style={{
                    background: "#0D41E1",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    padding: "0.75rem 2rem",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  className="submit-btn"
                  suppressHydrationWarning
                >
                  Post Comment
                </button>
              </form>

              {/* Comments Thread List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {comments.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#64748B", padding: "2rem" }}>No comments yet. Be the first to start the discussion!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} style={{
                      background: "#FFFFFF",
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      padding: "1.5rem",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.01)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E0E7FF", color: "#0D41E1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem" }}>
                            {comment.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>{comment.name}</span>
                        </div>
                        <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>{comment.date}</span>
                      </div>
                      <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: "1.6", margin: 0, whiteSpace: "pre-wrap" }}>{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Related Posts Grid (Cross-Linking mesh) */}
        {relatedPosts.length > 0 && (
          <section style={{
            marginTop: "6rem",
            borderTop: "1px solid #E2E8F0",
            paddingTop: "4rem"
          }}>
            <h3 style={{
              fontSize: "1.8rem",
              fontWeight: 900,
              color: "#0F172A",
              marginBottom: "2rem",
              fontFamily: "var(--font-primary)",
              letterSpacing: "-0.02em"
            }}>
              Related Articles
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem"
            }}>
              {relatedPosts.map((relatedPost, i) => (
                <ScrollReveal key={i} delay={i * 0.05} direction="up">
                  <article style={{ 
                    background: '#FFFFFF', 
                    borderRadius: '20px', 
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                    transition: "transform 0.2s"
                  }} className="related-card">
                    <Link href={`/blog/${relatedPost.slug}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      {/* Image */}
                      <div style={{ aspectRatio: '16/9', background: '#F1F5F9', overflow: 'hidden', position: 'relative' }}>
                        {relatedPost.image ? (
                          <Image src={relatedPost.image} alt={relatedPost.title} fill style={{ objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #0D41E1 0%, #E0E7FF 100%)', opacity: 0.1 }}></div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.4rem' }}>{relatedPost.date}</span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: "#0F172A", marginBottom: '0.5rem', lineHeight: '1.4' }}>{relatedPost.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                          {relatedPost.description.substring(0, 100)}...
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem', marginTop: "auto" }}>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            fontWeight: 700, 
                            textTransform: 'uppercase', 
                            color: '#0D41E1', 
                            background: '#E0E7FF',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '100px'
                          }}>
                            {relatedPost.category}
                          </span>
                          <span style={{ color: '#0D41E1', fontWeight: 700 }}>→</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>

    </main>
  );
}
