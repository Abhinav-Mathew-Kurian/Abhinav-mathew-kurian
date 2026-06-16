"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import type { ProjectDoc } from "@/lib/data";

type FormValues = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  techStack: string; // comma-separated in the form, split into an array on submit
  keySkills: string; // comma-separated in the form, split into an array on submit
  category: "freelance" | "full-time" | "personal";
  role: string;
  period: string;
  liveUrl: string;
  githubUrl: string;
  coverImage: string;
  featured: boolean;
  order: number;
  status: "live" | "in-progress" | "archived";
};

function toFormValues(project?: ProjectDoc): FormValues {
  return {
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    summary: project?.summary ?? "",
    description: project?.description ?? "",
    techStack: project?.techStack?.join(", ") ?? "",
    keySkills: project?.keySkills?.join(", ") ?? "",
    category: project?.category ?? "personal",
    role: project?.role ?? "",
    period: project?.period ?? "",
    liveUrl: project?.liveUrl ?? "",
    githubUrl: project?.githubUrl ?? "",
    coverImage: project?.coverImage ?? "",
    featured: project?.featured ?? false,
    order: project?.order ?? 0,
    status: project?.status ?? "live",
  };
}

export function ProjectForm({ project }: { project?: ProjectDoc }) {
  const router = useRouter();
  const isEditing = Boolean(project);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: toFormValues(project) });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        techStack: values.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        keySkills: values.keySkills
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        order: Number(values.order) || 0,
        gallery: project?.gallery ?? [],
      };

      const res = await fetch(
        isEditing ? `/api/admin/projects/${project!._id}` : "/api/admin/projects",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.formErrors?.[0] ?? body?.error ?? "Failed to save project");
      }

      toast.success(isEditing ? "Project updated" : "Project created");
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass glow-border space-y-5 rounded-xl p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title", { required: true })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" placeholder="my-project" {...register("slug", { required: true })} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="summary">Summary (one line)</Label>
        <Input id="summary" {...register("summary", { required: true })} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Full description / case study</Label>
        <Textarea
          id="description"
          rows={8}
          placeholder={
            "Intro paragraph...\n\n• Bullet point one\n• Bullet point two\n\nAnother paragraph if needed..."
          }
          {...register("description", { required: true })}
        />
        <p className="text-xs text-muted-foreground">
          Separate paragraphs with a blank line. A paragraph made entirely
          of lines starting with &ldquo;• &rdquo; renders as a bullet list.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="techStack">Tech stack (comma-separated)</Label>
          <Input id="techStack" placeholder="Next.js, MongoDB, AWS" {...register("techStack")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="keySkills">Key skills (comma-separated)</Label>
          <Input
            id="keySkills"
            placeholder="Real-time systems, RBAC, SEO architecture"
            {...register("keySkills")}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="in-progress">In progress</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="order">Order</Label>
          <Input id="order" type="number" {...register("order")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="role">Your role (optional)</Label>
          <Input id="role" placeholder="Full-Stack Developer" {...register("role")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="period">Date range (optional)</Label>
          <Input id="period" placeholder="05/2026 – 06/2026" {...register("period")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="liveUrl">Live URL (optional)</Label>
          <Input id="liveUrl" placeholder="https://..." {...register("liveUrl")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
          <Input id="githubUrl" placeholder="https://github.com/..." {...register("githubUrl")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="coverImage">Cover image URL (optional)</Label>
        <Input id="coverImage" placeholder="https://..." {...register("coverImage")} />
      </div>

      <label htmlFor="featured" className="flex items-center gap-2 text-sm text-foreground">
        <input
          id="featured"
          type="checkbox"
          className="size-4 rounded border-input accent-primary"
          {...register("featured")}
        />
        Show in &ldquo;Featured projects&rdquo; on the homepage
      </label>

      {Object.keys(errors).length > 0 && (
        <p className="text-sm text-destructive">
          Please fill in all required fields (title, slug, summary, description).
        </p>
      )}

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
            <Save className="size-4" /> {isEditing ? "Save changes" : "Create project"}
          </>
        )}
      </Button>
    </form>
  );
}
