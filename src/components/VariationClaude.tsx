"use client";

import React, { useState, useEffect, useRef } from 'react';

// ======================================================================
// VARIATION CLAUDE — (4-step Trench AI investigation)
// Mimicking Claude's clean, minimal interface
// ======================================================================

// Visual tokens - Claude style
const CT = {
  bg: '#F9F6F0', // Soft cream background
  panel: '#FFFFFF',
  text: '#1A1A1A',
  textDim: '#5A5A5A',
  textMute: '#8C8C8C',
  line: '#E8E4DC',
  accent: '#D96B43', // Warm coral/orange
  ok: '#2E7D32',
  alert: '#C62828',
  cyan: '#00838F',
  
  // Claude specific
  claudeBg: '#FAF8F5',
  claudePanel: '#FFFFFF',
  claudeLine: '#E3E0D8',
  claudeText: '#242424',
  claudeDim: '#66635C',
};

interface AvatarProps {
  name: string;
  color: string;
  size?: number;
  bot?: boolean;
}

const AvatarC: React.FC<AvatarProps> = ({ name, color, size = 32, bot }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, color: '#fff',
    display: 'grid', placeItems: 'center',
    fontWeight: 500, fontSize: size * 0.45,
    flexShrink: 0, position: 'relative',
  }}>
    {bot ? (
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="7" width="16" height="13" rx="3" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="9" cy="13" r="1.5" fill="#fff" />
        <circle cx="15" cy="13" r="1.5" fill="#fff" />
        <path d="M12 4 V7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="3.5" r="1" fill="#fff" />
      </svg>
    ) : name.split(' ').map(n => n[0]).slice(0, 2).join('')}
  </div>
);

const reveal = (phase: number, appear: number, settle = appear + 0.06) =>
  Math.max(0, Math.min(1, (phase - appear) / (settle - appear)));

interface StepBadgeProps {
  n: number;
  active: boolean;
  done: boolean;
}

const StepBadgeC: React.FC<StepBadgeProps> = ({ n, active, done }) => (
  <div style={{
    width: 20, height: 20, borderRadius: '50%',
    background: done ? CT.ok : active ? CT.accent : 'transparent',
    border: `1.5px solid ${done ? CT.ok : active ? CT.accent : CT.line}`,
    color: done || active ? '#fff' : CT.textDim,
    display: 'grid', placeItems: 'center',
    fontSize: 10, fontWeight: 600, flexShrink: 0,
    transition: 'all .25s',
  }}>
    {done ? (
      <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6 L5 9 L10 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ) : n}
  </div>
);

interface ClaudeMsgProps {
  avatar: React.ReactNode;
  name: string;
  time: string;
  children: React.ReactNode;
  opacity?: number;
  translate?: number;
}

const ClaudeMsg: React.FC<ClaudeMsgProps> = ({ avatar, name, time, children, opacity = 1, translate = 0 }) => (
  <div style={{
    display: 'flex', gap: 16, padding: '16px 0',
    opacity, transform: `translateY(${translate}px)`,
    transition: 'opacity .35s ease, transform .35s ease',
    borderBottom: `1px solid ${CT.claudeLine}`,
  }}>
    {avatar}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: CT.claudeText }}>{name}</span>
        <span style={{ fontSize: 11, color: CT.claudeDim }}>{time}</span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.6, color: CT.claudeText }}>{children}</div>
    </div>
  </div>
);

const MentionC: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{
    color: CT.accent, fontWeight: 500,
  }}>@{children}</span>
);

const CodeC: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{
    background: '#F0EFEA',
    padding: '2px 5px', borderRadius: 4,
    fontSize: 13, color: '#333',
  }}>{children}</span>
);

