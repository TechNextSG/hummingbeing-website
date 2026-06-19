# HummingBeing Website — Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [45.2] — 2026-06-19

### Fixed
- **somatic-coaching.html — pricing grid** — 3 cards now always display in a single row; changed `auto-fit,minmax(280px,1fr)` to `repeat(3,1fr)` and widened container to `max-width:1100px`

---

## [45.1] — 2026-06-19

### Changed
- **Philosophy tone pass — all pages** — removed marketing superlatives, credential-signaling and image-building language sitewide; replaced with humble, service-oriented copy consistent with Isabelle's philosophy
  - **index.html** — Services subtitle: removed "deep, lasting change" promise → "work with your nervous system directly — not just your mind"
  - **tre.html** — "How It Works" subtitle: removed "profound results" → factual description of what the exercises are
  - **somatic-coaching.html** — Process subtitle: "designed for lasting change" → "builds on itself at whatever pace feels right for you"; Testimonials heading: "The Somatic Difference" → "Client Voices"
  - **somatic-bodywork.html** — Benefits subtitle: "whole-person transformation that touches every dimension" → honest description of approach; Testimonials heading: "Transformations Through Bodywork" → "Client Voices"; fixed broken encoding on who-it's-for section
  - **isabelle.html** — Global Journey heading: removed "One Mission" brand tagline; section now ends at the facts
  - **book.html** — Trust bar: replaced credential-signaling items (trophy icons, "25+ Years Experience", "Certified TRE Provider") with service-oriented items ("Isabelle reads every message", "No sales pressure — ever", "You set the pace"); Pricing section eyebrow: "Investment" → "Sessions & Pricing"

---

## [45.0] — 2026-06-19

### Changed
- **Philosophy rewrite — isabelle.html + about.html** — applied Isabelle's core philosophy across the site: humility over self-promotion, service over image, the practitioner's own ongoing inner work as the real credential
  - **isabelle.html — Bio** — rewritten to include her personal healing journey: healed herself from damage caused by toxic work environments and toxic people; comes to this work not as an expert standing above, but as someone who has walked through it and continues to do her own inner work
  - **isabelle.html — Credentials header** — changed "Expertise You Can Trust" → "Her Training & Formation" (removes sales framing)
  - **isabelle.html — Personal Note quote** — rewritten to speak to humility and living the practice: "I don't do this work from a distance. I've walked through it myself."
  - **isabelle.html — Personal Note body** — rewritten to name the toxic work environment experience and the people she now supports: empowered, respected, as healthy mentally and physically as possible
  - **about.html — Mission** — origin story updated: HummingBeing born from Isabelle's own healing journey, not a career plan; mission closes with "find themselves back: empowered, respected and as healthy as possible"
  - **about.html — Philosophy section** — added closing note: these traditions ask humility, service and ongoing inner work of every practitioner — not image, but practice she lives herself

---

## [44.9] — 2026-06-19

### Changed
- **Button copy variations — 6 pages** — replaced repetitive "Book a Free Discovery Call" in-section footer buttons with contextual text matching each section's purpose
  - **index.html** — Services → "Find Your Practice"; Testimonials → "Start Your Journey"
  - **about.html** — Mission → "Come Back to Yourself"; Philosophy → "Explore the Practices"; Hummingbird → "Find Your Way Back"
  - **isabelle.html** — Bio → "Work With Isabelle"; Credentials → "See If We're a Fit"; Global Journey → "Connect With Isabelle"; Personal Note → "Start the Conversation"
  - **tre.html** — What is TRE → "Try TRE® for Yourself"; How it Works → "Experience TRE®"; Benefits → "Start Releasing"; Science → "Explore the Science"; TRE Video → "Book a TRE® Session"; Safety → "Find Out If TRE® Is Right for You"; TRE in Asia → "Book with Isabelle"; Testimonials → "Experience It Yourself"
  - **somatic-coaching.html** — What is SC → "Explore Somatic Coaching"; How it Differs → "Take a Different Approach"; Benefits → "Start Noticing Changes"; Process → "Begin the Journey"; Commitment → "I'm Ready to Begin"; Who it's For → "This Sounds Like Me"; Testimonials → "Start My Somatic Journey"
  - **somatic-bodywork.html** — Strozzi Method → "Try Somatic Bodywork"; Benefits → "Release What You're Holding"; Session → "Book a Session"; Soma Etymology → "Experience the Practice"; Testimonials → "Rediscover Your Aliveness"

---

## [44.8] — 2026-06-19

### Changed
- **Content simplification — 7 pages** — full audit and rewrite of long/redundant copy across the site for clarity and mobile readability
  - **index.html** — philosophy section: 3 paragraphs → 2; service card descriptions shortened for all 3 services
  - **about.html** — mission section: 3 → 2 paragraphs; hummingbird metaphor: 3 → 2 paragraphs; BHD connection: 3 → 2 paragraphs; pillar 01 and 04 descriptions differentiated and simplified
  - **isabelle.html** — bio paragraphs 2 & 3 merged into one tighter paragraph
  - **tre.html** — "What is TRE?" paragraphs 2 & 3 simplified; technical jargon reduced
  - **somatic-coaching.html** — P3 rewritten to remove embedded quote; Commitment section: 3 → 2 paragraphs; benefits list trimmed from 10 → 7 items
  - **somatic-bodywork.html** — What is SB P3 simplified; Strozzi Method section: 3 → 2 paragraphs; Soma Etymology: 2 → 1 paragraph
  - **book.html** — all 6 FAQ answers trimmed to 1–2 tight sentences each

---

## [44.7] — 2026-06-19

### Changed
- **All pages — Mobile responsive overhaul (v76)**
  - **Nav/header**: reduced side padding from 12% → 5% (900px) → 4% (480px); hamburger now sits cleanly at the right edge; mobile menu padding matches nav; `max-height + overflow-y: auto` prevents off-screen overflow on tall menus
  - **Section padding**: reduced from `6rem 12%` to `4.5rem 6%` (900px) → `3rem 5%` (600px) → `2.5rem 4%` (480px) — eliminates excessive side gaps on mobile
  - **Footer**: side padding reduced to `5%` (600px) / `4%` (480px); tighter link gaps; bottom bar stacks cleanly
  - **Cards**: gap and padding reduced at 600px and 480px for compact display
  - **Two-col image**: `min-height` reduced to `240px` when stacked on mobile
  - **Resource list (socials)**: at 480px collapses to 2-column grid with link wrapping below body text
