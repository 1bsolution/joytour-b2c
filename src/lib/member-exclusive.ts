// Member Exclusive page content. Membership APIs (member prices, Member Day,
// lucky draw, vouchers) are not available yet, so every offer below is a
// SAMPLE (flagged `sample`, rendered with a badge) showing the fields each
// block will display. Replace with API data once it exists.

export type MemberCampaignKey =
  | "memberPrices"
  | "memberDay"
  | "anniversary"
  | "luckyDraw"
  | "vouchers";

export interface MemberOffer {
  title: string;
  detail: string;
  // Short facts, e.g. ["Member price S$1,180", "Usual S$1,280"].
  facts: readonly string[];
  cta: { label: string; href: string };
  sample?: boolean;
}

export interface MemberCampaign {
  key: MemberCampaignKey;
  title: string;
  description: string;
  items: readonly MemberOffer[];
}

const SIGN_IN = "/sign-in";

export const MEMBER_CAMPAIGNS: readonly MemberCampaign[] = [
  {
    key: "memberPrices",
    title: "Member Prices",
    description: "Members-only fares on selected group and land packages.",
    items: [
      {
        title: "5D4N Chengdu Free & Easy",
        detail: "Members save on this land package for selected travel dates.",
        facts: ["Member S$1,180", "Usual S$1,280"],
        cta: { label: "View package", href: "/tours/sample-chengdu-free-easy-5d4n" },
        sample: true,
      },
      {
        title: "4D3N Sanya Beach Escape",
        detail: "Member price on the long-weekend beach getaway.",
        facts: ["Member S$820", "Usual S$890"],
        cta: { label: "View package", href: "/tours/sample-sanya-beach-escape-4d3n" },
        sample: true,
      },
    ],
  },
  {
    key: "memberDay",
    title: "Member Day",
    description: "A recurring day of offers reserved for signed-in members.",
    items: [
      {
        title: "Member Day — first Saturday of the month",
        detail: "Extra savings on selected departures, for one day only.",
        facts: ["Members only", "One day"],
        cta: { label: "Sign in to be notified", href: SIGN_IN },
        sample: true,
      },
    ],
  },
  {
    key: "anniversary",
    title: "Anniversary Sale",
    description: "Our yearly celebration, with promotions for the people who travel with us.",
    items: [
      {
        title: "Anniversary Week",
        detail: "Promotions across group tours, land packages and flight bundles.",
        facts: ["Once a year", "All members"],
        cta: { label: "Sign in to be notified", href: SIGN_IN },
        sample: true,
      },
    ],
  },
  {
    key: "luckyDraw",
    title: "Lucky Draw",
    description: "Prize draws open to members, with results announced here.",
    items: [
      {
        title: "Travel Voucher Draw",
        detail: "Every confirmed booking during the campaign earns one entry.",
        facts: ["Prize: travel voucher", "Results posted here"],
        cta: { label: "Sign in to take part", href: SIGN_IN },
        sample: true,
      },
    ],
  },
  {
    key: "vouchers",
    title: "Vouchers",
    description: "Claim vouchers to use on your next booking.",
    items: [
      {
        title: "S$50 off group tours",
        detail: "Valid on group tours with a minimum spend.",
        facts: ["S$50 off", "Min. spend S$1,500"],
        cta: { label: "Sign in to claim", href: SIGN_IN },
        sample: true,
      },
      {
        title: "S$30 off land packages",
        detail: "Valid on land packages with a minimum spend.",
        facts: ["S$30 off", "Min. spend S$800"],
        cta: { label: "Sign in to claim", href: SIGN_IN },
        sample: true,
      },
    ],
  },
];

export const MEMBER_STEPS = [
  { title: "Create an account", body: "Sign up free with your email." },
  { title: "Book a trip", body: "Book any group tour, land package or getaway." },
  { title: "Earn points", body: "Points are added to your account after you travel." },
  { title: "Redeem rewards", body: "Exchange points for rewards in your member account." },
] as const;

export const MEMBER_FAQ = [
  {
    q: "Is membership free?",
    a: "Yes. Create an account and you're a member — there is no fee.",
  },
  {
    q: "When do points appear in my account?",
    a: "Points are credited after your trip is completed. You can see your history in your member account.",
  },
  {
    q: "How do I claim a voucher?",
    a: "Sign in, open the voucher and claim it. Claimed vouchers are applied when a planner confirms your booking.",
  },
  {
    q: "Can I combine member prices with vouchers?",
    a: "Each offer lists its own terms. Ask a planner if you're unsure — we'll check before you book.",
  },
] as const;
