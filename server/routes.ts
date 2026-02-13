import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        const validationError = fromError(parsed.error);
        return res.status(400).json({ message: validationError.toString() });
      }

      const submission = await storage.createContactSubmission(parsed.data);
      return res.status(201).json({ message: "Message received", id: submission.id });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  return httpServer;
}
