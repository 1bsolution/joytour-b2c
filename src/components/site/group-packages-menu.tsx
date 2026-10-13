"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/lib/destinations";
import { cn } from "@/lib/utils";

interface GroupPackagesMenuProps {
  href: string;
  isOpaque: boolean;
  onOpenChange: (open: boolean) => void;
}

// Full-width mega menu: country → region columns on the left, a photo card
// per country on the right. The panel is positioned against the fixed
// <header>, so this wrapper must stay `static`.
export function GroupPackagesMenu({ href, isOpaque, onOpenChange }: GroupPackagesMenuProps) {
  const t = useTranslations("nav");
  const label = t("groupPackages");

  return (
    <div
      className="group"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onFocus={() => onOpenChange(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onOpenChange(false);
      }}
    >
      <Link
        href={href}
        aria-haspopup="true"
        className={cn(
          "inline-flex h-20 items-center gap-1.5 transition-colors duration-300 ease-out",
          isOpaque
            ? "text-[color:var(--brand-text)] hover:text-[color:var(--brand-orange)]"
            : "text-white hover:text-[color:var(--brand-amber)]"
        )}
      >
        {label}
        <ChevronDown className="size-3 transition group-hover:rotate-180" aria-hidden />
      </Link>

      <div
        role="menu"
        aria-label={label}
        className="invisible absolute inset-x-0 top-full z-50 border-t border-[color:var(--brand-border)] bg-white opacity-0 shadow-[0_24px_60px_-22px_rgba(43,43,43,0.32)] transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-9 md:px-8 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <p className="max-w-md text-[0.88rem] normal-case leading-[1.6] tracking-normal text-[color:var(--brand-muted)]">
              {t("groupPackagesBlurb")}
            </p>
            <div className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-[2fr_1fr]">
              {destinations.map((country) => (
                <div key={country.slug}>
                  <Link
                    href={`/destinations/${country.slug}`}
                    className="mb-4 block font-display text-[1.15rem] font-bold capitalize tracking-[0.01em] text-[color:var(--brand-ink)] transition hover:text-[color:var(--brand-orange)]"
                  >
                    {country.name}
                  </Link>
                  <ul
                    className={cn(
                      "gap-x-8 space-y-2.5",
                      country.sectors.length > 6 && "columns-2"
                    )}
                  >
                    {country.sectors.map((sector) => (
                      <li key={sector.slug} className="break-inside-avoid">
                        <Link
                          href={`/destinations/${sector.slug}`}
                          className="block whitespace-nowrap text-[0.85rem] font-medium normal-case tracking-normal text-[color:var(--brand-muted)] transition hover:text-[color:var(--brand-orange)]"
                        >
                          {sector.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link
              href={href}
              className="mt-8 inline-flex items-center gap-2 text-[0.85rem] font-semibold capitalize tracking-[0.01em] text-[color:var(--brand-orange)] transition hover:text-[color:var(--brand-orange-deep)]"
            >
              {t("viewAllGroupPackages")}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>

          <div className="hidden gap-4 lg:grid lg:grid-cols-2">
            {destinations.map((country) => (
              <Link
                key={country.slug}
                href={`/destinations/${country.slug}`}
                className="group/card relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[20px] p-5 text-white"
              >
                <Image
                  src={country.heroImage}
                  alt=""
                  fill
                  sizes="220px"
                  className="object-cover transition duration-500 group-hover/card:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(80,190,180,0.15),rgba(26,26,26,0.82))]"
                />
                <span className="relative font-display text-[1.35rem] font-bold capitalize leading-[1.1]">
                  {country.name}
                </span>
                <span className="relative mt-1 text-[0.78rem] normal-case tracking-normal text-white/80">
                  {country.routeCountLabel} · {t("regions", { count: country.sectors.length })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
