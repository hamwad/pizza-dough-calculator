// Minimal service worker registration + precaching (Workbox build recommended in production)
self.addEventListener("install", (event) => {
  // skip waiting in dev
  // placeholder for precache
});

self.addEventListener("fetch", (event) => {
  // basic network-first for navigation, cache-first for assets if desired
});
