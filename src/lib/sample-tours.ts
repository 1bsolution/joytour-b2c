// SAMPLE products for the Land Packages, Getaways and Flight Promotions
// sections. Authored placeholder content (not from the corporate catalog) so
// the sections can be reviewed with data; every entry is flagged `sample` and
// renders a "Sample" badge. Replace with real products before launch.

import type { RawTour } from "./tours";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const SAMPLE_TOURS: RawTour[] = [
  // ── Land packages ────────────────────────────────────────────────
  {
    slug: "sample-chengdu-free-easy-5d4n",
    title: "5D4N Chengdu Free & Easy",
    short:
      "Four nights in central Chengdu with airport transfers and a guided morning at the Giant Panda Base — the rest of the days are yours.",
    description:
      "Key Highlights: Central Hotel - Four nights at a 4-star hotel within walking distance of Chunxi Road and Taikoo Li. Panda Morning - A guided early visit to the Chengdu Research Base of Giant Panda Breeding, timed for feeding hour. Airport Transfers - Private arrival and departure transfers. Flexible Days - Three free days, with optional add-ons such as Leshan Giant Buddha or a Sichuan cooking class.",
    days: 5,
    nights: 4,
    image: img("photo-1564349683136-77e08dba1ef7"),
    country: "china",
    sectors: ["chengdu"],
    productType: "land",
    priceSgd: 1280,
    sample: true,
  },
  {
    slug: "sample-osaka-kyoto-free-easy-6d5n",
    title: "6D5N Osaka & Kyoto Free & Easy",
    short:
      "Three nights in Osaka and two in Kyoto, with rail passes and hotel-to-hotel luggage forwarding arranged for you.",
    description:
      "Key Highlights: Two Cities - Three nights in Namba, Osaka and two nights near Gion, Kyoto. Rail Pass - Kansai area rail pass covering Osaka, Kyoto and Nara. Luggage Forwarding - Your suitcase travels between hotels so you don't have to carry it. Flexible Days - Optional add-ons include a Nara day trip, a tea ceremony, or Universal Studios Japan tickets.",
    days: 6,
    nights: 5,
    image: img("photo-1545569341-9eb8b30979d9"),
    country: "japan",
    sectors: ["osaka"],
    productType: "land",
    priceSgd: 1680,
    sample: true,
  },
  {
    slug: "sample-tokyo-free-easy-5d4n",
    title: "5D4N Tokyo Free & Easy",
    short:
      "Four nights in Shinjuku with airport limousine bus transfers and a 72-hour Tokyo subway pass.",
    description:
      "Key Highlights: Shinjuku Hotel - Four nights at a 3-star superior hotel near Shinjuku Station. Getting Around - Airport limousine bus both ways and a 72-hour Tokyo subway pass. Flexible Days - Optional add-ons include a Mt Fuji day tour, teamLab tickets, or a sushi-making class.",
    days: 5,
    nights: 4,
    image: img("photo-1540959733332-eab4deabeeaf"),
    country: "japan",
    sectors: [],
    productType: "land",
    priceSgd: 1580,
    sample: true,
  },
  {
    slug: "sample-shanghai-city-stay-4d3n",
    title: "4D3N Shanghai City Stay",
    short:
      "Three nights on the Bund side of Shanghai with private transfers and a Huangpu River night cruise.",
    description:
      "Key Highlights: Bund Hotel - Three nights at a 4-star hotel a short walk from the Bund. Night Cruise - Huangpu River cruise with views of the Lujiazui skyline. Private Transfers - Pudong airport transfers both ways. Flexible Days - Optional add-ons include a Zhujiajiao water-town half day or Disneyland tickets.",
    days: 4,
    nights: 3,
    image: img("photo-1474181487882-5abf3f0ba6c2"),
    country: "china",
    sectors: ["shanghai"],
    productType: "land",
    priceSgd: 980,
    sample: true,
  },

  // ── Getaways ─────────────────────────────────────────────────────
  {
    slug: "sample-sanya-beach-escape-4d3n",
    title: "4D3N Sanya Beach Escape",
    short:
      "A long-weekend beach break on Hainan — direct flight from Singapore, a resort on Yalong Bay and nothing on the schedule you don't want.",
    description:
      "Key Highlights: Beach Resort - Three nights at a beachfront resort on Yalong Bay with daily breakfast. Short Flight - Under four hours from Singapore. Easy Pace - One half-day outing to Nanshan Cultural Zone; the rest is beach time.",
    days: 4,
    nights: 3,
    image: img("photo-1507525428034-b723cf961d3e"),
    country: "china",
    sectors: ["hainan"],
    tags: ["getaways"],
    priceSgd: 890,
    sample: true,
  },
  {
    slug: "sample-osaka-food-weekend-3d2n",
    title: "3D2N Osaka Food Weekend",
    short:
      "Two nights in Dotonbori with a guided street-food walk through Shinsekai and Kuromon Market.",
    description:
      "Key Highlights: Food Walk - Evening street-food walk through Shinsekai and Dotonbori with a local guide. Market Breakfast - Morning visit to Kuromon Market. Central Stay - Two nights in Namba, steps from the food streets.",
    days: 3,
    nights: 2,
    image: img("photo-1590559899731-a382839e5549"),
    country: "japan",
    sectors: ["osaka"],
    tags: ["getaways"],
    priceSgd: 760,
    sample: true,
  },
  {
    slug: "sample-tokyo-mt-fuji-short-break-4d3n",
    title: "4D3N Tokyo & Mt Fuji Short Break",
    short:
      "Two nights in Tokyo and one at a hot-spring ryokan by Lake Kawaguchi, with Fuji views from the room.",
    description:
      "Key Highlights: Fuji Views - One night at a ryokan on Lake Kawaguchi with onsen and kaiseki dinner. Chureito Pagoda - Sunrise stop at the classic Fuji viewpoint. Tokyo Time - Two nights in Tokyo with a free day for shopping.",
    days: 4,
    nights: 3,
    image: img("photo-1542640244-7e672d6cef4e"),
    country: "japan",
    sectors: [],
    tags: ["getaways"],
    priceSgd: 1290,
    sample: true,
  },

  // ── Flight promotions (flight + hotel bundles) ────────────────────
  {
    slug: "sample-shanghai-flight-hotel-4d3n",
    title: "Shanghai Flight + Hotel 4D3N",
    short:
      "Return economy flights from Singapore plus three nights at a 4-star hotel in Jing'an. Limited seats at this fare.",
    description:
      "Key Highlights: Return Flights - Economy return from Singapore to Shanghai Pudong with 20kg checked baggage. Hotel - Three nights at a 4-star hotel in Jing'an with breakfast. Booking - Seats are limited; a planner confirms availability on WhatsApp before booking.",
    days: 4,
    nights: 3,
    image: img("photo-1436491865332-7a61a109cc05"),
    country: "china",
    sectors: ["shanghai"],
    productType: "land",
    tags: ["flight-promo"],
    priceSgd: 599,
    sample: true,
  },
  {
    slug: "sample-tokyo-flight-hotel-5d4n",
    title: "Tokyo Flight + Hotel 5D4N",
    short:
      "Return economy flights to Tokyo Haneda plus four nights near Tokyo Station. Travel period subject to fare availability.",
    description:
      "Key Highlights: Return Flights - Economy return from Singapore to Tokyo Haneda with 23kg checked baggage. Hotel - Four nights at a 3-star superior hotel near Tokyo Station. Booking - Seats are limited; a planner confirms availability on WhatsApp before booking.",
    days: 5,
    nights: 4,
    image: img("photo-1513407030348-c983a97b98d8"),
    country: "japan",
    sectors: [],
    productType: "land",
    tags: ["flight-promo"],
    priceSgd: 899,
    sample: true,
  },
  {
    slug: "sample-beijing-flight-hotel-4d3n",
    title: "Beijing Flight + Hotel 4D3N",
    short:
      "Return economy flights to Beijing plus three nights near Wangfujing — add a Great Wall day trip if you like.",
    description:
      "Key Highlights: Return Flights - Economy return from Singapore to Beijing Capital with 20kg checked baggage. Hotel - Three nights at a 4-star hotel near Wangfujing with breakfast. Optional Add-on - Private Mutianyu Great Wall day trip. Booking - Seats are limited; a planner confirms availability on WhatsApp before booking.",
    days: 4,
    nights: 3,
    image: img("photo-1547981609-4b6bfe67ca0b"),
    country: "china",
    sectors: ["beijing"],
    productType: "land",
    tags: ["flight-promo"],
    priceSgd: 649,
    sample: true,
  },
];
