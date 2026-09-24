import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tBrand = await getTranslations("brand");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[color:var(--brand-text)] text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.2fr_1fr_1fr_1.4fr] md:gap-16 md:px-8 md:py-24">
        <div className="space-y-5">
          <Image
            src="/joytour-logo-cream.png"
            alt={tBrand("name")}
            width={200}
            height={150}
            className="h-16 w-auto"
          />
          <p className="max-w-[16rem] text-[0.95rem] leading-[1.65] text-white/72">
            {tBrand("tagline")}
          </p>
        </div>

        <FooterColumn title={t("quickLink")}>
          <FooterLink href="/about">{tNav("about")}</FooterLink>
          <FooterLink href="/destinations">{tNav("destinations")}</FooterLink>
          <FooterLink href="/tours">{tNav("tours")}</FooterLink>
          <FooterLink href="/contact">{tNav("contact")}</FooterLink>
        </FooterColumn>

        <FooterColumn title={t("information")}>
          <FooterLink href="/terms">{t("terms")}</FooterLink>
          <FooterLink href="/contact">{t("faq")}</FooterLink>
        </FooterColumn>

        <div className="space-y-5">
          <h3 className="text-[0.82rem] font-medium capitalize tracking-[0.04em] text-[color:var(--brand-amber)]">
            {t("getInTouch")}
          </h3>
          <p className="flex gap-3 text-[0.95rem] leading-[1.55] text-white/82">
            <MapPin className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-amber)]" aria-hidden />
            <span>{t("address")}</span>
          </p>
          <a
            className="flex items-center gap-3 text-[0.95rem] text-white/82 transition hover:text-white"
            href="tel:+6586299765"
          >
            <Phone className="size-4 text-[color:var(--brand-amber)]" aria-hidden />
            +65 8629 9765
          </a>
          <a
            className="flex items-center gap-3 text-[0.95rem] text-white/82 transition hover:text-white"
            href="mailto:hello@joytour.sg"
          >
            <Mail className="size-4 text-[color:var(--brand-amber)]" aria-hidden />
            hello@joytour.sg
          </a>
          <div className="pt-3">
            <p className="mb-3 text-[0.82rem] font-medium capitalize tracking-[0.04em] text-[color:var(--brand-amber)]">
              {t("social")}
            </p>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-full bg-[color:var(--brand-orange)] text-[0.7rem] font-semibold uppercase tracking-wider text-white transition hover:bg-[color:var(--brand-amber)]"
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-[0.78rem] text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <span>{t("rights", { year })}</span>
          <span className="text-white/72">From Singapore, with care.</span>
        </div>
      </div>
    </footer>
  );
}

const socials = [
  { label: "Instagram", short: "IG", href: "https://instagram.com" },
  { label: "Facebook", short: "FB", href: "https://facebook.com" },
  { label: "WhatsApp", short: "WA", href: "https://wa.me/6586299765" },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <nav className="space-y-3 text-[0.95rem]">
      <h3 className="mb-4 text-[0.82rem] font-medium capitalize tracking-[0.04em] text-[color:var(--brand-amber)]">
        {title}
      </h3>
      {children}
    </nav>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block text-white/82 transition hover:text-[color:var(--brand-amber)]"
    >
      {children}
    </Link>
  );
}
