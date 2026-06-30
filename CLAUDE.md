@AGENTS.md
# CLAUDE.md

This file is loaded automatically at the start of every Claude Code session in this repo. Read it in full before touching any code.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

**IMPORTANT:** Do not write a single line of code, a single component, or a single page until you have read all three of the following in full:

- @SF_Nail_Spa_SRS.md — requirements, sitemap, content, FR-IDs, acceptance criteria
- The `sf-nail-spa-design-system` skill — color tokens (light/dark), Poppins/Inter typography, component styles, GSAP motion patterns
- The `sf-nail-spa-frontend-build` skill — file structure, build order, content-fidelity rules, definition of done

If any of these three disagree, this file governs process, the design-system skill governs visuals/motion, and the SRS governs content/features. Never invent a service, page, or copy not present in the SRS.

---

## Project Overview

SF Nail Spa is a marketing/informational website for a nail and beauty salon in the Outer Sunset, San Francisco. Static-content site (no user accounts, no e-commerce in v1) with a booking/contact flow, a categorized nail-art gallery, and a light/dark theme with GSAP-driven micro-interactions.

## Tech Stack

- Next.js (App Router) + TypeScript — **read the local `node_modules/next/dist/docs/` before assuming any API**, per the notice above. Do not pattern-match against pre-trained Next.js knowledge (e.g. Pages Router conventions, old data-fetching methods) without confirming against the installed version's docs first.
- Default every component to a **Server Component**. Add `'use client'` only where required: theme toggle, GSAP-driven motion components, forms.
- Styling: CSS Modules + CSS custom properties ported directly from the design-system skill's token list — **not** Tailwind, unless you tell me otherwise (see Pending Decisions below).
- Fonts: `next/font/google` for Poppins + Inter, exposed as CSS variables — see design-system skill §3 for exact weights/usage.
- Animation: GSAP + ScrollTrigger, client-only (see design-system skill §6–§7 for every pattern: brushstroke draw-in, scroll reveals, magnetic button, navbar shrink, accordion, the "polish wipe" theme-toggle transition).

## Commands

Adjust these if the actual `package.json` scripts differ — check there before assuming:

```bash
npm run dev          # local dev server
npm run build         # production build — run before any Lighthouse/perf check
npm run start         # serve the production build
npm run lint          # lint
npm run typecheck     # if defined; otherwise `tsc --noEmit`
```

Run `npm run build` and `npm run lint` before considering any page "done" — don't rely on the dev server alone.

## Non-Negotiable Rules

- **IMPORTANT:** Reading `localStorage` or `prefers-color-scheme` during render causes a hydration mismatch in Next.js. Theme detection/application happens only inside `useEffect` in a Client Component, never during initial render. Use `suppressHydrationWarning` on `<html>`.
- **IMPORTANT:** GSAP requires the DOM — only import/call it inside `'use client'` files, inside `useEffect`, never at module top-level.
- Every animation must respect `prefers-reduced-motion` (pattern in the design-system skill §7.7) — check this on each new motion component individually, not once globally.
- No hardcoded hex values or `font-family` declarations in any component — reference the CSS variables only.
- All images go through `next/image`, never a raw `<img>`. Real photography is pending from the client — use clearly labeled placeholders with real, descriptive alt text (write alt text as if it were the final photo).
- Do not add hard gel nails, acrylics, or any other artificial nail extension service anywhere in copy, metadata, or schema — the SRS confirms this is explicitly not offered.
- Anything the SRS marks as pending (final pricing, cancellation policy, booking method, social links) gets a visible `// TODO:` comment at the exact spot, never a fabricated value.
- Use the Metadata API (`generateMetadata`/`export const metadata`) per page — no manual `<head>` tags. Inject `LocalBusiness` JSON-LD once in the root layout using the confirmed NAP data from the SRS.

## Definition of Done (per page)

Before marking any page complete, run the full checklist in the `sf-nail-spa-frontend-build` skill §8 (Next.js variant) — content fidelity, theme/hydration check, accessibility, Lighthouse against the production build, and the `BUILD_CHECKLIST.md` FR-ID mapping. Don't skip straight to "looks good" without it.

## Pending Decisions

Track these here as they're resolved — update this section instead of leaving the answer buried in chat history:

- [ ] Styling approach confirmed as CSS Modules (default above) — or Tailwind?
- [ ] Booking integration: custom form (current default, see frontend-build skill §4) or third-party scheduler (Square, Vagaro, Fresha, Calendly)?
- [ ] Final service pricing — from client
- [ ] Cancellation/no-show policy text — from client
- [ ] Final gallery photography — from client
- [ ] Social media links — from client