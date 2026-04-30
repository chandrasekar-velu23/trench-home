"use client";
import React, { useState, useEffect } from "react";

export default function RespondProcess() {
    const [step, setStep] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setStep(s => (s + 1) % 5), 900);
        return () => clearInterval(t);
    }, []);

    // Brand palette only
    const P  = "#0D41E1";
    const P2 = "#1E3EB0";
    const PT = "#EFF6FF";
    const PM = "#DBEAFE";
    const BG = "#ffffff";
    const BB = "#F1F5F9";
    const SC = "#E2E8F0";
    const TM = "#64748B";
    const TD = "#1E293B";

    // Timeline nodes — evenly spaced across the wider viewBox
    const flow = [
        { x: 58,  label: "THREAT\nDETECTED" },
        { x: 196, label: "AGENT\nINVESTIGATES" },
        { x: 334, label: "CONTEXT\nCORRELATED" },
        { x: 472, label: "RESPONSE\nTRIGGERED" },
        { x: 610, label: "THREAT\nCLOSED" },
    ];

    const agentActions = [
        "Querying SIEM logs...",
        "Checking identity context...",
        "Mapping blast radius...",
        "Correlating IOCs...",
        "Triggering containment...",
    ];

    const metrics = [
        { label: "Detection → Response", value: "< 5 min",       active: step >= 2 },
        { label: "Alert → Closed",       value: "< 10 min",      active: step >= 3 },
        { label: "Human Review",         value: "Decisions only", active: step >= 4 },
        { label: "Coverage",             value: "Full stack",     active: step >= 1 },
    ];

    return (
        <div className="respond-wrap">
            <svg viewBox="0 0 680 430" className="respond-svg">
                <defs>
                    <linearGradient id="rg-tl" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={PM} />
                        <stop offset="100%" stopColor={P} />
                    </linearGradient>
                </defs>

                {/* ── TIMELINE TRACK ── */}
                <line x1="58" y1="140" x2="610" y2="140"
                    stroke={SC} strokeWidth="3" />
                <line x1="58" y1="140" x2={58 + step * 138} y2="140"
                    stroke="url(#rg-tl)" strokeWidth="3.5" />

                {/* ── FLOW NODES ── */}
                {flow.map((node, i) => (
                    <g key={i}>
                        {/* connector line down to label card */}
                        <line x1={node.x} y1="140" x2={node.x} y2="188"
                            stroke={i <= step ? P : SC}
                            strokeWidth="2" strokeOpacity={i <= step ? "1" : "0.5"} />

                        {/* circle */}
                        <circle cx={node.x} cy="140" r={i === step ? "18" : "13"}
                            fill={i <= step ? BG : BB}
                            stroke={i <= step ? P : SC}
                            strokeWidth={i === step ? "3.5" : "2.5"}
                            strokeOpacity={i <= step ? "1" : "0.5"} />

                        {/* checkmark for completed */}
                        {i < step && (
                            <path d={`M${node.x - 6},140 L${node.x - 2},145 L${node.x + 8},133`}
                                stroke={P} strokeWidth="2.5" fill="none"
                                strokeLinecap="round" strokeLinejoin="round" />
                        )}
                        {/* active step number */}
                        {i === step && (
                            <text x={node.x} y="145" textAnchor="middle" fontSize="12"
                                fill={P} fontWeight="800" fontFamily="'Poppins', sans-serif">
                                {i + 1}
                            </text>
                        )}

                        {/* label card */}
                        <rect x={node.x - 50} y="191" width="100" height="48" rx="7"
                            fill={i <= step ? PT : BB}
                            stroke={i <= step ? P : SC}
                            strokeWidth="1.8" strokeOpacity={i <= step ? "1" : "0.5"} />
                        {node.label.split("\n").map((line, j) => (
                            <text key={j} x={node.x} y={208 + j * 16}
                                textAnchor="middle" fontSize="9.5"
                                fill={i <= step ? P : TD}
                                fontWeight={i <= step ? "800" : "600"}
                                fontFamily="'Poppins', sans-serif">
                                {line}
                            </text>
                        ))}

                        {/* arrow to next */}
                        {i < flow.length - 1 && (
                            <polygon
                                points={`${node.x + 16},137 ${node.x + 26},140 ${node.x + 16},143`}
                                fill={i < step ? P : SC}
                                fillOpacity={i < step ? "1" : "0.5"} />
                        )}
                    </g>
                ))}

                {/* ── AI AGENT PANEL ── */}
                <rect x="16" y="265" width="318" height="140" rx="10"
                    fill={BB} stroke={P} strokeWidth="1.8" strokeOpacity="0.45" />
                <text x="36" y="290" fontSize="10" fill={P}
                    fontWeight="800" fontFamily="'Poppins', sans-serif" letterSpacing="1.5">
                    AI AGENT ACTIVITY
                </text>
                {agentActions.slice(0, Math.min(step + 1, 5)).map((action, i) => (
                    <g key={i}>
                        {/* pulse ring */}
                        {i === step && (
                            <circle cx="36" cy={313 + i * 20} r="8"
                                fill="none" stroke={P} strokeWidth="1.2" strokeOpacity="0.3">
                                <animate attributeName="r" from="4" to="13" dur="1s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
                            </circle>
                        )}
                        <circle cx="36" cy={313 + i * 20} r="4"
                            fill={i === step ? P : PM} />
                        <text x="50" y={318 + i * 20} fontSize="9.5"
                            fill={i === step ? P : TD}
                            fontFamily="'Poppins', sans-serif"
                            fontWeight={i === step ? "700" : "500"}>
                            {action}
                        </text>
                    </g>
                ))}

                {/* ── METRICS PANEL ── */}
                <rect x="346" y="265" width="318" height="140" rx="10"
                    fill={BB} stroke={P} strokeWidth="1.8" strokeOpacity="0.45" />
                <text x="366" y="290" fontSize="10" fill={P}
                    fontWeight="800" fontFamily="'Poppins', sans-serif" letterSpacing="1.5">
                    RESPONSE METRICS
                </text>
                {metrics.map((m, i) => (
                    <g key={i}>
                        <text x="366" y={316 + i * 20} fontSize="9"
                            fill={m.active ? TD : TM}
                            fontWeight="600" fontFamily="'Poppins', sans-serif">
                            {m.label}
                        </text>
                        <text x="654" y={316 + i * 20} textAnchor="end" fontSize="9"
                            fill={m.active ? P : TM}
                            fontFamily="'Poppins', sans-serif" fontWeight="800">
                            {m.value}
                        </text>
                        <line x1="366" y1={320 + i * 20} x2="654" y2={320 + i * 20}
                            stroke={SC} strokeWidth="1" strokeDasharray="4,3"
                            strokeOpacity={m.active ? "0.8" : "0.4"} />
                    </g>
                ))}

                {/* ── FOOTER ── */}
                <text x="340" y="422" textAnchor="middle" fontSize="9" fill={TM}
                    fontFamily="'Poppins', sans-serif" fontWeight="600" letterSpacing="2">
                    DETECT → INVESTIGATE → CORRELATE → CLOSE
                </text>
            </svg>

            <style jsx>{`
                .respond-wrap {
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
                    min-height: 460px;
                }
                .respond-svg {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            `}</style>
        </div>
    );
}