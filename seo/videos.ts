// YouTube videos embedded on each page. The pages show a click-to-play facade
// (src/components/LiteYouTube.tsx), so scripts/prerender-seo.ts emits a
// schema.org VideoObject and a video-sitemap entry for each one — that is how
// search engines find and index a video the page doesn't load until clicked.
//
// Titles, upload dates and durations were read from each video's YouTube page.

export type VideoMeta = {
  id: string
  name: string
  description: string
  /** ISO 8601, as published on YouTube */
  uploadDate: string
  durationSeconds: number
}

export const PAGE_VIDEOS: Record<string, VideoMeta[]> = {
  '/resources/webinars': [
    {
      id: 'qS4_wimD8Eo',
      name: 'Why AI is the top of mind for Risk management leaders | Subhro',
      description:
        'Risk management leaders share their top of mind and insights in the AI transformation process, how organisations are rethinking risk frameworks in a world where AI is both the tool and the threat surface.',
      uploadDate: '2025-08-24T22:38:11-07:00',
      durationSeconds: 1649,
    },
    {
      id: 'dwdJ0cXDNks',
      name: 'AI adoption in Security Operations | Mayank',
      description:
        'Deep dive discussion on AI adoption trends and operational challenges in modern Security Operations, from alert fatigue to autonomous response, what actually works in practice.',
      uploadDate: '2025-08-25T23:15:54-07:00',
      durationSeconds: 2862,
    },
    {
      id: 'xZPAxU_HhGc',
      name: 'CISO Chronicles in the AI Era - Sammit',
      description:
        'Chronicles and strategic perspectives of leading CISOs guiding their organisations through the AI era, governance, trust, and the board-level conversation around AI-native security.',
      uploadDate: '2026-01-17T23:48:32-08:00',
      durationSeconds: 1940,
    },
  ],
  '/resources/community': [
    {
      id: 'AEnT-jVCr-4',
      name: 'Trench BPL Founding Edition, BLR',
      description:
        'A community event hosted by Trench inviting infosec leaders and senior practitioners for a gamified critical thinking evening.',
      uploadDate: '2026-06-21T22:06:46-07:00',
      durationSeconds: 296,
    },
  ],
  '/case-studies/ocrolus': [
    {
      id: 'PJxtlsN3BgA',
      name: 'How Ocrolus Scales Security with Trench’s AI Native SIEM & SOC Platform',
      description:
        'How Ocrolus, an AI-native fintech infrastructure company, replaced its legacy SIEM with the Trench AI-native SIEM and SOC platform.',
      uploadDate: '2026-08-02T06:47:57-07:00',
      durationSeconds: 238,
    },
  ],
}

/** 1649 -> "PT27M29S" */
export const isoDuration = (seconds: number) =>
  `PT${Math.floor(seconds / 3600) ? `${Math.floor(seconds / 3600)}H` : ''}${Math.floor((seconds % 3600) / 60)}M${seconds % 60}S`
