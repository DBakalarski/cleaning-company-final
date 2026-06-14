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
        <section className="relative overflow-hidden border-y border-line-soft bg-sand">
          <svg
            width="250"
            height="210"
            viewBox="0 0 250 210"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute -right-9 -top-4"
          >
            <g stroke="#DCCBB7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="160" y="98" width="52" height="86" rx="10" />
              <path d="M174 98v-22h24v22" />
              <path d="M174 76h-26v14h12" />
              <path d="M148 80l-12 0" />
            </g>
            <g stroke="#D3BCA2" strokeWidth="1.5" strokeLinecap="round">
              <path d="M124 62l-14 -8" />
              <path d="M122 80h-17" />
              <path d="M124 98l-14 8" />
            </g>
            <circle cx="88" cy="48" r="2.5" stroke="#D3BCA2" strokeWidth="1.5" />
            <circle cx="76" cy="80" r="3" stroke="#D3BCA2" strokeWidth="1.5" />
            <circle cx="88" cy="112" r="2" stroke="#D3BCA2" strokeWidth="1.5" />
            <circle cx="60" cy="62" r="1.8" stroke="#DCCBB7" strokeWidth="1.5" />
            <circle cx="58" cy="98" r="2.2" stroke="#DCCBB7" strokeWidth="1.5" />
          </svg>
          <div className="relative mx-auto flex max-w-[1180px] flex-col gap-3.5 px-6 py-[clamp(48px,7vw,90px)]">
            <SectionEyebrow label="Cennik" />
            <h1 className="m-0 max-w-[760px] font-heading text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.15] tracking-[-0.8px] text-balance">
              Cennik usług{" "}
              <span className="relative inline-block">
                dodatkowych
                <svg
                  viewBox="0 0 140 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -bottom-2.5 left-[1%] h-3 w-[96%]"
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
              </span>{" "}
              i specjalistycznych
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

        <section className="relative overflow-hidden bg-ink">
          <div className="pointer-events-none absolute -bottom-[110px] -right-20 h-[330px] w-[380px] bg-[radial-gradient(ellipse_at_center,rgba(190,150,120,0.16),transparent_65%)]" />
          <div className="pointer-events-none absolute -left-[100px] -top-[120px] h-[320px] w-[360px] bg-[radial-gradient(ellipse_at_center,rgba(190,150,120,0.10),transparent_65%)]" />
          <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 py-[clamp(48px,7vw,90px)] text-center">
            <h2 className="m-0 font-heading text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-white text-balance">
              Nie wiesz, jaki zakres wybrać?
            </h2>
            <p className="m-0 max-w-[540px] font-body text-base leading-[1.75] text-line-hover text-pretty">
              Wyślij zdjęcia pomieszczeń lub krótki opis zlecenia — przygotuję
              indywidualną wycenę dopasowaną do realnego zakresu prac.
            </p>
            <div className="mt-1.5 flex flex-wrap justify-center gap-3">
              <a
                href="/#kontakt"
                className="rounded-full bg-accent px-[30px] py-4 font-heading text-[15px] font-semibold text-ink no-underline transition-colors hover:bg-white"
              >
                Napisz do nas
              </a>
              <a
                href={site.phoneHref}
                className="rounded-full border border-ink-soft px-[30px] py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:border-accent hover:text-accent"
              >
                Zadzwoń: {site.phone}
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
