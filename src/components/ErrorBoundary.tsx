import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Clears a caught error when it changes — pass the route path. */
  resetKey?: string
}

type State = { error: Error | null }

// A deploy replaces the hashed page chunks, so a tab left open on the old
// build fails its next lazy import. One reload picks up the new build.
const CHUNK_ERROR = /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i
const RELOAD_FLAG = 'trench:chunk-reload'

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)

    if (CHUNK_ERROR.test(String(error?.message))) {
      try {
        if (!sessionStorage.getItem(RELOAD_FLAG)) {
          sessionStorage.setItem(RELOAD_FLAG, '1')
          window.location.reload()
          return
        }
      } catch {
        // storage blocked — fall through to the error screen
      }
    }

    const w = window as any
    w.gtag?.('event', 'exception', {
      description: String(error?.message ?? error).slice(0, 150),
      fatal: false,
    })
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null })
    }
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div role="alert" style={{ padding: '160px 24px', textAlign: 'center', minHeight: '80vh', color: '#2B2B2B' }}>
        <h2 style={{ marginBottom: 12 }}>This page failed to load.</h2>
        <p style={{ marginBottom: 24 }}>
          Reload to try again. If it keeps happening, email{' '}
          <a href="mailto:ask@trenchsecurity.ai" style={{ color: '#3152B9', fontWeight: 600 }}>
            ask@trenchsecurity.ai
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            padding: '0.8rem 1.6rem',
            borderRadius: 999,
            border: '1px solid #3152B9',
            background: '#3152B9',
            color: '#FFFFFF',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Reload page
        </button>
      </div>
    )
  }
}
