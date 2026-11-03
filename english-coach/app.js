(function(){
  'use strict';

  var app = document.getElementById('app');

  // AI conversation server (aussie-english-worker). For free local testing with canned replies,
  // run `npx wrangler dev` in that folder and use 'http://127.0.0.1:8787' here instead.
  var TALK_API = 'https://aussie-english.australianjeevitham.workers.dev';
  // The three Englishes and four levels. Each learner chooses one English and is placed at a level
  // by the placement test; the weekly level-up exam (80% to pass) moves them up. The server keeps
  // the level, so the app only shows it.
  var ENGLISHES = {
    au: { name: 'Australian English', short: 'Australian', tag: 'AU', desc: 'For life and work in Australia', voice: 'en[-_]AU', country: 'Australia',
      everyday: 'Everyday Australian English', slang: 'Aussie slang', slangSub: 'words you\'ll hear every day, from "arvo" to "ambo"', older: 'Older Australians',
      listenSub: 'Understand fast, informal Aussie patient talk', sample: 'G\'day! I\'m your English coach. Let\'s practise speaking together.' },
    uk: { name: 'British English', short: 'British', tag: 'UK', desc: 'For life and work in the United Kingdom', voice: 'en[-_]GB', country: 'the UK',
      everyday: 'Everyday British English', slang: 'British slang', slangSub: 'words you\'ll hear every day, from "cuppa" to "knackered"', older: 'Older British patients',
      listenSub: 'Understand fast, informal British patient talk', sample: 'Hello! I\'m your English coach. Let\'s practise speaking together.' },
    in: { name: 'Indian English', short: 'Indian', tag: 'IN', desc: 'Clear, professional English for working in India', voice: 'en[-_]IN', country: 'India',
      everyday: 'Everyday English in India', slang: 'Everyday expressions', slangSub: 'words and expressions you\'ll hear every day', older: 'Older patients',
      listenSub: 'Understand fast, informal patient talk', sample: 'Hello! I\'m your English coach. Let\'s practise speaking together.' }
  };
  var LEVELS = [
    { id: 'beginner', name: 'Beginner', cefr: 'A1-A2', about: 'Everyday words and simple sentences' },
    { id: 'intermediate', name: 'Intermediate', cefr: 'B1', about: 'Everyday and workplace conversations' },
    { id: 'advanced', name: 'Advanced', cefr: 'B2-C1', about: 'Fluent, precise professional English' },
    { id: 'leadership', name: 'Leadership', cefr: 'C1-C2', about: 'Polished, persuasive senior-level English' }
  ];
  // Mother tongue for explanations: ml (Malayalam), hi (Hindi), ta (Tamil) or en (English only).
  // Content keeps Malayalam in "ml" fields; Hindi and Tamil come from natives.js ("hi"/"ta" fields).
  var NATIVES = { ml: 'Malayalam', hi: 'Hindi', ta: 'Tamil', en: 'English only (no translations)' };
  function nativeLang(){ return profile && NATIVES[profile.native] ? profile.native : 'ml'; }
  // The text of field f (default "ml") in the learner's language: ml -> f, hi -> "hi" or f_hi.
  function nat(o, f){
    var l = nativeLang(); f = f || 'ml';
    if (!o || l === 'en') return '';
    return (l === 'ml' ? o[f] : o[/ml$/.test(f) ? f.replace(/ml$/, l) : f + '_' + l]) || '';
  }
  function natHtml(o, cls, tag, f){
    var t = nat(o, f); tag = tag || 'p';
    return t ? '<' + tag + ' class="' + cls + '" lang="' + nativeLang() + '">' + esc(t) + '</' + tag + '>' : '';
  }
  // Labels for the learner's English (Australian when not chosen yet).
  function eng(){ return ENGLISHES[myEnglish() || 'au']; }
  // Learn content for the learner's English: Australian content is in lessons.js and vocab.js;
  // other Englishes bring their own pack (uk.js) - anything a pack lacks falls back to Australian.
  function pack(){ var e = myEnglish(); return e && typeof CONTENT_PACKS !== 'undefined' && CONTENT_PACKS[e] || {}; }
  function curLessons(){ return pack().lessons || LESSONS; }
  function curSlang(){ return pack().slang || SLANG; }
  function curTips(){ return pack().tips || TIPS; }
  function curListening(){ return pack().listening || LISTENING; }
  // Interview prep and the IELTS / OET guides with the pack's changes (roles, tips, place names, requirements).
  function interviewRoles(){ return (pack().interview || {}).roles || INTERVIEW.roles; }
  function interviewTips(){ var o = (pack().interview || {}).tips || {}; return INTERVIEW.tips.map(function(t){ return o[t.t] ? { t: t.t, d: o[t.t] } : t; }); }
  function modelAnswer(gid, i, q){ return ((pack().interview || {}).models || {})[gid + ':' + i] || q.model; }
  function curGuide(list){ var o = pack().guides || {}; return list.map(function(g){ return o[g.t] || g; }); }
  function curSounds(){ var o = pack().sounds || {}; return SOUNDS.map(function(x){ return o[x.id] ? Object.assign({}, x, o[x.id]) : x; }); }
  // Vocabulary themes: the Beginner and Intermediate sets (course.js), then the healthcare and work
  // themes (vocab.js, with the pack's "everyday life" set). Each theme gets a level for the Vocabulary page.
  var VOCAB_LEVEL = { ward: 'advanced', meds: 'advanced', aged: 'advanced', body: 'intermediate', lead: 'leadership', feel: 'advanced', admin: 'intermediate', life: 'intermediate' };
  function curVocab(){
    var life = pack().life;
    var main = VOCAB.map(function(t){ var x = t.id === 'life' && life ? life : t; x.level = x.level || VOCAB_LEVEL[t.id] || 'advanced'; return x; });
    return (typeof COURSE_VOCAB !== 'undefined' ? COURSE_VOCAB : []).concat(main);
  }
  function levelById(id){ return LEVELS.find(function(l){ return l.id === id; }) || null; }
  function myEnglish(){ return profile && ENGLISHES[profile.english] ? profile.english : null; }
  function myLevelInfo(){ var e = myEnglish(); return e && profile.levels && profile.levels[e] ? profile.levels[e] : null; }
  // The level the AI coach teaches at (signed-in learners: their own; access codes: leadership).
  function userLevel(){ var lv = myLevelInfo(); return lv ? lv.level : 'leadership'; }
  // Beginner and Intermediate chats come with help in the learner's mother tongue.
  function malayalamHelp(){ return !!myLevelInfo() && nativeLang() !== 'en' && (userLevel() === 'beginner' || userLevel() === 'intermediate'); }
  // When the next level-up exam may be taken: null = now (or no exam, at the top level).
  function nextExamDate(){
    var lv = myLevelInfo();
    if (!lv || !lv.last) return null;
    var t = new Date(lv.last).getTime() + 7 * 864e5;
    return t > Date.now() ? new Date(t) : null;
  }
  function nextLevel(){ var i = LEVELS.findIndex(function(l){ return l.id === userLevel(); }); return i >= 0 && i < LEVELS.length - 1 ? LEVELS[i + 1] : null; }
  function niceDate(d){ return d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }); }

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
    x: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    feedback: svg('<path d="M4 4.5h16v11.5H9l-5 4z"/><path d="M8.5 8.5h7M8.5 12h4.5"/>'),
    star: svg('<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.7l6.2-.9z"/>')
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
        '<li>Scroll down and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. Then open <b>English Coach</b> from your Home Screen.</li></ol>' +
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
  // Show the loaded version (the ?v= number on this script) next to the app name.
  // Before going live it shows as v0.<build> (?v=20 -> v0.20); change the prefix to 'v1.' at launch.
  var APP_VERSION = ((document.currentScript && document.currentScript.src || '').match(/[?&]v=(\d+)/) || [])[1];
  if (APP_VERSION && document.getElementById('appVer')) document.getElementById('appVer').textContent = 'v0.' + APP_VERSION;
  var canSpeak = 'speechSynthesis' in window;
  var voice = null;
  function pickVoice(){
    if (!canSpeak) return;
    var vs = speechSynthesis.getVoices(), mine = typeof profile !== 'undefined' && myEnglish() ? new RegExp(ENGLISHES[myEnglish()].voice, 'i') : null;
    voice = (mine && vs.find(function(v){ return mine.test(v.lang); })) ||
            vs.find(function(v){ return /en[-_]AU/i.test(v.lang); }) ||
            vs.find(function(v){ return /en[-_]GB/i.test(v.lang); }) ||
            vs.find(function(v){ return /^en/i.test(v.lang); }) || null;
  }
  if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function hasAussieVoice(){ return !!voice && new RegExp(eng().voice, 'i').test(voice.lang); }

  // The phone's own voice. Voices read "G'day" letter by letter; "Gidday" sounds right.
  function phoneSpeak(text, rate, queue, done){
    if (!canSpeak) { if (done) done(); return; }
    pickVoice();
    if (!queue) speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/\bg['’]day\b/gi, 'Gidday'));
    if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = 'en-AU'; }
    u.rate = rate;
    if (done) u.onend = u.onerror = done;
    speechSynthesis.speak(u);
  }

  /* ---------- Natural voice (Azure neural text-to-speech via the server) ---------- */
  // prefs.voice is one of these, or 'phone' for the phone's own voice. Natural voices need the
  // access code and internet; when they fail (offline, monthly free quota used up) the phone's
  // voice says it instead.
  var NATURAL_VOICES = [
    ['en-AU-NatashaNeural', 'Natasha', 'female', 'au'], ['en-AU-WilliamNeural', 'William', 'male', 'au'],
    ['en-AU-AnnetteNeural', 'Annette', 'female', 'au'], ['en-AU-DarrenNeural', 'Darren', 'male', 'au'],
    ['en-AU-CarlyNeural', 'Carly', 'female', 'au'], ['en-AU-KenNeural', 'Ken', 'male', 'au'],
    ['en-GB-SoniaNeural', 'Sonia', 'female', 'uk'], ['en-GB-RyanNeural', 'Ryan', 'male', 'uk'],
    ['en-GB-LibbyNeural', 'Libby', 'female', 'uk'], ['en-GB-ThomasNeural', 'Thomas', 'male', 'uk'],
    ['en-IN-NeerjaNeural', 'Neerja', 'female', 'in'], ['en-IN-PrabhatNeural', 'Prabhat', 'male', 'in']
  ];
  function voicesFor(eng){ return NATURAL_VOICES.filter(function(v){ return v[3] === (eng || 'au'); }); }
  // The chosen voice, or the first voice of the learner's English when the choice is for another English.
  function chosenVoice(){
    var list = voicesFor(myEnglish()), v = prefs.voice;
    return v === 'phone' ? 'phone' : list.some(function(x){ return x[0] === v; }) ? v : list[0][0];
  }
  var player = new Audio(), playing = null, ttsQueue = [], ttsUrls = {}, ttsKeys = [], ttsOff = false, speakGen = 0;
  function naturalVoice(){
    var v = chosenVoice();
    return v !== 'phone' && !ttsOff && TALK_API && hasAccess() && navigator.onLine !== false ? v : null;
  }
  // iPhones only play audio started by a tap, so play a silent clip on the first tap to unlock the player.
  function unlockPlayer(){
    document.removeEventListener('click', unlockPlayer, true);
    if (playing || ttsQueue.length) return;
    player.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
    player.play().catch(function(){});
  }
  document.addEventListener('click', unlockPlayer, true);
  function ttsFetch(text, v, rate){
    var k = v + '|' + rate + '|' + text;
    if (ttsUrls[k]) return ttsUrls[k];
    var p = ttsUrls[k] = apiFetch(TALK_API + '/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
      body: JSON.stringify({ text: text, voice: v, rate: rate })
    }).then(function(r){
      if (!r.ok) { if ([401, 429, 503].indexOf(r.status) >= 0) ttsOff = true; throw new Error('tts ' + r.status); }
      return r.blob();
    }).then(function(b){ return URL.createObjectURL(b); });
    p.catch(function(){ if (ttsUrls[k] === p) delete ttsUrls[k]; });
    // Keep the last 80 clips so replaying a phrase is instant.
    ttsKeys.push(k);
    if (ttsKeys.length > 80) { var old = ttsKeys.shift(), q = ttsUrls[old]; delete ttsUrls[old]; if (q) q.then(function(u){ URL.revokeObjectURL(u); }, function(){}); }
    return p;
  }
  function playNext(gen){
    var item = ttsQueue[0];
    if (!item || gen !== speakGen) return;
    function next(){ if (gen !== speakGen) return; playing = null; ttsQueue.shift(); playNext(gen); }
    item.url.then(function(url){
      if (gen !== speakGen) return;
      playing = next;
      player.src = url;
      return player.play();
    }).catch(function(){
      if (gen !== speakGen) return;
      playing = null;
      phoneSpeak(item.text, item.rate, true, next);
    });
  }
  player.onended = function(){ if (playing) playing(); };
  function stopSpeech(){
    speakGen++; ttsQueue = []; playing = null;
    try { player.pause(); } catch(e) {}
    if (canSpeak) speechSynthesis.cancel();
  }
  // Say text with a given voice id (a natural voice, or 'phone').
  function speakAs(v, text, rate, queue){
    if (!queue) stopSpeech();
    if (v === 'phone' || !v) return phoneSpeak(text, rate, queue);
    var item = { text: text, rate: rate, url: ttsFetch(text, v, rate) };
    item.url.catch(function(){});
    ttsQueue.push(item);
    if (ttsQueue.length === 1) playNext(speakGen);
  }
  // queue: add after whatever is already being spoken (used to read a reply sentence by sentence).
  // slow: true for slow practice speed, or a number for an exact rate (e.g. 1.15 for fast speech).
  function speak(text, slow, queue){
    if (!text) return;
    speakAs(naturalVoice() || 'phone', text, typeof slow === 'number' ? slow : slow ? 0.6 : 0.95, queue);
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
  // Course lessons for one level (Beginner and Intermediate have a course; see course.js).
  function courseUnits(level){ return (typeof COURSE !== 'undefined' && COURSE[level]) || []; }
  function allCourseUnits(){ return courseUnits('beginner').concat(courseUnits('intermediate')); }
  // The list a lesson belongs to: its course level, or the everyday lessons.
  function lessonList(l){ return ['beginner', 'intermediate'].map(courseUnits).find(function(u){ return u.indexOf(l) >= 0; }) || curLessons(); }
  function lessonById(id){ return curLessons().find(function(l){ return l.id === id; }) || allCourseUnits().find(function(l){ return l.id === id; }); }
  // The next course lesson to do at the learner's level (null when done or above Intermediate).
  function nextCourseUnit(){
    var u = courseUnits(userLevel());
    return u.find(function(l){ return !state.done[l.id]; }) || null;
  }
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
  // The app records the microphone itself, starting inside the tap (Chrome on Android gives a
  // silent microphone to recording that starts later), stops after a short silence, and posts a
  // 16 kHz WAV to the server, which scores it with Azure Speech. Sound names only exist in Azure's
  // American English model; the sounds the drills train are the same in Australian English.
  // Without Azure (not set up, offline) the free word check is used instead.
  var az = { off: false };

  // Starts recording now. Calls opts.level(0..1) while recording, and resolves with a WAV Blob
  // (or null if nothing was said). Returns { done: Promise, stop() }.
  function recordWav(opts){
    var AC = window.AudioContext || window.webkitAudioContext;
    var ctx = new AC(), chunks = [], stream = null, proc = null, src = null, finished = false;
    if (ctx.resume) ctx.resume();
    var started = Date.now(), lastVoice = 0, heardVoice = false, noise = 0.004, peak = 0, firstVoice = 0, frames = 0, resolveFn;
    var done = new Promise(function(res){ resolveFn = res; });
    function finish(){
      if (finished) return;
      finished = true;
      try { proc && proc.disconnect(); src && src.disconnect(); } catch(e) {}
      if (stream) stream.getTracks().forEach(function(t){ t.stop(); });
      var rate = ctx.sampleRate;
      try { ctx.close(); } catch(e) {}
      // splitSec: return several WAVs of at most this many seconds (Azure takes up to 60 s per request).
      if (!heardVoice) return resolveFn(null);
      if (!opts.splitSec) return resolveFn(toWav(chunks, rate));
      var per = Math.floor(opts.splitSec * rate / 4096), parts = [];
      for (var i = 0; i < chunks.length; i += per) parts.push(toWav(chunks.slice(i, i + per), rate));
      resolveFn(parts);
    }
    // No auto-gain: it lifts the room noise in every pause, so the pause never looks quiet.
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false, channelCount: 1 } })
      .then(function(s){
        if (finished) { s.getTracks().forEach(function(t){ t.stop(); }); return; }
        stream = s;
        src = ctx.createMediaStreamSource(s);
        proc = ctx.createScriptProcessor(4096, 1, 1);
        proc.onaudioprocess = function(e){
          if (finished) return;
          var d = e.inputBuffer.getChannelData(0), sum = 0;
          chunks.push(new Float32Array(d));
          for (var i = 0; i < d.length; i++) sum += d[i] * d[i];
          var rms = Math.sqrt(sum / d.length), now = Date.now();
          frames++;
          if (frames <= 3) noise = Math.max(noise, rms);          // measure the room for the first moment
          else if (rms < noise) noise = rms;                      // and follow it down when the room gets quieter
          // Voice = clearly above the room AND not far below the loudest moment so far,
          // so a noisy room after the word still counts as a pause.
          var loud = rms > Math.max(0.012, noise * 2.5, peak * 0.3);
          if (loud) { if (!heardVoice) firstVoice = now; heardVoice = true; lastVoice = now; if (rms > peak) peak = rms; }
          if (opts.level) opts.level(Math.min(1, rms * 12));
          if (opts.tick) opts.tick((now - started) / 1000);
          // Stop after a pause once they've spoken, if nothing is said at all, or at the time limit.
          if ((heardVoice && now - lastVoice > (opts.pauseMs || 1300)) || (!heardVoice && now - started > (opts.waitMs || 7000)) || now - started > (opts.maxMs || 20000) || (heardVoice && opts.voiceMs && now - firstVoice > opts.voiceMs)) finish();
        };
        src.connect(proc); proc.connect(ctx.destination);
      })
      .catch(function(err){ if (opts.error) opts.error(err && err.name); heardVoice = false; finish(); });
    return { done: done, stop: finish };
  }
  // Float chunks at the device rate -> 16 kHz 16-bit mono WAV.
  function toWav(chunks, rate){
    var total = chunks.reduce(function(a, c){ return a + c.length; }, 0), ratio = rate / 16000;
    var n = Math.floor(total / ratio), pcm = new Int16Array(n), all = new Float32Array(total), o = 0;
    chunks.forEach(function(c){ all.set(c, o); o += c.length; });
    for (var i = 0; i < n; i++) {
      var a = Math.floor(i * ratio), b = Math.min(total, Math.floor((i + 1) * ratio)), s = 0;
      for (var k = a; k < b; k++) s += all[k];
      var v = b > a ? s / (b - a) : all[a];
      pcm[i] = Math.max(-1, Math.min(1, v)) * 0x7fff;
    }
    var buf = new ArrayBuffer(44 + pcm.length * 2), dv = new DataView(buf);
    function str(p, t){ for (var j = 0; j < t.length; j++) dv.setUint8(p + j, t.charCodeAt(j)); }
    str(0, 'RIFF'); dv.setUint32(4, 36 + pcm.length * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
    dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true); dv.setUint32(24, 16000, true);
    dv.setUint32(28, 32000, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true); str(36, 'data'); dv.setUint32(40, pcm.length * 2, true);
    new Int16Array(buf, 44).set(pcm);
    return new Blob([buf], { type: 'audio/wav' });
  }
  // Sends a recording to the server for scoring against the reference text.
  function scoreWav(wav, ref){
    var refB64 = btoa(unescape(encodeURIComponent(ref)));
    return apiFetch(TALK_API.replace(/\/$/, '') + '/pron', {
      method: 'POST', headers: { 'Content-Type': 'audio/wav', 'X-Access-Code': getCode(), 'X-Reference': refB64 }, body: wav
    }).then(function(r){ return r.json(); }).then(function(j){
      if (j.error) { if (j.error === 'no_azure') az.off = true; throw new Error(j.error); }
      return parseAzure(j);
    });
  }
  // Free speech (IELTS, OET): sends each recorded piece unscripted, then joins the transcripts and
  // averages the scores weighted by how long each piece was.
  function scoreFree(wavs){
    var out = { text: [], secs: 0, acc: 0, flu: 0, pros: 0, pauses: 0, longPauses: 0 };
    return wavs.reduce(function(p, wav){
      return p.then(function(){
        return apiFetch(TALK_API.replace(/\/$/, '') + '/pron', {
          method: 'POST', headers: { 'Content-Type': 'audio/wav', 'X-Access-Code': getCode(), 'X-Unscripted': '1', 'X-Reference': '' }, body: wav
        }).then(function(r){ return r.json(); }).then(function(j){
          if (j.error) { if (j.error === 'no_azure') az.off = true; throw new Error(j.error); }
          var nb = j.NBest && j.NBest[0];
          if (!nb) return;
          var pa = nb.PronunciationAssessment || nb, d = (j.Duration || 0) / 1e7;
          out.text.push(nb.Display || ''); out.secs += d;
          out.acc += (pa.AccuracyScore || 0) * d; out.flu += (pa.FluencyScore || 0) * d; out.pros += (pa.ProsodyScore || pa.AccuracyScore || 0) * d;
          // Pauses: gaps between words (times are in 100-nanosecond units) - over 0.6 s is a
          // hesitation, over 1.5 s a long pause.
          var w = nb.Words || [];
          for (var i = 1; i < w.length; i++) {
            var gap = (w[i].Offset - (w[i - 1].Offset + w[i - 1].Duration)) / 1e7;
            if (gap > 0.6) out.pauses++;
            if (gap > 1.5) out.longPauses++;
          }
        });
      });
    }, Promise.resolve()).then(function(){
      var s = out.secs || 1;
      return { text: out.text.join(' ').trim(), secs: out.secs, pauses: out.pauses, longPauses: out.longPauses,
        pron: out.secs ? { accuracy: Math.round(out.acc / s), fluency: Math.round(out.flu / s), prosody: Math.round(out.pros / s) } : null };
    });
  }

  // A "speak your answer" panel for long answers: tap to start, a running timer, tap again (or a
  // long pause, or the time limit) to finish. Uses Azure when set up (transcript + pronunciation);
  // otherwise the phone's own speech recognition. The answer box can always be typed in or edited.
  // done({ text, secs, pron }) is called whenever an answer is captured.
  function speakAnswer(el, opts){
    var maxSec = opts.maxSec || 60, useAzure = !az.off && !!TALK_API && hasAccess() && !!(navigator.mediaDevices && (window.AudioContext || window.webkitAudioContext));
    el.innerHTML = micButton('smic') + '<span class="mic-label" id="slabel">Tap and start speaking</span>' +
      '<div class="timer" id="stimer" hidden></div>' +
      '<textarea id="sans" class="ref" rows="5" placeholder="Your answer appears here after you speak. You can also type or correct it."></textarea>';
    var mic = el.querySelector('#smic'), label = el.querySelector('#slabel'), timer = el.querySelector('#stimer'), ans = el.querySelector('#sans');
    var rec = null, busy = false, result = { text: '', secs: 0, pron: null }, la = null, pending = Promise.resolve();
    function fmt(s){ s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }
    ans.oninput = function(){ result.text = ans.value; };
    if (!useAzure) {
      if (!SR) { mic.remove(); label.textContent = 'Type your answer below.'; return { get: function(){ return { text: ans.value.trim(), secs: 0, pron: null }; }, finish: function(){ return Promise.resolve(); }, flash: function(){} }; }
      la = longAnswer(mic, label, ans);
      return { get: function(){ return { text: ans.value.trim(), secs: la.secs(), pron: null }; }, finish: function(){ la.stop(); return Promise.resolve(); },
        flash: function(){ mic.classList.add('nudge'); label.textContent = 'Tap the microphone and start speaking now'; } };
    }
    mic.onclick = function(){
      if (rec) { rec.stop(); return; }
      if (busy) return;
      stopSpeech();
      mic.classList.add('live'); label.innerHTML = waveHtml() + 'Listening… tap when you\'ve finished';
      timer.hidden = false; timer.textContent = fmt(maxSec);
      rec = recordWav({ splitSec: 50, pauseMs: opts.pauseMs || 7000, waitMs: 10000, maxMs: maxSec * 1000,
        tick: function(t){ timer.textContent = fmt(maxSec - t); timer.classList.toggle('low', maxSec - t < 15); },
        level: function(v){ mic.style.transform = 'scale(' + (1 + v * 0.18).toFixed(3) + ')'; },
        error: function(name){ if (name === 'NotAllowedError') label.textContent = 'Microphone is blocked. Please allow it for this site.'; } });
      pending = rec.done.then(function(wavs){
        rec = null; mic.classList.remove('live'); mic.style.transform = '';
        if (!wavs || !wavs.length) { label.textContent = 'Didn\'t catch that - tap and try again'; return; }
        busy = true; mic.classList.add('busy'); mic.innerHTML = I.spinner; label.textContent = 'Listening back to your answer…';
        return scoreFree(wavs).then(function(r){
          busy = false; mic.classList.remove('busy'); mic.innerHTML = I.mic;
          ans.value = (ans.value.trim() ? ans.value.trim() + ' ' : '') + r.text;
          result = { text: ans.value, secs: result.secs + r.secs, pron: r.pron || result.pron, pauses: (result.pauses || 0) + r.pauses, longPauses: (result.longPauses || 0) + r.longPauses };
          label.textContent = r.text ? 'Got it - tap to add more, or check your answer below' : 'Didn\'t catch that - tap and try again';
          logDay({ speakSec: Math.round(r.secs) }); addVocab(r.text); markActive(); save();
          if (opts.done) opts.done(result);
        });
      }).catch(function(){
        rec = null; busy = false; mic.classList.remove('live', 'busy'); mic.innerHTML = I.mic;
        label.textContent = 'Couldn\'t process that - check your internet and try again, or type your answer.';
      });
    };
    return {
      get: function(){ return { text: ans.value.trim(), secs: result.secs, pron: result.pron, pauses: result.pauses, longPauses: result.longPauses }; },
      // Stops any recording in progress and resolves once its words are in the answer box.
      finish: function(){ if (rec) rec.stop(); return pending.catch(function(){}); },
      flash: function(){ mic.classList.add('nudge'); label.textContent = 'Tap the microphone and start speaking now'; }
    };
  }

  // Azure's result: scores either flat on each item or inside "PronunciationAssessment".
  function parseAzure(j){
    var nb = j.NBest && j.NBest[0];
    if (!nb) return null;
    var pa = nb.PronunciationAssessment || nb;
    if (pa.AccuracyScore == null) return null;
    return {
      pron: Math.round(pa.PronScore || pa.AccuracyScore || 0), accuracy: Math.round(pa.AccuracyScore || 0), fluency: pa.FluencyScore == null ? null : Math.round(pa.FluencyScore),
      completeness: Math.round(pa.CompletenessScore || 0), prosody: pa.ProsodyScore == null ? null : Math.round(pa.ProsodyScore),
      heard: nb.Display || '', secs: (j.Duration || 0) / 1e7,
      words: (nb.Words || []).map(function(w){
        var wp = w.PronunciationAssessment || w;
        return { word: w.Word, score: Math.round(wp.AccuracyScore || 0), error: wp.ErrorType || 'None',
          syllables: (w.Syllables || []).map(function(s){ return { syl: s.Syllable, score: Math.round((s.PronunciationAssessment || s).AccuracyScore || 0) }; }),
          phonemes: (w.Phonemes || []).map(function(p){
            var pp = p.PronunciationAssessment || p, best = (pp.NBestPhonemes || [])[0];
            return { ipa: p.Phoneme, score: Math.round(pp.AccuracyScore || 0), heard: best ? best.Phoneme : null };
          }) };
      })
    };
  }
  function soundFor(ipa){ return curSounds().find(function(s){ return s.ipa.indexOf(ipa) >= 0; }); }
  function scoreCls(n){ return n >= 80 ? 'ok' : n >= 60 ? 'close' : 'miss'; }

  // Adds the day's pronunciation numbers and which drill sounds were weak.
  function logAzure(res){
    logDay({ paN: 1, paPron: res.pron, paAcc: res.accuracy, paFlu: res.fluency == null ? res.pron : res.fluency, paPros: res.prosody == null ? res.pron : res.prosody,
             pronSum: res.pron, pronN: 1, speakSec: Math.round(res.secs) });
    state.sounds = state.sounds || {};
    res.words.forEach(function(w){ w.phonemes.forEach(function(p){
      var s = soundFor(p.ipa); if (!s) return;
      var st = state.sounds[s.id] || (state.sounds[s.id] = { n: 0, sum: 0 });
      st.n++; st.sum += p.score;
    }); });
    addVocab(res.heard); markActive(); save();
  }

  // What each score bar means, shown when it is tapped: [English, Malayalam] (Hindi and Tamil are in natives.js).
  var SCORE_INFO = {
    Overall: ['Your total pronunciation score - accuracy, fluency and intonation together. 80 or more is clear speech that is easy to understand.',
      'നിങ്ങളുടെ ഉച്ചാരണത്തിന്റെ ആകെ സ്കോർ - കൃത്യത, ഒഴുക്ക്, സ്വരഭേദം എന്നിവ ചേർന്നത്. 80-ന് മുകളിൽ ആണെങ്കിൽ വ്യക്തവും എളുപ്പം മനസ്സിലാകുന്നതുമായ സംസാരം.'],
    Accuracy: ['How correctly you said each sound, compared with a native speaker. Tap a red word to see which sound to fix.',
      'ഓരോ ശബ്ദവും എത്ര ശരിയായി ഉച്ചരിച്ചു എന്ന്, ഒരു നേറ്റീവ് സ്പീക്കറുമായി താരതമ്യം ചെയ്ത്. ഏത് ശബ്ദം ശരിയാക്കണം എന്നറിയാൻ ചുവന്ന വാക്കിൽ തൊടുക.'],
    Fluency: ['How smoothly you spoke - a natural speed, with no long pauses or stops between words.',
      'എത്ര സുഗമമായി സംസാരിച്ചു എന്ന് - സ്വാഭാവിക വേഗതയിൽ, വാക്കുകൾക്കിടയിൽ നീണ്ട ഇടവേളകളോ നിർത്തലുകളോ ഇല്ലാതെ.'],
    Intonation: ['The music of your speech - stress on the right syllable, and a voice that rises and falls naturally instead of staying flat.',
      'സംസാരത്തിന്റെ താളം - ശരിയായ ഭാഗത്ത് ഊന്നൽ നൽകുക, ശബ്ദം ഒരേ നിരപ്പിൽ നിൽക്കാതെ സ്വാഭാവികമായി ഉയർന്നും താഴ്ന്നും വരിക.'],
    Pronunciation: ['How clearly you say words and sounds, measured from your voice in drills, lessons and tests.',
      'വാക്കുകളും ശബ്ദങ്ങളും എത്ര വ്യക്തമായി ഉച്ചരിക്കുന്നു എന്ന് - ഡ്രില്ലുകളിലും പാഠങ്ങളിലും ടെസ്റ്റുകളിലും നിങ്ങളുടെ ശബ്ദത്തിൽ നിന്ന് അളക്കുന്നു.'],
    Grammar: ['How correct your sentences are - tenses, word order, and small words like "a" and "the".',
      'വാക്യങ്ങൾ എത്ര ശരിയാണ് എന്ന് - കാലം (tense), വാക്കുകളുടെ ക്രമം, "a", "the" പോലുള്ള ചെറിയ വാക്കുകൾ.'],
    Vocabulary: ['How well you choose words - natural, precise and professional words, not only simple ones.',
      'വാക്കുകൾ എത്ര നന്നായി തിരഞ്ഞെടുക്കുന്നു എന്ന് - ലളിതമായ വാക്കുകൾ മാത്രമല്ല, സ്വാഭാവികവും കൃത്യവും പ്രൊഫഷണലുമായ വാക്കുകൾ.'],
    Coherence: ['How clearly your ideas connect - a clear start, points linked with words like "first", "also" and "because", and an ending.',
      'ആശയങ്ങൾ എത്ര വ്യക്തമായി ബന്ധിപ്പിക്കുന്നു എന്ന് - വ്യക്തമായ തുടക്കം, "first", "also", "because" പോലുള്ള വാക്കുകൾ കൊണ്ട് ബന്ധിപ്പിച്ച ആശയങ്ങൾ, ഒരു അവസാനം.']
  };
  // Tapping a score bar opens (or closes) its meaning right under it.
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.sbar[data-info]');
    if (!b) return;
    var open = b.nextElementSibling && b.nextElementSibling.classList.contains('sbar-info');
    b.parentNode.querySelectorAll('.sbar-info').forEach(function(x){ x.remove(); });
    b.parentNode.querySelectorAll('.sbar.on').forEach(function(x){ x.classList.remove('on'); });
    if (open) return;
    var t = SCORE_INFO[b.getAttribute('data-info')], d = document.createElement('div');
    d.className = 'sbar-info';
    d.innerHTML = '<p>' + esc(t[0]) + '</p>' + natHtml({ ml: t[1], hi: NATIVE_TEXT.hi['score:' + b.getAttribute('data-info')], ta: NATIVE_TEXT.ta['score:' + b.getAttribute('data-info')] }, 'mal');
    b.classList.add('on');
    b.after(d);
  });
  document.addEventListener('keydown', function(e){
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.sbar[data-info]')) { e.preventDefault(); e.target.click(); }
  });
  function bar(label, v){
    return '<div class="sbar"' + (SCORE_INFO[label] ? ' data-info="' + label + '" role="button" tabindex="0" aria-label="' + label + ' ' + (v == null ? '' : v) + ' - tap for what this means"' : '') + '><span>' + label + '</span><i><b class="' + (v == null ? '' : scoreCls(v)) + '" style="width:' + (v || 0) + '%"></b></i><em>' + (v == null ? '–' : v) + '</em></div>';
  }
  // A simple front view of the mouth for each drill sound: lips, teeth and tongue.
  var MOUTH = {
    'v': ['lipteeth', 'Top teeth rest lightly on your bottom lip'], 'f': ['lipteeth', 'Top teeth rest lightly on your bottom lip'],
    'w': ['round', 'Lips rounded and pushed forward - no teeth'], 'θ': ['tongue', 'Tongue tip between your teeth, blow air'],
    'ð': ['tongue', 'Tongue tip between your teeth, voice on'], 'z': ['ridge', 'Teeth almost closed, tongue behind them, buzz'],
    'p': ['closed', 'Both lips closed, then pop them open'], 'i': ['smile', 'Lips spread wide, like a smile'],
    'ɪ': ['relaxed', 'Mouth relaxed and only slightly open'], 'æ': ['open', 'Jaw dropped, mouth wide open'],
    'ɹ': ['curl', 'Tongue tip curled back, not touching the roof']
  };
  function mouthSvg(ipa){
    var m = MOUTH[ipa]; if (!m) return '';
    var k = m[0], lip = 'var(--bad)', tooth = '#fff', tongue = '#E8828C', dark = '#3a1d22', s = '';
    var shapes = {
      lipteeth: '<path d="M10 38 Q60 16 110 38 Q60 34 10 38Z" fill="' + lip + '"/><path d="M10 42 Q60 68 110 42 Q60 44 10 42Z" fill="' + lip + '"/><rect x="34" y="32" width="52" height="15" rx="3" fill="' + tooth + '"/>',
      round: '<ellipse cx="60" cy="45" rx="22" ry="20" fill="' + lip + '"/><ellipse cx="60" cy="45" rx="9" ry="8" fill="' + dark + '"/>',
      tongue: '<path d="M10 40 Q60 14 110 40 Q60 34 10 40Z" fill="' + lip + '"/><rect x="34" y="34" width="52" height="7" rx="2" fill="' + tooth + '"/><rect x="34" y="50" width="52" height="7" rx="2" fill="' + tooth + '"/><ellipse cx="60" cy="46" rx="20" ry="8" fill="' + tongue + '"/><path d="M10 58 Q60 82 110 58 Q60 62 10 58Z" fill="' + lip + '"/>',
      ridge: '<path d="M8 40 Q60 22 112 40 Q60 36 8 40Z" fill="' + lip + '"/><rect x="30" y="36" width="60" height="8" rx="2" fill="' + tooth + '"/><rect x="30" y="46" width="60" height="7" rx="2" fill="' + tooth + '"/><path d="M8 54 Q60 70 112 54 Q60 58 8 54Z" fill="' + lip + '"/>',
      closed: '<path d="M14 44 Q60 26 106 44 Q60 46 14 44Z" fill="' + lip + '"/><path d="M14 44 Q60 64 106 44 Q60 46 14 44Z" fill="' + lip + '"/>',
      smile: '<path d="M4 40 Q60 28 116 40 Q60 38 4 40Z" fill="' + lip + '"/><rect x="24" y="38" width="72" height="8" rx="3" fill="' + tooth + '"/><path d="M24 46 L96 46 Q60 52 24 46Z" fill="' + dark + '"/><path d="M4 46 Q60 62 116 46 Q60 52 4 46Z" fill="' + lip + '"/>',
      relaxed: '<path d="M14 40 Q60 24 106 40 Q60 38 14 40Z" fill="' + lip + '"/><ellipse cx="60" cy="45" rx="34" ry="6" fill="' + dark + '"/><path d="M14 48 Q60 68 106 48 Q60 52 14 48Z" fill="' + lip + '"/>',
      open: '<path d="M14 26 Q60 8 106 26 Q60 22 14 26Z" fill="' + lip + '"/><rect x="34" y="24" width="52" height="7" rx="2" fill="' + tooth + '"/><ellipse cx="60" cy="48" rx="38" ry="20" fill="' + dark + '"/><ellipse cx="60" cy="62" rx="26" ry="7" fill="' + tongue + '"/><path d="M14 70 Q60 92 106 70 Q60 74 14 70Z" fill="' + lip + '"/>',
      curl: '<path d="M14 34 Q60 16 106 34 Q60 30 14 34Z" fill="' + lip + '"/><ellipse cx="60" cy="46" rx="30" ry="12" fill="' + dark + '"/><path d="M38 52 Q60 30 76 44" stroke="' + tongue + '" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M14 58 Q60 78 106 58 Q60 62 14 58Z" fill="' + lip + '"/>'
    };
    s = shapes[k] || '';
    return '<figure class="mouth"><svg viewBox="0 0 120 90" role="img" aria-label="' + esc(m[1]) + '">' + s + '</svg><figcaption>' + esc(m[1]) + '</figcaption></figure>';
  }
  // The weakest drill sound in a result (lowest-scoring sound that a drill trains), if it needs work.
  function weakestSound(res){
    var best = null;
    res.words.forEach(function(w){ w.phonemes.forEach(function(p){
      var s = soundFor(p.ipa);
      if (s && p.score < 70 && (!best || p.score < best.p.score)) best = { s: s, p: p, word: w.word };
    }); });
    return best;
  }
  function renderAzure(box, res){
    var worst = null, weak = weakestSound(res);
    res.words.forEach(function(w){ if (w.error !== 'Omission' && (!worst || w.score < worst.score)) worst = w; });
    box.innerHTML =
      '<div class="sbars">' + bar('Overall', res.pron) + bar('Accuracy', res.accuracy) + bar('Fluency', res.fluency) + bar('Intonation', res.prosody) + '</div>' +
      (weak ? '<div class="weak-tip"><div><span class="count">Fix this sound first</span><b>/' + esc(weak.p.ipa) + '/ in “' + esc(weak.word) + '”' +
        (weak.p.heard && weak.p.heard !== weak.p.ipa ? ' - you said /' + esc(weak.p.heard) + '/' : '') + '</b>' +
        '<p>' + esc(weak.s.tip) + '</p>' + natHtml(weak.s, 'mal', 'p') + '<a href="#/sound/' + weak.s.id + '">Practise ' + esc(weak.s.title) + I.chev + '</a></div>' +
        mouthSvg(weak.p.ipa) + '</div>' : '') +
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
        (w.syllables && w.syllables.length > 1 ? '<div class="syl"><span class="count">Syllables</span> ' + w.syllables.map(function(s){ return '<span class="sy ' + scoreCls(s.score) + '" title="' + s.score + '%">' + esc(s.syl) + '</span>'; }).join('<i>·</i>') + '</div>' : '') +
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
    var canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (window.AudioContext || window.webkitAudioContext));
    el.innerHTML = (SR || canRecord ? micButton('pmic') : '') +
      '<span class="mic-label" id="plabel">Tap and say it</span><div class="result" id="presult"></div>';
    var mic = el.querySelector('#pmic'), label = el.querySelector('#plabel'), out = el.querySelector('#presult'), rec = null, busy = false, recording = null;
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
      if (recording) { recording.stop(); return; }   // tap again to finish early
      if (busy) return;
      if (rec) { rec.stop(); return; }
      var ref = (getRef() || '').trim();
      if (!ref) { label.textContent = 'Type a sentence first'; return; }
      stopSpeech();
      if (az.off || !canRecord || !TALK_API || !hasAccess()) return browserCheck(ref);
      // Start recording right here, inside the tap.
      mic.classList.add('live'); label.innerHTML = waveHtml() + 'Listening… speak now';
      // A word or two stops soon after it's said (2.5 s at most once they start); a sentence gets about 1 s per word.
      var nWords = ref.split(/\s+/).length;
      recording = recordWav({
        pauseMs: nWords <= 2 ? 700 : 1100, waitMs: 6000,
        maxMs: 20000, voiceMs: nWords <= 2 ? 2500 : Math.max(4000, nWords * 900 + 1500),
        level: function(v){ mic.style.transform = 'scale(' + (1 + v * 0.18).toFixed(3) + ')'; },
        error: function(name){ if (name === 'NotAllowedError') out.innerHTML = '<p class="heard">Microphone is blocked. Please allow it for this site.</p>'; }
      });
      recording.done.then(function(wav){
        recording = null; mic.classList.remove('live'); mic.style.transform = '';
        if (!wav) { label.textContent = 'Didn\'t catch that - tap and try again'; return; }
        busy = true; mic.classList.add('busy'); mic.innerHTML = I.spinner; label.textContent = 'Scoring…';
        return scoreWav(wav, ref).then(function(res){
          busy = false; mic.classList.remove('busy'); mic.innerHTML = I.mic;
          if (!res) { label.textContent = 'Didn\'t catch that - tap and try again'; return; }
          label.textContent = 'Tap to try again';
          renderAzure(out, res); logAzure(res);
          if (onDone) onDone(res);
        });
      }).catch(function(){
        recording = null; busy = false; mic.classList.remove('live', 'busy'); mic.innerHTML = I.mic; mic.style.transform = '';
        label.textContent = az.off ? 'Tap to try again' : 'Couldn\'t score that - check your internet and tap to try again';
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

  /* ---------- Start here (new users) and Help ---------- */
  function startStatus(){
    var turns = Object.keys(state.days).reduce(function(a, k){ return a + (state.days[k].turns || 0); }, 0);
    return {
      installed: isInstalled(),
      code: hasAccess(),
      test: !!myLevelInfo(),
      drill: Object.keys(state.sounds || {}).length > 0,
      talk: turns >= 5,
      plan: currentStreak() >= 3
    };
  }
  function stepRow(s, i, done, isNext){
    return '<div class="step' + (done ? ' done' : '') + (isNext ? ' next' : '') + '">' +
      '<span class="tick">' + (done ? I.check : (i + 1)) + '</span>' +
      '<div class="t"><b class="st">' + esc(s.title) + '</b>' + (isNext || !done ? '<p>' + s.text + '</p>' : '') +
      (isNext && s.href ? '<a class="btn primary sm" href="' + s.href + '">' + esc(s.go) + I.chev + '</a>' : '') + '</div></div>';
  }
  // Shown on Home until the first steps are done: what to do first, and what comes next.
  function startCard(){
    var st = startStatus();
    var core = HELP_STEPS.filter(function(s){ return s.check !== 'installed' && s.check !== 'plan'; });
    if (prefs.startHidden || core.every(function(s){ return st[s.check]; })) return '';
    var next = HELP_STEPS.findIndex(function(s){ return !st[s.check] && !(s.check === 'installed' && (prefs.installHidden || !(installPrompt || isIOS()))); });
    var done = HELP_STEPS.filter(function(s){ return st[s.check]; }).length;
    return '<div class="card pad home-card start"><div class="chart-head"><b>Start here</b><span>' + done + ' of ' + HELP_STEPS.length + ' done</span></div>' +
      HELP_STEPS.map(function(s, i){ return stepRow(s, i, st[s.check], i === next); }).join('') +
      '<div class="row" style="margin-top:10px"><a class="btn ghost sm" href="#/help">Full guide</a><button class="btn ghost sm" id="startHide" type="button">Hide</button></div></div>';
  }
  // Choose the coach's voice: a natural Australian voice, or the phone's own.
  function voicePage(){
    setTab('');
    var cur = chosenVoice(), eng = ENGLISHES[myEnglish() || 'au'];
    var opts = voicesFor(myEnglish()).map(function(v){ return [v[0], v[1], (v[2] === 'male' ? 'Male' : 'Female') + ' · ' + eng.short]; })
      .concat([['phone', 'Phone\'s own voice', 'Works offline · varies by phone']]);
    render(
      '<span class="eyebrow">Settings</span>' +
      '<h1 class="title">Choose a voice</h1>' +
      '<p class="lede">The voice that reads lessons, drills and your coach\'s replies. Tap a name to choose it and hear a sample.</p>' +
      (hasAccess() ? '' : '<div class="notice">Natural voices start working once you have signed in. Until then the phone\'s voice is used.</div>') +
      '<div class="list">' + opts.map(function(o){
        return '<div class="card item voice-opt' + (o[0] === cur ? ' on' : '') + '" data-v="' + o[0] + '">' +
          '<button type="button" class="voice-pick t" aria-pressed="' + (o[0] === cur) + '"><span class="tick">' + I.check + '</span><span><h2>' + esc(o[1]) + '</h2><span class="sub">' + esc(o[2]) + '</span></span></button>' +
          '<button type="button" class="btn sm ghost" data-play aria-label="Listen to ' + esc(o[1]) + '">' + I.speaker + 'Listen</button></div>';
      }).join('') + '</div>' +
      '<p class="heard" style="margin-top:18px;text-align:left">Natural voices need internet. If one can\'t play, the phone\'s voice reads it instead.</p>'
    );
    var SAMPLE = eng().sample;
    app.querySelectorAll('.voice-opt').forEach(function(row){
      var id = row.dataset.v;
      row.querySelector('.voice-pick').onclick = function(){
        prefs.voice = id; savePrefs(); ttsOff = false;
        app.querySelectorAll('.voice-opt').forEach(function(r){ r.classList.toggle('on', r === row); r.querySelector('.voice-pick').setAttribute('aria-pressed', r === row); });
        speakAs(naturalVoice() || 'phone', SAMPLE, 0.95);
      };
      row.querySelector('[data-play]').onclick = function(){ ttsOff = false; speakAs(id === 'phone' || !hasAccess() ? 'phone' : id, SAMPLE, 0.95); };
    });
  }
  function help(){
    setTab('');
    var st = startStatus();
    var next = HELP_STEPS.findIndex(function(s){ return !st[s.check]; });
    render(
      '<span class="eyebrow">Help</span>' +
      '<h1 class="title">How to use the app</h1>' +
      '<p class="lede">New here? Follow these steps in order. Each one ticks itself off when you have done it.</p>' +
      '<div class="card pad start" style="margin-top:16px">' + HELP_STEPS.map(function(s, i){ return stepRow(s, i, st[s.check], i === next); }).join('') + '</div>' +
      HELP.map(function(sec){
        return '<h2 class="section-title">' + esc(sec.title) + '</h2><div class="faq">' + sec.items.map(function(it){
          return '<details class="card"><summary>' + esc(it.q) + '</summary><div class="a">' + it.a + '</div></details>';
        }).join('') + '</div>';
      }).join('') +
      '<p class="heard" style="margin-top:24px">Still stuck? Message Australian Jeevitham on Facebook or YouTube.</p>'
    );
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
  // Your level: the English, the level on a 4-step ladder, and when the next exam is.
  function levelCard(){
    var lv = myLevelInfo();
    if (!lv) return '';
    var cur = levelById(lv.level), idx = LEVELS.indexOf(cur), nx = nextLevel(), wait = nextExamDate();
    return '<a class="card pad my-level" href="#/exam">' +
      '<div class="ml-top"><span class="eyebrow">' + esc(ENGLISHES[myEnglish()].name) + '</span><span class="pill">' + esc(cur.cefr) + '</span></div>' +
      '<div class="ml-name">' + esc(cur.name) + '</div>' +
      '<div class="ladder">' + LEVELS.map(function(l, i){ return '<span class="' + (i < idx ? 'past' : i === idx ? 'now' : '') + '"><i></i>' + esc(l.name) + '</span>'; }).join('') + '</div>' +
      '<div class="ml-next">' + (!nx ? 'You have reached the top level - well done!'
        : wait ? 'Next level exam (' + esc(nx.name) + ') from <b>' + esc(niceDate(wait)) + '</b>'
        : '<b>Your ' + esc(nx.name) + ' exam is ready</b> - pass with 80% to move up') + I.chev + '</div></a>';
  }
  // Today's plan: the weakest sound, one conversation, and the level test or own-sentence practice.
  function planCard(){
    var today = state.days[dayKey(new Date())] || {}, dayNo = Math.floor(Date.now() / 864e5);
    var scored = curSounds().filter(function(s){ return soundAvg(s.id) !== null; }).sort(function(a, b){ return soundAvg(a.id) - soundAvg(b.id); });
    var snd = scored.length && soundAvg(scored[0].id) < 85 ? scored[0] : curSounds()[dayNo % curSounds().length];
    var lead = talkScenes(), scene = lead[dayNo % lead.length];
    var tasks = [
      { href: '#/sound/' + snd.id, title: 'Sound drill: ' + snd.title, sub: soundAvg(snd.id) !== null ? 'Your weakest sound - ' + soundAvg(snd.id) + '% so far' : 'Say 3 words or sentences', done: (today.drills || 0) >= 3 },
      { href: '#/talk/' + scene.id, title: 'Conversation: ' + scene.title, sub: 'Reply at least 5 times', done: (today.turns || 0) >= 5 },
      myLevelInfo() && nextLevel() && !nextExamDate()
        ? { href: '#/exam', title: 'Take your ' + nextLevel().name + ' exam', sub: 'Pass with 80% to move up a level', done: false }
        : nextCourseUnit() || (today.lessons && courseUnits(userLevel()).length)
          ? (function(u){ return u ? { href: '#/lesson/' + u.id, title: 'Lesson: ' + u.title, sub: 'Learn 6 phrases, then take the quiz', done: (today.lessons || 0) >= 1 }
                                   : { href: '#/course', title: 'Course lesson done', sub: 'Well done - see your course', done: true }; })(nextCourseUnit())
          : { href: '#/practise', title: 'Say a sentence from your work', sub: 'Practise 3 of your own sentences', done: (today.paN || today.pronN || 0) >= 6 }
    ];
    var n = tasks.filter(function(t){ return t.done; }).length;
    return '<div class="card pad home-card plan"><div class="chart-head"><b>Today\'s plan</b><span>' + n + ' of 3 done</span></div>' +
      tasks.map(function(t){
        return '<a class="task' + (t.done ? ' done' : '') + '" href="' + t.href + '"><span class="tick">' + (t.done ? I.check : '') + '</span><span><b>' + esc(t.title) + '</b><span>' + esc(t.sub) + '</span></span><span class="chev">' + I.chev + '</span></a>';
      }).join('') + '</div>';
  }

  function home(){
    setTab('home');
    refreshQuota();
    var week = lastDays(7);
    var speakMin = Math.round(sumOver(week, 'speakSec') / 60);
    var doneCount = curLessons().filter(function(l){ return state.done[l.id]; }).length;
    var next = curLessons().find(function(l){ return !state.done[l.id]; }) || curLessons()[0];
    var hour = new Date().getHours();
    var notice = '';
    if (!naturalVoice() && !canSpeak) notice += '<div class="notice">This browser can\'t play the coach\'s voice. Please open this page in Chrome.</div>';
    else if (!naturalVoice() && voice && !hasAussieVoice()) notice += '<div class="notice">No ' + eng().short + ' voice on this device, so a ' + esc(voice.lang) + ' English voice is used. Chrome usually has one.</div>';
    if (!SR) notice += '<div class="notice">Speaking practice works in Chrome on Android or a computer. You can still type in conversations.</div>';

    function tile(k, v, unit, s){ return '<div class="card stat"><div class="k">' + k + '</div><div class="v">' + v + (unit ? '<small>' + unit + '</small>' : '') + '</div><div class="s">' + s + '</div></div>'; }

    render(
      '<span class="eyebrow">English Coach by Australian Jeevitham</span>' +
      '<h1 class="title">' + (hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening') + (profile && profile.name ? ', ' + esc(profile.name.split(' ')[0]) : '') + '</h1>' +
      '<a class="acct-link" href="#/account"><span class="avatar sm">' + esc(((profile && profile.name) || '?').charAt(0).toUpperCase()) + '</span>My account</a>' +
      '<p class="lede">Speak confident ' + eng().name + ' for life and work in ' + eng().country + ', with a coach that listens and gives you feedback.</p>' +
      (!me && getCode() ? '<a class="card cta signin-cta" href="#/signin"><span class="ic">' + I.check + '</span><span><b>Create your account</b><span>Sign in with Google or email to get your level, the placement test and weekly exams. Access codes will stop working soon.</span></span><span class="chev">' + I.chev + '</span></a>' : '') +
      levelCard() + installCard() + notice + startCard() + (hasAccess() ? quotaHtml() : '') +
      planCard() + skillsCard() +
      '<div class="stats">' +
        tile('Day streak', currentStreak(), currentStreak() === 1 ? 'day' : 'days', 'Practise daily to keep it') +
        tile('Speaking time', speakMin, 'min', 'Last 7 days') +
        tile('Words used', Object.keys(state.vocab).length, '', 'Different words you\'ve spoken') +
        tile('Lessons done', doneCount, '/ ' + curLessons().length, 'Quizzes completed') +
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
    var sh = document.getElementById('startHide');
    if (sh) sh.onclick = function(){ prefs.startHidden = true; savePrefs(); home(); };
  }

  /* ---------- Learn ---------- */
  function learn(){
    setTab('learn');
    render(
      '<span class="eyebrow">Practise speaking</span>' +
      '<h1 class="title">Learn</h1>' +
      (myLevelInfo() ? '<a class="card cta course-cta" href="#/course"><span class="ic">' + I.book + '</span><span><b>Your course · ' + esc(levelById(userLevel()).name) + '</b><span>' +
        (nextCourseUnit() ? 'Next lesson: ' + esc(nextCourseUnit().title) : courseUnits(userLevel()).length ? 'All ' + courseUnits(userLevel()).length + ' lessons done - take the level exam' : 'Practice for your level, step by step') +
        '</span></span><span class="chev">' + I.chev + '</span></a>' : '') +
      '<div class="list two">' +
        '<a class="card item" href="#/sounds"><span class="num">' + I.mic + '</span><span class="t"><h2>Sound drills</h2><span class="sub">V/W, TH, Z, F/P and more - every sound scored</span></span></a>' +
        '<a class="card item" href="#/listen"><span class="num">' + I.speaker + '</span><span class="t"><h2>Listening: older patients</h2><span class="sub">' + eng().listenSub + (state.listenBest != null ? ' · best ' + state.listenBest + '%' : '') + '</span></span></a>' +
        '<a class="card item" href="#/fluency"><span class="num">' + I.mic + '</span><span class="t"><h2>1-minute speaking check</h2><span class="sub">Pronunciation, grammar, vocabulary, pace, pauses and fillers in one report</span></span></a>' +
        (myEnglish() === 'in' ? '' : '<a class="card item" href="#/oet"><span class="num">' + I.check + '</span><span class="t"><h2>OET Speaking (Nursing)</h2><span class="sub">10 role-plays with a 3-minute prep and 5-minute talk, marked on all 9 criteria</span></span></a>') +
        '<a class="card item" href="#/ielts"><span class="num">' + I.check + '</span><span class="t"><h2>IELTS Speaking</h2><span class="sub">Parts 1-3, cue cards with timers, full mock test, band scores on the 4 criteria</span></span></a>' +
        '<a class="card item" href="#/interview"><span class="num">' + I.chat + '</span><span class="t"><h2>Interview preparation</h2><span class="sub">20 healthcare interview questions, model answers and AI feedback</span></span></a>' +
        '<a class="card item" href="#/vocab"><span class="num">' + I.book + '</span><span class="t"><h2>Vocabulary</h2><span class="sub">' + curVocab().reduce(function(a, t){ return a + t.words.length; }, 0) + ' words from Beginner to Leadership: everyday life, work and healthcare</span></span></a>' +
        '<a class="card item" href="#/practise"><span class="num">' + I.pencil + '</span><span class="t"><h2>Practise any sentence</h2><span class="sub">Type your own words and get scored saying them</span></span></a>' +
        '<a class="card item" href="#/exam"><span class="num">' + I.check + '</span><span class="t"><h2>Your level and exams</h2><span class="sub">' + (myLevelInfo() ? 'You are ' + esc(levelById(userLevel()).name) + (nextLevel() ? ' · ' + (nextExamDate() ? 'next exam ' + esc(niceDate(nextExamDate())) : 'exam ready now') : '') : 'Take the placement test') + '</span></span></a>' +
        '<a class="card item" href="#/everyday"><span class="num">' + I.chat + '</span><span class="t"><h2>' + eng().everyday + '</h2><span class="sub">' + curLessons().length + ' lessons of everyday phrases' + (nativeLang() !== 'en' ? ' with ' + NATIVES[nativeLang()] + ' meanings' : '') + (quizzesDone() ? ' · ' + quizzesDone() + '/' + curLessons().length + ' quizzes done' : '') + '</span></span></a>' +
        '<a class="card item" href="#/slang"><span class="num">' + I.cards + '</span><span class="t"><h2>' + eng().slang + '</h2><span class="sub">' + curSlang().length + ' ' + eng().slangSub + '</span></span></a>' +
      '</div>'
    );
  }
  function quizzesDone(){ return curLessons().filter(function(l){ return state.done[l.id]; }).length; }

  // Your course: the four levels in order. Beginner and Intermediate have lessons; Advanced and
  // Leadership point to the practice that fits them. Levels above yours are locked until you pass.
  function coursePage(){
    setTab('learn');
    var mine = LEVELS.findIndex(function(x){ return x.id === userLevel(); });
    var more = {
      advanced: [['#/vocab', I.book, 'Healthcare and work vocabulary', 'Words for the ward, aged care, leading a team and difficult talks'],
                 ['#/fluency', I.mic, '1-minute speaking check', 'Pronunciation, grammar, vocabulary, pace and fillers'],
                 ['#/ielts', I.check, 'IELTS Speaking', 'Parts 1-3 with band scores'],
                 ['#/talks/' + ((mySection() || TALK_MENU[0]).id), I.chat, 'Work conversations', 'Real situations from your field']],
      leadership: [['#/talks/health', I.chat, 'Senior and leadership conversations', 'Short-staffed shifts, feedback, conflict, pitches'],
                   ['#/talks/pro', I.chat, 'Professional Services', 'Clients, complaints, pay and results'],
                   ['#/talks/interview', I.chat, 'Mock interviews', 'Full interviews with follow-up questions']].concat(myEnglish() === 'in' ? [] : [['#/oet', I.check, 'OET Speaking (Nursing)', 'Role-plays marked on all 9 criteria']])
    };
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">' + esc(eng().name) + '</span>' +
      '<h1 class="title">Your course</h1>' +
      '<p class="lede">Work through your level, then pass the level exam (80%) to unlock the next one. Lessons at lower levels stay open for revision.</p>' +
      LEVELS.map(function(lv, i){
        var locked = mine >= 0 && i > mine, units = courseUnits(lv.id), done = units.filter(function(u){ return state.done[u.id]; }).length;
        var status = i === mine ? '<span class="pill good">Your level</span>' : locked ? '<span class="pill">🔒 Pass the ' + esc(lv.name) + ' exam</span>' : '<span class="pill">Open for revision</span>';
        var body = units.length
          ? '<div class="list two">' + units.map(function(u, n){
              var seen = seenIn(u), inner = '<span class="num">' + u.icon + '</span><span class="t"><h2>' + (n + 1) + '. ' + esc(u.title) + '</h2>' + natHtml(u, 'sub mal', 'span') +
                (locked ? '' : '<span class="meta"><span class="mini-bar"><i style="width:' + Math.round(seen / u.phrases.length * 100) + '%"></i></span>' + seen + '/' + u.phrases.length +
                  (state.done[u.id] ? ' <span class="pill good">Quiz ' + state.best[u.id] + '%</span>' : '') + '</span>') + '</span>';
              return locked ? '<div class="card item locked">' + inner + '</div>' : '<a class="card item" href="#/lesson/' + u.id + '">' + inner + '</a>';
            }).join('') + '</div>'
          : '<div class="list two">' + more[lv.id].map(function(m){
              var inner = '<span class="num">' + m[1] + '</span><span class="t"><h2>' + esc(m[2]) + '</h2><span class="sub">' + esc(m[3]) + '</span></span>';
              return locked ? '<div class="card item locked">' + inner + '</div>' : '<a class="card item" href="' + m[0] + '">' + inner + '</a>';
            }).join('') + '</div>';
        return '<h2 class="section-title course-level">' + esc(lv.name) + ' <small>' + esc(lv.cefr) + (units.length ? ' · ' + done + ' of ' + units.length + ' lessons' : '') + '</small> ' + status + '</h2>' + body;
      }).join('') +
      (nextLevel() ? '<p style="margin-top:18px"><a class="btn primary" href="#/exam">' + esc(nextLevel().name) + ' exam' + I.chev + '</a></p>' : '')
    );
  }

  // Everyday Australian English: the list of lessons, opened from Learn like Sound drills.
  function everyday(){
    setTab('learn');
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">' + eng().everyday + '</span>' +
      '<h1 class="title">Phrases for daily life</h1>' +
      '<p class="lede">Short lessons of everyday phrases' + (nativeLang() !== 'en' ? ' with ' + NATIVES[nativeLang()] + ' meanings' : '') + '. Listen, say each phrase, then take the quiz.</p>' +
      '<div class="list two">' + curLessons().map(function(l, i){
        var seen = seenIn(l);
        return '<a class="card item" href="#/lesson/' + l.id + '"><span class="num">' + (i + 1) + '</span><span class="t">' +
          '<h2>' + esc(l.title) + '</h2>' + natHtml(l, 'sub mal', 'span') +
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
      (l.focus ? '<a class="back" href="#/course">' + I.back + 'Your course</a>' : '<a class="back" href="#/everyday">' + I.back + 'Everyday English</a>') +
      '<span class="eyebrow">' + esc(l.title) + '</span>' +
      (l.focus && idx === 0 ? '<div class="card pad focus-box"><span class="count">Today\'s focus</span><p>' + esc(l.focus.en) + '</p>' + natHtml(l.focus, 'mal') + '</div>' : '') +
      '<div class="progress"><i style="width:' + Math.round((idx + 1) / l.phrases.length * 100) + '%"></i></div>' +
      '<article class="card pad">' +
        '<span class="count">Phrase ' + (idx + 1) + ' of ' + l.phrases.length + '</span>' +
        '<p class="phrase-en">' + esc(p.en) + '</p>' +
        natHtml(p, 'phrase-ml', 'p') +
        '<div class="listen-row"><button class="btn" id="play">' + I.speaker + 'Listen</button><button class="btn" id="slow">' + I.speaker + 'Slow</button></div>' +
        natHtml(p, 'tip', 'p', 'tip') +
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
      '<div class="list two">' + curSounds().map(function(s, i){
        var avg = soundAvg(s.id);
        return '<a class="card item" href="#/sound/' + s.id + '"><span class="num">' + (s.ipa.length ? '/' + esc(s.ipa[0]) + '/' : (i + 1)) + '</span><span class="t">' +
          '<h2>' + esc(s.title) + '</h2><span class="sub">' + s.pairs.slice(0, 2).map(function(p){ return esc(p[0]) + ' / ' + esc(p[1]); }).join(' · ') + '</span>' +
          (avg !== null ? '<span class="meta"><span class="pill ' + (avg >= 80 ? 'good' : avg >= 60 ? 'warn' : 'bad') + '">Your score ' + avg + '%</span></span>' : '') + '</span></a>';
      }).join('') + '</div>'
    );
  }
  function sound(id){
    var s = curSounds().find(function(x){ return x.id === id; });
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
      '<article class="card pad" style="margin-top:14px">' + (s.ipa.length ? '<div class="sound-hero">' + s.ipa.map(mouthSvg).join('') + '</div>' : '') +
        '<p style="margin-top:10px">' + esc(s.tip) + '</p>' + natHtml(s, 'tip', 'p') + '</article>' +
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

  // Long spoken answers into a text box. Chrome on Android is unreliable in "continuous" mode, so
  // listen in short sessions and start the next one straight away while the learner keeps talking.
  // Stops after about 4 seconds of silence, or when they tap the mic again.
  function longAnswer(mic, label, ans){
    var recording = false, quietSince = 0, rec = null, secs = 0;
    function stopUI(msg){ recording = false; mic.classList.remove('live'); label.textContent = msg || 'Tap to add more'; }
    function chunk(){
      var before = ans.value.trim() ? ans.value.trim() + ' ' : '';
      rec = listen({
        interim: function(t){ ans.value = before + t; },
        error: function(err){ if (err === 'not-allowed' || err === 'service-not-allowed') stopUI('Microphone is blocked - please allow it for this site.'); },
        end: function(alts, total, speaking){
          rec = null;
          if (alts[0]) { ans.value = before + alts[0]; secs += speaking; quietSince = 0; }
          else if (!quietSince) quietSince = Date.now();
          if (recording && (!quietSince || Date.now() - quietSince < 4000)) { chunk(); return; }
          if (recording) stopUI();
        }
      });
    }
    if (mic) mic.onclick = function(){
      if (recording) { recording = false; if (rec) rec.stop(); stopUI(); return; }
      stopSpeech();
      recording = true; quietSince = 0;
      mic.classList.add('live'); label.innerHTML = waveHtml() + 'Listening… tap when you\'ve finished';
      chunk();
    };
    return {
      stop: function(){ if (recording) { recording = false; if (rec) rec.stop(); if (mic) stopUI(); } },
      secs: function(){ return secs; }
    };
  }

  /* ---------- Listening: older Australian patients ---------- */
  function listening(){
    setTab('learn');
    var order = shuffle(curListening().map(function(c, i){ return i; })), n = 0, right = 0;
    function show(){
      var c = curListening()[order[n]];
      render(
        '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
        '<span class="eyebrow">Listening · older patients · ' + (n + 1) + ' of ' + order.length + '</span>' +
        '<div class="progress"><i style="width:' + Math.round(n / order.length * 100) + '%"></i></div>' +
        '<article class="card pad"><p class="q-prompt">What is the patient telling you?</p>' +
          '<p class="q-sub">' + eng().older + ' often speak fast and use slang. Listen at full speed first.</p>' +
          '<div class="listen-row" style="margin:0 0 14px"><button class="btn primary" id="fast">' + I.speaker + 'Play</button><button class="btn" id="norm">' + I.speaker + 'Normal</button><button class="btn" id="slow">' + I.speaker + 'Slow</button></div>' +
          '<div class="opts">' + c.options.map(function(o, i){ return '<button class="opt" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div>' +
          '<div id="after"></div></article>'
      );
      document.getElementById('fast').onclick = function(){ speak(c.say, 1.15); };
      document.getElementById('norm').onclick = function(){ speak(c.say, 0.95); };
      document.getElementById('slow').onclick = function(){ speak(c.say, 0.7); };
      speak(c.say, 1.15);
      app.querySelectorAll('.opt').forEach(function(b){
        b.onclick = function(){
          var ok = +b.dataset.i === c.answer;
          if (ok) right++;
          app.querySelectorAll('.opt').forEach(function(x){ x.disabled = true; if (+x.dataset.i === c.answer) x.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          document.getElementById('after').innerHTML =
            '<div class="coach" style="margin-top:14px"><p class="count">They said</p><p><b>“' + esc(c.say) + '”</b></p><p class="why">' + esc(c.note) + '</p></div>' +
            '<div class="nav"><span></span><button class="btn primary" id="next">' + (n === order.length - 1 ? 'See my score' : 'Next') + I.chev + '</button></div>';
          document.getElementById('next').onclick = function(){ n++; n < order.length ? show() : done(); };
        };
      });
    }
    function done(){
      var pct = Math.round(right / order.length * 100);
      state.listenBest = Math.max(state.listenBest || 0, pct); markActive(); save();
      render('<article class="card pad done"><span class="eyebrow">Listening complete</span><div class="big">' + right + ' / ' + order.length + '</div>' +
        '<p class="lede">' + (pct >= 80 ? 'Excellent - you can follow fast, informal patient talk.' : 'Good practice. Try again - the slang gets easier each time.') + '</p>' +
        '<div class="row" style="justify-content:center;margin-top:18px"><a class="btn ghost" href="#/listen?r=' + Date.now() + '">' + I.restart + 'Try again</a><a class="btn primary" href="#/learn">Learn' + I.chev + '</a></div></article>');
    }
    show();
  }

  /* ---------- 1-minute speaking check (6-part fluency report) ---------- */
  var CHECK_TOPICS = ['Describe your typical day at work.', 'Talk about the best thing about the place where you live.', 'Describe a patient or person who taught you something.',
    'Talk about your hometown in Kerala.', 'Describe how you spend your weekends.', 'Talk about a goal you are working towards.', 'Explain how you deal with stress.',
    'Describe a good team you have worked in.', 'Talk about a festival you enjoy.', 'Describe a challenge you faced when you moved to a new place.',
    'Talk about your favourite food and how to cook it.', 'Explain why you chose your career.'];
  var FILLER_RE = /\b(um+|uh+|er+m?|ah+|hmm+|you know|i mean|basically|actually|kind of|sort of)\b/gi;
  function fluencyCheck(){
    setTab('learn');
    var topic = CHECK_TOPICS[Math.floor(Math.random() * CHECK_TOPICS.length)];
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">1-minute speaking check</span>' +
      '<h1 class="title">Your fluency report</h1>' +
      '<p class="lede">Talk about the topic for up to a minute. You get scores for pronunciation, grammar, vocabulary, pace, pauses and filler words.</p>' +
      '<article class="card pad" style="margin-top:14px"><span class="count">Your topic</span><p class="q-prompt" id="topic">' + esc(topic) + '</p>' +
        '<div class="listen-row" style="margin:6px 0 0"><button class="btn ghost sm" id="another">Another topic</button></div>' +
        '<div class="speak-zone" id="speak"></div>' +
        '<button class="btn primary" id="go" type="button" style="margin-top:10px">Get my report' + I.chev + '</button><div id="out"></div></article>'
    );
    var sp = speakAnswer(document.getElementById('speak'), { maxSec: 60, pauseMs: 6000 });
    document.getElementById('another').onclick = function(){ topic = CHECK_TOPICS[(CHECK_TOPICS.indexOf(topic) + 1) % CHECK_TOPICS.length]; document.getElementById('topic').textContent = topic; };
    document.getElementById('go').onclick = function(){
      var btn = this, out = document.getElementById('out');
      btn.disabled = true;
      sp.finish().then(function(){
        var r = sp.get(), words = r.text.split(/\s+/).filter(Boolean).length;
        if (words < 15) { btn.disabled = false; out.innerHTML = '<p class="heard" style="text-align:left">Talk a bit longer first - at least 20 seconds.</p>'; return; }
        if (!hasAccess()) { btn.disabled = false; out.innerHTML = '<p class="heard" style="text-align:left">The report uses the AI coach - please <a href="#/signin">sign in</a> first.</p>'; return; }
        out.innerHTML = '<div class="typing" style="margin:14px 0"><i></i><i></i><i></i></div>';
        apiFetch(TALK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() }, body: JSON.stringify({ check: true, topic: topic, text: r.text, secs: r.secs }) })
          .then(function(x){ return x.json(); })
          .then(function(d){
            btn.disabled = false;
            if (d.grammar == null) throw new Error(d.error);
            var mins = Math.max(r.secs, 1) / 60, wpm = r.secs ? Math.round(words / mins) : null;
            var pausesPm = r.pauses == null ? null : Math.round(r.pauses / mins), fillers = (r.text.match(FILLER_RE) || []).length;
            function tile(name, val, unit, rate, tip){
              return '<div class="metric ' + rate + '"><span class="k">' + name + '</span><b>' + (val == null ? '–' : val) + '<small>' + unit + '</small></b><span class="tip6">' + tip + '</span></div>';
            }
            var pr = r.pron ? r.pron.accuracy : null;
            out.innerHTML = '<div class="metrics">' +
              tile('Pronunciation', pr, pr == null ? '' : '/100', pr == null ? '' : pr >= 85 ? 'good' : pr >= 70 ? 'ok' : 'low', pr == null ? 'Set up Azure scoring to measure this' : pr >= 85 ? 'Clear and easy to understand' : 'Try the sound drills for your weakest sounds') +
              tile('Grammar', d.grammar, '/100', d.grammar >= 80 ? 'good' : d.grammar >= 60 ? 'ok' : 'low', esc(d.grammar_note)) +
              tile('Vocabulary', d.vocabulary, '/100', d.vocabulary >= 80 ? 'good' : d.vocabulary >= 60 ? 'ok' : 'low', esc(d.vocab_note)) +
              tile('Pace', wpm, ' words/min', wpm == null ? '' : wpm >= 110 && wpm <= 165 ? 'good' : wpm >= 90 && wpm <= 185 ? 'ok' : 'low', wpm == null ? '' : wpm < 110 ? 'A little slow - aim for 120-160' : wpm > 165 ? 'Quite fast - slow down so every word is clear' : 'A natural pace') +
              tile('Pauses', pausesPm, ' per min', pausesPm == null ? '' : pausesPm <= 4 ? 'good' : pausesPm <= 8 ? 'ok' : 'low', pausesPm == null ? 'Set up Azure scoring to count pauses' : (r.longPauses ? r.longPauses + ' long pause' + (r.longPauses === 1 ? '' : 's') + '. ' : '') + (pausesPm <= 4 ? 'Smooth speech' : 'Use phrases like "Let me think…" instead of silence')) +
              tile('Filler words', fillers, '', fillers <= 1 ? 'good' : fillers <= 3 ? 'ok' : 'low', fillers <= 1 ? 'Very few fillers' : 'Pause briefly instead of "basically", "actually", "umm"') +
              '</div>' +
              '<div class="coach better-ans"><p class="count">Your talk, improved</p><p>' + esc(d.better) + '</p><div class="listen-row"><button class="btn sm" type="button" id="hearB">' + I.speaker + 'Listen</button></div></div>';
            document.getElementById('hearB').onclick = function(){ speak(d.better); };
            logDay({ gvN: 1, gramSum: d.grammar, vocabSum: d.vocabulary });
            if (r.pron) logDay({ paN: 1, paPron: r.pron.accuracy, paAcc: r.pron.accuracy, paFlu: r.pron.fluency, paPros: r.pron.prosody });
            if (wpm) logDay({ paceN: 1, wpmSum: wpm, fillers: fillers });
            markActive(); save();
          })
          .catch(function(){ btn.disabled = false; out.innerHTML = '<p class="heard" style="text-align:left">Couldn\'t reach the coach. Please check your internet and try again.</p>'; });
      });
    };
  }

  /* ---------- IELTS Speaking ---------- */
  var CRITERIA = [['fc', 'Fluency and Coherence'], ['lr', 'Lexical Resource'], ['gra', 'Grammatical Range and Accuracy'], ['p', 'Pronunciation']];
  function bandBar(label, b){
    return '<div class="sbar band"><span>' + label + '</span><i><b class="' + (b >= 7 ? 'ok' : b >= 6 ? 'close' : 'miss') + '" style="width:' + Math.round((b || 0) / 9 * 100) + '%"></b></i><em>' + (b == null ? '–' : b.toFixed(1)) + '</em></div>';
  }
  function ieltsHome(){
    setTab('learn');
    var hist = state.ielts || [], last = hist[hist.length - 1];
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">IELTS Speaking</span>' +
      '<h1 class="title">Practise for IELTS Speaking</h1>' +
      '<p class="lede">Real test format, timed like the exam, and marked on the four official criteria. AHPRA needs 7.0 in Speaking.</p>' +
      (last ? '<div class="card pad level-card mini"><div class="lv"><b>' + last.overall.toFixed(1) + '</b><span>Latest band</span></div><div class="lv"><b>' + Math.max.apply(null, hist.map(function(h){ return h.overall; })).toFixed(1) + '</b><span>Best band</span></div><div class="lv"><span>' + hist.length + ' attempt' + (hist.length === 1 ? '' : 's') + '<br>' + esc(last.date) + '</span></div></div>' : '') +
      '<div class="list two" style="margin-top:14px">' +
        '<a class="card item" href="#/ielts/mock"><span class="num">' + I.check + '</span><span class="t"><h2>Full mock test</h2><span class="sub">Parts 1, 2 and 3 with an examiner voice, about 12 minutes, full band report</span></span></a>' +
        '<a class="card item" href="#/ielts/guide"><span class="num">' + I.book + '</span><span class="t"><h2>How the test works</h2><span class="sub">Format, marking, band meanings, AHPRA, tips</span></span></a>' +
        '<a class="card item" href="#/ielts/p1"><span class="num">1</span><span class="t"><h2>Part 1 - about you</h2><span class="sub">' + IELTS.part1.length + ' topics, short answers</span></span></a>' +
        '<a class="card item" href="#/ielts/p2"><span class="num">2</span><span class="t"><h2>Part 2 - cue card</h2><span class="sub">' + IELTS.cards.length + ' cards: 1 minute to prepare, 2 minutes to talk</span></span></a>' +
        '<a class="card item" href="#/ielts/p3"><span class="num">3</span><span class="t"><h2>Part 3 - discussion</h2><span class="sub">Deeper questions for each cue card topic</span></span></a>' +
      '</div>' +
      (hist.length ? '<h2 class="section-title">Your bands</h2><div class="phrase-list">' + hist.slice().reverse().slice(0, 10).map(function(h){
        return '<div class="card phrase"><div><b>Band ' + h.overall.toFixed(1) + ' · ' + esc(h.kind) + '</b><span>' + esc(h.date) + ' · FC ' + h.fc + ' · LR ' + h.lr + ' · GRA ' + h.gra + ' · P ' + h.p + '</span></div></div>';
      }).join('') + '</div>' : '')
    );
  }
  function ieltsGuide(){
    setTab('learn');
    render(
      '<a class="back" href="#/ielts">' + I.back + 'IELTS Speaking</a>' +
      '<span class="eyebrow">IELTS Speaking guide</span><h1 class="title">How the test works</h1>' +
      '<div class="faq" style="margin-top:16px">' + curGuide(IELTS.guide).map(function(g, i){ return '<details class="card"' + (i === 0 ? ' open' : '') + '><summary>' + esc(g.t) + '</summary><div class="a">' + g.d + '</div></details>'; }).join('') + '</div>' +
      '<div class="row" style="margin-top:18px"><a class="btn primary" href="#/ielts/mock">Try a mock test' + I.chev + '</a></div>'
    );
  }
  function ieltsList(part){
    setTab('learn');
    var items = part === 1 ? IELTS.part1.map(function(t, i){ return { href: '#/ielts/p1/' + i, title: t.title, sub: t.qs[0] }; })
      : IELTS.cards.map(function(c, i){ return { href: '#/ielts/p' + part + '/' + i, title: c.title, sub: part === 2 ? c.bullets.slice(0, 3).join(' · ') : c.part3[0] }; });
    render(
      '<a class="back" href="#/ielts">' + I.back + 'IELTS Speaking</a>' +
      '<span class="eyebrow">IELTS Speaking · Part ' + part + '</span>' +
      '<h1 class="title">' + (part === 1 ? 'Part 1 topics' : part === 2 ? 'Part 2 cue cards' : 'Part 3 discussions') + '</h1>' +
      '<p class="lede">' + (part === 1 ? 'Four short questions per topic. Answer each in 2-3 sentences: answer, reason, example.' : part === 2 ? 'One minute to prepare and make notes, then talk for up to two minutes.' : 'Give opinions with reasons and examples, and compare past and present.') + '</p>' +
      '<div class="list two">' + items.map(function(it, i){ return '<a class="card item" href="' + it.href + '"><span class="num">' + (i + 1) + '</span><span class="t"><h2>' + esc(it.title) + '</h2><span class="sub">' + esc(it.sub) + '</span></span></a>'; }).join('') + '</div>'
    );
  }
  function ieltsSet(part, idx){
    if (part === 1) { var t = IELTS.part1[idx]; return t && t.qs.map(function(q){ return { part: 1, q: q }; }); }
    var c = IELTS.cards[idx]; if (!c) return null;
    return part === 2 ? [{ part: 2, card: c }] : c.part3.map(function(q){ return { part: 3, q: q }; });
  }
  function ieltsMockSet(){
    var t = IELTS.part1[Math.floor(Math.random() * IELTS.part1.length)], ci = Math.floor(Math.random() * IELTS.cards.length), c = IELTS.cards[ci];
    return t.qs.map(function(q){ return { part: 1, q: q }; }).concat([{ part: 2, card: c }], c.part3.slice(0, 3).map(function(q){ return { part: 3, q: q }; }));
  }
  function cueText(c){ return c.title + ' You should say: ' + c.bullets.join(', '); }
  function modelCache(){ try { return JSON.parse(localStorage.getItem('aj-ielts-models')) || {}; } catch(e) { return {}; } }

  // Runs a list of IELTS questions one by one, then marks them all together.
  function ieltsRun(kind, items, backHref){
    setTab('learn');
    var n = 0, answers = [], mock = kind === 'Mock test';
    function head(){
      var it = items[n];
      return '<a class="back" href="' + backHref + '">' + I.back + 'IELTS Speaking</a>' +
        '<span class="eyebrow">' + esc(kind) + ' · Part ' + it.part + ' · ' + (n + 1) + ' of ' + items.length + '</span>' +
        '<div class="progress"><i style="width:' + Math.round(n / items.length * 100) + '%"></i></div>';
    }
    function modelBtn(q, part){
      if (mock) return '';
      return '<details class="card model" id="model"><summary>Hear a Band 8 answer</summary><div class="a" id="modelBody"><p class="heard" style="text-align:left">Tap to load…</p></div></details>';
    }
    function bindModel(q, part){
      var d = document.getElementById('model'); if (!d) return;
      d.ontoggle = function(){
        if (!d.open || d.dataset.loaded) return;
        var body = document.getElementById('modelBody'), cache = modelCache();
        function show(m){
          d.dataset.loaded = 1;
          body.innerHTML = '<p>' + esc(m.answer) + '</p><div class="listen-row"><button class="btn sm" type="button" id="hearModel">' + I.speaker + 'Listen</button></div>' +
            '<ul class="tiplist good">' + (m.notes || []).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
          document.getElementById('hearModel').onclick = function(){ speak(m.answer); };
        }
        if (cache[q]) return show(cache[q]);
        if (!hasAccess()) { body.innerHTML = '<p class="heard" style="text-align:left">Model answers use the AI coach - please <a href="#/signin">sign in</a> first.</p>'; return; }
        body.innerHTML = '<div class="typing" style="margin:8px 0"><i></i><i></i><i></i></div>';
        apiFetch(TALK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() }, body: JSON.stringify({ ielts: { model: true, part: part, q: q } }) })
          .then(function(r){ return r.json(); }).then(function(m){
            if (!m.answer) throw new Error(m.error);
            cache[q] = m; try { localStorage.setItem('aj-ielts-models', JSON.stringify(cache)); } catch(e) {}
            show(m);
          }).catch(function(){ body.innerHTML = '<p class="heard" style="text-align:left">Couldn\'t load a model answer - check your internet and try again.</p>'; });
      };
    }
    function next(res, q, part){
      answers.push({ part: part, q: q, a: res.text, secs: res.secs, pron: res.pron });
      n++;
      n < items.length ? show() : grade();
    }
    function questionScreen(it){
      render(head() +
        '<article class="card pad"><p class="q-prompt">' + esc(it.q) + '</p>' +
          '<div class="listen-row" style="margin:6px 0 0"><button class="btn" id="play">' + I.speaker + 'Hear the question</button></div>' +
          '<div class="speak-zone" id="speak"></div>' +
          '<div class="nav"><span></span><button class="btn primary" id="next">' + (n === items.length - 1 ? 'Finish and get my band' : 'Next question') + I.chev + '</button></div></article>' +
        modelBtn(it.q, it.part));
      var sp = speakAnswer(document.getElementById('speak'), { maxSec: it.part === 1 ? 60 : 90 });
      document.getElementById('play').onclick = function(){ speak(it.q); };
      speak(it.q);
      bindModel(it.q, it.part);
      document.getElementById('next').onclick = function(){
        var btn = this; btn.disabled = true;
        sp.finish().then(function(){
          var res = sp.get();
          if (res.text.split(/\s+/).filter(Boolean).length < 3) { btn.disabled = false; document.getElementById('slabel').textContent = 'Please answer the question first'; return; }
          next(res, it.q, it.part);
        });
      };
    }
    function cardScreen(it){
      var c = it.card, prepLeft = 60, prepTimer = null;
      render(head() +
        '<article class="card pad cue"><span class="count">Cue card</span><p class="q-prompt">' + esc(c.title) + '</p><p>You should say:</p>' +
          '<ul class="tiplist">' + c.bullets.map(function(b){ return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
          '<div class="listen-row"><button class="btn" id="play">' + I.speaker + 'Hear the card</button></div></article>' +
        '<article class="card pad" id="stage" style="margin-top:12px">' +
          '<p><b>1 minute to prepare.</b> Make a few notes, then talk for up to 2 minutes.</p>' +
          '<div class="row" style="margin-top:12px"><button class="btn primary" id="prep">Start preparing (1:00)</button><button class="btn ghost" id="skip">Skip to speaking</button></div></article>' +
        modelBtn(c.title, 2));
      document.getElementById('play').onclick = function(){ speak(cueText(c)); };
      bindModel(cueText(c), 2);
      function talk(){
        clearInterval(prepTimer);
        var notes = (document.getElementById('notes') || {}).value || '';
        document.getElementById('stage').innerHTML =
          (notes ? '<p class="count">Your notes</p><p class="notes-view">' + esc(notes) + '</p>' : '') +
          '<p><b>Now talk for up to 2 minutes.</b> Try to keep going until the timer is nearly finished.</p>' +
          '<div class="speak-zone" id="speak"></div>' +
          '<div class="nav"><span></span><button class="btn primary" id="next">' + (n === items.length - 1 ? 'Finish and get my band' : 'Next') + I.chev + '</button></div>';
        var sp = speakAnswer(document.getElementById('speak'), { maxSec: 120, pauseMs: 8000 });
        speak('Please start speaking now.'); sp.flash();
        document.getElementById('next').onclick = function(){
          var btn = this; btn.disabled = true;
          sp.finish().then(function(){
            var res = sp.get();
            if (res.text.split(/\s+/).filter(Boolean).length < 10) { btn.disabled = false; document.getElementById('slabel').textContent = 'Please give your talk first'; return; }
            next(res, cueText(c), 2);
          });
        };
      }
      document.getElementById('skip').onclick = talk;
      document.getElementById('prep').onclick = function(){
        speak('You have one minute to prepare. You can make some notes.');
        document.getElementById('stage').innerHTML = '<div class="timer big" id="ptimer">1:00</div><textarea id="notes" class="ref" rows="4" placeholder="Quick notes - key words only"></textarea>' +
          '<div class="row" style="margin-top:10px"><button class="btn primary" id="ready">I\'m ready to talk</button></div>';
        document.getElementById('ready').onclick = talk;
        prepTimer = setInterval(function(){
          prepLeft--;
          var t = document.getElementById('ptimer'); if (!t) return clearInterval(prepTimer);
          t.textContent = '0:' + ('0' + Math.max(0, prepLeft)).slice(-2);
          t.classList.toggle('low', prepLeft <= 10);
          if (prepLeft <= 0) talk();
        }, 1000);
      };
    }
    function show(){ var it = items[n]; it.part === 2 ? cardScreen(it) : questionScreen(it); }
    function grade(){
      render('<a class="back" href="' + backHref + '">' + I.back + 'IELTS Speaking</a><article class="card pad done"><div class="typing" style="margin:10px auto"><i></i><i></i><i></i></div><p class="lede">The examiner is marking your answers…</p></article>');
      var withP = answers.filter(function(a){ return a.pron && a.secs; }), tot = withP.reduce(function(s, a){ return s + a.secs; }, 0);
      var pron = tot ? ['accuracy', 'fluency', 'prosody'].reduce(function(o, k){ o[k] = Math.round(withP.reduce(function(s, a){ return s + a.pron[k] * a.secs; }, 0) / tot); return o; }, {}) : null;
      apiFetch(TALK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
        body: JSON.stringify({ ielts: { answers: answers.map(function(a){ return { part: a.part, q: a.q, a: a.a, secs: a.secs }; }), pron: pron } }) })
        .then(function(r){ return r.json(); })
        .then(function(d){
          if (d.error || d.overall == null) throw new Error(d.error || 'ai');
          state.ielts = (state.ielts || []).concat([{ date: new Date().toLocaleDateString('en-AU'), kind: kind, overall: d.overall, fc: d.fc.band, lr: d.lr.band, gra: d.gra.band, p: d.p.band }]).slice(-30);
          save(); markActive();
          report(d, pron);
        })
        .catch(function(e){
          render('<a class="back" href="' + backHref + '">' + I.back + 'IELTS Speaking</a><article class="card pad"><p>' +
            (/^(access_code|signin)$/.test(String(e.message)) || !hasAccess() ? 'Marking uses the AI coach - please sign in again.' : 'Couldn\'t reach the examiner. Please check your internet and try again.') + '</p>' +
            '<div class="row" style="margin-top:14px"><button class="btn primary" id="retry">Try again</button></div></article>');
          document.getElementById('retry').onclick = grade;
        });
    }
    function report(d, pron){
      render(
        '<a class="back" href="#/ielts">' + I.back + 'IELTS Speaking</a>' +
        '<span class="eyebrow">' + esc(kind) + ' · band report</span>' +
        '<article class="card pad level-card"><div class="lv"><b>' + d.overall.toFixed(1) + '</b><span>Overall band (estimate)</span></div><div class="lv"><b>' + (d.overall >= 7 ? '✓' : (7 - d.overall).toFixed(1)) + '</b><span>' + (d.overall >= 7 ? 'At AHPRA level' : 'bands to reach 7.0') + '</span></div></article>' +
        '<article class="card pad"><div class="sbars">' + CRITERIA.map(function(c){ return bandBar(c[1], d[c[0]].band); }).join('') + '</div>' +
          CRITERIA.map(function(c){ return '<p class="crit"><b>' + esc(c[1]) + ' ' + d[c[0]].band.toFixed(1) + ':</b> ' + esc(d[c[0]].comment) + '</p>'; }).join('') +
          (pron ? '<p class="heard" style="text-align:left">Pronunciation measured from your voice: accuracy ' + pron.accuracy + ', fluency ' + pron.fluency + ', intonation ' + pron.prosody + '.</p>' : '<p class="heard" style="text-align:left">Pronunciation is an estimate - set up Azure scoring for a measured band.</p>') +
        '</article>' +
        '<h2 class="section-title">What worked</h2><ul class="tiplist good card pad">' + (d.strengths || []).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<h2 class="section-title">To raise your band</h2><ul class="tiplist card pad">' + (d.fixes || []).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<h2 class="section-title">Your answers at Band 8</h2><div class="faq">' + answers.map(function(a, i){
          var b8 = (d.improved || [])[i] || '';
          return '<details class="card"><summary>Part ' + a.part + ': ' + esc(a.part === 2 ? a.q.split(' You should say')[0] : a.q) + '</summary><div class="a">' +
            '<p class="count">You said</p><p>' + esc(a.a) + '</p>' +
            (b8 ? '<p class="count" style="margin-top:10px">Band 8 version</p><p>' + esc(b8) + '</p><div class="listen-row"><button class="btn sm" type="button" data-say="' + esc(b8) + '">' + I.speaker + 'Listen</button></div>' : '') +
          '</div></details>';
        }).join('') + '</div>' +
        '<div class="row" style="margin-top:18px"><a class="btn primary" href="#/ielts">IELTS home' + I.chev + '</a><a class="btn ghost" href="#/ielts/mock">New mock test</a></div>'
      );
      app.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(){ speak(b.dataset.say); }; });
    }
    show();
  }
  function ielts(sub, idx){
    if (sub === 'guide') return ieltsGuide();
    if (sub === 'mock') {
      return ieltsIntroMock();
    }
    var part = { p1: 1, p2: 2, p3: 3 }[sub];
    if (!part) return ieltsHome();
    if (idx === undefined || idx === '') return ieltsList(part);
    var set = ieltsSet(part, parseInt(idx, 10));
    if (!set) return ieltsList(part);
    ieltsRun('Part ' + part + ' practice', set, '#/ielts/p' + part);
  }
  function ieltsIntroMock(){
    setTab('learn');
    render(
      '<a class="back" href="#/ielts">' + I.back + 'IELTS Speaking</a>' +
      '<span class="eyebrow">IELTS Speaking · mock test</span><h1 class="title">Full mock test</h1>' +
      '<p class="lede">Like the real test: 4 short Part 1 questions, a Part 2 cue card (1 minute to prepare, 2 minutes to talk), then 3 Part 3 questions. The examiner reads each question aloud. Model answers are hidden until the end. You get a full band report.</p>' +
      '<ul class="tiplist card pad"><li>Find a quiet place and hold the phone about 20 cm away.</li><li>Speak as you would to a real examiner - do not read prepared answers.</li><li>It takes about 12 minutes.</li></ul>' +
      '<div class="row" style="margin-top:18px"><button class="btn primary" id="go">Start the mock test' + I.chev + '</button></div>'
    );
    document.getElementById('go').onclick = function(){ ieltsRun('Mock test', ieltsMockSet(), '#/ielts'); };
  }

  /* ---------- OET Speaking (Nursing) ---------- */
  var OET_LING = [['intelligibility', 'Intelligibility'], ['fluency', 'Fluency'], ['appropriateness', 'Appropriateness of language'], ['grammar', 'Grammar and expression']];
  var OET_CLIN = [['relationship', 'Relationship-building'], ['perspective', 'Patient\'s perspective'], ['structure', 'Providing structure'], ['gathering', 'Information-gathering'], ['giving', 'Information-giving']];
  function critBar(label, v, max){
    var pct = Math.round((v || 0) / max * 100);
    return '<div class="sbar band"><span>' + label + '</span><i><b class="' + (pct >= 75 ? 'ok' : pct >= 55 ? 'close' : 'miss') + '" style="width:' + pct + '%"></b></i><em>' + v + '/' + max + '</em></div>';
  }
  function oetHome(){
    setTab('learn');
    var hist = state.oet || [], last = hist[hist.length - 1];
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">OET Speaking · Nursing</span>' +
      '<h1 class="title">Practise OET role-plays</h1>' +
      '<p class="lede">Read the card, prepare for 3 minutes, then talk with the patient for 5 minutes - you start. You are marked on all 9 OET criteria. AHPRA needs grade B (350).</p>' +
      (last ? '<div class="card pad level-card mini"><div class="lv"><b>' + esc(last.grade) + '</b><span>Latest grade (' + last.total + ')</span></div><div class="lv"><b>' + Math.max.apply(null, hist.map(function(h){ return h.total; })) + '</b><span>Best score /500</span></div><div class="lv"><span>' + hist.length + ' role-play' + (hist.length === 1 ? '' : 's') + '<br>' + esc(last.date) + '</span></div></div>' : '') +
      '<a class="card cta" href="#/oet/guide" style="margin-top:14px"><span class="ic">' + I.book + '</span><span><b>How OET Speaking works</b><span>Format, the 9 criteria, grades, a step-by-step method, useful phrases</span></span><span class="chev">' + I.chev + '</span></a>' +
      '<h2 class="section-title">Role-plays</h2>' +
      '<div class="list two">' + OET.cards.map(function(c, i){
        var best = hist.filter(function(h){ return h.card === c.id; }).reduce(function(m, h){ return Math.max(m, h.total); }, -1);
        return '<a class="card item" href="#/oet/' + i + '"><span class="num">' + (i + 1) + '</span><span class="t"><h2>' + esc(c.title) + '</h2><span class="sub">' + esc(c.setting) + '</span>' +
          (best >= 0 ? '<span class="meta"><span class="pill ' + (best >= 350 ? 'good' : best >= 300 ? 'warn' : 'bad') + '">Best ' + best + '</span></span>' : '') + '</span></a>';
      }).join('') + '</div>' +
      (hist.length ? '<h2 class="section-title">Your results</h2><div class="phrase-list">' + hist.slice().reverse().slice(0, 10).map(function(h){
        return '<div class="card phrase"><div><b>Grade ' + esc(h.grade) + ' · ' + h.total + '/500</b><span>' + esc(h.date) + ' · ' + esc(h.title) + '</span></div></div>';
      }).join('') + '</div>' : '')
    );
  }
  function oetGuide(){
    setTab('learn');
    render(
      '<a class="back" href="#/oet">' + I.back + 'OET Speaking</a>' +
      '<span class="eyebrow">OET Speaking guide</span><h1 class="title">How OET Speaking works</h1>' +
      '<div class="faq" style="margin-top:16px">' + curGuide(OET.guide).map(function(g, i){ return '<details class="card"' + (i === 0 ? ' open' : '') + '><summary>' + esc(g.t) + '</summary><div class="a">' + g.d + '</div></details>'; }).join('') + '</div>' +
      '<h2 class="section-title">Useful phrases</h2><div class="faq">' + Object.keys(OET.phrases).map(function(k){
        return '<details class="card"><summary>' + esc(k) + '</summary><div class="a"><div class="chips wrap">' + OET.phrases[k].map(function(p){ return '<button type="button" class="chip" data-say="' + esc(p) + '">' + esc(p) + '</button>'; }).join('') + '</div></div></details>';
      }).join('') + '</div>'
    );
    app.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(){ speak(b.dataset.say); }; });
  }

  function oetCard(i){
    var c = OET.cards[i];
    if (!c) return oetHome();
    setTab('learn');
    var left = 180, timer = null;
    render(
      '<a class="back" href="#/oet">' + I.back + 'OET Speaking</a>' +
      '<span class="eyebrow">OET role-play card · Nurse</span>' +
      '<article class="card pad cue"><p class="q-prompt">' + esc(c.title) + '</p>' +
        '<p><b>Setting:</b> ' + esc(c.setting) + '</p><p style="margin-top:6px"><b>Patient:</b> ' + esc(c.patient) + '</p>' +
        '<p style="margin-top:10px"><b>Task:</b></p><ul class="tiplist">' + c.tasks.map(function(t){ return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></article>' +
      '<article class="card pad" id="stage" style="margin-top:12px"><p><b>3 minutes to prepare.</b> Plan your opening, the questions you will ask and the key points. Then you start the conversation.</p>' +
        '<div class="row" style="margin-top:12px"><button class="btn primary" id="prep">Start preparing (3:00)</button><button class="btn ghost" id="skip">Skip to the role-play</button></div></article>'
    );
    function go(){ clearInterval(timer); oetRoleplay(i, (document.getElementById('notes') || {}).value || ''); }
    document.getElementById('skip').onclick = go;
    document.getElementById('prep').onclick = function(){
      document.getElementById('stage').innerHTML = '<div class="timer big" id="ptimer">3:00</div><textarea id="notes" class="ref" rows="5" placeholder="Notes: opening, questions to ask, key points"></textarea>' +
        '<div class="row" style="margin-top:10px"><button class="btn primary" id="ready">Start the role-play</button></div>';
      document.getElementById('ready').onclick = go;
      timer = setInterval(function(){
        left--;
        var t = document.getElementById('ptimer'); if (!t) return clearInterval(timer);
        t.textContent = Math.floor(left / 60) + ':' + ('0' + left % 60).slice(-2);
        t.classList.toggle('low', left <= 20);
        if (left <= 0) go();
      }, 1000);
    };
  }

  // The 5-minute role-play: the nurse speaks first; no corrections until the end (exam conditions).
  function oetRoleplay(i, notes){
    var c = OET.cards[i], turns = [], busy = false, rec = null, started = 0, secsLeft = 300, clock = null, finished = false;
    var prons = [], useAzure = !az.off && !!TALK_API && hasAccess() && !!(navigator.mediaDevices && (window.AudioContext || window.webkitAudioContext));
    render(
      '<section class="chat-view">' +
        '<header class="chat-top">' +
          '<a class="icon-btn" href="#/oet" aria-label="Leave the role-play">' + I.back + '</a>' +
          '<span class="avatar">P</span><div class="who"><b>Patient</b><span>' + esc(c.title) + '</span></div>' +
          '<span class="timer" id="clock">5:00</span>' +
        '</header>' +
        '<div class="chat-scroll" id="scroll"><div class="chat-inner" id="chat" aria-live="polite">' +
          '<div class="day-note">OET role-play · ' + esc(c.setting) + '. You start: greet the patient and introduce yourself. No corrections until the end.</div>' +
          (notes ? '<div class="day-note notes-view" style="text-align:left">Your notes: ' + esc(notes) + '</div>' : '') +
        '</div></div>' +
        '<div class="composer"><div class="composer-inner">' +
          '<div class="mic-row">' +
            '<button class="side-btn" id="card" type="button" aria-label="See the card">' + I.book + '</button>' +
            micButton('mic') +
            '<button class="side-btn" id="finish" type="button" aria-label="Finish the role-play">' + I.check + '</button>' +
          '</div>' +
          '<div class="mic-label" id="micLabel" style="text-align:center;margin-top:6px">Tap and start the conversation</div>' +
          '<form class="type-row" id="typeRow" autocomplete="off" style="margin-top:10px"><input id="say" type="text" maxlength="600" placeholder="Or type what you would say" aria-label="Your reply"><button class="send" type="submit" aria-label="Send">' + I.send + '</button></form>' +
        '</div></div>' +
      '</section>'
    );
    document.body.classList.add('in-chat');
    var chat = document.getElementById('chat'), scroll = document.getElementById('scroll'), mic = document.getElementById('mic'), label = document.getElementById('micLabel'), input = document.getElementById('say');
    function add(cls, text){ var d = document.createElement('div'); d.className = cls; d.innerHTML = '<p>' + esc(text) + '</p>'; chat.appendChild(d); scroll.scrollTop = scroll.scrollHeight; return d; }
    function tick(){
      secsLeft--;
      var el = document.getElementById('clock'); if (!el) return clearInterval(clock);
      el.textContent = Math.floor(Math.max(0, secsLeft) / 60) + ':' + ('0' + Math.max(0, secsLeft) % 60).slice(-2);
      el.classList.toggle('low', secsLeft <= 30);
      if (secsLeft <= 0) { clearInterval(clock); label.textContent = 'Time is up - finishing…'; if (!busy && !rec) finish(); }
    }
    function nurseSays(text, pron, secs){
      text = text.trim(); if (!text || finished) return;
      if (!started) { started = Date.now(); clock = setInterval(tick, 1000); }
      if (pron) prons.push({ p: pron, s: secs || 1 });
      turns.push({ role: 'nurse', text: text });
      add('msg me', text);
      var dots = document.createElement('div'); dots.className = 'typing'; dots.innerHTML = '<i></i><i></i><i></i>'; chat.appendChild(dots); scroll.scrollTop = scroll.scrollHeight;
      busy = true; mic.classList.add('busy');
      apiFetch(TALK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() }, body: JSON.stringify({ oet: { chat: true, card: c.id, turns: turns } }) })
        .then(function(r){ return r.json(); })
        .then(function(d){
          dots.remove(); busy = false; mic.classList.remove('busy');
          if (!d.reply) throw new Error(d.error || 'ai');
          turns.push({ role: 'patient', text: d.reply });
          add('msg ai', d.reply); speak(d.reply);
          label.textContent = secsLeft <= 0 ? 'Time is up - finishing…' : 'Tap to reply';
          if (secsLeft <= 0) finish();
        })
        .catch(function(e){
          dots.remove(); busy = false; mic.classList.remove('busy'); turns.pop();
          label.textContent = /^(access_code|signin)$/.test(String(e.message)) ? 'Please sign in again.' : 'Couldn\'t reach the patient - tap to try again.';
        });
    }
    mic.onclick = function(){
      if (finished || busy) return;
      if (rec) { rec.stop(); return; }
      stopSpeech();
      mic.classList.add('live'); label.innerHTML = waveHtml() + 'Listening… pause when you\'ve finished';
      if (useAzure) {
        rec = recordWav({ splitSec: 50, pauseMs: 1600, maxMs: 60000, level: function(v){ mic.style.transform = 'scale(' + (1 + v * 0.18).toFixed(3) + ')'; } });
        rec.done.then(function(wavs){
          rec = null; mic.classList.remove('live'); mic.style.transform = '';
          if (!wavs) { label.textContent = 'Didn\'t catch that - tap and try again'; return; }
          label.textContent = 'One moment…';
          return scoreFree(wavs).then(function(r){ r.text ? nurseSays(r.text, r.pron, r.secs) : (label.textContent = 'Didn\'t catch that - tap and try again'); });
        }).catch(function(){ rec = null; mic.classList.remove('live'); useAzure = false; label.textContent = 'Tap to try again'; });
      } else if (SR) {
        rec = listen({ pauseMs: 1100, end: function(alts){ rec = null; mic.classList.remove('live'); alts[0] ? nurseSays(alts[0]) : (label.textContent = 'Didn\'t catch that - tap and try again'); } });
      } else { mic.classList.remove('live'); label.textContent = 'Type your reply below.'; }
    };
    document.getElementById('typeRow').onsubmit = function(e){ e.preventDefault(); if (!busy) { nurseSays(input.value); input.value = ''; } };
    document.getElementById('card').onclick = function(){
      var bg = document.createElement('div'); bg.className = 'sheet-bg';
      bg.innerHTML = '<div class="sheet"><div class="grab"></div><b>' + esc(c.title) + '</b><p style="margin-top:6px">' + esc(c.patient) + '</p><ul class="tiplist">' + c.tasks.map(function(t){ return '<li>' + esc(t) + '</li>'; }).join('') + '</ul><div class="row"><button class="btn primary" type="button">Back to the role-play</button></div></div>';
      document.body.appendChild(bg);
      bg.onclick = function(e){ if (e.target === bg || e.target.closest('button')) bg.remove(); };
    };
    document.getElementById('finish').onclick = function(){ if (turns.length < 2) { label.textContent = 'Have the conversation first - you start.'; return; } finish(); };
    function finish(){
      if (finished) return;
      finished = true; clearInterval(clock); if (rec) rec.stop();
      var secs = started ? (Date.now() - started) / 1000 : 0;
      document.body.classList.remove('in-chat');
      render('<a class="back" href="#/oet">' + I.back + 'OET Speaking</a><article class="card pad done"><div class="typing" style="margin:10px auto"><i></i><i></i><i></i></div><p class="lede">The assessor is marking your role-play…</p></article>');
      var tot = prons.reduce(function(s, x){ return s + x.s; }, 0);
      var pron = tot ? ['accuracy', 'fluency', 'prosody'].reduce(function(o, k){ o[k] = Math.round(prons.reduce(function(s, x){ return s + x.p[k] * x.s; }, 0) / tot); return o; }, {}) : null;
      function send(){
        apiFetch(TALK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
          body: JSON.stringify({ oet: { grade: true, card: c.id, tasks: c.tasks, turns: turns, secs: secs, pron: pron } }) })
          .then(function(r){ return r.json(); })
          .then(function(d){
            if (d.error || d.total == null) throw new Error(d.error || 'ai');
            state.oet = (state.oet || []).concat([{ date: new Date().toLocaleDateString('en-AU'), card: c.id, title: c.title, total: d.total, grade: d.grade }]).slice(-30);
            logDay({ speakSec: Math.round(secs / 2) }); turns.forEach(function(t){ if (t.role === 'nurse') addVocab(t.text); }); markActive(); save();
            oetReport(c, d, pron, secs);
          })
          .catch(function(){
            render('<a class="back" href="#/oet">' + I.back + 'OET Speaking</a><article class="card pad"><p>Couldn\'t reach the assessor. Please check your internet and try again.</p><div class="row" style="margin-top:14px"><button class="btn primary" id="retry">Try again</button></div></article>');
            document.getElementById('retry').onclick = function(){ render('<article class="card pad done"><div class="typing" style="margin:10px auto"><i></i><i></i><i></i></div></article>'); send(); };
          });
      }
      send();
    }
  }
  function oetReport(c, d, pron, secs){
    render(
      '<a class="back" href="#/oet">' + I.back + 'OET Speaking</a>' +
      '<span class="eyebrow">OET role-play · ' + esc(c.title) + '</span>' +
      '<article class="card pad level-card"><div class="lv"><b>' + esc(d.grade) + '</b><span>Estimated grade</span></div><div class="lv"><b>' + d.total + '</b><span>Score out of 500</span></div><div class="lv"><b>' + (d.total >= 350 ? '✓' : 350 - d.total) + '</b><span>' + (d.total >= 350 ? 'At AHPRA grade B' : 'points to grade B') + '</span></div></article>' +
      '<article class="card pad"><p class="count">Language</p><div class="sbars" style="margin-top:6px">' + OET_LING.map(function(k){ return critBar(k[1], d[k[0]].score, 6); }).join('') + '</div>' +
        '<p class="count" style="margin-top:14px">Clinical communication</p><div class="sbars" style="margin-top:6px">' + OET_CLIN.map(function(k){ return critBar(k[1], d[k[0]].score, 3); }).join('') + '</div>' +
        OET_LING.concat(OET_CLIN).map(function(k){ return '<p class="crit"><b>' + esc(k[1]) + ':</b> ' + esc(d[k[0]].comment) + '</p>'; }).join('') +
        '<p class="crit"><b>Tasks on the card:</b> ' + esc(d.tasks) + '</p>' +
        '<p class="heard" style="text-align:left">' + Math.round(secs / 60 * 10) / 10 + ' minutes' + (pron ? ' · pronunciation from your voice: accuracy ' + pron.accuracy + ', fluency ' + pron.fluency + ', intonation ' + pron.prosody : ' · intelligibility is an estimate (no voice scores)') + '</p></article>' +
      '<h2 class="section-title">What worked</h2><ul class="tiplist good card pad">' + (d.strengths || []).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<h2 class="section-title">To reach a higher grade</h2><ul class="tiplist card pad">' + (d.fixes || []).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<h2 class="section-title">Say it like a grade-A nurse</h2><div class="phrase-list">' + (d.better || []).map(function(b){
        return '<div class="card phrase"><div><span>You said: “' + esc(b.said) + '”</span><b>' + esc(b.better) + '</b></div><button class="icon-btn" data-say="' + esc(b.better) + '" aria-label="Listen">' + I.speaker + '</button></div>';
      }).join('') + '</div>' +
      '<div class="row" style="margin-top:18px"><a class="btn primary" href="#/oet">OET home' + I.chev + '</a><a class="btn ghost" href="#/oet/guide">Useful phrases</a></div>'
    );
    app.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(){ speak(b.dataset.say); }; });
  }
  function oet(sub){
    if (sub === 'guide') return oetGuide();
    if (sub !== undefined && sub !== '' && !isNaN(+sub)) return oetCard(+sub);
    oetHome();
  }

  /* ---------- Interview preparation ---------- */
  function iqKey(g, i){ return g + ':' + i; }
  function interviewHome(){
    setTab('learn');
    var all = INTERVIEW.groups.reduce(function(a, g){ return a + g.questions.length; }, 0);
    var done = Object.keys(state.interview || {}).length;
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">Interview preparation · ' + done + ' of ' + all + ' practised</span>' +
      '<h1 class="title">Get ready for your job interview</h1>' +
      '<p class="lede">Common healthcare interview questions with model answers. Say your own answer and the AI coach scores it the way a ' + eng().short + ' panel would.</p>' +
      '<div class="card pad" style="margin-top:14px"><label class="count" for="role">The job you are applying for</label>' +
        '<select id="role" class="ref" style="margin-top:6px">' + interviewRoles().map(function(r){ return '<option' + (prefs.role === r ? ' selected' : '') + '>' + esc(r) + '</option>'; }).join('') + '</select></div>' +
      '<h2 class="section-title">Practise questions</h2>' +
      '<div class="list two">' + INTERVIEW.groups.map(function(g, gi){
        var n = g.questions.filter(function(q, i){ return (state.interview || {})[iqKey(g.id, i)] != null; }).length;
        return '<a class="card item" href="#/iq/' + g.id + '/0"><span class="num">' + (gi + 1) + '</span><span class="t"><h2>' + esc(g.title) + '</h2>' +
          '<span class="sub">' + esc(g.questions[0].q) + '</span>' +
          '<span class="meta"><span class="mini-bar"><i style="width:' + Math.round(n / g.questions.length * 100) + '%"></i></span>' + n + '/' + g.questions.length + '</span></span></a>';
      }).join('') + '</div>' +
      '<h2 class="section-title">Full mock interview</h2>' +
      '<div class="list">' + ['rn_interview', 'aged_interview', 'panel'].map(function(id){
        var s = sceneById(id);
        return s ? sceneRow(s) : '';
      }).join('') + '</div>' +
      '<h2 class="section-title">Questions to ask the panel</h2>' +
      '<div class="phrase-list">' + INTERVIEW.ask.map(function(q){
        return '<div class="card phrase"><div><b>' + esc(q) + '</b></div><button class="icon-btn" data-say="' + esc(q) + '" aria-label="Listen">' + I.speaker + '</button></div>';
      }).join('') + '</div>' +
      '<h2 class="section-title">Interview tips</h2>' +
      '<div class="faq">' + interviewTips().map(function(t){ return '<details class="card"><summary>' + esc(t.t) + '</summary><div class="a">' + esc(t.d) + '</div></details>'; }).join('') + '</div>'
    );
    document.getElementById('role').onchange = function(){ prefs.role = this.value; savePrefs(); };
    app.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(){ speak(b.dataset.say); }; });
  }

  function interviewQ(gid, i){
    var g = INTERVIEW.groups.find(function(x){ return x.id === gid; });
    if (!g) return interviewHome();
    i = Math.max(0, Math.min(i || 0, g.questions.length - 1));
    var q = g.questions[i], best = (state.interview || {})[iqKey(g.id, i)];
    setTab('learn');
    var isStar = g.id === 'star' || /tell me about a time/i.test(q.q);
    render(
      '<a class="back" href="#/interview">' + I.back + 'Interview preparation</a>' +
      '<span class="eyebrow">' + esc(g.title) + ' · question ' + (i + 1) + ' of ' + g.questions.length + (best != null ? ' · your best ' + best + '%' : '') + '</span>' +
      '<article class="card pad" style="margin-top:10px"><p class="q-prompt">' + esc(q.q) + '</p>' +
        '<div class="listen-row" style="margin:6px 0 0"><button class="btn" id="play">' + I.speaker + 'Hear the question</button></div>' +
        '<p style="margin-top:14px"><b>Why they ask:</b> ' + esc(q.why) + '</p>' +
        '<ul class="tiplist">' + q.tips.map(function(t){ return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '</article>' +
      '<article class="card pad" style="margin-top:12px"><span class="count">Your answer - aim for 1 to 2 minutes' + (isStar ? ', using STAR' : '') + '</span>' +
        '<div class="speak-zone" style="border-top:0;margin-top:8px;padding-top:0">' + (SR ? micButton('amic') + '<span class="mic-label" id="alabel">Tap and start your answer</span>' : '') +
        '<textarea id="ans" class="ref" rows="5" placeholder="' + (SR ? 'Your words appear here. You can also type or edit.' : 'Type your answer') + '"></textarea>' +
        '<button class="btn primary" id="check" type="button">Get feedback' + I.chev + '</button></div>' +
        '<div id="fb"></div>' +
      '</article>' +
      '<details class="card model"><summary>See a model answer</summary><div class="a"><p>' + esc(modelAnswer(g.id, i, q)) + '</p>' +
        '<div class="listen-row"><button class="btn sm" id="hear">' + I.speaker + 'Listen</button></div>' +
        '<p class="count" style="margin-top:12px">Useful phrases</p><div class="chips wrap">' + q.phrases.map(function(p){ return '<button type="button" class="chip" data-say="' + esc(p) + '">' + esc(p) + '</button>'; }).join('') + '</div></div></details>' +
      '<div class="nav">' +
        (i > 0 ? '<a class="btn ghost" href="#/iq/' + g.id + '/' + (i - 1) + '">' + I.back + 'Previous</a>' : '<span></span>') +
        (i < g.questions.length - 1 ? '<a class="btn primary" href="#/iq/' + g.id + '/' + (i + 1) + '">Next question' + I.chev + '</a>' : '<a class="btn primary" href="#/interview">All questions' + I.chev + '</a>') +
      '</div>'
    );
    var ans = document.getElementById('ans'), label = document.getElementById('alabel'), fb = document.getElementById('fb'), checkBtn = document.getElementById('check');
    document.getElementById('play').onclick = function(){ speak(q.q); };
    document.getElementById('hear').onclick = function(){ speak(modelAnswer(g.id, i, q)); };
    app.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(){ speak(b.dataset.say); }; });
    var la = longAnswer(document.getElementById('amic'), label || document.createElement('span'), ans);
    checkBtn.onclick = function(){
      la.stop();
      var text = ans.value.trim();
      if (text.split(/\s+/).length < 8) { fb.innerHTML = '<p class="heard" style="text-align:left">Give a fuller answer first - at least a few sentences.</p>'; return; }
      if (!hasAccess()) { fb.innerHTML = '<p class="heard" style="text-align:left">The AI coach needs you to <a href="#/signin">sign in</a> first.</p>'; return; }
      checkBtn.disabled = true; fb.innerHTML = '<div class="typing" style="margin:14px 0"><i></i><i></i><i></i></div>';
      apiFetch(TALK_API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
        body: JSON.stringify({ interview: true, question: q.q, answer: text, role: prefs.role || interviewRoles()[0], secs: la.secs() }) })
        .then(function(r){ return r.json(); })
        .then(function(d){
          checkBtn.disabled = false;
          if (d.error || d.score == null) throw new Error(d.error || 'ai');
          state.interview = state.interview || {};
          state.interview[iqKey(g.id, i)] = Math.max(state.interview[iqKey(g.id, i)] || 0, d.score);
          logDay({ speakSec: Math.round(la.secs()) }); addVocab(text); markActive(); save();
          var star = d.star || {};
          fb.innerHTML =
            '<div class="iv-score"><b class="' + scoreCls(d.score) + '">' + d.score + '</b><span>' + esc(d.verdict) + '</span></div>' +
            (isStar ? '<div class="star">' + ['situation', 'task', 'action', 'result'].map(function(k){ return '<span class="' + (star[k] ? 'ok' : 'no') + '">' + (star[k] ? '✓ ' : '✗ ') + k[0].toUpperCase() + k.slice(1) + '</span>'; }).join('') + '</div>' : '') +
            '<p class="count" style="margin-top:12px">What worked</p><ul class="tiplist good">' + (d.strengths || []).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
            '<p class="count" style="margin-top:10px">To improve</p><ul class="tiplist">' + (d.improve || []).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
            '<div class="coach better-ans"><p class="count">Your answer, improved</p><p>' + esc(d.better_answer) + '</p>' +
              '<div class="listen-row"><button class="btn sm" type="button" id="hearBetter">' + I.speaker + 'Listen</button></div>' +
              '<div class="chips wrap" style="margin-top:10px">' + (d.phrases || []).map(function(p){ return '<button type="button" class="chip" data-say="' + esc(p) + '">' + esc(p) + '</button>'; }).join('') + '</div></div>';
          document.getElementById('hearBetter').onclick = function(){ speak(d.better_answer); };
          fb.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(){ speak(b.dataset.say); }; });
        })
        .catch(function(e){
          checkBtn.disabled = false;
          fb.innerHTML = '<p class="heard" style="text-align:left">' + (/^(access_code|signin)$/.test(String(e.message)) ? 'Please sign in again.' : 'Couldn\'t reach the coach. Please check your internet and try again.') + '</p>';
        });
    };
  }

  /* ---------- Vocabulary ---------- */
  function learntIn(t){ return t.words.filter(function(w, i){ return (state.learnt || {})[t.id + ':' + i]; }).length; }
  function vocab(){
    setTab('learn');
    var total = curVocab().reduce(function(a, t){ return a + t.words.length; }, 0), got = curVocab().reduce(function(a, t){ return a + learntIn(t); }, 0);
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">Vocabulary · ' + got + ' of ' + total + ' learnt</span>' +
      '<h1 class="title">Words for work and life</h1>' +
      '<p class="lede">Everyday, work and healthcare words, each with a meaning and an example. Hear them, say them, and mark them as learnt. Words for your level come first.</p>' +
      // Your level first, then the others from Beginner up.
      [userLevel()].concat(LEVELS.map(function(l){ return l.id; }).filter(function(id){ return id !== userLevel(); })).map(function(lid){
        var themes = curVocab().filter(function(t){ return t.level === lid; });
        if (!themes.length) return '';
        return '<h2 class="section-title course-level">' + esc(levelById(lid).name) + (lid === userLevel() && myLevelInfo() ? ' <span class="pill good">Your level</span>' : '') + '</h2>' +
          '<div class="list two">' + themes.map(function(t){
            var n = learntIn(t);
            return '<a class="card item" href="#/words/' + t.id + '"><span class="num">' + I.book + '</span><span class="t"><h2>' + esc(t.title) + '</h2>' +
              '<span class="sub">' + t.words.slice(0, 3).map(function(w){ return esc(w.w); }).join(' · ') + '</span>' +
              '<span class="meta"><span class="mini-bar"><i style="width:' + Math.round(n / t.words.length * 100) + '%"></i></span>' + n + '/' + t.words.length + '</span></span></a>';
          }).join('') + '</div>';
      }).join('')
    );
  }
  function wordsPage(id){
    var t = curVocab().find(function(x){ return x.id === id; });
    if (!t) return vocab();
    setTab('learn');
    var cur = 0;
    render(
      '<a class="back" href="#/vocab">' + I.back + 'Vocabulary</a>' +
      '<span class="eyebrow">Vocabulary</span>' +
      '<h1 class="title">' + esc(t.title) + '</h1>' +
      '<p class="lede">Tap a word to see what it means. Then say it below.</p>' +
      '<div class="vocab">' + t.words.map(function(w, i){
        var learnt = (state.learnt || {})[t.id + ':' + i];
        return '<div class="card vw' + (learnt ? ' learnt' : '') + '" data-i="' + i + '" role="button" tabindex="0" aria-expanded="false">' +
          '<div class="vw-top"><b>' + esc(w.w) + '</b><button class="say" type="button" data-say="' + esc(w.w) + '" aria-label="Listen">' + I.speaker + '</button></div>' +
          '<div class="vw-back"><p>' + esc(w.m) + '</p>' + natHtml(w, 'mal', 'p') + '<p class="ex">“' + esc(w.ex) + '” <button class="say" type="button" data-say="' + esc(w.ex) + '" aria-label="Listen to the example">' + I.speaker + '</button></p>' +
          '<button class="btn sm ' + (learnt ? 'primary' : 'ghost') + '" type="button" data-learn="' + i + '">' + (learnt ? I.check + 'Learnt' : 'Mark as learnt') + '</button></div></div>';
      }).join('') + '</div>' +
      '<div class="card pad drill-say"><span class="count">Now say the example:</span><p class="phrase-en" id="target"></p><div class="speak-zone" id="practice"></div></div>'
    );
    function pick(i){
      cur = i;
      document.getElementById('target').textContent = t.words[i].ex;
      app.querySelectorAll('.vw').forEach(function(c){ c.classList.toggle('sel', +c.dataset.i === i); });
    }
    app.querySelectorAll('.vw').forEach(function(c){
      function open(){
        var o = c.classList.toggle('open'); c.setAttribute('aria-expanded', o);
        if (o) { pick(+c.dataset.i); speak(t.words[+c.dataset.i].w); }
      }
      c.onclick = function(e){ if (e.target.closest('button')) return; open(); };
      c.onkeydown = function(e){ if (e.target === c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(); } };
    });
    app.querySelectorAll('[data-say]').forEach(function(b){ b.onclick = function(e){ e.stopPropagation(); speak(b.dataset.say); }; });
    app.querySelectorAll('[data-learn]').forEach(function(b){
      b.onclick = function(e){
        e.stopPropagation();
        var k = t.id + ':' + b.dataset.learn;
        state.learnt = state.learnt || {};
        if (state.learnt[k]) delete state.learnt[k]; else { state.learnt[k] = 1; markActive(); }
        save();
        var on = !!state.learnt[k], card = b.closest('.vw');
        card.classList.toggle('learnt', on);
        b.className = 'btn sm ' + (on ? 'primary' : 'ghost');
        b.innerHTML = on ? I.check + 'Learnt' : 'Mark as learnt';
      };
    });
    pick(0);
    practiceCard(document.getElementById('practice'), function(){ return t.words[cur].ex; });
  }

  /* ---------- Speaking level test ---------- */
  /* ---------- Levels: placement test and level-up exams ---------- */
  // Your level page: the ladder, when the next exam is, and past results.
  function examHome(){
    setTab('learn');
    var lv = myLevelInfo(), nx = nextLevel(), wait = nextExamDate();
    if (!lv) { location.hash = '#/'; return; }
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">' + esc(ENGLISHES[myEnglish()].name) + '</span>' +
      '<h1 class="title">Your level</h1>' +
      levelCard().replace('<a class="card pad my-level" href="#/exam">', '<div class="card pad my-level">').replace(/<\/a>$/, '</div>') +
      (nx ? '<article class="card pad" style="margin-top:14px"><h2 class="section-title" style="margin-top:0">' + esc(nx.name) + ' exam</h2>' +
        '<p>About 10 minutes in three parts: a listening and vocabulary quiz (30%), reading three sentences aloud (20%) and answering three questions out loud (50%). Score <b>80% or more</b> to move up to ' + esc(nx.name) + '.</p>' +
        '<p class="heard" style="text-align:left">You can take one exam a week. Find a quiet place, and use headphones if you can.</p>' +
        (wait ? '<button class="btn" disabled>Available from ' + esc(niceDate(wait)) + '</button>' : '<a class="btn primary" href="#/exam/levelup">Start the exam' + I.chev + '</a>') +
        '</article>' : '') +
      ((lv.history || []).length ? '<h2 class="section-title">Your results</h2><div class="phrase-list">' + lv.history.slice().reverse().map(function(h){
        var d = new Date(h.date);
        return '<div class="card phrase"><div><b>' + (h.kind === 'placement' ? 'Placement test: ' + esc(levelById(h.level).name) : esc(levelById(h.target).name) + ' exam: ' + h.score + '% · ' + (h.passed ? 'Passed' : 'Not yet')) + '</b>' +
          '<span>' + esc(niceDate(d)) + ' · quiz ' + h.parts.quiz + '%' + (h.parts.read != null ? ' · reading ' + h.parts.read + '%' : '') + ' · speaking ' + h.parts.speak + '%</span></div></div>';
      }).join('') + '</div>' : '') +
      '<p style="margin-top:18px"><a class="btn ghost" href="#/english">Learning a different English?</a></p>'
    );
  }

  // One exam from start to finish: kind 'placement' (decides your starting level) or 'levelup'.
  function examRun(kind){
    setTab('learn');
    var paper = null, step = 0, picks = [], reads = [], answers = [];
    var placement = kind === 'placement';
    var eng = ENGLISHES[myEnglish()];
    function total(){ return paper.quiz.length + paper.read.length + paper.speak.length; }
    function header(n, label){
      return (placement ? '' : '<a class="back" href="#/exam">' + I.back + 'Your level</a>') +
        '<span class="eyebrow">' + (placement ? 'Placement test' : esc(levelById(paper.target).name) + ' exam') + ' · ' + label + '</span>' +
        '<div class="progress"><i style="width:' + Math.round(n / total() * 100) + '%"></i></div>';
    }
    function intro(){
      var nx = nextLevel();
      render(
        (placement ? '' : '<a class="back" href="#/exam">' + I.back + 'Your level</a>') +
        '<span class="eyebrow">' + esc(eng.name) + ' · about 10 minutes</span>' +
        '<h1 class="title">' + (placement ? 'Find your level' : esc(nx ? nx.name : '') + ' exam') + '</h1>' +
        '<p class="lede">' + (placement
          ? 'A short test to find where you should start: <b>Beginner</b>, <b>Intermediate</b>, <b>Advanced</b> or <b>Leadership</b>. Your lessons and conversations will match your level, and each week you can take an exam to move up.'
          : 'Score 80% or more to move up to ' + esc(nx ? nx.name : '') + '. You can take one exam a week.') + '</p>' +
        '<div class="card pad exam-parts">' +
          '<div><span class="num">1</span><span><b>Listening and vocabulary quiz</b><span>' + (placement ? '12' : '10') + ' questions - tap the answer</span></span></div>' +
          '<div><span class="num">2</span><span><b>Read aloud</b><span>3 sentences, scored for pronunciation</span></span></div>' +
          '<div><span class="num">3</span><span><b>Speak</b><span>Answer 3 questions out loud, 30 to 60 seconds each</span></span></div>' +
        '</div>' +
        '<p class="heard" style="text-align:left;margin-top:12px">Find a quiet place, hold the phone about 20 cm away, and use headphones for the listening questions if you can.</p>' +
        '<div class="row" style="margin-top:16px"><button class="btn primary" id="start">Start' + I.chev + '</button></div>' +
        '<p class="auth-msg" id="msg" role="status"></p>'
      );
      var btn = document.getElementById('start'), msg = document.getElementById('msg');
      btn.onclick = function(){
        btn.disabled = true; msg.textContent = '';
        apiFetch(TALK_API + '/exam/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: kind }) })
          .then(function(r){ return r.json(); })
          .then(function(d){
            if (d.error === 'too_soon') { msg.textContent = 'Your next exam is available from ' + niceDate(new Date(d.next)) + '.'; return; }
            if (d.error === 'already_placed') { location.hash = '#/exam'; return; }
            if (d.error || !d.quiz) throw new Error(d.error || 'exam');
            paper = d; step = 0; quizStep();
          })
          .catch(function(){ btn.disabled = false; msg.textContent = 'Couldn\'t start the exam - please check your internet and try again.'; });
      };
    }
    function quizStep(){
      var q = paper.quiz[step], chosen = null;
      render(header(step + 1, 'Quiz ' + (step + 1) + ' of ' + paper.quiz.length) +
        '<article class="card pad">' +
          (q.type === 'listen' ? '<span class="count">Listen, then answer</span><div class="listen-row" style="margin:6px 0 10px"><button class="btn" id="play">' + I.speaker + 'Play</button><button class="btn" id="slow">' + I.speaker + 'Slow</button></div>' : '<span class="count">Choose the best answer</span>') +
          '<p class="q-prompt">' + esc(q.q) + '</p>' +
          '<div class="opts">' + q.o.map(function(o, i){ return '<button type="button" class="opt" data-i="' + i + '">' + esc(o) + '</button>'; }).join('') + '</div>' +
          '<div class="nav"><span></span><button class="btn primary" id="next" disabled>Next' + I.chev + '</button></div>' +
        '</article>');
      if (q.type === 'listen') {
        document.getElementById('play').onclick = function(){ speak(q.say); };
        document.getElementById('slow').onclick = function(){ speak(q.say, true); };
        speak(q.say);
      }
      var next = document.getElementById('next');
      app.querySelectorAll('.opt').forEach(function(b){ b.onclick = function(){
        chosen = +b.dataset.i;
        app.querySelectorAll('.opt').forEach(function(x){ x.classList.toggle('picked', x === b); });
        next.disabled = false;
      }; });
      next.onclick = function(){
        picks[step] = chosen; step++;
        if (step < paper.quiz.length) quizStep(); else { step = 0; readStep(); }
      };
    }
    function readStep(){
      var t = paper.read[step], n = paper.quiz.length + step + 1;
      render(header(n, 'Read aloud ' + (step + 1) + ' of ' + paper.read.length) +
        '<article class="card pad"><span class="count">Read this aloud</span><p class="phrase-en">' + esc(t) + '</p>' +
        '<div class="speak-zone" id="practice"></div>' +
        '<div class="nav"><span></span><button class="btn primary" id="next" disabled>Next' + I.chev + '</button></div></article>');
      var next = document.getElementById('next');
      practiceCard(document.getElementById('practice'), function(){ return t; }, function(res){ reads[step] = res; next.disabled = false; });
      next.onclick = function(){ step++; if (step < paper.read.length) readStep(); else { step = 0; speakStep(); } };
    }
    function speakStep(){
      var q = paper.speak[step], n = paper.quiz.length + paper.read.length + step + 1;
      render(header(n, 'Speak ' + (step + 1) + ' of ' + paper.speak.length) +
        '<article class="card pad"><span class="count">Answer out loud - aim for 30 to 60 seconds</span><p class="q-prompt">' + esc(q) + '</p>' +
        '<div class="listen-row" style="margin:0 0 6px"><button class="btn" id="play">' + I.speaker + 'Hear the question</button></div>' +
        '<div class="speak-zone">' + (SR ? micButton('amic') + '<span class="mic-label" id="alabel">Tap and start speaking</span>' : '') +
        '<textarea id="ans" class="ref" rows="4" placeholder="' + (SR ? 'Your words appear here. You can also type.' : 'Type your answer') + '"></textarea></div>' +
        '<div class="nav"><span></span><button class="btn primary" id="next">' + (step === paper.speak.length - 1 ? 'Finish' : 'Next') + I.chev + '</button></div></article>');
      var ans = document.getElementById('ans'), mic = document.getElementById('amic'), label = document.getElementById('alabel');
      document.getElementById('play').onclick = function(){ speak(q); };
      speak(q);
      var la = longAnswer(mic, label, ans);
      document.getElementById('next').onclick = function(){
        la.stop();
        var text = ans.value.trim();
        if (!text) { if (label) label.textContent = 'Please answer the question first'; return; }
        answers[step] = { a: text, secs: la.secs() };
        logDay({ speakSec: Math.round(la.secs()) }); addVocab(text);
        step++;
        if (step < paper.speak.length) speakStep(); else submit();
      };
    }
    function submit(){
      render(header(total(), 'Marking') + '<article class="card pad done"><div class="typing" style="margin:10px auto"><i></i><i></i><i></i></div><p class="lede">Marking your exam…</p></article>');
      apiFetch(TALK_API + '/exam/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz: picks, read: reads.map(function(r){ return r ? r.pron : null; }), speak: answers }) })
        .then(function(r){ return r.json(); })
        .then(function(d){
          if (d.error || d.score == null) throw new Error(d.error || 'exam');
          saveProfile(Object.assign({ uid: me.uid }, d.profile));
          state.test = { date: new Date().toLocaleDateString(), cefr: d.cefr, grammar: d.grammar, vocabulary: d.vocabulary, coherence: d.coherence, pron: d.parts.read };
          save(); markActive();
          result(d);
        })
        .catch(function(e){
          render(header(total(), 'Marking') + '<article class="card pad"><p>' + (String(e.message) === 'no_exam' ? 'This exam has timed out (exams must be finished within 3 hours). Please start again.' : 'Couldn\'t mark your exam - please check your internet and try again.') + '</p>' +
            '<div class="row" style="margin-top:14px">' + (String(e.message) === 'no_exam' ? '<a class="btn primary" href="#/exam">Back</a>' : '<button class="btn primary" id="retry">Try again</button>') + '</div></article>');
          var r = document.getElementById('retry'); if (r) r.onclick = submit;
        });
    }
    function result(d){
      var lvl = levelById(d.level), next = d.next ? new Date(d.next) : null;
      var head = placement
        ? '<span class="eyebrow">Your starting level</span><div class="big">' + esc(lvl.name) + '</div><p class="lede">' + esc(lvl.about) + ' · CEFR ' + esc(d.cefr || lvl.cefr) + '</p>'
        : '<span class="eyebrow">' + esc(levelById(d.target).name) + ' exam</span><div class="big">' + d.score + '%</div>' +
          (d.passed ? '<p class="pass-msg good">Passed! You are now <b>' + esc(lvl.name) + '</b>.</p>' : '<p class="pass-msg">Not yet - you need 80%. You can try again from <b>' + (next ? esc(niceDate(next)) : 'next week') + '</b>.</p>');
      render(
        '<article class="card pad done exam-result">' + head + '<p>' + esc(d.summary) + '</p></article>' +
        '<article class="card pad"><div class="sbars">' +
          bar('Quiz', d.parts.quiz) + (d.parts.read != null ? bar('Reading aloud', d.parts.read) : '') + bar('Speaking', d.parts.speak) +
          bar('Grammar', d.grammar) + bar('Vocabulary', d.vocabulary) + bar('Coherence', d.coherence) +
        '</div></article>' +
        '<h2 class="section-title">Your answers</h2><div class="phrase-list">' + d.answers.map(function(a){
          return '<div class="card phrase"><div><b>' + a.score + '% · ' + esc(a.q) + '</b><span>' + esc(a.comment) + '</span></div></div>';
        }).join('') + '</div>' +
        (d.strengths.length ? '<h2 class="section-title">Strengths</h2><div class="phrase-list">' + d.strengths.map(function(x){ return '<div class="card phrase"><div><b>' + esc(x) + '</b></div></div>'; }).join('') + '</div>' : '') +
        (d.improve.length ? '<h2 class="section-title">Work on next</h2><div class="phrase-list">' + d.improve.map(function(x){ return '<div class="card phrase"><div><b>' + esc(x) + '</b></div></div>'; }).join('') + '</div>' : '') +
        '<div class="row" style="margin-top:18px"><button class="btn primary" id="go">Start practising' + I.chev + '</button></div>'
      );
      // The placement test runs at "#/", where a link to "#/" would change nothing - so route directly.
      document.getElementById('go').onclick = function(){ if (location.hash === '#/' || location.hash === '') route(); else location.hash = '#/'; };
    }
    intro();
  }

  // Choose your English: at registration, or to switch later (each English keeps its own level).
  function englishPage(){
    var first = !myEnglish();
    (first ? authShell : function(h){ setTab(''); render('<a class="back" href="#/account">' + I.back + 'My account</a>' + h); })(
      '<h1 class="title">Which English do you want to learn?</h1>' +
      '<p class="lede">' + (first ? 'Your lessons, voices and conversations will match it. You can change it later in My account.' : 'Each English keeps its own level. A new one starts with a placement test.') + '</p>' +
      '<div class="list eng-list">' + Object.keys(ENGLISHES).map(function(k){
        var e = ENGLISHES[k], lv = profile && profile.levels && profile.levels[k];
        return '<button type="button" class="card item eng-opt' + (myEnglish() === k ? ' on' : '') + '" data-e="' + k + '"><span class="num">' + e.tag + '</span><span class="t"><h2>' + esc(e.name) + '</h2><span class="sub">' + esc(e.desc) + (lv ? ' · your level: ' + esc(levelById(lv.level).name) : '') + '</span></span><span class="chev">' + I.chev + '</span></button>';
      }).join('') + '</div><p class="auth-msg" id="msg" role="status"></p>'
    );
    var msg = document.getElementById('msg');
    app.querySelectorAll('.eng-opt').forEach(function(b){ b.onclick = function(){
      app.querySelectorAll('.eng-opt').forEach(function(x){ x.disabled = true; });
      apiFetch(TALK_API + '/english', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ english: b.dataset.e }) })
        .then(function(r){ return r.json(); })
        .then(function(d){
          if (!d.profile) throw new Error(d.error || 'english');
          saveProfile(Object.assign({ uid: me.uid }, d.profile));
          pickVoice();
          if (location.hash === '#/') route(); else location.hash = '#/';
        })
        .catch(function(){ app.querySelectorAll('.eng-opt').forEach(function(x){ x.disabled = false; }); msg.textContent = 'Couldn\'t save - please check your internet and try again.'; });
    }; });
  }

  /* ---------- Quiz ---------- */
  function quiz(id){
    var l = lessonById(id);
    if (!l) return learn();
    setTab('learn');
    var picks = shuffle(l.phrases).slice(0, Math.min(6, l.phrases.length));
    var qs = picks.map(function(p, i){
      var others = shuffle(l.phrases.filter(function(o){ return o !== p; })).slice(0, 3);
      return { p: p, type: i % 2 || !nat(p) ? 'listen' : 'meaning', opts: shuffle([p].concat(others)) };
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
            return '<button class="opt' + (isMeaning ? ' mal' : '') + '" data-i="' + i + '"' + (isMeaning ? ' lang="' + nativeLang() + '"' : '') + '>' + esc(isMeaning ? nat(o) : o.en) + '</button>';
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
      logDay({ lessons: 1 }); save(); markActive();
      var list = lessonList(l), i = list.indexOf(l), nextL = list[i + 1];
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

  /* ---------- Accounts (Firebase Authentication) ---------- */
  // People register with Google or email + password and fill in a short profile. Every request to
  // the AI server carries their Firebase ID token. Old access codes keep working during the changeover.
  var FIREBASE = {
    apiKey: 'AIzaSyCTcvbGukdITH6qMssXIV6vpCWpq8ZjSdo',
    authDomain: 'australian-jeevitham.firebaseapp.com',
    projectId: 'australian-jeevitham',
    appId: '1:678810149486:web:0cabda21a0f085f84cfc7f'
  };
  var PROFILE_KEY = 'aj-english-profile';
  var fbAuth = null, me = null, authReady = false, profileLoading = false, profile = null;
  try { profile = JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch(e) {}
  function saveProfile(pr){
    profile = pr;
    try { if (pr) localStorage.setItem(PROFILE_KEY, JSON.stringify(pr)); else localStorage.removeItem(PROFILE_KEY); } catch(e) {}
  }
  // Signed in with a confirmed email and a profile - or holding an old access code.
  function hasAccess(){ return !!(me && me.emailVerified && profile && profile.uid === me.uid) || (!me && !!getCode()); }
  // Calls to the AI server, with the signed-in user's token.
  function apiFetch(url, opts){
    opts = opts || {};
    return (me ? me.getIdToken().catch(function(){ return ''; }) : Promise.resolve('')).then(function(t){
      var h = Object.assign({}, opts.headers);
      if (t) { h.Authorization = 'Bearer ' + t; delete h['X-Access-Code']; }
      return fetch(url, Object.assign({}, opts, { headers: h }));
    }).then(function(r){
      if ((r.headers.get('Content-Type') || '').indexOf('application/json') === 0 && !/\/(pron|tts)$/.test(url)) {
        r.clone().json().then(function(d){ if (d && typeof d.remaining === 'number') setQuota(d.remaining, d.limit); }).catch(function(){});
      }
      // Today's allowance used up: say so, whichever feature asked.
      if (r.status === 429) r.clone().json().then(function(d){
        if (d.error === 'daily_limit') toast(/\/pron$/.test(url)
          ? 'You\'ve reached today\'s limit for pronunciation checks. It resets tomorrow.'
          : 'You\'ve used all of today\'s AI actions. They reset tomorrow - meanwhile, sound drills, lessons and slang still work.');
      }).catch(function(){});
      return r;
    });
  }
  /* ---------- AI actions left today ---------- */
  // The server counts AI actions per UTC day; the counter on Home and My account shows what's left.
  var QUOTA_KEY = 'aj-english-quota';
  var quota = null;
  try { quota = JSON.parse(localStorage.getItem(QUOTA_KEY)); } catch(e) {}
  function utcDay(){ return new Date().toISOString().slice(0, 10); }
  function setQuota(remaining, limit){
    quota = { left: remaining, limit: limit || (quota && quota.limit) || 60, day: utcDay() };
    try { localStorage.setItem(QUOTA_KEY, JSON.stringify(quota)); } catch(e) {}
    document.querySelectorAll('[data-quota]').forEach(function(el){ el.outerHTML = quotaHtml(); });
  }
  // The local time the allowance resets (midnight UTC), e.g. "10:00 am" in Queensland.
  function resetTime(){
    var d = new Date(); d.setUTCHours(24, 0, 0, 0);
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  function quotaHtml(){
    var lim = (quota && quota.limit) || 60;
    var left = quota && quota.day === utcDay() ? quota.left : lim;
    var pct = Math.max(0, Math.min(100, Math.round(left / lim * 100)));
    return '<div class="card pad quota" data-quota><div class="chart-head"><b>AI actions today</b><span>' + left + ' of ' + lim + ' left</span></div>' +
      '<i class="qbar"><b class="' + (pct > 30 ? 'ok' : pct > 10 ? 'close' : 'miss') + '" style="width:' + pct + '%"></b></i>' +
      '<p>Each coach reply, OET patient reply, IELTS marking, interview feedback, 1-minute check or level test uses one. Resets at ' + esc(resetTime()) + '. Drills, lessons and slang are unlimited.</p></div>';
  }
  // Ask the server for the latest count (when Home or My account opens).
  function refreshQuota(){
    if (!TALK_API || !hasAccess()) return;
    apiFetch(TALK_API + '/usage', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() }, body: '{}' }).catch(function(){});
  }

  function toast(text){
    var old = document.querySelector('.toast'); if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 7000);
  }
  // After sign-in (or on a new phone): fetch the saved profile from the server.
  function afterSignIn(){
    if (me && me.emailVerified && (!profile || profile.uid !== me.uid)) {
      profileLoading = true; route();
      apiFetch(TALK_API + '/me', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
        .then(function(r){ return r.json(); })
        .then(function(d){ if (d.profile) saveProfile(Object.assign({ uid: me.uid }, d.profile)); })
        .catch(function(){})
        .then(function(){ profileLoading = false; route(); });
      return;
    }
    route();
  }
  try {
    firebase.initializeApp(FIREBASE);
    fbAuth = firebase.auth();
    fbAuth.languageCode = 'en';
    fbAuth.getRedirectResult().catch(function(){});
    fbAuth.onAuthStateChanged(function(u){
      var was = authReady;
      me = u; authReady = true;
      // Signed in: the old access code is no longer needed on this phone.
      if (u) { try { localStorage.removeItem(CODE_KEY); } catch(e) {} }
      if (u || was) afterSignIn(); else route();
    });
  } catch(e) { fbAuth = null; }   // Firebase didn't load (offline): returning users can still practise

  // Which screen a page needs first: null (show it), 'wait', 'signin', 'verify' or 'profile'.
  var OPEN_PAGES = { signin: 1, privacy: 1, terms: 1, help: 1 };
  function gate(page){
    if (OPEN_PAGES[page]) return null;
    if (!fbAuth) return profile || getCode() ? null : 'signin';
    if (!authReady || profileLoading) return 'wait';
    if (!me) return getCode() ? null : 'signin';
    if (!me.emailVerified) return 'verify';
    if (!profile || profile.uid !== me.uid || !profile.native) return 'profile';
    if (page === 'privacy' || page === 'terms' || page === 'account' || page === 'profile') return null;
    if (!myEnglish() || page === 'english') return 'english';
    if (!myLevelInfo()) return 'placement';
    return null;
  }
  var AUTH_ERRORS = {
    'auth/invalid-credential': 'That email and password don\'t match. Check them, or tap "Forgot password?".',
    'auth/wrong-password': 'That email and password don\'t match. Check them, or tap "Forgot password?".',
    'auth/user-not-found': 'There is no account with that email yet - tap "Create an account".',
    'auth/email-already-in-use': 'This email already has an account - sign in instead.',
    'auth/invalid-email': 'Please check the email address.',
    'auth/missing-password': 'Please type your password.',
    'auth/weak-password': 'Please use at least 6 characters for your password.',
    'auth/too-many-requests': 'Too many tries. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'No internet connection. Please try again.',
    'auth/user-disabled': 'This account has been switched off. Please contact Australian Jeevitham.'
  };
  function authError(e){
    var c = e && e.code;
    if (c === 'auth/popup-closed-by-user' || c === 'auth/cancelled-popup-request') return '';
    return AUTH_ERRORS[c] || 'Something went wrong (' + esc(c || 'unknown') + '). Please try again.';
  }
  var GOOGLE_G = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

  function authShell(inner){
    setTab('');
    render('<div class="auth"><img src="icons/icon-192.png" alt="" width="72" height="72" class="auth-logo">' + inner +
      '<p class="fine">By continuing you agree to the <a href="#/terms">Terms</a> and <a href="#/privacy">Privacy policy</a>. <a href="#/help">Help</a></p></div>');
  }
  function waitPage(){ setTab(''); render('<div class="auth"><div class="typing" style="margin:60px auto" aria-label="Loading"><i></i><i></i><i></i></div></div>'); }

  // Sign in or create an account.
  function signinPage(){
    if (me && me.emailVerified && profile && profile.uid === me.uid) { location.hash = '#/'; return; }
    var create = false;
    authShell(
      '<h1 class="title">English Coach</h1>' +
      '<p class="lede">Practise Australian, British or Indian English for life and work, with an AI coach that listens and helps.</p>' +
      '<button class="btn google" id="gBtn" type="button">' + GOOGLE_G + 'Continue with Google</button>' +
      '<div class="or"><span>or use your email</span></div>' +
      '<form id="ef" class="auth-form" novalidate>' +
        '<label>Email<input id="em" type="email" autocomplete="email" inputmode="email" required></label>' +
        '<label>Password<input id="pw" type="password" autocomplete="current-password" required></label>' +
        '<p class="hint" id="pwHint" hidden>At least 6 characters.</p>' +
        '<button class="btn primary" id="go" type="submit">Sign in</button>' +
      '</form>' +
      '<p class="auth-msg" id="msg" role="status"></p>' +
      '<p class="switch"><span id="swTxt">New here?</span> <button type="button" class="link" id="sw">Create an account</button></p>' +
      '<button type="button" class="link" id="forgot">Forgot password?</button>' +
      (getCode() ? '<p class="notice">You are using an access code. Please create your account - access codes will stop working soon.</p>' : '')
    );
    var msg = app.querySelector('#msg'), em = app.querySelector('#em'), pw = app.querySelector('#pw'), go = app.querySelector('#go');
    function say(t, good){ msg.innerHTML = t; msg.classList.toggle('good', !!good); }
    if (!fbAuth) { say('Signing in needs internet. Please connect and reload the app.'); return; }
    app.querySelector('#gBtn').onclick = function(){
      say('');
      var gp = new firebase.auth.GoogleAuthProvider();
      gp.setCustomParameters({ prompt: 'select_account' });
      fbAuth.signInWithPopup(gp).catch(function(e){
        if (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment') return fbAuth.signInWithRedirect(gp);
        throw e;
      }).catch(function(e){ say(authError(e)); });
    };
    app.querySelector('#sw').onclick = function(){
      create = !create; say('');
      go.textContent = create ? 'Create account' : 'Sign in';
      pw.autocomplete = create ? 'new-password' : 'current-password';
      app.querySelector('#pwHint').hidden = !create;
      app.querySelector('#swTxt').textContent = create ? 'Already registered?' : 'New here?';
      this.textContent = create ? 'Sign in' : 'Create an account';
    };
    app.querySelector('#ef').onsubmit = function(e){
      e.preventDefault();
      var email = em.value.trim(), pass = pw.value;
      if (!email) { say('Please type your email.'); return; }
      go.disabled = true; say('');
      (create
        ? fbAuth.createUserWithEmailAndPassword(email, pass).then(function(c){ return c.user.sendEmailVerification(); })
        : fbAuth.signInWithEmailAndPassword(email, pass)
      ).catch(function(e){ go.disabled = false; say(authError(e)); });
    };
    app.querySelector('#forgot').onclick = function(){
      var email = em.value.trim();
      if (!email) { say('Type your email above first, then tap "Forgot password?" again.'); em.focus(); return; }
      fbAuth.sendPasswordResetEmail(email)
        .then(function(){ say('We\'ve emailed a link to reset your password to <b>' + esc(email) + '</b>. Check your inbox and spam folder.', true); })
        .catch(function(e){ say(authError(e)); });
    };
  }

  // Email + password accounts confirm their email before using the coach.
  function verifyPage(){
    authShell(
      '<h1 class="title">Check your email</h1>' +
      '<p class="lede">We sent a link to <b>' + esc(me.email || '') + '</b>. Tap it to confirm your email, then come back and tap <b>Continue</b>.</p>' +
      '<button class="btn primary wide" id="cont" type="button">I\'ve confirmed - Continue</button>' +
      '<p class="auth-msg" id="msg" role="status"></p>' +
      '<p class="switch">No email? Check your spam folder, or <button type="button" class="link" id="again">send it again</button>.</p>' +
      '<button type="button" class="link" id="out">Use a different account</button>'
    );
    var msg = app.querySelector('#msg');
    app.querySelector('#cont').onclick = function(){
      me.reload().then(function(){
        me = fbAuth.currentUser;
        if (!me.emailVerified) { msg.textContent = 'Not confirmed yet. Tap the link in the email first.'; return; }
        return me.getIdToken(true).then(afterSignIn);
      }).catch(function(e){ msg.innerHTML = authError(e); });
    };
    app.querySelector('#again').onclick = function(){
      me.sendEmailVerification().then(function(){ msg.textContent = 'Sent again - it can take a minute to arrive.'; }).catch(function(e){ msg.innerHTML = authError(e); });
    };
    app.querySelector('#out').onclick = signOut;
  }

  var COUNTRIES = ['India', 'Australia', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'United Kingdom', 'Ireland', 'New Zealand', 'Canada', 'Other'];
  var FIELDS = ['General / everyday life', 'Healthcare & Medical', 'Technology & IT', 'Engineering', 'Education & Teaching', 'Professional Services', 'Student', 'Other'];
  var HEALTH_ROLES = ['Nurse', 'Care worker', 'Assistant nurse', 'Senior nurse', 'Allied health'];
  var GOALS = ['IELTS', 'OET', 'Job interviews', 'Speaking confidently at work', 'Everyday English in Australia'];
  function options(list, cur){ return '<option value="">Choose…</option>' + list.map(function(o){ return '<option' + (o === cur ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join(''); }

  // The short profile: asked once after registering, and editable from My account.
  function profilePage(){
    var first = !profile || profile.uid !== me.uid, pr = first ? {} : profile, missing = !first && !pr.native;
    authShell(
      '<h1 class="title">' + (first ? 'Tell us about you' : missing ? 'One more question' : 'Edit your profile') + '</h1>' +
      '<p class="lede">' + (first ? 'This helps us make the app better for people like you.' : 'Update your details.') + '</p>' +
      '<form id="pf" class="auth-form">' +
        '<label>Your name<input id="nm" type="text" autocomplete="name" maxlength="60" required value="' + esc(pr.name || (me && me.displayName) || '') + '"></label>' +
        '<label>Where do you live now?<select id="ct" required>' + options(COUNTRIES, pr.country) + '</select></label>' +
        '<label>Your field<select id="fd" required>' + options(FIELDS, pr.field) + '</select></label>' +
        '<label id="rlWrap"' + (pr.field === 'Healthcare & Medical' ? '' : ' hidden') + '>Your role<select id="rl">' + options(HEALTH_ROLES, pr.role) + '</select></label>' +
        '<label>Your main goal<select id="gl" required>' + options(GOALS, pr.goal) + '</select></label>' +
        '<label>Your mother tongue<select id="nt" required><option value="">Choose…</option>' + Object.keys(NATIVES).map(function(k){ return '<option value="' + k + '"' + (pr.native === k ? ' selected' : '') + '>' + esc(NATIVES[k]) + '</option>'; }).join('') + '</select>' +
          '<span class="hint">Explanations and help in the app will be in this language.</span></label>' +
        (first ? '<label class="check"><input id="ok" type="checkbox" required> I am 18 or older and agree to the <a href="#/terms">Terms</a> and <a href="#/privacy">Privacy policy</a>.</label>' : '') +
        '<button class="btn primary" id="sv" type="submit">' + (first ? 'Start practising' : 'Save') + '</button>' +
      '</form>' +
      '<p class="auth-msg" id="msg" role="status"></p>' +
      (first ? '<button type="button" class="link" id="out">Sign out</button>' : '<a class="link" href="#/account">Cancel</a>')
    );
    var msg = app.querySelector('#msg'), sv = app.querySelector('#sv'), fd = app.querySelector('#fd');
    if (first) app.querySelector('#out').onclick = signOut;
    fd.onchange = function(){ app.querySelector('#rlWrap').hidden = fd.value !== 'Healthcare & Medical'; };
    app.querySelector('#pf').onsubmit = function(e){
      e.preventDefault();
      var health = fd.value === 'Healthcare & Medical';
      var body = { name: app.querySelector('#nm').value.trim(), country: app.querySelector('#ct').value, field: fd.value, role: health ? app.querySelector('#rl').value : '', goal: app.querySelector('#gl').value };
      body.job = body.role || body.field;
      body.native = app.querySelector('#nt').value;
      if (!body.name || !body.country || !body.field || !body.goal || !body.native || (health && !body.role)) { msg.textContent = 'Please fill in every question.'; return; }
      if (first && !app.querySelector('#ok').checked) { msg.textContent = 'Please tick the box to agree to the Terms and Privacy policy.'; return; }
      sv.disabled = true; msg.textContent = '';
      apiFetch(TALK_API + '/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(function(r){ return r.json(); })
        .then(function(d){
          if (!d.profile) throw new Error(d.error || 'save');
          saveProfile(Object.assign({ uid: me.uid }, d.profile));
          if (location.hash === '#/' || location.hash === '' ) route(); else location.hash = first || missing ? '#/' : '#/account';
        })
        .catch(function(){ sv.disabled = false; msg.textContent = 'Couldn\'t save - please check your internet and try again.'; });
    };
  }

  function showLevelBadge(){
    var el = document.getElementById('brandSub'), lv = myLevelInfo();
    if (el) el.textContent = lv && me ? ENGLISHES[myEnglish()].short + ' · ' + levelById(lv.level).name : 'by Australian Jeevitham';
  }
  function signOut(){
    stopSpeech();
    saveProfile(null);
    var done = function(){ location.hash = '#/signin'; route(); };
    if (fbAuth) fbAuth.signOut().then(done, done); else done();
  }

  // My account: profile, sign out, delete.
  function accountPage(){
    setTab('');
    refreshQuota();
    var pr = profile || {};
    function row(k, v){ return '<div class="acct-row"><span>' + k + '</span><b>' + esc(v || '-') + '</b></div>'; }
    render(
      '<span class="eyebrow">My account</span>' +
      '<h1 class="title">' + esc(pr.name || 'Your account') + '</h1>' +
      (me ? '' : '<div class="notice">You are using an access code, which will stop working soon.</div><a class="btn primary" href="#/signin" style="margin-top:12px">Sign in or create your account' + I.chev + '</a>') +
      (me ? '<div class="card pad" style="margin-top:16px">' + row('Email', me.email) + row('Learning', myEnglish() ? ENGLISHES[myEnglish()].name : '') + row('Level', myLevelInfo() ? levelById(userLevel()).name : '') +
        row('Lives in', pr.country) + row('Field', pr.role ? pr.field + ' · ' + pr.role : pr.field || pr.job) + row('Main goal', pr.goal) + row('Mother tongue', NATIVES[pr.native] || '') + row('Member since', pr.created) +
        '<div class="row" style="margin-top:12px;gap:8px"><a class="btn ghost sm" href="#/profile">' + I.pencil + 'Edit profile</a><a class="btn ghost sm" href="#/english">Change English</a></div></div>' : '') +
      (hasAccess() ? quotaHtml() : '') +
      '<div class="list">' +
        '<a class="card item" href="#/voice"><span class="t"><h2>Voice</h2><span class="sub">Choose the coach\'s voice</span></span><span class="chev">' + I.chev + '</span></a>' +
        '<a class="card item" href="#/privacy"><span class="t"><h2>Privacy policy</h2><span class="sub">What we collect and why</span></span><span class="chev">' + I.chev + '</span></a>' +
        '<a class="card item" href="#/terms"><span class="t"><h2>Terms of use</h2><span class="sub">The rules for using the app</span></span><span class="chev">' + I.chev + '</span></a>' +
      '</div>' +
      (me ? '<div class="acct-actions"><button class="btn" id="out" type="button">Sign out</button>' +
        '<button class="btn danger-link" id="del" type="button">Delete my account</button></div><p class="auth-msg" id="msg" role="status"></p>' : '')
    );
    if (!me) return;
    var msg = app.querySelector('#msg');
    app.querySelector('#out').onclick = signOut;
    app.querySelector('#del').onclick = function(){
      if (!confirm('Delete your account and profile? This cannot be undone. (Your practice history on this phone stays until you clear it.)')) return;
      apiFetch(TALK_API + '/deleteme', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
        .then(function(){ return me.delete(); })
        .then(function(){ saveProfile(null); location.hash = '#/signin'; })
        .catch(function(e){
          msg.textContent = e && e.code === 'auth/requires-recent-login'
            ? 'For your safety, please sign out, sign in again, and then delete your account.'
            : 'Couldn\'t delete your account - please check your internet and try again.';
        });
    };
  }

  // Feedback: a short form that goes to the server, which saves it and emails it to Australian Jeevitham.
  var FEEDBACK_TYPES = [['bug', 'Something isn\'t working'], ['idea', 'An idea'], ['content', 'A mistake in the content'], ['praise', 'Something I like'], ['other', 'Other']];
  function feedbackPage(){
    setTab('feedback');
    var rating = 0, type = '';
    render(
      '<span class="eyebrow">Feedback</span>' +
      '<h1 class="title">Tell us what you think</h1>' +
      '<p class="lede">You are one of our first testers - every message is read and helps make the app better.</p>' +
      '<form id="fbf" class="card pad fb-form">' +
        '<label class="fb-q">How do you like the app so far?</label>' +
        '<div class="stars" role="radiogroup" aria-label="Rating">' + [1, 2, 3, 4, 5].map(function(n){ return '<button type="button" class="star" data-n="' + n + '" role="radio" aria-checked="false" aria-label="' + n + ' out of 5">' + I.star + '</button>'; }).join('') + '</div>' +
        '<label class="fb-q">What is it about?</label>' +
        '<div class="chips fb-types">' + FEEDBACK_TYPES.map(function(t){ return '<button type="button" class="chip" data-t="' + t[0] + '">' + esc(t[1]) + '</button>'; }).join('') + '</div>' +
        '<label class="fb-q" for="fbm">Your message</label>' +
        '<textarea id="fbm" rows="6" maxlength="2000" placeholder="What happened, what you expected, or your idea…"></textarea>' +
        (me && me.email ? '<label class="check"><input id="fbr" type="checkbox" checked> You can email me back at ' + esc(me.email) + '</label>' : '') +
        '<button class="btn primary" id="fbs" type="submit">' + I.send + 'Send feedback</button>' +
        '<p class="auth-msg" id="msg" role="status"></p>' +
      '</form>'
    );
    var stars = app.querySelectorAll('.star'), msg = app.querySelector('#msg'), btn = app.querySelector('#fbs');
    stars.forEach(function(b){ b.onclick = function(){
      rating = +b.dataset.n;
      stars.forEach(function(x){ var on = +x.dataset.n <= rating; x.classList.toggle('on', on); x.setAttribute('aria-checked', +x.dataset.n === rating); });
    }; });
    app.querySelectorAll('.fb-types .chip').forEach(function(c){ c.onclick = function(){
      type = c.dataset.t;
      app.querySelectorAll('.fb-types .chip').forEach(function(x){ x.classList.toggle('on', x === c); });
    }; });
    app.querySelector('#fbf').onsubmit = function(e){
      e.preventDefault();
      var text = app.querySelector('#fbm').value.trim();
      if (!text && !rating) { msg.textContent = 'Please choose a rating or write a message.'; return; }
      btn.disabled = true; msg.textContent = '';
      var reply = app.querySelector('#fbr');
      apiFetch(TALK_API + '/feedback', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
        body: JSON.stringify({ rating: rating, type: type, message: text, reply: reply ? reply.checked : false,
          page: lastPage, version: APP_VERSION ? 'v0.' + APP_VERSION : '', device: navigator.userAgent.slice(0, 200), installed: isInstalled() })
      }).then(function(r){ return r.json(); }).then(function(d){
        if (!d.ok) throw new Error(d.error || 'feedback');
        render('<article class="card pad done"><span class="ic big-ic">' + I.check + '</span><h1 class="title">Thank you!</h1>' +
          '<p class="lede">Your feedback has been sent to Australian Jeevitham.' + (reply && reply.checked ? ' We may email you back.' : '') + '</p>' +
          '<div class="row" style="justify-content:center;margin-top:18px"><a class="btn ghost" href="#/feedback?r=' + Date.now() + '">Send more</a><a class="btn primary" href="#/">Home' + I.chev + '</a></div></article>');
      }).catch(function(e){
        btn.disabled = false;
        msg.textContent = String(e.message) === 'too_many' ? 'Thanks - you\'ve sent a lot of feedback today. Please try again tomorrow.' : 'Couldn\'t send - please check your internet and try again.';
      });
    };
  }

  // Privacy policy and Terms (text in help.js).
  function legalPage(id){
    setTab('');
    var d = LEGAL[id];
    render('<span class="eyebrow">' + esc(d.eyebrow) + '</span><h1 class="title">' + esc(d.title) + '</h1>' +
      '<p class="heard" style="text-align:left">Last updated ' + esc(d.updated) + '</p>' +
      '<article class="card pad legal">' + d.html + '</article>' +
      '<p style="margin-top:16px"><a class="btn ghost" href="' + (me || getCode() ? '#/account' : '#/signin') + '">' + I.back + 'Back</a></p>');
  }

  /* ---------- Talk menu: sections by field (Healthcare has a sub-menu per role) ---------- */
  var TALK_MENU = [
    { id: 'general', icon: '☕', title: 'General', about: 'Everyday life: neighbours, shops, the doctor, the bank and small talk', field: 'General / everyday life',
      scenes: ['general', 'mate', 'bbq', 'coffee', 'shop_return', 'directions', 'gp', 'rental', 'bank', 'customs', 'workmate'] },
    { id: 'health', icon: '🏥', title: 'Healthcare & Medical', about: 'Nurses, care workers, assistant nurses, senior nurses and allied health', field: 'Healthcare & Medical', subs: [
      { id: 'nurse', title: 'Nurses', role: 'Nurse', scenes: ['handover', 'escalate', 'painmeds', 'family'] },
      { id: 'care', title: 'Care workers', role: 'Care worker', scenes: ['care_morning', 'care_dementia', 'care_report', 'care_family'] },
      { id: 'ain', title: 'Assistant nurses', role: 'Assistant nurse', scenes: ['ain_obs', 'ain_clarify', 'ain_falls', 'ain_handover'] },
      { id: 'senior', title: 'Senior nurses', role: 'Senior nurse', scenes: ['staffing', 'feedback', 'conflict', 'pitch'] },
      { id: 'allied', title: 'Allied health', role: 'Allied health', scenes: ['ah_physio', 'ah_ot', 'ah_pharm', 'ah_radiography'] }
    ] },
    { id: 'tech', icon: '💻', title: 'Technology & IT', about: 'Stand-ups, bugs, clients and outages', field: 'Technology & IT', scenes: ['standup', 'it_bug', 'it_client', 'it_incident'] },
    { id: 'eng', icon: '🏗️', title: 'Engineering', about: 'Site safety, design reviews, contractors and clients', field: 'Engineering', scenes: ['eng_safety', 'eng_review', 'eng_delay', 'eng_client'] },
    { id: 'edu', icon: '🎓', title: 'Education & Teaching', about: 'Parents, students and staff meetings', field: 'Education & Teaching', scenes: ['edu_parent', 'edu_behaviour', 'edu_staff', 'edu_explain'] },
    { id: 'pro', icon: '💼', title: 'Professional Services', about: 'Clients, complaints, pitches, pay and results', field: 'Professional Services', scenes: ['ps_client', 'sales', 'ps_complaint', 'salary', 'ps_results'] },
    { id: 'interview', icon: '🎤', title: 'Mock Interview', about: 'Full job interviews for nurses, care workers, IT, engineers, teachers and office roles',
      scenes: ['rn_interview', 'aged_interview', 'panel', 'mi_it', 'mi_eng', 'mi_teacher', 'mi_office'] }
  ];
  // A conversation with the learner's English applied (pack().scenes changes Australian openings).
  function sceneById(id){
    var s = SCENES.find(function(x){ return x.id === id; }), o = s && (pack().scenes || {})[id];
    return o ? Object.assign({}, s, { say: '' }, o) : s;
  }
  function sectionScenes(sec){ return sec.subs ? [].concat.apply([], sec.subs.map(function(x){ return x.scenes; })) : sec.scenes; }
  // The learner's own section (from their field) and, in Healthcare, their role's sub-menu.
  function mySection(){ var f = profile && profile.field; return TALK_MENU.find(function(x){ return x.field && x.field === f; }) || null; }
  function mySub(){ var sec = mySection(), r = profile && profile.role; return sec && sec.subs ? sec.subs.find(function(x){ return x.role === r; }) || null : null; }
  // Conversations picked for this learner: their role or field; Beginners start with everyday life.
  // The "For you" pick: the learner's role, else their field, else everyday life - whichever has
  // conversations open at their level. Returns { title, scenes }.
  function talkPick(){
    var sec = mySection(), sub = mySub();
    var tries = [sub && { title: sub.title, ids: sub.scenes }, sec && { title: sec.title, ids: sectionScenes(sec) }, { title: 'Everyday life', ids: TALK_MENU[0].scenes }].filter(Boolean);
    for (var i = 0; i < tries.length; i++) {
      var open = tries[i].ids.filter(function(id){ return levelAllows(sceneMinLevel(id)); });
      if (open.length) return { title: tries[i].title, scenes: open.map(sceneById).filter(Boolean) };
    }
    return { title: 'Everyday life', scenes: TALK_MENU[0].scenes.map(sceneById) };
  }
  function talkScenes(){ return talkPick().scenes; }
  function sectionOf(id){ return TALK_MENU.find(function(x){ return sectionScenes(x).indexOf(id) >= 0; }) || TALK_MENU[0]; }
  // Level locks: Beginners have General and Mock Interview; Intermediate has everything except the
  // Senior nurses scenes and the two leadership ones (pitch, Nurse Unit Manager interview); Advanced
  // and Leadership have everything. Access codes (no level) see everything.
  var ADVANCED_SCENES = ['pitch', 'panel'];
  function sectionMinLevel(sec){ return sec.id === 'general' || sec.id === 'interview' ? 'beginner' : 'intermediate'; }
  function sceneMinLevel(id){
    var senior = TALK_MENU[1].subs.find(function(x){ return x.id === 'senior'; });
    if (ADVANCED_SCENES.indexOf(id) >= 0 || senior.scenes.indexOf(id) >= 0) return 'advanced';
    return sectionMinLevel(sectionOf(id));
  }
  function levelAllows(min){ return LEVELS.findIndex(function(l){ return l.id === userLevel(); }) >= LEVELS.findIndex(function(l){ return l.id === min; }); }
  function lockNote(min){ return '🔒 Unlocks at ' + levelById(min).name + ' - pass the ' + levelById(min).name + ' exam'; }
  function sceneRow(s){
    var min = sceneMinLevel(s.id);
    if (!levelAllows(min)) return '<div class="card item locked"><span class="avatar">' + esc(initials(s.who)) + '</span><span class="t">' +
      '<h2>' + esc(s.title) + '</h2><span class="sub">' + esc(lockNote(min)) + '</span></span></div>';
    return '<a class="card item" href="#/talk/' + s.id + '"><span class="avatar">' + esc(initials(s.who)) + '</span><span class="t">' +
      '<h2>' + esc(s.title) + '</h2><span class="sub">with ' + esc(s.who) + '</span></span><span class="muted">' + I.chev + '</span></a>';
  }

  function talkHome(){
    setTab('talk');
    var mine = mySection(), sub = mySub(), forYou = talkScenes().slice(0, 4);
    var order = mine ? [mine].concat(TALK_MENU.filter(function(x){ return x !== mine; })) : TALK_MENU;
    render(
      '<span class="pill level">' + esc((levelById(userLevel()) || LEVELS[3]).name) + ' level' + (myEnglish() ? ' · ' + esc(ENGLISHES[myEnglish()].name) : '') + '</span>' +
      '<h1 class="title" style="margin-top:10px">Conversations</h1>' +
      '<p class="lede">Practise real situations from daily life and work. Speak as you would - your coach marks anything to improve and shows a better way to say it.</p>' +
      (TALK_API ? '' : '<div class="notice">The AI coach is being set up. Coming soon!</div>') +
      '<h2 class="section-title">For you · ' + esc(talkPick().title) + '</h2>' +
      '<div class="list">' + forYou.map(sceneRow).join('') + '</div>' +
      '<h2 class="section-title">All topics</h2>' +
      '<div class="list two">' + order.map(function(x){
        var min = sectionMinLevel(x), inner = '<span class="num sec-ic">' + x.icon + '</span><span class="t"><h2>' + esc(x.title) +
          (x === mine ? ' <span class="pill good">For you</span>' : '') + '</h2><span class="sub">' + (levelAllows(min) ? esc(x.about) + ' · ' + sectionScenes(x).length + ' conversations' : esc(lockNote(min))) + '</span></span>';
        return levelAllows(min) ? '<a class="card item" href="#/talks/' + x.id + '">' + inner + '<span class="muted">' + I.chev + '</span></a>' : '<div class="card item locked">' + inner + '</div>';
      }).join('') + '</div>'
    );
  }

  // One section; Healthcare lists each role, with the learner's own role first.
  function talkSection(id){
    var sec = TALK_MENU.find(function(x){ return x.id === id; });
    if (!sec) return talkHome();
    setTab('talk');
    var sub = mySub(), groups = sec.subs ? (sub && sec === mySection() ? [sub].concat(sec.subs.filter(function(x){ return x !== sub; })) : sec.subs) : [{ scenes: sec.scenes }];
    render(
      '<a class="back" href="#/talk">' + I.back + 'Conversations</a>' +
      '<span class="eyebrow">' + sec.icon + ' Conversations</span>' +
      '<h1 class="title">' + esc(sec.title) + (sec === mySection() ? ' <span class="pill good">For you</span>' : '') + '</h1>' +
      '<p class="lede">' + esc(sec.about) + '.</p>' +
      groups.map(function(g){
        var gmin = g.id === 'senior' ? 'advanced' : sectionMinLevel(sec);
        return (g.title ? '<h2 class="section-title">' + esc(g.title) + (g === sub ? ' <span class="pill good">For you</span>' : '') + (levelAllows(gmin) ? '' : ' <span class="pill">🔒 ' + esc(levelById(gmin).name) + '</span>') + '</h2>' : '') +
          '<div class="list">' + g.scenes.map(sceneById).filter(Boolean).map(sceneRow).join('') + '</div>';
      }).join('')
    );
  }

  function talk(id){
    var s = sceneById(id);
    if (!s) return talkHome();
    if (!levelAllows(sceneMinLevel(id))) {
      setTab('talk');
      return render('<a class="back" href="#/talks/' + sectionOf(id).id + '">' + I.back + 'Conversations</a>' +
        '<article class="card pad done"><span class="ic big-ic">🔒</span><h1 class="title">' + esc(s.title) + '</h1>' +
        '<p class="lede">' + esc(lockNote(sceneMinLevel(id))) + '. Until then, practise the conversations for your level.</p>' +
        '<div class="row" style="justify-content:center;margin-top:18px"><a class="btn primary" href="#/talk">Conversations for you' + I.chev + '</a></div></article>');
    }
    setTab('talk');
    var history = [];   // what the server sees: learner turns and the character's raw replies
    var busy = false, rec = null, lastReply = s.say || s.opening, typing = !SR;

    render(
      '<section class="chat-view">' +
        '<header class="chat-top">' +
          '<a class="icon-btn" href="#/talks/' + sectionOf(s.id).id + '" aria-label="Back to conversations">' + I.back + '</a>' +
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
        (ml ? '<button type="button" data-a="ml" lang="' + nativeLang() + '">' + ({ ml: 'മലയാളം', hi: 'हिंदी', ta: 'தமிழ்' }[nativeLang()] || 'Translation') + '</button>' : '') + '</div>' +
        (ml ? '<p class="coach mal" lang="' + nativeLang() + '" hidden>' + esc(ml) + '</p>' : '')));
      b.querySelector('[data-a=say]').onclick = function(){ speak(spoken || text); };
      b.querySelector('[data-a=slow]').onclick = function(){ speak(spoken || text, true); };
      var mlBtn = b.querySelector('[data-a=ml]');
      if (mlBtn) mlBtn.onclick = function(){ var p = b.querySelector('.coach'); p.hidden = !p.hidden; };
      if (phrase && phrase.phrase) {
        var saved = state.phrases.some(function(x){ return x.phrase === phrase.phrase; });
        var pc = add(el('power', '<div style="flex:1"><span class="lbl">Power phrase</span><b>' + esc(phrase.phrase) + '</b>' +
          '<span class="' + (malayalamHelp() ? 'mal' : 'why') + '"' + (malayalamHelp() ? ' lang="' + nativeLang() + '"' : '') + '>' + esc(phrase.meaning || '') + '</span></div>' +
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
      if (f.explain_ml) coach += '<span class="mal" lang="' + nativeLang() + '">' + esc(f.explain_ml) + '</span>';
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
      apiFetch(TALK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
        body: JSON.stringify({ level: userLevel(), scene: s.id, opening: s.opening, messages: history })
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
        if (d.error === 'access_code' || d.error === 'signin') { failed(b, 'Please sign in again.'); location.hash = '#/signin'; return; }
        if (d.error === 'blocked') { failed(b, 'This account has been paused. Please contact Australian Jeevitham.'); return; }
        if (d.error === 'daily_limit') { failed(b, 'You\'ve used all of today\'s AI actions - they reset tomorrow.'); return; }
        if (d.error === 'refused') { failed(b, 'Let\'s try saying that a different way.'); return; }
        if (d.error || !d.reply) { failed(b, 'Couldn\'t reach your coach. Please try again.'); input.value = text; return; }
        feedback(b, text, d);
        if (speaking) paceNote(b, text, speaking);
        history.push({ role: 'assistant', content: d.raw });
        aiMsg(d.reply, malayalamHelp() ? d.reply_ml : '', null, d.power_phrase, d.spoken);
        showChips(d.suggestions);
        if (typeof d.remaining === 'number') { note.textContent = d.remaining + ' AI action' + (d.remaining === 1 ? '' : 's') + ' left today'; setQuota(d.remaining); }
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

    // Voice: tap to talk, tap again to stop. Words appear live in the chat as you speak.
    if (mic) mic.onclick = function(){
      if (busy) return;
      if (rec) { rec.stop(); return; }
      stopSpeech();
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

    aiMsg(s.opening, malayalamHelp() ? nat(s, 'opening_ml') : '', s.say);

    // Load this scene into the server's cache while the learner reads the opening line,
    // so their first reply comes back as quickly as later ones.
    if (TALK_API && hasAccess()) {
      apiFetch(TALK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Access-Code': getCode() },
        body: JSON.stringify({ warm: true, level: userLevel(), scene: s.id, opening: s.opening })
      }).catch(function(){});
    }
  }

  /* ---------- Slang ---------- */
  function slang(){
    setTab('learn');
    render(
      '<a class="back" href="#/learn">' + I.back + 'Learn</a>' +
      '<span class="eyebrow">' + eng().slang + '</span>' +
      '<h1 class="title">Words you\'ll hear every day</h1>' +
      '<p class="lede">Tap a card to see what it means.</p>' +
      '<div class="slang">' + curSlang().map(function(s, i){
        return '<div class="card flip" role="button" tabindex="0" aria-expanded="false" data-i="' + i + '">' +
          '<button class="say" type="button" data-i="' + i + '" aria-label="Listen to ' + esc(s.word) + '">' + I.speaker + '</button>' +
          '<div class="w">' + esc(s.word) + '</div>' +
          '<div class="hint">Tap to see meaning</div>' +
          '<div class="back-side">= ' + esc(s.means) + natHtml(s, 'mal', 'span') + '<em>“' + esc(s.ex) + '”</em></div>' +
        '</div>';
      }).join('') + '</div>'
    );
    app.querySelectorAll('.flip').forEach(function(card){
      function toggle(){
        var open = card.classList.toggle('open');
        card.setAttribute('aria-expanded', open);
        if (open) { speak(curSlang()[+card.dataset.i].ex); markActive(); }
      }
      card.onclick = toggle;
      card.onkeydown = function(e){ if (e.target === card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); } };
    });
    app.querySelectorAll('.say').forEach(function(b){
      b.onclick = function(e){ e.stopPropagation(); speak(curSlang()[+b.dataset.i].word); };
    });
  }

  /* ---------- Tips ---------- */
  function tips(){
    setTab('tips');
    render(
      '<span class="eyebrow">Culture</span>' +
      '<h1 class="title">Working and living in ' + eng().country + '</h1>' +
      '<p class="lede">The unwritten rules that help you fit in from day one.</p>' +
      '<div class="tips">' + curTips().map(function(t){
        return '<div class="card tipcard"><h2>' + esc(t.title) + '</h2>' + (t.en ? '<p>' + esc(t.en) + '</p>' : '') + natHtml(t, '') + '</div>';
      }).join('') + '</div>'
    );
  }

  /* ---------- Router ---------- */
  function route(){
    stopSpeech();
    document.querySelectorAll('.sheet-bg').forEach(function(x){ x.remove(); });
    var parts = location.hash.replace(/^#\/?/, '').split('?')[0].split('/');
    var g = gate(parts[0]);
    showLevelBadge();
    if (g === 'wait') return waitPage();
    if (g === 'signin') return signinPage();
    if (g === 'verify') return verifyPage();
    if (g === 'profile' || (parts[0] === 'profile' && me)) return profilePage();
    if (g === 'english') return englishPage();
    if (g === 'placement') return examRun('placement');
    if (parts[0] === 'signin') signinPage();
    else if (parts[0] === 'account') accountPage();
    else if (parts[0] === 'privacy' || parts[0] === 'terms') legalPage(parts[0]);
    else if (parts[0] === 'learn') learn();
    else if (parts[0] === 'lesson') lesson(parts[1], parseInt(parts[2], 10) || 0);
    else if (parts[0] === 'practise') practise();
    else if (parts[0] === 'help') help();
    else if (parts[0] === 'voice') voicePage();
    else if (parts[0] === 'vocab') vocab();
    else if (parts[0] === 'interview') interviewHome();
    else if (parts[0] === 'ielts') ielts(parts[1], parts[2]);
    else if (parts[0] === 'oet') oet(parts[1]);
    else if (parts[0] === 'fluency') fluencyCheck();
    else if (parts[0] === 'listen') listening();
    else if (parts[0] === 'iq') interviewQ(parts[1], parseInt(parts[2], 10) || 0);
    else if (parts[0] === 'words') wordsPage(parts[1]);
    else if (parts[0] === 'sounds') sounds();
    else if (parts[0] === 'sound') sound(parts[1]);
    else if (parts[0] === 'test' || (parts[0] === 'exam' && !parts[1])) examHome();
    else if (parts[0] === 'exam') examRun('levelup');
    else if (parts[0] === 'quiz') quiz(parts[1]);
    else if (parts[0] === 'talk') parts[1] ? talk(parts[1]) : talkHome();
    else if (parts[0] === 'talks') talkSection(parts[1]);
    else if (parts[0] === 'slang') slang();
    else if (parts[0] === 'everyday') everyday();
    else if (parts[0] === 'course') coursePage();
    else if (parts[0] === 'feedback') feedbackPage();
    else if (parts[0] === 'tips') tips();
    else home();
  }
  // A link to the address already showing (for example Home while a test result is shown at "#/")
  // fires no hashchange, so show that page again directly.
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    var h = a.getAttribute('href'), cur = location.hash || '#/';
    if (h === cur || (h === '#/' && cur === '#')) { e.preventDefault(); route(); }
  });
  var lastPage = location.hash || '#/';
  window.addEventListener('hashchange', function(e){
    var from = (e.oldURL || '').split('#')[1];
    if (from && from.indexOf('/feedback') !== 0) lastPage = '#' + from;
    route();
  });
  route();
})();
