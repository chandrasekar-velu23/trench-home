// Per-route SEO metadata. Consumed by scripts/prerender-seo.ts to emit static
// HTML, JSON-LD, sitemap.xml and llms.txt, and by src/components/RouteEffects
// to keep <head> in step during in-app navigation. Values mirror
// MIGRATION-AUDIT.md section 8.2 so the new site keeps the exact titles,
// descriptions and canonicals Google has indexed.

export const SITE_URL = 'https://www.trenchsecurity.ai'
export const SITE_NAME = 'Trench Security'
export const TITLE_TEMPLATE = (t: string) => `${t} | Trench Security`
export const DEFAULT_TITLE = 'Trench | Agentic OS for Actionable SecOps'
export const DEFAULT_DESCRIPTION =
  "Trench is the new operating system for security operations. An agentic platform that does what your SIEM can't and your SOC never gets to, automatically."
export const DEFAULT_OG_IMAGE = '/logo/trench-og-image.png'

/** Emitted as schema.org JobPosting. datePosted comes from the old repo's git history. */
export type JobMeta = {
  title: string
  datePosted: string
  employmentType: 'FULL_TIME' | 'INTERN'
}

export type RouteMeta = {
  path: string
  title: string // already fully formed — no template applied
  description: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  job?: JobMeta
}

export const STATIC_ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  {
    path: '/why-trench',
    title: TITLE_TEMPLATE('Why Trench'),
    description:
      'Security Operations is a systems design problem. Not a monitoring problem. Learn why we built Trench to fix it.',
  },
  {
    path: '/how-it-works',
    title: TITLE_TEMPLATE('How It Works'),
    description:
      'Trench simplifies security operations by unifying visibility, detection, and response into a single, automated workflow.',
  },
  {
    path: '/integrations',
    title: TITLE_TEMPLATE('Integrations'),
    description:
      'Agentless, API-native integrations across your entire security stack. Trench connects to your tools in minutes — no agents, no friction.',
  },
  {
    path: '/for-mssps',
    title: TITLE_TEMPLATE('MSSPs'),
    description:
      'Offer your clients the new operating system for Security Operations. Co-sell Trench and deliver Headless SecOps to every client, without rebuilding your delivery model.',
  },
  {
    path: '/connect',
    title: TITLE_TEMPLATE('Connect'),
    description:
      'You cannot run a modern security operation on a legacy system. Let us show you what the new operating system looks like for your stack.',
  },
  {
    path: '/career',
    title: TITLE_TEMPLATE('Careers'),
    description: 'Join Trench and help us build the future of agentic security operations.',
  },
  {
    path: '/career/ai-lead-security-rd',
    title: TITLE_TEMPLATE('AI Lead, Security R&D | Careers'),
    description:
      'Join Trench as AI Lead, Security R&D and build the technical foundation behind agentic Security Operations.',
    job: { title: 'AI Lead, Security R&D', datePosted: '2026-08-20', employmentType: 'FULL_TIME' },
  },
  {
    path: '/career/ai-ml-lead',
    title: TITLE_TEMPLATE('AI/ML Lead, Applied AI for Security | Careers'),
    description:
      "Join Trench as AI/ML Lead, Applied AI for Security and build the models that power Trench's detection brain.",
    job: { title: 'AI/ML Lead, Applied AI for Security', datePosted: '2026-08-20', employmentType: 'FULL_TIME' },
  },
  {
    path: '/career/lead-agentic-secops',
    title: TITLE_TEMPLATE('Lead, Agentic SecOps | Careers'),
    description:
      'Join Trench as Lead, Agentic SecOps and drive customer transformation from traditional SOC to an agentic operating model.',
    job: { title: 'Lead, Agentic SecOps', datePosted: '2026-08-20', employmentType: 'FULL_TIME' },
  },
  {
    path: '/career/product-marketing-intern',
    title: TITLE_TEMPLATE('Product Marketing Intern | Careers'),
    description:
      "Join Trench as a Product Marketing Intern and own Trench's voice and product messaging.",
    job: { title: 'Product Marketing Intern', datePosted: '2026-07-02', employmentType: 'INTERN' },
  },
  {
    path: '/blog',
    title: TITLE_TEMPLATE('Blog'),
    description:
      'Insights, research, and perspectives on AI-native SecOps, agentic automation, and the future of security operations — for security champions who think differently.',
    image: '/blog-cover-images/introducing-headless-secops-for-the-agentic-world.webp',
  },
  {
    path: '/announcements',
    title: 'Announcements | Trench Security',
    description:
      'Stay up to date with the latest news, awards, and milestones from Trench Security — the agentic SecOps platform built for actionable threat detection and response.',
    image: '/awards/2025 Products Awards Winner.png',
  },
  {
    path: '/case-studies/ocrolus',
    title: TITLE_TEMPLATE('Ocrolus Case Study'),
    description:
      'How Ocrolus modernised security operations with Trench — faster detection, less noise, and a lean team operating like an enterprise SOC.',
  },
  {
    path: '/case-studies/sbfe',
    title: TITLE_TEMPLATE('SBFE Case Study'),
    description:
      "How SBFE cut alert noise and accelerated investigation with Trench's agentic SecOps platform.",
  },
  {
    path: '/case-studies/whatfix',
    title: TITLE_TEMPLATE('Whatfix Case Study'),
    description:
      'How Whatfix scaled threat detection and response without scaling headcount, using Trench.',
  },
  {
    path: '/case-studies',
    title: TITLE_TEMPLATE('Case Studies'),
    description:
      'How Ocrolus, SBFE and Whatfix replaced legacy SIEMs and manual SOC workflows with the Trench Agentic Operating System: the approach, and the results.',
  },
  {
    path: '/resources/trench-labs',
    title: TITLE_TEMPLATE('Trench Labs'),
    description:
      'Original security research, threat reports and technical deep dives from the Trench Labs team.',
  },
  {
    path: '/resources/webinars',
    title: TITLE_TEMPLATE('Webinars'),
    description:
      'On-demand webinars on agentic SecOps, AI-native detection engineering and modern SOC operating models.',
  },
  {
    path: '/resources/community',
    title: TITLE_TEMPLATE('Community'),
    description:
      'Join the Trench security community — the BlueTeam Premier League, events and practitioner meetups.',
  },
  {
    path: '/resources/community/bpl-signup',
    title: TITLE_TEMPLATE('BlueTeam Premier League Signup'),
    description:
      "Sign up for the BlueTeam Premier League — Trench's community competition for security practitioners.",
  },
  {
    path: '/resources/events',
    title: TITLE_TEMPLATE('Events'),
    description:
      'Upcoming and past Trench Security events, conferences and community meetups.',
  },
  {
    path: '/newsletter-signup',
    title: TITLE_TEMPLATE('Subscribe to Trench Digest'),
    description:
      'Get weekly zero-day breakdowns, cloud defense blueprints, and actionable security insights—straight from the digital trenches.',
  },
  {
    path: '/newsletter-signout',
    title: TITLE_TEMPLATE('Unsubscribe from Trench Digest'),
    description: 'Unsubscribe from the Trench Security newsletter.',
  },
  {
    // Excluded from the sitemap on the old site; pricing tiers are commercially
    // sensitive. Prerendered so the page works, but kept out of the index.
    path: '/pricing',
    title: TITLE_TEMPLATE('Pricing'),
    description: 'Trench pricing and packaging.',
    noindex: true,
  },
]
