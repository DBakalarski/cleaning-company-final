import Image from "next/image";
import { site } from "@/data/site";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { HeroMotion } from "@/components/anim/HeroMotion";
import { SketchUnderline } from "@/components/anim/SketchUnderline";

const badges = [
  "Klienci prywatni i firmy",
  "Indywidualna wycena",
  "Do 100 km od Konina",
];

// Short-register trust claims for the hero panel chips. Intentionally overlaps
// with `badges` above (which uses fuller phrasing for the CTA footer) — keep both
// in sync if these claims change.
const trustChips = [
  { label: "do 100 km", spark: true },
  { label: "wycena indywidualna", spark: true },
  { label: "klienci prywatni i firmy", spark: true },
];

export function Hero() {
  return (
    <section
      data-screen-label="Hero"
      className="mx-auto grid min-h-[calc(100svh-5.5rem)] max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-start gap-[clamp(32px,5vw,64px)] px-6 pb-[clamp(24px,4vh,56px)] pt-[clamp(24px,4vh,48px)] max-md:[@media(max-height:760px)]:gap-5 max-md:[@media(max-height:760px)]:pt-3 lg:items-center"
    >
      <HeroMotion className="flex flex-col gap-[clamp(18px,2.4vh,48px)]">
        <div data-hero-el>
          <SectionEyebrow label="Usługi sprzątające • Konin i okolice" />
        </div>
        <h1 data-hero-el className="m-0 font-heading text-[clamp(32px,max(4.6vw,5vh),56px)] font-semibold leading-[1.12] tracking-[-1px] text-balance">
          Sprawnie. Dokładnie. Dyskretnie.{" "}
          <em className="relative inline-block not-italic text-accent">
            Przystępnie.
            <SketchUnderline
              d="M3 9 C 28 3, 62 2.5, 78 5.5 S 122 9.5, 137 4"
              className="absolute -bottom-3 left-[1%] h-3 w-[97%]"
              delay={0.9}
            />
          </em>
        </h1>
        <p data-hero-el className="m-0 max-w-[520px] font-body text-[clamp(16px,max(1.5vw,2vh),19px)] leading-[1.7] text-muted text-pretty">
          Sprzątanie dla klientów prywatnych i firm. Zakres prac dobieramy do
          rodzaju obiektu i efektu, jakiego oczekujesz.
        </p>
        <div data-hero-el className="mt-1.5 flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="u-press min-w-0 flex-1 rounded-full bg-ink px-4 py-4 text-center font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent sm:flex-none sm:px-[30px]"
            >
              Zamów wycenę
            </a>
            <a
              href="#oferta"
              className="u-press min-w-0 flex-1 rounded-full border border-line-hover bg-transparent px-4 py-[15px] text-center font-heading text-[15px] font-semibold text-ink no-underline transition-colors hover:border-ink hover:bg-white sm:flex-none sm:px-[30px]"
            >
              Zobacz ofertę
            </a>
          </div>
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 self-start px-2.5 py-[15px] font-heading text-[15px] font-semibold text-accent no-underline transition-colors hover:text-ink"
          >
            Zadzwoń → {site.phone}
          </a>
        </div>
        <div data-hero-el className="mt-2 flex flex-wrap gap-x-[22px] gap-y-2.5">
          {badges.map((badge) => (
            <span key={badge} className="font-body text-[13.5px] text-faint">
              ✦ {badge}
            </span>
          ))}
        </div>
      </HeroMotion>

      <div className="hidden lg:relative lg:mx-auto lg:block lg:w-full lg:max-w-[min(560px,calc(100svh-14rem))]">
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
        <div className="panel-surface flex aspect-square flex-col items-center justify-center gap-[clamp(16px,2.5vw,22px)] rounded-3xl border border-line-soft p-[clamp(28px,4vw,40px)] text-center">
          <Image
            src="/logo-icon.png"
            alt={site.name}
            width={300}
            height={300}
            className="h-auto w-[72%] max-w-[300px] mix-blend-multiply"
          />
          <span className="font-heading text-[clamp(28px,3.4vw,36px)] font-semibold leading-[1.15] tracking-[-0.4px] text-ink">
            {site.name}
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
    </section>
  );
}
