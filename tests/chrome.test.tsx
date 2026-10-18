import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteNav } from "@/components/chrome/SiteNav";
import { NAV_PAGES } from "@/content";
import { en } from "@/content/en";

vi.mock("next/navigation", () => ({ usePathname: () => "/business" }));

describe("shared chrome", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    });
  });

  test("exposes every primary destination and the current page", () => {
    render(<SiteNav />);

    for (const page of NAV_PAGES) {
      expect(screen.getAllByRole("link", { name: en.nav[page] }).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole("link", { name: en.nav.business })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("shared navigation and footer have no axe violations", async () => {
    const { container } = render(
      <>
        <SiteNav />
        <main id="main"><h1>Page title</h1></main>
        <SiteFooter />
      </>,
    );

    const results = await axe.run(container, {
      runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
    });
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  }, 20000);
});
