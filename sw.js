const VERSION = "sacn-prepa-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "firebase-config.js", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png"];
const CACHEABLE_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com", "www.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("sacn-prepa") && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // Fichiers de l'application : réseau d'abord, copie locale si hors ligne.
    e.respondWith(
      fetch(req).then(r => { const copy = r.clone(); if (r.ok) caches.open(VERSION).then(c => c.put(req, copy)); return r; })
        .catch(() => caches.match(req).then(m => m || (req.mode === "navigate" ? caches.match("index.html") : undefined)))
    );
    return;
  }
  if (CACHEABLE_HOSTS.includes(url.hostname)) {
    // Polices et bibliothèques : copie locale d'abord.
    e.respondWith(caches.match(req).then(m => m || fetch(req).then(r => { const copy = r.clone(); if (r.ok || r.type === "opaque") caches.open(VERSION).then(c => c.put(req, copy)); return r; })));
  }
  // Tout le reste (Firebase, etc.) passe directement par le réseau.
});
