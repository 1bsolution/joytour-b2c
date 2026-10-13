import { describe, it, expect } from "vitest";
import { WHATSAPP_NUMBER, productEnquiryMessage, whatsappHref } from "./whatsapp";

describe("whatsappHref", () => {
  it("links to the shared business number without a message", () => {
    expect(whatsappHref()).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
  });

  it("url-encodes a prefilled message", () => {
    const href = whatsappHref("Hi & hello");
    expect(href).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20%26%20hello`);
  });

  it("ignores blank messages", () => {
    expect(whatsappHref("   ")).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
  });
});

describe("productEnquiryMessage", () => {
  it("includes product name, code and absolute link", () => {
    const msg = productEnquiryMessage({
      name: "Bangkok Fare Sale",
      code: "bkk-fare",
      path: "/tours/bkk-fare",
      siteUrl: "https://example.com/",
    });
    expect(msg).toContain("Bangkok Fare Sale");
    expect(msg).toContain("bkk-fare");
    expect(msg).toContain("https://example.com/tours/bkk-fare");
  });
});
