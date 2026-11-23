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
})();
