export default function HeadlessSecOpsModes() {
  const brandPrimary = "#0D41E1";
  const brandNeutral = "#64748B";
  const brandLight = "#CBD5E1";

  const modes = [
    {
      id: 0,
      number: "01",
      name: "Zero UI",
      tagline: "Agent acts. No human needed.",
      detail: "Detection, enrichment, and low-risk remediation run fully in the background.",
      humanLabel: "No human required",
      visual: (
        <svg width="90" height="90" viewBox="0 0 56 56" fill="none">
          <style>
            {`
              @keyframes pulseCore {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.8; }
              }
              @keyframes orbit {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .ai-core { transform-origin: 28px 28px; animation: pulseCore 3s ease-in-out infinite; }
              .ai-orbit { transform-origin: 28px 28px; animation: orbit 6s linear infinite; }
              .ai-orbit-reverse { transform-origin: 28px 28px; animation: orbit 10s linear infinite reverse; }
            `}
          </style>
          
          <circle cx="28" cy="28" r="22" stroke={brandLight} strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
          
          <g className="ai-orbit">
            <circle cx="28" cy="28" r="14" stroke={brandPrimary} strokeWidth="1" strokeDasharray="3 6" opacity="0.5"/>
            <circle cx="28" cy="14" r="3" fill={brandPrimary}/>
          </g>
          
          <g className="ai-orbit-reverse">
            <circle cx="28" cy="28" r="22" stroke="transparent" strokeWidth="1"/>
            <circle cx="6" cy="28" r="2.5" fill={brandNeutral}/>
            <circle cx="50" cy="28" r="2" fill={brandLight}/>
            <circle cx="28" cy="50" r="1.5" fill={brandNeutral}/>
          </g>

          <circle cx="28" cy="28" r="6" fill={brandPrimary} className="ai-core"/>
          <path d="M28 20 L28 36 M20 28 L36 28" stroke="#ffffff" strokeWidth="1.5" className="ai-core"/>
        </svg>
      ),
    },
    {
      id: 1,
      number: "02",
      name: "Conversational UX",
      tagline: "Agent surfaces. Human approves.",
      detail: "High-signal threats route to Slack, Teams, or Claude, full context, one-click resolution.",
      humanLabel: "Human in the loop",
      visual: (
        <svg width="90" height="90" viewBox="0 0 56 56" fill="none">
          <style>
            {`
              @keyframes chatPop1 {
                0%, 5% { opacity: 0; transform: translateY(6px); }
                10%, 90% { opacity: 1; transform: translateY(0); }
                95%, 100% { opacity: 0; transform: translateY(-4px); }
              }
              @keyframes chatPop2 {
                0%, 25% { opacity: 0; transform: translateY(6px); }
                30%, 90% { opacity: 1; transform: translateY(0); }
                95%, 100% { opacity: 0; transform: translateY(-4px); }
              }
              @keyframes checkPop {
                0%, 50% { opacity: 0; transform: scale(0.5); }
                55%, 90% { opacity: 1; transform: scale(1); }
                95%, 100% { opacity: 0; transform: scale(1.1); }
              }
              .chat-bubble-1 { animation: chatPop1 6s ease-in-out infinite; }
              .chat-bubble-2 { animation: chatPop2 6s ease-in-out infinite; }
              .chat-bubble-check { animation: checkPop 6s ease-in-out infinite; transform-origin: 28px 28px; }
            `}
          </style>

          <circle cx="28" cy="28" r="22" stroke={brandLight} strokeWidth="1" strokeDasharray="2 6" opacity="0.5"/>

          {/* Chat Bubble 1 (User / System Alert) */}
          <g className="chat-bubble-1">
            <rect x="6" y="12" width="28" height="16" rx="4" stroke={brandNeutral} strokeWidth="1.5" fill="#ffffff"/>
            <path d="M12 28 L14 33 L18 28" fill="#ffffff" stroke={brandNeutral} strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M13.5 27.5 L16.5 27.5" stroke="#ffffff" strokeWidth="3"/> 
            <line x1="12" y1="18" x2="26" y2="18" stroke={brandLight} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="12" y1="22" x2="20" y2="22" stroke={brandLight} strokeWidth="1.5" strokeLinecap="round"/>
          </g>

          {/* Chat Bubble 2 (Agent Reply & Context) */}
          <g className="chat-bubble-2">
            <rect x="22" y="24" width="28" height="16" rx="4" fill={brandPrimary}/>
            <path d="M44 40 L46 45 L40 40" fill={brandPrimary}/>
            <line x1="28" y1="30" x2="44" y2="30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
            <line x1="28" y1="34" x2="38" y2="34" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
          </g>
          
          {/* Checkmark Overlay (Approval) */}
          <g className="chat-bubble-check">
             <circle cx="28" cy="28" r="14" fill="#ffffff" stroke={brandPrimary} strokeWidth="1.5"/>
             <path d="M22 28 L26 32 L34 24" stroke={brandPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      ),
    },
    {
      id: 2,
      number: "03",
      name: "On-Demand Context",
      tagline: "Complex signal. Context generated.",
      detail: "A dynamic interface assembles around the specific investigation, then dissolves when the decision is made.",
      humanLabel: "Human leads",
      visual: (
        <svg width="90" height="90" viewBox="0 0 56 56" fill="none">
          <style>
            {`
              @keyframes puzzleMove1 {
                0%, 15% { transform: translate(0, 0); }
                25%, 85% { transform: translate(12px, 12px); }
                95%, 100% { transform: translate(0, 0); }
              }
              @keyframes puzzleMove2 {
                0%, 30% { transform: translate(0, 0); }
                40%, 85% { transform: translate(-12px, 12px); }
                95%, 100% { transform: translate(0, 0); }
              }
              @keyframes puzzleMove3 {
                0%, 45% { transform: translate(0, 0); }
                55%, 85% { transform: translate(12px, -12px); }
                95%, 100% { transform: translate(0, 0); }
              }
              @keyframes puzzleMove4 {
                0%, 60% { transform: translate(0, 0); }
                70%, 85% { transform: translate(-12px, -12px); }
                95%, 100% { transform: translate(0, 0); }
              }
              @keyframes gridFade {
                0%, 20% { opacity: 0; }
                40%, 85% { opacity: 1; }
                95%, 100% { opacity: 0; }
              }
              .puzzle-1 { animation: puzzleMove1 6s ease-in-out infinite; }
              .puzzle-2 { animation: puzzleMove2 6s ease-in-out infinite; }
              .puzzle-3 { animation: puzzleMove3 6s ease-in-out infinite; }
              .puzzle-4 { animation: puzzleMove4 6s ease-in-out infinite; }
              .puzzle-grid { animation: gridFade 6s ease-in-out infinite; }
            `}
          </style>

          {/* Central Target Grid */}
          <rect x="13" y="13" width="30" height="30" rx="3" fill="rgba(13, 65, 225, 0.03)" stroke={brandLight} strokeWidth="1" strokeDasharray="2 3" className="puzzle-grid"/>
          <line x1="28" y1="13" x2="28" y2="43" stroke={brandLight} strokeWidth="1" strokeDasharray="2 3" className="puzzle-grid"/>
          <line x1="13" y1="28" x2="43" y2="28" stroke={brandLight} strokeWidth="1" strokeDasharray="2 3" className="puzzle-grid"/>

          <g className="puzzle-1">
            <rect x="4" y="4" width="11" height="11" rx="2" fill={brandPrimary} opacity="0.9"/>
            <circle cx="9.5" cy="9.5" r="1.5" fill="#fff"/>
          </g>

          <g className="puzzle-2">
            <rect x="41" y="4" width="11" height="11" rx="2" stroke={brandPrimary} strokeWidth="1.5" fill="#ffffff"/>
            <path d="M44 9.5 H48" stroke={brandPrimary} strokeWidth="1.5" strokeLinecap="round"/>
          </g>

          <g className="puzzle-3">
            <rect x="4" y="41" width="11" height="11" rx="2" stroke={brandNeutral} strokeWidth="1.5" fill="#ffffff"/>
            <path d="M9.5 44 L9.5 48" stroke={brandNeutral} strokeWidth="1.5" strokeLinecap="round"/>
          </g>

          <g className="puzzle-4">
            <rect x="41" y="41" width="11" height="11" rx="2" fill={brandLight} opacity="0.6"/>
            <circle cx="46.5" cy="46.5" r="1.5" fill={brandNeutral}/>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      fontFamily: "var(--font-secondary)",
      background: "#ffffff",
      padding: "32px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      margin: "32px 0",
      borderRadius: "16px",
      border: "1px solid #E2E8F0",
      boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          fontSize: 13,
          letterSpacing: "0.15em",
          color: brandPrimary,
          textTransform: "uppercase",
          marginBottom: 8,
          fontFamily: "var(--font-primary)",
          fontWeight: 800
        }}>
          The Three Modes of Headless SecOps
        </div>
        <div style={{
          fontSize: 12,
          color: brandNeutral,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600
        }}>
          Agentic OS for Actionable SecOps
        </div>
      </div>

      {/* Cards - Vertical Layout (Static) */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        marginBottom: 32,
      }}>
        {modes.map((mode) => (
          <div
            key={mode.id}
            style={{
              padding: "20px 24px",
              background: "#ffffff",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 24,
            }}
          >
            {/* Visual Column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, minWidth: 80 }}>
              <div style={{ height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {mode.visual}
              </div>
            </div>

            {/* Content Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div style={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#1E293B",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-primary)"
                }}>
                  {mode.name}
                </div>
                <div style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: brandPrimary,
                  background: "rgba(13, 65, 225, 0.05)",
                  border: `1px solid rgba(13, 65, 225, 0.1)`,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontWeight: 700
                }}>
                  {mode.humanLabel}
                </div>
              </div>

              <div style={{
                fontSize: 16,
                color: "#1E293B",
                fontWeight: 600,
              }}>
                {mode.tagline}
              </div>

              <div style={{
                fontSize: 16,
                color: brandNeutral,
                lineHeight: 1.5,
              }}>
                {mode.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Human involvement spectrum */}
      <div style={{ width: "100%", marginBottom: 24 }}>
        <div style={{ position: "relative", marginBottom: 8, margin: "0 4px" }}>
          <div style={{
            height: 3,
            background: `linear-gradient(to right, ${brandLight} 0%, ${brandPrimary} 100%)`,
            borderRadius: 2,
          }}/>
          {/* Markers */}
          {[0, 50, 100].map((pos, i) => (
            <div key={i} style={{
              position: "absolute",
              top: -3.5,
              left: `${pos}%`,
              transform: "translateX(-50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: i === 0 ? brandLight : brandPrimary,
              border: "2px solid #fff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }}/>
          ))}
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: brandNeutral,
          fontWeight: 700
        }}>
          <span>Autonomous</span>
          <span>Human Approved</span>
          <span>Human Led</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: 16,
        borderTop: "1px solid #E2E8F0",
      }}>
        <div style={{ fontSize: 11, color: brandNeutral, letterSpacing: "0.14em", fontWeight: 700 }}>
          NO ALERTS &nbsp;·&nbsp; NO DASHBOARDS &nbsp;·&nbsp; NO CONSOLE-HOPPING
        </div>
      </div>
    </div>
  );
}
