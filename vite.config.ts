import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  // .figma/make/deploy-preview passes `--mode development` for cached-preview builds.
  const emitSourcemaps = mode === 'development'

  const rootDir = import.meta.dirname || path.dirname(new URL(import.meta.url).pathname)

  // Vite reads .env for client code, where only VITE_ names are exposed. The
  // dev/preview API bridge below runs the same handlers as the Vercel
  // functions, and those read process.env — so put the form settings there too,
  // or the forms work on Vercel but not locally. Only these names, under either
  // spelling, and never over a real environment variable: loadEnv with an empty
  // prefix returns the whole environment, not just the file.
  const fileEnv = loadEnv(mode, rootDir, '')
  for (const setting of ['GOOGLE_APPS_SCRIPT_URL', 'ADMIN_EMAIL', 'ALLOWED_ORIGINS', 'APPS_SCRIPT_SECRET']) {
    for (const name of [setting, `NEXT_PUBLIC_${setting}`]) {
      if (fileEnv[name] && process.env[name] === undefined) process.env[name] = fileEnv[name]
    }
  }

  return {
    base: process.env.FIGMA_PUBLIC_URL ? `${process.env.FIGMA_PUBLIC_URL}/` : '/',
    // Only these reach the browser bundle. Stated explicitly (it is also the
    // default) because the form settings in .env keep the old repo's
    // NEXT_PUBLIC_ names, and nothing may inline those into client code.
    envPrefix: 'VITE_',
    build: {
      sourcemap: emitSourcemaps ? 'inline' : false,
      minify: !emitSourcemaps,
      // The SSR bundle only renders HTML at build time; it must not copy public/.
      copyPublicDir: !isSsrBuild,
      // Read by scripts/prerender-seo.ts to link each page's CSS chunk in that
      // page's HTML (otherwise it arrives with the JS and restyles the page:
      // layout shift). The prerender deletes it afterwards.
      manifest: !isSsrBuild,
    },
    plugins: [
      react(),
      tailwindcss(),
      figmaErrorOverlayReplay(),
      figmaReactRefreshBoundaryFallback(),
      figmaMakeKitPlugin({ storiesGlob: '/src/**/*.stories.{ts,tsx,js,jsx}' }),
      trenchApiPlugin(),
    ],
    resolve: {
      alias: {
        'next/image': path.resolve(rootDir, './src/compat/next-image-shim.tsx'),
        'next/link': path.resolve(rootDir, './src/compat/next-link-shim.tsx'),
        'next/navigation': path.resolve(rootDir, './src/compat/next-navigation-shim.ts'),
        '@/components/animations/ScrollReveal': path.resolve(rootDir, './src/compat/ScrollReveal.tsx'),
        '@/components/animations/TextReveal': path.resolve(rootDir, './src/compat/TextReveal.tsx'),
        '@/components/BrandBanner': path.resolve(rootDir, './src/compat/BrandBanner.tsx'),
        '@/components/sections/CTASection': path.resolve(rootDir, './src/compat/CTASection.tsx'),
        '@/components/HeadlessSecOpsModes': path.resolve(rootDir, './src/compat/HeadlessSecOpsModes.tsx'),
        '@/components/Section3Visual': path.resolve(rootDir, './src/compat/Section3Visual.tsx'),
        '@/components/ui/Button': path.resolve(rootDir, './src/compat/Button.tsx'),
        '@': path.resolve(rootDir, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
      strictPort: false,
      watch: { ignored: ['**/.figma/**'] },
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
    },
  }
})

/**
 * Replay the most recent build error to clients that connect after
 * it was first broadcast. Vite buffers an error payload only while
 * no clients are connected and clears the buffer on the first
 * reconnect (see `bufferedMessage` in `createWebSocketServer`), so
 * if the preview iframe reloads after Vite already delivered an
 * error to a live socket, the new socket misses the payload and
 * the overlay stays hidden even though the build is still broken.
 * We intercept `ws.send` to remember the latest error and replay
 * it on every new connection; the cache clears on a successful
 * `update` or `full-reload` so a stale overlay can't survive a
 * fixed build.
 */
function figmaErrorOverlayReplay(): Plugin {
  return {
    name: 'figma-error-overlay-replay',
    apply: 'serve',
    configureServer(server) {
      let lastError: object | null = null

      const origSend = server.ws.send.bind(server.ws) as (...args: any[]) => void
      server.ws.send = ((...args: any[]) => {
        const payload = args[0]
        if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
          const type = (payload as { type?: string }).type
          if (type === 'error') {
            lastError = payload as object
          } else if (type === 'update' || type === 'full-reload') {
            lastError = null
          }
        }
        return origSend(...args)
      }) as typeof server.ws.send

      server.ws.on('connection', (socket) => {
        if (lastError !== null) {
          socket.send(JSON.stringify(lastError))
        }
      })
    },
  }
}

