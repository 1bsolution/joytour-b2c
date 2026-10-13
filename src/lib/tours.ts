// Static tour catalog. Source of truth for the tour name, short description,
// description, and image URL is the corporate JSON dump — these strings are
// preserved verbatim and must NOT be edited or paraphrased here. The only
// authored fields are derived metadata (slug, country/sector mapping, featured
// flag, durationDays/Nights) used for routing, filtering, and the price
// placeholder.

export interface TourSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  durationDays: number;
  durationNights: number;
  durationLabel: string;
  basePriceSgd: number;
  heroImage: string;
  country: "china" | "japan";
  destinations: { name: string; slug: string }[];
  departures: { id: string; priceSgd: number }[];
  featured: boolean;
  productType: ProductType;
  tags: string[];
}

export interface TourDetail extends TourSummary {
  description: string;
}

// Backwards-compat alias used by `<TourCard>`.
export type TourCardData = TourSummary;

// "group" = escorted group tour, "land" = land package / free & easy.
export type ProductType = "group" | "land";

// Merchandising tags. A tour appears in a nav section when it carries the tag.
export const TOUR_TAGS = {
  getaways: "getaways",
  flightPromo: "flight-promo",
} as const;

export interface TourFilters {
  destinationSlug?: string;
  productType?: ProductType;
  tag?: string;
  country?: "china" | "japan";
  minDuration?: number;
  maxDuration?: number;
}

const SECTOR_NAMES: Record<string, string> = {
  beijing: "Beijing",
  shanghai: "Shanghai",
  yunnan: "Yunnan",
  guilin: "Guilin",
  tibet: "Tibet",
  xinjiang: "Xinjiang",
  xian: "Xi'an",
  chengdu: "Chengdu",
  chongqing: "Chongqing",
  harbin: "Harbin",
  "inner-mongolia": "Inner Mongolia",
  qinghai: "Qinghai",
  hainan: "Hainan",
  hokkaido: "Hokkaido",
  osaka: "Osaka",
};

interface RawTour {
  slug: string;
  title: string;
  short: string;
  description: string;
  days: number;
  nights: number;
  image: string;
  country: "china" | "japan";
  sectors: string[];
  featured?: boolean;
  productType?: ProductType;
  tags?: string[];
}

