// Homepage FAQ copy. Shared by the FAQ section and the FAQPage JSON-LD that
// scripts/prerender-seo.ts emits, so the page and the structured data never drift.

export const faqItems = [
  {
    q: 'What is Trench?',
    a: 'Trench is an AI-native SIEM platform with built-in agents for cloud-native security teams. It unifies data ingestion, threat detection, investigation, hunting and response into one platform, replacing the manual workflows and legacy tools that slow your team down.',
  },
  {
    q: 'Does Trench work with my existing security stack?',
    a: 'Yes. Trench seamlessly integrates into your security stack working alongside your existing SIEM or replacing it entirely. Agentlessly connecting across cloud, endpoint, identity, email, network, and SaaS tools.',
  },
  {
    q: 'Can Trench replace my existing SIEM?',
    a: 'Yes, completely. Trench handles ingestion, detection, and response in one AI-native platform. Most teams are fully operational within 2 weeks at half their current SIEM cost. The platform is compliance friendly for your regulations and auditors.',
  },
  {
    q: 'How are the Trench AI agents different from static detection rules?',
    a: 'Traditional rules are written once and go stale fast. Trench\'s Intent Graph continuously maps attacker behavior across your environment, auto-generating, tuning, and deploying detections in real time. Your team reviews. The Mesh layer of agents do the rest.',
  },
  {
    q: 'We only have 2–3 people in security operations. Is Trench built for us?',
    a: 'That\'s exactly who Trench is built for. A lean team running Trench gets the detection coverage, investigation depth, and response speed of an enterprise SOC, without the headcount, service provider, complexity, or cost.',
  },
]
