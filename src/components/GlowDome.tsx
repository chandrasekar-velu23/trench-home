"use client";

import { motion } from "framer-motion";

export default function GlowDome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      {/* Outer Glow */}
      <motion.div
        className="absolute inset--4 -z-10 bg-dome-glow blur-[100px] opacity-20 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* The Glass Dome */}
      <div className="glass-panel relative overflow-hidden p-8 border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
        
        {/* Reflection Shimmer */}
        <motion.div
          className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
          animate={{
            left: ["100%", "-100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2
          }}
        />
      </div>
    </div>
  );
}
