const CACHE_NAME = 'basketball-manager-cache-v1'
const assetsToCache = [
    '/',
    '/data',
    '/favicon',
    '/images',
    '/generation',
    '/api',
    '/fonts',
    '/components',
    '/workers'

]

// Install event for cache
self.addEventListener('install', (event) => {
    console.log('service worker installed');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(assetsToCache); // Precache assets
        })
    )
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('service worker activated');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );

});