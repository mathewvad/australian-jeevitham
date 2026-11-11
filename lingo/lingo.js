/* Australian Jeevitham Lingo - feedback box and footer year (plain JS, no libraries) */
(function () {
  'use strict';
  function $(id) { return document.getElementById(id); }

  /* ---------- Feedback box: sends the message to the Australian Jeevitham worker, which emails it to Binu ---------- */
  var URL = (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? 'http://localhost:8787' : 'https://aussie-english.australianjeevitham.workers.dev') + '/site-feedback';
  (function () {
    var box = $('fb'); if (!box) return;
    var yes = $('fbYes'), no = $('fbNo'), send = $('fbSend'), out = $('fbOut'), useful = '';
    function say(text, bad) { out.textContent = text; out.style.color = bad ? 'var(--err)' : ''; }
    function choose(v) {
      useful = useful === v ? '' : v;
      [[yes, 'yes'], [no, 'no']].forEach(function (p) { p[0].classList.toggle('on', useful === p[1]); p[0].setAttribute('aria-pressed', String(useful === p[1])); });
      say('');
    }
    yes.addEventListener('click', function () { choose('yes'); });
    no.addEventListener('click', function () { choose('no'); });
    send.addEventListener('click', function () {
      var message = $('fbMsg').value.trim();
      if (!useful && !message) { say('Tap Yes or No, or write a message first.', true); return; }
      send.disabled = true; say('Sending...');
      function fail(status) {
        send.disabled = false;
        say(status === 429 ? 'You have sent a few messages today. Please try again tomorrow.' : 'Sorry, that did not send. Please try again in a minute.', true);
      }
      try {
        fetch(URL, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ useful: useful, message: message, contact: $('fbContact').value.trim(), page: document.title.split('|')[0].trim(), website: $('fbWeb').value })
        }).then(function (r) {
          if (!r.ok) { fail(r.status); return; }
          box.innerHTML = '<h2>Thank you</h2><p class="tl-note" style="margin-top:0;">Your feedback has been sent to Australian Jeevitham.</p>';
        }, function () { fail(0); });
      } catch (e) { fail(0); }
    });
  })();

  var y = $('year'); if (y) y.textContent = new Date().getFullYear();
})();
