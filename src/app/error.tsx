"use client";

import React, { useEffect } from "react";
import Button from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console
    console.error("Unhandled Route Error:", error);
  }, [error]);

  return (
    <div className="global-error-container">
      <div className="error-card">
        {/* Glowing Red Warning Ring */}
        <div className="error-pulse-ring"></div>
        
        {/* Tech Warning Icon Core */}
        <div className="tech-error-core">
          <svg className="tech-error-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V14" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18.0195V18" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0 -3.42 0z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="error-text-wrapper">
        <h2 className="error-title">Connection Interrupted</h2>
        <p className="error-subtitle">An anomaly was detected inside the terminal pipeline.</p>
        {error.message && (
          <code className="error-details-box">
            {error.message.substring(0, 100)}...
          </code>
        )}
      </div>

      <div className="error-actions-wrapper">
        <Button onClick={() => reset()} className="error-retry-btn">
          Retry Connection
        </Button>
        <a href="/" className="error-home-link">
          Return to Hub
        </a>
      </div>

      <style jsx global>{`
        .global-error-container {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #0e1630 0%, #060a17 100%);
          z-index: 99998;
          font-family: var(--font-space-grotesk), sans-serif;
          color: #ffffff;
          overflow: hidden;
        }

        .error-card {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        /* Pulsing Red Warning Ring */
        .error-pulse-ring {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 2px solid rgba(239, 68, 68, 0.25);
          animation: error-pulse-animation 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        /* Tech Error Center */
        .tech-error-core {
          position: absolute;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 50%;
          border: 1px solid rgba(239, 68, 68, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.15);
        }

        .tech-error-svg {
          width: 28px;
          height: 28px;
        }

        /* Error Texts */
        .error-text-wrapper {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0 2rem;
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .error-title {
          font-family: var(--font-bricolage), sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 30%, rgba(255, 255, 255, 0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .error-subtitle {
          font-size: 0.95rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.5;
        }

        .error-details-box {
          font-family: var(--font-space-grotesk), monospace;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 0.75rem;
          max-width: 100%;
          word-break: break-all;
        }

        /* Actions */
        .error-actions-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .error-home-link {
          font-size: 0.875rem;
          font-weight: 600;
          color: #94a3b8;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s ease;
        }

        .error-home-link:hover {
          color: #ffffff;
        }

        @keyframes error-pulse-animation {
          0% {
            transform: scale(0.85);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.85);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
