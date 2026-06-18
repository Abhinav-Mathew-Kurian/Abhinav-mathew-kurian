"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle, ChaosButton } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { NAV_LINKS, RESUME_LINK } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "label-mono text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground"
              )}
              style={
                pathname === link.href
                  ? { textDecoration: "underline", textDecorationColor: "var(--signal)", textUnderlineOffset: "6px" }
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
          <a
            href={RESUME_LINK.href}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono text-muted-foreground transition-colors hover:text-foreground"
          >
            {RESUME_LINK.label}
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ChaosButton />
          <ThemeToggle />
          <Button
            className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            nativeButton={false}
            render={<Link href="/contact" />}
          >
            Contact
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ChaosButton />
          <ThemeToggle />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "label-mono rounded-md px-3 py-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground",
                  pathname === link.href && "bg-secondary text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={RESUME_LINK.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono rounded-md px-3 py-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {RESUME_LINK.label}
            </a>
            <Button
              className="mt-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              nativeButton={false}
              render={<Link href="/contact" onClick={() => setOpen(false)} />}
            >
              Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
