# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary (home page leads with them): coaches, therapists, counsellors, HR and wellbeing professionals — mostly in Singapore and Asia, some in Europe — evaluating the Global TRE™ Provider Certification, ICF CCE-bearing trainings and professional workshops. They arrive from LinkedIn, referrals and event links, often on a phone, and are comparing this to other somatic/coaching credentials.

Secondary: individuals carrying chronic stress, burnout or unprocessed tension (executives, managers, expats) looking for 1:1 sessions, coaching or a workshop. They may not be able to name what is wrong; they need reassurance and a low-commitment first step.

Confirmed 2026-09-29 by Rico (TechNext, maintains the site for Isabelle): professionals first, individuals second.

## Product Purpose

HummingBeing is the somatic wellness practice of Isabelle Claus Teixeira: TRE™ (Tension & Trauma Releasing Exercises), somatic & executive coaching and mindfulness, delivered in person (Singapore, Europe) and online worldwide, plus the Global TRE™ Provider Certification that trains professionals to teach TRE™. Success on the home page = a visitor understands what HummingBeing does within one screen, sees the next real event/cohort, and books a free 30-minute discovery chat (the single primary action, confirmed). Event registration and certification enquiry are the secondary actions.

## Positioning

The only TRE™ training in the world with ICF accreditation (Module 1 carries ICF CCEs); led by a Global TRE™ Certifying Trainer trained directly under Dr. David Berceli, who is also an ICF PCC executive coach with 30 years across 9 countries and 40+ nationalities; 2027 Singapore cohort co-taught with Simba Stenqvist and boosted by Internal Alchemy. Body-led (nervous-system) work rather than talk-first.

## Operating Context

Static HTML/CSS/JS site on Vercel (repo technextsg/hummingbeing-website). 25 pages: home, about, Isabelle, three service pages (Holistic Mastermind Ecosystem, Global Certifications, Retreats & Workshops), events index + per-event pages (compact `.ce-*` layout), book (discovery call + enquiry form), gallery & podcast, socials, online-session preparation guide. Sister sites bhdasia.com and TRE Singapore mirror the events. Forms email isabelle@bhdasia.com (FormSubmit) and log to a Google Sheet. Events are date-driven: past events auto-archive, sold-out ones drop to the back.

## Capabilities and Constraints

- Real event data changes weekly; the home page must stay data-light so event edits remain a content change.
- Fonts today: Playfair Display (display), PT Serif, Lato, Raleway. **Playfair Display stays for titles (binding).** Other faces may change.
- Buttons: **colour and hover/press effects must not change (binding, client-reverted once already).**
- Colour palette stays: navy #242e42 / #1a2030 / #3a4a66, gold #F5A623 / #c98000, cream #fafaf8, off-white, body text #3d4250 (binding).
- Icons must be drawn (SVG/icon set), never emoji (binding).
- Client-facing changes ship as an unlisted test page first; live only after Isabelle approves.
- Undecided: whether the Zoom link for the 25 Nov workshop stays public; price of that workshop.

## Brand Commitments

Name "HummingBeing — Coaching & Somatics"; hummingbird logo (light/dark webp); tagline vocabulary "Release. Renew. Restore."; TRE™ always with ™; Isabelle's real photography; "Powered by TechNext" footer credit. Voice: warm, direct, professional, never clinical; body-first language ("what you're carrying", "come back to yourself").

## Evidence on Hand

- Real photography: Isabelle teaching, Module 1/2 cohorts (images/gallery/gallery-module2-sep2026-*.jpg, gallery-isabelle-*.jpg), events posters (images/event-*.webp), hero video images/index-hero.mp4 + .jpg.
- Teaching video: YouTube 8_UE9nKEh2s (Isabelle & Simba in the room).
- Testimonials on the current home page (three, attributed by role/city) — reuse verbatim, do not invent more.
- Credentials: Global TRE™ Certifying Trainer, ICF PCC, Strozzi Somatic Bodywork Practitioner, Reiki II; 21 ICF CCEUs on Module 1; 2027 cohort pricing S$5,888 early bird (to 31 Dec 2026) / S$6,688; Module 1 S$1,888 / S$1,988; 8-week coaching package S$2,300; free 30-min discovery call.
- No customer logos, no press, no benchmark numbers — do not fabricate any.

## Product Principles

1. One screen, one understanding: what this is, who it is for, what to do next — before any scrolling.
2. Density over decoration: fewer, denser sections; every section earns its place with a decision or a proof.
3. Proof is real: credentials, dates, prices, photos and the teaching video do the persuading, not adjectives.
4. Professional first, human always: speak to the practitioner's credential decision without losing the person who just needs help.
5. Content stays editable: events, prices and dates must remain simple text/data edits.

## Accessibility & Inclusion

Many visitors are on phones in Singapore; keep tap targets ≥44px, text ≥14px, contrast ≥4.5:1 (the gold-on-white button text is a known, accepted exception by client decision), and reduced-motion support.
