import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { whyUsCards } from "@/data/whyUs";

export function WhyUs() {
  return (
    <section
      data-screen-label="Dlaczego my"
      className="relative overflow-hidden bg-sand"
    >
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
      <div className="relative mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(48px,7vw,90px)]">
        <div data-reveal-item className="flex flex-col gap-3.5">
          <SectionEyebrow label="Dlaczego my" />
          <h2 className="m-0 max-w-[640px] font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
            Liczy się efekt — i komfort współpracy
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
          {whyUsCards.map((card) => (
            <div
              key={card}
              data-reveal-item
              className="flex items-start gap-3 rounded-2xl border border-line bg-cream p-6"
            >
              <span className="mt-0.5 font-heading text-lg font-semibold text-accent">
                ✦
              </span>
              <span className="font-heading text-[15.5px] font-semibold leading-[1.4] text-ink">
                {card}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
