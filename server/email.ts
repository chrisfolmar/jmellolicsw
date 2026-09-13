import { Resend } from "resend";
import { log } from "./index";

const ADMIN_EMAIL = "jmellolicsw@gmail.com";
const FROM_ADDRESS = "Jennifer Mello LICSW <contact@jmellolicsw.com>";

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

/**
 * Returns a sanitized error category string from any thrown value or a Resend
 * error object — never includes message text that might contain PII.
 */
function errorCategory(err: unknown): string {
  if (err instanceof Error) return err.name || "Error";
  if (typeof err === "object" && err !== null && "name" in err) {
    return String((err as { name: unknown }).name) || "provider_error";
  }
  return "unknown_error";
}

export async function sendAdminNotification(
  submission: {
    name: string;
    email: string;
    phone?: string | null;
    message: string;
  },
  submissionId: string
): Promise<void> {
  const client = getClient();
  if (!client) {
    log("RESEND_API_KEY not set — skipping admin notification email", "email");
    return;
  }

  const phone = submission.phone ? submission.phone : "Not provided";
  let failureCategory: string | null = null;

  try {
    const { error } = await client.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Message from ${submission.name}`,
      text: [
        `You have a new message from your website contact form.`,
        ``,
        `Name:    ${submission.name}`,
        `Email:   ${submission.email}`,
        `Phone:   ${phone}`,
        ``,
        `Message:`,
        `${submission.message}`,
        ``,
        `---`,
        `Reply directly to this email to respond to ${submission.name}.`,
        `This message was submitted through jmellolicsw.com.`,
      ].join("\n"),
      replyTo: submission.email,
    });
    if (error) {
      failureCategory = errorCategory(error);
    }
  } catch (transportErr) {
    failureCategory = errorCategory(transportErr);
  }

  if (failureCategory) {
    log(`Admin notification failed for submission ${submissionId}: ${failureCategory}`, "email");
    throw new Error(failureCategory);
  }

  log(`Admin notification sent (submission ${submissionId})`, "email");
}

export async function sendClientAutoReply(
  submission: {
    name: string;
    email: string;
  },
  submissionId: string
): Promise<void> {
  const client = getClient();
  if (!client) {
    log("RESEND_API_KEY not set — skipping client auto-reply email", "email");
    return;
  }

  const firstName = submission.name.split(" ")[0];
  let failureCategory: string | null = null;

  try {
    const { error } = await client.emails.send({
      from: FROM_ADDRESS,
      to: submission.email,
      subject: `Thank you for reaching out, ${firstName}`,
      text: [
        `Hi ${firstName},`,
        ``,
        `Thank you for taking the time to reach out. I received your message and will be in touch within 2 business days.`,
        ``,
        `If you have an urgent need or would prefer to connect by phone, you can reach me at (508) 591-0569.`,
        ``,
        `I look forward to speaking with you.`,
        ``,
        `Warmly,`,
        `Jennifer Mello, LICSW`,
        `Certified Trauma Therapist`,
        `225 Water Street, Suite B239`,
        `Plymouth, MA 02360`,
        `(508) 591-0569`,
        `jmellolicsw.com`,
        ``,
        `---`,
        `Please note: This is an automated confirmation that your message was received.`,
        `Replying to this email is not a secure or monitored channel.`,
        `If you are a current client, please use your secure client portal for clinical communications.`,
      ].join("\n"),
    });
    if (error) {
      failureCategory = errorCategory(error);
    }
  } catch (transportErr) {
    failureCategory = errorCategory(transportErr);
  }

  if (failureCategory) {
    log(`Auto-reply failed for submission ${submissionId}: ${failureCategory}`, "email");
    throw new Error(failureCategory);
  }

  log(`Auto-reply sent (submission ${submissionId})`, "email");
}
