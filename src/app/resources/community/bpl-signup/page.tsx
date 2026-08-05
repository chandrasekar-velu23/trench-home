"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  Calendar,
  Sparkles,
  ShieldCheck,
  X,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import "../../resources.css";

// Linkedin Icon Component
const LinkedinIcon = ({ size = 18, color = "currentColor", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Blocked personal webmail domains
const PERSONAL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "ymail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "aol.com",
  "gmx.com",
  "gmx.net",
  "zoho.com",
  "mail.com",
  "yandex.com",
  "rediffmail.com",
];

export default function BplSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    designation: "",
    linkedin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Real-time value handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Helper validation logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    // Phone validation
    const phoneTrimmed = formData.phone.trim();
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
    if (!phoneTrimmed) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phoneTrimmed)) {
      newErrors.phone = "Please enter a valid phone number (min 7 digits).";
    }

    // Email validation
    const emailTrimmed = formData.email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = "Company email is required.";
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = "Please enter a valid email address.";
    } else {
      const domain = emailTrimmed.split("@").pop() || "";
      if (PERSONAL_DOMAINS.includes(domain)) {
        newErrors.email =
          "Please use your official company email address. Personal email domains (Gmail, Outlook, Yahoo, etc.) are not accepted.";
      }
    }

    // Designation validation
    if (!formData.designation.trim()) {
      newErrors.designation = "Current designation is required.";
    }

    // LinkedIn URL validation
    const linkedinTrimmed = formData.linkedin.trim().toLowerCase();
    const linkedinRegex =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9_-]+\/?.*$/;
    if (!linkedinTrimmed) {
      newErrors.linkedin = "LinkedIn profile link is required.";
    } else if (!linkedinRegex.test(linkedinTrimmed)) {
      newErrors.linkedin =
        "Please provide a valid LinkedIn URL (e.g., https://linkedin.com/in/yourprofile).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/community-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.status === "success") {
        setShowModal(true);
      } else {
        setErrors((prev) => ({
          ...prev,
          form: result.message || "Failed to submit signup. Please try again.",
        }));
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrors((prev) => ({
        ...prev,
        form: "A network error occurred. Please try again later.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="resources-page overflow-hidden" style={{ minHeight: "100vh" }}>
      <div className="resources-container" style={{ maxWidth: "1000px" }}>
        {/* Back Link */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/resources/community"
            className="d-flex items-center"
            style={{
              gap: "6px",
              color: "var(--color-primary-100)",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            <ChevronLeft size={18} />
            <span>Back to Community</span>
          </Link>
        </div>

        {/* Header Section */}
        <ScrollReveal direction="up" className="text-center" style={{ marginBottom: "3rem" }}>
          <span className="resources-eyebrow">
            <Sparkles size={14} style={{ display: "inline", marginRight: "6px" }} />
            BlueTeam Premier League
          </span>
          <h1 className="resources-title" style={{ letterSpacing: "-0.03em", textAlign: "center" }}>
            Join the BPL Community
          </h1>
          <p className="resources-desc" style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            Connect with leading security directors, CISOs, and SOC practitioners. Get exclusive invitations to upcoming after-hours meetups, match days, and tactical workshops.
          </p>
        </ScrollReveal>

        {/* Main Card Container */}
        <ScrollReveal direction="up" delay={0.15}>
          <div
            className="resources-card"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(13, 65, 225, 0.12)",
              borderRadius: "24px",
              padding: "3rem 2.5rem",
              boxShadow: "0 20px 50px rgba(13, 65, 225, 0.06)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {/* Top Badge Banner inside card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "1rem 1.25rem",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(13, 65, 225, 0.06) 0%, rgba(52, 225, 255, 0.04) 100%)",
                border: "1px solid rgba(13, 65, 225, 0.1)",
                marginBottom: "2.5rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "var(--color-primary-100)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--color-neutral-700)" }}>
                  Verified Security Practitioner Registration
                </h4>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--color-neutral-600)" }}>
                  To ensure authentic peer-to-peer collaboration, BPL membership requires corporate email verification.
                </p>
              </div>
            </div>

            {/* Global Error Banner */}
            {errors.form && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "1rem",
                  borderRadius: "12px",
                  background: "#FEF2F2",
                  border: "1px solid #FCA5A5",
                  color: "#991B1B",
                  fontSize: "14px",
                  marginBottom: "2rem",
                }}
              >
                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                <span>{errors.form}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-neutral-700)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    First Name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <User
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-neutral-400)",
                      }}
                    />
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem 0.85rem 2.6rem",
                        borderRadius: "12px",
                        border: errors.firstName
                          ? "1.5px solid #EF4444"
                          : "1px solid rgba(13, 65, 225, 0.15)",
                        background: "#FFFFFF",
                        fontSize: "14px",
                        color: "var(--color-neutral-700)",
                        outline: "none",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                  {errors.firstName && (
                    <p style={{ margin: "0.4rem 0 0", fontSize: "12px", color: "#EF4444" }}>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-neutral-700)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Last Name <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <User
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-neutral-400)",
                      }}
                    />
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem 0.85rem 2.6rem",
                        borderRadius: "12px",
                        border: errors.lastName
                          ? "1.5px solid #EF4444"
                          : "1px solid rgba(13, 65, 225, 0.15)",
                        background: "#FFFFFF",
                        fontSize: "14px",
                        color: "var(--color-neutral-700)",
                        outline: "none",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                  {errors.lastName && (
                    <p style={{ margin: "0.4rem 0 0", fontSize: "12px", color: "#EF4444" }}>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-neutral-700)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Phone Number <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <Phone
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-neutral-400)",
                      }}
                    />
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem 0.85rem 2.6rem",
                        borderRadius: "12px",
                        border: errors.phone
                          ? "1.5px solid #EF4444"
                          : "1px solid rgba(13, 65, 225, 0.15)",
                        background: "#FFFFFF",
                        fontSize: "14px",
                        color: "var(--color-neutral-700)",
                        outline: "none",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <p style={{ margin: "0.4rem 0 0", fontSize: "12px", color: "#EF4444" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-neutral-700)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Company Email <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-neutral-400)",
                      }}
                    />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="jane.doe@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem 0.85rem 2.6rem",
                        borderRadius: "12px",
                        border: errors.email
                          ? "1.5px solid #EF4444"
                          : "1px solid rgba(13, 65, 225, 0.15)",
                        background: "#FFFFFF",
                        fontSize: "14px",
                        color: "var(--color-neutral-700)",
                        outline: "none",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                  {errors.email ? (
                    <p style={{ margin: "0.4rem 0 0", fontSize: "12px", color: "#EF4444" }}>
                      {errors.email}
                    </p>
                  ) : (
                    <p style={{ margin: "0.3rem 0 0", fontSize: "11px", color: "var(--color-neutral-500)" }}>
                      Work email required. Personal domains (Gmail, Outlook) are restricted.
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                {/* Current Designation */}
                <div>
                  <label
                    htmlFor="designation"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-neutral-700)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Current Designation <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <Briefcase
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-neutral-400)",
                      }}
                    />
                    <input
                      id="designation"
                      type="text"
                      name="designation"
                      placeholder="e.g. Lead SOC Analyst / CISO"
                      value={formData.designation}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem 0.85rem 2.6rem",
                        borderRadius: "12px",
                        border: errors.designation
                          ? "1.5px solid #EF4444"
                          : "1px solid rgba(13, 65, 225, 0.15)",
                        background: "#FFFFFF",
                        fontSize: "14px",
                        color: "var(--color-neutral-700)",
                        outline: "none",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                  {errors.designation && (
                    <p style={{ margin: "0.4rem 0 0", fontSize: "12px", color: "#EF4444" }}>
                      {errors.designation}
                    </p>
                  )}
                </div>

                {/* LinkedIn Profile */}
                <div>
                  <label
                    htmlFor="linkedin"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--color-neutral-700)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    LinkedIn Profile URL <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <LinkedinIcon
                      size={18}
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-neutral-400)",
                      }}
                    />
                    <input
                      id="linkedin"
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1rem 0.85rem 2.6rem",
                        borderRadius: "12px",
                        border: errors.linkedin
                          ? "1.5px solid #EF4444"
                          : "1px solid rgba(13, 65, 225, 0.15)",
                        background: "#FFFFFF",
                        fontSize: "14px",
                        color: "var(--color-neutral-700)",
                        outline: "none",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                  {errors.linkedin && (
                    <p style={{ margin: "0.4rem 0 0", fontSize: "12px", color: "#EF4444" }}>
                      {errors.linkedin}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bpl-cta"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "1rem",
                  fontSize: "16px",
                  fontWeight: 700,
                  borderRadius: "14px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.75 : 1,
                  background: "var(--color-primary-100)",
                  color: "#FFFFFF",
                  border: "none",
                  boxShadow: "0 8px 24px rgba(13, 65, 225, 0.25)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {isSubmitting ? (
                  <span>Submitting Registration...</span>
                ) : (
                  <>
                    <span>Confirm BPL Community Registration</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>

      {/* Confirmation Popup Modal (Trench Global Theme) */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            background: "rgba(10, 10, 10, 0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "2.5rem 2rem",
              textAlign: "center",
              boxShadow: "0 25px 70px rgba(13, 65, 225, 0.25)",
              border: "1px solid rgba(13, 65, 225, 0.2)",
              overflow: "hidden",
            }}
          >
            {/* Top Accent Gradient Bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: "linear-gradient(90deg, #0D41E1 0%, #34E1FF 50%, #FF3B81 100%)",
              }}
            />

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(13, 65, 225, 0.05)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--color-neutral-600)",
                transition: "background 0.2s",
              }}
            >
              <X size={20} />
            </button>

            {/* Animated Check Icon */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(13, 65, 225, 0.08)",
                color: "var(--color-primary-100)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                border: "2px solid rgba(13, 65, 225, 0.15)",
                boxShadow: "0 8px 20px rgba(13, 65, 225, 0.12)",
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            {/* Title & Eyebrow */}
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "var(--color-primary-100)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Registration Confirmed
            </span>

            <h3
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "24px",
                fontWeight: 800,
                color: "var(--color-neutral-700)",
                marginBottom: "0.75rem",
                lineHeight: "1.25",
              }}
            >
              Welcome to the BlueTeam Premier League!
            </h3>

            <p
              style={{
                fontSize: "14.5px",
                color: "var(--color-neutral-600)",
                lineHeight: "1.6",
                marginBottom: "2rem",
                padding: "0 0.5rem",
              }}
            >
              Your signup has been successfully confirmed. Stay tuned for our upcoming meetups, match days, and exclusive cybersecurity sessions. We've sent confirmation details to your company email.
            </p>

            {/* Modal Action Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <Link
                href="/resources/community"
                className="bpl-cta"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "0.9rem 1.5rem",
                  borderRadius: "12px",
                  background: "var(--color-primary-100)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 6px 18px rgba(13, 65, 225, 0.2)",
                }}
              >
                <span>Return to Community</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://luma.com/calendar/cal-FwLKyNupiOO86Mg?period=past"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "0.85rem 1.5rem",
                  borderRadius: "12px",
                  background: "rgba(13, 65, 225, 0.05)",
                  border: "1px solid rgba(13, 65, 225, 0.12)",
                  color: "var(--color-primary-100)",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                <Calendar size={16} />
                <span>View Upcoming Events on Luma</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
