# Hero & About — panele wizualne zamiast zdjęć

**Data:** 2026-06-14
**Status:** zatwierdzony do implementacji

## Problem

Sekcje `Hero` (`components/sections/Hero.tsx`) i `About` (`components/sections/About.tsx`) mają
placeholdery zdjęć: pasiasty panel (`repeating-linear-gradient`) z napisem „zdjęcie: …". Klient
nie dysponuje profesjonalnymi zdjęciami, więc placeholdery trzeba zastąpić panelami, które pasują do
ciepłej, „edytorskiej" stylistyki strony (tła `cream`/`sand`, akcent `#BE9678`, motyw ✦, odręczne SVG).

## Zakres

Tylko warstwa prezentacji w dwóch komponentach. Bez zmian w danych, layoutach stron, routingu czy
zależnościach. Zachowujemy istniejącą siatkę sekcji, pasiastą teksturę panelu, dekoracyjne „bąbelki" SVG
oraz pływające znaczki.

## Decyzje projektowe

### Hero — panel prawy (zastępuje placeholder w `Hero.tsx`)

Pionowy panel (zachowany `aspect-[4/4.6]`, pasiasta tekstura, `rounded-3xl`, `border-line-soft`),
wyśrodkowana zawartość od góry do dołu:

1. **Logo** — oryginalne `/logo-icon.png` przez `next/image`, powiększone (~150 px),
   `mix-blend-multiply` jak w nagłówku (`Header.tsx`).
2. **Wordmark** — „Cleaning Service Konin", `font-heading`, półgruby, dwie linie.
3. **Trzy chipy zaufania** (białe pigułki, `border-line`, ✦ w kolorze akcentu przy dwóch pierwszych):
   - „do 100 km"
   - „wycena indywidualna"
   - „klienci prywatni i firmy"
4. **Jeden pływający znaczek** (zachowany): biały kafelek „✦ Estetyczny efekt" w prawym górnym rogu,
   `shadow-[0_12px_32px_rgba(80,60,40,0.10)]`.
5. **Dekoracyjne SVG „bąbelki"** — pozostają bez zmian.

Usuwamy dotychczasowy dolny ciemny znaczek („Bez potrzeby poprawiania") i napis-placeholder, bo panel
nie udaje już zdjęcia. (Hasło „Bez poprawiania" pozostaje obecne w treści strony w innych miejscach —
nie jest tracone z punktu widzenia copy.)

### About — panel lewy (zastępuje placeholder w `About.tsx`)

Panel o proporcji `aspect-[4/3.4]` (zachowana), pasiasta tekstura, wyśrodkowana zawartość:

1. **Duże ✦** w kolorze akcentu na górze.
2. **Cytat marki** — „Realny efekt, nie powierzchowne sprzątanie." — `font-heading`, półgruby,
   wyśrodkowany, ograniczona szerokość.
3. **Chip obszaru** (zachowany) — `{site.area}` w lewym dolnym rogu panelu, `rounded-full`,
   z cieniem; bez zmian względem obecnego kodu.
4. **Dekoracyjne SVG „bąbelki"** — pozostają bez zmian.

## Niezmienne

- Tokeny kolorów i fontów z `app/globals.css` / `app/layout.tsx` (`accent`, `ink`, `muted`,
  `line-soft`, `font-heading` itd.) — używamy nazw, nie surowych hexów.
- Styl `clamp()` do płynnych rozmiarów tam, gdzie pasuje.
- Komponenty pozostają serwerowe (RSC) — nie wymagają interaktywności.
- `data/site.ts` jest źródłem dla obszaru działania (`site.area`).

## Testy

- `Hero.test.tsx` i `About.test.tsx`: zaktualizować asercje placeholderów. Placeholdery „zdjęcie: …"
  znikają; w to miejsce asercje na: obecność logo (alt), wordmark / chipy (Hero) oraz cytat i `site.area`
  (About). Sprawdzić, że nie ma już tekstu „zdjęcie:".
- Reszta zestawu (`npm test`) ma przechodzić bez zmian.

## Poza zakresem

- Pozyskanie/integracja realnych zdjęć.
- Zmiany w innych sekcjach, danych, czy stronie `/cennik`.
- Animacje (osobny, porzucony wątek na branchu `feat/gsap-animations`).
