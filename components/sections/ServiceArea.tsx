import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ServiceAreaGraphic } from "@/components/sections/ServiceAreaGraphic";

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
          <ServiceAreaGraphic />
        </div>
      </div>
    </section>
  );
}
