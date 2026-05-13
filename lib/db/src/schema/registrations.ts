import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const registrationsTable = pgTable("registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  source: text("source").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  webhookStatus: text("webhook_status").notNull().default("pending"),
  webhookResponse: jsonb("webhook_response"),
  webhookAttemptedAt: timestamp("webhook_attempted_at", {
    withTimezone: true,
  }),
});

export const insertRegistrationSchema = createInsertSchema(
  registrationsTable,
).pick({
  name: true,
  email: true,
  source: true,
});

export const registrationInputSchema = z.object({
  name: z.string().trim().min(1, "Skriv ditt förnamn."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Skriv en giltig e-postadress."),
  source: z.enum(["webinar", "sales"]),
});

export type RegistrationInput = z.infer<typeof registrationInputSchema>;
export type Registration = typeof registrationsTable.$inferSelect;
