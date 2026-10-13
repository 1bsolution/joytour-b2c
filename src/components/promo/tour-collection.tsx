import type { ReactNode } from "react";
import { TourCard } from "@/components/tour/tour-card";
import type { TourSummary } from "@/lib/tours";
import { WhatsAppEnquiryButton } from "./whatsapp-enquiry-button";

interface TourCollectionProps {
  tours: TourSummary[];
  emptyState: ReactNode;
  // Info-only sections swap online booking for a WhatsApp enquiry per card.
  whatsappEnquiry?: boolean;
}

export function TourCollection({ tours, emptyState, whatsappEnquiry = false }: TourCollectionProps) {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        {tours.length === 0 ? (
          emptyState
        ) : (
          <>
            <p className="mb-10 text-[0.95rem] text-[color:var(--brand-muted)]">
              {tours.length} {tours.length === 1 ? "package" : "packages"} available
            </p>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <div key={tour.id} className="flex flex-col gap-3">
                  <TourCard tour={tour} />
                  {whatsappEnquiry && <WhatsAppEnquiryButton tour={tour} />}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