const RAW_TOURS: RawTour[] = [
  {
    slug: "guangxi-guilin-guangzhou-8d7n",
    title: "8D7N Guangxi Guilin + Guangzhou",
    short:
      "This is an 8-day, 7-night. It covers major scenic areas in Hezhou, Guilin, Longsheng, Yangshuo, and Guangzhou, focusing on natural landscapes, ethnic minority culture, and local delicacies.",
    description:
      "Key Highlights: Guilin Landmarks - Visit the iconic Elephant Trunk Hill and the Rongshan Lake Scenic Area, which includes the Sun and Moon Twin Towers. Natural Wonders - Explore the Longji (Dragon's Backbone) Rice Terraces, Guposhan National Forest Park, and the Lijiang River scenic area. Unique Experiences - Enjoy a bamboo raft ride on the Yulong River, watch the world's largest man-made waterfall, and participate in ethnic village experiences. Hands-on Activities - Participate in DIY activities such as making Osmanthus cakes and block printing at Wayao Town. Cultural Exploration - Visit a century-old Zhuang Village and other ethnic minority villages to learn about local folk culture. Premium Accommodation - Stay for three nights at the 5-star Lijiang Waterfall Hotel in Guilin, a recipient of the Luban Prize (China's highest award for architecture). Local Cuisine - Savour specialty meals including Guilin Rice Noodles, Yangshuo Beer Fish, and a High Mountain, Flowing Water performance dinner.",
    days: 8,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/guilin.webp",
    country: "china",
    sectors: ["guilin"],
    featured: true,
  },
  {
    slug: "beijing-shanghai-twin-city-8d7n",
    title: "8D7N Beijing + Shanghai Twin City",
    short:
      "This is an 8-day, 7-night tour of two major Chinese cities: the ancient capital of Beijing and the modern metropolis of Shanghai featuring visits to major landmarks and two world-class theme parks.",
    description:
      "Key Highlights: Dual Theme Parks - Includes full-day visits to both Beijing Universal Studios and Shanghai Disneyland. Beijing Landmarks - Visits to Tiananmen Square, the Forbidden City (including tram, and two-way cable car), and the Mutianyu Great Wall (including shuttle and two-way cable car). Cultural Experiences - Strolling through Beijing's traditional Hutongs and Yandaixie Street, as well as exploring Shanghai's Zhujiajiao Ancient Town and Shikumen walking street. Modern Attractions - Exploring the Bund's international architecture, the Lujiazui viewing area, and the Starbucks Reserve Roastery in Shanghai. Special Culinary Features - Includes Beijing fruitwood roasted duck, a seafood BBQ hotpot buffet in Shanghai, and a special tasting of fried rice cakes with pork ribs (as seen in the TV show Blossoms Shanghai).",
    days: 8,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/beijing.webp",
    country: "china",
    sectors: ["beijing", "shanghai"],
    featured: true,
  },
  {
    slug: "hokkaido-blossom-symphony-9d6n",
    title: "9D6N Hokkaido Blossom Symphony",
    short:
      'This is a 9-day, 6-night "relaxed pace" tour of Hokkaido. The itinerary focuses on natural beauty, seasonal cherry blossoms ("Sakura Specials"), and local delicacies. Travelers visit key regions including Sapporo, Otaru, Lake Toya, Hakodate, and Noboribetsu.',
    description:
      "Key Highlights: Sapporo - Includes visits to Shikotsuko National Park, Ishiya Chocolate Museum, Hokkaido Shrine, Maruyama Park, Sapporo Beer Factory, and shopping at Tanukikoji Shopping Arcade and Kitahiroshima Outlet. Lake Toya - Features Mt. Showa, the Usu Ropeway, Sairo Terrace, and a free helicopter experience to view the volcanic landscape (weather permitting). Hakodate - Highlights include Fort Goryokaku, Kanemori Red Brick Warehouse, Mt. Hakodate Ropeway, the Morning Market, Hachiman Zaka Slope, and Onuma Quasi National Park. Otaru & Shakotan Peninsula - Features the scenic Otaru Canal, Music Box Museum, Kitaichi Glass Shop, Cape Kamui, and Shimamui Beach. Noboribetsu - Includes the volcanic landscape of Jigokudani (Hell Valley) and the Edo-period historical theme park, Noboribetsu Date Jidaimura. Sakura Specials - Seasonal activities such as bird's-eye views of star-shaped cherry blossoms at Goryokaku Tower and viewing 1,400 cherry blossom trees at Hokkaido Shrine.",
    days: 9,
    nights: 6,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/Hokkaido.webp",
    country: "japan",
    sectors: ["hokkaido"],
    featured: true,
  },
  {
    slug: "best-of-zhangjiajie-8d7n",
    title: "8D7N Best of Zhang Jia Jie",
    short:
      "This is an 8-day that explores the natural wonders and cultural heritage of Hunan province. The itinerary features a relaxed pace, focusing on the iconic landscapes of Zhangjiajie, the ancient charm of Phoenix Town (Fenghuang), and the vibrant city life of Changsha.",
    description:
      "Highlights include visits to Zhangjiajie Grand Canyon, Tianmen Mountain, and the inspiration for Avatar-like landscapes. The tour covers Phoenix Ancient Town, one of China's most well-preserved ancient towns, featuring traditional Xiangxi architecture, local crafts, and riverside walks. In Changsha, experience Hunan cuisine, visit Yuelu Mountain, and explore local markets and cultural sites.",
    days: 8,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/ZhangJiaJia.webp",
    country: "china",
    sectors: [],
  },
  {
    slug: "jiangnan-leisure-escape-8d7n",
    title: "8D7N Jiangnan Leisure Escape",
    short:
      "This is an 8-day tour through the Jiangnan region of China, including Shanghai, Suzhou, Wuxi, Nanjing, Hangzhou, and Wuzhen. The itinerary focuses on a relaxed pace, featuring a mix of historical gardens, modern landmarks, and unique cultural experiences.",
    description:
      "The Jiangnan region offers iconic gardens in Suzhou, classical architecture in Wuxi, historical sites in Nanjing, the West Lake scenic area in Hangzhou, and the traditional water towns of Wuzhen. Experience local cuisine, classical gardens, and the rich cultural heritage of China's most developed regions.",
    days: 8,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/Jiangnan.webp",
    country: "china",
    sectors: ["shanghai"],
  },
  {
    slug: "shenxianju-immortal-journey-8d7n",
    title: "8D7N Shenxianju – An Immortal Journey",
    short:
      'This is an 8-day tour through the scenic landscapes of Zhejiang and Jiangsu provinces. The itinerary focuses on "poetic and picturesque" scenery, featuring ancient water towns, majestic mountains, and cultural experiences with stays in international brand hotels.',
    description:
      "Explore the Shenxianju scenic area with its dramatic rocky peaks, visit ancient water towns with traditional architecture, experience tea plantations, and enjoy cultural performances. The tour emphasizes natural beauty and cultural immersion with high-quality accommodation.",
    days: 8,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/Shenxianju.webp",
    country: "china",
    sectors: [],
  },
  {
    slug: "huangshan-jiangxi-fantasy-8d7n",
    title: "8D7N Stunning Huangshan + Colorful Jiangxi Fantasy Journey",
    short:
      "This is an 8-day tour which focuses on the scenic landscapes and cultural heritage of Zhejiang, Jiangxi, and Anhui provinces, including visits to ancient towns, the majestic Mount Huangshan, and immersive cultural experiences like Hanfu photography.",
    description:
      "The tour features Mount Huangshan's iconic pine trees and granite peaks, UNESCO-listed ancient villages with their distinctive architecture, tea plantations, and cultural experiences. Includes Hanfu (traditional Chinese clothing) photography sessions and visits to local artisan communities.",
    days: 8,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/huangshan.webp",
    country: "china",
    sectors: [],
  },
  {
    slug: "magical-chongqing-8d7n",
    title: "8D7N Magical 8-Dimensional Chongqing",
    short:
      'This 8-day tour offers a unique "8D" magical landscape of Chongqing and its surrounding natural and cultural heritage sites. The journey includes visits to three major World Natural Heritage sites: Wulong, the Wu River Gallery, and the Dazu Rock Carvings.',
    description:
      "Key Highlights: Natural Wonders - Explore the Natural Three Bridges and Fairy Mountain in Wulong, and take a 60-minute boat tour through the picturesque Wu River Gallery. Cultural & Historic Sites - Visit the UNESCO-listed Dazu Rock Carvings (Baodingshan) and its museum, Chiyou Jiuli City, and historic areas like Ciqikou Ancient Town, Shibati, and Longmenhao Old Street. Magical 8D Urban Experiences - Witness the famous Liziba Light Rail station where trains pass through buildings, ride the Imperial Crown Escalator (China's longest), and visit the mind-bending Kuixing Tower. City Landmarks & Nightscapes - Experience the stunning night views at Hongyadong, walk through Jiefangbei Pedestrian Street, and see the Great Hall of the People and Raffles City (Laifushi Square). Local Cuisine - Enjoy various regional specialties including Chongqing Yuanyang Hotpot, a seafood barbeque and hotpot buffet, a Wulong local chicken feast, and a Dazu farmhouse meal.",
    days: 8,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/chongqing.webp",
    country: "china",
    sectors: ["chongqing"],
  },
  {
    slug: "dongbei-changbai-9d7n",
    title: "9D7N Dongbei + Red Beach + Mt. Changbai",
    short:
      "This 9-day, 7-night tour by Joytour Holidays explores the Northeast region of China, including Shenyang, Panjin, Dandong, and Harbin, at a relaxed pace.",
    description:
      "The tour features the red wetlands of Panjin, the scenic beauty of Mt. Changbai (Changbaishan), the historic Dandong border region, and the winter attractions of Harbin. Includes visits to national parks, traditional cuisine, and cultural heritage sites in Northeast China.",
    days: 9,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/Dongbei.webp",
    country: "china",
    sectors: ["harbin"],
  },
  {
    slug: "intriguing-inner-mongolia-9d7n",
    title: "9D7N Intriguing Inner Mongolia",
    short:
      "This 9-day, 7-night boutique tour explores the unique landscapes and cultures of Inner Mongolia, including Hohhot, Baotou, and Ordos, at a relaxed pace with provided Wi-Fi.",
    description:
      "Experience the vast grasslands, nomadic culture, and unique architectural heritage of Inner Mongolia. The tour includes visits to historical sites, traditional museums, grassland activities, and local cuisine experiences.",
    days: 9,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/inner-mongolia.webp",
    country: "china",
    sectors: ["inner-mongolia"],
  },
  {
    slug: "rediscover-xian-9d7n",
    title: "9D7N Rediscover Xi'an",
    short:
      "This 9-day, 7-night tour from Joytour Holidays explores the ancient capital of Xi'an and surrounding historical and natural sites at a relaxed pace with provided Wi-Fi.",
    description:
      "Visit the Terracotta Army Museum, the ancient city walls, the Big Wild Goose Pagoda, and the Muslim Quarter. Explore surrounding natural areas and experience the rich history and culture of China's ancient capital.",
    days: 9,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/Xian.webp",
    country: "china",
    sectors: ["xian"],
  },
  {
    slug: "amazing-shandong-9d7n",
    title: "9D7N Amazing Shandong",
    short:
      'This 9-day, 7-night tour by Joytour Holidays offers a "pure play" experience with no mandatory shopping or forced self-funded activities. It explores major cities in Shandong Province, including Qingdao, Yantai, Jinan, and Qufu, at a relaxed pace with provided Wi-Fi.',
    description:
      "Experience Qingdao's coastal beauty, Yantai's wine culture, Jinan's springs, and Qufu's historical significance as the hometown of Confucius. The tour emphasizes authentic experiences without commercial pressures.",
    days: 9,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/shandong1.webp",
    country: "china",
    sectors: [],
  },
  {
    slug: "most-beautiful-shanxi-9d7n",
    title: "9D7N Most Beautiful Shanxi",
    short:
      "This 9-day, 7-night boutique tour offers an in-depth exploration of Shanxi Province, focusing on its rich Buddhist heritage, ancient architecture, and unique industrial history. The tour is designed with a relaxed pace and provides travelers with stays in 4-star and 5-star accommodations.",
    description:
      "Explore the magnificent Buddhist temples and cave carvings, ancient architecture of traditional courtyard homes, and the industrial heritage sites of Shanxi Province. Includes visits to Datong, Pingyao, and Taiyuan.",
    days: 9,
    nights: 7,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/shanxi.webp",
    country: "china",
    sectors: [],
  },
  {
    slug: "jiuzhaigou-emei-train-expedition-9d8n",
    title: "9D8N Jiuzhaigou + Mt. Emei Train Expedition",
    short:
      "This 9-day, 8-night tour from Joytour Holidays explores the scenic and cultural highlights of Sichuan province, including Jiuzhaigou and Mount Emei.",
    description:
      "Visit the UNESCO World Heritage site of Jiuzhaigou with its colorful lakes and waterfalls, climb the sacred Mount Emei with its Buddhist temples, and explore the cultural heritage of Sichuan Province. Includes scenic train experiences.",
    days: 9,
    nights: 8,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/Jiuzhaigou.webp",
    country: "china",
    sectors: ["chengdu"],
  },
  {
    slug: "signature-chifeng-9d8n",
    title: "9D8N Signature Tour of ChiFeng",
    short:
      "This 9-day, 8-night boutique tour explores the scenic landscapes of Chifeng, Inner Mongolia, and Beijing during the peak autumn season (mid-September to mid-October).",
    description:
      "Experience the golden autumn foliage of Chifeng's grasslands, visit historical sites, explore Inner Mongolia's cultural heritage, and conclude with Beijing's autumn scenery. Perfect for nature lovers during the peak season.",
    days: 9,
    nights: 8,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/chifeng.webp",
    country: "china",
    sectors: ["inner-mongolia", "beijing"],
  },
  {
    slug: "hulunbuir-mohe-grassland-13d11n",
    title: "13D11N Hulunbuir Grassland & Mohe Arctic Village",
    short:
      "This 13-day, 11-night tour package from Joytour Holidays explores the Hulunbuir Grassland and Mohe Arctic Village.",
    description:
      "Experience the vast grasslands of Hulunbuir with nomadic culture, wildlife viewing, and outdoor activities. Visit the northernmost Mohe Arctic Village to experience the midnight sun phenomenon and unique Arctic landscape.",
    days: 13,
    nights: 11,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/grassland.webp",
    country: "china",
    sectors: ["inner-mongolia"],
  },
  {
    slug: "osaka-getaway-6d4n",
    title: "6D4N Osaka Getaway",
    short:
      'This 6-day, 4-night "Osaka Getaway" tour by Joytour Holidays offers a relaxed exploration of Japan\'s vibrant Kansai region.',
    description:
      "Explore Osaka's dynamic culture, visit Kyoto's temples and traditional districts, enjoy Kobe's coastal beauty, and experience local cuisine. A perfect short escape to Japan's Kansai region.",
    days: 6,
    nights: 4,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/osaka.webp",
    country: "japan",
    sectors: ["osaka"],
    featured: true,
  },
  {
    slug: "sakura-splendour-central-japan-9d6n",
    title: "9D6N Sakura Splendour in Central Japan",
    short:
      'Joytour Holidays offers a 9-day, 6-night "Sakura Splendour in Central Japan" tour focused on cultural and natural experiences.',
    description:
      "Experience Japan's iconic cherry blossoms in Central Japan, visit historic temples and gardens, explore traditional towns, and enjoy seasonal cuisine. Timed for peak sakura season with relaxed pace.",
    days: 9,
    nights: 6,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/central.webp",
    country: "japan",
    sectors: [],
  },
  {
    slug: "silk-road-hemu-15d13n",
    title: "15D13N Silk Road + Hemu",
    short:
      "Nam mauris nibh, sagittis et rhoncus at, elementum ac enim. Fusce felis massa, dapibus sit amet veli.",
    description:
      "This 15-day, 13-night tour explores the legendary Silk Road route through Western China, visiting ancient trading posts, breathtaking desert landscapes, and the stunning Hemu village known for its alpine meadows and traditional architecture.",
    days: 15,
    nights: 13,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/silk-road.webp",
    country: "china",
    sectors: ["xinjiang"],
  },
  {
    slug: "northern-xinjiang-deep-dive-12d10n",
    title: "12D10N A Deep Dive into Northern XinJiang",
    short:
      '12D10N A Deep Dive Into Northern Xinjiang offers a comprehensive loop through the "purest land on Earth".',
    description:
      "Explore Northern Xinjiang's diverse landscapes including Tianshan Mountains, pristine lakes, vast deserts, and vibrant cultural centers. Visit Urumqi, Heavenly Lake, and experience the unique multicultural heritage of the region.",
    days: 12,
    nights: 10,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/northern-xinjiang.webp",
    country: "china",
    sectors: ["xinjiang"],
  },
  {
    slug: "best-of-tibet-11d10n",
    title: "11D10N Best of Tibet",
    short:
      "This 11-day tour offers a comprehensive exploration of Tibet, featuring key destinations such as Lhasa, Shigatse, and Gyantse. Highlights include visits to the Potala Palace, the Jokhang Temple, and the world's highest freshwater lake, Yamdrok Lake. Travelers will also experience the scenic Qinghai-Tibet Railway, the highest railway in the world. The tour is designed for comfort and safety, providing professional medical check-ups for high-altitude adjustment.",
    description:
      "Experience Tibet's sacred sites including Potala Palace in Lhasa, Jokhang Temple, Barkhor Street, and the Namtso Salt Lake. Visit Shigatse's Tashilhunpo Monastery and Gyantse's Kumbum stupa. Includes the scenic Qinghai-Tibet Railway journey and professional altitude acclimatization support.",
    days: 11,
    nights: 10,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/tibet.webp",
    country: "china",
    sectors: ["tibet"],
    featured: true,
  },
  {
    slug: "zhangjiajie-yangtze-three-gorges-11d10n",
    title: "11D10N Zhangjiajie and the Yangtze River Three Gorges",
    short:
      "This 11-day, 10-night tour, organized by Joytour Holidays, explores Zhangjiajie and the Yangtze River Three Gorges.",
    description:
      "Combine Zhangjiajie's stunning Avatar-like landscapes with a scenic cruise through the Yangtze River's Three Gorges. Experience both dramatic mountain scenery and river landscapes with visits to historic sites and cultural attractions.",
    days: 11,
    nights: 10,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/zhangjiajia2.webp",
    country: "china",
    sectors: [],
  },
  {
    slug: "signature-gannan-11d9n",
    title: "11D9N Signature Gannan – Discover the Oriental Switzerland o f Tibet",
    short:
      "This 11-day, 9-night boutique tour, organized by Joytour Holidays, explores the Gannan Tibetan region.",
    description:
      'Explore the spectacular alpine meadows, traditional Tibetan villages, and sacred monasteries of Gannan. Experience the unique Tibetan culture, colorful festivals, and breathtaking natural landscapes of this "Oriental Switzerland".',
    days: 11,
    nights: 9,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/gannan.webp",
    country: "china",
    sectors: ["tibet"],
  },
  {
    slug: "shandong-henan-11d9n",
    title: "11D9N Shandong + Henan",
    short:
      'This 11-day, 9-night "Shandong + Henan" tour offered by Joytour Holidays covers major cultural and historical landmarks across the Shandong and Henan provinces.',
    description:
      "Visit the Great Wall, Shaolin Temple, Confucius hometown, and other historical sites. Experience the cultural heritage of Central China with visits to ancient temples, historical museums, and local cultural experiences.",
    days: 11,
    nights: 9,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/shandonghenan.webp",
    country: "china",
    sectors: [],
  },
  {
    slug: "yunnan-shangri-la-10d9n",
    title: "10D9N Yunnan and Shangri-La",
    short:
      "This 10-day, 9-night tour of Yunnan and Shangri-La, organized by Joytour Holidays.",
    description:
      "Explore Yunnan's diverse landscapes and cultures, visit Shangrila's Buddhist monasteries and Tibetan villages, experience local markets, and enjoy specialty cuisine. Includes visits to national parks and ethnic minority villages.",
    days: 10,
    nights: 9,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/henanshangril.webp",
    country: "china",
    sectors: ["yunnan"],
    featured: true,
  },
  {
    slug: "colorful-yunnan-dongchuan-10d9n",
    title: "10D9N Colorful Yunnan + Dongchuan Red Land",
    short:
      'This 10-day, 9-night "Colorful Yunnan + Dongchuan Red Land" tour by Joytour Holidays focuses on a relaxed, immersive experience of Yunnan\'s natural beauty and local culture.',
    description:
      "Experience Yunnan's stunning natural beauty with visits to Kunming, Dali, Lijiang, and the spectacular red soil landscapes of Dongchuan. Includes traditional villages, local markets, cultural experiences, and outdoor activities.",
    days: 10,
    nights: 9,
    image:
      "https://joytour.oomdcstaging.com/wp-content/uploads/2026/03/colorfulyunnan.webp",
    country: "china",
    sectors: ["yunnan"],
  },
];

