"use client";

import { displayImage } from "@/lib/media";
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
import ScrollReveal from "@/components/animations/ScrollReveal";
import { BlogPost } from "../postsData";
import HeadlessSecOpsModes from "@/components/HeadlessSecOpsModes";
import Section3Visual from "@/components/Section3Visual";
import Button from "@/components/ui/Button";

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
  const [lightboxImage, setLightboxImage] = useState<{src: string, alt: string} | null>(null);

  const articleRef = useRef<HTMLDivElement>(null);

  // Dynamic SEO Canonical Link and Meta Tags synchronization
  useEffect(() => {
    if (typeof window === "undefined") return;

    const canonicalHref = `https://www.trenchsecurity.ai/blog/${post.slug}`;
    const cleanDesc = post.description
      ? post.description.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().substring(0, 160)
      : post.title;

    // Document Title
    document.title = `${post.title} | Trench Security`;

    // Canonical link tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonicalHref);

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", cleanDesc);

    // OpenGraph & Twitter URLs
    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrl) ogUrl.setAttribute("content", canonicalHref);
    const twUrl = document.querySelector('meta[name="twitter:url"]') as HTMLMetaElement | null;
    if (twUrl) twUrl.setAttribute("content", canonicalHref);

    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (ogTitle) ogTitle.setAttribute("content", `${post.title} | Trench Security`);
    const twTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
    if (twTitle) twTitle.setAttribute("content", `${post.title} | Trench Security`);

    return () => {
      // Revert canonical to base URL if navigating away
      if (canonicalTag) {
        canonicalTag.setAttribute("href", "https://www.trenchsecurity.ai");
      }
      document.title = "Trench | Agentic OS for Actionable SecOps";
    };
  }, [post.slug, post.title, post.description]);

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

  // Setup Lightbox for blog images and click-to-copy anchor links
  useEffect(() => {
    const articleEl = articleRef.current;
    if (!articleEl) return;
    
    const handleArticleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "IMG") {
        const img = target as HTMLImageElement;
        setLightboxImage({ src: img.src, alt: img.alt || "Blog image" });
      }
      
      const anchor = target.closest(".heading-anchor-link") as HTMLAnchorElement | null;
      if (anchor) {
        e.preventDefault();
        const hash = anchor.getAttribute("href");
        if (hash) {
          const headingId = hash.replace("#", "");
          const el = document.getElementById(headingId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", hash);
          }
          copyAnchorLink(headingId);
        }
      }
    };

    articleEl.addEventListener("click", handleArticleClick);
    return () => {
      articleEl.removeEventListener("click", handleArticleClick);
    };
  }, [post.body, post.slug]);

  useEffect(() => {
    if (!lightboxImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalOverflow = document.body.style.overflow;
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxImage]);

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

  // Copy Link to Clipboard (Clean Canonical URL)
  const copyToClipboard = () => {
    if (typeof window === "undefined") return;
    const cleanUrl = `${window.location.origin}/blog/${post.slug}`;
    navigator.clipboard.writeText(cleanUrl);
    triggerToast("Canonical link copied to clipboard!");
  };

  // Copy direct anchor section link
  const copyAnchorLink = (headingId: string) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}/blog/${post.slug}#${headingId}`;
    navigator.clipboard.writeText(url);
    triggerToast("Section link copied to clipboard!");
  };

  // Share Article Function
  const handleShare = () => {
    if (typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description ? post.description.replace(/<[^>]+>/g, "").substring(0, 100).trim() : post.title,
        url: shareUrl
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

  // Strip only leading duplicate cover image container at the start of post body
  const cleanBody = post.body
    .replace(/^\s*(?:<div class="blog-post-body">\s*)?<div class="blog-post-image">[\s\S]*?<\/div>/i, "")
    .replace(/<div class="blog-post-body">/g, "")
    .replace(/<\/div>\s*$/, "");

  const normalizedBody = cleanBody
    .replace(/<span>\s*<\/span>/gi, "")
    .replace(/<h[2-4]\b[^>]*>\s*<\/h[2-4]>/gi, "")
    .replace(/<blockquote\b[^>]*>/gi, '<blockquote class="blog-quote">')
    // Convert the image wrapper and its own closing tag as a pair. (Opening a
    // <figure> but only closing it when a "Fig N:" caption followed left a
    // stray </div> in posts without captions, which broke hydration.)
    .replace(/<div\s+style="[^"]*width:\s*100%;[^"]*margin:\s*30px\s+0;[^"]*text-align:\s*center;[^"]*"[^>]*>((?:(?!<div\b)[\s\S])*?)<\/div>/gi, '<figure class="blog-figure">$1</figure>')
    .replace(/<img\b([^>]*)style="[^"]*"([^>]*)>/gi, '<img class="blog-inline-image"$1$2>')
    .replace(/<p\s+style="[^"]*font-size:\s*1\.2em;[^\"]*font-weight:\s*bold;[^\"]*text-align:\s*center;[^\"]*padding:\s*20px\s+0;[^\"]*border-bottom:[^\"]*;[^\"]*margin-bottom:\s*30px;[^\"]*"[^>]*>/gi, '<div class="blog-lead"><p>')
    .replace(/(<div class="blog-lead"><p>[\s\S]*?<\/p>)/gi, '$1</div>')
    .replace(/<div\s+style="[^"]*background:\s*#0D41E1;[^\"]*padding:\s*30px;[^\"]*border-radius:\s*12px;[^\"]*margin:\s*30px\s+0;[^\"]*color:\s*#FFFFFF;[^\"]*text-align:\s*left;[^\"]*box-shadow:[^\"]*"[^>]*>/gi, '<div class="blog-callout">')
    .replace(/<a\s+href="\/connect"[^>]*style="[^"]*"[^>]*>/gi, '<a class="blog-link-cta" href="/connect">')
    .replace(/<p\s+style="[^"]*margin:\s*0\s+0\s+16px\s+0;[^\"]*font-size:\s*1\.15em;[^\"]*font-weight:\s*600;[^\"]*line-height:\s*1\.6;[^\"]*"[^>]*>/gi, '<p class="blog-callout-copy">');

  const normalizeHeadingId = (value: string) => value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const ensureHeadingIds = (html: string): string => {
    const tocMap = new Map(
      post.tableOfContents?.map((item) => [normalizeHeadingId(item.id), normalizeHeadingId(item.title)]) || []
    );

    return html.replace(/<(h[2-3])\b([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, content) => {
      const idMatch = attrs.match(/\s+id="([^"]+)"/);
      let headingId = "";

      if (idMatch && idMatch[1]) {
        headingId = idMatch[1];
      } else {
        const textContent = content.replace(/<[^>]+>/g, "").trim();
        const normalizedText = normalizeHeadingId(textContent);
        headingId = tocMap.get(normalizedText) || normalizedText || "section";
      }

      // Add a clean anchor copy icon for title indexing and deep-linking
      const anchorIcon = `<a href="#${headingId}" class="heading-anchor-link" aria-label="Direct link to section" title="Copy section link">#</a>`;
      const cleanAttrs = attrs.replace(/\s+id="[^"]+"/, "");

      return `<${tag}${cleanAttrs} id="${headingId}" class="blog-indexed-heading">${content}${anchorIcon}</${tag}>`;
    });
  };

  const normalizedBodyWithIds = ensureHeadingIds(normalizedBody);


  return (
    <main className="page-main" style={{ background: "#EDE7D9" }} itemScope itemType="https://schema.org/BlogPosting">
      {/* BlogPosting + BreadcrumbList JSON-LD is written into <head> at build time (scripts/prerender-seo.ts). */}

      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 130px;
        }

        .blog-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #64748B;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          font-weight: 500;
        }

        .blog-breadcrumb a {
          color: #64748B;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .blog-breadcrumb a:hover {
          color: #3152B9;
        }

        .blog-breadcrumb .sep {
          color: #94A3B8;
          font-size: 0.75rem;
        }

        .blog-breadcrumb .current {
          color: #0F172A;
          font-weight: 600;
          max-width: 320px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3.5rem;
          align-items: flex-start;
        }

        .toc-sidebar {
          position: sticky;
          top: 130px;
          height: fit-content;
          max-height: calc(100vh - 150px);
          overflow-y: auto;
          padding-right: 8px;
        }

        .toc-sidebar::-webkit-scrollbar {
          width: 3px;
        }
        .toc-sidebar::-webkit-scrollbar-thumb {
          background: rgba(49, 82, 185, 0.2);
          border-radius: 3px;
        }

        .article-column {
          width: 100%;
          min-width: 0;
        }

        /* Prose & Typography */
        .blog-post-prose {
          color: #2B2B2B;
          font-size: 1.1rem;
          line-height: 1.85;
          letter-spacing: -0.01em;
          font-family: 'Poppins', 'Poppins Fallback: Arial', 'Poppins Fallback: Roboto', sans-serif;
        }

        .blog-post-prose p {
          margin: 0 0 1.75rem;
          color: #334155;
        }

        .blog-post-prose .blog-lead {
          padding: 1.75rem 2rem;
          margin: 2rem 0 3rem;
          background: rgba(49, 82, 185, 0.04);
          border: 1px solid rgba(49, 82, 185, 0.15);
          border-left: 5px solid #3152B9;
          border-radius: 14px;
          box-shadow: 0 4px 20px rgba(49, 82, 185, 0.03);
        }

        .blog-post-prose .blog-lead p {
          margin: 0;
          color: #1E3A8A;
          font-size: 1.18rem;
          font-weight: 600;
          line-height: 1.75;
          font-style: italic;
        }

        .blog-post-prose h2 {
          color: #0F172A;
          font-size: clamp(1.75rem, 3.5vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.25;
          margin-top: 3.5rem;
          margin-bottom: 1.25rem;
          scroll-margin-top: 130px;
          font-family: 'Bricolage Grotesque', 'Bricolage Grotesque Fallback: Arial', 'Bricolage Grotesque Fallback: Roboto', sans-serif;
          position: relative;
        }

        .blog-post-prose h3 {
          color: #0F172A;
          font-size: clamp(1.35rem, 2.5vw, 1.65rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.35;
          margin-top: 2.75rem;
          margin-bottom: 1rem;
          scroll-margin-top: 130px;
          font-family: 'Bricolage Grotesque', 'Bricolage Grotesque Fallback: Arial', 'Bricolage Grotesque Fallback: Roboto', sans-serif;
          position: relative;
        }

        .blog-post-prose h4 {
          color: #1E293B;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.4;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-family: 'Bricolage Grotesque', 'Bricolage Grotesque Fallback: Arial', 'Bricolage Grotesque Fallback: Roboto', sans-serif;
        }

        /* Heading Anchor link on hover */
        .heading-anchor-link {
          opacity: 0;
          margin-left: 8px;
          color: #3152B9 !important;
          text-decoration: none !important;
          font-size: 0.85em;
          font-weight: 700;
          transition: opacity 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .blog-indexed-heading:hover .heading-anchor-link {
          opacity: 0.7;
          transform: translateY(-1px);
        }

        .heading-anchor-link:hover {
          opacity: 1 !important;
        }

        .blog-post-prose h2[id]:target,
        .blog-post-prose h3[id]:target {
          background: rgba(49, 82, 185, 0.08);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          margin-left: -1rem;
          margin-right: -1rem;
        }

        /* ── Rich Bullet Points & Lists ── */
        .blog-post-prose ul {
          list-style: none;
          margin: 1.5rem 0 2rem;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .blog-post-prose ul li {
          position: relative;
          padding-left: 1.75rem;
          color: #334155;
          line-height: 1.8;
        }

        .blog-post-prose ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #3152B9;
          box-shadow: 0 0 0 3px rgba(49, 82, 185, 0.15);
        }

        .blog-post-prose ol {
          margin: 1.5rem 0 2rem;
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .blog-post-prose ol li {
          color: #334155;
          line-height: 1.8;
          padding-left: 0.5rem;
        }

        .blog-post-prose ol li::marker {
          color: #3152B9;
          font-weight: 700;
        }

        .blog-post-prose strong {
          color: #0F172A;
          font-weight: 700;
        }

        /* ── Hyperlinks ── */
        .blog-post-prose a:not(.heading-anchor-link):not(.blog-link-cta) {
          color: #3152B9;
          text-decoration: underline;
          text-underline-offset: 3.5px;
          text-decoration-thickness: 1.5px;
          text-decoration-color: rgba(49, 82, 185, 0.4);
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .blog-post-prose a:not(.heading-anchor-link):not(.blog-link-cta):hover {
          color: #1D4ED8;
          text-decoration-color: #1D4ED8;
          background-color: rgba(49, 82, 185, 0.06);
          border-radius: 3px;
        }

        /* ── Blockquotes ── */
        .blog-post-prose .blog-quote,
        .blog-post-prose blockquote {
          margin: 2.5rem 0;
          padding: 1.5rem 1.75rem;
          border-left: 4px solid #3152B9;
          background: rgba(49, 82, 185, 0.05);
          border-radius: 0 12px 12px 0;
          color: #1E293B;
          font-size: 1.12rem;
          font-style: italic;
          line-height: 1.8;
          font-weight: 500;
          box-shadow: 0 4px 16px rgba(49, 82, 185, 0.03);
        }

        /* ── Images & Figures ── */
        .blog-post-prose .blog-figure,
        .blog-post-prose figure {
          margin: 3rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .blog-post-prose .blog-inline-image,
        .blog-post-prose img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 0 auto;
          border-radius: 14px;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(49, 82, 185, 0.12);
          cursor: zoom-in;
          background: #FAF7F2;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .blog-post-prose .blog-inline-image:hover,
        .blog-post-prose img:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 45px rgba(15, 23, 42, 0.12);
        }

        .blog-post-prose figcaption,
        .blog-post-prose .blog-figure + p {
          font-size: 0.9rem;
          color: #64748B;
          margin-top: 12px;
          text-align: center;
          font-style: italic;
          line-height: 1.5;
        }

        /* ── Callout Banner ── */
        .blog-post-prose .blog-callout {
          margin: 3rem 0;
          padding: 2.25rem 2.25rem;
          border-radius: 16px;
          background: #3152B9;
          color: #FFFFFF;
          box-shadow: 0 16px 36px rgba(49, 82, 185, 0.15);
        }

        .blog-post-prose .blog-callout h2,
        .blog-post-prose .blog-callout h3,
        .blog-post-prose .blog-callout h4 {
          color: #FFFFFF !important;
        }

        .blog-post-prose .blog-callout p,
        .blog-post-prose div[style*="background: #3152B9"] p,
        .blog-post-prose div[style*="background:#3152B9"] p {
          color: #FFFFFF !important;
          margin: 0 0 1.25rem 0;
          font-weight: 500;
          opacity: 0.95;
        }

        .blog-post-prose .blog-callout-copy {
          font-size: 1.12rem;
          line-height: 1.75;
          color: #FFFFFF !important;
          margin: 0 0 1.25rem 0;
        }

        .blog-post-prose .blog-callout a,
        .blog-post-prose a.blog-link-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          color: #3152B9 !important;
          border-radius: 8px;
          padding: 0.85rem 1.6rem;
          text-decoration: none !important;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .blog-post-prose .blog-callout a:hover,
        .blog-post-prose a.blog-link-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2);
        }

        /* ── Tables ── */
        .blog-table-container {
          width: 100%;
          overflow-x: auto;
          margin: 2rem 0;
          border-radius: 12px;
          border: 1px solid rgba(49, 82, 185, 0.16);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
          -webkit-overflow-scrolling: touch;
        }

        .blog-table-container table {
          margin: 0 !important;
          border: none !important;
          box-shadow: none !important;
          min-width: 600px;
        }

        .blog-post-prose table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 2.5rem 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(49, 82, 185, 0.16);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
          font-size: 0.95rem;
        }

        .blog-post-prose th {
          background-color: #3152B9;
          color: #FFFFFF;
          font-weight: 700;
          padding: 14px 18px;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .blog-post-prose td {
          padding: 14px 18px;
          border-bottom: 1px solid rgba(49, 82, 185, 0.1);
          color: #334155;
          line-height: 1.6;
        }

        .blog-post-prose tr:last-child td {
          border-bottom: none;
        }

        /* ── Code Blocks ── */
        .blog-post-prose pre {
          background: #0D1117 !important;
          color: #E6EDF3 !important;
          padding: 1.5rem;
          border-radius: 12px;
          overflow-x: auto;
          font-family: 'Fira Code', 'Courier New', Courier, monospace;
          border: 1px solid #30363D;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          margin: 1.75rem 0 2.25rem;
        }

        .blog-post-prose code {
          font-family: 'Fira Code', 'Courier New', Courier, monospace;
          font-size: 0.9em;
        }

        .blog-post-prose p code,
        .blog-post-prose li code {
          background: rgba(49, 82, 185, 0.08);
          color: #3152B9;
          padding: 2px 6px;
          border-radius: 5px;
          font-weight: 600;
          font-size: 0.88em;
          border: 1px solid rgba(49, 82, 185, 0.14);
        }

        /* ── Mobile Table of Contents Accordion ── */
        .mobile-toc-card {
          display: none;
          margin-bottom: 2rem;
          background: #FAF7F2;
          border: 1.5px solid rgba(49, 82, 185, 0.16);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(49, 82, 185, 0.04);
        }

        .mobile-toc-toggle {
          width: 100%;
          background: transparent;
          border: none;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          font-size: 0.92rem;
          font-weight: 700;
          color: #3152B9;
          cursor: pointer;
          text-align: left;
        }

        .mobile-toc-list {
          list-style: none;
          margin: 0;
          padding: 0 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          border-top: 1px solid rgba(49, 82, 185, 0.1);
          padding-top: 1rem;
        }

        .mobile-toc-list a {
          font-size: 0.88rem;
          color: #475569;
          text-decoration: none;
          display: block;
          padding: 0.35rem 0.6rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .mobile-toc-list a:hover {
          color: #3152B9;
          background: rgba(49, 82, 185, 0.06);
        }

        /* ── Responsive Media Queries ── */
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .toc-sidebar {
            display: none;
          }

          .mobile-toc-card {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .blog-post-prose {
            font-size: 1.02rem;
            line-height: 1.8;
          }

          .blog-post-prose h2 {
            font-size: 1.65rem;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
          }

          .blog-post-prose h3 {
            font-size: 1.3rem;
            margin-top: 2rem;
          }

          .blog-post-prose .blog-callout {
            padding: 1.5rem 1.25rem;
          }

          .blog-post-prose .blog-quote,
          .blog-post-prose blockquote {
            padding: 1.25rem 1.25rem;
            font-size: 1.02rem;
          }

          .blog-post-prose p {
            margin-bottom: 1.4rem;
          }

          .blog-post-prose .blog-lead {
            padding: 1.25rem 1.25rem;
            margin: 1.5rem 0 2rem;
          }

          .blog-breadcrumb .current {
            max-width: 180px;
          }
        }
      `}</style>
          
      <div className="site-container" style={{ paddingTop: "120px", paddingBottom: "100px", maxWidth: "1200px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumbs" className="blog-breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/blog">Blog</Link>
          <span className="sep">/</span>
          <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>
          <span className="sep">/</span>
          <span className="current" title={post.title}>{post.title}</span>
        </nav>

        {/* Back Link */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Link 
            href="/blog" 
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.5rem", 
              color: "#3152B9", 
              fontSize: "0.9rem", 
              fontWeight: 700, 
              textDecoration: "none",
              background: "rgba(49, 82, 185, 0.08)",
              padding: "6px 14px",
              borderRadius: "100px",
              transition: "all 0.2s ease"
            }}
            className="hover-back-btn"
          >
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="blog-hero" style={{ marginBottom: "3rem" }}>
          {/* Category Tag */}
          <div style={{
            display: "inline-block",
            padding: "0.3rem 0.85rem",
            background: "#3152B9",
            color: "#FFFFFF",
            borderRadius: "100px",
            fontSize: "0.8rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "1.25rem"
          }}>
            {post.category}
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
                  <div style={{ width: "100%", height: "100%", background: "#3152B9", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                    {post.author.name[0]}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {post.author.name}
                  {post.author.name === "Gurucharan R" && (
                    <Link 
                      href="https://www.linkedin.com/in/gurucharanraghunathan/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="If Headless SecOps sparked a question or a thought, Gurucharan would love to hear it. Connect with him on LinkedIn"
                      style={{ display: "inline-flex", color: "#64748B", transition: "color 0.2s" }}
                    >
                      <LinkedinIcon size={16} />
                    </Link>
                  )}
                  {post.author.name === "Michael Wilson" && (
                    <Link 
                      href="https://www.linkedin.com/in/michael-wilson-rebello-b719a86/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Connect with Michael Wilson on LinkedIn"
                      style={{ display: "inline-flex", color: "#64748B", transition: "color 0.2s" }}
                    >
                      <LinkedinIcon size={16} />
                    </Link>
                  )}
                </div>
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
                background: "#3152B9",
                color: "#FFFFFF",
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
        </header>


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
                        color: activeHeadingId === item.id ? "#3152B9" : "#475569",
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "block",
                        padding: "0.5rem 0.85rem",
                        borderRadius: "8px",
                        background: activeHeadingId === item.id 
                          ? "rgba(49, 82, 185, 0.06)" 
                          : "transparent",
                        borderLeft: activeHeadingId === item.id 
                          ? "3px solid #3152B9" 
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

            {/* CTA Card */}
            <div style={{
              marginTop: "2rem",
              padding: "1.25rem 1.5rem",
              border: "1.5px solid rgba(49, 82, 185, 0.18)",
              borderRadius: "14px",
              background: "#EDE7D9",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem"
            }}>
              <p style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#3152B9",
                margin: 0,
                textTransform: "uppercase"
              }}>SEE TRENCH IN ACTION</p>
              <h4 style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#111",
                margin: 0,
                lineHeight: 1.45
              }}>Agentic OS for Actionable SecOps</h4>
              <Link href="/connect" style={{ marginTop: "0.4rem" }}>
                <Button>Get a Demo</Button>
              </Link>
            </div>
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
              <div
                onClick={() => setLightboxImage({ src: displayImage(post.image), alt: post.title })}
                style={{ 
                  width: "100%", 
                  aspectRatio: "16/9", 
                  borderRadius: "16px", 
                  overflow: "hidden", 
                  position: "relative", 
                  marginBottom: "2.5rem", 
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
                  border: "1px solid #E2E8F0",
                  cursor: "zoom-in"
                }}
                role="button"
                aria-label="Open cover image preview"
              >
                <Image src={displayImage(post.image)} alt={post.title} fill style={{ objectFit: "cover" }} priority />
              </div>
            )}

            {/* The Rendered HTML Blog Content */}
            <article 
              ref={articleRef} 
              className="blog-post-prose blog-post-body"
              suppressHydrationWarning
            >
              {normalizedBodyWithIds
                .replace(/<p[^>]*>\s*(<!-- INJECT_HEADLESS_SECOPS_DIAGRAM -->)\s*<\/p>/g, "$1")
                .replace(/<p[^>]*>\s*(<!-- INJECT_SECTION3_VISUAL -->)\s*<\/p>/g, "$1")
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

            {/* Master CTA — inline within blog content, above comments */}
            {post.slug !== "introducing-headless-secops-for-the-agentic-world" &&
              post.slug !== "ai-in-the-security-operations-clearing-the-clutter" &&
              post.slug !== "actionable-secops-in-the-real-world" &&
              post.slug !== "ai-changed-the-threat-landscape-why-are-we-still-defending-like-its-2020" &&
              post.slug !== "trench-agentic-secops-skills-vs-playbooks" && (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "2rem",
                flexWrap: "wrap",
                background: "#3152B9",
                borderRadius: "16px",
                padding: "2.25rem 3rem",
                marginTop: "3rem",
                marginBottom: "0.5rem",
                boxShadow: "0 10px 30px rgba(49, 82, 185, 0.15)",
              }}>
                <h3 style={{
                  fontSize: "clamp(1.35rem, 3.5vw, 1.85rem)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-primary)",
                  lineHeight: 1.3,
                  margin: 0,
                }}>
                  Agentic OS for Actionable SecOps
                </h3>
                <Link
                  href="/connect"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "#FFFFFF",
                    color: "#3152B9",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    padding: "0.85rem 1.75rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    fontFamily: "var(--font-primary)",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                  }}
                  className="master-cta-btn"
                >
                  Explore Trench →
                </Link>
              </div>
            )}

            {/* Custom Interactive Section: Comments Module */}
            <section style={{ marginTop: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                <MessageSquare size={24} color="#3152B9" />
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", margin: 0, fontFamily: "var(--font-primary)" }}>
                  Discussion ({comments.length})
                </h3>
              </div>

              {/* Comment submission form */}
              <form onSubmit={handleCommentSubmit} style={{
                background: "#EDE7D9",
                borderRadius: "20px",
                border: "1px solid rgba(49, 82, 185, 0.12)",
                padding: "2rem",
                marginBottom: "2.5rem",
                boxShadow: "0 10px 30px rgba(49, 82, 185, 0.03)"
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
                        border: "1px solid rgba(49, 82, 185, 0.12)",
                        background: "#EDE7D9",
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
                        border: "1px solid rgba(49, 82, 185, 0.12)",
                        background: "#EDE7D9",
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
                    background: "#3152B9",
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
                      background: "#EDE7D9",
                      borderRadius: "16px",
                      border: "1px solid rgba(49, 82, 185, 0.12)",
                      padding: "1.5rem",
                      boxShadow: "0 4px 12px rgba(49, 82, 185, 0.02)"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(49, 82, 185, 0.08)", color: "#3152B9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem" }}>
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
                    background: '#EDE7D9', 
                    borderRadius: '20px', 
                    border: '1px solid rgba(49, 82, 185, 0.12)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: "0 4px 20px rgba(49, 82, 185, 0.03)",
                    transition: "transform 0.2s"
                  }} className="related-card">
                    <Link href={`/blog/${relatedPost.slug}`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      {/* Image */}
                      <div style={{ aspectRatio: '16/9', background: '#F1F5F9', overflow: 'hidden', position: 'relative' }}>
                        {relatedPost.image ? (
                          <Image src={displayImage(relatedPost.image)} alt={relatedPost.title} fill style={{ objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: '#E2E8F0', opacity: 0.5 }}></div>
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
                            color: '#3152B9', 
                            background: 'rgba(49, 82, 185, 0.08)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '100px'
                          }}>
                            {relatedPost.category}
                          </span>
                          <span style={{ color: '#3152B9', fontWeight: 700 }}>→</span>
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

      {/* Lightbox Image Preview Modal Overlay */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            background: "rgba(15, 23, 42, 0.92)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            cursor: "zoom-out"
          }}
        >
          <button 
            onClick={() => setLightboxImage(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              fontSize: "1.5rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100000
            }}
            aria-label="Close image preview"
          >
            {"✕"}
          </button>
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.alt} 
              style={{ 
                maxWidth: "90vw", 
                maxHeight: "85vh", 
                objectFit: "contain", 
                borderRadius: "12px", 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
              }} 
            />
            {lightboxImage.alt && (
              <p style={{ color: "#CBD5E1", marginTop: "1rem", fontSize: "0.95rem", textAlign: "center", fontWeight: 500 }}>
                {lightboxImage.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
