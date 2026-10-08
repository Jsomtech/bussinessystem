# Technical Specification (Blueprint)

## 1. Levels

- Platform (Super Admin) — owns plans, billing, platform settings, support, audit.
- Tenant (Business) — isolated workspace: sales, inventory, customers, finance, POS, SMS.
- User — belongs to a tenant via `business_members` with a granular role.

## 2. Authorization chain

`Identity (Supabase JWT) → Tenant (business_members) → Role → Permission → Subscription entitlement → Data (RLS)`

Never trust a client-supplied `business_id`. The server derives `req.businessId` from the verified JWT.

## 3. Key tables (see supabase/schema.sql)

- Tenancy: `businesses`, `business_settings`, `branches`, `warehouses`, `business_members`
- Subscriptions: `plans`, `plan_features`, `subscriptions`, `subscription_payments`, `feature_usage`
- Catalog: `categories`, `brands`, `products`, `product_images`, `inventory_transactions`
- Parties: `customers`, `suppliers`
- Commerce: `sales`, `sale_items`, `purchases`, `purchase_items`, `payments`, `expenses`
- Communication: `sms_templates`, `sms_messages`, `notifications`
- System: `audit_logs`, `support_tickets`, `platform_settings`

## 4. API

Base: `/api/v1` — see `server/src/routes/index.js`. All authenticated routes are tenant-scoped.

## 5. React structure

- `layouts/` — Public, Business, Admin shells with sidebar navigation.
- `pages/` — Landing, Login, Register, Onboarding, business modules, admin modules.
- `api/client.js` — axios instance that attaches the Supabase JWT.
- `lib/supabase.js` — browser Supabase client (anon key only).

## 6. Integrations

- SMS: `SmsProvider` → `HormuudProvider` / `MockProvider` (swap later without touching routes).
- Payments: EVC initiate/verify — kept separate from customer payment recording.
- Storage: tenant-scoped paths `businesses/{businessId}/products/{productId}/`.

## 7. Roadmap

1. Foundation (auth, tenancy, RBAC, dashboard) — skeleton done
2. Core business (products, inventory, sales, purchases)
3. Money (payments, expenses, credit, reports)
4. Communication (SMS, reminders, notifications)
5. SaaS billing (plans, subscriptions, entitlements, trial/suspension)
6. Super Admin (management, analytics, support, audit)
7. Advanced (POS hardening, branches, warehouses, PWA/offline, AI assistant)
