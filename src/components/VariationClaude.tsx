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
    fontFamily: 'system-ui, sans-serif',
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
    fontFamily: 'ui-monospace, monospace',
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

  const cycleMs = 12000;
  const phase = (timeMs % cycleMs) / cycleMs;

  const r1 = reveal(phase, 0.02, 0.10);
  const r2 = reveal(phase, 0.20, 0.28);
  const r2reply = reveal(phase, 0.35, 0.42);
  const r3 = reveal(phase, 0.50, 0.58);
  const r4typing = reveal(phase, 0.70, 0.74);
  const r4 = reveal(phase, 0.76, 0.84);

  let activeStep = 1;
  if (phase > 0.20) activeStep = 2;
  if (phase > 0.50) activeStep = 3;
  if (phase > 0.74) activeStep = 4;
  const doneStep = phase > 0.94 ? 4 : phase > 0.74 ? 3 : phase > 0.42 ? 2 : phase > 0.16 ? 1 : 0;

  useEffect(() => {
    if (!scrollRef.current || !isClient) return;
    const target = phase < 0.25 ? 0
      : phase < 0.50 ? 100
        : phase < 0.75 ? 200
          : 300;
    scrollRef.current.scrollTo({ top: target, behavior: 'smooth' });
  }, [activeStep, isClient]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '400px',
      background: 'transparent',
      overflow: 'hidden',
      border: 'none',
      fontFamily: 'system-ui, sans-serif',
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
            fontFamily: 'inherit',
          }}>
            Automated defense,<br />
            with <span style={{ color: CT.accent }}>Claude's precision.</span>
          </h2>

          <p style={{
            margin: 0, fontSize: '14px', lineHeight: 1.6, color: CT.textDim, maxWidth: '100%',
          }}>
            Trench integrates with Claude to provide a conversational yet rigorous approach to incident response.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
            {[
              { n: 1, t: 'Detect', d: 'Identify anomalies with high precision.' },
              { n: 2, t: 'Verify', d: 'Converse with users to confirm intent.' },
              { n: 3, t: 'Approve', d: 'Present clear options for human sign-off.' },
              { n: 4, t: 'Resolve', d: 'Execute remediation and close the loop.' },
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
          height: '450px',
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
            overflow: 'hidden',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* STEP 1 — Detect */}
            <ClaudeMsg
              avatar={<AvatarC name="Claude" color="#4A3E3D" bot />}
              name="Claude"
              time="11:30 AM"
              opacity={r1}
              translate={(1 - r1) * 10}
            >
              <div>I've detected a potential anomaly. <CodeC>User: Alex</CodeC> has accessed a high volume of sensitive files from an unusual IP address.</div>
              <div style={{ marginTop: 8, padding: '10px', background: '#F0EFEA', borderRadius: 6, fontSize: 13 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Incident Details:</div>
                <div>• Type: Potential Data Exfiltration</div>
                <div>• Source: 192.168.1.105 (VPN)</div>
                <div>• Volume: 45 files in 2 minutes</div>
              </div>
            </ClaudeMsg>

            {/* STEP 2 — Verify */}
            {r2 > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="Claude" color="#4A3E3D" bot />}
                name="Claude"
                time="11:31 AM"
                opacity={r2}
                translate={(1 - r2) * 10}
              >
                <div>I am reaching out to <MentionC>Alex</MentionC> to verify this activity.</div>
              </ClaudeMsg>
            )}

            {/* User Reply */}
            {r2reply > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="Alex" color="#7B6D6B" />}
                name="Alex"
                time="11:32 AM"
                opacity={r2reply}
                translate={(1 - r2reply) * 10}
              >
                <div>That wasn't me. I'm currently on PTO and not accessing any files.</div>
              </ClaudeMsg>
            )}

            {/* STEP 3 — Approve */}
            {r3 > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="Claude" color="#4A3E3D" bot />}
                name="Claude"
                time="11:33 AM"
                opacity={r3}
                translate={(1 - r3) * 10}
              >
                <div>Thank you for confirming, Alex. Based on this, I recommend immediate containment.</div>
                <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                  <button style={{
                    padding: '6px 12px', borderRadius: 4, border: 'none',
                    background: CT.accent, color: '#fff', fontSize: 12, fontWeight: 600,
                    cursor: 'pointer'
                  }}>Approve Isolation</button>
                  <button style={{
                    padding: '6px 12px', borderRadius: 4, border: `1px solid ${CT.claudeLine}`,
                    background: '#fff', color: CT.text, fontSize: 12, fontWeight: 600,
                    cursor: 'pointer'
                  }}>Investigate Further</button>
                </div>
              </ClaudeMsg>
            )}

            {/* STEP 4 — Resolve */}
            {r4typing > 0 && r4 === 0 && (
              <TypingC name="Claude" />
            )}

            {r4 > 0 && (
              <ClaudeMsg
                avatar={<AvatarC name="Claude" color="#4A3E3D" bot />}
                name="Claude"
                time="11:34 AM"
                opacity={r4}
                translate={(1 - r4) * 10}
              >
                <div>Remediation complete. I have isolated the workstation and revoked active sessions for <CodeC>Alex</CodeC>. The incident has been logged.</div>
                <div style={{ marginTop: 6, fontSize: 12, color: CT.ok, fontWeight: 600 }}>✓ Workstation Isolated</div>
                <div style={{ fontSize: 12, color: CT.ok, fontWeight: 600 }}>✓ Sessions Revoked</div>
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
