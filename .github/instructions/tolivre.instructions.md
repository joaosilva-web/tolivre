---
applyTo: "**"
---

Provide project context and coding guidelines for the ToLivre codebase.

Project context (architecture)

- Next.js App Router app in `src/app`, Prisma ORM (`prisma/schema.prisma`), PostgreSQL via Docker Compose.
- Multi-tenant model: Company → Users → Professionals → Appointments (always isolate by `companyId`).

Key files and folders

- Auth & API helpers: `src/app/libs/auth.ts`, `src/app/libs/apiResponse.ts`, `src/app/libs/rateLimit.ts`.
- Prisma client location: `src/generated/prisma` (non-standard output path).
- Booking flow: `src/app/(booking)/` plus utilities in `src/lib/` and hooks in `src/hooks/`.
- UI components: `src/components/` (shadcn/ui style), global layout in `src/app/layout.tsx`.

UI Guidelines

- UI colors: follow the color tokens and variables defined in `src/app/globals.css` to maintain visual consistency across the application. Prefer using the available variables/tokens instead of hard-coded colors.
- Component library: whenever possible, use the `shadcn` components and patterns from `src/components/` and compose on top of their primitives to keep UI consistency and accessibility.
- Public landing pages under `src/app/[slug]/` must adapt to each company’s branding (slug) by using the colors it provides, even if those values differ from the defaults in `globals.css`. Treat that page as an exception so it can honor the tenant’s palette without undoing the shared tokens.

Critical patterns to follow

- Auth: call `getUserFromCookie()` at API entry; enforce `companyId` ownership checks before mutations.
- API responses: use the envelope helpers from `apiResponse`.
- Validation: use Zod at route entry; return `api.badRequest(...)` on `ZodError`.
- Concurrency: use Postgres advisory locks (`pg_advisory_xact_lock`) to prevent double-booking.
- Multi-tenant queries: always include `companyId` in Prisma `where` filters.

Development workflow (common commands)

- Dev server: `npm run dev`.
- DB: `docker-compose up -d`, then `npx prisma migrate dev`, `npx prisma generate`.
- Prisma UI: `npx prisma studio`.

Deployment/build-time requirements

- Build-time envs are required in Docker builds: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_APP_URL`, reCAPTCHA keys, `MERCADO_PAGO_ACCESS_TOKEN`.
- In Dokploy/Hostinger, configure build args in the UI; runtime envs alone are not enough for `npx next build`.

Known gotchas

- Windows file locks can block `prisma generate`; if needed: `taskkill /IM node.exe /F`.
- Prisma client path is custom (`src/generated/prisma`), so regenerate after schema changes.
- Landing page refactor backup exists at `src/app/page-old.tsx`.

Integration points

- WhatsApp: `src/lib/uazapi` with `UAZAPI_*` env vars.
- Stripe: `src/app/api/subscription/stripe-checkout/route.ts` and `src/app/api/subscriptions/checkout/route.ts`.

Change management

- Add any critical development changes or new conventions to this file (`.github/instructions/tolivre.instructions.md`).
- Create a new `tasks` file to track in-progress and future tasks, and update it every time a task status changes.

If you modify DB schema or Prisma types

1. Update `prisma/schema.prisma`.
2. Run `npx prisma migrate dev` (dev) or `npx prisma migrate deploy` (prod).
3. Run `npx prisma generate` and restart the dev server.
