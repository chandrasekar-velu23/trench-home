"use client";
import React, { useState, useEffect } from "react";
import { Cloud, Monitor, Shield, Network, Box } from "lucide-react";

export default function IngestProcess() {
    const [pulse, setPulse] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setPulse(p => (p + 1) % 5), 600);
        return () => clearInterval(t);
    }, []);

    const sources = [
        { label: "CLOUD",    Icon: Cloud,   y: 55 },
        { label: "ENDPOINT", Icon: Monitor, y: 130 },
        { label: "IDENTITY", Icon: Shield,  y: 205 },
        { label: "NETWORK",  Icon: Network, y: 280 },
        { label: "SaaS",     Icon: Box,     y: 355 },
    ];

    const pipeline = ["PARSE", "NORMALIZE", "ENRICH", "VALIDATE"];

    // Brand palette only
    const P  = "#0D41E1";    // --color-primary-100
    const P2 = "#1E3EB0";    // --color-primary-200
    const PT = "#EFF6FF";    // light blue tint
    const PM = "#DBEAFE";    // mid blue tint
    const BG = "#ffffff";
    const BB = "#F1F5F9";    // --color-neutral-100
    const SC = "#E2E8F0";    // --color-neutral-200
    const TM = "#64748B";    // --color-neutral-500
    const TD = "#1E293B";    // --color-neutral-700

    return (
        <div className="ingest-wrap">
            <svg viewBox="0 0 680 430" className="ingest-svg">
                <defs>
                    <linearGradient id="ig-engine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={PM} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={PT} stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="ig-lake" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={PT} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={PM} stopOpacity="0.6" />
                    </linearGradient>
                </defs>

                {/* ── SOURCE NODES ── */}
                {sources.map((s, i) => (
                    <g key={i}>
                        <rect x="10" y={s.y - 22} width="110" height="42" rx="8"
                            fill={BB}
                            stroke={pulse === i ? P : SC}
                            strokeWidth={pulse === i ? "2" : "1.2"} />
                        <s.Icon
                            x="20" y={s.y - 10} width="18" height="18"
                            color={pulse === i ? P : TM}
                            strokeWidth={pulse === i ? 2.5 : 2} />
                        <text x="46" y={s.y + 6} fontSize="11"
                            fill={pulse === i ? P : TD}
                            fontFamily="'Poppins', sans-serif" fontWeight="700" letterSpacing="0.5">
                            {s.label}
                        </text>
                        {pulse === i && (
                            <circle cx="126" cy={s.y} r="4" fill={P} opacity="0.9">
                                <animate attributeName="cx" from="120" to="200" dur="0.6s" fill="freeze" />
                                <animate attributeName="opacity" from="0.9" to="0" dur="0.6s" fill="freeze" />
                            </circle>
                        )}
                        {/* dashed connector to engine */}
                        <line x1="120" y1={s.y} x2="200" y2={s.y}
                            stroke={pulse === i ? P : SC} strokeWidth="1.5" strokeDasharray="5,3" />
                        <line x1="200" y1={s.y} x2="200" y2="215"
                            stroke={pulse === i ? P : SC} strokeWidth="1.5" strokeDasharray="5,3" />
                    </g>
                ))}

                {/* ── DATA ENGINE ── */}
                <rect x="196" y="75" width="158" height="290" rx="12"
                    fill="url(#ig-engine)" stroke={PM} strokeWidth="2" />
                <text x="275" y="102" textAnchor="middle" fontSize="11" fill={P}
                    fontFamily="'Poppins', sans-serif" fontWeight="800" letterSpacing="1.5">
                    DATA ENGINE
                </text>
                {pipeline.map((step, i) => (
                    <g key={i}>
                        <rect x="210" y={122 + i * 58} width="128" height="40" rx="7"
                            fill={pulse % 4 === i ? P : BG}
                            stroke={P} strokeWidth="1.2"
                            strokeOpacity={pulse % 4 === i ? "1" : "0.3"} />
                        <text x="274" y={146 + i * 58} textAnchor="middle" fontSize="11"
                            fill={pulse % 4 === i ? "#fff" : P}
                            fontFamily="'Poppins', sans-serif" fontWeight="700" letterSpacing="1">
                            {step}
                        </text>
                        {i < 3 && (
                            <polygon
                                points={`270,${163 + i * 58} 275,${172 + i * 58} 280,${163 + i * 58}`}
                                fill={P} opacity="0.6" />
                        )}
                    </g>
                ))}

                {/* ── FLOW ARROW ── */}
                <line x1="354" y1="215" x2="398" y2="215"
                    stroke={P} strokeWidth="2.5" strokeOpacity="0.7" />
                <polygon points="395,209 406,215 395,221" fill={P} opacity="0.85" />

                {/* ── UNIFIED DATA LAKE ── */}
                <rect x="404" y="96" width="256" height="234" rx="12"
                    fill="url(#ig-lake)" stroke={PM} strokeWidth="2" />
                <text x="532" y="122" textAnchor="middle" fontSize="11" fill={P}
                    fontFamily="'Poppins', sans-serif" fontWeight="800" letterSpacing="1">
                    UNIFIED MESH
                </text>
                <text x="532" y="138" textAnchor="middle" fontSize="11" fill={P}
                    fontFamily="'Poppins', sans-serif" fontWeight="800" letterSpacing="1">
                    DATA LAKE
                </text>
                <image href="/steps/datalake%201.png"
                    x="430" y="155" width="202" height="130"
                    preserveAspectRatio="xMidYMid meet" />

                {/* ── OUTPUT TAGS ── */}
                {["SEARCHABLE", "ENRICHED", "NORMALIZED"].map((o, i) => (
                    <g key={i}>
                        <rect x={404 + i * 86} y="345" width="80" height="22" rx="11"
                            fill={PT} stroke={P} strokeWidth="1.2" strokeOpacity="0.5" />
                        <text x={444 + i * 86} y="359" textAnchor="middle" fontSize="7.5"
                            fill={P} fontWeight="700" fontFamily="'Poppins', sans-serif">
                            {o}
                        </text>
                    </g>
                ))}

                {/* ── AGENTLESS BADGE ── */}
                <rect x="196" y="380" width="158" height="28" rx="14"
                    fill={PT} stroke={P} strokeWidth="1.5" strokeOpacity="0.8" />
                <text x="275" y="397" textAnchor="middle" fontSize="9.5" fill={P}
                    fontWeight="700" fontFamily="'Poppins', sans-serif">
                    AGENTLESS SETUP
                </text>

                {/* ── FOOTER LABEL ── */}
                <text x="340" y="422" textAnchor="middle" fontSize="9" fill={TM}
                    fontFamily="'Poppins', sans-serif" fontWeight="600" letterSpacing="2">
                    SOURCES → ENGINE → UNIFIED LAYER
                </text>
            </svg>

            <style jsx>{`
                .ingest-wrap {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: stretch;
                    justify-content: stretch;
                    background: #ffffff;
                    border-radius: 20px;
                    border: 1px solid #E2E8F0;
                    box-shadow: 0 4px 32px rgba(13, 65, 225, 0.07);
                    overflow: hidden;
                    min-height: 200px;
                    padding: 0;
                }

                @media (max-width: 768px) {
                    .ingest-wrap {
                        padding: 1.5rem 1rem;
                        min-height: 280px;
                    }
                }

                .ingest-svg {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            `}</style>
        </div>
    );
}
