---
name: sf-nail-spa-design-system
description: Visual design system and GSAP animation guide for the SF Nail Spa website (light + dark theme, Poppins/Inter typography, interactive components). Use this skill whenever building, styling, or animating ANY page, component, or section of the SF Nail Spa site — Home, About, Services, Pricing, Gallery, Testimonials, FAQs, Booking, or Contact — even if the user only asks to "build a page," "add a section," "style this," "make it interactive," or "add animation," without explicitly naming colors, fonts, or GSAP. This is the single source of truth for color tokens, type scale, component styles, theme-toggle behavior, and motion patterns for this project — always consult it before writing CSS/HTML/JS for this site so output stays visually consistent across pages.
---

# SF Nail Spa — Design System & Motion Guide

## 1. Creative Direction

**Concept:** *Fog meets polish.* The Outer Sunset is defined by soft coastal fog, weathered wood, and quiet mornings — but inside the salon it's warm, hand-finished, and a little glossy. The palette pairs sandy, fog-muted neutrals with a warm terracotta-clay "polish" accent and a sage "organic" accent. Nothing neon, nothing clinical — this is a calm, tactile, premium-but-approachable beauty brand, not a tech startup.

**Signature element:** A hand-drawn brushstroke underline/divider (a single wavy SVG stroke) that "paints itself" on with a stroke-draw animation wherever it appears — under headings, beneath nav links on hover, as a section divider. It's the one recurring motif that ties every page back to "a nail technician's brushstroke." Use it deliberately, not on every line of text.

**Rule of restraint:** Spend animation budget on (a) the brushstroke motif, (b) scroll reveals, and (c) the theme-toggle transition. Everything else (buttons, cards) gets quiet, fast micro-interactions only. Do not stack multiple competing effects on one element.

Always respect `prefers-reduced-motion` (see §7.6) and keep keyboard focus states visible — these are non-negotiable on every component below.

---

## 2. Color Tokens

Define both themes as CSS custom properties on `:root` and `[data-theme="dark"]`, never hard-code hex values in components — every component below references these variables only.

```css
:root,
[data-theme="light"] {
  /* Base */
  --color-bg: #F7F2EA;          /* Sand */
  --color-surface: #FFFFFF;     /* Shell */
  --color-surface-alt: #F1EAE0; /* Sand, one shade deeper — alternating sections */
  --color-border: #E3DCD0;      /* Mist */

  /* Text */
  --color-text: #2A2521;        /* Ink */
  --color-text-muted: #6B6258;  /* Driftwood */
  --color-text-on-accent: #FFFFFF;

  /* Accents */
  --color-accent: #C2785F;      /* Clay — primary CTA / links / brushstroke */
  --color-accent-hover: #AC6448;
  --color-accent-soft: #F1DDD3; /* Clay tint for badges/chips */
  --color-secondary: #7C8F6E;   /* Sage — organic/eco callouts */
  --color-secondary-soft: #E5EADF;
  --color-gold: #C9A227;        /* Sparing use: ratings, chrome/cat-eye highlights */

  /* Feedback */
  --color-success: #6E8F5C;
  --color-error: #B6493A;

  /* Elevation */
  --shadow-sm: 0 1px 2px rgba(42, 37, 33, 0.06);
  --shadow-md: 0 8px 24px rgba(42, 37, 33, 0.08);
  --shadow-lg: 0 20px 48px rgba(42, 37, 33, 0.14);
}

[data-theme="dark"] {
  --color-bg: #1B1815;          /* Tide */
  --color-surface: #242019;     /* Kelp */
  --color-surface-alt: #2C2720;
  --color-border: #3A352F;      /* Smoke */

  --color-text: #F3ECE3;        /* Shell (light) */
  --color-text-muted: #B8AFA3;
  --color-text-on-accent: #1B1815;

  --color-accent: #E0967A;      /* Clay Glow */
  --color-accent-hover: #E8AC95;
  --color-accent-soft: #3B2C25;
  --color-secondary: #9CB389;   /* Sage Glow */
  --color-secondary-soft: #2A3324;
  --color-gold: #E0BD5A;

  --color-success: #8FB378;
  --color-error: #E07B6C;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 20px 48px rgba(0, 0, 0, 0.5);
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.4s ease, color 0.4s ease;
}
```

**Usage rules:**
- `--color-accent` (Clay) is the only color used for primary CTAs, links, focus rings, and the brushstroke motif — don't introduce a second "primary" color.
- `--color-secondary` (Sage) is reserved for "organic / non-toxic / cruelty-free" callouts — badges, the Why Choose Us icons, eco-related copy. This is what separates it visually from booking/CTA actions.
- `--color-gold` is an accent of last resort: star ratings and chrome/cat-eye gallery tags only. Never use it for buttons or large fills.
- Alternate `--color-bg` and `--color-surface-alt` between page sections instead of adding borders everywhere, to create rhythm without clutter.

