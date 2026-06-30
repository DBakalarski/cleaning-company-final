"use client";

import { useEffect, useRef, useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { testimonials, type Testimonial } from "@/data/testimonials";

const COUNT = testimonials.length;
// Desktop marquee renders the list twice so translateX(-50%) loops seamlessly.
const desktopItems = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="relative flex h-full w-full flex-col gap-3.5 overflow-hidden rounded-[18px] border border-line bg-white p-7">
      <svg
        width="44"
        height="34"
        viewBox="0 0 44 34"
        fill="none"
        aria-hidden="true"
        className="absolute right-5 top-[18px] opacity-50"
      >
        <path
          d="M8 28c-3-2.5-4.5-6-4.5-10C3.5 11 8 5.5 15 4l1.5 3.5c-4 1.5-6.5 4-7 7 .5-.3 1.3-.5 2.3-.5 3.4 0 6 2.6 6 6s-2.7 6-6.2 6c-1.3 0-2.5-.3-3.6-1z"
          stroke="#DCC9B6"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M29 28c-3-2.5-4.5-6-4.5-10 0-7 4.5-12.5 11.5-14l1.5 3.5c-4 1.5-6.5 4-7 7 .5-.3 1.3-.5 2.3-.5 3.4 0 6 2.6 6 6s-2.7 6-6.2 6c-1.3 0-2.5-.3-3.6-1z"
          stroke="#DCC9B6"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[15px] tracking-[3px] text-accent">★★★★★</span>
      <blockquote className="m-0 font-body text-[15px] italic leading-[1.7] text-quiet">
        „{t.quote}”
      </blockquote>
      <figcaption className="mt-auto font-heading text-[13.5px] font-semibold text-faint">
        {t.author}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // Mobile carousel: a native scroll-snap track, so swiping works for free.
  // We auto-advance it and mirror the centred card in the dot indicators.
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const mobileMq = window.matchMedia("(max-width: 767px)");
    let intervalId: number | undefined;
    let raf = 0;

    // Step exactly one card forward, wrapping back to the start. We read the
    // live scrollLeft each tick so a manual swipe never fights the timer.
    const advance = () => {
      const max = el.scrollWidth - el.clientWidth;
      const atEnd = el.scrollLeft >= max - 4;
      el.scrollTo({
        left: atEnd ? 0 : el.scrollLeft + el.clientWidth,
        behavior: atEnd ? "auto" : "smooth",
      });
    };

    const startAuto = () => {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = undefined;
      // Auto-advance on mobile. We deliberately keep advancing even under
      // reduced-motion (e.g. iOS Low Power Mode) because the carousel is the
      // intended behaviour here — the scroll itself is a gentle slide.
      if (mobileMq.matches) {
        intervalId = window.setInterval(advance, 4500);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(el.scrollLeft / el.clientWidth);
        setActive(Math.max(0, Math.min(COUNT - 1, i)));
      });
    };

    // Pause auto-advance while the user is interacting, then give them a fresh
    // interval so the carousel doesn't yank the card out from under them.
    const onPointerDown = () => {
      if (intervalId) window.clearInterval(intervalId);
      intervalId = undefined;
    };
    const onPointerUp = () => startAuto();

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    mobileMq.addEventListener("change", startAuto);

    startAuto();
    return () => {
      if (intervalId) window.clearInterval(intervalId);
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      mobileMq.removeEventListener("change", startAuto);
    };
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section
      id="opinie"
      data-screen-label="Opinie"
      className="relative mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]"
    >
      <svg
        width="72"
        height="64"
        viewBox="0 0 72 64"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-11"
      >
        <g stroke="#DCC9B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="42" y="26" width="18" height="30" rx="5" />
          <path d="M47 26v-8h8v8" />
          <path d="M47 18h-9v5h4" />
          <path d="M38 19.5h-4" />
        </g>
        <g stroke="#DCC9B6" strokeWidth="1.3" strokeLinecap="round">
          <path d="M30 13l-5 -3" />
          <path d="M29 19.5h-6" />
          <path d="M30 26l-5 3" />
        </g>
        <circle cx="17" cy="9" r="1.5" stroke="#DCC9B6" strokeWidth="1.3" />
        <circle cx="13" cy="19.5" r="1.8" stroke="#DCC9B6" strokeWidth="1.3" />
        <circle cx="17" cy="30" r="1.3" stroke="#DCC9B6" strokeWidth="1.3" />
      </svg>
      <div data-reveal-item className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Opinie" centered />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Zadowolenie klientów to nasza najlepsza reklama
        </h2>
        <p className="m-0 max-w-[540px] font-body text-base leading-[1.7] text-muted text-pretty">
          Najlepiej o usłudze mówią ci, którzy już z niej skorzystali.
        </p>
      </div>

      <div data-reveal-item>
        {/* Desktop / tablet: continuous marquee, ~3 cards visible. */}
        <div
          role="group"
          aria-roledescription="karuzela"
          aria-label="Opinie klientów"
          className="marquee marquee-viewport relative -mx-6 hidden px-6 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] md:block"
        >
          <ul className="marquee-track flex w-max list-none p-0">
            {desktopItems.map((t, i) => (
              <li
                key={`d-${t.author}-${i}`}
                aria-hidden={i >= COUNT}
                className="w-[clamp(284px,82vw,360px)] shrink-0 pr-5"
              >
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile: swipeable scroll-snap carousel, one card at a time, with dots. */}
        <div className="md:hidden">
          <ul
            ref={scrollerRef}
            role="group"
            aria-roledescription="karuzela"
            aria-label="Opinie klientów"
            className="flex snap-x snap-mandatory list-none overflow-x-auto p-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => (
              <li
                key={`m-${t.author}-${i}`}
                className="flex shrink-0 grow-0 basis-full snap-center px-1.5"
              >
                <TestimonialCard t={t} />
              </li>
            ))}
          </ul>

          <div className="mt-5 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={`dot-${t.author}-${i}`}
                type="button"
                aria-label={`Przejdź do opinii ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-accent" : "w-2 bg-line-mid"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
