import { useState, useEffect, useRef } from "react";

// ── Login anomaly bar chart ────────────────────────────────────────────────────
function LoginChart() {
  const data = [12,15,11,14,13,16,12,14,15,11,13,12,14,16,13,12,14,15,11,13,62,78,71,15];
  const max = Math.max(...data);
  return (
    <div style={{ background: "#F9F9F8", borderRadius: 8, padding: "14px 16px", marginTop: 12, border: "1px solid #E8E8E5" }}>
      <div style={{ fontSize: 11, color: "#8F8F8A", marginBottom: 10, fontWeight: 500 }}>Failed login attempts · last 24 hours</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 60 }}>
        {data.map((v, i) => {
          const h = (v / max) * 56;
          const isAnomaly = v > 50;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              {isAnomaly && <div style={{ fontSize: 7, color: "#D4351C", lineHeight: 1 }}>▲</div>}
              <div style={{
                width: "100%", height: h,
                borderRadius: "2px 2px 0 0",
                background: isAnomaly ? "#D4351C" : "#C7B9A6",
                opacity: isAnomaly ? 1 : 0.6,
              }}/>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 10, color: "#B0AFA8" }}>00:00</span>
        <span style={{ fontSize: 10, color: "#D4351C", fontWeight: 600 }}>▲ Spike 22:00–00:00</span>
        <span style={{ fontSize: 10, color: "#B0AFA8" }}>23:00</span>
      </div>
    </div>
  );
}

// ── Stat cards ────────────────────────────────────────────────────────────────
function StatCards({ stats }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: s.bad ? "#FEF2F0" : "#F0FAF4",
          border: `1px solid ${s.bad ? "#F5C6BE" : "#B3E0C4"}`,
          borderRadius: 8, padding: "10px 12px",
        }}>
          <div style={{ fontSize: 10, color: "#8F8F8A", marginBottom: 4, fontWeight: 500 }}>{s.label}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1A1A19", lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 11, color: s.bad ? "#D4351C" : "#1A7F3C", marginTop: 3, fontWeight: 500 }}>{s.delta}</div>
        </div>
      ))}
    </div>
  );
}

// ── Geo list ──────────────────────────────────────────────────────────────────
function GeoList({ locations }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
      {locations.map((loc, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", borderRadius: 8,
          background: "#F9F9F8", border: "1px solid #E8E8E5",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
            background: loc.risk === "high" ? "#D4351C" : "#1A7F3C",
          }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A19" }}>{loc.city}, {loc.country}</div>
            <div style={{ fontSize: 11, color: "#8F8F8A" }}>{loc.detail}</div>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
            color: loc.risk === "high" ? "#D4351C" : "#1A7F3C",
            background: loc.risk === "high" ? "#FEF2F0" : "#F0FAF4",
            padding: "2px 8px", borderRadius: 100,
            border: `1px solid ${loc.risk === "high" ? "#F5C6BE" : "#B3E0C4"}`,
          }}>{loc.risk}</span>
        </div>
      ))}
    </div>
  );
}

// ── Heatmap ───────────────────────────────────────────────────────────────────
function HeatMap() {
  const hours = Array.from({length: 24}, (_, i) => i);
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const data = days.map((d, di) => hours.map((h) => {
    if (di === 2 && h >= 22) return 0.95;
    if (di === 3 && h <= 2) return 0.88;
    if (di === 4 && h === 14) return 0.72;
    return Math.random() * 0.2;
  }));
  const getColor = (v) => {
    if (v > 0.8) return "#D4351C";
    if (v > 0.6) return "#E87722";
    if (v > 0.3) return "#E8C44A";
    return "#E8E8E5";
  };
  return (
    <div style={{ marginTop: 12, background: "#F9F9F8", borderRadius: 8, padding: "14px 16px", border: "1px solid #E8E8E5" }}>
      <div style={{ fontSize: 11, color: "#8F8F8A", marginBottom: 10, fontWeight: 500 }}>Risk intensity heatmap · last 7 days</div>
      {days.map((day, di) => (
        <div key={day} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
          <div style={{ width: 24, fontSize: 9, color: "#8F8F8A", textAlign: "right", paddingRight: 4 }}>{day}</div>
          {hours.map(h => (
            <div key={h} style={{
              width: 9, height: 9, borderRadius: 2,
              background: getColor(data[di][h]),
            }}/>
          ))}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
        <span style={{ fontSize: 9, color: "#B0AFA8" }}>Low</span>
        {["#E8E8E5","#E8C44A","#E87722","#D4351C"].map(c => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: 2, background: c }}/>
        ))}
        <span style={{ fontSize: 9, color: "#B0AFA8" }}>Critical</span>
      </div>
    </div>
  );
}

