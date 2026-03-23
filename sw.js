const CACHE = 'geller-v1';

const SHELL = [
  '/',
  '/wiki',
  '/gallery',
  '/contact',
  '/tools',
  '/tools/wheel',
  '/tools/password',
  '/tools/ip',
  '/search',
  '/css/styles.css',
  '/js/theme.js',
  '/js/nav-scroll.js',
  '/js/dashboard.js',
  '/js/command-palette.js',
  '/js/wiki.js',
  '/js/search.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
