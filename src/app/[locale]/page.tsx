import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  PhoneCall,
  Send,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TourCard } from "@/components/tour/tour-card";
import { listFeaturedTours } from "@/lib/tours";

const images = {
  hero:
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2200&q=80",
  aboutPrimary:
    "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=900&q=80",
  aboutSecondary:
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=900&q=80",
  china:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1400&q=80",
  japan:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
  why:
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
};

const copy = {
  heroKicker: "Joytour · Singapore",
  heroTitle: "From Singapore to the World,",
  heroTitleAccent: "Travel Made for You",
  heroBody:
    "Plan your next journey with a trusted travel agency in Singapore, offering curated trips to China and Japan. Seamless planning, thoughtful itineraries, and travel experiences designed around comfort, quality, and value.",
  learnMore: "Learn More",
  findTours: "Find Tours",
  search: {
    location: "Where",
    date: "When",
    duration: "How long",
    button: "Find Tours",
    allLocations: "Anywhere in Asia",
    anyDate: "Pick a month",
    anyDuration: "6 – 15 days",
  },
  aboutKicker: "About Us",
  aboutTitle: "Creating Memorable Journeys",
  aboutTitleAccent: "for Every Traveller",
  aboutBody:
    "As a travel agency located in People's Park Complex, just steps from Chinatown MRT, we offer convenient access to travel planning in the heart of Singapore. From scenic journeys to thoughtfully planned twin-city itineraries, our packages are designed to maximise your experience while delivering both quality and value.",
  aboutBody2:
    "We specialise in journeys to China and Japan, with options ranging from fully guided tours to free-and-easy packages. Whether you are planning a short getaway or a longer multi-city itinerary, every trip balances experience, comfort, and efficiency.",
  trustTitle: "Trusted by Travellers",
  trustBody:
    "Chosen as a reliable and affordable travel agency by Singapore travellers for consistent service standards.",
  readyTitle: "We are always ready for you",
  phone: "+65 8629 9765",
  reachOut: "Reach Out Now",
  popularKicker: "Our Popular",
  popularTitle: "Here's Our Popular",
  popularTitleAccent: "Destinations",
  popularBody:
    "For those looking to see more in a single trip, we also offer twin-city routes and multi-destination journeys that allow you to explore different regions without the hassle of complex planning.",
  viewDestinations: "View All Destinations",
  chinaLabel: "China",
  chinaBody:
    "13 routes · Beijing · Yunnan · Tibet · Xinjiang · Guilin · Shanghai · Xi'an · Hainan",
  japanLabel: "Japan",
  japanBody: "6 routes · Hokkaido · Osaka · Kyoto · Tokyo · twin-city options",
  whyKicker: "Why Choose Us",
  whyTitle: "Your Trusted Partner for",
  whyTitleAccent: "Unforgettable Travel",
  whyBody:
    "At Joytour Travel, we make travelling simple, exciting, and affordable. With carefully curated travel packages, exclusive deals, and reliable customer support, we help Singapore travellers explore the world with confidence and ease.",
  stats: [
    { label: "Itinerary Satisfaction", value: 97 },
    { label: "Easy Booking Experience", value: 94 },
    { label: "Repeat Travellers", value: 91 },
  ],
  dealsKicker: "Our Best Offers",
  dealsTitle: "Exclusive Travel Deals for",
  dealsTitleAccent: "Your Next Adventure",
  dealsBody:
    "Discover exciting holiday packages for you and your loved ones. Whether you prefer vibrant cities or scenic escapes, our curated trips are designed to deliver comfort, quality, and excellent value.",
  faqKicker: "FAQ",
  faqTitle: "Begin Your Travelling",
  faqTitleAccent: "with Us",
  faqBody:
    "Find answers to common questions about booking tours, selecting travel dates, and managing your travel packages with Joytour Holidays.",
  faqItems: [
    {
      q: "How do I book a tour package?",
      a: "Browse our available tour packages, choose your preferred destination, and submit your enquiry. Our team will confirm dates, availability, and payment details before your booking is finalised.",
    },
    {
      q: "What is included in the tour package?",
      a: "Accommodation, in-country transport, an English- or Mandarin-speaking guide, most meals, and entrance fees to the listed sites. Flights from Singapore are optional and quoted separately.",
    },
    {
      q: "Are the travel dates fixed?",
      a: "Group departures are scheduled. Free-and-easy packages can be customised — tell us your preferred dates and group size and we'll plan around them.",
    },
    {
      q: "What is your cancellation and refund policy?",
      a: "Full refund up to 30 days before departure; partial refund up to 14 days. Detailed terms are sent with your booking confirmation.",
    },
    {
      q: "Is travel insurance included?",
      a: "We highly recommend insurance and can arrange it through our partners. It is not bundled into the package price.",
    },
  ],
  contactTitle:
    "Share your travel plans with us and our team will get back to you with suitable recommendations.",
  contactBody:
    "Complete the form below to start planning your next journey.",
  form: {
    name: "Name",
    tel: "Tel",
    email: "Email",
    message: "Message",
    send: "Send Enquiry",
  },
};

