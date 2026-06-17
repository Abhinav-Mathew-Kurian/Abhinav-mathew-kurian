import { notFound } from "next/navigation";
import { SkillForm } from "@/components/admin/skill-form";
import { connectToDatabase } from "@/lib/db";
import { SkillModel } from "@/lib/models/Skill";
import { toPlain } from "@/lib/serialize";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditSkillPage({ params }: PageProps) {
  const { id } = await params;
  await connectToDatabase();
  const doc = await SkillModel.findById(id).lean();
  if (!doc) notFound();

  const skill = toPlain<{ _id: string; name: string; category: string; order: number }>(doc);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit skill</h1>
      <p className="mt-1 text-sm text-muted-foreground">{skill.name}</p>
      <div className="mt-6 max-w-xl">
        <SkillForm skill={skill} />
      </div>
    </div>
  );
}
