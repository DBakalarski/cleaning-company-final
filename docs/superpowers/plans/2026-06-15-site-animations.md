# Site Animations (GSAP, Level 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the marketing site feel alive — scroll-reveal section entrances, a sequential Hero entrance, staggered card grids, and smooth micro-interactions (hover, buttons, header-on-scroll, FAQ, tabs, mobile menu) — at "Level 2" (medium) intensity, across both `/` and `/cennik`.

**Architecture:** GSAP drives *entrance choreography* (section reveals + Hero) inside thin `"use client"` wrappers (`Reveal`, `HeroMotion`); sections stay React Server Components passed as `children`. Reveals are **triggered by IntersectionObserver** (reliable under SSR/font reflow — the lesson from the abandoned `feat/gsap-animations` branch), not ScrollTrigger. *Micro-interactions and UI states* (hover-lift, button press, header shrink, FAQ accordion, tab switch, mobile menu) are plain **CSS**. A pre-paint inline script gates hidden states so there is no flash and no-JS keeps everything visible; `prefers-reduced-motion` disables all motion.

**Tech Stack:** Next.js 15 (App Router, RSC), React 19, Tailwind v4 (`@theme` in `app/globals.css`), `gsap@^3.15.0` + `@gsap/react@^2.1.2`, Vitest + React Testing Library (jsdom).

**Deviation from spec (intentional):** The spec named an `AnimationProvider`. With the A/B variant switcher and ScrollTrigger both cut from this iteration, a React provider/context has no job, so it is replaced by (a) a one-line GSAP-registration module (`components/anim/gsap.ts`) and (b) the pre-paint gate script in `app/layout.tsx`. When future scroll-scrubbed work adds ScrollTrigger, reintroduce a provider then (to register ScrollTrigger + `ScrollTrigger.refresh()` after fonts/load).

**Reveal coverage map (decided):**
- **HeroMotion** (sequential, plays on mount): Hero.
- **Block reveal** (whole section slides up once): About, PricingInfo, PricingPreview, ServiceArea, Offer, Faq, Contact; on `/cennik`: the intro hero `<section>` and the dark CTA `<section>`.
- **Stagger reveal** (header + items appear in sequence; static grids only): WhyUs, Process, Testimonials; on `/cennik`: the pricing-categories `<section>`.
- Offer & Faq are **block** (not stagger) because their content changes at runtime (tab switch / accordion); their internal motion is handled by CSS so dynamically-mounted nodes are never left stuck hidden.

---

## Task 1: Install GSAP and add the registration module

**Files:**
- Modify: `package.json` (dependencies)
- Create: `components/anim/gsap.ts`

- [ ] **Step 1: Install the dependencies**

Run:
```bash
npm install gsap@^3.15.0 @gsap/react@^2.1.2
```
Expected: `package.json` gains `"gsap"` and `"@gsap/react"` under `dependencies`; `package-lock.json` updates; exit code 0.

- [ ] **Step 2: Create the single GSAP registration point**

Create `components/anim/gsap.ts`:
```ts
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register the React integration once for the whole app. Anim components import
// gsap/useGSAP from here so registration can never be forgotten or duplicated.
gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
```

- [ ] **Step 3: Verify it type-checks**

Run:
```bash
npx tsc --noEmit
```
Expected: exit code 0 (no type errors).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json components/anim/gsap.ts
git commit -m "chore: add gsap deps and registration module"
```

---

## Task 2: Pre-paint gate (no flash, no-JS safe, reduced-motion aware)

**Files:**
- Modify: `app/layout.tsx` (add inline gate script as first child of `<body>`)
- Modify: `app/globals.css` (hidden-state rules under `html.anim-ready`)

The gate adds `anim-ready` to `<html>` **before first paint** only when motion is allowed. CSS then hides reveal targets pre-paint (no flash). Without JS or under reduced-motion the class is never added, so content stays visible.

- [ ] **Step 1: Add the inline gate script to the layout**

In `app/layout.tsx`, the `<body>` currently is:
```tsx
      <body className={`${poppins.variable} ${lato.variable} font-body`}>
        {children}
      </body>
```
Change it to (add the script as the FIRST child of `<body>`):
```tsx
      <body className={`${poppins.variable} ${lato.variable} font-body`}>
        <script
          // Runs before paint: hide animated content only when motion is allowed.
          // No JS / reduced-motion => class absent => everything stays visible.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim-ready')}}catch(e){}",
          }}
        />
        {children}
      </body>
