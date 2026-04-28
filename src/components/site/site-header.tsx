"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDown, ShoppingBag, UserRound } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { destinations } from "@/lib/destinations";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 40;

function pageAllowsTransparentHeader(pathname: string): boolean {
  // Pages whose first content under the header is a full-bleed dark hero.
  // Other pages keep the header opaque so the white nav doesn't sit on
  // a white page.
  if (pathname === "/") return true;
  if (pathname.startsWith("/destinations/")) return true;
  if (pathname.startsWith("/tours/")) return true;
  return false;
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const pathname = usePathname();
  const allowTransparent = pageAllowsTransparentHeader(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!allowTransparent) return;
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [allowTransparent]);

  const isOpaque = !allowTransparent || scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
          isOpaque
            ? "border-b border-[color:var(--brand-border)] bg-white/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-8 px-5 md:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/joytour-logo-master.png"
            alt={tBrand("name")}
            width={1392}
            height={911}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-8 text-[0.82rem] font-medium uppercase tracking-[0.16em] md:flex">
          <NavLink href="/about" isOpaque={isOpaque}>
            {t("about")}
          </NavLink>

          <DestinationsMenu
            label={t("destinations")}
            viewAllLabel={t("viewAllDestinations")}
            isOpaque={isOpaque}
            onOpenChange={setMenuOpen}
          />

          <NavLink href="/contact" isOpaque={isOpaque}>
            {t("contact")}
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0 md:gap-4">
          <Link
            href="/tours"
            className={cn(
              "hidden h-10 items-center rounded-full px-5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-[background-color,color,border-color] duration-300 ease-out lg:inline-flex",
              isOpaque
                ? "bg-[color:var(--brand-text)] text-white hover:bg-[color:var(--brand-orange)]"
                : "bg-[color:var(--brand-amber)] text-[color:var(--brand-text)] hover:bg-white"
            )}
          >
            Find a Journey
          </Link>

          <Link
            href="/sign-in"
            aria-label={t("signIn")}
            className={cn(
              "hidden size-9 place-items-center rounded-full transition-[background-color,color] duration-300 ease-out sm:grid",
              isOpaque
                ? "text-[color:var(--brand-text)] hover:bg-[#FFF4E6] hover:text-[color:var(--brand-orange)]"
                : "text-white hover:bg-white/15"
            )}
          >
            <UserRound className="size-[18px]" />
          </Link>
          <Link
            href="/cart"
            aria-label={t("cart")}
            className={cn(
              "grid size-9 place-items-center rounded-full transition-[background-color,color] duration-300 ease-out",
              isOpaque
                ? "text-[color:var(--brand-text)] hover:bg-[#FFF4E6] hover:text-[color:var(--brand-orange)]"
                : "text-white hover:bg-white/15"
            )}
          >
            <ShoppingBag className="size-[18px]" />
          </Link>
        </div>
      </div>
      </header>
      {/* Pages with a dark hero behind the header don't need a spacer — the
        hero starts at the top of the viewport. Other pages get an 80px
        spacer in the flex flow so content doesn't sit under the fixed bar. */}
      {!allowTransparent && <div aria-hidden className="h-20 shrink-0" />}
    </>
  );
}

function NavLink({
  href,
  isOpaque,
  children,
}: {
  href: string;
  isOpaque: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors duration-300 ease-out",
        isOpaque
          ? "text-[color:var(--brand-text)] hover:text-[color:var(--brand-orange)]"
          : "text-white hover:text-[color:var(--brand-amber)]"
      )}
    >
      {children}
    </Link>
  );
}

function DestinationsMenu({
  label,
  viewAllLabel,
  isOpaque,
  onOpenChange,
}: {
  label: string;
  viewAllLabel: string;
  isOpaque: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div
      className="group relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onFocus={() => onOpenChange(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onOpenChange(false);
        }
      }}
    >
      <Link
        href="/destinations"
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1.5 transition-colors duration-300 ease-out",
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
        className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="rounded-[20px] bg-white p-7 shadow-[0_24px_60px_-22px_rgba(43,43,43,0.32)] ring-1 ring-[color:var(--brand-border)]">
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-[1fr_1fr]">
            {destinations.map((country) => (
              <div key={country.slug} className="min-w-[10rem]">
                <Link
                  href={`/destinations/${country.slug}`}
                  className="mb-4 block font-display text-[1.05rem] font-bold uppercase tracking-[0.04em] text-[color:var(--brand-gold)] transition hover:text-[color:var(--brand-orange)]"
                >
                  {country.name}
                </Link>
                <ul className="space-y-2.5">
                  {country.sectors.map((sector) => (
                    <li key={sector.slug}>
                      <Link
                        href={`/destinations/${sector.slug}`}
                        className="block whitespace-nowrap text-[0.82rem] font-medium normal-case tracking-normal text-[color:var(--brand-muted)] transition hover:text-[color:var(--brand-orange)]"
                      >
                        {sector.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-[color:var(--brand-divider)] pt-5">
            <Link
              href="/destinations"
              className="inline-flex items-center text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-orange)] transition hover:text-[color:var(--brand-amber)]"
            >
              {viewAllLabel}
              <span aria-hidden className="ml-2">→</span>
            </Link>
            <p className="text-[0.78rem] normal-case tracking-normal text-[color:var(--brand-muted)]">
              {destinations.reduce((n, c) => n + c.sectors.length, 0)} regions
              · 2 countries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
