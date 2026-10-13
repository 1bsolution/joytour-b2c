import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FaqList } from "@/components/promo/faq-list";
import { SectionHero } from "@/components/promo/section-hero";
import {
  MemberCampaigns,
  MemberClosingCta,
  MemberPoints,
  MemberSteps,
} from "@/components/member/member-sections";
import { MEMBER_FAQ } from "@/lib/member-exclusive";

export const metadata = {
  title: "Member Exclusive",
  description:
    "Joytour member benefits — earn points on every trip, redeem rewards, and unlock members-only promotions.",
};

export default async function MemberExclusivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectionHero
        kicker="Member Exclusive"
        title={
          <>
            Travel with us,{" "}
            <span className="whitespace-nowrap text-[color:var(--brand-orange)]">get more back</span>
          </>
        }
        body="Sign in to collect points on your bookings, redeem rewards, and see the promotions we keep for members."
      >
        <Link href="/sign-in" className="brand-pill gap-2">
          Sign In
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </SectionHero>
      <MemberSteps />
      <MemberPoints />
      <MemberCampaigns />
      <FaqList
        kicker="FAQ"
        title={
          <>
            Membership <span className="text-[color:var(--brand-orange)]">questions</span>
          </>
        }
        items={MEMBER_FAQ}
      />
      <MemberClosingCta />
    </>
  );
}
