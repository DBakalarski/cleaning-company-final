"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { navLinks } from "@/data/navigation";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-3.5">
        <Link href="/#start" className="flex items-center gap-3 text-ink no-underline">
          <Image
            src="/logo-icon.png"
            alt="Cleaning Service Konin"
            width={46}
            height={46}
            className="mix-blend-multiply"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[17px] font-bold tracking-[-0.2px]">
              Cleaning Service Konin
            </span>
            <span className="font-body text-[10.5px] uppercase tracking-[1.6px] text-faint">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-heading text-sm font-semibold text-quiet no-underline transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="whitespace-nowrap rounded-full bg-ink px-[22px] py-[11px] font-heading text-sm font-semibold text-white no-underline transition-colors hover:bg-accent"
          >
            {site.phone}
          </a>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-[5px] rounded-[10px] border border-line-mid px-[13px] py-3 md:hidden"
        >
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
        </button>
      </div>

      {menuOpen && (
        <nav
          data-testid="mobile-menu"
          className="flex flex-col gap-1 border-t border-line bg-cream px-6 pb-5 pt-2 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#f1e9e0] py-3 font-heading text-base font-semibold text-ink no-underline"
            >
              {link.mobileLabel ?? link.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-ink px-[22px] py-3.5 text-center font-heading text-[15px] font-semibold text-white no-underline"
          >
            Zadzwoń: {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
