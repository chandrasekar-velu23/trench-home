"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut, ExternalLink, FileText } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import "../resources.css";

// Data arrays for scalable content
const TRENCH_SIGNALS = [
  {
    id: "ts-1",
    title: "Trench Signal Vol 1",
    description: "Explore cyber intelligence briefings, threat reports, and operational cybersecurity analysis directly from Trench research teams.",
    pdfUrl: "/TRENCH%20SIGNAL.pdf"
  }
];

const WHITEPAPERS = [
  {
    id: "wp-1",
    title: "Zero Latency Threat Detection",
    abstract: "In the age of AI-powered threats, the physics of cyber warfare has changed. While defensive strategies have spent the last decade perfecting data aggregation, adversaries have perfected speed. Today, automated attacks execute in milliseconds, yet our industry's standard detection processes are measured in minutes, hours, or weeks. This temporal disconnect, the \"Latency Gap\" is where the modern breach lives. For too long, security analytics has been perceived as a Data Problem and we were convinced to ingest everything and ended up with a data overload bottleneck. We hoard petabytes of logs to find the \"needle in the haystack.\" This model is obsolete. AI has handed adversaries a new, defining moat: Velocity. AI-native threats do not pause for human cognition. Relying on legacy, data-centric detection models to fight these threats is akin to fighting drone warfare with ground patrol. To combat this, we must shift our mindset from Data to Time. You can have the most accurate threat detection rule in existence, but if it triggers 48 hours or even 48 seconds after the event, it is not a defense; it is forensics. The collateral damage has already occurred; the attacker is far ahead in the kill chain. Just as the Zero Trust framework revolutionized security by shifting our focus from the \"Perimeter\" to \"Identity\" (Data), we must now evolve further. We introduce the Zero Latency Threat Detection (ZLTD) framework. This architecture accepts that in a world of instantaneous execution, the only effective defense is instantaneous detection. We must stop hunting for the needle and start catching it before it lands. Cybersecurity Mesh Architecture (CSMA) is the right approach to apply ZLTD that moves detection to the edge, reducing SIEM data gravity costs while delivering real-time, high-fidelity threat detection.",
    link: "https://www.jisem-journal.com/index.php/journal/article/view/14648"
  }
];

