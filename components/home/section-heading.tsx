"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Section header used across the homepage and listing pages. The
 * "§ 0N" index is a real section number within the page (a legitimate
 * sequence), doubling as the section divider — no separate decorative
 * rule needed between sections. The divider line draws itself in on
 * scroll, with the title/description following in a quick stagger.
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
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="h-px flex-1 bg-border"
        />
        <span>{eyebrow}</span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
        className="mt-4 font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-3 text-base leading-[1.7] text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
