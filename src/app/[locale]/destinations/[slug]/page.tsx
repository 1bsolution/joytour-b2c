import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { allSlugs, findSlug, type Country, type Sector } from "@/lib/destinations";
import { listTours } from "@/lib/tours";
import { TourCard } from "@/components/tour/tour-card";

export const dynamicParams = false;

export async function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const found = findSlug(slug);
  if (!found) notFound();

  if (found.kind === "country") {
    return <CountryView country={found.country} />;
  }
  return <SectorView country={found.country} sector={found.sector} />;
}

async function CountryView({ country }: { country: Country }) {
  const t = await getTranslations("destinations");
  const tours = await listTours({ country: country.slug as "china" | "japan" });

  return (
    <>
      <Hero
        eyebrow={country.routeCountLabel}
        title={country.name}
        subtitle={country.description}
        image={country.heroImage}
      />

      <nav className="bg-white px-5 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-muted)] transition hover:text-[color:var(--brand-orange)]"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            {t("back")}
          </Link>
        </div>
      </nav>

      <section className="bg-white px-5 pb-20 pt-12 md:px-8 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <p className="kicker">{t("regionsLabel")}</p>
              <h2 className="mt-4 max-w-2xl">
                Routes through{" "}
                <span className="text-[color:var(--brand-orange)]">
                  {country.name}
                </span>
              </h2>
            </div>
            <Link href="/tours" className="hidden text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-orange)] underline-offset-4 hover:underline md:inline-flex">
              {t("browseAllRoutes")}
              <span aria-hidden className="ml-2">→</span>
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {country.sectors.map((sector) => (
              <SectorTile key={sector.slug} sector={sector} viewLabel={t("viewSector")} />
            ))}
          </div>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="bg-[#FFF4E6] px-5 py-24 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-end gap-6 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                <p className="kicker">All routes</p>
                <h2 className="mt-4 max-w-2xl">
                  Currently booking in{" "}
                  <span className="text-[color:var(--brand-orange)]">
                    {country.name}
                  </span>
                </h2>
              </div>
              <p className="text-[0.95rem] text-[color:var(--brand-muted)]">
                {tours.length} {tours.length === 1 ? "route" : "routes"}
              </p>
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

async function SectorView({
  country,
  sector,
}: {
  country: Country;
  sector: Sector;
}) {
  const t = await getTranslations("destinations");
  const tours = await listTours({ destinationSlug: sector.slug });

  return (
    <>
      <Hero
        eyebrow={country.name}
        title={sector.name}
        subtitle={sector.description}
        image={sector.heroImage}
      />

      <nav className="bg-white px-5 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto flex max-w-6xl items-center gap-6">
          <Link
            href={`/destinations/${country.slug}`}
            className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-muted)] transition hover:text-[color:var(--brand-orange)]"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            All {country.name}
          </Link>
        </div>
      </nav>

      <section className="bg-white px-5 pb-28 pt-12 md:px-8 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">{country.name}</p>
              <h2 className="mt-4">
                {t("tourCardsTitle", { sector: sector.name })}
              </h2>
            </div>
            <p className="hidden text-[0.95rem] text-[color:var(--brand-muted)] md:block">
              {tours.length === 0
                ? t("noTours")
                : `${tours.length} ${tours.length === 1 ? "route" : "routes"}`}
            </p>
          </div>

          {tours.length === 0 ? (
            <div className="mt-12 rounded-[28px] border border-[#E8E1D2] bg-[#FFF4E6] p-10 md:p-14">
              <p className="font-display text-[1.5rem] font-bold leading-tight text-[color:var(--brand-gold)]">
                {t("noTours")}
              </p>
              <p className="mt-4 max-w-2xl text-[1rem] leading-[1.7] text-[color:var(--brand-muted)]">
                {t("tourCardsEmpty")}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="brand-pill">
                  Send us an enquiry
                </Link>
                <Link
                  href={`/destinations/${country.slug}`}
                  className="inline-flex h-12 items-center rounded-full border border-[#E8E1D2] bg-white px-7 text-[0.95rem] font-medium text-[color:var(--brand-text)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
                >
                  Browse other {country.name} regions
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Hero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] text-white">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(80,190,180,0.5) 0%, rgba(26,26,26,0.84) 92%)",
          opacity: 0.94,
        }}
      />
      <div className="relative mx-auto flex min-h-[460px] max-w-6xl flex-col justify-end px-5 pb-16 pt-36 md:min-h-[520px] md:px-8 md:pb-20 md:pt-40">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-amber)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.25rem,1.7rem+2.6vw,3.75rem)] font-extrabold leading-[1.04] tracking-[0.005em] text-white">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-white/85">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

function SectorTile({ sector, viewLabel }: { sector: Sector; viewLabel: string }) {
  return (
    <Link
      href={`/destinations/${sector.slug}`}
      className="group flex flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-[#E8E1D2] transition hover:ring-[color:var(--brand-orange)]"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-[#1a1a1a]">
        <Image
          src={sector.heroImage}
          alt={sector.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 90vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-[1.5rem] font-bold leading-[1.1] tracking-[0.005em] text-[color:var(--brand-gold)]">
          {sector.name}
        </h3>
        <p className="line-clamp-3 text-[0.95rem] leading-[1.6] text-[color:var(--brand-muted)]">
          {sector.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-orange)] underline-offset-4 group-hover:underline">
          {viewLabel}
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
