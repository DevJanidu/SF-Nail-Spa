---
name: mobile-responsive
description: Use this whenever building, reviewing, or fixing any web page or component (Next.js + Tailwind CSS) so it works correctly on mobile first, then scales up. Covers layout, typography, spacing, images, navigation, forms, tables, and touch targets. Apply to every section of every page — not just new features.
---

# Mobile-First Responsive Design

## Core rule

Write every component **mobile first**: base (unprefixed) Tailwind classes describe the ~375–390px phone layout. Add `sm:` / `md:` / `lg:` / `xl:` on top to adapt for larger screens. Never write desktop classes first and patch mobile in with overrides — that's how alignment bugs, overflow, and detached elements happen.

| Prefix | Min width | Typical device |
|--------|-----------|-----------------|
| *(none)* | 0px | Base — design this first |
| `sm:` | 640px | Large phone / small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Wide desktop |

Test at minimum: **375px, 414px, 768px, 1024px, 1440px.** A resized browser window is not a substitute for checking real breakpoints.

---

## 1. Global safety net

Add once in `globals.css` — catches silent overflow bugs before they ship:

```css
html, body {
  overflow-x: hidden;
}

* {
  min-width: 0; /* prevents flex/grid children from forcing overflow */
}

img, svg, video, canvas {
  max-width: 100%;
  height: auto;
  display: block;
}
```

---

## 2. Page shell & spacing

Every section uses a consistent gutter and vertical rhythm — text should never touch the viewport edge.

```tsx
export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`w-full px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 ${className}`}>
      <div className="mx-auto max-w-screen-xl">{children}</div>
    </section>
  );
}
```

- Horizontal padding: `px-5` minimum on mobile (20px), never `px-0`/`px-2` around body copy.
- Vertical padding: `py-12`+ between stacked sections so they don't feel cramped.
- Always cap width with `max-w-screen-xl mx-auto` so content doesn't stretch edge-to-edge on large monitors either.
- Use `gap-*` / `space-y-*` for spacing between siblings instead of one-off `mt-*`/`mb-*` on each element — one source of truth, easier to keep rhythm consistent.

---

## 3. Layout: stack first, columns later

Any multi-column layout (image+text, cards, feature grids) defaults to a single stacked column and only goes horizontal at `md:`+.

```tsx
{/* Two-column pattern */}
<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
  <div className="w-full md:w-2/5">{/* image */}</div>
  <div className="w-full md:w-3/5">{/* text */}</div>
</div>

{/* Card grid pattern */}
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {cards.map(card => <Card key={card.id} {...card} />)}
</div>
```

- Base state is always `flex-col` or `grid-cols-1`. Widen with `md:flex-row` / `sm:grid-cols-2` / `lg:grid-cols-3` — never the reverse.
- Don't use fixed pixel widths (`w-[400px]`) on flex/grid children — use fractional (`w-1/2`, `w-2/5`) or `flex-1` so they resize fluidly.
- Give images/media an explicit `aspect-square` / `aspect-video` / `aspect-[4/3]` so they never collapse to zero height on mobile.

---

## 4. Typography

Mobile gets a smaller base size; scale up, don't scale down.

```tsx
<p className="text-sm font-semibold uppercase tracking-wide">Eyebrow label</p>
<h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
  Headline goes here
</h1>
<p className="mt-4 max-w-prose text-base leading-relaxed sm:text-lg">
  Body copy paragraph.
</p>
```

- Headlines: start at `text-2xl`–`text-3xl` on mobile, not `text-5xl`+. Oversized mobile headings are the #1 cause of ugly word-wrap.
- `leading-tight` for headings, `leading-relaxed` for body text.
- `max-w-prose` (~65ch) on paragraphs so line length stays readable at every width.
- Never let long unbroken strings (URLs, emails, long words) overflow — add `break-words` or `truncate` where relevant.

---

## 5. Icon + label rows

The most common "detached icon" bug comes from `justify-between` or `items-center` on multi-line rows. Fix:

```tsx
<li className="flex items-start gap-3">
  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
  <span className="text-sm leading-snug sm:text-base">{label}</span>
</li>
```

