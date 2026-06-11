# HummingBeing Website — Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
