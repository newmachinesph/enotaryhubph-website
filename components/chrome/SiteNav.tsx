"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Wordmark } from "./Wordmark";
import { NAV_PAGES, getCopy, hrefFor, routes } from "@/content";

/**
 * Site navigation.
 *
 * Two visual states, because the home hero is a dark photograph and every
 * other page opens on pearl. Over the hero the bar is transparent with vellum
 * type; once scrolled past it, or on any inner page, it becomes a pearl bar
 * with a hairline. The switch is driven by scroll position rather than by a
 * prop, so no page has to know about it.
 */

const HERO_HANDOFF_PX = 120;

export function SiteNav() {
  const pathname = usePathname();
  const copy = getCopy();
  const isHome = pathname === routes.home;

  const [scrolled, setScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HERO_HANDOFF_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A native <dialog> gives focus trapping and Escape handling for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (commandOpen && !dialog.open) dialog.showModal();
    if (!commandOpen && dialog.open) dialog.close();

    const previousOverflow = document.body.style.overflow;
    if (commandOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [commandOpen]);

  const closeCommand = useCallback(() => setCommandOpen(false), []);

  const onNight = isHome && !scrolled;

  return (
    <>
      <header
        // No bottom rule in either state. The hairline read as a hard line
        // drawn under the bar; the scrim over the hero and the blurred pearl
        // wash elsewhere already separate the nav from what it sits on.
        className={`gather fixed inset-x-0 top-0 z-40 ${
          onNight
            ? // The hero photograph is brightest exactly where the links sit, so
              // vellum type alone loses against it. A scrim that fades to
              // nothing gives every link the same dark ground without boxing
              // each word, which would read as chrome stacked on chrome.
              "text-vellum bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--color-night)_86%,transparent)_0%,color-mix(in_oklab,var(--color-night)_52%,transparent)_62%,transparent_100%)]"
            : "text-narra bg-[color-mix(in_oklab,var(--color-pearl)_88%,transparent)] backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[104rem] items-center justify-between px-[max(1.5rem,4vw)]"
        >
          <Link
            href={routes.home}
            className="gather hover:text-sun inline-flex items-center"
          >
            <Wordmark />
            <span className="sr-only">eNotaryHub home</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_PAGES.map((page) => {
              const href = hrefFor(page);
              const active = pathname === href;
              const isPrimary = page === "contact";
              return (
                <Link
                  key={page}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`gather text-small relative ${
                    isPrimary
                      ? "bg-sun text-night hover:bg-vellum px-5 py-2.5 font-medium opacity-100"
                      : `py-1 ${active
                      ? onNight
                        ? "text-sun"
                        : "text-sun-ink"
                      : onNight
                        ? // Full strength over the hero. Dimmed type was the
                          // other half of why these were hard to read.
                          "hover:text-sun"
                        : "opacity-70 hover:opacity-100"}`
                  }`}
                >
                  {copy.nav[page]}
                  {active && !isPrimary ? (
                    <span className="bg-sun absolute -bottom-0.5 left-0 h-px w-full" />
                  ) : null}
                </Link>
              );
            })}
          </div>

          {/* Below md the command dialog is the entire menu. */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-expanded={commandOpen}
            aria-controls="mobile-navigation"
            className={`gather font-mono-label flex min-h-11 items-center gap-2 border px-4 py-2 whitespace-nowrap md:hidden ${
              onNight
                ? "border-vellum-2/50 text-vellum hover:border-sun hover:text-sun"
                : "border-mullion text-narra hover:border-sun-ink hover:text-sun-ink"
            }`}
          >
            <span aria-hidden="true" className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
            {copy.common.openMenu}
          </button>
        </nav>
      </header>

      <dialog
        id="mobile-navigation"
        ref={dialogRef}
        onClose={closeCommand}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeCommand();
        }}
        aria-label={copy.common.commandTitle}
        // Full screen rather than a bottom sheet. As a sheet it opened over a
        // still-visible page and the taller menus scrolled inside a short box;
        // taking the whole viewport gives the list room and removes the
        // half-covered page behind it.
        // No unconditional `flex` here. A closed <dialog> is hidden by the UA
        // stylesheet's `display: none`, and any display utility overrides it —
        // the menu then stays painted over the page after it is dismissed.
        // `open:` scopes the flex layout to the open state, so the closed
        // dialog keeps its `display: none`.
        className="bg-pearl text-narra fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto border-0 p-0 open:flex open:flex-col backdrop:bg-[color-mix(in_oklab,var(--color-night)_72%,transparent)] md:hidden"
      >
        <div className="border-mullion-soft flex min-h-16 items-center justify-between border-b px-6 py-3">
          <div>
            <Wordmark />
            <p className="font-mono-label text-narra-3 mt-1">
              {copy.common.commandTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCommand}
            className="font-mono-label hover:border-sun-ink hover:text-sun-ink gather min-h-11 border border-transparent px-3 whitespace-nowrap"
          >
            {copy.common.closeMenu}
          </button>
        </div>
        <ul className="grid gap-1 px-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {NAV_PAGES.map((page) => {
            const href = hrefFor(page);
            const active = pathname === href;
            const isPrimary = page === "contact";
            return (
            <li key={page}>
              <Link
                href={href}
                onClick={closeCommand}
                aria-current={active ? "page" : undefined}
                className={`gather flex min-h-14 items-center justify-between px-4 py-3 text-[1rem] whitespace-nowrap ${
                  isPrimary
                    ? "bg-sun text-night hover:bg-narra hover:text-pearl mt-2 font-medium"
                    : active
                      ? "bg-sun-wash text-sun-ink"
                      : "hover:bg-pearl-deep hover:text-sun-ink"
                }`}
              >
                {copy.nav[page]}
                <span aria-hidden="true">{isPrimary ? "→" : ""}</span>
              </Link>
            </li>
          )})}
        </ul>
      </dialog>
    </>
  );
}
