import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallButton } from "@/components/layout/MobileCallButton";
import { BeforeAfterCard } from "@/components/efekty/BeforeAfterCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { site } from "@/data/site";
import { beforeAfterPairs } from "@/data/beforeAfter";
import { Reveal } from "@/components/anim/Reveal";
import { SketchUnderline } from "@/components/anim/SketchUnderline";

export const metadata: Metadata = {
  title: "Efekty — metamorfozy sprzątania | Cleaning Service Konin",
  description:
    "Zobacz efekty naszej pracy — zdjęcia przed i po sprzątaniu. Realne metamorfozy kuchni, łazienek i powierzchni z Konina i okolic.",
};

export default function EfektyPage() {
  return (
    <>
      <Header />
      <main className="min-w-[320px] overflow-x-clip">
        <Reveal>
          <section className="relative overflow-hidden border-y border-line-soft bg-sand">
            <div className="relative mx-auto flex max-w-[1180px] flex-col gap-3.5 px-6 py-[clamp(48px,7vw,90px)]">
              <SectionEyebrow label="Efekty" />
              <h1 className="m-0 max-w-[760px] font-heading text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.15] tracking-[-0.8px] text-balance">
                Zobacz nasze{" "}
                <span className="relative inline-block">
                  metamorfozy
                  <SketchUnderline
                    d="M3 9 C 28 3, 62 2.5, 78 5.5 S 122 9.5, 137 4"
                    className="absolute -bottom-2.5 left-[1%] h-3 w-[96%]"
                  />
                </span>
              </h1>
              <p className="m-0 max-w-[680px] font-body text-base leading-[1.75] text-muted text-pretty">
                Te same powierzchnie przed i po naszej pracy. Najedź kursorem lub
                dotknij zdjęcia, aby zobaczyć efekt. To realne zlecenia z Konina i
                okolic — bez retuszu, sam efekt dokładnego sprzątania.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal stagger>
          <section className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-start gap-[22px] px-6 py-[clamp(40px,6vw,72px)]">
            {beforeAfterPairs.map((pair) => (
              <BeforeAfterCard key={pair.before} pair={pair} />
            ))}
          </section>
        </Reveal>

        <Reveal>
          <section className="relative overflow-hidden bg-ink">
            <div className="pointer-events-none absolute -bottom-[110px] -right-20 h-[330px] w-[380px] bg-[radial-gradient(ellipse_at_center,rgba(190,150,120,0.16),transparent_65%)]" />
            <div className="pointer-events-none absolute -left-[100px] -top-[120px] h-[320px] w-[360px] bg-[radial-gradient(ellipse_at_center,rgba(190,150,120,0.10),transparent_65%)]" />
            <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 py-[clamp(48px,7vw,90px)] text-center">
              <h2 className="m-0 font-heading text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-white text-balance">
                Chcesz taki sam efekt u siebie?
              </h2>
              <p className="m-0 max-w-[540px] font-body text-base leading-[1.75] text-line-hover text-pretty">
                Wyślij zdjęcia pomieszczeń lub krótki opis zlecenia — przygotuję
                indywidualną wycenę dopasowaną do realnego zakresu prac.
              </p>
              <div className="mt-1.5 flex flex-wrap justify-center gap-3">
                <a
                  href="/#kontakt"
                  className="u-press rounded-full bg-accent px-[30px] py-4 font-heading text-[15px] font-semibold text-ink no-underline transition-colors hover:bg-white"
                >
                  Napisz do nas
                </a>
                <a
                  href={site.phoneHref}
                  className="u-press rounded-full border border-ink-soft px-[30px] py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:border-accent hover:text-accent"
                >
                  Zadzwoń: {site.phone}
                </a>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
      <MobileCallButton />
    </>
  );
}
