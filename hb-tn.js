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
  /* 25 Nov 2026 a11y audit (WCAG 2.2.2): tap / click / Enter / Space pauses a loop and plays it again; a paused loop
     stays paused when it scrolls back into view */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { if (v.dataset.hbPaused) return; if (v.preload === 'none') { v.preload = 'auto'; v.load(); } var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else v.pause();
    });
  }, { threshold: .25 });
  vids.forEach(function (v) {
    io.observe(v);
    v.setAttribute('tabindex', '0'); v.setAttribute('role', 'button'); v.setAttribute('aria-label', 'Pause video'); v.style.cursor = 'pointer';
    var toggle = function () {
      if (v.paused) { delete v.dataset.hbPaused; var p = v.play(); if (p && p.catch) p.catch(function () {}); v.setAttribute('aria-label', 'Pause video'); }
      else { v.dataset.hbPaused = '1'; v.pause(); v.setAttribute('aria-label', 'Play video'); }
    };
    v.addEventListener('click', toggle);
    v.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
})();

/* ---------- primary buttons: dark-blue wave layer (9 Nov) ---------- */
(function () {
  'use strict';
  var SEL = '.btn, .tn-btn, .nav-cta, .hb-link-btn, .tn-form button[type=submit], #contact-form button[type=submit]';
  var NOT = /(^|\s)(btn-outline|evt-btn-2|home-evt-btn2|tn-btn-2|btn-secondary|btn-dark|btn-soldout|btn-ended|ce-soldbtn)(\s|$)/;
  function add(root) {
    (root || document).querySelectorAll(SEL).forEach(function (b) {
      if (b.classList.contains('hb-has-wave') || NOT.test(b.className) || b.closest('.hb-chat-btn')) return;
      var w = document.createElement('span'); w.className = 'hb-bwave'; w.setAttribute('aria-hidden', 'true');
      b.insertBefore(w, b.firstChild); b.classList.add('hb-has-wave');
    });
  }
  function go() { add(); setTimeout(add, 900); setTimeout(add, 2500); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  var mo = new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) add(n.parentNode || n); }); }); });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();

/* ---------- Odoo native forms (24 Nov 2026) ----------
   When this site is served by Odoo (www.hummingbeing.com = bhdasia database, website 2), every form that
   calls sendLead() is answered by Odoo itself instead of the Google Sheet:
   - free-call / contact / programme enquiries and event registrations -> CRM lead (website_crm form,
     team "BHD Asia - all websites", salesperson Isabelle, so Odoo emails her each lead);
   - newsletter sign-ups (inquiry "Newsletter signup") -> Email Marketing list "HummingBeing newsletter".
   Odoo protects its public forms with Cloudflare Turnstile, so pages with a form load the same invisible
   Turnstile widget Odoo's own forms use and keep a fresh token ready (no wait before the event-payment
   redirect). Anything Odoo refuses (no token, failed check, error) goes to the Lead Capture sheet as before,
   so no lead is ever lost. Bot-looking leads keep the "Possible spam" title. Off Odoo nothing changes. */