---

## 3. Typography

**Display / Headings — Poppins** (geometric, warm, rounded terminals — friendly luxury).
**Body / UI — Inter** (neutral, highly legible — forms, nav, paragraph copy, prices).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: "Poppins", sans-serif;
  --font-body: "Inter", sans-serif;

  /* Fluid type scale */
  --text-xs: 0.8rem;
  --text-sm: 0.9rem;
  --text-base: 1rem;
  --text-lg: 1.15rem;
  --text-xl: clamp(1.4rem, 1.1rem + 1.2vw, 1.8rem);
  --text-2xl: clamp(1.9rem, 1.4rem + 2vw, 2.6rem);
  --text-3xl: clamp(2.4rem, 1.6rem + 3.2vw, 3.8rem);
}

h1, h2, h3, .display {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.1;
}

h1 { font-size: var(--text-3xl); font-weight: 700; }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }

body, p, a, button, input, textarea, label {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
}

.eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}
```

Never substitute another font pairing mid-build, and don't use Poppins for body copy or Inter for H1s — the contrast between the two is part of the brand voice (warm display / crisp body).

---

## 4. Layout & Spacing

```css
:root {
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
  --space-6: 6rem;     /* section vertical padding (desktop) */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;   /* cards, image frames — soft, "spa" feel, never sharp corners */
  --container: 1140px;
}

.container {
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--space-3);
}

.section { padding-block: var(--space-6); }
@media (max-width: 768px) {
  .section { padding-block: var(--space-4); }
}
```

Grid: use CSS Grid for service/gallery cards (`auto-fit, minmax(260px, 1fr)`), never fixed pixel columns, so the layout reflows naturally from mobile to desktop without separate breakpoint rewrites.

---

## 5. Core Components

### 5.1 Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  padding: 0.9rem 1.75rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}
.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-on-accent);
}
.btn-primary:hover { background: var(--color-accent-hover); box-shadow: var(--shadow-md); }
.btn-secondary {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text);
}
.btn-secondary:hover { border-color: var(--color-accent); color: var(--color-accent); }
.btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```
Pair `.btn-primary` with the **magnetic hover** pattern (§7.3) — never on `.btn-secondary` or nav links, to keep the "pull" effect meaningful as a primary-action signal.

### 5.2 Cards (Service / Gallery / Testimonial)

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  box-shadow: var(--shadow-sm);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}
```

### 5.3 Nav Bar

- Sticky, transparent over the hero, transitions to `--color-surface` + `--shadow-sm` after 60px scroll (GSAP pattern in §7.4).
- Nav links underline with the brushstroke SVG on hover (§7.1), not a plain `border-bottom`.
- Mobile: full-screen overlay menu, links stagger in (§7.2 stagger pattern).

### 5.4 Accordion (FAQs)

```css
.accordion-item { border-bottom: 1px solid var(--color-border); }
.accordion-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) 0;
  font-family: var(--font-display);
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
}
.accordion-panel { overflow: hidden; height: 0; } /* GSAP animates height — see §7.5 */
```

### 5.5 Theme Toggle

A pill switch, icon morphs between a sun (filled circle + rays, evoking a cat-eye sparkle) and a crescent moon. Markup only — behavior is in §6.

```html
<button id="theme-toggle" aria-label="Toggle dark mode" class="theme-toggle">
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
</button>
```

```css
.theme-toggle { background: none; border: none; cursor: pointer; }
.toggle-track {
  width: 52px; height: 28px; border-radius: 999px;
  background: var(--color-border);
  display: flex; align-items: center; padding: 3px;
  transition: background-color 0.3s ease;
}
.toggle-thumb {
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--color-accent);
  transition: transform 0.3s ease;
}
[data-theme="dark"] .toggle-thumb { transform: translateX(24px); }
```

---

## 6. GSAP Setup

Load GSAP + ScrollTrigger before any custom script:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>gsap.registerPlugin(ScrollTrigger);</script>
```

(For a production build via npm: `npm install gsap` then `import { gsap } from "gsap"; import { ScrollTrigger } from "gsap/ScrollTrigger";`.)

**The theme-toggle "polish wipe" transition** is this project's signature interaction — it should feel like a brush of color sweeping across the screen rather than an instant flash:

```html
<div id="polish-wipe" aria-hidden="true"></div>
```
```css
#polish-wipe {
  position: fixed; inset: 0; z-index: 9999;
  background: var(--color-accent);
  pointer-events: none;
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); /* collapsed at left edge */
}
```
```js
const toggle = document.getElementById('theme-toggle');
const wipe = document.getElementById('polish-wipe');
const root = document.documentElement;

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const tl = gsap.timeline();

  tl.to(wipe, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // sweeps fully across
      duration: 0.45,
      ease: 'power2.inOut'
    })
    .add(() => { root.dataset.theme = next; })
    .to(wipe, {
      clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', // exits on the right
      duration: 0.45,
      ease: 'power2.inOut'
    });
});
```

