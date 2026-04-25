export function formatSgd(amount: number | string | { toString(): string }): string {
  const n = typeof amount === "number" ? amount : Number(amount.toString());
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDateRange(start: Date, end: Date): string {
  const fmt = new Intl.DateTimeFormat("en-SG", {
    month: "short",
    day: "numeric",
  });
  const fmtYear = new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return `${fmt.format(start)} – ${fmtYear.format(end)}`;
}
