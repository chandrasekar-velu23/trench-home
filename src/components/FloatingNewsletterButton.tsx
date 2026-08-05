"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function FloatingNewsletterButton() {
  const pathname = usePathname();
  // We use `isExpanded` to control if the text is shown alongside the icon.
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const hasPrompted = localStorage.getItem("trench_newsletter_expanded");
    
    if (!hasPrompted) {
      const timer = setTimeout(() => {
        setIsExpanded(true);
        localStorage.setItem("trench_newsletter_expanded", "true");
        
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          audioRef.current.play().catch(e => {
             console.log("Notification sound blocked by browser interaction policy.");
          });
        }

        // Auto-collapse the button after 8 seconds
        setTimeout(() => {
          setIsExpanded(false);
        }, 8000);
      }, 2500); 

      return () => clearTimeout(timer);
    }
  }, []);

  // Hide on the signup page itself so it's not redundant
  if (pathname === "/newsletter-signup") {
    return null;
  }

  const showText = isExpanded || isHovered;

  return (
    <div 
      style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 50 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" />

      <style dangerouslySetInnerHTML={{__html: `
        .floating-newsletter-btn {
          background-color: #0D41E1;
          color: #ffffff;
          height: 48px;
          border-radius: 9999px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
          white-space: nowrap;
        }
        .floating-newsletter-btn:hover {
          background-color: #0b36c2;
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
        }
        
        /* The container for the text that expands/collapses */
        .btn-text-container {
          display: inline-block;
          max-width: 0;
          opacity: 0;
          transition: max-width 0.4s ease, opacity 0.3s ease;
        }
        .btn-text-container.expanded {
          max-width: 250px;
          opacity: 1;
        }
      `}} />

      <Link 
        href="/newsletter-signup" 
        className="floating-newsletter-btn"
        onClick={() => setIsExpanded(false)}
      >
        <svg style={{ flexShrink: 0 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
        <span className={`btn-text-container ${showText ? 'expanded' : ''}`}>
          SUBSCRIBE TO TRENCH DIGEST
        </span>
      </Link>
    </div>
  );
}
