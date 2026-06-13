import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { site } from "@/data/site";

const paragraphs = [
  "Cleaning Service Konin to marka stworzona dla klientów, którzy oczekują realnego efektu, a nie tylko powierzchownego sprzątania. Stawiamy na rzetelność, dokładność, uczciwe podejście i usługę dopasowaną do konkretnych potrzeb.",
  "Działamy konkretnie, sprawnie i z wyczuciem. Zależy nam nie tylko na samym porządku, ale też na komforcie współpracy — żeby klient od początku wiedział, czego może się spodziewać.",
  "Obsługujemy mieszkania, domy, biura, lokale użytkowe, domki letniskowe, apartamenty na wynajem, obiekty noclegowe, hotele, kampery, a także nagrobki i inne przestrzenie wymagające profesjonalnego podejścia do czystości i estetyki.",
];

export function About() {
  return (
    <section
      id="o-nas"
      data-screen-label="O nas"
      className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(32px,5vw,64px)] px-6 py-[clamp(48px,8vw,96px)]"
    >
      <div className="relative flex aspect-[4/3.4] items-center justify-center rounded-3xl border border-line-soft bg-[repeating-linear-gradient(45deg,#F4ECE3_0_14px,#F9F3EC_14px_28px)]">
        <span className="rounded-lg border border-dashed border-line-hover bg-cream px-3.5 py-2 font-mono text-xs text-faint">
          zdjęcie: zespół / wnętrze
        </span>
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
      </div>
    </section>
  );
}
