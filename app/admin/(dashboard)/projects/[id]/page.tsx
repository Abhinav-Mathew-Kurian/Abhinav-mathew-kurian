import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { connectToDatabase } from "@/lib/db";
import { ProjectModel } from "@/lib/models/Project";
import { toPlain } from "@/lib/serialize";
import type { ProjectDoc } from "@/lib/data";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  await connectToDatabase();
  const doc = await ProjectModel.findById(id).lean();
  if (!doc) notFound();

  const project = toPlain<ProjectDoc>(doc);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit project</h1>
      <div className="mt-6">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
