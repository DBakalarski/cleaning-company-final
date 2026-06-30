"use client";

import { useRef, useState, type ReactNode } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Reveal } from "@/components/anim/Reveal";
import {
  privateServices,
  privateAddons,
  businessServices,
  businessHighlight,
  type Service,
} from "@/data/offer";

const serviceIcons: Record<string, ReactNode> = {
  "Sprzątanie mieszkań i domów": (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6.5 9.5V19h11V9.5" />
      <path d="M10 19v-4.5h4V19" />
    </>
  ),
  "Sprzątanie cykliczne": (
    <>
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <polyline points="19.7,3.6 19.4,7.6 15.4,7.2" />
      <circle cx="12" cy="12" r="1.3" />
    </>
  ),
  "Sprzątanie jednorazowe": (
    <>
      <path d="M12 4l1.8 6.2L20 12l-6.2 1.8L12 20l-1.8-6.2L4 12l6.2-1.8z" />
      <path d="M18.5 4.5v3M17 6h3" />
    </>
  ),
  "Sprzątanie po remoncie": (
    <>
      <rect x="4" y="4.5" width="12" height="5" rx="1.5" />
      <path d="M16 7h3.5v4.5H12v2.5" />
      <rect x="10.8" y="16" width="2.4" height="4.5" rx="1" />
    </>
  ),
  "Mycie okien i przeszkleń": (
    <>
      <rect x="5" y="4.5" width="14" height="15" rx="1.5" />
      <path d="M12 4.5v15M5 12h14" />
      <path d="M7.2 9.6l2.2-2.2" />
    </>
  ),
  "Pranie tapicerki meblowej": (
    <>
      <path d="M7 11V8.5A2.5 2.5 0 0 1 9.5 6h5A2.5 2.5 0 0 1 17 8.5V11" />
      <path d="M5 17v-3.4a1.9 1.9 0 0 1 3.8 0v.9h6.4v-.9a1.9 1.9 0 0 1 3.8 0V17z" />
      <path d="M6.3 17v1.8M17.7 17v1.8" />
    </>
  ),
  "Pranie materacy": (
    <>
      <rect x="3.5" y="8.5" width="17" height="7" rx="2" />
      <path d="M8.5 8.5v7M15.5 8.5v7" />
      <path d="M5 18.5h14" />
    </>
  ),
  "Pranie wykładzin": (
    <>
      <rect x="6" y="6.5" width="12" height="11" rx="1" />
      <rect x="9" y="9.8" width="6" height="4.4" />
      <path d="M3.8 8h1.6M3.8 12h1.6M3.8 16h1.6M18.6 8h1.6M18.6 12h1.6M18.6 16h1.6" />
    </>
  ),
  "Sprzątanie domków letniskowych": (
    <>
      <path d="M4.5 12L11 6l6.5 6" />
      <path d="M6.5 10.3V18h9v-7.7" />
      <path d="M9.8 18v-3.6h2.4V18" />
      <circle cx="19" cy="5.5" r="1.8" />
    </>
  ),
  "Sprzątanie kamperów": (
    <>
      <path d="M3.5 15.5V9A1.5 1.5 0 0 1 5 7.5h8.5l4.5 4h1.5a1.5 1.5 0 0 1 1.5 1.5v2.5h-1.6" />
      <circle cx="8" cy="16.3" r="1.9" />
      <circle cx="16.5" cy="16.3" r="1.9" />
      <path d="M9.9 16.3h4.7" />
      <path d="M6.5 10.5h3.4v2H6.5z" />
    </>
  ),
  "Opieka nad grobami": (
    <>
      <rect x="9.5" y="10.5" width="5" height="8" rx="1.2" />
      <path d="M12 7.8c1.3-1.2 1.3-2.4 0-3.8-1.3 1.4-1.3 2.6 0 3.8z" />
      <path d="M12 7.8v2.7" />
      <path d="M6.5 18.5h11" />
    </>
  ),
  "Renowacja pomników z lastryko": (
    <>
      <path d="M9 17V8a3 3 0 0 1 6 0v9" />
      <path d="M6.8 17h10.4M5.5 19.5h13" />
      <path d="M12 9.5v4M10.5 11h3" />
    </>
  ),
  "Sprzątanie biur": (
    <>
      <path d="M6 20V4.5h8V20" />
      <path d="M14 9h4v11" />
      <path d="M8.7 8h2.4M8.7 11.5h2.4M8.7 15h2.4M16 12.5h.01M16 15.5h.01" />
      <path d="M4.5 20h15" />
    </>
  ),
  "Sprzątanie lokali użytkowych": (
    <>
      <path d="M5.4 9L6.6 5h10.8L18.6 9" />
      <path d="M5.4 9a2.15 2.15 0 0 0 4.3 0 2.15 2.15 0 0 0 4.3 0 2.15 2.15 0 0 0 4.3 0" />
      <path d="M6.2 11.6V19h11.6v-7.4" />
      <path d="M9.7 19v-4.2h4.6V19" />
    </>
  ),
  "Apartamenty i obiekty na wynajem": (
    <>
      <circle cx="8" cy="8.5" r="3.7" />
      <path d="M10.6 11.1L19.5 20" />
      <path d="M16.7 17.2l1.9-1.9M13.9 14.4l1.9-1.9" />
    </>
  ),
  "Odkurzanie i pranie wykładzin": (
    <>
      <path d="M6 17.5V8.2A3.2 3.2 0 0 1 9.2 5h0a3.2 3.2 0 0 1 3.2 3.2v9.3" />
      <circle cx="9.2" cy="8.2" r="1.1" />
      <path d="M15 8.5h4.5M15 12h4.5M15 15.5h4.5" />
      <path d="M4 19.5h16" />
    </>
  ),
  "Pranie tapicerki komercyjnej": (
    <>
      <path d="M7.5 10.5V8A2.5 2.5 0 0 1 10 5.5h4A2.5 2.5 0 0 1 16.5 8v2.5" />
      <path d="M5.5 16.5v-3.2a1.8 1.8 0 0 1 3.6 0v.7h5.8v-.7a1.8 1.8 0 0 1 3.6 0v3.2z" />
      <path d="M7 16.5v2M17 16.5v2" />
    </>
  ),
  "Sprzątanie obiektów noclegowych": (
    <>
      <path d="M3.5 18.5V11" />
      <path d="M3.5 14.5h17v4" />
      <circle cx="7.3" cy="11.8" r="1.6" />
      <path d="M11 11.8h6.5a3 3 0 0 1 3 3" />
      <path d="M17 4.2a2.8 2.8 0 1 0 3 3.9 3.3 3.3 0 0 1-3-3.9z" />
    </>
  ),
  "Sprzątanie kamperów dla firm": (
    <>
      <path d="M3.5 15.5V9A1.5 1.5 0 0 1 5 7.5h8.5l4.5 4h1.5a1.5 1.5 0 0 1 1.5 1.5v2.5h-1.6" />
      <circle cx="8" cy="16.3" r="1.9" />
      <circle cx="16.5" cy="16.3" r="1.9" />
      <path d="M9.9 16.3h4.7" />
      <path d="M6.5 10.5h3.4v2H6.5z" />
      <path d="M19.5 5.5l1.2 1.2M20.7 5.5l-1.2 1.2" />
    </>
  ),
};