function pricePlaceholderSgd(days: number): number {
  // Indicative pricing only — confirmed prices come from a planner on enquiry.
  return Math.round((days * 280 + 400) / 50) * 50;
}

function buildTour(raw: RawTour): TourDetail {
  const price = pricePlaceholderSgd(raw.days);
  const sectorPills = raw.sectors.map((slug) => ({
    name: SECTOR_NAMES[slug] ?? slug,
    slug,
  }));
  const countryPill = {
    name: raw.country === "china" ? "China" : "Japan",
    slug: raw.country,
  };
  const destinations = sectorPills.length > 0 ? sectorPills : [countryPill];

  return {
    id: raw.slug,
    slug: raw.slug,
    title: raw.title,
    summary: raw.short,
    description: raw.description,
    durationDays: raw.days,
    durationNights: raw.nights,
    durationLabel: `${raw.days}D${raw.nights}N`,
    basePriceSgd: price,
    heroImage: raw.image,
    country: raw.country,
    destinations,
    departures: [],
    featured: raw.featured ?? false,
    productType: raw.productType ?? "group",
    tags: raw.tags ?? [],
  };
}

const TOURS: TourDetail[] = RAW_TOURS.map(buildTour);

export async function listFeaturedTours(limit = 6): Promise<TourSummary[]> {
  return TOURS.filter((t) => t.featured).slice(0, limit);
}

