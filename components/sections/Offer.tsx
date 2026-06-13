"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  privateServices,
  privateAddons,
  businessServices,
  businessHighlight,
  type Service,
} from "@/data/offer";

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-[18px] border border-line bg-white p-6">
      <span className="font-heading text-lg font-semibold text-accent">✦</span>
      <h3 className="m-0 font-heading text-[17px] font-semibold leading-[1.3] text-ink">
        {service.title}
      </h3>
      <p className="m-0 font-body text-[14.5px] leading-[1.65] text-muted">
        {service.desc}
      </p>
    </div>
  );
}

export function Offer() {
  const [tab, setTab] = useState<"private" | "business">("private");

  const tabBase =
    "rounded-full px-[26px] py-3 font-heading text-[15px] font-semibold transition-colors";
  const tabActive = "bg-ink text-white";
  const tabInactive = "border border-line-mid bg-transparent text-quiet";

  return (
    <section
      id="oferta"
      data-screen-label="Oferta"
      className="mx-auto flex max-w-[1180px] flex-col gap-9 px-6 py-[clamp(56px,8vw,100px)]"
    >
      <div className="flex flex-col gap-3.5">
        <SectionEyebrow label="Oferta / Usługi" />
        <h2 className="m-0 max-w-[640px] font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px] text-balance">
          Zakres dopasowany do Twojego obiektu
        </h2>
        <p className="m-0 max-w-[640px] font-body text-base leading-[1.7] text-muted text-pretty">
          Każde zlecenie traktujemy indywidualnie — inne potrzeby ma mieszkanie
          rodzinne, inne lokal użytkowy, a jeszcze inne hotel, kamper czy domek
          letniskowy.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setTab("private")}
          className={`${tabBase} ${tab === "private" ? tabActive : tabInactive}`}
        >
          Klienci prywatni
        </button>
        <button
          type="button"
          onClick={() => setTab("business")}
          className={`${tabBase} ${tab === "business" ? tabActive : tabInactive}`}
        >
          Firmy i obiekty komercyjne
        </button>
      </div>

      {tab === "private" ? (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
            {privateServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
          <div
            data-testid="addons"
            className="flex flex-col gap-3.5 rounded-[20px] border border-line bg-sand p-[30px]"
          >
            <span className="font-heading text-base font-semibold text-ink">
              Usługi dodatkowe — do wyboru pojedynczo
            </span>
            <div className="flex flex-wrap gap-2">
              {privateAddons.map((addon) => (
                <span
                  key={addon}
                  className="rounded-full border border-line-mid bg-cream px-3.5 py-2 font-body text-[13.5px] text-quiet"
                >
                  {addon}
                </span>
              ))}
            </div>
            <span className="font-body text-[13px] text-faint">
              Elementy czyszczone i/lub dezynfekowane — zakres dobierany przy
              wycenie.
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
          {businessServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
          <div className="flex flex-col gap-2.5 rounded-[18px] bg-ink p-6">
            <span className="font-heading text-lg font-semibold text-accent">✦</span>
            <h3 className="m-0 font-heading text-[17px] font-semibold leading-[1.3] text-white">
              {businessHighlight.title}
            </h3>
            <p className="m-0 font-body text-[14.5px] leading-[1.65] text-line-hover">
              {businessHighlight.desc}
            </p>
            <a
              href="#kontakt"
              className="mt-1 font-heading text-[14.5px] font-semibold text-accent no-underline"
            >
              {businessHighlight.cta}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
