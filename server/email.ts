import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { log } from "./index";

const ADMIN_EMAIL = "jmellolicsw@gmail.com";
const PRACTICE_NAME = "Jennifer Mello, LICSW";

function getClient(): SESClient | null {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    log("AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY not set — skipping email", "email");
    return null;
  }

  return new SESClient({
    region: process.env.AWS_REGION ?? "us-east-1",
    credentials: { accessKeyId, secretAccessKey },
  });
}

function getFromAddress(): string {
  // Must be a verified email or domain in your AWS SES account.
  return process.env.AWS_SES_FROM_ADDRESS ?? ADMIN_EMAIL;
}

export async function sendAdminNotification(submission: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}): Promise<void> {
  const client = getClient();
  if (!client) return;

  const phone = submission.phone ?? "Not provided";

  const body = [
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
  ].join("\n");

  try {
    await client.send(
      new SendEmailCommand({
        Source: getFromAddress(),
        Destination: { ToAddresses: [ADMIN_EMAIL] },
        ReplyToAddresses: [submission.email],
        Message: {
          Subject: { Data: `New Contact Form Message from ${submission.name}`, Charset: "UTF-8" },
          Body: { Text: { Data: body, Charset: "UTF-8" } },
        },
      })
    );
    log(`Admin notification sent for submission from ${submission.email}`, "email");
  } catch (err) {
    log(`Failed to send admin notification: ${err}`, "email");
  }
}

export async function sendClientAutoReply(submission: {
  name: string;
  email: string;
}): Promise<void> {
  const client = getClient();
  if (!client) return;

  const firstName = submission.name.split(" ")[0];

  const body = [
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
  ].join("\n");

  try {
    await client.send(
      new SendEmailCommand({
        Source: getFromAddress(),
        Destination: { ToAddresses: [submission.email] },
        Message: {
          Subject: { Data: `Thank you for reaching out, ${firstName}`, Charset: "UTF-8" },
          Body: { Text: { Data: body, Charset: "UTF-8" } },
        },
      })
    );
    log(`Auto-reply sent to ${submission.email}`, "email");
  } catch (err) {
    log(`Failed to send auto-reply to ${submission.email}: ${err}`, "email");
  }
}
