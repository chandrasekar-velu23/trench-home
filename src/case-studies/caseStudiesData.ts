// Listing data for /case-studies. The detail pages keep their own content and
// their existing URLs (/case-studies/<slug>) — those links are already shared
// externally and must not change. Copy below is taken from each detail page.
// Also read by scripts/prerender-seo.ts for the page's ItemList JSON-LD.

export type CaseStudy = {
  slug: string
  href: string
  company: string
  logo: string
  title: string
  summary: string
  metrics: { value: string; label: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ocrolus',
    href: '/case-studies/ocrolus',
    company: 'Ocrolus',
    logo: '/customers/ocrolus-logo-1.png',
    title: 'How Ocrolus Built Its Trench',
    summary:
      'Replacing a legacy SIEM with an agentic SecOps engine: from a solid data foundation to a fully headless, agentic security operation running 24x7 on the Trench Agentic Operating System.',
    metrics: [
      { value: '2X', label: 'ROI on security operations' },
      { value: '100%', label: 'Detection coverage incl. AI workloads' },
      { value: '< 10 min', label: 'Alert triage & investigation SLA' },
    ],
  },
  {
    slug: 'sbfe',
    href: '/case-studies/sbfe',
    company: 'SBFE',
    logo: '/customers/SBFE.png',
    title: 'How SBFE Built Its Trench: Actionable SecOps for U.S. Small Business Financial Exchange',
    summary:
      'From a legacy SIEM and manual SOC workflows to a fully headless, integrated agentic security operation with 24x7 monitoring.',
    metrics: [
      { value: 'One Platform', label: 'Agentic SIEM + SOC: detection, investigation, and response unified' },
      { value: '< 10 min', label: 'Every escalation arrives with full context and a clear recommended action' },
      { value: '24x7', label: 'Autonomous coverage, no shift gaps' },
    ],
  },
  {
    slug: 'whatfix',
    href: '/case-studies/whatfix',
    company: 'Whatfix',
    logo: '/customers/Whatfix.svg',
    title: 'How Whatfix Built Its Trench: Headless SecOps, One Decision Layer',
    summary:
      "The complete SecOps engine (detection, investigation, hunting and response) runs inside the collaboration layer where Whatfix's team already works. No dedicated console. No context switching.",
    metrics: [
      { value: '100%', label: 'SecOps workflows automated on Slack' },
      { value: '< 10 min', label: 'Across all SLAs' },
      { value: '24x7', label: 'Resilience' },
    ],
  },
]
