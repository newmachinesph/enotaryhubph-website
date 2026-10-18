import { ImageResponse } from "next/og";

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 };
export const SOCIAL_IMAGE_ALT =
  "eNotaryHub — Trusted Signatures. Legally Sealed. Instantly Done.";

// Satori cannot resolve CSS custom properties, so the anchor and its shades
// are written literally here. They must track app/tokens.css:
//   #3b2554 night-2 · #27133c the anchor · #0c0318 night-deep
export function socialCard() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #3b2554 0%, #27133c 58%, #0c0318 100%)",
        color: "#f1ead7",
        padding: "72px 82px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 28,
          display: "flex",
          border: "1px solid rgba(241, 234, 215, 0.2)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 58,
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ fontFamily: "Georgia, serif", fontSize: 32 }}>
            eNotaryHub
          </span>
          <span style={{ color: "#f1cb58", marginLeft: 18 }}>§ PH</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 62, lineHeight: 1.04 }}>
          <span>Trusted Signatures.</span>
          <span style={{ color: "#f1cb58" }}>Legally Sealed.</span>
          <span>Instantly Done.</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            color: "rgba(241, 234, 215, 0.72)",
          }}
        >
          Electronic notarization for the Philippines · Preparing for launch
        </div>
      </div>
    </div>,
    SOCIAL_IMAGE_SIZE,
  );
}
