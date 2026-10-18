/**
 * The marginalia rail.
 *
 * A legal document's margin, kept as a persistent fixed column: the page's
 * vertical status word and a script watermark. This is
 * the layout move that most separates the site from a centred marketing page.
 *
 * Hidden below `xl` — there is no margin to spare on a phone, and the
 * Philippine audience is overwhelmingly mobile.
 *
 * BAYBAYIN NOTE: the watermark renders "ᜉᜆᜓᜈᜌ᜔" (patunay, "proof/attestation").
 * It was composed from abugida rules by a non-native reader and is PENDING
 * VERIFICATION by a native reader before launch. It is `aria-hidden` and
 * carries no meaning the page depends on, so removing it is safe and
 * self-contained.
 */

interface MarginaliaRailProps {
  /** Short status word shown vertically along the rail. */
  status: string;
}

export function MarginaliaRail({ status }: MarginaliaRailProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-10 hidden h-full w-[var(--rail-width)] xl:block"
    >
      <div className="flex h-full flex-col items-center justify-between py-8">
        {/* The rail's own hairline spine. */}
        <span
          className="my-6 w-px flex-1"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-mullion), transparent)",
          }}
        />

        <span
          className="font-mono-label text-narra-3 rotate-180 [writing-mode:vertical-rl]"
          style={{ letterSpacing: "0.3em" }}
        >
          {status}
        </span>

        <span
          className="text-narra-3 mt-6 text-[1.35rem] leading-none opacity-30"
          lang="fil-Tglg"
        >
          ᜉᜆᜓᜈᜌ᜔
        </span>
      </div>
    </div>
  );
}
