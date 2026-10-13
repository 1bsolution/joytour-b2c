import type { ReactNode } from "react";

interface SectionHeroProps {
  kicker: string;
  title: ReactNode;
  body: string;
  children?: ReactNode;
}

// Dark hero shared by the nav landing pages. Header sits transparent on top
// (see DARK_HERO_PAGES in site-header).
export function SectionHero({ kicker, title, body, children }: SectionHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-ink)] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(80,190,180,0.45) 0%, transparent 60%), linear-gradient(180deg, rgba(80,190,180,0.12), rgba(26,26,26,0.84))",
        }}
      />
      <div className="relative mx-auto flex min-h-[440px] max-w-6xl flex-col justify-end px-5 pb-16 pt-36 md:min-h-[500px] md:px-8 md:pb-20 md:pt-40">
        <p className="text-[0.85rem] font-semibold capitalize tracking-[0.06em] text-[color:var(--brand-teal)]">
          {kicker}
        </p>
        <h1 className="mt-4 max-w-4xl text-white">{title}</h1>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-white/85">{body}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