- **about.html — Philosophy grid**: added 700px (2-col) and 480px (1-col) breakpoints; borders adapt to stacked layout
- **tre.html — Steps & Science**: steps go 4→2→1 col with connecting line hidden; science row goes 3→2→1 col; step items become horizontal at 480px
- **events.html — Countdown & cards**: tighter countdown gaps at 600px and 480px; big animated rings shrink to 80px at 480px; CTA buttons stack at 480px; audience card padding reduced
- **CSS version** — bumped to v76

---

## [44.6] — 2026-06-19

### Changed
- **index.html — Hero section** — replaced static CSS background image with looping video (`index-hero.mp4`) and JPG poster (`index-hero.jpg`); moved dark gradient overlay to `::after` pseudo-element so video renders beneath it; updated preload hint to new poster image
- **CSS version** — bumped to v75

---

## [44.5] — 2026-06-19

### Changed
- **isabelle.html — Hero section** — added looping video background (`isabelle-hero.mp4`) with static image poster (`isabelle-hero.png`); video autoplay, muted, loop, playsinline

---

## [44.4] — 2026-06-19

### Changed
- **All pages — Two-column images** — changed `object-fit` from `cover` to `contain` so photos scale down to fit the frame without cropping
- **CSS version** — bumped to v74

---

## [44.3] — 2026-06-19

### Changed
- **All pages — Footer contact email** — updated from `hello@hummingbeing.com` to `isabelle@bhdasia.com`

---

## [44.2] — 2026-06-18

### Changed
- **All pages — Two-column images** — changed from fixed `height: 400px` to `min-height: 520px; align-self: stretch` so images grow to fill the full height of the content column beside them; image uses `position: absolute; inset: 0` to fill the container reliably
- **CSS version** — bumped to v73

---

## [44.1] — 2026-06-18

### Changed
- **about.html — Philosophy section** — replaced 6-item card grid with numbered open column layout: gold eyebrow numbers (01–06), icon, title, description; vertical dividers between columns, horizontal divider between rows
- **All pages — Footer** — dark charcoal background (`#1e2028`); all text, links, social icons updated for legibility on dark background; gold hover colour on links
- **CSS version** — bumped to v72

---

## [44.0] — 2026-06-18

### Changed
- **tre.html — Process steps** — replaced card-style boxes with a horizontal numbered flow: gold circles connected by a subtle gold line, text below each number
- **tre.html — Science section** — replaced card grid with open 3-column layout: numbered gold eyebrows (01–03), icons, vertical dividers; no card background or shadow
- **tre.html — Safety section** — image placeholder set to `min-height: 520px` for a more prominent visual presence
- **events.html** — removed standalone dark event banner placeholder above audience cards
- **events.html** — added compact dark image placeholder at top of each audience card (coaches & certification)
- **events.html** — removed "Never Miss an Event" notification strip
- **socials.html — Resources** — replaced card grid with horizontal directory-list layout: icon · title + description · link, separated by thin borders
- **All pages — Ticker** — smaller size (.63rem, reduced padding), slower animation (140s), 8 new items added (Dr. David Berceli Method, Neurogenic Tremors, Vagal Tone, Psoas Release, Singapore · Tokyo · Asia Pacific, Free Discovery Call, Certified Reiki Level II, Nervous System Literacy)
- **CSS version** — bumped to v71

---

## [43.3] — 2026-06-18

### Changed
- **isabelle.html — Global Journey section** — increased vertical padding to 7rem top/bottom for more breathing room
- **isabelle.html — Info items** — replaced card boxes with a connected line strip: gold top border, vertical dividers between items, no background or shadow
- **isabelle.html — Services section** — replaced card grid with open column layout: vertical dividers, circular icon badges, uppercase gold link labels; no card background/border/shadow
- **CSS version** — bumped to v70

---

## [43.2] — 2026-06-18

### Changed
- **Process steps** — removed card box style (background, border, box-shadow, border-radius); steps now display as clean open layout with no container
- **CSS version** — bumped to v69

---

## [43.1] — 2026-06-17

### Changed
- **Nav layout** — switched from CSS grid to flexbox; logo flex-1 left, links centered, actions flex-1 right for clean balanced alignment
- **Nav CTA button** — now Raleway 500 .82rem matching nav links; removed uppercase and heavy letter-spacing for visual cohesion
- **CSS version** — bumped to v68

---

## [43.0] — 2026-06-17

### Changed
- **CTA banner** — removed dark navy overlay + background image; now cream with thin top border; text updated to navy/body-text; applies to all 10 pages
- **CTA banner buttons** — replaced white-on-dark inline styles with standard `btn-primary` across all pages
- **CSS version** — bumped to v67

---

## [42.9] — 2026-06-17

### Changed
- **book.html** — `.trust-bar` and `.isa-card` dark navy backgrounds converted to cream/white; text colors updated
- **events.html** — `.notify-strip` dark background converted to cream; form inputs updated for light background
- **socials.html** — `.nl-left` newsletter panel dark background converted to cream; text colors updated

---

## [42.8] — 2026-06-17

### Changed
- **Nav active state** — active page link is now bold (`font-weight: 700`) in addition to gold colour, making current page clearly identifiable
- **CSS version** — bumped to v66

---

## [42.7] — 2026-06-17

### Changed
- **Feature list** — reduced `li` padding `.65rem → .3rem` top/bottom for tighter bullet spacing; left indent 1.9rem → 1.6rem; font-size .97rem → .94rem
- **CSS version** — bumped to v65

---

## [42.6] — 2026-06-17

### Changed
- **Nav links** — removed `text-transform: uppercase`; font-size .76rem → .82rem, weight 300 → 400, letter-spacing 2px → .4px
- **CSS version** — bumped to v64

---

## [42.5] — 2026-06-17

### Changed
- **Buttons** — `border-radius: 50px` → `6px` (all buttons, nav-cta, platform links)
- **Cards** — `border-radius: 24px` → `10px` (cards, steps, pricing, testimonials, contact form, video wrap, platform cards)
- **Tags** — `border-radius: 50px` → `4px`
- **Inputs/textarea** — `border-radius: 12px` → `6px`
- **Nav dropdown** — `border-radius: 16px` → `8px`
- **CSS version** — bumped to v63

---

## [42.4] — 2026-06-17