```
(`<html>` already has `suppressHydrationWarning`, which covers the class mutation — leave it.)

- [ ] **Step 2: Add the gate CSS**

In `app/globals.css`, append at the end of the file:
```css
/* --- Animation gate -------------------------------------------------------
   Hidden start state applies ONLY under html.anim-ready (added pre-paint by the
   inline script in app/layout.tsx, and only when motion is allowed). GSAP then
   sets inline styles that override these and animates the elements in. */
html.anim-ready [data-reveal],
html.anim-ready [data-reveal-item],
html.anim-ready [data-hero-el] {
  opacity: 0;
}
```

- [ ] **Step 3: Verify the app still builds**

Run:
```bash
npm run build
```
Expected: build succeeds (exit code 0). Nothing animates yet (no reveal targets exist), and `anim-ready` has no targets, so the page renders normally.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: add pre-paint animation gate (no-flash, reduced-motion aware)"
```

---

## Task 3: Test setup — matchMedia mock (reduced-motion ON in tests)

**Files:**
- Modify: `vitest.setup.ts`

jsdom has no `matchMedia`; GSAP and our guards call it. Returning `matches: true` for the reduced-motion query makes every anim component take its "show immediately" branch in tests, so content is fully visible and all existing component tests keep passing unchanged.

- [ ] **Step 1: Replace the setup file contents**

`vitest.setup.ts` currently is:
```ts
import "@testing-library/jest-dom";
```
Replace with:
```ts
import "@testing-library/jest-dom";

// jsdom lacks matchMedia. Report reduced-motion as ON so anim components skip
// animation and leave content fully visible/queryable in tests.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: /prefers-reduced-motion/.test(query),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
```

- [ ] **Step 2: Verify existing tests still pass**

Run:
```bash
npm test
```
Expected: all existing tests pass (exit code 0). This is the baseline before adding anim code.

- [ ] **Step 3: Commit**

```bash
git add vitest.setup.ts
git commit -m "test: mock matchMedia (reduced-motion on) for anim components"
```

---

## Task 4: `Reveal` component (block + stagger), TDD

**Files:**
- Create: `components/anim/Reveal.tsx`
- Test: `components/anim/Reveal.test.tsx`

Behaviour: a thin client wrapper. Block mode animates the wrapper itself (`data-reveal`); stagger mode animates descendant `[data-reveal-item]` in sequence (`data-reveal-stagger` on the wrapper). Reveals trigger via IntersectionObserver. Under reduced-motion or when IntersectionObserver is unavailable (jsdom), it shows content immediately.

- [ ] **Step 1: Write the failing test**

Create `components/anim/Reveal.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

test("renders children unchanged", () => {
  render(
    <Reveal>
      <p>Sekcja</p>
    </Reveal>,
  );
  expect(screen.getByText("Sekcja")).toBeInTheDocument();
});

test("forwards className to the wrapper element", () => {
  const { container } = render(<Reveal className="block">x</Reveal>);
  expect(container.firstElementChild).toHaveClass("block");
});

test("block mode marks the wrapper with data-reveal", () => {
  const { container } = render(<Reveal>x</Reveal>);
  expect(container.firstElementChild).toHaveAttribute("data-reveal");
  expect(container.firstElementChild).not.toHaveAttribute("data-reveal-stagger");
});

test("stagger mode marks the wrapper with data-reveal-stagger", () => {
  const { container } = render(
    <Reveal stagger>
      <span data-reveal-item>a</span>
    </Reveal>,
  );
  expect(container.firstElementChild).toHaveAttribute("data-reveal-stagger");
  expect(container.firstElementChild).not.toHaveAttribute("data-reveal");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
npx vitest run components/anim/Reveal.test.tsx
```
Expected: FAIL — `Failed to resolve import "./Reveal"` (file does not exist yet).

- [ ] **Step 3: Implement `Reveal`**

