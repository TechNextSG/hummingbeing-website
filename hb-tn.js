/* hummingbeing.com - funnel layer (8 Nov 2026, preview branch technext-style).
   1) Every .tn-lead-form sends the lead through sendLead() (Google Sheet + email, same backend as before),
      then shows a thank-you with "Pick a time now" (Calendly), so every booking is a known lead first.
   2) Home "Next events" feed: the next 3 bookable events, read from /events (the single source of truth).
   3) Calm site: hero videos on older pages show their still poster instead of playing. */
(function () {
  'use strict';
  var d = document;
  function track(ev, p) { try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, p || {})); } catch (e) {} }

  /* ---------- 1. lead forms ---------- */
  function initForm(f) {
    if (f.dataset.tnOn) return; f.dataset.tnOn = '1';
    var t0 = Date.now(), started = false;
    var err = f.querySelector('.tn-form-err'), card = f.closest('.tn-formcard'), ok = card && card.querySelector('.tn-form-ok');
    f.addEventListener('input', function () { if (!started) { started = true; track('form_start', { form_source: f.dataset.source || '' }); } }, { once: false });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { var el = f.elements[n]; return el ? String(el.value || '').trim() : ''; };
      var need = ['fullname', 'email', 'phone'], bad = [];
      need.forEach(function (n) { var el = f.elements[n]; if (!el) return; var x = v(n);
        var invalid = !x || (n === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x)) || (n === 'phone' && x.replace(/\D/g, '').length < 7);
        el.setAttribute('aria-invalid', invalid ? 'true' : 'false'); if (invalid) bad.push(el); });
      var cons = f.querySelector('input[name="consent"][required]');
      if (cons && !cons.checked) bad.push(cons);
      if (bad.length) { if (err) err.hidden = false; bad[0].focus(); return; }
      if (err) err.hidden = true;
      if (v('_honey') || Date.now() - t0 < 3000) { done(); return; } /* bots: pretend success, send nothing */
      var gd = f.querySelector('[name="gdpr_consent"]');
      var data = {
        name: v('fullname'), email: v('email'), phone: v('phone'),
        event: '', inquiry: v('interest') || 'Free discovery call',
        source: (f.dataset.source || 'Free call form') + ' · ' + (location.pathname === '/' ? 'home' : location.pathname.replace(/^\//, '').replace(/\.html$/, '')),
        message: v('message')
      };
      if (gd && gd.value) data.gdpr_consent = gd.value;
      var btn = f.querySelector('button[type=submit]'); if (btn) { btn.disabled = true; btn.style.opacity = '.7'; }
      try { if (typeof window.sendLead === 'function') window.sendLead(data); } catch (x) {}
      track('generate_lead', { form_source: data.source, interest: data.inquiry });
      done();
    });
    function done() {
      f.hidden = true;
      var head = card && card.querySelector('.tn-form-head'); if (head) head.hidden = true;
      if (ok) { ok.hidden = false; ok.focus({ preventScroll: true }); }
    }
  }
  var PAGE_INTEREST = { '/holistic-mastermind': '1:1 TRE™ sessions', '/tre-certification': 'TRE™ certification', '/retreats-workshops': 'Retreat or team workshop' };
  function forms() {
    var hint = (d.querySelector('[data-interest]') || {}).getAttribute ? d.querySelector('[data-interest]').getAttribute('data-interest') : PAGE_INTEREST[location.pathname.replace(/\.html$/, '')];
    d.querySelectorAll('form.tn-lead-form').forEach(function (f) {
      initForm(f);
      var sel = f.elements.interest;
      if (hint && sel && !sel.value) [].forEach.call(sel.options, function (o) { if (o.text === hint) sel.value = o.value || o.text; });
    });
  }

  /* any "book a call" link on the page jumps to the page's own form (no page change, no lost visitor) */
  function localBook() {
    var form = d.getElementById('start') || d.getElementById('contact-form'); if (!form) return;
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href="/book"],a[href="/#start"],a[href="#start"]');
      if (!a || a.closest('nav .nav-links')) return;
      e.preventDefault(); track('cta_click', { cta: a.dataset.cta || a.textContent.trim().slice(0, 40) });
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var first = form.querySelector('input:not([type=hidden]):not(.tn-hp)'); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 450);
    });
  }

  /* ---------- 2. next events feed ---------- */
  function feed() {
    var box = d.getElementById('tn-evts'); if (!box) return;
    var max = +box.dataset.max || 3;
    fetch('/events', { credentials: 'same-origin' }).then(function (r) { return r.text(); }).then(function (h) {
      var doc = new DOMParser().parseFromString(h, 'text/html');
      var now = new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10); /* SGT date */
      var seen = {}, list = [];
      doc.querySelectorAll('#evt-grid article.evt-card').forEach(function (c) {
        if (c.hasAttribute('data-sold') || c.classList.contains('is-sold')) return;
        var end = c.getAttribute('data-end') || c.getAttribute('data-start') || ''; if (end && end < now) return;
        var a = c.querySelector('.evt-card-thumb, h3 a, a[href^="/event"]'); if (!a) return;
        var href = a.getAttribute('href').split('#')[0]; if (seen[href]) return; seen[href] = 1;
        var img = c.querySelector('img'), date = c.querySelector('.evt-date-tag'), loc = c.querySelector('.evt-tag.loc');
        list.push({ s: c.getAttribute('data-start') || '9999', href: href, title: (c.querySelector('h3') || {}).textContent || '',
          img: img ? img.getAttribute('src') : '', alt: img ? img.getAttribute('alt') : '', date: date ? date.textContent : '', loc: loc ? loc.textContent : '' });
      });
      list.sort(function (a, b) { return a.s < b.s ? -1 : 1; });
      if (!list.length) return;
      box.innerHTML = list.slice(0, max).map(function (e) {
        var esc = function (s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
        return '<a class="tn-card tn-evt" href="' + esc(e.href) + '"><img src="/' + esc(e.img.replace(/^\//, '')) + '" alt="' + esc(e.alt) + '" loading="lazy" decoding="async" width="640" height="360">' +
          '<div><span class="tn-d">' + esc(e.date) + '</span><h3>' + esc(e.title.trim()) + '</h3><span class="tn-where">' + esc(e.loc || '') + '</span></div></a>';
      }).join('');
    }).catch(function () {});
  }

  /* ---------- 3. calm: still posters instead of looping hero videos ---------- */
  function calmVideos() {
    d.querySelectorAll('video.hero-video, .page-hero video, .event-hero video, .hero video').forEach(function (v) {
      v.removeAttribute('autoplay'); v.autoplay = false; v.preload = 'none'; try { v.pause(); } catch (e) {}
    });
  }

  function go() { calmVideos(); forms(); localBook(); feed(); setTimeout(forms, 600); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', go); else go();
})();

/* ---------- home hero (9 Nov 2026): silk lines, breathing label, pointer depth, count-up ---------- */
(function () {
  'use strict';
  var hero = document.querySelector('.hb-hero'); if (!hero) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  /* silk: fine gold lines drifting like breath */
  var cv = hero.querySelector('.hb-silk'), ctx = cv && cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), t0 = performance.now(), on = true;
  function size() { if (!cv) return; var r = hero.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function draw(now) {
    if (!ctx) return; var t = (now - t0) / 1000; ctx.clearRect(0, 0, W, H);
    var n = 16;
    for (var i = 0; i < n; i++) {
      var k = i / (n - 1), a = .05 + .16 * Math.sin(Math.PI * k);
      ctx.beginPath(); ctx.lineWidth = i % 5 === 2 ? 1.3 : .8; ctx.strokeStyle = 'rgba(245,166,35,' + a.toFixed(3) + ')';
      for (var x = -20; x <= W + 20; x += 14) {
        var u = x / W, base = H * (.58 + .34 * k) - u * H * .38;
        var y = base + Math.sin(u * 5.2 + t * .35 + k * 2.4) * (18 + 26 * k) + Math.sin(u * 11 - t * .22 + i) * 6;
        if (x === -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    if (!reduce && on) requestAnimationFrame(draw);
  }
  size(); requestAnimationFrame(draw);
  window.addEventListener('resize', function () { size(); if (reduce) requestAnimationFrame(draw); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { var v = es[0].isIntersecting; if (v && !on && !reduce) { on = true; requestAnimationFrame(draw); } on = v; }).observe(hero);
  /* breathing label, in time with the rings (8 s cycle) */
  var lab = hero.querySelector('.hb-blabel');
  if (lab && !reduce) { var inh = true; setInterval(function () { inh = !inh; lab.textContent = inh ? 'Breathe in' : 'Breathe out'; }, 4000); }
  /* pointer depth on chips + rings */
  var stage = hero.querySelector('.hb-stage'), layers = [].slice.call(hero.querySelectorAll('[data-depth]')), rings = hero.querySelector('.hb-rings'), isa = hero.querySelector('.hb-isa');
  if (fine && !reduce && stage) {
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    hero.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5; if (!raf) raf = requestAnimationFrame(step); });
    hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(step); });
    function step() {
      cx += (tx - cx) * .08; cy += (ty - cy) * .08;
      layers.forEach(function (l) { var d = +l.dataset.depth; l.style.translate = (cx * d).toFixed(1) + 'px ' + (cy * d).toFixed(1) + 'px'; });
      if (rings) rings.style.translate = (cx * -12).toFixed(1) + 'px ' + (cy * -12).toFixed(1) + 'px';
      if (isa) isa.style.translate = (cx * 8).toFixed(1) + 'px 0';
      raf = (Math.abs(tx - cx) > .001 || Math.abs(ty - cy) > .001) ? requestAnimationFrame(step) : 0;
    }
  }
  /* count-up facts */
  if (!reduce) hero.querySelectorAll('[data-count]').forEach(function (b, i) {
    var to = +b.dataset.count, suf = b.dataset.suffix || '', st = null; b.textContent = '0' + suf;
    setTimeout(function () { requestAnimationFrame(function tick(now) { if (!st) st = now; var p = Math.min(1, (now - st) / 1400); b.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(tick); }); }, 900 + i * 150);
  });
})();

/* ---------- icons without tiles + gentle motion; cards without glow; chatbot a11y (9 Nov) ---------- */
(function () {
  'use strict';
  var SKIP = 'nav, footer, .btn, button, .soc, .top-float, .wa-float, .hb-chat-btn, .hb-chat-win, .tn-form, .gdpr-box, .evt-tag, .evt-date-tag, .ecx, .hb-hero, .hb-world, .hm-node, [class*="orbit"], .hm-map, .hm-sys';
  function filled(cs) { return (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') || (cs.backgroundImage && cs.backgroundImage !== 'none'); }
  function run() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var io = !reduce && 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('hb-ico-in'); io.unobserve(e.target); } }); }, { threshold: .4 }) : null;
    document.querySelectorAll('i[class*="fa-"]').forEach(function (i) {
      if (i.closest(SKIP)) return;
      var p = i.parentElement, target = null, ci = getComputedStyle(i);
      if (filled(ci) && parseFloat(ci.width) >= 28) target = i;
      else if (p && p.children.length === 1 && !p.textContent.trim()) target = p;
      if (!target) return;
      target.classList.add('hb-ico');
      if (io) { target.classList.add('hb-ico-anim'); io.observe(target); }
      var host = target.parentElement, k = 0;
      while (host && k < 4 && host !== document.body) { if (/card|item|path|tile|box|step|trait|fact|feature|offer|pill|cell|panel|node/i.test(typeof host.className === 'string' ? host.className : '')) { host.classList.add('hb-ico-host'); break; } host = host.parentElement; k++; }
    });
    document.querySelectorAll('[class*="card"],[class*="path"],[class*="panel"],[class*="offer"],[class*="tile"]').forEach(function (c) {
      if (c.closest('.hb-hero, nav, footer')) return;
      ['::before', '::after'].forEach(function (ps) { var bi = getComputedStyle(c, ps).backgroundImage || ''; if (/radial-gradient/.test(bi)) c.classList.add('hb-noglow'); });
    });
  }
  function chat() {
    var x = document.getElementById('hb-chat-x'), btn = document.getElementById('hb-chat-btn'), inp = document.getElementById('hb-input'), send = document.querySelector('.hb-send'), win = document.getElementById('hb-chat-win');
    if (!win) return;
    if (x) x.setAttribute('aria-label', 'Close chat');
    if (send) send.setAttribute('aria-label', 'Send message');
    if (inp) inp.setAttribute('aria-label', 'Type your question');
    if (btn) { btn.setAttribute('role', 'button'); btn.setAttribute('tabindex', '0'); btn.setAttribute('aria-label', 'Open chat'); btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } }); }
    win.setAttribute('role', 'dialog'); win.setAttribute('aria-label', 'HummingBeing assistant');
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && win.classList.contains('open')) { win.classList.remove('open'); if (btn) btn.focus(); } });
    win.addEventListener('click', function (e) {
      var a = e.target.closest('a.hb-link-btn'), start = document.getElementById('start');
      if (a && start && /\/book\b/.test(a.getAttribute('href') || '')) { e.preventDefault(); win.classList.remove('open'); start.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  }
  function go() { setTimeout(function () { run(); chat(); }, 60); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();

/* ---------- compact descriptions (9 Nov): card text to 3 lines with "More"; long text columns fold after 2 paragraphs ---------- */
(function () {
  'use strict';
  var SKIP = 'nav, footer, form, .hb-chat-win, .tn-faq, details, .faq-item, .hb-faq, .hb-hero, .tn-lead, .evt-card, .home-evt-card, .ecx, .gdpr-box, blockquote, [class*="quote"], [class*="testi"], .hb-world, .steps, .step, .hb-q, .hb-bird, .hx-opanel, [class*="opanel"], .rw-arc, .tc-how, .hb-globe';
  var CARD = /(^|\s)([\w-]*card[\w-]*|[\w-]+-item|[\w-]+-path|[\w-]+-step|step|[\w-]*trait[\w-]*|[\w-]*pillar[\w-]*|[\w-]*offer[\w-]*|[\w-]+-panel|[\w-]+-fact|[\w-]+-box|philo-item)(\s|$)/;
  function btn(label) { var b = document.createElement('button'); b.type = 'button'; b.className = 'hb-more'; b.textContent = label; b.setAttribute('aria-expanded', 'false'); return b; }
  function clampCards() {
    document.querySelectorAll('main p, section p').forEach(function (p) {
      if (p.closest(SKIP) || p.dataset.hbC) return;
      var host = p.parentElement, k = 0, inCard = false;
      while (host && k < 4) { if (CARD.test(typeof host.className === 'string' ? host.className : '')) { inCard = true; break; } host = host.parentElement; k++; }
      if (!inCard) return;
      var lh = parseFloat(getComputedStyle(p).lineHeight) || 22;
      if (p.scrollHeight <= lh * 2.4) return;
      p.dataset.hbC = '1'; p.classList.add('hb-clamp');
      var b = btn('More'); p.after(b);
      b.addEventListener('click', function () { var o = p.classList.toggle('hb-open'); b.setAttribute('aria-expanded', o ? 'true' : 'false'); b.textContent = o ? 'Less' : 'More'; });
    });
  }
  function foldColumns() {
    var seen = new Set();
    document.querySelectorAll('main p, section p').forEach(function (p) {
      var col = p.parentElement; if (!col || seen.has(col) || p.closest(SKIP)) return; seen.add(col);
      if (CARD.test(typeof col.className === 'string' ? col.className : '')) return;
      var ps = [].filter.call(col.children, function (c) { return c.tagName === 'P' && !c.classList.contains('hb-clamp') && c.textContent.trim().length > 60; });
      if (ps.length < 3) return;
      var rest = ps.slice(2), words = rest.reduce(function (n, x) { return n + x.textContent.split(/\s+/).length; }, 0);
      if (words < 25) return;
      rest.forEach(function (x) { x.classList.add('hb-fold-rest'); x.hidden = true; });
      var b = btn('Read more'); rest[rest.length - 1].after(b);
      b.addEventListener('click', function () { var open = b.getAttribute('aria-expanded') !== 'true'; rest.forEach(function (x) { x.hidden = !open; }); b.setAttribute('aria-expanded', open ? 'true' : 'false'); b.textContent = open ? 'Show less' : 'Read more'; });
    });
  }
  function go() { setTimeout(function () { foldColumns(); clampCards(); }, 120); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();

/* ---------- section video loops (9 Nov): silent, play only while on screen, poster only for reduced motion ---------- */
(function () {
  'use strict';
  var vids = [].slice.call(document.querySelectorAll('video[data-hb-vid]'));
  if (!vids.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  vids.forEach(function (v) { v.muted = true; v.setAttribute('muted', ''); v.removeAttribute('controls'); });
  if (reduce || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { if (v.preload === 'none') { v.preload = 'auto'; v.load(); } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else v.pause();
    });
  }, { threshold: .25 });
  vids.forEach(function (v) { io.observe(v); });
})();

/* ---------- primary buttons: dark-blue wave layer (9 Nov) ---------- */
(function () {
  'use strict';
  var SEL = '.btn, .tn-btn, .nav-cta, .hb-link-btn, .tn-form button[type=submit], #contact-form button[type=submit]';
  var NOT = /(^|\s)(btn-outline|evt-btn-2|home-evt-btn2|tn-btn-2|btn-secondary|btn-dark|btn-soldout|btn-ended|ce-soldbtn)(\s|$)/;
  function add(root) {
    (root || document).querySelectorAll(SEL).forEach(function (b) {
      if (b.classList.contains('hb-has-wave') || NOT.test(b.className) || b.closest('.hb-chat-btn')) return;
      var w = document.createElement('span'); w.className = 'hb-wave'; w.setAttribute('aria-hidden', 'true');
      b.insertBefore(w, b.firstChild); b.classList.add('hb-has-wave');
    });
  }
  function go() { add(); setTimeout(add, 900); setTimeout(add, 2500); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  var mo = new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) add(n.parentNode || n); }); }); });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
