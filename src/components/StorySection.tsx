"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StorySectionProps {
  title: string;
  description: string;
  image?: string;
  reverse?: boolean;
}

export default function StorySection({ title, description, image, reverse }: StorySectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
      <div className={`container mx-auto flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}>
        
        {image && (
          <div className="w-full md:w-1/2 overflow-hidden rounded-3xl glass-morphism">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-[60vh] object-cover"
              style={{ scale, y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
            />
          </div>
        )}

        <motion.div 
          className="w-full md:w-1/2 text-left"
          style={{ opacity }}
        >
          <motion.h2 
            className="title-lg mb-6 text-white"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-xl text-white/40 leading-relaxed max-w-lg"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute -bottom-20 -z-10 blur-[120px] opacity-10 w-[600px] h-[600px] bg-cyan-500 rounded-full"
        style={{ y }}
      />
    </section>
  );
}
