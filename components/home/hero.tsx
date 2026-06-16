"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { SystemDiagram } from "@/components/home/system-diagram";
import { SOCIAL, CONTACT, SITE } from "@/lib/constants";

const TITLE_BLOCK = [
  { label: "Role", value: "Full-Stack Developer, Kottackal Business Solutions" },
  { label: "Location", value: SITE.location },
  { label: "Status", value: "Available for freelance work" },
];

export function Hero() {
  return (
    <section className="bg-grid relative isolate overflow-hidden border-b border-border">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="label-mono"
            style={{ color: "var(--blueline)" }}
          >
            {SITE.name} — Index 01
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-4 font-mono text-[2.75rem] leading-[1.02] font-semibold tracking-tight text-foreground sm:text-[3.75rem] lg:text-[4.25rem]"
          >
            Full-stack &amp;
            <br />
            AI systems architect.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground"
          >
            I design and ship production systems most teams won&apos;t
            touch — zero-knowledge identity proofs, graph-based clinical
            risk models, and PKI-secured telemetry with live key rotation.
            Full-time at Kottackal Business Solutions; open to select
            freelance work on the side.
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="glass mt-8 grid max-w-xl grid-cols-1 gap-3 rounded-md border p-4 sm:grid-cols-3"
          >
            {TITLE_BLOCK.map((field) => (
              <div key={field.label}>
                <dt className="label-mono text-muted-foreground">{field.label}</dt>
                <dd className="mt-1 text-sm text-foreground">{field.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              nativeButton={false}
              render={<Link href="/projects" />}
            >
              View the work <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glow-border rounded-md"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Start a conversation
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center gap-5"
          >
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-5" />
            </a>
          </motion.div>
        </div>

        <SystemDiagram />
      </div>
    </section>
  );
}
