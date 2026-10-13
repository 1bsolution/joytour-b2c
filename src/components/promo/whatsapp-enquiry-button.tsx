import { MessageCircle } from "lucide-react";
import { productEnquiryMessage, whatsappHref } from "@/lib/whatsapp";
import type { TourSummary } from "@/lib/tours";

// Info-only products (flight promotions) are sold by a planner, not online.
export function WhatsAppEnquiryButton({ tour }: { tour: TourSummary }) {
  const message = productEnquiryMessage({
    name: tour.title,
    code: tour.slug,
    path: `/tours/${tour.slug}`,
  });

  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="brand-pill w-full gap-2"
    >
      <MessageCircle className="size-4" aria-hidden />
      Enquire on WhatsApp
    </a>
  );
}