type HomeCopy = typeof copy;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featured = await listFeaturedTours(6);

  return (
    <>
      <Hero />
      <SearchPanel />
      <AboutSection />
      <CountriesSection />
      <FeaturedTours tours={featured} />
      <WhyChooseUs />
      <FaqContact />
    </>
  );
}

function FeaturedTours({ tours }: { tours: Awaited<ReturnType<typeof listFeaturedTours>> }) {
  if (tours.length === 0) return null;

  return (
    <section className="bg-[color:var(--brand-grey-cool)] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr] md:gap-12">
          <div>
            <p className="kicker">{copy.dealsKicker}</p>
            <h2 className="mt-4 max-w-2xl">
              {copy.dealsTitle}{" "}
              <span className="text-[color:var(--brand-orange)]">
                {copy.dealsTitleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-[1.0625rem] leading-[1.7] text-[color:var(--brand-muted)]">
            {copy.dealsBody}
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/tours" className="brand-pill gap-2">
            View all routes
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] text-white">
      <Image
        src={images.hero}
        alt="Mountains in morning mist"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(47,124,130,0.66) 0%, rgba(83,82,79,0.85) 90%)",
          opacity: 0.92,
        }}
      />
      <div className="relative mx-auto flex min-h-[640px] max-w-6xl flex-col items-center justify-center px-5 pb-32 pt-32 text-center md:min-h-[720px] md:px-8 md:pb-40 md:pt-36">
        <p className="text-[0.78rem] font-medium uppercase tracking-[0.22em] text-white/85">
          {copy.heroKicker}
        </p>
        <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.5rem,1.85rem+3.4vw,4.4rem)] font-extrabold leading-[1.04] tracking-[0.005em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.18)]">
          {copy.heroTitle}
          <br />
          {copy.heroTitleAccent}
        </h1>
        <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.65] text-white/85">
          {copy.heroBody}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/tours" className="brand-pill">
            {copy.findTours}
          </Link>
          <Link href="/about" className="brand-pill-ghost">
            {copy.learnMore}
          </Link>
        </div>
      </div>
    </section>
  );
}