### 7.1 Brushstroke Draw-In (signature motif)

Use an inline SVG path under headings/nav links; animate `stroke-dashoffset` rather than the paid DrawSVG plugin:

```html
<h2>Our Services<svg class="brushstroke" viewBox="0 0 200 20"><path d="M2 14 Q 50 2, 100 12 T 198 8"/></svg></h2>
```
```css
.brushstroke path {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 4;
  stroke-linecap: round;
}
```
```js
document.querySelectorAll('.brushstroke path').forEach((path) => {
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: path, start: 'top 85%' }
  });
});
```

### 7.2 Scroll-Triggered Section Reveals

Apply to service cards, gallery tiles, testimonial cards, About Us blocks — fade-up with a slight stagger, never a bounce or rotation (keep it calm/spa-like):

```js
gsap.utils.toArray('.reveal-group').forEach((group) => {
  gsap.from(group.querySelectorAll('.card'), {
    y: 32,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.12,
    scrollTrigger: { trigger: group, start: 'top 80%' }
  });
});
```

### 7.3 Magnetic Primary Button

```js
document.querySelectorAll('.btn-primary').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
  });
});
```
Desktop pointer devices only — skip on touch (`@media (hover: hover)` guard or `matchMedia('(hover: hover)')` check) since it has no meaning on mobile.

### 7.4 Navbar Shrink on Scroll

```js
ScrollTrigger.create({
  start: 'top -60',
  onUpdate: (self) => {
    document.querySelector('.navbar').classList.toggle('navbar--scrolled', self.scroll() > 60);
  }
});
```
```css
.navbar { background: transparent; transition: background-color 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease; padding-block: var(--space-3); }
.navbar--scrolled { background: var(--color-surface); box-shadow: var(--shadow-sm); padding-block: var(--space-1); }
```

### 7.5 Accordion Expand (FAQs)

```js
document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panel = trigger.nextElementSibling;
    const isOpen = panel.dataset.open === 'true';
    gsap.to(panel, {
      height: isOpen ? 0 : panel.scrollHeight,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => { panel.dataset.open = (!isOpen).toString(); }
    });
    trigger.querySelector('.accordion-icon')
      .style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
  });
});
```

### 7.6 Hero Load Sequence

Runs once on page load (Home hero only — don't repeat this full sequence on every page header, or it stops feeling special):

```js
gsap.timeline({ defaults: { ease: 'power3.out' } })
  .from('.hero-eyebrow', { y: 16, opacity: 0, duration: 0.5 })
  .from('.hero-title', { y: 24, opacity: 0, duration: 0.7 }, '-=0.3')
  .from('.hero-subtitle', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
  .from('.hero-cta', { y: 12, opacity: 0, duration: 0.5 }, '-=0.3')
  .from('.hero-image', { scale: 1.06, opacity: 0, duration: 1 }, '-=0.6');
```

### 7.7 Reduced Motion

Wrap every animation registration in a guard so users who request less motion get instant, accessible states instead of disabled content:

```js
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (motionOK) {
  // register all GSAP/ScrollTrigger animations from §7.1–§7.6 here
} else {
  // set end-state styles directly (opacity:1, no transform) — content must never stay hidden
}
```

---

## 8. Page-Specific Notes

- **Home:** hero sequence (§7.6) + scroll reveals (§7.2) for the service/testimonial/gallery preview rows. One brushstroke under the H1.
- **Services / Pricing:** scroll reveals on category groups; brushstroke under each category H2; do not add hover-tilt or 3D effects on pricing tables — keep these the calmest pages on the site for easy scanning.
- **Gallery:** card hover = `scale(1.04)` image zoom + caption fade-in (CSS transition is enough, GSAP not required); lightbox open/close can use a simple GSAP `fromTo` opacity+scale (0.3s).
- **FAQs:** accordion pattern (§7.5) only — no scroll-reveal stagger needed since content is already collapsed.
- **Booking/Contact forms:** no scroll/hover flourishes on inputs; only a focus-state border-color transition to `--color-accent`. Forms are a "get it done" zone, not a showcase zone.

---

## 9. Quick Checklist Before Shipping Any Page

- [ ] Colors pulled only from the tokens in §2 (no hard-coded hex in component CSS)
- [ ] Headings use Poppins, body/UI uses Inter
- [ ] Light and dark theme both visually checked (toggle works, contrast holds in both)
- [ ] Buttons/links have visible `:focus-visible` states
- [ ] Scroll reveals use fade-up only — no rotation/bounce
- [ ] Animations wrapped in the `prefers-reduced-motion` guard (§7.7)
- [ ] No more than one "special" motion moment per page (brushstroke, hero sequence, or theme wipe — not all three competing at once in view)