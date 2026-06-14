import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ServiceArea() {
  return (
    <section
      data-screen-label="Obszar działania"
      className="border-y border-line-soft bg-sand"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(32px,5vw,64px)] px-6 py-[clamp(48px,7vw,80px)]">
        <div className="flex flex-col gap-4">
          <SectionEyebrow label="Obszar działania" />
          <h2 className="m-0 font-heading text-[clamp(26px,3vw,36px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
            Konin i okolice — do 100 km w każdą stronę
          </h2>
          <p className="m-0 font-body text-base leading-[1.75] text-muted text-pretty">
            Obsługujemy klientów prywatnych i firmowych na terenie Konina i
            okolic. Szczegóły dojazdu i realizacji ustalamy indywidualnie podczas
            kontaktu.
          </p>
        </div>
        <div className="flex justify-center py-3">
          <div className="relative flex aspect-square w-[clamp(220px,26vw,300px)] items-center justify-center rounded-full border border-dashed border-accent-soft">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#BE9678"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="absolute -top-[15px] left-1/2 -translate-x-1/2 bg-sand px-[3px]"
            >
              <path d="M12 21c4-4.3 6-7.6 6-10.4a6 6 0 1 0-12 0C6 13.4 8 16.7 12 21z" />
              <circle cx="12" cy="10.5" r="2.2" />
            </svg>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              aria-hidden="true"
              className="absolute bottom-[8%] left-[2%]"
            >
              <circle cx="10" cy="10" r="6" stroke="#BE9678" strokeWidth="1.3" opacity="0.8" />
              <circle cx="19" cy="19" r="3" stroke="#C9A98F" strokeWidth="1.3" opacity="0.7" />
            </svg>
            <div className="flex aspect-square w-[62%] items-center justify-center rounded-full border border-dashed border-accent">
              <div className="rounded-full bg-ink px-[26px] py-3 font-heading text-base font-semibold text-white">
                Konin
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
