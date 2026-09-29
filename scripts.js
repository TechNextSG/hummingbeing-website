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
      btns: ['What is TRE™?','Tell me about Somatic Coaching','About Isabelle','How much does it cost?'] },

    { keys: ['how'],
      reply: "Happy to help! What would you like to know?\n\n• How much does it cost?\n• How does a session work?\n• How do I book?\n• How long are sessions?",
      link: null,
      btns: ['How much does it cost?','How does a session work?','How do I book?','How long is a session?'] },

    { keys: ['when','availability','available'],
      reply: "Isabelle is available for sessions year-round in Singapore, Japan and online via Zoom.\n\nScheduling is flexible and arranged personally after your first enquiry. Regular group events are also listed on the Events page.",
      link: { text: 'See upcoming events', url: '/events' },
      btns: ['How do I book a session?','Where are sessions held?','How much does it cost?'] },

    { keys: ['what'],
      reply: "What would you like to explore?\n\n• What services are available?\n• What results can you expect?\n• What happens in a first session?",
      link: null,
      btns: ['What services are available?','What results can I expect?','What happens in a session?'] },

    { keys: ['why','reason','purpose','motivation'],
      reply: "HummingBeing exists because the body holds answers the mind alone cannot always reach.\n\nMost wellness approaches work only with thoughts. Somatic practices work directly with the nervous system — creating deep, lasting change through the body's own natural release mechanisms.",
      link: null,
      btns: ['What is TRE™?','Tell me about Somatic Coaching','About Isabelle'] },

    { keys: ['info','information','more info','learn more','tell me more','know more','details'],
      reply: "I can share information about:\n\n• Our somatic practices — TRE™, Coaching, Bodywork\n• Isabelle and her qualifications\n• Pricing and packages\n• Booking and where sessions are held\n\nWhat would you like to explore?",
      link: null,
      btns: ['What services are available?','About Isabelle','How much does it cost?','How do I book?'] },

    { keys: ['tre','tension release','trauma release','tremor','neurogenic','tension trauma','tré','t.r.e','shaking','psoas','nervous system','berceli','tremoring','tre exercises','what is tre','tell me about tre','what are tre exercises','what is tre exercises','explain tre'],
      reply: "TRE™ (Tension & Trauma Releasing Exercises) activates your body's natural tremor mechanism to release deep stress, tension and trauma stored in the muscles and nervous system.\n\nDeveloped by Dr. David Berceli, it is gentle, safe and beginner-friendly. Most people learn to self-practice after just 3–4 supervised sessions.",
      link: null,
      btns: ['Is TRE™ safe?','What does a session feel like?','How many sessions do I need?','How much does it cost?'] },

    { keys: ['somatic coaching','somatic coach','coaching','embodied','emotional resilience','body coaching','life coach','executive coach','mind body','body awareness','inner work','self awareness','resilience'],
      reply: "Somatic Coaching develops your body's wisdom for greater emotional resilience, reduced stress and deeper self-awareness.\n\nUnlike talk-based coaching, it works with the body directly — training you to read and respond to your physical signals in real time. Sessions are 1:1 with Isabelle.",
      link: null,
      btns: ['How is it different from therapy?','What results can I expect?','How many sessions?','How much does it cost?'] },

    { keys: ['bodywork','somatic bodywork','strozzi','touch','body work','physical','hands on','hands-on','body therapy','manual','somatic body'],
      reply: "Somatic Bodywork uses the Strozzi method — gentle, systematic hands-on touch — to release historical patterns, tensions and contractions held in the body.\n\nIt creates space for more energy, ease and aliveness. Fully clothed. Sessions are tailored 1:1 to your specific patterns.",
      link: null,
      btns: ['How is it different from massage?','Is it safe?','How much does it cost?','What to expect in a session?'] },

    { keys: ['isabelle','practitioner','who is','trainer','about isabelle','biography','background','qualifications','credentials','her story','meet isabelle','isabelle claus','teixeira','who runs','founder'],
      reply: "Isabelle Claus Teixeira is a Global TRE™ Certifying Trainer & Certified TRE™ Provider, ICF PCC Executive Coach, Somatic Coach and Somatic Bodywork Practitioner.\n\nShe brings 30 years of human development experience across 9 countries, has worked with people from 40+ nationalities, and combines deep personal somatic practice with professional training. Based in Singapore and Japan.",
      link: null,
      btns: ['What are her qualifications?','What services does she offer?','Where is she based?','Book a session'] },

    { keys: ['what services','services offered','offer','available','what do you do','what can you help','how can you help','what you offer','what is offered','what do you provide','services','offerings','practices'],
      reply: "HummingBeing offers three core practices:\n\n• TRE™ Exercises — release deep stress & tension through natural tremors\n• Somatic Coaching — body-based coaching for resilience\n• Somatic Bodywork — Strozzi method hands-on bodywork\n\nAll available 1:1, in-person (Singapore/Japan) or online via Zoom.",
      link: null,
      btns: ['What is TRE™?','Tell me about Somatic Coaching','What is Somatic Bodywork?','Which practice is right for me?'] },

    { keys: ['price','cost','how much','fee','rate','investment','money','package','payment','expensive','afford','charges','pricing','fees','packages','rates','invest','pay','value','worth','dollar'],
      reply: "Three options are available:\n\n• 8-Week Coaching Package — S$2,300\n• Deep Dive — Custom pricing for 12–24 sessions\n• Free Discovery Call — $0, 30 minutes\n\nThe free call is a great first step with no commitment required.",
      link: null,
      btns: ['Tell me about the 8-Week Package','Tell me about the Deep Dive','What payment options are there?','What is included?'] },

    { keys: ['starter','8 week','8-week','first package','weekly sessions','starter package','coaching package','2300','2200','$2200','what is included','what included','included','whats included'],
      reply: "The 8-Week Coaching Package is S$2,300 and includes:\n\n• Initial diagnostic session\n• 8 weekly one-on-one coaching sessions\n• Targeted exercises between sessions\n• Follow-up session at 3 months\n\nFully customised to your goals — leadership development, career transition, stress resilience or personal growth.",
      link: null,
      btns: ['Tell me about the Deep Dive','How do I book?','Tell me about the free discovery call','What happens in a session?'] },

    { keys: ['deep dive','deep-dive','12 session','24 session','corporate','leadership','long term','long-term','corporate wellness','team','organisation','company','executive program'],
      reply: "The Deep Dive Package is fully customised — 12 to 24 sessions combining TRE™, Coaching and Bodywork for deeper, lasting transformation.\n\nIncludes priority scheduling, direct access to Isabelle, corporate & leadership programmes, and ongoing integration support. Priced by consultation.",
      link: null,
      btns: ['How is it different from the 8-Week Package?','Tell me about the free discovery call','What is Somatic Coaching?','How do I book?'] },

    { keys: ['book','schedule','appointment','sign up','register','join','how to start','how to book','how do i book','how can i book','get started','begin','start working','work together','make an appointment','booking','reserve','session booking'],
      reply: "Booking is straightforward:\n\n1. Use the contact form on the Book page\n2. Send a WhatsApp message directly to Isabelle\n\nIsabelle personally responds within 1–2 business days. The free discovery call is a great first step.",
      link: { text: 'Go to the Book page', url: '/book' },
      btns: ['Tell me about the free discovery call','How much does it cost?','What to expect in first session?','Can I reschedule?'] },

    { keys: ['discovery call','free call','free session','free chat','30 min','30 minute','consultation','no commitment','no pressure','first call','intro call','introductory','free','trial','no cost','complimentary'],
      reply: "The free 30-minute discovery call is a relaxed, no-pressure conversation with Isabelle. You will explore your situation, ask any questions, and find the right path forward together.\n\nNo sales pitch. No commitment. Just honest conversation.",
      link: { text: 'Book the free call', url: '/book' },
      btns: ['What happens after the call?','How much does it cost?','What services are available?'] },

    { keys: ['location','where','singapore','japan','online','zoom','remote','virtual','in person','travel','country','based','city','place','where is','where are you','sg','jp','virtual session'],
      reply: "Sessions are available in three formats:\n\n• In-person in Singapore\n• In-person in Japan\n• Online via Zoom — for clients anywhere in the world\n\nOnline sessions are equally effective. Isabelle has worked with clients from 40+ countries.",
      link: null,
      btns: ['Is online as effective as in-person?','How do I book?','How much does it cost?'] },

    { keys: ['online effective','zoom effective','virtual work','remote session','online work','does online work','is it effective online','can i do online','is zoom ok','work via zoom','is online as effective as in person','online as effective'],
      reply: "Yes — online sessions via Zoom are equally effective for TRE™ and Somatic Coaching. All you need is a quiet space, comfortable clothing, and a mat or soft surface for TRE™ exercises.\n\nMany of Isabelle's clients have completed their full programme entirely online.",
      link: null,
      btns: ['How do I book an online session?','What do I need?','How much does it cost?'] },

    { keys: ['how long','duration','time','minutes','hours','length','session length','how many sessions','number of sessions','session time','long is','long does','how many sessions do i need'],
      reply: "Session lengths depend on the format:\n\n• Free Discovery Call — 30 min\n• Individual session — 60 to 90 min\n• 8-Week Coaching Package — 8 weekly sessions\n• Deep Dive — 12 to 24 sessions\n\nIsabelle will suggest the right structure during your discovery call.",
      link: null,
      btns: ['Tell me about the 8-Week Package','Tell me about the Deep Dive','Book a free call'] },

    { keys: ['safe','safety','risk','side effect','suitable','beginner','first time','never tried','scared','worry','concern','danger','is it safe','safe for me','contraindication','health condition','is tre safe'],
      reply: "TRE™ and somatic practices are gentle and considered very safe for most people. Isabelle tailors every session to your comfort level and health situation.\n\nIf you have specific medical conditions or concerns, mention them when booking — sessions are always adapted. There are very few contraindications.",
      link: null,
      btns: ['Who is it suitable for?','What to expect in a session?','Book a discovery call'] },

    { keys: ['who is it for','suitable for','right for me','is it for me','who benefits','good for','works for','good candidate','am i right','should i try','who is it suitable for'],
      reply: "Somatic practices can help anyone carrying chronic stress, burnout, anxiety, stored tension or past trauma. They work especially well for:\n\n• Professionals under high pressure\n• People feeling disconnected from their bodies\n• Those who have tried talk therapy without lasting results\n• Anyone curious about body-based approaches",
      link: null,
      btns: ['Is it safe?','What results can I expect?','Book a free discovery call'] },

    { keys: ['stress','burnout','overwhelmed','tense','tight','ache','pain','sleep','relax','calm','tired','exhausted','fatigue','chronic stress','headache','anxious','anxiety','nervous','depression','low energy','dysregulated'],
      reply: "HummingBeing specialises in helping people release chronic stress, burnout and stored physical tension. TRE™, Somatic Coaching and Bodywork all work with the nervous system directly — producing deep, lasting relief rather than temporary fixes.",
      link: null,
      btns: ['What is TRE™?','Tell me about Somatic Coaching','Is it safe for my situation?','Book a session'] },

    { keys: ['trauma','ptsd','past','wound','abuse','grief','loss','difficult','history','past trauma','trauma-informed','stored trauma','old wounds','unprocessed'],
      reply: "Somatic approaches are well-suited for processing stored trauma gently and safely. Isabelle works within a trauma-informed framework — you are always in full control and sessions move entirely at your pace.\n\nYou do not need to relive or retell events for the work to be effective.",
      link: null,
      btns: ['What is TRE™?','Is it safe?','Book a discovery call'] },

    { keys: ['contact','email','reach','get in touch','message','phone','whatsapp','how to contact','connect','communicate','enquire','enquiry','reach out'],
      reply: "You can reach Isabelle in two ways:\n\n• Fill in the contact form on the Book page\n• Send a WhatsApp message — tap the green button visible on any page\n\nShe personally responds within 1–2 business days.",
      link: { text: 'Open the Book page', url: '/book' },
      btns: ['Book a free discovery call','How much does it cost?','What services are available?'] },

    { keys: ['gallery','photo','video','podcast','media','see','look','watch','content','interview','photos','videos','listen'],
      reply: "The Gallery features podcast interviews, session videos and photos from Isabelle's workshops and events. It is a wonderful way to get a feel for her approach and energy before committing to a session.",
      link: { text: 'View the Gallery', url: '/gallery' },
      btns: ['About Isabelle','What services are available?','Book a session'] },

    { keys: ['event','workshop','group','upcoming','schedule','class','programme','program','events','group session','next event','tre workshop','group tre','romania','bucharest','certification','module 1','icf','cceu'],
      reply: "Upcoming events:\n\n• 8 Oct 2026 — Online · From Shaking to Shaping, with Isabelle Claus Teixeira & Saymara Ryon\n• 15–17 Oct 2026 — Bucharest, Romania · TRE™ Module 1 Certification · 21 ICF CCEUs\n• 20 & 24 Oct 2026 — Bucharest · From Shaking to Shaping, in person\n• 2027 Singapore cohort — Global TRE™ Provider Certification, co-taught by Isabelle Claus Teixeira & Simba Stenqvist: Module 1 27–28 Feb, Module 2 3–4 Jul, Module 3 30–31 Oct 2027, plus online supervisions and three self-paced bonus programs (Grounding, Verbal Interventions and an Internal Alchemy introduction).\n\n2027 early-bird pricing (until 31 December 2026): full certification + bonuses from S$5,888 (then S$6,688); Module 1 on its own from S$1,888 (then S$1,988). The 2026 Singapore intake is closed; past 2026 workshops now show as ended. Book an intake call and Isabelle will walk you through the options.",
      link: { text: 'See all upcoming events', url: '/events' },
      btns: ['What is TRE™?','Tell me about the 2027 certification','Book a private session'] },

    { keys: ['2027','certification pricing','provider certification','certified provider','become certified','how much is the certification','certification cost','module 2','module 3','bonus program','internal alchemy','simba','stenqvist','cohort'],
      reply: "The Global TRE™ Provider Certification — 2027 Singapore cohort — is co-taught by Isabelle Claus Teixeira and Simba Stenqvist (creator of Internal Alchemy):\n\n• Module 1 — Your Personal TRE™ Practice · 27–28 Feb 2027 (can be taken on its own)\n• Module 2 — Teaching One Person · 3–4 Jul 2027\n• Module 3 — Teaching Groups · 30–31 Oct 2027\n• Plus online TRE™ sessions & supervisions and three self-paced bonus programs (Grounding, Verbal Interventions, Internal Alchemy).\n\nPricing (early-bird until 31 Dec 2026): full certification + bonuses from S$5,888 (then S$6,688); Module 1 only from S$1,888 (then S$1,988). ICF CCE included with Module 1. One cohort per year in Singapore.",
      link: { text: 'View the 2027 certification', url: '/event-certification-2027' },
      btns: ['See all upcoming events','How do I register?','About Isabelle'] },

    { keys: ['first session','what to expect','what happens','prepare','preparation','my first','what do i need','what to bring','how does a session work','session like','how does a session','session work','what happens in a session','what to expect in a session'],
      reply: "Your first session typically begins with a short conversation about your goals and situation. Nothing is rushed.\n\nFor TRE™ — wear comfortable clothes and have a mat or soft floor space ready. For Coaching — just bring an open, curious mind. Sessions are always tailored to you.",
      link: null,
      btns: ['Is it safe?','How long is a session?','What should I wear?','Book a session'] },

    { keys: ['results','outcome','benefit','benefits','change','improve','help me','feel better','does it work','what will i feel','what changes','what results can i expect','what results can you expect'],
      reply: "Common results reported by clients include:\n\n• Reduced stress, anxiety and chronic tension\n• Improved sleep quality and sustained energy\n• Greater emotional resilience and calm\n• Better relationships and less reactivity\n• A stronger connection to your body and sense of self\n\nResults vary — Isabelle is always honest about realistic expectations.",
      link: null,
      btns: ['What is TRE™?','Tell me about Somatic Coaching','Book a free call'] },

    { keys: ['difference','different from','vs','versus','compare','therapy','talk therapy','physiotherapy','psychology','counselling','meditation','yoga','massage','compared to','how is it different from therapy','different from therapy'],
      reply: "Somatic practices differ from talk therapy by working with the body, not just the mind. Unlike massage, they address nervous system patterns rather than muscle tension alone. Unlike yoga, sessions are 1:1 and tailored to your specific situation.\n\nThey are complementary to therapy and medical care — not a replacement.",
      link: null,
      btns: ['What is TRE™?','Tell me about Somatic Coaching','Book a discovery call'] },

    { keys: ['after call','next steps','what next','after discovery','after free call','then what','what happens after'],
      reply: "After your free discovery call, Isabelle will suggest the approach that best fits your situation — whether that is TRE™, Somatic Coaching, Bodywork or a combination.\n\nIf you decide to proceed, she will send you a package proposal and you choose what feels right. No pressure at any step.",
      link: null,
      btns: ['How much does it cost?','Book the free call','What services are available?'] },

    { keys: ['qualifications','certified','training','credentials','trained','accredited','diploma','certificate','reiki','strozzi','bhd','bhd asia','what are her qualifications','her qualifications'],
      reply: "Isabelle's key credentials include:\n\n• Global TRE™ Certifying Trainer & Certified TRE™ Provider (Dr. David Berceli method)\n• PCC — Professional Certified Coach (ICF)\n• Strozzi Somatic Bodywork Practitioner\n• Reiki Level II Practitioner\n• 30 years HR Leadership in Fortune 100 companies\n• Results Trained Coach (NeuroLeadership Institute)",
      link: null,
      btns: ['About Isabelle','What services does she offer?','Book a session'] },

    { keys: ['which package','compare package','package comparison','starter vs deep','starter or deep','which programme','which program','difference between packages','different from the starter','different from starter','how is it different from the starter','starter vs','which package is right'],
      reply: "Here's how the two packages compare:\n\n• 8-Week Coaching Package — S$2,300 for 8 weekly one-on-one sessions. Ideal for building a foundation and experiencing real, lasting shifts.\n• Deep Dive — custom pricing for 12 to 24 sessions combining TRE™, Coaching & Bodywork, with priority access and integration support, for deeper long-term transformation.\n\nNot sure which fits? The free discovery call will help you decide.",
      link: { text: 'Book the free discovery call', url: '/book' },
      btns: ['Tell me about the 8-Week Package','Tell me about the Deep Dive','Book a free discovery call'] },

    { keys: ['which practice','which service','which is right','tre or coaching','coaching or bodywork','what should i choose','which one is right','tre vs coaching','which is best for me','where do i start','what do you recommend','right service for me'],
      reply: "All three practices work with the nervous system, just through different doors:\n\n• TRE™ — release stored stress & tension through natural tremors\n• Somatic Coaching — build resilience & self-awareness through the body\n• Somatic Bodywork — release held patterns through gentle touch\n\nYou don't have to choose alone — Isabelle will recommend the best fit for you in your free discovery call.",
      link: { text: 'Book a free discovery call', url: '/book' },
      btns: ['What is TRE™?','Tell me about Somatic Coaching','What is Somatic Bodywork?'] },

    { keys: ['what to wear','wear','clothing','clothes','dress','what should i wear','attire','outfit'],
      reply: "Wear comfortable, loose clothing you can move and relax in. For TRE™ and Bodywork, have a mat or soft surface ready — and Bodywork is always done fully clothed.\n\nFor online sessions, just find a quiet, private space. That's all you need.",
      link: null,
      btns: ['What happens in a session?','How do I book?','Is it safe?'] },

    { keys: ['cancel','cancellation','reschedule','rescheduling','change appointment','postpone','refund','money back','miss a session','missed session','change my booking'],
      reply: "Scheduling is handled personally and flexibly. If you need to reschedule, let Isabelle know as early as you can and she'll do her best to find a new time.\n\nFor anything about refunds or a specific package, it's best to raise it directly with Isabelle — she's always fair and transparent.",
      link: { text: 'Message Isabelle', url: '/book' },
      btns: ['How do I book?','Tell me about the free discovery call','How much does it cost?'] },

    { keys: ['payment options','pay in instal','instalment','installment','payment plan','split payment','how do i pay','methods of payment','bank transfer','credit card','paynow','pay later','what payment options are there'],
      reply: "Payment details and any available options are arranged directly with Isabelle once you choose a package. Feel free to ask about payment plans during your discovery call — she's happy to find an arrangement that works for you.",
      link: { text: 'Book a discovery call', url: '/book' },
      btns: ['How much does it cost?','Tell me about the 8-Week Package','How do I book?'] },

    { keys: ['one on one','1 on 1','one to one','individual or group','group or private','private or group','is it one to one','just me'],
      reply: "Most of Isabelle's work is 1:1 — fully personalised to you. Group experiences are available through the workshops and events on the Events page, which are a lovely, lower-cost way to try the work first.\n\nThe discovery call will help you choose what fits best.",
      link: { text: 'See upcoming events', url: '/events' },
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
          ['What is TRE™?','About Isabelle','How much does it cost?','What services are available?'], null);
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
          { text: 'Contact Isabelle directly', url: '/book' });
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
          ['What is TRE™?','Tell me about Somatic Coaching','About Isabelle','How much does it cost?'], null);
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

