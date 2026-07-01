import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/home/fade-in";
import { CONTACT } from "@/lib/constants";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <FadeIn>
        <div className="glass corner-marks rounded-md border p-10 text-center sm:p-16">
          <p className="label-mono" style={{ color: "var(--blueline)" }}>
            § 05 · Contact
          </p>
          <h2 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Got a system worth building?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-[1.7] text-muted-foreground">
            Reach out with what&apos;s being built — replies land within a
            day.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Start a conversation <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glow-border rounded-md"
              nativeButton={false}
              render={
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" />
              }
            >
              <MessageCircle className="size-4" /> WhatsApp
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Phone className="size-4" /> {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="size-4" /> {CONTACT.email}
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
