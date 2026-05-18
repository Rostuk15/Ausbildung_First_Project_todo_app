const CACHE_NAME = 'todo-app-v1'

// file remember offline
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

// fetch work when browser answer 
// firs look in cache, if not find in Internet

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});