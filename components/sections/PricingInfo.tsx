import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { pricingFactors } from "@/data/pricingInfo";

export function PricingInfo() {
  return (
    <section
      id="wycena"
      data-screen-label="Wycena"
      className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(32px,5vw,64px)] px-6 py-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col gap-[18px]">
        <SectionEyebrow label="Wycena" />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Każda wycena ustalana jest{" "}
          <span className="relative inline-block">
            indywidualnie
            <svg
              viewBox="0 0 140 10"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute -bottom-2 left-0 h-2.5 w-full"
            >
              <path
                d="M3 7 C 30 2, 70 2, 90 4.5 S 125 8, 137 3.5"
                fill="none"
                stroke="#BE9678"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </span>
        </h2>
        <p className="m-0 font-body text-base leading-[1.75] text-muted text-pretty">
          Dzięki temu otrzymujesz uczciwą i konkretną wycenę, dopasowaną do
          rzeczywistego zakresu pracy — bez ukrytych kosztów i bez zgadywania.
        </p>
        <a
          href="#kontakt"
          className="mt-1.5 self-start rounded-full bg-ink px-7 py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
        >
          Zamów bezpłatną wycenę
        </a>
      </div>
      <div className="flex flex-col gap-[18px] rounded-[20px] border border-line bg-white p-[30px]">
        <span className="font-heading text-base font-semibold">
          Cena usługi zależy od:
        </span>
        <div className="flex flex-wrap gap-2">
          {pricingFactors.map((factor) => (
            <span
              key={factor}
              className="rounded-full bg-sand px-3.5 py-2 font-body text-[13.5px] text-quiet"
            >
              {factor}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
