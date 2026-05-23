"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Section3Visual() {
  const [activeTab, setActiveTab] = useState("teams");
  const [isPaused, setIsPaused] = useState(false);

  const tabs = [
    {
      id: "teams", label: "Teams",
      scenario: "False positive · Auto-suppressed, team notified",
      mode: "Zero UI",
      modeColor: "#4F52B2",
    },
    {
      id: "slack", label: "Slack",
      scenario: "Suspicious sign-in · Verified & remediated in 3m 12s",
      mode: "Conversational UX",
      modeColor: "#3F0B40",
    },
    {
      id: "claude", label: "Claude",
      scenario: "Threat hunt · Lateral movement surfaced",
      mode: "On-Demand Context",
      modeColor: "#D97757",
    },
  ];

  const activeData = tabs.find(t => t.id === activeTab) || tabs[0];

  const [readyToSwitch, setReadyToSwitch] = useState(false);

  const handleComplete = () => {
    setReadyToSwitch(true);
  };

  useEffect(() => {
    if (isPaused || !readyToSwitch) return;
    
    const timer = setTimeout(() => {
      setActiveTab((current) => {
        const tabIds = ["teams", "slack", "claude"];
        const currentIndex = tabIds.indexOf(current);
        return tabIds[(currentIndex + 1) % tabIds.length];
      });
      setReadyToSwitch(false); // Reset for the next tab
    }, 4000); // Wait 4 seconds after the last message before switching

    return () => clearTimeout(timer);
  }, [isPaused, readyToSwitch]);

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
      fontFamily: "var(--font-secondary), 'DM Mono', 'Courier New', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      margin: "32px 0",
      gap: 40,
    }}>



      {/* Abstract flow strip — updates per tab */}
      <div style={{ width: "100%", maxWidth: 620, marginBottom: 0 }}>
        {activeTab === "slack" && <FlowStrip nodes={[
          { label: "Signal", sub: "Okta · CrowdStrike", color: "#F1F5F9", text: "#64748B" },
          { label: "Detect", sub: "Impossible travel", color: "#FEF3C7", text: "#B45309" },
          { label: "Verify", sub: "User DM · Denied", color: "#FFE4E6", text: "#E11D48" },
          { label: "Approve", sub: "1-click · Slack", color: "#D1FAE5", text: "#059669" },
          { label: "Close", sub: "3m 12s · INC-2148", color: "#E0E7FF", text: "#0D41E1" },
        ]} time="3m 12s" />}

        {activeTab === "teams" && <FlowStrip nodes={[
          { label: "Signal", sub: "CloudTrail · S3", color: "#F1F5F9", text: "#64748B" },
          { label: "Detect", sub: "Anomalous API call", color: "#FEF3C7", text: "#B45309" },
          { label: "Correlate", sub: "Scheduled scan match", color: "#F0FDF4", text: "#16A34A" },
          { label: "Auto-close", sub: "False positive · Zero UI", color: "#D1FAE5", text: "#059669" },
          { label: "Notify", sub: "Team alerted · No action", color: "#E0E7FF", text: "#0D41E1" },
        ]} time="Auto · 0 actions needed" />}

        {activeTab === "claude" && <FlowStrip nodes={[
          { label: "Hunt", sub: "7-day window", color: "#F1F5F9", text: "#64748B" },
          { label: "Query", sub: "Okta · AD · CrowdStrike", color: "#E0E7FF", text: "#0D41E1" },
          { label: "Analyse", sub: "3 accounts · 1 subnet", color: "#FCE7F3", text: "#BE185D" },
          { label: "Surface", sub: "Lateral movement", color: "#FFE4E6", text: "#E11D48" },
          { label: "Recommend", sub: "Isolate · Investigate", color: "#FEF3C7", text: "#B45309" },
        ]} time="Hunt complete · 3 findings" />}
      </div>

      {/* Tabs */}
      <div style={{ width: "100%", maxWidth: 620 }}>
        <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #E2E8F0", paddingBottom: 0, alignItems: "center" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id);  }} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 4px",
              background: "transparent", border: "none",
              cursor: "pointer", fontSize: 15.6,
              fontFamily: "var(--font-secondary), 'DM Mono', monospace",
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? "#0F172A" : "#94A3B8",
              position: "relative",
              marginBottom: -1, transition: "all 0.15s ease",
            }}>
              <TabIcon id={tab.id} active={activeTab === tab.id} />
              {tab.label}
              {activeTab === tab.id && (
                <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: "#0F172A" }} />
              )}
            </button>
          ))}
          {/* Scenario label */}
          <div style={{
            marginLeft: "auto", display: "flex", alignItems: "center",
            paddingRight: 4, marginBottom: 6
          }}>
            <div style={{
              fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase",
              color: activeData.modeColor,
              background: activeData.modeColor + "15",
              padding: "5px 10px", borderRadius: 4,
              fontWeight: 700
            }}>
              {activeData.mode}
            </div>
          </div>
        </div>

        {/* Scenario subtitle */}
        <div style={{
          padding: "16px 4px 12px 4px", fontSize: 13.2,
          color: "#64748B",
        }}>
          {activeData.scenario}
        </div>

        {/* Tab content */}
        <div style={{
          border: "1px solid #E2E8F0", borderTop: "none",
          borderRadius: "0 0 8px 8px", overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.02)", height: 550, display: "flex", flexDirection: "column"
        }}>
          {activeTab === "slack" && <SlackMock isPaused={isPaused} onComplete={handleComplete} />}
          {activeTab === "teams" && <TeamsMock isPaused={isPaused} onComplete={handleComplete} />}
          {activeTab === "claude" && <ClaudeMock isPaused={isPaused} onComplete={handleComplete} />}
        </div>
      </div>

    </div>
  );
}