/**
 * Reload when a module that previously defined a React Refresh boundary stops
 * defining one. This happens when an agent moves a component into a new file
 * and replaces the old module with a re-export:
 *
 *   export { default } from './app/App'
 *
 * Vite otherwise accepts the update using the previous module's HMR boundary,
 * but the re-export-only transform no longer registers a replacement for the
 * mounted component family. React reports a successful refresh while leaving
 * the old tree mounted until the page is reloaded.
 */
function figmaReactRefreshBoundaryFallback(): Plugin {
  const hadRefreshBoundary = new Map<string, boolean>()
  let sendFullReload: (() => void) | null = null

  return {
    name: 'figma-react-refresh-boundary-fallback',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      sendFullReload = () => server.ws.send({ type: 'full-reload', path: '*' })
    },
    transform(code, id) {
      if (!/\.[jt]sx?(?:\?|$)/.test(id) || id.includes('/node_modules/')) return null

      const moduleId = id.split('?')[0] ?? id
      const hasRefreshBoundary = code.includes('registerExportsForReactRefresh')
      const previousHadRefreshBoundary = hadRefreshBoundary.get(moduleId)
      hadRefreshBoundary.set(moduleId, hasRefreshBoundary)

      if (previousHadRefreshBoundary && !hasRefreshBoundary) {
        queueMicrotask(() => sendFullReload?.())
      }

      return null
    },
  }
}

/**
 * Serves a blank render-target page at /.figma/make/kit.html that
 * the Figma preview script drives directly. The page exposes a
 * registry of every file matching `storiesGlob` on
 * window.__FIGMA__.stories so the design surface can dynamically
 * import + mount each entry into its own grid view.
 *
 * Dev-only: `apply: 'serve'` gates the plugin to `vite dev`. Prod
 * builds (`vite build`) skip it entirely so the route doesn't leak
 * into shipped bundles.
 */
function figmaMakeKitPlugin(options: { storiesGlob: string | string[] }): Plugin {
  const storiesGlob = Array.isArray(options.storiesGlob) ? options.storiesGlob : [options.storiesGlob]
  const ROUTE = '/.figma/make/kit.html'
  const VIRTUAL_ID = 'virtual:figma-stories'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  const STORIES_MODULE = `export const stories = import.meta.glob(${JSON.stringify(storiesGlob)})`
  const HTML_BOOTSTRAP = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
<div id="figma-make-kit-root"></div>
<script type="module">
  import { stories } from 'virtual:figma-stories'
  window.__FIGMA__ = Object.assign(window.__FIGMA__ ?? {}, { stories })
  window.dispatchEvent(new CustomEvent('figma.ready'))
</script>
</body>
</html>`

  return {
    name: 'figma-make-kit',
    apply: 'serve',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    load(id) {
      if (id !== RESOLVED_ID) return null
      return STORIES_MODULE
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (url.split('?')[0] !== ROUTE) return next()

        try {
          res.setHeader('Content-Type', 'text/html')
          res.end(await server.transformIndexHtml(url, HTML_BOOTSTRAP))
        } catch (err) {
          next(err as Error)
        }
      })
    },
  }
}

/**
 * Dev/preview-only bridge so `vite dev` exercises the SAME handlers that run as
 * Vercel functions in production. Production traffic never reaches this plugin.
 */
function trenchApiPlugin(): Plugin {
  const ROUTES: Record<string, "submit" | "community"> = {
    "/api/submit-form": "submit",
    "/api/community-signup": "community",
  }

  const handler = async (req: any, res: any, next: any) => {
    const url = req.url?.split("?")[0]
    const kind = url ? ROUTES[url] : undefined
    if (!kind) return next()

    const send = (status: number, payload: unknown) => {
      res.statusCode = status
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(payload))
    }

    // Method, origin, content type, size, rate limit and validation all run in
    // the shared handler, exactly as in production.
    let raw = ""
    let tooLarge = false
    req.on("data", (c: any) => {
      raw += c
      if (raw.length > 64 * 1024) tooLarge = true
    })
    req.on("end", async () => {
      try {
        if (tooLarge) return send(413, { status: "error", message: "Request body too large." })
        // Imported lazily so editing api/_lib/forms.ts hot-reloads without
        // restarting the dev server.
        const { handleApiRequest, writeResult } = await import("./api/_lib/forms.ts")
        writeResult(res, await handleApiRequest(kind, { method: req.method, headers: req.headers, body: raw }))
      } catch (err: any) {
        console.error("[trenchApiPlugin]", err)
        send(500, { status: "error", message: err?.message || "Internal server error" })
      }
    })
  }

  return {
    name: "trench-api-plugin",
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}
