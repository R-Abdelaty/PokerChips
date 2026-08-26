import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const normalizeSiteUrl = (value) => {
  if (!value) return null
  const withProtocol = value.startsWith('http') ? value : `https://${value}`
  return new URL('/', withProtocol).href
}

const sitemapPlugin = (siteUrl) => ({
  name: 'pokerchips-sitemap',
  transformIndexHtml(html) {
    if (!siteUrl) return html

    const shareImageUrl = new URL('pokerchips-512.png', siteUrl).href
    return html
      .replace('<link rel="canonical" />', `<link rel="canonical" href="${siteUrl}" />`)
      .replace(
        '<meta property="og:url" content="/" />',
        `<meta property="og:url" content="${siteUrl}" />`,
      )
      .replaceAll('content="/pokerchips-512.png"', `content="${shareImageUrl}"`)
  },
  async closeBundle() {
    if (!siteUrl) {
      console.warn('SITE_URL is not set; skipping sitemap.xml generation.')
      return
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

    await writeFile(resolve('dist', 'sitemap.xml'), sitemap, 'utf8')
    await writeFile(
      resolve('dist', 'robots.txt'),
      `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`,
      'utf8',
    )
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '')
  const deploymentUrl =
    env.SITE_URL ||
    env.VITE_SITE_URL ||
    env.VERCEL_PROJECT_PRODUCTION_URL ||
    env.RENDER_EXTERNAL_URL ||
    env.CF_PAGES_URL ||
    env.URL

  return {
    plugins: [react(), sitemapPlugin(normalizeSiteUrl(deploymentUrl))],
  }
})
