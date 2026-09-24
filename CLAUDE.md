# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Joytours B2C — a Singapore-based tour operator's consumer website. Modeled as a "nicer" replacement for the WordPress reference at `joytour.oomdcstaging.com` (catalog → filter → detail → booking, EN + ZH).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript 5.9**
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives under the hood — note: Base UI buttons use `render` props, **not** Radix `asChild`)
- **Prisma 7** + **PostgreSQL** (generator: `prisma-client-js` → import from `@prisma/client`)
- **Auth.js v5 beta** (`next-auth@beta`) with Prisma adapter, JWT sessions
- **next-intl 4** for i18n — locales `en` (default) and `zh`, `localePrefix: "as-needed"`
- **React Hook Form + Zod** for forms/validation
- **Vitest + Testing Library + jsdom** for unit; **Playwright** for E2E
- **pnpm** for installs (lockfile is authoritative)

## Common commands

```bash
pnpm dev              # dev server at :3000 (Turbopack)
pnpm build            # production build
pnpm start            # run production build

pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint .

pnpm test             # vitest run
pnpm test:watch       # vitest (watch mode)
pnpm test:coverage    # with v8 coverage; enforces 80% lines/funcs/statements
pnpm exec vitest run src/lib/format.test.ts   # run one file

pnpm e2e              # Playwright (chromium + iPhone 14)
pnpm e2e:ui           # Playwright UI mode
pnpm exec playwright test e2e/home.spec.ts -g "hero"   # single test by grep

pnpm db:generate      # prisma generate
pnpm db:migrate       # prisma migrate dev
pnpm db:push          # prisma db push (prototyping)
pnpm db:studio        # prisma studio
pnpm db:seed          # tsx prisma/seed.ts (uses seed data for China + Japan tours)
pnpm db:reset         # wipe + re-migrate + re-seed
```

Before first run: `cp .env.example .env` and set `DATABASE_URL`. Prisma 7 reads the URL from `prisma.config.ts`, not from inside `schema.prisma` — do not re-add `url = env("DATABASE_URL")` to the datasource block, it will fail validation.

## Architecture

### Routing (`src/app/`)

All user-facing routes live under `src/app/[locale]/…` — there is intentionally **no** `src/app/layout.tsx` or `src/app/page.tsx`. `next-intl` middleware (`src/middleware.ts`) handles locale negotiation; the root layout at `src/app/[locale]/layout.tsx` owns `<html>`, fonts, `NextIntlClientProvider`, header/footer, toaster. API routes (e.g. `src/app/api/auth/[...nextauth]/route.ts`) sit outside the `[locale]` segment.

Every page is an async server component that:
1. `await`s `params` (Next 15+ async params),
2. calls `setRequestLocale(locale)` so child server components can use `getTranslations`,
3. pulls data through `src/lib/*` (not direct `db.*` calls inside page files once a feature is more than trivial).

### Data layer

- `src/lib/db.ts` — global Prisma singleton (HMR-safe).
- `src/lib/tours.ts` — all tour queries live here. Shared `tourCardSelect` (typed with `satisfies Prisma.TourSelect`) is the one source of truth for what a card needs; widen it deliberately. `TourCardData` is derived via `Awaited<ReturnType<…>>[number]` so the UI never invents its own shape.
- `prisma/schema.prisma` — domain: `Destination` (self-referential hierarchy: Country → Region) · `Tour` + `ItineraryDay` · `Departure` (inventory: `capacity` + `booked` + status) · `Booking` + `BookingTraveler` · `Payment` · `Review` · `Post` · `Faq` · Auth.js v5 models (`User`, `Account`, `Session`, `VerificationToken`). Bilingual fields are suffixed `Zh` and optional — UI falls back to the default-locale field if `Zh` is empty.
- Money is `Decimal(10,2)` on the schema side. Format it through `src/lib/format.ts#formatSgd` — never call `Number(price)` inline in components.

### i18n

- `src/i18n/routing.ts` defines locales + `localePrefix: "as-needed"` (so `/` stays on EN, `/zh/...` for Chinese).
- `src/i18n/navigation.ts` re-exports a locale-aware `<Link>`, `useRouter`, `usePathname`, `redirect` — always import `Link` from `@/i18n/navigation`, never from `next/link`, or locale prefixes get lost.
- Message files: `messages/en.json`, `messages/zh.json`. Keep keys in sync; `src/i18n/request.ts` imports by locale name.
- Client components read translations with `useTranslations("ns")`, server with `getTranslations("ns")`.

### UI convention

- shadcn components live in `src/components/ui/*` (do not hand-edit unless you know why). Re-run `pnpm dlx shadcn@latest add <name>` to add more.
- **Button has no `asChild`** (Base UI primitive). To style a link/anchor as a button, apply `buttonVariants({...})` as `className` to `<Link>` or `<a>`:
  ```tsx
  <Link href="/tours" className={buttonVariants({ size: "lg" })}>…</Link>
  ```
- Feature components: `src/components/site/*` (header, footer, locale switcher), `src/components/tour/*` (cards, filters).

