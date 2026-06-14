import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { pricingPreview } from "@/data/pricingPreview";

export function PricingPreview() {
  return (
    <section
      id="cennik"
      data-screen-label="Cennik zajawka"
      className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 pb-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Cennik" centered />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Orientacyjne ceny wybranych usług
        </h2>
        <p className="m-0 max-w-[540px] font-body text-base leading-[1.7] text-muted text-pretty">
          Kilka przykładowych pozycji z naszego cennika usług dodatkowych i
          specjalistycznych.
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-[760px] flex-col gap-3.5 rounded-[22px] border border-line bg-white p-[clamp(26px,3.5vw,42px)]">
        {pricingPreview.map((row) => (
          <div key={row.label} className="flex items-baseline gap-3">
            <span className="font-body text-[15px] leading-[1.5] text-quiet">
              {row.label}
            </span>
            <span className="min-w-5 flex-1 border-b border-dotted border-line-mid" />
            <span className="whitespace-nowrap font-heading text-[14.5px] font-semibold">
              {row.price}
            </span>
          </div>
        ))}
        <Link
          href="/cennik"
          className="mt-3 self-center rounded-full bg-ink px-[30px] py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
        >
          Zobacz pełny cennik →
        </Link>
        <span className="self-center font-body text-[12.5px] text-faint">
          Ceny orientacyjne — ostateczna wycena zawsze ustalana indywidualnie.
        </span>
      </div>
    </section>
  );
}
