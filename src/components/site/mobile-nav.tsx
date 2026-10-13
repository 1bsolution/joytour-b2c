"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/lib/destinations";
import { MAIN_NAV } from "@/lib/site-nav";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavBadge } from "./nav-badge";

export function MobileNav({ isOpaque }: { isOpaque: boolean }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={t("menu")}
        className={cn(
          "grid size-9 place-items-center rounded-full transition-[background-color,color] duration-300 ease-out lg:hidden",
          isOpaque
            ? "text-[color:var(--brand-text)] hover:bg-[color:var(--brand-cream)]"
            : "text-white hover:bg-white/15"
        )}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[86%] overflow-y-auto bg-white p-0">
        <SheetHeader className="border-b border-[color:var(--brand-border)] px-6 py-5">
          <SheetTitle className="font-display text-[1.2rem] text-[color:var(--brand-ink)]">
            {t("menu")}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-6 pb-8 text-[1rem] font-medium text-[color:var(--brand-text)]">
          {MAIN_NAV.map((item) =>
            item.mega ? (
              <div key={item.key} className="border-b border-[color:var(--brand-divider)]">
                <button
                  type="button"
                  aria-expanded={groupOpen}
                  onClick={() => setGroupOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  {t(item.key)}
                  <ChevronDown className={cn("size-4 transition", groupOpen && "rotate-180")} aria-hidden />
                </button>
                {groupOpen && (
                  <div className="space-y-5 pb-5">
                    {destinations.map((country) => (
                      <div key={country.slug}>
                        <Link
                          href={`/destinations/${country.slug}`}
                          onClick={close}
                          className="font-display text-[1.05rem] text-[color:var(--brand-ink)]"
                        >
                          {country.name}
                        </Link>
                        <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                          {country.sectors.map((sector) => (
                            <li key={sector.slug}>
                              <Link
                                href={`/destinations/${sector.slug}`}
                                onClick={close}
                                className="text-[0.88rem] text-[color:var(--brand-muted)]"
                              >
                                {sector.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link
                      href={item.href}
                      onClick={close}
                      className="inline-block text-[0.88rem] font-semibold text-[color:var(--brand-orange)]"
                    >
                      {t("viewAllGroupPackages")} →
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                onClick={close}
                className="flex items-center gap-2 border-b border-[color:var(--brand-divider)] py-4"
              >
                {t(item.key)}
                {item.badge === "hot" && <NavBadge label={t("hot")} />}
              </Link>
            )
          )}
          <div className="mt-6 flex gap-6 text-[0.9rem] text-[color:var(--brand-muted)]">
            <Link href="/about" onClick={close}>{t("about")}</Link>
            <Link href="/contact" onClick={close}>{t("contact")}</Link>
            <Link href="/sign-in" onClick={close}>{t("signIn")}</Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
