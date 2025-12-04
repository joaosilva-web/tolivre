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

```typescript
const searchClients = useCallback(
  debounce(async (query: string) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(
        `/api/clients/search?q=${encodeURIComponent(query)}`
      );
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.data || []);
      }
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
    }
  }, 300),
  []
);
```

### Keyboard Navigation Pattern

- **Focus management** with `focusedIndex` state for dropdown navigation
- **ArrowUp/ArrowDown** for navigation, **Enter** for selection, **Escape** to close
- **useRef** for DOM element access and programmatic focus control

## Appointment Booking Flow Details

### 4-Step Wizard Implementation

1. **Service Selection**: Load professional's services, validate selection
2. **Client Information**: Debounced search + inline client creation
3. **Date Selection**: Calendar with working hours validation
4. **Time Selection**: Generate available slots using working hours + existing appointments

### State Management in Booking Wizard

```typescript
// Form progression state
const [currentStep, setCurrentStep] = useState(1);

// Service selection
const [selectedService, setSelectedService] = useState<Service | null>(null);

// Client management with search
const [clientQuery, setClientQuery] = useState("");
const [searchResults, setSearchResults] = useState<Client[]>([]);
const [dropdownOpen, setDropdownOpen] = useState(false);
const [focusedIndex, setFocusedIndex] = useState<number>(-1);
const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

// Inline client creation
const [creatingClient, setCreatingClient] = useState(false);
const [newClientName, setNewClientName] = useState("");
const [newClientEmail, setNewClientEmail] = useState("");

// Date and time selection
const [selectedDate, setSelectedDate] = useState<Date | undefined>();
const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
```

### Slot Generation Integration

- **Client-side calculation** using `generateSlots()` utility
- **Server data dependency**: Working hours + existing appointments
- **Real-time validation**: Check conflicts before allowing selection
- **UTC handling**: Generate in local time, convert to UTC for API

### Background WhatsApp Notifications

- **Non-blocking pattern**: Appointment creation succeeds even if WhatsApp fails
- **Structured logging**: `[uazapi]` prefix for debugging external API calls
- **Phone normalization**: Strip formatting, add country code if missing
- **Graceful degradation**: Log errors but don't interrupt user flow

## Debugging Workflows

### Common Development Issues

1. **Windows File Locks**:

   ```bash
   # Stop all Node processes before prisma operations
   taskkill /IM node.exe /F
   npx prisma generate
   npm run dev
   ```

2. **Prisma Client Outdated**:

   ```bash
   # After schema changes, always regenerate
   npx prisma generate
   # Restart dev server to pick up changes
   ```

3. **Database Connection Issues**:
   ```bash
   # Verify PostgreSQL is running
   docker-compose up -d
   # Check migrations are applied
   npx prisma migrate status
   npx prisma migrate deploy
   ```

### Logging Patterns

- **Structured API errors**: Use `console.error()` with context
- **External service prefixes**: `[uazapi]`, `[prisma]` for filtering logs
- **Client-side debugging**: Network tab for API calls, React DevTools for state

### Environment Troubleshooting

- **Check `.env` format**: No quotes around values, proper PostgreSQL URL format
- **Verify all required vars**: `JWT_SECRET`, `POSTGRES_URL`, `UAZAPI_*` for WhatsApp
- **Windows path issues**: Use forward slashes in file paths, absolute paths for Prisma

### Testing Database Operations

```bash
# Interactive database exploration
npx prisma studio

# Manual query testing
npx prisma db seed

# Reset database in development
npx prisma migrate reset --force
```

## Additional Integration Patterns

### External API Integration Template

```typescript
export async function callExternalService(data: unknown) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = await response.text();

    if (!response.ok) {
      console.error("[service] API error", response.status, body);
      return { ok: false, status: response.status, error: body };
    }

    return { ok: true, status: response.status, body };
  } catch (err) {
    console.error("[service] Failed to call API:", err);
    return { ok: false, error: String(err) };
  }
}
```

### Background Job Pattern

- **Fire-and-forget approach**: Don't await external API calls in critical paths
- **Error isolation**: External failures don't break main functionality
- **Retry logic**: Consider implementing for critical notifications
- **Status tracking**: Log success/failure for monitoring

