import fs from 'node:fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import type { ViteDevServer } from 'vite'
import crypto from 'crypto' // added for nonce
// Constants
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Create Express app
const app = express()

if (!isDev) {
  app.use((_req, res, next) => {
    const nonce = crypto.randomBytes(16).toString("base64");
    res.locals.nonce = nonce;



    // ✅ Security headers
    res.setHeader("X-Frame-Options", "DENY"); // Prevent clickjacking
    res.setHeader("X-Content-Type-Options", "nosniff"); // Block MIME type sniffing
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin"); // Limit referrer leakage
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()"); // Block sensitive APIs
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // Protect against XS-Leaks
    res.setHeader("Cross-Origin-Embedder-Policy", "cross-origin"); // Required for COOP
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin"); // Restrict cross-origin resource sharing

    next();
  });
}

// Dev server (Vite) or static file handler
let vite: ViteDevServer | undefined

if (isDev) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv(path.resolve(__dirname, 'dist/client'), { extensions: [] }))
}

// HTML rendering
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    let render: (url: string, nonce: string) => Promise<{ html: string; head: string }>

    if (isDev && vite) {
      template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
    } else {
      template = await fs.readFile(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
      const mod = await import(path.resolve(__dirname, 'dist/server/entry-server.js'))
      render = mod.render as typeof render
    }

    // Pass nonce to render function in case your app injects inline scripts
    const rendered = await render(url, res.locals.nonce)

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      // Optional: inject nonce into all inline scripts automatically
      .replace(/<script(?![^>]*src)/g, `<script nonce="${res.locals.nonce}"`)

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace?.(e as Error)
    console.error((e as Error).stack)
    res.status(500).end((e as Error).stack)
  }
})

// Start server
app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port} (${isDev ? 'dev' : 'prod'})`)
})