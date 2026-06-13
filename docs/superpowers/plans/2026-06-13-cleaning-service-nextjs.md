# Cleaning Service Konin → Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the existing static visual-builder landing page (`Cleaning Service Konin.dc.html` + `Cennik.dc.html` + `support.js` runtime) as a modern, performant Next.js application with identical content and visual design.

**Architecture:** Next.js 15 App Router (React 19, TypeScript). Two routes: `/` (landing) and `/cennik` (pricing). Static content lives in typed data modules under `data/`; presentation lives in focused React components under `components/`. Interactive pieces (mobile menu, offer tabs, FAQ accordion, contact form) are client components using `useState`; everything else is a server component for performance. Styling via Tailwind CSS v4 with design tokens (colors + fonts) defined in `app/globals.css`. Fonts via `next/font/google` (Poppins + Lato, `latin-ext` subset for Polish). The contact form keeps the original mock behaviour (shows a success message, sends nothing).

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, Vitest + React Testing Library (jsdom).

---

## Decisions locked for this plan

- **Styling:** Tailwind CSS v4 (CSS-based `@theme` tokens, no `tailwind.config.js`).
- **Contact form:** mock only — `useState` flips to a "thank you" panel; no backend, no network call.
- **Hero:** the single "klasyczny" (split) variant. Variants B/C are dropped.
- **Worksheet pages** (`Tlo - propozycje*.dc.html`): not migrated.

## Source files (reference only — do not ship)

- `Cleaning Service Konin.dc.html` — landing page source of truth for copy/layout.
- `Cennik.dc.html` — pricing page source of truth.
- `support.js` — old builder runtime; its only real client logic is: mobile menu toggle, offer tab (`private`/`business`), single-open FAQ accordion (`faqOpen` 0–5), and form `sent` flag. All reproduced below.
- `assets/logo-icon.png` (1254×1254) and `assets/logo-full.png` (1774×887) — keep the icon; full logo unused in the shipped pages.

These get moved to `legacy/` in Task 1 so the repo root is clean but the reference survives.

## Design tokens (used by every task — names must match exactly)

Tailwind utility ← token (defined in Task 1):

| Utility            | Hex       | Original role                    |
|--------------------|-----------|----------------------------------|
| `cream`            | `#FBF8F5` | page background                  |
| `sand`             | `#F2E9E1` | alt section background           |
| `accent`           | `#BE9678` | links, highlights, icons         |
| `accent-soft`      | `#C9A98F` | secondary decorative stroke      |
| `ink`             | `#221C18` | dark sections, primary buttons   |
| `ink-deep`         | `#1A1511` | footer background                |
| `ink-soft`         | `#3D352E` | borders on dark                  |
| `quiet`            | `#4D443C` | card body text                   |
| `muted`            | `#6E6258` | secondary text                   |
| `faint`            | `#A08B7B` | tertiary / muted text            |
| `line`             | `#EBE1D6` | card borders                     |
| `line-mid`         | `#DCCFC2` | inputs / subtle dividers         |
| `line-soft`        | `#E5D9CC` | section dividers                 |
| `line-hover`       | `#C9BCAE` | hover borders / dark body text   |

Fonts: `font-heading` → Poppins (headings, buttons, labels), `font-body` → Lato (body). Body default is Lato.

## File structure (built across the tasks below)

```
package.json                  Task 1
tsconfig.json                 Task 1
next.config.ts                Task 1
postcss.config.mjs            Task 1
app/globals.css               Task 1   tailwind import + @theme tokens
app/layout.tsx                Task 1   fonts, <html lang="pl">, base metadata
public/logo-icon.png          Task 1   copied from assets/
vitest.config.ts              Task 2
vitest.setup.ts               Task 2
data/site.ts                  Task 3   name, phone, contact links
data/navigation.ts            Task 3   header nav links
components/layout/Header.tsx           Task 4   "use client" — sticky nav + mobile menu
components/layout/Footer.tsx           Task 5
components/layout/MobileCallButton.tsx Task 5
components/sections/Hero.tsx           Task 6
components/sections/About.tsx          Task 7
components/sections/WhyUs.tsx          Task 7   + data/whyUs.ts
components/sections/Offer.tsx          Task 8   "use client" — tabs + data/offer.ts
components/sections/Process.tsx        Task 9   + data/process.ts
components/sections/PricingInfo.tsx    Task 9   + data/pricingInfo.ts
components/sections/PricingPreview.tsx Task 10  + data/pricingPreview.ts
components/sections/ServiceArea.tsx    Task 10
components/sections/Testimonials.tsx   Task 11  + data/testimonials.ts
components/sections/Faq.tsx            Task 12  "use client" — accordion + data/faq.ts
components/sections/Contact.tsx        Task 13  "use client" — mock form + data/contactServices.ts
components/ui/SectionEyebrow.tsx       Task 6   shared "— LABEL" kicker
app/page.tsx                  Task 14  composes the landing sections
components/pricing/PricingCategory.tsx Task 15
app/cennik/page.tsx           Task 15  + data/pricing.ts
app/icon.png                  Task 16  favicon (copy of logo-icon)
```

---

## Task 1: Scaffold Next.js + Tailwind + tokens + fonts

**Files:**
- Move: `Cleaning Service Konin.dc.html`, `Cennik.dc.html`, `Tlo - propozycje.dc.html`, `Tlo - propozycje motywu.dc.html`, `support.js`, `.thumbnail` → `legacy/`
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `app/globals.css`, `app/layout.tsx`
- Copy: `assets/logo-icon.png` → `public/logo-icon.png`

- [ ] **Step 1: Initialise git and move legacy files**

```bash
cd "/Users/dawidbakalarski/Documents/projekty/Clean-project"
git init
mkdir -p legacy public
git mv 2>/dev/null "Cleaning Service Konin.dc.html" legacy/ || mv "Cleaning Service Konin.dc.html" legacy/
mv "Cennik.dc.html" "Tlo - propozycje.dc.html" "Tlo - propozycje motymu.dc.html" support.js .thumbnail legacy/ 2>/dev/null || true
mv "Tlo - propozycje motywu.dc.html" legacy/ 2>/dev/null || true
cp assets/logo-icon.png public/logo-icon.png
```

Note: the `mv` line tolerates already-moved files. After it, the repo root should contain only `assets/`, `legacy/`, `public/`, `screenshots/`, `uploads/`, `docs/`.

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "cleaning-service-konin",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.0.0",
    "@testing-library/jest-dom": "6.6.3",
    "@testing-library/react": "16.1.0",
    "@testing-library/user-event": "14.5.2",
    "@types/node": "22.10.0",
    "@types/react": "19.0.0",
    "@types/react-dom": "19.0.0",
    "@vitejs/plugin-react": "4.3.4",
    "jsdom": "25.0.1",
    "tailwindcss": "4.0.0",
    "typescript": "5.7.2",
    "vitest": "2.1.8"
  }
}
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "legacy"]
}
```

- [ ] **Step 4: Create `next.config.ts`, `postcss.config.mjs`, `.gitignore`**

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

`postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

`.gitignore`:

```
/node_modules
/.next
/out
next-env.d.ts
*.tsbuildinfo
.DS_Store
```

- [ ] **Step 5: Create `app/globals.css` with Tailwind import + design tokens**

```css
@import "tailwindcss";

@theme {
  --color-cream: #fbf8f5;
  --color-sand: #f2e9e1;
  --color-accent: #be9678;
  --color-accent-soft: #c9a98f;
  --color-ink: #221c18;
  --color-ink-deep: #1a1511;
  --color-ink-soft: #3d352e;
  --color-quiet: #4d443c;
  --color-muted: #6e6258;
  --color-faint: #a08b7b;
  --color-line: #ebe1d6;
  --color-line-mid: #dccfc2;
  --color-line-soft: #e5d9cc;
  --color-line-hover: #c9bcae;

  --font-heading: var(--font-poppins);
  --font-body: var(--font-lato);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-cream);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 6: Create `app/layout.tsx` with fonts and metadata**

```tsx
import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cleaning Service Konin — profesjonalne usługi sprzątające",
  description:
    "Profesjonalne usługi sprzątające dla klientów prywatnych i firmowych. Konin i okolice — do 100 km. Sprawnie, dokładnie, dyskretnie, przystępnie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${poppins.variable} ${lato.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Install dependencies**

Run: `npm install`
Expected: completes without errors; `node_modules/` and `package-lock.json` created.

- [ ] **Step 8: Create a temporary `app/page.tsx` to verify the build**

```tsx
export default function Home() {
  return (
    <main className="bg-sand text-ink font-heading p-10">
      <h1 className="text-accent text-4xl">Scaffold OK</h1>
    </main>
  );
}
```

- [ ] **Step 9: Verify the dev build compiles**

Run: `npm run build`
Expected: build succeeds, output lists route `/`. If Tailwind utilities like `bg-sand`/`text-accent` fail, the `@theme` tokens in Step 5 are wrong — fix before continuing.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 + Tailwind v4 + fonts and move legacy files"
```

---

## Task 2: Vitest + React Testing Library setup

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Test: `app/page.smoke.test.tsx`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 2: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Write a smoke test for the scaffold page**

Create `app/page.smoke.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Home from "./page";

test("scaffold page renders heading", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: "Scaffold OK" })).toBeInTheDocument();
});
```

- [ ] **Step 4: Run the test to verify the harness works**

Run: `npm test`
Expected: PASS — 1 test passed. (This confirms jsdom + RTL + the `@/` alias all work.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: add Vitest + React Testing Library setup"
```

---

## Task 3: Site + navigation data

**Files:**
- Create: `data/site.ts`, `data/navigation.ts`
- Test: `data/data.test.ts`

