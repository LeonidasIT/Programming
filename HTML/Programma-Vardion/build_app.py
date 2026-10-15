"""Builds the installable phone app (PWA) in app/ from index.html.

index.html is the page body (it is also published as a claude.ai artifact).
This script wraps it in a full HTML document with the manifest, icons and
service worker, so it can be hosted on GitHub Pages and added to a home screen.

Run:  python3 build_app.py
"""
import hashlib
from pathlib import Path

from PIL import Image, ImageDraw

HERE = Path(__file__).parent
APP = HERE / "app"

HEAD = """<!doctype html>
<html lang="el">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0d5a6b">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Βάρδιες">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui,sans-serif}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
"""

TAIL = """
<script>
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}
</script>
</body>
</html>
"""

MANIFEST = """{
  "name": "Πρόγραμμα Βαρδιών",
  "short_name": "Βάρδιες",
  "description": "Εβδομαδιαίο πρόγραμμα βαρδιών για το μαγαζί",
  "lang": "el",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#eef2f4",
  "theme_color": "#0d5a6b",
  "icons": [
    {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
    {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
  ]
}
"""

SW = """// Offline support: keep the app shell cached, refresh it in the background.
const CACHE = 'vardies-__VERSION__';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(e.request, {ignoreSearch: true});
    const network = fetch(e.request).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone());
      return res;
    }).catch(() => cached);
    return cached || network;
  }));
});
"""


def draw_icon(size, pad_ratio):
    """Roster-grid icon: petrol background, a 3x3 grid of shift-coloured cells."""
    img = Image.new("RGB", (size, size), "#0d5a6b")
    d = ImageDraw.Draw(img)
    pad = size * pad_ratio
    inner = size - 2 * pad
    gap = inner * 0.06
    cell = (inner - 2 * gap) / 3
    colors = [
        "#fcefcf", "#e0e4fb", "#d3efe1",
        "#e0e4fb", "#d3efe1", "#fcefcf",
        "#d3efe1", "#fcefcf", "#f5e0ee",
    ]
    for i, c in enumerate(colors):
        r, col = divmod(i, 3)
        x = pad + col * (cell + gap)
        y = pad + r * (cell + gap)
        d.rounded_rectangle([x, y, x + cell, y + cell], radius=cell * 0.22, fill=c)
    return img


def main():
    APP.mkdir(exist_ok=True)
    body = (HERE / "index.html").read_text(encoding="utf-8")
    (APP / "index.html").write_text(HEAD + body + TAIL, encoding="utf-8")
    (APP / "manifest.webmanifest").write_text(MANIFEST, encoding="utf-8")
    version = hashlib.sha1(body.encode()).hexdigest()[:8]
    (APP / "sw.js").write_text(SW.replace("__VERSION__", version), encoding="utf-8")
    draw_icon(192, 0.16).save(APP / "icon-192.png")
    draw_icon(512, 0.16).save(APP / "icon-512.png")
    draw_icon(512, 0.26).save(APP / "icon-maskable-512.png")
    draw_icon(180, 0.16).save(APP / "apple-touch-icon.png")
    print("built", APP)


if __name__ == "__main__":
    main()
