import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/home/fade-in";
import { SectionHeading } from "@/components/home/section-heading";

const FACTS = [
  { label: "Role", value: "Full-Stack Developer, Kottackal Business Solutions" },
  { label: "Focus", value: "Production systems, not demos" },
  { label: "Based in", value: "Trivandrum, Kerala" },
  { label: "Status", value: "Open to freelance work" },
];

export function AboutPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <FadeIn>
        <SectionHeading
          index={1}
          eyebrow="Profile"
          title="About two years deep into systems most teams avoid."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-base leading-[1.7] text-muted-foreground">
              A full-stack &amp; AI systems architect shipping complex,
              multi-system applications end to end: blockchain credentialing
              (ZK proofs, ERC-721), graph databases of clinical relationships,
              real-time IoT telemetry, and AI-integrated retrieval layers.
              Ownership runs the full lifecycle, from architecture decisions
              to AWS production deployment.
            </p>
            <Button
              variant="outline"
              className="glow-border mt-7 rounded-md"
              nativeButton={false}
              render={<Link href="/about" />}
            >
              Read the full profile <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>

          <dl className="glass grid grid-cols-2 gap-6 self-start rounded-md border p-6">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="label-mono text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm text-foreground">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </FadeIn>
    </section>
  );
}
