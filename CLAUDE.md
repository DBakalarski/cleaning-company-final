# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Cleaning Service Konin** (Polish cleaning company). This is a Next.js 15 rewrite of an
original static visual-builder page; the source HTML lives in `legacy/` as the **source of truth for copy and
visual design** (excluded from the TypeScript build). All UI copy is in Polish.

Two routes: `/` (landing, composed in `app/page.tsx`) and `/cennik` (pricing, `app/cennik/page.tsx`).

## Commands

```bash
npm run dev          # dev server (next dev)
npm run build        # production build
npm run lint         # next lint
npm test             # vitest run (one-shot)
npm run test:watch   # vitest watch mode
npx vitest run components/sections/Hero.test.tsx   # run a single test file
```

## Architecture

**Data / presentation split — the core convention.** Static content is never hardcoded in components. It lives
in typed modules under `data/` (each exports `const` arrays/objects plus their `type`), and components import and
render it. When changing copy, pricing, FAQ entries, testimonials, nav links, etc., edit the `data/*.ts` file —
not the component. Examples: `data/site.ts` (phone/contact/area, single source for all contact info),
`data/navigation.ts`, `data/offer.ts`, `data/pricing.ts`, `data/faq.ts`.

**Server-first components.** Everything is a React Server Component by default. Only four components opt into
`"use client"` because they hold `useState`: `components/layout/Header.tsx` (mobile menu),
`components/sections/Offer.tsx` (private/business tabs), `components/sections/Faq.tsx` (single-open accordion),
`components/sections/Contact.tsx` (mock form — flips to a thank-you panel, **sends nothing**). Keep new components
server-side unless they genuinely need interactivity.

**Component layout:** `components/sections/` (page sections, each maps to a `<section>` on the landing page),
`components/layout/` (Header, Footer, MobileCallButton), `components/pricing/`, `components/ui/` (shared atoms).
The landing page is assembled by listing sections in order in `app/page.tsx`.

## Styling

Tailwind CSS **v4**, configured entirely in `app/globals.css` via `@theme` — there is **no `tailwind.config.js`**.
Design tokens are defined there as CSS custom properties and used as utilities:

- Colors: `cream` (page bg), `sand` (alt bg), `accent` / `accent-soft`, `ink` / `ink-deep` / `ink-soft`,
  `quiet`, `muted`, `faint`, `line` / `line-mid` / `line-soft` / `line-hover`. Use these names rather than raw hex.
- Fonts via `next/font/google` (set up in `app/layout.tsx`): `font-heading` → Poppins, `font-body` → Lato (body
  default). `latin-ext` subset is required for Polish characters.

Components lean heavily on `clamp()` for fluid responsive sizing — match that style when adding layout.

## Testing

Vitest + React Testing Library (jsdom), config in `vitest.config.ts`, globals enabled (no test imports needed).
The `@/*` alias maps to the repo root. Tests sit next to source as `*.test.tsx`/`*.test.ts`. `data/data.test.ts`
asserts data-module invariants (e.g. exact nav link order, contact values) — update it when changing that data.

## Reference material

`docs/superpowers/plans/2026-06-13-cleaning-service-nextjs.md` is the original implementation plan: it documents
the full design-token table, the data/component mapping, and locked decisions (e.g. single "klasyczny" Hero
variant, mock contact form). Consult it before large structural changes. `legacy/*.dc.html` holds the original
copy/layout; do not ship or import from `legacy/`.
