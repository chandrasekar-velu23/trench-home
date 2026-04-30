"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring } from "framer-motion";

interface ScrollyCanvasProps {
  totalFrames: number;
  pathPattern: (index: number) => string;
}

const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({ totalFrames, pathPattern }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Track scroll progress through the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply a smooth spring transition to the scroll progress
  // This adds inertia and makes the scrubbing feel premium and fluid
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60, // Lower stiffness for a more cinematic, slower follow
    damping: 30,   // High damping to prevent oscillation
    restDelta: 0.001
  });

  // Map smooth progress (0-1) to frame index (0 to totalFrames - 1)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

  /**
   * Manual 'object-fit: cover' implementation for Canvas
   */
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img) return;

    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, xOffset, yOffset;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      xOffset = (canvasWidth - drawWidth) / 2;
      yOffset = 0;
    } else {
      // Image is taller than canvas
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      xOffset = 0;
      yOffset = (canvasHeight - drawHeight) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);
  }, []);

  // Handle Canvas Resizing separately
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Re-render current frame after resize
      const currentIndex = Math.round(frameIndex.get());
      renderFrame(currentIndex);
    }
  }, [frameIndex, renderFrame]);

  // Preload all images into memory
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const preloadImages = async () => {
      const promises = Array.from({ length: totalFrames }).map((_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = pathPattern(i + 1);
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
            resolve();
          };
          img.onerror = () => resolve(); // Continue even if one fails
          images[i] = img;
        });
      });

      await Promise.all(promises);
      imagesRef.current = images;
      setImagesLoaded(true);
      
      // Initialize canvas size and draw first frame
      updateCanvasSize();
    };

    preloadImages();
  }, [totalFrames, pathPattern, updateCanvasSize]);

  // Handle Resize
  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (imagesLoaded) {
      requestAnimationFrame(() => renderFrame(Math.round(latest)));
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[800vh] bg-transparent">
      {/* Sticky Canvas Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
          style={{ width: "100vw", height: "100vh" }}
        />

        {/* Cinematic Overlay - Subtler for light mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />

        {/* Loading State */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "var(--color-bg-primary)" }}>
            <div className="text-center">
              <div className="text-black/50 text-xs tracking-widest uppercase mb-4 font-inter">
                Initializing Cinema
              </div>
              <div className="w-48 h-[1px] bg-black/10 overflow-hidden">
                <motion.div 
                   className="h-full bg-black"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-black tracking-tighter mb-4 font-inter">
              TRENCH
            </h1>
            <p className="text-black/60 text-sm md:text-base tracking-[0.3em] uppercase font-inter">
              The Future of AI-Native Security
            </p>
          </motion.div>
        </div>

        {/* "Next Section" Hint - Only enabled when animation ends */}
        <motion.div
          style={{ 
            opacity: useTransform(scrollYProgress, [0.9, 0.98], [0, 1]),
            translateY: useTransform(scrollYProgress, [0.9, 0.98], [20, 0])
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
        >
          <p className="text-black/60 text-[10px] tracking-[0.4em] uppercase font-inter">
            Scroll to Explore
          </p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-black/40 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollyCanvas;