### Changed
- **Sitewide — removed all dark blue sections** — all `section-dark` (navy background) converted to `section-cream` across all pages; inline white/light text color overrides removed; `.testimonial` cards switched to `.testimonial-light` where applicable
- **Sitewide — CTAs added to all content sections** — "Book a Free Discovery Call" button added to every content section across index, about, isabelle, tre, somatic-coaching, somatic-bodywork pages

---

## [42.3] — 2026-06-17

### Changed
- **Testimonials section** — changed background from `section-dark` to `section-cream`; removed white colour override on h2; changed testimonial card class from `testimonial` to `testimonial-light`
- **CTA buttons** — added "Book a Free Discovery Call" CTA after the testimonials grid and after the services cards grid

---

## [42.2] — 2026-06-17

### Changed
- **Nav font** — switched from Lato to Raleway 300 for a lighter, more elegant header; added Raleway to Google Fonts import
- **CSS version** — bumped to v62

---

## [42.1] — 2026-06-17

### Changed
- **Nav links** — font-weight reduced 700 → 400 (regular) for lighter appearance; letter-spacing 1.3px → 1.5px
- **CSS version** — bumped to v61

---

## [42.0] — 2026-06-17

### Changed
- **Image placeholders** — all `.img-placeholder` and `.cred-placeholder` changed from dark gradient to light gray (`#f0f1f3 → #e4e6ea`), consistent format sitewide
- **Two-col image containers** — removed `border-radius: 32px` from `.two-col-image` (image containers should not have rounded corners)
- **about.html** — removed inline `border-radius:16px` from standalone placeholder
- **CSS version** — bumped to v60

---

## [41.9] — 2026-06-17

### Changed
- **Sitewide layout** — increased horizontal padding further from 9% → 12% for wider side margins on all sections
- **CSS version** — bumped to v59

---

## [41.8] — 2026-06-17

### Changed
- **Sitewide layout** — increased horizontal padding from 7% → 9% across all sections (nav, hero, page-hero, sections, footer, CTA banner, mobile breakpoints)
- **CSS version** — bumped to v58

---

## [41.7] — 2026-06-17

### Changed
- **Footer — full redesign (Casa Escondida format)** — light cream background, thin top border, `.foot-grid` 4-column layout, uppercase gold section headers (`.foot-h`), compact link list (`.foot-links`), circle social icon buttons (`.soc`), bottom bar with Privacy Policy / Terms of Service / Powered by TechNext; applied to all 11 pages
- **CSS version** — bumped to v57

---

## [41.6] — 2026-06-17

### Changed
- **Sitewide — removed floating CTA buttons** — 35+ standalone "Book a Free Consultation" divs removed from all pages (about, tre, somatic-bodywork, somatic-coaching, socials, isabelle, index); sections now clean without redundant centred buttons below every two-col
- **somatic-bodywork.html** — "Book a Session" btn-dark replaced with btn-primary + descriptor note
- **CSS version** — bumped to v56

---

## [41.5] — 2026-06-17

### Changed
- **Footer text** — all link and body text reduced (links .85rem → .75rem, brand text .84rem → .74rem, logo 1.3rem → 1.1rem, h4 headings .7rem → .63rem)
- **CSS version** — bumped to v55

---

## [41.4] — 2026-06-17

### Changed
- **Buttons** — letter-spacing reduced 3.5px → 1px, padding reduced (.72rem 1.75rem), hover no longer expands letter-spacing; hero buttons also re-scaled
- **"Is This for You?" section** — removed duplicate floating CTA button; single "Book a Free Chat" button now sits inline with a soft descriptor note
- **CSS version** — bumped to v54

---

## [41.3] — 2026-06-17

### Changed
- **Sitewide horizontal padding** — increased from 5% to 7% on nav, all sections, hero, page-hero, CTA banner, countdown bar, footer, and mobile nav menu
- **Section transitions removed** — `section + section` border-radius / overlap effect deleted; sections now flow flat with standard spacing
- **Two-col image placeholder** — fixed `aspect-ratio` constraint; now uses `height: 400px; position: relative` so image fills full column width
- **Cards — more compact** — padding reduced 1.8rem → 1.4rem; card-img bleed margins updated; grid gap 1.5rem → 1.2rem; card icons 48px → 40px
- **Footer — more compact** — padding, grid gap, list margins, h4 margin, and footer-bottom padding all reduced
- **isabelle.html** — `.cred-placeholder` bleed margins updated to match new card padding (1.4rem)
- **CSS version** — bumped to v53

---

## [41.2] — 2026-06-17

### Added
- **events.html** — full-width event banner image placeholder (320px, dark, rounded) above event cards

### Changed
- **Hero text and buttons** — title and paragraph font sizes reduced 10% on `.hero` and `.page-hero` (all pages); hero buttons also 10% smaller
- **Testimonials** — fixed at 3 columns; 4th+ testimonials hidden

---

## [41.1] — 2026-06-17

### Fixed
- **Cards grid** — capped at 3 columns on desktop (`repeat(3, 1fr)`); 2 columns on tablet, 1 on mobile

---

## [41.0] — 2026-06-17

### Changed
- **Sitewide redesign — less boxy aesthetic** — major visual overhaul across all pages:
  - Buttons: square (`border-radius: 0`) → pill-shaped (`border-radius: 50px`)
  - All cards: `border-radius: 3px` → `border-radius: 24px`; removed rigid coloured top-bar accent in favour of colour-coded icon backgrounds
  - Two-col images: `border-radius: 3px` → `border-radius: 32px`
  - Testimonials: left border removed; large gold quote mark (`"`) added as decorative pseudo-element; `border-radius: 24px`
  - Step cards: `border-radius: 3px` → `border-radius: 24px`; removed yellow outline border
  - Pricing cards: rounded to `24px`, top border removed
  - Contact form: `border-radius: 28px`; inputs `border-radius: 12px`
  - Social / platform cards: `border-radius: 24px`; platform buttons pill-shaped
  - Nav dropdown: `border-radius: 16px`, gold top border removed, subtle grey border added
  - Tags: pill-shaped (`border-radius: 50px`)
  - Video embeds: `border-radius: 24px`
- **Section transitions** — sections after sections now have curved tops (`border-radius: 40px 40px 0 0`) with 40px overlap creating an organic layered-card effect
- **isabelle.html** — credential image placeholders made full-bleed (match card-img behaviour); info-cards `border-radius: 16px`
- CSS bumped to v51 across all pages

---

## [40.9] — 2026-06-17

