import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { whyUsCards } from "@/data/whyUs";

export function WhyUs() {
  return (
    <section data-screen-label="Dlaczego my" className="bg-sand">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(48px,7vw,90px)]">
        <div className="flex flex-col gap-3.5">
          <SectionEyebrow label="Dlaczego my" />
          <h2 className="m-0 max-w-[640px] font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
            Liczy się efekt — i komfort współpracy
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
          {whyUsCards.map((card) => (
            <div
              key={card}
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
