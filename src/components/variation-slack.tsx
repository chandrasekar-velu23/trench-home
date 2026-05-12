"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';

// ======================================================================
// VARIATION D — SLACK THREAD (4-step Trench AI investigation)
// 1. Trench AI: suspicious activity detected
// 2. Trench AI asks the impacted user to verify (user replies)
// 3. Trench AI asks the security engineer to approve remediation
// 4. Trench AI confirms remediation completed
// ======================================================================

// Type definitions
interface TokenColors {
  bg: string;
  bgDeep: string;
  panel: string;
  panelHi: string;
  line: string;
  lineHi: string;
  text: string;
  textDim: string;
  textMute: string;
  accent: string;
  ok: string;
  alert: string;
  cyan: string;
  slackBg: string;
  slackPanel: string;
  slackLine: string;
  slackText: string;
  slackDim: string;
  slackBlue: string;
  slackGreen: string;
}

interface AvatarProps {
  name: string;
  color: string;
  size?: number;
  bot?: boolean;
}

interface StepBadgeProps {
  n: number;
  active: boolean;
  done: boolean;
}

interface SlackMsgProps {
  avatar: React.ReactNode;
  name: string;
  badge?: { text: string; bg: string; fg: string };
  time: string;
  children: React.ReactNode;
  opacity?: number;
  translate?: number;
  indent?: number;
}

interface MentionProps {
  children: React.ReactNode;
  color?: string;
}

interface CodeProps {
  children: React.ReactNode;
}

interface ActionRowProps {
  children: React.ReactNode;
}

interface SBtnProps {
  primary?: boolean;
  danger?: boolean;
  children: React.ReactNode;
  pressed?: boolean;
}

interface AttachmentProps {
  accent?: string;
  children: React.ReactNode;
}

interface TypingProps {
  name: string;
}

interface Step {
  id: number;
  appear: number;
  settle: number;
}

// ======================================================================
// shared tokens (mirror the ones in creative.jsx — kept local so this file is standalone)
const TD: TokenColors = {
  bg:        '#ffffff',
  bgDeep:    '#f8f9fa',
  panel:     '#ffffff',
  panelHi:   '#f8f9fa',
  line:      'rgba(0,0,0,0.08)',
  lineHi:    'rgba(0,0,0,0.14)',
  text:      '#213547',
  textDim:   '#6b7280',
  textMute:  '#9ca3af',
  accent:    '#0D41E1',
  ok:        '#10b981',
  alert:     '#ef4444',
  cyan:      '#06b6d4',
  // Light Slack-leaning surface
  slackBg:   '#ffffff',
  slackPanel:'#f8f9fa',
  slackLine: '#e5e7eb',
  slackText: '#374151',
  slackDim:  '#6b7280',
  slackBlue: '#0D41E1',
  slackGreen:'#10b981',
};

// avatar — colored circle with initials
const Avatar: React.FC<AvatarProps> = ({ name, color, size = 36, bot }) => (
  <div style={{
    width: size, height: size, borderRadius: 8,
    background: color, color: '#fff',
    display: 'grid', placeItems: 'center',
    fontWeight: 700, fontSize: size * 0.42,
    flexShrink: 0, position: 'relative',
    fontFamily: 'Inter, system-ui, sans-serif',
    letterSpacing: '-0.02em',
  }}>
    {bot ? (
      <svg width={size*0.55} height={size*0.55} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="7" width="16" height="13" rx="3" fill="#0A0D10" stroke="#fff" strokeWidth="1.6"/>
        <circle cx="9" cy="13" r="1.5" fill="#fff"/>
        <circle cx="15" cy="13" r="1.5" fill="#fff"/>
        <path d="M12 4 V7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="12" cy="3.5" r="1.2" fill="#fff"/>
      </svg>
    ) : name.split(' ').map(n => n[0]).slice(0,2).join('')}
  </div>
);

// step state machine — drives the 8s loop with phase boundaries
// Each step has [appearAt, holdUntil] in normalized 0..1 phase
const STEPS: Step[] = [
  { id: 1, appear: 0.02, settle: 0.18 }, // detection
  { id: 2, appear: 0.22, settle: 0.42 }, // user verification (incl. user reply)
  { id: 3, appear: 0.50, settle: 0.70 }, // engineer approval
  { id: 4, appear: 0.78, settle: 0.94 }, // remediation confirmed
];

