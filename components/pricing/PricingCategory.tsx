import type { ReactNode } from "react";
import type { PricingCategory as Category } from "@/data/pricing";

const categoryIcons: Record<string, ReactNode> = {
  "Łazienki, płytki, fugi i kamień": (
    <>
      <path d="M6 20V6.5A2.5 2.5 0 0 1 8.5 4h0A2.5 2.5 0 0 1 11 6.5v.5" />
      <path d="M11 7h4" />
      <path d="M13 7v1.5" />
      <path d="M10.2 12.2l.9.9M13 11l.9.9M15.8 9.8l.9.9" />
      <path d="M13 16.5v.01M16 14.5v.01M17.5 18v.01" />
    </>
  ),
  "Kuchnia i sprzęty AGD": (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="1.5" />
      <path d="M4.5 9h15" />
      <rect x="8" y="11.8" width="8" height="4.6" rx="0.8" />
      <path d="M7 6.8h.01M10 6.8h.01M13 6.8h.01" />
    </>
  ),
  "Pranie tapicerki i tekstyliów": (
    <>
      <path d="M7 11V8.5A2.5 2.5 0 0 1 9.5 6h5A2.5 2.5 0 0 1 17 8.5V11" />
      <path d="M5 17v-3.4a1.9 1.9 0 0 1 3.8 0v.9h6.4v-.9a1.9 1.9 0 0 1 3.8 0V17z" />
      <path d="M6.3 17v1.8M17.7 17v1.8" />
    </>
  ),
  "Podłogi i doczyszczanie maszynowe": (
    <>
      <path d="M14.5 4.5l-4.2 9.2" />
      <path d="M14.5 4.5h3" />
      <circle cx="9" cy="17" r="3.4" />
      <path d="M13.5 19.5h6" />
    </>
  ),
  "Okna, witryny i przeszklenia": (
    <>
      <rect x="5" y="4.5" width="14" height="15" rx="1.5" />
      <path d="M12 4.5v15M5 12h14" />
      <path d="M7.2 9.6l2.2-2.2" />
    </>
  ),
  "Czyszczenie parowe": (
    <>
      <path d="M8 10.5c0-2.2 1.8-4 4-4s4 1.8 4 4v1.5H8z" />
      <path d="M6.5 15h11" />
      <path d="M8.5 18.5c.8-.8.8-1.7 0-2.5M12 18.5c.8-.8.8-1.7 0-2.5M15.5 18.5c.8-.8.8-1.7 0-2.5" />
      <path d="M12 6.5V4.5" />
    </>
  ),
  "Pomieszczenia gospodarcze, garaże i domki": (
    <>
      <path d="M4 10l8-5.5L20 10" />
      <path d="M5.8 9v10h12.4V9" />
      <path d="M8.5 12.5h7M8.5 15.2h7M8.5 17.9h7" />
    </>
  ),
  "Mycie zewnętrzne": (
    <>
      <path d="M5 19.5V8.8L12 4l7 4.8" />
      <path d="M19 12.5v7" />
      <path d="M3.5 19.5h17" />
      <path d="M14.5 9.5c1.2 1.2 1.2 2.8 0 4M16.8 8.2c2 2 2 4.6 0 6.6" />
    </>
  ),
  "Nagrobki i miejsca pamięci": (
    <>
      <rect x="9.5" y="10.5" width="5" height="8" rx="1.2" />
      <path d="M12 7.8c1.3-1.2 1.3-2.4 0-3.8-1.3 1.4-1.3 2.6 0 3.8z" />
      <path d="M12 7.8v2.7" />
      <path d="M6.5 18.5h11" />
    </>
  ),
};

export function PricingCategory({ category }: { category: Category }) {
  return (
    <div className="u-lift flex flex-col gap-[18px] rounded-[20px] border border-line bg-white p-[clamp(24px,3vw,32px)]">
      <div className="flex items-center gap-3.5">
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
            {categoryIcons[category.title]}
          </svg>
        </span>
        <h2 className="m-0 font-heading text-[19px] font-semibold leading-[1.3] tracking-[-0.3px]">
          {category.title}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {category.items.map((item) => (
          <div key={item.name} className="flex items-baseline gap-3">
            <span className="font-body text-[15px] leading-[1.5] text-quiet">
              {item.name}
            </span>
            <span className="min-w-5 flex-1 border-b border-dotted border-line-mid" />
            <span className="whitespace-nowrap font-heading text-[14.5px] font-semibold">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
