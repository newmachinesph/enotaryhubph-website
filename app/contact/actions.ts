"use server";

import config from "@payload-config";
import { getPayload } from "payload";

import { getCopy } from "@/content";
import { contactSchema } from "@/lib/validation";

/**
 * Inquiry submission.
 *
 * Inputs are bounded and validated before Payload writes the record to
 * Postgres. Public REST access to the collection remains closed; this server
 * action is the only unauthenticated write path.
 *
 * Nothing here accepts a notarization request. The site is pre-launch, and the
 * contact page says so on the page itself.
 */

export interface InquiryState {
  status: "idle" | "success" | "error";
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

const MAX_LENGTH = {
  name: 120,
  email: 254,
  org: 160,
  message: 4000,
} as const;

function value(formData: FormData, key: string, maxLength: number) {
  return String(formData.get(key) ?? "").trim().slice(0, maxLength + 1);
}

export const initialInquiryState: InquiryState = { status: "idle" };

export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const copy = getCopy();

  const raw = {
    name: value(formData, "name", MAX_LENGTH.name),
    email: value(formData, "email", MAX_LENGTH.email),
    org: value(formData, "org", MAX_LENGTH.org),
    message: value(formData, "message", MAX_LENGTH.message),
    website: value(formData, "website", 200),
  };

  const errors: NonNullable<InquiryState["errors"]> = {};

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "message") {
        errors[field] = field === "email" ? copy.contact.errorEmail : copy.contact.errorRequired;
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const { name, email, org, message, website } = parsed.data!;

  // A hidden field catches basic form bots. Return the same response as a real
  // submission so the endpoint does not teach a bot how to bypass the trap.
  if (website) return { status: "success" };

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "contact-submissions",
      data: {
        name,
        email,
        organization: org || undefined,
        message,
        status: "new",
      },
    });
  } catch (error) {
    console.error(
      "[inquiry] database write failed",
      error instanceof Error ? error.message : "Unknown database error",
    );
    return { status: "error" };
  }

  return { status: "success" };
}
