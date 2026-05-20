const CACHE_NAME = 'todo-app-v1.0.1'

        // datei offlein nutzung
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/icon-192.png',
    '/icon-512.png'
];



        // install work only 1 time in open 
        // open "cloud" and put all file there
self.addEventListener('install', (e) => {
    e.waitUnit(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CAHCE))
    );
});

        // überprüft list von cache löscht altere und lasst nur aktuelle CACHE_NAME
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key); 
                    }
                })
            )
        )
    );
});



// fetch funktioniert wenn browser fragt
// zurest schaut in cache whenn nicht gefunden hat  dann sucht in Internet

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});