import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/lib/destinations";

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("destinations");

  return (
    <>
      <header className="bg-[#FFF4E6] px-5 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="kicker">{t("indexKicker")}</p>
          <h1 className="mt-4 max-w-3xl">
            {t("indexTitle")}{" "}
            <span className="text-[color:var(--brand-orange)]">
              {t("indexTitleAccent")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-[color:var(--brand-muted)]">
            {t("indexBody")}
          </p>
        </div>
      </header>

      <section className="bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl space-y-24">
          {destinations.map((country) => (
            <article key={country.slug}>
              <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                <Link
                  href={`/destinations/${country.slug}`}
                  className="group relative block aspect-[5/4] overflow-hidden rounded-[28px] bg-[#1a1a1a]"
                >
                  <Image
                    src={country.heroImage}
                    alt={`${country.name} landscape`}
                    fill
                    sizes="(min-width: 1024px) 600px, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_44%,rgba(43,43,43,0.7))]"
                  />
                  <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4 text-white md:bottom-9 md:left-9 md:right-9">
                    <h2 className="font-display text-[2.25rem] font-bold leading-none tracking-[0.005em] text-white md:text-[3rem]">
                      {country.name}
                    </h2>
                    <span className="rounded-full bg-white/15 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/95 backdrop-blur">
                      {country.routeCountLabel}
                    </span>
                  </div>
                </Link>

                <div>
                  <p className="text-[1.0625rem] leading-[1.7] text-[color:var(--brand-muted)]">
                    {country.description}
                  </p>

                  <div className="mt-8">
                    <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
                      {t("regionsLabel")}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {country.sectors.map((sector) => (
                        <li key={sector.slug}>
                          <Link
                            href={`/destinations/${sector.slug}`}
                            className="inline-flex items-center rounded-full border border-[#E8E1D2] bg-white px-4 py-2 text-[0.85rem] font-medium text-[color:var(--brand-text)] transition hover:border-[color:var(--brand-orange)] hover:bg-[#FFF4E6] hover:text-[color:var(--brand-orange)]"
                          >
                            {sector.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/destinations/${country.slug}`}
                    className="brand-pill mt-10 w-fit"
                  >
                    Explore {country.name}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
