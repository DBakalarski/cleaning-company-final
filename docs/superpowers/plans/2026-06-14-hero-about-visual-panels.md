# Hero & About Visual Panels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fake "zdjęcie: …" photo placeholders in the Hero and About sections with on-brand panels (logo + wordmark + trust chips in Hero; ✦ + brand quote in About).

**Architecture:** Pure presentation changes in two existing React Server Components. Both keep their striped-texture panel, decorative bubble SVGs, and aspect ratios; only the inner content of the panel changes. No data, routing, or dependency changes. The real logo is rendered with `next/image` exactly as in `Header.tsx`.

**Tech Stack:** Next.js 15 (RSC), Tailwind CSS v4 (tokens in `app/globals.css`), Vitest + React Testing Library.

---

### Task 1: Hero panel — logo + wordmark + trust chips

**Files:**
- Modify: `components/sections/Hero.tsx` (right-hand `<div className="relative">` block, lines ~73-116; add `next/image` import)
- Test: `components/sections/Hero.test.tsx`

- [ ] **Step 1: Add the failing assertions to the Hero test**

Append a new test to `components/sections/Hero.test.tsx`:

```tsx
test("hero renders the brand panel: logo, wordmark and trust chips, no photo placeholder", () => {
  render(<Hero />);
  expect(screen.getByAltText("Cleaning Service Konin")).toBeInTheDocument();
  expect(screen.getByText("do 100 km")).toBeInTheDocument();
  expect(screen.getByText("wycena indywidualna")).toBeInTheDocument();
  expect(screen.getByText("klienci prywatni i firmy")).toBeInTheDocument();
  expect(screen.queryByText(/zdjęcie:/)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/sections/Hero.test.tsx`
Expected: FAIL — the new test errors on `getByAltText("Cleaning Service Konin")` (no image yet) / finds the `zdjęcie:` placeholder.

- [ ] **Step 3: Add the `next/image` import to Hero.tsx**

At the top of `components/sections/Hero.tsx`, add the import below the existing imports:

```tsx
import Image from "next/image";
import { site } from "@/data/site";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
```

- [ ] **Step 4: Add the trust-chip data near the existing `badges` const**

Below the existing `badges` array (around line 8), add:

```tsx
const trustChips = [
  { label: "do 100 km", spark: true },
  { label: "wycena indywidualna", spark: true },
  { label: "klienci prywatni i firmy", spark: false },
];
```

- [ ] **Step 5: Replace the right-hand panel block**

Replace the entire `<div className="relative">…</div>` block (currently lines ~73-116, the two decorative SVGs + striped placeholder + two floating badges) with this. The two decorative `<svg>` bubble clusters are kept verbatim; the placeholder box content and the bottom dark badge are removed:

```tsx
      <div className="relative">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          aria-hidden="true"
          className="absolute -left-[26px] -top-9 z-[1]"
        >
          <circle cx="60" cy="34" r="20" stroke="#BE9678" strokeWidth="1.5" opacity="0.75" />
          <path d="M50 28a10 10 0 0 1 9-3" stroke="#BE9678" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <circle cx="28" cy="58" r="11" stroke="#C9A98F" strokeWidth="1.5" opacity="0.65" />
          <circle cx="47" cy="74" r="5" stroke="#BE9678" strokeWidth="1.5" opacity="0.5" />
        </svg>
        <svg
          width="44"
          height="44"
          viewBox="0 0 46 46"
          fill="none"
          aria-hidden="true"
          className="absolute -right-[22px] top-[42%]"
        >
          <circle cx="23" cy="14" r="7" stroke="#BE9678" strokeWidth="1.5" opacity="0.85" />
          <circle cx="34" cy="28" r="4" stroke="#C9A98F" strokeWidth="1.4" opacity="0.7" />
          <circle cx="18" cy="34" r="2.5" stroke="#BE9678" strokeWidth="1.4" opacity="0.6" />
        </svg>
        <div className="flex aspect-[4/4.6] flex-col items-center justify-center gap-[clamp(16px,2.5vw,22px)] rounded-3xl border border-line-soft bg-[repeating-linear-gradient(45deg,#F4ECE3_0_14px,#F9F3EC_14px_28px)] p-[clamp(28px,4vw,40px)] text-center">
          <Image
            src="/logo-icon.png"
            alt="Cleaning Service Konin"
            width={150}
            height={150}
            className="mix-blend-multiply"
          />
          <span className="font-heading text-[clamp(20px,2.4vw,24px)] font-semibold leading-[1.15] tracking-[-0.4px] text-ink">
            Cleaning Service Konin
          </span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {trustChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 font-body text-[13px] font-semibold text-quiet"
              >
                {chip.spark && <span className="text-accent">✦</span>}
                {chip.label}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute -right-1.5 -top-[18px] flex items-center gap-2.5 rounded-2xl border border-line bg-white px-[18px] py-3.5 shadow-[0_12px_32px_rgba(80,60,40,0.10)]">
          <span className="font-heading text-xl font-semibold text-accent">✦</span>
          <span className="font-heading text-[13.5px] font-semibold">
            Estetyczny efekt
          </span>
        </div>
      </div>
```

