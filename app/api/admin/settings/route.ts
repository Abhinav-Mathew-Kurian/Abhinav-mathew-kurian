import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { SettingsModel } from "@/lib/models/Settings";
import { DEFAULT_RESUME_URL } from "@/lib/data";

const settingsSchema = z.object({
  resumeUrl: z
    .string()
    .trim()
    .min(1)
    .refine(
      (val) => val.startsWith("/") || z.string().url().safeParse(val).success,
      "Enter a full URL (https://...) or a path starting with /"
    ),
});

export async function GET() {
  await connectToDatabase();
  const doc = await SettingsModel.findOne().lean<{ resumeUrl?: string }>();
  return NextResponse.json({ resumeUrl: doc?.resumeUrl || DEFAULT_RESUME_URL });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();
  const doc = await SettingsModel.findOneAndUpdate(
    {},
    { $set: { resumeUrl: parsed.data.resumeUrl } },
    { upsert: true, new: true }
  );
  return NextResponse.json(doc);
}
