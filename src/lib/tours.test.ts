import { describe, it, expect } from "vitest";
import { TOUR_TAGS, getTourBySlug, listSimilarTours, listTours, tourMatches } from "./tours";

describe("listTours tag / type filters", () => {
  it("keeps the corporate catalog as group tours", async () => {
    const real = (await listTours()).filter((t) => !t.isSample);
    expect(real.length).toBeGreaterThan(0);
    expect(real.every((t) => t.productType === "group")).toBe(true);
  });

  it("returns sample land packages", async () => {
    const land = await listTours({ productType: "land" });
    expect(land.length).toBeGreaterThan(0);
    expect(land.every((t) => t.productType === "land")).toBe(true);
  });

  it("filters by tag", async () => {
    const getaways = await listTours({ tag: TOUR_TAGS.getaways });
    const promos = await listTours({ tag: TOUR_TAGS.flightPromo });
    expect(getaways.length).toBeGreaterThan(0);
    expect(promos.length).toBeGreaterThan(0);
    expect(promos.every((t) => t.tags.includes(TOUR_TAGS.flightPromo))).toBe(true);
  });

  it("flags every authored sample", async () => {
    const samples = (await listTours()).filter((t) => t.slug.startsWith("sample-"));
    expect(samples.length).toBeGreaterThan(0);
    expect(samples.every((t) => t.isSample)).toBe(true);
  });

  it("uses the sample's own price when given", async () => {
    const tour = await getTourBySlug("sample-shanghai-flight-hotel-4d3n");
    expect(tour?.basePriceSgd).toBe(599);
  });
});

describe("listSimilarTours", () => {
  it("only suggests tours of the same product type", async () => {
    const tour = await getTourBySlug("sample-chengdu-free-easy-5d4n");
    const similar = await listSimilarTours(tour!, 3);
    expect(similar.every((t) => t.productType === "land")).toBe(true);
  });
});

describe("tourMatches", () => {
  it("matches tagged land packages", async () => {
    const [base] = await listTours();
    const tour = { ...base, productType: "land" as const, tags: [TOUR_TAGS.flightPromo] };
    expect(tourMatches(tour, { tag: TOUR_TAGS.flightPromo })).toBe(true);
    expect(tourMatches(tour, { productType: "land" })).toBe(true);
    expect(tourMatches(tour, { tag: TOUR_TAGS.getaways })).toBe(false);
    expect(tourMatches(tour, { productType: "group" })).toBe(false);
  });
});

describe("listSimilarTours for flight promotions", () => {
  it("suggests only other flight promotions", async () => {
    const tour = await getTourBySlug("sample-tokyo-flight-hotel-5d4n");
    const similar = await listSimilarTours(tour!, 3);
    expect(similar.length).toBeGreaterThan(0);
    expect(similar.every((t) => t.tags.includes(TOUR_TAGS.flightPromo))).toBe(true);
  });
});