- [ ] **Step 6: Run the Hero test to verify it passes**

Run: `npx vitest run components/sections/Hero.test.tsx`
Expected: PASS (both the original and the new test).

- [ ] **Step 7: Commit**

```bash
git add components/sections/Hero.tsx components/sections/Hero.test.tsx
git commit -m "feat: replace Hero photo placeholder with logo + trust-chip panel"
```

---

### Task 2: About panel — ✦ + brand quote

**Files:**
- Modify: `components/sections/About.tsx` (left-hand panel block, lines ~17-37)
- Test: `components/sections/About.test.tsx` (create)

- [ ] **Step 1: Write the failing test (new file)**

Create `components/sections/About.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { site } from "@/data/site";

test("about renders heading, brand quote panel and area chip, no photo placeholder", () => {
  render(<About />);
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Sprzątanie, za którym stoi jakość, estetyka i odpowiedzialność",
  );
  expect(
    screen.getByText("„Realny efekt, nie powierzchowne sprzątanie."),
  ).toBeInTheDocument();
  expect(screen.getByText(site.area)).toBeInTheDocument();
  expect(screen.queryByText(/zdjęcie:/)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/sections/About.test.tsx`
Expected: FAIL — the quote is not rendered yet and the `zdjęcie:` placeholder is still present.

- [ ] **Step 3: Replace the panel block**

In `components/sections/About.tsx`, replace the panel `<div className="relative flex aspect-[4/3.4] …">…</div>` block (currently lines ~17-37). Keep the decorative `<svg>` and the area chip; replace the placeholder `<span>` with the ✦ and the quote:

```tsx
      <div className="relative flex aspect-[4/3.4] flex-col items-center justify-center gap-[clamp(14px,2.5vw,20px)] rounded-3xl border border-line-soft bg-[repeating-linear-gradient(45deg,#F4ECE3_0_14px,#F9F3EC_14px_28px)] p-[clamp(28px,4vw,44px)] text-center">
        <svg
          width="84"
          height="84"
          viewBox="0 0 84 84"
          fill="none"
          aria-hidden="true"
          className="absolute -right-[18px] -top-[30px] z-[1]"
        >
          <circle cx="30" cy="32" r="17" stroke="#BE9678" strokeWidth="1.5" opacity="0.7" />
          <path d="M22 27a8.5 8.5 0 0 1 7.5-3" stroke="#BE9678" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
          <circle cx="56" cy="52" r="9" stroke="#C9A98F" strokeWidth="1.5" opacity="0.6" />
          <circle cx="42" cy="66" r="4" stroke="#BE9678" strokeWidth="1.4" opacity="0.5" />
        </svg>
        <span className="font-heading text-[clamp(34px,4vw,44px)] font-semibold leading-none text-accent">
          ✦
        </span>
        <p className="m-0 max-w-[320px] font-heading text-[clamp(19px,2.2vw,23px)] font-semibold leading-[1.35] tracking-[-0.4px] text-ink text-balance">
          „Realny efekt, nie powierzchowne sprzątanie."
        </p>
        <div className="absolute -bottom-4 left-5 rounded-full border border-line bg-cream px-[18px] py-2.5 font-heading text-[13px] font-semibold text-quiet shadow-[0_12px_32px_rgba(80,60,40,0.10)]">
          {site.area}
        </div>
      </div>
```

- [ ] **Step 4: Run the About test to verify it passes**

Run: `npx vitest run components/sections/About.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/About.tsx components/sections/About.test.tsx
git commit -m "feat: replace About photo placeholder with brand-quote panel"
```

---

### Task 3: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS — all test files green, including the updated Hero and new About tests.

- [ ] **Step 2: Production build sanity check**

Run: `npm run build`
Expected: build completes with no type or lint errors.

- [ ] **Step 3: Confirm no leftover placeholders**

Run: `grep -rn "zdjęcie:" components/`
Expected: no matches.