### Fixed
- **Two-col image placeholders** — added `max-height: 400px` to `.two-col-image` so placeholders no longer stretch to full column height; applies sitewide
- **Credential card placeholders** — reduced `.cred-placeholder` from 200px to 150px; Reiki image area matched
- **Homepage countdown bar** — moved "View Event" button inside the text column so layout is always two-column (text+button | countdown), no more wrapping issue
- **Homepage "What We Offer"** — section eyebrow/title/subtitle now centred via `section-header-center` wrapper

### Changed
- **isabelle.html "9 Countries" section** — replaced plain bullet list with 4 compact icon+text info cards (location, language, experience, network)

---

## [40.8] — 2026-06-16

### Added
- **Credential cards — image placeholders** — all 6 text-only credential cards on isabelle.html now have a consistent 200px placeholder area (soft gradient, centred icon, "Photo Coming Soon"); Reiki card image area standardised to match

---

## [40.7] — 2026-06-16

### Added
- **Reiki Practitioner Level II** — certificate image added to isabelle.html Credentials section

### Changed
- **Restored TRE® and Somatic Bodywork pages** — `tre.html` and `somatic-bodywork.html` restored; nav dropdowns, footer links, service cards (index.html), and isabelle.html Work With Me section all reverted to previous state

---

## [40.6] — 2026-06-16

### Changed
- **Events page — real event content** — replaced placeholder events with two real upcoming events: "Self-care and Presence for Coaches" (ICF CCE, 21 CCEUs, 1,290 SGD special price) and "Become a Certified TRE® Provider" (3-module certification, full pricing tiers) — both on 29–30 August 2026 Singapore
- **Events countdown** — target updated to 29 August 2026 (Module 1 start)
- **Homepage countdown bar** — updated to TRE® Provider Certification Module 1, 29–30 August 2026

---

## [40.4] — 2026-06-13

### Fixed
- **Countdown rings — glow no longer clipped** — added `overflow: visible` to `.ecd-svg` so the `drop-shadow` filter renders fully outside the SVG boundary

---

## [40.3] — 2026-06-13

### Fixed
- **Events countdown not activating** — removed stale JS block referencing removed hero countdown elements (`#cd-days` etc.); the `TypeError` it threw was silently killing the entire script block before the new ring countdown could run

---

## [40.2] — 2026-06-13

### Added
- **Events page — animated countdown section** — full-width dark section with SVG progress rings, digit flip animation, pulsing background rings, and CTA buttons; placed between ticker and Featured Event
- **Homepage — event countdown bar** — replaces stats bar; cream background, large animated digits (Days/Hours/Minutes/Seconds), event title/date, "View Event" CTA; counts down to TRE® Community Session 5 Jul 2026
- **Service cards — real photos** — TRE®, Somatic Coaching and Somatic Bodywork cards now show actual hero images (copied from Drive)

### Fixed
- **Homepage hero centering** — buttons now centred (`justify-content: center`) and paragraph auto-margins corrected

### Changed
- **CSS** — bumped to v50 across all 10 pages

---

## [40.1] — 2026-06-13

### Added
- **Ticker — 8 new items on all pages** — Breathwork, Online & In-Person, Group Sessions, Burnout Recovery, Deep Rest & Renewal, Body Intelligence, Somatic Intelligence, Self-Regulation; added to both halves of the ticker on all 10 pages

---

## [40.0] — 2026-06-13

### Fixed
- **Socials page — icon circles no longer clipped** — removed `overflow: hidden` from `.soc-row`; circles were being cut on the left edge

---

## [39.9] — 2026-06-13

### Fixed
- **Homepage hero — full-width content** — removed `max-width: 680px` constraint on `.hero-content` (replaced with `max-width: 860px`) so the h1 no longer wraps excessively, allowing the content to centre properly in the viewport

---

## [39.8] — 2026-06-13

### Changed
- **Events hero — countdown removed** — countdown timer section removed from the hero

---

## [39.7] — 2026-06-13

### Changed
- **Homepage hero — aligned to page-hero pattern** — switched to `flex-direction: column`, uniform dark overlay gradient replacing the asymmetric right-fade, padding aligned to `6rem 5%`

---

## [39.6] — 2026-06-13

### Fixed
- **Events hero h1 — centred** — added explicit `text-align: center; width: 100%` to `.event-hero h1` so the title renders centred

---

## [39.5] — 2026-06-13

### Changed
- **Homepage hero — centred** — hero content horizontally centred (`justify-content: center` + `text-align: center`)

---

## [39.4] — 2026-06-13

### Changed
- **Section titles — full revert** — `.section-title`, `.two-col-text h2`, `.cta-banner h2` restored to original PT Serif font, original sizes, and no text-shadow across all pages

---

## [39.3] — 2026-06-13

### Changed
- **Section title glow — strengthened** — gold glow opacity raised to `.4` (was `.13`), wide gold bloom at `.18`, navy drop shadow at `.22` for clearly visible hero-style effect on all section titles

---

## [39.2] — 2026-06-13

### Changed
- **Section titles — 15% larger + hero glow sitewide** — `.section-title` and `.two-col-text h2` font size increased 15% (`clamp(2.3rem, 4vw, 3.22rem)`), added adapted hero-style text-shadow (gold ambient glow + soft navy drop shadow) on all section titles across every page

---

## [39.1] — 2026-06-13

### Changed
- **Isabelle page — hero h1** — font 15% larger (`clamp(3.45rem, 7.5vw, 7.5rem)`), colour changed from white to brand navy, hero-style glow effects adapted (gold + blue ambient glow, faint white separation halo, deep drop shadow)

---

## [39.0] — 2026-06-13

### Changed
- **Section titles — Playfair Display sitewide** — all `.section-title`, `.two-col-text h2`, and `.cta-banner h2` now use Playfair Display (matching hero h1 font); added `em` italic-gold support on all three so headings can carry the same italic-gold accent as the hero

---

## [38.9] — 2026-06-13

### Changed
- **Events hero — countdown repositioned** — moved countdown timer above the CTA buttons so it sits in the vertical centre of the hero, matching the layout pattern of other page heroes
- **Cards — compact padding sitewide** — reduced padding and spacing on `.card`, `.pricing-card`, and `.social-card`; tightened icon size, heading margins, grid gap, and pc-features margin for a denser, more professional look

---

## [38.8] — 2026-06-13

