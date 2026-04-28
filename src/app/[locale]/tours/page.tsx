import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TourCard } from "@/components/tour/tour-card";
import { listTours } from "@/lib/tours";

type SearchValue = string | string[] | undefined;

function firstParam(value: SearchValue): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function ToursPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, SearchValue>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const destination = firstParam(sp.destination);
  const duration = firstParam(sp.duration);
  const countryParam = firstParam(sp.country);

  const [minDuration, maxDuration] = duration?.split("-").map(Number) ?? [];
  const allowedCountry =
    countryParam === "china" || countryParam === "japan" ? countryParam : undefined;

  const tours = await listTours({
    destinationSlug: destination,
    country: allowedCountry,
    minDuration: Number.isFinite(minDuration) ? minDuration : undefined,
    maxDuration: Number.isFinite(maxDuration) ? maxDuration : undefined,
  });

  const filterLabel = destination
    ? `Tours in ${destination.replace(/-/g, " ")}`
    : allowedCountry
    ? `Tours in ${allowedCountry === "china" ? "China" : "Japan"}`
    : null;

  return (
    <>
      <header className="bg-[color:var(--brand-cream)] px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="kicker">Routes</p>
          <h1 className="mt-4 max-w-3xl">
            All <span className="text-[color:var(--brand-orange)]">Joytour routes</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-[color:var(--brand-muted)]">
            Curated small-group itineraries through China and Japan, planned by people
            who walk these routes every season. Send an enquiry and a planner will
            confirm dates and pricing for your group within one business day.
          </p>
          {filterLabel && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[color:var(--brand-border)] bg-white py-2 pl-4 pr-2 text-[0.9rem] text-[color:var(--brand-text)]">
              <span className="font-medium capitalize">{filterLabel}</span>
              <Link
                href="/tours"
                className="rounded-full bg-[color:var(--brand-orange)] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white transition hover:bg-[color:var(--brand-amber)]"
              >
                Clear
              </Link>
            </div>
          )}
        </div>
      </header>

      <section className="bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-baseline justify-between gap-4">
            <p className="text-[0.95rem] text-[color:var(--brand-muted)]">
              {tours.length} {tours.length === 1 ? "route" : "routes"} available
            </p>
            <CountryFilter active={allowedCountry} />
          </div>

          {tours.length === 0 ? (
            <div className="rounded-[28px] border border-[color:var(--brand-border)] bg-[color:var(--brand-cream)] p-10 text-center md:p-14">
              <p className="font-display text-[1.5rem] font-bold text-[color:var(--brand-gold)]">
                No routes match these filters
              </p>
              <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-[1.7] text-[color:var(--brand-muted)]">
                Try clearing one, or send us an enquiry — we plan custom routes
                every week.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/tours" className="brand-pill">
                  Clear filters
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center rounded-full border border-[color:var(--brand-border)] px-7 text-[0.95rem] font-medium text-[color:var(--brand-text)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
                >
                  Plan a custom route
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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

function CountryFilter({ active }: { active?: "china" | "japan" }) {
  const options: Array<{ slug?: "china" | "japan"; label: string; href: string }> = [
    { label: "All", href: "/tours" },
    { slug: "china", label: "China", href: "/tours?country=china" },
    { slug: "japan", label: "Japan", href: "/tours?country=japan" },
  ];

  return (
    <div className="hidden items-center gap-1 rounded-full border border-[color:var(--brand-border)] p-1 text-[0.82rem] sm:inline-flex">
      {options.map((opt) => {
        const isActive = (active ?? undefined) === opt.slug;
        return (
          <Link
            key={opt.label}
            href={opt.href}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-full bg-[color:var(--brand-orange)] px-4 py-1.5 font-medium text-white"
                : "rounded-full px-4 py-1.5 font-medium text-[color:var(--brand-text)] transition hover:text-[color:var(--brand-orange)]"
            }
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
