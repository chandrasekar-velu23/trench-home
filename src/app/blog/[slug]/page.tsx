import { notFound } from "next/navigation";
import { Metadata } from "next";
import { postsData } from "../postsData";
import BlogClientLayout from "./BlogClientLayout";

const BASE_URL = "https://www.trenchsecurity.ai";

type Params = Promise<{ slug: string }>;

// Ensure image URL is always absolute for OG/Twitter cards and JSON-LD
function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Generate dynamic SEO metadata for each individual post
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: "Article Not Found | Trench Security",
      robots: { index: false, follow: false }
    };
  }

  // Sanitize description for metadata (remove tags/escaped characters if any)
  const cleanDescription = post.description
    .replace(/<[^>]+>/g, "")
    .replace(/&#\d+;/g, "")
    .substring(0, 160)
    .trim();

  const absoluteImage = absoluteUrl(post.image);
  const canonicalUrl = `${BASE_URL}/blog/${slug}`;

  return {
    title: `${post.title} | Trench Security Blog`,
    description: cleanDescription,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: post.title,
      description: cleanDescription,
      url: canonicalUrl,
      siteName: "Trench Security",
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime,
      authors: [post.author.name],
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: cleanDescription,
      images: [absoluteImage]
    }
  };
}

// Enable Next.js to statically generate all blog sub-routes at build-time
export async function generateStaticParams() {
  return postsData.map(post => ({
    slug: post.slug
  }));
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = postsData.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get 3 related posts (excluding current post)
  const relatedPosts = postsData
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  // JSON-LD structured data for Google Rich Search Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": absoluteUrl(post.image),
    "datePublished": post.publishedTime,
    "dateModified": post.modifiedTime,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Trench Security",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.trenchsecurity.ai/logo.png"
      }
    },
    "description": post.description.replace(/<[^>]+>/g, "").substring(0, 160).trim(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`
    }
  };

  return (
    <>
      {/* Insert JSON-LD script for rich SEO results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* High-fidelity Client Layout */}
      <BlogClientLayout post={post} relatedPosts={relatedPosts} />
    </>
  );
}
