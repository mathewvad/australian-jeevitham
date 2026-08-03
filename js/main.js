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

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Animated number count-up (media kit follower/view stats) ----
  function formatNumber(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    if (isNaN(target)) return;

    if (prefersReducedMotion) {
      el.textContent = formatNumber(target);
      return;
    }

    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out-cubic for a natural deceleration
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatNumber(target * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target);
      }
    }
    requestAnimationFrame(step);
  }

  // ---- Scroll-triggered reveal (fade + rise into view) ----
  var revealEls = document.querySelectorAll('.reveal');
  var countEls = document.querySelectorAll('[data-count-to]');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');

        // If this revealed block contains (or is) an unfired counter, start it now
        var counters = entry.target.matches('[data-count-to]')
          ? [entry.target]
          : entry.target.querySelectorAll('[data-count-to]');
        counters.forEach(function (el) {
          if (!el.dataset.counted) {
            el.dataset.counted = 'true';
            animateCount(el);
          }
        });

        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });

    // Any counters that live outside a .reveal wrapper still need triggering
    var revealSet = new Set(revealEls);
    countEls.forEach(function (el) {
      var insideReveal = el.closest && el.closest('.reveal');
      if (insideReveal) return; // already handled above
      var counterObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || el.dataset.counted) return;
          el.dataset.counted = 'true';
          animateCount(el);
          obs.disconnect();
        });
      }, { threshold: 0.2 });
      counterObserver.observe(el);
    });
  } else {
    // No IntersectionObserver support: just show everything, counted immediately
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
    countEls.forEach(function (el) {
      if (!el.dataset.counted) {
        el.dataset.counted = 'true';
        animateCount(el);
      }
    });
  }
})();
