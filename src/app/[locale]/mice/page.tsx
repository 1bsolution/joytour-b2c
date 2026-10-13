import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Award, Handshake, Presentation, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHero } from "@/components/promo/section-hero";
import { MICE_CASES, MICE_ENQUIRY_MESSAGE, type MiceCase } from "@/lib/mice";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = {
  title: "MICE",
  description:
    "Meetings, incentive trips, conferences and team building — corporate travel planned end to end by Joytour Holidays.",
};

const SERVICES = [
  { icon: Presentation, title: "Meetings", body: "Venues, AV and logistics for meetings and offsites overseas." },
  { icon: Award, title: "Incentive Travel", body: "Reward trips for high-performing teams and partners." },
  { icon: Handshake, title: "Conferences & Exhibitions", body: "Delegate travel, accommodation and transfers for events and trade shows." },
  { icon: Users, title: "Team Building", body: "Activities and retreats that bring a team together." },
];

const ACTIVITY_LABEL: Record<MiceCase["activityType"], string> = {
  meeting: "Meeting",
  incentive: "Incentive",
  conference: "Conference",
  "team-building": "Team Building",
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
        <EnquiryButtons />
      </SectionHero>
      <Services />
      {MICE_CASES.length > 0 && <Cases cases={MICE_CASES} />}
      <section className="bg-white px-5 pb-28 pt-8 md:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] bg-[color:var(--brand-ink)] px-7 py-14 text-center text-white md:px-12 md:py-16">
          <p className="text-[0.78rem] font-semibold capitalize tracking-[0.04em] text-[color:var(--brand-teal)]">
            MICE enquiry
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-white">
            Planning a company trip? <span className="text-[color:var(--brand-orange)]">Talk to us</span>
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <EnquiryButtons />
          </div>
        </div>
      </section>
    </>
  );
}

function EnquiryButtons() {
  return (
    <>
      <a
        href={whatsappHref(MICE_ENQUIRY_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="brand-pill gap-2"
      >
        Send a MICE Enquiry
        <ArrowRight className="size-4" aria-hidden />
      </a>
      <Link href="/contact" className="brand-pill-ghost">
        Contact Us
      </Link>
    </>
  );
}

function Services() {
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">What we handle</p>
        <h2 className="mt-4 max-w-2xl">
          Four kinds of <span className="text-[color:var(--brand-orange)]">business travel</span>
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-[24px] bg-[color:var(--brand-cream)] p-7 ring-1 ring-[color:var(--brand-border)]"
            >
              <span className="grid size-12 place-items-center rounded-full bg-[color:var(--brand-teal-soft)] text-[color:var(--brand-teal-deep)]">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-[1.15rem] font-bold leading-[1.18] text-[color:var(--brand-ink)]">
                {title}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-[1.6] text-[color:var(--brand-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cases({ cases }: { cases: readonly MiceCase[] }) {
  return (
    <section className="bg-[color:var(--brand-teal-soft)] px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Case studies</p>
        <h2 className="mt-4">
          Trips we&apos;ve <span className="text-[color:var(--brand-orange)]">delivered</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <article key={c.id} className="overflow-hidden rounded-[24px] bg-white ring-1 ring-[color:var(--brand-border)]">
              {c.images[0] && (
                <div className="relative aspect-[16/9]">
                  <Image src={c.images[0]} alt={`${c.industry} — ${c.destination}`} fill sizes="(min-width: 768px) 560px, 90vw" className="object-cover" />
                </div>
              )}
              <div className="p-7">
                <p className="text-[0.78rem] font-semibold capitalize tracking-[0.04em] text-[color:var(--brand-teal-deep)]">
                  {ACTIVITY_LABEL[c.activityType]} · {c.destination}
                </p>
                <h3 className="mt-2 font-display text-[1.3rem] font-bold text-[color:var(--brand-ink)]">{c.industry}</h3>
                <p className="mt-1 text-[0.85rem] text-[color:var(--brand-muted)]">
                  {c.pax} pax · {c.days} days
                </p>
                <p className="mt-4 text-[0.95rem] leading-[1.65] text-[color:var(--brand-text)]">{c.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
