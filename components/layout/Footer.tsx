import Image from "next/image";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-soft bg-ink-deep">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-[18px] px-6 py-9">
        <div className="flex items-center gap-3">
          <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] bg-cream">
            <Image
              src="/logo-icon.png"
              alt=""
              width={30}
              height={30}
              className="object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[15px] font-semibold text-white">
              {site.name}
            </span>
            <span className="font-body text-[11.5px] uppercase tracking-[1.2px] text-faint">
              {site.taglineFull}
            </span>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
          <a
            href={site.phoneHref}
            className="font-heading text-sm font-semibold text-[#e8dfd6] no-underline transition-colors hover:text-accent"
          >
            {site.phone}
          </a>
          <span className="font-body text-[13px] text-muted">{site.area}</span>
          <span className="font-body text-[13px] text-muted">
            © 2026 Cleaning Service Konin
          </span>
        </div>
      </div>
    </footer>
  );
}
