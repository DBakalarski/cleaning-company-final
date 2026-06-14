"use client";

import { useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { faqItems } from "@/data/faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      data-screen-label="FAQ"
      className="mx-auto flex max-w-[820px] flex-col gap-8 px-6 pb-[clamp(56px,8vw,100px)] pt-[clamp(40px,6vw,80px)]"
    >
      <div className="flex flex-col items-center gap-3.5 text-center">
        <SectionEyebrow label="FAQ" centered />
        <h2 className="relative m-0 inline-block font-heading text-[clamp(26px,3vw,38px)] font-semibold leading-[1.2] tracking-[-0.6px]">
          Najczęstsze pytania
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
            className="absolute -right-[42px] -top-[18px]"
          >
            <path
              d="M14 16c0-4 3-7 7-7s7 2.7 7 6c0 5-6 5-6 9"
              stroke="#BE9678"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.75"
            />
            <circle cx="22" cy="30.5" r="1.4" fill="#BE9678" opacity="0.75" />
          </svg>
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {faqItems.map((item, index) => {
          const open = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-line bg-white"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-6 py-5 text-left"
              >
                <span className="font-heading text-base font-semibold text-ink">
                  {item.question}
                </span>
                <span className="shrink-0 font-heading text-[22px] text-accent">
                  {open ? "−" : "+"}
                </span>
              </button>
              {open && (
                <p className="m-0 px-6 pb-[22px] font-body text-[15px] leading-[1.7] text-muted">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