Create `components/anim/Reveal.tsx`:
```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";

type Direction = "up" | "left" | "right";

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 30 },
  left: { x: -40 },
  right: { x: 40 },
};

type RevealProps = {
  children: ReactNode;
  /** Direction the element travels in from. Default "up". */
  direction?: Direction;
  /** Extra delay before the tween (seconds). */
  delay?: number;
  /** Stagger descendant [data-reveal-item] elements instead of the wrapper. */
  stagger?: boolean;
  className?: string;
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  stagger = false,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const targets: HTMLElement[] = stagger
        ? gsap.utils.toArray<HTMLElement>(
            root.querySelectorAll("[data-reveal-item]"),
          )
        : [root];
      if (!targets.length) return;

      const reduce =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Reduced motion, or no IntersectionObserver (jsdom / very old browsers):
      // never leave content hidden — show it immediately.
      if (reduce || typeof IntersectionObserver === "undefined") {
        gsap.set(targets, { autoAlpha: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(targets, { autoAlpha: 0, ...OFFSET[direction] });

      const io = new IntersectionObserver(
        (entries, obs) => {
          if (entries.some((e) => e.isIntersecting)) {
            gsap.to(targets, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              delay,
              stagger: stagger ? 0.09 : 0,
              overwrite: true,
            });
            obs.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
      );
      io.observe(root);

      return () => io.disconnect();
    },
    { scope: ref },
  );

  const flag = stagger
    ? { "data-reveal-stagger": "" }
    : { "data-reveal": "" };

  return (
    <div ref={ref} className={className} {...flag}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run:
```bash
npx vitest run components/anim/Reveal.test.tsx
```
Expected: PASS (4 tests). In jsdom `IntersectionObserver` is undefined, so the guard runs `gsap.set(... autoAlpha:1)` and children render visible.

- [ ] **Step 5: Commit**

```bash
git add components/anim/Reveal.tsx components/anim/Reveal.test.tsx
git commit -m "feat: add Reveal (IntersectionObserver-triggered GSAP reveal)"
```

---

## Task 5: `HeroMotion` component + Hero hooks, TDD

**Files:**
- Create: `components/anim/HeroMotion.tsx`
- Test: `components/anim/HeroMotion.test.tsx`
- Modify: `components/sections/Hero.tsx`

HeroMotion replaces the Hero text-column wrapper `<div>` (same className, so layout is unchanged) and sequentially reveals its `[data-hero-el]` children on mount.

- [ ] **Step 1: Write the failing test**

Create `components/anim/HeroMotion.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { HeroMotion } from "./HeroMotion";

test("renders its children", () => {
  render(
    <HeroMotion className="flex">
      <h1 data-hero-el>Tytuł</h1>
    </HeroMotion>,
  );
  expect(screen.getByText("Tytuł")).toBeInTheDocument();
});

