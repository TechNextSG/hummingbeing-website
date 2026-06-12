/* HummingBeing — scripts.js v4 */

// ── Transparent → solid nav on scroll + hide on scroll-down ───────────────
;(function() {
  var lastY = 0;
  function updateNav() {
    var y = window.scrollY;
    var nav = document.querySelector('nav');
    var topBtn = document.querySelector('.top-float');
    if (nav) {
      // Transparent when at top, solid when scrolled
      if (y > 60) nav.classList.add('scrolled');
      else        nav.classList.remove('scrolled');

      // Hide on scroll-down, reveal on scroll-up
      var dropdownOpen = !!document.querySelector('.nav-dropdown.dropdown-open');
      if (dropdownOpen) {
        nav.classList.remove('nav-hidden');
      } else if (y > lastY && y > 80) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
    }
    if (topBtn) {
      if (y > 400) topBtn.classList.add('visible');
      else         topBtn.classList.remove('visible');
    }
    lastY = y;
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // set correct state on page load
})();

// ── Mobile menu ────────────────────────────────────────────────────────────
function toggleMenu() {
  const ul  = document.querySelector('.nav-links');
  const btn = document.querySelector('.hamburger');
  const open = ul.classList.toggle('nav-open');
  btn.classList.toggle('open', open);
  if (!open) {
    document.querySelectorAll('.nav-dropdown').forEach(function(d) {
      d.classList.remove('dropdown-open');
    });
  }
}

document.addEventListener('click', function(e) {
  const nav = document.querySelector('nav');
  if (!nav || nav.contains(e.target)) return;
  const ul  = document.querySelector('.nav-links');
  const btn = document.querySelector('.hamburger');
  if (ul)  ul.classList.remove('nav-open');
  if (btn) btn.classList.remove('open');
  document.querySelectorAll('.nav-dropdown').forEach(function(d) {
    d.classList.remove('dropdown-open');
  });
});

// ── Services dropdown ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.querySelector('nav');

  document.querySelectorAll('.nav-dropdown-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      var dropdown = this.closest('.nav-dropdown');
      var opening = !dropdown.classList.contains('dropdown-open');
      // close all dropdowns first
      document.querySelectorAll('.nav-dropdown').forEach(function(d) {
        d.classList.remove('dropdown-open');
      });
      if (opening) {
        dropdown.classList.add('dropdown-open');
        // ensure nav is visible so user can reach the menu
        if (nav) nav.classList.remove('nav-hidden');
      }
    });
  });

  // Close dropdown when a sub-link is clicked (before navigation)
  document.querySelectorAll('.nav-dropdown-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-dropdown').forEach(function(d) {
        d.classList.remove('dropdown-open');
      });
    });
  });
});

// ── Scroll animations ──────────────────────────────────────────────────────
var animObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

document.addEventListener('DOMContentLoaded', function() {
  // Cards — staggered fade-up
  document.querySelectorAll('.cards-grid .card').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i % 3 * 0.11) + 's';
    animObserver.observe(el);
  });

  // Steps — staggered fade-up
  document.querySelectorAll('.steps .step').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i * 0.11) + 's';
    animObserver.observe(el);
  });

  // Testimonials — staggered fade-up
  document.querySelectorAll('.testimonial, .testimonial-light').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i % 3 * 0.1) + 's';
    animObserver.observe(el);
  });

  // Social cards
  document.querySelectorAll('.platform-hero, .social-card').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i % 4 * 0.1) + 's';
    animObserver.observe(el);
  });

  // Two-col text slides in from the right; image from the left
  document.querySelectorAll('.two-col-text').forEach(function(el) {
    el.classList.add('anim-right');
    animObserver.observe(el);
  });
  document.querySelectorAll('.two-col-image').forEach(function(el) {
    el.classList.add('anim-left');
    animObserver.observe(el);
  });

  // Stats
  document.querySelectorAll('.stat-item').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i * 0.1) + 's';
    animObserver.observe(el);
  });

  // Event cards
  document.querySelectorAll('.event-card, .event-featured').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i % 3 * 0.1) + 's';
    animObserver.observe(el);
  });
});

