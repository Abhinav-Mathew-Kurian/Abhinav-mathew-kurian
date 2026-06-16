import { Resend } from "resend";
import { CONTACT } from "@/lib/constants";
import type { ContactInput } from "@/lib/validations/contact";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * Emails a notification for a new contact-form enquiry. The enquiry is
 * always saved to MongoDB regardless of whether this succeeds — see
 * app/api/contact/route.ts.
 *
 * NOTE: `from` uses Resend's shared sandbox sender. Once
 * abhinavmathewkurian.com is verified in the Resend dashboard, switch
 * this to something like "Portfolio <enquiries@abhinavmathewkurian.com>".
 */
export async function sendEnquiryNotification(data: ContactInput) {
  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping enquiry email notification."
    );
    return;
  }

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: CONTACT.email,
    replyTo: data.email,
    subject: `New enquiry from ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.projectType ? `Project type: ${data.projectType}` : null,
      data.budgetRange ? `Budget: ${data.budgetRange}` : null,
      "",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
