"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../animations/ScrollReveal";
import TextReveal from "../animations/TextReveal";

const highlights = [
  {
    id: 1,
    logo: "/awards/Logo IAA (White).jpg",
    title: "Indian Achievers Award",
    subtitle: "Building Global Cybersecurity Innovation",
    bg: "#ffffff"
  },
  {
    id: 2,
    logo: "/awards/CySecK Logo PNG@900x.png",
    title: "H.A.C.K Cohort-5 Startup",
    subtitle: "Trench was selected as part of the H.A.C.K Cohort-5 acceleration journey supporting cybersecurity innovation and scalable security solutions.",
    bg: "#FFFFFF"
  }
];

export default function Highlight() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % highlights.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const current = highlights[index];

  return (
    <section className="award-section">
      <div className="container-full">
        <ScrollReveal direction="up" className="text-center" distance={40} style={{ marginBottom: "2rem" }}>
          <TextReveal text="Highlights from Trench Security" as="h4" className="title-medium" style={{ justifyContent: "center", width: "100%" }} />
        </ScrollReveal>

        <div className="slider-card">
          <div className="slider-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="slide-item"
              >
                <div className="card-content">
                  <div className="logo-wrapper" style={{ background: current.bg }}>
                    <Image
                      src={current.logo}
                      alt={current.title}
                      width={120}
                      height={60}
                      className="award-logo"
                    />
                  </div>
                  <div className="text-content">
                    <h3 className="award-title">{current.title}</h3>
                    <p className="award-subtitle">{current.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="dots-container">
            {highlights.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .award-section {
          padding: 3rem 0;
          background: transparent;
          color: #111111;
        }

        .award-section h2 {
          font-size: 1.2rem !important;
          font-weight: 600;
        }

        .slider-card {
          position: relative;
          max-width: 650px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: border-color 0.3s ease;
        }

        .slider-card:hover {
          border-color: rgba(0, 0, 0, 0.15);
        }

        .slider-content {
          width: 100%;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slide-item {
          width: 100%;
        }

        .card-content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .logo-wrapper {
          flex-shrink: 0;
          height: 60px;
          width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          overflow: hidden;
          padding: 0.25rem;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .award-logo {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: left;
        }

        .award-title {
          font-size: 1.3rem;
          font-weight: bold;
          margin: 0;
          color: #111111;
        }

        .award-subtitle {
          font-size: 0.95rem;
          color: #666666;
          margin: 0;
          line-height: 1.4;
        }

        .dots-container {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid #0D41E1;
          background: transparent;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #0D41E1;
        }

        @media (max-width: 768px) {
          .award-section {
            padding: 2rem 1rem;
          }

          .slider-card {
            padding: 1.5rem;
          }

          .card-content {
            flex-direction: column;
            text-align: center;
            gap: 1.25rem;
          }

          .text-content {
            text-align: center;
          }

          .logo-wrapper {
            width: 100px;
            height: 50px;
          }
        }
      `}</style>
    </section>
  );
}
