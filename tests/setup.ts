import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

/**
 * jsdom implements neither IntersectionObserver nor matchMedia, and the site
 * uses both — the reveal primitives observe intersection, and the shader gate
 * asks about reduced motion.
 *
 * The IntersectionObserver stub fires nothing. That is deliberate: it pins the
 * tests to the *pre-reveal* state, so content that is only reachable after an
 * animation runs fails a test rather than passing one.
 */

class NoopIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver);

/**
 * jsdom has no canvas backend. Returning null explicitly makes the hero's
 * capability gate deterministic — it sees no WebGL context and takes the
 * photograph-only fallback — instead of relying on a jsdom "not implemented"
 * warning to produce the same result by accident.
 */
HTMLCanvasElement.prototype.getContext = () => null;

vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
);