### Changed
- **Socials page — full redesign of three sections:**
  - **Platforms** — replaced dark card grid with clean animated link rows: circle icon (rotates + fills gold on hover), platform name + handle, sliding arrow CTA, gold underline sweep, translateX shift
  - **Content themes** — enhanced interactivity: card lifts on hover, left border thickens, gold tint overlay fades in, platform icon bounces/rotates, heading transitions to gold
  - **Newsletter** — replaced centered navy box with a two-column split: navy left panel (eyebrow, headline, bullet perks) + cream right panel (heading, email input with gold focus ring, full-width subscribe button)

---

## [38.7] — 2026-06-13

### Changed
- **Button design — flat block style** — all `.btn` elements redesigned to match reference: `border-radius: 0` (square corners), letter-spacing increased to `3.5px`, padding `1rem 2.6rem`, pulse animation removed from `.btn-primary` for a clean solid look

---

## [38.6] — 2026-06-13

### Changed
- **Process steps — interactive hover** — each step now renders as a card; hovering lifts the card, scales the gold number circle with a gold glow ring, and transitions the heading to gold. Applies to all 4 pages using `.steps` (index, TRE®, Somatic Coaching, Somatic Bodywork)

---

## [38.5] — 2026-06-13

### Changed
- **Text contrast & readability** — comprehensive pass across all 11 pages:
  - `--body-text` darkened #555 → #3d4250; `--text-mid` darkened #888 → #5f6472 (was failing WCAG AA at 3.5:1, now ~5.5:1)
  - Removed `font-weight: 300` from hero/section descriptions — now `400` for crisper rendering
  - Raised white-text opacity on all dark-background descriptions (hero, CTA banner, pricing, steps, footer, stats, platform cards)
  - Bumped font sizes on card `.p`, step `.p`, social card `.p`, podcast meta `.p` (all +5–10%)
  - Fixed low-opacity inline text on `events.html` (countdown labels, featured event, notify strip), `gallery.html` (video info, channel card, podcast meta, lightbox caption), `book.html` (trust items, blockquote), `socials.html` (newsletter description)

---

## [38.4] — 2026-06-13

### Changed
- **Events hero countdown timer** — increased `margin-top` to `2.5rem` so the countdown sits lower in the hero section

---

## [38.3] — 2026-06-13

### Fixed
- **Somatic Bodywork hero video** — replaced wrong video (coaching clip, 3.8 MB) with the correct bodywork video (8.2 MB) from the GDrive Images folder; poster image was already correct
- **Somatic Coaching hero** — verified correct video and poster already in place

---

## [38.2] — 2026-06-13

### Fixed
- **Hero image priority loading** — poster images now load first on all 9 pages:
  - Added `<link rel="preload" as="image" fetchpriority="high">` in `<head>` for each page's hero poster (8 video pages + index.html CSS background)
  - Changed all hero `<video preload="auto">` → `preload="none"` so video data no longer competes with the poster image download
  - Result: poster image appears immediately on page load; video fills in once network is free

---

## [38.1] — 2026-06-13

### Fixed
- **Lazy loading audit** — all `<img>` tags already had `loading="lazy"`; added missing `loading="lazy"` to the YouTube `<iframe>` embed on the TRE® page

---

## [38.0] — 2026-06-13

### Added
- **Animated CTA buttons** — all `.btn` elements across every page now feature:
  - Persistent pulsing gold glow on `.btn-primary` (heartbeat ring animation)
  - Hover: lift + scale (`translateY(-5px) scale(1.04)`) with spring cubic-bezier easing
  - Hover: letter-spacing expansion (2px → 2.8px)
  - Hover: stronger box-shadow with outer glow ring (`0 0 0 8px rgba(...)`)
  - Wider, more visible shimmer sweep on hover
  - Click ripple — white radial burst from exact tap/click point
  - Nav "BOOK A SESSION" button: lift + shadow on hover, gold glow when scrolled

---

## [37.5] — 2026-06-13

### Fixed
- **Somatic Coaching hero video** — restored `hero-coaching.mp4` with `poster-coaching.png` placeholder; hero now plays the looping video background on load

---

## [37.4] — 2026-06-13

### Changed
- **Somatic Coaching hero** — removed incorrect bodywork background image; hero now shows clean dark navy overlay as placeholder until correct coaching image is available

---

## [37.3] — 2026-06-13

### Fixed
- **HTML audit — malformed attribute quotes** — full desktop audit found `?` characters replacing `"` in HTML attributes across 4 pages; all fixed:
  - `index.html`: 7 broken attributes (`class`, `href`, `style` on testimonial-author, section-eyebrow, divider, feature-list, btn, and BHD link)
  - `about.html`: 2 broken `class` attributes (section-eyebrow, divider)
  - `isabelle.html`: broken `style` attribute on `<em>`, corrupted curly quotes on blockquote, and `?` in image alt text
  - `tre.html`: broken `style` attribute on TRE in Asia paragraph

---

## [37.2] — 2026-06-13

### Fixed
- **Book page hero framing** — shifted video `object-position` to `center 20%` so both models are fully visible

---

## [37.1] — 2026-06-13

### Fixed
- **Bodywork video restored** — reverted `hero-bodywork.mp4` to the original correct file (3.8 MB) from the Website folder; the AI-generated 7.8 MB version was incorrect
- **Coaching page reverted** — removed AI video (wrong content — showed someone lying down, not a coaching session); page now uses the static `poster-coaching.png` image background

---

## [37.0] — 2026-06-13

### Added
- **Hero poster images** — all 8 hero sections now show a still image instantly while the video loads (`poster-about.jpg`, `poster-book.jpg`, `poster-events.jpg`, `poster-gallery.jpg`, `poster-socials.jpg`, `poster-bodywork.png`, `poster-coaching.png`, `poster-tre.jpg`)
- **Hero videos** — `about.html` and `somatic-coaching.html` now have looping background videos (`hero-about.mp4`, `hero-coaching.mp4`) replacing static image backgrounds
- **Fast video playback** — added `preload="auto"` to all hero `<video>` tags so browsers start downloading immediately on page load

---

## [36.1] — 2026-06-13

### Fixed
- **Events hero spacing** — removed extra `margin-bottom: 2.5rem` on `.event-hero > p`; gap between title and buttons now matches all other pages (2.2rem)

---

## [36.0] — 2026-06-13

### Changed
- **Nav links centered** — logo left, page links (HOME–EVENTS) geometrically centered in viewport, BOOK A SESSION anchored right via new `.nav-actions` wrapper; HTML restructured across all 11 pages
- **CSS version** bumped to `v36`

---

## [35.0] — 2026-06-13

