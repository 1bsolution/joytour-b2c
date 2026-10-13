// Single source for the business WhatsApp line (same number as the footer).
export const WHATSAPP_NUMBER = "6586299765";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.joytour.com.sg";

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export interface ProductEnquiry {
  name: string;
  code: string;
  path: string;
  siteUrl?: string;
}

// Prefilled so sales can tell which product the customer is asking about.
export function productEnquiryMessage({
  name,
  code,
  path,
  siteUrl = SITE_URL,
}: ProductEnquiry): string {
  const link = `${siteUrl.replace(/\/+$/, "")}${path}`;
  return [
    "Hi Joytour, I'd like to enquire about:",
    `Product: ${name}`,
    `Code: ${code}`,
    `Link: ${link}`,
  ].join("\n");
}
