const CACHE_NAME = "pwa-ui5-todo-v1.0.07";
const RESOURCES_TO_PRELOAD = [
  "index.html",
  "contacts.html",
  "about-us.html",
  "blockconsult.html",
  "blog.html",
  "center.html",
  "coaching.html",
  "hresources.html",
  "lawconsult.html",
  "management.html",
  "software.html",
  "offline-404.html",
  "manifest.json",
  "index.html",
  "service-worker.js",
  "register-worker.js",
  "/js/jquery.cookiebar.js",
  "/js/vendor/assets/coloredbg.html",
  "/js/vendor/assets/gridtile.html",
  "/js/vendor/assets/gridtile_3x3.html",
  "/js/vendor/assets/gridtile_3x3_white.html",
  "/js/vendor/assets/gridtile_white.html",
  "/js/vendor/fonts/fontawesome-webfontd41d.html",
  "/js/vendor/fonts/fontawesome-webfont5b62-5.html",
  "/js/vendor/fonts/fontawesome-webfont5b62-4.html",
  "/js/vendor/fonts/fontawesome-webfont5b62-3.html",
  "/js/vendor/fonts/fontawesome-webfont5b62-2.html",
  "/js/vendor/fonts/fontawesome-webfont5b62-1.html",
  "/js/vendor/fonts/revicons/revicons90c6.html",
  "/js/vendor/fonts/revicons/revicons90c6-2.html",
  "/js/vendor/fonts/revicons/revicons90c6-3.html",
  "/js/vendor/fonts/revicons/revicons90c6-4.html",
  "/js/vendor/jQuery/jquery.js",
  "/js/vendor/jQuery/jquery-migrate.min.js",
  "/js/vendor/js_comp/font-awesome.min.css",
  "/js/vendor/js_comp/js_comp.min.js",
  "/js/vendor/js_comp/js_comp_custom.css",
  "/js/vendor/js_comp/waypoints.min.js",
  "/js/vendor/magnific/jquery.magnific-popup.min.js",
  "/js/vendor/magnific/magnific-popup.min.css",
  "/js/vendor/mediaelement/background.html",
  "/js/vendor/mediaelement/bigplay.html",
  "/js/vendor/mediaelement/bigplay-2.html",
  "/js/vendor/mediaelement/controls.html",
  "/js/vendor/mediaelement/controls-2.html",
  "/js/vendor/mediaelement/jumpforward.html",
  "/js/vendor/mediaelement/loading.html",
  "/js/vendor/mediaelement/mediaelement.min.css",
  "/js/vendor/mediaelement/mediaelement-and-player.min.js",
  "/js/vendor/mediaelement/mediaelementplayer.min.css",
  "/js/vendor/mediaelement/skipback.html",
  "/js/vendor/revslider/closedhand.html",
  "/js/vendor/revslider/jquery.themepunch.revolution.min.js",
  "/js/vendor/revslider/jquery.themepunch.tools.min.js",
  "/js/vendor/revslider/openhand.html",
  "/js/vendor/revslider/settings.css",
  "/js/vendor/revslider/extensions/revolution.extension.actions.min.js",
  "/js/vendor/revslider/extensions/revolution.extension.layeranimation.min.js",
  "/js/vendor/revslider/extensions/revolution.extension.navigation.min.js",
  "/js/vendor/revslider/extensions/revolution.extension.slideanims.min.js",
  "/js/vendor/swiper/swiper.jquery.min.js",
  "/js/vendor/swiper/swiper.min.css",
  "/js/custom/comment-reply.min.js",
  "/js/custom/custom.js",
  "/js/custom/embed.min.js",
  "/js/custom/scripts.js",
  "/js/custom/font/trx_addons_icons2633.html",
  "/js/custom/font/trx_addons_icons2633-2.html",
  "/js/custom/trx/chart.min.js",
  "/js/custom/trx/controls.html",
  "/js/custom/trx/trx_addons.css",
  "/js/custom/trx/trx_addons.js",
  "/js/custom/trx/trx_addons_icons-embedded.css",
  "/css/animation.css",
  "/css/colors.css",
  "/css/custom.css",
  "/css/custom-style.css",
  "/css/custom-style-dif.css",
  "/css/grid.css",
  "/css/jquery.cookiebar.css",
  "/css/responsive.css",
  "/css/skeleton.css",
  "/css/style.css",
  "/css/style-bno.css",
  "/css/styles.css",
  "/css/unminify/style.css",
  "/css/unminify/styles.css",
  "/css/fontello/css/fontello.css",
  "/cdn-cgi/l/email-protection.html",
  "/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
  //'offline-404.html'
];

/* 
   // Note: if you want to preload the UI5 core and mobile libraries by install,
   // uncomment this block of code

	const cdnBase = 'https://openui5.hana.ondemand.com/resources/';

	resourcesToCache = resourcesToCache.concat([
		`${cdnBase}sap-ui-core.js`,
		`${cdnBase}sap/ui/core/library-preload.js`,
		`${cdnBase}sap/ui/core/themes/sap_belize_plus/library.css`,
		`${cdnBase}sap/ui/core/themes/base/fonts/SAP-icons.woff2`,
		`${cdnBase}sap/m/library-preload.js`,
		`${cdnBase}sap/m/themes/sap_belize_plus/library.css`
	]);
*/

// Preload some resources during install
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(RESOURCES_TO_PRELOAD);
        // if any item isn't successfully added to
        // cache, the whole operation fails.
      })
      .catch(function(error) {
        console.error(error);
      })
  );
});

// Delete obsolete caches during activate
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// During runtime, get files from cache or -> fetch, then save to cache
self.addEventListener("fetch", function(event) {
  // only process GET requests
  if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response; // There is a cached version of the resource already
        }

        let requestCopy = event.request.clone();
        return fetch(requestCopy)
          .then(function(response) {
            // opaque responses cannot be examined, they will just error
            if (response.type === "opaque") {
              // don't cache opaque response, you cannot validate it's status/success
              return response;
              // response.ok => response.status == 2xx ? true : false;
            } else if (!response.ok) {
              console.error(response.statusText);
            } else {
              return caches
                .open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, response.clone());
                  return response;
                  // if the response fails to cache, catch the error
                })
                .catch(function(error) {
                  console.error(error);
                  return error;
                });
            }
          })
          .catch(function(error) {
            // fetch will fail if server cannot be reached,
            // this means that either the client or server is offline
            console.error(error);
            return caches.match("offline-404.html");
          });
      })
    );
  }
});
