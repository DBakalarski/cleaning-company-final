# Strona „Efekty" — galeria przed/po

**Data:** 2026-06-29
**Trasa:** `/efekty`

## Cel

Nowa podstrona prezentująca metamorfozy sprzątania (zdjęcia przed → po) z odnośnikiem
w menu głównym. Spójna wizualnie i architektonicznie z resztą projektu.

## Zasoby

Cztery pary zdjęć (źródło: `before-after/`, `Na.jpg` = przed, `Nb.jpg` = po):

| Para | przed | po | wymiary | kadr |
|------|-------|-----|---------|------|
| 1 | 1a.jpg | 1b.jpg | 1200×1600 | kuchnia (zlew) |
| 2 | 2a.jpg | 2b.jpg | 900×1600 / 1539×1600 (różne) | kuchnia |
| 3 | 3a.jpg | 3b.jpg | 1148×2040 | łazienka/inne |
| 4 | 4a.jpg | 4b.jpg | 464×832 | — |

Pary mają różne proporcje (para 2 różni się nawet wewnątrz), więc karty używają stałego
kadru **3:4** z `object-cover` — overlay „po" idealnie pokrywa „przed".

Zdjęcia przenoszone do `public/efekty/` (Next serwuje statyki tylko z `public/`).

## Dane — `data/beforeAfter.ts`

Konwencja data/presentation (jak `data/offer.ts`):

```ts
export type BeforeAfterPair = {
  before: string;   // /efekty/1a.jpg
  after: string;    // /efekty/1b.jpg
  alt: string;      // opis PL dla a11y
  caption: string;  // ogólny podpis, np. "Kuchnia"
};
export const beforeAfterPairs: BeforeAfterPair[] = [ /* 4 pary */ ];
```

Podpisy ogólne i prawdziwe (np. „Kuchnia"). Bez wymyślania szczegółów.

## Komponent — `components/efekty/BeforeAfterCard.tsx`

Komponent **kliencki** (`"use client"`, wzorzec jak `Offer`/`Faq`).

- Domyślnie widoczne „Przed". Na hover (desktop) oraz tap (mobile, `useState`)
  płynnie pojawia się „Po" (przejście `opacity`).
- `next/image` z `fill` + `object-cover` w kontenerze `aspect-[3/4]`.
- Plakietki „Przed" / „Po" (token `accent`/`ink`), zaokrąglenia, `u-press`.
- Dostępność: karta jako `<button>` z `aria-label` opisującym przełączanie; podpis pod kadrem.

## Strona — `app/efekty/page.tsx`

Serwerowa, wzorzec `app/cennik/page.tsx`:

1. `Header`
2. `main.min-w-[320px].overflow-x-clip`
3. Hero w `Reveal`: `SectionEyebrow label="Efekty"` + nagłówek z `SketchUnderline`, akapit wprowadzający.
4. Siatka kart w `Reveal stagger` (`grid auto-fit minmax`), każda karta `data-reveal-item`.
5. Sekcja CTA `bg-ink` (jak w cenniku): „Chcesz taki efekt u siebie?" + przyciski kontakt/telefon (`site.phoneHref`, `site.phone`).
6. `Footer`, `MobileCallButton`.
7. `metadata` (title/description PL).

## Nawigacja

`data/navigation.ts`: dodać `{ label: "Efekty", href: "/efekty" }` **po „Opinie"**
(przed „FAQ"). Nowa kolejność: O nas, Oferta, Cennik, Współpraca, Opinie, **Efekty**, FAQ, Kontakt.

## Testy

- `data/data.test.ts`: zaktualizować asercję kolejności nav (8 linków) + dodać
  `expect(navLinks.find(l => l.label === "Efekty")?.href).toBe("/efekty")`.
- `data/data.test.ts` (lub obok): invariant `beforeAfterPairs` — 4 pary, każda ma
  niepuste `before`/`after`/`alt`, ścieżki zaczynają się od `/efekty/`.
- `components/efekty/BeforeAfterCard.test.tsx`: render pokazuje oba obrazy i podpis,
  tap przełącza stan (klasa/aria).

## Styl

Tokeny projektu (`cream`/`sand`/`ink`/`accent`, `font-heading`/`font-body`), `clamp()`,
`u-press`. Bez nowych zależności.