function SearchPanel() {
  const fields: Array<{ label: string; value: string; icon: typeof MapPin }> = [
    { label: copy.search.location, value: copy.search.allLocations, icon: MapPin },
    { label: copy.search.date, value: copy.search.anyDate, icon: CalendarDays },
    { label: copy.search.duration, value: copy.search.anyDuration, icon: Clock3 },
  ];

  return (
    <section className="relative z-10 -mt-12 px-5 md:px-8">
      <form className="mx-auto grid max-w-5xl gap-2 rounded-[28px] bg-white p-3 shadow-[0_24px_60px_-22px_rgba(43,43,43,0.32)] md:grid-cols-[1fr_1fr_1fr_auto]">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <label
              key={field.label}
              className="flex h-14 items-center gap-3 rounded-2xl bg-[#FFF4E6] px-5 text-left"
            >
              <Icon className="size-4 text-[color:var(--brand-orange)]" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[color:var(--brand-muted)]">
                  {field.label}
                </span>
                <span className="block truncate text-sm font-medium text-[color:var(--brand-text)]">
                  {field.value}
                </span>
              </span>
              <ChevronDown className="size-4 text-[color:var(--brand-muted)]" aria-hidden />
            </label>
          );
        })}
        <Link href="/tours" className="brand-pill h-14 px-9">
          {copy.search.button}
        </Link>
      </form>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="bg-white px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="relative aspect-[4/5] max-w-md">
          <div className="absolute left-0 top-0 h-[68%] w-[72%] overflow-hidden rounded-[28px] bg-[#FFF4E6]">
            <Image
              src={images.aboutPrimary}
              alt="Forbidden City courtyard at golden hour"
              fill
              sizes="(min-width: 1024px) 380px, 70vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[58%] w-[62%] overflow-hidden rounded-[28px] border-[6px] border-white bg-[#FFF4E6] shadow-[0_18px_40px_-18px_rgba(43,43,43,0.42)]">
            <Image
              src={images.aboutSecondary}
              alt="Quiet street in Kyoto"
              fill
              sizes="(min-width: 1024px) 320px, 60vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="kicker">{copy.aboutKicker}</p>
          <h2 className="mt-4 max-w-xl">
            {copy.aboutTitle}
            <br />
            <span className="text-[color:var(--brand-amber)]">
              {copy.aboutTitleAccent}
            </span>
          </h2>
          <div className="mt-7 max-w-xl space-y-4 text-[1.0625rem] leading-[1.7] text-[color:var(--brand-muted)]">
            <p>{copy.aboutBody}</p>
            <p>{copy.aboutBody2}</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-[1.1fr_auto] sm:items-center">
            <div className="rounded-[24px] bg-[color:var(--brand-gold)] p-7 text-white">
              <h3 className="font-display text-[1.5rem] font-bold leading-[1.1] tracking-[0.005em] text-white">
                {copy.trustTitle}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.65] text-white/82">
                {copy.trustBody}
              </p>
            </div>
            <div className="flex items-center gap-4 sm:flex-col sm:items-start">
              <span className="grid size-12 place-items-center rounded-full bg-[color:var(--brand-teal)] text-white">
                <PhoneCall className="size-5" />
              </span>
              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-muted)]">
                  {copy.readyTitle}
                </p>
                <a
                  href={`tel:${copy.phone.replace(/\s/g, "")}`}
                  className="mt-1 block font-display text-[1.25rem] font-bold text-[color:var(--brand-orange)] hover:text-[color:var(--brand-amber)]"
                >
                  {copy.phone}
                </a>
                <a
                  href="https://wa.me/6586299765"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[color:var(--brand-text)] underline-offset-4 hover:text-[color:var(--brand-orange)] hover:underline"
                >
                  {copy.reachOut}
                  <span aria-hidden className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountriesSection() {
  return (
    <section className="bg-[#FFF4E6] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="kicker">{copy.popularKicker}</p>
            <h2 className="mt-4 max-w-xl">
              {copy.popularTitle}{" "}
              <span className="text-[color:var(--brand-orange)]">
                {copy.popularTitleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-[1.0625rem] leading-[1.7] text-[color:var(--brand-muted)]">
            {copy.popularBody}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <CountryCard
            href="/destinations/china"
            label={copy.chinaLabel}
            body={copy.chinaBody}
            image={images.china}
            alt="River bend through karst mountains"
            cta={copy.viewDestinations}
          />
          <CountryCard
            href="/destinations/japan"
            label={copy.japanLabel}
            body={copy.japanBody}
            image={images.japan}
            alt="Mt Fuji at first light"
            cta={copy.viewDestinations}
          />
        </div>
      </div>
    </section>
  );
}

interface CountryCardProps {
  href: string;
  label: string;
  body: string;
  image: string;
  alt: string;
  cta: string;
}

function CountryCard({ href, label, body, image, alt, cta }: CountryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex aspect-[5/6] flex-col justify-end overflow-hidden rounded-[28px] bg-[#1a1a1a] text-white md:aspect-[4/5]"
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(43,43,43,0.78)_92%)]"
      />
      <div className="relative space-y-3 px-7 pb-9 md:px-9 md:pb-11">
        <h3 className="font-display text-[2rem] font-bold leading-none tracking-[0.005em] text-white md:text-[2.5rem]">
          {label}
        </h3>
        <p className="max-w-sm text-[0.95rem] leading-[1.55] text-white/88">
          {body}
        </p>
        <span className="inline-flex items-center pt-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-[color:var(--brand-amber)] underline-offset-[6px] group-hover:underline">
          {cta}
          <span aria-hidden className="ml-2">→</span>
        </span>
      </div>
    </Link>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
        <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[28px]">
          <Image
            src={images.why}
            alt="Traveller pausing at a temple gate"
            fill
            sizes="(min-width: 1024px) 420px, 90vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, color-mix(in srgb, var(--brand-orange) 16%, transparent))",
            }}
          />
        </div>
        <div>
          <p className="kicker">{copy.whyKicker}</p>
          <h2 className="mt-4 max-w-xl">
            {copy.whyTitle}{" "}
            <span className="text-[color:var(--brand-orange)]">
              {copy.whyTitleAccent}
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-[color:var(--brand-muted)]">
            {copy.whyBody}
          </p>
          <div className="mt-10 space-y-7">
            {copy.stats.map((stat) => (
              <div key={stat.label}>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <span className="text-[0.95rem] font-medium text-[color:var(--brand-text)]">
                    {stat.label}
                  </span>
                  <span className="font-display text-[1.5rem] font-bold leading-none text-[color:var(--brand-gold)] tabular-nums">
                    {stat.value}
                    <span className="ml-0.5 align-top text-sm font-medium font-sans text-[color:var(--brand-muted)]">
                      %
                    </span>
                  </span>
                </div>
                <div className="h-[6px] w-full overflow-hidden rounded-full bg-[color:var(--brand-grey-soft)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[color:var(--brand-orange)] to-[color:var(--brand-amber)]"
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqContact() {
  return (
    <section className="bg-white px-5 pb-28 pt-24 md:px-8 md:pb-36 md:pt-32">
      <div className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-[1fr_0.95fr] lg:gap-24">
        <div>
          <p className="kicker">{copy.faqKicker}</p>
          <h2 className="mt-4 max-w-md">
            {copy.faqTitle}{" "}
            <span className="text-[color:var(--brand-orange)]">
              {copy.faqTitleAccent}
            </span>
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.7] text-[color:var(--brand-muted)]">
            {copy.faqBody}
          </p>
          <div className="mt-10 space-y-3">
            {copy.faqItems.map((item, index) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-[18px] bg-[#FFF4E6] transition open:bg-[color:var(--brand-orange)] open:text-white"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[1rem] font-medium text-[color:var(--brand-text)] transition group-open:text-white">
                  <span>{item.q}</span>
                  <ChevronDown className="size-4 shrink-0 transition group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-5 text-[0.95rem] leading-[1.7] text-[color:var(--brand-muted)] group-open:text-white/85">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-[#FFF4E6] p-8 md:p-10">
          <h3 className="max-w-md font-display text-[clamp(1.5rem,1.2rem+1vw,1.875rem)] font-bold leading-[1.18] tracking-[0.005em] text-[color:var(--brand-gold)]">
            {copy.contactTitle}
          </h3>
          <p className="mt-4 max-w-md text-[0.95rem] leading-[1.65] text-[color:var(--brand-muted)]">
            {copy.contactBody}
          </p>
          <form
            className="mt-8 space-y-4"
            action="mailto:hello@joytour.sg"
            method="post"
            encType="text/plain"
          >
            <FormInput name="name" label={copy.form.name} placeholder={copy.form.name} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput name="phone" label={copy.form.tel} placeholder={copy.form.tel} required />
              <FormInput
                name="email"
                label={copy.form.email}
                placeholder={copy.form.email}
                type="email"
                required
              />
            </div>
            <FormInput
              name="message"
              label={copy.form.message}
              placeholder={copy.form.message}
              as="textarea"
              rows={4}
              required
            />
            <button type="submit" className="brand-pill mt-2 w-full gap-2">
              {copy.form.send}
              <Send className="size-4" />
            </button>
            <p className="text-center text-[0.78rem] leading-[1.5] text-[color:var(--brand-muted)]">
              Or message us directly on{" "}
              <a
                href="https://wa.me/6586299765"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[color:var(--brand-orange)] underline-offset-4 hover:underline"
              >
                WhatsApp
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

interface FormInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  required?: boolean;
}

function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  rows,
  required,
}: FormInputProps) {
  const baseClass =
    "w-full rounded-2xl bg-white border border-transparent px-5 py-3.5 text-[1rem] text-[color:var(--brand-text)] outline-none transition placeholder:text-[color:var(--brand-muted)]/65 focus:border-[color:var(--brand-orange)] focus:shadow-[0_0_0_3px_rgba(233,124,0,0.12)]";

  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      {as === "textarea" ? (
        <textarea
          name={name}
          aria-label={label}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          aria-label={label}
          placeholder={placeholder}
          type={type}
          required={required}
          className={baseClass}
        />
      )}
    </label>
  );
}

export type { HomeCopy };
