import Image from "next/image";
import { ArrowRight, Award, Check, Handshake, Presentation, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SampleBadge } from "@/components/promo/sample-badge";
import {
  MICE_ACTIVITY_LABEL,
  MICE_CAPABILITIES,
  MICE_ENQUIRY_MESSAGE,
  MICE_PROCESS,
  type MiceCase,
} from "@/lib/mice";
import { whatsappHref } from "@/lib/whatsapp";

const SERVICES = [
  { icon: Presentation, title: "Meetings", body: "Venues, AV and logistics for meetings and offsites overseas." },
  { icon: Award, title: "Incentive Travel", body: "Reward trips for high-performing teams and partners." },
  { icon: Handshake, title: "Conferences & Exhibitions", body: "Delegate travel, accommodation and transfers for events and trade shows." },
  { icon: Users, title: "Team Building", body: "Activities and retreats that bring a team together." },
];

export function MiceEnquiryButtons() {
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

export function MiceServices() {
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">What we handle</p>
        <h2 className="mt-4 max-w-2xl text-balance">
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

export function MiceCapabilities() {
  return (
    <section className="bg-[color:var(--brand-cream)] px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="kicker">One team, every detail</p>
          <h2 className="mt-4 text-balance">
            Everything a group trip <span className="text-[color:var(--brand-orange)]">needs</span>
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[color:var(--brand-text)]">
            One planner coordinates flights, hotels, venues, transport and the
            programme, so your team deals with one point of contact instead of a
            dozen suppliers.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {MICE_CAPABILITIES.map((c) => (
            <li key={c.title} className="flex gap-4">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[color:var(--brand-orange)] text-white">
                <Check className="size-3.5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-[color:var(--brand-ink)]">{c.title}</p>
                <p className="mt-1 text-[0.92rem] leading-[1.6] text-[color:var(--brand-muted)]">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MiceProcess() {
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">How it works</p>
        <h2 className="mt-4 max-w-2xl text-balance">
          From brief to <span className="text-[color:var(--brand-orange)]">boarding</span>
        </h2>
        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {MICE_PROCESS.map((step, i) => (
            <li key={step.title} className="relative rounded-[24px] p-7 ring-1 ring-[color:var(--brand-border)]">
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

export function MiceCases({ cases }: { cases: readonly MiceCase[] }) {
  return (
    <section className="bg-[color:var(--brand-teal-soft)] px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Case studies</p>
        <h2 className="mt-4 text-balance">
          Trips we&apos;ve <span className="text-[color:var(--brand-orange)]">delivered</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <article key={c.id} className="flex flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-[color:var(--brand-border)]">
              {c.images[0] && (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={c.images[0]}
                    alt={`${c.industry} — ${c.destination}`}
                    fill
                    sizes="(min-width: 768px) 360px, 90vw"
                    className="object-cover"
                  />
                  {c.sample && <SampleBadge className="absolute left-4 top-4 bg-white/90" />}
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <p className="text-[0.78rem] font-semibold capitalize tracking-[0.04em] text-[color:var(--brand-teal-deep)]">
                  {MICE_ACTIVITY_LABEL[c.activityType]} · {c.destination}
                </p>
                <h3 className="mt-2 font-display text-[1.3rem] font-bold text-[color:var(--brand-ink)]">{c.industry}</h3>
                <p className="mt-4 text-[0.95rem] leading-[1.65] text-[color:var(--brand-text)]">{c.summary}</p>
                <dl className="mt-auto flex gap-6 border-t border-[color:var(--brand-divider)] pt-5 text-[0.85rem]">
                  <div>
                    <dt className="text-[color:var(--brand-muted)]">Group</dt>
                    <dd className="font-semibold text-[color:var(--brand-ink)]">{c.pax} pax</dd>
                  </div>
                  <div>
                    <dt className="text-[color:var(--brand-muted)]">Duration</dt>
                    <dd className="font-semibold text-[color:var(--brand-ink)]">{c.days} days</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MiceClosingCta() {
  return (
    <section className="bg-white px-5 pb-28 pt-8 md:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-[color:var(--brand-ink)] px-7 py-14 text-center text-white md:px-12 md:py-16">
        <p className="text-[0.78rem] font-semibold capitalize tracking-[0.04em] text-[color:var(--brand-teal)]">
          MICE enquiry
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-white">
          Planning a company trip? <span className="text-[color:var(--brand-orange)]">Talk to us</span>
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <MiceEnquiryButtons />
        </div>
      </div>
    </section>
  );
}
