import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatSgd } from "@/lib/format";
import type { TourCardData } from "@/lib/tours";

interface TourCardProps {
  tour: TourCardData;
}

export async function TourCard({ tour }: TourCardProps) {
  const t = await getTranslations("tours");
  const price = tour.departures[0]?.priceSgd ?? tour.basePriceSgd;

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-[#E8E1D2] transition hover:ring-[color:var(--brand-orange)] hover:shadow-[0_18px_40px_-22px_rgba(43,43,43,0.32)]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#FFF4E6]">
        {tour.heroImage ? (
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-orange)_18%,transparent),color-mix(in_srgb,var(--brand-teal)_18%,transparent))]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">
          {t("days", { count: tour.durationDays })}
        </p>
        <h3 className="line-clamp-2 font-display text-[1.25rem] font-bold leading-[1.18] tracking-[0.005em] text-[color:var(--brand-gold)]">
          {tour.title}
        </h3>
        <p className="line-clamp-2 text-[0.95rem] leading-[1.55] text-[color:var(--brand-muted)]">
          {tour.summary}
        </p>

        {tour.destinations.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {tour.destinations.slice(0, 3).map((d) => (
              <span
                key={d.slug}
                className="inline-flex items-center rounded-full bg-[#FFF4E6] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[color:var(--brand-gold)]"
              >
                {d.name}
              </span>
            ))}
          </div>
        )}

        <div
          className={
            tour.destinations.length > 0
              ? "flex items-end justify-between gap-3 border-t border-[#F1E8D6] pt-4"
              : "mt-auto flex items-end justify-between gap-3 border-t border-[#F1E8D6] pt-4"
          }
        >
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-muted)]">
              {t("from")}
            </p>
            <p className="font-display text-[1.25rem] font-bold tabular-nums text-[color:var(--brand-orange)]">
              {formatSgd(price)}
            </p>
            <p className="text-[0.7rem] text-[color:var(--brand-muted)]">
              {t("perPerson")}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-end pb-1 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-orange)] underline-offset-4 group-hover:underline">
            {t("viewDetails")}
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
