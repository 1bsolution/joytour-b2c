import { setRequestLocale } from "next-intl/server";
import { ComingSoon } from "@/components/promo/coming-soon";
import { SectionHero } from "@/components/promo/section-hero";
import { TourCollection } from "@/components/promo/tour-collection";
import { TOUR_TAGS, listTours } from "@/lib/tours";

export const metadata = {
  title: "Getaways",
  description:
    "Short getaways from Singapore — quick escapes planned by Joytour Holidays for long weekends and school breaks.",
};

export default async function GetawaysPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tours = await listTours({ tag: TOUR_TAGS.getaways });

  return (
    <>
      <SectionHero
        kicker="Getaways"
        title={
          <>
            Short trips, <span className="text-[color:var(--brand-orange)]">close to home</span>
          </>
        }
        body="Quick escapes from Singapore for a long weekend or a school break — less time travelling, more time away."
      />
      <TourCollection
        tours={tours}
        emptyState={
          <ComingSoon
            title="Getaways are being prepared"
            body="Our first short-trip departures are on the way. Send us your dates and a planner will suggest a getaway that fits."
            enquiryMessage="Hi Joytour, I'd like to enquire about a short getaway."
          />
        }
      />
    </>
  );
}
