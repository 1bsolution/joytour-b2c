"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Coffee,
  Info,
  Moon,
  Printer,
  Send,
  Sun,
  Utensils,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatSgd } from "@/lib/format";
import {
  formatDepartureRange,
  statusLabel,
  type DepartureSlot,
  type DepartureStatus,
  type ItineraryDay,
  type MealCode,
  type TourDetailContent,
} from "@/lib/tour-detail-content";

interface TourDetailSectionsProps {
  readonly slug: string;
  readonly durationDays: number;
  readonly content: TourDetailContent;
}

type SectionId = "itinerary" | "departures" | "inclusions";

interface TabDef {
  readonly id: SectionId;
  readonly label: string;
}

const TABS: ReadonlyArray<TabDef> = [
  { id: "itinerary", label: "Daily Itinerary" },
  { id: "departures", label: "Price & Departures" },
  { id: "inclusions", label: "Inclusions & Notes" },
];

const MEAL_META: Record<MealCode, { label: string; Icon: typeof Sun }> = {
  breakfast: { label: "Breakfast", Icon: Coffee },
  lunch: { label: "Lunch", Icon: Utensils },
  dinner: { label: "Dinner", Icon: Moon },
};

export function TourDetailSections({
  slug,
  durationDays,
  content,
}: TourDetailSectionsProps) {
  const activeTab = useScrollSpy(TABS.map((t) => t.id));

  const scrollTo = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const stickyOffset = 72 + 56 + 12;
    const y = el.getBoundingClientRect().top + window.scrollY - stickyOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-[color:var(--brand-paper)] tour-detail-print">
      <div
        className="sticky top-[72px] z-30 border-y border-[color:var(--brand-border)] bg-white/95 backdrop-blur tour-detail-print-hide"
        aria-label="Tour detail sections"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 md:px-8">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollTo(tab.id)}
                className={`relative shrink-0 px-5 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition ${
                  isActive
                    ? "text-[color:var(--brand-orange)]"
                    : "text-[color:var(--brand-muted)] hover:text-[color:var(--brand-text)]"
                }`}
              >
                {tab.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 bottom-0 h-[2px] rounded-full transition ${
                    isActive ? "bg-[color:var(--brand-orange)]" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-24 px-5 py-20 md:px-8 md:py-24">
        <ItinerarySection days={content.itinerary} />
        <DeparturesSection
          slug={slug}
          durationDays={durationDays}
          departures={content.departures}
        />
        <InclusionsSection
          inclusions={content.inclusions}
          exclusions={content.exclusions}
          notes={content.importantNotes}
        />
      </div>
    </section>
  );
}

// ─── Itinerary ──────────────────────────────────────────────────────────────

function ItinerarySection({ days }: { days: ReadonlyArray<ItineraryDay> }) {
  return (
    <section id="itinerary" className="scroll-mt-[160px]">
      <header className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="kicker">Day by day</p>
          <h2 className="mt-4">
            Daily{" "}
            <span className="text-[color:var(--brand-orange)]">itinerary</span>
          </h2>
          <p className="mt-4 max-w-xl text-[1rem] leading-[1.65] text-[color:var(--brand-muted)]">
            A relaxed pace with anchor sights each day, generous meal stops, and
            time built in for tea, photos and exploration on your own terms.
          </p>
        </div>
        <div className="hidden gap-3 md:flex">
          {(["breakfast", "lunch", "dinner"] as const).map((meal) => {
            const { label, Icon } = MEAL_META[meal];
            return (
              <span
                key={meal}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-muted)] ring-1 ring-[color:var(--brand-border)]"
              >
                <Icon className="size-3.5" aria-hidden /> {label}
              </span>
            );
          })}
        </div>
      </header>

      <ol className="relative mt-10 space-y-6 md:space-y-8">
        {days.map((day, idx) => (
          <ItineraryDayCard
            key={day.day}
            day={day}
            isLast={idx === days.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}

function ItineraryDayCard({
  day,
  isLast,
}: {
  day: ItineraryDay;
  isLast: boolean;
}) {
  return (
    <li className="relative grid grid-cols-[40px_1fr] gap-4 md:grid-cols-[64px_1fr] md:gap-6">
      <div className="relative flex flex-col items-center pt-3">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-[color:var(--brand-orange)] font-display text-[0.875rem] font-bold text-white shadow-[0_8px_18px_-10px_rgba(250,90,10,0.6)] md:size-12 md:text-[1rem]">
          {day.day}
        </span>
        {!isLast && (
          <span
            aria-hidden
            className="absolute top-12 bottom-[-2rem] w-px bg-gradient-to-b from-[color:var(--brand-orange-soft)] to-[color:var(--brand-border)] md:top-16"
          />
        )}
      </div>

      <article className="rounded-[24px] bg-white p-6 ring-1 ring-[color:var(--brand-border)] shadow-[0_18px_38px_-26px_rgba(43,43,43,0.18)] md:p-7">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-teal-deep)]">
          Day {day.day}
        </p>
        <h3 className="mt-2 font-display text-[1.25rem] font-bold leading-[1.2] tracking-[0.005em] text-[color:var(--brand-ink)] md:text-[1.4rem]">
          {day.title}
        </h3>
        <p className="mt-3 text-[0.98rem] leading-[1.7] text-[color:var(--brand-text)]">
          {day.description}
        </p>

        {day.meals.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {day.meals.map((meal) => {
              const { label, Icon } = MEAL_META[meal];
              return (
                <span
                  key={meal}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-teal-soft)] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-teal-deep)]"
                >
                  <Icon className="size-3.5" aria-hidden /> {label}
                </span>
              );
            })}
          </div>
        )}
      </article>
    </li>
  );
}

