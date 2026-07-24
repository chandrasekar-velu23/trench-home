import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { announcementsData } from "../announcementsData";
import AnnouncementDetailClient from "./AnnouncementDetailClient";

const BASE_URL = "https://www.trenchsecurity.ai";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return announcementsData.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = announcementsData.find((a) => a.slug === slug);

  if (!item) {
    return { title: "Announcement Not Found", robots: { index: false, follow: false } };
  }

  const canonicalUrl = `${BASE_URL}/announcements/${slug}`;
  const absoluteImage = item.coverImage
    ? `${BASE_URL}${item.coverImage.startsWith("/") ? "" : "/"}${item.coverImage}`
    : `${BASE_URL}/logo/trench-logo.png`;

  return {
    title: item.title,
    description: item.seoDescription,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: item.title,
      description: item.seoDescription,
      url: canonicalUrl,
      siteName: "Trench Security",
      locale: "en_US",
      type: "article",
      publishedTime: item.publishedISO,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: item.coverImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.seoDescription,
      images: [absoluteImage],
    },
  };
}

export default async function AnnouncementDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = announcementsData.find((a) => a.slug === slug);
  if (!item) notFound();

  return <AnnouncementDetailClient item={item} />;
}
