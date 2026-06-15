"use client";

import { useId, useRef } from "react";
import { gsap, useGSAP } from "@/components/anim/gsap";

// The "service area" diagram: two concentric dashed rings around the Konin
// pill, a map pin, and a couple of accent circles. The first time it scrolls
// into view the rings trace themselves clockwise from the top (where the pin
// sits), the pin and accent circles draw their strokes, and the pill pops in —
// as if the whole thing were being sketched by hand.
//
// The rings are real dashed <circle>s; a separate solid "tracer" circle used as
// an SVG mask does the progressive reveal, so the dash pattern and the draw
// never fight over stroke-dasharray. pathLength={1} keeps the dash math
// geometry-independent (offset 1 = hidden, 0 = fully drawn) — no
// getTotalLength() measuring, which also keeps it SSR/jsdom-safe.
//
// Progressive enhancement matches <Reveal>/<HeroMotion>: the markup renders in
// its final, fully-drawn state, and the effect sets the hidden start state in a
// layout effect (before paint) only when it is actually going to animate. So
// without JS, or with prefers-reduced-motion, everything is simply visible.
export function ServiceAreaGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const outerMask = `${id}-outer`;
  const innerMask = `${id}-inner`;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const ringMasks = gsap.utils.toArray<SVGElement>(
        root.querySelectorAll("[data-ring-mask]"),
      );
      const pinStrokes = gsap.utils.toArray<SVGElement>(
        root.querySelectorAll("[data-pin-stroke]"),
      );
      const dots = gsap.utils.toArray<SVGElement>(
        root.querySelectorAll("[data-dot]"),
      );
      const pill = root.querySelector("[data-pill]");

      const reduce =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Reduced motion, or no IntersectionObserver (jsdom / very old browsers):
      // leave the markup in its rendered, fully-drawn state.
      if (reduce || typeof IntersectionObserver === "undefined") return;

      // Hide everything up front (runs before paint, so there is no flash of the
      // drawn state), then trace it in once it scrolls into view.
      gsap.set([...ringMasks, ...pinStrokes, ...dots], { strokeDashoffset: 1 });
      gsap.set(pill, { autoAlpha: 0, scale: 0.8 });

      const io = new IntersectionObserver(
        (entries, obs) => {
          if (!entries.some((e) => e.isIntersecting)) return;

          // Hold a beat after it scrolls in (lets the section's reveal settle)
          // before the pen starts tracing.
          gsap
            .timeline({ delay: 0.5 })
            .to(
              ringMasks,
              {
                strokeDashoffset: 0,
                duration: 1.15,
                ease: "power2.out",
                stagger: 0.2,
              },
              0,
            )
            .to(
              pinStrokes,
              {
                strokeDashoffset: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.12,
              },
              0.05,
            )
            .to(
              dots,
              {
                strokeDashoffset: 0,
                duration: 0.45,
                ease: "power2.out",
                stagger: 0.12,
              },
              0.75,
            )
            .to(
              pill,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.55,
                ease: "back.out(1.6)",
              },
              0.5,
            );

          obs.disconnect();
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
      );
      io.observe(root);

      return () => io.disconnect();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative aspect-square w-[clamp(220px,26vw,300px)]">
      <svg
        viewBox="0 0 300 300"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <mask id={outerMask}>
            <circle
              cx="150"
              cy="150"
              r="147"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
              transform="rotate(-90 150 150)"
              pathLength={1}
              data-ring-mask
              style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
            />
          </mask>
          <mask id={innerMask}>
            <circle
              cx="150"
              cy="150"
              r="92"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
              transform="rotate(-90 150 150)"
              pathLength={1}
              data-ring-mask
              style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
            />
          </mask>
        </defs>
        <circle
          cx="150"
          cy="150"
          r="147"
          stroke="#c9a98f"
          strokeWidth="1.3"
          strokeDasharray="3 6.5"
          mask={`url(#${outerMask})`}
        />
        <circle
          cx="150"
          cy="150"
          r="92"
          stroke="#be9678"
          strokeWidth="1.3"
          strokeDasharray="3 6"
          mask={`url(#${innerMask})`}
        />
      </svg>

      {/* map pin, straddling the top of the outer ring */}
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
        <path
          d="M12 21c4-4.3 6-7.6 6-10.4a6 6 0 1 0-12 0C6 13.4 8 16.7 12 21z"
          pathLength={1}
          data-pin-stroke
          style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
        />
        <circle
          cx="12"
          cy="10.5"
          r="2.2"
          pathLength={1}
          data-pin-stroke
          style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
        />
      </svg>

      {/* small accent circles, lower-left */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="absolute bottom-[8%] left-[2%]"
      >
        <circle
          cx="10"
          cy="10"
          r="6"
          stroke="#BE9678"
          strokeWidth="1.3"
          opacity="0.8"
          pathLength={1}
          data-dot
          style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
        />
        <circle
          cx="19"
          cy="19"
          r="3"
          stroke="#C9A98F"
          strokeWidth="1.3"
          opacity="0.7"
          pathLength={1}
          data-dot
          style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
        />
      </svg>

      {/* centered Konin pill */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          data-pill
          className="rounded-full bg-ink px-[26px] py-3 font-heading text-base font-semibold text-white"
        >
          Konin
        </div>
      </div>
    </div>
  );
}
