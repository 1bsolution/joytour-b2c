import { setRequestLocale } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Contact</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        WhatsApp is the fastest way to reach us. Emails are answered within one business day.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://wa.me/6586299765"
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          WhatsApp
        </a>
        <a
          href="mailto:hello@joytour.sg"
          className={buttonVariants({ size: "lg", variant: "outline" })}
        >
          hello@joytour.sg
        </a>
      </div>
    </section>
  );
}
