"use client";

import React, { useState, useEffect, useRef } from 'react';

// ======================================================================
// VARIATION E — TEAMS THREAD (4-step Trench AI investigation)
// Ported to Light Theme with SVG Icons and Responsive Layout
// Refined to show only 2 messages at a time, Slack style cards,
// and reverse order (newest on top) with no whitespace.
// ======================================================================

// Teams visual tokens — light mode
const TT = {
  bg: '#ffffff',
  bgDeep: '#f8f9fa',
  text: '#213547',
  textDim: '#6b7280',
  textMute: '#9ca3af',
  line: 'rgba(0,0,0,0.08)',
  lineHi: 'rgba(0,0,0,0.14)',
  accent: '#5B5FC7', // Teams purple
  ok: '#10b981',
  alert: '#ef4444',
  cyan: '#06b6d4',

  // Teams chrome — light mode
  teamsBg: '#ffffff',
  teamsPanel: '#f5f5f5',
  teamsCard: '#ffffff',
  teamsLine: '#e1e1e1',
  teamsText: '#242424',
  teamsDim: '#616161',
  teamsPurple: '#5B5FC7',
  teamsPurpleHi: '#4F52B2',
  teamsGreen: '#10b981',
};

interface AvatarProps {
  name: string;
  color: string;
  size?: number;
  bot?: boolean;
}

const AvatarT: React.FC<AvatarProps> = ({ name, color, size = 36, bot }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, color: '#fff',
    display: 'grid', placeItems: 'center',
    fontWeight: 600, fontSize: size * 0.40,
    flexShrink: 0, position: 'relative',
    fontFamily: 'Inter, system-ui, sans-serif',
  }}>
    {bot ? (
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="7" width="16" height="13" rx="3" fill="none" stroke="#fff" strokeWidth="1.6" />
        <circle cx="9" cy="13" r="1.4" fill="#fff" />
        <circle cx="15" cy="13" r="1.4" fill="#fff" />
        <path d="M12 4 V7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="3.5" r="1.1" fill="#fff" />
      </svg>
    ) : name.split(' ').map(n => n[0]).slice(0, 2).join('')}
    {!bot && <div style={{
      position: 'absolute', right: -1, bottom: -1,
      width: size * 0.3, height: size * 0.3, borderRadius: '50%',
      background: TT.teamsGreen, border: `2px solid ${TT.teamsBg}`,
    }} />}
  </div>
);

const reveal = (phase: number, appear: number, settle = appear + 0.06) =>
  Math.max(0, Math.min(1, (phase - appear) / (settle - appear)));

interface StepBadgeProps {
  n: number;
  active: boolean;
  done: boolean;
}

const StepBadgeT: React.FC<StepBadgeProps> = ({ n, active, done }) => (
  <div style={{
    width: 22, height: 22, borderRadius: '50%',
    background: done ? TT.ok : active ? TT.teamsPurple : 'transparent',
    border: `1.5px solid ${done ? TT.ok : active ? TT.teamsPurple : TT.teamsLine}`,
    color: done || active ? '#fff' : TT.teamsDim,
    display: 'grid', placeItems: 'center',
    fontSize: 11, fontWeight: 700, flexShrink: 0,
    transition: 'all .25s',
  }}>
    {done ? (
      <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6 L5 9 L10 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ) : n}
  </div>
);