// ─── ABSTRACT FLOW STRIP ───────────────────────────────────────────
function FlowStrip({ nodes, time }: { nodes: any[], time: string }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        {nodes.map((node, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1, background: node.color, padding: "9px 7px", textAlign: "center", borderRadius: "4px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: node.text }}>{node.label}</div>
              <div style={{ fontSize: 9.6, color: node.text + "99", lineHeight: 1.5, marginTop: 2 }}>{node.sub}</div>
            </div>
            {i < nodes.length - 1 && (
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" style={{ flexShrink: 0, margin: "0 2px" }}>
                <path d="M0 4H12M12 4L8.5 1M12 4L8.5 7" stroke="#CBD5E1" strokeWidth="1"/>
              </svg>
            )}
          </div>
        ))}
      </div>
      <div style={{ height: 3, background: "#F1F5F9", borderRadius: 2, marginBottom: 5, overflow: "hidden" }}>
        <div style={{ height: "100%", width: "100%", background: `linear-gradient(to right, ${nodes.map(n => n.text).join(", ")})`, borderRadius: 2 }}/>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 10.2, color: "#0F172A", fontWeight: 700, letterSpacing: "0.05em" }}>{time}</span>
      </div>
    </div>
  );
}

// ─── MESSAGE WINDOW COMPONENT ──────────────────────────────────────
function MessageWindow({
  header,
  messages,
  inputPlaceholder,
  bg = "#F8FAFC",
  inputBg = "#FFFFFF",
  interval = 800,
  isPaused,
  onComplete,
}: {
  header: React.ReactNode;
  messages: React.ReactNode[];
  inputPlaceholder: string;
  bg?: string;
  inputBg?: string;
  interval?: number;
  isPaused?: boolean;
  onComplete?: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCurrent(0);
    setCompleted(false);
  }, [messages]);

  // Handle completion safely outside the state updater
  useEffect(() => {
    if (completed) return;
    if (current >= messages.length - 1) {
      const timeout = setTimeout(() => {
        setCompleted(true);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [current, messages.length, completed, onComplete]);

  // Handle hover completion (instantly show all messages if hovered)
  useEffect(() => {
    if (isPaused && !completed) {
      setCurrent(messages.length - 1);
    }
  }, [isPaused, completed, messages.length]);

  // Handle message increment interval
  useEffect(() => {
    if (completed || isPaused || current >= messages.length - 1) return;
    
    const timer = setInterval(() => {
      setCurrent(c => {
        if (c < messages.length - 1) {
          return c + 1;
        }
        return c;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [messages.length, interval, completed, isPaused, current]);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current && !isPaused) {
      const scrollTimeout = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 50);
      return () => clearTimeout(scrollTimeout);
    }
  }, [current, isPaused]);

  return (
    <div style={{ background: bg, display: "flex", flexDirection: "column", flex: 1, height: "100%", borderRadius: "0 0 8px 8px" }}>
      {header}
      <div 
        ref={scrollRef}
        style={{ 
          flex: 1, 
          padding: "24px 20px", 
          display: "flex", 
          flexDirection: "column",
          gap: 24,
          overflowY: "auto"
        }}
      >
        {messages.map((msg, index) => {
          if (index > current) return null;
          return (
            <div key={index} style={{ 
              animation: "messageFadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              willChange: "transform, opacity"
            }}>
              {msg}
            </div>
          );
        })}
      </div>
      <div style={{ padding: "12px 16px", background: inputBg, borderTop: "1px solid #F1F5F9" }}>
        <div style={{ 
          background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, 
          padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" 
        }}>
          <div style={{ color: "#94A3B8", fontSize: 13.2 }}>{inputPlaceholder}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#CBD5E1", fontSize: 12 }}>
            <span style={{ fontFamily: "sans-serif" }}>⌘</span> K
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes messageFadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}

// ─── SLACK: Suspicious sign-in ─────────────────────────────────────
function SlackMock({ isPaused, onComplete }: { isPaused?: boolean; onComplete: () => void }) {
  const header = (
    <div style={{ background: "#3F0B40", padding: "16px 20px", display: "flex", alignItems: "center", gap: 8 }}>
      <TrafficLights /><div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginLeft: 6, fontWeight: 600 }}>#sec-ops · Live security operations</div>
    </div>
  );

  const messages = [
    <BotMsg step="DETECT" stepColor="#E11D48" time="10:42 AM">
      <Bold>🚨 Suspicious sign-in detected · <BrandText>@maya.chen</BrandText></Bold>
      <DataRow label="Location" value="Lagos, NG · impossible travel from Berlin (4 min ago)" alert />
      <DataRow label="Device" value="Unmanaged · new fingerprint" alert />
      <DataRow label="Risk" value="HIGH · 0.91" alert />
      <Muted>Reaching out to @maya.chen in DM to verify…</Muted>
    </BotMsg>,

    <BotMsg step="VERIFY" stepColor="#F59E0B" time="10:43 AM">
      <QuoteBlock accent="#0D41E1">
        Hey Maya — sign-in from <strong>Lagos, NG</strong> on an unmanaged device. Was that you?
        <PillRow items={["👍 Yes", "🚫 Not me"]} activeIndex={1} />
      </QuoteBlock>
      <div style={{ fontSize: 13.2, color: "#0D41E1", fontWeight: 700, marginTop: 8 }}>🚫 Maya Chen: "Not me. I'm in Berlin."</div>
    </BotMsg>,

    <BotMsg step="APPROVE" stepColor="#0D41E1" time="10:44 AM">
      <div style={{ fontSize: 13.2, color: "#475569", marginBottom: 8 }}>Compromise confirmed. <BrandText>@on-call-secops</BrandText> — 3 actions staged:</div>
      <ActionList items={["Revoke all active Okta sessions", "Force MFA re-enrollment + password reset", "Block source IP 102.89.34.221"]} />
      <div style={{ marginTop: 10 }}><DarkBtn>✓ Approve all</DarkBtn></div>
    </BotMsg>,

    <BotMsg step="DONE ✓" stepColor="#10B981" time="10:45 AM">
      <div style={{ fontSize: 14.4, fontWeight: 700, color: "#0D41E1", marginBottom: 8 }}>✅ Account secured in <span style={{ background: "#F0FDF4", padding: "1px 5px", borderRadius: 3, color: "#059669" }}>3m 12s</span></div>
      <ResultTable rows={[["Okta sessions revoked","12 sessions"],["MFA re-enrollment forced","next sign-in"],["Source IP blocked","102.89.34.221"],["Incident filed","INC-2148 · Jira"]]} />
    </BotMsg>
  ];

  return <MessageWindow header={header} messages={messages} inputPlaceholder="Message #sec-ops..." bg="#FFFFFF" isPaused={isPaused} interval={500} onComplete={onComplete} />;
}

// ─── TEAMS: False positive auto-closure ───────────────────────────
function TeamsMock({ isPaused, onComplete }: { isPaused?: boolean; onComplete: () => void }) {
  const header = (
    <div style={{ background: "#4F52B2", padding: "16px 20px", display: "flex", alignItems: "center", gap: 8 }}>
      <TrafficLights /><div style={{ fontSize: 12, color: "#FFFFFF", marginLeft: 6, fontWeight: 600 }}>Security Operations · General</div>
    </div>
  );

  const messages = [
    <BotMsg step="DETECT" stepColor="#F59E0B" time="02:17 AM" teamsColor="#4F52B2">
      <Bold>⚠️ Anomalous API activity · <span style={{ color: "#4F52B2" }}>svc-data-pipeline</span></Bold>
      <DataRow label="Source" value="CloudTrail · S3 bucket enumeration" />
      <DataRow label="Volume" value="847 API calls in 90s · 12× baseline" alert />
      <DataRow label="Time" value="02:17 AM · outside business hours" alert />
      <Muted>Cross-referencing against known activity patterns…</Muted>
    </BotMsg>,

    <BotMsg step="CORRELATE" stepColor="#0EA5E9" time="02:17 AM" teamsColor="#4F52B2">
      <div style={{ fontSize: 13.2, color: "#475569", lineHeight: 1.7, marginBottom: 8 }}>
        Matched against scheduled job registry:
      </div>
      <div style={{
        background: "#F8FAFC", border: "1px solid #E0E7FF",
        borderLeft: "3px solid #0EA5E9",
        borderRadius: 4, padding: "10px 12px",
      }}>
        <div style={{ fontSize: 13.2, fontWeight: 700, color: "#0369A1", marginBottom: 6 }}>📋 Scheduled Job Match</div>
        <DataRow label="Job" value="nightly-data-sync-v2" />
        <DataRow label="Schedule" value="02:15 AM UTC · daily" />
        <DataRow label="Owner" value="data-engineering@company.com" />
        <DataRow label="Last run" value="Yesterday · 02:15 AM · identical pattern" />
      </div>
      <Muted style={{ marginTop: 8 }}>Confidence: 98.4% · Classifying as false positive…</Muted>
    </BotMsg>,

    <BotMsg step="AUTO-CLOSED" stepColor="#10B981" time="02:17 AM" teamsColor="#4F52B2">
      <div style={{ fontSize: 14.4, fontWeight: 700, color: "#059669", marginBottom: 8 }}>
        ✅ False positive confirmed · Auto-suppressed
      </div>
      <div style={{
        background: "#F0FDF4", border: "1px solid #BBF7D0",
        borderRadius: 4, padding: "10px 12px", fontSize: 13.2, color: "#166534", marginBottom: 10,
      }}>
        No action required. Alert suppressed automatically.<br />
        <span style={{ fontSize: 12, color: "#4ADE80" }}>Zero UI mode · your team was not paged.</span>
      </div>
      <ResultTable rows={[["Alert classified","False positive · 98.4% confidence"],["Action taken","None · auto-suppressed"],["Rule updated","Pattern added to allowlist"],["Incident","Not filed · FP log updated"]]} accentColor="#059669" />
      <Muted style={{ marginTop: 8 }}>⏰ Your team slept undisturbed. Next alert will be real.</Muted>
    </BotMsg>
  ];

  return <MessageWindow header={header} messages={messages} inputPlaceholder="Type a new message..." bg="#F8FAFC" isPaused={isPaused} interval={500} onComplete={onComplete} />;
}

// ─── CLAUDE: Threat hunt with visualization ────────────────────────
function ClaudeMock({ isPaused, onComplete }: { isPaused?: boolean; onComplete: () => void }) {
  const header = (
    <div style={{ 
      display: "flex", justifyContent: "space-between", alignItems: "center", 
      padding: "16px 20px", borderBottom: "1px solid #E5E5E5", background: "#FAF9F6" 
    }}>
      <div style={{ fontSize: 14.4, fontWeight: 700, color: "#1A1A1A" }}>Trench Assistant</div>
      <div style={{ fontSize: 12, color: "#666666" }}>Model: Claude-3-Sonnet</div>
    </div>
  );

  const messages = [
    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
      <div style={{ background: "#0F172A", borderRadius: "12px 12px 0 12px", padding: "12px 16px", maxWidth: "80%", fontSize: 14.4, color: "#FFFFFF", lineHeight: 1.5 }}>
        Hunt for lateral movement patterns across all identities in the last 7 days. Focus on off-hours activity.
      </div>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontWeight: 600, fontSize: 14.4, flexShrink: 0 }}>U</div>
    </div>,

    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#D97757", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 600, fontSize: 14.4, flexShrink: 0 }}>C</div>
      <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "0 12px 12px 12px", padding: "16px" }}>
        <div style={{ fontSize: 13.2, color: "#475569", lineHeight: 1.7, marginBottom: 12 }}>
          Querying across <strong style={{ color: "#0F172A" }}>Okta</strong>, <strong style={{ color: "#0F172A" }}>Active Directory</strong>, <strong style={{ color: "#0F172A" }}>CrowdStrike</strong>, and <strong style={{ color: "#0F172A" }}>CloudTrail</strong> for the 7-day window. Looking for account-hopping, privilege escalation, and off-hours anomalies.
        </div>
        <div style={{ background: "#0F172A", borderRadius: 6, padding: "12px 14px", fontFamily: "monospace", fontSize: 12, color: "#4ADE80", lineHeight: 1.8 }}>
          <div style={{ color: "#64748B", marginBottom: 4 }}>// querying log sources</div>
          <div>→ Okta auth logs <span style={{ color: "#FBBF24" }}>168,420 events</span> ingested</div>
          <div>→ AD sign-in logs <span style={{ color: "#FBBF24" }}>94,112 events</span> ingested</div>
          <div>→ CrowdStrike telemetry <span style={{ color: "#FBBF24" }}>312,088 events</span> ingested</div>
          <div>→ CloudTrail <span style={{ color: "#FBBF24" }}>47,331 events</span> ingested</div>
          <div style={{ color: "#4ADE80", marginTop: 4 }}>✓ Correlation complete · 3 anomalies surfaced</div>
        </div>
        
        <div style={{ fontSize: 13.2, fontWeight: 700, color: "#0F172A", margin: "20px 0 12px 0" }}>
          🔍 Lateral movement pattern detected — 3 findings:
        </div>
        
        <LateralMovementGraph />

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { n: "01", title: "Account hop · svc-admin → dev-user-09", detail: "Tue 02:34 AM · same source IP · 4 min apart", severity: "HIGH", color: "#E11D48" },
            { n: "02", title: "Privilege escalation · dev-user-09 → root", detail: "Tue 02:38 AM · via sudo · CloudTrail confirms", severity: "CRITICAL", color: "#DC2626" },
            { n: "03", title: "Unusual S3 access · 3 buckets in 8 min", detail: "Tue 02:39–02:47 AM · production data buckets", severity: "HIGH", color: "#E11D48" },
          ].map((f) => (
            <div key={f.n} style={{
              border: `1px solid ${f.color}22`,
              borderLeft: `3px solid ${f.color}`,
              borderRadius: 6, padding: "12px 14px",
              background: f.color + "08",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ fontSize: 13.2, fontWeight: 700, color: "#0F172A" }}>{f.n}. {f.title}</div>
                <div style={{ fontSize: 9.6, color: f.color, background: f.color + "15", padding: "2px 6px", borderRadius: 3, letterSpacing: "0.1em", fontWeight: 700 }}>{f.severity}</div>
              </div>
              <div style={{ fontSize: 12, color: "#64748B" }}>{f.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
      <div style={{ background: "#0F172A", borderRadius: "12px 12px 0 12px", padding: "12px 16px", maxWidth: "80%", fontSize: 14.4, color: "#FFFFFF", lineHeight: 1.5 }}>
        Is src-host-42 still active? What should I do?
      </div>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", fontWeight: 600, fontSize: 14.4, flexShrink: 0 }}>U</div>
    </div>,

    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#D97757", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 600, fontSize: 14.4, flexShrink: 0 }}>C</div>
      <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "0 12px 12px 12px", padding: "16px" }}>
        <div style={{ fontSize: 13.2, color: "#475569", lineHeight: 1.7, marginBottom: 12 }}>
          <strong style={{ color: "#0F172A", fontFamily: "monospace" }}>src-host-42</strong> last seen <strong style={{ color: "#E11D48" }}>14 minutes ago</strong> — still active. I recommend immediate action:
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {[
            "Isolate src-host-42 from the network now",
            "Revoke sessions for dev-user-09 and svc-admin",
            "Preserve CloudTrail + CrowdStrike logs for forensics"
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: 13.2, color: "#475569" }}>
              <span style={{ color: "#94A3B8", flexShrink: 0 }}>{i + 1}.</span>{item}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ background: "#0F172A", color: "#FFFFFF", padding: "8px 16px", borderRadius: 4, fontSize: 13.2, fontWeight: 600, cursor: "pointer" }}>
            Execute all three
          </div>
          <div style={{ background: "#FFFFFF", color: "#64748B", border: "1px solid #E2E8F0", padding: "8px 16px", borderRadius: 4, fontSize: 13.2, fontWeight: 600, cursor: "pointer" }}>
            Show full timeline
          </div>
        </div>
      </div>
    </div>
  ];

  return <MessageWindow header={header} messages={messages} inputPlaceholder="Message Trench Assistant..." bg="#FAF9F6" inputBg="#FAF9F6" isPaused={isPaused} interval={500} onComplete={onComplete} />;
}


