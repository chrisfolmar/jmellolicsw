import { type InsertContact, type ContactSubmission, contactSubmissions } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const [result] = await db.insert(contactSubmissions).values(data).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
