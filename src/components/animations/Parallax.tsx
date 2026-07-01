"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // How much it moves relative to scroll (e.g. 0.5 is half speed, -0.5 moves opposite)
  className?: string;
}

export default function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y, position: "relative" }} className={className}>
      {children}
    </motion.div>
  );
}
