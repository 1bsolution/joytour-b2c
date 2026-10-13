import { setRequestLocale } from "next-intl/server";
import { ComingSoon } from "@/components/promo/coming-soon";
import { SectionHero } from "@/components/promo/section-hero";
import { TourCollection } from "@/components/promo/tour-collection";
import { TOUR_TAGS, listTours } from "@/lib/tours";

export const metadata = {
  title: "Flight Promotions",
  description:
    "Flight and flight + hotel promotions from Joytour Holidays. Enquire on WhatsApp and a planner will confirm seats and fares.",
};

export default async function FlightPromotionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tours = await listTours({ tag: TOUR_TAGS.flightPromo });

  return (
    <>
      <SectionHero
        kicker="Flight Promotions"
        title={
          <>
            Seats and fares, <span className="text-[color:var(--brand-orange)]">confirmed by a person</span>
          </>
        }
        body="Air tickets and flight + hotel bundles. Promotions are shown for information — message us on WhatsApp and a planner will check availability and book for you."
      />
      <TourCollection
        tours={tours}
        whatsappEnquiry
        emptyState={
          <ComingSoon
            title="No flight promotions right now"
            body="New fares are posted here as airlines release them. Tell us your route and dates and we'll look for the best fare available."
            enquiryMessage="Hi Joytour, I'd like to enquire about flight promotions."
          />
        }
      />
    </>
  );
}