- [ ] **Step 1: Write the failing test**

Create `data/data.test.ts`:

```ts
import { site } from "./site";
import { navLinks } from "./navigation";

test("site exposes phone and contact links", () => {
  expect(site.phone).toBe("518 169 491");
  expect(site.phoneHref).toBe("tel:+48518169491");
  expect(site.whatsapp).toBe("https://wa.me/48518169491");
  expect(site.messenger).toBe("https://m.me/cleaningservicekonin");
});

test("navigation has the seven header links in order", () => {
  expect(navLinks.map((l) => l.label)).toEqual([
    "O nas",
    "Oferta",
    "Cennik",
    "Współpraca",
    "Opinie",
    "FAQ",
    "Kontakt",
  ]);
  expect(navLinks.find((l) => l.label === "Cennik")?.href).toBe("/cennik");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run data/data.test.ts`
Expected: FAIL — cannot find module `./site`.

- [ ] **Step 3: Create `data/site.ts`**

```ts
export const site = {
  name: "Cleaning Service Konin",
  tagline: "Sprawnie • Dokładnie • Dyskretnie",
  taglineFull: "Sprawnie • Dokładnie • Dyskretnie • Przystępnie",
  phone: "518 169 491",
  phoneHref: "tel:+48518169491",
  whatsapp: "https://wa.me/48518169491",
  messenger: "https://m.me/cleaningservicekonin",
  area: "Konin i okolice — do 100 km",
} as const;
```

- [ ] **Step 4: Create `data/navigation.ts`**

```ts
export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "O nas", href: "/#o-nas" },
  { label: "Oferta", href: "/#oferta" },
  { label: "Cennik", href: "/cennik" },
  { label: "Współpraca", href: "/#wspolpraca" },
  { label: "Opinie", href: "/#opinie" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run data/data.test.ts`
Expected: PASS — 2 tests passed.

- [ ] **Step 6: Commit**

```bash
git add data/site.ts data/navigation.ts data/data.test.ts
git commit -m "feat: add site and navigation data modules"
```

---

## Task 4: Header (client component with mobile menu)

The original header: sticky, translucent, blurred. Logo + tagline on the left; desktop nav on the right; on mobile a hamburger toggles a dropdown menu (`menuOpen` state), each link closes it. Phone CTA button.

**Files:**
- Create: `components/layout/Header.tsx`
- Test: `components/layout/Header.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/layout/Header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

test("renders the brand name and phone CTA", () => {
  render(<Header />);
  expect(screen.getAllByText("Cleaning Service Konin").length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /518 169 491/ }).length).toBeGreaterThan(0);
});

test("mobile menu toggles open and closed via the hamburger button", async () => {
  const user = userEvent.setup();
  render(<Header />);
  const toggle = screen.getByRole("button", { name: "Menu" });

  expect(toggle).toHaveAttribute("aria-expanded", "false");
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("clicking a link in the open mobile menu closes it", async () => {
  const user = userEvent.setup();
  render(<Header />);
  const toggle = screen.getByRole("button", { name: "Menu" });
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");

  // The mobile menu container is labelled for the test.
  const mobileMenu = screen.getByTestId("mobile-menu");
  await user.click(within(mobileMenu).getByText("O nas"));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});
```

Add this import at the top of the test file:

```tsx
import { within } from "@testing-library/react";
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/layout/Header.test.tsx`
Expected: FAIL — cannot find module `./Header`.

