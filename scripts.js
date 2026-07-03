/* HummingBeing — scripts.js v6 */

// ── Button ripple on click ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var r = document.createElement('span');
      r.className = 'btn-ripple';
      var rect = btn.getBoundingClientRect();
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top  = (e.clientY - rect.top)  + 'px';
      btn.appendChild(r);
      r.addEventListener('animationend', function() { r.remove(); });
    });
  });
});

// ── Scroll progress bar ───────────────────────────────────────────────────
;(function() {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var scrolled = window.scrollY;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (total > 0 ? scrolled / total : 0) + ')';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── Transparent → solid nav on scroll + hide on scroll-down ───────────────
;(function() {
  var lastY = 0;
  function updateNav() {
    var y = window.scrollY;
    var nav = document.querySelector('nav');
    var topBtn = document.querySelector('.top-float');
    if (nav) {
      if (y > 60) nav.classList.add('scrolled');
      else        nav.classList.remove('scrolled');
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
  updateNav();
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
      document.querySelectorAll('.nav-dropdown').forEach(function(d) {
        d.classList.remove('dropdown-open');
      });
      if (opening) {
        dropdown.classList.add('dropdown-open');
        if (nav) nav.classList.remove('nav-hidden');
      }
    });
  });
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
}, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });

function hasAnim(el) {
  return el.classList.contains('anim-up') || el.classList.contains('anim-left') ||
         el.classList.contains('anim-right') || el.classList.contains('anim-scale') ||
         el.classList.contains('anim-fade') || el.classList.contains('anim-line');
}

document.addEventListener('DOMContentLoaded', function() {

  // Cards in cards-grid — staggered
  document.querySelectorAll('.cards-grid .card').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i % 3 * 0.11) + 's';
    animObserver.observe(el);
  });

  // Standalone cards (not inside cards-grid)
  document.querySelectorAll('.card:not(.cards-grid .card)').forEach(function(el, i) {
    if (!hasAnim(el)) {
      el.classList.add('anim-up');
      el.style.transitionDelay = (i % 4 * 0.1) + 's';
      animObserver.observe(el);
    }
  });

  // Steps — staggered fade-up
  document.querySelectorAll('.steps .step').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i * 0.11) + 's';
    animObserver.observe(el);
  });

  // Step number circles — scale-bounce in, slightly after their parent
  document.querySelectorAll('.step-num').forEach(function(el, i) {
    if (!hasAnim(el)) {
      el.classList.add('anim-scale');
      el.style.transitionDelay = (i * 0.11 + 0.12) + 's';
      animObserver.observe(el);
    }
  });

  // Testimonials — staggered fade-up
  document.querySelectorAll('.testimonial, .testimonial-light').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i % 3 * 0.1) + 's';
    animObserver.observe(el);
  });

  // Social / platform cards
  document.querySelectorAll('.platform-hero, .social-card').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i % 4 * 0.1) + 's';
    animObserver.observe(el);
  });

  // Two-col: text from right, image from left
  document.querySelectorAll('.two-col-text').forEach(function(el) {
    el.classList.add('anim-right');
    animObserver.observe(el);
  });
  document.querySelectorAll('.two-col-image').forEach(function(el) {
    el.classList.add('anim-left');
    animObserver.observe(el);
  });

  // Section center headers (eyebrow + h2 as a unit)
  document.querySelectorAll('.section-header-center').forEach(function(el) {
    if (!hasAnim(el)) {
      el.classList.add('anim-up');
      animObserver.observe(el);
    }
  });

  // Dividers — draw in from left
  document.querySelectorAll('.divider').forEach(function(el) {
    if (!hasAnim(el)) {
      el.classList.add('anim-line');
      animObserver.observe(el);
    }
  });

  // Feature list items — staggered
  document.querySelectorAll('.feature-list li').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i * 0.08) + 's';
    animObserver.observe(el);
  });

  // Info strip items (isabelle page)
  document.querySelectorAll('.info-strip-item').forEach(function(el, i) {
    if (!hasAnim(el)) {
      el.classList.add('anim-up');
      el.style.transitionDelay = (i * 0.12) + 's';
      animObserver.observe(el);
    }
  });

  // CTA banners
  document.querySelectorAll('.cta-banner').forEach(function(el) {
    if (!hasAnim(el)) {
      el.classList.add('anim-up');
      animObserver.observe(el);
    }
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

  // Resource rows (socials page)
  document.querySelectorAll('.resource-row').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i * 0.07) + 's';
    animObserver.observe(el);
  });

  // Changelog entries
  document.querySelectorAll('.cl-entry').forEach(function(el, i) {
    el.classList.add('anim-up');
    el.style.transitionDelay = (i % 5 * 0.08) + 's';
    animObserver.observe(el);
  });

});

