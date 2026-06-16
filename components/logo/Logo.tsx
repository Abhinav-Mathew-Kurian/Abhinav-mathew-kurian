import { cn } from "@/lib/utils";

/**
 * Brand mark for Abhinav Mathew Kurian — his own name, set as a
 * terminal-style wordmark: the leading "A" picked out in the brand's
 * signal/brass accent, followed by a permanently blinking block cursor
 * (the same motif used for the favicon, just animated here). Meaningful
 * rather than abstract — it's literally his name being "typed."
 */
export function Logo({
  className,
  subtitle = true,
}: {
  className?: string;
  subtitle?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="font-mono text-lg font-bold tracking-tight sm:text-xl">
        <span style={{ color: "var(--signal)" }}>A</span>
        <span className="text-foreground">bhinav</span>
        <span
          aria-hidden="true"
          className="cursor-blink ml-0.5 inline-block h-[0.95em] w-[0.45ch] translate-y-[0.12em] align-middle"
          style={{ background: "var(--signal)" }}
        />
      </span>
      {subtitle && (
        <span className="label-mono mt-0.5 text-muted-foreground">
          Systems Architect
        </span>
      )}
    </span>
  );
}
