import { useState, useEffect } from "react";

// ─── STEP 1: INGEST DIAGRAM ───────────────────────────────────────────────────
function IngestDiagram() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPulse(p => (p + 1) % 5), 600);
    return () => clearInterval(t);
  }, []);

  const sources = [
    { label: "CLOUD", icon: "☁", y: 40 },
    { label: "ENDPOINT", icon: "💻", y: 100 },
    { label: "IDENTITY", icon: "🔐", y: 160 },
    { label: "NETWORK", icon: "🌐", y: 220 },
    { label: "SaaS", icon: "📦", y: 280 },
  ];

  const pipeline = ["PARSE", "NORMALIZE", "ENRICH", "VALIDATE"];

  return (
    <svg viewBox="0 0 520 340" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="engineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="lakeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#004488" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* SOURCE NODES */}
      {sources.map((s, i) => (
        <g key={i}>
          <rect x="8" y={s.y - 16} width="82" height="32" rx="6"
            fill="#0A1628" stroke={pulse === i ? "#00D4FF" : "#1A3050"}
            strokeWidth={pulse === i ? "1.5" : "1"} />
          <text x="20" y={s.y - 2} fontSize="12" fill="#6A8099">{s.icon}</text>
          <text x="36" y={s.y + 5} fontSize="9" fill={pulse === i ? "#00D4FF" : "#4A6080"}
            fontFamily="monospace" letterSpacing="0.5">{s.label}</text>
          {pulse === i && (
            <circle cx="100" cy={s.y} r="3" fill="#00D4FF" opacity="0.9">
              <animate attributeName="cx" from="95" to="158" dur="0.6s" fill="freeze" />
              <animate attributeName="opacity" from="0.9" to="0" dur="0.6s" fill="freeze" />
            </circle>
          )}
          <line x1="90" y1={s.y} x2="158" y2={s.y} stroke="#1A3050" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="158" y1={s.y} x2="158" y2="170" stroke="#1A3050" strokeWidth="1" strokeDasharray="4,3" />
        </g>
      ))}

      {/* DATA ENGINE */}
      <rect x="153" y="58" width="122" height="224" rx="10"
        fill="url(#engineGrad)" stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="214" y="80" textAnchor="middle" fontSize="8" fill="#00D4FF"
        fontFamily="monospace" letterSpacing="1.5">DATA ENGINE</text>
      {pipeline.map((step, i) => (
        <g key={i}>
          <rect x="165" y={100 + i * 46} width="98" height="32" rx="5"
            fill={pulse % 4 === i ? "#00D4FF" : "#0A1628"}
            stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.5" />
          <text x="214" y={120 + i * 46} textAnchor="middle" fontSize="9"
            fill={pulse % 4 === i ? "#050E1A" : "#4A8099"}
            fontFamily="monospace" letterSpacing="1">{step}</text>
          {i < 3 && (
            <polygon points={`210,${133 + i * 46} 214,${140 + i * 46} 218,${133 + i * 46}`}
              fill="#00D4FF" opacity="0.4" />
          )}
        </g>
      ))}

      {/* FLOW ARROW */}
      <line x1="275" y1="170" x2="308" y2="170" stroke="#00D4FF" strokeWidth="2" strokeOpacity="0.6" />
      <polygon points="306,166 314,170 306,174" fill="#00D4FF" opacity="0.6" />

      {/* UNIFIED DATA LAKE */}
      <rect x="313" y="78" width="122" height="184" rx="10"
        fill="url(#lakeGrad)" stroke="#00D4FF" strokeWidth="1.5" strokeOpacity="0.5" />
      <text x="374" y="100" textAnchor="middle" fontSize="8" fill="#00D4FF"
        fontFamily="monospace" letterSpacing="1">UNIFIED MESH</text>
      <text x="374" y="114" textAnchor="middle" fontSize="8" fill="#00D4FF"
        fontFamily="monospace" letterSpacing="1">DATA LAKE</text>
      {[0,1,2,3].map(i => (
        <ellipse key={i} cx="374" cy={175 + i * 18} rx="46" ry="9"
          fill="none" stroke="#00D4FF" strokeWidth="1" strokeOpacity={0.6 - i * 0.12} />
      ))}
      <ellipse cx="374" cy="173" rx="46" ry="9" fill="#00D4FF" fillOpacity="0.08" />
      <text x="374" y="245" textAnchor="middle" fontSize="7.5" fill="#4A8099" fontFamily="monospace">SIEM + DATALAKE</text>

      {/* OUTPUT TAGS */}
      {["SEARCHABLE","ENRICHED","NORMALIZED"].map((o,i) => (
        <g key={i}>
          <rect x={313 + i * 41} y="275" width="38" height="17" rx="8"
            fill="#00D4FF18" stroke="#00D4FF" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={332 + i * 41} y="286" textAnchor="middle" fontSize="6"
            fill="#00D4FF" fontFamily="monospace">{o}</text>
        </g>
      ))}

      {/* AGENTLESS BADGE */}
      <rect x="153" y="295" width="110" height="22" rx="11"
        fill="#003322" stroke="#00FF88" strokeWidth="1" strokeOpacity="0.5" />
      <text x="208" y="308" textAnchor="middle" fontSize="8" fill="#00FF88"
        fontFamily="monospace">⚡ AGENTLESS SETUP</text>

      <text x="260" y="330" textAnchor="middle" fontSize="8" fill="#2A4060"
        fontFamily="monospace" letterSpacing="2">SOURCES → ENGINE → UNIFIED LAYER</text>
    </svg>
  );
}

