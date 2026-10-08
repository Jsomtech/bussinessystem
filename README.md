# J-Som Business — SaaS Business Operating System

Multi-tenant SaaS platform for Somali businesses: inventory, sales, purchasing, customer credit, expenses, cash flow, reporting, SMS communication and subscription management.

## Structure

```text
client/     React + Vite + Tailwind + Bootstrap frontend
server/     Node.js + Express REST API
supabase/   PostgreSQL schema + RLS policies
docs/       Technical specification
```

## Quick start

```bash
npm run install:all
# copy env examples
cp server/.env.example server/.env
# start API
npm run dev:server
# start frontend
npm run dev:client
```

- API: http://localhost:5000/api/v1
- Web: http://localhost:5173

## Database

Run these in the Supabase SQL editor, in order:

1. `supabase/schema.sql`
2. `supabase/rls.sql`

RLS is applied to every tenant-owned table — a business can only see its own rows.

## Architecture

Every business-owned row belongs to `business_id`. Users belong to a tenant via `business_members`. Every request is checked through:

**Identity → Tenant → Role → Permission → Subscription entitlement → Data**

The browser never supplies the authoritative `business_id` — the server resolves the caller's tenant from the verified Supabase JWT.
