"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SKILL_CATEGORIES } from "@/lib/validations/skill";

type SkillDoc = { _id: string; name: string; category: string; order: number };

type FormValues = {
  name: string;
  category: (typeof SKILL_CATEGORIES)[number];
  order: number;
};

function toFormValues(skill?: SkillDoc): FormValues {
  return {
    name: skill?.name ?? "",
    category: (skill?.category as FormValues["category"]) ?? SKILL_CATEGORIES[0],
    order: skill?.order ?? 0,
  };
}

export function SkillForm({ skill }: { skill?: SkillDoc }) {
  const router = useRouter();
  const isEditing = Boolean(skill);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: toFormValues(skill) });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const payload = { ...values, order: Number(values.order) || 0 };
      const res = await fetch(
        isEditing ? `/api/admin/skills/${skill!._id}` : "/api/admin/skills",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.formErrors?.[0] ?? body?.error ?? "Failed to save skill");
      }

      toast.success(isEditing ? "Skill updated" : "Skill added");
      router.push("/admin/skills");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save skill");
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
          <Label htmlFor="name">Skill name</Label>
          <Input
            id="name"
            placeholder="e.g. Next.js"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-xs text-destructive">Name is required.</p>
          )}
        </div>

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
                  {SKILL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="w-32 space-y-1.5">
        <Label htmlFor="order">Order</Label>
        <Input id="order" type="number" {...register("order")} />
      </div>

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
            <Save className="size-4" /> {isEditing ? "Save changes" : "Add skill"}
          </>
        )}
      </Button>
    </form>
  );
}
