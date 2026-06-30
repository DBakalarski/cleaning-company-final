"use client";

import { useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair } from "@/data/beforeAfter";

type BeforeAfterCardProps = {
  pair: BeforeAfterPair;
  /** Crop aspect ratio for the image frame. Default tall 3:4. */
  aspectClassName?: string;
  /** Enlarge the "Przed"/"Po" badge and the hint label. */
  prominentLabels?: boolean;
};

/**
 * Before/after card. Shows the "po" photo by default; the "przed" photo
 * fades in on hover (desktop) and on tap (mobile — toggled via state).
 */
export function BeforeAfterCard({
  pair,
  aspectClassName = "aspect-[3/4]",
  prominentLabels = false,
}: BeforeAfterCardProps) {
  const [revealed, setRevealed] = useState(false);

  const badgeClass = prominentLabels
    ? "px-4 py-1.5 text-[13px] tracking-[2px]"
    : "px-3 py-1 text-[11px] tracking-[1.5px]";
  const hintClass = prominentLabels
    ? "px-4 py-1.5 text-[13px]"
    : "px-3 py-1 text-[11px]";

  return (
    <figure className="m-0 flex flex-col gap-3" data-reveal-item>
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        aria-pressed={revealed}
        aria-label={`${pair.caption}: pokaż efekt przed i po (${
          revealed ? "widoczne: przed" : "widoczne: po"
        })`}
        className={`group u-press relative block w-full overflow-hidden rounded-2xl border border-line-soft bg-sand ${aspectClassName}`}
      >
        {/* After (po) — base layer */}
        <Image
          src={pair.after}
          alt={pair.alt}
          fill
          sizes="(max-width: 700px) 100vw, 380px"
          className="object-cover"
        />
        {/* Before (przed) — fades in on hover / when revealed */}
        <Image
          src={pair.before}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 700px) 100vw, 380px"
          className={`object-cover transition-opacity duration-500 ease-out group-hover:opacity-100 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* "Po" badge — hidden once "przed" is shown */}
        <span
          className={`absolute left-3 top-3 rounded-full bg-accent font-heading font-semibold uppercase text-ink transition-opacity duration-300 group-hover:opacity-0 ${badgeClass} ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
        >
          Po
        </span>
        {/* "Przed" badge — shown once "przed" is visible */}
        <span
          className={`absolute left-3 top-3 rounded-full bg-ink/85 font-heading font-semibold uppercase text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 ${badgeClass} ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          Przed
        </span>

        {/* Hint — desktop hover / mobile tap */}
        <span
          className={`absolute bottom-3 right-3 rounded-full bg-cream/90 font-body font-medium text-ink-soft backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0 ${hintClass} ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
        >
          Najedź lub dotknij
        </span>
      </button>
      <figcaption className="font-body text-sm text-muted">{pair.caption}</figcaption>
    </figure>
  );
}
