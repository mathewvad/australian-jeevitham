// Australian Jeevitham — home page scripts (Design 7 "Watercolour Sketch")

// Shared behaviour for all four designs: year, mobile nav, sticky-nav state, scroll reveal.
(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var toggleBtn = document.querySelector('.nav-toggle-btn');
  var navLinks = document.getElementById('nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var nav = document.querySelector('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll reveal: staggered within each group
  var groups = [
    '.section-head', '.brand-feature-grid > *', '.about-grid > *',
    '.video-grid > *', '.crosslink-grid > *', '.connect-grid > *', '.records, .copyright'
  ];
  var targets = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.classList.add('rv');
      el.style.setProperty('--rv-delay', (i % 4) * 0.09 + 's');
      targets.push(el);
    });
  });
  document.querySelectorAll('.reveal').forEach(function (el) {
    if (targets.indexOf(el) < 0) { el.classList.add('rv'); targets.push(el); }
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // Exposed helper for designs: subtle pointer-follow tilt
  window.ajTilt = function (el, max) {
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;
    max = max || 8;
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(900px) rotateY(' + (x * max) + 'deg) rotateX(' + (-y * max) + 'deg)';
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  };
})();

// Design 7 — the line-art seagulls drift across as the page scrolls.
(function () {
  var birds = document.querySelector('.d-birds');
  if (!birds || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('scroll', function () {
    var y = Math.min(window.scrollY, 700);
    birds.style.translate = (-y * 0.25).toFixed(1) + 'px ' + (y * 0.12).toFixed(1) + 'px';
  }, { passive: true });
})();

/* Top share row: phone Share button + Copy link (added November 2026) */
(function () {
  var rows = document.querySelectorAll('.share-top');
  if (!rows.length) return;
  var canon = document.querySelector('link[rel="canonical"]');
  var url = canon ? canon.href : location.href.split('#')[0];
  var title = document.title;
  Array.prototype.forEach.call(rows, function (row) {
    var msg = row.querySelector('.share-msg');
    var nb = row.querySelector('.share-btn.native');
    var cb = row.querySelector('.share-btn.copy');
    function say(t) { if (!msg) return; msg.textContent = t; setTimeout(function () { msg.textContent = ''; }, 2500); }
    if (nb && navigator.share) {
      nb.hidden = false;
      nb.addEventListener('click', function () { navigator.share({ title: title, url: url }).catch(function () {}); });
    }
    if (cb) cb.addEventListener('click', function () {
      function fallback() {
        var t = document.createElement('textarea');
        t.value = url; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); say('Link copied'); } catch (e) {}
        document.body.removeChild(t);
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(function () { say('Link copied'); }, fallback);
      else fallback();
    });
  });
})();
