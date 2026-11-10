/* Australian Jeevitham Money - shared helpers for the calculators (plain JS, no libraries) */
(function () {
  'use strict';
  var M = window.AJM = {};
  M.$ = function (id) { return document.getElementById(id); };
  M.num = function (id) { var el = M.$(id); var v = el ? parseFloat(String(el.value).replace(/,/g, '')) : NaN; return isFinite(v) ? v : 0; };
  var aud = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  var inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  M.aud = function (n) { return aud.format(Math.round(n)); };
  M.inr = function (n) { return inr.format(Math.round(n)); };
  M.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };

  // Remember small choices on this device only (wrapped: storage can be blocked)
  M.load = function (k) { try { return localStorage.getItem('ajm-' + k); } catch (e) { return null; } };
  M.save = function (k, v) { try { localStorage.setItem('ajm-' + k, v); } catch (e) {} };

  // Rupee rate typed by the visitor: 1 AUD = ? INR. Shared by every calculator.
  M.rate = function () { var v = M.num('inr'); return v > 0 ? v : 0; };
  M.inrText = function (audAmount) { var r = M.rate(); return r ? M.inr(audAmount * r) : 'Type a rate'; };

  // Re-run fn when any input, select or checkbox inside root changes
  M.watch = function (root, fn) {
    var h;
    root.addEventListener('input', function () { clearTimeout(h); h = setTimeout(fn, 120); });
    root.addEventListener('change', function () { clearTimeout(h); h = setTimeout(fn, 0); });
  };

  (function () {
    var r = M.$('inr');
    if (r) {
      var saved = M.load('inr'); if (saved && !r.value) r.value = saved;
      r.addEventListener('input', function () { M.save('inr', r.value); });
    }
  })();

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
