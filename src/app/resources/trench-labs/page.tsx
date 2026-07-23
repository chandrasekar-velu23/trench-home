"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CTASection from "@/components/sections/CTASection";
import "../resources.css";

export default function TrenchLabsPage() {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load PDF.js worker and library from CDN dynamically
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
    script.async = true;
    script.onload = () => {
      const pdfjs = (window as any).pdfjsLib;
      pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
      
      pdfjs.getDocument("/TRENCH%20SIGNAL.pdf").promise.then((doc: any) => {
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      }).catch((err: any) => {
        console.error("Error loading PDF:", err);
        setLoading(false);
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
          <h1 className="resources-title">Trench Signal</h1>
          <p className="resources-desc">
            Explore cyber intelligence briefings, threat reports, and operational cybersecurity analysis directly from Trench research teams.
          </p>
        </ScrollReveal>
      </section>

      {/* PDF Carousel Viewer Section */}
      <section className="pdf-carousel-section" style={{ marginBottom: "5rem" }}>
        <ScrollReveal direction="up" delay={0.2} className="w-full">
          <div className="pdf-viewer-card">
            {loading ? (
              <div className="pdf-loading">
                <Loader2 className="animate-spin" size={40} />
                <span className="pdf-loading-text">Loading Trench Signal intelligence document...</span>
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

      {/* Bottom CTA */}
      <div style={{ marginTop: "6rem" }}>
        <CTASection />
      </div>
    </main>
  );
}
