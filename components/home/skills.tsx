import {
  Code2,
  Server,
  Radio,
  ShieldCheck,
  Database,
  Cloud,
  BrainCircuit,
  Blocks,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/home/fade-in";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  "Frontend Development": Code2,
  "Backend Development": Server,
  "Real-Time Systems": Radio,
  "Security & Cryptography": ShieldCheck,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "AI & Agents": BrainCircuit,
  Blockchain: Blocks,
};

/**
 * Set as a spec-sheet index, not a card grid: domain on the left, a
 * dotted leader bridging to the tool list on the right — the same
 * device a table of contents or a datasheet pinout uses to pair a
 * label with its value. Rows are free to be whatever height their
 * own content needs, so a 4-tool domain and a 7-tool domain never
 * have to fake matching heights the way equal boxes would.
 */
export function Skills({
  skills,
  index = 2,
}: {
  skills: Record<string, string[]>;
  index?: number;
}) {
  const categories = Object.entries(skills);

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        index={index}
        eyebrow="Skills"
        title="Eight domains, one stack."
        description="The tools and protocols behind the systems above — grouped the same way they show up in production."
      />

      <div className="mt-10 border-t border-border">
        {categories.map(([category, items], i) => {
          const Icon = CATEGORY_ICON[category] ?? Wrench;
          return (
            <FadeIn
              key={category}
              delay={i * 0.04}
              className="group flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border py-4"
            >
              <div className="flex shrink-0 items-center gap-2">
                <Icon
                  className="size-3.5 transition-colors group-hover:text-foreground"
                  style={{ color: "var(--blueline)" }}
                  strokeWidth={1.5}
                />
                <h3 className="label-mono text-foreground">{category}</h3>
                <span className="label-mono text-muted-foreground">
                  {items.length}
                </span>
              </div>

              <span
                className="hidden h-0 flex-1 border-b border-dotted border-border sm:block"
                aria-hidden
              />

              <p className="basis-full font-mono text-[0.8125rem] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground sm:basis-auto sm:max-w-[56%] sm:text-right">
                {items.join("   ·   ")}
              </p>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