- Icon first in DOM order, `shrink-0` so it never gets squeezed.
- `items-start` (not `items-center`) so a wrapping label stays aligned to the icon's top line.
- `gap-*` between icon and text; avoid `justify-between` for icon+label pairs — that's what pushes them apart on narrow widths.

---

## 6. Navigation

Desktop nav bars almost never fit on mobile as-is — they need a real mobile pattern, not shrunk text.

```tsx
<header className="flex items-center justify-between px-5 py-4 md:px-8">
  <Logo />
  <nav className="hidden md:flex md:items-center md:gap-8">
    {/* desktop links */}
  </nav>
  <button className="md:hidden" aria-label="Open menu" onClick={toggleMenu}>
    <MenuIcon className="h-6 w-6" />
  </button>
</header>

{/* Mobile menu: full-screen or slide-over drawer, not a squeezed inline row */}
{menuOpen && (
  <div className="fixed inset-0 z-50 flex flex-col gap-6 bg-black/95 p-6 md:hidden">
    {/* stacked links + close button */}
  </div>
)}
```

- Hide the full desktop nav below `md:` (`hidden md:flex`), show a hamburger/menu button instead (`md:hidden`).
- Mobile menu opens as a full-screen overlay or slide-over drawer with large, stacked, tappable links — not a horizontally scrolling row.
- Sticky headers: keep them short on mobile (`py-3`–`py-4`) so they don't eat too much viewport height.

---

## 7. Forms & inputs

```tsx
<input
  className="w-full rounded-lg border px-4 py-3 text-base"
  type="email"
  inputMode="email"
/>
<button className="w-full rounded-lg px-4 py-3 text-base font-semibold sm:w-auto">
  Submit
</button>
```

- `text-base` (16px) minimum on inputs — smaller sizes trigger iOS zoom-on-focus, which feels broken.
- Full-width inputs and buttons on mobile (`w-full`), auto width at `sm:`+ if the design calls for it.
- Set `inputMode` / `type` correctly (`email`, `tel`, `numeric`) so the right mobile keyboard appears.
- Stack label above input on mobile; side-by-side label/input layouts rarely survive narrow widths.

---

## 8. Tables & dense data

Tables are the layout most likely to break on mobile. Pick one:

- **Horizontal scroll container** (simplest, preserves structure):
  ```tsx
  <div className="w-full overflow-x-auto">
    <table className="min-w-[640px] w-full">{/* ... */}</table>
  </div>
  ```
- **Card transform** (better UX, more work): at `< md:`, render each row as a stacked card with `label: value` pairs instead of a `<table>`.

Never let a table force the whole page to scroll horizontally — always scope the scroll to the table's own wrapper.

---

## 9. Touch targets & interaction

- Minimum tap target: **44×44px** (`px-4 py-3` or larger) for any button, link, or icon button.
- Add visible spacing (`gap-2`+) between adjacent tappable elements so fat-finger mis-taps don't happen.
- Avoid hover-only interactions for critical actions (tooltips, dropdown reveals) — mobile has no hover. Provide a tap/click equivalent.
- Disable custom cursors, hover-triggered animations, or parallax effects below `md:` — they either don't apply or hurt performance on mobile.

---

## 10. Images & media

```tsx
<img
  src="/hero.jpg"
  alt="Description"
  className="aspect-video w-full rounded-xl object-cover sm:aspect-[16/9]"
  loading="lazy"
/>
```

- Always set an `aspect-*` ratio so layout doesn't shift while the image loads (prevents layout jank / CLS).
- Use `object-cover` to fill the box without distortion.
- Use `next/image` where possible for automatic responsive `srcset` and lazy loading.
- `loading="lazy"` on any image below the fold.

---

## 11. Final pre-ship checklist

Run this on **every** page/component, on an actual narrow viewport:

