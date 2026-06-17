import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";
import { connectToDatabase } from "@/lib/db";
import { ProjectModel } from "@/lib/models/Project";
import { toPlain } from "@/lib/serialize";
import type { ProjectDoc } from "@/lib/data";

export default async function AdminProjectsPage() {
  await connectToDatabase();
  const docs = await ProjectModel.find().sort({ order: 1 }).lean();
  const projects = toPlain<ProjectDoc[]>(docs);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <Button
          nativeButton={false}
          render={<Link href="/admin/projects/new" />}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" /> New project
        </Button>
      </div>

      <div className="glass glow-border mt-6 overflow-hidden rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No projects yet. Create your first one.
                </TableCell>
              </TableRow>
            )}
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell className="font-medium text-foreground">
                  {project.title}
                </TableCell>
                <TableCell className="capitalize">{project.category}</TableCell>
                <TableCell className="capitalize">{project.status}</TableCell>
                <TableCell>
                  {project.featured ? <Badge>Featured</Badge> : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      nativeButton={false}
                      render={<Link href={`/admin/projects/${project._id}`} />}
                    >
                      Edit
                    </Button>
                    <DeleteProjectButton id={project._id} title={project.title} />
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
