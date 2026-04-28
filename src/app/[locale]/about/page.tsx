import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Compass,
  Crown,
  HeadphonesIcon,
  Heart,
  Plane,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export const metadata = {
  title: "About Us",
  description:
    "Joytour Holidays — a Singapore-based travel agency creating bespoke private travel for travellers who refuse to be cookie-cut. Over a decade of experience routing custom journeys.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CoreConcept />
      <MainBusiness />
      <DestinationFocus />
      <ServiceAdvantage />
      <ClosingCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-ink)] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(80,190,180,0.22) 0%, transparent 55%), radial-gradient(ellipse at bottom right, rgba(250,90,10,0.18) 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[480px] max-w-6xl flex-col justify-end px-5 pb-20 pt-36 md:min-h-[560px] md:px-8 md:pb-24 md:pt-44">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-teal)]">
          About us · Joytour Holidays
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,1.85rem+3.4vw,4.4rem)] font-extrabold leading-[1.04] tracking-[0.005em] text-white">
          Don&apos;t be a copywriter of the itinerary,
          <br />
          <span className="text-[color:var(--brand-orange)]">
            only a screenwriter of life
          </span>
          .
        </h1>
        <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.65] text-white/85">
          Joytour Holidays is a Singapore-based travel agency at People&apos;s Park
          Complex, focused on creating private travel quality solutions for
          travellers who want their journey to be the only version in the world.
        </p>
      </div>
    </section>
  );
}

function CoreConcept() {
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="kicker">Core Concept</p>
          <h2 className="mt-4">
            A team of <span className="text-[color:var(--brand-orange)]">bespoke experts</span>,
            ten years deep
          </h2>
        </div>
        <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-[color:var(--brand-text)]">
          <p>
            We are a team of bespoke travel experts with more than a decade of
            experience in the industry, focused on creating genuinely personalised
            travel solutions for travellers who refuse to be cookie-cut.
          </p>
          <p>
            There are no fixed packages here — only tailor-made, unique experiences.
            We are committed to providing a fully personalised, private, and
            stress-free travel experience for travellers who demand excellence.
          </p>
          <p className="font-display text-[1.25rem] font-bold leading-[1.35] text-[color:var(--brand-ink)]">
            &ldquo;Don&apos;t be a copywriter of the itinerary, only a screenwriter
            of life.&rdquo; Your trip will be the only version in the world.
          </p>
        </div>
      </div>
    </section>
  );
}

