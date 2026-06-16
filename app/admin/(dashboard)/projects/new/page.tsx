import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">New project</h1>
      <div className="mt-6">
        <ProjectForm />
      </div>
    </div>
  );
}
