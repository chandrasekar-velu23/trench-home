"use client";

import React, { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
  color: string;
  type: "auto" | "click";
}

export default function Loading() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const lastBurstRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const sparkColor = "#0D41E1"; // Primary Brand Blue

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const centerX = window.innerWidth / 2;
      let textX = centerX;
      let textY = window.innerHeight / 2;

      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        textX = rect.left + rect.width / 2;
        textY = rect.top + rect.height / 2;
      }

      // Auto emit delicate sparkles around the loading text every 800ms
      if (timestamp - lastBurstRef.current > 800) {
        const count = 6;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
          sparksRef.current.push({
            x: textX,
            y: textY,
            angle,
            startTime: timestamp,
            color: sparkColor,
            type: "auto",
          });
        }
        lastBurstRef.current = timestamp;
      }

      // Update and draw sparkles
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        const duration = spark.type === "click" ? 500 : 800;

        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);

        const startOffset = spark.type === "auto" ? 35 : 0;
        const sparkRadius = spark.type === "click" ? 35 : 45;
        const sparkSize = spark.type === "click" ? 14 : 10;

        const distance = startOffset + eased * sparkRadius;
        const lineLength = sparkSize * (1 - progress);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = spark.color;
        ctx.lineWidth = spark.type === "click" ? 2.5 : 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const now = performance.now();
    const count = 12;
    const sparkColor = "#0D41E1"; // Primary Brand Blue

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      sparksRef.current.push({
        x: e.clientX,
        y: e.clientY,
        angle,
        startTime: now,
        color: sparkColor,
        type: "click",
      });
    }
  };

  return (
    <div className="global-loader-container" onClick={handleClick}>
      <canvas ref={canvasRef} className="sparkle-canvas" />

      <div className="loader-wrapper">
        <div ref={textRef} className="loader-text">
          loading
        </div>
      </div>

      <style jsx global>{`
        .global-loader-container {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 99999;
          overflow: hidden;
          cursor: pointer;
        }

        .sparkle-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .loader-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
          z-index: 2;
        }

        .loader-text {
          font-family: var(--font-secondary), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #1e293b;
          letter-spacing: 0.3em;
          text-transform: lowercase;
          animation: pulse-text 2.5s ease-in-out infinite;
        }

        @keyframes pulse-text {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}


