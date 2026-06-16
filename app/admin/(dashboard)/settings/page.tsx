import { SettingsForm } from "@/components/admin/settings-form";
import { getResumeUrl } from "@/lib/data";

export default async function AdminSettingsPage() {
  const resumeUrl = await getResumeUrl();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Site-wide settings that don&apos;t need a redeploy.
      </p>

      <div className="mt-6 max-w-xl">
        <SettingsForm resumeUrl={resumeUrl} />
      </div>
    </div>
  );
}
