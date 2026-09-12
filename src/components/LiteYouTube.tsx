import { useState, type CSSProperties } from 'react'

type Props = {
  id: string
  title: string
  /** Fill a positioned parent (absolute, inset 0) instead of sizing itself 16:9. */
  fill?: boolean
  /** Above the fold: load the thumbnail eagerly at high priority (it is the LCP image). */
  priority?: boolean
}

/**
 * Click-to-play YouTube embed ("facade"). Shows a self-hosted copy of the
 * video's thumbnail (public/videos/<id>-480.webp and -960.webp) and a play
 * button. Nothing is requested from YouTube — and none of its ~1 MB of player
 * JavaScript loads — until the visitor clicks. Search engines still find and
 * index the video through the VideoObject JSON-LD and video-sitemap entry the
 * prerender emits for the page (seo/videos.ts).
 */
export default function LiteYouTube({ id, title, fill, priority }: Props) {
  const [playing, setPlaying] = useState(false)
  const box: CSSProperties = fill
    ? { position: 'absolute', inset: 0 }
    : { position: 'relative', width: '100%', aspectRatio: '16 / 9' }

  return (
    <div className="lite-youtube" style={{ ...box, background: '#0b1126', overflow: 'hidden' }}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <button
          type="button"
          className="lite-youtube-btn"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}
        >
          <img
            src={`/videos/${id}-480.webp`}
            srcSet={`/videos/${id}-480.webp 480w, /videos/${id}-960.webp 960w`}
            sizes="(max-width: 768px) 100vw, 800px"
            alt=""
            width={1280}
            height={720}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <span
            aria-hidden="true"
            className="lite-youtube-play"
            style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: 68, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.2s ease',
            }}
          >
            <svg width="22" height="24" viewBox="0 0 22 24" fill="#FFFFFF">
              <path d="M21 12 1 23.5V.5z" />
            </svg>
          </span>
        </button>
      )}
      <style>{`
        .lite-youtube-play { background-color: rgba(15, 17, 26, 0.78); }
        .lite-youtube-btn:hover .lite-youtube-play,
        .lite-youtube-btn:focus-visible .lite-youtube-play { background-color: #3152B9; }
        .lite-youtube-btn:focus-visible { outline: 3px solid #E67E41; outline-offset: -3px; }
      `}</style>
    </div>
  )
}
