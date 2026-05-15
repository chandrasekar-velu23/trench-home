import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClickSpark from "@/components/animations/ClickSpark";

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
  title: "Trench | The New OS for Agentic SecOps",
  description: "Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${space.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head></head>
      <body className="antialiased font-secondary" suppressHydrationWarning>
        <LenisProvider>
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
        </LenisProvider>
      </body>
    </html>
  );
}