test("forwards className to the wrapper", () => {
  const { container } = render(<HeroMotion className="flex flex-col">x</HeroMotion>);
  expect(container.firstElementChild).toHaveClass("flex", "flex-col");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
npx vitest run components/anim/HeroMotion.test.tsx
```
Expected: FAIL — cannot resolve `./HeroMotion`.

- [ ] **Step 3: Implement `HeroMotion`**

Create `components/anim/HeroMotion.tsx`:
```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";

export function HeroMotion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const targets = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-hero-el]"),
      );
      if (!targets.length) return;

      const reduce =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(targets, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(targets, { autoAlpha: 0, y: 24 });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.05,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run:
```bash
npx vitest run components/anim/HeroMotion.test.tsx
```
Expected: PASS (2 tests).

- [ ] **Step 5: Hook up Hero**

In `components/sections/Hero.tsx`:

(a) Add the import after the existing imports (top of file):
```tsx
import { HeroMotion } from "@/components/anim/HeroMotion";
```

(b) Replace the opening of the text column. Current:
```tsx
      <div className="flex flex-col gap-6">
        <SectionEyebrow label="Usługi sprzątające • Konin i okolice" />
        <h1 className="m-0 font-heading text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.12] tracking-[-1px] text-balance">
```
becomes:
```tsx
      <HeroMotion className="flex flex-col gap-6">
        <div data-hero-el>
          <SectionEyebrow label="Usługi sprzątające • Konin i okolice" />
        </div>
        <h1 data-hero-el className="m-0 font-heading text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.12] tracking-[-1px] text-balance">
```

(c) Add `data-hero-el` to the paragraph. Current:
```tsx
        <p className="m-0 max-w-[520px] font-body text-[clamp(16px,1.5vw,18px)] leading-[1.7] text-muted text-pretty">
```
becomes:
```tsx
        <p data-hero-el className="m-0 max-w-[520px] font-body text-[clamp(16px,1.5vw,18px)] leading-[1.7] text-muted text-pretty">
```

(d) Add `data-hero-el` to the CTA row. Current:
```tsx
        <div className="mt-1.5 flex flex-wrap gap-3">
```
becomes:
```tsx
        <div data-hero-el className="mt-1.5 flex flex-wrap gap-3">
```

(e) Add `data-hero-el` to the badges row, and close with `</HeroMotion>`. Current:
```tsx
        <div className="mt-2 flex flex-wrap gap-x-[22px] gap-y-2.5">
          {badges.map((badge) => (
            <span key={badge} className="font-body text-[13.5px] text-faint">
              ✦ {badge}
            </span>
          ))}
        </div>
      </div>
```
becomes:
```tsx
        <div data-hero-el className="mt-2 flex flex-wrap gap-x-[22px] gap-y-2.5">
          {badges.map((badge) => (
            <span key={badge} className="font-body text-[13.5px] text-faint">
              ✦ {badge}
            </span>
          ))}
        </div>
      </HeroMotion>
```

- [ ] **Step 6: Run Hero + anim tests**

Run:
```bash
npx vitest run components/sections/Hero.test.tsx components/anim/HeroMotion.test.tsx
```
Expected: PASS. (Reduced-motion mock makes HeroMotion show content immediately, so the existing Hero assertions — heading, CTAs, brand panel — all resolve.)

- [ ] **Step 7: Commit**

```bash
git add components/anim/HeroMotion.tsx components/anim/HeroMotion.test.tsx components/sections/Hero.tsx
git commit -m "feat: animate Hero entrance (sequential stagger)"
```

---

## Task 6: Wire landing-page section reveals

**Files:**
- Modify: `app/page.tsx`

Wrap each section (except Hero) in `Reveal`. Block for most; `stagger` for the static card grids (WhyUs, Process, Testimonials).

- [ ] **Step 1: Replace the page body**

In `app/page.tsx`, add the import below the existing imports:
```tsx
import { Reveal } from "@/components/anim/Reveal";
```
Then replace the `<main>` block. Current:
```tsx
      <main id="start" className="min-w-[320px] overflow-x-hidden">
        <Hero />
        <About />
        <WhyUs />
        <Offer />
        <Process />
        <PricingInfo />
        <PricingPreview />
        <ServiceArea />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
```
becomes:
```tsx
      <main id="start" className="min-w-[320px] overflow-x-hidden">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal stagger>
          <WhyUs />
        </Reveal>
        <Reveal>
          <Offer />
        </Reveal>
        <Reveal stagger>
          <Process />
        </Reveal>
        <Reveal>
          <PricingInfo />
        </Reveal>
        <Reveal>
          <PricingPreview />
        </Reveal>
        <Reveal>
          <ServiceArea />
        </Reveal>
        <Reveal stagger>
          <Testimonials />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
```

- [ ] **Step 2: Verify build + existing tests**

Run:
```bash
npm run build && npm test
```
Expected: build succeeds; all tests pass (no page-level tests exist; section tests render components directly without `Reveal`). The stagger wrappers have no `[data-reveal-item]` targets yet (added in Task 7) — that is fine: `Reveal` no-ops (`if (!targets.length) return;`) and the gate doesn't hide the wrapper in stagger mode, so those sections stay visible until Task 7 adds items.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: scroll-reveal landing page sections"
```

---

## Task 7: Stagger items in WhyUs, Process, Testimonials

**Files:**
- Modify: `components/sections/WhyUs.tsx`
- Modify: `components/sections/Process.tsx`
- Modify: `components/sections/Testimonials.tsx`

Mark the section header block and each card with `data-reveal-item` so the page-level `Reveal stagger` sequences them. These are inert attributes — section unit tests are unaffected.

- [ ] **Step 1: WhyUs — mark header and cards**

In `components/sections/WhyUs.tsx`:

Header block — current:
```tsx
        <div className="flex flex-col gap-3.5">
          <SectionEyebrow label="Dlaczego my" />
```
becomes:
```tsx
        <div data-reveal-item className="flex flex-col gap-3.5">
          <SectionEyebrow label="Dlaczego my" />
```

Card — current:
```tsx
            <div
              key={card}
              className="flex items-start gap-3 rounded-2xl border border-line bg-cream p-6"
            >
```
becomes:
```tsx
            <div
              key={card}
              data-reveal-item
              className="flex items-start gap-3 rounded-2xl border border-line bg-cream p-6"
            >
```

- [ ] **Step 2: Process — mark header and step cards**

In `components/sections/Process.tsx`:

Header block — current:
```tsx
        <div className="flex flex-col gap-3.5">
          <SectionEyebrow label="Jak wygląda współpraca" />
```
becomes:
```tsx
        <div data-reveal-item className="flex flex-col gap-3.5">
          <SectionEyebrow label="Jak wygląda współpraca" />
```

Step card — current:
```tsx
              <div
                key={step}
                className={`flex flex-col gap-3.5 rounded-[18px] p-6 ${
                  last
                    ? "border border-accent bg-ink-soft/40"
                    : "border border-ink-soft bg-ink-soft/20"
                }`}
              >
```
becomes:
```tsx
              <div
                key={step}
                data-reveal-item
                className={`flex flex-col gap-3.5 rounded-[18px] p-6 ${
                  last
                    ? "border border-accent bg-ink-soft/40"
                    : "border border-ink-soft bg-ink-soft/20"
                }`}
              >
```

- [ ] **Step 3: Testimonials — mark header and quote cards**

In `components/sections/Testimonials.tsx`:

Header block — current:
```tsx
      <div className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Opinie" centered />
```
becomes:
```tsx
      <div data-reveal-item className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Opinie" centered />
```

Quote card — current:
```tsx
          <div
            key={t.author}
            className="relative flex flex-col gap-3.5 overflow-hidden rounded-[18px] border border-line bg-white p-7"
          >
```
becomes:
```tsx
          <div
            key={t.author}
            data-reveal-item
            className="relative flex flex-col gap-3.5 overflow-hidden rounded-[18px] border border-line bg-white p-7"
          >
```

- [ ] **Step 4: Verify tests**

Run:
```bash
npx vitest run components/sections/WhyUs.test.tsx components/sections/Testimonials.test.tsx
```
Expected: PASS (attributes are inert; assertions unaffected). Process has no test file — that is fine.

- [ ] **Step 5: Commit**

```bash
git add components/sections/WhyUs.tsx components/sections/Process.tsx components/sections/Testimonials.tsx
git commit -m "feat: stagger card grids in WhyUs, Process, Testimonials"
```

---

## Task 8: Wire `/cennik` reveals + categories stagger

**Files:**
- Modify: `app/cennik/page.tsx`

Block-reveal the intro hero `<section>` and the dark CTA `<section>`; stagger the pricing-categories `<section>` by wrapping each `PricingCategory` in a `data-reveal-item` cell.

- [ ] **Step 1: Add the import**

In `app/cennik/page.tsx`, add below the existing imports:
```tsx
import { Reveal } from "@/components/anim/Reveal";
```

- [ ] **Step 2: Block-reveal the intro hero section**

Wrap the first `<section className="relative overflow-hidden border-y border-line-soft bg-sand">…</section>` in a `Reveal`. Change the opening tag from:
```tsx
        <section className="relative overflow-hidden border-y border-line-soft bg-sand">
```
to:
```tsx
        <Reveal>
        <section className="relative overflow-hidden border-y border-line-soft bg-sand">
```
and its matching closing `</section>` (the one immediately before the pricing-categories `<section className="mx-auto grid …">`) from:
```tsx
        </section>

        <section className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-start gap-[22px] px-6 py-[clamp(40px,6vw,72px)]">
```
to:
```tsx
        </section>
        </Reveal>

        <Reveal stagger>
        <section className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-start gap-[22px] px-6 py-[clamp(40px,6vw,72px)]">
```

- [ ] **Step 3: Mark each category as a stagger item, close the stagger Reveal**

Current categories map + section close:
```tsx
          {pricingCategories.map((category) => (
            <PricingCategory key={category.title} category={category} />
          ))}
        </section>

        <section className="relative overflow-hidden bg-ink">
```
becomes:
```tsx
          {pricingCategories.map((category) => (
            <div key={category.title} data-reveal-item>
              <PricingCategory category={category} />
            </div>
          ))}
        </section>
        </Reveal>

        <Reveal>
        <section className="relative overflow-hidden bg-ink">
```

- [ ] **Step 4: Close the CTA section's Reveal**

The dark CTA `<section className="relative overflow-hidden bg-ink">` is the last section in `<main>`. Its current close:
```tsx
        </section>
      </main>
```
becomes:
```tsx
        </section>
        </Reveal>
      </main>
```

- [ ] **Step 5: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds. (Wrapping each category in a `<div data-reveal-item>` keeps it as the grid cell, so the `auto-fit` layout is unchanged.)

- [ ] **Step 6: Commit**

```bash
git add app/cennik/page.tsx
git commit -m "feat: scroll-reveal cennik sections and stagger price categories"
```

---

## Task 9: Hover-lift and button-press micro-interactions (CSS)

**Files:**
- Modify: `app/globals.css` (utilities)
- Modify: `components/sections/Offer.tsx` (ServiceCard + business highlight card)
- Modify: `components/pricing/PricingCategory.tsx`
- Modify: `components/sections/WhyUs.tsx`, `Process.tsx`, `Testimonials.tsx` (cards)
- Modify: CTA buttons in `Hero.tsx`, `PricingInfo.tsx`, `PricingPreview.tsx`, `app/cennik/page.tsx`

- [ ] **Step 1: Add the utilities (gated on motion preference)**

Append to `app/globals.css`:
```css
/* --- Micro-interactions ---------------------------------------------------- */
@media (prefers-reduced-motion: no-preference) {
  .u-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .u-lift:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 34px rgba(34, 28, 24, 0.12);
  }
  .u-press {
    transition: transform 0.12s ease, box-shadow 0.2s ease;
  }
  .u-press:hover {
    transform: translateY(-2px);
  }
  .u-press:active {
    transform: scale(0.97);
  }
}
```

- [ ] **Step 2: Add `u-lift` to cards**

Add the `u-lift` class to each card container's `className` (append to the existing class string):
- `components/sections/Offer.tsx` — `ServiceCard` root `div` (the one with `... hover:border-accent`) and the dark business-highlight `div` (`... border border-ink bg-ink p-6`).
- `components/pricing/PricingCategory.tsx` — the root `div` (`... rounded-[20px] border border-line bg-white p-[clamp(24px,3vw,32px)]`).
- `components/sections/WhyUs.tsx` — the card `div` already carrying `data-reveal-item`.
- `components/sections/Process.tsx` — the step card `div` already carrying `data-reveal-item`.
- `components/sections/Testimonials.tsx` — the quote card `div` already carrying `data-reveal-item`.

Example (Offer `ServiceCard`) — current:
```tsx
    <div className="flex flex-col gap-2.5 rounded-[18px] border border-line bg-white p-6 transition-colors hover:border-accent">
