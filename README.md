# Bistro Bliss Front-End Architecture

## Overview
A TypeScript + React 19 single-page application bootstrapped with Vite. It implements a restaurant / food ordering & booking experience including:
- Public marketing pages (home, about, menu, contact, blog-style sections)
- Product catalogue with category + text filtering
- Auth (login, register, OTP verification, token refresh, logout)
- User profile management
- Favourites (wishlist) management
- Cart with optimistic updates and checkout workflow
- Bookings / table reservations
- Orders (user & admin views)
- Admin area (users, products, orders, contacts, bookings)

Data fetching, caching, optimistic UI and server state management are handled with `@tanstack/react-query` (v5). Network layer is an Axios instance configured with auth interceptors for access / refresh token flow.

## Tech Stack
- Runtime / Framework: React 19 + Vite
- Language: TypeScript
- Routing: `react-router-dom@7` (data routers API via `createBrowserRouter`)
- Server State: `@tanstack/react-query`
- HTTP: Axios (centralized instance in `src/services/api.ts`)
- Forms & Validation: Formik + Yup (login/registration/bookings forms)
- UI / Styling: Custom CSS, Bootstrap utility classes, bespoke component styles
- Icons: `react-icons`
- Notifications: `react-toastify` (centralized toast feedback layer)

## High-Level Layering
```
┌───────────────────────────── Application Root (App.tsx) ─────────────────────────────┐
│ <QueryClientProvider>                                                                │
│   <RouterProvider router={router}/>                                                  │
└──────────────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌────────────────── Routing Configuration (src/utils/routes) ──────────────────────────┐
│ routes.tsx: Declarative route tree (public, /auth, /admin)                           │
│ AuthProvider wraps each top-level layout scope for context availability              │
└──────────────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────── State / Context Layer ────────────────────────────────────────────────┐
│ AuthContext + AuthProvider:                                                          │
│   - Holds authState { user, token, cart, favourites }                                │
│   - Exposes login, logout, setAuthState                                              │
│   - Injects Authorization header via request interceptor                             │
│   - Implements automatic refresh token flow via response interceptor                 │
│ React Query: global query client + hooks wrappers                                    │
└──────────────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────── Server Interaction Layer (services/) ────────────────────────────────┐
│ api.ts: Axios base instance (baseURL from Vite env)                                  │
│ *Api files (cartApi, favouritesApi, ordersApi, profileApi, bookingsApi, bookApi...)  │
│   - Encapsulate REST endpoints, normalization, fallbacks, typed responses            │
│   - Keep UI layer free from URL / shape coupling                                     │
└──────────────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────── Domain Hooks (hooks/) ────────────────────────────────────────────────┐
│ useCart, useFavourites, useOrders, useProfile, useOtp (placeholder)                  │
│   - Compose react-query (queries + mutations)                                        │
│   - Provide optimistic update logic (cart & favourites)                              │
│   - Encapsulate auth gating (enabled flags)                                          │
│   - Normalize merging of server + local interim state                                │
└──────────────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────── Presentation Layer (pages/, components/) ─────────────────────────────┐
│ Pages map to routes and orchestrate hooks + components                               │
│ Reusable UI building blocks: Card, Hero, Section, GridContainer, Roundel, Navbar ... │
│ Admin-specific components under components/Admin                                     │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

## Routing Architecture
File: `src/utils/routes/routes.tsx`
- Three top-level route groups each wrapped in `AuthProvider` so context is always present:
  1. Root `/` with marketing + user features
  2. `/auth` for authentication flows (login, register, OTP)
  3. `/admin` for back-office management
- Centralized path constants: `routePaths.ts` (exports `paths` and `AppRoutePath` union for type-safety)
- Central import aggregator: `routeImports.ts` improves tree clarity and reduces import noise in the router file.

## Auth & Session Flow
`AuthProvider` responsibilities:
- Login: POST `/auth/login` -> sets `authState` (user normalized, token, cart, favourites)
- Logout: POST `/auth/logout` and clear state
- Request Interceptor: Adds `Authorization: Bearer <token>` to outbound requests
- Response Interceptor: On 401 w/ message ending in `Unauthorized`, attempts `/auth/refresh`; if refresh succeeds, state is updated and original request retried; otherwise user is logged out
- User normalization consolidates multiple potential backend user field variants (`id/_id`, `name/fullName/username`, `imageUrl/avatar/photo` etc.) ensuring front-end stability if backend evolves

## Server State Management Patterns
- Single global `QueryClient` configured with generous `staleTime` & `gcTime` defaults
- Hooks define stable query keys (e.g., `['cart', userId]`, `['favourites', userId]`)
- Optimistic Updates:
  - Cart: add/update/remove mutations snapshot previous cache, perform in-place mutation, rollback on error, invalidate on settle
  - Favourites: add/remove with optimistic array update and rollback
- Normalization functions inside service layer (e.g., `normalizeLine`, `normalizePayload` in `cartApi.ts`, `normalizeProfile` in `profileApi.ts`) minimize UI conditionals

## Data / Domain Modules
### Cart (`services/cartApi.ts` + `useCart`)
- Distinguishes between raw server lines and normalized `CartProductLine`
- Provides helpers for optimistic increment, update, remove, clear, checkout
- Resolves item detail IDs from query cache to avoid extra network round trips

### Favourites (`services/favouritesApi.ts` + `useFavourites`)
- Fetch returns composite `{ favouritesId, products: FavouriteProduct[] }`
- Toggle operation attempts add then fallback to remove logic if conflict
- Normalization accounts for varied backend field names (id/title, imageUrl/photo/image)

### Orders (`services/ordersApi.ts` + `useOrders`)
- Abstracts list fetching, details fetch, status update & delete
- Supports pagination & filtering via URLSearchParams

### Bookings (`services/bookingsApi.ts`, `bookApi.ts`)
- `submitBook` composes ISO timestamp from date + time selectors
- Distinct status lifecycle: PENDING -> CONFIRMED / CANCELLED / etc.

### Profile (`services/profileApi.ts`, `useProfile`)
- Normalizes user profile fields merging multiple potential backend keys
- Mutation hook manages update operations (query hook placeholder currently minimal)

### OTP (`otpApi.ts`, `useOtp.ts`)
- Basic verify + resend endpoints (hook currently empty -> extension point)

## UI Layer Patterns
- Compound component patterns beginning to form (e.g., `HeroSplit`, `Card` with subcomponents)
- `Section` acts as a semantic layout wrapper for vertical spacing & titles
- `GridContainer` centralizes responsive grid logic (custom wrapper around bootstrap classes)
- Icons + Roundel provide thematic consistent iconography blocks

## Type Strategy
- Explicit domain types inside service modules (e.g., `Order`, `Booking`, `CartPayload`, `FavouriteProduct`)
- Defensive indexing `[key: string]: unknown` to allow forward-compatible augmentation without breaking compile
- Union types for statuses (OrderStatus, BookingStatus) constrain valid transitions in TS-aware code paths
- Route path union (`AppRoutePath`) prevents typos & enables IDE completion

## Error Handling & Resilience
- Axios interceptors unify auth error handling
- Optimistic mutations capture and rollback previous cache snapshots
- Service normalization converts malformed / partial backend responses into predictable shapes (ensuring components can rely on presence of certain keys)
- Hooks gate queries via `enabled` flags requiring presence of both user and token to avoid unauthorized calls

## Environment & Configuration
- API base URL from `import.meta.env.VITE_API_URL`
- React Query default stale & GC times tuned for moderate caching (5m stale / 10m GC) then overridden per hook when needed (cart & favourites = Infinity to keep instantaneous UX)

## Extensibility Points
| Concern | Current State | Extension Ideas |
|---------|---------------|-----------------|
| Authorization Guards | Routes rely on presence of context; fine-grained route protection not yet in router tree | Introduce loader or wrapper components to redirect unauthenticated users / enforce admin role |
| Error Boundaries | Not implemented at page / route level | Add React Error Boundary per layout to isolate failures |
| State Persistence | Auth only in memory (lost on refresh) | Persist authState (token, user) to secure storage & rehydrate |
| Theming | Theme context & css present, limited description here | Expand with design tokens & CSS variables orchestrated via context |
| Testing | No tests surfaced | Add unit tests for normalization functions & hooks (React Testing Library + MSW) |
| Accessibility | Basic semantic HTML / aria attributes sporadic | Perform a11y audit; add roles, focus management on modals / dynamic content |
| Performance | Large page components (e.g., `MenuPage`) eagerly load many SVGs | Code-split route components; lazy-load admin & heavy marketing sections |

## Notable Design Decisions
1. Context-per-route-root instead of single top-level provider allows potential future scoping (though duplicates provider logic if nested). Simplicity currently outweighs overhead.
2. Normalization & defensive typing mitigate backend inconsistency risk, reducing UI conditional complexity.
3. Optimistic updates chosen for cart/favourites to deliver instant UX and minimize network chatter.
4. React Query Infinity `staleTime` for cart/favourites ensures stable derived sets; manual invalidation keeps them fresh post-mutation.
5. Use of union literal types for statuses + route paths improves compile-time safety without over-engineering full schema generation.

## Suggested Future Improvements
- Introduce a centralized API error translator -> user-friendly toasts / notifications
- Add Suspense boundaries & skeleton loaders for above-the-fold content
- Implement route-based code splitting with `lazy()` + `Suspense` wrappers
- Promote consistent design system: extract spacing, color tokens into a TS-enforced theme module
- Add Zod or similar schema validation to harden normalization layer against unexpected backend shapes
- Implement optimistic checkout state & order creation feedback flow
- Expand `useOtp` to manage lifecycle (countdown, resend throttle, error states)
- Add analytics events (cart add/remove, favourite toggle, booking submit)

## User Feedback & Toast Notifications
Implemented lightweight global notification layer using `react-toastify`.

Mount Point:
- `App.tsx`: `<ToastContainer />` with colored theme, top-right position, 3s auto close.

Current Coverage:
- Auth (`AuthProvider`): login success/failure, logout, token refresh success, session expiry warning.
- Cart (`useCart`): add, update, remove, clear, checkout (success & error states).
- Favourites (`useFavourites`): add/remove success & failure.
- Profile (`useProfile` + `ProfilePage`): profile update success/failure.
- OTP (`OtpPage`): verification success (with redirect) & failure.
- Orders (`useOrders`): (placeholder – basic query errors currently surface via UI; toast hooks ready for extension).

Refactors:
- Replaced inline success/error alert blocks in `AuthLogin` & `AuthRegister` with toasts for consistency and reduced DOM noise.

Pattern:
- Mutations: use `onSuccess` / `onError` callbacks to trigger concise, user-friendly messages.
- Queries (future): wrap high-level failures in a shared utility (e.g., `notifyQueryError(key, error)`).
- Keep messages short; avoid leaking raw server error objects—map or sanitize before display.

Extending:
1. Import `toast` from `react-toastify` inside the hook / component.
2. Add feedback in `onSuccess` / `onError` or after optimistic rollback.
3. Prefer centralized translation layer (planned) for repeated backend error codes.

Accessibility:
- `react-toastify` handles `aria-live` region by default; ensure messages are brief.

Performance:
- Toast bundle is small; single import. Avoid dynamic creation of multiple containers.

Testing (future):
- Abstract toast calls behind a tiny wrapper (e.g., `src/lib/toast.ts`) to mock in tests.

## File / Directory Summary
- `src/services/`: Pure data access + transformation
- `src/hooks/`: Domain-specific composition of services + react-query + context
- `src/stores/AuthContext/`: Auth state container & helper hook
- `src/pages/`: Route boundary components orchestrating features
- `src/components/`: Reusable UI primitives & feature widgets
- `src/utils/routes/`: Central routing configuration & path typing
- `src/lib/`: Cross-cutting singletons (react-query client)
- `src/theme/`: Theme context, global CSS, tokens (initial scaffolding)

## Data Flow (Example: Add Product to Cart)
1. User clicks Add to Cart in `MenuPage`
2. `useCart().addToCart(productId)` triggers `add` mutation
3. `onMutate` cancels in-flight cart query, snapshots previous state, applies optimistic item addition / quantity increment
4. UI re-renders instantly with updated cart badge / state
5. Server response settles -> query invalidated -> refetch ensures canonical server state
6. On error -> rollback to snapshot to prevent inconsistent UI

## Security / Auth Considerations
- Bearer token attached only when present; refresh logic ensures session continuity
- Lacks CSRF protection (assuming same-site cookies for refresh endpoint; access token likely in memory)
- No explicit role-based component guards yet (admin pages rely on eventual server-side enforcement)

## Performance Considerations
- Potential over-rendering from large prop objects (could memoize derived sets in `MenuPage` already using `useMemo`)
- Heavy static asset imports (PNG) could benefit from responsive `<img srcSet>` or dynamic import strategy
- Large inline SVG blocks may inflate initial bundle; consider sprite or lazy strategy

## Conclusion
This codebase establishes a clear layered architecture: routing → context/state → service APIs → domain hooks → presentation. Emphasis on normalization and optimistic updates supports resilience against backend variability while delivering responsive UX. Future work can focus on code-splitting, stronger guarding & validation, and introducing a unified design system & testing strategy.
