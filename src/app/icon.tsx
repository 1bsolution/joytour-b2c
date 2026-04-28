import { ImageResponse } from "next/og";
import { loadFredoka700 } from "@/lib/icon-font";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          background: "#FA5A0A",
          color: "#ffffff",
          fontSize: 19,
          fontFamily: "Fredoka",
          fontWeight: 700,
          letterSpacing: "-0.04em",
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