```
becomes:
```tsx
    <div className="u-lift flex flex-col gap-2.5 rounded-[18px] border border-line bg-white p-6 transition-colors hover:border-accent">
```
Apply the same `u-lift ` prefix to each card listed above.

- [ ] **Step 3: Add `u-press` to primary CTAs**

Append `u-press` to the `className` of the main call-to-action `<a>`/buttons:
- `components/sections/Hero.tsx` — the "Zamów wycenę" and "Zobacz ofertę" links.
- `components/sections/PricingInfo.tsx` — "Zamów bezpłatną wycenę".
- `components/sections/PricingPreview.tsx` — "Zobacz pełny cennik →".
- `app/cennik/page.tsx` — "Napisz do nas" and "Zadzwoń: …" links.

Example (Hero "Zamów wycenę") — current:
```tsx
            className="rounded-full bg-ink px-[30px] py-4 font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
```
becomes:
```tsx
            className="u-press rounded-full bg-ink px-[30px] py-4 font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
```

- [ ] **Step 4: Verify tests + build**

Run:
```bash
npm test && npm run build
```
Expected: all pass (class additions don't affect assertions).

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/sections/Offer.tsx components/pricing/PricingCategory.tsx components/sections/WhyUs.tsx components/sections/Process.tsx components/sections/Testimonials.tsx components/sections/Hero.tsx components/sections/PricingInfo.tsx components/sections/PricingPreview.tsx app/cennik/page.tsx
git commit -m "feat: add hover-lift and button-press micro-interactions"
```

