const CACHE_NAME = 'basketball-manager-cache-v2'
const cachedAssets = [
    '/',
    '/data/countries.json',
    '/data/names.json',
    '/data/regions.json',
    '/data/colleges.json',
    '/generation',
    '/teams'
]

// Install event for cache
self.addEventListener('install', (event) => {
    console.log('service worker installed');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(cachedAssets);
        })
    )
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('service worker activated');
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }));
});