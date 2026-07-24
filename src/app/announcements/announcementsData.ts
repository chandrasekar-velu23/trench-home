/* =========================================
   Central Announcements Data
   Add new announcements here — they will
   automatically appear on the listing page
   and get their own detail page.
   ========================================= */

export type ContentBlock =
  | { type: "intro" | "paragraph" | "heading" | "closing"; text: string }
  | { type: "list"; items: string[] }
  | { type: "innovations"; items: { label: string; desc: string }[] };

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
        type: "intro",
        text: "Trench Security is a 2026 Product Awards winner, recognized by Products That Count, the world's largest product community.",
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
