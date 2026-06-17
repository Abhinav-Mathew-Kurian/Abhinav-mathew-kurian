import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteSkillButton } from "@/components/admin/delete-skill-button";
import { connectToDatabase } from "@/lib/db";
import { SkillModel } from "@/lib/models/Skill";
import { toPlain } from "@/lib/serialize";

type SkillDoc = { _id: string; name: string; category: string; order: number };

export default async function AdminSkillsPage() {
  await connectToDatabase();
  const docs = await SkillModel.find().sort({ category: 1, order: 1 }).lean();
  const skills = toPlain<SkillDoc[]>(docs);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Skills</h1>
        <Button
          nativeButton={false}
          render={<Link href="/admin/skills/new" />}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" /> Add skill
        </Button>
      </div>

      <div className="glass glow-border mt-6 overflow-hidden rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No skills yet. Add your first one.
                </TableCell>
              </TableRow>
            )}
            {skills.map((skill) => (
              <TableRow key={skill._id}>
                <TableCell className="font-medium text-foreground">{skill.name}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>{skill.order}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      nativeButton={false}
                      render={<Link href={`/admin/skills/${skill._id}`} />}
                    >
                      Edit
                    </Button>
                    <DeleteSkillButton id={skill._id} name={skill.name} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
