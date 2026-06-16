import { cn } from "@/lib/utils";

/**
 * Brand mark for Abhinav Mathew Kurian — a "schematic node": a square
 * frame (referencing a title-block / component outline) around a
 * junction-point glyph (a circle with four short leads), the same
 * vocabulary as the hero's system diagram. Flat ink/paper/brass colors,
 * no gradient. Reads cleanly at favicon size.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="AMK node mark"
      className={cn("h-8 w-8", className)}
    >
      <rect x="2" y="2" width="96" height="96" rx="6" fill="#121316" stroke="#3E5C68" strokeWidth="3" />
      <g stroke="#C98A3E" strokeWidth="5" strokeLinecap="round">
        <line x1="50" y1="22" x2="50" y2="36" />
        <line x1="50" y1="64" x2="50" y2="78" />
        <line x1="22" y1="50" x2="36" y2="50" />
        <line x1="64" y1="50" x2="78" y2="50" />
      </g>
      <circle cx="50" cy="50" r="13" fill="#EAE6DC" />
    </svg>
  );
}

/**
 * Full lockup: icon mark + wordmark, used in the navbar/footer.
 * Pass `subtitle={false}` to drop the role tagline (e.g. for tight
 * spaces like a mobile nav bar).
 */
export function Logo({
  className,
  subtitle = true,
}: {
  className?: string;
  subtitle?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-mono text-sm font-semibold tracking-tight text-foreground sm:text-base">
          Abhinav Mathew Kurian
        </span>
        {subtitle && (
          <span className="label-mono text-muted-foreground">
            Systems Architect
          </span>
        )}
      </span>
    </span>
  );
}
