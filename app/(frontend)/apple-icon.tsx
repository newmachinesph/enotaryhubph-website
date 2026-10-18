import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 36,
        // Literal shades of the #27133c anchor — Satori has no CSS variables.
        background: "linear-gradient(135deg, #3b2554 0%, #27133c 70%)",
        color: "#f3cb58",
        fontFamily: "serif",
        fontSize: 28,
      }}
    >
      eNotaryHub
    </div>,
    size,
  );
}
