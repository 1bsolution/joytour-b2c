// Static destination & sector data for header dropdown, destinations index, and
// sector landing pages. Mirrors the catalog the corporate WordPress site lists.
//
// When the Prisma `Destination` table is populated, sector pages will load
// matching tours via `listTours({ destinationSlug })`; this static file remains
// the source of truth for the IA (header dropdown, hero copy, hero imagery).

export interface Sector {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
}

export interface Country {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  routeCountLabel: string;
  sectors: Sector[];
}

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const destinations: Country[] = [
  {
    slug: "china",
    name: "China",
    description:
      "From the Forbidden City to the karst rivers of Guilin, the high desert of Xinjiang, and the rice terraces of Yunnan — thirteen routes through one of the world's most varied countries.",
    heroImage: u("photo-1508804185872-d7badad00f7d", 2000),
    routeCountLabel: "13 routes",
    sectors: [
      {
        slug: "beijing",
        name: "Beijing",
        description:
          "The Forbidden City, the Great Wall, and a city that has rebuilt itself many times over. Capital cuisine, hutong mornings, and the seat of Chinese statecraft.",
        heroImage: u("photo-1547981609-4b6bfe67ca0b"),
      },
      {
        slug: "shanghai",
        name: "Shanghai",
        description:
          "The Bund, art-deco lanes, and a skyline that defines twenty-first-century Asia. A pace that's faster than the rest of the country, by design.",
        heroImage: u("photo-1548919973-5cef591cdbc9"),
      },
      {
        slug: "yunnan",
        name: "Yunnan",
        description:
          "Tea villages, Naxi old towns, and rice terraces farmed for a thousand years. The most botanically rich province in the country.",
        heroImage: u("photo-1583417319070-4a69db38a482"),
      },
      {
        slug: "guilin",
        name: "Guilin",
        description:
          "The Li River and karst peaks that have appeared on Chinese landscape paintings for centuries. Slow boats, rice paddies, and Yangshuo villages downstream.",
        heroImage: u("photo-1508804185872-d7badad00f7d"),
      },
      {
        slug: "tibet",
        name: "Tibet",
        description:
          "Lhasa's Potala Palace, monasteries on the high plateau, and the route to Everest base camp. High altitude, deep stillness.",
        heroImage: u("photo-1528360983277-13d401cdc186"),
      },
      {
        slug: "xinjiang",
        name: "Xinjiang",
        description:
          "Silk Road oases, Tian Shan mountains, and the deserts of the far west. Uyghur towns, lamb skewers, and the longest road trips in the catalogue.",
        heroImage: u("photo-1493976040374-85c8e12f0c0e"),
      },
      {
        slug: "xian",
        name: "Xi'an",
        description:
          "The Terracotta Army and the eastern terminus of the ancient Silk Road. City walls you can cycle, and the Muslim Quarter at night.",
        heroImage: u("photo-1480796927426-f609979314bd"),
      },
      {
        slug: "chengdu",
        name: "Chengdu",
        description:
          "Pandas, Sichuan cooking, and the relaxed pace of a city famous for taking its time. Mahjong in the parks, hotpot at every corner.",
        heroImage: u("photo-1776771180020-22cbc7638296"),
      },
      {
        slug: "chongqing",
        name: "Chongqing",
        description:
          "Yangtze River cruises, fiery hotpot, and a megacity built on hills and bridges. The starting point for the Three Gorges run.",
        heroImage: u("photo-1528127269322-539801943592"),
      },
      {
        slug: "harbin",
        name: "Harbin",
        description:
          "Russian-influenced architecture, an ice-and-snow festival, and northern Chinese cuisine. Bring a serious coat.",
        heroImage: u("photo-1548919973-5cef591cdbc9"),
      },
      {
        slug: "inner-mongolia",
        name: "Inner Mongolia",
        description:
          "Grasslands, gers, and horse-riding country at the edge of the Gobi. Open sky and traditional nomad hospitality.",
        heroImage: u("photo-1542931287-023b922fa89b"),
      },
      {
        slug: "qinghai",
        name: "Qinghai",
        description:
          "Lake Qinghai, Tibetan-Buddhist culture, and the source of the Yellow River. Highland routes that sit between Tibet and the Silk Road.",
        heroImage: u("photo-1583417319070-4a69db38a482"),
      },
      {
        slug: "hainan",
        name: "Hainan",
        description:
          "China's tropical island in the South China Sea — beaches, coves, tea plantations, and a slower coastal pace.",
        heroImage: u("photo-1644027620178-83cf81e8ece4"),
      },
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    description:
      "Six thoughtfully planned routes — including twin-city options that pair a metropolis with a quieter region.",
    heroImage: u("photo-1493976040374-85c8e12f0c0e", 2000),
    routeCountLabel: "6 routes",
    sectors: [
      {
        slug: "hokkaido",
        name: "Hokkaido",
        description:
          "Hot springs, Sapporo's snow festival, and Japan's wildest northern coastline. Lavender fields in summer, powder snow in winter.",
        heroImage: u("photo-1542931287-023b922fa89b"),
      },
      {
        slug: "osaka",
        name: "Osaka",
        description:
          "Street food, castle districts, and the gateway to Kansai's temples. Takoyaki at midnight, Dotonbori neon overhead.",
        heroImage: u("photo-1480796927426-f609979314bd"),
      },
    ],
  },
];

export function findCountryBySlug(slug: string): Country | undefined {
  return destinations.find((c) => c.slug === slug);
}

export function findSectorBySlug(
  slug: string
): { country: Country; sector: Sector } | undefined {
  for (const country of destinations) {
    const sector = country.sectors.find((s) => s.slug === slug);
    if (sector) return { country, sector };
  }
  return undefined;
}

export function findSlug(slug: string):
  | { kind: "country"; country: Country }
  | { kind: "sector"; country: Country; sector: Sector }
  | undefined {
  const country = findCountryBySlug(slug);
  if (country) return { kind: "country", country };
  const found = findSectorBySlug(slug);
  if (found) return { kind: "sector", ...found };
  return undefined;
}

export function allSlugs(): string[] {
  const slugs: string[] = [];
  for (const country of destinations) {
    slugs.push(country.slug);
    for (const sector of country.sectors) slugs.push(sector.slug);
  }
  return slugs;
}