// ─── STEP 2: DETECT DIAGRAM ───────────────────────────────────────────────────
function DetectDiagram() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 700);
    return () => clearInterval(t);
  }, []);

  const threatNodes = [
    { x: 258, y: 48, label: "LATERAL\nMOVEMENT" },
    { x: 378, y: 108, label: "PRIV\nESCALATION" },
    { x: 360, y: 228, label: "DATA\nEXFIL" },
    { x: 240, y: 278, label: "C2\nCOMMS" },
    { x: 120, y: 238, label: "INITIAL\nACCESS" },
    { x: 100, y: 118, label: "PERSIST-\nENCE" },
  ];
  const active = tick % threatNodes.length;

  return (
    <svg viewBox="0 0 520 340" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="intentGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* DATA INPUT */}
      <rect x="8" y="58" width="78" height="224" rx="8"
        fill="#0A1628" stroke="#1A3050" strokeWidth="1" />
      <text x="47" y="80" textAnchor="middle" fontSize="7.5" fill="#4A6080" fontFamily="monospace">RAW</text>
      <text x="47" y="92" textAnchor="middle" fontSize="7.5" fill="#4A6080" fontFamily="monospace">SIGNALS</text>
      {["LOG","ALERT","EVENT","FLOW","INTEL"].map((l,i) => (
        <g key={i}>
          <rect x="16" y={108 + i * 30} width="62" height="22" rx="4"
            fill={active === i ? "#FF6B3520" : "#0D1F35"}
            stroke={active === i ? "#FF6B35" : "#1A3050"} strokeWidth="1" />
          <text x="47" y={122 + i * 30} textAnchor="middle" fontSize="8"
            fill={active === i ? "#FF6B35" : "#2A4060"} fontFamily="monospace">{l}</text>
        </g>
      ))}

      {/* Arrow */}
      <line x1="86" y1="170" x2="176" y2="170" stroke="#FF6B35" strokeWidth="1.5" strokeDasharray="5,3" strokeOpacity="0.4" />
      <polygon points="174,166 182,170 174,174" fill="#FF6B35" opacity="0.4" />

      {/* INTENT GRAPH */}
      <circle cx="258" cy="170" r="80" fill="url(#intentGrad)" />
      <circle cx="258" cy="170" r="56" fill="none" stroke="#FF6B35" strokeWidth="1" strokeDasharray="6,4" strokeOpacity="0.3" />
      <circle cx="258" cy="170" r="32" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="258" cy="170" r="14" fill="#FF6B35" fillOpacity="0.15" stroke="#FF6B35" strokeWidth="2" />
      <text x="258" y="167" textAnchor="middle" fontSize="7" fill="#FF6B35" fontFamily="monospace" fontWeight="bold">INTENT</text>
      <text x="258" y="178" textAnchor="middle" fontSize="7" fill="#FF6B35" fontFamily="monospace" fontWeight="bold">GRAPH</text>

      {/* Threat nodes */}
      {threatNodes.map((node, i) => (
        <g key={i}>
          <line x1={node.x} y1={node.y + 10} x2="258" y2="170"
            stroke={i === active ? "#FF6B35" : "#1A3050"}
            strokeWidth={i === active ? "1.5" : "1"} strokeDasharray="4,3"
            strokeOpacity={i === active ? "0.7" : "0.25"} />
          <rect x={node.x - 30} y={node.y - 8} width="60" height="36" rx="6"
            fill={i === active ? "#FF6B3525" : "#0A1628"}
            stroke={i === active ? "#FF6B35" : "#1A3050"}
            strokeWidth={i === active ? "1.5" : "1"} />
          {node.label.split("\n").map((line, j) => (
            <text key={j} x={node.x} y={node.y + 5 + j * 12} textAnchor="middle" fontSize="7.5"
              fill={i === active ? "#FF6B35" : "#2A4060"} fontFamily="monospace">{line}</text>
          ))}
        </g>
      ))}

      {/* MITRE badge */}
      <rect x="196" y="268" width="124" height="22" rx="11"
        fill="#1A0800" stroke="#FF6B35" strokeWidth="1" strokeOpacity="0.5" />
      <text x="258" y="282" textAnchor="middle" fontSize="8" fill="#FF6B35" fontFamily="monospace">MITRE ATT&CK ALIGNED</text>

      {/* OUTPUT */}
      <line x1="330" y1="170" x2="398" y2="170" stroke="#FF6B35" strokeWidth="1.5" strokeDasharray="5,3" strokeOpacity="0.4" />
      <polygon points="396,166 404,170 396,174" fill="#FF6B35" opacity="0.4" />
      <rect x="403" y="98" width="102" height="144" rx="8" fill="#0A1628" stroke="#FF6B3550" strokeWidth="1.5" />
      <text x="454" y="118" textAnchor="middle" fontSize="7.5" fill="#FF6B35" fontFamily="monospace">AUTO-GENERATED</text>
      <text x="454" y="130" textAnchor="middle" fontSize="7.5" fill="#FF6B35" fontFamily="monospace">DETECTIONS</text>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="413" y={146 + i * 22} width="82" height="16" rx="4"
            fill={active % 4 === i ? "#FF6B3530" : "#0D1F35"}
            stroke="#FF6B3440" strokeWidth="1" />
          <circle cx="422" cy={154 + i * 22} r="3" fill={active % 4 === i ? "#FF6B35" : "#1A3050"} />
          <rect x="429" y={150 + i * 22} width="52" height="4" rx="2" fill={active % 4 === i ? "#FF6B3560" : "#1A3050"} />
          <rect x="429" y={157 + i * 22} width="36" height="3" rx="1.5" fill="#1A3050" />
        </g>
      ))}

      <text x="260" y="330" textAnchor="middle" fontSize="8" fill="#2A4060"
        fontFamily="monospace" letterSpacing="2">SIGNALS → INTENT GRAPH → DETECTIONS</text>
    </svg>
  );
}

