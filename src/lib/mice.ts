// MICE page content. Case studies come from the agency; the entries below
// are SAMPLES (flagged `sample`, rendered with a badge) showing the template
// fields — replace them with real, client-approved cases before launch.

export type MiceActivity = "meeting" | "incentive" | "conference" | "team-building";

export interface MiceCase {
  id: string;
  industry: string; // may be anonymised, e.g. "Regional bank"
  destination: string;
  pax: number;
  days: number;
  activityType: MiceActivity;
  summary: string;
  images: string[]; // 2–4 images
  sample?: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const MICE_CASES: readonly MiceCase[] = [
  {
    id: "sample-incentive-kyoto",
    industry: "Insurance agency",
    destination: "Osaka & Kyoto",
    pax: 80,
    days: 5,
    activityType: "incentive",
    summary:
      "Top-producer reward trip with a private evening at a Kyoto teahouse, a kaiseki gala dinner and a free day in Osaka.",
    images: [img("photo-1545569341-9eb8b30979d9")],
    sample: true,
  },
  {
    id: "sample-conference-shanghai",
    industry: "Regional technology firm",
    destination: "Shanghai",
    pax: 150,
    days: 4,
    activityType: "conference",
    summary:
      "Annual sales conference with delegate flights, a Bund-side hotel block, plenary and breakout rooms, and a river-cruise welcome dinner.",
    images: [img("photo-1474181487882-5abf3f0ba6c2")],
    sample: true,
  },
  {
    id: "sample-teambuilding-fuji",
    industry: "Logistics company",
    destination: "Mt Fuji area",
    pax: 40,
    days: 4,
    activityType: "team-building",
    summary:
      "Leadership retreat at a lakeside ryokan with a facilitated workshop day, a guided hike and an onsen evening.",
    images: [img("photo-1542640244-7e672d6cef4e")],
    sample: true,
  },
];

export const MICE_ACTIVITY_LABEL: Record<MiceActivity, string> = {
  meeting: "Meeting",
  incentive: "Incentive",
  conference: "Conference",
  "team-building": "Team Building",
};

export const MICE_CAPABILITIES = [
  { title: "Group Air", body: "Group fares and seat blocks, with name changes handled for you." },
  { title: "Hotels & Venues", body: "Room blocks, meeting rooms and banquet spaces sourced and contracted." },
  { title: "Ground Transport", body: "Coaches, VIP cars and airport meet-and-greet." },
  { title: "Bilingual Guides", body: "English- and Mandarin-speaking guides and on-site hosts." },
  { title: "Gala Dinners", body: "Themed dinners, cultural performances and private venue hire." },
  { title: "Event Materials", body: "Name badges, welcome kits, signage and printed programmes." },
  { title: "Travel Documents", body: "Visa guidance and rooming lists prepared for your team." },
  { title: "On-site Coordinator", body: "A Joytour coordinator travels with the group from start to finish." },
] as const;

export const MICE_PROCESS = [
  { title: "Share your brief", body: "Group size, dates, budget and what the trip needs to achieve." },
  { title: "Receive a proposal", body: "Destination options, a draft programme and an itemised quote." },
  { title: "Plan the details", body: "We confirm flights, hotels, venues and activities, and keep you updated." },
  { title: "Travel with support", body: "An on-site coordinator and 24-hour standby line throughout the trip." },
] as const;

export const MICE_FAQ = [
  {
    q: "What group sizes do you handle?",
    a: "From small leadership retreats to large incentive groups. Tell us your numbers and we'll plan around them.",
  },
  {
    q: "How far ahead should we start planning?",
    a: "The earlier the better, especially for peak seasons and large room blocks. Send us your dates and we'll advise what's realistic.",
  },
  {
    q: "Can you work within a fixed budget?",
    a: "Yes. Share your per-head budget and we'll propose a programme that fits, with options to scale up or down.",
  },
  {
    q: "Do you handle trips outside China and Japan?",
    a: "China and Japan are where we know the ground best. For other destinations, ask us — we'll tell you honestly what we can arrange.",
  },
] as const;

export const MICE_ENQUIRY_MESSAGE = "Hi Joytour, I'd like to make a MICE enquiry.";
