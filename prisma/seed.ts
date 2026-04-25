import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TourStatus, DepartureStatus } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const china = await db.destination.upsert({
    where: { slug: "china" },
    create: { slug: "china", name: "China", nameZh: "中国", country: "CN", sortOrder: 10 },
    update: {},
  });

  const japan = await db.destination.upsert({
    where: { slug: "japan" },
    create: { slug: "japan", name: "Japan", nameZh: "日本", country: "JP", sortOrder: 20 },
    update: {},
  });

  const beijing = await db.destination.upsert({
    where: { slug: "beijing" },
    create: { slug: "beijing", name: "Beijing", nameZh: "北京", country: "CN", parentId: china.id, sortOrder: 1 },
    update: {},
  });

  const tokyo = await db.destination.upsert({
    where: { slug: "tokyo" },
    create: { slug: "tokyo", name: "Tokyo", nameZh: "東京", country: "JP", parentId: japan.id, sortOrder: 1 },
    update: {},
  });

  await db.tour.upsert({
    where: { slug: "beijing-classic-7d" },
    create: {
      slug: "beijing-classic-7d",
      title: "Beijing Classic 7 Days",
      titleZh: "北京经典 7 日",
      summary: "Forbidden City, Great Wall, Temple of Heaven, and hutongs.",
      description: "A curated introduction to China's capital.",
      durationDays: 7,
      basePriceSgd: "1899",
      highlights: ["Great Wall at Mutianyu", "Forbidden City", "Peking duck dinner"],
      included: ["5-star hotels", "English-speaking guide", "All entry tickets"],
      excluded: ["International flights", "Travel insurance"],
      status: TourStatus.PUBLISHED,
      featured: true,
      destinations: { connect: [{ id: beijing.id }] },
      departures: {
        create: [
          {
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-06-07"),
            priceSgd: "1899",
            capacity: 20,
            status: DepartureStatus.OPEN,
          },
        ],
      },
    },
    update: {},
  });

  await db.tour.upsert({
    where: { slug: "tokyo-highlights-5d" },
    create: {
      slug: "tokyo-highlights-5d",
      title: "Tokyo Highlights 5 Days",
      titleZh: "東京精華 5 日",
      summary: "Shibuya, Asakusa, teamLab, and Mt. Fuji day trip.",
      description: "Neon, tradition, and a view of Fuji on a clear day.",
      durationDays: 5,
      basePriceSgd: "2399",
      highlights: ["Mt. Fuji 5th Station", "teamLab Planets", "Tsukiji Outer Market"],
      included: ["4-star Tokyo hotel", "JR passes", "Mt. Fuji bus tour"],
      excluded: ["Flights", "Lunch on free days"],
      status: TourStatus.PUBLISHED,
      featured: true,
      destinations: { connect: [{ id: tokyo.id }] },
      departures: {
        create: [
          {
            startDate: new Date("2026-07-10"),
            endDate: new Date("2026-07-14"),
            priceSgd: "2399",
            capacity: 16,
            status: DepartureStatus.OPEN,
          },
        ],
      },
    },
    update: {},
  });

  console.log("✔ Seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
