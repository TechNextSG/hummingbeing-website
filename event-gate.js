/* Register-first gate for guest-facilitator events.
   Page supplies <script type="application/json" id="reg-config"> with:
   slug, title, priceLine, buttons[{label,href}], altButtons, copy{title,value}, note (html),
   codeNote (html, shown if a discount code was entered), codeHidesButtons (bool),
   discount {sha256 (hex SHA-256 of the UPPERCASE code), label, href, priceLine} (optional),
   privacyUrl (optional; linked from the consent box when the site has a policy page).
   Payment URLs live only in that config and are rendered after the form is sent.
   2026-10-19: required consent + optional updates checkbox on every gate form; events with
   ONE payment link redirect to it (same tab) ~1.5 s after a successful submit; a matching
   discount code redirects to the discounted link. Multi-option events (button + copy) keep step 2. */
(function () {
  var cfgEl = document.getElementById('reg-config');
  if (!cfgEl) return;
  var cfg; try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { return; }
  var KEY = 'reg-' + cfg.slug;
  var form, step1, step2, box, timer = null;

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { if (v === null) localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) {} }
  function css() {
    var s = document.createElement('style');
    s.textContent = '.reg-step2{text-align:center}.reg-step2[hidden],.reg-step1[hidden]{display:none}.reg-step2 .reg-ok{font-size:2rem;color:var(--gold);margin-bottom:.4rem}' +
      '.reg-step2 h3{margin:0 0 .4rem}.reg-step2 p{font-size:.9rem;color:var(--body-text);line-height:1.6;margin:0 0 .7rem}' +
      '.reg-step2 h3:focus{outline:none}' +
      '.reg-copy{display:flex;gap:.5rem;align-items:center;justify-content:center;flex-wrap:wrap;margin:.6rem 0;padding:.7rem;border:1.5px dashed rgba(36,46,66,.25);border-radius:8px;background:#faf8f3}' +
      '.reg-copy b{font-family:Lato,sans-serif;font-size:.66rem;letter-spacing:.08em;text-transform:uppercase;color:var(--text-mid);width:100%}' +
      '.reg-copy code{font-family:Lato,sans-serif;font-size:.9rem;font-weight:700;color:var(--navy);word-break:break-all}' +
      '.reg-copy button{font-family:Lato,sans-serif;font-size:.78rem;font-weight:700;border:1px solid var(--gold-dark);background:#fff;color:var(--navy);border-radius:6px;padding:.3rem .7rem;cursor:pointer}' +
      '.reg-copy button:focus-visible,.reg-again:focus-visible{outline:2px solid var(--gold);outline-offset:2px}' +
      '.reg-again{background:none;border:0;padding:0;margin-top:.6rem;font-family:Lato,sans-serif;font-size:.78rem;color:var(--text-mid);text-decoration:underline;cursor:pointer}' +
      '.reg-note-box{background:#faf8f3;border-radius:8px;padding:.7rem .8rem;font-size:.84rem;line-height:1.55;color:var(--body-text);text-align:left;margin:.2rem 0 .6rem}' +
      '.reg-consent{display:flex;flex-direction:column;gap:.55rem;margin:.2rem 0 .9rem}' +
      '.reg-check{display:flex;gap:.6rem;align-items:flex-start;cursor:pointer;font-family:Lato,sans-serif;font-size:.8rem;line-height:1.5;color:var(--body-text);text-transform:none;letter-spacing:0;font-weight:400}' +
      '.reg-check input{flex:0 0 auto;width:18px;height:18px;margin:.1rem 0 0;accent-color:var(--gold-dark);cursor:pointer}' +
      '.reg-check input:focus-visible{outline:2px solid var(--gold);outline-offset:2px}' +
      '.reg-check span{flex:1;min-width:0;overflow-wrap:anywhere}.reg-check a{color:var(--gold-dark);font-weight:600}';
    document.head.appendChild(s);
  }
  function addConsent() {
    if (form.querySelector('[name="consent"]')) return;
    var policy = cfg.privacyUrl ? ', in line with the <a href="' + esc(cfg.privacyUrl) + '" target="_blank" rel="noopener">Privacy Policy</a>' : '';
    var d = document.createElement('div');
    d.className = 'reg-consent';
    d.innerHTML =
      '<label class="reg-check"><input type="checkbox" name="consent" value="yes" required /><span>I agree that my details will be collected and used to process my registration and to contact me about this event' + policy + '.</span></label>' +
      '<label class="reg-check"><input type="checkbox" name="updates" value="yes" /><span>Keep me informed about future events and workshops.</span></label>';
    var btn = form.querySelector('button[type="submit"], button:not([type])');
    form.insertBefore(d, btn || null);
  }
  function fallback(v) {
    var t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(t);
  }
  /* The one payment link this visitor is sent to, or null when step 2 offers several options. */
  function target(hasCode, disc) {
    if (disc && cfg.discount) return { label: cfg.discount.label, href: cfg.discount.href };
    if (cfg.copy || (hasCode && cfg.codeHidesButtons)) return null;
    var b = cfg.buttons || [];
    return b.length === 1 ? b[0] : null;
  }
  function renderStep2(first, hasCode, disc, redirecting) {
    var one = target(hasCode, disc);
    var price = disc && cfg.discount && cfg.discount.priceLine ? cfg.discount.priceLine : (cfg.priceLine || '');
    var who = first ? ', <strong>' + esc(first) + '</strong>' : '';
    var h = '<div class="reg-ok"><i class="fa-solid fa-circle-check" aria-hidden="true"></i></div>' +
      '<h3 tabindex="-1" id="reg-step2-h">Complete your registration</h3>';
    if (redirecting) h += '<p>Thank you' + who + ' &#8212; taking you to the secure payment page&#8230;</p>' + (price ? '<p>' + price + '</p>' : '');
    else h += '<p>Thank you' + who + '. ' + price + '</p>';
    if (hasCode && !disc && cfg.codeNote) h += '<div class="reg-note-box">' + cfg.codeNote + '</div>';
    if (one) {
      h += '<a class="btn btn-primary reg-pay" href="' + esc(one.href) + '">' + esc(one.label) + '</a>';
    } else {
      var hide = hasCode && cfg.codeHidesButtons;
      (hide ? (cfg.altButtons || []) : (cfg.buttons || [])).forEach(function (b) {
        h += '<a class="btn ' + (hide ? 'btn-outline' : 'btn-primary') + '"' + (hide ? ' style="color:var(--navy);border-color:rgba(36,46,66,.3)"' : '') + ' href="' + esc(b.href) + '" target="_blank" rel="noopener">' + esc(b.label) + '</a>';
      });
    }
    if (cfg.copy) h += '<div class="reg-copy"><b>' + esc(cfg.copy.title) + '</b><code>' + esc(cfg.copy.value) + '</code><button type="button" class="reg-copy-btn">Copy</button></div>';
    if (cfg.note) h += '<p class="fine" style="font-size:.8rem;color:var(--text-mid);margin-top:.8rem">' + cfg.note + '</p>';
    h += '<button type="button" class="reg-again">Not you? Register someone else</button>';
    step2.innerHTML = h;
    var cb = step2.querySelector('.reg-copy-btn');
    if (cb) cb.addEventListener('click', function () {
      var v = cfg.copy.value;
      function done() { cb.textContent = 'Copied'; setTimeout(function () { cb.textContent = 'Copy'; }, 2000); }
      try { navigator.clipboard.writeText(v).then(done, function () { fallback(v); done(); }); } catch (e) { fallback(v); done(); }
    });
    step2.querySelector('.reg-again').addEventListener('click', function () {
      if (timer) { clearTimeout(timer); timer = null; }
      save(null); step2.hidden = true; step2.innerHTML = ''; step1.hidden = false;
      var f = form.querySelector('input:not([type=hidden])'); if (f) f.focus();
    });
    return one;
  }
  function show2(first, hasCode, disc, focus, redirecting) {
    var one = renderStep2(first, hasCode, disc, redirecting); step1.hidden = true; step2.hidden = false;
    if (focus) { var h = document.getElementById('reg-step2-h'); if (h) h.focus({ preventScroll: true }); }
    return one;
  }
  function goto() {
    if (!box) return;
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(function () {
      var t = !step1.hidden ? form.querySelector('input:not([type=hidden])') : document.getElementById('reg-step2-h');
      if (t) t.focus({ preventScroll: true });
    }, 450);
  }
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function checkCode(code) {
    if (!code || !cfg.discount || !cfg.discount.sha256) return Promise.resolve(false);
    try {
      var data = new TextEncoder().encode(code.trim().toUpperCase());
      return crypto.subtle.digest('SHA-256', data).then(function (d) { return hex(d) === String(cfg.discount.sha256).toLowerCase(); }, function () { return false; });
    } catch (e) { return Promise.resolve(false); }
  }
  /* Same-tab navigation to the payment page (a hook so a headless test can intercept it). */
  if (!window.__regNavigate) window.__regNavigate = function (url) { location.href = url; };
  function init() {
    box = document.getElementById('register'); if (!box) return;
    form = box.querySelector('form.reg-form'); step1 = box.querySelector('.reg-step1'); step2 = box.querySelector('.reg-step2');
    if (!form || !step1 || !step2) return;
    css();
    addConsent();
    var busy = false;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var fd = new FormData(form);
      if (!fd.get('consent')) { var c = form.querySelector('[name="consent"]'); if (c) { c.focus(); if (c.reportValidity) c.reportValidity(); } return; }
      busy = true;
      var name = (fd.get('name') || '').toString().trim(), code = (fd.get('code') || '').toString().trim();
      var started = Date.now();
      checkCode(code).then(function (disc) {
        var parts = [];
        if (fd.get('country')) parts.push('Country: ' + fd.get('country'));
        if (code) parts.push('Discount code: ' + code + (cfg.discount ? (disc ? ' (valid)' : ' (not recognised)') : ''));
        if (fd.get('message')) parts.push('Message: ' + fd.get('message'));
        parts.push('Consent: yes (' + new Date().toISOString() + ') | Updates: ' + (fd.get('updates') ? 'yes' : 'no'));
        var sent = null;
        try {
          sent = sendLead({
            name: name, email: fd.get('email') || '', phone: fd.get('phone') || '',
            event: fd.get('event') || cfg.title, inquiry: 'Event registration — ' + cfg.title,
            source: fd.get('source') || document.title, message: parts.join(' | '),
            country: fd.get('country') || '', code: code
          });
        } catch (err) {}
        var first = name.split(/\s+/)[0] || '';
        save(JSON.stringify({ first: first, code: !!code, disc: !!disc }));
        var one = target(!!code, disc);
        show2(first, !!code, disc, true, !!one);
        busy = false;
        if (!one) return;
        /* Same tab, ~1.5 s after submit, once the lead calls have gone out (never waits more than 3 s). */
        var minWait = new Promise(function (r) { setTimeout(r, Math.max(0, 1500 - (Date.now() - started))); });
        var sendDone = Promise.race([Promise.resolve(sent).catch(function () {}), new Promise(function (r) { setTimeout(r, 3000); })]);
        Promise.all([minWait, sendDone]).then(function () {
          if (step2.hidden) return;
          timer = setTimeout(function () { timer = null; window.__regNavigate(one.href); }, 0);
        });
      });
    });
    var saved = null; try { saved = JSON.parse(load() || 'null'); } catch (e) {}
    if (saved) show2(saved.first, saved.code, saved.disc, false, false);
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href="#register"]');
      if (a) { e.preventDefault(); try { history.replaceState(null, '', '#register'); } catch (x) {} goto(); }
    });
    if (location.hash === '#register') setTimeout(goto, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
