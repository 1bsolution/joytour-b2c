import { setRequestLocale } from "next-intl/server";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Journal</h1>
      <p className="mt-4 text-muted-foreground">Stories from our guides. Coming soon.</p>
    </section>
  );
}
