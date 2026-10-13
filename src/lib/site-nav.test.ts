import { describe, it, expect } from "vitest";
import { MAIN_NAV } from "./site-nav";

describe("MAIN_NAV", () => {
  it("lists the six product sections in order", () => {
    expect(MAIN_NAV.map((i) => i.key)).toEqual([
      "landPackages",
      "groupPackages",
      "flightPromotions",
      "getaways",
      "mice",
      "memberExclusive",
    ]);
  });

  it("drops About, Contact and Find a Journey from the top bar", () => {
    const hrefs = MAIN_NAV.map((i) => i.href);
    expect(hrefs).not.toContain("/about");
    expect(hrefs).not.toContain("/contact");
  });

  it("flags Member Exclusive as HOT and only Group Packages as a mega menu", () => {
    expect(MAIN_NAV.find((i) => i.key === "memberExclusive")?.badge).toBe("hot");
    expect(MAIN_NAV.filter((i) => i.mega).map((i) => i.key)).toEqual(["groupPackages"]);
  });

  it("uses internal absolute paths", () => {
    for (const item of MAIN_NAV) expect(item.href.startsWith("/")).toBe(true);
  });
});
