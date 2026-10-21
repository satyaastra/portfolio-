// Satyanarayana Reddy T — profile page interactions (offline, no dependencies)
(function () {
  "use strict";

  var root = document.documentElement;

  // ---------- Light / dark theme toggle ----------
  var themeBtn = document.getElementById("themeBtn");
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) { /* private mode */ }
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
    // If the user never chose a theme, follow the system setting live.
    try {
      if (window.matchMedia && !localStorage.getItem("theme")) {
        matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
          setTheme(e.matches ? "dark" : "light");
        });
      }
    } catch (e) { /* older browsers / restricted storage */ }
  }

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    // Close menu after picking a link (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); }
    });
  }

  // Highlight current section in the navbar while scrolling
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function setActive() {
    var fromTop = window.scrollY + 120;
    var currentId = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= fromTop) { currentId = sec.id; }
    });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
    });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // Note: every asset (CSS, JS, photo, resume/cover-letter PDFs) is linked locally,
  // so the page also works fully offline from a USB drive or any folder.
})();
