import Link from "next/link";
import type { ReactNode } from "react";

import type { AppRoute } from "@/content";

/**
 * Shared UI primitives.
 *
 * Hand-built rather than pulled from a component library. A kit would bring
 * its own radii, shadows, and spacing logic, and the template look this
 * rebuild exists to escape would come back through the side door.
 */

interface ButtonLinkProps {
  href: AppRoute;
  children: ReactNode;
  /** Surface-aware treatments keep the action legible in every context. */
  tone?: "solid" | "quiet" | "dark";
}

export function ButtonLink({ href, children, tone = "solid" }: ButtonLinkProps) {
  const styles = {
    solid: "bg-narra text-pearl hover:bg-sun-ink px-6 py-3",
    quiet: "border-sun-ink text-sun-ink hover:text-narra border-b pb-1",
    dark: "border-sun text-vellum hover:bg-sun hover:text-night border px-6 py-3",
  }[tone];

  return (
    <Link href={href} className={`gather inline-block text-[0.95rem] ${styles}`}>
      {children}
    </Link>
  );
}

interface SectionHeadProps {
  kicker: string;
  title: string;
  intro?: string;
}

/**
 * Section header.
 *
 * The clause coordinate and kicker sit in a narrow left column on wide
 * screens, echoing the marginalia rail, so headings read as annotated document
 * sections rather than centred marketing banners.
 */
export function SectionHead({ kicker, title, intro }: SectionHeadProps) {
  return (
    <header className="grid gap-6 lg:grid-cols-[10rem_1fr] lg:gap-12">
      <div className="flex flex-col gap-1 pt-2">
        <span className="font-mono-label text-sun-ink">{kicker}</span>
      </div>

      <div>
        <h2 className="font-display text-[length:var(--text-title)]">{title}</h2>
        {intro ? (
          <p className="text-narra-2 measure-wide mt-5 text-[length:var(--text-lead)]">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}

/**
 * Disclosure built on native details/summary.
 *
 * Keyboard behaviour, screen-reader semantics, and find-in-page all work
 * without a line of JavaScript.
 */
export function Disclosure({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="border-mullion-soft group border-b">
      <summary className="gather hover:text-sun-ink flex cursor-pointer items-center justify-between gap-6 py-5 pr-5 text-[1.08rem] marker:content-none">
        {question}
        <span
          aria-hidden="true"
          className="text-sun-ink shrink-0 transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      {/* Runs the width of its own row rather than stopping at `measure`,
          which left the answer ending halfway under its question. Capped for
          readability so the line never outruns the eye. */}
      <p className="text-narra-2 max-w-[80ch] pr-5 pb-6">{answer}</p>
    </details>
  );
}

/** A hairline section divider carrying the mullion treatment. */
export function Rule() {
  return <hr className="mullion-rule my-20 lg:my-28" />;
}

/** Standard page section wrapper: max width, gutters, vertical rhythm. */
export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`mx-auto max-w-[104rem] px-[max(1.5rem,4vw)] xl:pl-[calc(var(--rail-width)+2rem)] ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
