"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { waitlistSchema } from "@/lib/validation";

export interface WaitlistState {
  status: "idle" | "success" | "error";
  message?: string;
}

export const initialWaitlistState: WaitlistState = { status: "idle" };

export async function joinWaitlist(
  _previous: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const parsed = waitlistSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message };

  const { email, name, organization, audience, website } = parsed.data;

  if (website) return { status: "success" };

  try {
    const payload = await getPayload({ config });
    const existing = await payload.find({
      collection: "waitlist",
      where: { email: { equals: email } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "waitlist",
        data: {
          email,
          name: name || undefined,
          organization: organization || undefined,
          audience,
          status: "new",
          source: "website",
        },
      });
    }

    return { status: "success" };
  } catch (error) {
    console.error(
      "[waitlist] database write failed",
      error instanceof Error ? error.message : "Unknown database error",
    );
    return {
      status: "error",
      message: "We couldn't save that yet. Please try again in a moment.",
    };
  }
}
