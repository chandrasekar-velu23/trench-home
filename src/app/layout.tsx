import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClickSpark from "@/components/animations/ClickSpark";
import NavigationLoaderProvider from "@/components/NavigationLoader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const bricolage = localFont({
  src: "../../public/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
  variable: "--font-bricolage",
  display: "swap",
});

const space = localFont({
  src: "../../public/fonts/Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trenchsecurity.ai"),

  title: {
    default: "Trench | Agentic OS for Actionable SecOps",
    template: "%s | Trench Security",
  },

  description:
    "Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically.",

  keywords: [
    "Cybersecurity",
    "SecOps",
    "Agentic SecOps",
    "SOC Automation",
    "SIEM",
    "Security Operations",
    "Enterprise Security",
    "Cloud Security",
    "Trench Security",
  ],

  authors: [{ name: "Trench Security" }],
  creator: "Trench Security",
  publisher: "Trench Security",

  verification: {
    google: "oYp5PFy7iOQQx5URYjzRrVn_etEIbG1qLxoRQ3PPB-4",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Trench | Agentic OS for Actionable SecOps",
    description:
      "Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically.",
    url: "https://www.trenchsecurity.ai",
    siteName: "Trench Security",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/logo/trench-logo.png",
        width: 1200,
        height: 630,
        alt: "Trench SecOps Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Trench | Agentic OS for Actionable SecOps",
    description:
      "Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically.",
    images: ["/logo/trench-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${space.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <Analytics />
      <body
        className="antialiased font-secondary"
        suppressHydrationWarning
      >
        <LenisProvider>
          <NavigationLoaderProvider>
            <Navbar />

            <ClickSpark
              sparkColor="#0D41E1"
              sparkSize={15}
              sparkRadius={25}
              sparkCount={12}
              duration={500}
            >
              {children}
            </ClickSpark>

            <Footer />
          </NavigationLoaderProvider>
        </LenisProvider>
      </body>
    </html>
  );
}