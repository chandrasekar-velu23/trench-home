"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function FloatingNewsletterButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if the user is "new" by seeing if they've already received the prompt
    // (Using localStorage ensures they only see this once across visits)
    const hasPrompted = localStorage.getItem("trench_newsletter_prompted");
    
    if (!hasPrompted) {
      // Delay slightly so the user can see the page first before the notification pops
      const timer = setTimeout(() => {
        setShowTooltip(true);
        localStorage.setItem("trench_newsletter_prompted", "true");
        
        // Try playing the notification sound. 
        // Note: Modern browsers block autoplay audio unless the user has interacted with the page first.
        // We catch the error to prevent console errors if it gets blocked.
        if (audioRef.current) {
          audioRef.current.volume = 0.5; // Keep the bell sound polite
          audioRef.current.play().catch(e => {
             console.log("Notification sound blocked by browser interaction policy.");
          });
        }

        // Auto-hide the tooltip after 10 seconds to keep it interactive but unintrusive
        setTimeout(() => {
          setShowTooltip(false);
        }, 10000);
      }, 2500); // Show 2.5 seconds after page loads

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 50 }}>
      {/* Audio element for the notification bell (Clean pop/ding sound) */}
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" />

      {/* Tooltip Popover with notes about the newsletter */}
      {showTooltip && (
        <div 
          className="newsletter-tooltip"
          style={{
            position: "absolute",
            bottom: "100%",
            left: "0",
            marginBottom: "20px",
            width: "320px",
            backgroundColor: "#111827",
            color: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transformOrigin: "bottom left"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <h4 style={{ fontWeight: 600, fontSize: "16px", margin: 0, color: "#fff" }}>Trench Digest</h4>
            <button 
              onClick={(e) => { e.preventDefault(); setShowTooltip(false); }}
              style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", padding: "4px", marginTop: "-4px", marginRight: "-4px" }}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <p style={{ fontSize: "14px", color: "#d1d5db", margin: 0, lineHeight: 1.5 }}>
            Get weekly zero-day breakdowns, cloud defense blueprints, and actionable security insights—straight from the digital trenches.
          </p>
          
          {/* Triangle pointer */}
          <div style={{
            position: "absolute",
            bottom: "-6px",
            left: "40px",
            width: "12px",
            height: "12px",
            backgroundColor: "#111827",
            transform: "rotate(45deg)",
          }}></div>
        </div>
      )}

      {/* Inline styles for animation and hover states */}
      <style dangerouslySetInnerHTML={{__html: `
        .newsletter-tooltip {
          animation: popup 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes popup {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(13, 65, 225, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(13, 65, 225, 0); }
          100% { box-shadow: 0 0 0 0 rgba(13, 65, 225, 0); }
        }
        .floating-newsletter-btn {
          background-color: #0D41E1;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .floating-newsletter-btn:hover {
          background-color: #0b36c2;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
        }
        .floating-newsletter-btn.pulsing {
          animation: pulse-ring 2s infinite;
        }
      `}} />

      <Link 
        href="/newsletter-signup" 
        className={`floating-newsletter-btn ${showTooltip ? 'pulsing' : ''}`}
        onClick={() => setShowTooltip(false)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
        SUBSCRIBE TO TRENCH DIGEST
      </Link>
    </div>
  );
}
