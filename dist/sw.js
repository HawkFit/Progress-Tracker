const CACHE_NAME = 'hawk-tracker-v1'
const urlsToCache = [
  '/progress-tracker/',
  '/progress-tracker/index.html',
  '/progress-tracker/manifest.json'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/progress-tracker/index.html'))
  )
})
