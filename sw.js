const V = "simscan-v1";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png",
  "lib/tesseract.min.js", "lib/worker.min.js",
  "lib/tesseract-core-simd-lstm.wasm.js", "lib/tesseract-core-lstm.wasm.js",
  "lang/eng.traineddata.gz"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
