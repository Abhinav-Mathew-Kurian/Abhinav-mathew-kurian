import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SkillModel } from "@/lib/models/Skill";
import { skillSchema } from "@/lib/validations/skill";

export async function GET() {
  await connectToDatabase();
  const skills = await SkillModel.find().sort({ category: 1, order: 1 }).lean();
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = skillSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();
  const skill = await SkillModel.create(parsed.data);
  return NextResponse.json(skill, { status: 201 });
}
