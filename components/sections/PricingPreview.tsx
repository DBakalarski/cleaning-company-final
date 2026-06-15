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
      <div className="relative mx-auto flex w-full max-w-[760px] flex-col gap-3.5 overflow-hidden rounded-[22px] border border-line bg-white p-[clamp(26px,3.5vw,42px)]">
        <svg
          width="72"
          height="64"
          viewBox="0 0 72 64"
          fill="none"
          aria-hidden="true"
          className="absolute right-4 top-3.5 opacity-70"
        >
          <g stroke="#EBDDCE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="42" y="26" width="18" height="30" rx="5" />
            <path d="M47 26v-8h8v8" />
            <path d="M47 18h-9v5h4" />
            <path d="M38 19.5h-4" />
          </g>
          <g stroke="#EBDDCE" strokeWidth="1.3" strokeLinecap="round">
            <path d="M30 13l-5 -3" />
            <path d="M29 19.5h-6" />
            <path d="M30 26l-5 3" />
          </g>
          <circle cx="17" cy="9" r="1.5" stroke="#EBDDCE" strokeWidth="1.3" />
          <circle cx="13" cy="19.5" r="1.8" stroke="#EBDDCE" strokeWidth="1.3" />
          <circle cx="17" cy="30" r="1.3" stroke="#EBDDCE" strokeWidth="1.3" />
        </svg>
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
          className="u-press mt-3 self-center rounded-full bg-ink px-[30px] py-[15px] font-heading text-[15px] font-semibold text-white no-underline transition-colors hover:bg-accent"
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
