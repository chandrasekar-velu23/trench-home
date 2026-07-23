"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "./ui/Button";
import { ChevronDown, BookOpen, Calendar, FlaskConical, Video, Trophy } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Why Trench?", href: "/why-trench" },
  { name: "Integrations", href: "/integrations" },
  {
    name: "Resources",
    href: "#",
    dropdown: [
      { name: "Blogs", href: "/blog", icon: BookOpen },
      { name: "Trench Labs", href: "/resources/trench-labs", icon: FlaskConical },
      { name: "Webinars", href: "/resources/webinars", icon: Video },
      { name: "Community", href: "/resources/community", icon: Trophy }
    ]
  },
  { name: "Partners", href: "/for-mssps" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

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
          y: (isVisible || mobileMenuOpen) ? 0 : -150,
          opacity: (isVisible || mobileMenuOpen) ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="custom-nav-fixed-container"
      >
        {/* Announcement Ticker Bar */}
        <div className="announcement-bar">
          <div className="announcement-ticker">
            <div className="announcement-ticker-item">
              <span>Read our latest blog post: <strong>The Agent Is Not the Product. The Foundation Is.</strong></span>
              <Link href="/blog/the-agent-is-not-the-product-the-foundation-is" className="announcement-button">
                Read Article
              </Link>
            </div>
            <div className="announcement-ticker-item" aria-hidden="true">
              <span>Read our latest blog post: <strong>The Agent Is Not the Product. The Foundation Is.</strong></span>
              <Link href="/blog/the-agent-is-not-the-product-the-foundation-is" className="announcement-button">
                Read Article
              </Link>
            </div>
            <div className="announcement-ticker-item" aria-hidden="true">
              <span>Read our latest blog post: <strong>The Agent Is Not the Product. The Foundation Is.</strong></span>
              <Link href="/blog/the-agent-is-not-the-product-the-foundation-is" className="announcement-button">
                Read Article
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`custom-nav transition-all duration-300 ${(isScrolled || mobileMenuOpen || isAltPage) ? 'nav-scrolled' : 'nav-transparent'
            }`}
        >
          <div className="container-nav d-flex items-center justify-between w-full h-full">
          {/* Logo Section */}
          <Link href="/" className="nav-logo group z-[60]">
            <Image
              src="/logo/trench-logo.webp"
              alt="Trench Logo"
              width={160}
              height={32}
              priority
              className="logo-img transition-transform duration-300"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links-center hide-mobile">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.name}
                  className="nav-item-dropdown-container"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`nav-link nav-dropdown-trigger ${
                      pathname.startsWith("/resources") || pathname === "/blog" ? "active" : ""
                    } d-flex items-center gap-1`}
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    {link.name}
                    <motion.span
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="d-flex items-center"
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="nav-dropdown-menu"
                      >
                        <div className="nav-dropdown-grid">
                          {link.dropdown.map((subLink) => {
                            const SubIcon = subLink.icon;
                            return (
                              <Link
                                key={subLink.name}
                                href={subLink.href}
                                className="nav-dropdown-item d-flex gap-3"
                                onClick={() => setDropdownOpen(false)}
                              >
                                <div className="sublink-icon-wrap d-flex items-center justify-center">
                                  <SubIcon size={18} className="sublink-icon" />
                                </div>
                                <div className="sublink-text">
                                  <div className="sublink-name">{subLink.name}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop Actions */}
          <div className="nav-actions d-flex items-center">
            <Link href="/connect" className="hide-mobile">
              <Button>
                Get Started
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
                {navLinks.map((link, index) => {
                  if (link.dropdown) {
                    return (
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
                        <button
                          className={`mobile-nav-link ${
                            pathname.startsWith("/resources") || pathname === "/blog" ? "active" : ""
                          }`}
                          onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            font: "inherit",
                            textAlign: "left",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontWeight: 700,
                          }}
                        >
                          <span>{link.name}</span>
                          <motion.span
                            animate={{ rotate: mobileResourcesOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <ChevronDown size={18} />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {mobileResourcesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mobile-dropdown-list"
                              style={{ overflow: "hidden", paddingLeft: "1.5rem" }}
                            >
                              {link.dropdown.map((subLink) => {
                                const SubIcon = subLink.icon;
                                return (
                                  <Link
                                    key={subLink.name}
                                    href={subLink.href}
                                    className={`mobile-nav-link`}
                                    style={{ fontSize: "15px", padding: "0.5rem 1rem", color: "var(--color-neutral-600)" }}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setMobileResourcesOpen(false);
                                    }}
                                  >
                                    <SubIcon size={16} />
                                    <span>{subLink.name}</span>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }
                  return (
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
                  );
                })}
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
                  <Button>
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
