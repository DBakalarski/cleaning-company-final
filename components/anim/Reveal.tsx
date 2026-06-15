"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "./gsap";

type Direction = "up" | "left" | "right";

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  left: { x: -48 },
  right: { x: 48 },
};

type RevealProps = {
  children: ReactNode;
  /** Direction the element travels in from. Default "up". */
  direction?: Direction;
  /** Extra delay before the tween (seconds). */
  delay?: number;
  /** Stagger descendant [data-reveal-item] elements instead of the wrapper. */
  stagger?: boolean;
  className?: string;
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  stagger = false,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const targets: HTMLElement[] = stagger
        ? gsap.utils.toArray<HTMLElement>(
            root.querySelectorAll("[data-reveal-item]"),
          )
        : [root];
      if (!targets.length) return;

      const reduce =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Reduced motion, or no IntersectionObserver (jsdom / very old browsers):
      // never leave content hidden — show it immediately.
      if (reduce || typeof IntersectionObserver === "undefined") {
        gsap.set(targets, { autoAlpha: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(targets, { autoAlpha: 0, ...OFFSET[direction] });

      // On mobile the viewport is short, so the default -12% bottom margin makes
      // reveals feel late. Fire a touch before the element reaches the bottom edge.
      const isMobile =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(max-width: 640px)").matches;
      const rootMargin = isMobile ? "0px 0px 8% 0px" : "0px 0px -12% 0px";

      const io = new IntersectionObserver(
        (entries, obs) => {
          if (entries.some((e) => e.isIntersecting)) {
            gsap.to(targets, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              delay,
              stagger: stagger ? 0.16 : 0,
              overwrite: true,
            });
            obs.disconnect();
          }
        },
        // threshold 0: fire as soon as any sliver enters the (margin-adjusted)
        // viewport. A higher threshold breaks tall sections — they'd stay hidden
        // until a large fraction is visible, long after they should have shown.
        { rootMargin, threshold: 0 },
      );
      io.observe(root);

      return () => io.disconnect();
    },
    { scope: ref },
  );

  const flag = stagger
    ? { "data-reveal-stagger": "" }
    : { "data-reveal": "" };

  return (
    <div ref={ref} className={className} {...flag}>
      {children}
    </div>
  );
}
