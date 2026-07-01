import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/home/section-heading";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Abhinav Mathew Kurian, Full-Stack & AI Systems Architect, for full-time opportunities or to discuss a project.",
};

const QUICK_LINKS = [
  {
    label: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
    icon: Phone,
  },
  {
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: Mail,
  },
  {
    label: "Chat on WhatsApp",
    href: CONTACT.whatsapp,
    icon: MessageCircle,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        index={1}
        eyebrow="Contact"
        title="Start a conversation."
        description="Fill out the form below, or reach out directly. Whichever's easiest."
      />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {QUICK_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="glass glow-border inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-foreground"
          >
            <link.icon className="size-4" /> {link.label}
          </a>
        ))}
      </div>

      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
}
