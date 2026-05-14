"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import "./integrations.css";
// import VariationSlack from "@/components/variation-slack";
// import { TweaksPanel } from "@/components/tweaks-panel";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const CATEGORIES = [
  { id: "all", label: "All", color: "#0D41E1" },
  { id: "cloud", label: "Cloud", color: "#0D41E1" },
  { id: "endpoint", label: "Endpoint", color: "#7C3AED" },
  { id: "identity", label: "Identity", color: "#059669" },
  { id: "siem", label: "SIEM", color: "#DC2626" },
  { id: "email", label: "Email", color: "#D97706" },
  { id: "data", label: "Data", color: "#0891B2" },
  { id: "network", label: "Network", color: "#BE185D" },
  { id: "collab", label: "Collaboration", color: "#7C3AED" },
  { id: "case", label: "Case Mgmt", color: "#065F46" },
  { id: "threat", label: "Threat Intel", color: "#9F1239" },
];

interface Integration {
  id: string;
  name: string;
  cat: string;
  logo: string;
  desc: string;
}

const INTEGRATIONS: Integration[] = [
  // Cloud

  { id: "aws", name: "AWS", cat: "cloud", logo: "/integrations/Aws.png", desc: "Trench ingests AWS CloudTrail, GuardDuty alerts, and VPC Flow Logs to detect lateral movement, privilege escalation, and data exfiltration in real time." },
  { id: "azure", name: "Microsoft Azure", cat: "cloud", logo: "/integrations/microsoft azure.png", desc: "Trench correlates Azure Activity Logs and Defender for Cloud signals to surface anomalous resource provisioning and account compromise instantly." },
  { id: "gcp", name: "Google Cloud", cat: "cloud", logo: "/integrations/Google cloud platform.png", desc: "Trench normalises GCP Audit Logs and Security Command Center findings into unified threat timelines, compressing detection from days to minutes." },
  { id: "wiz", name: "Wiz", cat: "cloud", logo: "/integrations/Wiz.png", desc: "Trench pairs Wiz cloud risk scores with runtime signals to automatically prioritise and escalate the vulnerabilities that are actively exploited." },
  { id: "cs-cnapp", name: "CrowdStrike CNAPP", cat: "cloud", logo: "/integrations/Crowdstrike.png", desc: "Trench fuses CrowdStrike CNAPP misconfigurations with endpoint telemetry to map the full attack path from cloud entry point to impacted workload." },

  // Endpoint
  { id: "defender", name: "Microsoft Defender", cat: "endpoint", logo: "/integrations/Microsoft defender.png", desc: "Trench ingests MDE alerts and enriches them with identity and cloud context, converting isolated endpoint events into correlated attack stories." },
  { id: "cortex", name: "PAN Cortex XDR", cat: "endpoint", logo: "/integrations/pnr cortex XDR.png", desc: "Trench synchronises Cortex XDR detections with network and identity signals, enabling sub-minute containment actions through bi-directional API playbooks." },
  { id: "s1", name: "SentinelOne", cat: "endpoint", logo: "/integrations/sentinelone.png", desc: "Trench automatically responds to SentinelOne threats by quarantining endpoints, revoking tokens, and opening ServiceNow tickets — all in one automated chain." },
  { id: "cs-falcon", name: "CrowdStrike Falcon", cat: "endpoint", logo: "/integrations/Crowdstrike.png", desc: "Trench elevates Falcon detections with real-time threat intelligence correlation, converting prevention events into actionable SOC investigations." },
  { id: "guardduty", name: "AWS GuardDuty", cat: "endpoint", logo: "/integrations/Aws.png", desc: "Trench maps GuardDuty findings to ATT&CK techniques and links them with CloudTrail and VPC flows for an end-to-end AWS attack narrative." },

  // Identity
  { id: "okta", name: "Okta", cat: "identity", logo: "/integrations/okta.png", desc: "Trench monitors Okta authentication streams for impossible travel, MFA fatigue, and session hijacking, triggering automated identity lockdown in minutes." },
  { id: "entra", name: "Microsoft Entra ID", cat: "identity", logo: "/integrations/Microsoft entra ID.png", desc: "Trench analyses Entra sign-in logs and risky user signals, chaining identity anomalies with endpoint and cloud events into unified attack timelines." },
  { id: "cs-identity", name: "CrowdStrike Identity", cat: "identity", logo: "/integrations/Crowdstrike.png", desc: "Trench correlates CrowdStrike Identity Protection detections with lateral movement indicators across hybrid environments to cut mean-time-to-contain." },

  // SIEM
  { id: "sentinel", name: "Microsoft Sentinel", cat: "siem", logo: "/integrations/microsoft sentinel.png", desc: "Trench sits alongside Sentinel, enriching raw log queries with AI reasoning and automated response — eliminating manual analyst triage cycles." },
  { id: "elastic", name: "Elastic Security", cat: "siem", logo: "/integrations/elastic.png", desc: "Trench ingests Elastic detection engine alerts and auto-prioritises them using behavioural baselines, reducing alert fatigue by over 80%." },
  { id: "anivilogic", name: "Anvilogic", cat: "siem", logo: "/integrations/AnviLogic.png", desc: "Trench amplifies Anvilogic detection stories with external threat intel and automated Tier-1 response, shrinking time-to-resolution dramatically." },
  { id: "sumologic", name: "Sumo Logic", cat: "siem", logo: "/integrations/sumo logic.png", desc: "Trench normalises Sumo Logic queries and correlates log data with endpoint and identity telemetry, eliminating silos across your security data lake." },
  { id: "splunk", name: "Splunk", cat: "siem", logo: "/integrations/Splunk_logo.png", desc: "Trench layers AI-native detection on top of Splunk's raw search, converting SPL alerts into prioritised incidents with automated enrichment and response." },
  { id: "hunters", name: "Hunters", cat: "siem", logo: "/integrations/Hunters H Logo.png", desc: "Trench integrates with Hunters SOC platform to accelerate investigation by mapping every lead to full attack context and triggering containment automatically." },
  { id: "def-email", name: "Defender for Identity", cat: "siem", logo: "/integrations/Microsoft defender.png", desc: "Trench links Defender for Identity anomalies with Sentinel incidents and endpoint alerts to surface Active Directory attack chains in real time." },

  // Email
  { id: "abnormal", name: "Abnormal Security", cat: "email", logo: "/integrations/abnormal security.png", desc: "Trench enriches Abnormal's BEC detections with identity and endpoint telemetry to determine blast radius and trigger automated account remediation." },
  { id: "proofpoint", name: "Proofpoint", cat: "email", logo: "/integrations/proofpoint.png", desc: "Trench correlates Proofpoint phishing detections with downstream endpoint activity — catching when a clicked URL leads to credential theft or malware." },
  { id: "gmail", name: "Gmail", cat: "email", logo: "/integrations/gmail.png", desc: "Trench monitors Gmail audit logs for suspicious forwarding rules, OAuth grants, and account takeover signals, auto-revoking access when threats are confirmed." },
  { id: "exchange", name: "Exchange Online", cat: "email", logo: "/integrations/office 365.png", desc: "Trench ingests Exchange Online Message Trace and audit logs, correlating email threat signals with identity and cloud activity for full O365 visibility." },
  { id: "def-o365", name: "Defender for Office 365", cat: "email", logo: "/integrations/Microsoft defender.png", desc: "Trench amplifies Defender for Office 365 safe-link and attachment signals with user risk scores and automated quarantine workflows." },

  // Data
  { id: "snowflake", name: "Snowflake", cat: "data", logo: "/integrations/snowflake.png", desc: "Trench monitors Snowflake query logs and access patterns, detecting insider threats and data exfiltration attempts with sub-minute alerting." },
  { id: "databricks", name: "Databricks", cat: "data", logo: "/integrations/Databricks.png", desc: "Trench analyses Databricks cluster access and job execution logs to catch abnormal data pipeline behaviour and protect sensitive AI workloads." },

  // Collaboration
  { id: "slack", name: "Slack", cat: "collab", logo: "/integrations/slack.png", desc: "Trench sends real-time SOC alerts to Slack channels, enabling analysts to acknowledge, escalate, or trigger response actions directly from chat." },
  { id: "teams", name: "Microsoft Teams", cat: "collab", logo: "/integrations/microsoft teams.png", desc: "Trench delivers contextual incident notifications to Teams, with adaptive cards that let responders take containment actions without leaving the channel." },
  { id: "o365", name: "Office 365", cat: "collab", logo: "/integrations/office 365.png", desc: "Trench correlates O365 audit logs with identity, email, and endpoint signals to detect compromised accounts and unauthorised data access across the M365 suite." },
  { id: "gws", name: "Google Workspace", cat: "collab", logo: "/integrations/google workspace.png", desc: "Trench ingests Google Workspace Admin and Drive audit logs, detecting OAuth abuse, suspicious sharing, and account takeover across GWS environments." },

  // Case Management
  { id: "pagerduty", name: "PagerDuty", cat: "case", logo: "/integrations/pagerduty.png", desc: "Trench auto-creates and prioritises PagerDuty incidents from AI-correlated alerts, routing the right on-call responder with full attack context." },
  { id: "jira", name: "Jira", cat: "case", logo: "/integrations/jira.png", desc: "Trench opens Jira issues for confirmed threats, attaching full investigation timelines, impacted assets, and recommended remediation steps automatically." },
  { id: "servicenow", name: "ServiceNow", cat: "case", logo: "/integrations/servicenow.png", desc: "Trench integrates with ServiceNow ITSM to open, enrich, and resolve security incidents — automating the handoff between detection and remediation teams." },

  // Network
  { id: "virustotal", name: "VirusTotal", cat: "network", logo: "/integrations/virustotal.png", desc: "Trench enriches every indicator — file hash, IP, domain — with VirusTotal intelligence, instantly contextualising threats without manual lookups." },

  // Threat Intel
  { id: "rf", name: "Recorded Future", cat: "threat", logo: "/integrations/recorded future.png", desc: "Trench fuses Recorded Future's strategic intelligence with real-time SOC telemetry to proactively hunt threats before they reach your environment." },
  { id: "ipinfo", name: "IPinfo", cat: "threat", logo: "/integrations/Ipinfo.png", desc: "Trench automatically enriches every IP indicator with IPinfo geolocation, ASN, and abuse data to speed triage and reduce false positives." },
  { id: "dns", name: "DNSlytics", cat: "threat", logo: "/integrations/DNSlytics.png", desc: "Trench queries DNSlytics to pivot from suspicious domains to related infrastructure, exposing adversary campaigns hiding behind domain fronting." },
  { id: "spur", name: "Spur", cat: "threat", logo: "/integrations/spur.png", desc: "Trench uses Spur to detect VPN/proxy/residential proxy use by attackers, flagging anonymous infrastructure in real time during active investigations." },
  { id: "rl", name: "Reversing Labs", cat: "threat", logo: "/integrations/Reversing Labs.png", desc: "Trench submits suspicious binaries to Reversing Labs for deep file analysis, enriching endpoint alerts with definitive malware classification in seconds." },
];


