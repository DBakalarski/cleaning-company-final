import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section
      id="opinie"
      data-screen-label="Opinie"
      className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Opinie" centered />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Zadowolenie klientów to nasza najlepsza reklama
        </h2>
        <p className="m-0 max-w-[540px] font-body text-base leading-[1.7] text-muted text-pretty">
          Dobra usługa broni się sama — ale nic nie buduje zaufania tak mocno
          jak opinie zadowolonych klientów.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {testimonials.map((t) => (
          <div
            key={t.author}
            className="flex flex-col gap-3.5 rounded-[18px] border border-line bg-white p-7"
          >
            <span className="text-[15px] tracking-[3px] text-accent">★★★★★</span>
            <p className="m-0 font-body text-[15px] italic leading-[1.7] text-quiet">
              „{t.quote}"
            </p>
            <span className="font-heading text-[13.5px] font-semibold text-faint">
              {t.author}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