- [ ] No element touches the screen edge — `px-5`+ outer gutter everywhere.
- [ ] Headings sized for mobile first, scaled up with `sm:`/`md:`/`lg:`.
- [ ] Multi-column layouts are `flex-col`/`grid-cols-1` by default, widen at `md:`+.
- [ ] Icon+text rows use `items-start gap-*` with `shrink-0` icon — never `justify-between`.
- [ ] Images/media have explicit `aspect-*`, no layout shift on load.
- [ ] Nav collapses to a real mobile menu below `md:`, not shrunk desktop links.
- [ ] Inputs are `text-base`+ (16px) with correct `type`/`inputMode`.
- [ ] Tables scroll within their own wrapper, never force page-wide horizontal scroll.
- [ ] All buttons/links meet 44×44px minimum tap target with spacing between them.
- [ ] No hover-only critical interactions; tap/click equivalents exist.
- [ ] Long text (URLs, emails) has `break-words`/`truncate` so it can't overflow.
- [ ] Tested at 375px, 414px, 768px, 1024px, 1440px minimum.
- [ ] `overflow-x: hidden` on `html, body` as a last-line-of-defense safety net.



---
name: mobile-responsive
description: Mobile-first responsive design rules for Next.js + Tailwind CSS. Use this whenever building or fixing a page/section so it looks correct and aligned on small screens first, then scales up. Fixes common bugs like text running to the screen edge, icons detaching from their labels, oversized headlines wrapping badly, and inconsistent spacing between sections.
---

# Mobile-First Responsive Design (Next.js + Tailwind)

## Why this file exists

The attached screenshot shows the classic symptoms of "desktop-first, mobile-broken" code:

1. **No horizontal breathing room** — the heading and body text run edge-to-edge, almost touching the screen border.
2. **Checkmarks detached from their labels** — the `✓` sits on its own line above/beside the text instead of inline with it, because a flex/gap layout wasn't stacked correctly for narrow widths.
3. **Headline wrapping awkwardly** — "non-toxic, cruelty-free" breaks one or two words per line because `text-4xl`/`text-5xl` sizing was written for desktop and never scaled down.
4. **Inconsistent vertical rhythm** — the image, heading, body copy, and checklist all sit at different, seemingly arbitrary distances from each other.
5. **Image block floats disconnected from the text** — on mobile they should either stack cleanly or the image should be full-bleed above the text, not cramped to one side.

Every rule below exists to prevent one of these five problems. Build **mobile first**: write the base (unprefixed) Tailwind classes for a ~375px screen, then layer `sm:` / `md:` / `lg:` on top for larger viewports. Never write desktop classes first and try to patch mobile in later.

---

## 1. Page & section shell

Every section gets a consistent horizontal gutter and vertical rhythm. Never let text touch the viewport edge.

```tsx
// app/components/Section.tsx
export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`w-full px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 ${className}`}>
      <div className="mx-auto max-w-screen-xl">{children}</div>
    </section>
  );
}
```

Rules:
- **Horizontal padding**: `px-5` minimum on mobile (20px). Never `px-0` or `px-2` for body copy.
- **Vertical padding**: `py-12` minimum between sections on mobile so sections don't feel cramped when stacked.
- **Max width wrapper**: always cap content with `max-w-screen-xl mx-auto` so it doesn't stretch edge-to-edge on large screens either.

---

## 2. Two-column → stacked layout (the image + text pattern from the screenshot)

Desktop-first code often does `flex flex-row` with a fixed-width image column, which breaks on mobile because the image and text fight for space. Mobile-first fix: stack by default, go side-by-side only at `md:` and up.

```tsx
<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
  {/* Image */}
  <div className="w-full md:w-2/5">
    <img
      src="/clean-beauty.jpg"
      alt="Organic nail care ingredients"
      className="aspect-square w-full rounded-2xl object-cover"
    />
  </div>

  {/* Text */}
  <div className="w-full md:w-3/5">
    {/* heading, body, checklist go here */}
  </div>
</div>
```

Rules:
- Base state is `flex-col` (stacked). Add `md:flex-row` to go horizontal — don't do the reverse.
- Image gets a fixed `aspect-square` / `aspect-video` so it never collapses to zero height on mobile.
- Use `gap-*` instead of margins on individual children — one source of truth for spacing.

---

## 3. Typography scale (fixes the awkward headline wrap)

Never hardcode a single large desktop size. Always give a smaller mobile size and scale up.

