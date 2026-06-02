"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AdvancedTimeline from "./animations/AdvancedTimeline";
import TextReveal from "./animations/TextReveal";
import ScrollReveal from "./animations/ScrollReveal";
import Parallax from "./animations/Parallax";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-container">
        {/* Desktop Background */}
        <div className="desktop-bg hero-bg-image-wrap">
          <Image
            src="/images/hero.png"
            alt="Trench Guardian Castle"
            fill
            priority
            quality={100}
            className="hero-bg-image"
            sizes="(max-width: 1024px) 100vw, 100vw"
          />

        </div>
        {/* Mobile Background */}
        <div className="mobile-bg hero-bg-image-wrap">
          <Image
            src="/images/hero ph.png"
            alt="Trench Guardian Castle Mobile"
            fill
            priority
            quality={100}
            className="hero-bg-image"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

        </div>
        {/* <div className="hero-overlay-sky" /> */}
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-container-inner">
          <motion.div
            className="hero-glass-card"
            initial={{ opacity: 0, x: 50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-top-group">
              <div className="hero-eyebrow-container">
                <span className="hero-eyebrow">Built for next generation Security Champions.</span>
              </div>

              <h1 className="title-lg hero-title-override">
                The Operating System for   <br className="hide-mobile" /> Actionable SecOps.
              </h1>
            </div>

            <div className="hero-bottom-group">
              <p className="hero-subtitle">
                An Agentic platform that does what your SIEM can't and your SOC never gets to, automatically.
              </p>

              <div className="hero-button-group">
                <Link href="/connect">
                  <Button className="hero-btn-primary">
                    Explore Trench
                  </Button>
                </Link>
                {/* <Link href="/connect">
                  <Button variant="secondary" className="hero-btn-secondary">
                    Take a Tour
                  </Button> */}
                {/* </Link> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div >
      <div className="hero-bottom-fade" />

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          display: flex;
          overflow: hidden;
          background-color: #0b1126 !important;
        }

        .hero-bottom-fade {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 160px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.03) 40%,
            rgba(255, 255, 255, 0.15) 65%,
            rgba(255, 255, 255, 0.45) 82%,
            rgba(255, 255, 255, 0.8) 93%,
            #ffffff 100%
          );
          z-index: 20;
          pointer-events: none;
        }

        .hero-bg-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: transparent !important;
        }

        .hero-bg-image-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: transparent !important;
        }

        .hero-bg-image {
          object-fit: cover !important;
          object-position: center;
          opacity: 1 !important;
          mix-blend-mode: normal !important;
        }

        .desktop-bg { display: block; }
        .mobile-bg { display: none; }

        

        .hero-content-wrapper {
          position: relative;
          z-index: 15;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: transparent !important;
        }

        .hero-container-inner {
          width: 100%;
          max-width: 1400px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: -20vh;
        }


        .hero-glass-card {
          padding: 0;
          max-width: 1000px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
        }

        .hero-top-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .hero-bottom-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .hero-title-override {
          margin: 0;
          text-align: center;
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .hero-eyebrow-container {
           margin-bottom: 0.5rem;
           text-align: center;
           width: 100%;
        }

        .hero-eyebrow {
          font-size: 16px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #ffffff;
          display: block;
          text-align: center;
        }

        .hero-title {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.05;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.04em;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #ffffff;
          max-width: 640px;
          margin: 0;
          font-weight: 500;
          text-align: center;
        }

        .hero-button-group {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .hide-mobile { display: block; }

        @media (max-width: 1024px) {
          .hero-content-wrapper {
            padding: 6rem 3rem 3rem;
            margin-top: -20vh;
          }
          .hero-glass-card {
            max-width: 800px;
          }
        }

        @media (max-width: 768px) {
          .desktop-bg { display: none; }
          .mobile-bg { display: block; }

          .hero-section {
            height: 100vh;
            min-height: 600px;
          }
          .hero-content-wrapper {
            padding: 1rem 1rem;
            padding-top: 80px; 
            align-items: center; 
            justify-content: flex-start;
          }
          .hero-container-inner {
            justify-content: center;
            align-items: center;
            flex: 1;
            margin-top: 15vh;
          }


          .hero-glass-card {
            padding: 0;
            border-radius: 0;
            text-align: center !important;
            align-items: center !important;
            margin-bottom: 0;
            background: transparent;
            width: 100%;
            height: auto;
            justify-content: center;
            gap: 1rem;
          }
          .hero-eyebrow {
            font-size: 12px;
          }
          .hero-title-override {
            font-size: 1.44rem !important;
            text-align: center;
            line-height: 1.15;
          }
          .hero-subtitle {
            font-size: 0.75rem;
            text-align: center;
            margin: 0 auto;
            color: #ffffff;
            max-width: 100%;
          }
          .hero-button-group {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
            align-items: center;
          }
          :global(.hero-btn-primary),
          :global(.hero-btn-secondary) {
            width: 162px !important;
            height: 41px !important;
          }
          :global(.hero-btn-primary .button-text),
          :global(.hero-btn-secondary .button-text) {
            font-size: 11px !important;
            letter-spacing: 1px !important;
          }
          .hide-mobile { display: none; }
        }

      `}</style>
    </section >
  );
}
