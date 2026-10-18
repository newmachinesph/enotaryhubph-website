"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Motion primitives.
 *
 * Both are built on IntersectionObserver rather than a scroll library: the
 * effects are one-shot and state-based, so an animation runtime would cost
 * bundle weight for nothing.
 *
 * The scroll-triggered fade-up is deliberately absent. It is the clearest tell
 * of a templated page; this site reveals content with a shutter (`.wipe-in`).
 */

function useEnteredOnce<T extends HTMLElement>(rootMargin = "-12% 0px") {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No availability guard here on purpose. The hidden state is applied by
    // CSS only under `@media (scripting: enabled)`, so a browser that cannot
    // run this effect never hides the content in the first place. That keeps
    // content out of the "invisible until an effect runs" trap without a
    // synchronous setState.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, entered };
}

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds, for sibling reveals. */
  delay?: number;
  className?: string;
  /**
   * Element to render.
   *
   * A wrapper is not free: a `<div>` between `<ol>` and `<li>`, or between
   * `<dl>` and `<dt>`, destroys the list semantics screen readers rely on. Set
   * this to the element the parent actually expects.
   */
  as?: "div" | "li";
}

/** Reveals its children with the mullion wipe, once, on first intersection. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const { ref, entered } = useEnteredOnce<HTMLElement>();

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`${entered ? "wipe-in" : "reveal-armed"} ${className ?? ""}`}
      style={entered ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

interface ProcessLanternProps {
  steps: { title: string; body: string }[];
  states: string[];
}

/**
 * The process lantern.
 *
 * Four capiz panels. Light passes through each in turn as it scrolls into
 * view, so the metaphor the site rests on resolves literally: the document
 * moves through four guarded moments, and you watch each one light.
 */
export function ProcessLantern({ steps, states }: ProcessLanternProps) {
  return (
    <ol className="grid gap-px sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, i) => (
        <LanternPanel
          key={step.title}
          index={i}
          state={states[i] ?? ""}
          title={step.title}
          body={step.body}
        />
      ))}
    </ol>
  );
}

function LanternPanel({
  index,
  state,
  title,
  body,
}: {
  index: number;
  state: string;
  title: string;
  body: string;
}) {
  const { ref, entered } = useEnteredOnce<HTMLLIElement>("-20% 0px");

  return (
    <li
      ref={ref}
      className={`capiz-panel gather flex min-h-[16rem] flex-col justify-between p-7 ${
        entered ? "capiz-panel--lit" : ""
      }`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono-label text-sun-ink">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono-label text-narra-3">{state}</span>
      </div>

      <div className="mt-10">
        <h3 className="font-display smallcaps text-[1.55rem] leading-tight">
          {title}
        </h3>
        <p className="text-narra-2 text-small mt-3">{body}</p>
      </div>
    </li>
  );
}