/* ─────────────────────────────────────────
   MESH SVG — draws lines between visible nodes
───────────────────────────────────────── */
interface NodeRef { id: string; cx: number; cy: number }

function MeshLines({ nodes, hoveredId }: { nodes: NodeRef[]; hoveredId: string | null }) {
  if (nodes.length < 2) return null;

  // Only connect nearby nodes (max distance ~260px) to avoid clutter
  const lines: { x1: number; y1: number; x2: number; y2: number; key: string; active: boolean }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].cx - nodes[j].cx;
      const dy = nodes[i].cy - nodes[j].cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 260) {
        const active = hoveredId === nodes[i].id || hoveredId === nodes[j].id;
        lines.push({ x1: nodes[i].cx, y1: nodes[i].cy, x2: nodes[j].cx, y2: nodes[j].cy, key: `${i}-${j}`, active });
      }
    }
  }
  return (
    <>
      {lines.map(l => (
        <line
          key={l.key}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          className={l.active ? "active-line" : ""}
          style={l.active ? {} : { opacity: hoveredId ? 0.25 : 1 }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   DEPLOYMENT SECTION
───────────────────────────────────────── */

interface DeployOption {
  id: string;
  label: string;
  tag: string;
  icon: React.ReactNode;
  headline: string;
  body: string;
  badge: string | null;
  badgeColor?: string;
}

const DEPLOY_OPTIONS: DeployOption[] = [
  {
    id: "saas",
    label: "Cloud Hosted",
    tag: "SaaS",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" style={{width:28,height:28}}>
        <path d="M8 22a6 6 0 01-.5-12A8 8 0 0124 14h1a5 5 0 010 10H8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    headline: "We manage everything.",
    body: "Fastest setup, lowest maintenance, fully operational within 2 weeks. Ideal for teams who want to move fast without infrastructure overhead.",
    badge: "Recommended",
    badgeColor: "#0F40DC",
  },
  {
    id: "byodb",
    label: "Bring Your Own Database",
    tag: "BYODB",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" style={{width:28,height:28}}>
        <ellipse cx="16" cy="9" rx="10" ry="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 9v7c0 2.21 4.48 4 10 4s10-1.79 10-4V9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 16v7c0 2.21 4.48 4 10 4s10-1.79 10-4v-7" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    headline: "Your data. Your control.",
    body: "Use your own data infrastructure. Full data ownership with Trench's detection and response layer sitting on top of your existing database.",
    badge: null,
  },
  {
    id: "byoc",
    label: "Bring Your Own Cloud",
    tag: "BYOC",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" style={{width:28,height:28}}>
        <rect x="4" y="10" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 10V8a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="16" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    headline: "Deploy inside your cloud.",
    body: "Deploy Trench inside your own AWS, GCP or Azure account. Ideal for teams with data sovereignty and compliance requirements.",
    badge: null,
  },
  {
    id: "onprem",
    label: "On-Premise",
    tag: "ON-PREM",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" style={{width:28,height:28}}>
        <rect x="4" y="14" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 14V10a6 6 0 0112 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="16" cy="21" r="2" fill="currentColor"/>
      </svg>
    ),
    headline: "Nothing leaves your environment.",
    body: "Fully on-premise deployment for teams with the strictest security and regulatory requirements. Total isolation, total control.",
    badge: null,
  },
];

interface LLMOption {
  id: string;
  name: string;
  by: string;
  color: string;
  bg: string;
  tag: string | null;
  desc: string;
  icon: React.ReactNode;
}

const LLM_OPTIONS: LLMOption[] = [
  {
    id: "claude",
    name: "Claude",
    by: "Anthropic",
    color: "#FFB547",
    bg: "#FFFFFF",
    tag: "Default",
    desc: "Trench's recommended default. Best-in-class reasoning for complex threat investigation and intent analysis.",
    icon: (
      <Image src="/integrations/claude-color.png" alt="Claude" width={36} height={36} style={{ objectFit: "contain" }} />
    ),
  },
  {
    id: "gpt",
    name: "GPT",
    by: "OpenAI",
    color: "#34E1FF",
    bg: "#FFFFFF",
    tag: null,
    desc: "Connect your existing OpenAI deployment. Full support for GPT-4 and above.",
    icon: (
      <Image src="/integrations/chatgpt.png" alt="GPT" width={36} height={36} style={{ objectFit: "contain" }} />
    ),
  },
  {
    id: "gemini",
    name: "Gemini",
    by: "Google",
    color: "#0D41E1",
    bg: "#FFFFFF",
    tag: null,
    desc: "Native integration with Google's frontier model. Ideal for teams already in the Google Cloud ecosystem.",
    icon: (
      <Image src="/integrations/gemini-logo-icon.webp" alt="Gemini" width={36} height={36} style={{ objectFit: "contain" }} />
    ),
  },
  {
    id: "custom",
    name: "Custom LLM",
    by: "Your Model",
    color: "#FF3B81",
    bg: "#FFFFFF",
    tag: "Enterprise",
    desc: "Running a private or fine-tuned model? Trench supports custom LLM endpoints for specific compliance or data residency requirements.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" style={{width:36,height:36}}>
        <circle cx="20" cy="20" r="18" fill="#FF3B81" fillOpacity="0.12"/>
        <rect x="13" y="13" width="14" height="14" rx="3" stroke="#FF3B81" strokeWidth="1.8"/>
        <path d="M17 20h6M20 17v6" stroke="#FF3B81" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function DeploymentSection() {
  const [activeDeploy, setActiveDeploy] = useState("saas");
  const active = DEPLOY_OPTIONS.find(d => d.id === activeDeploy);

  return (
    <div className="deploy-section">
      <div className="deploy-container">

        {/* ── DEPLOYMENT OPTIONS ── */}
        <div style={{ marginBottom: 96 }}>
          <div className="deploy-header">
            <div className="deploy-eyebrow">DEPLOY YOUR WAY.</div>
            <h2 className="deploy-title">
              Trench fits your stack.<br />Not the other way around.
            </h2>
            <p className="deploy-subtitle">
              Every security team is different. Trench is built to meet you where you are, on your terms.
            </p>
          </div>

          <div className="deploy-tabs">
            {DEPLOY_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setActiveDeploy(opt.id)}
                className={`deploy-tab-btn ${activeDeploy === opt.id ? "active" : ""}`}
              >
                <span style={{ opacity: activeDeploy === opt.id ? 1 : 0.5 }}>{opt.icon}</span>
                <span>{opt.tag}</span>
              </button>
            ))}
          </div>

          {active && (
            <div className="deploy-card">
              <div className="deploy-card-accent" />
              <div className="deploy-card-icon">
                {active.icon}
              </div>
              <div className="deploy-card-content">
                <div className="deploy-card-title-wrap">
                  <h3 className="deploy-card-title">{active.label}</h3>
                  {active.badge && (
                    <span className="deploy-card-badge">{active.badge}</span>
                  )}
                </div>
                <p className="deploy-card-headline">{active.headline}</p>
                <p className="deploy-card-body">{active.body}</p>
              </div>
            </div>
          )}
        </div>

        <div className="deploy-divider" />

        {/* ── BRING YOUR OWN LLM ── */}
        <div>
          <div className="deploy-header">
            <div className="deploy-eyebrow">YOUR AI. YOUR CHOICE.</div>
            <h2 className="deploy-title">
              Bring the frontier AI model<br />your team trusts.
            </h2>
            <p className="deploy-subtitle">
              Trench is model-agnostic. Connect the frontier AI model your team already uses and let Trench&apos;s agents do the rest.
            </p>
          </div>

          <div className="llm-grid">
            {LLM_OPTIONS.map(llm => (
              <div
                key={llm.id}
                className="llm-card"
                style={{
                  borderColor: `${llm.color}30`,
                  background: llm.bg,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${llm.color}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {llm.tag && (
                  <span className="llm-card-tag" style={{ background: llm.color }}>
                    {llm.tag}
                  </span>
                )}
                <div className="llm-card-icon">{llm.icon}</div>
                <div className="llm-card-name">{llm.name}</div>
                <div className="llm-card-by">
                  {llm.by}
                </div>
                <p className="llm-card-desc">{llm.desc}</p>
              </div>
            ))}
          </div>

          <div className="llm-footer">
            <p className="llm-footer-text">
              Your infrastructure.{" "}
              <span>Your AI.</span>{" "}
              <span>Your Trench.</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function IntegrationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ item: Integration; x: number; y: number } | null>(null);
  const [nodeRefs, setNodeRefs] = useState<NodeRef[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeEls = useRef<Map<string, HTMLDivElement>>(new Map());

  const visible = activeFilter === "all"
    ? INTEGRATIONS
    : INTEGRATIONS.filter(i => i.cat === activeFilter);

  // Recompute mesh centres whenever visible set changes
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wRect = wrap.getBoundingClientRect();
    const refs: NodeRef[] = [];
    nodeEls.current.forEach((el, id) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      refs.push({ id, cx: r.left - wRect.left + r.width / 2, cy: r.top - wRect.top + r.height / 2 });
    });
    setNodeRefs(refs);
  }, [activeFilter]);

  const handleMouseEnter = useCallback((e: React.MouseEvent, item: Integration) => {
    setHoveredId(item.id);
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ item, x: r.right + 12, y: r.top });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    setTooltip(null);
  }, []);

  const catColor = (catId: string) => CATEGORIES.find(c => c.id === catId)?.color ?? "#0D41E1";

  return (
    <main className="page-main overflow-hidden">

      <div className="container-wide">
        {/* <TweaksPanel title="Settings">
        <div style={{ padding: "8px 14px", color: "var(--color-neutral-500)" }}>
          Settings will appear here
        </div>
      </TweaksPanel>
      <div className="container-wide">
        
        <VariationSlack /> */}

        {/* ── Hero ── */}
        <div className="int-hero">
          <p className="int-eyebrow">Ecosystem</p>
          <h1 className="int-title">Integrations for your SOC workflow</h1>
          <p className="int-subtitle">
            Agentless, API-native integrations across your entire security stack.
            {/* Trench connects to {INTEGRATIONS.length}+ tools in minutes — no agents, no friction. */}
          </p>
        </div>

        {/* ── Filter pills ── */}
        <div className="int-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`int-pill ${activeFilter === cat.id ? "active" : ""}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Mesh + nodes ── */}
        <div className="int-mesh-wrap" ref={wrapRef}>
          <svg className="int-mesh-svg">
            <MeshLines nodes={nodeRefs} hoveredId={hoveredId} />
          </svg>

          <div className="int-nodes">
            {visible.map((item, idx) => (
              <div
                key={item.id}
                ref={el => { if (el) nodeEls.current.set(item.id, el); else nodeEls.current.delete(item.id); }}
                className={`int-node cat-${item.cat} ${hoveredId && hoveredId !== item.id ? "dimmed" : ""} ${hoveredId === item.id ? "highlighted" : ""}`}
                style={{ animationDelay: `${idx * 0.04}s` }}
                onMouseEnter={e => handleMouseEnter(e, item)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="int-node-logo-wrap">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={36}
                    height={36}
                    className="int-node-logo"
                    quality={90}
                  />
                </div>
                <div className="int-node-info">
                  <span className="int-node-name">{item.name}</span>
                  <span className="int-node-cat">{CATEGORIES.find(c => c.id === item.cat)?.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="int-legend">
          {CATEGORIES.filter(c => c.id !== "all").map(cat => (
            <div key={cat.id} className="int-legend-item">
              <div className="int-legend-dot" style={{ background: cat.color }} />
              {cat.label}
            </div>
          ))}
        </div>

      </div>

      <DeploymentSection />

      {/* ── Floating tooltip ── */}
      {
        tooltip && (() => {
          const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
          const posStyle = isMobile
            ? {}  // CSS handles bottom-sheet positioning
            : {
              left: Math.min(tooltip.x, window.innerWidth - 316),
              top: Math.max(8, tooltip.y - 8),
            };
          return (
            <div className="int-tooltip visible" style={posStyle}>
              <div className="int-tooltip-logo-wrap">
                <Image
                  src={tooltip.item.logo}
                  alt={tooltip.item.name}
                  width={44}
                  height={44}
                  className="int-tooltip-logo"
                  quality={95}
                />
              </div>
              <div className="int-tooltip-name">{tooltip.item.name}</div>
              <div className="int-tooltip-badge">{CATEGORIES.find(c => c.id === tooltip.item.cat)?.label}</div>
              <p className="int-tooltip-desc">{tooltip.item.desc}</p>
              <div className="int-tooltip-footer">↗ How Trench integrates</div>
            </div>
          );
        })()
      }

    </main >
  );
}