export default function TrenchLabsPage() {
  const [activeTab, setActiveTab] = useState<'signals' | 'whitepapers'>('signals');
  const [activeSignal, setActiveSignal] = useState(TRENCH_SIGNALS[0]);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let scriptToRemove: HTMLScriptElement | null = null;
    setLoading(true);
    setPdfDoc(null);
    setPageNum(1);

    const loadPdf = () => {
      const pdfjs = (window as any).pdfjsLib;
      if (!pdfjs) return;
      pdfjs.getDocument(activeSignal.pdfUrl).promise.then((doc: any) => {
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      }).catch((err: any) => {
        console.error("Error loading PDF:", err);
        setLoading(false);
      });
    };

    if (!(window as any).pdfjsLib) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
      script.async = true;
      script.onload = () => {
        const pdfjs = (window as any).pdfjsLib;
        pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
        loadPdf();
      };
      document.body.appendChild(script);
      scriptToRemove = script;
    } else {
      loadPdf();
    }

    return () => {
      if (scriptToRemove && document.body.contains(scriptToRemove)) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, [activeSignal.pdfUrl]);

  useEffect(() => {
    if (!pdfDoc) return;

    let renderTask: any = null;

    pdfDoc.getPage(pageNum).then((page: any) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Determine viewport scale
      const viewport = page.getViewport({ scale: scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      renderTask = page.render({
        canvasContext: context,
        viewport: viewport
      });

      renderTask.promise.catch((err: any) => {
        if (err.name !== "RenderingCancelledException") {
          console.error("Render error:", err);
        }
      });
    });

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, pageNum, scale]);

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNum < numPages) {
      setPageNum((prev) => prev + 1);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  return (
    <main className="resources-page overflow-hidden">
      {/* Hero Section */}
      <section className="resources-hero">
        <ScrollReveal direction="up" className="text-center">
          <span className="resources-eyebrow">Trench Labs</span>
          <h1 className="resources-title">Research</h1>
          <p className="resources-desc">
            Explore research, reports, and blogs.
          </p>
        </ScrollReveal>
      </section>

      {/* Dynamic Tab System */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="tabs-header">
          <button
            className={`tab-trigger ${activeTab === 'signals' ? 'active' : ''}`}
            onClick={() => setActiveTab('signals')}
          >
            Trench Signals
          </button>
          <button
            className={`tab-trigger ${activeTab === 'whitepapers' ? 'active' : ''}`}
            onClick={() => setActiveTab('whitepapers')}
          >
            Whitepapers
          </button>
        </div>
      </ScrollReveal>

      {/* Trench Signals Section */}
      {activeTab === 'signals' && (
        <section className="pdf-carousel-section" style={{ marginBottom: "5rem" }}>

          {/* Signal Selector (for when more signals are added) */}
          {TRENCH_SIGNALS.length > 1 && (
            <div className="flex gap-4 mb-8 flex-wrap justify-center">
              {TRENCH_SIGNALS.map((signal) => (
                <button
                  key={signal.id}
                  onClick={() => setActiveSignal(signal)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeSignal.id === signal.id
                      ? "bg-[var(--color-primary-100)] text-white shadow-lg"
                      : "bg-white/60 text-gray-600 hover:bg-white"
                    }`}
                >
                  {signal.title}
                </button>
              ))}
            </div>
          )}

          <ScrollReveal direction="up" delay={0.2} className="w-full">
            <div className="pdf-viewer-card">
              {loading ? (
                <div className="pdf-loading">
                  <Loader2 className="animate-spin" size={40} />
                  <span className="pdf-loading-text">Loading {activeSignal.title}...</span>
                </div>
              ) : (
                <React.Fragment>
                  {/* Control bar */}
                  <div className="pdf-controls">
                    <button
                      onClick={handlePrevPage}
                      disabled={pageNum <= 1}
                      className="pdf-control-btn"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <span className="pdf-page-indicator">
                      Page {pageNum} of {numPages}
                    </span>

                    <button
                      onClick={handleNextPage}
                      disabled={pageNum >= numPages}
                      className="pdf-control-btn"
                      aria-label="Next Page"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Display canvas area */}
                  <div className="pdf-display-area">
                    <div className="pdf-canvas-wrap">
                      <canvas ref={canvasRef} className="pdf-canvas" />
                    </div>
                  </div>

                  {/* Action panel */}
                  <div className="pdf-actions">
                    <button onClick={handleZoomOut} className="pdf-action-btn secondary" aria-label="Zoom Out">
                      <ZoomOut size={16} />
                      <span>Zoom Out</span>
                    </button>

                    <button onClick={handleZoomIn} className="pdf-action-btn secondary" aria-label="Zoom In">
                      <ZoomIn size={16} />
                      <span>Zoom In</span>
                    </button>
                  </div>
                </React.Fragment>
              )}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Whitepapers Section */}
      {activeTab === 'whitepapers' && (
        <section className="resources-container" style={{ marginBottom: "5rem" }}>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col gap-8">
              {WHITEPAPERS.map((wp) => (
                <div key={wp.id} className="resources-card" style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={18} className="text-[var(--color-primary-100)]" />
                    <span className="resources-badge badge-primary" style={{ marginBottom: 0 }}>Whitepaper</span>
                  </div>

                  <h2 className="resources-title" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
                    {wp.title}
                  </h2>
                  <div className="resources-desc" style={{ fontSize: "15px", textAlign: "justify", marginBottom: "2.5rem" }}>
                    <strong>Abstract:</strong> {wp.abstract}
                  </div>
                  <a
                    href={wp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-action-btn"
                    style={{ alignSelf: "flex-start" }}
                  >
                    Read Full Whitepaper <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Bottom CTA */}
      <div style={{ marginTop: "6rem" }}>
        <CTASection />
      </div>
    </main>
  );
}