// ── Insight box ───────────────────────────────────────────────────────────────
function InsightBox({ text }) {
  return (
    <div style={{
      marginTop: 12, padding: "12px 14px",
      background: "#FEFAF0", borderRadius: 8,
      border: "1px solid #E8D87A",
      display: "flex", gap: 10, alignItems: "flex-start",
    }}>
      <span style={{ fontSize: 14, flexShrink: 0 }}>⚡</span>
      <div style={{ fontSize: 13, color: "#1A1A19", lineHeight: 1.6 }}>
        <strong style={{ color: "#7A6000" }}>Trench recommends: </strong>{text}
      </div>
    </div>
  );
}

// ── Conversation ──────────────────────────────────────────────────────────────
const CONVERSATION = [
  {
    role: "user",
    text: "Show me any unusual login activity in the last 24 hours.",
    delay: 0,
  },
  {
    role: "trench",
    text: "I found a significant anomaly in your login data. Between **22:00–00:00 UTC**, failed authentication attempts spiked to **3.8× above baseline**, targeting 4 privileged accounts. Here's the breakdown:",
    visual: "login",
    stats: [
      { label: "Failed Logins", value: "211", delta: "+380% above baseline", bad: true },
      { label: "Accounts Targeted", value: "4", delta: "All privileged", bad: true },
      { label: "Unique Source IPs", value: "17", delta: "12 previously unseen", bad: true },
      { label: "Successful Logins", value: "0", delta: "All attempts blocked", bad: false },
    ],
    delay: 900,
  },
  {
    role: "user",
    text: "Where are these login attempts coming from geographically?",
    delay: 2200,
  },
  {
    role: "trench",
    text: "The attempts originated from **3 geographic clusters**. Two are flagged critical — impossible travel detected for **maya.chen** (Berlin → Lagos in under 4 minutes).",
    visual: "geo",
    locations: [
      { city: "Lagos", country: "Nigeria", detail: "17 IPs · impossible travel from Berlin (4 min)", risk: "high" },
      { city: "Minsk", country: "Belarus", detail: "3 IPs · matches known credential stuffing infrastructure", risk: "high" },
      { city: "Berlin", country: "Germany", detail: "Verified legitimate · maya.chen registered location", risk: "low" },
    ],
    delay: 3600,
  },
  {
    role: "user",
    text: "Show me the full risk pattern for this week.",
    delay: 5200,
  },
  {
    role: "trench",
    text: "Here's the 7-day risk heatmap. **Wednesday night and Thursday early morning** show the highest concentration — consistent with a coordinated off-hours credential stuffing attack.",
    visual: "heatmap",
    insight: "Force MFA re-enrollment for all 4 targeted accounts and block the 17 source IPs immediately. Pattern confidence: 94%.",
    delay: 6800,
  },
];

