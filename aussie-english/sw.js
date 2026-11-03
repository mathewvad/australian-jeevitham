// Offline support for the installed app. Lessons, slang and tips work without internet;
// the AI coach (a different website) always goes to the network. The Firebase sign-in scripts are
// kept too, so returning users can open the app offline.
// Bump VERSION whenever the app's files change, together with the ?v= numbers in index.html.
const VERSION = 'v34';
const CACHE = 'aussie-english-' + VERSION;
const FILES = [
  './',
  'index.html',
  'app.css?v=34',
  'lessons.js?v=34',
  'vocab.js?v=34',
  'natives.js?v=34',
  'uk.js?v=34',
  'in.js?v=34',
  'course.js?v=34',
  'interview.js?v=34',
  'ielts.js?v=34',
  'oet.js?v=34',
  'help.js?v=34',
  'app.js?v=34',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/favicon-64.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('aussie-english-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameSite = url.origin === self.location.origin;
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  const firebaseJs = url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/');
  if (!sameSite && !fonts && !firebaseJs) return;

  // Pages: try the network first so updates show straight away, fall back to the saved copy offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('index.html', copy));
        return res;
      }).catch(() => caches.match('index.html'))
    );
    return;
  }

  // Everything else: use the saved copy, and refresh it in the background.
  event.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
