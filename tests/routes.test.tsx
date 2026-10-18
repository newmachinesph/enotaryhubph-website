import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, test } from "vitest";

import BusinessPage from "@/app/(frontend)/business/page";
import ContactPage from "@/app/(frontend)/contact/page";
import HomePage from "@/app/(frontend)/page";
import HowItWorksPage from "@/app/(frontend)/how-it-works/page";
import NotariesPage from "@/app/(frontend)/notaries/page";
import WaitlistPage from "@/app/(frontend)/waitlist/page";
import { en } from "@/content/en";

/**
 * Route smoke and accessibility.
 *
 * Pages render without the root layout, so nav, footer, and the rail are out of
 * scope here — these assertions cover page content only. The reveal observer is
 * stubbed to never fire (see tests/setup.ts), so every assertion below runs
 * against content in its pre-animation state.
 */

const ROUTES = [
  ["/", HomePage, en.home.introTitle],
  ["/how-it-works", HowItWorksPage, en.how.title],
  ["/business", BusinessPage, en.business.title],
  ["/notaries", NotariesPage, en.notaries.title],
  ["/contact", ContactPage, en.contact.title],
  ["/waitlist", WaitlistPage, "One useful email when there is news."],
] as const;

describe("routes", () => {
  test.each(ROUTES)("%s renders its heading", (_path, Page, heading) => {
    render(<Page />);
    expect(screen.getByText(heading)).toBeInTheDocument();
  });

  test.each(ROUTES)(
    "%s has no axe violations",
    async (_path, Page) => {
      const { container } = render(<Page />);
      const results = await axe.run(container, {
        // Landmark and page-level rules need the root layout to be meaningful.
        runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
      });

      expect(
        results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s)`),
      ).toEqual([]);
    },
    20000,
  );

  test("home states the launch status and leads with the slogan", () => {
    render(<HomePage />);
    expect(screen.getByText(en.home.launchStatus)).toBeInTheDocument();
    expect(screen.getByText("Legally Sealed.")).toBeInTheDocument();
  });

  test("contact warns that requests are not accepted", () => {
    render(<ContactPage />);
    expect(screen.getByText(en.contact.note)).toBeInTheDocument();
  });
});
