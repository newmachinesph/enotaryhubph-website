import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { getPayload } from "payload";

import { initialInquiryState, submitInquiry } from "@/app/contact/actions";

vi.mock("payload", async (importOriginal) => {
  const actual = await importOriginal<typeof import("payload")>();
  return { ...actual, getPayload: vi.fn() };
});

const create = vi.fn();

function inquiry(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const fields = {
    name: "Juan dela Cruz",
    email: "juan@example.com",
    org: "Acme Legal",
    message: "We coordinate recurring corporate documents.",
    ...overrides,
  };

  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

describe("submitInquiry", () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({ id: 1 });
    vi.mocked(getPayload).mockResolvedValue({ create } as never);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test("rejects invalid fields before delivery", async () => {
    const state = await submitInquiry(
      initialInquiryState,
      inquiry({ name: "", email: "invalid", message: "" }),
    );

    expect(state.status).toBe("error");
    expect(state.errors).toEqual({
      name: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
    });
    expect(create).not.toHaveBeenCalled();
  });

  test("stores normalized inquiry data", async () => {
    const state = await submitInquiry(initialInquiryState, inquiry());

    expect(state).toEqual({ status: "success" });
    expect(create).toHaveBeenCalledWith({
      collection: "contact-submissions",
      data: {
          name: "Juan dela Cruz",
          email: "juan@example.com",
          organization: "Acme Legal",
          message: "We coordinate recurring corporate documents.",
          status: "new",
      },
    });
  });

  test("does not report success when the database write fails", async () => {
    create.mockRejectedValue(new Error("database unavailable"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(submitInquiry(initialInquiryState, inquiry())).resolves.toEqual({
      status: "error",
    });
  });

  test("silently accepts honeypot submissions without delivery", async () => {
    const state = await submitInquiry(
      initialInquiryState,
      inquiry({ website: "https://spam.example" }),
    );

    expect(state).toEqual({ status: "success" });
    expect(create).not.toHaveBeenCalled();
  });
});
