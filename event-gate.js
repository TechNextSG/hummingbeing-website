/* Register-first gate for guest-facilitator events.
   Page supplies <script type="application/json" id="reg-config"> with:
   slug, title, priceLine, buttons[{label,href}], altButtons, copy{title,value}, note (html),
   codeNote (html, shown if a discount code was entered), codeHidesButtons (bool).
   Payment URLs live only in that config and are rendered after the form is sent. */
(function () {
  var cfgEl = document.getElementById('reg-config');
  if (!cfgEl) return;
  var cfg; try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { return; }
  var KEY = 'reg-' + cfg.slug;
  var form, step1, step2, box;

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
      '.reg-note-box{background:#faf8f3;border-radius:8px;padding:.7rem .8rem;font-size:.84rem;line-height:1.55;color:var(--body-text);text-align:left;margin:.2rem 0 .6rem}';
    document.head.appendChild(s);
  }
  function fallback(v) {
    var t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(t);
  }
  function renderStep2(first, hasCode) {
    var h = '<div class="reg-ok"><i class="fa-solid fa-circle-check" aria-hidden="true"></i></div>' +
      '<h3 tabindex="-1" id="reg-step2-h">Complete your registration</h3>' +
      '<p>Thank you' + (first ? ', <strong>' + esc(first) + '</strong>' : '') + '. ' + (cfg.priceLine || '') + '</p>';
    if (hasCode && cfg.codeNote) h += '<div class="reg-note-box">' + cfg.codeNote + '</div>';
    var hide = hasCode && cfg.codeHidesButtons;
    (hide ? (cfg.altButtons || []) : (cfg.buttons || [])).forEach(function (b) {
      h += '<a class="btn ' + (hide ? 'btn-outline' : 'btn-primary') + '"' + (hide ? ' style="color:var(--navy);border-color:rgba(36,46,66,.3)"' : '') + ' href="' + esc(b.href) + '" target="_blank" rel="noopener">' + esc(b.label) + '</a>';
    });
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
      save(null); step2.hidden = true; step2.innerHTML = ''; step1.hidden = false;
      var f = form.querySelector('input:not([type=hidden])'); if (f) f.focus();
    });
  }
  function show2(first, hasCode, focus) {
    renderStep2(first, hasCode); step1.hidden = true; step2.hidden = false;
    if (focus) { var h = document.getElementById('reg-step2-h'); if (h) h.focus({ preventScroll: true }); }
  }
  function goto() {
    if (!box) return;
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(function () {
      var t = !step1.hidden ? form.querySelector('input:not([type=hidden])') : document.getElementById('reg-step2-h');
      if (t) t.focus({ preventScroll: true });
    }, 450);
  }
  function init() {
    box = document.getElementById('register'); if (!box) return;
    form = box.querySelector('form.reg-form'); step1 = box.querySelector('.reg-step1'); step2 = box.querySelector('.reg-step2');
    if (!form || !step1 || !step2) return;
    css();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = (fd.get('name') || '').toString().trim(), code = (fd.get('code') || '').toString().trim();
      var parts = [];
      if (fd.get('country')) parts.push('Country: ' + fd.get('country'));
      if (code) parts.push('Discount code: ' + code);
      if (fd.get('message')) parts.push('Message: ' + fd.get('message'));
      try {
        sendLead({
          name: name, email: fd.get('email') || '', phone: fd.get('phone') || '',
          event: fd.get('event') || cfg.title, inquiry: 'Event registration — ' + cfg.title,
          source: fd.get('source') || document.title, message: parts.join(' | '),
          country: fd.get('country') || '', code: code
        });
      } catch (err) {}
      var first = name.split(/\s+/)[0] || '';
      save(JSON.stringify({ first: first, code: !!code }));
      show2(first, !!code, true);
    });
    var saved = null; try { saved = JSON.parse(load() || 'null'); } catch (e) {}
    if (saved) show2(saved.first, saved.code, false);
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href="#register"]');
      if (a) { e.preventDefault(); try { history.replaceState(null, '', '#register'); } catch (x) {} goto(); }
    });
    if (location.hash === '#register') setTimeout(goto, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
