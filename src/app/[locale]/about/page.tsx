import { setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">About Joytours</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        We’re a Singapore-based tour operator specialising in China and Japan. Our trips
        are run by in-country guides and paced for travellers who want depth over speed.
      </p>
    </section>
  );
}
