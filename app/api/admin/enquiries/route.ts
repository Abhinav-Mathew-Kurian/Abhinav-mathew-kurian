import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { EnquiryModel } from "@/lib/models/Enquiry";

export async function GET() {
  await connectToDatabase();
  const enquiries = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(enquiries);
}
