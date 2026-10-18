import { beforeEach, describe, expect, test, vi } from "vitest";
import { getPayload } from "payload";

import { initialWaitlistState, joinWaitlist } from "@/app/waitlist/actions";

vi.mock("payload", async (importOriginal) => {
  const actual = await importOriginal<typeof import("payload")>();
  return { ...actual, getPayload: vi.fn() };
});

const create = vi.fn();
const find = vi.fn();

function signup(overrides: Record<string, string> = {}) {
  const form = new FormData();
  const fields = {
    email: "ana@example.com",
    name: "Ana Reyes",
    organization: "Reyes Legal",
    audience: "business",
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) form.set(key, value);
  return form;
}

describe("joinWaitlist", () => {
  beforeEach(() => {
    create.mockReset().mockResolvedValue({ id: 1 });
    find.mockReset().mockResolvedValue({ totalDocs: 0, docs: [] });
    vi.mocked(getPayload).mockResolvedValue({ create, find } as never);
  });

  test("validates email before querying the database", async () => {
    const state = await joinWaitlist(
      initialWaitlistState,
      signup({ email: "not-an-email" }),
    );
    expect(state.status).toBe("error");
    expect(find).not.toHaveBeenCalled();
  });

  test("stores a new signup", async () => {
    await expect(joinWaitlist(initialWaitlistState, signup())).resolves.toEqual({
      status: "success",
    });
    expect(create).toHaveBeenCalledWith({
      collection: "waitlist",
      data: expect.objectContaining({
        email: "ana@example.com",
        audience: "business",
        status: "new",
        source: "website",
      }),
    });
  });

  test("treats an existing signup as success without duplicating it", async () => {
    find.mockResolvedValue({ totalDocs: 1, docs: [{ id: 1 }] });
    await expect(joinWaitlist(initialWaitlistState, signup())).resolves.toEqual({
      status: "success",
    });
    expect(create).not.toHaveBeenCalled();
  });
});