// ─── Departures ─────────────────────────────────────────────────────────────

function DeparturesSection({
  slug,
  durationDays,
  departures,
}: {
  slug: string;
  durationDays: number;
  departures: ReadonlyArray<DepartureSlot>;
}) {
  return (
    <section id="departures" className="scroll-mt-[160px]">
      <header className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="kicker">Upcoming dates</p>
          <h2 className="mt-4">
            Price &{" "}
            <span className="text-[color:var(--brand-orange)]">departures</span>
          </h2>
          <p className="mt-4 max-w-xl text-[1rem] leading-[1.65] text-[color:var(--brand-muted)]">
            Indicative prices in Singapore dollars, twin-share. Our team confirms
            exact fares, room types and airline schedules within one business day
            of your enquiry.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-orange)] underline-offset-4 hover:underline"
        >
          Need another date? Enquire
          <Send className="size-3.5" aria-hidden />
        </Link>
      </header>

      <div className="mt-10 overflow-hidden rounded-[24px] bg-white ring-1 ring-[color:var(--brand-border)]">
        <ul className="divide-y divide-[color:var(--brand-divider)]">
          {departures.map((dep) => (
            <DepartureRow
              key={dep.id}
              slug={slug}
              dep={dep}
              durationDays={durationDays}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function DepartureRow({
  slug,
  dep,
  durationDays,
}: {
  slug: string;
  dep: DepartureSlot;
  durationDays: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isSoldOut = dep.status === "sold-out";

  const adultFares = [
    { label: "Twin Share Adult", price: dep.priceSgd },
    {
      label: "Single Supplement",
      price: Math.round((dep.priceSgd * 0.32) / 10) * 10,
    },
    {
      label: "Triple Share Adult",
      price: Math.round((dep.priceSgd * 0.95) / 10) * 10,
    },
  ];
  const childFares = [
    {
      label: "Child with Bed (2–11 yrs)",
      price: Math.round((dep.priceSgd * 0.85) / 10) * 10,
    },
    {
      label: "Child without Bed (2–11 yrs)",
      price: Math.round((dep.priceSgd * 0.7) / 10) * 10,
    },
    {
      label: "Infant (below 2 yrs)",
      price: Math.round((dep.priceSgd * 0.15) / 10) * 10,
    },
  ];

  return (
    <li className={isSoldOut ? "opacity-65" : ""}>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full flex-wrap items-center gap-4 px-5 py-5 text-left transition hover:bg-[color:var(--brand-cream)] md:px-7 md:py-6"
      >
        <Calendar
          className="size-4 shrink-0 text-[color:var(--brand-orange)]"
          aria-hidden
        />
        <div className="min-w-[14rem] flex-1">
          <p className="font-display text-[1rem] font-bold leading-[1.2] tracking-[0.005em] text-[color:var(--brand-ink)]">
            {formatDepartureRange(dep.date, durationDays)}
          </p>
          <p className="mt-1 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[color:var(--brand-muted)]">
            Tour code · {dep.tourCode}
          </p>
        </div>
        <StatusPill status={dep.status} />
        <div className="text-right">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-muted)]">
            From
          </p>
          <p className="font-display text-[1.25rem] font-bold tabular-nums text-[color:var(--brand-orange)]">
            {formatSgd(dep.priceSgd)}
          </p>
        </div>
        <ChevronDown
          className={`size-4 shrink-0 text-[color:var(--brand-muted)] transition ${
            expanded ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {expanded && (
        <div className="border-t border-[color:var(--brand-divider)] bg-[color:var(--brand-cream)]/50 px-5 py-6 md:px-7 md:py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <FareColumn title="Adult fares" rows={adultFares} />
            <FareColumn title="Child & infant fares" rows={childFares} />
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--brand-divider)] pt-6">
            <p className="text-[0.85rem] leading-[1.55] text-[color:var(--brand-muted)]">
              Fares exclude airline taxes and tipping. Final pricing is
              confirmed on enquiry.
            </p>
            {isSoldOut ? (
              <span className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--brand-grey-soft)] px-6 text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-muted)]">
                Waitlist closed
              </span>
            ) : (
              <Link
                href={`/contact?tour=${slug}&date=${dep.date}`}
                className="brand-pill gap-2 px-6"
              >
                Reserve this date
                <Send className="size-4" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

function StatusPill({ status }: { status: DepartureStatus }) {
  const styles: Record<DepartureStatus, string> = {
    available:
      "bg-[color:var(--brand-teal-soft)] text-[color:var(--brand-teal-deep)]",
    limited: "bg-[#FFE8D6] text-[color:var(--brand-orange-deep)]",
    "sold-out": "bg-[color:var(--brand-grey-soft)] text-[color:var(--brand-muted)]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${styles[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}

function FareColumn({
  title,
  rows,
}: {
  title: string;
  rows: ReadonlyArray<{ label: string; price: number }>;
}) {
  return (
    <div>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-teal-deep)]">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-dashed border-[color:var(--brand-border)] pb-2"
          >
            <span className="text-[0.95rem] text-[color:var(--brand-text)]">
              {row.label}
            </span>
            <span className="font-display text-[1rem] font-bold tabular-nums text-[color:var(--brand-ink)]">
              {formatSgd(row.price)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Inclusions & Notes ─────────────────────────────────────────────────────

function InclusionsSection({
  inclusions,
  exclusions,
  notes,
}: {
  inclusions: ReadonlyArray<string>;
  exclusions: ReadonlyArray<string>;
  notes: ReadonlyArray<string>;
}) {
  return (
    <section id="inclusions" className="scroll-mt-[160px]">
      <header>
        <p className="kicker">The fine print</p>
        <h2 className="mt-4">
          Inclusions, exclusions{" "}
          <span className="text-[color:var(--brand-orange)]">& important notes</span>
        </h2>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card
          accent="teal"
          title="What's included"
          items={inclusions}
          renderIcon={() => (
            <Sun
              className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-teal-deep)]"
              aria-hidden
            />
          )}
        />
        <Card
          accent="muted"
          title="Not included"
          items={exclusions}
          renderIcon={() => (
            <X
              className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-muted)]"
              aria-hidden
            />
          )}
        />
      </div>

      <div className="mt-6 rounded-[24px] bg-[color:var(--brand-cream)] p-7 ring-1 ring-[color:var(--brand-divider)] md:p-9">
        <div className="flex items-center gap-3">
          <Info
            className="size-5 text-[color:var(--brand-orange)]"
            aria-hidden
          />
          <h3 className="font-display text-[1.25rem] font-bold leading-[1.2] tracking-[0.005em] text-[color:var(--brand-ink)]">
            Important notes
          </h3>
        </div>
        <ul className="mt-5 space-y-3 text-[0.98rem] leading-[1.7] text-[color:var(--brand-text)]">
          {notes.map((note) => (
            <li key={note} className="flex gap-3">
              <span
                aria-hidden
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[color:var(--brand-orange)]"
              />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Card({
  title,
  items,
  accent,
  renderIcon,
}: {
  title: string;
  items: ReadonlyArray<string>;
  accent: "teal" | "muted";
  renderIcon: () => React.ReactNode;
}) {
  const accentClass =
    accent === "teal"
      ? "text-[color:var(--brand-teal-deep)]"
      : "text-[color:var(--brand-muted)]";
  return (
    <div className="rounded-[24px] bg-white p-7 ring-1 ring-[color:var(--brand-border)] md:p-8">
      <p
        className={`text-[0.72rem] font-semibold uppercase tracking-[0.2em] ${accentClass}`}
      >
        {title}
      </p>
      <ul className="mt-5 space-y-3 text-[0.98rem] leading-[1.7] text-[color:var(--brand-text)]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            {renderIcon()}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Download button (also used by sidebar) ────────────────────────────────

export function DownloadItineraryButton({ label }: { label: string }) {
  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }
  return (
    <button
      type="button"
      onClick={handlePrint}
      className="tour-detail-print-hide mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[color:var(--brand-border)] text-[0.9rem] font-medium text-[color:var(--brand-text)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
    >
      <Printer className="size-4" aria-hidden /> {label}
    </button>
  );
}

// ─── Scroll-spy hook ───────────────────────────────────────────────────────

function useScrollSpy(ids: ReadonlyArray<SectionId>): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0]);
  const idsKey = ids.join(",");

  useEffect(() => {
    const list = idsKey.split(",") as SectionId[];
    function onScroll() {
      const probe = 200;
      let current: SectionId = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe) current = id;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [idsKey]);

  return active;
}