// reveal helper
const reveal = (phase: number, appear: number, settle = appear + 0.06): number =>
  Math.max(0, Math.min(1, (phase - appear) / (settle - appear)));

// step badge
const StepBadge: React.FC<StepBadgeProps> = ({ n, active, done }) => (
  <div style={{
    width: 22, height: 22, borderRadius: '50%',
    background: done ? TD.ok : active ? TD.accent : 'transparent',
    border: `1.5px solid ${done ? TD.ok : active ? TD.accent : TD.slackLine}`,
    color: done || active ? '#0A0D10' : TD.slackDim,
    display: 'grid', placeItems: 'center',
    fontSize: 11, fontWeight: 700, flexShrink: 0,
    transition: 'all .08s cubic-bezier(.3,.7,.4,1)',
  }}>
    {done ? (
      <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6 L5 9 L10 3" stroke="#0A0D10" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ) : n}
  </div>
);

// Slack-style message row
const SlackMsg: React.FC<SlackMsgProps> = ({ avatar, name, badge, time, children, opacity = 1, translate = 0, indent = 0 }) => (
  <div style={{
    display: 'flex', gap: 12, padding: '6px 0',
    opacity, transform: `translateY(${translate}px)`,
    transition: 'opacity .08s cubic-bezier(.3,.7,.4,1), transform .08s cubic-bezier(.3,.7,.4,1)',
    marginLeft: indent,
  }}>
    {avatar}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: TD.text, letterSpacing: '-0.005em' }}>{name}</span>
        {badge && <span style={{
          fontSize: 9.5, padding: '1px 5px', borderRadius: 3,
          background: badge.bg, color: badge.fg,
          letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700,
        }}>{badge.text}</span>}
        <span style={{ fontSize: 11, color: TD.slackDim }}>{time}</span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: TD.slackText }}>{children}</div>
    </div>
  </div>
);

// inline mention pill
const Mention: React.FC<MentionProps> = ({ children, color = TD.slackBlue }) => (
  <span style={{
    background: `${color}33`, color: color === TD.slackBlue ? '#7EB8DD' : color,
    padding: '0 4px', borderRadius: 3, fontWeight: 500,
  }}>@{children}</span>
);

// inline code
const Code: React.FC<CodeProps> = ({ children }) => (
  <span style={{
    background: 'rgba(232,121,121,0.15)', color: '#E89999',
    padding: '1px 5px', borderRadius: 3,
    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
    fontSize: 12.5,
  }}>{children}</span>
);

// action buttons block
const ActionRow: React.FC<ActionRowProps> = ({ children }) => (
  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>{children}</div>
);

const SBtn: React.FC<SBtnProps> = ({ primary, danger, children, pressed }) => (
  <div style={{
    padding: '6px 13px', borderRadius: 4,
    fontSize: 13, fontWeight: 700,
    background: pressed ? (danger ? `${TD.alert}33` : `${TD.ok}33`) : primary ? '#fff' : 'transparent',
    color: pressed ? (danger ? TD.alert : TD.ok) : primary ? '#1A1D21' : TD.slackText,
    border: `1px solid ${pressed ? (danger ? TD.alert : TD.ok) : primary ? '#fff' : TD.slackLine}`,
    cursor: 'pointer', userSelect: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    transition: 'all .08s cubic-bezier(.3,.7,.4,1)',
  }}>{children}</div>
);

// rich attachment card (for incident summary)
const Attachment: React.FC<AttachmentProps> = ({ accent = TD.accent, children }) => (
  <div style={{
    borderLeft: `3px solid ${accent}`,
    background: 'rgba(255,255,255,0.02)',
    padding: '10px 14px', 
    borderRadius: '0 4px 4px 0',
    marginTop: 6,
    fontSize: 13, lineHeight: 1.55, color: TD.slackText,
  }}>{children}</div>
);

