// The previous version of this site was a Flutter app that registered this file as a
// service worker. It is kept only to remove itself from returning visitors' browsers.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.filter((n) => n.startsWith("flutter-")).map((n) => caches.delete(n)));
      await self.registration.unregister();
      const pages = await self.clients.matchAll({ type: "window" });
      pages.forEach((page) => page.navigate(page.url));
    })(),
  );
});
