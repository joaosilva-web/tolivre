# AI Coding Assistant Instructions for ToLivre

## Architecture Overview

ToLivre is a **Next.js 15 SaaS appointment booking platform** with a specific multi-tenant B2B structure:

- **Company → User → Professional → Appointments** hierarchy
- Each Company has multiple Users (OWNER/MANAGER/EMPLOYEE roles)
- Professionals (Users) provide Services and manage Appointments
- Built with App Router, Prisma ORM, PostgreSQL, and custom JWT auth

## Key Technical Patterns

### Authentication & Authorization

- **JWT-based auth** using httpOnly cookies (`src/app/libs/auth.ts`)
- Most API routes use `getUserFromCookie()` for authentication
- **Authorization pattern**: Always verify resource belongs to user's company
  ```typescript
  if (user.companyId && existing.companyId !== user.companyId)
    return api.forbidden("Você não pode editar este recurso");
  ```

### API Route Structure

- **Consistent envelope pattern** via `src/app/libs/apiResponse.ts`:
  ```typescript
  // Success: { success: true, data: T }
  // Error: { success: false, error: string, errorDetails?: unknown }
  ```
- **Zod validation** at route entry: parse request body, return structured errors
- **Rate limiting** for public endpoints using `checkRateLimit()` (IP-based with user bypass)

### Database & Concurrency

- **Prisma Client** generated to `src/generated/prisma` (not standard location)
- **Advisory locks** for critical sections: `pg_advisory_xact_lock()` prevents appointment conflicts
- **Multi-tenant security**: Always filter by `companyId` in queries
- **Example lock pattern** in appointments:
  ```typescript
  const [lock1, lock2] = hashToTwoInts(professionalId);
  await tx.$executeRaw`SELECT pg_advisory_xact_lock(${lock1}::int, ${lock2}::int)`;
  ```

## Frontend Component Patterns

### State Management Conventions

- **Multiple useState hooks** for complex forms with separate concerns:
  ```typescript
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  ```
- **Consistent loading pattern**: Set `loading: true` before async operations, `false` in finally
- **Error handling**: Always use try/catch with user-friendly error messages

### Session Management Pattern

- **Global session provider** (`src/context/SessionProvider.tsx`) with caching
- **Custom hook pattern**: `useSession()` provides `{ user, loading, error, refresh }`
- **Module-level caching** prevents duplicate API calls across components
- **Graceful auth handling**: Show loading states, redirect unauthenticated users

### Debounced Search Implementation

````instructions
# Copilot instructions (project-specific, concise)

Short summary
- Next.js App Router app (src/app), Prisma ORM (schema in prisma/), Postgres in Docker. Multi-tenant model: Company → Users → Professionals → Appointments.

Key files to inspect
- Auth & API helpers: `src/app/libs/auth.ts`, `src/app/libs/apiResponse.ts`, `src/app/libs/rateLimit.ts`
- Prisma client location: `src/generated/prisma` (run `npx prisma generate` after schema changes)
- Booking flow: `src/app/(booking)/` and shared utilities in `src/lib/` and `src/hooks/`
- UI components: `src/components/` (shadcn/ui pattern), global layout in `src/app/layout.tsx`

Build & run (dev) – quick commands
```bash
# dev with Turbopack (Next 16):
npm install
npm run dev

# Prisma & DB:
docker-compose up -d   # starts Postgres (uses docker-compose.yml)
npx prisma migrate dev
npx prisma generate
```

Important conventions & patterns
- Auth: use `getUserFromCookie()` at API entry; always check `user.companyId` against resource `companyId`.
- API responses follow envelope `{ success: boolean, data?, error?, errorDetails? }` via `apiResponse` helpers.
- Use Zod at route entry for validation; map ZodError -> `api.badRequest(...)`.
- Multi-tenant queries must include `companyId` filters; advisory locks (`pg_advisory_xact_lock`) are used to avoid appointment race conditions.

Deployment & build-time secrets
- Dockerfile requires several build-time envs (STRIPE_SECRET_KEY, NEXT_PUBLIC_APP_URL, RECAPTCHA keys, MERCADO_PAGO_ACCESS_TOKEN). When deploying (Dokploy/Hostinger), configure build args in the platform UI — runtime envs alone are insufficient for `npx next build`.

Developer gotchas (from repo)
- Prisma client output path is non-standard (`src/generated/prisma`) — regenerate client after schema changes and restart the dev server.
- Windows: Node file locks can block `prisma generate`; use `taskkill /IM node.exe /F` if needed.
- Large landing page: `src/app/page.tsx` was recently refactored; previous version is preserved at `src/app/page-old.tsx`.

Where to look for integrations
- WhatsApp: `src/lib/uazapi` (UAZAPI_* env vars)
- Stripe integrations: `src/app/api/subscription/stripe-checkout/route.ts` and `src/app/api/subscriptions/checkout/route.ts` (watch build-time secret usage)

Testing and debugging
- Use `npx prisma studio` to inspect DB.
- Logs: search for prefixes like `[uazapi]` or `[prisma]` in server logs for external integration traces.

If you change code that affects DB schema or Prisma types:
1. Update `prisma/schema.prisma`.
2. Run `npx prisma migrate dev` (dev) or `npx prisma migrate deploy` (prod).
3. Run `npx prisma generate` and restart the Next server.

If something seems broken, helpful places to check first
- `src/app/libs/apiResponse.ts` for returned shapes
- `src/app/libs/auth.ts` and `src/context/SessionProvider.tsx` for auth issues
- `src/generated/prisma` for mismatched types
- `docker-compose.yml` for local DB credentials

Questions I will ask before making large changes
- Does this change touch tenant data (companyId)? If yes, include authorization checks.
- Are build-time secrets required? Confirm they are configured in CI/Docker build.

If anything here is incomplete or you want me to expand a section (e.g., deployment steps for Dokploy or the booking flow files), tell me which area and I'll iterate.

````
