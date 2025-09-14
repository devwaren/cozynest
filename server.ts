import fs from 'node:fs/promises'
import express from 'express'
import path from 'path'
import type { ViteDevServer } from 'vite'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Resolve paths safely
const resolve = (p: string) => path.resolve(process.cwd(), p)

let templateHtml = ''
if (isProduction) {
  templateHtml = await fs.readFile(resolve('dist/client/index.html'), 'utf-8')
}

// Create http server
const app = express()

let vite: ViteDevServer | undefined
if (!isProduction) {
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
  app.use(base, sirv(resolve('dist/client'), { extensions: [] }))
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    let render: any

    if (!isProduction) {
      template = await fs.readFile(resolve('index.html'), 'utf-8')
      template = await vite?.transformIndexHtml(url, template)!
      render = (await vite?.ssrLoadModule('/src/entry-server.ts'))?.render
    } else {
      template = templateHtml
      render = (await import(resolve('dist/server/entry-server.js'))).render
    }

    const rendered = await render(url)

    const html = (template || '')
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e as Error)
    console.error((e as Error).stack)
    res.status(500).end((e as Error).stack)
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
