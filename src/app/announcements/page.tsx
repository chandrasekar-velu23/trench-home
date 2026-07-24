import type { Metadata } from "next";
import AnnouncementsListClient from "./AnnouncementsListClient";

export const metadata: Metadata = {
  title: "Announcements | Trench Security",
  description:
    "Stay up to date with the latest news, awards, and milestones from Trench Security — the agentic SecOps platform built for actionable threat detection and response.",
  keywords: [
    "Trench Security announcements",
    "Cybersecurity news",
    "Products That Count 2026",
    "Product Awards Winner",
    "SecOps news",
    "Trench Security award",
    "Agentic SecOps",
  ],
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
    canonical: "https://www.trenchsecurity.ai/announcements",
  },
  openGraph: {
    title: "Announcements | Trench Security",
    description:
      "Stay up to date with the latest news, awards, and milestones from Trench Security.",
    url: "https://www.trenchsecurity.ai/announcements",
    siteName: "Trench Security",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/awards/2025 Products Awards Winner.png",
        width: 1200,
        height: 630,
        alt: "Trench Security - 2026 Products That Count Award Winner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Announcements | Trench Security",
    description:
      "Stay up to date with the latest news, awards, and milestones from Trench Security.",
    images: ["/awards/2025 Products Awards Winner.png"],
  },
};

export default function AnnouncementsPage() {
  return <AnnouncementsListClient />;
}
