import { ArrowRight, BadgePercent, CalendarHeart, Coins, Gift, PartyPopper, Repeat, Ticket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SampleBadge } from "@/components/promo/sample-badge";
import {
  MEMBER_CAMPAIGNS,
  MEMBER_STEPS,
  type MemberCampaign,
  type MemberCampaignKey,
} from "@/lib/member-exclusive";

const CAMPAIGN_ICONS: Record<MemberCampaignKey, LucideIcon> = {
  memberPrices: BadgePercent,
  memberDay: CalendarHeart,
  anniversary: PartyPopper,
  luckyDraw: Gift,
  vouchers: Ticket,
};

export function MemberSteps() {
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">How membership works</p>
        <h2 className="mt-4 max-w-2xl text-balance">
          Four steps to <span className="text-[color:var(--brand-orange)]">your first reward</span>
        </h2>
        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {MEMBER_STEPS.map((step, i) => (
            <li key={step.title} className="rounded-[24px] p-7 ring-1 ring-[color:var(--brand-border)]">
              <span className="font-display text-[2.2rem] leading-none text-[color:var(--brand-teal)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[1.15rem] font-bold text-[color:var(--brand-ink)]">{step.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-[1.6] text-[color:var(--brand-muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function MemberPoints() {
  const cards = [
    { icon: Coins, title: "Earn points", body: "Points are added to your account when you travel with us." },
    { icon: Repeat, title: "Redeem rewards", body: "Exchange points for rewards from your member account." },
  ];

  return (
    <section className="bg-[color:var(--brand-cream)] px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="kicker">Points</p>
          <h2 className="mt-4 text-balance">
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
          {cards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[24px] bg-white p-7 ring-1 ring-[color:var(--brand-border)]">
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

export function MemberCampaigns() {
  return (
    <section className="bg-[color:var(--brand-teal-soft)] px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Member offers</p>
        <h2 className="mt-4 max-w-2xl text-balance">
          Promotions <span className="text-[color:var(--brand-orange)]">for members only</span>
        </h2>
        <div className="mt-12 space-y-6">
          {MEMBER_CAMPAIGNS.map((c) => (
            <CampaignBlock key={c.key} campaign={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignBlock({ campaign }: { campaign: MemberCampaign }) {
  const Icon = CAMPAIGN_ICONS[campaign.key];
  return (
    <article className="grid gap-6 rounded-[28px] bg-white p-7 ring-1 ring-[color:var(--brand-border)] md:grid-cols-[0.7fr_1.3fr] md:p-9">
      <div>
        <span className="grid size-12 place-items-center rounded-full bg-[color:var(--brand-teal-soft)] text-[color:var(--brand-teal-deep)]">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="mt-5 font-display text-[1.4rem] font-bold text-[color:var(--brand-ink)]">{campaign.title}</h3>
        <p className="mt-2 text-[0.92rem] leading-[1.6] text-[color:var(--brand-muted)]">{campaign.description}</p>
      </div>
      {campaign.items.length === 0 ? (
        <p className="self-center rounded-[20px] bg-[color:var(--brand-cream)] p-6 text-center text-[0.92rem] font-semibold text-[color:var(--brand-orange)]">
          Coming soon
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {campaign.items.map((offer) => (
            <div key={offer.title} className="flex flex-col rounded-[20px] bg-[color:var(--brand-cream)] p-6">
              {offer.sample && <SampleBadge className="self-start bg-white" />}
              <p className="mt-3 font-semibold text-[color:var(--brand-ink)]">{offer.title}</p>
              <p className="mt-1.5 text-[0.88rem] leading-[1.55] text-[color:var(--brand-muted)]">{offer.detail}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {offer.facts.map((f) => (
                  <li key={f} className="rounded-full bg-white px-3 py-1 text-[0.75rem] font-semibold text-[color:var(--brand-text)]">
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={offer.cta.href}
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.85rem] font-semibold text-[color:var(--brand-orange)] transition hover:text-[color:var(--brand-orange-deep)]"
              >
                {offer.cta.label}
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export function MemberClosingCta() {
  return (
    <section className="bg-white px-5 pb-28 pt-8 md:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-[color:var(--brand-ink)] px-7 py-14 text-center text-white md:px-12 md:py-16">
        <p className="text-[0.78rem] font-semibold capitalize tracking-[0.04em] text-[color:var(--brand-teal)]">
          Join free
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-white">
          Start collecting <span className="text-[color:var(--brand-orange)]">on your next trip</span>
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/sign-in" className="brand-pill gap-2">
            Sign In / Join
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/tours" className="brand-pill-ghost">
            Browse Trips
          </Link>
        </div>
      </div>
    </section>
  );
}
