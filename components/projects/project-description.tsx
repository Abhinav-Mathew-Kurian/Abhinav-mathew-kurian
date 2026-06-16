/**
 * Renders a project's description text with light structure: paragraphs
 * separated by a blank line, and any paragraph made entirely of "• "
 * lines rendered as a proper bullet list (with the brand's dot marker,
 * not a default browser bullet).
 */
export function ProjectDescription({ text }: { text: string }) {
  const blocks = text.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-5 text-base leading-[1.7] text-muted-foreground">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter(Boolean);
        const isBulletBlock = lines.every((line) => line.trim().startsWith("• "));

        if (isBulletBlock) {
          return (
            <ul key={i} className="space-y-2.5">
              {lines.map((line, j) => (
                <li key={j} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] block size-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--signal)" }}
                  />
                  <span>{line.trim().replace(/^•\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }

        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}
