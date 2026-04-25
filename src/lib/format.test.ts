import { describe, it, expect } from "vitest";
import { formatSgd, formatDateRange } from "./format";

describe("formatSgd", () => {
  it("formats SGD currency without fractional digits", () => {
    expect(formatSgd(1899)).toMatch(/\$1,899/);
  });

  it("accepts strings and Decimal-like values", () => {
    expect(formatSgd("2399")).toMatch(/\$2,399/);
    expect(formatSgd({ toString: () => "500" })).toMatch(/\$500/);
  });
});

describe("formatDateRange", () => {
  it("renders start – end with year on end", () => {
    const out = formatDateRange(new Date("2026-06-01"), new Date("2026-06-07"));
    expect(out).toMatch(/2026/);
    expect(out).toContain("–");
  });
});
