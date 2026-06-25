import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { site } from "@/data/site";

const paragraphs = [
  "Za Cleaning Service Konin stoję ja — Sylwia. Stworzyłam tę markę dla klientów, którzy chcą sprzątania zrobionego rzetelnie, dokładnie i z uczciwym podejściem do ich potrzeb.",
  "Liczy się nie tylko porządek, ale i komfort współpracy — żebyś od początku wiedział, czego się spodziewać i miał poczucie, że oddajesz swoją przestrzeń w dobre ręce.",
];

const pillars = [
  {
    label: "Sprzątanie nieruchomości",
    desc: "domy, mieszkania, biura, obiekty na wynajem i noclegowe.",
  },
  {
    label: "Usługi specjalistyczne",
    desc: "pranie tapicerki, mycie okien, doczyszczanie AGD i fug.",
  },
  {
    label: "Miejsca pamięci",
    desc: "czyszczenie i pielęgnacja nagrobków oraz ich otoczenia.",
  },
];

export function About() {
  return (
    <section
      id="o-nas"
      data-screen-label="O nas"
      className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(32px,5vw,64px)] px-6 py-[clamp(48px,8vw,96px)]"
    >
      <div className="panel-surface relative flex aspect-[4/3.4] flex-col items-center justify-center gap-[clamp(14px,2.5vw,20px)] rounded-3xl border border-line-soft p-[clamp(28px,4vw,44px)] text-center">
        <svg
          width="84"
          height="84"
          viewBox="0 0 84 84"
          fill="none"
          aria-hidden="true"
          className="absolute -right-[18px] -top-[30px] z-[1]"
        >
          <circle cx="30" cy="32" r="17" stroke="#BE9678" strokeWidth="1.5" opacity="0.7" />
          <path d="M22 27a8.5 8.5 0 0 1 7.5-3" stroke="#BE9678" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
          <circle cx="56" cy="52" r="9" stroke="#C9A98F" strokeWidth="1.5" opacity="0.6" />
          <circle cx="42" cy="66" r="4" stroke="#BE9678" strokeWidth="1.4" opacity="0.5" />
        </svg>
        <span className="font-heading text-[clamp(34px,4vw,44px)] font-semibold leading-none text-accent">
          ✦
        </span>
        <p className="m-0 max-w-[320px] font-heading text-[clamp(19px,2.2vw,23px)] font-semibold leading-[1.35] tracking-[-0.4px] text-ink text-balance">
          {site.brandQuote}
        </p>
        <div className="absolute -bottom-4 left-5 rounded-full border border-line bg-cream px-[18px] py-2.5 font-heading text-[13px] font-semibold text-quiet shadow-[0_12px_32px_rgba(80,60,40,0.10)]">
          {site.area}
        </div>
      </div>
      <div className="flex flex-col gap-[18px]">
        <SectionEyebrow label="O nas" />
        <h2 className="m-0 font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Sprzątanie, za którym stoi jakość, estetyka i odpowiedzialność
        </h2>
        {paragraphs.map((p) => (
          <p
            key={p.slice(0, 24)}
            className="m-0 font-body text-base leading-[1.75] text-muted text-pretty"
          >
            {p}
          </p>
        ))}
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {pillars.map((p) => (
            <li
              key={p.label}
              className="font-body text-base leading-[1.6] text-muted text-pretty"
            >
              <span className="font-heading font-semibold text-ink">
                {p.label}
              </span>{" "}
              — {p.desc}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
