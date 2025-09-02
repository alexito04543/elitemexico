const CACHE_NAME = 'elite-cars-v1';
const urlsToCache = [
  '/',
  '/icon.svg',
  '/icon-192.png',
  '/_next/static/css/',
  '/_next/static/chunks/',
];

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch with network-first strategy for models, cache-first for static assets
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/models/')) {
    // Network-first for 3D models
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Cache-first for other assets
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});