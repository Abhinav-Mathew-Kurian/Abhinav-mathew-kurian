import { SkillForm } from "@/components/admin/skill-form";

export default function NewSkillPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Add skill</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add a new skill to your skills section.
      </p>
      <div className="mt-6 max-w-xl">
        <SkillForm />
      </div>
    </div>
  );
}
