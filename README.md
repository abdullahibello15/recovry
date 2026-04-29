# Fund Recovery Website

This is a code bundle for Fund Recovery Website. The original project is available at https://github.com/abdullahi15

## Completion Checklist

### 1. Authentication and access control
- [x] Replace hardcoded frontend-only login with API-backed login and logout
- [x] Restore an existing session on page refresh
- [x] Attach auth tokens to API requests
- [x] Add client self-service signup
- [x] Store seeded and newly-created passwords as `scrypt` hashes instead of plaintext
- [ ] Enforce role-aware redirects for admin and client users throughout the portal
- [ ] Move from demo credentials to managed user onboarding and password reset

### 2. Backend and data persistence
- [x] Keep admin records, messages, and portal actions behind authenticated API routes
- [x] Add validated endpoints for contact and consultation form submissions
- [ ] Store leads, inquiries, and uploaded evidence in a durable database instead of `server/db.json`
- [ ] Add audit fields for created/updated timestamps across mutable records
- [ ] Add server-side input validation and standardized error responses

### 3. Forms and user flows
- [x] Connect the public contact form to the backend
- [x] Connect the free consultation form to the backend
- [ ] Add inline validation, submit states, success states, and failure recovery for every form
- [ ] Prevent empty or malformed admin record submissions with visible feedback

### 4. Product readiness
- [ ] Replace placeholder phone numbers, address, policy links, and trust metrics with real business data
- [ ] Add Privacy Policy and Terms pages
- [ ] Review legal/disclaimer copy for consistency across public pages
- [ ] Update the homepage and portal copy so admin/client entry points are clearer

### 5. Quality and testing
- [x] Add a TypeScript config and type-check script
- [ ] Add automated tests for auth, protected routes, admin records, and messaging flows
- [ ] Add smoke coverage for the public pages and form submissions

### 6. Deployment and operations
- [x] Document local setup for both the Vite app and API server
- [x] Add environment variable documentation for `VITE_API_BASE_URL` and API port configuration
- [ ] Prepare a production deployment target for the frontend and backend
- [ ] Reduce the large Vite bundle warning by splitting portal/admin code paths

## Current Priority

The current implementation pass has moved the app closer to production readiness by adding password hashing, TypeScript checking, and local setup documentation. The next best step is separating client-specific case/message data so each signed-in client only sees their own records.

## Local Setup

Install dependencies:

```bash
npm install
```

Start the API server:

```bash
npm run api
```

In a second terminal, start the Vite app:

```bash
npm run dev
```

Run quality checks:

```bash
npm run typecheck
npm run build
```

## Environment Variables

- `API_PORT`: Optional backend port. Defaults to `8787`.
- `VITE_API_BASE_URL`: Optional frontend API base URL. Defaults to `/api`, which Vite proxies to `http://localhost:8787` during local development.

## Seed Access

These credentials are for local development only. Passwords are stored as `scrypt` hashes in `server/db.json`; rotate or remove all seed users before production use.

- Admin login: `admin@fundrecovery.com` / `FR-Admin-2026!`
- Client seed login: `client@fundrecovery.com` / `client123`
- Client signup page: `/signup`
