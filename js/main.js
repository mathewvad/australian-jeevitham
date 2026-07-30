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
})();