// ── CHATBOT ───────────────────────────────────────────────────────────────────
;(function() {
  var KB = [
    { keys: ['hello','hi','hey','morning','afternoon','evening','howdy','greetings','start','help','hiya','yo','sup','ok','okay','aloha','namaste'],
      reply: "Hi! I'm the HummingBeing assistant. I can answer questions about our services, pricing, booking and Isabelle. What would you like to know?",
      link: null,
      btns: ['What is TRE®?','Tell me about Somatic Coaching','About Isabelle','How much does it cost?'] },

    { keys: ['how'],
      reply: "Happy to help! What would you like to know?\n\n• How much does it cost?\n• How does a session work?\n• How do I book?\n• How long are sessions?",
      link: null,
      btns: ['How much does it cost?','How does a session work?','How do I book?','How long is a session?'] },

    { keys: ['when','availability','available'],
      reply: "Isabelle is available for sessions year-round in Singapore, Japan and online via Zoom.\n\nScheduling is flexible and arranged personally after your first enquiry. Regular group events are also listed on the Events page.",
      link: { text: 'See upcoming events', url: 'events.html' },
      btns: ['How do I book a session?','Where are sessions held?','How much does it cost?'] },

    { keys: ['what'],
      reply: "What would you like to explore?\n\n• What services are available?\n• What results can you expect?\n• What happens in a first session?",
      link: null,
      btns: ['What services are available?','What results can I expect?','What happens in a session?'] },

    { keys: ['why','reason','purpose','motivation'],
      reply: "HummingBeing exists because the body holds answers the mind alone cannot always reach.\n\nMost wellness approaches work only with thoughts. Somatic practices work directly with the nervous system — creating deep, lasting change through the body's own natural release mechanisms.",
      link: null,
      btns: ['What is TRE®?','Tell me about Somatic Coaching','About Isabelle'] },

    { keys: ['info','information','more info','learn more','tell me more','know more','details'],
      reply: "I can share information about:\n\n• Our somatic practices — TRE®, Coaching, Bodywork\n• Isabelle and her qualifications\n• Pricing and packages\n• Booking and where sessions are held\n\nWhat would you like to explore?",
      link: null,
      btns: ['What services are available?','About Isabelle','How much does it cost?','How do I book?'] },

    { keys: ['tre','tension release','trauma release','tremor','neurogenic','tension trauma','tré','t.r.e','shaking','psoas','nervous system','berceli','tremoring','tre exercises','what is tre','tell me about tre','what are tre exercises','what is tre exercises','explain tre'],
      reply: "TRE® (Tension & Trauma Releasing Exercises) activates your body's natural tremor mechanism to release deep stress, tension and trauma stored in the muscles and nervous system.\n\nDeveloped by Dr. David Berceli, it is gentle, safe and beginner-friendly. Most people learn to self-practice after just 3–4 supervised sessions.",
      link: null,
      btns: ['Is TRE® safe?','What does a session feel like?','How many sessions do I need?','How much does it cost?'] },

    { keys: ['somatic coaching','somatic coach','coaching','embodied','emotional resilience','body coaching','life coach','executive coach','mind body','body awareness','inner work','self awareness','resilience'],
      reply: "Somatic Coaching develops your body's wisdom for greater emotional resilience, reduced stress and deeper self-awareness.\n\nUnlike talk-based coaching, it works with the body directly — training you to read and respond to your physical signals in real time. Sessions are 1:1 with Isabelle.",
      link: null,
      btns: ['How is it different from therapy?','What results can I expect?','How many sessions?','How much does it cost?'] },

    { keys: ['bodywork','somatic bodywork','strozzi','touch','body work','physical','hands on','hands-on','body therapy','manual','somatic body'],
      reply: "Somatic Bodywork uses the Strozzi method — gentle, systematic hands-on touch — to release historical patterns, tensions and contractions held in the body.\n\nIt creates space for more energy, ease and aliveness. Fully clothed. Sessions are tailored 1:1 to your specific patterns.",
      link: null,
      btns: ['How is it different from massage?','Is it safe?','How much does it cost?','What to expect in a session?'] },

    { keys: ['isabelle','practitioner','who is','trainer','about isabelle','biography','background','qualifications','credentials','her story','meet isabelle','isabelle claus','teixeira','who runs','founder'],
      reply: "Isabelle Claus Teixeira is a Global TRE® Certifying Trainer & Certified TRE® Provider, ICF PCC Executive Coach, Somatic Coach and Somatic Bodywork Practitioner.\n\nShe brings 30 years of human development experience across 9 countries, has worked with people from 40+ nationalities, and combines deep personal somatic practice with professional training. Based in Singapore and Japan.",
      link: null,
      btns: ['What are her qualifications?','What services does she offer?','Where is she based?','Book a session'] },

    { keys: ['what services','services offered','offer','available','what do you do','what can you help','how can you help','what you offer','what is offered','what do you provide','services','offerings','practices'],
      reply: "HummingBeing offers three core practices:\n\n• TRE® Exercises — release deep stress & tension through natural tremors\n• Somatic Coaching — body-based coaching for resilience\n• Somatic Bodywork — Strozzi method hands-on bodywork\n\nAll available 1:1, in-person (Singapore/Japan) or online via Zoom.",
      link: null,
      btns: ['What is TRE®?','Tell me about Somatic Coaching','What is Somatic Bodywork?','Which practice is right for me?'] },

    { keys: ['price','cost','how much','fee','rate','investment','money','package','payment','expensive','afford','charges','pricing','fees','packages','rates','invest','pay','value','worth','dollar'],
      reply: "Three options are available:\n\n• Starter Package — $2,200 for 8 weekly sessions\n• Deep Dive — Custom pricing for 12–24 sessions\n• Free Discovery Call — $0, 30 minutes\n\nThe free call is a great first step with no commitment required.",
      link: null,
      btns: ['Tell me about the Starter Package','Tell me about the Deep Dive','What payment options are there?','What is included?'] },

    { keys: ['starter','8 week','8-week','first package','weekly sessions','starter package','2200','$2200','what is included','what included','included','whats included'],
      reply: "The Starter Package is $2,200 and includes:\n\n• 8 weekly somatic sessions (TRE® or Coaching)\n• Session recordings\n• WhatsApp support between sessions\n• Personalised home practice plan\n\nDesigned to give you enough time to experience real, lasting shifts.",
      link: null,
      btns: ['Tell me about the Deep Dive','How do I book?','Tell me about the free discovery call','What happens in a session?'] },

    { keys: ['deep dive','deep-dive','12 session','24 session','corporate','leadership','long term','long-term','corporate wellness','team','organisation','company','executive program'],
      reply: "The Deep Dive Package is fully customised — 12 to 24 sessions combining TRE®, Coaching and Bodywork for deeper, lasting transformation.\n\nIncludes priority scheduling, direct access to Isabelle, corporate & leadership programmes, and ongoing integration support. Priced by consultation.",
      link: null,
      btns: ['How is it different from the Starter?','Tell me about the free discovery call','What is Somatic Coaching?','How do I book?'] },

    { keys: ['book','schedule','appointment','sign up','register','join','how to start','how to book','how do i book','how can i book','get started','begin','start working','work together','make an appointment','booking','reserve','session booking'],
      reply: "Booking is straightforward:\n\n1. Use the contact form on the Book page\n2. Send a WhatsApp message directly to Isabelle\n\nIsabelle personally responds within 1–2 business days. The free discovery call is a great first step.",
      link: { text: 'Go to the Book page', url: 'book.html' },
      btns: ['Tell me about the free discovery call','How much does it cost?','What to expect in first session?','Can I reschedule?'] },

    { keys: ['discovery call','free call','free session','free chat','30 min','30 minute','consultation','no commitment','no pressure','first call','intro call','introductory','free','trial','no cost','complimentary'],
      reply: "The free 30-minute discovery call is a relaxed, no-pressure conversation with Isabelle. You will explore your situation, ask any questions, and find the right path forward together.\n\nNo sales pitch. No commitment. Just honest conversation.",
      link: { text: 'Book the free call', url: 'book.html' },
      btns: ['What happens after the call?','How much does it cost?','What services are available?'] },

    { keys: ['location','where','singapore','japan','online','zoom','remote','virtual','in person','travel','country','based','city','place','where is','where are you','sg','jp','virtual session'],
      reply: "Sessions are available in three formats:\n\n• In-person in Singapore\n• In-person in Japan\n• Online via Zoom — for clients anywhere in the world\n\nOnline sessions are equally effective. Isabelle has worked with clients from 40+ countries.",
      link: null,
      btns: ['Is online as effective as in-person?','How do I book?','How much does it cost?'] },

    { keys: ['online effective','zoom effective','virtual work','remote session','online work','does online work','is it effective online','can i do online','is zoom ok','work via zoom','is online as effective as in person','online as effective'],
      reply: "Yes — online sessions via Zoom are equally effective for TRE® and Somatic Coaching. All you need is a quiet space, comfortable clothing, and a mat or soft surface for TRE® exercises.\n\nMany of Isabelle's clients have completed their full programme entirely online.",
      link: null,
      btns: ['How do I book an online session?','What do I need?','How much does it cost?'] },

    { keys: ['how long','duration','time','minutes','hours','length','session length','how many sessions','number of sessions','session time','long is','long does','how many sessions do i need'],
      reply: "Session lengths depend on the format:\n\n• Free Discovery Call — 30 min\n• Individual session — 60 to 90 min\n• Starter Programme — 8 weekly sessions\n• Deep Dive — 12 to 24 sessions\n\nIsabelle will suggest the right structure during your discovery call.",
      link: null,
      btns: ['Tell me about the Starter Package','Tell me about the Deep Dive','Book a free call'] },

    { keys: ['safe','safety','risk','side effect','suitable','beginner','first time','never tried','scared','worry','concern','danger','is it safe','safe for me','contraindication','health condition','is tre safe'],
      reply: "TRE® and somatic practices are gentle and considered very safe for most people. Isabelle tailors every session to your comfort level and health situation.\n\nIf you have specific medical conditions or concerns, mention them when booking — sessions are always adapted. There are very few contraindications.",
      link: null,
      btns: ['Who is it suitable for?','What to expect in a session?','Book a discovery call'] },

    { keys: ['who is it for','suitable for','right for me','is it for me','who benefits','good for','works for','good candidate','am i right','should i try','who is it suitable for'],
      reply: "Somatic practices can help anyone carrying chronic stress, burnout, anxiety, stored tension or past trauma. They work especially well for:\n\n• Professionals under high pressure\n• People feeling disconnected from their bodies\n• Those who have tried talk therapy without lasting results\n• Anyone curious about body-based approaches",
      link: null,
      btns: ['Is it safe?','What results can I expect?','Book a free discovery call'] },

    { keys: ['stress','burnout','overwhelmed','tense','tight','ache','pain','sleep','relax','calm','tired','exhausted','fatigue','chronic stress','headache','anxious','anxiety','nervous','depression','low energy','dysregulated'],
      reply: "HummingBeing specialises in helping people release chronic stress, burnout and stored physical tension. TRE®, Somatic Coaching and Bodywork all work with the nervous system directly — producing deep, lasting relief rather than temporary fixes.",
      link: null,
      btns: ['What is TRE®?','Tell me about Somatic Coaching','Is it safe for my situation?','Book a session'] },

    { keys: ['trauma','ptsd','past','wound','abuse','grief','loss','difficult','history','past trauma','trauma-informed','stored trauma','old wounds','unprocessed'],
      reply: "Somatic approaches are well-suited for processing stored trauma gently and safely. Isabelle works within a trauma-informed framework — you are always in full control and sessions move entirely at your pace.\n\nYou do not need to relive or retell events for the work to be effective.",
      link: null,
      btns: ['What is TRE®?','Is it safe?','Book a discovery call'] },

    { keys: ['contact','email','reach','get in touch','message','phone','whatsapp','how to contact','connect','communicate','enquire','enquiry','reach out'],
      reply: "You can reach Isabelle in two ways:\n\n• Fill in the contact form on the Book page\n• Send a WhatsApp message — tap the green button visible on any page\n\nShe personally responds within 1–2 business days.",
      link: { text: 'Open the Book page', url: 'book.html' },
      btns: ['Book a free discovery call','How much does it cost?','What services are available?'] },

    { keys: ['gallery','photo','video','podcast','media','see','look','watch','content','interview','photos','videos','listen'],
      reply: "The Gallery features podcast interviews, session videos and photos from Isabelle's workshops and events. It is a wonderful way to get a feel for her approach and energy before committing to a session.",
      link: { text: 'View the Gallery', url: 'gallery.html' },
      btns: ['About Isabelle','What services are available?','Book a session'] },

    { keys: ['event','workshop','group','upcoming','schedule','class','programme','program','events','group session','next event','tre workshop','group tre','romania','bucharest','certification','module 1','icf','cceu'],
      reply: "Upcoming events:\n\n• 29–30 Aug 2026 — Singapore (In-Person) · Nervous System Regulation for Coaches · 21 ICF CCEUs · S$1,290\n• 15–17 Oct 2026 — Bucharest, Romania · TRE® Module 1 Certification · 21 ICF CCEUs\n\nGroup events are a great way to experience the work before committing to a full programme.",
      link: { text: 'See all upcoming events', url: 'events.html' },
      btns: ['What is TRE®?','How much does a programme cost?','Book a private session'] },

    { keys: ['first session','what to expect','what happens','prepare','preparation','my first','what do i need','what to bring','how does a session work','session like','how does a session','session work','what happens in a session','what to expect in a session'],
      reply: "Your first session typically begins with a short conversation about your goals and situation. Nothing is rushed.\n\nFor TRE® — wear comfortable clothes and have a mat or soft floor space ready. For Coaching — just bring an open, curious mind. Sessions are always tailored to you.",
      link: null,
      btns: ['Is it safe?','How long is a session?','What should I wear?','Book a session'] },

    { keys: ['results','outcome','benefit','benefits','change','improve','help me','feel better','does it work','what will i feel','what changes','what results can i expect','what results can you expect'],
      reply: "Common results reported by clients include:\n\n• Reduced stress, anxiety and chronic tension\n• Improved sleep quality and sustained energy\n• Greater emotional resilience and calm\n• Better relationships and less reactivity\n• A stronger connection to your body and sense of self\n\nResults vary — Isabelle is always honest about realistic expectations.",
      link: null,
      btns: ['What is TRE®?','Tell me about Somatic Coaching','Book a free call'] },

    { keys: ['difference','different from','vs','versus','compare','therapy','talk therapy','physiotherapy','psychology','counselling','meditation','yoga','massage','compared to','how is it different from therapy','different from therapy'],
      reply: "Somatic practices differ from talk therapy by working with the body, not just the mind. Unlike massage, they address nervous system patterns rather than muscle tension alone. Unlike yoga, sessions are 1:1 and tailored to your specific situation.\n\nThey are complementary to therapy and medical care — not a replacement.",
      link: null,
      btns: ['What is TRE®?','Tell me about Somatic Coaching','Book a discovery call'] },

    { keys: ['after call','next steps','what next','after discovery','after free call','then what','what happens after'],
      reply: "After your free discovery call, Isabelle will suggest the approach that best fits your situation — whether that is TRE®, Somatic Coaching, Bodywork or a combination.\n\nIf you decide to proceed, she will send you a package proposal and you choose what feels right. No pressure at any step.",
      link: null,
      btns: ['How much does it cost?','Book the free call','What services are available?'] },

    { keys: ['qualifications','certified','training','credentials','trained','accredited','diploma','certificate','reiki','strozzi','bhd','bhd asia','what are her qualifications','her qualifications'],
      reply: "Isabelle's key credentials include:\n\n• Global TRE® Certifying Trainer & Certified TRE® Provider (Dr. David Berceli method)\n• PCC — Professional Certified Coach (ICF)\n• Strozzi Somatic Bodywork Practitioner\n• Reiki Level II Practitioner\n• 25+ years HR Leadership in Fortune 100 companies\n• Results Trained Coach (NeuroLeadership Institute)",
      link: null,
      btns: ['About Isabelle','What services does she offer?','Book a session'] },

    { keys: ['which package','compare package','package comparison','starter vs deep','starter or deep','which programme','which program','difference between packages','different from the starter','different from starter','how is it different from the starter','starter vs','which package is right'],
      reply: "Here's how the two packages compare:\n\n• Starter — $2,200 for 8 weekly sessions. Ideal for building a foundation and experiencing real, lasting shifts.\n• Deep Dive — custom pricing for 12 to 24 sessions combining TRE®, Coaching & Bodywork, with priority access and integration support, for deeper long-term transformation.\n\nNot sure which fits? The free discovery call will help you decide.",
      link: { text: 'Book the free discovery call', url: 'book.html' },
      btns: ['Tell me about the Starter Package','Tell me about the Deep Dive','Book a free discovery call'] },

    { keys: ['which practice','which service','which is right','tre or coaching','coaching or bodywork','what should i choose','which one is right','tre vs coaching','which is best for me','where do i start','what do you recommend','right service for me'],
      reply: "All three practices work with the nervous system, just through different doors:\n\n• TRE® — release stored stress & tension through natural tremors\n• Somatic Coaching — build resilience & self-awareness through the body\n• Somatic Bodywork — release held patterns through gentle touch\n\nYou don't have to choose alone — Isabelle will recommend the best fit for you in your free discovery call.",
      link: { text: 'Book a free discovery call', url: 'book.html' },
      btns: ['What is TRE®?','Tell me about Somatic Coaching','What is Somatic Bodywork?'] },

    { keys: ['what to wear','wear','clothing','clothes','dress','what should i wear','attire','outfit'],
      reply: "Wear comfortable, loose clothing you can move and relax in. For TRE® and Bodywork, have a mat or soft surface ready — and Bodywork is always done fully clothed.\n\nFor online sessions, just find a quiet, private space. That's all you need.",
      link: null,
      btns: ['What happens in a session?','How do I book?','Is it safe?'] },

    { keys: ['cancel','cancellation','reschedule','rescheduling','change appointment','postpone','refund','money back','miss a session','missed session','change my booking'],
      reply: "Scheduling is handled personally and flexibly. If you need to reschedule, let Isabelle know as early as you can and she'll do her best to find a new time.\n\nFor anything about refunds or a specific package, it's best to raise it directly with Isabelle — she's always fair and transparent.",
      link: { text: 'Message Isabelle', url: 'book.html' },
      btns: ['How do I book?','Tell me about the free discovery call','How much does it cost?'] },

    { keys: ['payment options','pay in instal','instalment','installment','payment plan','split payment','how do i pay','methods of payment','bank transfer','credit card','paynow','pay later','what payment options are there'],
      reply: "Payment details and any available options are arranged directly with Isabelle once you choose a package. Feel free to ask about payment plans during your discovery call — she's happy to find an arrangement that works for you.",
      link: { text: 'Book a discovery call', url: 'book.html' },
      btns: ['How much does it cost?','Tell me about the Starter Package','How do I book?'] },

    { keys: ['one on one','1 on 1','one to one','individual or group','group or private','private or group','is it one to one','just me'],
      reply: "Most of Isabelle's work is 1:1 — fully personalised to you. Group experiences are available through the workshops and events on the Events page, which are a lovely, lower-cost way to try the work first.\n\nThe discovery call will help you choose what fits best.",
      link: { text: 'See upcoming events', url: 'events.html' },
      btns: ['See upcoming events','Book a private session','How much does it cost?'] },

    { keys: ['language','languages','english','speak','what language','which language','do you speak','spoken'],
      reply: "Sessions are conducted in English. Isabelle has worked with clients from 40+ nationalities around the world, so international and cross-cultural clients are very welcome.",
      link: null,
      btns: ['Where are sessions held?','How do I book?','About Isabelle'] },

    { keys: ['pregnant','pregnancy','injury','injured','medical condition','medication','disability','chronic illness','heart condition','surgery','back pain','can i still do','health issue'],
      reply: "Somatic practices are gentle and can often be adapted for many health situations. If you're pregnant, recovering from injury or managing a medical condition, please mention it when you book so Isabelle can tailor the session — and check with your doctor if you're unsure.",
      link: null,
      btns: ['Is it safe?','Book a discovery call','What happens in a session?'] },

    { keys: ['thanks','thank you','great','awesome','helpful','perfect','appreciate','wonderful','good','brilliant','excellent','nice','cheers','ty'],
      reply: "You are very welcome! Is there anything else you would like to know about HummingBeing?",
      link: null,
      btns: ['How much does it cost?','Book a session','What services are available?'] },

    { keys: ['bye','goodbye','see you','ciao','later','take care','ttyl','farewell','good night','good day'],
      reply: "Thank you for chatting! Wishing you calm, clarity and ease. Come back any time — we are always here.",
      link: null,
      btns: ['Book a session before you go','View upcoming events'] }
  ];

  function match(input) {
    var norm = input.toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    var words = norm.split(' ');
    var isSingle = words.length <= 2 && norm.length >= 2;
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var score = 0;
      for (var j = 0; j < KB[i].keys.length; j++) {
        var kw = KB[i].keys[j];
        // exact key match — top priority
        if (norm === kw) { score += kw.split(' ').length * 4; continue; }
        // phrase contains keyword
        if (norm.indexOf(kw) !== -1) { score += kw.split(' ').length * 3; continue; }
        // short inputs: also match if input found within a keyword (e.g. "book" inside "booking")
        if (isSingle && norm.length >= 3 && kw.indexOf(norm) !== -1) { score += 2; continue; }
        // partial word-level match with starts-with tolerance
        var kwWords = kw.split(' ');
        var matched = 0;
        for (var k = 0; k < kwWords.length; k++) {
          var kww = kwWords[k];
          if (kww.length < 3) continue;
          for (var w = 0; w < words.length; w++) {
            var iw = words[w];
            if (iw.length < 2) continue;
            if (iw.indexOf(kww) === 0 || kww.indexOf(iw) === 0) { matched++; break; }
          }
        }
        if (matched > 0 && matched >= Math.ceil(kwWords.length * 0.6)) {
          score += matched * 2;
        }
      }
      if (score > bestScore) { bestScore = score; best = KB[i]; }
    }
    return bestScore > 0 ? best : null;
  }

  function showTyping() {
    var box = document.getElementById('hb-msgs');
    if (!box) return null;
    var row = document.createElement('div');
    row.className = 'hb-msg bot';
    var ava = document.createElement('div');
    ava.className = 'hb-msg-ava';
    ava.innerHTML = '<i class="fa-solid fa-leaf"></i>';
    row.appendChild(ava);
    var inner = document.createElement('div');
    inner.className = 'hb-msg-inner';
    var typing = document.createElement('div');
    typing.className = 'hb-bubble hb-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    inner.appendChild(typing);
    row.appendChild(inner);
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
    return row;
  }

  function addMsg(text, isUser, btns, link) {
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
    if (!isUser && link) {
      var la = document.createElement('a');
      la.className = 'hb-link-btn';
      la.href = link.url;
      la.textContent = link.text + ' →';
      inner.appendChild(la);
    }
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
        addMsg("Of course! What would you like to know?", false,
          ['What is TRE®?','About Isabelle','How much does it cost?','What services are available?'], null);
      }, 350);
      return;
    }
    addMsg(text, true);
    setTimeout(function() { respond(text); }, 380);
  }

  function respond(text) {
    var typingEl = showTyping();
    setTimeout(function() {
      if (typingEl && typingEl.parentNode) typingEl.remove();
      var r = match(text);
      if (r) {
        addMsg(r.reply, false, r.btns, r.link);
      } else {
        addMsg("I'm not sure about that — but Isabelle would be happy to help personally! Feel free to reach out via the contact form or WhatsApp.", false,
          ['What services are available?','How much does it cost?','Back to start'],
          { text: 'Contact Isabelle directly', url: 'book.html' });
      }
    }, 820);
  }

  function hbSend() {
    var inp = document.getElementById('hb-input');
    if (!inp) return;
    var val = inp.value.trim();
    if (!val) return;
    inp.value = '';
    addMsg(val, true);
    setTimeout(function() { respond(val); }, 100);
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
        addMsg("Hi! I'm the HummingBeing assistant. Ask me anything about our services, pricing or booking.", false,
          ['What is TRE®?','Tell me about Somatic Coaching','About Isabelle','How much does it cost?'], null);
      }, 260);
    }
    if (opening) {
      setTimeout(function() {
        var inp = document.getElementById('hb-input');
        if (inp) inp.focus();
      }, 380);
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
        '<input type="text" id="hb-input" placeholder="Type anything — pricing, booking, how…" />' +
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