- [ ] **Step 3: Create `components/layout/Header.tsx`**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { navLinks } from "@/data/navigation";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-3.5">
        <Link href="/#start" className="flex items-center gap-3 text-ink no-underline">
          <Image
            src="/logo-icon.png"
            alt="Cleaning Service Konin"
            width={46}
            height={46}
            className="mix-blend-multiply"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[17px] font-bold tracking-[-0.2px]">
              Cleaning Service Konin
            </span>
            <span className="font-body text-[10.5px] uppercase tracking-[1.6px] text-faint">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-heading text-sm font-semibold text-quiet no-underline transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="whitespace-nowrap rounded-full bg-ink px-[22px] py-[11px] font-heading text-sm font-semibold text-white no-underline transition-colors hover:bg-accent"
          >
            {site.phone}
          </a>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-[5px] rounded-[10px] border border-line-mid px-[13px] py-3 md:hidden"
        >
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
        </button>
      </div>

      {menuOpen && (
        <nav
          data-testid="mobile-menu"
          className="flex flex-col gap-1 border-t border-line bg-cream px-6 pb-5 pt-2 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#f1e9e0] py-3 font-heading text-base font-semibold text-ink no-underline"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-ink px-[22px] py-3.5 text-center font-heading text-[15px] font-semibold text-white no-underline"
          >
            Zadzwoń: {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/layout/Header.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Header.tsx components/layout/Header.test.tsx
git commit -m "feat: add sticky header with mobile menu"
```

---

## Task 5: Footer + mobile floating call button

The footer (`#1A1511`) holds the logo badge, brand name + full tagline, phone link, area, copyright. The floating call button is fixed bottom-right and only shows on mobile (`md:hidden`).

**Files:**
- Create: `components/layout/Footer.tsx`, `components/layout/MobileCallButton.tsx`
- Test: `components/layout/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/layout/Footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

test("footer shows brand, phone and copyright", () => {
  render(<Footer />);
  expect(screen.getByText("Cleaning Service Konin")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "518 169 491" })).toHaveAttribute(
    "href",
    "tel:+48518169491",
  );
  expect(screen.getByText("© 2026 Cleaning Service Konin")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: FAIL — cannot find module `./Footer`.

- [ ] **Step 3: Create `components/layout/Footer.tsx`**

```tsx
import Image from "next/image";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-soft bg-ink-deep">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-[18px] px-6 py-9">
        <div className="flex items-center gap-3">
          <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] bg-cream">
            <Image
              src="/logo-icon.png"
              alt=""
              width={30}
              height={30}
              className="object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[15px] font-semibold text-white">
              {site.name}
            </span>
            <span className="font-body text-[11.5px] uppercase tracking-[1.2px] text-faint">
              {site.taglineFull}
            </span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
          <a
            href={site.phoneHref}
            className="font-heading text-sm font-semibold text-[#e8dfd6] no-underline transition-colors hover:text-accent"
          >
            {site.phone}
          </a>
          <span className="font-body text-[13px] text-muted">{site.area}</span>
          <span className="font-body text-[13px] text-muted">
            © 2026 Cleaning Service Konin
          </span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create `components/layout/MobileCallButton.tsx`**

```tsx
import { site } from "@/data/site";

export function MobileCallButton() {
  return (
    <a
      href={site.phoneHref}
      aria-label="Zadzwoń"
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full bg-ink px-6 py-4 font-heading text-[15px] font-semibold text-white no-underline shadow-[0_14px_34px_rgba(20,12,6,0.35)] md:hidden"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
          fill="#BE9678"
        />
      </svg>
      Zadzwoń
    </a>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 6: Commit**

```bash
git add components/layout/Footer.tsx components/layout/MobileCallButton.tsx components/layout/Footer.test.tsx
git commit -m "feat: add footer and mobile floating call button"
```

---

## Task 6: Shared eyebrow + Hero (klasyczny)

Many sections start with a small kicker: a 28px accent line + uppercase label (centered variants add a line on the right too). Extract it as `SectionEyebrow`. Then build the split hero.

**Files:**
- Create: `components/ui/SectionEyebrow.tsx`, `components/sections/Hero.tsx`
- Test: `components/sections/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/Hero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

test("hero renders the headline, subcopy and primary CTAs", () => {
  render(<Hero />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Sprawnie. Dokładnie. Dyskretnie. Przystępnie.",
  );
  expect(
    screen.getByText(/Profesjonalne usługi sprzątające dla klientów prywatnych/),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Zamów wycenę" })).toHaveAttribute(
    "href",
    "#kontakt",
  );
  expect(screen.getByRole("link", { name: "Zobacz ofertę" })).toHaveAttribute(
    "href",
    "#oferta",
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/Hero.test.tsx`
Expected: FAIL — cannot find module `./Hero`.

- [ ] **Step 3: Create `components/ui/SectionEyebrow.tsx`**

```tsx
export function SectionEyebrow({
  label,
  centered = false,
}: {
  label: string;
  centered?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-7 bg-accent" />
      <span className="font-heading text-xs font-semibold uppercase tracking-[2.5px] text-accent">
        {label}
      </span>
      {centered && <span className="h-px w-7 bg-accent" />}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/sections/Hero.tsx`**

```tsx
import { site } from "@/data/site";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const badges = [
  "Klienci prywatni i firmy",
  "Indywidualna wycena",
  "Do 100 km od Konina",
];

export function Hero() {
  return (
    <section
      data-screen-label="Hero"
      className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(32px,5vw,64px)] px-6 pb-[clamp(40px,6vw,80px)] pt-[clamp(48px,8vw,96px)]"
    >
      <div className="flex flex-col gap-6">
        <SectionEyebrow label="Usługi sprzątające • Konin i okolice" />
        <h1 className="m-0 font-heading text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.12] tracking-[-1px] text-balance">
          Sprawnie. Dokładnie.
          <br />
          Dyskretnie.{" "}
          <em className="relative inline-block not-italic text-accent">
            Przystępnie.
            <svg
              viewBox="0 0 140 12"
              preserveAspectRatio="none"
              className="absolute -bottom-3 left-[1%] h-3 w-[97%]"
              aria-hidden="true"
            >
              <path
                d="M3 9 C 28 3, 62 2.5, 78 5.5 S 122 9.5, 137 4"
                fill="none"
                stroke="#BE9678"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </em>
        </h1>
        <p className="m-0 max-w-[520px] font-body text-[clamp(16px,1.5vw,18px)] leading-[1.7] text-muted text-pretty">
          Profesjonalne usługi sprzątające dla klientów prywatnych i firmowych.
          Konkretna obsługa, indywidualne podejście i zakres prac dopasowany do
          rodzaju obiektu oraz oczekiwanego efektu.
        </p>
        <div className="mt-1.5 flex flex-wrap gap-3">
          <a
            href="#kontakt"
            className="rounded-full bg-ink px-[30px] py-4 font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
          >
            Zamów wycenę
          </a>
          <a
            href="#oferta"
            className="rounded-full border border-line-hover bg-transparent px-[30px] py-[15px] font-heading text-[15px] font-semibold text-ink no-underline transition-colors hover:border-ink hover:bg-white"
          >
            Zobacz ofertę
          </a>
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 px-2.5 py-[15px] font-heading text-[15px] font-semibold text-accent no-underline transition-colors hover:text-ink"
          >
            Zadzwoń → {site.phone}
          </a>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-[22px] gap-y-2.5">
          {badges.map((badge) => (
            <span key={badge} className="font-body text-[13.5px] text-faint">
              ✦ {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex aspect-[4/4.6] items-center justify-center rounded-3xl border border-line-soft bg-[repeating-linear-gradient(45deg,#F4ECE3_0_14px,#F9F3EC_14px_28px)]">
          <span className="rounded-lg border border-dashed border-line-hover bg-cream px-3.5 py-2 font-mono text-xs text-faint">
            zdjęcie: efekt sprzątania
          </span>
        </div>
        <div className="absolute -right-1.5 -top-[18px] flex items-center gap-2.5 rounded-2xl border border-line bg-white px-[18px] py-3.5 shadow-[0_12px_32px_rgba(80,60,40,0.10)]">
          <span className="font-heading text-xl font-semibold text-accent">✦</span>
          <span className="font-heading text-[13.5px] font-semibold">
            Estetyczny efekt końcowy
          </span>
        </div>
        <div className="absolute -bottom-[18px] -left-1.5 flex items-center gap-2.5 rounded-2xl bg-ink px-[18px] py-3.5">
          <span className="font-heading text-xl font-semibold text-accent">✦</span>
          <span className="font-heading text-[13.5px] font-semibold text-white">
            Bez potrzeby poprawiania
          </span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/sections/Hero.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 6: Commit**

```bash
git add components/ui/SectionEyebrow.tsx components/sections/Hero.tsx components/sections/Hero.test.tsx
git commit -m "feat: add section eyebrow and split hero"
```

---

## Task 7: About + WhyUs

About (`#o-nas`): image placeholder + heading + 3 paragraphs + area badge. WhyUs (`#dlaczego`, `#F2E9E1`): heading + 8 feature cards.

**Files:**
- Create: `data/whyUs.ts`, `components/sections/About.tsx`, `components/sections/WhyUs.tsx`
- Test: `components/sections/WhyUs.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/WhyUs.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { WhyUs } from "./WhyUs";
import { whyUsCards } from "@/data/whyUs";

test("renders all eight reasons", () => {
  render(<WhyUs />);
  expect(whyUsCards).toHaveLength(8);
  for (const card of whyUsCards) {
    expect(screen.getByText(card)).toBeInTheDocument();
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/WhyUs.test.tsx`
Expected: FAIL — cannot find module `./WhyUs`.

- [ ] **Step 3: Create `data/whyUs.ts`**

```ts
export const whyUsCards: string[] = [
  "Indywidualne podejście do każdego zlecenia",
  "Dokładność i dbałość o detale",
  "Estetyczny efekt końcowy",
  "Kultura pracy i dyskrecja",
  "Przejrzysta, indywidualna wycena",
  "Oferta dla klientów prywatnych i firm",
  "Współpraca jednorazowa i stała",
  "Szeroki zakres usług — również specjalistycznych i sezonowych",
];
```

- [ ] **Step 4: Create `components/sections/WhyUs.tsx`**

```tsx
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { whyUsCards } from "@/data/whyUs";

export function WhyUs() {
  return (
    <section data-screen-label="Dlaczego my" className="bg-sand">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(48px,7vw,90px)]">
        <div className="flex flex-col gap-3.5">
          <SectionEyebrow label="Dlaczego my" />
          <h2 className="m-0 max-w-[640px] font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
            Liczy się efekt — i komfort współpracy
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
          {whyUsCards.map((card) => (
            <div
              key={card}
              className="flex items-start gap-3 rounded-2xl border border-line bg-cream p-6"
            >
              <span className="mt-0.5 font-heading text-lg font-semibold text-accent">
                ✦
              </span>
              <span className="font-heading text-[15.5px] font-semibold leading-[1.4] text-ink">
                {card}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `components/sections/About.tsx`**

```tsx
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { site } from "@/data/site";

const paragraphs = [
  "Cleaning Service Konin to marka stworzona dla klientów, którzy oczekują realnego efektu, a nie tylko powierzchownego sprzątania. Stawiamy na rzetelność, dokładność, uczciwe podejście i usługę dopasowaną do konkretnych potrzeb.",
  "Działamy konkretnie, sprawnie i z wyczuciem. Zależy nam nie tylko na samym porządku, ale też na komforcie współpracy — żeby klient od początku wiedział, czego może się spodziewać.",
  "Obsługujemy mieszkania, domy, biura, lokale użytkowe, domki letniskowe, apartamenty na wynajem, obiekty noclegowe, hotele, kampery, a także nagrobki i inne przestrzenie wymagające profesjonalnego podejścia do czystości i estetyki.",
];

export function About() {
  return (
    <section
      id="o-nas"
      data-screen-label="O nas"
      className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(32px,5vw,64px)] px-6 py-[clamp(48px,8vw,96px)]"
    >
      <div className="relative flex aspect-[4/3.4] items-center justify-center rounded-3xl border border-line-soft bg-[repeating-linear-gradient(45deg,#F4ECE3_0_14px,#F9F3EC_14px_28px)]">
        <span className="rounded-lg border border-dashed border-line-hover bg-cream px-3.5 py-2 font-mono text-xs text-faint">
          zdjęcie: zespół / wnętrze
        </span>
        <div className="absolute -bottom-4 left-5 rounded-full border border-line bg-cream px-[18px] py-2.5 font-heading text-[13px] font-semibold text-quiet shadow-[0_12px_32px_rgba(80,60,40,0.10)]">
          {site.area}
        </div>
      </div>
      <div className="flex flex-col gap-[18px]">
        <SectionEyebrow label="O nas" />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Sprzątanie, za którym stoi jakość, estetyka i odpowiedzialność
        </h2>
        {paragraphs.map((p) => (
          <p
            key={p.slice(0, 24)}
            className="m-0 font-body text-base leading-[1.75] text-muted text-pretty"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run components/sections/WhyUs.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 7: Commit**

```bash
git add data/whyUs.ts components/sections/About.tsx components/sections/WhyUs.tsx components/sections/WhyUs.test.tsx
git commit -m "feat: add about and why-us sections"
```

---

## Task 8: Offer (client tabs: private / business)

Tab switcher: "Klienci prywatni" / "Firmy i obiekty komercyjne". Private = 12 service cards + a 12-tag add-on box. Business = 7 cards + 1 dark highlight card. Default tab is `private` (matches the original).

**Files:**
- Create: `data/offer.ts`, `components/sections/Offer.tsx`
- Test: `components/sections/Offer.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/Offer.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Offer } from "./Offer";
import { privateServices, businessServices } from "@/data/offer";

test("defaults to the private tab and lists private services", () => {
  render(<Offer />);
  expect(privateServices).toHaveLength(12);
  expect(screen.getByText("Sprzątanie mieszkań i domów")).toBeInTheDocument();
  expect(screen.queryByText("Sprzątanie biur")).not.toBeInTheDocument();
});

test("switching to the business tab swaps the visible services", async () => {
  const user = userEvent.setup();
  render(<Offer />);
  await user.click(
    screen.getByRole("button", { name: "Firmy i obiekty komercyjne" }),
  );
  expect(businessServices).toHaveLength(7);
  expect(screen.getByText("Sprzątanie biur")).toBeInTheDocument();
  expect(
    screen.queryByText("Sprzątanie mieszkań i domów"),
  ).not.toBeInTheDocument();
  expect(screen.getByText("Współpraca stała dla firm")).toBeInTheDocument();
});

test("private tab shows the add-on tags", () => {
  render(<Offer />);
  const panel = screen.getByTestId("addons");
  expect(within(panel).getByText("Piekarnik")).toBeInTheDocument();
  expect(within(panel).getByText("Łazienki do doczyszczenia")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/Offer.test.tsx`
Expected: FAIL — cannot find module `./Offer`.

- [ ] **Step 3: Create `data/offer.ts`**

```ts
export type Service = { title: string; desc: string };

export const privateServices: Service[] = [
  {
    title: "Sprzątanie mieszkań i domów",
    desc: "Regularne oraz jednorazowe sprzątanie dopasowane do potrzeb — od bieżącego utrzymania porządku po dokładniejsze sprzątanie wybranych pomieszczeń.",
  },
  {
    title: "Sprzątanie cykliczne",
    desc: "Stała współpraca dla osób, które chcą mieć porządek pod kontrolą — wygoda, regularność i spokój, bez organizowania wszystkiego od nowa.",
  },
  {
    title: "Sprzątanie jednorazowe",
    desc: "Jednorazowe doprowadzenie wnętrza do porządku — odświeżenie mieszkania lub przygotowanie domu na ważną okazję czy przyjęcie gości.",
  },
  {
    title: "Sprzątanie po remoncie",
    desc: "Dokładne usuwanie kurzu, pyłu i zabrudzeń poremontowych. Przygotowujemy wnętrze do użytkowania, dbając o estetykę wykończenia.",
  },
  {
    title: "Mycie okien i przeszkleń",
    desc: "Dokładne mycie okien, ram, luster i powierzchni szklanych — z naciskiem na przejrzystość i estetyczny efekt bez smug.",
  },
  {
    title: "Pranie tapicerki meblowej",
    desc: "Profesjonalne pranie kanap, narożników, foteli i krzeseł tapicerowanych — odświeża wygląd mebli i usuwa codzienne zabrudzenia.",
  },
  {
    title: "Pranie materacy",
    desc: "Dokładne pranie materacy, które poprawia higienę codziennego użytkowania i odświeża powierzchnię do spania.",
  },
  {
    title: "Pranie wykładzin",
    desc: "Odkurzanie i pranie wykładzin w domach i mieszkaniach — świeżość, czystość i estetyka powierzchni tekstylnych.",
  },
  {
    title: "Sprzątanie domków letniskowych",
    desc: "Przygotowanie obiektu do sezonu, odświeżenie wnętrza po dłuższej przerwie albo uporządkowanie domku po pobycie gości.",
  },
  {
    title: "Sprzątanie kamperów",
    desc: "Zadbanie o kamper przed sezonem, po podróży albo przed sprzedażą — sprzątanie wnętrza oraz mycie zewnętrznej części pojazdu.",
  },
  {
    title: "Opieka nad grobami",
    desc: "Sprzątanie i uporządkowanie miejsca, mycie pomników, wymiana zniczy oraz przygotowanie grobu przed świętami, rocznicami i ważnymi datami.",
  },
  {
    title: "Renowacja pomników z lastryko",
    desc: "Dokładne wyczyszczenie, utwardzenie oraz zabezpieczenie przed czynnikami atmosferycznymi, wilgocią, ścieraniem i promieniowaniem.",
  },
];

export const privateAddons: string[] = [
  "Piekarnik",
  "Mikrofala",
  "Lodówka",
  "Zmywarka",
  "Pralka",
  "Suszarka",
  "Wnętrza szafek",
  "Czyszczenie fug",
  "Impregnacja fug",
  "Mocniej zabrudzone kuchnie",
  "Łazienki do doczyszczenia",
  "Strefy wymagające większej dokładności",
];

export const businessServices: Service[] = [
  {
    title: "Sprzątanie biur",
    desc: "Regularne lub jednorazowe utrzymanie czystości w biurach i przestrzeniach pracy — porządek, świeżość i estetyka na co dzień.",
  },
  {
    title: "Sprzątanie lokali użytkowych",
    desc: "Salony, punkty usługowe, gabinety i inne obiekty komercyjne. Zakres ustalany indywidualnie — zależnie od działalności i powierzchni.",
  },
  {
    title: "Apartamenty i obiekty na wynajem",
    desc: "Przygotowanie obiektów do kolejnych gości, sprzątanie po pobytach i dbanie o standard, który wpływa na opinie klientów.",
  },
  {
    title: "Odkurzanie i pranie wykładzin",
    desc: "Profesjonalne pranie wykładzin w hotelach, pensjonatach i obiektach noclegowych — estetyka, świeżość, higiena i komfort gości.",
  },
  {
    title: "Pranie tapicerki komercyjnej",
    desc: "Odświeżanie mebli tapicerowanych w hotelach, apartamentach, biurach i poczekalniach — utrzymanie wysokiego standardu wnętrza.",
  },
  {
    title: "Sprzątanie obiektów noclegowych",
    desc: "Domki, apartamenty i pensjonaty na wynajem krótkoterminowy — wnętrza gotowe na przyjazd kolejnych gości, estetyczne od pierwszego wejścia.",
  },
  {
    title: "Sprzątanie kamperów dla firm",
    desc: "Dla wypożyczalni i sprzedawców pojazdów rekreacyjnych — wnętrze i mycie zewnętrzne przed wydaniem klientowi, po zwrocie albo przed sprzedażą.",
  },
];

export const businessHighlight = {
  title: "Współpraca stała dla firm",
  desc: "Stała współpraca dopasowana do trybu pracy obiektu, częstotliwości sprzątania i realnych potrzeb klienta biznesowego.",
  cta: "Porozmawiajmy →",
};
```

- [ ] **Step 4: Create `components/sections/Offer.tsx`**

```tsx
"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  privateServices,
  privateAddons,
  businessServices,
  businessHighlight,
  type Service,
} from "@/data/offer";

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-[18px] border border-line bg-white p-6">
      <span className="font-heading text-lg font-semibold text-accent">✦</span>
      <h3 className="m-0 font-heading text-[17px] font-semibold leading-[1.3] text-ink">
        {service.title}
      </h3>
      <p className="m-0 font-body text-[14.5px] leading-[1.65] text-muted">
        {service.desc}
      </p>
    </div>
  );
}

export function Offer() {
  const [tab, setTab] = useState<"private" | "business">("private");

  const tabBase =
    "rounded-full px-[26px] py-3 font-heading text-[15px] font-semibold transition-colors";
  const tabActive = "bg-ink text-white";
  const tabInactive = "border border-line-mid bg-transparent text-quiet";

  return (
    <section
      id="oferta"
      data-screen-label="Oferta"
      className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col gap-3.5">
        <SectionEyebrow label="Oferta / Usługi" />
        <h2 className="m-0 max-w-[640px] font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Zakres dopasowany do Twojego obiektu
        </h2>
        <p className="m-0 max-w-[640px] font-body text-base leading-[1.7] text-muted text-pretty">
          Każde zlecenie traktujemy indywidualnie — inne potrzeby ma mieszkanie
          rodzinne, inne lokal użytkowy, a jeszcze inne hotel, kamper czy domek
          letniskowy.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setTab("private")}
          className={`${tabBase} ${tab === "private" ? tabActive : tabInactive}`}
        >
          Klienci prywatni
        </button>
        <button
          type="button"
          onClick={() => setTab("business")}
          className={`${tabBase} ${tab === "business" ? tabActive : tabInactive}`}
        >
          Firmy i obiekty komercyjne
        </button>
      </div>

      {tab === "private" ? (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
            {privateServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
          <div
            data-testid="addons"
            className="flex flex-col gap-3.5 rounded-[20px] border border-line bg-sand p-[30px]"
          >
            <span className="font-heading text-base font-semibold text-ink">
              Usługi dodatkowe — do wyboru pojedynczo
            </span>
            <div className="flex flex-wrap gap-2">
              {privateAddons.map((addon) => (
                <span
                  key={addon}
                  className="rounded-full border border-line-mid bg-cream px-3.5 py-2 font-body text-[13.5px] text-quiet"
                >
                  {addon}
                </span>
              ))}
            </div>
            <span className="font-body text-[13px] text-faint">
              Elementy czyszczone i/lub dezynfekowane — zakres dobierany przy
              wycenie.
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
          {businessServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
          <div className="flex flex-col gap-2.5 rounded-[18px] bg-ink p-6">
            <span className="font-heading text-lg font-semibold text-accent">✦</span>
            <h3 className="m-0 font-heading text-[17px] font-semibold leading-[1.3] text-white">
              {businessHighlight.title}
            </h3>
            <p className="m-0 font-body text-[14.5px] leading-[1.65] text-line-hover">
              {businessHighlight.desc}
            </p>
            <a
              href="#kontakt"
              className="mt-1 font-heading text-[14.5px] font-semibold text-accent no-underline"
            >
              {businessHighlight.cta}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/sections/Offer.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 6: Commit**

```bash
git add data/offer.ts components/sections/Offer.tsx components/sections/Offer.test.tsx
git commit -m "feat: add offer section with private/business tabs"
```

---

## Task 9: Process + PricingInfo

Process (`#wspolpraca`, `#221C18`): heading + 5 numbered step cards (01–05; step 5 has an accent border). PricingInfo (`#wycena`): 2-column — text + CTA on the left, a white card listing 9 pricing factors as pills on the right.

**Files:**
- Create: `data/process.ts`, `data/pricingInfo.ts`, `components/sections/Process.tsx`, `components/sections/PricingInfo.tsx`
- Test: `components/sections/Process.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/Process.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Process } from "./Process";
import { processSteps } from "@/data/process";
import { PricingInfo } from "./PricingInfo";
import { pricingFactors } from "@/data/pricingInfo";

test("renders all five process steps with numbers", () => {
  render(<Process />);
  expect(processSteps).toHaveLength(5);
  expect(screen.getByText("01")).toBeInTheDocument();
  expect(screen.getByText("05")).toBeInTheDocument();
  expect(
    screen.getByText("Kontaktujesz się z nami telefonicznie lub wiadomością."),
  ).toBeInTheDocument();
});

test("pricing info lists all nine factors", () => {
  render(<PricingInfo />);
  expect(pricingFactors).toHaveLength(9);
  expect(screen.getByText("rodzaju obiektu")).toBeInTheDocument();
  expect(screen.getByText("usług dodatkowych")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/Process.test.tsx`
Expected: FAIL — cannot find module `./Process`.

- [ ] **Step 3: Create `data/process.ts`**

```ts
export const processSteps: string[] = [
  "Kontaktujesz się z nami telefonicznie lub wiadomością.",
  "Ustalamy rodzaj usługi, zakres prac i potrzeby.",
  "Przygotowujemy indywidualną wycenę.",
  "Ustalamy termin realizacji.",
  "Wykonujemy usługę sprawnie, dokładnie i estetycznie.",
];
```

- [ ] **Step 4: Create `data/pricingInfo.ts`**

```ts
export const pricingFactors: string[] = [
  "rodzaju obiektu",
  "wielkości powierzchni",
  "zakresu prac",
  "stopnia zabrudzenia",
  "częstotliwości współpracy",
  "ilości detali do doczyszczenia",
  "ilości przeszkleń",
  "rodzaju powierzchni",
  "usług dodatkowych",
];
```

- [ ] **Step 5: Create `components/sections/Process.tsx`**

```tsx
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section id="wspolpraca" data-screen-label="Współpraca" className="bg-ink">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]">
        <div className="flex flex-col gap-3.5">
          <SectionEyebrow label="Jak wygląda współpraca" />
          <h2 className="m-0 max-w-[640px] font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-white text-balance">
            Od kontaktu do efektu — w pięciu krokach
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
          {processSteps.map((step, index) => {
            const last = index === processSteps.length - 1;
            return (
              <div
                key={step}
                className={`flex flex-col gap-3.5 rounded-[18px] p-6 ${
                  last
                    ? "border border-accent bg-ink-soft/40"
                    : "border border-ink-soft bg-ink-soft/20"
                }`}
              >
                <span className="font-heading text-[26px] font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="m-0 font-body text-[15px] leading-[1.6] text-line-hover">
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create `components/sections/PricingInfo.tsx`**

```tsx
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { pricingFactors } from "@/data/pricingInfo";

export function PricingInfo() {
  return (
    <section
      id="wycena"
      data-screen-label="Wycena"
      className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(32px,5vw,64px)] px-6 py-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col gap-[18px]">
        <SectionEyebrow label="Wycena" />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Każda wycena ustalana jest <span className="text-accent">indywidualnie</span>
        </h2>
        <p className="m-0 font-body text-base leading-[1.75] text-muted text-pretty">
          Dzięki temu otrzymujesz uczciwą i konkretną wycenę, dopasowaną do
          rzeczywistego zakresu pracy — bez ukrytych kosztów i bez zgadywania.
        </p>
        <a
          href="#kontakt"
          className="mt-1.5 self-start rounded-full bg-ink px-7 py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
        >
          Zamów bezpłatną wycenę
        </a>
      </div>
      <div className="flex flex-col gap-[18px] rounded-[20px] border border-line bg-white p-[30px]">
        <span className="font-heading text-base font-semibold">
          Cena usługi zależy od:
        </span>
        <div className="flex flex-wrap gap-2">
          {pricingFactors.map((factor) => (
            <span
              key={factor}
              className="rounded-full bg-sand px-3.5 py-2 font-body text-[13.5px] text-quiet"
            >
              {factor}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npx vitest run components/sections/Process.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 8: Commit**

```bash
git add data/process.ts data/pricingInfo.ts components/sections/Process.tsx components/sections/PricingInfo.tsx components/sections/Process.test.tsx
git commit -m "feat: add process and pricing-info sections"
```

---

## Task 10: PricingPreview + ServiceArea

PricingPreview (`#cennik`): centered heading + a white card with 6 sample label-dots-price rows + "Zobacz pełny cennik →" linking to `/cennik`. ServiceArea (`#F2E9E1`): heading + concentric dashed circles with "Konin" centre.

**Files:**
- Create: `data/pricingPreview.ts`, `components/sections/PricingPreview.tsx`, `components/sections/ServiceArea.tsx`
- Test: `components/sections/PricingPreview.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/PricingPreview.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { PricingPreview } from "./PricingPreview";
import { pricingPreview } from "@/data/pricingPreview";

test("shows six sample prices and a link to the full pricelist", () => {
  render(<PricingPreview />);
  expect(pricingPreview).toHaveLength(6);
  expect(screen.getByText("Czyszczenie piekarnika")).toBeInTheDocument();
  expect(screen.getByText("od 60 zł/szt.")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Zobacz pełny cennik →" }),
  ).toHaveAttribute("href", "/cennik");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/PricingPreview.test.tsx`
Expected: FAIL — cannot find module `./PricingPreview`.

- [ ] **Step 3: Create `data/pricingPreview.ts`**

```ts
export type PriceRow = { label: string; price: string };

export const pricingPreview: PriceRow[] = [
  { label: "Czyszczenie piekarnika", price: "od 60 zł/szt." },
  { label: "Pranie kanapy", price: "od 150 zł" },
  { label: "Mycie okna standardowego", price: "od 40 zł/szt." },
  { label: "Czyszczenie fug", price: "od 15 zł/m²" },
  { label: "Pranie dywanu", price: "od 15 zł/m²" },
  { label: "Mycie nagrobka pojedynczego", price: "od 100 zł" },
];
```

- [ ] **Step 4: Create `components/sections/PricingPreview.tsx`**

```tsx
import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { pricingPreview } from "@/data/pricingPreview";

export function PricingPreview() {
  return (
    <section
      id="cennik"
      data-screen-label="Cennik zajawka"
      className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 pb-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Cennik" centered />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Orientacyjne ceny wybranych usług
        </h2>
        <p className="m-0 max-w-[540px] font-body text-base leading-[1.7] text-muted text-pretty">
          Kilka przykładowych pozycji z naszego cennika usług dodatkowych i
          specjalistycznych.
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-3.5 rounded-[22px] border border-line bg-white p-[clamp(26px,3.5vw,42px)]">
        {pricingPreview.map((row) => (
          <div key={row.label} className="flex items-baseline gap-3">
            <span className="font-body text-[15px] leading-[1.5] text-quiet">
              {row.label}
            </span>
            <span className="min-w-5 flex-1 border-b border-dotted border-line-mid" />
            <span className="whitespace-nowrap font-heading text-[14.5px] font-semibold">
              {row.price}
            </span>
          </div>
        ))}
        <Link
          href="/cennik"
          className="mt-3 self-center rounded-full bg-ink px-[30px] py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
        >
          Zobacz pełny cennik →
        </Link>
        <span className="self-center font-body text-[12.5px] text-faint">
          Ceny orientacyjne — ostateczna wycena zawsze ustalana indywidualnie.
        </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `components/sections/ServiceArea.tsx`**

```tsx
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ServiceArea() {
  return (
    <section
      data-screen-label="Obszar działania"
      className="border-y border-line-soft bg-sand"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(32px,5vw,64px)] px-6 py-[clamp(48px,7vw,80px)]">
        <div className="flex flex-col gap-4">
          <SectionEyebrow label="Obszar działania" />
          <h2 className="m-0 font-heading text-[clamp(26px,3vw,36px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
            Konin i okolice — do 100 km w każdą stronę
          </h2>
          <p className="m-0 font-body text-base leading-[1.75] text-muted text-pretty">
            Obsługujemy klientów prywatnych i firmowych na terenie Konina i
            okolic. Szczegóły dojazdu i realizacji ustalamy indywidualnie podczas
            kontaktu.
          </p>
        </div>
        <div className="flex justify-center py-3">
          <div className="relative flex aspect-square w-[clamp(220px,26vw,300px)] items-center justify-center rounded-full border border-dashed border-accent-soft">
            <div className="flex aspect-square w-[62%] items-center justify-center rounded-full border border-dashed border-accent">
              <div className="rounded-full bg-ink px-[26px] py-3 font-heading text-base font-semibold text-white">
                Konin
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run components/sections/PricingPreview.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 7: Commit**

```bash
git add data/pricingPreview.ts components/sections/PricingPreview.tsx components/sections/ServiceArea.tsx components/sections/PricingPreview.test.tsx
git commit -m "feat: add pricing-preview and service-area sections"
```

---

## Task 11: Testimonials

`#opinie`: centered heading + 3 testimonial cards (5 stars, italic quote, author line).

**Files:**
- Create: `data/testimonials.ts`, `components/sections/Testimonials.tsx`
- Test: `components/sections/Testimonials.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/Testimonials.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Testimonials } from "./Testimonials";
import { testimonials } from "@/data/testimonials";

test("renders three testimonials with authors", () => {
  render(<Testimonials />);
  expect(testimonials).toHaveLength(3);
  expect(
    screen.getByText("Anna M. — sprzątanie jednorazowe"),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Karolina W. — apartamenty na wynajem"),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/Testimonials.test.tsx`
Expected: FAIL — cannot find module `./Testimonials`.

- [ ] **Step 3: Create `data/testimonials.ts`**

```ts
export type Testimonial = { quote: string; author: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Mieszkanie po sprzątaniu wyglądało lepiej niż po remoncie. Wszystko dopięte, łącznie z fugami. Na pewno wrócę.",
    author: "Anna M. — sprzątanie jednorazowe",
  },
  {
    quote:
      "Współpracujemy cyklicznie od kilku miesięcy. Zawsze na czas, zawsze dokładnie, pełna dyskrecja. Polecam każdej firmie.",
    author: "Biuro w Koninie — współpraca stała",
  },
  {
    quote:
      "Apartament gotowy na gości za każdym razem bez przypominania. Kontakt sprawny, wycena jasna od początku.",
    author: "Karolina W. — apartamenty na wynajem",
  },
];
```

- [ ] **Step 4: Create `components/sections/Testimonials.tsx`**

```tsx
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section
      id="opinie"
      data-screen-label="Opinie"
      className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Opinie" centered />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Zadowolenie klientów to nasza najlepsza reklama
        </h2>
        <p className="m-0 max-w-[540px] font-body text-base leading-[1.7] text-muted text-pretty">
          Dobra usługa broni się sama — ale nic nie buduje zaufania tak mocno
          jak opinie zadowolonych klientów.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {testimonials.map((t) => (
          <div
            key={t.author}
            className="flex flex-col gap-3.5 rounded-[18px] border border-line bg-white p-7"
          >
            <span className="text-[15px] tracking-[3px] text-accent">★★★★★</span>
            <p className="m-0 font-body text-[15px] italic leading-[1.7] text-quiet">
              „{t.quote}”
            </p>
            <span className="font-heading text-[13.5px] font-semibold text-faint">
              {t.author}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/sections/Testimonials.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 6: Commit**

```bash
git add data/testimonials.ts components/sections/Testimonials.tsx components/sections/Testimonials.test.tsx
git commit -m "feat: add testimonials section"
```

---

## Task 12: FAQ accordion (client, single-open)

`#faq`: heading + 5 accordion items. Original behaviour: at most one open at a time (`faqOpen` 0–5); clicking an open item closes it; the marker is `−` when open, `+` when closed. All start closed.

**Files:**
- Create: `data/faq.ts`, `components/sections/Faq.tsx`
- Test: `components/sections/Faq.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/Faq.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "./Faq";
import { faqItems } from "@/data/faq";

test("all questions render and answers start hidden", () => {
  render(<Faq />);
  expect(faqItems).toHaveLength(5);
  expect(screen.getByText("Jak wygląda wycena?")).toBeInTheDocument();
  expect(
    screen.queryByText(/Każda wycena dopasowywana jest indywidualnie/),
  ).not.toBeInTheDocument();
});

test("clicking a question opens its answer and toggling closes it", async () => {
  const user = userEvent.setup();
  render(<Faq />);
  const q1 = screen.getByRole("button", { name: /Jak wygląda wycena\?/ });

  await user.click(q1);
  expect(
    screen.getByText(/Każda wycena dopasowywana jest indywidualnie/),
  ).toBeInTheDocument();

  await user.click(q1);
  expect(
    screen.queryByText(/Każda wycena dopasowywana jest indywidualnie/),
  ).not.toBeInTheDocument();
});

test("opening a second question closes the first (single-open)", async () => {
  const user = userEvent.setup();
  render(<Faq />);
  await user.click(screen.getByRole("button", { name: /Jak wygląda wycena\?/ }));
  await user.click(
    screen.getByRole("button", {
      name: /Czy można zamówić pojedyncze usługi dodatkowe\?/,
    }),
  );
  expect(
    screen.queryByText(/Każda wycena dopasowywana jest indywidualnie/),
  ).not.toBeInTheDocument();
  expect(screen.getByText(/Tak\. Można dobrać konkretne elementy/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/Faq.test.tsx`
Expected: FAIL — cannot find module `./Faq`.

- [ ] **Step 3: Create `data/faq.ts`**

```ts
export type FaqItem = { question: string; answer: string };

export const faqItems: FaqItem[] = [
  {
    question: "Jak wygląda wycena?",
    answer:
      "Każda wycena dopasowywana jest indywidualnie do rodzaju obiektu, zakresu prac, wielkości powierzchni i stopnia zabrudzenia.",
  },
  {
    question: "Czy można zamówić pojedyncze usługi dodatkowe?",
    answer:
      "Tak. Można dobrać konkretne elementy usługi — np. piekarnik, mikrofalówkę, lodówkę, zmywarkę, pralkę, suszarkę, wnętrza szafek, czyszczenie lub impregnację fug albo wybrane strefy wymagające mocniejszego doczyszczenia.",
  },
  {
    question: "Czy obsługiwani są tylko klienci prywatni?",
    answer:
      "Nie. Obsługujemy również firmy, biura, lokale użytkowe, apartamenty na wynajem, domki letniskowe, hotele i inne obiekty komercyjne.",
  },
  {
    question: "Czy można zamówić stałą współpracę?",
    answer:
      "Tak. Oferujemy zarówno zlecenia jednorazowe, jak i współpracę cykliczną dopasowaną do potrzeb klienta.",
  },
  {
    question: "Jak najszybciej się skontaktować?",
    answer:
      "Najszybciej telefonicznie lub przez wiadomość — wystarczy opisać, jaka usługa Cię interesuje, a ustalimy dalsze szczegóły. Telefon: 518 169 491.",
  },
];
```

- [ ] **Step 4: Create `components/sections/Faq.tsx`**

```tsx
"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { faqItems } from "@/data/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      data-screen-label="FAQ"
      className="mx-auto flex max-w-[820px] flex-col gap-8 px-6 pb-[clamp(56px,8vw,100px)] pt-[clamp(40px,6vw,80px)]"
    >
      <div className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="FAQ" centered />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px]">
          Najczęstsze pytania
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {faqItems.map((item, index) => {
          const open = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-line bg-white"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-6 py-5 text-left"
              >
                <span className="font-heading text-base font-semibold text-ink">
                  {item.question}
                </span>
                <span className="shrink-0 font-heading text-[22px] text-accent">
                  {open ? "−" : "+"}
                </span>
              </button>
              {open && (
                <p className="m-0 px-6 pb-[22px] font-body text-[15px] leading-[1.7] text-muted">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/sections/Faq.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 6: Commit**

```bash
git add data/faq.ts components/sections/Faq.tsx components/sections/Faq.test.tsx
git commit -m "feat: add single-open FAQ accordion"
```

---

## Task 13: Contact (client, mock form)

`#kontakt` (`#221C18`): left = heading, copy, phone block, WhatsApp + Messenger buttons. Right = a form (name, phone, service `<select>` with 10 options, message). Submitting flips to a "Dziękujemy" success panel with a "Wyślij kolejną" reset button. No network — `preventDefault` + `setState`.

**Files:**
- Create: `data/contactServices.ts`, `components/sections/Contact.tsx`
- Test: `components/sections/Contact.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `components/sections/Contact.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "./Contact";
import { contactServices } from "@/data/contactServices";

test("renders the form with all service options", () => {
  render(<Contact />);
  expect(contactServices).toHaveLength(10);
  expect(screen.getByLabelText("Imię")).toBeInTheDocument();
  expect(screen.getByLabelText("Telefon")).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "Sprzątanie cykliczne" })).toBeInTheDocument();
});

test("submitting shows the thank-you panel without leaving the form", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  await user.type(screen.getByLabelText("Imię"), "Anna");
  await user.click(screen.getByRole("button", { name: "Wyślij zapytanie" }));
  expect(screen.getByText("Dziękujemy za wiadomość!")).toBeInTheDocument();
  expect(screen.queryByLabelText("Imię")).not.toBeInTheDocument();
});

test("'Wyślij kolejną' returns to the empty form", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  await user.click(screen.getByRole("button", { name: "Wyślij zapytanie" }));
  await user.click(screen.getByRole("button", { name: "Wyślij kolejną" }));
  expect(screen.getByLabelText("Imię")).toBeInTheDocument();
});

test("WhatsApp and Messenger links point to the right URLs", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute(
    "href",
    "https://wa.me/48518169491",
  );
  expect(screen.getByRole("link", { name: /Messenger/ })).toHaveAttribute(
    "href",
    "https://m.me/cleaningservicekonin",
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/sections/Contact.test.tsx`
Expected: FAIL — cannot find module `./Contact`.

- [ ] **Step 3: Create `data/contactServices.ts`**

```ts
export const contactServices: string[] = [
  "Sprzątanie mieszkania / domu",
  "Sprzątanie cykliczne",
  "Sprzątanie jednorazowe",
  "Sprzątanie po remoncie",
  "Mycie okien i przeszkleń",
  "Pranie tapicerki / materacy / wykładzin",
  "Domek letniskowy / kamper",
  "Opieka nad grobami / renowacja pomników",
  "Usługa dla firmy / obiektu komercyjnego",
  "Inne — opiszę w wiadomości",
];
```

- [ ] **Step 4: Create `components/sections/Contact.tsx`**

```tsx
"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { site } from "@/data/site";
import { contactServices } from "@/data/contactServices";

const inputClass =
  "rounded-xl border border-line-mid bg-white px-4 py-3.5 font-body text-[15px] text-ink outline-none focus:border-accent";
const labelTextClass =
  "font-heading text-[12.5px] font-semibold tracking-[0.6px] text-muted";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="kontakt"
      data-screen-label="Kontakt"
      className="relative overflow-hidden bg-ink"
    >
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(36px,6vw,80px)] px-6 py-[clamp(56px,8vw,110px)]">
        <div className="flex flex-col gap-[22px]">
          <SectionEyebrow label="Kontakt" />
          <h2 className="m-0 self-start font-heading text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.18] tracking-[-0.7px] text-white text-balance">
            Zamów bezpłatną wycenę
          </h2>
          <p className="m-0 max-w-[460px] font-body text-base leading-[1.75] text-line-hover text-pretty">
            Opisz krótko, jaka usługa Cię interesuje — odezwiemy się, ustalimy
            szczegóły i przygotujemy indywidualną wycenę.
          </p>
          <a
            href={site.phoneHref}
            className="mt-1 flex items-center gap-4 no-underline"
          >
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-accent">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                  fill="#221C18"
                />
              </svg>
            </span>
            <span className="flex flex-col">
              <span className="font-body text-[12.5px] uppercase tracking-[1.5px] text-faint">
                Zadzwoń
              </span>
              <span className="font-heading text-2xl font-semibold text-white">
                {site.phone}
              </span>
            </span>
          </a>
          <div className="mt-1 flex flex-wrap gap-2.5">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2.5 rounded-full border border-ink-soft px-[22px] py-3 font-heading text-sm font-semibold text-white no-underline transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.07-.12-.27-.2-.57-.35zM12.04 21.79h-.01a9.77 9.77 0 0 1-4.98-1.37l-.36-.21-3.7.97.99-3.61-.24-.37a9.77 9.77 0 0 1-1.5-5.21c0-5.4 4.4-9.8 9.81-9.8a9.74 9.74 0 0 1 6.93 2.88 9.74 9.74 0 0 1 2.87 6.94c0 5.4-4.4 9.78-9.81 9.78z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={site.messenger}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2.5 rounded-full border border-ink-soft px-[22px] py-3 font-heading text-sm font-semibold text-white no-underline transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.24 0 0 4.95 0 11.64c0 3.5 1.43 6.52 3.77 8.61.2.17.31.43.32.7l.07 2.14a.96.96 0 0 0 1.35.85l2.39-1.05c.2-.09.43-.11.64-.05 1.1.3 2.26.46 3.46.46 6.76 0 12-4.95 12-11.66C24 4.95 18.76 0 12 0zm7.2 8.96l-3.52 5.59a1.8 1.8 0 0 1-2.6.48l-2.8-2.1a.72.72 0 0 0-.87 0l-3.78 2.87c-.5.38-1.16-.22-.83-.76l3.52-5.59a1.8 1.8 0 0 1 2.6-.48l2.8 2.1c.26.2.61.2.87 0l3.78-2.87c.5-.38 1.16.22.83.76z" />
              </svg>
              Messenger
            </a>
          </div>
          <span className="font-body text-[13.5px] text-muted">{site.area}</span>
        </div>

        <div className="rounded-[22px] bg-cream p-[clamp(26px,3vw,38px)]">
          {sent ? (
            <div className="flex flex-col items-center gap-4 px-2.5 py-10 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand font-heading text-[26px] font-semibold text-accent">
                ✦
              </span>
              <span className="font-heading text-[21px] font-semibold text-ink">
                Dziękujemy za wiadomość!
              </span>
              <span className="max-w-[320px] font-body text-[15px] leading-[1.7] text-muted">
                Odezwiemy się tak szybko, jak to możliwe, żeby ustalić szczegóły
                i przygotować wycenę.
              </span>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="cursor-pointer rounded-full border border-line-mid bg-transparent px-[26px] py-3 font-heading text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Wyślij kolejną
              </button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-4"
            >
              <span className="font-heading text-[19px] font-semibold text-ink">
                Napisz do nas
              </span>
              <label className="flex flex-col gap-[7px]">
                <span className={labelTextClass}>Imię</span>
                <input type="text" placeholder="np. Anna" className={inputClass} />
              </label>
              <label className="flex flex-col gap-[7px]">
                <span className={labelTextClass}>Telefon</span>
                <input type="tel" placeholder="np. 600 000 000" className={inputClass} />
              </label>
              <label className="flex flex-col gap-[7px]">
                <span className={labelTextClass}>Rodzaj usługi</span>
                <select className={`${inputClass} cursor-pointer`}>
                  {contactServices.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-[7px]">
                <span className={labelTextClass}>Wiadomość</span>
                <textarea
                  rows={4}
                  placeholder="Opisz krótko obiekt i czego potrzebujesz…"
                  className={`${inputClass} resize-y leading-[1.6]`}
                />
              </label>
              <button
                type="submit"
                className="mt-1 cursor-pointer rounded-full bg-ink px-[30px] py-4 font-heading text-[15px] font-semibold text-white transition-colors hover:bg-accent"
              >
                Wyślij zapytanie
              </button>
              <span className="font-body text-[12.5px] text-faint">
                Wysyłając formularz wyrażasz zgodę na kontakt w sprawie wyceny.
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run components/sections/Contact.test.tsx`
Expected: PASS — 4 tests passed.

- [ ] **Step 6: Commit**

```bash
git add data/contactServices.ts components/sections/Contact.tsx components/sections/Contact.test.tsx
git commit -m "feat: add contact section with mock form"
```

---

## Task 14: Compose the landing page

Replace the temporary scaffold page with the real composition: Header, all sections in order, Footer, MobileCallButton.

**Files:**
- Modify: `app/page.tsx` (overwrite the scaffold)
- Delete: `app/page.smoke.test.tsx` (scaffold test no longer relevant)
- Test: `app/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Delete the old smoke test and create `app/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Home from "./page";

test("landing page renders hero, offer and contact landmarks", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Sprawnie. Dokładnie. Dyskretnie. Przystępnie.",
  );
  expect(
    screen.getByRole("heading", { name: "Zakres dopasowany do Twojego obiektu" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Zamów bezpłatną wycenę" }),
  ).toBeInTheDocument();
});
```

```bash
rm app/page.smoke.test.tsx
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL — the scaffold page has no `<h1>` with that text.

- [ ] **Step 3: Overwrite `app/page.tsx`**

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallButton } from "@/components/layout/MobileCallButton";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Offer } from "@/components/sections/Offer";
import { Process } from "@/components/sections/Process";
import { PricingInfo } from "@/components/sections/PricingInfo";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
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
      <Footer />
      <MobileCallButton />
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Verify the full build compiles**

Run: `npm run build`
Expected: build succeeds; route `/` listed. Fix any import path errors before continuing.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git rm --cached app/page.smoke.test.tsx 2>/dev/null || true
git commit -m "feat: compose landing page from sections"
```

---

## Task 15: Cennik page

`/cennik`: Header, a `#F2E9E1` intro, a responsive grid of 9 category cards (each: icon badge + title + label-dots-price rows), a dark CTA, Footer, MobileCallButton. 57 priced items total.

**Files:**
- Create: `data/pricing.ts`, `components/pricing/PricingCategory.tsx`, `app/cennik/page.tsx`
- Test: `app/cennik/cennik.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `app/cennik/cennik.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import CennikPage from "./page";
import { pricingCategories } from "@/data/pricing";

test("data has nine categories and 57 items total", () => {
  expect(pricingCategories).toHaveLength(9);
  const total = pricingCategories.reduce((n, c) => n + c.items.length, 0);
  expect(total).toBe(57);
});

test("renders category headings and a sample price", () => {
  render(<CennikPage />);
  expect(
    screen.getByRole("heading", { name: "Łazienki, płytki, fugi i kamień" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Nagrobki i miejsca pamięci" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Mycie płytek od góry do dołu")).toBeInTheDocument();
  expect(screen.getAllByText("od 150 zł").length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/cennik/cennik.test.tsx`
Expected: FAIL — cannot find module `./page`.

- [ ] **Step 3: Create `data/pricing.ts`**

```ts
export type PriceItem = { name: string; price: string };
export type PricingCategory = { title: string; items: PriceItem[] };

export const pricingCategories: PricingCategory[] = [
  {
    title: "Łazienki, płytki, fugi i kamień",
    items: [
      { name: "Mycie płytek od góry do dołu", price: "od 8 zł/m²" },
      { name: "Czyszczenie fug", price: "od 15 zł/m²" },
      { name: "Impregnacja fug", price: "od 10 zł/m²" },
      { name: "Doczyszczanie kabiny prysznicowej z kamienia", price: "od 80 zł/szt." },
      { name: "Odkamienianie armatury, odpływów i zakamarków", price: "od 50 zł" },
    ],
  },
  {
    title: "Kuchnia i sprzęty AGD",
    items: [
      { name: "Czyszczenie piekarnika", price: "od 60 zł/szt." },
      { name: "Mycie lodówki w środku", price: "od 50 zł/szt." },
      { name: "Mycie zmywarki, pralki lub suszarki w środku", price: "od 50 zł/szt." },
      { name: "Mycie okapu z filtrami", price: "od 80 zł/szt." },
      { name: "Mycie witryny kuchennej w środku", price: "od 120 zł" },
      { name: "Mycie witryny wraz z zastawą", price: "od 150 zł" },
      { name: "Mycie frontów kuchennych", price: "od 20 zł/mb" },
    ],
  },
  {
    title: "Pranie tapicerki i tekstyliów",
    items: [
      { name: "Pranie krzesła tapicerowanego", price: "od 20 zł/szt." },
      { name: "Pranie fotela", price: "od 80 zł/szt." },
      { name: "Pranie kanapy", price: "od 150 zł" },
      { name: "Pranie narożnika", price: "od 250 zł" },
      { name: "Pranie materaca", price: "od 120 zł" },
      { name: "Pranie dywanu", price: "od 15 zł/m²" },
      { name: "Pranie wykładziny biurowej lub hotelowej", price: "od 10 zł/m²" },
    ],
  },
  {
    title: "Podłogi i doczyszczanie maszynowe",
    items: [
      { name: "Maszynowe mycie podłogi", price: "od 6 zł/m²" },
      { name: "Doczyszczanie podłogi szorowarką", price: "od 9 zł/m²" },
      { name: "Doczyszczanie mocno zabrudzonej podłogi", price: "od 15 zł/m²" },
      { name: "Punktowe usuwanie trudnych zabrudzeń", price: "od 50 zł" },
      { name: "Zabezpieczenie lub pielęgnacja podłogi", price: "od 8 zł/m²" },
    ],
  },
  {
    title: "Okna, witryny i przeszklenia",
    items: [
      { name: "Mycie okna standardowego", price: "od 40 zł/szt." },
      { name: "Mycie drzwi balkonowych", price: "od 50 zł/szt." },
      { name: "Mycie dużych przeszkleń", price: "od 70 zł/szt." },
      { name: "Mycie okien HST / dużych drzwi tarasowych", price: "od 80 zł/szt." },
      { name: "Mycie witryn sklepowych", price: "od 8 zł/m²" },
      { name: "Mycie okien po remoncie", price: "dopłata od 30%" },
      { name: "Usuwanie naklejek, kleju, farby lub trudnych zabrudzeń", price: "od 30 zł" },
    ],
  },
  {
    title: "Czyszczenie parowe",
    items: [
      { name: "Czyszczenie parowe fug punktowo", price: "od 80 zł" },
      { name: "Czyszczenie parowe łazienki", price: "od 150 zł" },
      { name: "Czyszczenie parowe kuchni", price: "od 150 zł" },
      { name: "Czyszczenie trudno dostępnych miejsc", price: "od 70 zł" },
    ],
  },
  {
    title: "Pomieszczenia gospodarcze, garaże i domki",
    items: [
      { name: "Gruntowne sprzątanie pomieszczenia gospodarczego", price: "od 150 zł" },
      { name: "Sprzątanie garażu", price: "od 8 zł/m²" },
      { name: "Odkurzanie pajęczyn wewnątrz pomieszczeń", price: "od 80 zł" },
      { name: "Odkurzanie pajęczyn zewnętrznych z domku, tarasu lub elewacji", price: "od 150 zł" },
      { name: "Sprzątanie domku letniskowego", price: "od 500 zł" },
      { name: "Home staging porządkowy przed sprzedażą nieruchomości", price: "od 1200 zł" },
    ],
  },
  {
    title: "Mycie zewnętrzne",
    items: [
      { name: "Mycie kostki brukowej", price: "od 8 zł/m²" },
      { name: "Mycie tarasu", price: "od 10 zł/m²" },
      { name: "Mycie elewacji z poziomu gruntu", price: "od 10 do 15 zł/m²" },
    ],
  },
  {
    title: "Nagrobki i miejsca pamięci",
    items: [
      { name: "Mycie nagrobka pojedynczego", price: "od 100 zł" },
      { name: "Mycie nagrobka podwójnego", price: "od 150 zł" },
      { name: "Doczyszczanie mocnych zabrudzeń", price: "od 50 zł" },
      { name: "Sprzątanie otoczenia grobu", price: "od 50 zł" },
      { name: "Stała opieka nad grobem", price: "od 100 zł/mies." },
      { name: "Czyszczenie nagrobka z lastryko", price: "od 150 zł/szt." },
      { name: "Doczyszczanie mocno zabrudzonego lastryko", price: "od 200 zł/szt." },
      { name: "Renowacja powierzchni lastryko nagrobków", price: "od 250 zł/m²" },
      { name: "Zabezpieczenie powierzchni lastryko", price: "od 80 zł/m²" },
      { name: "Renowacja lastryko z użyciem żywicy epoksydowej", price: "od 300 zł/m²" },
      { name: "Odświeżenie liter na nagrobku", price: "od 100 zł" },
      { name: "Uzupełnienie drobnych ubytków w nagrobku", price: "wycena indywidualna" },
      { name: "Kompleksowa renowacja nagrobka z lastryko", price: "wycena indywidualna" },
    ],
  },
];
```

- [ ] **Step 4: Create `components/pricing/PricingCategory.tsx`**

```tsx
import type { PricingCategory as Category } from "@/data/pricing";

export function PricingCategory({ category }: { category: Category }) {
  return (
    <div className="flex flex-col gap-[18px] rounded-[20px] border border-line bg-white p-[clamp(24px,3vw,32px)]">
      <div className="flex items-center gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-line bg-[#f7f1ea] font-heading text-lg font-semibold text-accent">
          ✦
        </span>
        <h2 className="m-0 font-heading text-[19px] font-semibold leading-[1.3] tracking-[-0.3px]">
          {category.title}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {category.items.map((item) => (
          <div key={item.name} className="flex items-baseline gap-3">
            <span className="font-body text-[15px] leading-[1.5] text-quiet">
              {item.name}
            </span>
            <span className="min-w-5 flex-1 border-b border-dotted border-line-mid" />
            <span className="whitespace-nowrap font-heading text-[14.5px] font-semibold">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `app/cennik/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallButton } from "@/components/layout/MobileCallButton";
import { PricingCategory } from "@/components/pricing/PricingCategory";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { site } from "@/data/site";
import { pricingCategories } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Cennik usług — Cleaning Service Konin",
  description:
    "Orientacyjny cennik usług dodatkowych i specjalistycznych Cleaning Service Konin. Ostateczna wycena ustalana indywidualnie.",
};

export default function CennikPage() {
  return (
    <>
      <Header />
      <main className="min-w-[320px] overflow-x-hidden">
        <section className="border-y border-line-soft bg-sand">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-3.5 px-6 py-[clamp(48px,7vw,90px)]">
            <SectionEyebrow label="Cennik" />
            <h1 className="m-0 max-w-[760px] font-heading text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.15] tracking-[-0.8px] text-balance">
              Cennik usług <span className="text-accent">dodatkowych</span> i
              specjalistycznych
            </h1>
            <p className="m-0 max-w-[680px] font-body text-base leading-[1.75] text-muted text-pretty">
              Poniższe ceny mają charakter orientacyjny. Ostateczna wycena zależy
              od zakresu prac, metrażu, stopnia zabrudzenia, rodzaju powierzchni
              oraz lokalizacji. Każda usługa może zostać dopasowana indywidualnie
              do potrzeb klienta.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-start gap-[22px] px-6 py-[clamp(40px,6vw,72px)]">
          {pricingCategories.map((category) => (
            <PricingCategory key={category.title} category={category} />
          ))}
        </section>

        <section className="bg-ink">
          <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-5 px-6 py-[clamp(48px,7vw,90px)] text-center">
            <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-white text-balance">
              Nie wiesz, jaki zakres wybrać?
            </h2>
            <p className="m-0 max-w-[520px] font-body text-base leading-[1.7] text-line-hover text-pretty">
              Napisz lub zadzwoń — pomożemy dobrać zakres i przygotujemy
              indywidualną wycenę.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/#kontakt"
                className="rounded-full bg-accent px-[30px] py-4 font-heading text-[15px] font-semibold text-ink no-underline"
              >
                Napisz do nas
              </a>
              <a
                href={site.phoneHref}
                className="rounded-full border border-ink-soft px-[30px] py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:border-accent hover:text-accent"
              >
                Zadzwoń → {site.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCallButton />
    </>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run app/cennik/cennik.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 7: Commit**

```bash
git add data/pricing.ts components/pricing/PricingCategory.tsx app/cennik/page.tsx app/cennik/cennik.test.tsx
git commit -m "feat: add cennik page with full pricing data"
```

---

## Task 16: Favicon, full verification, cleanup

**Files:**
- Create: `app/icon.png` (favicon)
- Verify: full test suite + production build

- [ ] **Step 1: Add the favicon**

```bash
cp public/logo-icon.png app/icon.png
```

(Next.js auto-serves `app/icon.png` as the favicon — no code needed.)

- [ ] **Step 2: Run the entire test suite**

Run: `npm test`
Expected: PASS — all test files green (Header, Footer, Hero, WhyUs, Offer, Process, PricingPreview, Testimonials, Faq, Contact, page, cennik, data). No failures.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: build succeeds; output lists routes `/` and `/cennik`, both as static (`○`) or prerendered. No type errors.

- [ ] **Step 4: Manually verify in the browser**

Run: `npm run dev`
Then open `http://localhost:3000` and `http://localhost:3000/cennik`. Confirm by eye against the originals in `legacy/`:
- Hero, all landing sections render in order; fonts are Poppins/Lato; colors match the warm palette.
- Offer tabs switch private/business; FAQ items open/close single-at-a-time; contact form flips to "Dziękujemy" and back.
- Mobile (narrow the window < 920px): hamburger menu opens/closes; floating call button appears.
- `/cennik` shows all 9 category cards; "Zobacz pełny cennik →" on the landing navigates here; "Napisz do nas" returns to `/#kontakt`.

Stop the dev server when done (Ctrl-C).

- [ ] **Step 5: Final commit**

```bash
git add app/icon.png
git commit -m "chore: add favicon and finalize Next.js migration"
```

---

## Self-Review (completed by plan author)

**1. Spec coverage** — every section of both source pages maps to a task:

| Source section | Task |
|---|---|
| Header + mobile menu | 4 |
| Hero (klasyczny) | 6 |
| O nas | 7 |
| Dlaczego my (8 cards) | 7 |
| Oferta (tabs, 12+7 services, 12 add-ons) | 8 |
| Współpraca (5 steps) | 9 |
| Wycena (9 factors) | 9 |
| Cennik zajawka (6 prices) | 10 |
| Obszar działania | 10 |
| Opinie (3) | 11 |
| FAQ (5, single-open) | 12 |
| Kontakt + mock form (10 options) | 13 |
| Footer + mobile call button | 5 |
| Cennik page (9 categories, 57 items) | 15 |
| Fonts, tokens, favicon, metadata | 1, 16 |

Dropped intentionally per decisions: hero variants B/C, `Tlo - propozycje*` pages, real form backend.

**2. Placeholder scan** — no TBD/TODO/"add error handling"/"similar to". All copy is verbatim from source; all code blocks are complete and runnable.

**3. Type consistency** — `Service`, `PriceRow`, `PriceItem`, `PricingCategory`, `FaqItem`, `Testimonial`, `NavLink` are each defined once and imported where used. `site`/`navLinks`/`pricingCategories` etc. names match between data modules, components, and tests. Color/font utility names match the Task 1 `@theme` tokens throughout. Tab state union `"private" | "business"` is consistent between `Offer.tsx` and its test.

**Known fidelity simplifications (intentional, to keep the rewrite maintainable):** per-card decorative SVG icons in Offer/WhyUs/Cennik and the small floating decorative SVGs (circles, sparkles, broom/spray sketches) are replaced with a uniform `✦` accent mark or omitted. Content, layout, colors, and typography are faithful; ornamental flourishes are not reproduced one-for-one. If pixel-exact decoration is required, lift the original inline `<svg>` blocks from `legacy/` into the matching components.