const TypingC: React.FC<{ name: string }> = ({ name }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 12, color: CT.claudeDim, padding: '12px 0',
  }}>
    <div style={{ display: 'flex', gap: 3 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 4, height: 4, borderRadius: '50%', background: CT.claudeDim,
          animation: `tdot 1.2s ${i * 0.15}s infinite ease-in-out`,
        }} />
      ))}
    </div>
    <span>Claude is thinking…</span>
  </div>
);

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
function StatCards({ stats }: { stats: any[] }) {
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
function GeoList({ locations }: { locations: any[] }) {
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
  const getColor = (v: number) => {
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
function InsightBox({ text }: { text: string }) {
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

const VariationClaude: React.FC = () => {
  const [timeMs, setTimeMs] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let frame: number;
    let start = performance.now();
    const tick = () => {
      setTimeMs(performance.now() - start);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const cycleMs = 24000;
  const phase = (timeMs % cycleMs) / cycleMs;

  const r1 = reveal(phase, 0.02, 0.06);
  const r2 = reveal(phase, 0.08, 0.14);
  const r12_fade = 1 - reveal(phase, 0.20, 0.22);
  const r1_visible = r1 * r12_fade;
  const r2_visible = r2 * r12_fade;

  const r3 = reveal(phase, 0.22, 0.26);
  const r4 = reveal(phase, 0.30, 0.36);
  const r34_fade = 1 - reveal(phase, 0.43, 0.45);
  const r3_visible = r3 * r34_fade;
  const r4_visible = r4 * r34_fade;

  const r5 = reveal(phase, 0.45, 0.49);
  const r6 = reveal(phase, 0.52, 0.58);
  const r56_fade = 1 - reveal(phase, 0.66, 0.68);
  const r5_visible = r5 * r56_fade;
  const r6_visible = r6 * r56_fade;

  const r7 = reveal(phase, 0.68, 0.72);
  const r8typing = reveal(phase, 0.76, 0.80);
  const r8 = reveal(phase, 0.82, 0.88);
  const r78_fade = 1 - reveal(phase, 0.94, 0.96);
  const r7_visible = r7 * r78_fade;
  const r8typing_visible = r8typing * r78_fade;
  const r8_visible = r8 * r78_fade;

  let activeStep = 1;
  if (phase > 0.22) activeStep = 2;
  if (phase > 0.45) activeStep = 3;
  if (phase > 0.76) activeStep = 4;
  const doneStep = phase > 0.94 ? 4 : phase > 0.82 ? 3 : phase > 0.68 ? 2 : phase > 0.45 ? 1 : 0;

  useEffect(() => {
    if (!scrollRef.current || !isClient) return;
    scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStep, isClient, phase]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '400px',
      background: 'transparent',
      overflow: 'hidden',
      border: 'none',
      padding: isClient && window.innerWidth > 768 ? '24px 48px' : '16px 32px',
      boxSizing: 'border-box',
    }}>
      {/* bg grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}>
        <defs>
          <pattern id="gridC" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridC)" />
      </svg>

      <div style={{
        display: 'flex',
        flexDirection: isClient && window.innerWidth > 768 ? 'row' : 'column',
        gap: '30px',
        height: '100%',
      }}>
        {/* LEFT — copy + step list */}
        <div style={{
          flex: isClient && window.innerWidth > 768 ? '0 0 35%' : '1',
          minWidth: isClient && window.innerWidth > 768 ? 260 : 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          <h2 style={{
            margin: 0, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, lineHeight: 1.2,
            letterSpacing: '-0.01em', color: CT.text, textWrap: 'balance',
            textTransform: 'uppercase',
          }}>
            ASK TRENCH INSIDE <span style={{ color: CT.accent }}>CLAUDE.</span>
          </h2>

          <p style={{
            margin: 0, fontSize: '14px', lineHeight: 1.6, color: CT.textDim, maxWidth: '100%',
          }}>
            Your security data, answered in seconds. Ask questions about your security stack in plain English and get anomaly charts, threat trends and actionable insights, without leaving your AI workspace.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
            {[
              { n: 1, t: 'Query', d: 'Ask Trench about any security signal in natural language.' },
              { n: 2, t: 'Analyse', d: 'Trench surfaces charts, anomalies and risk patterns inline.' },
              { n: 3, t: 'Investigate', d: 'Go deeper with follow-up queries across your entire stack.' },
              { n: 4, t: 'Act', d: 'Get a clear recommendation and take action, right inside Claude.' },
            ].map(s => {
              const isActive = activeStep === s.n;
              const isDone = doneStep >= s.n;
              return (
                <div key={s.n} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  opacity: isActive || isDone ? 1 : 0.4,
                  transition: 'opacity .3s',
                }}>
                  <StepBadgeC n={s.n} active={isActive && !isDone} done={isDone} />
                  <div>
                    <div style={{
                      fontSize: 14, fontWeight: 600, color: CT.text,
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      {s.t}
                      {isActive && !isDone && <span style={{
                        width: 5, height: 5, borderRadius: '50%', background: CT.accent,
                        animation: 'tpulse 1.2s ease-in-out infinite',
                      }} />}
                    </div>
                    <div style={{ fontSize: 12, color: CT.textDim, marginTop: 1 }}>{s.d}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Claude window */}
        <div style={{
          flex: isClient && window.innerWidth > 768 ? '0 0 65%' : '1',
          minWidth: isClient && window.innerWidth > 768 ? 400 : 0,
          background: CT.claudeBg,
          borderRadius: 12,
          border: `1px solid ${CT.claudeLine}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          display: 'flex',
          flexDirection: 'column',
          height: isClient && window.innerWidth > 768 ? '450px' : '400px',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '12px 20px',
            borderBottom: `1px solid ${CT.claudeLine}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: CT.claudeText }}>Trench Assistant</div>
            <div style={{ fontSize: 12, color: CT.claudeDim }}>Model: Claude-3-Sonnet</div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* STEP 1 — Detect (Query) */}
            {r1_visible > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="SC" color="#3D5A80" />}
                name="Security Champion"
                time="11:30 AM"
                opacity={r1_visible}
                translate={(1 - r1_visible) * 10}
              >
                <div>Show me any unusual login activity in the last 24 hours.</div>
              </ClaudeMsg>
            )}

            {r2_visible > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="Claude" color="#4A3E3D" bot />}
                name="Claude"
                time="11:30 AM"
                opacity={r2_visible}
                translate={(1 - r2_visible) * 10}
              >
                <div>I found a significant anomaly in your login data. Between <strong>22:00–00:00 UTC</strong>, failed authentication attempts spiked to <strong>3.8× above baseline</strong>, targeting 4 privileged accounts. Here's the breakdown:</div>
                <LoginChart />
                <StatCards stats={[
                  { label: "Failed Logins", value: "211", delta: "+380% above baseline", bad: true },
                  { label: "Accounts Targeted", value: "4", delta: "All privileged", bad: true },
                  { label: "Unique Source IPs", value: "17", delta: "12 previously unseen", bad: true },
                  { label: "Successful Logins", value: "0", delta: "All attempts blocked", bad: false },
                ]} />
              </ClaudeMsg>
            )}

            {/* STEP 2 — Verify (Analyze) */}
            {r3_visible > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="SC" color="#3D5A80" />}
                name="Security Champion"
                time="11:31 AM"
                opacity={r3_visible}
                translate={(1 - r3_visible) * 10}
              >
                <div>Where are these login attempts coming from geographically?</div>
              </ClaudeMsg>
            )}

            {r4_visible > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="Claude" color="#4A3E3D" bot />}
                name="Claude"
                time="11:31 AM"
                opacity={r4_visible}
                translate={(1 - r4_visible) * 10}
              >
                <div>The attempts originated from <strong>3 geographic clusters</strong>. Two are flagged critical — impossible travel detected for <strong>maya.chen</strong> (Berlin → Lagos in under 4 minutes).</div>
                <GeoList locations={[
                  { city: "Lagos", country: "Nigeria", detail: "17 IPs · impossible travel from Berlin (4 min)", risk: "high" },
                  { city: "Minsk", country: "Belarus", detail: "3 IPs · matches known credential stuffing infrastructure", risk: "high" },
                  { city: "Berlin", country: "Germany", detail: "Verified legitimate · maya.chen registered location", risk: "low" },
                ]} />
              </ClaudeMsg>
            )}

            {/* STEP 3 — Approve (Correlate) */}
            {r5_visible > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="SC" color="#3D5A80" />}
                name="Security Champion"
                time="11:32 AM"
                opacity={r5_visible}
                translate={(1 - r5_visible) * 10}
              >
                <div>Show me the full risk pattern for this week.</div>
              </ClaudeMsg>
            )}

            {r6_visible > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="Claude" color="#4A3E3D" bot />}
                name="Claude"
                time="11:33 AM"
                opacity={r6_visible}
                translate={(1 - r6_visible) * 10}
              >
                <div>Here's the 7-day risk heatmap. <strong>Wednesday night and Thursday early morning</strong> show the highest concentration — consistent with a coordinated off-hours credential stuffing attack.</div>
                <HeatMap />
                <InsightBox text="Force MFA re-enrollment for all 4 targeted accounts and block the 17 source IPs immediately. Pattern confidence: 94%." />
              </ClaudeMsg>
            )}

            {/* STEP 4 — Resolve */}
            {r7_visible > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="SC" color="#3D5A80" />}
                name="Security Champion"
                time="11:33 AM"
                opacity={r7_visible}
                translate={(1 - r7_visible) * 10}
              >
                <div>Approve isolation and MFA re-enrollment.</div>
              </ClaudeMsg>
            )}

            {r8typing_visible > 0 && r8_visible === 0 && (
              <div style={{ opacity: r8typing_visible, transition: 'opacity .3s' }}>
                <TypingC name="Claude" />
              </div>
            )}

            {r8_visible > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="Claude" color="#4A3E3D" bot />}
                name="Claude"
                time="11:34 AM"
                opacity={r8_visible}
                translate={(1 - r8_visible) * 10}
              >
                <div>Remediation complete. I have blocked the 17 source IPs and forced MFA re-enrollment for the targeted accounts.</div>
                <div style={{ marginTop: 6, fontSize: 12, color: CT.ok, fontWeight: 600 }}>✓ 17 Malicious IPs Blocked</div>
                <div style={{ fontSize: 12, color: CT.ok, fontWeight: 600 }}>✓ MFA Re-enrollment Forced</div>
              </ClaudeMsg>
            )}
          </div>

          {/* Composer */}
          <div style={{
            padding: '16px 20px',
            borderTop: `1px solid ${CT.claudeLine}`,
            background: '#FFFFFF',
          }}>
            <div style={{
              padding: '10px 14px',
              border: `1px solid ${CT.claudeLine}`,
              borderRadius: 8,
              fontSize: 13,
              color: CT.claudeDim,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span>Message Trench Assistant...</span>
              <span style={{ opacity: 0.5 }}>⌘ K</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tdot {
          0%, 80%, 100% { opacity: .3; transform: scale(0.8) }
          40% { opacity: 1; transform: scale(1.1) }
        }
        @keyframes tpulse {
          0%, 100% { opacity: 1; transform: scale(1) }
          50% { opacity: .4; transform: scale(.7) }
        }
      `}</style>
    </div>
  );
};

export default VariationClaude;
