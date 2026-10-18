import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "This field is required.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
  org: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(1, "This field is required.").max(4000),
  website: z.string().max(200).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;

export const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter an email address we can reach.").max(254),
  name: z.string().trim().max(120).optional().default(""),
  organization: z.string().trim().max(160).optional().default(""),
  audience: z.enum(["individual", "business", "notary", "other"]),
  website: z.string().max(200).optional().default(""),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;

