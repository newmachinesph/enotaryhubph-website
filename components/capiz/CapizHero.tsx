"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { SLOGAN, getCopy, hrefFor } from "@/content";

/**
 * The capiz hero.
 *
 * The photograph is the subject: layered translucent sheets with light passing
 * through them, and a gold rayed seal. That *is* the thesis, so the WebGL layer
 * does not invent a scene — it adds a slow caustic that augments the light
 * already in the frame, composited with `screen` at low opacity.
 *
 * Capability gate, in order. Any failure leaves the photograph alone, which is
 * the point: the fallback is not a degraded experience, it is the same image
 * without the shimmer.
 *
 *   1. prefers-reduced-motion  -> photo only
 *   2. no WebGL context        -> photo only
 *   3. low-capability device   -> photo only
 *
 * Device gating matters here. The Philippine market is overwhelmingly mobile
 * and weighted toward mid-range Android; a shader is a luxury, not a baseline.
 */

const MIN_CORES = 4;
const MIN_MEMORY_GB = 4;

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

function canRunShader(): boolean {
  if (typeof window === "undefined") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const nav = navigator as NavigatorWithMemory;
  if ((nav.hardwareConcurrency ?? 0) < MIN_CORES) return false;
  // deviceMemory is Chromium-only; absence is not disqualifying.
  if (nav.deviceMemory !== undefined && nav.deviceMemory < MIN_MEMORY_GB) {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uSun;
  varying vec2 vUv;

  // Cheap value noise. Two octaves is enough to suggest a caustic and keeps
  // the fragment cost low on integrated GPUs.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;

    float n = noise(uv * 3.2 + uTime * 0.045);
    n += 0.5 * noise(uv * 7.5 - uTime * 0.03);

    // Light gathers toward the pointer, and is strongest on the right, where
    // the sheets in the photograph already catch the light.
    float toPointer = 1.0 - smoothstep(0.0, 0.85, distance(uv, uPointer));
    float rightBias = smoothstep(0.25, 1.0, uv.x);

    float caustic = smoothstep(0.55, 1.05, n) * rightBias;
    float glow = caustic * 0.5 + toPointer * 0.28 * rightBias;

    gl_FragColor = vec4(uSun * glow, glow);
  }
`;

function CausticLayer() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // The gate lives here rather than in the parent so that no state has to be
    // set after mount to decide whether the shader runs. When it fails, this
    // effect simply attaches nothing and the photograph stands alone.
    if (!canRunShader()) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    // ogl is imported only after the gate passes, so devices that fall back
    // never pay for the bytes.
    void (async () => {
      const { Renderer, Program, Mesh, Triangle, Color } = await import("ogl");
      if (disposed) return;

      const renderer = new Renderer({
        alpha: true,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      host.appendChild(gl.canvas);
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";

      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: [0.72, 0.4] },
          uSun: { value: new Color("#f0c079") },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => renderer.setSize(host.clientWidth, host.clientHeight);
      resize();
      window.addEventListener("resize", resize);

      const onPointer = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        program.uniforms.uPointer.value = [
          (event.clientX - rect.left) / rect.width,
          1 - (event.clientY - rect.top) / rect.height,
        ];
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let frame = 0;
      let running = false;

      const tick = (t: number) => {
        if (!running) return;
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: mesh });
        frame = requestAnimationFrame(tick);
      };

      // Stop the loop once the hero scrolls away — no reason to burn a GPU on
      // a section nobody is looking at.
      const visibility = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !running) {
            running = true;
            frame = requestAnimationFrame(tick);
          } else if (!entry.isIntersecting) {
            running = false;
            cancelAnimationFrame(frame);
          }
        },
        { threshold: 0 },
      );
      visibility.observe(host);

      cleanup = () => {
        running = false;
        cancelAnimationFrame(frame);
        visibility.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointer);
        gl.canvas.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 opacity-70 mix-blend-screen"
    />
  );
}

export function CapizHero() {
  const copy = getCopy();

  return (
    <section className="bg-night text-vellum relative isolate min-h-[100svh] w-full overflow-hidden">
      <Image
        src="/enotaryhub-hero-2027.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        // Narrow screens hold the darker left of the frame behind the type;
        // object-right put the lit sheets directly under every line.
        className="z-0 object-cover object-left md:object-right"
      />

      {/* Night gradient toward the left, protecting the type area without
          dimming the lit sheets on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(100deg, var(--color-night) 0%, color-mix(in oklab, var(--color-night) 88%, transparent) 32%, transparent 66%)",
        }}
      />

      {/* Narrow screens: the type runs the full width, so the diagonal scrim
          above clears only the first third of each line and the rest sits on
          the lit sheets. A vertical wash covers the whole column instead. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-night) 90%, transparent) 0%, color-mix(in oklab, var(--color-night) 82%, transparent) 55%, color-mix(in oklab, var(--color-night) 92%, transparent) 100%)",
        }}
      />

      <CausticLayer />

      <div className="relative z-30 mx-auto flex min-h-[100svh] max-w-[104rem] flex-col justify-center px-[max(1.5rem,4vw)] pt-20 pb-12 xl:pl-[calc(var(--rail-width)+2rem)]">
        {/* The eyebrow carries the positioning, so it is sized to be read
            rather than noticed after the fact.
            Sized inline, not by utility: .font-mono-label is declared unlayered
            in globals.css, so it outranks any Tailwind text-* utility here. */}
        <p
          className="font-mono-label text-sun mb-8"
          style={{ fontSize: "1.05rem", letterSpacing: "0.15em" }}
        >
          {copy.home.eyebrow}
        </p>

        {/* Trimmed against the display scale: the eyebrow grew, so the slogan
            gives back the same weight to keep the block balanced. */}
        <h1
          className="font-display text-[length:calc(var(--text-display)*0.7)]"
          style={{ lineHeight: 1.08 }}
        >
          {SLOGAN.beats.map((beat, i) => (
            <span
              key={beat}
              className="wipe-in -mb-[0.16em] block pb-[0.16em]"
              style={{
                animationDelay: `${120 + i * 140}ms`,
                /* "Legally Sealed." takes the gold — it rhymes with the
                   embossed seal in the photograph beside it. */
                color: i === 1 ? "var(--color-sun)" : undefined,
                opacity: i === 2 ? 0.86 : 1,
              }}
            >
              {beat}
            </span>
          ))}
        </h1>

        {/* Left ragged on purpose. Justifying type this large inside `measure`
            opened word gaps wide enough to read as rivers; the small-type
            disclaimer below has the character count to justify cleanly. */}
        <p className="text-vellum-2 measure mt-8 text-[length:var(--text-lead)]">
          {copy.home.lead}
        </p>

        {/* One route out of the hero. A second, quieter link beside it only
            split the attention it was meant to gather. */}
        <div className="mt-8">
          <Link
            href={hrefFor("contact")}
            className="gather bg-vellum text-night hover:bg-sun inline-block w-full px-7 py-3.5 text-center text-[0.95rem] font-medium sm:w-auto"
          >
            {copy.common.contact}
          </Link>
        </div>

        {/* The disclaimer is now a paragraph, not a status chip: it is too long
            to sit on one line and too important to shrink into mono micro. */}
        <p className="text-vellum-2 border-sun/40 measure mt-9 border-l-2 pl-5 text-justify hyphens-auto text-[0.9rem] leading-relaxed">
          {copy.home.launchStatus}
        </p>
      </div>
    </section>
  );
}
