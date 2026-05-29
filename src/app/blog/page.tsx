import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog | Trench Security",
  description: "Insights, research, and perspectives on AI-native SecOps, agentic automation, and the future of security operations — for security champions who think differently.",
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
    canonical: "https://www.trenchsecurity.ai/blog",
  },
  openGraph: {
    title: "Blog | Trench Security",
    description: "Insights, research, and perspectives on AI-native SecOps, agentic automation, and the future of security operations — for security champions who think differently.",
    url: "https://www.trenchsecurity.ai/blog",
    siteName: "Trench Security",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.trenchsecurity.ai/blog-cover-images/Headless-SecOps-for-the-Agentic-World.png",
        width: 1200,
        height: 630,
        alt: "Trench Security Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Trench Security",
    description: "Insights, research, and perspectives on AI-native SecOps, agentic automation, and the future of security operations.",
    images: ["https://www.trenchsecurity.ai/blog-cover-images/Headless-SecOps-for-the-Agentic-World.png"],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
