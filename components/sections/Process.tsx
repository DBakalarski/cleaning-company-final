import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section id="wspolpraca" data-screen-label="Współpraca" className="bg-ink">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]">
        <div className="flex flex-col gap-3.5">
          <SectionEyebrow label="Jak wygląda współpraca" />
          <h2 className="m-0 max-w-[640px] font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-white text-balance">
            Od kontaktu do efektu — w pięciu krokach
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
          {processSteps.map((step, index) => {
            const last = index === processSteps.length - 1;
            return (
              <div
                key={step}
                className={`flex flex-col gap-3.5 rounded-[18px] p-6 ${
                  last
                    ? "border border-accent bg-ink-soft/40"
                    : "border border-ink-soft bg-ink-soft/20"
                }`}
              >
                <span className="font-heading text-[26px] font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="m-0 font-body text-[15px] leading-[1.6] text-line-hover">
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