### Auth

`src/lib/auth.ts` exports `auth`, `signIn`, `signOut`, `handlers` from NextAuth v5 with `PrismaAdapter` and JWT sessions. Providers list is intentionally empty — enable Google / email (magic link) in that file and add the matching env vars. The route handler at `src/app/api/auth/[...nextauth]/route.ts` re-exports from `src/lib/auth-handlers.ts`; keep it a one-liner. Session augmentation (adding `id` and `role`) is declared in `src/types/next-auth.d.ts`.

## Conventions

- **Imports**: `@/*` → `src/*` (tsconfig paths). Use this, not deep relative paths.
- **Immutability**: no in-place mutation of Prisma results or props — spread into new objects. Typechecker enforces this through `Readonly`-ish patterns in hooks.
- **Decimal handling**: always go through `formatSgd`. `Prisma.Decimal` stringifies fine but loses precision on `Number(...)` — don't do that.
- **Bilingual fallback**: `const title = locale === "zh" && t.titleZh ? t.titleZh : t.title`. This pattern is repeated — if it grows a third variant, extract to `src/lib/i18n.ts#localizedField`.
- **Server-only data**: `src/lib/db.ts` / `src/lib/tours.ts` are server-only. Don't import them into a `"use client"` file.
- **No `asChild` on `Button`** (see UI convention above). Lint won't catch this — TS will.
- **Next 16 specifics**: `params` and `searchParams` in pages/layouts are `Promise<…>` — always `await` them. Check `node_modules/next/dist/docs/` before using caching / revalidation / `unstable_*` APIs; Next 16 changed several defaults vs. training data (see `AGENTS.md`).

## Testing

- Unit tests live next to source as `*.test.ts` / `*.test.tsx`. `vitest.config.ts` sets `jsdom` + `@testing-library/jest-dom` matchers (via `vitest.setup.ts`) and enforces 80% line/func/statement coverage, 75% branch.
- E2E specs in `e2e/*.spec.ts` hit `http://localhost:3000` (Playwright starts `pnpm dev` automatically). Chromium + iPhone 14 projects by default.
- DB-touching integration tests: prefer a Testcontainer or a scratch Postgres over mocks (see the root-level testing guide).

## Not yet wired (phase 2)

- **Stripe checkout** — env keys are placeholders in `.env.example`; `src/app/[locale]/cart/page.tsx` is a stub.
- **Blog CMS** — `Post` model exists, list/detail pages are stubs.
- **Admin dashboard** — no `/admin` routes yet; `UserRole.ADMIN | STAFF` are defined and carried on the session.
- **Real images** — hero/card placeholders are CSS gradients; `next.config.ts` allowlists `images.unsplash.com` and `cdn.joytour.sg` for `next/image` when you add them.

## Design Context

> Authoritative source: `.impeccable.md`. Summary kept here so any Claude session inherits the direction.

- **Audience**: mixed Singaporean — families, retirees (50+), professionals (35–55). English-only as of this release.
- **Personality**: trustworthy / warm / generous. Long-running family agency at People's Park Complex; reassuring rather than salesy.
- **Two-colour identity sampled from the master logo (`/public/joytour-logo-master.png`)**: Hermès orange `#FA5A0A` + Tiffany blue `#50BEB4`. Tokens live in `globals.css` as `--brand-*` (orange `#FA5A0A`, orange-deep `#D04A00`, amber `#FF7A33`, teal `#50BEB4`, teal-deep `#2D8E85`, teal-soft `#DBF1ED`, cream `#FFF4E6`, paper `#FAF9F6`, grey-soft `#F6F6F6`, ink `#1A1A1A`, text `#2B2B2B`, muted `#525252`). Legacy aliases `--brand-gold`/`--brand-brown` now resolve to ink; `--brand-yellow` resolves to amber. Do not introduce a third hue.
- **Discipline**: orange = CTAs / accent words / prices. Tiffany = section kickers / icon pills / hero overlay top. Ink = every heading. No gold, no yellow, no warm browns.
- **Hero overlay (across all dark hero pages):** `linear-gradient(180deg, rgba(80,190,180,X), rgba(26,26,26,Y))` — the home hero uses 0.58/0.82, inner pages 0.45–0.5/0.84. **Header on hero pages is transparent, frosting to white on scroll past 40px or on mega-menu hover.**
- **Typography (corporate kit):** **Britannic Bold** for display headings with `text-transform: capitalize` + `line-height: 1.1`, colour = ink. **Inter** (400–800) for body, nav, kickers, and buttons. **Fredoka 700** for the favicon "JT" wordmark (fetched from Google Fonts at build time inside `app/icon.tsx`). Loaded via `next/font/local` in the locale layout (`src/fonts/britannic-bold.ttf`). Use `.brand-pill` / `.brand-pill-ghost` for CTAs (30px radius).
- **Logo assets**: `/public/joytour-logo-gold.webp` (header), `/public/joytour-logo-cream.png` (footer, no inversion needed), `/public/joytour-logo-master.png` (full master mark for future use).