export function tourMatches(tour: TourSummary, filters: TourFilters): boolean {
  if (filters.country && tour.country !== filters.country) return false;
  if (filters.productType && tour.productType !== filters.productType) return false;
  if (filters.tag && !tour.tags.includes(filters.tag)) return false;
  if (filters.destinationSlug) {
    const matches =
      tour.country === filters.destinationSlug ||
      tour.destinations.some((d) => d.slug === filters.destinationSlug);
    if (!matches) return false;
  }
  if (filters.minDuration && tour.durationDays < filters.minDuration) return false;
  if (filters.maxDuration && tour.durationDays > filters.maxDuration) return false;
  return true;
}

export async function listTours(filters: TourFilters = {}): Promise<TourSummary[]> {
  return TOURS.filter((t) => tourMatches(t, filters));
}

export async function getTourBySlug(slug: string): Promise<TourDetail | null> {
  return TOURS.find((t) => t.slug === slug) ?? null;
}

export async function listToursByCountry(
  country: "china" | "japan"
): Promise<TourSummary[]> {
  return TOURS.filter((t) => t.country === country);
}

export async function listSimilarTours(
  current: TourDetail,
  limit = 3
): Promise<TourSummary[]> {
  const sectorMatches = TOURS.filter(
    (t) =>
      t.slug !== current.slug &&
      t.destinations.some((d) => current.destinations.some((cd) => cd.slug === d.slug))
  );
  const countryMatches = TOURS.filter(
    (t) => t.slug !== current.slug && t.country === current.country
  );
  const seen = new Set<string>();
  const ordered: TourSummary[] = [];
  for (const t of [...sectorMatches, ...countryMatches]) {
    if (!seen.has(t.slug)) {
      seen.add(t.slug);
      ordered.push(t);
      if (ordered.length >= limit) break;
    }
  }
  return ordered;
}