function LateralMovementGraph() {
  const nodes = [
    { id: "entry", label: "src-host-42", sub: "Entry point", x: 40, y: 60, color: "#E11D48", size: 28 },
    { id: "svc", label: "svc-admin", sub: "02:34 AM", x: 160, y: 30, color: "#F59E0B", size: 24 },
    { id: "dev", label: "dev-user-09", sub: "02:38 AM", x: 280, y: 60, color: "#E11D48", size: 24 },
    { id: "root", label: "root", sub: "privilege esc", x: 400, y: 30, color: "#DC2626", size: 28 },
    { id: "s3", label: "S3 buckets", sub: "02:39–02:47", x: 400, y: 95, color: "#DC2626", size: 24 },
  ];
  const edges = [
    { from: { x: 54, y: 58 }, to: { x: 148, y: 36 } },
    { from: { x: 180, y: 42 }, to: { x: 268, y: 58 } },
    { from: { x: 294, y: 52 }, to: { x: 388, y: 36 } },
    { from: { x: 294, y: 68 }, to: { x: 388, y: 88 } },
  ];

  return (
    <div style={{ background: "#0F172A", borderRadius: 6, padding: "16px 12px", marginBottom: 4 }}>
      <div style={{ fontSize: 9.6, color: "#64748B", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>
        Lateral movement · Tue 02:34–02:47 AM
      </div>
      <svg width="100%" height="130" viewBox="0 0 460 130" style={{ overflow: "visible" }}>
        {/* Edges */}
        {edges.map((e, i) => (
          <g key={i}>
            <line x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y} stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3"/>
            <polygon
              points={`${e.to.x},${e.to.y} ${e.to.x - 6},${e.to.y - 3} ${e.to.x - 6},${e.to.y + 3}`}
              fill="#334155"
              transform={`rotate(${Math.atan2(e.to.y - e.from.y, e.to.x - e.from.x) * 180 / Math.PI}, ${e.to.x}, ${e.to.y})`}
            />
          </g>
        ))}
        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.size / 2 + 4} fill={n.color + "15"} />
            <circle cx={n.x} cy={n.y} r={n.size / 2} fill={n.color + "30"} stroke={n.color} strokeWidth="1.5"/>
            <text x={n.x} y={n.y + 4} textAnchor="middle" fill={n.color} fontSize="7" fontWeight="700" fontFamily="var(--font-secondary), DM Mono, monospace">
              {n.id === "root" ? "root" : n.id === "s3" ? "S3" : n.id === "entry" ? "host" : n.label.slice(0, 6)}
            </text>
            <text x={n.x} y={n.y + n.size / 2 + 12} textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="var(--font-secondary), DM Mono, monospace">
              {n.label}
            </text>
            <text x={n.x} y={n.y + n.size / 2 + 21} textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="var(--font-secondary), DM Mono, monospace">
              {n.sub}
            </text>
          </g>
        ))}
        {/* Time axis */}
        <line x1="20" y1="120" x2="440" y2="120" stroke="#1E293B" strokeWidth="1"/>
        <text x="20" y="128" fill="#64748B" fontSize="7" fontFamily="var(--font-secondary), DM Mono, monospace">02:34</text>
        <text x="400" y="128" fill="#64748B" fontSize="7" fontFamily="var(--font-secondary), DM Mono, monospace">02:47 AM</text>
      </svg>
    </div>
  );
}

