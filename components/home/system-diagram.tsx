"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Callout = {
  label: string;
  /** Percent coordinates within the 480x480 diagram space. */
  x: number;
  y: number;
  anchor: "top" | "right" | "bottom" | "left";
};

const CALLOUTS: Callout[] = [
  { label: "ZK PROOFS", x: 50, y: 7, anchor: "top" },
  { label: "GRAPH DATABASES", x: 86, y: 27, anchor: "right" },
  { label: "VECTOR SEARCH", x: 50, y: 93, anchor: "bottom" },
  { label: "PKI / KEY ROTATION", x: 14, y: 73, anchor: "left" },
];

// Line endpoints in the 0-480 SVG coordinate space, paired 1:1 with CALLOUTS.
const LINES = [
  { x1: 240, y1: 165, x2: 240, y2: 40 },
  { x1: 315, y1: 200, x2: 412, y2: 130 },
  { x1: 240, y1: 315, x2: 240, y2: 440 },
  { x1: 165, y1: 280, x2: 68, y2: 350 },
];

const anchorClasses: Record<Callout["anchor"], string> = {
  top: "-translate-x-1/2 -translate-y-full",
  right: "-translate-y-1/2",
  bottom: "-translate-x-1/2",
  left: "-translate-y-1/2 -translate-x-full",
};

/**
 * The page's signature visual: the operator's photo rendered as a labeled
 * node in a system diagram, wired to four of his actual specialty domains
 * (pulled from the resume, not generic buzzwords). Draws itself in once
 * on mount, then sits still — no ambient looping motion.
 *
 * The container is deliberately capped narrower on small screens (with
 * inward-shifted callout anchors) so the side labels never clip past the
 * viewport edge — verified down to a 375px-wide phone.
 */
export function SystemDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[420px]">
      <svg
        viewBox="0 0 480 480"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        {LINES.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--blueline)"
            strokeWidth={1.5}
            strokeDasharray="4 5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: "easeOut" }}
          />
        ))}
        {LINES.map((line, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={line.x2}
            cy={line.y2}
            r={3.5}
            fill="var(--signal)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.85 + i * 0.12 }}
          />
        ))}
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="corner-marks absolute top-1/2 left-1/2 h-[31%] w-[31%] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-border bg-card"
      >
        <Image
          src="/images/profilePicMain.png"
          alt="Abhinav Mathew Kurian"
          fill
          priority
          sizes="(min-width: 640px) 180px, 140px"
          className="object-cover"
        />
      </motion.div>

      <span className="label-mono absolute left-1/2 top-[70%] -translate-x-1/2 text-[9px] text-muted-foreground sm:text-[0.6875rem]">
        FIG. 01 — OPERATOR
      </span>

      {CALLOUTS.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 + i * 0.12 }}
          className={`label-mono absolute w-20 text-[9px] text-muted-foreground sm:w-28 sm:text-[0.6875rem] ${anchorClasses[c.anchor]} ${
            c.anchor === "top" || c.anchor === "bottom" ? "text-center" : ""
          } ${c.anchor === "left" ? "text-right" : ""}`}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          {c.label}
        </motion.div>
      ))}
    </div>
  );
}