### Multi-tenant Data Access

```typescript
// Always include companyId in queries
const appointments = await prisma.appointment.findMany({
  where: {
    professionalId: user.id,
    companyId: user.companyId, // Critical for data isolation
    startTime: { gte: new Date() },
  },
});

// Authorization check pattern
if (resource.companyId !== user.companyId) {
  return api.forbidden("Access denied to resource");
}
```

### Date/Time Handling Best Practices

```typescript
// Always store UTC in database
const utcDate = new Date(localDateString + "Z");

// Use date-fns for display formatting
import { format } from "date-fns";
const displayDate = format(utcDate, "dd/MM/yyyy HH:mm");

// Working hours validation
const dayOfWeek = getDayOfWeekUTC(appointmentDate);
const startMinutes = timeToMinutes(workingHour.startTime);
```

## Development Workflow

### Essential Commands

```bash
# Start development (uses Turbopack)
npm run dev

# Database operations
docker-compose up -d          # Start PostgreSQL
npx prisma migrate dev        # Apply migrations in dev
npx prisma migrate deploy     # Apply migrations in production
npx prisma generate          # Regenerate client after schema changes

# Troubleshooting
npx prisma studio           # Database GUI
taskkill /IM node.exe /F   # Kill Node processes (Windows file locks)
```

### File Organization Conventions

- **API routes**: `src/app/api/` - follows Next.js App Router patterns
- **Shared utilities**: `src/lib/` - database, utilities, external integrations
- **App-specific logic**: `src/app/libs/` - auth, API responses, rate limiting
- **Generated code**: `src/generated/prisma` - Prisma client (custom output path)
- **Components**: `src/components/` - reusable UI components with shadcn/ui
- **Hooks**: `src/hooks/` - custom React hooks for shared logic
- **Context**: `src/context/` - React context providers for global state

## Security Considerations

- **reCAPTCHA protection** on public forms (leads, registration)
- **Rate limiting** by IP with authenticated user bypass
- **Input validation** with Zod schemas at API boundaries
- **SQL injection prevention** via Prisma parameterized queries
- **Authorization checks** on every resource access

## Common Gotchas

- **File locks on Windows**: Stop Node processes before `prisma generate`
- **Time zones**: Always work in UTC server-side, handle display conversion client-side
- **Prisma client path**: Generated to `src/generated/prisma`, not default location
- **Multi-tenant data isolation**: Never forget `companyId` filters in queries
- **Advisory locks**: Use for appointment creation to prevent double-bookings
- **useState dependencies**: Include all state variables that affect useEffect/useCallback

## Example Patterns

### Typical API Route Structure

```typescript
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    const user = await getUserFromCookie();
    if (!user) return api.unauthorized();

    // Authorization check
    if (user.companyId !== parsed.companyId)
      return api.forbidden("Access denied");

    const result = await prisma.model.create({ data: parsed });
    return api.created(result);
  } catch (err) {
    if (err instanceof ZodError) {
      return api.badRequest("Validation error", err.issues);
    }
    return api.serverError(err.message);
  }
}
```

### Component with Session and Loading States

```typescript
export default function MyComponent() {
  const { user, loading } = useSession();
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    if (!user?.companyId) return;

    setLoadingData(true);
    try {
      const res = await fetch(`/api/data?companyId=${user.companyId}`);
      if (res.ok) {
        const result = await res.json();
        setData(result.data || []);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data");
    } finally {
      setLoadingData(false);
    }
  }, [user?.companyId]);

  useEffect(() => {
    if (user?.companyId) {
      loadData();
    }
  }, [loadData]);

  if (loading || loadingData) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  // Component content...
}
```

### Environment Variables

- Development: Uses `.env` with PostgreSQL connection string (no quotes)
- Required for Uazapi: `UAZAPI_URL`, `UAZAPI_TOKEN`, `UAZAPI_HEADER`
- JWT: `JWT_SECRET` for token signing
- Security: `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

Focus on maintaining these patterns when adding new features or modifying existing code.
