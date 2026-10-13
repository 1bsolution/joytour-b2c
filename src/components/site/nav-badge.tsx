import { cn } from "@/lib/utils";

export function NavBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-[1.05rem] items-center rounded-full bg-[color:var(--brand-orange)] px-1.5 text-[0.6rem] font-bold uppercase leading-none tracking-[0.06em] text-white",
        className
      )}
    >
      {label}
    </span>
  );
}
