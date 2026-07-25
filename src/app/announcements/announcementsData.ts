/* =========================================
   Central Announcements Data
   Add new announcements here — they will
   automatically appear on the listing page
   and get their own detail page.
   ========================================= */

export type RichSegment = { text: string; href?: string; external?: boolean };

export type ContentBlock =
  | { type: "intro" | "paragraph" | "heading" | "closing"; text: string }
  | { type: "richIntro"; segments: RichSegment[] }
  | { type: "list"; items: string[] }
  | { type: "innovations"; items: { label: string; desc: string }[] }
  | { type: "button"; text: string; href: string; external?: boolean };

export interface Announcement {
  slug: string;
  date: string;
  publishedISO: string;
  category: string;
  categoryColor: "accent" | "primary" | "secondary";
  title: string;
  excerpt: string;          // Short summary shown on listing card
  coverImage: string | null; // Path relative to /public or null
  coverImageAlt: string;
  badge: string | null;     // Award badge image (shown inside detail page)
  badgeAlt: string;
  seoDescription: string;
  content: ContentBlock[];
}

export const announcementsData: Announcement[] = [
  {
    slug: "trench-ai-now-available-on-microsoft-marketplace",
    date: "April 2026",
    publishedISO: "2026-04-02",
    category: "Product",
    categoryColor: "primary",
    title: "Trench AI Now Available on Microsoft Marketplace",
    excerpt:
      "Deploy Trench AI seamlessly alongside Microsoft Sentinel or as a standalone AI SIEM accelerating threat detection, investigation, and response in minutes.",
    coverImage: "/blog-cover-images/trench-ai-now-available-on-microsoft-marketplace.webp",
    coverImageAlt: "Trench AI on Microsoft Marketplace",
    badge: null,
    badgeAlt: "",
    seoDescription:
      "Deploy Trench AI seamlessly alongside Microsoft Sentinel or as a standalone AI SIEM accelerating threat detection, investigation, and response in minutes.",
    content: [
      {
        type: "richIntro",
        segments: [
          { text: "We are excited to announce that " },
          {
            text: "Trench AI is now available on the Microsoft Marketplace",
            href: "https://marketplace.microsoft.com/en-us/product/trenchdragonai.trenchonms?tab=Overview",
            external: true,
          },
          {
            text: ", bringing next-generation, AI-native SecOps directly into the Microsoft Azure ecosystem.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "This means organizations can now deploy Trench AI seamlessly alongside Microsoft Sentinel or as a standalone AI SIEM accelerating threat detection, investigation, and response in minutes, not weeks.",
      },
      {
        type: "heading",
        text: "Why This Matters",
      },
      {
        type: "paragraph",
        text: "In the age of AI-driven attacks, velocity is everything.",
      },
      {
        type: "list",
        items: [
          "Attacks are deployed in minutes",
          "Detection still takes days or weeks",
          "Most breaches occur in this latency gap",
        ],
      },
      {
        type: "paragraph",
        text: "Trench AI exists to close that gap. Our mission is simple: Bring velocity to security teams to defend against AI-powered threats.",
      },
      {
        type: "heading",
        text: "For Teams Using Microsoft Sentinel",
      },
      {
        type: "paragraph",
        text: "If you're already running Microsoft Sentinel, Trench AI acts as an intelligent automation layer on top. What you get:",
      },
      {
        type: "list",
        items: [
          "Real-time detections powered by AI agents (not static rules)",
          "Autonomous threat hunting across critical assets",
          "Enriched investigations with contextual intelligence",
          "Dynamic response workflows with automated playbooks",
        ],
      },
      {
        type: "paragraph",
        text: "Think of it as: Turning Sentinel from a monitoring system into an autonomous SecOps engine controlled by your lean security engineers or analysts.",
      },
      {
        type: "heading",
        text: "For Teams Without Sentinel",
      },
      {
        type: "paragraph",
        text: "No SIEM? No problem. Trench AI offers a next-generation AI SIEM with built-in:",
      },
      {
        type: "list",
        items: [
          "Threat Detection",
          "Autonomous Hunting",
          "Investigation Automation",
          "Response Orchestration",
        ],
      },
      {
        type: "paragraph",
        text: "Native Integrations: Microsoft Azure services, Microsoft 365, Microsoft Entra, Log Analytics pipelines. All deployable in minutes from the Marketplace.",
      },
      {
        type: "heading",
        text: "What Makes Trench AI Different",
      },
      {
        type: "innovations",
        items: [
          {
            label: "1. AI-Native Threat Detection Mesh",
            desc: "Not rules. Not static correlation. A dynamic detection layer powered by intelligent agents that adapt in real-time, learn from exposure and telemetry, and use an intent graph based detention system that continuously redefine anomalies from dynamic baselining.",
          },
          {
            label: "2. 80% SecOps Automation (Out of the Box)",
            desc: "Trench AI is purpose-built for lean security teams: Automates majority of Tier-1 / Tier-2 workflows, eliminates alert fatigue, and lets teams focus on tuning intelligence, not on creating detection rules or chasing alerts.",
          },
          {
            label: "3. Built for Velocity",
            desc: "Velocity is the biggest risk to your data. Trench flips the equation: From weeks to minutes in detection, from manual to autonomous workflows, and from reactive to real-time defense.",
          },
        ],
      },
      {
        type: "heading",
        text: "Get Started in Minutes",
      },
      {
        type: "paragraph",
        text: "With Microsoft Marketplace integration, you can now:",
      },
      {
        type: "list",
        items: [
          "Deploy Trench AI instantly",
          "Integrate with existing Azure & security stack",
          "Start automating detections and response workflows immediately",
        ],
      },
      {
        type: "paragraph",
        text: "AI has fundamentally changed the speed of attacks. Security teams can no longer rely on legacy SIEMs and manual workflows to keep up.",
      },
      {
        type: "closing",
        text: "Trench AI delivers what's missing: velocity with intelligence. Autonomous agents, real-time detections, and intent-graph driven intelligence.",
      },
      {
        type: "button",
        text: "Get Trench AI on Microsoft Marketplace",
        href: "https://marketplace.microsoft.com/en-us/product/trenchdragonai.trenchonms?tab=Overview",
        external: true,
      },
    ],
  },
  {
    slug: "products-that-count-2026",
    date: "July 2026",
    publishedISO: "2026-07-24",
    category: "Award",
    categoryColor: "accent",
    title:
      "Trench Security Wins a 2026 Product Award for its Innovation in Cybersecurity",
    excerpt:
      "Trench Security is a 2026 Product Awards winner, recognized by Products That Count, the world's largest product community.",
    coverImage: "/awards/2025 Products Awards Winner.png",
    coverImageAlt: "2026 Products That Count Award Winner",
    badge: "/awards/2025 Products Awards Winner.png",
    badgeAlt: "2026 Products That Count Award Winner Badge",
    seoDescription:
      "Trench Security wins a 2026 Product Award from Products That Count for its innovation in cybersecurity — headless SecOps, intent graph detection, and TASC.",
    content: [
      {
        type: "richIntro",
        segments: [
          {
            text: "Trench Security",
            href: "https://www.linkedin.com/company/trenchsecurity/",
            external: true,
          },
          {
            text: " is a 2026 Product Awards winner, recognized by ",
          },
          {
            text: "Products That Count",
            href: "https://www.linkedin.com/company/products-that-count/",
            external: true,
          },
          {
            text: ", the world's largest product community.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Two convictions have guided the Trench journey from day one:",
      },
      {
        type: "list",
        items: [
          "Pick the problem that's genuinely hard.",
          "Build empathetic systems for the people who have to use them.",
        ],
      },
      {
        type: "paragraph",
        text: "Cybersecurity has a gap most industries don't: an adversary that innovates faster than defenders do. That makes value creation a moving target. Threat detection and response has always been broken because monitoring infrastructure was never built for that asymmetry. Trench was built to take on this problem because it's unforgiving, and unforgiving problems are the ones worth solving.",
      },
      {
        type: "paragraph",
        text: "For security teams, empathy comes down to one thing: actionability. It's also the hardest thing to deliver, buried under a mountain of noisy security data. So Trench was built around a single design principle: make actionability the outcome, not an afterthought.",
      },
      {
        type: "heading",
        text: "What's Behind the Award",
      },
      {
        type: "paragraph",
        text: "That design principle shows up in three innovations at the core of the Trench platform:",
      },
      {
        type: "innovations",
        items: [
          {
            label: "Headless SecOps delivery model",
            desc: "A shift away from dashboards and human-gated queues toward an agentic operating model, where AI agents act on threats directly instead of routing everything through a human-in-the-loop bottleneck.",
          },
          {
            label: "Intent graph-based threat detection",
            desc: "Instead of matching signatures or static rules, Trench maps the intent behind activity across an environment, connecting related signals into a graph that reveals what an adversary is actually trying to do.",
          },
          {
            label: "TASC, the world's first semantic layer for security",
            desc: "A layer that gives raw security data shared meaning and context across tools and sources, so detection and response can act on understanding rather than isolated alerts.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Together, these are what turn actionability from a stated goal into a built-in outcome and they're the reason Products That Count recognized Trench this year.",
      },
      {
        type: "closing",
        text: "This recognition from Products That Count validates that bet. Credit goes to the entire Trench Security team. Building products that count, always.",
      },
    ],
  },
];
