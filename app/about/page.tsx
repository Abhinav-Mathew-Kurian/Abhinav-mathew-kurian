import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/home/fade-in";
import { Timeline } from "@/components/home/timeline";
import { Skills } from "@/components/home/skills";
import { getExperience, getSkillsByCategory } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full CV — Abhinav Mathew Kurian, full-stack & AI systems architect working across blockchain, graph databases, and real-time systems.",
};

const QUICK_FACTS = [
  { label: "Role", value: "Full-Stack Developer, Kottackal Business Solutions" },
  { label: "Experience", value: "~2 years, production systems" },
  { label: "Based in", value: SITE.location },
  { label: "Availability", value: "Open to freelance projects" },
];

const EDUCATION = {
  degree: "B.Tech, Computer Science Engineering",
  school: "Vimal Jyothi Engineering College",
  period: "09/2020 – 06/2024",
  detail: "8.19 CGPA",
};

const CERTIFICATES = [
  "React, NodeJS, Express & MongoDB — The MERN Fullstack Guide",
  "Google Cloud Career — Cloud Engineer Track",
  "The Complete Full-Stack Web Development Bootcamp",
  "AWS Certified Solutions Architect – Associate (SAA-C03) — in progress",
];

export default async function AboutPage() {
  const [experience, skills] = await Promise.all([
    getExperience(),
    getSkillsByCategory(),
  ]);

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeading
          index={1}
          eyebrow="Profile"
          title="The full CV — everything that didn't fit on the homepage."
        />

        <FadeIn className="mt-8 space-y-5 text-base leading-[1.7] text-muted-foreground">
          <p>
            I&apos;m Abhinav Mathew Kurian — a full-stack &amp; AI systems
            architect with about two years of experience independently
            designing and shipping complex, multi-system applications.
            That&apos;s spanned the MERN stack, blockchain (ZK proofs,
            ERC-721), real-time IoT pipelines, graph databases, and
            AI-integrated platforms.
          </p>
          <p>
            I&apos;m comfortable owning the full lifecycle — from system
            architecture decisions through to AWS production deployment —
            and I care more about whether a system holds up under real
            conditions than whether the demo looks good.
          </p>
          <p>
            Currently full-time at Kottackal Business Solutions, taking on a
            small number of freelance projects on the side.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="glass mt-10 grid grid-cols-2 gap-6 rounded-md border p-6 sm:grid-cols-4">
          {QUICK_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="label-mono text-muted-foreground">{fact.label}</dt>
              <dd className="mt-1.5 text-sm text-foreground">{fact.value}</dd>
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.12} className="mt-10 flex flex-wrap gap-4">
          <Button
            nativeButton={false}
            render={<Link href="/contact" />}
            className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get in touch <ArrowRight className="ml-1 size-4" />
          </Button>
          <Button
            variant="outline"
            className="glow-border rounded-md"
            nativeButton={false}
            render={<a href="/resume" target="_blank" rel="noopener noreferrer" />}
          >
            <FileText className="size-4" /> Download résumé
          </Button>
        </FadeIn>
      </section>

      <Timeline experience={experience} index={2} detailed />

      <Skills skills={skills} index={3} />

      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeading index={4} eyebrow="Education" title="Background." />

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <FadeIn>
            <p className="label-mono text-muted-foreground">{EDUCATION.period}</p>
            <h3 className="mt-2 font-mono text-base font-semibold text-foreground">
              {EDUCATION.degree}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--blueline)" }}>
              {EDUCATION.school}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{EDUCATION.detail}</p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <p className="label-mono text-muted-foreground">Certificates</p>
            <ul className="mt-2 space-y-2">
              {CERTIFICATES.map((cert) => (
                <li key={cert} className="text-sm leading-[1.6] text-muted-foreground">
                  {cert}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