interface TeamsCardProps {
  accent: string;
  title?: string;
  time?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

// Slack style (attachment with left border)
const TeamsCard: React.FC<TeamsCardProps> = ({ accent, title, children, action }) => (
  <div style={{
    borderLeft: `3px solid ${accent}`,
    background: '#f9f9f9',
    padding: '12px 14px',
    borderRadius: '0 4px 4px 0',
    marginTop: 6,
    fontSize: 13, lineHeight: 1.5, color: '#242424',
    boxShadow: '0 1px 2px rgba(0,0,0,.03)',
  }}>
    {title && <div style={{ fontWeight: 600, color: accent, marginBottom: 4 }}>{title}</div>}
    {children}
    {action && (
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        {action}
      </div>
    )}
  </div>
);

interface TBtnProps {
  primary?: boolean;
  danger?: boolean;
  children: React.ReactNode;
  pressed?: boolean;
}

const TBtn: React.FC<TBtnProps> = ({ primary, danger, children, pressed }) => (
  <div style={{
    padding: '5px 12px', borderRadius: 4,
    fontSize: 12, fontWeight: 600,
    background: pressed ? (danger ? `${TT.alert}22` : `${TT.ok}22`) : primary ? TT.teamsPurple : 'transparent',
    color: pressed ? (danger ? TT.alert : TT.ok) : primary ? '#fff' : TT.teamsText,
    border: `1px solid ${pressed ? (danger ? TT.alert : TT.ok) : primary ? TT.teamsPurple : TT.teamsLine}`,
    cursor: 'pointer', userSelect: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    transition: 'all .25s',
  }}>{children}</div>
);

interface TeamsMsgProps {
  avatar: React.ReactNode;
  name: string;
  role?: string;
  time: string;
  badge?: { text: string; bg: string; fg: string };
  children: React.ReactNode;
  opacity?: number;
  translate?: number;
  indent?: number;
  isReply?: boolean;
}

const TeamsMsg: React.FC<TeamsMsgProps> = ({ avatar, name, role, time, badge, children, opacity = 1, translate = 0, indent = 0, isReply }) => (
  <div style={{
    display: 'flex', gap: 12, padding: isReply ? '4px 0' : '8px 0',
    opacity, transform: `translateY(${translate}px)`,
    transition: 'opacity .35s ease, transform .35s ease',
    marginLeft: indent,
    position: 'relative',
  }}>
    {isReply && (
      <div style={{
        position: 'absolute', left: -22, top: 0, bottom: 0, width: 2,
        background: TT.teamsLine, borderRadius: 1,
      }} />
    )}
    {avatar}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: TT.teamsText }}>{name}</span>
        {role && <span style={{ fontSize: 11, color: TT.teamsDim }}>{role}</span>}
        {badge && <span style={{
          fontSize: 9.5, padding: '1px 6px', borderRadius: 3,
          background: badge.bg, color: badge.fg,
          letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700,
        }}>{badge.text}</span>}
        <span style={{ fontSize: 11, color: TT.teamsDim, marginLeft: 'auto' }}>{time}</span>
      </div>
      {children}
    </div>
  </div>
);

const MentionT: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{
    color: TT.teamsPurple, fontWeight: 500,
  }}>@{children}</span>
);

const CodeT: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{
    background: '#f3f4f6',
    padding: '1px 6px', borderRadius: 3,
    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
    fontSize: 12.5, color: '#d97706',
  }}>{children}</span>
);

const TypingT: React.FC<{ name: string }> = ({ name }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 12, color: TT.teamsDim, padding: '4px 0 4px 48px',
  }}>
    <div style={{ display: 'flex', gap: 3 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: '50%', background: TT.teamsDim,
          animation: `tdot 1.2s ${i * 0.15}s infinite ease-in-out`,
        }} />
      ))}
    </div>
    <span><b style={{ color: TT.teamsText }}>{name}</b> is typing…</span>
  </div>
);

// Icons
const BellIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;
const ChatIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const PeopleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const CalendarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const FolderIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;

