/* Australian Jeevitham Money - shared helpers for the calculators (plain JS, no libraries) */
(function () {
  'use strict';
  var M = window.AJM = {};
  M.$ = function (id) { return document.getElementById(id); };
  M.num = function (id) { var el = M.$(id); var v = el ? parseFloat(String(el.value).replace(/,/g, '')) : NaN; return isFinite(v) ? v : 0; };
  var aud = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  var inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  M.aud = function (n) { return aud.format(Math.round(n)); };
  var audCents = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  M.aud2 = function (n) { return audCents.format(n); }; // with cents
  M.inr = function (n) { return inr.format(Math.round(n)); };
  M.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };

  // Remember small choices on this device only (wrapped: storage can be blocked)
  M.load = function (k) { try { return localStorage.getItem('ajm-' + k); } catch (e) { return null; } };
  M.save = function (k, v) { try { localStorage.setItem('ajm-' + k, v); } catch (e) {} };
  function readJSON(k) { try { var o = JSON.parse(M.load(k) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }

  // Rupee rate typed by the visitor: 1 AUD = ? INR. Shared by every calculator.
  M.rate = function () { var v = M.num('inr'); return v > 0 ? v : 0; };
  M.inrText = function (audAmount) { var r = M.rate(); return r ? M.inr(audAmount * r) : 'Type a rate'; };

  // Re-run fn when any input, select or checkbox inside root changes
  M.watch = function (root, fn) {
    var h;
    root.addEventListener('input', function () { clearTimeout(h); h = setTimeout(fn, 120); });
    root.addEventListener('change', function () { clearTimeout(h); h = setTimeout(fn, 0); });
  };

  /* ---------- Income tax (used by the pay and the move comparison calculators) ---------- */
  // [upper limit of band, rate] - each rate applies to income above the previous limit
  var RATES = {
    res2026: [[18200, 0], [45000, 0.15], [135000, 0.30], [190000, 0.37], [Infinity, 0.45]],
    res2025: [[18200, 0], [45000, 0.16], [135000, 0.30], [190000, 0.37], [Infinity, 0.45]],
    foreign: [[135000, 0.30], [190000, 0.37], [Infinity, 0.45]]
  };
  var MEDICARE_LOW = 27222; // single low-income threshold (latest figure confirmed by the ATO)
  function bandTax(income, bands) {
    var tax = 0, prev = 0;
    for (var i = 0; i < bands.length; i++) {
      var top = bands[i][0];
      if (income > prev) tax += (Math.min(income, top) - prev) * bands[i][1];
      prev = top;
    }
    return tax;
  }
  function lito(income) { // low income tax offset
    if (income <= 37500) return 700;
    if (income <= 45000) return 700 - 0.05 * (income - 37500);
    if (income <= 66667) return Math.max(0, 325 - 0.015 * (income - 45000));
    return 0;
  }
  // gross = yearly pay before tax; year = '2026' or '2025'; resident = true for an Australian tax resident
  M.tax = function (gross, year, resident) {
    var tax = bandTax(gross, resident ? RATES[year === '2025' ? 'res2025' : 'res2026'] : RATES.foreign), med = 0;
    if (resident) {
      tax = Math.max(0, tax - lito(gross));
      med = gross <= MEDICARE_LOW ? 0 : Math.min(0.02 * gross, 0.10 * (gross - MEDICARE_LOW));
    }
    return { tax: tax, med: med, net: gross - tax - med };
  };

  /* ---------- Cities: median weekly rent [name, house, unit] in AUD ---------- */
  // Capital cities: Domain Rental Report, September 2026 (asking rents).
  // Townsville and Cairns: Queensland RTA bond data, July to September 2026 (3-bedroom house, 2-bedroom unit).
  M.CITIES = [
    ['Sydney', 835, 780], ['Melbourne', 600, 600], ['Brisbane', 700, 660], ['Adelaide', 650, 550],
    ['Perth', 750, 700], ['Hobart', 625, 525], ['Canberra', 700, 580], ['Darwin', 800, 650],
    ['Townsville', 580, 470], ['Cairns', 670, 530]
  ];

  /* ---------- "My plan": numbers typed once, kept on this device, shared between calculators ---------- */
  M.persist = false; // nothing is saved until the visitor changes a box - so defaults and other people's shared links are never saved
  M.plan = readJSON('plan');
  M.setPlan = function (o) {
    if (!M.persist) return;
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) M.plan[k] = o[k];
    M.save('plan', JSON.stringify(M.plan));
  };

  function fields(root) {
    return [].filter.call(root.querySelectorAll('input, select'), function (el) {
      return el.id && el.type !== 'range' && el.type !== 'button' && !el.hasAttribute('data-skip');
    });
  }
  function ticks(el) { return el.type === 'checkbox' || el.type === 'radio'; }
  // Every box on the page as { id: value }. forShare leaves out private boxes such as date of birth.
  M.state = function (root, forShare) {
    var o = {};
    fields(root).forEach(function (el) {
      if (forShare && el.hasAttribute('data-private')) return;
      if (ticks(el)) { if (el.checked) o[el.id] = '1'; }
      else if (el.value !== '') o[el.id] = el.value;
    });
    return o;
  };
  M.apply = function (root, o) {
    var names = {};
    fields(root).forEach(function (el) {
      if (ticks(el)) { el.checked = o[el.id] === '1'; if (el.type === 'radio') names[el.name] = 1; }
      else if (o[el.id] != null) { el.value = o[el.id]; if (el.tagName === 'SELECT' && el.selectedIndex < 0) el.selectedIndex = 0; }
    });
    Object.keys(names).forEach(function (n) { // never leave a radio group empty
      var group = root.querySelectorAll('input[type="radio"][name="' + n + '"]');
      if (group.length && ![].some.call(group, function (r) { return r.checked; })) group[0].checked = true;
    });
  };
  // Call once per calculator, after its boxes exist. Refills them from the last visit, or from a shared link.
  M.init = function (root, page) {
    M.root = root; M.page = page;
    var own = readJSON('s-' + page), saved = Object.keys(own).length > 0, shared = false;
    if (saved) M.apply(root, own);
    var r = M.$('inr'), rate = M.load('inr'); if (r && rate) r.value = rate; // the newest rate wins on every page
    var h = String(location.hash || '').slice(1);
    if (h.indexOf('=') > 0) {
      var o = {};
      try { new URLSearchParams(h).forEach(function (v, k) { o[k] = v; }); } catch (e) {}
      if (Object.keys(o).length) { M.apply(root, o); shared = true; }
    }
    function touched() { M.persist = true; }
    root.addEventListener('input', touched, true);
    root.addEventListener('change', touched, true);
    return { saved: saved, shared: shared, own: own };
  };
  M.remember = function () {
    if (!M.persist || !M.root) return;
    M.save('s-' + M.page, JSON.stringify(M.state(M.root)));
    var r = M.$('inr'); if (r && r.value) M.save('inr', r.value);
  };

  /* ---------- Share: a link that carries the numbers on the page ---------- */
  M.link = function () {
    var q = '';
    try { q = new URLSearchParams(M.state(M.root, true)).toString(); } catch (e) {}
    return location.href.split('#')[0] + (q ? '#' + q : '');
  };
  M.shareBar = function (getText) {
    var box = M.$('shareBar'); if (!box) return;
    box.innerHTML = '<button type="button" class="jp-btn m-wa" id="wa">Share on WhatsApp</button>' +
      '<button type="button" class="jp-btn" id="cp">Copy link</button><span class="m-share-msg" id="shareMsg" role="status"></span>';
    M.$('wa').addEventListener('click', function () {
      window.open('https://wa.me/?text=' + encodeURIComponent(getText() + '\n' + M.link()), '_blank', 'noopener');
    });
    M.$('cp').addEventListener('click', function () {
      var link = M.link(), msg = M.$('shareMsg');
      function ok() { msg.textContent = '✓ Link copied'; setTimeout(function () { msg.textContent = ''; }, 2500); }
      function manual() { window.prompt('Copy this link', link); }
      try { navigator.clipboard.writeText(link).then(ok, manual); } catch (e) { manual(); }
    });
  };

  (function () {
    var r = M.$('inr');
    if (r) {
      var saved = M.load('inr'); if (saved && !r.value) r.value = saved;
      r.addEventListener('input', function () { M.save('inr', r.value); });
    }
  })();

  /* ---------- Feedback box: sends the message to the Australian Jeevitham worker, which emails it to Binu ---------- */
  M.FEEDBACK_URL = (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? 'http://localhost:8787' : 'https://aussie-english.australianjeevitham.workers.dev') + '/site-feedback';
  (function () {
    var box = M.$('fb'); if (!box) return;
    var yes = M.$('fbYes'), no = M.$('fbNo'), send = M.$('fbSend'), out = M.$('fbOut'), useful = '';
    function say(text, bad) { out.textContent = text; out.style.color = bad ? 'var(--err)' : ''; }
    function pick(v) {
      useful = useful === v ? '' : v;
      [[yes, 'yes'], [no, 'no']].forEach(function (p) { p[0].classList.toggle('on', useful === p[1]); p[0].setAttribute('aria-pressed', String(useful === p[1])); });
      say('');
    }
    yes.addEventListener('click', function () { pick('yes'); });
    no.addEventListener('click', function () { pick('no'); });
    box.addEventListener('input', function (e) { e.stopPropagation(); });   // typing here must not re-run the calculator
    box.addEventListener('change', function (e) { e.stopPropagation(); });
    send.addEventListener('click', function () {
      var message = M.$('fbMsg').value.trim();
      if (!useful && !message) { say('Tap Yes or No, or write a message first.', true); return; }
      send.disabled = true; say('Sending...');
      function fail(status) {
        send.disabled = false;
        say(status === 429 ? 'You have sent a few messages today. Please try again tomorrow.' : 'Sorry, that did not send. Please try again in a minute.', true);
      }
      try {
        fetch(M.FEEDBACK_URL, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ useful: useful, message: message, contact: M.$('fbContact').value.trim(), page: document.title.split('|')[0].trim(), website: M.$('fbWeb').value })
        }).then(function (r) {
          if (!r.ok) { fail(r.status); return; }
          box.innerHTML = '<h2>Thank you</h2><p class="tl-note" style="margin-top:0;">Your feedback has been sent to Australian Jeevitham.</p>';
        }, function () { fail(0); });
      } catch (e) { fail(0); }
    });
  })();

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
