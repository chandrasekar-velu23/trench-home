"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  link: string;
}

interface CareerListingsProps {
  jobs: Job[];
}

export default function CareerListings({ jobs }: CareerListingsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  const departments = useMemo(() => {
    const depts = Array.from(new Set(jobs.map((j) => j.department)));
    return ["All", ...depts];
  }, [jobs]);

  const locations = useMemo(() => {
    const locs = Array.from(new Set(jobs.map((j) => j.location)));
    return ["All", ...locs];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        activeDepartment === "All" || job.department === activeDepartment;

      const matchesLocation =
        activeLocation === "All" || job.location === activeLocation;

      return matchesSearch && matchesDepartment && matchesLocation;
    });
  }, [jobs, searchQuery, activeDepartment, activeLocation]);

  const activeFilterCount =
    (activeDepartment !== "All" ? 1 : 0) +
    (activeLocation !== "All" ? 1 : 0) +
    (searchQuery !== "" ? 1 : 0);

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveDepartment("All");
    setActiveLocation("All");
  };

  // Close dropdown if user clicks outside and no active filters
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        controlsRef.current &&
        !controlsRef.current.contains(event.target as Node) &&
        activeFilterCount === 0 &&
        searchQuery === ""
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeFilterCount, searchQuery]);

  return (
    <>
      {/* Search & Filters Container */}
      <ScrollReveal direction="up" delay={0.15}>
        <div 
          ref={controlsRef}
          className={`career-controls-card ${isFilterOpen ? "is-open" : ""}`}
        >
          {/* Search Bar Row */}
          <div className="career-search-wrapper">
            <svg className="career-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search roles by title, keyword, or department..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!isFilterOpen) setIsFilterOpen(true);
              }}
              onFocus={() => setIsFilterOpen(true)}
              onClick={() => setIsFilterOpen(true)}
              className="career-search-input"
            />

            <div className="career-search-actions">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="career-search-clear"
                  aria-label="Clear search"
                  type="button"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Filter toggle button */}
              <button
                type="button"
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className={`career-filter-toggle-btn ${isFilterOpen ? "active" : ""} ${activeFilterCount > 0 ? "has-filters" : ""}`}
                aria-label="Toggle filters"
                title="Toggle filter options"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="career-filter-badge">{activeFilterCount}</span>
                )}
                <svg 
                  className={`career-chevron-icon ${isFilterOpen ? "rotate" : ""}`} 
                  width="13" 
                  height="13" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Collapsible Filter Dropdown Drawer */}
          <div className={`career-dropdown-drawer ${isFilterOpen ? "show" : ""}`}>
            <div className="career-filters-container">
              {/* Department Filter */}
              <div className="career-filter-row">
                <div className="career-filter-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  <span>Department</span>
                </div>
                <div className="career-filter-pills">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setActiveDepartment(dept)}
                      className={`career-filter-pill ${activeDepartment === dept ? "active" : ""}`}
                      type="button"
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="career-filter-row">
                <div className="career-filter-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Location</span>
                </div>
                <div className="career-filter-pills">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setActiveLocation(loc)}
                      className={`career-filter-pill ${activeLocation === loc ? "active" : ""}`}
                      type="button"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer of filter dropdown */}
            <div className="career-controls-footer">
              <div className="career-results-count">
                Showing <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> open positions
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {activeFilterCount > 0 && (
                  <button onClick={clearAllFilters} className="career-clear-all" type="button">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                    Reset
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="career-close-drawer-btn"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Job Cards */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <ScrollReveal key={job.id} direction="up" delay={index * 0.08}>
                <div className="career-card">
                  <div className="career-card-header">
                    <div className="career-card-info">
                      <div style={{ marginBottom: '0.65rem' }}>
                        <span className="phase-badge">Active Hiring</span>
                      </div>
                      <h2 className="title-sm" style={{ marginBottom: '0.75rem', fontSize: '1.65rem', color: '#000000' }}>{job.title}</h2>
                      <div className="career-tag-row">
                        <span className="career-tag career-tag-dept">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          {job.department}
                        </span>
                        <span className="career-tag career-tag-loc">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="career-tag career-tag-type">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <div className="career-card-action">
                      <Link href={job.link} style={{ textDecoration: 'none' }}>
                        <Button variant="secondary" className="career-view-details-btn">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <p className="body-text" style={{ marginBottom: '0', color: 'var(--color-neutral-600)', fontStyle: 'italic', fontSize: '0.975rem', lineHeight: '1.6' }}>
                    &quot;{job.description}&quot;
                  </p>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="career-empty-state">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#000', marginBottom: '0.4rem' }}>No matching positions</h3>
              <p style={{ color: 'var(--color-neutral-500)', marginBottom: '1.25rem', maxWidth: '400px', fontSize: '0.95rem' }}>
                Try adjusting your search query or reset your department and location filters.
              </p>
              <button onClick={clearAllFilters} className="career-reset-btn" type="button">
                Reset all filters
              </button>
            </div>
          )}
        </div>

        <ScrollReveal direction="up" delay={0.3} style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <h3 className="title-sm" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#000000' }}>Don&apos;t see a perfect fit?</h3>
          <p className="body-text" style={{ marginBottom: '0', color: 'var(--color-neutral-600)' }}>
            We&apos;re always looking for exceptional talent to join our team. Send your resume to <a href="mailto:career@trenchsecurity.ai" style={{ color: 'var(--color-primary-100)', fontWeight: 600, textDecoration: 'underline' }}>career@trenchsecurity.ai</a> and tell us how you can help Trench.
          </p>
        </ScrollReveal>
      </div>
    </>
  );
}
