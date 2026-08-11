import { ImageResponse } from "next/og";

export const alt = "Vidanautica — Chalecos salvavidas certificados en Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #16294f 0%, #203f7f 60%, #3a5fa8 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 40, letterSpacing: 10, color: "#b8c7e8", display: "flex" }}>
          VIDANAUTICA
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.15,
            display: "flex",
            maxWidth: 900,
          }}
        >
          Disenados para proteger, hechos para durar
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#dbe3f4", display: "flex" }}>
          Chalecos salvavidas certificados, fabricados en Chile
        </div>
      </div>
    ),
    { ...size }
  );
}