// ── CHATBOT ───────────────────────────────────────────────────────────────────
;(function() {
  var KB = [
    { keys: ['hello','hi','hey','good morning','good afternoon','good evening','howdy','greetings','start'],
      reply: "Hi there! I'm the HummingBeing assistant. How can I help you today?",
      btns: ['What is TRE®?','About Isabelle','Pricing','Book a session'] },
    { keys: ['tre','tension release','trauma release','tremor','neurogenic','tension trauma'],
      reply: "TRE® (Tension & Trauma Releasing Exercises) activates your body's natural tremor mechanism to release deep stress, tension and trauma stored in the muscles.\n\nIt is gentle, safe and suitable for complete beginners — no prior experience needed.",
      btns: ['Is TRE® safe?','How long is a session?','Book a session'] },
    { keys: ['somatic coaching','coaching','embodied','emotional resilience','anxiety','depression'],
      reply: "Somatic Coaching develops your body's wisdom for greater emotional resilience, reduced anxiety and improved relationships.\n\nSessions blend body-awareness practices with one-to-one coaching conversations.",
      btns: ['How does it work?','Pricing','Book a session'] },
    { keys: ['bodywork','somatic bodywork','strozzi','touch','body work','physical'],
      reply: "Somatic Bodywork uses the Strozzi method to gently release historical patterns, tensions and contractions held in the body — creating space for more energy and aliveness.",
      btns: ['Pricing','Book a session'] },
    { keys: ['isabelle','practitioner','who is','trainer','coach','about','experience','certified','qualified','biography'],
      reply: "Isabelle is a certified TRE® Provider and Somatic Coach with 25+ years of experience. She has lived in 9 countries and worked with people from 40+ nationalities across Singapore and Japan — and globally via Zoom.",
      btns: ['Book a session with Isabelle','What services does she offer?'] },
    { keys: ['what services','services offered','what do you offer','offer','available'],
      reply: "HummingBeing offers three core services:\n\n• TRE® Exercises — release stress and tension through tremors\n• Somatic Coaching — body-based coaching for resilience\n• Somatic Bodywork — Strozzi method bodywork\n\nAll available in-person or online.",
      btns: ['What is TRE®?','Pricing','Book a session'] },
    { keys: ['price','cost','how much','fee','rate','investment','money','package','payment','expensive','afford'],
      reply: "Three packages are available:\n\n• Starter — $2,200 (8 weekly sessions)\n• Deep Dive — Custom (12–24 sessions)\n• Free Discovery Call — $0 (30 min)\n\nStart with the free call — no commitment required.",
      btns: ['Book free discovery call','What is the Deep Dive?','Tell me about the Starter'] },
    { keys: ['starter','8 week','8-week','first package','weekly sessions'],
      reply: "The Starter Package is $2,200 and includes:\n• 8 weekly somatic sessions\n• TRE® or Somatic Coaching\n• Session recordings\n• WhatsApp support between sessions\n• Personalised home practice plan",
      btns: ['Book Starter Package','View all pricing'] },
    { keys: ['deep dive','deep-dive','12 session','24 session','corporate','leadership','long term','long-term'],
      reply: "The Deep Dive Package is fully customised — 12 to 24 sessions combining TRE®, Coaching and Bodywork. It includes:\n• Priority scheduling & direct access\n• Corporate & leadership programmes\n• Ongoing integration support\n\nPriced by consultation.",
      btns: ['Enquire about Deep Dive','Book free call'] },
    { keys: ['book','schedule','appointment','sign up','start','begin','register','join','how to start'],
      reply: "You can book in two easy ways:\n1. Fill in the contact form on the Book page\n2. Send a WhatsApp message directly\n\nIsabelle personally responds within 1–2 business days.",
      btns: ['Go to Book page','Book free discovery call'] },
    { keys: ['discovery call','free call','free session','free chat','30 min','consultation','no commitment','no pressure'],
      reply: "The free 30-minute discovery call is a relaxed, no-pressure conversation with Isabelle. You'll explore your situation and find the right path forward.\n\nNo sales pitch. No commitment. Just clarity.",
      btns: ['Book the free call','View pricing'] },
    { keys: ['location','where','singapore','japan','online','zoom','remote','virtual','in person','travel','country'],
      reply: "Sessions are available:\n• In-person in Singapore\n• In-person in Japan\n• Online via Zoom (globally)\n\nIsabelle works with clients from 40+ countries worldwide.",
      btns: ['Book a session','Is online as effective?'] },
    { keys: ['online effective','zoom effective','virtual work','remote session','online work'],
      reply: "Yes! Online sessions via Zoom are equally effective. TRE® and somatic practices work beautifully through video — all you need is a quiet space and a comfortable mat or floor area.",
      btns: ['Book online session','Pricing'] },
    { keys: ['how long','duration','time','minutes','hours','length','session length','how many'],
      reply: "Session lengths vary:\n• Discovery call — 30 min (free)\n• Individual session — 60–90 min\n• Programmes — 8 to 24 weeks\n\nIsabelle will suggest the best format during your first conversation.",
      btns: ['Book free discovery call','Pricing'] },
    { keys: ['safe','safety','risk','side effect','okay','suitable','beginner','first time','never tried','scared','worry','concern','danger'],
      reply: "TRE® and somatic practices are gentle and generally very safe. Isabelle tailors every session to your comfort level. If you have specific health concerns, just mention them when booking — everything is adjusted accordingly.",
      btns: ['Book a session','Talk to Isabelle'] },
    { keys: ['stress','burnout','overwhelmed','tense','tight','ache','pain','sleep','relax','calm','tired','exhausted'],
      reply: "HummingBeing specialises in helping people release chronic stress, burnout and stored physical tension. TRE®, Somatic Coaching and Bodywork all engage the nervous system directly for deep, lasting change.",
      btns: ['What is TRE®?','Book a session'] },
    { keys: ['trauma','ptsd','past','wound','abuse','grief','loss','difficult','history'],
      reply: "Somatic approaches are well-suited for processing stored trauma gently and safely. Isabelle works with a trauma-informed framework — you are always in control and sessions move entirely at your pace.",
      btns: ['What is TRE®?','Book a session with Isabelle'] },
    { keys: ['contact','email','reach','get in touch','message','phone','whatsapp','call'],
      reply: "You can reach Isabelle through:\n• The contact form on the Book page\n• WhatsApp (tap the green button on screen)\n\nShe personally responds within 1–2 business days.",
      btns: ['Go to Book page'] },
    { keys: ['gallery','photo','video','podcast','media','see','look','watch'],
      reply: "The Gallery has podcasts, videos and photos from Isabelle's sessions and events. It's a great way to see HummingBeing in action before deciding to book.",
      btns: ['View Gallery'] },
    { keys: ['event','workshop','group','upcoming','schedule','class','programme','program'],
      reply: "Isabelle hosts regular TRE® group sessions, coaching workshops and online events. Check the Events page to see what's coming up near you.",
      btns: ['View Events','Book a session'] },
    { keys: ['thanks','thank you','great','awesome','helpful','perfect','appreciate','wonderful','good'],
      reply: "You're very welcome! Is there anything else I can help you with?",
      btns: ['Book a session','Pricing','Contact Isabelle'] },
    { keys: ['bye','goodbye','see you','ciao','later','take care','ttyl'],
      reply: "Thank you for chatting! Wishing you calm and clarity. Feel free to come back anytime 🌿",
      btns: [] }
  ];

  var NAV = {
    'Go to Book page': 'book.html', 'Book a session': 'book.html',
    'Book free discovery call': 'book.html', 'Book free call': 'book.html',
    'Book the free call': 'book.html', 'Book a session with Isabelle': 'book.html',
    'Book online session': 'book.html', 'Book Starter Package': 'book.html',
    'Enquire about Deep Dive': 'book.html', 'Contact Isabelle': 'book.html',
    'Talk to Isabelle': 'book.html', 'View Gallery': 'gallery.html',
    'View Events': 'events.html'
  };

  function match(input) {
    var norm = input.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g,' ').trim();
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var score = 0;
      for (var j = 0; j < KB[i].keys.length; j++) {
        if (norm.indexOf(KB[i].keys[j]) !== -1) score += KB[i].keys[j].split(' ').length;
      }
      if (score > bestScore) { bestScore = score; best = KB[i]; }
    }
    return bestScore > 0 ? best : null;
  }

  function addMsg(text, isUser, btns) {
    var box = document.getElementById('hb-msgs');
    if (!box) return;
    var row = document.createElement('div');
    row.className = 'hb-msg ' + (isUser ? 'user' : 'bot');
    if (!isUser) {
      var ava = document.createElement('div');
      ava.className = 'hb-msg-ava';
      ava.innerHTML = '<i class="fa-solid fa-leaf"></i>';
      row.appendChild(ava);
    }
    var inner = document.createElement('div');
    inner.className = 'hb-msg-inner';
    var bub = document.createElement('div');
    bub.className = 'hb-bubble';
    bub.textContent = text;
    inner.appendChild(bub);
    if (!isUser && btns && btns.length) {
      var br = document.createElement('div');
      br.className = 'hb-btns';
      btns.forEach(function(b) {
        var btn = document.createElement('button');
        btn.textContent = b;
        btn.addEventListener('click', function() { handleBtn(b); });
        br.appendChild(btn);
      });
      inner.appendChild(br);
    }
    row.appendChild(inner);
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
  }

  function handleBtn(text) {
    if (text === 'Back to start') {
      addMsg(text, true);
      setTimeout(function() {
        addMsg("Of course! What else can I help you with?", false, ['What is TRE®?','About Isabelle','Pricing','Book a session']);
      }, 350); return;
    }
    if (NAV[text]) { window.location.href = NAV[text]; return; }
    addMsg(text, true);
    setTimeout(function() { respond(text); }, 380);
  }

  function respond(text) {
    var r = match(text);
    if (r) { addMsg(r.reply, false, r.btns); }
    else { addMsg("I'm not sure about that, but Isabelle would be happy to help personally! You can reach her via the contact form or WhatsApp.", false, ['Go to Book page','Back to start']); }
  }

  function hbSend() {
    var inp = document.getElementById('hb-input');
    if (!inp) return;
    var val = inp.value.trim();
    if (!val) return;
    inp.value = '';
    addMsg(val, true);
    setTimeout(function() { respond(val); }, 400);
  }

  function toggleChat() {
    var win = document.getElementById('hb-chat-win');
    var badge = document.getElementById('hb-badge');
    if (!win) return;
    var opening = !win.classList.contains('open');
    win.classList.toggle('open');
    if (badge) badge.style.display = 'none';
    if (opening && !win.dataset.greeted) {
      win.dataset.greeted = '1';
      setTimeout(function() {
        addMsg("Hi! I'm the HummingBeing assistant 🌿 Ask me anything about our services, pricing or booking.", false, ['What is TRE®?','About Isabelle','Pricing','Book a session']);
      }, 260);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    var btnEl = document.createElement('div');
    btnEl.className = 'hb-chat-btn';
    btnEl.id = 'hb-chat-btn';
    btnEl.innerHTML = '<i class="fa-solid fa-comment-dots"></i><span class="hb-badge" id="hb-badge">1</span>';
    btnEl.addEventListener('click', toggleChat);

    var winEl = document.createElement('div');
    winEl.className = 'hb-chat-win';
    winEl.id = 'hb-chat-win';
    winEl.innerHTML =
      '<div class="hb-chat-head">' +
        '<div class="hb-head-ava"><i class="fa-solid fa-leaf"></i></div>' +
        '<div><div class="hb-head-name">HummingBeing</div><div class="hb-head-sub">Ask me anything</div></div>' +
        '<button class="hb-chat-x" id="hb-chat-x"><i class="fa-solid fa-xmark"></i></button>' +
      '</div>' +
      '<div class="hb-msgs" id="hb-msgs"></div>' +
      '<div class="hb-chat-foot">' +
        '<input type="text" id="hb-input" placeholder="Ask anything…" />' +
        '<button class="hb-send"><i class="fa-solid fa-paper-plane"></i></button>' +
      '</div>';

    document.body.appendChild(btnEl);
    document.body.appendChild(winEl);

    document.getElementById('hb-chat-x').addEventListener('click', function() {
      document.getElementById('hb-chat-win').classList.remove('open');
    });
    document.getElementById('hb-input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') hbSend();
    });
    winEl.querySelector('.hb-send').addEventListener('click', hbSend);
  });
})();
