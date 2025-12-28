// Service Worker для оффлайн работы
const CACHE_NAME = 'indigo-wallet-v1';
const urlsToCache = [
    './',
    './index.html',
    'https://telegram.org/js/telegram-web-app.js',
    'https://unpkg.com/@ton/crypto@3.2.0/dist/index.min.js',
    'https://unpkg.com/@ton/core@0.53.0/dist/index.min.js',
    'https://unpkg.com/@ton/ton@13.11.1/dist/index.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
