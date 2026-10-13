import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FaqEntry {
  q: string;
  a: string;
}

interface FaqListProps {
  kicker: string;
  title: React.ReactNode;
  items: readonly FaqEntry[];
}

export function FaqList({ kicker, title, items }: FaqListProps) {
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="kicker">{kicker}</p>
          <h2 className="mt-4 text-balance">{title}</h2>
        </div>
        <Accordion className="border-t border-[color:var(--brand-divider)]">
          {items.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-b border-[color:var(--brand-divider)]">
              <AccordionTrigger className="py-5 text-left text-[1rem] font-semibold text-[color:var(--brand-ink)] hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.95rem] leading-[1.7] text-[color:var(--brand-muted)]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
