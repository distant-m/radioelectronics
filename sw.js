/* Service worker for "Radio Electronics: Components and Boards".
   - Each course version lives in its own folder (/v1/, /v2/ …) with its own cache.
     Files in a version folder never change, so they are served cache-first.
   - versions.json and the launcher are network-first, so new versions are noticed.
   - Old version caches are kept: a learner who chose not to update keeps working offline. */
var SHELL = 'rtb-shell-1';
var SHELL_FILES = ['./', 'index.html', 'manifest.webmanifest', 'versions.json',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/icon-maskable-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(SHELL).then(function (c) { return c.addAll(SHELL_FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

function versionOf(url) {
  var scope = new URL(self.registration.scope);
  if (url.origin !== scope.origin || url.pathname.indexOf(scope.pathname) !== 0) return null;
  var rest = url.pathname.slice(scope.pathname.length);
  var m = /^(v\d+)\//.exec(rest);
  return m ? m[1] : null;
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  var v = versionOf(url);
  if (v) {
    // Version files never change: cache first, then network (and remember it).
    e.respondWith(caches.open('rtb-' + v).then(function (c) {
      return c.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && res.ok) c.put(req, res.clone());
          return res;
        });
      });
    }));
    return;
  }
  if (url.origin === location.origin) {
    // Launcher, versions.json, icons: network first, cache as fallback.
    e.respondWith(fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(SHELL).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('index.html'); });
    }));
  }
});

// The app asks to store a whole version (or all its photos) for offline use.
self.addEventListener('message', function (e) {
  var d = e.data || {};
  if (d.type !== 'precache' || !d.version || !d.urls) return;
  var port = e.ports && e.ports[0];
  e.waitUntil(caches.open('rtb-' + d.version).then(function (c) {
    var done = 0, failed = 0, total = d.urls.length;
    return d.urls.reduce(function (p, u) {
      return p.then(function () {
        return c.match(u).then(function (hit) {
          if (hit) return;
          return fetch(u).then(function (r) { if (r.ok) return c.put(u, r); failed++; }).catch(function () { failed++; });
        }).then(function () { done++; if (port && (done % 5 === 0 || done === total)) port.postMessage({ done: done, total: total, failed: failed }); });
      });
    }, Promise.resolve());
  }));
});
