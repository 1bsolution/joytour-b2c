// MICE page content template. The agency supplies the case studies; until
// they do, the cases list stays empty and the section is not rendered.
// No placeholder / invented cases belong here.

export interface MiceCase {
  id: string;
  industry: string; // may be anonymised, e.g. "Regional bank"
  destination: string;
  pax: number;
  days: number;
  activityType: "meeting" | "incentive" | "conference" | "team-building";
  summary: string;
  images: string[]; // 2–4 images
}

export const MICE_CASES: readonly MiceCase[] = [];

export const MICE_ENQUIRY_MESSAGE = "Hi Joytour, I'd like to make a MICE enquiry.";
