// Default itinerary / departure / inclusion content derived from the lightweight
// tour metadata in `tours.ts`. The corporate copy doesn't yet ship day-by-day
// content, so this module produces plausible, brand-consistent placeholder
// content that scales by duration and destinations. Swap for real CMS data
// later — the consumers depend on the exported shapes, not the seed values.

import type { TourDetail } from "@/lib/tours";

export type MealCode = "breakfast" | "lunch" | "dinner";

export interface ItineraryDay {
  readonly day: number;
  readonly title: string;
  readonly description: string;
  readonly meals: ReadonlyArray<MealCode>;
}

export type DepartureStatus = "available" | "limited" | "sold-out";

export interface DepartureSlot {
  readonly id: string;
  readonly date: string; // ISO date (YYYY-MM-DD)
  readonly status: DepartureStatus;
  readonly priceSgd: number;
  readonly tourCode: string;
}

export interface TourDetailContent {
  readonly itinerary: ReadonlyArray<ItineraryDay>;
  readonly departures: ReadonlyArray<DepartureSlot>;
  readonly inclusions: ReadonlyArray<string>;
  readonly exclusions: ReadonlyArray<string>;
  readonly importantNotes: ReadonlyArray<string>;
}

const ALL_MEALS: ReadonlyArray<MealCode> = ["breakfast", "lunch", "dinner"];

const FALLBACK_CITIES: Record<TourDetail["country"], string[]> = {
  china: ["Beijing"],
  japan: ["Tokyo"],
};

function destinationNames(tour: TourDetail): string[] {
  const names = tour.destinations.map((d) => d.name);
  if (names.length > 0) return names;
  return FALLBACK_CITIES[tour.country];
}

function countryLabel(tour: TourDetail): string {
  return tour.country === "japan" ? "Japan" : "China";
}

function buildItinerary(tour: TourDetail): ItineraryDay[] {
  const cities = destinationNames(tour);
  const arrivalCity = cities[0];
  const departureCity = cities[cities.length - 1];
  const country = countryLabel(tour);
  const days: ItineraryDay[] = [];

  for (let i = 1; i <= tour.durationDays; i++) {
    if (i === 1) {
      days.push({
        day: 1,
        title: `Singapore → ${arrivalCity} · Arrival & welcome`,
        description: `Depart Singapore on your morning flight and touch down in ${arrivalCity} by afternoon. Your Joytour leader meets you at the arrivals hall for a private transfer to the hotel, with a relaxed welcome dinner introducing the route ahead.`,
        meals: ["dinner"],
      });
      continue;
    }
    if (i === tour.durationDays) {
      days.push({
        day: i,
        title: `${departureCity} → Singapore · Farewell`,
        description: `After a leisurely breakfast and a final stroll through ${departureCity}, transfer to the airport for your return flight to Singapore — bringing this ${country} journey to a close.`,
        meals: ["breakfast"],
      });
      continue;
    }

    const city = cities[(i - 2) % cities.length] ?? arrivalCity;
    const cycle = (i - 2) % 4;
    if (cycle === 0) {
      days.push({
        day: i,
        title: `${city} · Signature sights`,
        description: `Spend the morning at the headline landmarks of ${city} with a private guide, including skip-the-line entry where applicable. Lunch is at a vetted local restaurant before an unhurried afternoon walking tour through the old town.`,
        meals: ALL_MEALS,
      });
    } else if (cycle === 1) {
      days.push({
        day: i,
        title: `${city} · Nature & scenic drive`,
        description: `Head out of the city for a scenic drive into the surrounding countryside — viewpoints, photo stops and tea breaks built into a comfortable pace. Return for an early evening; dinner is at a chef's-pick restaurant near the hotel.`,
        meals: ["breakfast", "lunch", "dinner"],
      });
    } else if (cycle === 2) {
      days.push({
        day: i,
        title: `${city} · Cultural immersion`,
        description: `A slower, deeper day in ${city}: a museum or heritage workshop in the morning, followed by an artisan-led experience and time in a neighbourhood market. Dinner showcases a regional speciality.`,
        meals: ["breakfast", "dinner"],
      });
    } else {
      days.push({
        day: i,
        title: `${city} · At leisure & local favourites`,
        description: `A balanced day with a half-day guided programme of off-the-beaten-track spots and an afternoon kept free for personal exploration. Your tour leader is on hand with recommendations and unlimited tea.`,
        meals: ["breakfast", "lunch"],
      });
    }
  }
  return days;
}

