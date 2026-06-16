import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { EnquiryModel } from "@/lib/models/Enquiry";

type RouteParams = { params: Promise<{ id: string }> };

const statusSchema = z.object({
  status: z.enum(["new", "read", "responded"]),
});

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();
  const enquiry = await EnquiryModel.findByIdAndUpdate(
    id,
    { status: parsed.data.status },
    { new: true }
  );
  if (!enquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(enquiry);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const deleted = await EnquiryModel.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