### Changed
- **Hero title smaller** — index.html `.hero h1` reduced from `clamp(3.5rem, 7vw, 7.5rem)` to `clamp(2.6rem, 5vw, 5.5rem)`
- **Countdown box removed** — stripped background and border from `.countdown-wrap` on events page; timer numbers float freely over the hero image
- **CSS version** bumped to `v35`

---

## [34.0] — 2026-06-13

### Changed
- **Nav layout reverted** — switched back to `display: flex; justify-content: space-between`; logo left, nav links right
- **Hero title centered** — added `text-align: center` explicitly to `.page-hero h1` on all inner pages
- **CSS version** bumped to `v34`

---

## [33.0] — 2026-06-12

### Fixed
- **Nav links centered** — switched nav from `display: flex / justify-content: space-between` to `display: grid / grid-template-columns: 1fr auto 1fr`; logo stays left, links are truly centered in the viewport, hamburger right-aligned
- **CSS version** bumped to `v33`

---

## [32.0] — 2026-06-12

### Changed
- **Ticker strip** — expanded from 9 to 18 unique tags (added: Nervous System Reset, Strozzi Bodywork Method, Embodied Leadership, Trauma & Tension Release, Mind · Body · Soul, Corporate Wellness, Polyvagal Theory, TRE® Trainer Trainee, Executive Coaching); animation slowed from `36s` to `80s`; applied to all 11 pages
- **CSS version** bumped to `v32`

---

## [31.0] — 2026-06-12

### Changed
- **Hero title size** — increased to `clamp(3.5rem, 7vw, 7.5rem)` (homepage) and `clamp(3rem, 6.5vw, 6.5rem)` (inner pages); single-row layout by removing all `<br>` breaks from hero h1s
- **CSS version** bumped to `v31`

---

## [30.0] — 2026-06-12

### Changed
- **Hero title font** — all hero section h1s switched from PT Serif to **Playfair Display** (ital, wght 400–800); Playfair Display added to Google Fonts import
- **CSS version** bumped to `v30`

---

## [29.0] — 2026-06-12

### Fixed
- **Transparent nav over hero** — removed `body { padding-top: 76px }` and changed hero `min-height` from `calc(100vh - 76px)` to `100vh`; nav now genuinely overlays the hero with no white gap
- **CSS version** bumped to `v29`

---

## [28.0] — 2026-06-12

### Changed
- **Two-tone hero headings** — all hero h1s now split into a white bold line + gold italic `<em>` second line (matching reference style); e.g. "Somatic / *Coaching*", "Let's Begin / *Together*", "A Safe Space to / *Release, Renew & Restore*"
- **Hero text glow** — white `text-shadow` glow added to all hero h1s; gold shimmer glow added to all `<em>` (gold italic) lines
- **CSS version** bumped to `v28`

---

## [27.0] — 2026-06-12

### Changed
- **Transparent nav** — header is now fully transparent over hero sections; transitions to solid white on scroll past 60px; logo and nav links are white over dark heroes, switch to navy when scrolled
- **Light nav text over dark backgrounds** — nav CTA button is white-outline when transparent, switches to navy fill on scroll; hamburger bars white over dark heroes, navy when scrolled or menu open
- **CSS version** bumped to `v27`

---

## [26.0] — 2026-06-12

### Changed
- **Hero sections full viewport height** — `.page-hero` and `.event-hero` now use `min-height: calc(100vh - 76px)` with flex column centering so the video fills the entire screen
- **CSS version** bumped to `v26`

---

## [25.0] — 2026-06-12

### Changed
- **Looping video hero backgrounds** — 6 inner pages now use autoplay muted looping MP4 videos (TRE®, Somatic Bodywork, Book, Gallery, Socials, Events); dark gradient overlay + gold shimmer sit above video via z-index layering; Somatic Coaching keeps static photo; About / Isabelle / Changelog retain navy gradient fallback
- **CSS version** bumped to `v25`

---

## [24.0] — 2026-06-12

### Added
- **Hero CTA buttons** — 2 animated buttons added to every page's hero section (10 inner pages); primary gold button links to `book.html`; secondary outline button is page-contextual (Meet Isabelle, Browse Gallery, Browse Events, Explore Services, etc.)
- **CSS version** bumped to `v24`

---

## [23.0] — 2026-06-12

### Changed
- **Hero overlay opacity lowered** — all 8 hero sections (homepage + 7 inner pages) now show more of the background photo; gradient reduced from `.88/.94` to `.55/.68` on inner pages, and from `.97/.62` to `.65/.38` on the homepage

---

## [22.0] — 2026-06-12

### Added
- **Hero images** — real photos applied to all 7 inner-page hero sections (TRE®, Somatic Coaching, Somatic Bodywork, Book a Session, Gallery, Socials, Events); dark gradient overlay ensures text readability; images sourced from `G:\Shared drives\Marketing\…\HummingBeing\Images`
- **CSS version** bumped to `v22`

---

## [21.0] — 2026-06-12

### Added / Changed / Fixed
- **Chatbot** — floating navy assistant button above WhatsApp; 22-topic knowledge base (TRE®, Somatic Coaching, Bodywork, Isabelle, pricing, booking, location, events, gallery); keyword-scored matching for natural-language tolerance; quick-reply buttons; navigation buttons route directly to relevant pages
- **Ticker strip** — vertical padding reduced from `.95rem` to `.38rem` for a much slimmer marquee bar
- **Footer compacted** — padding `3rem → 1.8rem / 1.5rem → 1rem`, grid gap tightened, list spacing and font sizes reduced; applied to all 11 pages
- **Pricing cards fixed** — removed `anim-up` scroll delay; cards now render immediately on page load without waiting for IntersectionObserver
- **Service card placeholders** — dark gradient `.card-img` placeholder (16:9) added to all 3 homepage service cards
- **CSS version** bumped to `v21`

---

## [19.0] — 2026-06-11

### Added / Changed
- **Events page** — new `events.html` with countdown timer to next event (2026-07-05), filter tabs (All / TRE Sessions / Coaching / Workshops / Online), featured event card, 6 upcoming + 3 past event cards, email notify strip
- **Countdown timer** — live tick every 1s (days / hours / mins / secs) in the events hero; switches to "happening now" message when target time passes
- **Book page redesign** — full personal-branding audit; pricing cards forced to single row at all desktop sizes; trust bar with 4 credentials; sidebar with Isabelle quote, WhatsApp card, locations and session lengths; accordion FAQ
- **Button animations** — shimmer sweep via `::after` pseudo-element, `translateY(-3px)` lift on hover, gold / navy / outline box-shadow glow per variant, press-down on active
- **Image placeholders** — all non-Isabelle images across all pages replaced with dark gradient `.img-placeholder` blocks ("Photo Coming Soon"); Isabelle's two photos kept; gallery image cards without a real photo lose hover/lightbox behaviour via `:not([onclick])` CSS
- **Events nav & footer link** — added to all pages; CSS version bumped to `v19`

