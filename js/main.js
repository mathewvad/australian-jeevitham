(function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav: keep aria-expanded in sync with the checkbox hack
  var toggle = document.getElementById('nav-toggle');
  var toggleBtn = document.querySelector('.nav-toggle-btn');
  if (toggle && toggleBtn) {
    var sync = function () {
      toggleBtn.setAttribute('aria-expanded', toggle.checked ? 'true' : 'false');
    };
    toggle.addEventListener('change', sync);
    sync();
  }

  // Theme toggle (light/dark), persisted in localStorage
  var THEME_KEY = 'aj-theme';
  var root = document.documentElement;
  var themeBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
    if (themeBtn) {
      var isDark = theme === 'dark' ||
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      themeBtn.textContent = isDark ? '☀' : '☾';
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }
})();