// typing indicator
const Typing: React.FC<TypingProps> = ({ name }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 12, color: TD.slackDim, padding: '4px 0',
  }}>
    <div style={{ display: 'flex', gap: 3 }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: '50%', background: TD.slackDim,
          animation: `tdot 1.2s ${i*0.15}s infinite ease-in-out`,
        }}/>
      ))}
    </div>
    <span><b style={{ color: TD.slackText }}>{name}</b> is typing…</span>
  </div>
);

const VariationSlack: React.FC = () => {
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

  const cycleMs = 5000; // even faster loop for snappier animation
  const phase = (timeMs % cycleMs) / cycleMs;

  // step reveals
  const r1 = reveal(phase, 0.02, 0.10);
  const r2attn = reveal(phase, 0.18, 0.24); // typing for user prompt
  const r2 = reveal(phase, 0.24, 0.32);     // user verification request
  const r2reply = reveal(phase, 0.40, 0.46);// user reply
  const r3 = reveal(phase, 0.52, 0.60);     // engineer approval ask
  const r3approve = reveal(phase, 0.66, 0.70); // approval pressed
  const r4typing = reveal(phase, 0.72, 0.76);
  const r4 = reveal(phase, 0.78, 0.86);     // remediation confirmed

  // active step indicator
  let activeStep = 1;
  if (phase > 0.20) activeStep = 2;
  if (phase > 0.50) activeStep = 3;
  if (phase > 0.76) activeStep = 4;
  const doneStep = phase > 0.94 ? 4 : phase > 0.74 ? 3 : phase > 0.46 ? 2 : phase > 0.16 ? 1 : 0;

  // auto-scroll the thread so newest content is visible
  useEffect(() => {
    if (!scrollRef.current || !isClient) return;
    const target = phase < 0.25 ? 0
                 : phase < 0.50 ? 180
                 : phase < 0.75 ? 360
                 : 540;
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
      fontFamily: 'var(--font-secondary)',
      padding: isClient && window.innerWidth > 768 ? '24px 48px' : '16px 32px',
      boxSizing: 'border-box',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    }}>
      {/* bg grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }}>
        <defs>
          <pattern id="gridS" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridS)"/>
      </svg>

      <div style={{
        display: 'flex',
        flexDirection: isClient && window.innerWidth > 768 ? 'row' : 'column',
        gap: '20px',
        height: '100%',
      }}>
        {/* LEFT — copy + step list */}
        <div style={{
          flex: isClient && window.innerWidth > 768 ? '0 0 40%' : '1',
          minWidth: isClient && window.innerWidth > 768 ? 280 : 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          padding: isClient && window.innerWidth > 768 ? '0' : '0 8px',
        }}>
        <div style={{
          fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: TD.textDim, fontWeight: 500,
          fontFamily: 'var(--font-secondary)',
        }}>Integrations · Slack</div>

        <h2 style={{
          margin: 0, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500, lineHeight: 1.05,
          letterSpacing: '-0.02em', color: TD.text, textWrap: 'balance',
          fontFamily: 'var(--font-primary)',
        }}>
          A full investigation,<br/>
          inside the <span style={{ color: TD.accent }}>thread.</span>
        </h2>

        <p style={{
          margin: 0, fontSize: 'clamp(12px, 1.5vw, 16px)', lineHeight: 1.55, color: TD.textDim, maxWidth: '100%',
          fontFamily: 'var(--font-secondary)',
        }}>
          Trench AI runs the loop end-to-end in Slack — detect, verify with the user,
          get engineer approval, and confirm remediation. No tab-switching, no console hopping.
        </p>

        {/* step list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
          {[
            { n: 1, t: 'Detect',   d: 'Suspicious sign-in flagged with full context.' },
            { n: 2, t: 'Verify',   d: 'Trench AI asks the impacted user — in DM.' },
            { n: 3, t: 'Approve',  d: 'Security engineer is paged for one-click approval.' },
            { n: 4, t: 'Remediate',d: 'Tokens revoked, sessions killed, ticket closed.' },
          ].map(s => {
            const isActive = activeStep === s.n;
            const isDone = doneStep >= s.n;
            return (
              <div key={s.n} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                opacity: isActive || isDone ? 1 : 0.55,
                transition: 'opacity .08s cubic-bezier(.3,.7,.4,1)',
              }}>
                <StepBadge n={s.n} active={isActive && !isDone} done={isDone}/>
                <div>
                  <div style={{
                    fontSize: 15, fontWeight: 600, color: TD.text,
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--font-secondary)',
                  }}>
                    {s.t}
                    {isActive && !isDone && <span style={{
                      width: 6, height: 6, borderRadius: '50%', background: TD.accent,
                      animation: 'tpulse 1.2s ease-in-out infinite',
                    }}/>}
                  </div>
                  <div style={{ fontSize: 13.5, color: TD.textDim, marginTop: 2, fontFamily: 'var(--font-secondary)' }}>{s.d}</div>
                </div>
              </div>
            );
          })}
        </div>
        </div>

        {/* RIGHT — Slack window */}
        <div style={{
          flex: isClient && window.innerWidth > 768 ? '0 0 60%' : '1',
          minWidth: isClient && window.innerWidth > 768 ? 400 : 0,
          background: TD.slackBg, 
          borderRadius: 12,
          border: `1px solid ${TD.slackLine}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex', 
          overflow: 'hidden',
          minHeight: isClient && window.innerWidth > 768 ? '350px' : '300px',
        }}>
        {/* sidebar */}
        <div style={{
          width: isClient && window.innerWidth > 768 ? 140 : 0,
          background: '#f8f9fa',
          borderRight: isClient && window.innerWidth > 768 ? `1px solid ${TD.slackLine}` : 'none',
          padding: '12px 0', 
          display: isClient && window.innerWidth > 768 ? 'flex' : 'none',
          flexDirection: 'column', 
          gap: 2,
          fontSize: 12,
          color: '#6b7280',
        }}>
          <div style={{ padding: '0 12px 10px', borderBottom: `1px solid ${TD.slackLine}` }}>
            <div style={{ fontWeight: 700, color: TD.text, fontSize: 12, letterSpacing: '-0.01em' }}>Trench Security</div>
            <div style={{ fontSize: 10, color: TD.textDim, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: TD.slackGreen }}/>
              you
            </div>
          </div>
          <div style={{ padding: '10px 12px 4px', fontSize: 10, color: TD.textMute, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Channels</div>
          {[
            { n: 'general', un: false },
            { n: 'sec-ops', active: true, un: true },
            { n: 'incidents', un: false },
            { n: 'detections', un: false },
            { n: 'eng-platform', un: false },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '3px 12px', display: 'flex', alignItems: 'center', gap: 6,
              background: c.active ? TD.slackBlue : 'transparent',
              color: c.active ? '#fff' : c.un ? TD.text : TD.textDim,
              fontWeight: c.un ? 700 : 400,
              fontSize: 11,
            }}>
              <span style={{ opacity: 0.7 }}>#</span>
              {isClient && window.innerWidth > 768 ? c.n : c.n === 'sec-ops' ? '#sec' : c.n.charAt(0)}
              {c.un && !c.active && <span style={{
                marginLeft: 'auto', background: TD.alert, color: '#fff',
                fontSize: 10, fontWeight: 700, padding: '0 5px', borderRadius: 8,
              }}>1</span>}
            </div>
          ))}
          <div style={{ padding: '14px 14px 4px', fontSize: 11, color: TD.textMute, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Apps</div>
          <div style={{ padding: '4px 14px', display: 'flex', alignItems: 'center', gap: 8, color: TD.text }}>
            <span style={{
              width: 14, height: 14, borderRadius: 3,
              background: TD.accent,
              display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700, color: '#fff',
            }}>T</span>
            {isClient && window.innerWidth > 768 ? 'Trench AI' : 'T'}
          </div>
        </div>

        {/* channel pane */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* channel header */}
          <div style={{
            padding: '14px 22px', borderBottom: `1px solid ${TD.slackLine}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TD.text, letterSpacing: '-0.01em' }}>
                <span style={{ color: TD.slackDim, fontWeight: 400, marginRight: 4 }}>#</span>sec-ops
              </div>
              <div style={{ fontSize: 11.5, color: TD.slackDim, marginTop: 2 }}>
                Live security operations · 12 members
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: TD.slackDim }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: TD.slackGreen }}/>
                Trench AI · live
              </span>
            </div>
          </div>

          {/* messages */}
          <div ref={scrollRef} style={{
            flex: 1, overflow: 'hidden', 
            padding: isClient && window.innerWidth > 768 ? '14px 18px 12px' : '10px 12px',
            position: 'relative',
            height: isClient && window.innerWidth > 768 ? 400 : 'auto',
            maxHeight: isClient && window.innerWidth > 768 ? 420 : 380,
            scrollBehavior: 'smooth',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

              {/* STEP 1 — detection */}
              <SlackMsg
                avatar={<Avatar name="Trench" color="#1A1D21" bot/>}
                name="Trench AI"
                badge={{ text: 'APP', bg: `${TD.accent}33`, fg: TD.accent }}
                time="10:42 AM"
                opacity={r1}
                translate={(1 - r1) * 8}
              >
                <div>🚨 <b style={{ color: TD.text }}>Suspicious sign-in detected</b> for <Mention color={TD.slackBlue}>maya.chen</Mention></div>
                <Attachment accent={TD.alert}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 18, rowGap: 4, fontSize: 12.5 }}>
                    <span style={{ color: TD.slackDim }}>Source</span><span><Code>Okta</Code> + <Code>CrowdStrike</Code></span>
                    <span style={{ color: TD.slackDim }}>Location</span><span>Lagos, NG · <span style={{ color: TD.alert }}>impossible travel</span> from Berlin (4 min ago)</span>
                    <span style={{ color: TD.slackDim }}>Device</span><span>unmanaged · new fingerprint</span>
                    <span style={{ color: TD.slackDim }}>Risk</span><span style={{ color: TD.alert, fontWeight: 600 }}>HIGH · 0.91</span>
                  </div>
                </Attachment>
                <div style={{ fontSize: 12.5, color: TD.slackDim, marginTop: 8 }}>
                  Reaching out to <Mention color={TD.slackBlue}>maya.chen</Mention> in DM to verify…
                </div>
              </SlackMsg>

              {/* STEP 2 — typing then user verify request (shown as a quoted DM relay) */}
              <div style={{ opacity: r2attn, transition: 'opacity .08s cubic-bezier(.3,.7,.4,1)' }}>
                <Typing name="Trench AI"/>
              </div>

              <SlackMsg
                avatar={<Avatar name="Trench" color="#1A1D21" bot/>}
                name="Trench AI"
                badge={{ text: 'STEP 2 · VERIFY', bg: `${TD.cyan}22`, fg: TD.cyan }}
                time="10:43 AM"
                opacity={r2}
                translate={(1 - r2) * 8}
              >
                <div>Sent a verification DM to <Mention color={TD.slackBlue}>maya.chen</Mention>:</div>
                <Attachment accent={TD.cyan}>
                  <div style={{ fontSize: 12.5, color: TD.slackDim, marginBottom: 6 }}>↳ DM to @maya.chen</div>
                  <div>Hey Maya — we noticed a sign-in to your account from <b style={{ color: TD.text }}>Lagos, NG</b> on an unmanaged device a few minutes ago. Was that you?</div>
                  <ActionRow>
                    <SBtn>👍 Yes, it's me</SBtn>
                    <SBtn danger>🚫 Not me</SBtn>
                  </ActionRow>
                </Attachment>
              </SlackMsg>

              {/* user reply */}
              <SlackMsg
                avatar={<Avatar name="Maya Chen" color="#7C5295"/>}
                name="Maya Chen"
                time="10:44 AM"
                opacity={r2reply}
                translate={(1 - r2reply) * 8}
                indent={48}
              >
                <Attachment accent={TD.alert}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>🚫</span>
                    <span><b style={{ color: TD.alert }}>Not me</b> — I'm in Berlin, on my laptop right now.</span>
                  </div>
                </Attachment>
              </SlackMsg>

              {/* STEP 3 — engineer approval */}
              <SlackMsg
                avatar={<Avatar name="Trench" color="#1A1D21" bot/>}
                name="Trench AI"
                badge={{ text: 'STEP 3 · APPROVE', bg: `${TD.accent}33`, fg: TD.accent }}
                time="10:44 AM"
                opacity={r3}
                translate={(1 - r3) * 8}
              >
                <div>
                  User confirmed compromise. <Mention color={TD.accent}>on-call-secops</Mention> — proposed remediation ready for approval:
                </div>
                <Attachment accent={TD.accent}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TD.text, marginBottom: 6 }}>
                    Proposed actions (3)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5 }}>
                    {[
                      ['Revoke all active Okta sessions for', 'maya.chen'],
                      ['Force MFA re-enrollment + password reset', ''],
                      ['Block source IP', '102.89.34.221'],
                    ].map(([label, code], i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          width: 14, height: 14, borderRadius: 3,
                          border: `1.5px solid ${TD.slackLine}`,
                          background: 'transparent',
                        }}/>
                        <span>{label} {code && <Code>{code}</Code>}</span>
                      </div>
                    ))}
                  </div>
                  <ActionRow>
                    <SBtn primary pressed={r3approve > 0.5}>
                      {r3approve > 0.5 ? '✓ Approved by @ravi.k' : '✓ Approve all'}
                    </SBtn>
                    <SBtn>Modify</SBtn>
                    <SBtn>Open in Trench</SBtn>
                  </ActionRow>
                </Attachment>
              </SlackMsg>

              {/* STEP 4 — remediation done */}
              <div style={{ opacity: r4typing, transition: 'opacity .08s cubic-bezier(.3,.7,.4,1)' }}>
                <Typing name="Trench AI"/>
              </div>

              <SlackMsg
                avatar={<Avatar name="Trench" color="#1A1D21" bot/>}
                name="Trench AI"
                badge={{ text: 'STEP 4 · DONE', bg: `${TD.ok}22`, fg: TD.ok }}
                time="10:45 AM"
                opacity={r4}
                translate={(1 - r4) * 8}
              >
                <div>
                  ✅ <b style={{ color: TD.text }}>Remediation complete</b> — account secured in 3m 12s.
                </div>
                <Attachment accent={TD.ok}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', columnGap: 14, rowGap: 6, fontSize: 12.5 }}>
                    {[
                      ['Okta sessions revoked',     '12 sessions',     '✓'],
                      ['MFA re-enrollment forced',   'next sign-in',   '✓'],
                      ['Source IP blocked',          '102.89.34.221',  '✓'],
                      ['Incident filed',             'INC-2148 · Jira', '↗'],
                    ].map(([k, v, t], i) => (
                      <React.Fragment key={i}>
                        <span style={{ color: TD.slackDim }}>{k}</span>
                        <span style={{ color: TD.text }}>{v}</span>
                        <span style={{ color: t === '↗' ? TD.cyan : TD.ok, fontWeight: 700 }}>{t}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </Attachment>
                <div style={{ fontSize: 12.5, color: TD.slackDim, marginTop: 8 }}>
                  Full timeline + evidence saved to <Code>INC-2148</Code>. Closing the loop here. 🛡️
                </div>
              </SlackMsg>

            </div>

            {/* fade overlays for top/bottom of scroll viewport */}
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 24,
              background: `linear-gradient(180deg, ${TD.slackBg}, transparent)`,
              pointerEvents: 'none',
            }}/>
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 40,
              background: `linear-gradient(0deg, ${TD.slackBg}, transparent)`,
              pointerEvents: 'none',
            }}/>
          </div>

          {/* composer */}
          <div style={{
            margin: '0 18px 12px', padding: '8px 12px',
            border: `1px solid ${TD.slackLine}`, borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 12, color: TD.slackDim,
          }}>
            <span style={{ flex: 1 }}>Message #sec-ops</span>
            <span style={{ opacity: 0.6 }}>B</span>
            <span style={{ opacity: 0.6 }}>I</span>
            <span style={{ opacity: 0.6 }}>@</span>
            <span style={{ opacity: 0.6 }}>📎</span>
          </div>
        </div>
      </div>

      {/* watermark */}
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

// Export as React component
export default VariationSlack;
