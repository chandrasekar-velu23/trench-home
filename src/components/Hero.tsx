"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
            src="/images/Hero-sample.png"
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
            src="/images/Hero-ph-sample.png"
            alt="Trench Guardian Castle Mobile"
            fill
            priority
            quality={100}
            className="hero-bg-image"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

        </div>
        <div className="hero-overlay-sky" />
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-container-inner">
          <motion.div
            className="hero-glass-card"
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-top-group">
              <div className="hero-eyebrow-container">
                <span className="hero-eyebrow">Built for next generation Security Champions.</span>
              </div>

              <h1 className="title-lg hero-title-override">
                One AI Platform for <br className="hide-mobile" /> Cloud-Native Security Teams
              </h1>
            </div>

            <div className="hero-bottom-group">
              <p className="hero-subtitle">
                Ingest every signal, detect every threat, and respond at machine
                speed — while your coffee is still hot.
              </p>

              <div className="hero-button-group">
                <Button className="hero-btn-primary">
                  Get a Demo
                </Button>
                <Button variant="secondary" className="hero-btn-secondary">
                  Let's Talk
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="hero-bottom-fade" />

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 800px;
          display: flex;
          overflow: hidden;
        }

        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.85) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.15) 75%, transparent 100%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-bg-container {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg-image-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .hero-bg-image {
          object-fit: cover;
          object-position: center;
        }

        .desktop-bg { display: block; }
        .mobile-bg { display: none; }

        .hero-overlay-sky {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(13, 65, 225, 0.05) 0%, transparent 60%);
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 5;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 8rem 6rem 6rem;
        }

        .hero-container-inner {
          width: 100%;
          max-width: 1400px;
          display: flex;
          justify-content: center;
          align-items: stretch;
          flex: 1;
        }

        .hero-glass-card {
          padding: 0;
          max-width: 1000px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 2rem;
        }

        .hero-top-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
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
          color: #0D41E1;
          margin: 0;
          letter-spacing: -0.04em;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #334155;
          max-width: 580px;
          margin: 0;
          font-weight: 500;
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
          }
          .hero-glass-card {
            max-width: 800px;
            padding: 0;
          }
        }

        @media (max-width: 768px) {
          .desktop-bg { display: none; }
          .mobile-bg { display: block; }

          .hero-section {
            height: 100vh;
            min-height: 700px;
          }
          .hero-content-wrapper {
            padding: 1.5rem;
            padding-top: 80px; 
            align-items: center; 
            justify-content: flex-start;
          }
          .hero-container-inner {
            justify-content: center;
            align-items: stretch;
            flex: 1;
          }
          .hero-glass-card {
            padding: 0;
            border-radius: 0;
            text-align: center !important;
            align-items: center !important;
            margin-bottom: 0;
            background: transparent;
            width: 100%;
            height: 100%;
            justify-content: space-between;
          }
          .hero-title {
            font-size: 1.85rem;
            text-align: center;
          }
          .hero-subtitle {
            font-size: 0.95rem;
            text-align: center;
            margin: 0 auto;
          }
          .hero-button-group {
            flex-direction: column;
            width: 100%;
            gap: 1.25rem;
            align-items: center;
          }
          .hide-mobile { display: none; }
        }
      `}</style>
    </section>
  );
}
