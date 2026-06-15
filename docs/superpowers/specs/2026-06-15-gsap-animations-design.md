# Animacje strony (GSAP) — spec projektowy

Data: 2026-06-15
Status: zatwierdzony do planu implementacji

## Cel

Strona ma być wyraźnie „żywsza": animacje wejścia sekcji przy scrollowaniu, sekwencyjne
wejście Hero, mikrointerakcje na kartach i przyciskach oraz płynne stany UI (nagłówek,
FAQ, zakładki oferty, menu mobilne). Natężenie ruchu: **Poziom 2 — średni** (wybrany przez
użytkownika na żywym demie). Zakres: **obie strony** — `/` (landing) i `/cennik`.

## Decyzje (ustalone)

- **Silnik: GSAP** (`gsap` + `@gsap/react`). Świadomy wybór użytkownika podyktowany planem
  **bardziej złożonych animacji w przyszłości** (parallax/scrub, osie czasu). Budujemy od
  razu na jednym systemie, by przyszła praca była przyrostowa.
- **Natężenie: Poziom 2.** GSAP daje lepszy silnik i gotowość na przyszłość — **nie** zwiększa
  natężenia. Obowiązują wartości z zaakceptowanego demo (patrz „Parametry").
- **Zakres: obie strony, pełny pakiet efektów** (lista niżej).

## Architektura

Zasada **server-first zostaje zachowana**. GSAP zamknięty w cienkich komponentach klienckich;
sekcje pozostają React Server Components i są przekazywane przez `children`.

1. **`components/anim/AnimationProvider.tsx`** (`"use client"`)
   - Rejestruje integrację `useGSAP` raz na poziomie modułu (`gsap.registerPlugin(useGSAP)`).
   - Centralizuje obsługę `prefers-reduced-motion` (np. `gsap.matchMedia()`), z której
     korzystają `Reveal`/`HeroMotion`.
   - Owija drzewo w `app/layout.tsx`.
   - (Klasę-gate `anim-ready` ustawia osobny, malutki skrypt inline w `<head>` — patrz
     „Odporność bez JS" — żeby uniknąć mignięcia treści.)

2. **`components/anim/Reveal.tsx`** (`"use client"`)
   - Owija dowolny blok; gdy wjedzie w widok, odpala animację wejścia (GSAP) i ustawia stan
     „pokazany". Animacja odpala się **raz**.
   - Propsy: `direction` (`up` domyślnie / `left` / `right`), `delay`, `stagger?` (sekwencyjne
     pojawianie się dzieci oznaczonych `data-reveal-item`), `className`, `as?` (element).
   - **Wyzwalanie przez IntersectionObserver** — patrz „Niezawodność".
   - Honoruje `prefers-reduced-motion` (treść od razu widoczna, bez ruchu).

3. **`components/anim/HeroMotion.tsx`** (`"use client"`)
   - Wrapper Hero: oś czasu wejścia (eyebrow → h1 → opis → CTA → ewentualne badge'y, ze
     staggerem). Odpala się **od razu po wejściu na stronę** (Hero jest nad linią zgięcia —
     IntersectionObserver wyzwala natychmiast).
   - Cele wskazywane przez `data-*`/klasy w `Hero.tsx` (ciche hooki, bez zmiany wyglądu).

## Niezawodność (lekcja z porzuconej próby)

Poprzednie podejście (`feat/gsap-animations`) używało **ScrollTrigger** do wyzwalania reveal-i
i miało problem „czasem działa, czasem nie" — przez przeliczanie pozycji startowych przed
dojściem fontów/obrazów (SSR + hydration + StrictMode). Próba `ScrollTrigger.refresh()` nie
wystarczyła; branch ostatecznie przeszedł na **IntersectionObserver**.

Wnioski wcielone w ten projekt:

- **Reveal-e wyzwalamy przez IntersectionObserver** (odporne na reflow fontów/obrazów, SSR i
  StrictMode), a samą animację (tweeny, easing, stagger) realizuje GSAP. To łączy
  niezawodność wyzwalania z silnikiem GSAP.
- **ScrollTrigger NIE jest potrzebny w tym zakresie** (Poziom 2 nie ma efektów „scrubowanych
  scrollem"). Zostaje zarezerwowany dla **przyszłych** złożonych animacji (parallax/scrub) i
  wpasuje się w tę samą architekturę. Rejestrujemy go dopiero, gdy powstanie pierwszy taki efekt.

## Podział: GSAP vs CSS

- **GSAP** — choreografia *wejść*: reveal sekcji, stagger kart, oś czasu Hero.
- **CSS (transitions)** — *mikrointerakcje i stany*: hover-lift kart, press przycisków,
  zmniejszenie nagłówka na scroll, rozwijanie FAQ, crossfade zakładek oferty, wysuwanie menu
  mobilnego. To stany sterowane atrybutem/klasą — CSS jest tu prostszy, lżejszy i niezawodny
  (zgodnie z dobrymi praktykami: GSAP do orkiestracji, CSS do stanów).

## Zakres efektów (oba strony)

1. **Reveal sekcji przy scrollu** — `app/page.tsx` i `app/cennik/page.tsx`: każda sekcja
   owinięta w `<Reveal>` (fade + slide-up).
2. **Stagger kart** — sekcje z powtarzalnymi kafelkami dostają `data-reveal-item` na kartach:
   WhyUs, Offer, Process, Testimonials, PricingPreview, ServiceArea (oraz odpowiedniki na
   `/cennik`). Karty pojawiają się po kolei.
3. **Wejście Hero** — `HeroMotion` + hooki w `Hero.tsx` (sekwencja eyebrow → tytuł → opis → CTA).
4. **Nagłówek na scroll** — `Header.tsx` (już kliencki): stan `scrolled` → subtelne zmniejszenie
   paska + delikatny cień (CSS).
5. **Hover kart** — uniesienie + cień (CSS), ~0.2 s.
6. **Przyciski** — hover (uniesienie + cień) i press (`scale(.97)`), CSS.
7. **FAQ** — płynne rozwijanie/zamykanie (`grid-template-rows: 0fr → 1fr`), CSS, `Faq.tsx`.
8. **Zakładki oferty** — miękki crossfade panelu prywatne/biznes (CSS), `Offer.tsx`.
9. **Menu mobilne** — wysuwanie/zanikanie (transform + opacity), CSS, `Header.tsx`.

## Parametry (Poziom 2)

Wartości tokenów (w `app/globals.css` jako custom properties, jedno miejsce do strojenia):

- Wejścia (GSAP): `ease: power3.out`, `duration: ~0.6–0.7 s`, dystans `y: 30 px`,
  `autoAlpha 0 → 1`.
- Stagger między elementami: `~0.09 s`.
- Hover kart (CSS): `transform: translateY(-6px)` + cień, `~0.2 s ease`.
- Przycisk (CSS): hover `translateY(-2px)` + cień; press `scale(.97)`, `~0.12 s`.
- Nagłówek scrolled (CSS): zmiana paddingu + cień, `~0.2 s`.
- FAQ / menu (CSS): `~0.3 s` z miękkim easing.

## Dostępność

`@media (prefers-reduced-motion: reduce)` oraz `gsap.matchMedia()`:

- GSAP nie odpala animacji wejścia — treść od razu widoczna (`autoAlpha: 1`, brak przesunięć).
- CSS: hover/press/scroll/akordeon/menu bez ruchu lub natychmiastowe (bez `transition`).

## Odporność bez JS

Stan ukryty (opacity/transform) obowiązuje **tylko** pod klasą `anim-ready` na `<html>`.
Klasę tę ustawia malutki skrypt inline w `<head>` (`app/layout.tsx`) **przed pierwszym
malowaniem** — dzięki czemu nie ma mignięcia „treść widoczna → ukryta → animowana". Bez JS
klasa nie powstaje → cała treść jest od razu widoczna i użyteczna. Dodatkowo `Reveal`/
`HeroMotion` mają zabezpieczenie: gdy `IntersectionObserver` jest niedostępny lub aktywne
jest reduced-motion, treść pokazywana jest natychmiast (nigdy nie „utknie" ukryta).

## Zakres plików (orientacyjnie)

- **Nowe:** `components/anim/{AnimationProvider,Reveal,HeroMotion}.tsx` (+ testy).
- **Edytowane:** `app/layout.tsx` (provider), `app/page.tsx` + `app/cennik/page.tsx` (owijanie
  sekcji), `app/globals.css` (tokeny + reguły ukrycia/pokazania + mikrointerakcje + reduced
  motion), `components/sections/Hero.tsx` (hooki), sekcje z kartami (`data-reveal-item`),
  `components/layout/Header.tsx` (scroll + menu), `components/sections/Faq.tsx` (akordeon),
  `components/sections/Offer.tsx` (zakładki), `package.json` (zależności `gsap`, `@gsap/react`),
  `vitest.setup.ts` (mocki).

## Testy

- `npm test` (vitest) musi przechodzić — istniejące testy sekcji nie mogą się zepsuć. `Reveal`
  renderuje `children`, więc treść widziana w testach pozostaje. W razie potrzeby drobne
  dostosowania testów DOM.
- W `vitest.setup.ts`: mocki `IntersectionObserver` i `matchMedia` (jsdom ich nie ma);
  zarejestrowane w `vitest.config.ts` (`setupFiles`).
- Nowe testy: `Reveal` renderuje dzieci i jest odporny bez IO/przy reduced motion.
- `npm run build` i `npm run lint` bez błędów.

## Poza zakresem (YAGNI)

- **Brak przełącznika wariantów** A/B (`?anim=...`) z poprzedniej próby — natężenie zablokowane
  na Poziomie 2 (jeden wariant).
- **Brak ScrollTrigger** w tej iteracji (rezerwa na przyszłe animacje scrubowane).
- **Brak liczników/animowanego tła** itp. — to ewentualnie przyszłe, „złożone" animacje.

## Na przyszłość (poza tą iteracją)

Złożone animacje (parallax/scrub przez ScrollTrigger, rozbudowane osie czasu) wpasują się w
tę architekturę: rejestracja `ScrollTrigger` w `AnimationProvider` + użycie w dedykowanych
komponentach klienckich. Wtedy też dojdzie `ScrollTrigger.refresh()` po
`document.fonts.ready`/`load` (potrzebne dla pozycji ScrollTrigger — nie dla reveal-i przez
IntersectionObserver). Ten projekt kładzie pod to fundament.
