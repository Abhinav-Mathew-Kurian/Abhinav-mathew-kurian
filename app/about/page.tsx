import type { Metadata } from "next";
import Image from "next/image";
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
    "Full CV for Abhinav Mathew Kurian, full-stack & AI systems architect working across blockchain, graph databases, and real-time systems.",
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
};

const CERTIFICATES = [
  "React, NodeJS, Express & MongoDB: The MERN Fullstack Guide",
  "Google Cloud Career: Cloud Engineer Track",
  "The Complete Full-Stack Web Development Bootcamp",
  "AWS Certified Solutions Architect – Associate (SAA-C03), in progress",
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
          title="The full CV: everything that didn't fit on the homepage."
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
          <div>
            <FadeIn className="space-y-5 text-base leading-[1.7] text-muted-foreground">
              <p>
                Abhinav Mathew Kurian: a full-stack &amp; AI systems architect
                with about two years of experience designing and shipping
                complex, multi-system applications. That work has spanned
                the MERN stack, blockchain (ZK proofs, ERC-721), real-time
                IoT pipelines, graph databases, and AI-integrated platforms.
              </p>
              <p>
                Ownership runs the full lifecycle, from system architecture
                decisions through to AWS production deployment. What matters
                more than a polished demo is whether the system holds up
                under real conditions.
              </p>
              <p>
                Currently full-time at Kottackal Business Solutions, taking on
                a small number of freelance projects on the side.
              </p>
            </FadeIn>

            <FadeIn delay={0.08} className="glass mt-10 grid grid-cols-2 gap-6 rounded-md border p-6">
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
          </div>

          <FadeIn delay={0.1} className="mx-auto w-full max-w-[280px] lg:max-w-none">
            <div className="corner-marks overflow-hidden rounded-md border border-border">
              <Image
                src="/images/portfoliProfileimage.png"
                alt="Abhinav Mathew Kurian"
                width={480}
                height={560}
                className="h-auto w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
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