export function allTourSlugs(): string[] {
  return TOURS.map((t) => t.slug);
}

// Stub kept for compatibility with the old destinations page.
export async function listDestinationsWithChildren() {
  return [] as Array<{
    id: string;
    slug: string;
    name: string;
    nameZh: string | null;
    children: Array<{ id: string; slug: string; name: string; nameZh: string | null }>;
  }>;
}

// ───────────────────────── Description rendering ─────────────────────────

export interface HighlightItem {
  title: string;
  body: string;
}

export type ParsedDescription =
  | { kind: "highlights"; items: HighlightItem[] }
  | { kind: "prose"; paragraphs: string[] };

/**
 * Parse a tour description.
 *
 * If the description begins with "Key Highlights:" the rest is split into
 * `[Topic] - [body]` items so the UI can render them as a structured list.
 * Otherwise the description is split into prose paragraphs at sentence breaks.
 *
 * Source text (name, summary, description) is verbatim corporate copy and is
 * not modified by this function.
 */
export function parseDescription(description: string): ParsedDescription {
  const trimmed = description.trim();
  if (trimmed.toLowerCase().startsWith("key highlights:")) {
    const body = trimmed.slice("key highlights:".length).trim();
    // Split on ". " preceding a topic that ends in " - " (the pattern the corporate copy uses).
    const items = body
      .split(/(?<=\.)\s+(?=[A-Z][\w\s'’&()]*\s-\s)/)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk): HighlightItem => {
        const dashIdx = chunk.indexOf(" - ");
        if (dashIdx === -1) return { title: "", body: chunk };
        return {
          title: chunk.slice(0, dashIdx).trim(),
          body: chunk.slice(dashIdx + 3).trim(),
        };
      });
    if (items.length > 0) return { kind: "highlights", items };
  }
  // Plain prose: split into paragraphs at sentence breaks.
  const paragraphs = trimmed
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .map((p) => p.trim())
    .filter(Boolean);
  return { kind: "prose", paragraphs };
}
