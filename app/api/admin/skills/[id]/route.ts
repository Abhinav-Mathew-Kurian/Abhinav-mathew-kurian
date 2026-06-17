import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SkillModel } from "@/lib/models/Skill";
import { skillSchema } from "@/lib/validations/skill";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const skill = await SkillModel.findById(id).lean();
  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(skill);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = skillSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();
  const skill = await SkillModel.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(skill);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const deleted = await SkillModel.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
