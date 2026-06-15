import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section
      id="opinie"
      data-screen-label="Opinie"
      className="relative mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]"
    >
      <svg
        width="72"
        height="64"
        viewBox="0 0 72 64"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-11"
      >
        <g stroke="#DCC9B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="42" y="26" width="18" height="30" rx="5" />
          <path d="M47 26v-8h8v8" />
          <path d="M47 18h-9v5h4" />
          <path d="M38 19.5h-4" />
        </g>
        <g stroke="#DCC9B6" strokeWidth="1.3" strokeLinecap="round">
          <path d="M30 13l-5 -3" />
          <path d="M29 19.5h-6" />
          <path d="M30 26l-5 3" />
        </g>
        <circle cx="17" cy="9" r="1.5" stroke="#DCC9B6" strokeWidth="1.3" />
        <circle cx="13" cy="19.5" r="1.8" stroke="#DCC9B6" strokeWidth="1.3" />
        <circle cx="17" cy="30" r="1.3" stroke="#DCC9B6" strokeWidth="1.3" />
      </svg>
      <div data-reveal-item className="flex flex-col items-center gap-3.5 text-center">
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
            data-reveal-item
            className="u-lift relative flex flex-col gap-3.5 overflow-hidden rounded-[18px] border border-line bg-white p-7"
          >
            <svg
              width="44"
              height="34"
              viewBox="0 0 44 34"
              fill="none"
              aria-hidden="true"
              className="absolute right-5 top-[18px] opacity-50"
            >
              <path
                d="M8 28c-3-2.5-4.5-6-4.5-10C3.5 11 8 5.5 15 4l1.5 3.5c-4 1.5-6.5 4-7 7 .5-.3 1.3-.5 2.3-.5 3.4 0 6 2.6 6 6s-2.7 6-6.2 6c-1.3 0-2.5-.3-3.6-1z"
                stroke="#DCC9B6"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M29 28c-3-2.5-4.5-6-4.5-10 0-7 4.5-12.5 11.5-14l1.5 3.5c-4 1.5-6.5 4-7 7 .5-.3 1.3-.5 2.3-.5 3.4 0 6 2.6 6 6s-2.7 6-6.2 6c-1.3 0-2.5-.3-3.6-1z"
                stroke="#DCC9B6"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[15px] tracking-[3px] text-accent">★★★★★</span>
            <p className="m-0 font-body text-[15px] italic leading-[1.7] text-quiet">
              „{t.quote}”
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
