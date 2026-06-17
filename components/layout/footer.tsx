import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/logo/Logo";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/brand-icons";
import { NAV_LINKS, RESUME_LINK, CONTACT, SOCIAL } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-[1.7] text-muted-foreground">
              Full-stack &amp; AI systems architect working across
              blockchain credentialing, graph databases, and real-time
              telemetry.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h3 className="label-mono text-muted-foreground">
                Navigate
              </h3>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={RESUME_LINK.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {RESUME_LINK.label}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="label-mono text-muted-foreground">
                Contact
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4" /> {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone className="size-4" /> {CONTACT.phoneDisplay}
                  </a>
                </li>
              </ul>
              <div className="mt-4 flex gap-4">
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
              </div>
            </div>
          </div>
        </div>

        <div className="label-mono mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-muted-foreground sm:flex-row">
          <p>© {year} Abhinav Mathew Kurian</p>
          <p>Next.js · MongoDB · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
