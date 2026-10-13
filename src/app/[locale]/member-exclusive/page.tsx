import { setRequestLocale } from "next-intl/server";
import { ArrowRight, BadgePercent, CalendarHeart, Gift, PartyPopper, Ticket, Coins, Repeat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHero } from "@/components/promo/section-hero";
import { MEMBER_CAMPAIGNS, type MemberCampaignKey } from "@/lib/member-exclusive";

export const metadata = {
  title: "Member Exclusive",
  description:
    "Joytour member benefits — earn points on every trip, redeem rewards, and unlock members-only promotions.",
};

const CAMPAIGN_ICONS: Record<MemberCampaignKey, LucideIcon> = {
  memberPrices: BadgePercent,
  memberDay: CalendarHeart,
  anniversary: PartyPopper,
  luckyDraw: Gift,
  vouchers: Ticket,
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
            Travel with us, <span className="text-[color:var(--brand-orange)]">get more back</span>
          </>
        }
        body="Sign in to collect points on your bookings, redeem rewards, and see the promotions we keep for members."
      >
        <Link href="/sign-in" className="brand-pill gap-2">
          Sign In
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </SectionHero>
      <Points />
      <Campaigns />
    </>
  );
}

function Points() {
  const steps = [
    { icon: Coins, title: "Earn points", body: "Points are added to your account when you travel with us." },
    { icon: Repeat, title: "Redeem rewards", body: "Exchange points for rewards from your member account." },
  ];

  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="kicker">Points</p>
          <h2 className="mt-4">
            How <span className="text-[color:var(--brand-orange)]">points</span> work
          </h2>
          <Link
            href="/sign-in"
            className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-[color:var(--brand-orange)] transition hover:text-[color:var(--brand-orange-deep)]"
          >
            Sign in to view and redeem your points
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {steps.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[24px] bg-[color:var(--brand-cream)] p-7 ring-1 ring-[color:var(--brand-border)]">
              <span className="grid size-12 place-items-center rounded-full bg-[color:var(--brand-orange)] text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-[1.15rem] font-bold text-[color:var(--brand-ink)]">{title}</h3>
              <p className="mt-3 text-[0.92rem] leading-[1.6] text-[color:var(--brand-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Campaigns() {
  return (
    <section className="bg-[color:var(--brand-teal-soft)] px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Member offers</p>
        <h2 className="mt-4 max-w-2xl">
          Promotions <span className="text-[color:var(--brand-orange)]">for members only</span>
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBER_CAMPAIGNS.map((c) => {
            const Icon = CAMPAIGN_ICONS[c.key];
            return (
              <article key={c.key} className="flex flex-col rounded-[24px] bg-white p-7 ring-1 ring-[color:var(--brand-border)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-[color:var(--brand-teal-soft)] text-[color:var(--brand-teal-deep)]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  {c.items.length === 0 && (
                    <span className="rounded-full bg-[color:var(--brand-cream)] px-3 py-1 text-[0.72rem] font-semibold text-[color:var(--brand-orange)]">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-[1.2rem] font-bold text-[color:var(--brand-ink)]">{c.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-[1.6] text-[color:var(--brand-muted)]">{c.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