// ─── STEP 3: RESPOND DIAGRAM ──────────────────────────────────────────────────
function RespondDiagram() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 5), 900);
    return () => clearInterval(t);
  }, []);

  const flow = [
    { x: 44,  label: "THREAT\nDETECTED",    color: "#FF4444" },
    { x: 149, label: "AGENT\nINVESTIGATES", color: "#FF6B35" },
    { x: 254, label: "CONTEXT\nCORRELATED", color: "#FFB800" },
    { x: 359, label: "RESPONSE\nTRIGGERED", color: "#00AAFF" },
    { x: 464, label: "THREAT\nCLOSED",      color: "#00FF88" },
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
    <svg viewBox="0 0 520 340" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="tlGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF4444" />
          <stop offset="100%" stopColor="#00FF88" />
        </linearGradient>
      </defs>

      {/* TIMELINE */}
      <line x1="44" y1="110" x2="464" y2="110" stroke="#1A3050" strokeWidth="2" />
      <line x1="44" y1="110" x2={44 + step * 105} y2="110"
        stroke="url(#tlGrad)" strokeWidth="2.5" />

      {flow.map((node, i) => (
        <g key={i}>
          <line x1={node.x} y1="110" x2={node.x} y2="148"
            stroke={i <= step ? node.color : "#1A3050"} strokeWidth="1" strokeOpacity="0.5" />
          <circle cx={node.x} cy="110" r={i === step ? "14" : "10"}
            fill={i <= step ? node.color : "#0A1628"}
            stroke={node.color} strokeWidth={i === step ? "2.5" : "1.5"}
            strokeOpacity={i <= step ? "1" : "0.3"} />
          {i < step && (
            <path d={`M${node.x-5},110 L${node.x-1},114 L${node.x+6},105`}
              stroke="#050E1A" strokeWidth="2" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
          )}
          {i === step && (
            <text x={node.x} y="114" textAnchor="middle" fontSize="10"
              fill="#050E1A" fontWeight="bold" fontFamily="monospace">{i+1}</text>
          )}
          <rect x={node.x-38} y="151" width="76" height="36" rx="5"
            fill={i <= step ? `${node.color}15` : "#0A1628"}
            stroke={i <= step ? node.color : "#1A3050"}
            strokeWidth="1" strokeOpacity={i <= step ? "0.6" : "0.3"} />
          {node.label.split("\n").map((line, j) => (
            <text key={j} x={node.x} y={164 + j * 12} textAnchor="middle" fontSize="8"
              fill={i <= step ? node.color : "#2A4060"} fontFamily="monospace">{line}</text>
          ))}
          {i < flow.length - 1 && (
            <polygon points={`${node.x+12},107 ${node.x+20},110 ${node.x+12},113`}
              fill={i < step ? flow[i+1].color : "#1A3050"}
              fillOpacity={i < step ? "0.7" : "0.3"} />
          )}
        </g>
      ))}

      {/* AI AGENT PANEL */}
      <rect x="18" y="210" width="210" height="108" rx="8"
        fill="#0A1628" stroke="#00AAFF" strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="34" y="230" fontSize="8" fill="#00AAFF" fontFamily="monospace" letterSpacing="1.5">AI AGENT ACTIVITY</text>
      {agentActions.slice(0, Math.min(step+1,5)).map((action, i) => (
        <g key={i}>
          <circle cx="32" cy={246 + i*16} r="3" fill={i === step ? "#00AAFF" : "#00AAFF50"} />
          <text x="42" y={250 + i*16} fontSize="8" fill={i === step ? "#00AAFF" : "#2A4060"}
            fontFamily="monospace">{action}</text>
          {i === step && (
            <circle cx="32" cy={246 + i*16} r="6" fill="none" stroke="#00AAFF" strokeWidth="1" strokeOpacity="0.3">
              <animate attributeName="r" from="3" to="10" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}

      {/* METRICS PANEL */}
      <rect x="290" y="210" width="210" height="108" rx="8"
        fill="#0A1628" stroke="#00FF88" strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="306" y="230" fontSize="8" fill="#00FF88" fontFamily="monospace" letterSpacing="1.5">RESPONSE METRICS</text>
      {metrics.map((m, i) => (
        <g key={i}>
          <text x="306" y={250 + i*16} fontSize="7.5" fill={m.active ? "#4A8099" : "#1A3050"} fontFamily="monospace">{m.label}</text>
          <text x="490" y={250 + i*16} textAnchor="end" fontSize="7.5"
            fill={m.active ? "#00FF88" : "#1A3050"} fontFamily="monospace" fontWeight="bold">{m.value}</text>
          <line x1="306" y1={253 + i*16} x2="490" y2={253 + i*16}
            stroke={m.active ? "#1A3050" : "#0D1F35"} strokeWidth="0.5" strokeDasharray="3,3" />
        </g>
      ))}

      <text x="260" y="330" textAnchor="middle" fontSize="8" fill="#2A4060"
        fontFamily="monospace" letterSpacing="2">DETECT → INVESTIGATE → CORRELATE → CLOSE</text>
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const steps = [
  {
    number:"01", label:"INGEST", color:"#00D4FF",
    headline:"Connect everything. Miss nothing.",
    body:"Trench connects to every log source, tool, and data stream across your stack — cloud, endpoint, identity, network, and SaaS. No agents to deploy. No data duplication. Clean, normalized, and ready for detection from day one.",
    checks:["Native integrations","Agentless connector-based setup","Auto-normalized. Enriched. Searchable."],
    Diagram: IngestDiagram,
  },
  {
    number:"02", label:"DETECT", color:"#FF6B35",
    headline:"Detection driven by Intent. Not just rules.",
    body:"Trench's Intent Graph continuously maps attacker behavior, correlates signals across your entire data footprint, and auto-generates detections aligned to real-world threats — not static rules written last quarter.",
    checks:["Intent Graph — detects based on attacker behavior, not signatures","Real-time threat correlation across your stack","MITRE ATT&CK aligned. Always current."],
    Diagram: DetectDiagram,
  },
  {
    number:"03", label:"RESPOND", color:"#00FF88",
    headline:"From alert to closed. In minutes.",
    body:"When a threat is detected, Trench agents automatically investigate, correlate context, and trigger response workflows — so your team reviews decisions, not drowning in alerts.",
    checks:["Automated investigation & triage","End-to-end response workflows","Your team focuses on decisions. Not busywork."],
    Diagram: RespondDiagram,
  },
];

export default function TrenchHowItWorks() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div style={{
      background:"#050E1A", minHeight:"100vh",
      fontFamily:"'DM Mono','Courier New',monospace",
      padding:"60px 24px", color:"#E8EDF5",
    }}>
      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:"48px" }}>
        <div style={{ fontSize:"10px", letterSpacing:"4px", color:"#2A4060", marginBottom:"14px" }}>
          ONE PLATFORM. ZERO BLIND SPOTS. TOTAL CONTROL.
        </div>
        <h2 style={{
          fontSize:"clamp(28px,5vw,44px)", fontWeight:"700",
          letterSpacing:"-1px", color:"#E8EDF5", margin:"0 0 10px",
          fontFamily:"'Georgia',serif",
        }}>How Trench Works.</h2>
        <p style={{ color:"#2A4060", fontSize:"13px", letterSpacing:"2px" }}>
          THREE STEPS. FULLY AUTOMATED. ALWAYS ON.
        </p>
      </div>

      {/* Step tabs */}
      <div style={{
        display:"flex", gap:"8px", justifyContent:"center",
        maxWidth:"480px", margin:"0 auto 40px",
      }}>
        {steps.map((s,i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            flex:1, padding:"12px 8px", borderRadius:"8px",
            border:`1.5px solid ${active===i ? s.color : "#0F2040"}`,
            background:active===i ? `${s.color}15` : "#080F1A",
            color:active===i ? s.color : "#2A4060",
            fontSize:"10px", fontWeight:"700", letterSpacing:"2px",
            cursor:"pointer", transition:"all 0.25s", fontFamily:"inherit",
          }}>
            <div style={{ fontSize:"16px", marginBottom:"4px", opacity:active===i?1:0.3 }}>
              {s.number}
            </div>
            {s.label}
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div style={{
        display:"grid", gridTemplateColumns:"1.15fr 0.85fr",
        gap:"32px", maxWidth:"960px", margin:"0 auto", alignItems:"start",
      }}>
        {/* Diagram */}
        <div style={{
          background:"#080F1A",
          border:`1px solid ${step.color}22`,
          borderRadius:"16px", padding:"24px",
          position:"relative", overflow:"hidden", minHeight:"340px",
        }}>
          <div style={{
            position:"absolute", top:0, right:0,
            width:"140px", height:"140px",
            background:`radial-gradient(circle at top right, ${step.color}12, transparent)`,
            borderRadius:"0 16px 0 0",
          }} />
          <div style={{
            position:"absolute", top:"10px", left:"18px",
            fontSize:"70px", fontWeight:"900", color:step.color,
            opacity:"0.04", fontFamily:"'Georgia',serif", letterSpacing:"-4px",
          }}>{step.number}</div>
          <step.Diagram />
        </div>

        {/* Content */}
        <div style={{ padding:"8px 0" }}>
          <div style={{ fontSize:"10px", letterSpacing:"3px", color:step.color, marginBottom:"14px" }}>
            STEP {step.number} — {step.label}
          </div>
          <h3 style={{
            fontSize:"clamp(18px,2.5vw,24px)", fontWeight:"700",
            color:"#E8EDF5", margin:"0 0 16px", lineHeight:"1.35",
            fontFamily:"'Georgia',serif",
          }}>{step.headline}</h3>
          <p style={{
            fontSize:"13px", lineHeight:"1.75", color:"#4A6080",
            margin:"0 0 28px", letterSpacing:"0.2px",
          }}>{step.body}</p>

          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {step.checks.map((check,j) => (
              <div key={j} style={{
                display:"flex", alignItems:"flex-start", gap:"10px",
                padding:"10px 14px",
                background:`${step.color}08`,
                border:`1px solid ${step.color}20`,
                borderRadius:"8px", fontSize:"12px", color:"#6A8099",
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink:0, marginTop:"1px" }}>
                  <circle cx="7" cy="7" r="6" fill={`${step.color}25`} stroke={step.color} strokeWidth="1" />
                  <path d="M4 7L6 9L10 5" stroke={step.color} strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                {check}
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div style={{ display:"flex", gap:"6px", marginTop:"28px" }}>
            {steps.map((s,i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                height:"3px", flex:1, borderRadius:"2px", cursor:"pointer",
                background:i===active ? s.color : i<active ? `${s.color}40` : "#0F2040",
                transition:"all 0.3s",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign:"center", marginTop:"56px",
        paddingTop:"28px", borderTop:"1px solid #0D1F35",
      }}>
        <span style={{ fontSize:"12px", color:"#2A4060", letterSpacing:"1px" }}>
          Operational in 2 weeks.{" "}
          <span style={{ color:"#4A8099" }}>At half your current SIEM cost.</span>
        </span>
      </div>
    </div>
  );
}