```tsx
<p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
  Clean Beauty
</p>

<h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
  Organic, non-toxic, cruelty-free — as standard
</h2>

<p className="mt-4 max-w-prose text-base leading-relaxed text-white/70 sm:text-lg">
  We only use products that are safe for you, your nails, and the planet.
  No harsh chemicals, no compromises on the finish.
</p>
```

Rules:
- Mobile headline: `text-3xl` (30px) — not `text-5xl`/`text-6xl`. That's what was causing "non-‍toxic," "cruelty-‍free" to each wrap onto their own line with only 1–2 words.
- `leading-tight` on headlines, `leading-relaxed` on body copy.
- `max-w-prose` (~65ch) on paragraphs so lines don't run unnaturally long once you widen the viewport.
- Scale up with `sm:` / `md:` — never shrink down from a desktop base.

---

## 4. Icon + label rows (fixes the detached checkmark bug)

The checkmark separating from its text almost always means the icon and text are two independent flex/block items without `items-start` + `shrink-0`, so on narrow screens the icon wraps to its own line.

**Broken pattern (what causes the bug):**
```tsx
{/* ❌ icon can wrap away from text on narrow screens */}
<div className="flex justify-between">
  <p>Free from harsh solvents & formaldehyde</p>
  <span>✓</span>
</div>
```

**Fixed pattern:**
```tsx
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
      <span className="text-sm leading-snug text-white/80 sm:text-base">
        {children}
      </span>
    </li>
  );
}

<ul className="mt-6 space-y-4">
  <CheckItem>Free from harsh solvents & formaldehyde</CheckItem>
  <CheckItem>Vegan & cruelty-free brands</CheckItem>
  <CheckItem>Gentle on sensitive skin & nails</CheckItem>
</ul>
```

Rules:
- Icon comes **first** in DOM order, text second — put the icon on the left as a `shrink-0` flex child so it never gets squeezed or pushed to a new line.
- `items-start` (not `items-center`) so multi-line labels keep the icon aligned to the first line, not vertically centered against the whole block.
- `gap-3` between icon and text — never rely on `justify-between`, which is what pulls them to opposite ends of the row and can cause wrapping on narrow widths.
- `space-y-4` on the `<ul>` for consistent vertical rhythm between list items, not one-off margins.

---

## 5. Breakpoint reference

Use Tailwind's default breakpoints consistently across the whole app so components don't fight each other:

| Prefix | Min width | Typical device |
|--------|-----------|-----------------|
| *(none)* | 0px | Base mobile — design this first |
| `sm:` | 640px | Large phone / small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |

Rule of thumb: most content sections only need base + `md:` (stack → side-by-side). Reach for `sm:` for type-size bumps, and `lg:`/`xl:` only for max-width caps and multi-column grids.

---

## 6. Global checklist before shipping any page/section

Run through this for **every** component, on an actual ~375px viewport (not just a resized browser window):

- [ ] No text touches the viewport edge — minimum `px-5` on the outer wrapper.
- [ ] Headings are sized for mobile first (`text-2xl`–`text-3xl`), scaled up with `sm:`/`md:`/`lg:`.
- [ ] Any icon+text row uses `flex items-start gap-*` with `shrink-0` on the icon — never `justify-between`.
- [ ] Two-column layouts are `flex-col` by default, `md:flex-row` for wider screens.
- [ ] Images have an explicit `aspect-*` so they don't collapse or distort.
- [ ] Vertical spacing between sections and list items uses `space-y-*` / `gap-*`, not scattered `mt-*`/`mb-*` on individual elements.
- [ ] Long paragraphs are capped with `max-w-prose` so line length stays readable at every width.
- [ ] Buttons/links have a minimum 44×44px tap target (`px-4 py-3` or larger) — no tiny mobile tap targets.
- [ ] Test at 375px, 414px, 768px, and 1024px widths minimum before calling a section done.

---

## 7. Quick global CSS safety net

Add this once in `globals.css` to catch overflow bugs that are otherwise invisible until someone hits them on a real phone:

```css
html, body {
  overflow-x: hidden;
}

img, svg, video {
  max-width: 100%;
  height: auto;
}
```

This won't fix bad layout, but it prevents a single oversized element from creating horizontal scroll on the whole page — a very common silent mobile bug.