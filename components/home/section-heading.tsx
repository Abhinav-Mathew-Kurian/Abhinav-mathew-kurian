import { cn } from "@/lib/utils";

/**
 * Section header used across the homepage and listing pages. The
 * "§ 0N" index is a real section number within the page (a legitimate
 * sequence), doubling as the section divider — no separate decorative
 * rule needed between sections.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  index: number;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <div className="label-mono flex items-center gap-3" style={{ color: "var(--blueline)" }}>
        <span>§ {String(index).padStart(2, "0")}</span>
        <span className="h-px flex-1 bg-border" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-[1.7] text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
