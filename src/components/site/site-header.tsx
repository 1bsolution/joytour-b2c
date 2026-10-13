"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShoppingBag, UserRound } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { MAIN_NAV } from "@/lib/site-nav";
import { cn } from "@/lib/utils";
import { GroupPackagesMenu } from "./group-packages-menu";
import { MobileNav } from "./mobile-nav";
import { NavBadge } from "./nav-badge";

const SCROLL_THRESHOLD = 40;
const DARK_HERO_PAGES = new Set([
  "/land-packages",
  "/flight-promotions",
  "/getaways",
  "/mice",
  "/member-exclusive",
]);

function pageAllowsTransparentHeader(pathname: string): boolean {
  // Pages whose first content under the header is a full-bleed dark hero.
  // Other pages keep the header opaque so the white nav doesn't sit on
  // a white page.
  if (pathname === "/") return true;
  if (pathname.startsWith("/destinations/")) return true;
  if (pathname.startsWith("/tours/")) return true;
  return DARK_HERO_PAGES.has(pathname);
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
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,transform] duration-300 ease-out",
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

        <nav className="ml-auto hidden items-center gap-6 text-[0.9rem] font-medium capitalize tracking-[0.01em] lg:flex xl:gap-7">
          {MAIN_NAV.map((item) =>
            item.mega ? (
              <GroupPackagesMenu
                key={item.key}
                href={item.href}
                isOpaque={isOpaque}
                onOpenChange={setMenuOpen}
              />
            ) : (
              <NavLink key={item.key} href={item.href} isOpaque={isOpaque}>
                {t(item.key)}
                {item.badge === "hot" && <NavBadge label={t("hot")} className="ml-1.5 -translate-y-2" />}
              </NavLink>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
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
          <MobileNav isOpaque={isOpaque} />
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
        "inline-flex items-center whitespace-nowrap transition-colors duration-300 ease-out",
        isOpaque
          ? "text-[color:var(--brand-text)] hover:text-[color:var(--brand-orange)]"
          : "text-white hover:text-[color:var(--brand-amber)]"
      )}
    >
      {children}
    </Link>
  );
}
