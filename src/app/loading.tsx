"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="global-loader-container">
      <div className="loader-card">
        {/* Pulsing Outer Ring */}
        <div className="pulse-ring"></div>
        
        {/* Futuristic Spinning Segment */}
        <div className="spinner-segment"></div>
        
        {/* Center Tech Core */}
        <div className="tech-core">
          <svg className="tech-core-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0D41E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#0D41E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#0D41E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="loader-text-wrapper">
        <h2 className="loader-title">Securing Terminal</h2>
        <p className="loader-subtitle">Establishing secure agentic automation...</p>
      </div>

      <style jsx global>{`
        .global-loader-container {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #0e1630 0%, #060a17 100%);
          z-index: 99999;
          font-family: var(--font-space-grotesk), sans-serif;
          color: #ffffff;
          overflow: hidden;
        }

        .loader-card {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        /* Pulsing Outer Ring */
        .pulse-ring {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 2px solid rgba(13, 65, 225, 0.15);
          animation: core-pulse 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        /* Spinner Segment */
        .spinner-segment {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #0D41E1;
          border-right-color: rgba(13, 65, 225, 0.3);
          animation: tech-spin 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) infinite;
        }

        /* Tech Core Center */
        .tech-core {
          position: absolute;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(13, 65, 225, 0.2);
          animation: core-glow 2s ease-in-out infinite alternate;
        }

        .tech-core-svg {
          width: 24px;
          height: 24px;
          animation: float-svg 3s ease-in-out infinite;
        }

        /* Loader Texts */
        .loader-text-wrapper {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 2rem;
        }

        .loader-title {
          font-family: var(--font-bricolage), sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 30%, rgba(255, 255, 255, 0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .loader-subtitle {
          font-size: 0.875rem;
          color: #94a3b8;
          margin: 0;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Animations */
        @keyframes tech-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes core-pulse {
          0% {
            transform: scale(0.85);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.85);
            opacity: 0.8;
          }
        }

        @keyframes core-glow {
          0% {
            box-shadow: 0 0 15px rgba(13, 65, 225, 0.15);
            border-color: rgba(255, 255, 255, 0.08);
          }
          100% {
            box-shadow: 0 0 30px rgba(13, 65, 225, 0.45);
            border-color: rgba(13, 65, 225, 0.4);
          }
        }

        @keyframes float-svg {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
}
