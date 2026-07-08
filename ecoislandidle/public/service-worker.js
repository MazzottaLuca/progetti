/**
 * Service Worker per Eco Island Clicker
 * Caching strategia: cache-first per asset statici
 * Network-first per API calls (non usate in questo gioco offline)
 */

const CACHE_NAME = 'eco-island-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    'eco_island_assets/backgrounds/island_stage1_smog.svg',
    'eco_island_assets/backgrounds/island_stage2_partial.svg',
    'eco_island_assets/backgrounds/island_stage3_paradise.svg',
    'eco_island_assets/ui/icon_natura_points.svg',
    'eco_island_assets/ui/app_icon.svg',
    'eco_island_assets/upgrades/upgrade_tree.svg',
    'eco_island_assets/upgrades/upgrade_solar_panel.svg',
    'eco_island_assets/upgrades/upgrade_wind_turbine.svg',
    'eco_island_assets/upgrades/upgrade_rain_cloud.svg',
    'eco_island_assets/upgrades/upgrade_compost.svg',
    'eco_island_assets/upgrades/upgrade_seaplane.svg'
];

/**
 * Install event - cache tutti gli asset necessari
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: caching assets');
            return cache.addAll(ASSETS_TO_CACHE).catch(() => {
                console.log('Service Worker: alcuni asset non sono stati trovati, ma continuo');
            });
        })
    );
    self.skipWaiting();
});

/**
 * Activate event - pulizia delle cache vecchie
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: eliminando cache old:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

/**
 * Fetch event - strategia cache-first
 * Se offline, serve dal cache
 * Se online, prova la rete prima, poi fallback al cache
 */
self.addEventListener('fetch', (event) => {
    // Solo gestire GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                // Se il file è in cache, tornalo
                if (response) {
                    return response;
                }

                // Altrimenti, prova a fetchare dalla rete
                return fetch(event.request).then((networkResponse) => {
                    // Cache la risposta per uso futuro offline
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                }).catch(() => {
                    // Se entrambi falliscono, servire offline page
                    if (event.request.destination === 'document') {
                        return cache.match('/index.html');
                    }
                    return null;
                });
            });
        })
    );
});

console.log('Service Worker: registrato e pronto');
