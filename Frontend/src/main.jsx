import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const syncDocumentRoute = () => {
  const isHomepage = window.location.pathname === '/'
  const seoHomepage = document.getElementById('seo-homepage')
  const robots = document.querySelector('meta[name="robots"]')
  const canonical = document.querySelector('link[rel="canonical"]')
  const openGraphUrl = document.querySelector('meta[property="og:url"]')
  const shareImages = document.querySelectorAll(
    'meta[property="og:image"], meta[name="twitter:image"]',
  )
  const homepageUrl = new URL('/', window.location.origin).href
  const shareImageUrl = new URL('/pokerchips-512.png', window.location.origin).href

  document.body.classList.toggle('homepageRoute', isHomepage)
  document.body.classList.toggle('gameRoute', !isHomepage)

  if (seoHomepage) seoHomepage.hidden = !isHomepage

  if (robots) {
    robots.content = isHomepage
      ? 'index, follow, max-image-preview:large'
      : 'noindex, nofollow'
  }

  if (canonical) {
    if (isHomepage) canonical.href = homepageUrl
    else canonical.removeAttribute('href')
  }

  if (openGraphUrl) openGraphUrl.content = homepageUrl
  shareImages.forEach((image) => { image.content = shareImageUrl })

  document.title = isHomepage
    ? 'PokerChips – Free Online Poker Chip Counter'
    : 'PokerChips Game'
}

syncDocumentRoute()
window.addEventListener('popstate', syncDocumentRoute)
window.addEventListener('pokerchips:navigation', syncDocumentRoute)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service worker registration failed:', error)
    })
  })
}
