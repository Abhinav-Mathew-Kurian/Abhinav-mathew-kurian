import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

// Admin pages are auth-gated and always need fresh data — never
// statically prerender them (and building shouldn't require a live
// MONGODB_URI to be set).
export const dynamic = "force-dynamic";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Enquiries", href: "/admin/enquiries" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:px-8">
      <aside className="lg:w-48 lg:shrink-0">
        <nav className="glass glow-border space-y-1 rounded-xl p-3 lg:sticky lg:top-24">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-1">
            <LogoutButton />
          </div>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
