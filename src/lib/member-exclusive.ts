// Member Exclusive page template. Each block lists the fields it will show
// once the membership APIs are available; `items` stays empty until then and
// the block renders a "coming soon" placeholder instead of invented offers.

export type MemberCampaignKey =
  | "memberPrices"
  | "memberDay"
  | "anniversary"
  | "luckyDraw"
  | "vouchers";

export interface MemberCampaign {
  key: MemberCampaignKey;
  title: string;
  description: string;
  items: readonly unknown[];
}

export const MEMBER_CAMPAIGNS: readonly MemberCampaign[] = [
  {
    key: "memberPrices",
    title: "Member Prices",
    description: "Members-only fares on selected group and land packages.",
    items: [],
  },
  {
    key: "memberDay",
    title: "Member Day",
    description: "A recurring day of offers reserved for signed-in members.",
    items: [],
  },
  {
    key: "anniversary",
    title: "Anniversary Sale",
    description: "Our yearly celebration, with promotions for the people who travel with us.",
    items: [],
  },
  {
    key: "luckyDraw",
    title: "Lucky Draw",
    description: "Prize draws open to members, with results announced here.",
    items: [],
  },
  {
    key: "vouchers",
    title: "Vouchers",
    description: "Claim vouchers to use on your next booking.",
    items: [],
  },
];
