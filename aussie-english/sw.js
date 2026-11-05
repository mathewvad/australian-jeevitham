// The app moved from /aussie-english/ to /english-coach/. Phones that installed the old version
// still have its service worker; when they next check for an update they get this one, which
// deletes the old offline copy, removes itself and sends any open page to the new address.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('aussie-english-')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const pages = await self.clients.matchAll({ type: 'window' });
    pages.forEach((page) => page.navigate('/english-coach/'));
  })());
});