// ── LEAD CAPTURE → Google Sheet + direct email to Isabelle ──────────────────
var LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxkv934L8ffTxU1TPUiw3jn9Hu6KmdE0Ol1CcJRB_vWstls2xiZHHb-LErG5qHXdTuX/exec';
var LEAD_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/isabelle@bhdasia.com';
function sendLead(data) {
  // 1) Log to the Google Sheet (existing backend)
  try {
    fetch(LEAD_ENDPOINT, { method: 'POST', body: new URLSearchParams(data) }).catch(function(){});
  } catch (e) {}
  // 2) Email the full submission straight to Isabelle (FormSubmit)
  try {
    var payload = {
      _subject: 'New enquiry from hummingbeing.com' + (data.source ? ' — ' + data.source : ''),
      _template: 'table',
      _replyto: data.email || '',
      Name: data.name || '',
      Email: data.email || '',
      Phone: data.phone || '',
      Event: data.event || '',
      Enquiry: data.inquiry || '',
      Source: data.source || '',
      Message: data.message || ''
    };
    fetch(LEAD_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function(){});
  } catch (e) {}
}


// ════════════════════════════════════════════════════════════════════════
// INTERACTIVE LAYER — 2026-09-29 (styles in styles.css, same heading)
// buttons · mobile menu · journey steps · philosophy cards · hummingbird
// ════════════════════════════════════════════════════════════════════════
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var ARROW = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function lum(rgb) {
    var m = (rgb || '').match(/[\d.]+/g); if (!m) return 1;
    var c = m.slice(0, 3).map(function (v) { v = v / 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); });
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  }
  function alpha(rgb) { var m = (rgb || '').match(/[\d.]+/g); return m && m.length > 3 ? +m[3] : 1; }
  // Dark or light surface behind an element: nearest opaque background colour, else
  // anything painting an image/video (hero photos and videos count as dark).
  function onDark(el) {
    for (var e = el.parentElement; e && e !== document.documentElement; e = e.parentElement) {
      var cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && !/gradient/.test(cs.backgroundImage)) return true;
      if (e.querySelector(':scope > video, :scope > .hero-video, :scope > canvas')) return true;
      if (alpha(cs.backgroundColor) > .5) return lum(cs.backgroundColor) < .35;
      if (/gradient/.test(cs.backgroundImage)) {
        var cols = (cs.backgroundImage.match(/rgba?\([^)]+\)/g) || []).filter(function (c) { return alpha(c) >= .5; });
        if (cols.length) { var avg = cols.reduce(function (t, c) { return t + lum(c); }, 0) / cols.length; return avg < .35; }
      }
    }
    return false;
  }

  /* ---------- buttons ---------- */
  function initButtons() {
    document.querySelectorAll('.btn, .nav-cta').forEach(function (b) {
      if (b.dataset.hbBtn) return; b.dataset.hbBtn = '1';
      var inert = b.classList.contains('btn-soldout') || b.classList.contains('btn-ended');
      if (b.classList.contains('btn')) b.classList.add(onDark(b) ? 'on-dark' : 'on-light');
      if (!inert && b.classList.contains('btn') && b.tagName === 'A' && !b.querySelector('.btn-arr, i, svg')) {
        var lt = b.lastChild; if (lt && lt.nodeType === 3) { lt.nodeValue = lt.nodeValue.replace(/\s*[\u2192\u279C\u27F6]\s*$/, ''); } var s = document.createElement('span'); s.className = 'btn-arr'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = ARROW; b.appendChild(s);
      }
      if (inert) return;
      b.addEventListener('pointerdown', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100) + '%');
        b.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100) + '%');
      });
      if (!fine) return;
      b.addEventListener('pointerenter', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100) + '%');
        b.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100) + '%');
      });
      if (reduce) return;
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        b.style.setProperty('--mx', (dx * .18).toFixed(1) + 'px');
        b.style.setProperty('--my', (dy * .28).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100) + '%');
        b.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100) + '%');
        b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px');
      });
    });
  }

  /* ---------- mobile menu ---------- */
  function initMenu() {
    var nav = document.querySelector('nav'), ul = document.querySelector('.nav-links'), btn = document.querySelector('.hamburger');
    if (!nav || !ul || !btn) return;
    btn.setAttribute('aria-label', 'Open menu'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'site-menu');
    if (!ul.id) ul.id = 'site-menu';
    if (!ul.querySelector('.nav-extra')) {
      var li = document.createElement('li'); li.className = 'nav-extra';
      li.innerHTML =
        '<div class="ne-row"><a href="mailto:isabelle@bhdasia.com"><i class="fa-regular fa-envelope"></i>isabelle@bhdasia.com</a>' +
        '<a href="https://wa.me/818065151778" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i>WhatsApp</a></div>' +
        '<div class="ne-soc">' +
        '<a href="https://www.instagram.com/isabelleclausteixeira_bhd/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
        '<a href="https://www.linkedin.com/in/isabelleclausteixeira/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
        '<a href="https://www.youtube.com/@IsabelleClausTeixeira" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a></div>';
      ul.appendChild(li);
    }
    function set(open) {
      ul.classList.toggle('nav-open', open); btn.classList.toggle('open', open);
      nav.classList.toggle('menu-open', open); document.body.classList.toggle('menu-lock', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false'); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) { nav.classList.remove('nav-hidden'); var f = ul.querySelector('a'); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 350); }
      else document.querySelectorAll('.nav-dropdown').forEach(function (d) { d.classList.remove('dropdown-open'); });
    }
    window.toggleMenu = function () { set(!ul.classList.contains('nav-open')); };
    ul.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a || a.classList.contains('nav-dropdown-toggle')) return;
      if (window.innerWidth <= 900) set(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ul.classList.contains('nav-open')) { set(false); btn.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900 && ul.classList.contains('nav-open')) set(false); });
  }

  /* ---------- journey steps ---------- */
  function initSteps() {
    document.querySelectorAll('.steps').forEach(function (wrap) {
      var steps = [].slice.call(wrap.querySelectorAll(':scope > .step')); if (steps.length < 2) return;
      wrap.classList.add('steps-live');
      wrap.style.setProperty('--n', steps.length);
      var track = document.createElement('div'); track.className = 'steps-track'; track.setAttribute('aria-hidden', 'true'); track.innerHTML = '<i></i><b></b>';
      wrap.insertBefore(track, wrap.firstChild);
      var pinned = -1;
      steps.forEach(function (s, i) {
        s.tabIndex = 0;
        var on = function () { pinned = i; paint(i + 1, i); };
        s.addEventListener('mouseenter', on); s.addEventListener('focus', on); s.addEventListener('click', on);
      });
      wrap.addEventListener('mouseleave', function () { pinned = -1; scroll(); });
      function paint(litCount, current) {
        steps.forEach(function (s, i) { s.classList.toggle('lit', i < litCount); s.classList.toggle('is-on', i === current); });
        var p = steps.length > 1 ? Math.max(0, Math.min(1, (litCount - 1) / (steps.length - 1))) : 0;
        wrap.style.setProperty('--p', litCount ? p.toFixed(3) : 0);
      }
      function scroll() {
        if (pinned > -1) return;
        var r = wrap.getBoundingClientRect(), vh = window.innerHeight;
        var prog = Math.max(0, Math.min(1, (vh * .82 - r.top) / (r.height + vh * .25)));
        var n = reduce ? steps.length : Math.round(prog * steps.length);
        paint(n, n - 1);
      }
      window.addEventListener('scroll', scroll, { passive: true }); scroll();
    });
  }

  /* ---------- philosophy cards ---------- */
  function initPhilo() {
    var rows = document.querySelectorAll('.philo-row'); if (!rows.length) return;
    var sec = rows[0].closest('section') || rows[0].parentElement;
    sec.classList.add('philo-live');
    sec.querySelectorAll('.philo-item').forEach(function (c) {
      c.addEventListener('pointerenter', function () { sec.classList.add('has-hover'); });
      c.addEventListener('pointerleave', function () { sec.classList.remove('has-hover'); c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
      if (!fine) return;
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--sx', (x * 100) + '%'); c.style.setProperty('--sy', (y * 100) + '%');
        if (!reduce) { c.style.setProperty('--rx', ((.5 - y) * 6).toFixed(2) + 'deg'); c.style.setProperty('--ry', ((x - .5) * 8).toFixed(2) + 'deg'); }
      });
    });
    if (!fine) { // on touch, light each card as it crosses the middle of the screen
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { en.target.classList.toggle('is-on', en.isIntersecting); }); }, { rootMargin: '-45% 0px -45% 0px' });
      sec.querySelectorAll('.philo-item').forEach(function (c) { io.observe(c); });
    }
  }

  /* ---------- hummingbird section ---------- */
  function initBird() {
    var sec = document.querySelector('.hb-bird'); if (!sec) return;
    var h2 = sec.querySelector('h2');
    if (h2 && !h2.querySelector('.w')) {
      var k = 0;
      h2.innerHTML = h2.innerHTML.split(/(<br\s*\/?>)/i).map(function (part) {
        return /^<br/i.test(part) ? part : part.split(/(\s+)/).map(function (w) { return /^\s+$/.test(w) || !w ? w : '<span class="w" style="transition-delay:' + (k++ * 70) + 'ms">' + w + '</span>'; }).join('');
      }).join('');
    }
    new IntersectionObserver(function (es, o) { es.forEach(function (en) { if (en.isIntersecting) { sec.classList.add('in'); countUp(); o.disconnect(); } }); }, { threshold: .3 }).observe(sec);
    var tagNum = sec.querySelector('.hb-tag b');
    function countUp() {
      if (!tagNum) return; var end = 200, t0 = performance.now(), d = reduce ? 0 : 1600;
      (function t(now) { var p = d ? Math.min(1, (now - t0) / d) : 1; tagNum.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(t); })(t0);
    }
    var fig = sec.querySelector('.two-col-image');
    if (fig && fine && !reduce) {
      fig.addEventListener('pointermove', function (e) {
        var r = fig.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        fig.style.setProperty('--rx', ((.5 - y) * 5).toFixed(2) + 'deg'); fig.style.setProperty('--ry', ((x - .5) * 7).toFixed(2) + 'deg');
        fig.style.setProperty('--px', ((.5 - x) * 18).toFixed(1) + 'px'); fig.style.setProperty('--py', ((.5 - y) * 14).toFixed(1) + 'px');
        fig.style.setProperty('--gx', (x * 100) + '%'); fig.style.setProperty('--gy', (y * 100) + '%');
      });
      fig.addEventListener('pointerleave', function () { ['--rx', '--ry'].forEach(function (p) { fig.style.setProperty(p, '0deg'); }); ['--px', '--py'].forEach(function (p) { fig.style.setProperty(p, '0px'); }); });
    }
    // wing-beat wave: calm by default, "stress" button speeds it up and makes it ragged
    var path = sec.querySelector('.hb-wave path.live'), ctl = sec.querySelector('.hb-wave-ctl button'), lbl = sec.querySelector('.hb-wave-ctl span');
    if (!path) return;
    var stressed = false, amp = 12, freq = 3, jit = 0, ph = 0, raf = 0, visible = false;
    function draw() {
      ph += stressed ? .16 : .045;
      var d = '';
      for (var x = 0; x <= 420; x += 6) {
        var y = 23 + Math.sin(x / 420 * Math.PI * 2 * freq + ph) * amp * Math.sin(x / 420 * Math.PI) + (jit ? (Math.random() - .5) * jit : 0);
        d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1);
      }
      path.setAttribute('d', d);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; cancelAnimationFrame(raf); if (visible) draw(); }).observe(sec);
    draw();
    if (ctl) ctl.addEventListener('click', function () {
      stressed = !stressed; amp = stressed ? 18 : 12; freq = stressed ? 9 : 3; jit = stressed ? 7 : 0;
      ctl.setAttribute('aria-pressed', stressed ? 'true' : 'false');
      ctl.innerHTML = stressed ? '<svg viewBox="0 0 24 24"><path d="M3 12c3-6 6-6 9 0s6 6 9 0"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M2 12h3l2-6 4 12 3-9 2 3h6"/></svg>';
      if (lbl) lbl.textContent = stressed ? 'This is stress: fast and ragged. Tap to release it.' : 'This is a regulated system: steady and calm. Tap to see stress.';
      if (reduce) draw();
    });
  }

  function start() { initButtons(); initMenu(); initSteps(); initPhilo(); initBird(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.hbInitButtons = initButtons; // for content injected later (event grids, countdown)
})();

