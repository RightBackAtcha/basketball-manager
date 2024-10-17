const CACHE_NAME = 'basketball-manager-cache-v1'
const assetsToCache = [
    '/',
    '/data',
    '/generation',
    '/api',
    '/fonts'

]

const cacheClone = async (e) => {
    try {
        // Fetch cache from network
        const res = await fetch(e.request);
        const resClone = res.clone();

        // Open cache and store clone response
        const cache = await caches.open(CACHE_NAME);
        await cache.put(e.request, resClone);

        // Return original response
        return res;
    } catch(error) {
        console.error(`Fetch failed: Returning cached resource if available:`, error);
    }
};

// Install event for cache
self.addEventListener('install', (event) => {
    console.log('service worker installed');
    event.waitUntil(
        cache.open(CACHE_NAME).then(cache => {
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
                cacheNames.map((CACHE_NAME) => {
                    if (!cacheWhitelist.includes(CACHE_NAME)) {
                        return caches.delete(CACHE_NAME);
                    }
                })
            )
        })
    )
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.responseWith(
        fetch(event.request) // Check cache for request
            .then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone()); // Use cache
                    return response;
                });
            }).catch(() => caches.match(event.request)) // Fallback to cache if network not available
    );

});