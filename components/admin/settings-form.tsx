"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ExternalLink, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormValues = { resumeUrl: string };

export function SettingsForm({ resumeUrl }: { resumeUrl: string }) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { resumeUrl },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.fieldErrors?.resumeUrl?.[0] ?? "Failed to save");
      }
      toast.success("Resume link updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass space-y-4 rounded-md border p-6"
    >
      <div className="space-y-1.5">
        <Label htmlFor="resumeUrl">Resume URL</Label>
        <Input
          id="resumeUrl"
          placeholder="https://... or /resume/your-file.pdf"
          {...register("resumeUrl", { required: true })}
        />
        <p className="text-xs text-muted-foreground">
          Upload your PDF somewhere (Google Drive, Cloudinary, GitHub) and
          paste the direct link here — or upload a new file to{" "}
          <code className="font-mono">public/resume/</code> and link to it
          with a path like <code className="font-mono">/resume/file.pdf</code>.
          The public <code className="font-mono">/resume</code> link on the
          site always redirects to whatever&apos;s saved here.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="size-4" /> Save
            </>
          )}
        </Button>
        <a
          href="/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          View current resume <ExternalLink className="size-3.5" />
        </a>
      </div>
    </form>
  );
}
