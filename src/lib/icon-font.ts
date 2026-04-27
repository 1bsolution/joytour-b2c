// Fetch a Google Font as a binary buffer at build time so it can be embedded
// in `next/og` `ImageResponse`s (favicon + apple-icon). Module-level caching
// avoids the second fetch when both icon routes render in the same process.

const GOOGLE_FONTS_CSS =
  "https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap";

// Spoof a real browser UA so Google returns the modern woff2 stylesheet.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15";

let cached: ArrayBuffer | null = null;

export async function loadFredoka700(): Promise<ArrayBuffer> {
  if (cached) return cached;

  const css = await fetch(GOOGLE_FONTS_CSS, {
    headers: { "User-Agent": UA },
  }).then((r) => r.text());

  // Match the first woff2 URL in the @font-face declarations (latin subset).
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) {
    throw new Error("Failed to extract Fredoka woff2 URL from Google Fonts CSS");
  }

  const buffer = await fetch(match[1]).then((r) => r.arrayBuffer());
  cached = buffer;
  return buffer;
}
