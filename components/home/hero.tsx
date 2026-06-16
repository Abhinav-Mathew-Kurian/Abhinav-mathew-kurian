"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/brand-icons";
import { HeroPhoto } from "@/components/home/hero-photo";
import { Typewriter } from "@/components/effects/typewriter";
import { SOCIAL, CONTACT, SITE } from "@/lib/constants";

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
            {SITE.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-4 font-mono text-[2.75rem] leading-[1.02] font-semibold tracking-tight text-foreground sm:text-[3.75rem] lg:text-[4.25rem]"
          >
            <Typewriter
              text={"Full-stack &\nAI systems architect."}
              startDelay={300}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-[1.7] text-muted-foreground"
          >
            Specialized in high-stakes production systems: zero-knowledge
            identity proofs, graph-based clinical risk models, and
            PKI-secured telemetry with live key rotation. Full-time at
            Kottackal Business Solutions, open to select freelance work
            on the side.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8"
          >
            <span className="label-mono text-muted-foreground">Role</span>
            <p className="mt-1 font-mono text-sm font-medium text-foreground">
              Full-Stack Developer, Kottackal Business Solutions
            </p>
          </motion.div>

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
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <InstagramIcon className="size-5" />
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

        <HeroPhoto />
      </div>
    </section>
  );
}
