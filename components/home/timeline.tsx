"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeIn } from "@/components/home/fade-in";
import type { ExperienceItem } from "@/lib/data";

export function Timeline({
  experience,
  index,
  detailed = false,
}: {
  experience: ExperienceItem[];
  index: number;
  /** Show the full bullet-point CV detail instead of the short summary. */
  detailed?: boolean;
}) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        index={index}
        eyebrow="Experience"
        title="Where the work happened."
      />

      <div className="relative mt-10 space-y-10 pl-8">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute top-0 bottom-0 left-0 w-px bg-border"
        />
        {experience.map((item, i) => (
          <FadeIn key={item.title + item.org} delay={i * 0.08} className="relative">
            <span
              className="absolute -left-[calc(2rem+4px)] top-1.5 size-2 rounded-full"
              style={{ background: "var(--signal)" }}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-mono text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <span className="label-mono text-muted-foreground">
                {item.period}
                {item.current && (
                  <span
                    className="ml-2 rounded-sm px-1.5 py-0.5"
                    style={{
                      color: "var(--signal)",
                      border: "1px solid color-mix(in oklab, var(--signal) 50%, transparent)",
                    }}
                  >
                    Current
                  </span>
                )}
              </span>
            </div>
            <p className="mt-0.5 text-sm" style={{ color: "var(--blueline)" }}>
              {item.org}
            </p>
            <p className="mt-2.5 text-sm leading-[1.7] whitespace-pre-line text-muted-foreground">
              {detailed ? item.description : item.summary}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
