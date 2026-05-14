import {
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const registrationsTable = pgTable(
  "registrations",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    phoneE164: text("phone_e164"),
    country: text("country"),
    source: text("source").notNull(),
    eventId: text("event_id"),
    attribution: jsonb("attribution"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    webhookStatus: text("webhook_status").notNull().default("pending"),
    webhookResponse: jsonb("webhook_response"),
    webhookAttemptedAt: timestamp("webhook_attempted_at", {
      withTimezone: true,
    }),
    capiStatus: text("capi_status").notNull().default("pending"),
    capiResponse: jsonb("capi_response"),
  },
  (t) => [
    index("registrations_dedupe_idx").on(
      sql`lower(${t.email})`,
      t.source,
      t.createdAt,
    ),
  ],
);

export const insertRegistrationSchema = createInsertSchema(
  registrationsTable,
).pick({
  name: true,
  email: true,
  phone: true,
  source: true,
});

export const registrationInputSchema = z.object({
  name: z.string().trim().min(1, "Skriv ditt förnamn."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Skriv en giltig e-postadress."),
  phone: z
    .string()
    .trim()
    .min(6, "Skriv ditt telefonnummer.")
    .max(32, "Telefonnumret är för långt."),
  source: z.enum(["webinar", "sales"]),
  event_id: z.string().trim().min(1).max(80).optional(),
  fbclid: z.string().trim().max(512).optional(),
  fbp: z.string().trim().max(256).optional(),
  fbc: z.string().trim().max(512).optional(),
  utm_source: z.string().trim().max(128).optional(),
  utm_medium: z.string().trim().max(128).optional(),
  utm_campaign: z.string().trim().max(256).optional(),
  utm_content: z.string().trim().max(256).optional(),
  utm_term: z.string().trim().max(256).optional(),
  landing_url: z.string().trim().max(2048).optional(),
  referrer: z.string().trim().max(2048).optional(),
});

export type RegistrationInput = z.infer<typeof registrationInputSchema>;
export type Registration = typeof registrationsTable.$inferSelect;
