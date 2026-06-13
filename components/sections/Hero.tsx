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
