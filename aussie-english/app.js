(function(){
  'use strict';

  var app = document.getElementById('app');

  // AI conversation server (aussie-english-worker). For free local testing with canned replies,
  // run `npx wrangler dev` in that folder and use 'http://127.0.0.1:8787' here instead.
  var TALK_API = 'https://aussie-english.australianjeevitham.workers.dev';
  // Teaching tier for Talk. Only 'leadership' exists so far; beginner, intermediate and advanced come later.
  var LEVEL = 'leadership';
  var LEVEL_MALAYALAM = false;   // leadership chats are English-only; lower tiers will turn this on

  /* ---------- Icons (24px line icons) ---------- */
  function svg(d){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; }
  var I = {
    home: svg('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>'),
    book: svg('<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5V4.5"/>'),
    chat: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.8A8 8 0 1 1 21 12z"/>'),
    cards: svg('<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/>'),
    bulb: svg('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V17h5v-1.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>'),
    mic: svg('<rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3.5"/>'),
    speaker: svg('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>'),
    send: svg('<path d="m4 12 16-8-6 16-2.5-6.5z"/>'),
    keyboard: svg('<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>'),
    back: svg('<path d="m15 18-6-6 6-6"/>'),
    chev: svg('<path d="m9 18 6-6-6-6"/>'),
    restart: svg('<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: svg('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
    auto: svg('<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>'),
    check: svg('<path d="m5 12.5 4.5 4.5L19 7"/>'),
    spark: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
    pencil: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/>'),
    save: svg('<path d="M6 3h12v18l-6-4-6 4z"/>'),
    spinner: svg('<path d="M21 12a9 9 0 1 1-9-9"/>'),
    x: svg('<path d="M6 6l12 12M18 6 6 18"/>')
  };
  document.querySelectorAll('[data-icon]').forEach(function(el){ el.innerHTML = I[el.dataset.icon] || ''; });

  /* ---------- Preferences: theme and text size ---------- */
  var PREF_KEY = 'aj-english-prefs';
  var prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(PREF_KEY)) || {}; } catch(e) {}
  function savePrefs(){ try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch(e) {} }
  var themeBtn = document.getElementById('themeBtn'), sizeBtn = document.getElementById('sizeBtn');
  function showTheme(){
    if (prefs.theme) document.documentElement.setAttribute('data-theme', prefs.theme);
    else document.documentElement.removeAttribute('data-theme');
    themeBtn.innerHTML = prefs.theme === 'dark' ? I.moon : prefs.theme === 'light' ? I.sun : I.auto;
    themeBtn.title = prefs.theme === 'dark' ? 'Dark mode' : prefs.theme === 'light' ? 'Light mode' : 'Match my device';
  }
  themeBtn.onclick = function(){
    prefs.theme = !prefs.theme ? 'light' : prefs.theme === 'light' ? 'dark' : undefined;
    savePrefs(); showTheme();
  };
  sizeBtn.onclick = function(){
    var sizes = [100, 112, 125];
    prefs.size = sizes[(sizes.indexOf(prefs.size || 100) + 1) % sizes.length];
    document.documentElement.style.fontSize = prefs.size + '%';
    savePrefs();
  };
  showTheme();

  /* ---------- Installable app ---------- */
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(function(){});
  var installPrompt = null;   // Chrome / Edge / Android: the browser's own install dialog
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault(); installPrompt = e;
    if (location.hash === '' || location.hash === '#/') route();
  });
  window.addEventListener('appinstalled', function(){ installPrompt = null; });
  function isInstalled(){ return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; }
  function isIOS(){ return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function installCard(){
    if (isInstalled() || prefs.installHidden || !(installPrompt || isIOS())) return '';
    return '<div class="card install"><img src="icons/icon-192.png" alt="" width="48" height="48">' +
      '<div class="t"><b>Install the app</b><span>Open it full screen from your home screen, like any other app.</span></div>' +
      '<div class="acts"><button class="btn primary sm" id="installBtn" type="button">Install</button>' +
      '<button class="icon-btn" id="installHide" type="button" aria-label="Not now">' + I.x + '</button></div></div>';
  }
  function bindInstall(){
    var b = document.getElementById('installBtn');
    if (!b) return;
    b.onclick = function(){
      if (installPrompt) {
        installPrompt.prompt();
        installPrompt.userChoice.then(function(){ installPrompt = null; route(); });
        return;
      }
      // iPhone and iPad: Safari has no install button, so show the steps.
      var bg = document.createElement('div');
      bg.className = 'sheet-bg';
      bg.innerHTML = '<div class="sheet" role="dialog" aria-label="Install on iPhone"><div class="grab"></div>' +
        '<h2 style="font-size:1.1rem">Add to your Home Screen</h2>' +
        '<ol class="steps"><li>Tap the <b>Share</b> button <span class="share-ic">' + svg('<path d="M12 3v12"/><path d="m7 8 5-5 5 5"/><path d="M5 12v8h14v-8"/>') + '</span> at the bottom of Safari.</li>' +
        '<li>Scroll down and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. Then open <b>Aussie English</b> from your Home Screen.</li></ol>' +
        '<div class="row"><button class="btn primary" type="button" data-a="close">Got it</button></div></div>';
      document.body.appendChild(bg);
      bg.onclick = function(e){ if (e.target === bg || e.target.dataset.a === 'close') bg.remove(); };
    };
    document.getElementById('installHide').onclick = function(){ prefs.installHidden = true; savePrefs(); route(); };
  }

  /* ---------- Progress (saved on this device) ---------- */
  var KEY = 'aj-english-v1';
  var state = { done:{}, best:{}, seen:{}, streak:0, lastDay:null, days:{}, vocab:{}, phrases:[] };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY)) || {}); } catch(e) {}
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e) {} }

  function dayKey(d){ return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function daysAgo(n){ var d = new Date(); d.setDate(d.getDate() - n); return d; }
  function markActive(){
    var t = dayKey(new Date());
    if (state.lastDay === t) return;
    state.streak = state.lastDay === dayKey(daysAgo(1)) ? state.streak + 1 : 1;
    state.lastDay = t;
    save();
  }
  function currentStreak(){
    return (state.lastDay === dayKey(new Date()) || state.lastDay === dayKey(daysAgo(1))) ? state.streak : 0;
  }
  // Adds numbers to today's totals: speakSec, words, pronSum/pronN (clarity), fluSum/turns (fluency).
  function logDay(add){
    var t = dayKey(new Date()), d = state.days[t] || (state.days[t] = {});
    Object.keys(add).forEach(function(k){ d[k] = (d[k] || 0) + add[k]; });
    save();
  }
  function addVocab(text){
    words(text).forEach(function(w){ if (w.length > 1 && !/^\d+$/.test(w)) state.vocab[w] = 1; });
  }
  function lastDays(n){
    var out = [];
    for (var i = n - 1; i >= 0; i--) { var d = daysAgo(i); out.push({ date: d, v: state.days[dayKey(d)] || {} }); }
    return out;
  }
  function sumOver(days, k){ return days.reduce(function(a, x){ return a + (x.v[k] || 0); }, 0); }

  /* ---------- Australian voice ---------- */
  var canSpeak = 'speechSynthesis' in window;
  var voice = null;
  function pickVoice(){
    if (!canSpeak) return;
    var vs = speechSynthesis.getVoices();
    voice = vs.find(function(v){ return /en[-_]AU/i.test(v.lang); }) ||
            vs.find(function(v){ return /en[-_]GB/i.test(v.lang); }) ||
            vs.find(function(v){ return /^en/i.test(v.lang); }) || null;
  }
  if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function hasAussieVoice(){ return !!voice && /en[-_]AU/i.test(voice.lang); }

  // queue: add after whatever is already being spoken (used to read a reply sentence by sentence).
  function speak(text, slow, queue){
    if (!canSpeak || !text) return;
    if (!queue) speechSynthesis.cancel();
    // Voices read "G'day" letter by letter; "Gidday" sounds right.
    var u = new SpeechSynthesisUtterance(text.replace(/\bg['’]day\b/gi, 'Gidday'));
    if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = 'en-AU'; }
    u.rate = slow ? 0.6 : 0.95;
    speechSynthesis.speak(u);
  }

  /* ---------- Speech recognition and word matching ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var NUMS = { zero:'0', one:'1', two:'2', three:'3', four:'4', five:'5', six:'6', seven:'7', eight:'8', nine:'9', ten:'10',
               first:'1', second:'2', third:'3', fourth:'4', fifth:'5' };
  // Speech recognisers often write Aussie words in their long form.
  var SAME = { gday:['good','day'], ya:['you'], arvo:['afternoon'] };

  function words(s){
    var out = [];
    String(s).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).forEach(function(w){
      if (!w) return;
      if (w === '000') { out.push('triple', '0'); return; }
      if (SAME[w]) { out.push.apply(out, SAME[w]); return; }
      w = w.replace(/^(\d+)(st|nd|rd|th)$/, '$1');
      out.push(NUMS[w] || w);
    });
    return out;
  }
  // Longest common subsequence of words: which target words were said, in order.
  function matchWords(target, said){
    var t = words(target), s = words(said);
    var dp = [];
    for (var i = 0; i <= t.length; i++) { dp.push(new Array(s.length + 1).fill(0)); }
    for (i = 1; i <= t.length; i++) for (var j = 1; j <= s.length; j++)
      dp[i][j] = t[i-1] === s[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
    var hit = new Array(t.length).fill(false);
    i = t.length; j = s.length;
    while (i > 0 && j > 0) {
      if (t[i-1] === s[j-1]) { hit[i-1] = true; i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) i--; else j--;
    }
    return { t: t, s: s, hit: hit };
  }
  function lev(a, b){
    var p = [], i, j;
    for (j = 0; j <= b.length; j++) p[j] = j;
    for (i = 1; i <= a.length; i++) {
      var prev = p[0]; p[0] = i;
      for (j = 1; j <= b.length; j++) {
        var tmp = p[j];
        p[j] = Math.min(p[j] + 1, p[j-1] + 1, prev + (a[i-1] === b[j-1] ? 0 : 1));
        prev = tmp;
      }
    }
    return p[b.length];
  }
  // Colour each shown word: ok (heard), close (a similar word was heard) or miss.
  function grade(target, said){
    var m = matchWords(target, said), status = m.hit.map(function(h, k){
      if (h) return 'ok';
      var w = m.t[k];
      var near = m.s.some(function(x){ return lev(w, x) <= Math.max(1, Math.floor(w.length / 3)); });
      return near ? 'close' : 'miss';
    });
    var pts = status.reduce(function(a, x){ return a + (x === 'ok' ? 1 : x === 'close' ? 0.5 : 0); }, 0);
    var shown = target.split(/\s+/), wi = 0, out = [];
    shown.forEach(function(w){
      var n = words(w).length || 1, cls = 'ok';
      for (var x = 0; x < n; x++) {
        var st = status[wi + x];
        if (st === 'miss') cls = 'miss'; else if (st === 'close' && cls !== 'miss') cls = 'close';
      }
      wi += n;
      out.push({ w: w, cls: cls });
    });
    return { words: out, score: status.length ? Math.round(pts / status.length * 100) : 0 };
  }

  // One listening session. Calls back with interim text, then final alternatives.
  // pauseMs: stop as soon as the speaker has paused this long, instead of waiting for the
  // browser's own (slower) end-of-speech detection.
  // continuous: keep listening through short pauses (long answers); stops after pauseMs of silence.
  // end() gets (alternatives, seconds since start, seconds actually speaking).
  function listen(opts){
    var r = new SR(), started = Date.now(), finalAlts = [], got = false, lastText = '', timer = null, firstAt = 0, lastAt = 0;
    r.lang = 'en-AU'; r.interimResults = !!opts.interim || !!opts.continuous; r.maxAlternatives = 3; r.continuous = !!opts.continuous;
    r.onresult = function(e){
      var text = '';
      lastAt = Date.now(); if (!firstAt) firstAt = lastAt;
      for (var i = 0; i < e.results.length; i++) {
        text += (i && opts.continuous ? ' ' : '') + e.results[i][0].transcript;
        if (e.results[i].isFinal && !opts.continuous) {
          got = true;
          finalAlts = [];
          for (var k = 0; k < e.results[i].length; k++) finalAlts.push(e.results[i][k].transcript);
        }
      }
      lastText = text.replace(/\s+/g, ' ');
      if (opts.interim) opts.interim(lastText);
      if (opts.pauseMs && !got) {
        clearTimeout(timer);
        timer = setTimeout(function(){ try { r.stop(); } catch(err) {} }, opts.pauseMs);
      }
    };
    r.onerror = function(e){ if (opts.error) opts.error(e.error); };
    r.onend = function(){
      clearTimeout(timer);
      var speaking = firstAt ? (lastAt - firstAt) / 1000 + 0.6 : 0;
      // If we stopped early and no final result came, use what was heard so far.
      opts.end(got ? finalAlts : lastText.trim() ? [lastText] : [], (Date.now() - started) / 1000, speaking);
    };
    try { r.start(); } catch(err) { opts.end([], 0); }
    return r;
  }
  function waveHtml(){ return '<span class="wave"><i></i><i></i><i></i><i></i><i></i></span>'; }

  /* ---------- Helpers ---------- */
  function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
  function shuffle(a){ a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function lessonById(id){ return LESSONS.find(function(l){ return l.id === id; }); }
  function initials(name){ return name.split(/[\s,]+/).filter(function(w){ return /^[A-Z]/.test(w); }).slice(0, 2).map(function(w){ return w[0]; }).join('') || name[0]; }
  function seenIn(l){ return l.phrases.filter(function(p, i){ return state.seen[l.id + ':' + i]; }).length; }
  function setTab(name){
    document.querySelectorAll('.tabbar a').forEach(function(a){ a.classList.toggle('on', a.dataset.tab === name); });
  }
  function render(html){
    document.body.classList.remove('in-chat');
    app.innerHTML = html;
    window.scrollTo(0, 0);
  }
  function micButton(id){ return '<button class="mic" id="' + id + '" type="button" aria-label="Tap to speak">' + I.mic + '</button>'; }

  /* ---------- Sound-by-sound pronunciation (Microsoft Azure) ---------- */
  // The app asks the server for a 10-minute Azure token, then scores speech in the browser.
  // Sound names only exist in Azure's American English model; the sounds the drills train are the
  // same in Australian English. Without Azure (not set up, offline) the free word check is used.
  var AZURE_SDK = 'https://cdn.jsdelivr.net/npm/microsoft-cognitiveservices-speech-sdk@1.52.0/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle-min.js';
  var az = { token: null, region: null, exp: 0, off: false, sdk: null };
  function loadAzureSdk(){
    if (az.sdk) return az.sdk;
    az.sdk = new Promise(function(res, rej){
      if (window.SpeechSDK) return res(window.SpeechSDK);
      var s = document.createElement('script');
      s.src = AZURE_SDK; s.onload = function(){ res(window.SpeechSDK); }; s.onerror = function(){ az.sdk = null; rej(new Error('sdk')); };
      document.head.appendChild(s);
    });
    return az.sdk;
  }
  function azureToken(){
    if (az.token && Date.now() < az.exp) return Promise.resolve(az);
    return fetch(TALK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() }, body: JSON.stringify({ azureToken: true }) })
      .then(function(r){ return r.json(); })
      .then(function(d){
        if (!d.token) { if (d.error === 'no_azure') az.off = true; throw new Error(d.error || 'azure'); }
        az.token = d.token; az.region = d.region; az.exp = Date.now() + 9 * 60 * 1000;
        return az;
      });
  }
  // Records one utterance and scores it against the reference text.
  function assessAzure(ref){
    return Promise.all([loadAzureSdk(), azureToken()]).then(function(v){
      var sdk = v[0], a = v[1];
      return new Promise(function(resolve, reject){
        var sc = sdk.SpeechConfig.fromAuthorizationToken(a.token, a.region);
        sc.speechRecognitionLanguage = 'en-US';
        var pc = new sdk.PronunciationAssessmentConfig(ref, sdk.PronunciationAssessmentGradingSystem.HundredMark, sdk.PronunciationAssessmentGranularity.Phoneme, true);
        pc.phonemeAlphabet = 'IPA';
        pc.nbestPhonemeCount = 5;
        pc.enableProsodyAssessment = true;
        var rec = new sdk.SpeechRecognizer(sc, sdk.AudioConfig.fromDefaultMicrophoneInput());
        pc.applyTo(rec);
        rec.recognizeOnceAsync(function(result){
          var raw = result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult);
          rec.close();
          try { resolve(parseAzure(JSON.parse(raw || '{}'))); } catch(e) { resolve(null); }
        }, function(err){ rec.close(); reject(err); });
      });
    });
  }
  function parseAzure(j){
    var nb = j.NBest && j.NBest[0];
    if (!nb || !nb.PronunciationAssessment) return null;
    var pa = nb.PronunciationAssessment;
    return {
      pron: Math.round(pa.PronScore || 0), accuracy: Math.round(pa.AccuracyScore || 0), fluency: Math.round(pa.FluencyScore || 0),
      completeness: Math.round(pa.CompletenessScore || 0), prosody: pa.ProsodyScore == null ? null : Math.round(pa.ProsodyScore),
      heard: nb.Display || '', secs: (j.Duration || 0) / 1e7,
      words: (nb.Words || []).map(function(w){
        var wp = w.PronunciationAssessment || {};
        return { word: w.Word, score: Math.round(wp.AccuracyScore || 0), error: wp.ErrorType || 'None',
          phonemes: (w.Phonemes || []).map(function(p){
            var pp = p.PronunciationAssessment || {}, best = (pp.NBestPhonemes || [])[0];
            return { ipa: p.Phoneme, score: Math.round(pp.AccuracyScore || 0), heard: best ? best.Phoneme : null };
          }) };
      })
    };
  }
  function soundFor(ipa){ return SOUNDS.find(function(s){ return s.ipa.indexOf(ipa) >= 0; }); }
  function scoreCls(n){ return n >= 80 ? 'ok' : n >= 60 ? 'close' : 'miss'; }

  // Adds the day's pronunciation numbers and which drill sounds were weak.
  function logAzure(res){
    logDay({ paN: 1, paPron: res.pron, paAcc: res.accuracy, paFlu: res.fluency, paPros: res.prosody == null ? res.pron : res.prosody,
             pronSum: res.pron, pronN: 1, speakSec: Math.round(res.secs) });
    state.sounds = state.sounds || {};
    res.words.forEach(function(w){ w.phonemes.forEach(function(p){
      var s = soundFor(p.ipa); if (!s) return;
      var st = state.sounds[s.id] || (state.sounds[s.id] = { n: 0, sum: 0 });
      st.n++; st.sum += p.score;
    }); });
    addVocab(res.heard); markActive(); save();
  }

  function bar(label, v){
    return '<div class="sbar"><span>' + label + '</span><i><b class="' + (v == null ? '' : scoreCls(v)) + '" style="width:' + (v || 0) + '%"></b></i><em>' + (v == null ? '–' : v) + '</em></div>';
  }
  function renderAzure(box, res){
    var worst = null;
    res.words.forEach(function(w){ if (w.error !== 'Omission' && (!worst || w.score < worst.score)) worst = w; });
    box.innerHTML =
      '<div class="sbars">' + bar('Overall', res.pron) + bar('Accuracy', res.accuracy) + bar('Fluency', res.fluency) + bar('Intonation', res.prosody) + '</div>' +
      '<div class="words az">' + res.words.map(function(w, i){
        var cls = w.error === 'Omission' ? 'skip' : w.error === 'Insertion' ? 'extra' : scoreCls(w.score);
        return '<button type="button" class="w ' + cls + '" data-i="' + i + '">' + esc(w.word) + '</button>';
      }).join(' ') + '</div>' +
      '<div class="legend"><span><i style="background:var(--good)"></i>Clear</span><span><i style="background:var(--warn-line)"></i>Close</span><span><i style="background:var(--bad)"></i>Needs work</span><span>Tap a word for its sounds</span></div>' +
      '<div class="phon" id="phon"></div>' +
      '<div class="heard">Heard: “' + esc(res.heard) + '”</div>';
    function show(w){
      var p = box.querySelector('#phon');
      if (w.error === 'Omission') { p.innerHTML = '<b>' + esc(w.word) + '</b> - this word was missed. Try saying every word.'; return; }
      var tips = [];
      p.innerHTML = '<div class="phon-head"><b>' + esc(w.word) + '</b> · ' + w.score + '% <button class="btn sm ghost" type="button" data-say>' + I.speaker + 'Hear it</button></div>' +
        '<div class="ipa">' + w.phonemes.map(function(ph){
          var wrong = ph.score < 60 && ph.heard && ph.heard !== ph.ipa;
          var s = soundFor(ph.ipa);
          if (ph.score < 70 && s && tips.indexOf(s) < 0) tips.push(s);
          return '<span class="ph ' + scoreCls(ph.score) + '" title="' + ph.score + '%">/' + esc(ph.ipa) + '/' + (wrong ? '<small>you said /' + esc(ph.heard) + '/</small>' : '') + '</span>';
        }).join('') + '</div>' +
        tips.map(function(s){ return '<p class="ptip"><b>' + esc(s.title) + ':</b> ' + esc(s.tip) + ' <a href="#/sound/' + s.id + '">Practise this sound</a></p>'; }).join('');
      p.querySelector('[data-say]').onclick = function(){ speak(w.word); };
      box.querySelectorAll('.words .w').forEach(function(b){ b.classList.toggle('sel', b.textContent === w.word); });
    }
    box.querySelectorAll('.words .w').forEach(function(b){ b.onclick = function(){ show(res.words[+b.dataset.i]); }; });
    if (worst) show(worst);
  }

  // A practise-this panel: big mic, then Azure sound-by-sound results (or the free word check).
  // getRef() returns the sentence to say at the moment the mic is tapped.
  function practiceCard(el, getRef, onDone){
    el.innerHTML = (SR || window.MediaRecorder ? micButton('pmic') : '') +
      '<span class="mic-label" id="plabel">Tap and say it</span><div class="result" id="presult"></div>';
    var mic = el.querySelector('#pmic'), label = el.querySelector('#plabel'), out = el.querySelector('#presult'), rec = null, busy = false;
    if (!mic) { label.textContent = 'Speaking practice needs Chrome or Safari.'; return; }
    function browserCheck(ref){
      if (!SR) { label.textContent = 'Speaking practice works in Chrome.'; return; }
      mic.classList.add('live'); label.innerHTML = waveHtml() + 'Listening… tap to stop';
      rec = listen({
        error: function(err){ if (err === 'not-allowed' || err === 'service-not-allowed') out.innerHTML = '<p class="heard">Microphone is blocked. Please allow it for this site.</p>'; },
        end: function(alts, secs){
          rec = null; mic.classList.remove('live');
          if (!alts.length) { label.textContent = 'Didn\'t catch that - tap and try again'; return; }
          var best = null, heard = '';
          alts.forEach(function(a){ var g = grade(ref, a); if (!best || g.score > best.score) { best = g; heard = a; } });
          label.textContent = 'Tap to try again';
          out.innerHTML =
            '<div class="words">' + best.words.map(function(x){ return '<span class="w ' + x.cls + '">' + esc(x.w) + '</span>'; }).join(' ') + '</div>' +
            '<div class="legend"><span><i style="background:var(--good)"></i>Clear</span><span><i style="background:var(--warn-line)"></i>Close</span><span><i style="background:var(--bad)"></i>Missed</span></div>' +
            '<div class="score">' + best.score + '%</div><div class="heard">Heard: “' + esc(heard) + '”</div>';
          logDay({ speakSec: Math.round(secs), pronSum: best.score, pronN: 1 });
          addVocab(heard); markActive(); save();
          if (onDone) onDone({ pron: best.score });
        }
      });
    }
    mic.onclick = function(){
      if (busy) return;
      if (rec) { rec.stop(); return; }
      var ref = (getRef() || '').trim();
      if (!ref) { label.textContent = 'Type a sentence first'; return; }
      if (canSpeak) speechSynthesis.cancel();
      if (az.off || !TALK_API || !getCode()) return browserCheck(ref);
      busy = true; mic.classList.add('live'); label.innerHTML = waveHtml() + 'Listening… speak now';
      assessAzure(ref).then(function(res){
        busy = false; mic.classList.remove('live');
        if (!res) { label.textContent = 'Didn\'t catch that - tap and try again'; return; }
        label.textContent = 'Tap to try again';
        renderAzure(out, res); logAzure(res);
        if (onDone) onDone(res);
      }).catch(function(){
        busy = false; mic.classList.remove('live');
        browserCheck(ref);   // Azure not available right now: use the free check instead.
      });
    };
  }

  /* ---------- Home: progress dashboard ---------- */
  function chartSvg(days){
    var W = 700, H = 150, top = 22, base = 122, bw = 54, gap = (W - bw * 7) / 6;
    var mins = days.map(function(x){ return (x.v.speakSec || 0) / 60; });
    var max = Math.max(5, Math.max.apply(null, mins));
    var out = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="Speaking minutes over the last 7 days">';
    days.forEach(function(x, i){
      var m = mins[i], h = m > 0 ? Math.max(4, (base - top) * m / max) : 4, X = i * (bw + gap);
      out += '<rect class="' + (m > 0 ? (i === 6 ? 'bar today' : 'bar') : 'empty') + '" x="' + X + '" y="' + (base - h) + '" width="' + bw + '" height="' + h + '" rx="8"/>';
      if (m > 0) out += '<text class="val" x="' + (X + bw / 2) + '" y="' + (base - h - 6) + '" text-anchor="middle">' + (m < 1 ? '<1' : Math.round(m)) + '</text>';
      out += '<text x="' + (X + bw / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + x.date.toLocaleDateString('en-AU', { weekday: 'short' }) + '</text>';
    });
    return out + '</svg>';
  }

  // Skill scores: practice from the last 14 days, falling back to the latest level test.
  function skills(){
    var d = lastDays(14), t = state.test || {};
    function avg(sum, n, fb){ var c = sumOver(d, n); return c ? Math.round(sumOver(d, sum) / c) : (fb == null ? null : fb); }
    return {
      pronunciation: sumOver(d, 'paN') ? avg('paPron', 'paN') : avg('pronSum', 'pronN', t.pron),
      fluency: avg('paFlu', 'paN', t.fluency),
      intonation: avg('paPros', 'paN', t.prosody),
      grammar: avg('gramSum', 'gvN', t.grammar),
      vocabulary: avg('vocabSum', 'gvN', t.vocabulary)
    };
  }
  function skillsCard(){
    var s = skills();
    return '<div class="card pad home-card"><div class="chart-head"><b>Your skills</b><span>Last 14 days</span></div>' +
      '<div class="sbars" style="margin-top:10px">' + bar('Pronunciation', s.pronunciation) + bar('Fluency', s.fluency) + bar('Intonation', s.intonation) + bar('Grammar', s.grammar) + bar('Vocabulary', s.vocabulary) + '</div>' +
      (Object.keys(s).some(function(k){ return s[k] == null; }) ? '<p class="heard" style="text-align:left">Do a sound drill and a conversation to fill in every skill.</p>' : '') + '</div>';
  }
  function levelCard(){
    var t = state.test;
    if (!t) return '<a class="card cta" href="#/test"><span class="ic">' + I.check + '</span><span><b>Find your speaking level</b><span>A 4-minute test: CEFR level and an estimated IELTS band</span></span><span class="chev">' + I.chev + '</span></a>';
    return '<a class="card pad level-card mini" href="#/test"><div class="lv"><b>' + esc(t.cefr) + '</b><span>Your level</span></div><div class="lv"><b>' + esc(String(t.ielts)) + '</b><span>IELTS speaking (est.)</span></div><div class="lv"><span>Tested ' + esc(t.date) + '<br>Tap to retake</span></div></a>';
  }
  // Today's plan: the weakest sound, one conversation, and the level test or own-sentence practice.
  function planCard(){
    var today = state.days[dayKey(new Date())] || {}, dayNo = Math.floor(Date.now() / 864e5);
    var scored = SOUNDS.filter(function(s){ return soundAvg(s.id) !== null; }).sort(function(a, b){ return soundAvg(a.id) - soundAvg(b.id); });
    var snd = scored.length && soundAvg(scored[0].id) < 85 ? scored[0] : SOUNDS[dayNo % SOUNDS.length];
    var lead = SCENES.filter(function(s){ return s.level === LEVEL; }), scene = lead[dayNo % lead.length];
    var tasks = [
      { href: '#/sound/' + snd.id, title: 'Sound drill: ' + snd.title, sub: soundAvg(snd.id) !== null ? 'Your weakest sound - ' + soundAvg(snd.id) + '% so far' : 'Say 3 words or sentences', done: (today.drills || 0) >= 3 },
      { href: '#/talk/' + scene.id, title: 'Conversation: ' + scene.title, sub: 'Reply at least 5 times', done: (today.turns || 0) >= 5 },
      state.test
        ? { href: '#/practise', title: 'Say a sentence from your work', sub: 'Practise 3 of your own sentences', done: (today.paN || today.pronN || 0) >= 6 }
        : { href: '#/test', title: 'Take the speaking level test', sub: 'About 4 minutes', done: false }
    ];
    var n = tasks.filter(function(t){ return t.done; }).length;
    return '<div class="card pad home-card plan"><div class="chart-head"><b>Today\'s plan</b><span>' + n + ' of 3 done</span></div>' +
      tasks.map(function(t){
        return '<a class="task' + (t.done ? ' done' : '') + '" href="' + t.href + '"><span class="tick">' + (t.done ? I.check : '') + '</span><span><b>' + esc(t.title) + '</b><span>' + esc(t.sub) + '</span></span><span class="chev">' + I.chev + '</span></a>';
      }).join('') + '</div>';
  }

  function home(){
    setTab('home');
    var week = lastDays(7);
    var speakMin = Math.round(sumOver(week, 'speakSec') / 60);
    var doneCount = LESSONS.filter(function(l){ return state.done[l.id]; }).length;
    var next = LESSONS.find(function(l){ return !state.done[l.id]; }) || LESSONS[0];
    var hour = new Date().getHours();
    var notice = '';
    if (!canSpeak) notice += '<div class="notice">This browser can\'t play the Australian voice. Please open this page in Chrome.</div>';
    else if (voice && !hasAussieVoice()) notice += '<div class="notice">No Australian voice on this device, so a ' + esc(voice.lang) + ' English voice is used. Chrome usually has one.</div>';
    if (!SR) notice += '<div class="notice">Speaking practice works in Chrome on Android or a computer. You can still type in conversations.</div>';

    function tile(k, v, unit, s){ return '<div class="card stat"><div class="k">' + k + '</div><div class="v">' + v + (unit ? '<small>' + unit + '</small>' : '') + '</div><div class="s">' + s + '</div></div>'; }

    render(
      '<span class="eyebrow">Australian Jeevitham Aussie English Coach</span>' +
      '<h1 class="title">' + (hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening') + '</h1>' +
      '<p class="lede">Speak the English Australian healthcare leaders use, with a coach that listens and gives you feedback.</p>' +
      installCard() + notice +
      planCard() + levelCard() + skillsCard() +
      '<div class="stats">' +
        tile('Day streak', currentStreak(), currentStreak() === 1 ? 'day' : 'days', 'Practise daily to keep it') +
        tile('Speaking time', speakMin, 'min', 'Last 7 days') +
        tile('Words used', Object.keys(state.vocab).length, '', 'Different words you\'ve spoken') +
        tile('Lessons done', doneCount, '/ ' + LESSONS.length, 'Quizzes completed') +
      '</div>' +
      '<div class="card chart-card"><div class="chart-head"><b>Speaking minutes</b><span>Last 7 days</span></div>' + chartSvg(week) + '</div>' +
      '<a class="card cta" href="#/lesson/' + next.id + '"><span class="ic">' + I.book + '</span><span><b>Continue lessons</b><span>' + esc(next.title) + '</span></span><span class="chev">' + I.chev + '</span></a>' +
      (state.phrases.length ? '<h2 class="section-title">Saved power phrases</h2><div class="phrase-list">' + state.phrases.slice().reverse().map(function(p, i){
        return '<div class="card phrase"><div><b>' + esc(p.phrase) + '</b><span>' + esc(p.meaning) + '</span></div>' +
          '<button class="icon-btn" data-say="' + esc(p.phrase) + '" aria-label="Listen">' + I.speaker + '</button>' +
          '<button class="icon-btn" data-del="' + (state.phrases.length - 1 - i) + '" aria-label="Remove">' + I.x + '</button></div>';
      }).join('') + '</div>' : '')
    );
    app.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(){ speak(b.dataset.say); }; });
    app.querySelectorAll('[data-del]').forEach(function(b){ b.onclick = function(){ state.phrases.splice(+b.dataset.del, 1); save(); home(); }; });
    bindInstall();
  }

  /* ---------- Learn ---------- */
  function learn(){
    setTab('learn');
    render(
      '<span class="eyebrow">Practise speaking</span>' +
      '<h1 class="title">Learn</h1>' +
      '<div class="list two">' +
        '<a class="card item" href="#/sounds"><span class="num">' + I.mic + '</span><span class="t"><h2>Sound drills</h2><span class="sub">V/W, TH, Z, F/P and more - every sound scored</span></span></a>' +
        '<a class="card item" href="#/practise"><span class="num">' + I.pencil + '</span><span class="t"><h2>Practise any sentence</h2><span class="sub">Type your own words and get scored saying them</span></span></a>' +
        '<a class="card item" href="#/test"><span class="num">' + I.check + '</span><span class="t"><h2>Speaking level test</h2><span class="sub">' + (state.test ? 'Your level: ' + esc(state.test.cefr) + ' · IELTS ~' + state.test.ielts : 'Find your level in about 4 minutes') + '</span></span></a>' +
      '</div>' +
      '<h2 class="section-title">Everyday Australian English</h2>' +
      '<div class="list two">' + LESSONS.map(function(l, i){
        var seen = seenIn(l);
        return '<a class="card item" href="#/lesson/' + l.id + '"><span class="num">' + (i + 1) + '</span><span class="t">' +
          '<h2>' + esc(l.title) + '</h2><span class="sub mal" lang="ml">' + esc(l.ml) + '</span>' +
          '<span class="meta"><span class="mini-bar"><i style="width:' + Math.round(seen / l.phrases.length * 100) + '%"></i></span>' + seen + '/' + l.phrases.length +
          (state.done[l.id] ? ' <span class="pill good">Quiz ' + state.best[l.id] + '%</span>' : '') + '</span></span></a>';
      }).join('') + '</div>'
    );
  }

  /* ---------- Lesson ---------- */
  function lesson(id, idx){
    var l = lessonById(id);
    if (!l) return learn();
    setTab('learn');
    idx = Math.max(0, Math.min(idx || 0, l.phrases.length - 1));
    var p = l.phrases[idx];
    state.seen[l.id + ':' + idx] = 1; save();
    var last = idx === l.phrases.length - 1;
    render(
      '<a class="back" href="#/learn">' + I.back + 'Lessons</a>' +
      '<span class="eyebrow">' + esc(l.title) + '</span>' +
      '<div class="progress"><i style="width:' + Math.round((idx + 1) / l.phrases.length * 100) + '%"></i></div>' +
      '<article class="card pad">' +
        '<span class="count">Phrase ' + (idx + 1) + ' of ' + l.phrases.length + '</span>' +
        '<p class="phrase-en">' + esc(p.en) + '</p>' +
        '<p class="phrase-ml" lang="ml">' + esc(p.ml) + '</p>' +
        '<div class="listen-row"><button class="btn" id="play">' + I.speaker + 'Listen</button><button class="btn" id="slow">' + I.speaker + 'Slow</button></div>' +
        (p.tip ? '<p class="tip" lang="ml">' + esc(p.tip) + '</p>' : '') +
        '<div class="speak-zone" id="practice"></div>' +
      '</article>' +
      '<div class="nav">' +
        (idx > 0 ? '<a class="btn ghost" href="#/lesson/' + l.id + '/' + (idx - 1) + '">' + I.back + 'Back</a>' : '<span></span>') +
        (last ? '<a class="btn primary" href="#/quiz/' + l.id + '">Take the quiz' + I.chev + '</a>'
              : '<a class="btn primary" href="#/lesson/' + l.id + '/' + (idx + 1) + '">Next' + I.chev + '</a>') +
      '</div>'
    );
    var said = p.say || p.en;
    document.getElementById('play').onclick = function(){ speak(said); };
    document.getElementById('slow').onclick = function(){ speak(said, true); };
    practiceCard(document.getElementById('practice'), function(){ return p.en; });
  }

  /* ---------- Practise any sentence ---------- */
  function practise(){
    setTab('learn');
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">Your own words</span>' +
      '<h1 class="title">Practise any sentence</h1>' +
      '<p class="lede">Type or paste anything - something you say at work, a word you find hard - then hear it and say it.</p>' +
      '<article class="card pad" style="margin-top:16px">' +
        '<textarea id="ref" class="ref" maxlength="200" rows="3" placeholder="e.g. I\'m concerned his blood pressure is dropping."></textarea>' +
        '<div class="listen-row"><button class="btn" id="play">' + I.speaker + 'Listen</button><button class="btn" id="slow">' + I.speaker + 'Slow</button></div>' +
        '<div class="speak-zone" id="practice"></div>' +
      '</article>'
    );
    var ref = document.getElementById('ref');
    try { ref.value = localStorage.getItem('aj-english-own') || ''; } catch(e) {}
    ref.oninput = function(){ try { localStorage.setItem('aj-english-own', ref.value); } catch(e) {} };
    document.getElementById('play').onclick = function(){ speak(ref.value); };
    document.getElementById('slow').onclick = function(){ speak(ref.value, true); };
    practiceCard(document.getElementById('practice'), function(){ return ref.value; });
  }

  /* ---------- Malayali sound drills ---------- */
  function soundAvg(id){ var st = (state.sounds || {})[id]; return st && st.n >= 3 ? Math.round(st.sum / st.n) : null; }
  function sounds(){
    setTab('learn');
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">Sound drills</span>' +
      '<h1 class="title">The sounds Malayalis find hardest</h1>' +
      '<p class="lede">Short drills for each sound, with word pairs and sentences. Every sound you say is scored.</p>' +
      '<div class="list two">' + SOUNDS.map(function(s, i){
        var avg = soundAvg(s.id);
        return '<a class="card item" href="#/sound/' + s.id + '"><span class="num">' + (s.ipa.length ? '/' + esc(s.ipa[0]) + '/' : (i + 1)) + '</span><span class="t">' +
          '<h2>' + esc(s.title) + '</h2><span class="sub">' + s.pairs.slice(0, 2).map(function(p){ return esc(p[0]) + ' / ' + esc(p[1]); }).join(' · ') + '</span>' +
          (avg !== null ? '<span class="meta"><span class="pill ' + (avg >= 80 ? 'good' : avg >= 60 ? 'warn' : 'bad') + '">Your score ' + avg + '%</span></span>' : '') + '</span></a>';
      }).join('') + '</div>'
    );
  }
  function sound(id){
    var s = SOUNDS.find(function(x){ return x.id === id; });
    if (!s) return sounds();
    setTab('learn');
    var items = [];
    s.pairs.forEach(function(p){ items.push(p[0], p[1]); });
    s.sentences.forEach(function(t){ items.push(t); });
    var cur = 0;
    render(
      '<a class="back" href="#/sounds">' + I.back + 'Sound drills</a>' +
      '<span class="eyebrow">Sound drill</span>' +
      '<h1 class="title">' + esc(s.title) + '</h1>' +
      '<article class="card pad" style="margin-top:14px"><p>' + esc(s.tip) + '</p><p class="tip" lang="ml">' + esc(s.ml) + '</p></article>' +
      '<h2 class="section-title">Word pairs - listen, then pick one to say</h2>' +
      '<div class="pairs">' + s.pairs.map(function(p, i){
        return '<div class="card pair">' + [0, 1].map(function(k){
          return '<button type="button" class="pw" data-i="' + (i * 2 + k) + '"><b>' + esc(p[k]) + '</b><span data-say="' + esc(p[k]) + '">' + I.speaker + '</span></button>';
        }).join('<span class="vs">vs</span>') + '</div>';
      }).join('') + '</div>' +
      '<h2 class="section-title">Sentences</h2>' +
      '<div class="phrase-list">' + s.sentences.map(function(t, i){
        return '<button type="button" class="card phrase pw" data-i="' + (s.pairs.length * 2 + i) + '"><div><b>' + esc(t) + '</b></div><span class="icon-btn" data-say="' + esc(t) + '">' + I.speaker + '</span></button>';
      }).join('') + '</div>' +
      '<div class="card pad drill-say"><span class="count">Now say:</span><p class="phrase-en" id="target"></p><div class="speak-zone" id="practice"></div></div>'
    );
    function pick(i){
      cur = i;
      document.getElementById('target').textContent = items[i];
      app.querySelectorAll('.pw').forEach(function(b){ b.classList.toggle('sel', +b.dataset.i === i); });
    }
    app.querySelectorAll('.pw').forEach(function(b){ b.onclick = function(){ pick(+b.dataset.i); }; });
    app.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(e){ e.stopPropagation(); speak(b.dataset.say); }; });
    pick(0);
    practiceCard(document.getElementById('practice'), function(){ return items[cur]; }, function(){ logDay({ drills: 1 }); });
  }

  /* ---------- Speaking level test ---------- */
  function levelTest(){
    setTab('learn');
    var step = 0, reads = [], answers = [];
    function header(n, of){ return '<a class="back" href="#/learn">' + I.back + 'Learn</a><span class="eyebrow">Speaking level test · ' + n + ' of ' + of + '</span><div class="progress"><i style="width:' + Math.round(n / of * 100) + '%"></i></div>'; }
    function intro(){
      render(
        '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
        '<span class="eyebrow">About 4 minutes</span>' +
        '<h1 class="title">Speaking level test</h1>' +
        '<p class="lede">Read three sentences aloud, then answer three questions as you would in a conversation. You\'ll get your level (A1 to C2), an estimated IELTS speaking band, and what to work on.</p>' +
        (state.test ? '<div class="notice">Last result: <b>' + esc(state.test.cefr) + '</b> · IELTS ~' + state.test.ielts + ' (' + esc(state.test.date) + ')</div>' : '') +
        '<div class="row" style="margin-top:18px"><button class="btn primary" id="start">Start the test' + I.chev + '</button></div>'
      );
      document.getElementById('start').onclick = function(){ step = 0; readStep(); };
    }
    function readStep(){
      var t = LEVEL_TEST.read[step];
      render(header(step + 1, 6) +
        '<article class="card pad"><span class="count">Read this aloud</span><p class="phrase-en">' + esc(t) + '</p>' +
        '<div class="speak-zone" id="practice"></div>' +
        '<div class="nav"><span></span><button class="btn primary" id="next" disabled>Next' + I.chev + '</button></div></article>');
      var next = document.getElementById('next');
      practiceCard(document.getElementById('practice'), function(){ return t; }, function(res){ reads[step] = res; next.disabled = false; });
      next.onclick = function(){ step++; step < LEVEL_TEST.read.length ? readStep() : (step = 0, askStep()); };
    }
    function askStep(){
      var q = LEVEL_TEST.questions[step], rec = null, text = '', secs = 0;
      render(header(LEVEL_TEST.read.length + step + 1, 6) +
        '<article class="card pad"><span class="count">Answer in English - aim for 30 to 60 seconds</span><p class="q-prompt">' + esc(q) + '</p>' +
        '<div class="listen-row" style="margin:0 0 6px"><button class="btn" id="play">' + I.speaker + 'Hear the question</button></div>' +
        '<div class="speak-zone">' + (SR ? micButton('amic') + '<span class="mic-label" id="alabel">Tap and start speaking</span>' : '') +
        '<textarea id="ans" class="ref" rows="4" placeholder="' + (SR ? 'Your words appear here. You can also type.' : 'Type your answer') + '"></textarea></div>' +
        '<div class="nav"><span></span><button class="btn primary" id="next">' + (step === LEVEL_TEST.questions.length - 1 ? 'Finish' : 'Next') + I.chev + '</button></div></article>');
      var ans = document.getElementById('ans'), mic = document.getElementById('amic'), label = document.getElementById('alabel');
      document.getElementById('play').onclick = function(){ speak(q); };
      speak(q);
      if (mic) mic.onclick = function(){
        if (rec) { rec.stop(); return; }
        if (canSpeak) speechSynthesis.cancel();
        var before = ans.value ? ans.value + ' ' : '';
        mic.classList.add('live'); label.innerHTML = waveHtml() + 'Listening… tap when you\'ve finished';
        rec = listen({
          continuous: true, pauseMs: 4000,
          interim: function(t){ ans.value = before + t; },
          end: function(alts, total, speaking){
            rec = null; mic.classList.remove('live'); label.textContent = 'Tap to add more';
            if (alts[0]) ans.value = before + alts[0];
            secs += speaking;
          }
        });
      };
      document.getElementById('next').onclick = function(){
        if (rec) rec.stop();
        text = ans.value.trim();
        if (!text) { if (label) label.textContent = 'Please answer the question first'; return; }
        answers[step] = { q: q, a: text, secs: secs };
        logDay({ speakSec: Math.round(secs) }); addVocab(text);
        step++;
        step < LEVEL_TEST.questions.length ? askStep() : grade_();
      };
    }
    function grade_(){
      render(header(6, 6) + '<article class="card pad done"><div class="typing" style="margin:10px auto"><i></i><i></i><i></i></div><p class="lede">Working out your level…</p></article>');
      var az_ = reads.filter(function(r){ return r && r.accuracy != null; });
      var avg = function(k){ var v = az_.filter(function(r){ return r[k] != null; }); return v.length ? Math.round(v.reduce(function(a, r){ return a + r[k]; }, 0) / v.length) : null; };
      var pron = az_.length ? { accuracy: avg('accuracy'), fluency: avg('fluency'), prosody: avg('prosody'), overall: avg('pron') }
        : { overall: reads.length ? Math.round(reads.reduce(function(a, r){ return a + (r ? r.pron : 0); }, 0) / reads.length) : null };
      fetch(TALK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
        body: JSON.stringify({ assess: true, answers: answers, pronunciation: pron }) })
        .then(function(r){ return r.json(); })
        .then(function(d){
          if (d.error || !d.cefr) throw new Error(d.error || 'assess');
          state.test = Object.assign({ date: new Date().toLocaleDateString('en-AU'), pron: pron.overall, fluency: pron.fluency, prosody: pron.prosody }, d);
          save(); markActive();
          result(state.test);
        })
        .catch(function(e){
          render(header(6, 6) + '<article class="card pad"><p>' + (String(e.message) === 'access_code' ? 'The level test uses the AI coach - please enter your access code in a conversation first.' : 'Couldn\'t reach the coach. Please check your internet and try again.') + '</p>' +
            '<div class="row" style="margin-top:14px"><button class="btn primary" id="retry">Try again</button></div></article>');
          document.getElementById('retry').onclick = grade_;
        });
    }
    function result(t){
      var tierName = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', leadership: 'Leadership' }[t.tier] || t.tier;
      render(
        '<a class="back" href="#/">' + I.back + 'Home</a>' +
        '<span class="eyebrow">Your speaking level</span>' +
        '<article class="card pad level-card"><div class="lv"><b>' + esc(t.cefr) + '</b><span>CEFR level</span></div><div class="lv"><b>' + esc(String(t.ielts)) + '</b><span>IELTS speaking (estimate)</span></div><div class="lv"><b>' + esc(tierName) + '</b><span>Best practice level</span></div></article>' +
        '<article class="card pad"><p>' + esc(t.summary) + '</p>' +
          '<div class="sbars" style="margin-top:14px">' + bar('Grammar', t.grammar) + bar('Vocabulary', t.vocabulary) + bar('Coherence', t.coherence) + bar('Pronunciation', t.pron == null ? null : t.pron) + (t.fluency != null ? bar('Fluency', t.fluency) : '') + '</div></article>' +
        '<h2 class="section-title">Strengths</h2><div class="phrase-list">' + (t.strengths || []).map(function(x){ return '<div class="card phrase"><div><b>' + esc(x) + '</b></div></div>'; }).join('') + '</div>' +
        '<h2 class="section-title">Work on next</h2><div class="phrase-list">' + (t.focus || []).map(function(x){ return '<div class="card phrase"><div><b>' + esc(x) + '</b></div></div>'; }).join('') + '</div>' +
        '<div class="row" style="margin-top:18px"><a class="btn primary" href="#/">See your daily plan' + I.chev + '</a><a class="btn ghost" href="#/test">Take it again</a></div>'
      );
    }
    intro();
  }

  /* ---------- Quiz ---------- */
  function quiz(id){
    var l = lessonById(id);
    if (!l) return learn();
    setTab('learn');
    var picks = shuffle(l.phrases).slice(0, Math.min(6, l.phrases.length));
    var qs = picks.map(function(p, i){
      var others = shuffle(l.phrases.filter(function(o){ return o !== p; })).slice(0, 3);
      return { p: p, type: i % 2 ? 'listen' : 'meaning', opts: shuffle([p].concat(others)) };
    });
    var n = 0, right = 0;

    function show(){
      var q = qs[n], isMeaning = q.type === 'meaning';
      render(
        '<a class="back" href="#/lesson/' + l.id + '">' + I.back + 'Back to lesson</a>' +
        '<span class="eyebrow">Quiz · ' + esc(l.title) + '</span>' +
        '<div class="progress"><i style="width:' + Math.round(n / qs.length * 100) + '%"></i></div>' +
        '<article class="card pad">' +
          '<span class="count">Question ' + (n + 1) + ' of ' + qs.length + '</span>' +
          (isMeaning
            ? '<p class="q-prompt">“' + esc(q.p.en) + '”</p><p class="q-sub">What does it mean?</p>'
            : '<p class="q-prompt">Listen and choose what you hear</p><p class="q-sub">Play it as many times as you like.</p>') +
          '<div class="listen-row" style="margin:0 0 14px"><button class="btn" id="play">' + I.speaker + 'Play</button><button class="btn" id="slow">' + I.speaker + 'Slow</button></div>' +
          '<div class="opts">' + q.opts.map(function(o, i){
            return '<button class="opt' + (isMeaning ? ' mal' : '') + '" data-i="' + i + '"' + (isMeaning ? ' lang="ml"' : '') + '>' + esc(isMeaning ? o.ml : o.en) + '</button>';
          }).join('') + '</div>' +
          '<div class="nav" id="next" hidden><button class="btn primary">' + (n === qs.length - 1 ? 'See my score' : 'Next question') + I.chev + '</button></div>' +
        '</article>'
      );
      var say = q.p.say || q.p.en;
      document.getElementById('play').onclick = function(){ speak(say); };
      document.getElementById('slow').onclick = function(){ speak(say, true); };
      if (!isMeaning) speak(say);
      app.querySelectorAll('.opt').forEach(function(btn){
        btn.onclick = function(){
          var chosen = q.opts[+btn.dataset.i];
          app.querySelectorAll('.opt').forEach(function(b){
            b.disabled = true;
            if (q.opts[+b.dataset.i] === q.p) b.classList.add('right');
          });
          if (chosen === q.p) right++; else btn.classList.add('wrong');
          if (isMeaning) speak(say);
          var next = document.getElementById('next');
          next.hidden = false;
          next.querySelector('button').onclick = function(){ n++; n < qs.length ? show() : finish(); };
          next.querySelector('button').focus();
        };
      });
    }

    function finish(){
      var pct = Math.round(right / qs.length * 100);
      state.done[l.id] = true;
      state.best[l.id] = Math.max(state.best[l.id] || 0, pct);
      save(); markActive();
      var i = LESSONS.indexOf(l), nextL = LESSONS[i + 1];
      render(
        '<article class="card pad done">' +
          '<span class="eyebrow">Quiz complete</span>' +
          '<div class="big">' + right + ' / ' + qs.length + '</div>' +
          '<p class="lede">' + (pct >= 80 ? 'Excellent work - you\'re ready for this one.' : pct >= 50 ? 'Good effort. One more go will lock it in.' : 'Listen to the lesson again, then have another go.') + '</p>' +
          '<div class="row" style="justify-content:center;margin-top:18px">' +
            '<a class="btn ghost" href="#/quiz/' + l.id + '?r=' + Date.now() + '">' + I.restart + 'Try again</a>' +
            (nextL ? '<a class="btn primary" href="#/lesson/' + nextL.id + '">Next: ' + esc(nextL.title) + I.chev + '</a>' : '<a class="btn primary" href="#/talk">Practise a conversation' + I.chev + '</a>') +
          '</div>' +
        '</article>'
      );
    }
    show();
  }

  /* ---------- Talk (AI role-play) ---------- */
  var CODE_KEY = 'aj-english-code';
  function getCode(){ try { return localStorage.getItem(CODE_KEY) || ''; } catch(e) { return ''; } }
  function setCode(c){ try { localStorage.setItem(CODE_KEY, c); } catch(e) {} }

  function talkHome(){
    setTab('talk');
    render(
      '<span class="pill level">Leadership level · Healthcare</span>' +
      '<h1 class="title" style="margin-top:10px">Conversations</h1>' +
      '<p class="lede">Real leadership situations in Australian healthcare. Speak as you would at work - your coach marks anything to improve and shows how a senior Australian nurse leader would say it.</p>' +
      (TALK_API ? '' : '<div class="notice">The AI coach is being set up. Coming soon!</div>') +
      '<div class="list">' + SCENES.filter(function(s){ return (s.level || 'everyday') === LEVEL; }).map(function(s){
        return '<a class="card item" href="#/talk/' + s.id + '"><span class="avatar">' + esc(initials(s.who)) + '</span><span class="t">' +
          '<h2>' + esc(s.title) + '</h2><span class="sub">with ' + esc(s.who) + '</span></span><span class="muted">' + I.chev + '</span></a>';
      }).join('') + '</div>'
    );
  }

  function talk(id){
    var s = SCENES.find(function(x){ return x.id === id; });
    if (!s) return talkHome();
    setTab('talk');
    var history = [];   // what the server sees: learner turns and the character's raw replies
    var busy = false, rec = null, lastReply = s.say || s.opening, typing = !SR;

    render(
      '<section class="chat-view">' +
        '<header class="chat-top">' +
          '<a class="icon-btn" href="#/talk" aria-label="Back to conversations">' + I.back + '</a>' +
          '<span class="avatar">' + esc(initials(s.who)) + '</span>' +
          '<div class="who"><b>' + esc(s.who) + '</b><span>' + esc(s.title) + '</span></div>' +
          '<button class="icon-btn" id="restart" type="button" aria-label="Start over" title="Start over">' + I.restart + '</button>' +
        '</header>' +
        '<div class="chat-scroll" id="scroll"><div class="chat-inner" id="chat" aria-live="polite">' +
          '<div class="day-note">Role-play · speak as you would at work. Words to improve are underlined - tap them.</div>' +
        '</div></div>' +
        '<div class="composer"><div class="composer-inner">' +
          '<div class="chips" id="chips"></div>' +
          '<div id="voiceRow"' + (typing ? ' hidden' : '') + '>' +
            '<div class="mic-row">' +
              '<button class="side-btn" id="toType" type="button" aria-label="Type instead">' + I.keyboard + '</button>' +
              micButton('mic') +
              '<button class="side-btn" id="replay" type="button" aria-label="Hear the last reply again">' + I.speaker + '</button>' +
            '</div>' +
            '<div class="mic-label" id="micLabel" style="text-align:center;margin-top:6px">Tap to speak</div>' +
          '</div>' +
          '<form class="type-row" id="typeRow" autocomplete="off"' + (typing ? '' : ' hidden') + '>' +
            (SR ? '<button class="side-btn" id="toVoice" type="button" aria-label="Speak instead">' + I.mic + '</button>' : '') +
            '<input id="say" type="text" maxlength="600" placeholder="Type your reply in English" aria-label="Your reply">' +
            '<button class="send" type="submit" aria-label="Send">' + I.send + '</button>' +
          '</form>' +
          '<div class="remaining" id="note"></div>' +
        '</div></div>' +
      '</section>'
    );
    document.body.classList.add('in-chat');

    var chat = document.getElementById('chat'), scroll = document.getElementById('scroll'), chips = document.getElementById('chips');
    var mic = document.getElementById('mic'), micLabel = document.getElementById('micLabel');
    var input = document.getElementById('say'), note = document.getElementById('note');
    var voiceRow = document.getElementById('voiceRow'), typeRow = document.getElementById('typeRow');

    function down(){ scroll.scrollTop = scroll.scrollHeight; }
    function add(el){ chat.appendChild(el); down(); return el; }
    function el(cls, html){ var d = document.createElement('div'); d.className = cls; d.innerHTML = html; return d; }

    // Reads the "reply" field out of a partly-received JSON answer.
    function partialReply(buf){
      var m = buf.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)("?)/);
      if (!m) return null;
      var body = m[1].replace(/\\u[0-9a-fA-F]{0,3}$|\\$/, '');
      try { return { text: JSON.parse('"' + body + '"'), complete: m[2] === '"' }; } catch(e) { return null; }
    }

    function aiMsg(text, ml, spoken, phrase, quiet){
      var b = add(el('msg ai', '<p>' + esc(text) + '</p>' +
        '<div class="msg-tools"><button type="button" data-a="say">' + I.speaker + 'Play</button><button type="button" data-a="slow">Slow</button>' +
        (ml ? '<button type="button" data-a="ml">മലയാളം</button>' : '') + '</div>' +
        (ml ? '<p class="coach mal" lang="ml" hidden>' + esc(ml) + '</p>' : '')));
      b.querySelector('[data-a=say]').onclick = function(){ speak(spoken || text); };
      b.querySelector('[data-a=slow]').onclick = function(){ speak(spoken || text, true); };
      var mlBtn = b.querySelector('[data-a=ml]');
      if (mlBtn) mlBtn.onclick = function(){ var p = b.querySelector('.coach'); p.hidden = !p.hidden; };
      if (phrase && phrase.phrase) {
        var saved = state.phrases.some(function(x){ return x.phrase === phrase.phrase; });
        var pc = add(el('power', '<div style="flex:1"><span class="lbl">Power phrase</span><b>' + esc(phrase.phrase) + '</b>' +
          '<span class="' + (LEVEL_MALAYALAM ? 'mal' : 'why') + '"' + (LEVEL_MALAYALAM ? ' lang="ml"' : '') + '>' + esc(phrase.meaning || '') + '</span></div>' +
          '<div class="acts"><button type="button" data-a="pp" aria-label="Listen">' + I.speaker + '</button>' +
          '<button type="button" data-a="save" class="' + (saved ? 'saved' : '') + '" aria-label="Save phrase">' + I.save + '</button></div>'));
        pc.querySelector('[data-a=pp]').onclick = function(){ speak(phrase.phrase); };
        pc.querySelector('[data-a=save]').onclick = function(){
          if (!state.phrases.some(function(x){ return x.phrase === phrase.phrase; })) {
            state.phrases.push({ phrase: phrase.phrase, meaning: phrase.meaning || '', scene: s.id }); save();
          }
          this.classList.add('saved');
        };
      }
      lastReply = spoken || text;
      if (!quiet) speak(lastReply);
    }

    function meMsg(text, live){
      return add(el('msg me' + (live ? ' live' : ''), '<p>' + esc(text) + '</p>'));
    }

    // Underline the words the coach flagged; tapping one opens the correction.
    function markUp(text, issues){
      var spans = [], lower = text.toLowerCase();
      (issues || []).forEach(function(it, i){
        if (!it.text) return;
        var at = lower.indexOf(it.text.toLowerCase());
        if (at < 0 || spans.some(function(x){ return at < x.end && at + it.text.length > x.start; })) return;
        spans.push({ start: at, end: at + it.text.length, i: i });
      });
      spans.sort(function(a, b){ return a.start - b.start; });
      var html = '', pos = 0;
      spans.forEach(function(x){
        html += esc(text.slice(pos, x.start)) +
          '<span class="mark ' + esc(issues[x.i].kind) + '" role="button" tabindex="0" data-i="' + x.i + '">' + esc(text.slice(x.start, x.end)) + '</span>';
        pos = x.end;
      });
      return { html: html + esc(text.slice(pos)), placed: spans.map(function(x){ return x.i; }) };
    }

    function openSheet(it){
      var bg = document.createElement('div');
      bg.className = 'sheet-bg';
      bg.innerHTML = '<div class="sheet" role="dialog" aria-label="Correction"><div class="grab"></div>' +
        '<span class="kind ' + esc(it.kind) + '">' + esc(it.kind) + '</span>' +
        '<p class="swap"><s>' + esc(it.text) + '</s> → <b>' + esc(it.fix) + '</b></p>' +
        '<p>' + esc(it.note) + '</p>' +
        '<div class="row"><button class="btn primary" type="button" data-a="say">' + I.speaker + 'Hear it</button><button class="btn ghost" type="button" data-a="close">Close</button></div></div>';
      document.body.appendChild(bg);
      bg.onclick = function(e){ if (e.target === bg) bg.remove(); };
      bg.querySelector('[data-a=say]').onclick = function(){ speak(it.fix); };
      bg.querySelector('[data-a=close]').onclick = function(){ bg.remove(); };
    }

    function feedback(b, text, d){
      var f = d.feedback || {}, issues = d.issues || [];
      var m = markUp(text, issues);
      b.querySelector('p').innerHTML = m.html;
      b.querySelectorAll('.mark').forEach(function(x){
        x.onclick = function(){ openSheet(issues[+x.dataset.i]); };
        x.onkeydown = function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSheet(issues[+x.dataset.i]); } };
      });
      var status = f.status === 'excellent' || !f.better ? 'excellent' : f.status === 'polish' ? 'polish' : 'fix';
      var label = status === 'excellent' ? I.check + 'Excellent' : status === 'polish' ? I.spark + 'Could be stronger' : I.pencil + 'Needs a fix';
      var unplaced = issues.filter(function(x, i){ return m.placed.indexOf(i) < 0; });
      var coach = '';
      if (status !== 'excellent') coach += '<div class="better">“' + esc(f.better) + '”</div>';
      if (f.explain) coach += '<div class="why">' + esc(f.explain) + '</div>';
      if (f.explain_ml) coach += '<span class="mal" lang="ml">' + esc(f.explain_ml) + '</span>';
      unplaced.forEach(function(x){ coach += '<div class="why">“' + esc(x.text) + '” → ' + esc(x.fix) + ' - ' + esc(x.note) + '</div>'; });
      var v = document.createElement('button');
      v.type = 'button'; v.className = 'verdict ' + status; v.innerHTML = label;
      var panel = el('coach', coach + (status !== 'excellent' ? '<div class="msg-tools"><button type="button" data-a="better">' + I.speaker + 'Hear the better version</button></div>' : ''));
      panel.hidden = status === 'polish' || status === 'excellent';
      v.onclick = function(){ panel.hidden = !panel.hidden; down(); };
      b.appendChild(v); b.appendChild(panel);
      var hb = panel.querySelector('[data-a=better]');
      if (hb) hb.onclick = function(){ speak(f.better); };
      down();
    }

    function showChips(list){
      chips.innerHTML = '';
      (list || []).forEach(function(t){
        var c = document.createElement('button');
        c.type = 'button'; c.className = 'chip'; c.textContent = t; c.title = 'Hear this suggestion';
        c.onclick = function(){ speak(t); if (!typeRow.hidden) { input.value = t; input.focus(); } };
        chips.appendChild(c);
      });
    }

    function failed(b, msg){
      history.pop();
      b.classList.add('failed');
      b.appendChild(el('coach', '<div class="why">' + msg + '</div>'));
      down();
    }

    function setBusy(on){
      busy = on;
      if (mic) { mic.classList.toggle('busy', on); mic.innerHTML = on ? I.spinner : I.mic; }
      if (micLabel && !rec) micLabel.textContent = on ? (s.who.split(',')[0] + ' is replying…') : 'Tap to speak';
    }

    // Speaking pace and filler words, shown under a spoken message.
    var FILLERS = /\b(um+|uh+|er+m?|ah+|hmm+|you know|i mean|basically|actually|kind of|sort of)\b/gi;
    function paceNote(b, text, speaking){
      var n = text.trim().split(/\s+/).length, wpm = Math.round(n / speaking * 60), fillers = (text.match(FILLERS) || []).length;
      if (n < 4 || speaking < 1.5) return;
      var tip = wpm < 95 ? 'A little slow - try to keep going between ideas.' : wpm > 175 ? 'Quite fast - slow down a little so every word is clear.' : 'A natural pace.';
      if (fillers > 1) tip += ' Try a short pause instead of filler words.';
      b.appendChild(el('pace', I.mic + '<span><b>' + wpm + '</b> words/min · <b>' + fillers + '</b> filler word' + (fillers === 1 ? '' : 's') + ' · ' + tip + '</span>'));
      logDay({ paceN: 1, wpmSum: wpm, fillers: fillers });
      down();
    }

    function send(text, b, secs, speaking){
      text = text.trim();
      if (!text || busy) return;
      if (!TALK_API) { note.textContent = 'The AI coach is not set up yet - coming soon!'; return; }
      if (!b) b = meMsg(text);
      input.value = ''; showChips([]);
      history.push({ role: 'user', content: text });
      var dots = add(el('typing', '<i></i><i></i><i></i>'));
      setBusy(true);
      fetch(TALK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
        body: JSON.stringify({ level: LEVEL, scene: s.id, messages: history })
      }).then(function(r){
        if (!r.body || (r.headers.get('Content-Type') || '').indexOf('ndjson') < 0) {
          return r.json().catch(function(){ return { error: 'ai_error' }; });
        }
        // Streamed answer: show the reply word by word, and speak each sentence as soon as it's written.
        var reader = r.body.getReader(), dec = new TextDecoder(), pending = '', raw = '', live = null, spoken = false, final = null, said = 0;
        function speakReady(text, complete){
          var rest = text.slice(said), end = -1, m, re = /[.!?](\s|$)/g;
          while ((m = re.exec(rest))) { if (m.index + 1 < rest.length || complete) end = m.index + 1; }
          if (complete) end = rest.length;
          if (end <= 0) return;
          var chunk = rest.slice(0, end).trim();
          if (chunk) { speak(chunk, false, spoken); spoken = true; }
          said += end;
        }
        function pump(){
          return reader.read().then(function(res){
            if (res.done) return final || { error: 'ai_error' };
            pending += dec.decode(res.value, { stream: true });
            var lines = pending.split('\n');
            pending = lines.pop();
            lines.forEach(function(line){
              if (!line) return;
              var o; try { o = JSON.parse(line); } catch(e) { return; }
              if (o.t !== 'delta') { final = o; return; }
              raw += o.text;
              var rep = partialReply(raw);
              if (!rep) return;
              if (!live) { dots.remove(); live = add(el('msg ai', '<p></p>')); }
              live.querySelector('p').textContent = rep.text; down();
              if (said < rep.text.length) speakReady(rep.text, rep.complete);
            });
            return pump();
          });
        }
        return pump().then(function(d){ if (live) live.remove(); d.spoken = spoken; return d; });
      }).then(function(d){
        dots.remove(); setBusy(false);
        if (d.error === 'access_code') { failed(b, 'Access code needed.'); askCode(text, b); return; }
        if (d.error === 'daily_limit') { failed(b, 'You\'ve reached today\'s limit - come back tomorrow.'); return; }
        if (d.error === 'refused') { failed(b, 'Let\'s try saying that a different way.'); return; }
        if (d.error || !d.reply) { failed(b, 'Couldn\'t reach your coach. Please try again.'); input.value = text; return; }
        feedback(b, text, d);
        if (speaking) paceNote(b, text, speaking);
        history.push({ role: 'assistant', content: d.raw });
        aiMsg(d.reply, LEVEL_MALAYALAM ? d.reply_ml : '', null, d.power_phrase, d.spoken);
        showChips(d.suggestions);
        if (typeof d.remaining === 'number') note.textContent = d.remaining + ' messages left today';
        var st = (d.feedback || {}).status;
        logDay({ turns: 1, fluSum: st === 'excellent' ? 100 : st === 'polish' ? 80 : 50, speakSec: Math.round(secs || 0) });
        if (d.scores) logDay({ gvN: 1, gramSum: +d.scores.grammar || 0, vocabSum: +d.scores.vocabulary || 0 });
        addVocab(text); markActive(); save();
      }).catch(function(){
        dots.remove(); setBusy(false);
        failed(b, 'No internet connection? Please try again.');
        input.value = text;
      });
    }

    function askCode(retryText, retryBubble){
      if (document.getElementById('codeform')) return;
      var f = document.createElement('form');
      f.id = 'codeform'; f.className = 'msg ai codebox';
      f.innerHTML = '<p><b>Enter your access code</b></p><div class="type-row"><input id="code" type="text" autocomplete="off" aria-label="Access code"><button class="send" type="submit" aria-label="OK">' + I.check + '</button></div>';
      f.onsubmit = function(e){
        e.preventDefault();
        setCode(f.querySelector('#code').value.trim());
        f.remove();
        retryBubble.classList.remove('failed');
        var c = retryBubble.querySelector('.coach'); if (c) c.remove();
        send(retryText, retryBubble);
      };
      add(f); f.querySelector('#code').focus();
    }

    // Voice: tap to talk, tap again to stop. Words appear live in the chat as you speak.
    if (mic) mic.onclick = function(){
      if (busy) return;
      if (rec) { rec.stop(); return; }
      if (canSpeak) speechSynthesis.cancel();
      var live = meMsg('…', true);
      mic.classList.add('live'); micLabel.innerHTML = waveHtml() + 'Listening… tap to stop';
      rec = listen({
        pauseMs: 1100,
        interim: function(t){ live.querySelector('p').textContent = t || '…'; down(); },
        error: function(err){ if (err === 'not-allowed' || err === 'service-not-allowed') note.textContent = 'Microphone is blocked - please allow it for this site.'; },
        end: function(alts, secs, speaking){
          rec = null; mic.classList.remove('live');
          var text = alts[0] || '';
          if (!text.trim()) { live.remove(); micLabel.textContent = 'Didn\'t catch that - tap to try again'; return; }
          live.classList.remove('live'); live.querySelector('p').textContent = text;
          micLabel.textContent = 'Tap to speak';
          send(text, live, secs, speaking);
        }
      });
    };
    document.getElementById('replay').onclick = function(){ speak(lastReply); };
    document.getElementById('toType').onclick = function(){ voiceRow.hidden = true; typeRow.hidden = false; input.focus(); };
    var toVoice = document.getElementById('toVoice');
    if (toVoice) toVoice.onclick = function(){ typeRow.hidden = true; voiceRow.hidden = false; };
    typeRow.onsubmit = function(e){ e.preventDefault(); send(input.value); };
    document.getElementById('restart').onclick = function(){ if (rec) rec.abort(); talk(id); };

    aiMsg(s.opening, LEVEL_MALAYALAM ? s.opening_ml : '', s.say);

    // Load this scene into the server's cache while the learner reads the opening line,
    // so their first reply comes back as quickly as later ones.
    if (TALK_API && getCode()) {
      fetch(TALK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
        body: JSON.stringify({ warm: true, level: LEVEL, scene: s.id })
      }).catch(function(){});
    }
  }

  /* ---------- Slang ---------- */
  function slang(){
    setTab('slang');
    render(
      '<span class="eyebrow">Aussie slang</span>' +
      '<h1 class="title">Words you\'ll hear every day</h1>' +
      '<p class="lede">Tap a card to see what it means.</p>' +
      '<div class="slang">' + SLANG.map(function(s, i){
        return '<div class="card flip" role="button" tabindex="0" aria-expanded="false" data-i="' + i + '">' +
          '<button class="say" type="button" data-i="' + i + '" aria-label="Listen to ' + esc(s.word) + '">' + I.speaker + '</button>' +
          '<div class="w">' + esc(s.word) + '</div>' +
          '<div class="hint">Tap to see meaning</div>' +
          '<div class="back-side">= ' + esc(s.means) + '<span class="mal" lang="ml">' + esc(s.ml) + '</span><em>“' + esc(s.ex) + '”</em></div>' +
        '</div>';
      }).join('') + '</div>'
    );
    app.querySelectorAll('.flip').forEach(function(card){
      function toggle(){
        var open = card.classList.toggle('open');
        card.setAttribute('aria-expanded', open);
        if (open) { speak(SLANG[+card.dataset.i].ex); markActive(); }
      }
      card.onclick = toggle;
      card.onkeydown = function(e){ if (e.target === card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); } };
    });
    app.querySelectorAll('.say').forEach(function(b){
      b.onclick = function(e){ e.stopPropagation(); speak(SLANG[+b.dataset.i].word); };
    });
  }

  /* ---------- Tips ---------- */
  function tips(){
    setTab('tips');
    render(
      '<span class="eyebrow">Culture</span>' +
      '<h1 class="title">Working and living in Australia</h1>' +
      '<p class="lede">The unwritten rules that help you fit in from day one.</p>' +
      '<div class="tips">' + TIPS.map(function(t){
        return '<div class="card tipcard"><h2>' + esc(t.title) + '</h2><p lang="ml">' + esc(t.ml) + '</p></div>';
      }).join('') + '</div>'
    );
  }

  /* ---------- Router ---------- */
  function route(){
    if (canSpeak) speechSynthesis.cancel();
    document.querySelectorAll('.sheet-bg').forEach(function(x){ x.remove(); });
    var parts = location.hash.replace(/^#\/?/, '').split('?')[0].split('/');
    if (parts[0] === 'learn') learn();
    else if (parts[0] === 'lesson') lesson(parts[1], parseInt(parts[2], 10) || 0);
    else if (parts[0] === 'practise') practise();
    else if (parts[0] === 'sounds') sounds();
    else if (parts[0] === 'sound') sound(parts[1]);
    else if (parts[0] === 'test') levelTest();
    else if (parts[0] === 'quiz') quiz(parts[1]);
    else if (parts[0] === 'talk') parts[1] ? talk(parts[1]) : talkHome();
    else if (parts[0] === 'slang') slang();
    else if (parts[0] === 'tips') tips();
    else home();
  }
  window.addEventListener('hashchange', route);
  route();
})();