// ── Claude avatar SVG ─────────────────────────────────────────────────────────
function ClaudeAvatar({ size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, #CC785C 0%, #B85C3A 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 20 20" fill="none" style={{ width: size * 0.6, height: size * 0.6 }}>
        <path d="M10 3L12.5 9H17L13 12.5L14.5 18L10 14.5L5.5 18L7 12.5L3 9H7.5L10 3Z"
          fill="white" fillOpacity="0.9"/>
      </svg>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AskTrenchClaude() {
  const [visible, setVisible] = useState(-1);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeProject, setActiveProject] = useState("ask-trench");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!started || visible < 0) return;
    if (visible >= CONVERSATION.length - 1) return;
    const curr = CONVERSATION[visible];
    const next = CONVERSATION[visible + 1];
    const gap = next.delay - curr.delay;
    const isClaudeNext = next.role === "trench";
    const t1 = setTimeout(() => {
      if (isClaudeNext) setTyping(true);
      const t2 = setTimeout(() => {
        setTyping(false);
        setVisible(v => v + 1);
      }, isClaudeNext ? 1400 : 300);
      return () => clearTimeout(t2);
    }, Math.max(gap, 600));
    return () => clearTimeout(t1);
  }, [visible, started]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visible, typing]);

  const msgs = visible >= 0 ? CONVERSATION.slice(0, visible + 1) : [];

  const projects = [
    { id: "ask-trench", label: "Ask Trench", icon: "🛡️" },
    { id: "infra", label: "Infrastructure Audit", icon: "🔍" },
    { id: "compliance", label: "Compliance Review", icon: "📋" },
  ];

  const recents = [
    "Unusual API call patterns",
    "S3 bucket permissions audit",
    "Failed MFA attempts — Q2",
  ];

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      minHeight: 600,
      fontFamily: "-apple-system, 'Söhne', ui-sans-serif, system-ui, sans-serif",
      background: "#F0EDE6",
      overflow: "hidden",
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 240, flexShrink: 0,
        background: "#1A1915",
        display: "flex", flexDirection: "column",
        padding: "0",
        overflow: "hidden",
      }}>
        {/* Top */}
        <div style={{ padding: "16px 16px 8px" }}>
          {/* Claude logo area */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 16, padding: "4px 4px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ClaudeAvatar size={26}/>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#E8E4DC" }}>Claude</span>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: "#2D2C28",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14}}>
                <path d="M3 8h10M8 3v10" stroke="#8F8F8A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* New chat button */}
          <button style={{
            width: "100%", padding: "8px 12px",
            background: "#2D2C28", border: "none", borderRadius: 8,
            color: "#C8C4BC", fontSize: 13, fontWeight: 500,
            cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: 16,
          }}>
            <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14}}>
              <path d="M3 8h10M8 3v10" stroke="#8F8F8A" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            New conversation
          </button>
        </div>

        {/* Projects */}
        <div style={{ padding: "0 16px", marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#5A5A54", letterSpacing: "0.5px", marginBottom: 6, textTransform: "uppercase" }}>
            Projects
          </div>
          {projects.map(p => (
            <div key={p.id} onClick={() => setActiveProject(p.id)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 10px", borderRadius: 7, marginBottom: 2,
              background: activeProject === p.id ? "#2D2C28" : "transparent",
              cursor: "pointer",
              transition: "background 0.1s",
            }}>
              <span style={{ fontSize: 13 }}>{p.icon}</span>
              <span style={{
                fontSize: 13, color: activeProject === p.id ? "#E8E4DC" : "#8F8F8A",
                fontWeight: activeProject === p.id ? 500 : 400,
              }}>{p.label}</span>
              {p.id === "ask-trench" && (
                <span style={{
                  marginLeft: "auto", fontSize: 9, fontWeight: 700,
                  background: "#CC785C20", color: "#CC785C",
                  padding: "1px 6px", borderRadius: 100,
                  border: "1px solid #CC785C40",
                }}>LIVE</span>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#2D2C28", margin: "8px 16px" }}/>

        {/* Recent */}
        <div style={{ padding: "0 16px", flex: 1, overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#5A5A54", letterSpacing: "0.5px", marginBottom: 6, textTransform: "uppercase" }}>
            Recent
          </div>
          {recents.map((r, i) => (
            <div key={i} style={{
              padding: "6px 10px", borderRadius: 7, marginBottom: 2, cursor: "pointer",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#2D2C28"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ fontSize: 12, color: "#6B6B65" }}>{r}</span>
            </div>
          ))}
        </div>

        {/* Bottom user area */}
        <div style={{
          padding: "12px 16px",
          borderTop: "1px solid #2D2C28",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "#3D5A80",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>SC</div>
          <div>
            <div style={{ fontSize: 12, color: "#C8C4BC", fontWeight: 500 }}>Security Champion</div>
            <div style={{ fontSize: 10, color: "#5A5A54" }}>Pro plan</div>
          </div>
        </div>
      </div>

      {/* ── MAIN CHAT AREA ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        background: "#F0EDE6",
        overflow: "hidden",
      }}>

        {/* Top bar */}
        <div style={{
          padding: "12px 24px",
          display: "flex", alignItems: "center", gap: 12,
          borderBottom: "1px solid #E0DDD6",
          background: "#F0EDE6",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>🛡️</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1915" }}>Ask Trench</span>
            <div style={{ width: 1, height: 14, background: "#C8C4BC" }}/>
            <span style={{ fontSize: 12, color: "#8F8F8A" }}>claude-sonnet-4-5</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "#E8F5EE", border: "1px solid #B3E0C4",
              borderRadius: 100, padding: "3px 10px",
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1A7F3C" }}/>
              <span style={{ fontSize: 10, color: "#1A7F3C", fontWeight: 600, letterSpacing: "0.3px" }}>Trench connected</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "32px 0",
          display: "flex", flexDirection: "column",
        }}>

          {/* Empty state */}
          {!started && (
            <div style={{
              margin: "auto", textAlign: "center", maxWidth: 480, padding: "0 32px",
            }}>
              <ClaudeAvatar size={48}/>
              <h2 style={{
                fontSize: 22, fontWeight: 600, color: "#1A1915",
                margin: "16px 0 8px", fontFamily: "inherit",
              }}>Ask Trench</h2>
              <p style={{ fontSize: 14, color: "#6B6B65", lineHeight: 1.6, marginBottom: 28 }}>
                Query your security stack in natural language. Get threat trends, anomaly charts and actionable insights — without leaving Claude.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 28 }}>
                {[
                  "Show unusual login activity in the last 24 hours",
                  "Which endpoints have the highest risk score?",
                  "Show me the threat heatmap for this week",
                  "Are there any lateral movement patterns?",
                ].map((s, i) => (
                  <div key={i} onClick={() => { setStarted(true); setVisible(0); }} style={{
                    padding: "10px 14px", borderRadius: 10,
                    background: "#E8E4DC", border: "1px solid #D8D4CC",
                    fontSize: 12, color: "#3A3A35", cursor: "pointer",
                    textAlign: "left", lineHeight: 1.4,
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#DDD9D1"}
                  onMouseLeave={e => e.currentTarget.style.background = "#E8E4DC"}>
                    {s}
                  </div>
                ))}
              </div>
              <button onClick={() => { setStarted(true); setVisible(0); }} style={{
                background: "#CC785C", color: "#fff",
                border: "none", borderRadius: 8, padding: "10px 28px",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit",
              }}>
                Start investigation
              </button>
            </div>
          )}

          {/* Messages */}
          {started && msgs.map((msg, i) => (
            <div key={i} style={{
              maxWidth: 680, width: "100%", margin: "0 auto",
              padding: "0 24px 24px",
            }}>
              {msg.role === "user" ? (
                // User message — right aligned, pill background
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{
                    background: "#E8E4DC",
                    border: "1px solid #D8D4CC",
                    borderRadius: "18px 18px 4px 18px",
                    padding: "10px 16px",
                    maxWidth: "75%",
                    fontSize: 14, color: "#1A1915", lineHeight: 1.6,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ) : (
                // Claude/Trench message — left, no bubble
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <ClaudeAvatar size={28}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Trench badge */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      marginBottom: 8,
                      background: "#E8F5EE", border: "1px solid #B3E0C4",
                      borderRadius: 100, padding: "2px 8px",
                    }}>
                      <span style={{ fontSize: 10 }}>🛡️</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "#1A7F3C", letterSpacing: "0.3px" }}>Trench</span>
                    </div>

                    {/* Text */}
                    <div style={{ fontSize: 14, color: "#1A1915", lineHeight: 1.7, marginBottom: 4 }}>
                      {msg.text.split("**").map((part, pi) =>
                        pi % 2 === 1
                          ? <strong key={pi} style={{ color: "#1A1915", fontWeight: 600 }}>{part}</strong>
                          : part
                      )}
                    </div>

                    {/* Visuals */}
                    {msg.stats && <StatCards stats={msg.stats}/>}
                    {msg.visual === "login" && <LoginChart/>}
                    {msg.visual === "geo" && <GeoList locations={msg.locations}/>}
                    {msg.visual === "heatmap" && <HeatMap/>}
                    {msg.insight && <InsightBox text={msg.insight}/>}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing */}
          {typing && (
            <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: "0 24px 16px" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <ClaudeAvatar size={28}/>
                <div style={{
                  display: "flex", gap: 4, alignItems: "center",
                  padding: "10px 14px", background: "#E8E4DC",
                  borderRadius: "18px 18px 18px 4px", border: "1px solid #D8D4CC",
                }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: "50%", background: "#8F8F8A",
                      animation: `pulse 1.2s ease-in-out ${i*0.2}s infinite`,
                    }}/>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef}/>
        </div>

        {/* ── Input area ── */}
        <div style={{ padding: "0 24px 24px", maxWidth: 680+48, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
          <div style={{
            background: "#E8E4DC",
            border: "1px solid #C8C4BC",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex", flexDirection: "column", gap: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <input
              readOnly
              placeholder="Ask Trench about your security data..."
              style={{
                background: "transparent", border: "none", outline: "none",
                fontSize: 14, color: "#1A1915",
                fontFamily: "inherit", width: "100%",
                '::placeholder': { color: "#8F8F8A" },
              }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["📎","🌐","✦"].map((icon, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: 7,
                    background: "#D8D4CC",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, cursor: "pointer",
                    color: "#6B6B65",
                  }}>{icon}</div>
                ))}
              </div>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "#1A1915",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <svg viewBox="0 0 16 16" fill="none" style={{width:14,height:14}}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#F0EDE6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "#A0A09A" }}>
            Claude can make mistakes. Verify Trench findings in your security console.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(0.8); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #C8C4BC; border-radius: 4px; }
      `}</style>
    </div>
  );
}
