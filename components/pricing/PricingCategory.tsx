import type { PricingCategory as Category } from "@/data/pricing";

export function PricingCategory({ category }: { category: Category }) {
  return (
    <div className="flex flex-col gap-[18px] rounded-[20px] border border-line bg-white p-[clamp(24px,3vw,32px)]">
      <div className="flex items-center gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-line bg-[#f7f1ea] font-heading text-lg font-semibold text-accent">
          ✦
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
