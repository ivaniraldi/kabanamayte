// Este é um Service Worker básico para PWA
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("kabanamayte-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/sobre",
        "/adote",
        "/doe",
        "/loja",
        "/contato",
        "/manifest.json",
        "/icon-192x192.png",
        "/icon-512x512.png",
      ])
    }),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // Não armazenar em cache requisições de API ou similares
            if (event.request.url.includes("/api/") || event.request.method !== "GET") {
              return fetchResponse
            }

            return caches.open("kabanamayte-v1").then((cache) => {
              cache.put(event.request, fetchResponse.clone())
              return fetchResponse
            })
          })
        )
      })
      .catch(() => {
        // Retornar uma página offline se disponível
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html")
        }
        return new Response("Você está offline e este conteúdo não está em cache.")
      }),
  )
})

self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["kabanamayte-v1"]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
