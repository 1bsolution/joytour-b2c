import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Globe2, MapPin, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getTourBySlug,
  listSimilarTours,
  allTourSlugs,
  parseDescription,
} from "@/lib/tours";
import { formatSgd } from "@/lib/format";
import { TourCard } from "@/components/tour/tour-card";

export const dynamicParams = false;

export async function generateStaticParams() {
  return allTourSlugs().map((slug) => ({ slug }));
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const similar = await listSimilarTours(tour, 3);
  const parsed = parseDescription(tour.description);

  return (
    <>
      <Hero
        title={tour.title}
        summary={tour.summary}
        image={tour.heroImage}
        country={tour.country === "china" ? "China" : "Japan"}
        durationLabel={tour.durationLabel}
      />

      <nav className="bg-white px-5 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-muted)] transition hover:text-[color:var(--brand-orange)]"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            All tours
          </Link>
        </div>
      </nav>

      <section className="bg-white px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.65fr_1fr] lg:gap-16">
          <div>
            {parsed.kind === "highlights" ? (
              <>
                <p className="kicker">Key Highlights</p>
                <h2 className="mt-4">
                  What&apos;s on{" "}
                  <span className="text-[color:var(--brand-orange)]">this route</span>
                </h2>
                <ul className="mt-8 grid gap-4 md:grid-cols-2">
                  {parsed.items.map((item) => (
                    <li
                      key={item.title}
                      className="flex gap-4 rounded-[20px] bg-[#FFF4E6] p-5"
                    >
                      <Check
                        className="mt-1 size-4 shrink-0 text-[color:var(--brand-orange)]"
                        aria-hidden
                      />
                      <div>
                        <p className="font-display text-[1.0625rem] font-bold leading-[1.2] tracking-[0.005em] text-[color:var(--brand-gold)]">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-[0.95rem] leading-[1.6] text-[color:var(--brand-text)]">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="kicker">About this route</p>
                <h2 className="mt-4">
                  The <span className="text-[color:var(--brand-orange)]">trip in brief</span>
                </h2>
                <div className="mt-7 max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-[color:var(--brand-text)]">
                  {parsed.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] border border-[#E8E1D2] bg-white p-7 shadow-[0_18px_40px_-22px_rgba(43,43,43,0.18)] md:p-8">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[color:var(--brand-muted)]">
                From
              </p>
              <p className="mt-1 font-display text-[2rem] font-bold leading-none text-[color:var(--brand-orange)] tabular-nums">
                {formatSgd(tour.basePriceSgd)}
              </p>
              <p className="mt-1 text-[0.8rem] text-[color:var(--brand-muted)]">
                per person, twin-share
              </p>

              <ul className="mt-6 space-y-3 border-t border-[#F1E8D6] pt-6 text-[0.95rem] text-[color:var(--brand-text)]">
                <Fact icon={Clock3} label="Duration" value={`${tour.durationDays} days · ${tour.durationNights} nights`} />
                <Fact icon={Globe2} label="Country" value={tour.country === "china" ? "China" : "Japan"} />
                <Fact
                  icon={MapPin}
                  label="Regions"
                  value={tour.destinations.map((d) => d.name).join(" · ")}
                />
                <Fact icon={CalendarDays} label="Departures" value="Custom dates available" />
              </ul>

              <Link href="/contact" className="brand-pill mt-7 w-full gap-2">
                Send Enquiry
                <Send className="size-4" aria-hidden />
              </Link>
              <a
                href="https://wa.me/6586299765"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#E8E1D2] text-[0.9rem] font-medium text-[color:var(--brand-text)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
              >
                WhatsApp +65 8629 9765
              </a>
              <p className="mt-5 text-[0.78rem] leading-[1.5] text-[color:var(--brand-muted)]">
                Prices are indicative and subject to availability and seasonality. Our
                team confirms exact dates and pricing within one business day.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-[#FFF4E6] px-5 py-24 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="kicker">You may also like</p>
                <h2 className="mt-4 max-w-2xl">
                  Other routes through{" "}
                  <span className="text-[color:var(--brand-orange)]">
                    {tour.country === "china" ? "China" : "Japan"}
                  </span>
                </h2>
              </div>
              <Link
                href="/tours"
                className="inline-flex items-center text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-orange)] underline-offset-4 hover:underline"
              >
                Browse all routes
                <ArrowRight className="ml-2 size-3.5" aria-hidden />
              </Link>
            </div>
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Hero({
  title,
  summary,
  image,
  country,
  durationLabel,
}: {
  title: string;
  summary: string;
  image: string;
  country: string;
  durationLabel: string;
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
            "linear-gradient(180deg, rgba(47,124,130,0.45) 0%, rgba(43,43,43,0.84) 92%)",
          opacity: 0.94,
        }}
      />
      <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col justify-end px-5 pb-16 pt-36 md:min-h-[600px] md:px-8 md:pb-20 md:pt-44">
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-amber)]">
          <span>{country}</span>
          <span aria-hidden className="text-white/45">·</span>
          <span>{durationLabel}</span>
        </div>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,1.7rem+2.6vw,3.75rem)] font-extrabold leading-[1.04] tracking-[0.005em] text-white">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-white/85">
          {summary}
        </p>
      </div>
    </section>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-orange)]" aria-hidden />
      <span className="flex flex-1 flex-col">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-muted)]">
          {label}
        </span>
        <span className="text-[color:var(--brand-text)]">{value}</span>
      </span>
    </li>
  );
}
