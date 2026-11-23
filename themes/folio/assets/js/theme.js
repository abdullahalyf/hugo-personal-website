/* Theme toggle + mobile menu. Vanilla, no dependencies.
   The page works without JS: dark mode then follows the OS, and the nav
   is a plain list on small screens. */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");

  /* ---- Theme ---- */
  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      var dark = theme === "dark";
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* Private mode: the toggle still works for this page view. */
    }
  }

  if (toggle) {
    applyTheme(currentTheme());
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* Follow the OS only while the user has not made an explicit choice. */
  try {
    if (!localStorage.getItem("theme") && window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function (e) {
        applyTheme(e.matches ? "dark" : "light");
      };
      if (mq.addEventListener) {
        mq.addEventListener("change", onChange);
      } else if (mq.addListener) {
        mq.addListener(onChange);
      }
    }
  } catch (e) {
    /* No localStorage: OS preference already applied in the head script. */
  }

  /* ---- Mobile menu ---- */
  function closeMenu() {
    if (!menuBtn || !nav) return;
    nav.classList.remove("site-nav--open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("site-nav--open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    /* Close after following a link, and on Escape. */
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Header border on scroll ----
     The header is a frosted panel. A hairline border only appears once
     the page has moved, so the top of the page reads as open and the
     border appears where it is needed. */
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    var setScrolled = function () {
      header.classList.toggle("site-header--scrolled", window.scrollY > 8);
      ticking = false;
    };
    setScrolled();
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(setScrolled);
      },
      { passive: true }
    );
  }

  /* ---- Reveal on scroll ----
     Sections fade up 12px the first time they come into view. Elements
     without JavaScript simply stay visible: the `reveal` class is added
     by this script, not present in the HTML. */
  var reduced = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  if (!reduced && typeof window.IntersectionObserver === "function") {
    var targets = document.querySelectorAll(
      "main section, .rows__item, .project--card, .gallery__item, .timeline__item"
    );

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    targets.forEach(function (el, i) {
      el.classList.add("reveal");
      /* A short stagger within a group, never more than three steps, so
         a list arrives in a wave rather than all at once. */
      var group = el.parentElement ? el.parentElement.children.length : 1;
      var step = Math.min(i % 3, 2);
      el.style.setProperty("--reveal-delay", step * 70 + "ms");
      observer.observe(el);
    });
  }

  /* ---- Lightbox ----
     One <dialog> on the page. Any element with data-lightbox-src becomes
     a trigger: it opens the dialog and swaps in the full-size image.
     Escape closes it (the browser does that for a <dialog>), and the
     focus goes back to the button that opened it. */
  var dialog = document.getElementById("lightbox");
  if (dialog && typeof dialog.showModal === "function") {
    var img = dialog.querySelector(".lightbox__img");
    var caption = dialog.querySelector(".lightbox__caption");
    var opener = null;

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-lightbox-src]");
      if (!trigger || dialog.open) return;
      opener = trigger;
      if (img) {
        img.setAttribute("src", trigger.getAttribute("data-lightbox-src"));
        img.setAttribute("alt", trigger.getAttribute("data-lightbox-alt") || "");
        /* The image is hidden from the accessibility tree while the
           dialog is closed, because it has no source yet. */
        img.removeAttribute("aria-hidden");
      }
      if (caption) {
        var text = trigger.getAttribute("data-lightbox-caption") || "";
        caption.textContent = text;
        if (text) {
          caption.removeAttribute("hidden");
        } else {
          caption.setAttribute("hidden", "");
        }
      }
      dialog.showModal();
    });

    /* Clicking the backdrop (the dialog element itself, not the image)
       closes it. */
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", function () {
      if (img) img.setAttribute("aria-hidden", "true");
      if (opener && typeof opener.focus === "function") opener.focus();
      opener = null;
    });
  }
})();
