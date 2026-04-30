"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export default function TextReveal({ text, className = "", delay = 0, as: Wrapper = "div", style }: TextRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const MotionWrapper = (motion as any).create ? (motion as any).create(Wrapper) : (motion as any)(Wrapper);

  return (
    <MotionWrapper
      style={{ display: "flex", flexWrap: "wrap", ...style }}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </MotionWrapper>
  );
}
