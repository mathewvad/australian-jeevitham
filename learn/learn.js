/* Australian Jeevitham Learn - shared quiz engine, question makers and helpers (plain JS, no libraries) */
(function () {
  'use strict';
  var T = window.AJQ = {};
  T.$ = function (id) { return document.getElementById(id); };
  T.esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  var esc = T.esc;

  // Remember best scores on this device only (wrapped: storage can be blocked)
  T.load = function (k) { try { return localStorage.getItem('ajq-' + k); } catch (e) { return null; } };
  T.save = function (k, v) { try { localStorage.setItem('ajq-' + k, v); } catch (e) {} };
  T.best = function (k) { try { var o = JSON.parse(T.load('best-' + k) || 'null'); return o && o.t > 0 ? o : null; } catch (e) { return null; } };

  /* ---------- Random helpers ---------- */
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(a) { return a[rnd(a.length)]; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function sample(a, n) { return shuffle(a).slice(0, n); }
  function range(a, b) { var o = []; for (var i = a; i <= b; i++) o.push(i); return o; }
  T.rnd = rnd; T.pick = pick; T.shuffle = shuffle; T.sample = sample;

  function clock(s) { var m = Math.floor(s / 60), r = s % 60; return m + ':' + (r < 10 ? '0' : '') + r; }
  T.span = function (s) { var m = Math.floor(s / 60), r = s % 60; return (m ? m + ' min ' : '') + r + ' s'; };

  /* ---------- Quiz engine ----------
     cfg: box (element), make() -> questions, time (seconds, 0 = no timer), instant (show the answer after each question),
          key (name for the best score saved on this device, '' = save nothing), result(res) -> { big, title, text, pass, share, card }
     question: { cat, q (HTML), fig (HTML), opts [HTML], a (index of the right one), why (HTML), pics (true when options are pictures) } */
  T.quiz = function (cfg) {
    var box = cfg.box, qs = [], i = 0, picks = [], chosen = null, locked = false, timer = null, left = 0, started = 0;
    var KEYS = 'ABCDEF';

    function tick() {
      left = Math.max(0, cfg.time - Math.round((Date.now() - started) / 1000));
      var el = box.querySelector('.q-time');
      if (el) { el.textContent = clock(left); el.classList.toggle('low', left <= 60); }
      if (left <= 0) finish(true);
    }
    function start() {
      qs = cfg.make(); i = 0; picks = []; started = Date.now(); left = cfg.time || 0;
      clearInterval(timer);
      if (cfg.time) timer = setInterval(tick, 1000);
      show(true);
    }
    function top() { try { if (box.getBoundingClientRect().top < 0) box.scrollIntoView(); } catch (e) {} }
    function show(first) {
      var q = qs[i];
      chosen = null; locked = false;
      box.innerHTML = '<div class="q-top"><span>Question ' + (i + 1) + ' of ' + qs.length + '</span><span class="q-cat">' + esc(q.cat) + '</span>' +
        (cfg.time ? '<span class="q-time" role="timer" aria-label="Time left">' + clock(left) + '</span>' : '') + '</div>' +
        '<div class="q-prog"><i style="width:' + Math.round(i / qs.length * 100) + '%"></i></div>' +
        '<h2 class="q-text" tabindex="-1">' + q.q + '</h2>' + (q.fig || '') +
        '<div class="q-opts' + (q.pics ? ' pics' + (q.opts.length === 5 ? ' five' : '') : '') + '" role="group" aria-label="Answers">' +
        q.opts.map(function (o, k) {
          return '<button type="button" class="q-opt" data-k="' + k + '" aria-pressed="false"' + (q.pics ? ' aria-label="Picture ' + KEYS.charAt(k) + '"' : '') +
            '><span class="k">' + KEYS.charAt(k) + '</span><span class="v">' + o + '</span></button>';
        }).join('') + '</div><p class="q-why" role="status" hidden></p>' +
        '<div class="jp-bar q-nav"><button type="button" class="jp-btn primary q-next">Skip this question</button></div>';
      top();
      if (!first) { try { box.querySelector('.q-text').focus({ preventScroll: true }); } catch (e) {} }
    }
    function choose(k) {
      if (locked) return;
      var q = qs[i], btns = box.querySelectorAll('.q-opt');
      chosen = k;
      [].forEach.call(btns, function (b, n) { b.classList.toggle('on', n === k); b.setAttribute('aria-pressed', String(n === k)); });
      box.querySelector('.q-next').textContent = i === qs.length - 1 ? 'See my result' : 'Next question';
      if (!cfg.instant) return;
      locked = true;
      box.querySelector('.q-opts').classList.add('locked');
      btns[q.a].classList.add('good');
      if (k !== q.a) btns[k].classList.add('bad');
      var why = box.querySelector('.q-why');
      why.innerHTML = (k === q.a ? '<b>✓ Correct.</b> ' : '<b>✗ Not quite - the answer is ' + KEYS.charAt(q.a) + '.</b> ') + (q.why || '');
      why.classList.toggle('no', k !== q.a);
      why.hidden = false;
    }
    function next() {
      picks[i] = chosen; i++;
      if (i >= qs.length) finish(false); else show(false);
    }
    function finish(timeUp) {
      clearInterval(timer);
      if (timeUp && chosen != null && picks[i] === undefined) picks[i] = chosen; // count the answer that was ticked when time ran out
      var right = 0, cats = [], seen = {}, secs = Math.round((Date.now() - started) / 1000);
      qs.forEach(function (q, n) {
        var ok = picks[n] === q.a;
        if (ok) right++;
        if (!seen[q.cat]) { seen[q.cat] = { name: q.cat, right: 0, total: 0 }; cats.push(seen[q.cat]); }
        seen[q.cat].total++; if (ok) seen[q.cat].right++;
      });
      var res = { right: right, total: qs.length, cats: cats, timeUp: timeUp, secs: cfg.time ? Math.min(secs, cfg.time) : secs, by: seen };
      var r = cfg.result(res);
      if (cfg.key) {
        var old = T.best(cfg.key);
        if (!old || right / qs.length > old.r / old.t) T.save('best-' + cfg.key, JSON.stringify({ r: right, t: qs.length, d: Date.now() }));
      }
      var html = '<div class="q-result"><p class="q-big">' + esc(r.big) + '</p><h2 tabindex="-1">' + esc(r.title) + '</h2><p>' + r.text + '</p>' +
        (r.pass != null ? '<span class="q-pass' + (r.pass ? '' : ' no') + '">' + (r.pass ? 'Pass' : 'Not yet') + '</span>' : '') +
        (timeUp ? '<p class="tl-note">Time ran out, so questions you did not reach count as wrong.</p>' : '') + '</div>';
      if (cats.length > 1) {
        html += '<h3 class="m-h3">Your score by section</h3><div class="q-cats">' + cats.map(function (c) {
          return '<div class="q-row"><span class="l">' + esc(c.name) + '</span><span class="q-bar"><i style="width:' + Math.round(c.right / c.total * 100) + '%"></i></span><span class="v">' + c.right + ' / ' + c.total + '</span></div>';
        }).join('') + '</div>';
      }
      html += '<div class="m-share"><div class="jp-bar q-share"></div></div>' +
        '<div class="jp-bar q-nav"><button type="button" class="jp-btn primary q-again">Try again with new questions</button></div>' +
        '<details class="q-review"><summary>Check your answers</summary><ol>' + qs.map(function (q, n) {
          var p = picks[n], ok = p === q.a;
          function opt(k) { return q.pics ? '<span class="q-mini">' + q.opts[k] + '</span>' : KEYS.charAt(k) + '. ' + q.opts[k]; }
          return '<li><div class="q-rq">' + q.q + '</div>' + (q.fig || '') +
            '<p class="' + (ok ? 'yes' : 'no') + '">' + (p == null ? '✗ Not answered' : (ok ? '✓' : '✗') + ' Your answer: ' + opt(p)) + '</p>' +
            (ok ? '' : '<p>Right answer: ' + opt(q.a) + '</p>') + (q.why ? '<p>' + q.why + '</p>' : '') + '</li>';
        }).join('') + '</ol></details>';
      box.innerHTML = html;
      T.shareBar(box.querySelector('.q-share'), r.share, r.card);
      top(); try { box.querySelector('h2').focus({ preventScroll: true }); } catch (e) {}
      if (cfg.done) cfg.done(res);
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b || !box.contains(b)) return;
      if (b.classList.contains('q-opt')) choose(+b.getAttribute('data-k'));
      else if (b.classList.contains('q-next')) next();
      else if (b.classList.contains('q-again') || b.classList.contains('q-start')) start();
    });
    return { start: start };
  };

  /* ---------- Share: WhatsApp, Facebook, a result card picture and a link ---------- */
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = String(text).split(' '), line = '';
    words.forEach(function (w) {
      var test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line, x, y); line = w; y += lineHeight; } else line = test;
    });
    if (line) ctx.fillText(line, x, y);
    return y + lineHeight;
  }
  // card: { name (test name), big, line } -> PNG blob, 1080 x 1080
  T.card = function (card, done) {
    var c = document.createElement('canvas'); c.width = 1080; c.height = 1080;
    var x = c.getContext('2d');
    x.fillStyle = '#1B2A4A'; x.fillRect(0, 0, 1080, 1080);
    x.fillStyle = '#13203A'; x.beginPath(); x.arc(1010, 110, 330, 0, 7); x.fill();
    x.fillStyle = '#EE4A23'; x.fillRect(0, 1040, 1080, 40); x.fillRect(90, 250, 120, 12);
    x.textBaseline = 'alphabetic'; x.textAlign = 'left';
    x.fillStyle = '#FFFFFF'; x.font = '800 50px Poppins, Arial, sans-serif'; x.fillText('Australian Jeevitham', 90, 150);
    x.fillStyle = '#8FC3E6'; x.font = '700 30px "Space Mono", Consolas, monospace'; x.fillText('TESTS AND QUIZZES', 90, 205);
    x.fillStyle = '#BFDDF1'; x.font = '700 54px Poppins, Arial, sans-serif';
    var y = wrapText(x, card.name, 90, 390, 900, 66);
    var size = 270; x.fillStyle = '#FFFFFF';
    do { size -= 10; x.font = '800 ' + size + 'px Poppins, Arial, sans-serif'; } while (x.measureText(card.big).width > 900 && size > 80);
    var baseline = y + size * 0.8 + 10;
    x.fillText(card.big, 84, baseline);
    x.fillStyle = '#FFFFFF'; x.font = '600 44px Inter, Arial, sans-serif';
    wrapText(x, card.line, 90, baseline + 90, 900, 58);
    x.fillStyle = '#8FC3E6'; x.font = '700 30px "Space Mono", Consolas, monospace'; x.fillText('australianjeevitham.com/learn', 90, 990);
    if (c.toBlob) c.toBlob(done, 'image/png'); else done(null);
  };
  T.shareBar = function (el, text, card) {
    if (!el) return;
    var url = location.href.split('#')[0];
    el.innerHTML = '<button type="button" class="jp-btn m-wa" data-s="wa">Share on WhatsApp</button>' +
      '<button type="button" class="jp-btn" data-s="fb">Share on Facebook</button>' +
      (card ? '<button type="button" class="jp-btn" data-s="card">Get result card</button>' : '') +
      '<button type="button" class="jp-btn" data-s="cp">Copy link</button><span class="m-share-msg" role="status"></span>';
    var msg = el.querySelector('.m-share-msg');
    function say(t) { msg.textContent = t; setTimeout(function () { msg.textContent = ''; }, 3000); }
    el.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null, s = b && b.getAttribute('data-s');
      if (s === 'wa') window.open('https://wa.me/?text=' + encodeURIComponent(text + '\n' + url), '_blank', 'noopener');
      if (s === 'fb') window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'noopener');
      if (s === 'cp') {
        var manual = function () { window.prompt('Copy this link', url); };
        try { navigator.clipboard.writeText(url).then(function () { say('✓ Link copied'); }, manual); } catch (err) { manual(); }
      }
      if (s === 'card') {
        T.card(card, function (blob) {
          if (!blob) { say('Sorry, this browser cannot make the picture.'); return; }
          var file = null;
          try { file = new File([blob], 'australian-jeevitham-result.png', { type: 'image/png' }); } catch (err) {}
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], text: text + '\n' + url }).catch(function () {});
            return;
          }
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob); a.download = 'australian-jeevitham-result.png';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
          say('✓ Picture saved');
        });
      }
    });
  };

  /* ---------- Questions from a written list ---------- */
  // item: [section, question, [right answer, wrong, wrong, ...], explanation]
  T.ask = function (item) {
    var opts = shuffle(item[2]);
    return { cat: item[0], q: esc(item[1]), opts: opts.map(esc), a: opts.indexOf(item[2][0]), why: esc(item[3] || '') };
  };
  // words: [word or phrase, meaning, example sentence] - wrong answers are the meanings of other words
  T.words = function (list, n, cat) {
    return sample(list, n).map(function (w) {
      var wrong = sample(list.filter(function (o) { return o[1] !== w[1]; }), 3).map(function (o) { return o[1]; });
      var opts = shuffle([w[1]].concat(wrong));
      return { cat: cat, q: 'What does “' + esc(w[0]) + '” mean?', opts: opts.map(esc), a: opts.indexOf(w[1]),
        why: '“' + esc(w[0]) + '” means: ' + esc(w[1]) + '.' + (w[2] ? ' Example: <i>' + esc(w[2]) + '</i>' : '') };
    });
  };

  /* ---------- Question makers: fresh questions every time ---------- */
  var G = T.gen = {};
  var INK = '#1B2A4A', FILLS = ['#FFFFFF', '#8FC3E6', '#1B2A4A'];
  var SPOTS = { 1: [[50, 50, 24]], 2: [[30, 50, 15], [70, 50, 15]], 3: [[50, 31, 14], [29, 68, 14], [71, 68, 14]] };
  var DOTS = [[11, 11], [89, 11], [89, 89], [11, 89]];
  function shape(s, x, y, r, fill) {
    var a = ' fill="' + fill + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
    function poly(p) { return '<polygon points="' + p.map(function (v) { return (x + v[0] * r).toFixed(1) + ',' + (y + v[1] * r).toFixed(1); }).join(' ') + '"' + a; }
    switch (s) {
      case 0: return '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 0.94).toFixed(1) + '"' + a;
      case 1: return '<rect x="' + (x - r * 0.86).toFixed(1) + '" y="' + (y - r * 0.86).toFixed(1) + '" width="' + (r * 1.72).toFixed(1) + '" height="' + (r * 1.72).toFixed(1) + '"' + a;
      case 2: return poly([[0, -1], [1, 0.82], [-1, 0.82]]);
      case 3: return poly([[0, -1.08], [0.78, 0], [0, 1.08], [-0.78, 0]]);
      case 4: return poly([[-0.36, -1], [0.36, -1], [0.36, -0.36], [1, -0.36], [1, 0.36], [0.36, 0.36], [0.36, 1], [-0.36, 1], [-0.36, 0.36], [-1, 0.36], [-1, -0.36], [-0.36, -0.36]]);
      default: return poly([[-0.52, -0.9], [0.52, -0.9], [1.04, 0], [0.52, 0.9], [-0.52, 0.9], [-1.04, 0]]);
    }
  }
  // cell: { s: shape 0-5, n: how many 1-3, f: shading 0-2, d: orange dot corner 0-3 or -1 for none }
  T.cell = function (c) {
    var out = SPOTS[c.n].map(function (p) { return shape(c.s, p[0], p[1], p[2], FILLS[c.f]); }).join('');
    if (c.d >= 0) out += '<circle cx="' + DOTS[c.d][0] + '" cy="' + DOTS[c.d][1] + '" r="6.5" fill="#EE4A23"/>';
    return out;
  };
  T.pic = function (c) { return '<svg class="q-svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' + T.cell(c) + '</svg>'; };
  function key(c) { return [c.s, c.n, c.f, c.d].join('-'); }
  function copy(c) { return { s: c.s, n: c.n, f: c.f, d: c.d }; }

  var DOM = { s: [0, 1, 2, 3, 4, 5], n: [1, 2, 3], f: [0, 1, 2], d: [0, 1, 2, 3] };
  var RULES = [
    function (r, c) { return c; }, function (r, c) { return r; },
    function (r, c) { return (r + c) % 3; }, function (r, c) { return (c - r + 3) % 3; }
  ];
  var NAME = { s: 'The shape', n: 'The number of shapes', f: 'The shading', d: 'The place of the orange dot' };
  var HOW = ['changes the same way across every row', 'stays the same along each row and changes from one row to the next',
    'is different in every row and in every column', 'is different in every row and in every column'];

  // Pattern puzzle: a 3 x 3 grid with the last picture missing. level 1-3 = how many things change.
  G.matrix = function (level) {
    level = Math.max(1, Math.min(3, level || 1));
    var vary = sample(['s', 'n', 'f', 'd'], level), plan = {};
    var base = { s: pick(DOM.s), n: pick([1, 1, 2]), f: pick(DOM.f), d: -1 };
    vary.forEach(function (k) { plan[k] = { vals: sample(DOM[k], 3), rule: level === 1 ? rnd(2) : rnd(4) }; });
    function at(r, c) { var o = copy(base); vary.forEach(function (k) { o[k] = plan[k].vals[RULES[plan[k].rule](r, c)]; }); return o; }
    var ans = at(2, 2), seen = {}, wrong = [], guard = 0;
    seen[key(ans)] = 1;
    while (wrong.length < 5 && guard++ < 400) {
      var o = copy(ans), k = guard % 3 ? pick(vary) : pick(['s', 'n', 'f']), v = pick(DOM[k]);
      if (v === o[k]) continue;
      o[k] = v;
      if (!seen[key(o)]) { seen[key(o)] = 1; wrong.push(o); }
    }
    var opts = shuffle([ans].concat(wrong)), grid = '';
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) {
      var last = r === 2 && c === 2;
      grid += '<g transform="translate(' + (c * 112 + 2) + ',' + (r * 112 + 2) + ')">' +
        (last ? '<rect width="100" height="100" rx="12" fill="#FFF6F2" stroke="#EE4A23" stroke-width="2.5" stroke-dasharray="7 6"/><text x="50" y="68" text-anchor="middle" font-family="Poppins,Arial,sans-serif" font-weight="800" font-size="52" fill="#EE4A23">?</text>'
          : '<rect width="100" height="100" rx="12" fill="#FFFFFF" stroke="#C9D3E0" stroke-width="2"/>' + T.cell(at(r, c))) + '</g>';
    }
    return {
      cat: 'Patterns', q: 'Which picture belongs in the empty box?', pics: true,
      fig: '<div class="q-fig"><svg viewBox="0 0 328 328" role="img" aria-label="A grid of nine boxes with shapes. The last box is empty."><rect width="328" height="328" fill="none"/>' + grid + '</svg></div>',
      opts: opts.map(T.pic), a: opts.indexOf(ans),
      why: vary.map(function (k) { return NAME[k] + ' ' + HOW[plan[k].rule] + '.'; }).join(' '),
      _cells: opts.map(key)
    };
  };

  // Odd one out with pictures: four share one thing, one does not. level 2 = the other things vary too.
  G.oddPic = function (level) {
    var keys = shuffle(['s', 'n', 'f']), t = keys[0], tv = sample(DOM[t], 2), odd = rnd(5), items = [];
    var others = keys.slice(1).map(function (k) {
      return { k: k, v: sample(DOM[k], 2), mask: level > 1 ? shuffle([0, 0, 0, 1, 1]) : [0, 0, 0, 0, 0] };
    });
    for (var i = 0; i < 5; i++) {
      var o = { d: -1 };
      o[t] = i === odd ? tv[1] : tv[0];
      for (var j = 0; j < others.length; j++) o[others[j].k] = others[j].v[others[j].mask[i]];
      items.push(o);
    }
    return { cat: 'Odd one out', q: 'Which picture does not belong with the others?', pics: true, opts: items.map(T.pic), a: odd,
      why: 'Four pictures have the same ' + { s: 'shape', n: 'number of shapes', f: 'shading' }[t] + '. This one is different.', _cells: items.map(key), _t: t };
  };

  function isSquare(n) { var r = Math.round(Math.sqrt(n)); return r * r === n; }
  // Odd one out with numbers
  G.oddNum = function () {
    var type = rnd(3), good, bad, why, test, pool;
    if (type === 0) {
      var k = pick([3, 4, 6, 7, 9]);
      good = sample(range(2, 12), 4).map(function (m) { return m * k; });
      test = function (n) { return n % k !== 0 && (k % 2 || n % 2 === 0); };
      pool = range(k * 2 + 1, k * 12);
      why = 'All the other numbers can be divided by ' + k + '.';
    } else if (type === 1) {
      good = sample(range(2, 12), 4).map(function (m) { return m * m; });
      test = function (n) { return !isSquare(n); };
      pool = range(5, 150);
      why = 'All the other numbers are square numbers - a number multiplied by itself, like 5 × 5 = 25.';
    } else {
      good = sample([3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47], 4);
      test = function () { return true; };
      pool = [9, 15, 21, 25, 27, 33, 35, 39, 45, 49];
      why = 'All the other numbers are prime numbers - they can only be divided by 1 and by themselves.';
    }
    // Make sure odd/even does not point to a different number
    var evens = good.filter(function (n) { return n % 2 === 0; }).length;
    var ok = pool.filter(function (n) {
      if (!test(n) || good.indexOf(n) >= 0) return false;
      if (evens === 1) return n % 2 === 0;
      if (evens === 3) return n % 2 === 1;
      return true;
    });
    bad = pick(ok);
    var opts = shuffle(good.concat([bad]));
    return { cat: 'Odd one out', q: 'Which number does not belong with the others?', opts: opts.map(String), a: opts.indexOf(bad), why: why, _good: good, _bad: bad };
  };

  function numOpts(a, cands, fmt) {
    var out = [], i;
    cands.concat([a + 1, a - 1, a + 2, a - 2, a + 10, a - 10, a + 5, a * 2, a + 3]).forEach(function (v) {
      if (out.length < 3 && v !== a && v > 0 && out.indexOf(v) < 0 && Math.round(v * 100) === v * 100) out.push(v);
    });
    for (i = 4; out.length < 3; i++) if (out.indexOf(a + i) < 0) out.push(a + i);
    var all = out.concat([a]).sort(function (p, q) { return p - q; });
    return { opts: all.map(fmt || String), a: all.indexOf(a) };
  }

  // Number series. level 1-3.
  G.series = function (level) {
    var s = [], why, i, t = rnd(3), n = 6;
    level = Math.max(1, Math.min(3, level || 1));
    if (level === 1 && t) {
      var d = pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12]) * (rnd(4) ? 1 : -1);
      s[0] = d > 0 ? 1 + rnd(20) : 80 + rnd(40);
      for (i = 1; i <= n; i++) s[i] = s[i - 1] + d;
      why = d > 0 ? 'Add ' + d + ' each time.' : 'Take away ' + (-d) + ' each time.';
    } else if (level === 1) {
      var m = pick([2, 3]); n = 5; s[0] = 1 + rnd(4);
      for (i = 1; i <= n; i++) s[i] = s[i - 1] * m;
      why = 'Multiply by ' + m + ' each time.';
    } else if (level === 2 && t === 0) {
      var step = 1 + rnd(4), inc = pick([1, 2, 3]); s[0] = 1 + rnd(10);
      for (i = 1; i <= n; i++) { s[i] = s[i - 1] + step; step += inc; }
      why = 'The step grows by ' + inc + ' each time: +' + (s[1] - s[0]) + ', +' + (s[2] - s[1]) + ', +' + (s[3] - s[2]) + ' and so on.';
    } else if (level === 2 && t === 1) {
      var up = 4 + rnd(7), down = 1 + rnd(up - 2); s[0] = 2 + rnd(12);
      for (i = 1; i <= n; i++) s[i] = s[i - 1] + (i % 2 ? up : -down);
      why = 'Two steps take turns: +' + up + ', then −' + down + '.';
    } else if (level === 2) {
      var n0 = 1 + rnd(4), plus = rnd(4); n = 5;
      for (i = 0; i <= n; i++) s[i] = (n0 + i) * (n0 + i) + plus;
      why = 'These are square numbers (' + n0 + ' × ' + n0 + ', ' + (n0 + 1) + ' × ' + (n0 + 1) + ' and so on)' + (plus ? ' plus ' + plus : '') + '.';
    } else if (t === 0) {
      s[0] = 1 + rnd(6); s[1] = 1 + rnd(6);
      for (i = 2; i <= n; i++) s[i] = s[i - 1] + s[i - 2];
      why = 'Each number is the two numbers before it added together.';
    } else if (t === 1) {
      var c = pick([1, 2, 3, -1, -2]); n = 5; s[0] = 3 + rnd(4);
      for (i = 1; i <= n; i++) s[i] = s[i - 1] * 2 + c;
      why = 'Double the number, then ' + (c > 0 ? 'add ' + c : 'take away ' + (-c)) + '.';
    } else {
      var p = 2 + rnd(5), q = 2 + rnd(5), a0 = 1 + rnd(9), b0 = 20 + rnd(20); n = 7;
      if (q === p) q = p + 1;
      for (i = 0; i <= n; i++) s[i] = i % 2 ? b0 + q * ((i - 1) / 2) : a0 + p * (i / 2);
      why = 'Two patterns take turns. The 1st, 3rd, 5th and 7th numbers go up by ' + p + '. The 2nd, 4th, 6th and 8th go up by ' + q + '.';
    }
    var ans = s[n], shown = s.slice(0, n), last = shown[n - 1], o = numOpts(ans, [last + (last - shown[n - 2]), ans + (ans - last > 1 ? 1 : 2), last + 1, ans - 2]);
    return { cat: 'Number series', q: 'Which number comes next?', fig: '<p class="q-seq">' + shown.join(', ') + ', ?</p>', opts: o.opts, a: o.a, why: why, _s: s };
  };

  var NONSENSE = ['zips', 'moks', 'tals', 'rins', 'bofs', 'lums', 'veps', 'daks', 'pims', 'gorts'];
  var TRUTH = ['It must be true', 'It must be false', 'We cannot tell'];
  // [first fact, second fact, conclusion, answer 0-2, why]
  var LOGIC = [
    ['All A are B.', 'All B are C.', 'All A are C.', 0, 'All A are B, and all B are C, so all A are C.'],
    ['All A are B.', 'All B are C.', 'All C are A.', 2, 'All A are C, but there may be other C that are not A.'],
    ['All A are B.', 'No B are C.', 'No A are C.', 0, 'All A are B, and no B are C, so no A can be C.'],
    ['All A are B.', 'No B are C.', 'Some A are C.', 1, 'All A are B, and no B are C, so no A can be C.'],
    ['All A are B.', 'Some B are C.', 'Some A are C.', 2, 'The B that are C may or may not be A.'],
    ['Some A are B.', 'All B are C.', 'Some A are C.', 0, 'The A that are B are also C, because all B are C.'],
    ['No A are B.', 'All C are B.', 'No C are A.', 0, 'All C are B, and no B are A, so no C can be A.'],
    ['All A are B.', 'All C are B.', 'All A are C.', 2, 'A and C are both kinds of B, but that tells us nothing about each other.'],
    ['No A are B.', 'No B are C.', 'No A are C.', 2, 'A and C are both kept apart from B, but they could still overlap with each other.'],
    ['All A are B.', 'All B are C.', 'Some A are not C.', 1, 'All A are B, and all B are C, so all A are C.'],
    ['Some A are B.', 'No B are C.', 'Some A are not C.', 0, 'The A that are B cannot be C, because no B are C.'],
    ['All A are B.', 'Some C are A.', 'Some C are B.', 0, 'The C that are A must also be B, because all A are B.']
  ];
  G.LOGIC_COUNT = LOGIC.length;
  // Logic with made-up words, so only the reasoning counts
  G.logic = function (which) {
    var L = LOGIC[typeof which === 'number' && which >= 0 && which < LOGIC.length ? which : rnd(LOGIC.length)], w = sample(NONSENSE, 3);
    function f(s) { return s.replace(/\b([ABC])\b/g, function (x) { return w['ABC'.indexOf(x)]; }).replace(/^./, function (x) { return x.toUpperCase(); }); }
    return { cat: 'Logic', q: '<span>' + f(L[0]) + ' ' + f(L[1]) + '</span>Someone says: “' + f(L[2]) + '” Is that right?', opts: TRUTH.slice(), a: L[3], why: f(L[4]), _p: L };
  };

  var PEOPLE = ['Anu', 'Biju', 'Deepa', 'Manu', 'Neena', 'Sajan', 'Priya', 'Rahul', 'Jaya', 'Vinod'];
  var COMPARE = [['taller', 'shorter', 'tallest', 'shortest'], ['older', 'younger', 'oldest', 'youngest'], ['faster', 'slower', 'fastest', 'slowest']];
  // Put people in order from a few facts. count = 3 or 4 people.
  G.order = function (count) {
    count = count === 4 ? 4 : 3;
    var who = sample(PEOPLE, count), w = pick(COMPARE), facts = [], i, ask, ans;
    for (i = 0; i < count - 1; i++) facts.push(rnd(2) ? who[i] + ' is ' + w[0] + ' than ' + who[i + 1] + '.' : who[i + 1] + ' is ' + w[1] + ' than ' + who[i] + '.');
    facts = shuffle(facts);
    var mode = count === 4 ? rnd(3) : rnd(2);
    if (mode === 0) { ask = 'Who is the ' + w[2] + '?'; ans = who[0]; }
    else if (mode === 1) { ask = 'Who is the ' + w[3] + '?'; ans = who[count - 1]; }
    else { ask = 'Who is the second ' + w[2] + '?'; ans = who[1]; }
    var opts = shuffle(who);
    return { cat: 'Logic', q: '<span>' + facts.join(' ') + '</span>' + ask, opts: opts, a: opts.indexOf(ans),
      why: 'From ' + w[2] + ' to ' + w[3] + ' the order is: ' + who.join(', ') + '.', _who: who };
  };

  function money(n) { return '$' + (Math.round(n * 100) / 100).toLocaleString('en-AU', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  // Number questions for job aptitude practice
  G.number = function () {
    var t = rnd(8), q, a, why, cands = [], fmt = String, p, base, x, y, k;
    if (t === 0) {
      p = pick([5, 10, 15, 20, 25, 30, 40, 60, 75]); base = 20 * (2 + rnd(24)); a = base * p / 100;
      q = 'What is ' + p + '% of ' + base + '?'; cands = [base * (100 - p) / 100, a * 2, a / 2, a + 10];
      why = p + '% of ' + base + ' is ' + base + ' × ' + p + ' ÷ 100 = ' + a + '.';
    } else if (t === 1) {
      p = pick([10, 20, 25, 30, 40, 50]); base = 20 * (2 + rnd(14)); a = base * (100 - p) / 100; fmt = money;
      q = 'A jacket costs ' + money(base) + '. It is on sale at ' + p + '% off. What is the sale price?';
      cands = [base * p / 100, base - p, a + base / 10, a - base / 20];
      why = p + '% of ' + money(base) + ' is ' + money(base * p / 100) + '. ' + money(base) + ' − ' + money(base * p / 100) + ' = ' + money(a) + '.';
    } else if (t === 2) {
      x = 2 * (12 + rnd(14)); y = pick([4, 5.5, 6, 7.5, 8, 9.5, 10]); a = x * y; fmt = money;
      q = 'You earn ' + money(x) + ' an hour and work ' + y + ' hours. How much do you earn?';
      cands = [x * (y + 1), x * (y - 1), a + x / 2, a - x / 2];
      why = money(x) + ' × ' + y + ' = ' + money(a) + '.';
    } else if (t === 3) {
      x = 1 + rnd(4); y = x + 1 + rnd(3); k = 10 * (1 + rnd(8)); a = y * k; fmt = money;
      q = 'Two workers share ' + money((x + y) * k) + ' in the ratio ' + x + ':' + y + '. How much is the larger share?';
      cands = [x * k, (x + y) * k / 2, a + k, a - k / 2];
      why = 'There are ' + x + ' + ' + y + ' = ' + (x + y) + ' parts. One part is ' + money(k) + ', so the larger share is ' + y + ' × ' + money(k) + ' = ' + money(a) + '.';
    } else if (t === 4) {
      x = pick([40, 50, 60, 70, 80, 90, 100]); y = pick([2, 3, 4, 5, 1.5, 2.5]); a = x; fmt = function (n) { return n + ' km/h'; };
      q = 'A truck travels ' + (x * y) + ' km in ' + y + ' hours. What is its average speed?';
      cands = [x + 10, x - 10, x + 20, x - 5];
      why = 'Speed = distance ÷ time = ' + (x * y) + ' ÷ ' + y + ' = ' + x + ' km/h.';
    } else if (t === 5) {
      a = 10 + rnd(40); var v = [a - 6, a - 2, a + 3, a + 5].map(function (n) { return n; }); v = shuffle(v);
      q = 'What is the average of ' + v.slice(0, 3).join(', ') + ' and ' + v[3] + '?';
      cands = [a + 1, a - 1, a + 2, a - 2];
      why = 'Add them: ' + v.join(' + ') + ' = ' + (a * 4) + '. Divide by 4: ' + a + '.';
    } else if (t === 6) {
      base = pick([20, 40, 60, 80, 200]); p = pick([10, 20, 25, 50]); a = p; fmt = function (n) { return n + '%'; };
      x = base * (100 + p) / 100;
      q = 'A price goes up from ' + money(base) + ' to ' + money(x) + '. What is the rise in per cent?';
      cands = [x - base, p + 5, p / 2, p * 2, p + 10].filter(function (n) { return n !== p; });
      why = 'The rise is ' + money(x - base) + '. ' + money(x - base) + ' ÷ ' + money(base) + ' × 100 = ' + p + '%.';
    } else {
      k = 6 + rnd(19); x = pick([4, 5, 6, 8, 10, 12]); y = x + 1 + rnd(6); a = k * y;
      q = x + ' boxes hold ' + (k * x) + ' items. How many items do ' + y + ' boxes hold?';
      cands = [k * (y + 1), k * (y - 1), k * x + y, a + x];
      why = 'One box holds ' + (k * x) + ' ÷ ' + x + ' = ' + k + ' items. ' + y + ' boxes hold ' + y + ' × ' + k + ' = ' + a + '.';
    }
    var o = numOpts(a, cands, fmt);
    return { cat: 'Numbers', q: esc(q), opts: o.opts, a: o.a, why: esc(why), _a: a };
  };

  /* ---------- Feedback box: sends the message to the Australian Jeevitham worker, which emails it to Binu ---------- */
  T.FEEDBACK_URL = (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? 'http://localhost:8787' : 'https://aussie-english.australianjeevitham.workers.dev') + '/site-feedback';
  (function () {
    var box = T.$('fb'); if (!box) return;
    var yes = T.$('fbYes'), no = T.$('fbNo'), send = T.$('fbSend'), out = T.$('fbOut'), useful = '';
    function say(text, bad) { out.textContent = text; out.style.color = bad ? 'var(--err)' : ''; }
    function choose(v) {
      useful = useful === v ? '' : v;
      [[yes, 'yes'], [no, 'no']].forEach(function (p) { p[0].classList.toggle('on', useful === p[1]); p[0].setAttribute('aria-pressed', String(useful === p[1])); });
      say('');
    }
    yes.addEventListener('click', function () { choose('yes'); });
    no.addEventListener('click', function () { choose('no'); });
    send.addEventListener('click', function () {
      var message = T.$('fbMsg').value.trim();
      if (!useful && !message) { say('Tap Yes or No, or write a message first.', true); return; }
      send.disabled = true; say('Sending...');
      function fail(status) {
        send.disabled = false;
        say(status === 429 ? 'You have sent a few messages today. Please try again tomorrow.' : 'Sorry, that did not send. Please try again in a minute.', true);
      }
      try {
        fetch(T.FEEDBACK_URL, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ useful: useful, message: message, contact: T.$('fbContact').value.trim(), page: document.title.split('|')[0].trim(), website: T.$('fbWeb').value })
        }).then(function (r) {
          if (!r.ok) { fail(r.status); return; }
          box.innerHTML = '<h2>Thank you</h2><p class="tl-note" style="margin-top:0;">Your feedback has been sent to Australian Jeevitham.</p>';
        }, function () { fail(0); });
      } catch (e) { fail(0); }
    });
  })();

  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
