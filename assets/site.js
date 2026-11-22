/**
 * Landing de inklineMD — comportamiento compartido por index.html y en.html.
 *
 * Tres cosas y nada más: escalar el iframe de la demo, detectar el sistema del
 * visitante y activar las descargas que assets/releases.js declara. Los textos
 * viven en el HTML de cada idioma; aquí no se inventa copy.
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------- demo -- */

  var DEMO_WIDTH = 1400;
  var DEMO_HEIGHT = 860;

  function initDemo() {
    var body = document.querySelector(".frame__body");
    var frame = body && body.querySelector("iframe");
    if (!body || !frame) return;

    function fit() {
      var scale = Math.min(body.clientWidth / DEMO_WIDTH, 1);
      body.style.setProperty("--demo-scale", String(scale));
      body.style.height = Math.round(DEMO_HEIGHT * scale) + "px";
      // Por debajo de media escala la demo deja de ser usable con el dedo:
      // se marca como no interactiva y el aviso ofrece abrirla a pantalla completa.
      body.dataset.frozen = scale < 0.55 ? "true" : "false";
    }

    fit();
    if ("ResizeObserver" in window) {
      new ResizeObserver(fit).observe(body);
    } else {
      window.addEventListener("resize", fit);
    }

    var src = frame.getAttribute("data-src");
    function load() {
      if (!src || frame.getAttribute("src")) return;
      frame.setAttribute("src", src);
    }

    // En pantallas estrechas la app real no cabe (es un escritorio de 1400 px):
    // se muestra la captura con un botón y no se descarga ~1,5 MB de JS.
    if (window.matchMedia("(max-width: 700px)").matches) {
      body.dataset.poster = "true";
      return;
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          if (entries.some(function (entry) { return entry.isIntersecting; })) {
            observer.disconnect();
            load();
          }
        },
        { rootMargin: "400px 0px" },
      );
      observer.observe(body);
    } else {
      load();
    }

    // Si el build no está copiado en app/, el iframe carga una página sin la
    // raíz de la app: se cambia por el aviso en vez de dejar el hueco en blanco.
    frame.addEventListener("load", function () {
      var doc = null;
      try {
        doc = frame.contentDocument;
      } catch (error) {
        return;
      }
      if (doc && !doc.querySelector("#root")) showFallback();
    });

    function showFallback() {
      var message = body.getAttribute("data-fallback") || "Demo no disponible.";
      var fallback = document.createElement("div");
      fallback.className = "frame__fallback";
      fallback.innerHTML = message;
      frame.replaceWith(fallback);
    }
  }

  /* ---------------------------------------------------------- plataforma -- */

  function detectOS() {
    var nav = navigator;
    var ua = (nav.userAgent || "") + " " + (nav.platform || "");
    var hinted = (nav.userAgentData && nav.userAgentData.platform) || "";
    var haystack = (hinted + " " + ua).toLowerCase();

    if (/android/.test(haystack)) return "android";
    if (/iphone|ipad|ipod/.test(haystack)) return "ios";
    if (/windows|win32|win64/.test(haystack)) return "windows";
    if (/mac/.test(haystack)) return "macos";
    if (/linux|x11/.test(haystack)) return "linux";
    return "other";
  }

  function initPlatform() {
    var os = detectOS();
    document.documentElement.dataset.os = os;

    var cta = document.querySelector("[data-os-label]");
    if (cta) {
      // Cada página trae sus etiquetas: data-label-macos, data-label-windows…
      var text = cta.getAttribute("data-label-" + os);
      if (text) cta.textContent = text;
    }

    document.querySelectorAll(".download[data-os]").forEach(function (card) {
      if (card.dataset.os === os) card.dataset.recommended = "true";
    });
  }

  /* ----------------------------------------------------------- descargas -- */

  function initDownloads() {
    var config = window.INKLINEMD_RELEASES || {};
    var downloads = config.downloads || {};

    // Anclas con su propia clave (una tarjeta puede tener varios formatos).
    document.querySelectorAll("a.btn[data-release]").forEach(function (link) {
      var target = downloads[link.getAttribute("data-release")];
      if (target) link.setAttribute("href", target);
    });

    document.querySelectorAll("[data-release]").forEach(function (card) {
      var key = card.getAttribute("data-release");
      var url = downloads[key];
      if (!url) return;

      var placeholder = card.querySelector(".btn--soon");
      if (!placeholder) {
        var existing = card.querySelector(".btn");
        if (existing && existing.tagName === "A") existing.setAttribute("href", url);
        return;
      }

      var link = document.createElement("a");
      link.className = "btn";
      link.href = url;
      link.textContent = placeholder.getAttribute("data-label") || "Descargar";
      if (placeholder.hasAttribute("download")) link.setAttribute("download", "");
      if (/^https?:/i.test(url)) {
        link.rel = "noopener";
      }
      placeholder.replaceWith(link);
    });
  }

  initDemo();
  initPlatform();
  initDownloads();
})();
