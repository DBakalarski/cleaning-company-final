"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

type SketchUnderlineProps = {
  /** SVG path `d` for the hand-drawn swoosh stroke. */
  d: string;
  /** viewBox of the SVG. Defaults to the common 140×12 swoosh box. */
  viewBox?: string;
  /** Stroke width in viewBox units. */
  strokeWidth?: number;
  /** Positioning/size utilities for the absolutely-placed SVG. */
  className?: string;
  /** Seconds to wait after the stroke enters view before drawing (lets the
   *  hero heading land first). Default 0. */
  delay?: number;
};

// Decorative accent stroke that "draws itself" the first time it scrolls into
// view. The path uses pathLength={1} so the dash math is geometry-independent:
// dashoffset 1 = hidden, 0 = fully drawn — no getTotalLength() measuring needed
// (which also keeps it SSR/jsdom-safe). Plays once, matching <Reveal>.
export function SketchUnderline({
  d,
  viewBox = "0 0 140 12",
  strokeWidth = 2.5,
  className,
  delay = 0,
}: SketchUnderlineProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = ref.current;
      const path = svg?.querySelector("path");
      if (!svg || !path) return;

      const reduce =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Reduced motion, or no IntersectionObserver (jsdom / very old browsers):
      // never leave the stroke hidden — draw it fully and immediately.
      if (reduce || typeof IntersectionObserver === "undefined") {
        gsap.set(path, { strokeDashoffset: 0 });
        return;
      }

      const io = new IntersectionObserver(
        (entries, obs) => {
          if (entries.some((e) => e.isIntersecting)) {
            gsap.fromTo(
              path,
              { strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                duration: 0.9,
                ease: "power2.out",
                delay,
              },
            );
            obs.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
      );
      io.observe(svg);

      return () => io.disconnect();
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke="#BE9678"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity="0.8"
        pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />
    </svg>
  );
}
