// Top-level navigation. About / Contact live in the footer; the header is
// reserved for the six product sections.

export type NavKey =
  | "landPackages"
  | "groupPackages"
  | "flightPromotions"
  | "getaways"
  | "mice"
  | "memberExclusive";

export interface NavItem {
  key: NavKey;
  href: string;
  badge?: "hot";
  // Renders the destination mega menu (country → region columns + cards).
  mega?: boolean;
}

export const MAIN_NAV: readonly NavItem[] = [
  { key: "landPackages", href: "/land-packages" },
  { key: "groupPackages", href: "/tours", mega: true },
  { key: "flightPromotions", href: "/flight-promotions" },
  { key: "getaways", href: "/getaways" },
  { key: "mice", href: "/mice" },
  { key: "memberExclusive", href: "/member-exclusive", badge: "hot" },
];