function MainBusiness() {
  const services = [
    { icon: Crown, title: "High-end Customisation", body: "Bespoke private journeys for travellers who want every detail dialled in." },
    { icon: Users, title: "Group Tours", body: "Curated small-group departures with a steady, considerate pace." },
    { icon: Sparkles, title: "Light Luxury Free & Easy", body: "Independent itineraries with the comfort of a curated, hand-held plan." },
    { icon: Briefcase, title: "Business Travel", body: "Professional itineraries for executive trips, inspection tours, and overseas meetings." },
    { icon: Building2, title: "Corporate Team Building", body: "End-to-end planning for incentive trips, brand events, and team retreats." },
  ];

  return (
    <section className="bg-[color:var(--brand-cream)] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_1.1fr] md:gap-14">
          <div>
            <p className="kicker">Main Business</p>
            <h2 className="mt-4 max-w-2xl">
              Travel that fits the{" "}
              <span className="text-[color:var(--brand-orange)]">person</span>, not the
              other way round
            </h2>
          </div>
          <p className="text-[1.0625rem] leading-[1.7] text-[color:var(--brand-text)]">
            Our main business focuses on diversified customer needs — high-end private
            custom tours for high-net-worth travellers, light-luxury experiences for
            mid-career professionals, and end-to-end planning for corporate
            team-building, brand events, and business inspections. We also organise
            themed exchange events for local merchants and members. Group tours and
            free-and-easy packages span the world, with a current focus on Singapore
            and major Chinese cities.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col rounded-[20px] bg-white p-6 ring-1 ring-[color:var(--brand-border)] transition hover:ring-[color:var(--brand-orange)]"
            >
              <span className="grid size-12 place-items-center rounded-full bg-[color:var(--brand-teal-soft)] text-[color:var(--brand-teal-deep)]">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-[1.05rem] font-bold leading-[1.18] tracking-[0.005em] text-[color:var(--brand-ink)]">
                {title}
              </h3>
              <p className="mt-2 text-[0.9rem] leading-[1.55] text-[color:var(--brand-muted)]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationFocus() {
  const focuses = [
    {
      tag: "Singapore Tours",
      title: "A garden city, told properly",
      body: "We focus on Singapore's garden-city character and multicultural texture, offering refined journeys for everyone from families travelling with children to business visitors needing a polished agenda.",
      tone: "teal" as const,
    },
    {
      tag: "China Tours",
      title: "Cities, deeply known",
      body: "Across Beijing, Shanghai, Yunnan, Tibet, Xinjiang, Guilin, Xi'an, Chengdu, Chongqing, and beyond — we dig into the unique character of each Chinese city, bringing immersive experiences that move from history and culture into modern urban life.",
      tone: "orange" as const,
    },
  ];

  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="kicker">Where we go</p>
          <h2 className="mt-4">
            Two homes,{" "}
            <span className="text-[color:var(--brand-orange)]">known intimately</span>
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[color:var(--brand-text)]">
            We don&apos;t spread thin. Our planners go deep into the regions we route
            tours through — local enough to know which tea-house opens at seven, which
            festival is worth flying for, and which hotel actually delivers on its
            star rating.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {focuses.map((f) => (
            <article
              key={f.tag}
              className={
                f.tone === "teal"
                  ? "rounded-[28px] bg-[color:var(--brand-teal-soft)] p-9 md:p-11"
                  : "rounded-[28px] bg-[color:var(--brand-cream)] p-9 md:p-11"
              }
            >
              <p
                className={
                  f.tone === "teal"
                    ? "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-teal-deep)]"
                    : "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-orange)]"
                }
              >
                {f.tag}
              </p>
              <h3 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.15] tracking-[0.005em] text-[color:var(--brand-ink)] md:text-[2rem]">
                {f.title}
              </h3>
              <p className="mt-5 text-[1rem] leading-[1.7] text-[color:var(--brand-text)]">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAdvantage() {
  const pillars = [
    {
      icon: Heart,
      title: "Independent Departures",
      body: "No need to share with strangers. You set the pace and rhythm — private, flexible, and easy to adjust mid-trip when something better comes along.",
    },
    {
      icon: Compass,
      title: "Tailor-made Itineraries",
      body: "We refuse fixed-template plans. Itineraries are designed around your preferences and exclusive needs, satisfying personalisation in full so each route has a sense of belonging.",
    },
    {
      icon: HeadphonesIcon,
      title: "24-Hour Concierge",
      body: "A dedicated guide on the ground, paired with a 24-hour standby concierge — any issue is resolved in real time so the itinerary stays smooth and the experience stays elevated.",
    },
    {
      icon: Plane,
      title: "Many-to-One Service",
      body: "Travel designers, destination lifestyle consultants, and on-the-ground hosts together form a service matrix that goes far beyond a traditional tour package — every detail covered, every expectation accounted for.",
    },
  ];

  return (
    <section className="bg-[color:var(--brand-teal-soft)] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_1.1fr] md:gap-14">
          <div>
            <p className="kicker">Service Advantage</p>
            <h2 className="mt-4 max-w-xl">
              We always believe a trip is{" "}
              <span className="text-[color:var(--brand-orange)]">a sum of details</span>
            </h2>
          </div>
          <p className="text-[1.0625rem] leading-[1.7] text-[color:var(--brand-text)]">
            A genuinely moving journey is never just an accumulation of routes — it&apos;s
            the care and warmth hidden in every detail, from departure to return. We
            step beyond the traditional travel framework to put people at the core,
            weaving professional team depth, customisation flexibility, dedicated
            service, and 24/7 peace of mind into one tailored system. Every trip is
            built to match your expectations precisely — and to exceed them.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-[24px] bg-white p-7 ring-1 ring-[color:var(--brand-border)]"
            >
              <span className="grid size-12 place-items-center rounded-full bg-[color:var(--brand-orange)] text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-[1.15rem] font-bold leading-[1.18] tracking-[0.005em] text-[color:var(--brand-ink)]">
                {title}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.6] text-[color:var(--brand-text)]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="bg-white px-5 pb-28 pt-24 md:px-8 md:pb-36 md:pt-32">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-[color:var(--brand-ink)] px-7 py-14 text-center text-white md:px-12 md:py-20">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-teal)]">
          Plan your trip
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-white">
          Ready when you are —{" "}
          <span className="text-[color:var(--brand-orange)]">talk to a planner</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-[1.7] text-white/82">
          Tell us where you&apos;d like to go and roughly when. A planner will reply
          within one business day with itineraries, departure dates, and a quote — no
          call-centre, no upsell pressure.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="brand-pill gap-2">
            Send an Enquiry
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/tours" className="brand-pill-ghost">
            Browse Routes
          </Link>
        </div>
      </div>
    </section>
  );
}
