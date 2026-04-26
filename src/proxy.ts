import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip Next.js internals, API routes, the metadata routes that Next
  // generates (icon, apple-icon, favicon.ico, sitemap, robots), and any
  // request whose path contains a dot (i.e. has a file extension).
  matcher: [
    "/((?!api|_next|_vercel|icon|apple-icon|favicon|sitemap|robots|.*\\..*).*)",
  ],
};