// ==========================================================================
// EVENT PAGES (.ce-*) INTERACTIVE LAYER — 2026-09-29 (styles in styles.css)
// Every event detail page on the .ce-* template: hero parallax + glow,
// scroll reveals, poster tilt, live status chip, past-event notice, live
// "Other upcoming events" and a phone booking bar. Status and related
// events are read from events.html so they never go stale.
// ==========================================================================
(function () {
  'use strict';
  var hero = document.querySelector('.ce-hero');
  if (!hero) return;
  var body = document.body;
  body.classList.add('ce-live');
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
  function still() { return mqReduce.matches; }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return [].slice.call((c || document).querySelectorAll(s)); }
  function ms(d, end) { return d ? Date.parse(d + (end ? 'T23:59:59' : 'T00:00:00') + '+08:00') : NaN; }
  function statusOf(start, end, sold) {
    var now = Date.now(), s = ms(start, false), e = ms(end || start, true);
    if (sold) return 'sold';
    if (!isNaN(e) && e < now) return 'past';
    if (!isNaN(s) && s <= now) return 'ongoing';
    return 'upcoming';
  }
  function whenText(st, start, end) {
    if (st === 'sold') return 'Sold out';
    if (st === 'past') return 'This event has passed';
    if (st === 'ongoing') return (end && end !== start) ? 'Happening now' : 'Happening today';
    var d = Math.ceil((ms(start, false) - Date.now()) / 864e5);
    return d <= 1 ? 'Starts tomorrow' : 'Starts in ' + d + ' days';
  }
  function slug(h) { return (h || '').split('#')[0].split('?')[0].replace(/^.*\//, '').replace(/\.html$/, ''); }
  var here = slug(location.pathname) || 'index';

  /* ---- hero: parallax background + pointer glow --------------------------- */
  var bg = $('.ce-bg', hero);
  var glow = document.createElement('span'); glow.className = 'ce-glow'; glow.setAttribute('aria-hidden', 'true');
  hero.insertBefore(glow, $('.ce-hero-inner', hero));
  if (!still()) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = window.scrollY || 0;
        if (bg && y < hero.offsetHeight + 200) bg.style.setProperty('--ce-py', (y * .22).toFixed(1) + 'px');
      });
    }, { passive: true });
    if (mqFine.matches) hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      hero.style.setProperty('--ce-gx', (x * 100).toFixed(1) + '%');
      hero.style.setProperty('--ce-gy', (y * 100).toFixed(1) + '%');
      if (bg) bg.style.setProperty('--ce-px', ((.5 - x) * 18).toFixed(1) + 'px');
    });
  }

  /* ---- scroll reveal -------------------------------------------------------- */
  var groups = ['.ce-facts-grid', '.ce-main > *', '.ce-list > li', '.ce-side > .ce-box', '.ce-people > .ce-person', '.ce-sched > *', '.ce-prep', '.ce-related h2', '.ce-rel-grid > .ce-rel'];
  function mark(root) {
    groups.forEach(function (sel) {
      $$(sel, root).forEach(function (el) {
        if (el.classList.contains('ce-rv') || el.closest('.ce-hero')) return;
        var sib = el.parentNode ? [].indexOf.call(el.parentNode.children, el) : 0;
        el.style.setProperty('--ce-d', Math.min(sib, 6) * 70 + 'ms');
        el.classList.add('ce-rv');
        if (io) io.observe(el); else el.classList.add('ce-in');
      });
    });
  }
  var io = (!still() && 'IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('ce-in'); io.unobserve(en.target); } });
  }, { threshold: .1, rootMargin: '0px 0px -5% 0px' }) : null;
  mark(document);

  /* ---- poster tilt + people spotlight --------------------------------------- */
  var poster = $('.ce-poster');
  if (poster && mqFine.matches && !still()) {
    poster.addEventListener('pointermove', function (e) {
      var r = poster.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      poster.classList.add('ce-tilt');
      poster.style.setProperty('--ce-rx', ((.5 - y) * 5).toFixed(2) + 'deg');
      poster.style.setProperty('--ce-ry', ((x - .5) * 7).toFixed(2) + 'deg');
    });
    poster.addEventListener('pointerleave', function () {
      poster.classList.remove('ce-tilt'); poster.style.setProperty('--ce-rx', '0deg'); poster.style.setProperty('--ce-ry', '0deg');
    });
  }
  $$('.ce-person').forEach(function (p) {
    p.addEventListener('pointermove', function (e) {
      var r = p.getBoundingClientRect();
      p.style.setProperty('--ce-mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      p.style.setProperty('--ce-my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
  });

  /* ---- phone booking bar ---------------------------------------------------- */
  var cta = $('.ce-hero-actions a.btn-primary');
  var bar = null, barSub = null;
  function buildBar(sub) {
    if (!cta || bar) return;
    var h1 = $('h1', hero);
    bar = document.createElement('div'); bar.className = 'ce-bar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Book this event');
    var t = document.createElement('div'); t.className = 'ce-bar-t';
    var b = document.createElement('b'); b.textContent = h1 ? h1.textContent.trim() : document.title;
    barSub = document.createElement('span'); barSub.textContent = sub || '';
    t.appendChild(b); t.appendChild(barSub); bar.appendChild(t);
    var btn = cta.cloneNode(true); btn.removeAttribute('id'); btn.removeAttribute('data-hb-btn'); btn.classList.remove('on-dark', 'on-light'); $$('.btn-arr', btn).forEach(function (a) { a.remove(); });
    var lbl = btn.textContent.replace(/[→\s]+$/, '').trim();
    if (lbl.length > 18) btn.textContent = /zoom/i.test(lbl) ? 'Join on Zoom' : 'Register';
    bar.appendChild(btn);
    body.appendChild(bar);
    var heroOut = false, blockers = 0;
    function upd() { body.classList.toggle('ce-bar-on', heroOut && blockers === 0); }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { heroOut = !es[0].isIntersecting; upd(); }).observe(hero);
      var seen = new Map();
      var bo = new IntersectionObserver(function (es) {
        es.forEach(function (en) { seen.set(en.target, en.isIntersecting); });
        blockers = 0; seen.forEach(function (v) { if (v) blockers++; }); upd();
      }, { threshold: .15 });
      $$('.ce-side, #reserve, footer').forEach(function (el) { bo.observe(el); });
    }
    if (window.hbInitButtons) window.hbInitButtons();
  }

  /* ---- sync with events.html ------------------------------------------------ */
  function afterData(items) {
    var mine = items.filter(function (x) { return x.slug === here; })[0];
    var badges = $('.ce-badges', hero);
    var already = badges && /pass|ended|sold/i.test(badges.textContent);
    if (mine && badges && !already && !$('.ce-status', badges)) {
      var chip = document.createElement('span');
      chip.className = 'ce-badge ce-status is-' + mine.status;
      chip.textContent = whenText(mine.status, mine.start, mine.end);
      badges.appendChild(chip);
    }
    var past = mine && mine.status === 'past';
    if (past && !$('.ce-past-note')) {
      var note = document.createElement('div'); note.className = 'ce-past-note';
      note.innerHTML = '<div><p><i class="fa-solid fa-circle-info" aria-hidden="true"></i>This event has already taken place.</p><a href="/events" class="btn btn-primary">See upcoming events</a></div>';
      var facts = $('.ce-facts');
      (facts || hero).parentNode.insertBefore(note, (facts || hero).nextSibling);
    }
    if (!past && (!mine || mine.status !== 'sold')) buildBar(mine ? whenText(mine.status, mine.start, mine.end) : (($('.ce-fact span') || {}).textContent || ''));

    var grid = $('.ce-rel-grid');
    if (grid) {
      var next = items.filter(function (x) { return x.slug !== here && (x.status === 'upcoming' || x.status === 'ongoing'); })
        .sort(function (a, b) { return ms(a.start, false) - ms(b.start, false); }).slice(0, 3);
      if (next.length) {
        grid.innerHTML = '';
        next.forEach(function (x) {
          var a = document.createElement('a'); a.className = 'ce-rel'; a.href = x.href;
          if (x.img) { var im = document.createElement('img'); im.src = x.img; im.alt = x.alt || x.title; im.loading = 'lazy'; im.decoding = 'async'; a.appendChild(im); }
          var b = document.createElement('div'); b.className = 'b';
          var st = document.createElement('strong'); st.textContent = x.title;
          var sp = document.createElement('span'); sp.className = 'ce-rel-meta'; sp.textContent = [x.loc, x.date].filter(Boolean).join(' · ');
          var w = document.createElement('span'); w.className = 'ce-rel-when'; w.textContent = whenText(x.status, x.start, x.end);
          b.appendChild(st); b.appendChild(sp); b.appendChild(w); a.appendChild(b); grid.appendChild(a);
        });
        var inner = grid.parentNode;
        if (!$('.ce-rel-all', inner)) {
          var all = document.createElement('p'); all.className = 'ce-rel-all';
          all.innerHTML = '<a href="/events" class="btn btn-outline">See all events</a>';
          inner.appendChild(all);
        }
        mark(inner);
      }
    }
    if (window.hbInitButtons) window.hbInitButtons();
  }

  if (!window.fetch || !window.DOMParser) { buildBar(''); return; }
  fetch('/events', { cache: 'no-cache', credentials: 'same-origin' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(function (txt) {
      var doc = new DOMParser().parseFromString(txt, 'text/html');
      var items = [];
      ['evt-grid', 'evt-archive'].forEach(function (id) {
        var box = doc.getElementById(id); if (!box) return;
        $$('article.evt-card', box).forEach(function (c) {
          var th = $('.evt-card-thumb', c), img = th && $('img', th), h3 = $('h3', c), loc = $('.evt-tag.loc', c), dt = $('.evt-date-tag', c);
          var sold = c.getAttribute('data-sold') === 'true' || c.classList.contains('is-sold');
          var start = c.getAttribute('data-start'), end = c.getAttribute('data-end');
          if (!th || !start) return;
          items.push({
            href: th.getAttribute('href'), slug: slug(th.getAttribute('href')), img: img ? img.getAttribute('src') : '', alt: img ? img.getAttribute('alt') : '',
            title: h3 ? h3.textContent.trim() : '', loc: loc ? loc.textContent.trim() : '', date: dt ? dt.textContent.trim() : '',
            start: start, end: end, status: statusOf(start, end, sold)
          });
        });
      });
      afterData(items);
    })
    .catch(function () { buildBar(''); });
})();

