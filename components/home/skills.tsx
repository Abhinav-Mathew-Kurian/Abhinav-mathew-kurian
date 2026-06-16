import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/home/fade-in";

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

      <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(([category, items], i) => (
          <FadeIn key={category} delay={i * 0.04} className="bg-card p-6">
            <h3 className="label-mono" style={{ color: "var(--blueline)" }}>
              {category}
            </h3>
            <ul className="mt-4 space-y-1.5">
              {items.map((skill) => (
                <li key={skill} className="text-sm text-foreground">
                  {skill}
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