function isoDateOnly(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function tourCodeFor(tour: TourDetail, date: Date): string {
  const country = tour.country === "japan" ? "JP" : "CN";
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(2);
  return `JT${country}${tour.durationDays}D${dd}/${yy}SG`;
}

function buildDepartures(tour: TourDetail): DepartureSlot[] {
  // Deterministic dates seeded from today (re-computed at build time for the
  // static page). First departure ~4 weeks out; then every 2 weeks for 6 slots.
  const today = new Date();
  const day = today.getDay();
  const daysUntilSat = (6 - day + 7) % 7 || 7;
  const first = new Date(today);
  first.setDate(today.getDate() + daysUntilSat + 21);

  const slots: DepartureSlot[] = [];
  for (let i = 0; i < 6; i++) {
    const date = new Date(first);
    date.setDate(first.getDate() + i * 14);

    let status: DepartureStatus = "available";
    if (i === 0) status = "limited";
    else if (i === 4) status = "sold-out";

    const priceOffsetPct = i % 3 === 0 ? -0.04 : i % 3 === 1 ? 0 : 0.07;
    const price =
      Math.round((tour.basePriceSgd * (1 + priceOffsetPct)) / 10) * 10;

    slots.push({
      id: `${tour.slug}-${isoDateOnly(date)}`,
      date: isoDateOnly(date),
      status,
      priceSgd: price,
      tourCode: tourCodeFor(tour, date),
    });
  }
  return slots;
}

function buildInclusions(tour: TourDetail): string[] {
  return [
    "Return economy class flights between Singapore and the gateway city",
    `${tour.durationNights} nights' twin-share accommodation in 4★ and 5★ hotels`,
    "Daily meals as listed in the itinerary (B = breakfast, L = lunch, D = dinner)",
    "Private air-conditioned coach with experienced English-speaking tour leader",
    "All entrance fees, scenic transfers and activities listed in the itinerary",
    "Joytour travel folder, luggage tag, and 24-hour Singapore support hotline",
  ];
}

function buildExclusions(): string[] {
  return [
    "Personal expenses, mini-bar, laundry and travel insurance",
    "Tips for tour leader, local guide and driver (recommended SGD 10 per traveller per day)",
    "Optional excursions and meals not specified in the itinerary",
    "Single room supplement (please request a quote on enquiry)",
    "Visa fees where applicable and any airport-related surcharges",
  ];
}

function buildImportantNotes(tour: TourDetail): string[] {
  const country = countryLabel(tour);
  return [
    `A valid passport with at least 6 months' validity from the date of return is required for entry into ${country}.`,
    "Itinerary, hotels and flight schedules may change due to weather, operational requirements or local conditions; equivalent alternatives will be arranged.",
    "Each departure runs with a minimum group size of 16 travellers. Smaller departures may be re-scheduled with advance notice.",
    "Comprehensive travel insurance — covering medical, cancellation, baggage and trip interruption — is strongly recommended for every traveller.",
    "All prices are quoted in Singapore dollars (SGD) and are subject to airline taxes, fuel surcharges and currency movements at the time of confirmation.",
    "Children under 12 sharing with two adults may qualify for reduced fares. Please enquire about child-with-bed and child-no-bed pricing.",
  ];
}

export function buildTourDetailContent(tour: TourDetail): TourDetailContent {
  return {
    itinerary: buildItinerary(tour),
    departures: buildDepartures(tour),
    inclusions: buildInclusions(tour),
    exclusions: buildExclusions(),
    importantNotes: buildImportantNotes(tour),
  };
}

export function formatDepartureRange(
  isoDate: string,
  durationDays: number,
): string {
  const start = new Date(`${isoDate}T00:00:00`);
  const end = new Date(start);
  end.setDate(start.getDate() + durationDays - 1);
  const fmt = new Intl.DateTimeFormat("en-SG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

export function statusLabel(status: DepartureStatus): string {
  switch (status) {
    case "available":
      return "Available";
    case "limited":
      return "Limited seats";
    case "sold-out":
      return "Sold out";
  }
}
