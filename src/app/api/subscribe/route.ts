import { addContact, describeBrevoError, loadBrevoConfig, sendNotification, type BrevoConfig } from "@/lib/brevo";
import { failureEmail, successEmail } from "@/lib/emailTemplates";

// Same pattern the waitlist form validates against
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;

const json = (data: Record<string, unknown>, status = 200) => Response.json(data, { status });

export async function POST(request: Request) {
  let config: BrevoConfig;
  try {
    config = loadBrevoConfig();
  } catch (err) {
    console.error(`[quikku] Configuration error: ${err instanceof Error ? err.message : err}`);
    return json({ success: false, error: "Server not configured" }, 500);
  }

  let email = "";
  try {
    const body = await request.json();
    if (body && typeof body.email === "string") email = body.email.trim();
  } catch {
    // Not JSON: falls through to the validation error below
  }
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return json({ success: false, error: "Invalid email address" }, 400);
  }

  try {
    const contact = await addContact(config, email);

    if (contact.ok) {
      // A failed notification is logged by sendNotification and must not fail the signup
      await sendNotification(config, "New Waitlist Subscription - Quikku", successEmail(email));
      return json({ success: true, message: "Successfully subscribed to the waitlist" });
    }

    // With a rejected API key the alert email would be rejected too; the log has the details
    if (contact.status !== 401) {
      await sendNotification(config, "Failed Waitlist Subscription - Quikku", failureEmail(email, describeBrevoError(contact)));
    }
    return json({ success: false, error: "Failed to subscribe. Please try again later." }, 500);
  } catch (err) {
    console.error(`[quikku] Subscribe error: ${err instanceof Error ? err.message : err}`);
    return json({ success: false, error: "An error occurred. Please try again later." }, 500);
  }
}
