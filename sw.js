const CACHE_NAME = 'smart-lab-pro-v2026-v13';
const CORE_ASSETS = [
  './',
  './index.html',
  './index (1).html',
  './dotcare.js',
  './app_pro_2026.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'
];

let proOfflineEnabled = false;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'ACTIVATE_PRO_OFFLINE') {
    proOfflineEnabled = true;
    caches.open(CACHE_NAME).then((cache) => {
      CORE_ASSETS.forEach((url) => {
        fetch(url, { mode: 'no-cors' }).then((res) => cache.put(url, res)).catch(() => {});
      });
    });
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (proOfflineEnabled) {
          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cloned);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return new Response(
            `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>النسخة المدفوعة - أوفلاين</title><style>body{margin:0;font-family:'Cairo',sans-serif;background:linear-gradient(180deg,#0d5c58,#063836);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;text-align:center;}.card{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);padding:28px;border-radius:24px;max-width:440px;box-shadow:0 15px 35px rgba(0,0,0,0.3);}h2{color:#fbbf24;margin-top:0;}p{line-height:1.7;color:#e2e8f0;font-size:15px;}.btn{display:inline-block;margin-top:15px;padding:12px 24px;background:#00bfa5;color:#00332c;font-weight:bold;border-radius:12px;text-decoration:none;}</style></head><body><div class="card"><h2>🔒 ميزة العمل بدون إنترنت (Offline Mode)</h2><p>أنت حالياً غير متصل بالإنترنت. ميزة تصفح الدليل بالكامل بدون إنترنت مخصصة <b>للمشتركين في النسخة المدفوعة (Pro)</b> فقط.</p><p>يرجى الاتصال بالإنترنت وتفعيل اشتراكك عبر <b>InstaPay</b> ليتم حفظ الدليل بالكامل على جهازك مدى الحياة.</p><a href="./index.html" class="btn">🔄 إعادة المحاولة</a></div></body></html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        });
      })
  );
});
