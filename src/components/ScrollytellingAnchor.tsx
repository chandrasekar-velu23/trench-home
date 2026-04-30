"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollytellingAnchor() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Transform sequences
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [1, 1.4, 1.8, 2.2, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const glassBlur = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 10, 0]);

  return (
    <div className="anchor-container">
      {/* Background Ambience handled in globals.css for full context, or here for layering */}
      <div 
        className="absolute-inset" 
        style={{ 
          background: "linear-gradient(to bottom right, #E0F2FE, #BAE6FD, #BEE3F8)",
          zIndex: -10 
        }} 
      />
      
      {/* The Central Visual */}
      <motion.div
        style={{ scale, opacity, y, rotate }}
        className="relative shadow-vis"
      >
        <div style={{ 
          width: "90vw", 
          maxWidth: "1000px", 
          aspectRatio: "16/9", 
          borderRadius: "40px", 
          overflow: "hidden",
          position: "relative"
        }}>
          <motion.img
            src="/assets/scenario/hero-scene.png"
            alt="The Sanctuary Catalyst"
            className="w-full h-full"
            style={{ filter: `blur(${glassBlur}px)`, objectFit: "cover" }}
          />
          
          {/* Living Overlay Layers */}
          <div className="absolute-inset" style={{ background: "linear-gradient(to top, rgba(15, 23, 42, 0.4), transparent, rgba(255, 255, 255, 0.1))" }} />
          
          {/* The 'Dome' Reflection */}
          <motion.div 
            className="absolute-inset border-dome"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
          />
        </div>
      </motion.div>

      <style jsx>{`
        .shadow-vis {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: all 0.7s ease-out;
        }
        .border-dome {
          border: 20px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
