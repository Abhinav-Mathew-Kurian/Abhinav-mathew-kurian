import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { ProjectModel } from "@/lib/models/Project";
import { projectSchema } from "@/lib/validations/project";

export async function GET() {
  await connectToDatabase();
  const projects = await ProjectModel.find().sort({ order: 1 }).lean();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();

  const existing = await ProjectModel.findOne({ slug: parsed.data.slug });
  if (existing) {
    return NextResponse.json(
      { error: "A project with this slug already exists." },
      { status: 409 }
    );
  }

  const project = await ProjectModel.create(parsed.data);
  revalidatePath("/");
  revalidatePath("/projects");
  return NextResponse.json(project, { status: 201 });
}
