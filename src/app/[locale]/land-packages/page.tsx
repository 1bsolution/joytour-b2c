import { setRequestLocale } from "next-intl/server";
import { ComingSoon } from "@/components/promo/coming-soon";
import { SectionHero } from "@/components/promo/section-hero";
import { TourCollection } from "@/components/promo/tour-collection";
import { listTours } from "@/lib/tours";

export const metadata = {
  title: "Land Packages",
  description:
    "Free & easy land packages from Joytour Holidays — hotels, transfers and local experiences arranged, with the days left to you.",
};

export default async function LandPackagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tours = await listTours({ productType: "land" });

  return (
    <>
      <SectionHero
        kicker="Land Packages"
        title={
          <>
            Free &amp; easy, <span className="text-[color:var(--brand-orange)]">properly arranged</span>
          </>
        }
        body="Hotels, transfers, local experiences and private drivers sorted before you land — the days in between are yours."
      />
      <TourCollection
        tours={tours}
        emptyState={
          <ComingSoon
            title="Land packages are being prepared"
            body="We're putting the first land packages together. Tell us where and when you'd like to go and a planner will put one together for you."
            enquiryMessage="Hi Joytour, I'd like to enquire about a land package."
          />
        }
      />
    </>
  );
}
