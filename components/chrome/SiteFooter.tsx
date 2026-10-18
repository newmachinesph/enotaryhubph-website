import Link from "next/link";

import { Wordmark } from "./Wordmark";
import { NAV_PAGES, getCopy, hrefFor } from "@/content";

/**
 * Site footer.
 *
 * Carries the two pieces of text that are non-negotiable on every page: the
 * "information only" line, and the compliance statement covering availability,
 * document eligibility, and the notary's assessment.
 *
 * Set on night, so the site closes on the same dark ground it opens on.
 */
export function SiteFooter() {
  const copy = getCopy();
  const year = 2026;

  return (
    <footer className="bloom bloom--night bg-night text-vellum relative z-10 mt-20 sm:mt-32">
      <div className="mx-auto max-w-[104rem] px-[max(1.5rem,4vw)] py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Wide enough to keep the statement on one line at its display
              size; wrapping it broke the phrase mid-thought. */}
          <div className="max-w-xl">
            <Wordmark className="text-vellum" />
            <p className="font-display mt-6 text-[1.6rem] leading-tight">
              {copy.common.footerStatement}
            </p>
            <p className="text-vellum-2 text-small mt-4">
              {copy.common.launchNote}
            </p>
            <a
              href="mailto:hello@enotaryhub.ph"
              className="gather text-sun hover:text-vellum mt-5 inline-block text-small underline underline-offset-4"
            >
              hello@enotaryhub.ph
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {NAV_PAGES.map((page) => (
              <Link
                key={page}
                href={hrefFor(page)}
                className="gather text-vellum-2 hover:text-sun text-small"
              >
                {copy.nav[page]}
              </Link>
            ))}
          </nav>
        </div>

        <hr
          className="my-12 border-0"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, color-mix(in oklab, var(--color-vellum-2) 34%, transparent), transparent)",
          }}
        />

        <div className="text-vellum-2 flex flex-col gap-6 text-[0.83rem] leading-relaxed">
          <p className="max-w-3xl">{copy.common.compliance}</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono-label text-sun">
              {copy.common.informationOnly}
            </span>
            <span className="font-mono-label">
              © {year} eNotaryHub · {copy.common.official}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
