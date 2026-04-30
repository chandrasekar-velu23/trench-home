"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "./ui/Button";
import "./Navbar.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Why Trench?", href: "/why-trench" },
  { name: "Integrations", href: "/integrations" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if we are on a page that needs specific styling
  const isAltPage = pathname === "/blog" || pathname === "/integrations";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for style changes (threshold: 10px as per sample)
      setIsScrolled(currentScrollY > 10);

      // Auto-hide logic (only if mobile menu is NOT open)
      if (!mobileMenuOpen) {
        if (currentScrollY < 10) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false); // Scrolling down
        } else {
          setIsVisible(true); // Scrolling up
        }
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar if cursor is near the top (grab zone)
      if (e.clientY < 60) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <React.Fragment>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: (isVisible || mobileMenuOpen) ? 0 : -100,
          opacity: (isVisible || mobileMenuOpen) ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={`custom-nav transition-all duration-300 ${(isScrolled || mobileMenuOpen || isAltPage) ? 'nav-scrolled' : 'nav-transparent'
          }`}
      >
        <div className="container-nav d-flex items-center justify-between w-full h-full">
          {/* Logo Section */}
          <Link href="/" className="nav-logo group z-[60]">
            <Image
              src="/logo/trench-logo.png"
              alt="Trench Logo"
              width={160}
              height={38}
              priority
              className="logo-img transition-transform duration-300"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links-center hide-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="nav-actions d-flex items-center">
            <Link href="/connect" className="hide-mobile">
              <Button>
                Book a Demo
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="mobile-hamburger z-[2100]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >


              <div className="hamburger-box">
                <span className={`hamburger-inner ${mobileMenuOpen ? 'open' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mobile-overlay"
          >
            <div className="mobile-overlay-content">
              <nav className="mobile-nav-items">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 + index * 0.05,
                    }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.3,
                }}
                className="mobile-cta-container"
              >
                <Link href="/connect" onClick={() => setMobileMenuOpen(false)}>
                  <Button style={{ width: "100%" }}>
                    Book a Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
