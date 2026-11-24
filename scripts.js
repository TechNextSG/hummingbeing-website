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
  /* 25 Nov 2026 chatbot audit: facts re-checked against every page (prices, dates, payment terms, policies);
     the event list is dated and drops past events by itself; matching is whole-word (the old substring match sent
     "I feel anxious" to pricing because "feel" contains "fee", and "your" to the greeting because it contains "yo").
     When a page changes, change the matching line here too. Test: ~/ClaudeWork/qa/hb-chatbot/harness.js */
  var EVENTS = [
    { dates: ['2026-11-25'], text: 'The Body in the Room with Aun Ali · online, 7–9pm SGT · S$88' },
    { dates: ['2026-12-15'], text: 'Breath as a medicine with Ania Zielińska · online, 7–9pm SGT · S$88' },
    { dates: ['2027-01-24'], text: 'The Art of Conscious Rest with Olga Titkova · online, 8–10pm SGT · S$88' },
    { dates: ['2027-02-23', '2027-06-29', '2027-11-03'], text: 'Introduction to TRE™ · Singapore, 7–9pm · S$88' },
    { dates: ['2027-02-24', '2027-06-30', '2027-11-02'], text: 'Shaking to Shaping, TRE™ for Coaches · Singapore, 7–10pm · S$149 · 3 ICF CCEs' },
    { dates: ['2027-04-24', '2027-07-03', '2027-10-30'], text: 'TRE™ Certification 2027, Singapore (3 modules) · from S$2,200 early bird' },
    { dates: ['2027-05-28'], text: 'TRE™ Module 1, Lisboa · 28–30 May · from €739' },
    { dates: ['2027-05-28', '2027-06-01', '2027-10-22'], text: 'TRE™ Certification, Lisboa (3 modules) · from €2,949 early bird' },
    { dates: ['2027-06-18'], text: 'TRE™ Module 1 online with TRE Scotland · 18–20 June · from £488' }
  ];
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function eventsReply() {
    var t = new Date(), today = t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2);
    var up = [];
    EVENTS.forEach(function (e) {
      var next = e.dates.filter(function (d) { return d >= today; })[0];
      if (next) up.push({ d: next, more: e.dates.length - 1 - e.dates.indexOf(next), text: e.text });
    });
    up.sort(function (a, b) { return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; });
    if (!up.length) return "New dates are being planned. The Events page always has the latest, or message Isabelle and she will let you know first.";
    var fmt = function (d) { var p = d.split('-'); return +p[2] + ' ' + MON[+p[1] - 1] + ' ' + p[0]; };
    return 'Coming up next:\n\n' + up.slice(0, 6).map(function (e) {
      return '• ' + fmt(e.d) + (e.more ? ' (+' + e.more + ' more date' + (e.more > 1 ? 's' : '') + ')' : '') + ' · ' + e.text;
    }).join('\n') + (up.length > 6 ? '\n\n…and more on the Events page.' : '');
  }

  function onlineReply() {
    var t = new Date(), today = t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2);
    var fmt = function (d) { var p = d.split('-'); return +p[2] + ' ' + MON[+p[1] - 1] + ' ' + p[0]; };
    var up = EVENTS.filter(function (e) { return e.text.indexOf('online,') !== -1 && e.dates[0] >= today; });
    if (!up.length) return "New live online workshops are being planned. The Events page always has the latest.";
    return 'Live online workshops on Zoom, S$88 each (S$68 with a discount code):\n\n' +
      up.map(function (e) { return '• ' + fmt(e.dates[0]) + ' · ' + e.text.replace(' · S$88', ''); }).join('\n');
  }

  /* only: answers that input word alone (generic one-word questions); w: weight (greetings lose to any real topic). */
  var KB = [
    { keys: ['hello','hi','hey','morning','good morning','good afternoon','good evening','howdy','greetings','hiya','yo','aloha','namaste','hola','bonjour'], w: 0.5,
      reply: "Hi! I'm the HummingBeing assistant. I can answer questions about TRE™, coaching, events, the TRE™ certification, prices and booking. What would you like to know?",
      link: null,
      btns: ['What is TRE™?','Upcoming events','About Isabelle','How much does it cost?'] },

    { keys: ['how'], only: true,
      reply: "Happy to help! What would you like to know?\n\n• How much does it cost?\n• How does a session work?\n• How do I book?\n• How long are sessions?",
      link: null,
      btns: ['How much does it cost?','How does a session work?','How do I book?','How long is a session?'] },

    { keys: ['when'], only: true,
      reply: "Private sessions are arranged with Isabelle year-round, in Singapore, Japan and online. Group events have fixed dates; ask me about upcoming events.",
      link: { text: 'See upcoming events', url: '/events' },
      btns: ['Upcoming events','How do I book a session?','How much does it cost?'] },

    { keys: ['what'], only: true,
      reply: "What would you like to explore?\n\n• What services are available?\n• What results can you expect?\n• What happens in a first session?",
      link: null,
      btns: ['What services are available?','What results can I expect?','What happens in a session?'] },

    { keys: ['why'], only: true,
      reply: "HummingBeing exists because the body holds answers the mind alone cannot always reach.\n\nMost wellness approaches work only with thoughts. Somatic practices work directly with the nervous system, through the body's own natural release mechanisms.",
      link: null,
      btns: ['What is TRE™?','Tell me about Somatic Coaching','About Isabelle'] },

    { keys: ['info','information','more info','learn more','tell me more','know more','details'], only: true,
      reply: "I can share information about:\n\n• TRE™, Somatic Coaching and Bodywork\n• Upcoming events and the TRE™ certification\n• Isabelle and her qualifications\n• Prices, payment and booking\n\nWhat would you like to explore?",
      link: null,
      btns: ['What services are available?','Upcoming events','How much does it cost?','How do I book?'] },

    { keys: ['tre','tension release','trauma release','tremor','tremors','tension and trauma','tension trauma','shaking','psoas','berceli','tremoring','tre exercises','what is tre','tell me about tre','explain tre','tension and trauma releasing exercises'],
      reply: "TRE™ (Tension & Trauma Releasing Exercises) is a short sequence of simple exercises that activates your body's natural tremor reflex to release stress and tension.\n\nDeveloped by Dr. David Berceli, it is gentle and beginner-friendly, and you can stop the tremors at any time. Most people can practise on their own after 3–4 guided sessions.",
      link: { text: 'Read the TRE™ FAQ', url: '/tre-faq' },
      btns: ['Is TRE™ safe?','Upcoming events','How many sessions do I need?','How much does it cost?'] },

    { keys: ['neurogenic','neurogenic tremors','why does the body shake','why do we shake','why shake','science','scientific','scientifically','proven','evidence','research','polyvagal','nervous system','vagus','vagal'],
      reply: "Tremoring is a natural way for the nervous system to settle after stress; you can see it in many mammals. TRE™ gently invites this reflex in a safe, controlled way.\n\nThe guides below explain the science of neurogenic tremors and what happens in the body during a practice.",
      link: { text: 'The science of neurogenic tremors', url: '/neurogenic-tremors-stress-anxiety' },
      btns: ['What happens during tremoring?','Is TRE™ safe?','TRE™ vs Somatic Experiencing'] },

    { keys: ['what happens during tremoring','during tremoring','what happens during','how does tre feel','what does tre feel like','what does it feel like','feel like','what does a session feel like'],
      reply: "During TRE™ you lie on a mat after a few gentle preparation exercises, and a soft tremor usually starts in the legs and may travel through the body. You stay in control: straighten your legs and lie flat, or roll onto your side, and it settles within moments.\n\nAfterwards most people feel calmer and more grounded; some feel tired, slightly sore or emotional for a day.",
      link: { text: 'What happens during tremoring', url: '/what-happens-during-neurogenic-tremoring' },
      btns: ['Is TRE™ safe?','How do I stop the tremors?','Upcoming events'] },

    { keys: ['stop the tremors','stop tremors','stop shaking','how do i stop','can i stop','control the tremors'],
      reply: "Straighten your legs and lie flat, or roll onto your side. The tremors settle within moments, and you stay in control the whole time.",
      link: null,
      btns: ['Is TRE™ safe?','What happens during tremoring?','Book a free discovery call'] },

    { keys: ['somatic experiencing','tre vs somatic experiencing','se therapy','peter levine','difference between tre and se','tre or se'],
      reply: "TRE™ and Somatic Experiencing (SE) are separate approaches with different founders, trainings and methods. Both are body-based. TRE™ is designed to be learned: most people practise on their own after 3–4 guided sessions, while SE usually unfolds over a series of practitioner-led sessions.",
      link: { text: 'TRE™ vs Somatic Experiencing', url: '/tre-vs-somatic-experiencing' },
      btns: ['What is TRE™?','Is TRE™ safe?','Book a free discovery call'] },

    { keys: ['somatic coaching','somatic coach','coaching','coach me','embodied','emotional resilience','body coaching','life coach','life coaching','mind body','body awareness','inner work','self awareness','resilience','burnout coaching'],
      reply: "Somatic Coaching develops your body's wisdom for greater emotional resilience, less stress and deeper self-awareness.\n\nUnlike talk-based coaching, it works with the body directly, training you to read and respond to your physical signals in real time. Sessions are 1:1 with Isabelle, 60–75 minutes, and coaching typically runs 6–12 sessions.",
      link: { text: 'Somatic coaching for burnout', url: '/somatic-coaching-burnout-singapore' },
      btns: ['How is it different from therapy?','Tell me about the 8-Week Package','How much does it cost?'] },

    { keys: ['holistic mastermind','mastermind','four pillars','4 pillars','executive coaching','executive coach','leadership coaching','leaders','leader','leadership','ceo','executives','executive','senior leader','high performer'],
      reply: "The Holistic Mastermind is Isabelle's framework for leaders: four pillars worked together.\n\n• The Tactical Mind: values, beliefs, saboteurs, resilience\n• The Somatic Vessel: TRE™, breathwork, somatic coaching, EFT\n• The Energetic Matrix: clearing deep-rooted burnout patterns\n• The Expressive Vision: purpose and presence\n\nIt starts with a free discovery call.",
      link: { text: 'Explore the Holistic Mastermind', url: '/holistic-mastermind' },
      btns: ['Tell me about the Deep Dive','Executive retreats','Book a free discovery call'] },

    { keys: ['bodywork','somatic bodywork','strozzi','touch','body work','hands on','body therapy','somatic body'],
      reply: "Somatic Bodywork uses the Strozzi method: gentle, systematic hands-on touch to release historical patterns, tensions and contractions held in the body.\n\nIt creates space for more energy, ease and aliveness. Always fully clothed, tailored 1:1 to your patterns.",
      link: null,
      btns: ['How is it different from massage?','Is it safe?','How much does it cost?','What happens in a session?'] },

    { keys: ['mindfulness','meditation','meditate','breathwork','breathing','breath work','pranayama','yoga nidra','reiki','eft','tapping','tft','energy healing','shamanism','core shamanism','healing circle'],
      reply: "Alongside TRE™ and coaching, Isabelle teaches mindfulness and breathwork (60–75 min sessions) and is a Reiki and Core Shamanism healer; EFT and breathwork are part of her leadership work too.\n\nThe online workshops also cover breathwork (Breath as a medicine) and Yoga Nidra (The Art of Conscious Rest).",
      link: { text: 'Book a free discovery call', url: '/book' },
      btns: ['Upcoming events','Tell me about Somatic Coaching','How much does it cost?'] },

    { keys: ['isabelle','practitioner','trainer','about isabelle','biography','background','her story','meet isabelle','isabelle claus','teixeira','who runs','founder','about you','who are you'],
      img: { src: '/images/isabelle-chat.webp', alt: 'Isabelle Claus Teixeira', cap: 'Isabelle Claus Teixeira · Founder, Coach & TRE™ Trainer' },
      reply: "Isabelle Claus Teixeira is a Global TRE™ Certifying Trainer, trained directly under Dr. David Berceli, an ICF PCC Senior Executive Coach, Somatic Coach, Somatic Bodyworker, Mindfulness Teacher and Breathwork Facilitator.\n\nBefore this she spent over 30 years in Fortune 100 HR and talent leadership across 9 countries. She has worked with people from 40+ nationalities and is based in Singapore and Japan.",
      link: { text: 'Meet Isabelle', url: '/isabelle' },
      btns: ['What are her qualifications?','What services does she offer?','Where is she based?','Book a session'] },

    { keys: ['qualifications','qualified','certified','credentials','trained','accredited','diploma','certificate','what are her qualifications','her qualifications','pcc','icf pcc'],
      img: { src: '/images/isabelle-chat.webp', alt: 'Isabelle Claus Teixeira', cap: 'Isabelle Claus Teixeira · Founder, Coach & TRE™ Trainer' },
      reply: "Isabelle's key credentials:\n\n• Global TRE™ Certifying Trainer & Certified TRE™ Provider (trained under Dr. David Berceli)\n• PCC, Professional Certified Coach (ICF)\n• Strozzi Somatic Bodywork Practitioner\n• Results Trained Coach (NeuroLeadership Institute)\n• Reiki Level II Practitioner\n• 30+ years in Fortune 100 HR & talent leadership",
      link: { text: 'Meet Isabelle', url: '/isabelle' },
      btns: ['About Isabelle','What services does she offer?','Book a session'] },

    { keys: ['what services','services offered','what do you do','what can you help','how can you help','what you offer','what do you offer','what is offered','what do you provide','services','offerings','practices','what services does she offer','what services are available'],
      reply: "HummingBeing offers:\n\n• TRE™: release deep stress & tension through natural tremors\n• Somatic Coaching: body-based coaching for resilience\n• Somatic Bodywork: Strozzi method hands-on bodywork\n• Mindfulness & breathwork\n• Group workshops, retreats and the TRE™ provider certification\n\nPrivate sessions are 1:1, in person (Singapore, Japan) or online via Zoom.",
      link: null,
      btns: ['What is TRE™?','Tell me about Somatic Coaching','Upcoming events','Which practice is right for me?'] },

    { keys: ['price','cost','costs','how much','fee','fees','rate','rates','investment','money','expensive','afford','charges','pricing','invest','value','worth','dollar','sgd','budget','cheap'],
      reply: "Private work:\n\n• Free Discovery Call: $0, 30 minutes\n• 8-Week Coaching Package: S$2,300\n• Deep Dive (12–24 sessions): priced by consultation\n\nGroup events: online workshops S$88, Introduction to TRE™ S$88, Shaking to Shaping S$149, TRE™ certification from S$2,200 (Singapore) or €2,949 (Lisboa).",
      link: { text: 'Sessions & pricing', url: '/book' },
      btns: ['Tell me about the 8-Week Package','Tell me about the 2027 certification','What payment options are there?','Upcoming events'] },

    { keys: ['starter','8 week','8 weeks','eight week','first package','weekly sessions','starter package','coaching package','2300','what is included','whats included','included','8 week package','tell me about the 8 week package'],
      reply: "The 8-Week Coaching Package is S$2,300 and includes:\n\n• Initial diagnostic session\n• 8 weekly one-on-one coaching sessions\n• Targeted exercises between sessions\n• Follow-up session at 3 months\n\nFully customised to your goals: leadership, career, stress resilience or personal growth.",
      link: { text: 'Get started', url: '/book' },
      btns: ['Tell me about the Deep Dive','How do I book?','Tell me about the free discovery call'] },

    { keys: ['deep dive','12 sessions','24 sessions','long term','executive program','executive programme','tell me about the deep dive'],
      reply: "The Deep Dive is a longer, fully personal journey: 12 to 24 sessions combining TRE™, Coaching and Bodywork.\n\nIt includes priority scheduling, direct access to Isabelle, corporate & leadership programmes and ongoing integration support. Priced by consultation.",
      link: { text: 'Enquire about the Deep Dive', url: '/book' },
      btns: ['How is it different from the 8-Week Package?','Tell me about the free discovery call','How do I book?'] },

    { keys: ['which package','compare package','compare packages','package comparison','starter vs deep','which programme','which program','difference between packages','different from the 8 week package','how is it different from the 8 week package','which package is right'],
      reply: "• 8-Week Coaching Package: S$2,300 for 8 weekly 1:1 sessions plus a 3-month follow-up. Ideal for building a foundation and real, lasting shifts.\n• Deep Dive: 12–24 sessions combining TRE™, Coaching & Bodywork, with priority access and integration support, priced by consultation.\n\nNot sure? The free discovery call will help you decide.",
      link: { text: 'Book the free discovery call', url: '/book' },
      btns: ['Tell me about the 8-Week Package','Tell me about the Deep Dive','Book a free discovery call'] },

    { keys: ['book','booking','schedule a session','appointment','book a session','how to book','how do i book','how can i book','get started','how to start','start working','work together','make an appointment','reserve a session','book a private session','private session','book a session before you go'],
      reply: "Booking a private session is simple:\n\n1. Send the form on the Book page, or\n2. WhatsApp Isabelle on +81 80 6515 1778\n\nIsabelle replies personally within 1–2 business days. The free 30-minute discovery call is the usual first step.\n\nFor a group event, use the Register button on that event's page.",
      link: { text: 'Go to the Book page', url: '/book' },
      btns: ['Tell me about the free discovery call','How do I register for an event?','How much does it cost?'] },

    { keys: ['register','registration','sign up','signup','enrol','enroll','join an event','buy a ticket','ticket','tickets','reserve my place','reserve a place','how do i register','how do i register for an event'],
      reply: "To join an event, open its page from the Events page and press Register (certifications: Reserve your place). Fill in your details, then you are taken to payment. Card or bank transfer details are on each page.\n\nHave a discount code? Enter it in the registration form and you are taken to the discounted price.",
      link: { text: 'See all events', url: '/events' },
      btns: ['Upcoming events','Do you have a discount code?','What payment options are there?'] },

    { keys: ['discount','discount code','promo','promo code','coupon','voucher','code','cheaper','concession','early bird','earlybird','early bird price','when does early bird end'],
      reply: "• Online workshops: S$88, or S$68 with a discount code\n• Introduction to TRE™: S$88, or S$66 with a code\n• Shaking to Shaping: S$149, or S$129 with a code\n• Certification early bird ends 31 Mar 2027 (Singapore and Lisboa); Lisboa Module 1 early bird is for the first 10 tickets; TRE Scotland early bird ends 31 May 2027\n\nEnter your code in the event's registration form.",
      link: { text: 'See all events', url: '/events' },
      btns: ['Upcoming events','How do I register for an event?','What payment options are there?'] },

    { keys: ['discovery call','free call','free session','free chat','30 min','30 minute','30 minutes','consultation','no commitment','first call','intro call','introductory call','free','trial','no cost','complimentary','tell me about the free discovery call','book a free discovery call','book a discovery call','book the free call','book a free call'],
      reply: "The free 30-minute discovery call is a relaxed, no-pressure video or phone call with Isabelle. You explore your situation, ask anything, and find the right path together.\n\nNo sales pitch, no commitment. Book it with the form on the Book page or by WhatsApp.",
      link: { text: 'Book the free call', url: '/book' },
      btns: ['What happens after the call?','How much does it cost?','What services are available?'] },

    { keys: ['location','where','singapore','japan','tokyo','in person','travel','country','based','city','place','address','venue','studio','where is','where are you','sg','jp','where is she based','where are sessions held'],
      reply: "• In person in Singapore\n• In person in Japan (Tokyo and beyond)\n• Online via Zoom, anywhere in the world\n\nFor group events, the venue details are sent to registered participants. Isabelle has worked with people from 40+ nationalities.",
      link: null,
      btns: ['Is online as effective as in-person?','Upcoming events','How do I book?'] },

    { keys: ['online','zoom','remote','virtual','online session','online sessions','zoom session','online effective','is online as effective as in person','online as effective','do you do online','learn online','work via zoom','prepare for an online session','online preparation','camera'],
      reply: "Yes. Every private session works online via Zoom, and many clients do their whole programme online.\n\nFor online TRE™ your facilitator must see you head to toe, standing and on the mat. Have a yoga mat, a camera about 2–2.5 m away, good light, loose light-coloured trousers, and headphones for group classes. A trusted person nearby and a signed consent form are also asked for.",
      link: { text: 'How to prepare for an online session', url: '/online-session-preparation' },
      btns: ['How do I book an online session?','Upcoming events','How much does it cost?'] },

    { keys: ['how long','duration','minutes','hours','length','session length','long is','long does','how long is a session','how long are sessions'],
      reply: "• Free Discovery Call: 30 min\n• TRE™ session: 60–90 min\n• Coaching or Mindfulness session: 60–75 min\n• 8-Week Coaching Package: 8 weekly sessions + follow-up\n• Deep Dive: 12–24 sessions\n\nGroup workshops are 2–3 hours; the time is on each event page.",
      link: null,
      btns: ['How many sessions do I need?','Tell me about the 8-Week Package','Book a free call'] },

    { keys: ['how many sessions','number of sessions','how many sessions do i need','how many sessions will i need','how often','practise','practice at home','at home','on my own','by myself','alone','self practice','self practise','daily practice'],
      reply: "It varies. Most people can practise TRE™ on their own after 3–4 guided sessions with a certified provider, then use it as a lifelong self-regulation tool at home. Coaching typically runs 6–12 sessions.\n\nIsabelle is upfront about what she thinks you need.",
      link: { text: 'Read the TRE™ FAQ', url: '/tre-faq' },
      btns: ['How long is a session?','How much does it cost?','Book a free discovery call'] },

    { keys: ['safe','safety','risk','risks','side effect','side effects','danger','dangerous','is it safe','safe for me','contraindication','contraindications','make things worse','worse','is tre safe','is it safe for my situation'],
      reply: "For most healthy adults TRE™ is a gentle, low-risk practice, and you can stop the tremors at any time. Sessions start with short tremor periods and the first ones are guided.\n\nIf you have a history of complex trauma, dissociation or a diagnosed mental health condition, speak to your doctor or therapist first, and tell Isabelle when you book.",
      link: { text: 'Read: Is TRE™ safe?', url: '/is-tre-safe' },
      btns: ['Who is it suitable for?','How do I stop the tremors?','Book a discovery call'] },

    { keys: ['safe during pregnancy','during pregnancy','while pregnant','when pregnant','pregnant','pregnancy','injury','injured','surgery','operation','medical condition','medication','disability','chronic illness','heart condition','back pain','health issue','health condition','psychiatric','epilepsy','ptsd','c ptsd','cptsd'],
      reply: "Please speak to your doctor (or midwife) first, and tell Isabelle before the session so the practice can be adapted or postponed.\n\nThe Introduction to TRE™ group workshop is not suitable during pregnancy, within 8 weeks of surgery or severe injury, or with diagnosed psychiatric conditions, PTSD or C-PTSD; private sessions are recommended instead.",
      link: { text: 'Read: Is TRE™ safe?', url: '/is-tre-safe' },
      btns: ['Is it safe?','Book a discovery call','What happens in a session?'] },

    { keys: ['who is it for','suitable for','right for me','is it for me','who benefits','good for','works for','good candidate','should i try','who is it suitable for','beginner','beginners','first time','never tried','no experience','experience needed','previous experience','fitness','fit enough','age','old','elderly','kids','children','child','teen','teenager','teenagers'],
      reply: "TRE™ suits anyone who wants a simple, body-based way to manage stress: busy professionals, leaders, coaches, therapists, carers and people recovering from burnout. No fitness level or experience is needed.\n\nFor children, teenagers or anyone with health concerns, please ask Isabelle first; she will tell you honestly what fits.",
      link: null,
      btns: ['Is it safe?','What results can I expect?','Book a free discovery call'] },

    { keys: ['stress','stressed','burnout','burned out','burnt out','burn out','overwhelmed','tense','tension','tight','ache','pain','sleep','insomnia','cant sleep','relax','calm','tired','exhausted','fatigue','headache','anxious','anxiety','nervous','panic','depression','low energy','dysregulated','overthinking'],
      reply: "HummingBeing specialises in helping people release chronic stress, burnout and stored physical tension. TRE™, Somatic Coaching and Bodywork all work with the nervous system directly, for deep, lasting relief rather than temporary fixes.\n\nIf you are struggling right now, a free call with Isabelle is a gentle first step.",
      link: { text: 'Book a free discovery call', url: '/book' },
      btns: ['What is TRE™?','Tell me about Somatic Coaching','Is it safe for my situation?'] },

    { keys: ['trauma','past','wound','abuse','grief','loss','difficult','past trauma','trauma informed','stored trauma','old wounds','unprocessed','talk about my trauma','talk about it','relive'],
      reply: "You never need to talk about what happened: the body releases in its own way, no story required. Isabelle works in a trauma-informed way, so you stay in control and everything moves at your pace.\n\nWith complex trauma or PTSD, private sessions are recommended, alongside your therapist.",
      link: null,
      btns: ['What is TRE™?','Is it safe?','Book a discovery call'] },

    { keys: ['difference','different from','vs','versus','compare','therapy','therapist','talk therapy','physiotherapy','psychology','psychologist','counselling','counseling','yoga','massage','compared to','how is it different from therapy','how is it different from massage','medical','doctor','replace therapy'],
      reply: "TRE™ is a self-help practice, not a therapy: it works with the body rather than with conversation, and many people use it alongside therapy or coaching. Unlike massage, these practices work with nervous-system patterns, not only muscles. Unlike a yoga class, private sessions are 1:1 and tailored to you.\n\nThey complement therapy and medical care; they do not replace them.",
      link: null,
      btns: ['TRE™ vs Somatic Experiencing','What is TRE™?','Book a discovery call'] },

    { keys: ['contact','email','reach','get in touch','message','phone','whatsapp','whatsapp number','phone number','number','call isabelle','how to contact','connect','enquire','enquiry','reach out','contact isabelle','how do i contact','how can i contact','how to reach','speak to someone','human','real person'],
      reply: "WhatsApp Isabelle on +81 80 6515 1778, or send the form on the Book page. She reads every message herself and replies within 1–2 business days.",
      link: { text: 'Open the Book page', url: '/book' },
      btns: ['Book a free discovery call','How much does it cost?','Upcoming events'] },

    { keys: ['gallery','photo','photos','picture','pictures','video','videos','podcast','media','interview','listen','watch'],
      reply: "The Gallery has podcast interviews, session videos and photos from Isabelle's workshops and events: a good way to get a feel for her approach before a session.",
      link: { text: 'View the Gallery', url: '/gallery' },
      btns: ['About Isabelle','Follow on social media','Book a session'] },

    { keys: ['social','social media','instagram','facebook','linkedin','youtube','follow','newsletter','updates','news','mailing list','subscribe','stay in touch','follow on social media'],
      reply: "Follow Isabelle on Instagram, Facebook, LinkedIn and YouTube, and join the newsletter for new events and practices. All the links are on the Socials page.",
      link: { text: 'Socials & newsletter', url: '/socials' },
      btns: ['Upcoming events','View the Gallery','About Isabelle'] },

    { keys: ['event','events','workshop','workshops','group','upcoming','class','classes','programme','program','group session','next event','tre workshop','group tre','upcoming events','see all upcoming events','see upcoming events','view upcoming events','whats on','what is on'],
      reply: eventsReply,
      link: { text: 'See all upcoming events', url: '/events' },
      btns: ['Tell me about the 2027 certification','TRE™ in Lisboa','Online workshops'] },

    { keys: ['online workshop','online workshops','body in the room','the body in the room','breath as a medicine','breath as medicine','art of conscious rest','conscious rest','aun ali','ania','zielinska','ania zielinska','olga','titkova','olga titkova','guest teacher','psychotherapy'],
      reply: onlineReply,
      link: { text: 'See all upcoming events', url: '/events' },
      btns: ['How do I register for an event?','Do you have a discount code?','Upcoming events'] },

    { keys: ['introduction to tre','intro to tre','intro tre','introduction','intro evening','tre thailand','beginner workshop','try tre','tre for beginners','general public'],
      reply: "Introduction to TRE™ is a 2-hour, in-person workshop in Singapore for anyone curious, with a full TRE™ session guided by Isabelle and Simba Stenqvist, with TRE Thailand.\n\nTue 23 Feb, Tue 29 Jun or Wed 3 Nov 2027, 7–9pm · S$88 (S$66 with a code). Personal TRE™ sessions can be added at S$180 each.",
      link: { text: 'Introduction to TRE™', url: '/event-intro-tre-singapore-2027' },
      btns: ['How do I register for an event?','Is it safe?','Upcoming events'] },

    { keys: ['shaking to shaping','tre for coaches','for coaches','coaches','coach training'],
      reply: "Shaking to Shaping is an ICF-accredited Introduction to TRE™ for coaches: a 3-hour, in-person workshop in Singapore with 3 ICF CCEs.\n\nWed 24 Feb, Wed 30 Jun or Tue 2 Nov 2027, 7–10pm · S$149 (S$129 with a code). Personal TRE™ sessions can be added at S$180 each.",
      link: { text: 'Shaking to Shaping', url: '/event-shaking-to-shaping-singapore' },
      btns: ['Tell me about ICF CCEs','Tell me about the 2027 certification','How do I register for an event?'] },

    { keys: ['2027','certification','certification 2027','provider certification','certified provider','become certified','become a provider','tre provider','become a tre provider','teach tre','how much is the certification','certification cost','modules','module 1','module 2','module 3','how many modules','growth','growth package','foundational','foundational package','refresher','refresher package','cohort','bonus','bonuses','tell me about the 2027 certification'],
      reply: "To become a Global TRE™ Provider you complete Modules 1, 2 and 3, each with online sessions and supervision, plus practice requirements.\n\nSingapore 2027, with Isabelle and Simba Stenqvist: 24–25 Apr, 3–4 Jul, 30–31 Oct.\n• Growth (with ICF credits + 3 bonus programmes): S$5,888 early bird, then S$6,888\n• Foundational: S$4,888 early bird, then S$5,888\n• Refresher (for providers & trainees): from S$2,200\n\nEarly bird ends 31 Mar 2027. Card or bank transfer, in full or 3 instalments.",
      link: { text: 'View the 2027 packages', url: '/event-certification-2027' },
      btns: ['TRE™ in Lisboa','Tell me about ICF CCEs','How do I register for an event?'] },

    { w: 1.4, keys: ['lisbon certification','lisboa certification','certification in lisbon','certification in lisboa','training in portugal','lisbon','lisboa','portugal','europe','european','tre in lisboa','tre in lisbon','saymara'],
      reply: "TRE™ in Lisboa, Portugal, 2027, taught in English by Isabelle:\n\n• Full certification: 28–30 May, 1–4 Jun, 22–24 Oct 2027, limited to 25 places. €2,949 early bird paid in full by 31 Mar 2027 (€3,499 regular), or 3 instalments (€2,999 early bird / €3,549).\n• Module 1 alone: 28–30 May 2027, 21 ICF CCEUs, €739 early bird (first 10 tickets, until 31 Mar 2027), then €799.",
      link: { text: 'TRE™ Certification Lisboa', url: '/event-tre-certification-lisbon' },
      btns: ['TRE™ Module 1 in Lisboa','What payment options are there?','Upcoming events'] },

    { w: 1.4, keys: ['lisbon module 1','lisboa module 1','module 1 in lisbon','module 1 lisbon','module 1 in lisboa','tre module 1 in lisboa','module 1 lisboa','lisbon module'],
      reply: "TRE™ Module 1 in Lisboa: 28 and 29 May (10:00–18:00) and 30 May 2027 (10:00–13:00), led by Isabelle with Saymara Ryon. The 21 ICF CCEUs need the extra Self-Care & Presence for Coaches block on 30 May, 14:00–18:00.\n\n€739 early bird (first 10 tickets, until 31 Mar 2027), then €799.",
      link: { text: 'TRE™ Module 1 Lisboa', url: '/event-tre-module1-lisbon' },
      btns: ['TRE™ in Lisboa','How do I register for an event?','Tell me about ICF CCEs'] },

    { w: 1.4, keys: ['scotland','tre scotland','uk','united kingdom','britain','vicki','vicki cook','gbp','pounds','online module','online module 1','module 1 online','online certification','online training'],
      reply: "TRE™ Module 1 ONLINE with TRE Scotland: 18–20 June 2027 on UK time, led by Isabelle with Vicki Cook, a small group of up to 15, 21 ICF CCEUs.\n\n£488 early bird until 31 May 2027, then £589. Personal TRE™ sessions can be added at £85 each.",
      link: { text: 'Module 1 online with TRE Scotland', url: '/event-tre-module1-online-scotland' },
      btns: ['How do I register for an event?','Tell me about ICF CCEs','Upcoming events'] },

    { keys: ['icf','cceu','cceus','cce','cces','icf credits','ccu','continuing coach education','coach credits','tell me about icf cces'],
      reply: "TRE™ Module 1 carries 21 ICF CCEs (16 Resource Development + 5 Core Competencies): with the 2027 Singapore Growth package, in Lisboa, or online with TRE Scotland. Shaking to Shaping carries 3 ICF CCEs per workshop.",
      link: { text: 'TRE™ with ICF CCEs', url: '/tre-icf-cceu' },
      btns: ['Tell me about the 2027 certification','TRE™ in Lisboa','Shaking to Shaping'] },

    { keys: ['simba','stenqvist','simba stenqvist','internal alchemy','grounding'],
      reply: "Simba Stenqvist is a Global TRE™ Certifying Trainer and the creator of Internal Alchemy (breathwork, fascial release, grounding and tremor work). He co-teaches the 2027 Singapore certification and the Introduction to TRE™ evenings with Isabelle; his Grounding and Internal Alchemy online programmes are bonuses in the Growth package.",
      link: { text: 'See the 2027 certification', url: '/event-certification-2027' },
      btns: ['Tell me about the 2027 certification','Introduction to TRE™','Upcoming events'] },

    { keys: ['romania','bucharest','romanian','sold out','past events','past event','previous events'],
      reply: "The 2026 Romania events (Shaking to Shaping and TRE™ Module 1 in Bucharest) and the 2026 Singapore certification cohort are sold out or have taken place. The next in Europe is Lisboa, from 28 May 2027.",
      link: { text: 'See upcoming events', url: '/events' },
      btns: ['TRE™ in Lisboa','Upcoming events','Book a free discovery call'] },

    { keys: ['corporate programme','corporate program','retreat','retreats','corporate','corporate workshop','corporate wellness','team workshop','company workshop','offsite','away day','executive retreat','executive retreats','team','teams','company','organisation','organization','staff','employees','hr'],
      reply: "Isabelle runs team workshops, corporate wellness sessions and executive retreats in Singapore, Japan and beyond, in-house or off-site:\n\n• The Corporate Detox: 5 days, 4 nights\n• The Quick Reset: 3 days, 2 nights\n• Half-day and day workshops, group TRE™, healing circles\n\nDates and formats are set with you.",
      link: { text: 'Retreats & Workshops', url: '/retreats-workshops' },
      btns: ['Book a free discovery call','Upcoming events','About Isabelle'] },

    { keys: ['first session','what to expect','what happens','prepare','preparation','my first','what do i need','what to bring','bring','how does a session work','session like','how does a session','session work','what happens in a session','what to expect in a session','what happens in a first session'],
      reply: "Your first session starts with a short conversation about your goals and situation. Nothing is rushed.\n\nFor TRE™, wear loose, comfortable clothes and have a yoga mat and a pillow or blanket. For coaching, just bring an open, curious mind. Sessions are always tailored to you.",
      link: null,
      btns: ['Is it safe?','How long is a session?','What should I wear?','Book a session'] },

    { keys: ['to see results','see results','results','outcome','benefit','benefits','improve','help me','feel better','does it work','will it work','what will i feel','what changes','what results can i expect','afterwards','after a session','how long to see results'],
      reply: "Clients commonly report:\n\n• Less stress, anxiety and chronic tension\n• Better sleep and steadier energy\n• More emotional resilience and calm\n• Less reactivity in relationships\n• A stronger connection to the body\n\nAfter TRE™ some people feel tired or emotional for a day: drink water and rest. Results vary, and Isabelle is honest about realistic expectations.",
      link: null,
      btns: ['What is TRE™?','Tell me about Somatic Coaching','Book a free call'] },

    { keys: ['after call','next steps','what next','after discovery','after free call','then what','what happens after','what happens after the call'],
      reply: "After your free discovery call, Isabelle suggests the approach that fits you best: TRE™, Somatic Coaching, Bodywork or a combination.\n\nIf you decide to go ahead, she sends a package proposal and you choose what feels right. No pressure at any step.",
      link: null,
      btns: ['How much does it cost?','Book the free call','What services are available?'] },

    { keys: ['which practice','which service','which is right','tre or coaching','coaching or bodywork','what should i choose','which one is right','tre vs coaching','which is best for me','where do i start','what do you recommend','right service for me','which practice is right for me','which session is best','best for me'],
      reply: "All three work with the nervous system, through different doors:\n\n• TRE™: release stored stress through natural tremors\n• Somatic Coaching: build resilience and self-awareness through the body\n• Somatic Bodywork: release held patterns through gentle touch\n\nYou don't have to choose alone: Isabelle recommends the best fit in your free discovery call.",
      link: { text: 'Book a free discovery call', url: '/book' },
      btns: ['What is TRE™?','Tell me about Somatic Coaching','What is Somatic Bodywork?'] },

    { keys: ['what to wear','wear','clothing','clothes','dress','what should i wear','attire','outfit','mat','yoga mat'],
      reply: "Wear loose, comfortable clothing you can relax in, and have a yoga mat plus a pillow or blanket ready. Bodywork is always fully clothed.\n\nOnline, choose light-coloured trousers (dark clothing hides the tremors on camera) and make sure the camera sees you head to toe.",
      link: { text: 'Online session preparation', url: '/online-session-preparation' },
      btns: ['What happens in a session?','How do I book?','Is it safe?'] },

    { keys: ['cancel','cancellation','reschedule','rescheduling','change appointment','postpone','refund','refunds','money back','miss a session','missed session','change my booking','can i reschedule','non refundable','transfer my ticket'],
      reply: "Private sessions: give 24 hours' notice to cancel or reschedule. Life happens, just let Isabelle know.\n\nEvent and certification tickets are final: they are non-refundable and non-cancellable.",
      link: { text: 'Message Isabelle', url: '/book' },
      btns: ['How do I book?','Tell me about the free discovery call','How much does it cost?'] },

    { keys: ['payment options','payment','pay','paying','instalment','instalments','installment','installments','payment plan','split payment','how do i pay','methods of payment','bank transfer','credit card','card','stripe','paynow','pay later','what payment options are there','currency','euro','euros','eur'],
      reply: "Events and certifications: pay by credit card (through Stripe) or bank transfer, in full or, for the certifications, in three instalments. Card charges are added on top of card payments only. Prices are in S$ for Singapore, € for Lisboa and £ for TRE Scotland.\n\nPrivate packages: payment is arranged directly with Isabelle once you choose a package.",
      link: { text: 'See the 2027 packages', url: '/event-certification-2027' },
      btns: ['How do I register for an event?','Tell me about the 2027 certification','How much does it cost?'] },

    { keys: ['one on one','1 on 1','1:1','one to one','individual or group','group or private','private or group','is it one to one','just me','private'],
      reply: "Most of Isabelle's work is 1:1 and fully personalised. Group workshops and events are a lovely, lower-cost way to try the work first.\n\nThe discovery call will help you choose what fits best.",
      link: { text: 'See upcoming events', url: '/events' },
      btns: ['Upcoming events','Book a private session','How much does it cost?'] },

    { keys: ['in english','taught in english','what language is','language','languages','english','speak','what language','which language','do you speak','spoken','spanish','french','japanese','chinese','mandarin','portuguese'],
      reply: "Isabelle is fluent in English, Spanish and French. Events and certifications are taught in English. Mention your preferred language on your free discovery call.",
      link: null,
      btns: ['Where are sessions held?','How do I book?','About Isabelle'] },

    { keys: ['insurance','claim','medisave','receipt','invoice','reimburse','reimbursement','company pay','employer'],
      reply: "Whether a session can be claimed depends on your insurer or employer, so please check with them. For an invoice, or if your company would like to pay for your place or a team programme, message Isabelle.",
      link: { text: 'Message Isabelle', url: '/book' },
      btns: ['What payment options are there?','Corporate programmes','How do I book?'] },

    { keys: ['thanks','thank you','great','awesome','helpful','perfect','appreciate','wonderful','brilliant','excellent','cheers','ty'], w: 0.5,
      reply: "You are very welcome! Is there anything else you would like to know?",
      link: null,
      btns: ['Upcoming events','Book a session','What services are available?'] },

    { keys: ['bye','goodbye','see you','ciao','take care','ttyl','farewell','good night','good day'], w: 0.5,
      reply: "Thank you for chatting! Wishing you calm, clarity and ease. Come back any time.",
      link: null,
      btns: ['Book a session before you go','View upcoming events'] }
  ];

  var STOP = /^(a|an|the|i|im|me|my|you|your|is|are|am|do|does|did|can|could|would|should|will|to|of|in|on|for|and|or|it|its|this|that|there|be|have|has|with|about|please|any|at|by|we|our|us|so|if|what|when|where|which|who|how|why|much|many|get|tell|know|want|need|like|just|some|from|not|no|yes)$/;
  function norm(s) {
    return ' ' + String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[™®]/g, '').replace(/[’']/g, '').replace(/[^a-z0-9: ]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }
  function match(input) {
    var n = norm(input), whole = n.trim();
    if (!whole) return null;
    var words = whole.split(' ').filter(function (w) { return w.length > 2 && !STOP.test(w); });
    var best = null, bestScore = 0;
    for (var i = 0; i < KB.length; i++) {
      var e = KB[i], score = 0;
      for (var j = 0; j < e.keys.length; j++) {
        var k = norm(e.keys[j]).trim(), kw = k.split(' ').length;
        if (!k) continue;
        if (whole === k) { score += kw * 4; continue; }
        if (e.only) continue;                                  // generic one-word answers: exact input only
        if (n.indexOf(' ' + k + ' ') !== -1 || new RegExp(' ' + k + '(s|es|ed|ing) ').test(n)) { score += kw * 3; continue; }
        if (kw === 1 && k.length >= 6) {                       // practise/practice, registration/register, certificate/certification
          for (var w = 0; w < words.length; w++) {
            var a = words[w], p = 0;
            if (a.length < 6) continue;
            while (p < a.length && p < k.length && a[p] === k[p]) p++;
            if (p >= 6) { score += 1; break; }
          }
        }
      }
      score *= (e.w || 1);
      if (score > bestScore) { bestScore = score; best = e; }
    }
    return best;
  }
  function replyText(r) { return typeof r.reply === 'function' ? r.reply() : r.reply; }

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

  function addMsg(text, isUser, btns, link, img) {
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
    if (!isUser && img) {                      /* 25 Nov 2026 (owner): questions about Isabelle show her photo */
      var fig = document.createElement('figure');
      fig.className = 'hb-msg-img';
      var im = document.createElement('img');
      im.src = img.src; im.alt = img.alt; im.width = 340; im.height = 400; im.loading = 'eager';
      im.onload = function () { var b = document.getElementById('hb-msgs'); if (b) b.scrollTop = b.scrollHeight; };
      fig.appendChild(im);
      if (img.cap) { var fc = document.createElement('figcaption'); fc.textContent = img.cap; fig.appendChild(fc); }
      inner.appendChild(fig);
    }
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
        addMsg(replyText(r), false, r.btns, r.link, r.img);
      } else {
        addMsg("I'm not sure about that one, but Isabelle would be happy to help personally. Send the form on the Book page or WhatsApp her on +81 80 6515 1778.", false,
          ['What services are available?','How much does it cost?','Back to start'],
          { text: 'Contact Isabelle directly', url: '/book' });
      }
    }, 1000 + Math.round(Math.random() * 2000));   /* 25 Nov 2026 (owner): a 1-3 s typing pause, like a person replying */
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
        addMsg("Hi! I'm the HummingBeing assistant. Ask me anything about TRE™, events, prices or booking.", false,
          ['What is TRE™?','Upcoming events','About Isabelle','How much does it cost?'], null);
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