(function () {
  'use strict';
  var O = window.odoo;
  if (!O || !O.csrf_token || typeof window.sendLead !== 'function') return;
  var LIST_ID = 2, SITEKEY = '0x4AAAAAAFzBZajh6muadkH3';
  var SHEET = window.LEAD_ENDPOINT;
  /* page -> Odoo event (bhdasia DB, synced 24 Nov 2026): registration leads carry the event in CRM */
  var EVENTS = { '/event-body-in-the-room': 5, '/event-breath-as-medicine': 12, '/event-art-of-conscious-rest': 13,
    '/event-intro-tre-singapore-2027': 14, '/event-shaking-to-shaping-singapore': 15, '/event-tre-module1-lisbon': 16,
    '/event-tre-certification-lisbon': 17, '/event-tre-module1-online-scotland': 18, '/event-certification-2027': 6,
    '/event-certification-2027-foundational': 6, '/event-certification-2027-growth': 6, '/event-certification-2027-refresher': 6 };
  var tok = null, wid = null, box = null, waiters = [];
  function hasForm() { return !!document.querySelector('form.tn-lead-form, #contact-form, #reg-config, form input[type=email]'); }
  function gotToken(t) { tok = t; var w = waiters; waiters = []; w.forEach(function (f) { f(t); }); }
  function render() {
    if (!window.turnstile || wid !== null) return;
    box = document.createElement('div'); box.className = 'hb-ts';
    /* 25 Nov 2026 phone audit: the widget stays invisible unless Cloudflare needs the visitor to tick "Verify you are
       human"; when it does, that box belongs in the main form above its button, not pinned over the page corner. */
    var forms = [].slice.call(document.querySelectorAll('form')).filter(function (f) { return f.querySelector('input[type=email]'); });
    forms.sort(function (a, b) { return b.querySelectorAll('input,select,textarea').length - a.querySelectorAll('input,select,textarea').length; });
    var f = forms[0], btn = f && f.querySelector('button[type=submit], input[type=submit], button:not([type])');
    /* collapsed (no empty gap above the button) until Cloudflare actually asks for the tick */
    var SHUT = 'height:0;margin:0;max-width:100%;overflow:hidden', OPEN = 'height:auto;margin:.6rem 0;max-width:100%;overflow:hidden';
    if (btn && btn.parentNode) { box.style.cssText = SHUT; btn.parentNode.insertBefore(box, btn); }
    else if (f) { box.style.cssText = SHUT; f.appendChild(box); }
    else { SHUT = 'position:fixed;left:12px;bottom:12px;z-index:2147483000;height:0;overflow:hidden'; OPEN = 'position:fixed;left:12px;bottom:12px;z-index:2147483000';
      box.style.cssText = SHUT; document.body.appendChild(box); }
    try {
      wid = window.turnstile.render(box, { sitekey: SITEKEY, appearance: 'interaction-only', action: 'website_form',
        callback: gotToken, 'expired-callback': function () { tok = null; },
        'error-callback': function () { tok = null; },
        'before-interactive-callback': function () { box.style.cssText = OPEN; },
        'after-interactive-callback': function () { box.style.cssText = SHUT; } });
    } catch (e) { wid = null; }
  }
  function loadTs() {
    if (window.turnstile) { render(); return; }
    if (document.getElementById('hb-ts-api')) return;
    var sc = document.createElement('script'); sc.id = 'hb-ts-api'; sc.async = true;
    sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    sc.onload = render; document.head.appendChild(sc);
  }
  function token(ms) {   /* a fresh token, or null after ms */
    if (tok) { var t = tok; tok = null; return Promise.resolve(t); }
    loadTs();
    return new Promise(function (res) {
      var done = false, f = function (t) { if (!done) { done = true; tok = null; res(t); } };
      waiters.push(f); setTimeout(function () { f(null); }, ms);
    });
  }
  function reset() { try { if (window.turnstile && wid !== null) window.turnstile.reset(wid); } catch (e) {} }
  function sheet(d) {
    try { return fetch(SHEET, { method: 'POST', body: new URLSearchParams(d), keepalive: true }).catch(function () {}); }
    catch (e) { return Promise.resolve(); }
  }
  function lead(d, t) {
    var fd = new FormData();
    fd.append('csrf_token', O.csrf_token);
    fd.append('turnstile_captcha', t);
    /* 25 Nov 2026 lead audit: every registration title names its event; Notes are HTML lines (Odoo's description
       is an HTML field, plain newlines collapsed into one paragraph); no line twice; Book page "event" = location. */
    var inq = d.inquiry || 'Website enquiry';
    if (/^Event registration enquiry$/i.test(inq)) {
      var pt = (document.title || '').split('|')[0].trim();
      inq = 'Event registration — ' + (pt || d.source || 'event');   /* the chosen option is in the Notes */
    }
    fd.append('name', inq + (d.name ? ' — ' + d.name : ''));
    fd.append('contact_name', d.name || '');
    fd.append('email_from', d.email || '');
    fd.append('phone', d.phone || '');
    var evId = EVENTS[location.pathname.replace(/\.html$/, '').replace(/\/$/, '')];
    if (evId && /registration/i.test(inq)) fd.append('event_id', String(evId));
    var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    var LABEL = { source: 'Source', event: /Book a Session/i.test(d.source || '') ? 'Location' : 'Event / option', country: 'Country',
      code: 'Discount code', payment_plan: 'Payment plan', gdpr_consent: 'Consent' };
    var lines = ['Website: HummingBeing', 'Page: ' + location.href];
    ['source', 'event', 'country', 'code', 'payment_plan', 'gdpr_consent'].forEach(function (k) { if (d[k]) lines.push(LABEL[k] + ': ' + d[k]); });
    var extra = String(d.message || '').split(/\s*\|\s*/).filter(function (p) {
      if (!p) return false;
      if (/^Payment plan:/i.test(p) && d.payment_plan) return false;
      if (/^Country:/i.test(p) && d.country) return false;
      if (/^GDPR:/i.test(p) && d.gdpr_consent) return false;
      if (/^Discount code:/i.test(p) && d.code && p.indexOf('(') < 0) return false;
      return true;
    });
    var html = lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('');
    if (extra.length) html += '<p><b>Message</b></p>' + extra.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('');
    fd.append('description', html);
    return fetch('/website/form/crm.lead', { method: 'POST', body: fd, credentials: 'same-origin', keepalive: true })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) { if (!j || !j.id) throw new Error('lead not saved'); return j; });
  }
  function subscribe(email, t) {
    return fetch('/website_mass_mailing/subscribe', {
      method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params: { list_id: LIST_ID, value: email, subscription_type: 'email', turnstile_captcha: t } })
    }).then(function (r) { return r.json(); })
      .then(function (j) {
        var res = j && j.result;
        if (!j || j.error || !res || res.toast_type === 'danger' || res.toast_type === 'warning') throw new Error('subscribe refused');
        return j;
      });
  }
  window.sendLead = function (data) {
    data = data || {};
    if (!data.gdpr_consent && window.gdprConsentSummary) { try { data.gdpr_consent = window.gdprConsentSummary(); } catch (e) {} }
    var bot = false;
    try { bot = window.leadLooksLikeBot(data); } catch (e) {}
    if (bot && !/^Possible spam/.test(data.inquiry || '')) data.inquiry = 'Possible spam — ' + (data.inquiry || '');
    var news = !bot && data.email && /newsletter/i.test(data.inquiry || '');
    return token(2500).then(function (t) {
      if (!t) throw new Error('no turnstile token');
      return news ? subscribe(data.email, t) : lead(data, t);
    }).then(function (j) { reset(); return j; }, function () { reset(); return sheet(data); });
  };
  function boot() { if (hasForm()) loadTs(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
