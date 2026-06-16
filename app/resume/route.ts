import { NextResponse } from "next/server";
import { getResumeUrl } from "@/lib/data";

/**
 * Stable, shareable resume link — abhinavmathewkurian.com/resume always
 * points at the current resume, even after it's updated from /admin,
 * without anyone needing a new URL.
 */
export async function GET(request: Request) {
  const resumeUrl = await getResumeUrl();
  const absoluteUrl = new URL(resumeUrl, request.url);
  return NextResponse.redirect(absoluteUrl, { status: 307 });
}
