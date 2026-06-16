import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { connectToDatabase } from "@/lib/db";
import { EnquiryModel } from "@/lib/models/Enquiry";
import { sendEnquiryNotification } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    await EnquiryModel.create(parsed.data);
  } catch (err) {
    console.error("Failed to save enquiry", err);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again shortly." },
      { status: 500 }
    );
  }

  // Email notification is best-effort — the enquiry is already saved above,
  // so a flaky email provider shouldn't make the form look like it failed.
  try {
    await sendEnquiryNotification(parsed.data);
  } catch (err) {
    console.error("Failed to send enquiry notification email", err);
  }

  return NextResponse.json({ ok: true });
}
