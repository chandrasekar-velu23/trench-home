"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AdvancedTimelineProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export default function AdvancedTimeline({ 
  children, 
  className = "", 
  staggerDelay = 0.2, 
  initialDelay = 0 
}: AdvancedTimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  );
}