// ─── SHARED COMPONENTS ──────────────────────────────────────────────
function BotMsg({ step, stepColor, time, teamsColor, children }: any) {
  const bg = teamsColor || "#0F172A";
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 800, flexShrink: 0 }}>T</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 14.4, fontWeight: 800, color: "#0F172A" }}>Trench</span>
          <span style={{ fontSize: 9.6, color: "#fff", background: stepColor, padding: "2px 7px", borderRadius: 3, letterSpacing: "0.1em", fontWeight: 700 }}>{step}</span>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>{time}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function ClaudeMsg({ children }: any) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#D97757", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 800, flexShrink: 0 }}>C</div>
      <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "0 8px 8px 8px", padding: "12px 14px" }}>
        {children}
      </div>
    </div>
  );
}

function UserMsg({ children }: any) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
      <div style={{ background: "#0F172A", borderRadius: "8px 0 8px 8px", padding: "10px 14px", maxWidth: "72%", fontSize: 13.2, color: "#FFFFFF", lineHeight: 1.6 }}>
        {children}
      </div>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#64748B", fontWeight: 800, flexShrink: 0 }}>U</div>
    </div>
  );
}

function TrafficLights() {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {["#EF4444","#F59E0B","#10B981"].map((c,i) => <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }}/>)}
    </div>
  );
}