---

## [18.0] — 2026-06-11

### Added
- **Gallery page** — new `gallery.html` with 3 clickable category filters: Podcast, Video and Images
- **Podcast section** — 3 podcast cards (video podcast format) linking to YouTube channel content
- **Video section** — embedded YouTube player card for TRE Star Groups video + YouTube channel browse card; click-to-play modal with autoplay
- **Images section** — 14 photo cards with hover zoom-overlay and click-to-expand lightbox (ESC to close)
- **Gallery nav link** — added to primary navigation on all 10 pages (after Socials, before Book a Session)
- **Gallery footer link** — added to Company section in footer on all 10 pages

---

## [17.0] — 2026-06-11

### Changed
- **Platform cards — descriptions removed** — socials page cards now show icon, platform name, handle and CTA button only; no description text

---

## [16.0] — 2026-06-11

### Fixed
- **Hero fills full viewport** — `min-height` changed from `90vh` to `calc(100vh - 76px)` so the hero occupies exactly the screen below the fixed nav bar on all screen sizes

---

## [15.0] — 2026-06-11

### Fixed / Changed
- **Platform cards equalised** — description text clamped to 4 lines so all 6 cards have consistent height regardless of content length
- **Scroll-to-top button** — resized to match WhatsApp button (58px), changed to gold fill with white icon, repositioned beside WA horizontally instead of stacked above; mobile updated to match

---

## [14.0] — 2026-06-11

### Changed
- **Light metallic gold divider lines** — `--border` token changed from `#e5e5e5` to `rgba(245,166,35,.28)`; applies across mobile nav separators, form input borders and changelog entry dividers site-wide

---

## [13.0] — 2026-06-11

### Fixed
- **Dropdown disappears on item selection** — scroll handler was hiding the nav (sliding it off-screen) while a dropdown was open; any tiny trackpad drift triggered it, collapsing the menu before an item could be clicked
- **Scroll guard** — nav-hide now skipped when `.nav-dropdown.dropdown-open` exists; opening a dropdown force-clears `nav-hidden`
- **Sub-link click** — dropdown items now explicitly close the dropdown before navigating; toggle fully closes before re-opening (eliminates double-toggle edge case)
- **`scripts.js` v4**

---

## [12.0] — 2026-06-11

### Added
- **`changelog.html`** — live HTML changelog page matching full site design; timeline layout with version badges and colour-coded Added / Changed / Fixed tags
- **Footer Changelog link** — added to Company section on all 8 pages
- **`CHANGELOG.md`** — backfilled v9, v10, v11 entries

---

## [11.0] — 2026-06-11

### Added
- **Auto-hide header** — nav switches to `position: fixed`; slides off-screen (`translateY(-100%)`) when scrolling down past 80px, returns when scrolling up; `body` gains `padding-top: 76px` to compensate
- **Scroll-to-top button** — navy circle with gold chevron, floats above the WhatsApp button; appears after 400px scroll, smooth-scrolls to top on click; repositions on mobile
- **`scripts.js` v3** — scroll event listener (passive) tracks direction for nav hide/show and top-float visibility

---

## [10.0] — 2026-06-11

### Changed
- **Platform cards** — socials page `platforms-grid` changed from `auto-fit minmax(260px)` to `repeat(6, 1fr)` so all 6 cards sit in a single row on desktop; card padding, icon and text sizes reduced for the narrower columns
- **Responsive** — 3-column layout on tablet (≤900px), 2-column on mobile (≤600px)
- **CSS version** bumped to `v10`

---

## [9.0] — 2026-06-11

### Fixed
- **Dropdown not clickable** — CSS hover-based dropdown had a gap between the nav link and the panel; moving through the gap collapsed the menu before items could be clicked; replaced `:hover` trigger with JS click-toggle (`.dropdown-open` class) on all screen sizes; `e.preventDefault()` now fires universally
- **CSS version** bumped to `v9`

---

## [8.0] — 2026-06-11

### Changed
- **Services nav dropdown** — consolidated three separate nav links (TRE® Exercises, Somatic Coaching, Somatic Bodywork) into a single "Services" dropdown button across all 8 pages; desktop: CSS hover with gold top-border panel + triangle pointer; mobile: tap to expand with left gold border indent
- **`scripts.js` v2** — added mobile dropdown toggle (`.nav-dropdown-toggle` click handler toggles `.dropdown-open` class at ≤900px); hamburger close also collapses any open dropdown
- **Active state** — on service pages the "Services" toggle and the matching sub-link both carry the `active` class for correct nav highlighting
- **socials.html** — complete rewrite: removed broken inline `<style>` block that referenced undefined CSS variables (`--green-dark`, `--sage-bg`); platform cards now use global `.platform-hero` styles; content-theme section redesigned as `.theme-item` cards with gold left border (replaced broken hashtag pills); newsletter box uses valid dark-navy variables
- **CSS version** bumped to `v8`

---

## [7.0] — 2026-06-11

### Added
- **Scrolling ticker strip** — infinite-looping marquee below the hero/page-hero on all 8 pages; dark navy background with uppercase credentials: ★ Somatic Wellness · Singapore & Japan · ★ Certified TRE® Provider · 25+ Years of Experience · ★ Somatic Coaching · Somatic Bodywork · ★ 9 Countries · Release · Renew · Restore · ★ BHD Asia & BHD Japan; left/right edge fade; pauses on hover
- **CSS version** bumped to `v7`

---

## [6.0] — 2026-06-11

### Added
- **WhatsApp floating button** — fixed-position green button (bottom-right) on all pages, linking to WhatsApp with pulse animation; scales on hover; repositions on mobile
- **Scroll animations** — IntersectionObserver-driven fade-up/left/right on cards, steps, testimonials, two-col sections and stats; staggered entry for grids; `prefers-reduced-motion` respected
- **Hero entrance animation** — eyebrow, h1, paragraph and CTA buttons cascade in on page load (fade-down, staggered delays)
- **Page-hero entrance animation** — inner-page hero eyebrow, h1 and subtitle animate on load
- **"Powered by TechNext"** — added to footer-bottom across all 8 pages, linked to `https://technextasia.com`
- **`scripts.js`** — extracted mobile menu toggle (class-based, outside-click-to-close) and scroll animation logic into a shared script file

