import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { pricingFactors } from "@/data/pricingInfo";
import { SketchUnderline } from "@/components/anim/SketchUnderline";

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
            <SketchUnderline
              d="M3 7 C 30 2, 70 2, 90 4.5 S 125 8, 137 3.5"
              viewBox="0 0 140 10"
              strokeWidth={2.2}
              className="absolute -bottom-2 left-0 h-2.5 w-full"
            />
          </span>
        </h2>
        <p className="m-0 font-body text-base leading-[1.75] text-muted text-pretty">
          Dzięki temu otrzymujesz uczciwą i konkretną wycenę, dopasowaną do
          rzeczywistego zakresu pracy — bez ukrytych kosztów i bez zgadywania.
        </p>
        <a
          href="#kontakt"
          className="u-press mt-1.5 self-start rounded-full bg-ink px-7 py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
        >
          Zamów bezpłatną wycenę
        </a>
      </div>
      <div className="flex flex-col gap-5 rounded-[20px] border border-line bg-white p-[30px]">
        <span className="font-heading text-[17px] font-semibold">
          Cena usługi zależy od:
        </span>
        <ul className="m-0 grid list-none grid-cols-1 gap-x-7 gap-y-3.5 p-0 sm:grid-cols-2">
          {pricingFactors.map((factor) => (
            <li
              key={factor}
              className="flex items-center gap-3 font-body text-[14.5px] leading-snug text-quiet"
            >
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-sand">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#BE9678"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4.2 4.3L19 7" />
                </svg>
              </span>
              {factor}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