function DataRow({ label, value, alert }: any) {
  return (
    <div style={{ display: "flex", gap: 12, fontSize: 13.2, marginBottom: 4 }}>
      <span style={{ color: "#94A3B8", minWidth: 72, flexShrink: 0 }}>{label}</span>
      <span style={{ color: alert ? "#E11D48" : "#475569", fontWeight: alert ? 700 : 500 }}>{value}</span>
    </div>
  );
}

function QuoteBlock({ children, accent }: any) {
  return (
    <div style={{ background: "#F8FAFC", borderLeft: `3px solid ${accent || "#0D41E1"}`, padding: "8px 10px", fontSize: 13.2, color: "#475569", lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

function PillRow({ items, activeIndex }: any) {
  return (
    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
      {items.map((item: any, i: number) => (
        <div key={i} style={{
          padding: "4px 10px", border: `1px solid ${i === activeIndex ? "#0D41E1" : "#E2E8F0"}`,
          borderRadius: 4, fontSize: 12, fontWeight: 600,
          color: i === activeIndex ? "#0D41E1" : "#64748B",
          background: i === activeIndex ? "#E0E7FF" : "#FFFFFF",
        }}>{item}</div>
      ))}
    </div>
  );
}

function ActionList({ items }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {items.map((item: any, i: number) => (
        <div key={i} style={{ display: "flex", gap: 8, fontSize: 13.2, color: "#475569" }}>
          <span style={{ color: "#94A3B8", flexShrink: 0 }}>{i + 1}.</span>{item}
        </div>
      ))}
    </div>
  );
}

function ResultTable({ rows, accentColor }: any) {
  const color = accentColor || "#0D41E1";
  return (
    <div>
      {rows.map(([l, v]: any, i: number) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.2, color: "#475569", borderBottom: "1px solid #F8FAFC", padding: "5px 0" }}>
          <span>{l}</span><span style={{ color, fontSize: 12, fontWeight: 600 }}>✓ {v}</span>
        </div>
      ))}
    </div>
  );
}

