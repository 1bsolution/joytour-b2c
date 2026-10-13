import { setRequestLocale } from "next-intl/server";
import { FaqList } from "@/components/promo/faq-list";
import { SectionHero } from "@/components/promo/section-hero";
import {
  MiceCapabilities,
  MiceCases,
  MiceClosingCta,
  MiceEnquiryButtons,
  MiceProcess,
  MiceServices,
} from "@/components/mice/mice-sections";
import { MICE_CASES, MICE_FAQ } from "@/lib/mice";

export const metadata = {
  title: "MICE",
  description:
    "Meetings, incentive trips, conferences and team building — corporate travel planned end to end by Joytour Holidays.",
};

export default async function MicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectionHero
        kicker="MICE · Corporate Travel"
        title={
          <>
            Corporate travel, <span className="text-[color:var(--brand-orange)]">planned end to end</span>
          </>
        }
        body="Meetings, incentive trips, conferences and team building. Tell us your group size, dates and goals, and a planner will come back with a proposal."
      >
        <MiceEnquiryButtons />
      </SectionHero>
      <MiceServices />
      <MiceCapabilities />
      <MiceProcess />
      {MICE_CASES.length > 0 && <MiceCases cases={MICE_CASES} />}
      <FaqList
        kicker="FAQ"
        title={
          <>
            Questions teams <span className="text-[color:var(--brand-orange)]">usually ask</span>
          </>
        }
        items={MICE_FAQ}
      />
      <MiceClosingCta />
    </>
  );
}
