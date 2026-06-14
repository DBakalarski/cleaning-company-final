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
