import { en } from "./en";
import { fil } from "./fil";
import type { Locale, PageName, SiteCopy } from "./types";

export * from "./types";

export const dictionaries: Record<Locale, SiteCopy> = { en, fil };

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Locales actually routed today.
 *
 * Filipino copy is complete and type-checked, but not yet served. Shipping it
 * is this array plus a `[locale]` route segment — deliberately kept to one
 * decision rather than scattered through components.
 */
export const SHIPPED_LOCALES: readonly Locale[] = ["en"];

export function getCopy(locale: Locale = DEFAULT_LOCALE): SiteCopy {
  return dictionaries[locale];
}

/**
 * Route table. Declared `as const` so each value is a string literal, which is
 * what Next's typed routes need in order to accept it as a `Link` href.
 */
export const routes = {
  home: "/",
  how: "/how-it-works",
  business: "/business",
  notaries: "/notaries",
  articles: "/articles",
  waitlist: "/waitlist",
  contact: "/contact",
} as const satisfies Record<PageName, string>;

export type AppRoute = (typeof routes)[PageName];

/** Ordered for navigation. Home is reached via the logo, so it is not listed. */
export const NAV_PAGES = [
  "how",
  "business",
  "notaries",
  "articles",
  "contact",
] as const;

export function hrefFor(page: PageName): AppRoute {
  return routes[page];
}
