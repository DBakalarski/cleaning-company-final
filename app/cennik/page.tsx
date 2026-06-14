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
