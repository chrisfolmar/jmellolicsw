import type { Express } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendAdminNotification, sendClientAutoReply } from "./email";

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many messages sent. Please try again later." },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        const validationError = fromError(parsed.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const submission = await storage.createContactSubmission(parsed.data);

      const [adminResult, replyResult] = await Promise.allSettled([
        sendAdminNotification(parsed.data, submission.id),
        sendClientAutoReply(parsed.data, submission.id),
      ]);
      if (adminResult.status === "rejected") {
        console.error(`Admin notification failed for submission #${submission.id}:`, adminResult.reason instanceof Error ? adminResult.reason.message : adminResult.reason);
      }
      if (replyResult.status === "rejected") {
        console.error(`Auto-reply failed for submission #${submission.id}:`, replyResult.reason instanceof Error ? replyResult.reason.message : replyResult.reason);
      }

      return res.status(201).json({ message: "Message received", id: submission.id });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  return httpServer;
}