// ── LEAD CAPTURE → Google Sheet + direct email (Isabelle's inbox) ─────────
var LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxkv934L8ffTxU1TPUiw3jn9Hu6KmdE0Ol1CcJRB_vWstls2xiZHHb-LErG5qHXdTuX/exec';
var LEAD_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/' + 'bonjour' + '@' + 'bhdasia.com';
// 4 Nov 2026: the emails to Isabelle's inbox now come from the Lead Capture Apps Script itself (one email per real lead, rows marked "Possible spam" are not emailed), not FormSubmit (it was down). So this stays false: the sheet send IS the email. true would ALSO email through FormSubmit = duplicates.
var LEAD_EMAIL_ON = false;
/* Lead spam filter, 2026-11-04. Master copy for hummingbeing.com (scripts.js), bhdasia.com (shared.js)
   and tre-in-singapore.com (assets/js/main.js): keep the three copies identical to this body.
   The bots that hit these forms Aug-Nov 2026 fill every field with random letters (name "Tzmkk Vcmapym",
   message "AMvGAATvnQOehLrFlht") and use dotted Gmail addresses (o.ko.z.a.ta.l.u.9.3@gmail.com).
   Score: a random mixed-case word in any field = 2, a dotted Gmail address = 1, an unpronounceable
   name word = 1. 2 or more = bot: the lead still goes to the Lead Capture sheet, marked "Possible spam",
   but no email is sent. Tested on all 46 sheet rows to 4 Nov 2026: 35/35 bots caught, 0 real people flagged. */
