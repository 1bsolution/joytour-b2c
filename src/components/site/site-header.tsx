import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ChevronDown, ShoppingBag, UserRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/lib/destinations";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tBrand = await getTranslations("brand");

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E1D2] bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-8 px-5 md:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/joytour-logo-gold.webp"
            alt={tBrand("name")}
            width={180}
            height={120}
            priority
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-8 text-[0.82rem] font-medium uppercase tracking-[0.16em] md:flex">
          <Link
            href="/about"
            className="text-[color:var(--brand-text)] transition hover:text-[color:var(--brand-orange)]"
          >
            {t("about")}
          </Link>

          <DestinationsMenu label={t("destinations")} viewAllLabel={t("viewAllDestinations")} />

          <Link
            href="/contact"
            className="text-[color:var(--brand-text)] transition hover:text-[color:var(--brand-orange)]"
          >
            {t("contact")}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0 md:gap-4">
          <Link
            href="/sign-in"
            aria-label={t("signIn")}
            className="hidden size-9 place-items-center rounded-full text-[color:var(--brand-text)] transition hover:bg-[#FFF4E6] hover:text-[color:var(--brand-orange)] sm:grid"
          >
            <UserRound className="size-[18px]" />
          </Link>
          <Link
            href="/cart"
            aria-label={t("cart")}
            className="grid size-9 place-items-center rounded-full text-[color:var(--brand-text)] transition hover:bg-[#FFF4E6] hover:text-[color:var(--brand-orange)]"
          >
            <ShoppingBag className="size-[18px]" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function DestinationsMenu({
  label,
  viewAllLabel,
}: {
  label: string;
  viewAllLabel: string;
}) {
  return (
    <div className="group relative">
      <Link
        href="/destinations"
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 text-[color:var(--brand-text)] transition hover:text-[color:var(--brand-orange)]"
      >
        {label}
        <ChevronDown className="size-3 transition group-hover:rotate-180" aria-hidden />
      </Link>

      <div
        role="menu"
        aria-label={label}
        className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="rounded-[20px] bg-white p-7 shadow-[0_24px_60px_-22px_rgba(43,43,43,0.32)] ring-1 ring-[#E8E1D2]">
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
          <div className="mt-7 flex items-center justify-between border-t border-[#F1E8D6] pt-5">
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