const VariationTeams: React.FC = () => {
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

  const cycleMs = 14000;
  const phase = (timeMs % cycleMs) / cycleMs;

  const r1 = reveal(phase, 0.02, 0.10);
  const r1_visible = r1 * (1 - reveal(phase, 0.22, 0.24)); // Fade out before step 2

  const r2attn = reveal(phase, 0.18, 0.22);
  const r2 = reveal(phase, 0.24, 0.32);
  const r2_visible = r2 * (1 - reveal(phase, 0.50, 0.52)); // Fade out before step 3

  const r2reply = reveal(phase, 0.40, 0.46);
  const r2reply_visible = r2reply * (1 - reveal(phase, 0.50, 0.52)); // Fade out with r2

  const r3 = reveal(phase, 0.52, 0.60);
  const r3_visible = r3 * (1 - reveal(phase, 0.74, 0.78)); // Fade out before step 4

  const r3approve = reveal(phase, 0.66, 0.70);
  const r4typing = reveal(phase, 0.72, 0.76);
  const r4 = reveal(phase, 0.78, 0.86);

  let activeStep = 1;
  if (phase > 0.20) activeStep = 2;
  if (phase > 0.50) activeStep = 3;
  if (phase > 0.76) activeStep = 4;
  const doneStep = phase > 0.94 ? 4 : phase > 0.74 ? 3 : phase > 0.46 ? 2 : phase > 0.16 ? 1 : 0;

  useEffect(() => {
    if (!scrollRef.current || !isClient) return;
    // With reverse order, we don't need to scroll down as much,
    // because new messages appear at the top!
    scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
          <pattern id="gridT" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridT)" />
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
          {/* <div style={{
            fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: TT.textDim, fontWeight: 500,
            fontFamily: 'var(--font-secondary)',
          }}>Integrations · Microsoft Teams</div> */}

          <h2 style={{
            margin: 0, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500, lineHeight: 1.05,
            letterSpacing: '-0.02em', color: TT.text, textWrap: 'balance',
            fontFamily: 'var(--font-primary)',
          }}>
            Insider risk, contained<br />
            before <span style={{ color: TT.teamsPurple }}>coffee gets cold.</span>
          </h2>

          <p style={{
            margin: 0, fontSize: 'clamp(12px, 1.5vw, 16px)', lineHeight: 1.55, color: TT.textDim, maxWidth: '100%',
            fontFamily: 'var(--font-secondary)',
          }}>
            From a 14 GB exfil-shaped download to a fully contained workstation —
            Trench AI runs the entire incident loop inside the Teams channel your
            security org already lives in.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
            {[
              { n: 1, t: 'Detect', d: 'DLP + UEBA correlate a bulk download anomaly.' },
              { n: 2, t: 'Verify', d: 'Trench AI checks intent with the data owner.' },
              { n: 3, t: 'Approve', d: 'Engineer green-lights containment in one tap.' },
              { n: 4, t: 'Contain', d: 'Endpoint quarantined, DLP block live, ticket filed.' },
            ].map(s => {
              const isActive = activeStep === s.n;
              const isDone = doneStep >= s.n;
              return (
                <div key={s.n} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  opacity: isActive || isDone ? 1 : 0.5,
                  transition: 'opacity .3s',
                }}>
                  <StepBadgeT n={s.n} active={isActive && !isDone} done={isDone} />
                  <div>
                    <div style={{
                      fontSize: 15, fontWeight: 600, color: TT.text,
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-secondary)',
                    }}>
                      {s.t}
                      {isActive && !isDone && <span style={{
                        width: 6, height: 6, borderRadius: '50%', background: TT.teamsPurple,
                        animation: 'tpulse 1.2s ease-in-out infinite',
                      }} />}
                    </div>
                    <div style={{ fontSize: 13.5, color: TT.textDim, marginTop: 2, fontFamily: 'var(--font-secondary)' }}>{s.d}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Teams window */}
        <div style={{
          flex: isClient && window.innerWidth > 768 ? '0 0 60%' : '1',
          minWidth: isClient && window.innerWidth > 768 ? 400 : 0,
          background: TT.teamsBg, borderRadius: 12,
          border: `1px solid ${TT.teamsLine}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex', overflow: 'hidden',
          height: isClient && window.innerWidth > 768 ? '525px' : '400px', // Expanded height
        }}>
          {/* App rail (Teams left rail) */}
          <div style={{
            width: isClient && window.innerWidth > 768 ? 64 : 0,
            display: isClient && window.innerWidth > 768 ? 'flex' : 'none',
            background: '#f0f0f0',
            borderRight: isClient && window.innerWidth > 768 ? `1px solid ${TT.teamsLine}` : 'none',
            flexDirection: 'column', alignItems: 'center',
            padding: '14px 0', gap: 4,
          }}>
            {[
              { i: <BellIcon />, l: 'Activity' },
              { i: <ChatIcon />, l: 'Chat' },
              { i: <PeopleIcon />, l: 'Teams', active: true },
              { i: <CalendarIcon />, l: 'Calendar' },
              { i: <PhoneIcon />, l: 'Calls' },
              { i: <FolderIcon />, l: 'Files' },
            ].map((it, i) => (
              <div key={i} style={{
                width: 48, padding: '6px 0',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                background: it.active ? 'rgba(91,95,199,0.15)' : 'transparent',
                borderRadius: 4, position: 'relative',
                color: it.active ? TT.teamsPurple : TT.teamsDim,
                fontSize: 9, fontWeight: 500,
                cursor: 'pointer'
              }}>
                {it.active && <div style={{
                  position: 'absolute', left: 0, top: 8, bottom: 8, width: 3,
                  background: TT.teamsPurple, borderRadius: 2,
                }} />}
                <span>{it.i}</span>
                <span>{it.l}</span>
              </div>
            ))}
          </div>

          {/* Channels list */}
          <div style={{
            width: 180, background: TT.teamsPanel,
            borderRight: `1px solid ${TT.teamsLine}`,
            padding: '14px 0', display: isClient && window.innerWidth > 1024 ? 'flex' : 'none',
            flexDirection: 'column',
            fontSize: 13, color: TT.teamsText,
          }}>
            <div style={{ padding: '0 14px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', color: '#242424' }}>Teams</div>
              <span style={{ color: TT.teamsDim, fontSize: 16 }}>⋯</span>
            </div>
            {/* Team header */}
            <div style={{
              padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 4,
                background: `linear-gradient(135deg, ${TT.teamsPurple}, ${TT.teamsPurpleHi})`,
                display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 11, color: '#fff',
              }}>SO</div>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#242424' }}>SecOps</span>
            </div>
            {/* channels */}
            {[
              { n: 'General' },
              { n: 'Incidents', active: true, un: true },
              { n: 'Threat Intel' },
              { n: 'DLP & Insider' },
              { n: 'On-call' },
            ].map((c, i) => (
              <div key={i} style={{
                padding: '5px 14px 5px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: c.active ? 'rgba(91,95,199,0.1)' : 'transparent',
                color: c.active ? TT.teamsPurple : c.un ? '#242424' : TT.teamsDim,
                fontWeight: c.un || c.active ? 600 : 400,
                borderLeft: c.active ? `3px solid ${TT.teamsPurple}` : '3px solid transparent',
                paddingLeft: c.active ? 29 : 32,
                cursor: 'pointer'
              }}>
                <span>{c.n}</span>
                {c.un && !c.active && <span style={{
                  background: '#CD2553', color: '#fff',
                  fontSize: 10, fontWeight: 700, padding: '0 5px', borderRadius: 8,
                }}>1</span>}
              </div>
            ))}
          </div>

          {/* Channel pane */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            {/* channel header */}
            <div style={{
              padding: '12px 16px', borderBottom: `1px solid ${TT.teamsLine}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#242424', letterSpacing: '-0.01em' }}>
                  Incidents
                </div>
                <div style={{ fontSize: 11, color: TT.teamsDim, marginTop: 2 }}>
                  Posts · Files · Wiki · Trench AI
                </div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: TT.teamsDim }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: TT.teamsGreen }} />
                  Trench AI · connected
                </span>
              </div>
            </div>

            {/* messages container with fixed height */}
            <div ref={scrollRef} style={{
              flex: 1,
              overflow: 'hidden',
              padding: '14px 16px',
              position: 'relative',
              scrollBehavior: 'smooth',
            }}>
              {/* Flex direction column-reverse to put newest messages on top! */}
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 12 }}>

                {/* STEP 4 — done */}
                {r4 > 0 && (
                  <TeamsMsg
                    avatar={<AvatarT name="Trench" color="#1A1D21" bot />}
                    name="Trench AI"
                    time="2:18 PM"
                    badge={{ text: 'STEP 4 · CONTAINED', bg: `${TT.ok}15`, fg: TT.ok }}
                    opacity={r4}
                    translate={(1 - r4) * 8}
                    indent={40}
                    isReply
                  >
                    <div style={{ marginBottom: 6, fontSize: 13, color: '#242424' }}>
                      ✅ <b style={{ color: '#242424' }}>Containment complete</b> — exfil window closed in 4m 02s.
                    </div>
                    <TeamsCard accent={TT.ok} title="DLP-2914 · Resolved">
                      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', columnGap: 14, rowGap: 7, fontSize: 12 }}>
                        {[
                          ['Endpoint quarantined', 'WIN-JPARK-04 · isolated', '✓'],
                          ['Sessions revoked', 'AWS · Okta · 14 active tokens', '✓'],
                          ['DLP egress block live', 'Purview policy DLP-2914-BLK', '✓'],
                          ['Evidence preserved', 'CloudTrail snapshot · 30d', '✓'],
                          ['Incident filed', 'INC-2914 · ServiceNow', '↗'],
                        ].map(([k, v, t], i) => (
                          <React.Fragment key={i}>
                            <span style={{ color: TT.teamsDim }}>{k}</span>
                            <span style={{ color: '#242424' }}>{v}</span>
                            <span style={{ color: t === '↗' ? TT.cyan : TT.ok, fontWeight: 700 }}>{t}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </TeamsCard>
                    <div style={{ fontSize: 12, color: TT.teamsDim, marginTop: 8 }}>
                      Full timeline + chain-of-custody attached to <CodeT>INC-2914</CodeT>. HR + Legal looped in. 🛡️
                    </div>
                  </TeamsMsg>
                )}

                {/* typing for step 4 */}
                {r4typing > 0 && r4 === 0 && (
                  <div style={{ opacity: r4typing, transition: 'opacity .3s' }}>
                    <TypingT name="Trench AI" />
                  </div>
                )}

                {/* STEP 3 — engineer approval */}
                {r3_visible > 0 && (
                  <TeamsMsg
                    avatar={<AvatarT name="Trench" color="#1A1D21" bot />}
                    name="Trench AI"
                    time="2:16 PM"
                    badge={{ text: 'STEP 3 · APPROVE', bg: `${TT.teamsPurple}15`, fg: TT.teamsPurple }}
                    opacity={r3_visible}
                    translate={(1 - r3_visible) * 8}
                    indent={40}
                    isReply
                  >
                    <div style={{ marginBottom: 6, fontSize: 13, color: '#242424' }}>
                      Confirmed unauthorized exfil. <MentionT>secops-oncall</MentionT> — proposed containment plan ready:
                    </div>
                    <TeamsCard
                      accent={TT.teamsPurple}
                      title="Containment plan · 4 actions"
                      action={
                        <>
                          <TBtn primary pressed={r3approve > 0.5}>
                            {r3approve > 0.5 ? '✓ Approved' : 'Approve & execute'}
                          </TBtn>
                          <TBtn>Modify plan</TBtn>
                        </>
                      }
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12, color: '#242424' }}>
                        {[
                          ['Quarantine endpoint', 'WIN-JPARK-04 · Defender for Endpoint'],
                          ['Revoke AWS + Okta sessions', 'jordan.park · all regions'],
                          ['Apply DLP egress block', 'Purview policy · Dropbox + personal email'],
                          ['Preserve forensic evidence', 'snapshot bucket access logs · 30 days'],
                        ].map(([label, sub], i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                            <span style={{
                              width: 12, height: 12, borderRadius: 2,
                              border: `1px solid ${TT.teamsLine}`, marginTop: 2,
                              flexShrink: 0,
                            }} />
                            <div>
                              <div style={{ fontWeight: 500 }}>{label}</div>
                              <div style={{ fontSize: 11, color: TT.teamsDim, marginTop: 1 }}>{sub}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TeamsCard>
                  </TeamsMsg>
                )}

                {/* user reply */}
                {r2reply_visible > 0 && (
                  <TeamsMsg
                    avatar={<AvatarT name="Priya Shah" color="#A4373A" />}
                    name="Priya Shah"
                    role="Data Owner · Customer Platform"
                    time="2:16 PM"
                    opacity={r2reply_visible}
                    translate={(1 - r2reply_visible) * 8}
                    indent={40}
                    isReply
                  >
                    <TeamsCard accent={TT.alert} title="Not authorized">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{ fontSize: 18 }}>🛑</span>
                        <span style={{ color: '#242424', fontSize: 13 }}>
                          <b style={{ color: TT.alert }}>Not authorized.</b> Jordan was removed from the customer-data ACL on Monday.
                          No analytics task. Please contain this immediately — looping in <MentionT>secops</MentionT>.
                        </span>
                      </div>
                    </TeamsCard>
                  </TeamsMsg>
                )}

                {/* STEP 2 — verify with data owner */}
                {r2_visible > 0 && (
                  <TeamsMsg
                    avatar={<AvatarT name="Trench" color="#1A1D21" bot />}
                    name="Trench AI"
                    time="2:15 PM"
                    badge={{ text: 'STEP 2 · VERIFY', bg: `${TT.cyan}15`, fg: TT.cyan }}
                    opacity={r2_visible}
                    translate={(1 - r2_visible) * 8}
                    indent={40}
                    isReply
                  >
                    <div style={{ marginBottom: 6, fontSize: 13, color: '#242424' }}>
                      Pinged data owner <MentionT>priya.s</MentionT>:
                    </div>
                    <TeamsCard accent={TT.cyan} title="Verify legitimate access">
                      <div style={{ color: '#242424' }}>
                        <b style={{ color: '#242424' }}>jordan.park</b> just bulk-downloaded the
                        <CodeT> acme-customer-pii </CodeT> bucket. Is this part of a sanctioned offboarding handoff or analytics task?
                      </div>
                      <div style={{ marginTop: 10, padding: 10, background: '#f9f9f9', borderRadius: 6, fontSize: 12, color: TT.teamsDim }}>
                        Last sanctioned access: <CodeT>2 weeks ago</CodeT> · ticket <CodeT>DATA-841</CodeT> (closed).
                      </div>
                    </TeamsCard>
                  </TeamsMsg>
                )}

                {/* typing for step 2 */}
                {r2attn > 0 && r2 === 0 && (
                  <div style={{ opacity: r2attn, transition: 'opacity .3s' }}>
                    <TypingT name="Trench AI" />
                  </div>
                )}

                {/* STEP 1 — detection */}
                {r1_visible > 0 && (
                  <TeamsMsg
                    avatar={<AvatarT name="Trench" color="#1A1D21" bot />}
                    name="Trench AI"
                    role="Bot · posted in Incidents"
                    time="2:14 PM"
                    badge={{ text: 'STEP 1 · DETECT', bg: `${TT.alert}15`, fg: TT.alert }}
                    opacity={r1_visible}
                    translate={(1 - r1_visible) * 8}
                  >
                    <div style={{ marginBottom: 8, fontSize: 13, color: '#242424' }}>
                      ⚠️ Anomalous data movement detected — <MentionT>jordan.park</MentionT> just downloaded
                      <b style={{ color: '#242424' }}> 14.2 GB</b> from <CodeT>s3://acme-customer-pii</CodeT> in 6 minutes.
                    </div>
                    <TeamsCard accent={TT.alert} title="Insider risk · DLP-2914">
                      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 14, rowGap: 5, fontSize: 12 }}>
                        <span style={{ color: TT.teamsDim }}>Sources</span><span style={{ color: '#242424' }}><CodeT>AWS CloudTrail</CodeT> + <CodeT>Defender</CodeT> + <CodeT>Purview DLP</CodeT></span>
                        <span style={{ color: TT.teamsDim }}>User</span><span style={{ color: '#242424' }}>Jordan Park · Engineering · <span style={{ color: TT.alert, fontWeight: 500 }}>resignation logged 3 days ago</span></span>
                        <span style={{ color: TT.teamsDim }}>Volume</span><span style={{ color: '#242424' }}>14.2 GB across 8,142 objects · <span style={{ color: TT.alert, fontWeight: 500 }}>17× baseline</span></span>
                        <span style={{ color: TT.teamsDim }}>Destination</span><span style={{ color: '#242424' }}>personal Dropbox · <span style={{ color: TT.alert, fontWeight: 500 }}>not sanctioned</span></span>
                      </div>
                    </TeamsCard>
                    <div style={{ fontSize: 12, color: TT.teamsDim, marginTop: 8 }}>
                      Reaching out to data owner <MentionT>priya.s</MentionT> to verify intent…
                    </div>
                  </TeamsMsg>
                )}

              </div>

              {/* fade overlays */}
              <div style={{
                position: 'absolute', left: 0, right: 0, top: 0, height: 24,
                background: `linear-gradient(180deg, ${TT.teamsBg}, transparent)`,
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0, height: 40,
                background: `linear-gradient(0deg, ${TT.teamsBg}, transparent)`,
                pointerEvents: 'none',
              }} />
            </div>

            {/* composer - fixed at bottom */}
            <div style={{ padding: 12, borderTop: `1px solid ${TT.teamsLine}` }}>
              <div style={{
                padding: '8px 12px',
                border: `1px solid ${TT.teamsLine}`, borderRadius: 6,
                background: '#f9f9f9',
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 12, color: TT.teamsDim,
              }}>
                <span style={{ flex: 1 }}>Reply to thread...</span>
                <span style={{ opacity: 0.6 }}>𝐀</span>
                <span style={{ opacity: 0.6 }}>📎</span>
                <span style={{ opacity: 0.6 }}>😊</span>
              </div>
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

export default VariationTeams;