### Changed
- **Footer** — compacted on all pages: top padding `5rem → 3rem`, grid gap `3rem → 2rem`, list item spacing tightened; overall height significantly reduced
- **Mobile nav** — now toggles `.nav-open` / `.open` CSS classes instead of inline styles; hamburger animates into an ✕; menu slides in with fade-down animation; clicking outside closes menu
- **Mobile cards** — `cards-grid` and `testimonials-grid` forced to single column at ≤600px via explicit override
- **Hero min-height** — reduced to 80vh on mobile (≤600px) to avoid excessive scroll before content
- **Page-hero** — reduced padding on mobile (≤600px): `7rem 5% 5.5rem → 5rem 5% 3.5rem`
- **`btn-outline` margin** — removed hardcoded `margin-left: 1rem` (gap handled by `hero-actions` flex gap)
- **Footer links** — inline `style=` removed from `hummingbeing.com` link; now governed by `.footer-bottom a` CSS rule
- **Arrow encoding** — fixed `â†'` mojibake → `&#8594;` (→) in card-link elements across all pages
- **CSS version** bumped to `v6` for cache busting

---

## [5.0] — 2026-06-11

### Added
- **36 CTA buttons** — "Book a Free Consultation" added to the bottom of every section across all 7 public pages (light sections: gold button; dark sections: white button)
- **Hero background photo** — dark navy gradient overlaid on real lifestyle photo from hummingbeing.com, matching reference site split-effect
- **CTA banner background** — sight-seeing photo with dark overlay for depth on all CTA banners
- **CSS custom property aliases** — `--gold-accent` and `--green-primary` retained as aliases for backwards compatibility

### Changed
- **Fonts** — switched from Nunito + Inter to **PT Serif** (all headings) + **Lato** (body/nav), matching hummingbeing.com editorial style
- **All images** — removed all Unsplash stock photos; replaced with real photos sourced from hummingbeing.com:
  - Isabelle bio: `Artboard-1@2x-100.jpg` (professional profile)
  - Isabelle global section: `isatall.jpg`
  - TRE page: `therapist-08.png`, `Relationship-Coaching-1.jpg`, `massage-11.jpg`
  - Somatic Coaching: `therapist-02.png`, `Relationship-Coaching-5.jpg`
  - Somatic Bodywork: `massage-12.jpg`, `massage-09-1.jpg`, `massage-04.png`
  - About page: `sight-seeing-44.png`, `353436.jpg`, `flight-nature-bird-flying-33066.jpg`
  - Index: `flight-nature-bird-flying-33066.jpg`, `Relationship-Coaching-6.jpg`
- **Card icons** — redesigned as navy circle with gold Font Awesome icon (replaces emoji placeholders)
- **Buttons** — sharper `border-radius: 2px`, uppercase letter-spacing, more editorial feel
- **Color variables** — primary dark updated to `#242e42` (matches reference site), added `--navy-deep`, `--navy-light`, `--blue: #2ea3f2`
- **CSS version** bumped to `v5` for cache busting

---

## [4.0] — 2026-06-11

### Added
- **Font Awesome 6.5.0** CDN link on all pages — enables icon usage throughout
- **Favicon** — custom `favicon.svg` (navy circle with orange "H")
- **YouTube embed** on TRE page — responsive 16:9 container (`.video-wrap`) with TRE Star Groups video
- **Tags** — `.tag` pill components added to service pages for scannable credentials
- **Somatic Bodywork page** — Greek etymology section (`σῶμα`) with Unicode fix
- **Card icons** — Font Awesome icons added to all service cards across all pages
- **Footer social icons** — Instagram, LinkedIn, YouTube, WhatsApp icon links in footer

### Fixed
- **UTF-8 mojibake** — corrected broken encoding on all 8 pages caused by Windows-1252 misread (em dashes, registered trademark symbol, curly quotes, special characters)
- **Greek characters** — `σῶμα` (sigma, omega with perispomeni, mu, alpha) correctly encoded
- **4-byte emoji** — fixed undefined Windows-1252 byte mappings for emoji (🌍, 🐦, 🕊️, 🛡️)
- **ZWJ sequence** — fixed 👩‍💼 emoji rendering via regex context-anchor replacement
- **Stylesheet cache** — bumped to `?v=4` after icons and layout changes

---

## [3.0] — 2026-06-11

### Fixed
- **CSS cache bust** — added `?v=3` query string to stylesheet link after browsers were serving stale styles from prior rebrand

---

## [2.0] — 2026-06-11

### Changed
- **Copy tone** — rewrote all page copy from corporate/formal language to personal, warm and human voice throughout:
  - Hero: "A gentle space to release what you've been carrying, reconnect with your body, and feel like yourself again."
  - CTAs: "Let's Have a Chat", "Come as You Are", "Start with a Free Chat"
  - Service descriptions emphasise personal experience over credentials
  - About and Isabelle pages use first-person warmth

---

## [1.0] — 2026-06-11

### Changed
- **Brand colours** — updated from placeholder palette to logo colour scheme: navy `#2D3E6B` and orange `#F5A623`
- **Font** — switched from Playfair Display to Nunito (800 weight headings) for a friendlier, rounder feel
- **CSS variables** — introduced `--navy`, `--gold`, `--gold-accent`, `--green-primary` as design tokens throughout
- **Nav CTA** — "Book a Session" button styled with brand navy background

---

## [0.1] — 2026-06-11 — Initial Release

### Added
- 8 HTML pages: `index.html`, `about.html`, `isabelle.html`, `tre.html`, `somatic-coaching.html`, `somatic-bodywork.html`, `book.html`, `socials.html`
- `styles.css` — full site stylesheet with CSS custom properties, responsive grid, card components, two-column layout, testimonials, footer
- Responsive navigation with hamburger menu for mobile
- Stats bar, service cards, testimonials, process steps, booking/contact form
- Footer with 4-column grid: brand, services, company, contact
- Google Fonts: Playfair Display + Inter
- GitHub Pages deployment via `TechNextSG/hummingbeing-website` (main branch)

---

*Live site: https://technextsg.github.io/hummingbeing-website/*
*Repository: https://github.com/TechNextSG/hummingbeing-website*
