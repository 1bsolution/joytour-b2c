import { ImageResponse } from "next/og";
import { loadFredoka700 } from "@/lib/icon-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fontData = await loadFredoka700();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff7900",
          color: "#ffffff",
          fontSize: 108,
          fontFamily: "Fredoka",
          fontWeight: 700,
          letterSpacing: "-0.05em",
        }}
      >
        JT
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fredoka", data: fontData, weight: 700, style: "normal" },
      ],
    }
  );
}
