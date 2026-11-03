const CACHE = 'geller-v2';

const SHELL = [
  '/',
  '/wiki/',
  '/gallery/',
  '/tools/',
  '/tools/wheel/',
  '/tools/password/',
  '/tools/ip/',
  '/search/',
  '/contact/',
  '/assets/css/styles.css',
  '/assets/js/lib/navbar-loader.js',
  '/assets/js/lib/theme.js',
  '/assets/js/lib/nav-scroll.js',
  '/assets/js/lib/command-palette.js',
  '/assets/js/lib/scroll-top.js',
  '/assets/js/lib/keyboard-nav.js',
  '/shared/navbar.html',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // один отсутствующий файл не должен ломать установку service worker
      .then(c => Promise.all(SHELL.map(p => c.add(p).catch(() => null))))
      .then(() => self.skipWaiting())
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
