import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { BeforeAfterCard } from "@/components/efekty/BeforeAfterCard";
import { beforeAfterPairs } from "@/data/beforeAfter";

// Tease the gallery on the landing page — first three metamorphoses, full set
// lives on /efekty (mirrors how PricingPreview links through to /cennik).
const previewPairs = beforeAfterPairs.slice(0, 3);

export function EfektyPreview() {
  return (
    <section
      id="efekty"
      data-screen-label="Efekty zajawka"
      className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Efekty" centered />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Zobacz nasze metamorfozy
        </h2>
        <p className="m-0 max-w-[540px] font-body text-base leading-[1.7] text-muted text-pretty">
          Te same powierzchnie po naszej pracy. Najedź kursorem lub dotknij
          zdjęcia, aby zobaczyć stan sprzed sprzątania.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] items-start gap-[22px]">
        {previewPairs.map((pair) => (
          <BeforeAfterCard
            key={pair.before}
            pair={pair}
            aspectClassName="aspect-square"
            prominentLabels
          />
        ))}
      </div>

      <Link
        href="/efekty"
        className="u-press self-center rounded-full bg-ink px-[30px] py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
      >
        Zobacz wszystkie efekty →
      </Link>
    </section>
  );
}
