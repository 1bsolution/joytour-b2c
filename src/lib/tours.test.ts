import { describe, it, expect } from "vitest";
import { TOUR_TAGS, listTours, tourMatches } from "./tours";

describe("listTours tag / type filters", () => {
  it("defaults every catalog tour to the group product type", async () => {
    const all = await listTours();
    expect(all.length).toBeGreaterThan(0);
    expect(all.every((t) => t.productType === "group")).toBe(true);
    expect(await listTours({ productType: "group" })).toHaveLength(all.length);
  });

  it("returns nothing for land packages until FIT products are added", async () => {
    expect(await listTours({ productType: "land" })).toEqual([]);
  });

  it("filters by tag", async () => {
    expect(await listTours({ tag: TOUR_TAGS.getaways })).toEqual([]);
    expect(await listTours({ tag: TOUR_TAGS.flightPromo })).toEqual([]);
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
