/**
 * The mullion grid.
 *
 * Eight vertical hairlines across the viewport — one per ray of the eight-axis
 * geometry — so every page reads as something seen *through a window frame*
 * rather than as a stack of cards.
 *
 * Purely decorative and non-interactive. It sits above the page background but
 * below all content, and never intercepts pointer events.
 */

const COLUMNS = 8;

export function MullionGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 flex justify-between px-[max(1.5rem,4vw)]"
    >
      {Array.from({ length: COLUMNS + 1 }, (_, i) => (
        <span
          key={i}
          className="h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-mullion) 18%, var(--color-mullion) 82%, transparent)",
            /* The outermost lines carry the frame; inner ones are a whisper. */
            opacity: i === 0 || i === COLUMNS ? 0.5 : 0.18,
          }}
        />
      ))}
    </div>
  );
}