function leadLooksLikeBot(d) {
  d = d || {};
  var vals = [], k, i, score = 0;
  for (k in d) {
    if (Object.prototype.hasOwnProperty.call(d, k) && k.charAt(0) !== '_' && typeof d[k] === 'string') vals.push(d[k]);
  }
  /* 1) a random mixed-case word: 10+ letters with 3+ capitals after the first letter and 3+ lower-case letters */
  var words = vals.join(' ').match(/[A-Za-z]{10,}/g) || [];
  for (i = 0; i < words.length; i++) {
    var up = (words[i].slice(1).match(/[A-Z]/g) || []).length, lo = (words[i].match(/[a-z]/g) || []).length;
    if (up >= 3 && lo >= 3) { score += 2; break; }
  }
  /* 2) a dotted Gmail address: 4+ dot-separated parts, or 3+ parts of one or two characters (j.p.smith@ passes) */
  var em = String(d.email || d.Email || '').trim().toLowerCase().match(/^([^@\s]+)@(gmail|googlemail)\.com$/);
  if (em) {
    var parts = em[1].split('.'), short = 0;
    for (i = 0; i < parts.length; i++) if (parts[i].length <= 2) short++;
    if (parts.length >= 4 || short >= 3) score += 1;
  }
  /* 3) an unpronounceable name word (plain a-z only): 4+ letters with no vowel, or 5+ consonants in a row */
  var nm = String(d.name || d.fullname || d.Name || '').toLowerCase().split(/\s+/);
  for (i = 0; i < nm.length; i++) {
    if (/^[a-z]{4,}$/.test(nm[i]) && (!/[aeiouy]/.test(nm[i]) || /[bcdfghjklmnpqrstvwxz]{5,}/.test(nm[i]))) { score += 1; break; }
  }
  return score >= 2;
}
function sendLead(data) {
  // Returns a promise that settles when both calls have finished (the register-first gate
  // waits for it before redirecting to a payment page). keepalive lets the sheet call outlive a navigation.
  if (data && !data.gdpr_consent && window.gdprConsentSummary) data.gdpr_consent = window.gdprConsentSummary();
  // A bot still logs to the sheet (marked "Possible spam") but is never emailed.
  var bot = false;
  try { bot = leadLooksLikeBot(data); } catch (e) {}
  if (bot && data && !/^Possible spam/.test(data.inquiry || '')) data.inquiry = 'Possible spam — ' + (data.inquiry || '');
  var sends = [];
  // 1) Log to the Google Sheet (existing backend)
  try {
    sends.push(fetch(LEAD_ENDPOINT, { method: 'POST', body: new URLSearchParams(data), keepalive: true }).catch(function(){}));
  } catch (e) {}
  // 2) Email the full submission straight to Isabelle (FormSubmit)
  if (LEAD_EMAIL_ON && !bot) try {
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
      Message: data.message || '',
      Payment_plan: data.payment_plan || '',
      Consent: data.gdpr_consent || ''
    };
    sends.push(fetch(LEAD_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function(){}));
  } catch (e) {}
  return Promise.all(sends);
}


// ════════════════════════════════════════════════════════════════════════
// INTERACTIVE LAYER — 2026-09-29 (styles in styles.css, same heading)
// buttons · mobile menu · journey steps · philosophy cards · hummingbird
// ════════════════════════════════════════════════════════════════════════
(function () {
  var reduce = true /* HB calm 8 Nov 2026 */;
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
        '<div class="ne-row"><span style="color:#c7d2e6;display:inline-flex;align-items:center;gap:.45rem;padding:.35rem 0;font-size:.88rem"><i class="fa-regular fa-envelope" style="color:var(--gold)"></i><span>bonjour&#64;bhd<span style="display:none">-no-spam</span>asia&#46;com</span></span>' +
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
  if (true /* HB calm 8 Nov 2026 */) return;
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
