import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/whatsapp";

interface ComingSoonProps {
  title: string;
  body: string;
  // Prefilled WhatsApp text so sales know which section the enquiry came from.
  enquiryMessage: string;
  extra?: ReactNode;
}

// Shown when a section has no products yet — "in preparation, enquire now".
export function ComingSoon({ title, body, enquiryMessage, extra }: ComingSoonProps) {
  return (
    <div className="rounded-[28px] border border-[color:var(--brand-border)] bg-[color:var(--brand-cream)] p-10 text-center md:p-14">
      <p className="kicker justify-center">Coming soon</p>
      <p className="mt-4 font-display text-[1.6rem] font-bold leading-[1.15] text-[color:var(--brand-ink)]">
        {title}
      </p>
      <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-[1.7] text-[color:var(--brand-muted)]">
        {body}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={whatsappHref(enquiryMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="brand-pill gap-2"
        >
          <MessageCircle className="size-4" aria-hidden />
          Enquire on WhatsApp
        </a>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center rounded-full border border-[color:var(--brand-border)] bg-white px-7 text-[0.95rem] font-medium text-[color:var(--brand-text)] transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
        >
          Contact us
        </Link>
        {extra}
      </div>
    </div>
  );
}