function ServiceIcon({ title }: { title: string }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-line bg-[#f7f1ea]">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#BE9678"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {serviceIcons[title]}
      </svg>
    </span>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div data-reveal-item className="u-lift flex flex-col gap-2.5 rounded-[18px] border border-line bg-white p-6 transition-colors hover:border-accent">
      <div className="flex items-center gap-3.5">
        <ServiceIcon title={service.title} />
        <h4 className="m-0 font-heading text-[17px] font-semibold leading-[1.3] text-ink">
          {service.title}
        </h4>
      </div>
      <p className="m-0 font-body text-[14.5px] leading-[1.65] text-muted">
        {service.desc}
      </p>
    </div>
  );
}

// Groups services by their `group` label, preserving first-appearance order.
function groupServices(services: Service[]) {
  const groups: { group: string; items: Service[] }[] = [];
  for (const service of services) {
    let bucket = groups.find((g) => g.group === service.group);
    if (!bucket) {
      bucket = { group: service.group, items: [] };
      groups.push(bucket);
    }
    bucket.items.push(service);
  }
  return groups;
}

function ServiceGroups({ services }: { services: Service[] }) {
  return (
    <div className="flex flex-col gap-9">
      {groupServices(services).map(({ group, items }) => (
        <div key={group} className="flex flex-col gap-4">
          <h3
            data-reveal-item
            className="m-0 font-heading text-[13px] font-semibold uppercase tracking-[1.5px] text-quiet"
          >
            {group}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[18px]">
            {items.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Offer() {
  const [tab, setTab] = useState<"private" | "business">("private");
  const tabsBlockRef = useRef<HTMLDivElement>(null);

  // Sticky offset of the tab bar (matches `top-[78px]` below).
  const STICKY_OFFSET = 78;

  const selectTab = (next: "private" | "business") => {
    setTab(next);
    const block = tabsBlockRef.current;
    if (!block || typeof window.scrollTo !== "function") return;
    // The wrapper isn't sticky, so its rect reports the tabs' true position.
    // Its top is tab-independent (only the grid below changes), so measuring now
    // (pre-render) is reliable. When the top is above the sticky line the tabs
    // are pinned — pull the page up so the tabs land at the top of the viewport.
    const top = block.getBoundingClientRect().top;
    if (top < STICKY_OFFSET) {
      window.scrollTo({
        top: window.scrollY + top - STICKY_OFFSET,
        behavior: "smooth",
      });
    }
  };

  const tabBase =
    "whitespace-nowrap rounded-full px-4 py-2.5 font-heading text-[13px] font-semibold transition-colors sm:px-[26px] sm:py-3 sm:text-[15px]";
  const tabActive = "bg-ink text-white";
  const tabInactive = "bg-transparent text-quiet hover:text-ink";

  return (
    <section
      id="oferta"
      data-screen-label="Oferta"
      className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]"
    >
      <Reveal className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="Oferta / Usługi" centered />
        <h2 className="m-0 max-w-[640px] font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Zakres dopasowany do Twojego obiektu
        </h2>
        <p className="m-0 max-w-[560px] font-body text-base leading-[1.7] text-muted text-pretty">
          Każde zlecenie traktujemy indywidualnie — inne potrzeby ma mieszkanie
          rodzinne, inne lokal użytkowy, a jeszcze inne hotel, kamper czy domek
          letniskowy.
        </p>
      </Reveal>

      <div ref={tabsBlockRef} className="flex flex-col gap-9">
      <div className="sticky top-[78px] z-30 flex justify-center">
        <div className="flex flex-nowrap justify-center gap-2 rounded-full border border-line bg-cream/85 p-1.5 shadow-[0_8px_28px_rgba(80,60,40,0.10)] backdrop-blur-md">
          <button
            type="button"
            aria-label="Klienci prywatni"
            onClick={() => selectTab("private")}
            className={`${tabBase} ${tab === "private" ? tabActive : tabInactive}`}
          >
            <span className="sm:hidden">Prywatni</span>
            <span className="hidden sm:inline">Klienci prywatni</span>
          </button>
          <button
            type="button"
            aria-label="Firmy i obiekty komercyjne"
            onClick={() => selectTab("business")}
            className={`${tabBase} ${tab === "business" ? tabActive : tabInactive}`}
          >
            <span className="sm:hidden">Firmy</span>
            <span className="hidden sm:inline">Firmy i obiekty komercyjne</span>
          </button>
        </div>
      </div>

      <Reveal stagger key={tab}>
      {tab === "private" ? (
        <div className="flex flex-col gap-7">
          <ServiceGroups services={privateServices} />
          <div
            data-testid="addons"
            className="flex flex-col gap-4 rounded-[18px] border border-line bg-sand p-7"
          >
            <span className="font-heading text-[17px] font-semibold text-ink">
              Usługi dodatkowe
            </span>
            <div className="flex flex-wrap gap-2">
              {privateAddons.map((addon) => (
                <span
                  key={addon}
                  className="rounded-full border border-line-mid bg-cream px-4 py-2 font-body text-[13.5px] text-quiet"
                >
                  {addon}
                </span>
              ))}
            </div>
            <span className="font-body text-[13.5px] text-muted">
              Zakres dobierany przy wycenie.
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-7">
          <div className="mx-auto flex max-w-[720px] flex-col gap-2.5 text-center">
            <span className="font-heading text-[19px] font-semibold text-ink">
              Profesjonalne sprzątanie dla firm i obiektów użytkowych
            </span>
            <span className="font-body text-[15px] leading-[1.7] text-muted text-pretty">
              Czysta przestrzeń to komfort pracowników i pierwsze wrażenie
              klientów — dlatego traktujemy ją poważnie.
            </span>
          </div>
          <ServiceGroups services={businessServices} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            <div data-reveal-item className="u-lift flex flex-col gap-2.5 rounded-[18px] border border-ink bg-ink p-6">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#4a4138] bg-[#3d352e]">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#BE9678"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8.5 12.5l2.3 2.3 4.9-4.9" />
                    <path
                      d="M12 3.5l2.1 2.1h3l.9 2.8 2.5 1.6-.8 2.9.8 2.9-2.5 1.6-.9 2.8h-3L12 22.3l-2.1-2.1h-3l-.9-2.8-2.5-1.6.8-2.9-.8-2.9 2.5-1.6.9-2.8h3z"
                      transform="scale(0.82) translate(2.6,1.2)"
                    />
                  </svg>
                </span>
                <h4 className="m-0 font-heading text-[17px] font-semibold leading-[1.3] text-white">
                  {businessHighlight.title}
                </h4>
              </div>
              <p className="m-0 font-body text-[14.5px] leading-[1.65] text-line-hover">
                {businessHighlight.desc}
              </p>
              <a
                href="#kontakt"
                className="mt-1 font-heading text-sm font-semibold text-accent no-underline transition-colors hover:text-white"
              >
                {businessHighlight.cta}
              </a>
            </div>
          </div>
        </div>
      )}
      </Reveal>
      </div>
    </section>
  );
}