// ==========================================================================
// AUTO-ADVANCE ENGINE — 2026-09-29
// Every tab set, one-at-a-time button group, "next" carousel and swipe
// track on the site moves to its next item every 3 s and loops.
// Pauses while the pointer is over the section or focus is inside it,
// holds 8 s after the visitor taps / clicks / swipes / types there, only
// counts while the component is on screen and the tab is visible, and the
// count restarts from zero when it resumes. Off for prefers-reduced-motion.
// Opt a component out with data-hb-auto="off" on it or an ancestor.
// ==========================================================================
(function () {
  'use strict';
  var STEP = 3000, HOLD = 8000;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  var drivers = [], claimed = [];
  function $$(s, c) { return [].slice.call((c || document).querySelectorAll(s)); }
  function shown(el) { return !!(el && el.getClientRects().length) && getComputedStyle(el).visibility !== 'hidden'; }
  function excluded(el) {
    if (!el || el.closest('[data-hb-auto="off"], nav, footer, [role="dialog"], [aria-modal="true"], .ecx, .hb-chat-win')) return true;
    var lab = ((el.getAttribute('aria-label') || '') + ' ' + (el.className || '') + ' ' + ((el.closest('[aria-label]') || {}).getAttribute ? el.closest('[aria-label]').getAttribute('aria-label') : '')).toLowerCase();
    return /filter|evt-filter|hx-evf|ev-views|accordion|faq|bk-switch/.test(lab);
  }
  function isClaimed(el) { return claimed.some(function (c) { return c === el || c.contains(el) || el.contains(c); }); }
  function rootOf(el) { return el.closest('section, article, .ce-layout, main > div') || el.parentElement; }

  function add(kind, el, next) {
    if (isClaimed(el)) return;
    claimed.push(el);
    var d = { kind: kind, el: el, root: rootOf(el), next: next, t: 0, vis: false, hover: false, focus: false, holdUntil: 0, engineAt: 0 };
    var r = d.root;
    r.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') d.hover = true; });
    r.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { d.hover = false; d.t = 0; } });
    r.addEventListener('focusin', function (e) { if (e.target.matches(':focus-visible')) d.focus = true; });
    r.addEventListener('focusout', function (e) { if (!r.contains(e.relatedTarget)) { d.focus = false; d.t = 0; } });
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
      r.addEventListener(ev, function (e) { if (e.isTrusted) { d.holdUntil = Date.now() + HOLD; d.t = 0; } }, { passive: true });
    });
    if (kind === 'track') el.addEventListener('scroll', function () { if (Date.now() - d.engineAt > 900) { d.holdUntil = Date.now() + HOLD; d.t = 0; } }, { passive: true });
    io.observe(el);
    drivers.push(d);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) { drivers.forEach(function (d) { if (d.el === en.target) { d.vis = en.intersectionRatio >= .35; if (!d.vis) d.t = 0; } }); });
  }, { threshold: [0, .35, .6] });

  function clickNext(list) {
    var items = list.filter(shown);
    if (items.length < 2) return false;
    var cur = items.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true' || b.getAttribute('aria-pressed') === 'true' || b.getAttribute('aria-current') === 'true'; });
    items[(cur + 1) % items.length].click();
    return true;
  }

  function scan() {
    // 1. tab sets
    $$('[role="tablist"]').forEach(function (tl) {
      if (excluded(tl)) return;
      var tabs = $$('[role="tab"]', tl);
      if (tabs.length < 2) return;
      add('tabs', tl, function () { return clickNext($$('[role="tab"]', tl).filter(function (t) { return !t.disabled && t.getAttribute('aria-disabled') !== 'true'; })); });
    });
    // 2. one-at-a-time button groups (exactly one pressed)
    var seen = [];
    $$('button[aria-pressed]').forEach(function (b) {
      var g = b.parentElement;
      if (seen.indexOf(g) > -1) return; seen.push(g);
      var bs = $$(':scope > button[aria-pressed]', g);
      if (bs.length < 3 || excluded(g)) return;
      if (bs.filter(function (x) { return x.getAttribute('aria-pressed') === 'true'; }).length !== 1) return;
      add('group', g, function () { return clickNext($$(':scope > button[aria-pressed]', g)); });
    });
    // 3. swipe tracks (scroll-snap rows), including those driven by prev/next buttons
    $$('body *').forEach(function (el) {
      if (el.children.length < 2 || excluded(el) || el.querySelector('[role="tab"]')) return;
      var cs = getComputedStyle(el);
      if (!/(auto|scroll)/.test(cs.overflowX) || cs.scrollSnapType === 'none' || /tablist/.test(el.getAttribute('role') || '')) return;
      if (el.scrollWidth <= el.clientWidth + 8) return;
      add('track', el, function () {
        if (el.scrollWidth <= el.clientWidth + 8) return false;
        var kids = [].filter.call(el.children, shown);
        var step = kids.length > 1 ? (kids[1].offsetLeft - kids[0].offsetLeft) : el.clientWidth;
        var d = drivers.filter(function (x) { return x.el === el; })[0]; if (d) d.engineAt = Date.now();
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 6) el.scrollTo({ left: 0, behavior: 'smooth' });
        else el.scrollBy({ left: step, behavior: 'smooth' });
        return true;
      });
    });
    // 4. carousels with a "Next" button but no tabs / track
    $$('button[aria-label^="Next"], button[data-q="1"], button[data-dir="1"]').forEach(function (b) {
      var box = b.closest('section, article, [class*="carousel"], [class*="slider"]') || b.parentElement;
      var ctl = b.getAttribute('aria-controls') && document.getElementById(b.getAttribute('aria-controls'));
      if (excluded(b) || b.closest('.hx-q') || isClaimed(box) || (ctl && isClaimed(ctl))) return;
      add('next', box, function () {
        if (!shown(b)) return false;
        if (b.disabled) { var prev = box.querySelector('button[aria-label^="Prev"], button[data-dir="-1"]'); var n = 30; while (prev && !prev.disabled && n--) prev.click(); return true; }
        b.click(); return true;
      });
    });
  }

  var last = Date.now();
  function tick() {
    var now = Date.now(), dt = Math.min(now - last, 500); last = now;
    if (document.hidden) return;
    drivers.forEach(function (d) {
      var live = d.vis && !d.hover && !d.focus && now >= d.holdUntil && shown(d.el);
      if (!live) { d.t = 0; return; }
      d.t += dt;
      if (d.t >= STEP) { d.t = 0; d.engineAt = now; try { d.next(); } catch (e) {} }
    });
  }
  function start() {
    scan();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(scan, 800); });
    setInterval(tick, 200);
    document.addEventListener('visibilitychange', function () { drivers.forEach(function (d) { d.t = 0; }); last = Date.now(); });
    window.hbAuto = { state: function () { return drivers.map(function (d) { return d.kind + ' vis:' + d.vis + ' hover:' + d.hover + ' focus:' + d.focus + ' hold:' + Math.max(0, d.holdUntil - Date.now()) + ' t:' + d.t; }); }, list: function () { return drivers.map(function (d) { return d.kind + ':' + (d.el.id || d.el.className || d.el.tagName).toString().slice(0, 40); }); }, rescan: scan };
  }
  // scripts.js is deferred, so every page script has already built its components here
  setTimeout(start, 400);
  window.addEventListener('load', function () { setTimeout(function () { if (window.hbAuto) window.hbAuto.rescan(); }, 800); });
})();
