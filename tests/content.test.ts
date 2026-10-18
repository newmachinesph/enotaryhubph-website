import { describe, expect, test } from "vitest";

import { en } from "@/content/en";
import { fil } from "@/content/fil";
import { SLOGAN } from "@/content/types";

/**
 * Content dictionary integrity.
 *
 * The compiler already guarantees that `fil` satisfies the `SiteCopy` shape.
 * What it cannot catch is a key that is present but empty, or an array that has
 * drifted out of step between locales — both of which render as a silently
 * broken page rather than a build failure.
 */

type Json = string | Json[] | { [key: string]: Json };

function pathsOf(value: Json, prefix = ""): string[] {
  if (typeof value === "string") return [prefix];
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => pathsOf(item, `${prefix}[${i}]`));
  }
  return Object.entries(value).flatMap(([key, child]) =>
    pathsOf(child, prefix ? `${prefix}.${key}` : key),
  );
}

function stringsOf(value: Json): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path: "", text: value }];
  if (Array.isArray(value)) {
    return value.flatMap((item, i) =>
      stringsOf(item).map((s) => ({ ...s, path: `[${i}]${s.path}` })),
    );
  }
  return Object.entries(value).flatMap(([key, child]) =>
    stringsOf(child).map((s) => ({ ...s, path: `${key}${s.path}` })),
  );
}

describe("content dictionaries", () => {
  test("filipino covers every key path present in english", () => {
    expect(pathsOf(fil as unknown as Json)).toEqual(
      pathsOf(en as unknown as Json),
    );
  });

  test.each([
    ["en", en],
    ["fil", fil],
  ])("%s contains no empty strings", (_name, dictionary) => {
    const blanks = stringsOf(dictionary as unknown as Json).filter(
      (entry) => entry.text.trim().length === 0,
    );
    expect(blanks).toEqual([]);
  });

  test("the launch disclaimer survives in both locales", () => {
    // The site is pre-launch. If this text is ever edited away, the pages stop
    // telling people that requests are not being accepted.
    expect(en.contact.note.toLowerCase()).toContain("cannot accept");
    expect(fil.contact.note.toLowerCase()).toContain("hindi pa");
    expect(en.common.informationOnly).toContain("Not legal advice");
  });

  test("the slogan is three beats and matches its joined form", () => {
    expect(SLOGAN.beats).toHaveLength(3);
    expect(SLOGAN.beats.join(" ")).toBe(SLOGAN.full);
    expect(SLOGAN.full).toBe(
      "Trusted Signatures. Legally Sealed. Instantly Done.",
    );
  });
});