function Bold({ children }: any) {
  return <div style={{ fontSize: 14.4, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{children}</div>;
}

function BrandText({ children }: any) {
  return <span style={{ color: "#0D41E1", fontWeight: 600 }}>{children}</span>;
}

function Muted({ children, style }: any) {
  return <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 8, fontStyle: "italic", ...style }}>{children}</div>;
}

function DarkBtn({ children }: any) {
  return (
    <button style={{ background: "#0D41E1", color: "#FFFFFF", border: "none", borderRadius: 4, padding: "8px 14px", fontSize: 13.2, fontFamily: "var(--font-secondary), 'DM Mono', monospace", fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}>
      {children}
    </button>
  );
}

function GhostBtn({ children }: any) {
  return (
    <button style={{ background: "transparent", color: "#64748B", border: "1px solid #E2E8F0", borderRadius: 4, padding: "8px 14px", fontSize: 13.2, fontFamily: "var(--font-secondary), 'DM Mono', monospace", cursor: "pointer", fontWeight: 600 }}>
      {children}
    </button>
  );
}

function TabIcon({ id, active }: any) {
  const getIcon = () => {
    switch (id) {
      case "slack": return "/integrations/slack.png";
      case "teams": return "/integrations/microsoft teams.png";
      case "claude": return "/integrations/claude-color.png";
      default: return "";
    }
  };

  return (
    <div style={{ 
      width: 16, height: 16, 
      display: "flex", alignItems: "center", justifyContent: "center", 
      transition: "all 0.15s",
      opacity: active ? 1 : 0.45,
      filter: active ? "none" : "grayscale(100%)",
    }}>
      <img src={getIcon()} alt={id} width={16} height={16} style={{ display: "block", objectFit: "contain" }} />
    </div>
  );
}
