import { cn } from "@/lib/utils";

// Marks authored placeholder content so nobody mistakes it for a real offer.
export function SampleBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[color:var(--brand-cream)] px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[color:var(--brand-orange)]",
        className
      )}
    >
      Sample
    </span>
  );
}