---

## Task 10: Header shrink + shadow on scroll

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Add scroll state**

In `components/layout/Header.tsx`, update the React import and add the effect. Current:
```tsx
import { useState } from "react";
```
becomes:
```tsx
import { useEffect, useState } from "react";
```
Inside `Header`, after `const [menuOpen, setMenuOpen] = useState(false);` add:
```tsx
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
```

- [ ] **Step 2: Apply scrolled styles**

Header root — current:
```tsx
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-3.5">
```
becomes:
```tsx
    <header
      className={`sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "shadow-[0_6px_24px_rgba(80,60,40,0.08)]" : "shadow-none"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 transition-[padding] duration-200 ${
          scrolled ? "py-2" : "py-3.5"
        }`}
      >
```

- [ ] **Step 3: Verify Header tests**

Run:
```bash
npx vitest run components/layout/Header.test.tsx
```
Expected: PASS. (In jsdom there is no scroll, so `scrolled` stays `false`; brand, phone and menu-toggle assertions are unaffected.)

- [ ] **Step 4: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat: shrink header and add shadow on scroll"
```

---

## Task 11: Mobile menu entrance animation (CSS)

**Files:**
- Modify: `app/globals.css` (keyframes + class)
- Modify: `components/layout/Header.tsx` (apply class)

The menu stays conditionally rendered (so its a11y and the existing tests are unchanged); it animates in on open. This directly addresses the spec's concern ("instead of appearing suddenly").

- [ ] **Step 1: Add the keyframes + class**

Append to `app/globals.css`:
```css
/* --- Mobile menu entrance -------------------------------------------------- */
@media (prefers-reduced-motion: no-preference) {
  @keyframes menu-in {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .anim-menu {
    animation: menu-in 0.25s ease both;
  }
}
```

- [ ] **Step 2: Apply the class to the mobile nav**

In `components/layout/Header.tsx`, the mobile menu — current:
```tsx
        <nav
          data-testid="mobile-menu"
          className="flex flex-col gap-1 border-t border-line bg-cream px-6 pb-5 pt-2 md:hidden"
        >
```
becomes:
```tsx
        <nav
          data-testid="mobile-menu"
          className="anim-menu flex flex-col gap-1 border-t border-line bg-cream px-6 pb-5 pt-2 md:hidden"
        >
```

- [ ] **Step 3: Verify Header tests**

Run:
```bash
npx vitest run components/layout/Header.test.tsx
```
Expected: PASS (menu still toggles via `aria-expanded`; class is cosmetic).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/layout/Header.tsx
git commit -m "feat: animate mobile menu entrance"
```

---

## Task 12: Offer tab-switch transition (CSS)

**Files:**
- Modify: `app/globals.css` (keyframes + class)
- Modify: `components/sections/Offer.tsx` (keyed wrapper)

- [ ] **Step 1: Add the keyframes + class**

Append to `app/globals.css`:
```css
/* --- Tab panel switch ------------------------------------------------------ */
@media (prefers-reduced-motion: no-preference) {
  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .anim-tab-panel {
    animation: fade-up 0.35s ease both;
  }
}
```

- [ ] **Step 2: Wrap the panel in a keyed animated container**

In `components/sections/Offer.tsx`, the tab content is `{tab === "private" ? (…) : (…)}`. Wrap it. Current:
```tsx
      {tab === "private" ? (
        <div className="flex flex-col gap-7">
```
becomes:
```tsx
      <div key={tab} className="anim-tab-panel">
      {tab === "private" ? (
        <div className="flex flex-col gap-7">
```
and the matching end of the ternary — current:
```tsx
        </div>
      )}
    </section>
```
becomes:
```tsx
        </div>
      )}
      </div>
    </section>
```
(`key={tab}` remounts the wrapper on switch, replaying the animation.)

- [ ] **Step 3: Verify Offer tests**

Run:
```bash
npx vitest run components/sections/Offer.test.tsx
```
Expected: PASS. Content remains conditionally rendered (one tab at a time), so the "swaps the visible services" / "not in document" assertions still hold; the keyed wrapper only adds a CSS animation.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/sections/Offer.tsx
git commit -m "feat: animate Offer tab switch"
```

---

## Task 13: FAQ smooth accordion (always-mounted) + test update

**Files:**
- Modify: `components/sections/Faq.tsx`
- Modify: `components/sections/Faq.test.tsx`

Smooth open/close needs the answer mounted, so we animate `grid-template-rows: 0fr → 1fr`. The three FAQ tests are updated to assert open/closed state via `aria-expanded` (semantically equivalent to the old text-presence checks).

- [ ] **Step 1: Update the FAQ tests first (red)**

Replace the contents of `components/sections/Faq.test.tsx` with:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "./Faq";
import { faqItems } from "@/data/faq";

test("all questions render and start collapsed", () => {
  render(<Faq />);
  expect(faqItems).toHaveLength(5);
  expect(screen.getByText("Jak wygląda wycena?")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Jak wygląda wycena\?/ }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("clicking a question expands it and toggling collapses it", async () => {
  const user = userEvent.setup();
  render(<Faq />);
  const q1 = screen.getByRole("button", { name: /Jak wygląda wycena\?/ });

  await user.click(q1);
  expect(q1).toHaveAttribute("aria-expanded", "true");

  await user.click(q1);
  expect(q1).toHaveAttribute("aria-expanded", "false");
});

test("opening a second question collapses the first (single-open)", async () => {
  const user = userEvent.setup();
  render(<Faq />);
  const q1 = screen.getByRole("button", { name: /Jak wygląda wycena\?/ });
  const q2 = screen.getByRole("button", {
    name: /Czy można zamówić pojedyncze usługi dodatkowe\?/,
  });

  await user.click(q1);
  await user.click(q2);

  expect(q1).toHaveAttribute("aria-expanded", "false");
  expect(q2).toHaveAttribute("aria-expanded", "true");
});
```

- [ ] **Step 2: Run the tests to verify the new single-open test still passes but reflects state**

Run:
```bash
npx vitest run components/sections/Faq.test.tsx
```
Expected: PASS against the CURRENT `Faq.tsx` too (the buttons already carry `aria-expanded`). This confirms the test rewrite is green before refactoring the markup. Proceed.

- [ ] **Step 3: Refactor the FAQ panel to animate height**

In `components/sections/Faq.tsx`, replace the conditional answer. Current:
```tsx
              {open && (
                <p className="m-0 px-6 pb-[22px] font-body text-[15px] leading-[1.7] text-muted">
                  {item.answer}
                </p>
              )}
```
becomes:
```tsx
              <div
                data-open={open ? "true" : "false"}
                aria-hidden={!open}
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="m-0 px-6 pb-[22px] font-body text-[15px] leading-[1.7] text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
```

- [ ] **Step 4: Run the FAQ tests again**

Run:
```bash
npx vitest run components/sections/Faq.test.tsx
```
Expected: PASS (3 tests). `aria-expanded` toggling and single-open behaviour are intact.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Faq.tsx components/sections/Faq.test.tsx
git commit -m "feat: smooth FAQ accordion via grid-template-rows"
```

---

## Task 14: Full verification + manual browser checklist

**Files:** none (verification only)

- [ ] **Step 1: Lint**

Run:
```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 2: Full test suite**

Run:
```bash
npm test
```
Expected: all tests pass.

- [ ] **Step 3: Production build**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 4: Manual verification in a REAL browser (not headless)**

> Animation/scroll behaviour cannot be verified from headless tooling — it must be seen in a real browser. Hand this checklist to the user.

Run `npm run dev`, open the local URL, and confirm:
- [ ] No flash of content on load (Hero starts hidden, then animates in sequentially).
- [ ] Scrolling down: each section fades + slides up as it enters; WhyUs / Process / Testimonials cards appear in a slight stagger.
- [ ] Hovering cards lifts them; clicking primary buttons gives a subtle press.
- [ ] Header shrinks slightly and gains a soft shadow after scrolling.
- [ ] Opening the mobile menu animates it in; Offer tabs fade-swap; FAQ rows expand/collapse smoothly.
- [ ] `/cennik`: intro + categories + CTA reveal; categories stagger.
- [ ] In OS "Reduce motion" mode: everything is immediately visible with no animation.

- [ ] **Step 5: Final commit (if any verification tweaks were needed)**

```bash
git add -A
git commit -m "chore: finalize site animations"
```
