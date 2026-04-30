"use client";
import React, { useState, useEffect } from "react";

export default function DetectionProcess() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick(p => p + 1), 700);
        return () => clearInterval(t);
    }, []);

    const threatNodes = [
        { x: 336, y: 55,  label: "LATERAL\nMOVEMENT" },
        { x: 475, y: 130, label: "PRIV\nESCALATION" },
        { x: 470, y: 286, label: "DATA\nEXFIL" },
        { x: 312, y: 345, label: "C2\nCOMMS" },
        { x: 175, y: 312, label: "INITIAL\nACCESS" },
        { x: 162, y: 143, label: "PERSIST-\nENCE" },
    ];
    const active = tick % threatNodes.length;

    // Brand palette only
    const P  = "#0D41E1";
    const PT = "#EFF6FF";
    const PM = "#DBEAFE";
    const BG = "#ffffff";
    const BB = "#F1F5F9";
    const SC = "#E2E8F0";
    const TM = "#64748B";
    const TD = "#1E293B";

    return (
        <div className="detect-wrap">
            <svg viewBox="0 0 680 430" className="detect-svg">
                <defs>
                    <radialGradient id="dg-intent" cx="50%" cy="50%">
                        <stop offset="0%" stopColor={P} stopOpacity="0.18" />
                        <stop offset="100%" stopColor={P} stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* ── RAW SIGNALS PANEL ── */}
                <rect x="10" y="75" width="102" height="290" rx="10"
                    fill={BB} stroke={SC} strokeWidth="1.5" />
                <text x="61" y="102" textAnchor="middle" fontSize="9.5"
                    fill={TD} fontWeight="700" fontFamily="'Poppins', sans-serif">RAW</text>
                <text x="61" y="118" textAnchor="middle" fontSize="9.5"
                    fill={TD} fontWeight="700" fontFamily="'Poppins', sans-serif">SIGNALS</text>

                {["LOG", "ALERT", "EVENT", "FLOW", "INTEL"].map((l, i) => (
                    <g key={i}>
                        <rect x="20" y={140 + i * 38} width="82" height="28" rx="5"
                            fill={active === i ? PT : BG}
                            stroke={active === i ? P : SC} strokeWidth="1.5" />
                        <text x="61" y={158 + i * 38} textAnchor="middle" fontSize="10"
                            fill={active === i ? P : TD}
                            fontWeight="700" fontFamily="'Poppins', sans-serif">
                            {l}
                        </text>
                    </g>
                ))}

                {/* ── ARROW ── */}
                <line x1="112" y1="215" x2="198" y2="215"
                    stroke={P} strokeWidth="2.5" strokeDasharray="6,4" strokeOpacity="0.65" />
                <polygon points="195,209 207,215 195,221" fill={P} opacity="0.7" />

                {/* ── INTENT GRAPH ── */}
                <circle cx="325" cy="215" r="106" fill="url(#dg-intent)" />
                <circle cx="325" cy="215" r="74" fill="none"
                    stroke={P} strokeWidth="1.2" strokeDasharray="7,5" strokeOpacity="0.3" />
                <circle cx="325" cy="215" r="44" fill="none"
                    stroke={P} strokeWidth="1.8" strokeOpacity="0.5" />
                <circle cx="325" cy="215" r="20"
                    fill={PT} stroke={P} strokeWidth="2.5" />
                <text x="325" y="211" textAnchor="middle" fontSize="8.5"
                    fill={P} fontFamily="'Poppins', sans-serif" fontWeight="800">INTENT</text>
                <text x="325" y="224" textAnchor="middle" fontSize="8.5"
                    fill={P} fontFamily="'Poppins', sans-serif" fontWeight="800">GRAPH</text>

                {/* ── THREAT NODES ── */}
                {threatNodes.map((node, i) => (
                    <g key={i}>
                        <line x1={node.x} y1={node.y + 14} x2="325" y2="215"
                            stroke={i === active ? P : SC}
                            strokeWidth={i === active ? "2.5" : "1.2"}
                            strokeDasharray="5,3"
                            strokeOpacity={i === active ? "0.7" : "0.5"} />
                        <rect x={node.x - 38} y={node.y - 10} width="76" height="46" rx="8"
                            fill={i === active ? PT : BB}
                            stroke={i === active ? P : SC}
                            strokeWidth={i === active ? "2" : "1.2"} />
                        {node.label.split("\n").map((line, j) => (
                            <text key={j} x={node.x} y={node.y + 7 + j * 15}
                                textAnchor="middle" fontSize="9.5"
                                fill={i === active ? P : TD}
                                fontWeight="700" fontFamily="'Poppins', sans-serif">
                                {line}
                            </text>
                        ))}
                    </g>
                ))}

                {/* ── MITRE BADGE ── */}
                <rect x="250" y="378" width="150" height="28" rx="14"
                    fill={PT} stroke={P} strokeWidth="1.8" strokeOpacity="0.8" />
                <text x="325" y="395" textAnchor="middle" fontSize="9.5"
                    fill={P} fontWeight="700" fontFamily="'Poppins', sans-serif">
                    MITRE ATT&amp;CK ALIGNED
                </text>

                {/* ── ARROW OUT ── */}
                <line x1="432" y1="215" x2="502" y2="215"
                    stroke={P} strokeWidth="2.5" strokeDasharray="6,4" strokeOpacity="0.65" />
                <polygon points="499,209 511,215 499,221" fill={P} opacity="0.7" />

                {/* ── OUTPUT PANEL ── */}
                <rect x="516" y="125" width="152" height="182" rx="10"
                    fill={BB} stroke={SC} strokeWidth="1.5" />
                <text x="592" y="150" textAnchor="middle" fontSize="9.5"
                    fill={P} fontWeight="700" fontFamily="'Poppins', sans-serif">AUTO-GENERATED</text>
                <text x="592" y="165" textAnchor="middle" fontSize="9.5"
                    fill={P} fontWeight="700" fontFamily="'Poppins', sans-serif">DETECTIONS</text>

                {[0, 1, 2, 3].map(i => (
                    <g key={i}>
                        <rect x="526" y={184 + i * 28} width="132" height="22" rx="5"
                            fill={active % 4 === i ? PT : BG}
                            stroke={active % 4 === i ? P : SC} strokeWidth="1.2" />
                        <circle cx="540" cy={195 + i * 28} r="4"
                            fill={active % 4 === i ? P : SC} />
                        <rect x="550" y={192 + i * 28} width="80" height="5" rx="2.5"
                            fill={active % 4 === i ? P : SC}
                            opacity={active % 4 === i ? 0.65 : 0.3} />
                        <rect x="550" y={200 + i * 28} width="56" height="4" rx="2"
                            fill={SC} opacity="0.5" />
                    </g>
                ))}

                {/* ── FOOTER ── */}
                <text x="350" y="425" textAnchor="middle" fontSize="9" fill={TM}
                    fontFamily="'Poppins', sans-serif" fontWeight="600" letterSpacing="2">
                    SIGNALS → INTENT GRAPH → DETECTIONS
                </text>
            </svg>

            <style jsx>{`
                .detect-wrap {
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
                    min-height: 400px;
                    padding: 0;
                }

                @media (max-width: 768px) {
                    .detect-wrap {
                        padding: 1.5rem 1rem;
                        min-height: 500px;
                    }
                }

                .detect-svg {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            `}</style>
        </div>
    );
}