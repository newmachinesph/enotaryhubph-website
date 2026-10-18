import { render } from "@testing-library/react";
import { getPayload } from "payload";
import { beforeEach, describe, expect, test, vi } from "vitest";

import sitemap from "@/app/sitemap";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/content";

vi.mock("payload", async (importOriginal) => {
  const actual = await importOriginal<typeof import("payload")>();
  return { ...actual, getPayload: vi.fn() };
});

beforeEach(() => {
  vi.mocked(getPayload).mockResolvedValue({
    find: vi.fn().mockResolvedValue({ docs: [] }),
  } as never);
});

function schema(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  return JSON.parse(script?.textContent ?? "null") as Record<string, unknown>;
}

describe("search metadata", () => {
  test("serializes valid JSON-LD and escapes markup", () => {
    const { container } = render(
      <JsonLd data={{ "@type": "Thing", name: "</script><script>bad()</script>" }} />,
    );

    const script = container.querySelector("script");
    expect(script?.innerHTML).not.toContain("</script><script>");
    expect(schema(container)).toMatchObject({ "@type": "Thing" });
  });

  test("emits an absolute two-level breadcrumb", () => {
    const { container } = render(
      <BreadcrumbJsonLd name="For business" path="/business" />,
    );
    const data = schema(container);

    expect(data).toMatchObject({ "@type": "BreadcrumbList" });
    expect(JSON.stringify(data)).toContain("https://enotaryhub.ph/business");
  });

  test("sitemap covers every public content route", async () => {
    const entries = await sitemap();
    expect(entries.map((entry) => new URL(entry.url).pathname).sort()).toEqual(
      Object.values(routes).sort(),
    );
  });
});
