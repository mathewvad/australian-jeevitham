/* Australian Jeevitham Tech - shared helpers for the tool pages (plain JS, no libraries) */
(function () {
  'use strict';
  var T = window.AJT = {};

  T.$ = function (id) { return document.getElementById(id); };
  T.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  T.bytes = function (n) { return n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(1) + ' KB' : (n / 1048576).toFixed(2) + ' MB'; };
  T.size = function (s) { return new Blob([s]).size; };

  T.toast = function (msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'jp-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 1600);
  };

  T.copy = function (text, msg) {
    if (!text) { T.toast('Nothing to copy yet'); return; }
    var done = function () { T.toast(msg || 'Copied'); };
    var fallback = function () {
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { T.toast('Copy failed'); }
      ta.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  };

  T.download = function (data, name, type) {
    var blob = data instanceof Blob ? data : new Blob([data], { type: type || 'text/plain' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);
  };

  T.readFile = function (file, as) {
    return new Promise(function (res, rej) {
      var r = new FileReader();
      r.onload = function () { res(r.result); }; r.onerror = rej;
      if (as === 'buffer') r.readAsArrayBuffer(file); else if (as === 'dataurl') r.readAsDataURL(file); else r.readAsText(file);
    });
  };

  // Debounced "input" listener for one or more elements
  T.onInput = function (els, fn, ms) {
    var h; [].concat(els).forEach(function (el) {
      el.addEventListener('input', function () { clearTimeout(h); h = setTimeout(fn, ms === undefined ? 200 : ms); });
      el.addEventListener('change', function () { clearTimeout(h); h = setTimeout(fn, 0); });
    });
  };

  // Set a status box: kind = '' | 'ok' | 'err'
  T.status = function (el, kind, html) { el.className = 'jp-status' + (kind ? ' ' + kind : ''); el.innerHTML = html; };

  // UTF-8 safe base64
  T.bytesToB64 = function (u8) {
    var s = '', CH = 0x8000;
    for (var i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
    return btoa(s);
  };
  T.b64ToBytes = function (b64) {
    var s = b64.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
    if (/[^A-Za-z0-9+/=]/.test(s)) throw new Error('Contains characters that are not Base64');
    while (s.length % 4) s += '=';
    var bin = atob(s), u8 = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    return u8;
  };
  T.hex = function (buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); };

  // Tab key inserts two spaces inside textareas marked data-tabs
  document.addEventListener('keydown', function (e) {
    var el = e.target;
    if (e.key === 'Tab' && el.tagName === 'TEXTAREA' && el.hasAttribute('data-tabs')) {
      e.preventDefault(); el.setRangeText('  ', el.selectionStart, el.selectionEnd, 'end');
      el.dispatchEvent(new Event('input'));
    }
  });

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
