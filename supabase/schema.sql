-- J-Som Business — multi-tenant schema
-- Run BEFORE rls.sql

create extension if not exists "pgcrypto";

create type platform_role as enum ('SUPER_ADMIN','PLATFORM_SUPPORT','PLATFORM_FINANCE','PLATFORM_MANAGER');
create type business_role as enum ('BUSINESS_OWNER','BUSINESS_ADMIN','MANAGER','ACCOUNTANT','CASHIER','SALES_AGENT','INVENTORY_MANAGER','EMPLOYEE');

-- TENANTS
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  logo_url text,
  phone text,
  email text,
  address text,
  created_at timestamptz default now()
);

create table if not exists business_settings (
  business_id uuid primary key references businesses(id) on delete cascade,
  currency text default 'USD',
  timezone text default 'Africa/Mogadishu',
  tax_rate numeric(5,2) default 0,
  primary_color text default '#002244',
  created_at timestamptz default now()
);

create table if not exists branches (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  address text,
  created_at timestamptz default now()
);

create table if not exists warehouses (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  branch_id uuid references branches(id),
  name text not null,
  created_at timestamptz default now()
);

-- AUTH / MEMBERSHIP
create table if not exists business_members (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  user_id uuid not null, -- auth.users.id
  role business_role not null default 'EMPLOYEE',
  created_at timestamptz default now(),
  unique (business_id, user_id)
);

create table if not exists platform_admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  role platform_role not null default 'PLATFORM_SUPPORT',
  created_at timestamptz default now()
);

-- SUBSCRIPTIONS
create table if not exists plans (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  monthly_price numeric(10,2) default 0,
  yearly_price numeric(10,2) default 0,
  created_at timestamptz default now()
);

create table if not exists plan_features (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references plans(id) on delete cascade,
  feature text not null,
  enabled boolean default false,
  unique (plan_id, feature)
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  plan_id uuid references plans(id),
  status text default 'trial', -- trial | active | expired | suspended
  period_start timestamptz default now(),
  period_end timestamptz,
  created_at timestamptz default now()
);

create table if not exists subscription_payments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  subscription_id uuid references subscriptions(id),
  amount numeric(10,2),
  method text,
  status text default 'pending',
  paid_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists feature_usage (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  feature text not null,
  count integer default 0,
  period text,
  created_at timestamptz default now()
);

-- CATALOG
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  sku text,
  barcode text,
  name text not null,
  description text,
  category_id uuid references categories(id),
  brand_id uuid references brands(id),
  unit text default 'pcs',
  purchase_price numeric(12,2) default 0,
  selling_price numeric(12,2) default 0,
  wholesale_price numeric(12,2),
  min_stock integer default 0,
  stock_quantity integer default 0,
  tax_rate numeric(5,2) default 0,
  status text default 'active',
  expiry_date date,
  warehouse_id uuid references warehouses(id),
  created_at timestamptz default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  url text not null,
  position integer default 0,
  created_at timestamptz default now()
);

create table if not exists inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  product_id uuid references products(id),
  type text not null, -- in | out | adjustment | damaged | returned | transfer
  quantity integer not null,
  note text,
  created_by uuid,
  created_at timestamptz default now()
);

-- PARTIES
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  address text,
  balance numeric(12,2) default 0,
  created_at timestamptz default now()
);

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  address text,
  balance numeric(12,2) default 0,
  created_at timestamptz default now()
);

-- SALES / PURCHASES / FINANCE
create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  invoice_number text,
  customer_id uuid references customers(id),
  subtotal numeric(12,2) default 0,
  discount numeric(12,2) default 0,
  tax numeric(12,2) default 0,
  total numeric(12,2) default 0,
  paid numeric(12,2) default 0,
  balance numeric(12,2) default 0,
  payment_method text,
  seller_id uuid,
  status text default 'completed',
  created_at timestamptz default now()
);

create table if not exists sale_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  sale_id uuid references sales(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null,
  price numeric(12,2) not null,
  created_at timestamptz default now()
);

create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  supplier_id uuid references suppliers(id),
  total numeric(12,2) default 0,
  paid numeric(12,2) default 0,
  status text default 'completed',
  created_at timestamptz default now()
);

create table if not exists purchase_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  purchase_id uuid references purchases(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null,
  price numeric(12,2) not null,
  created_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  direction text not null, -- in | out
  party text, -- customer | supplier
  party_id uuid,
  amount numeric(12,2) not null,
  method text,
  reference text,
  created_at timestamptz default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  category text,
  amount numeric(12,2) not null,
  note text,
  created_at timestamptz default now()
);

-- COMMUNICATION
create table if not exists sms_templates (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text,
  body text not null,
  created_at timestamptz default now()
);

create table if not exists sms_messages (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  to_phone text not null,
  body text not null,
  status text default 'queued',
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  type text,
  title text,
  body text,
  read boolean default false,
  created_at timestamptz default now()
);

-- SYSTEM
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid,
  actor_id uuid,
  action text,
  entity text,
  before jsonb,
  after jsonb,
  created_at timestamptz default now()
);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id),
  subject text,
  body text,
  status text default 'open',
  created_at timestamptz default now()
);

create table if not exists platform_settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

-- Helpful indexes for tenant scoping
create index if not exists idx_products_business on products(business_id);
create index if not exists idx_sales_business on sales(business_id);
create index if not exists idx_customers_business on customers(business_id);
create index if not exists idx_suppliers_business on suppliers(business_id);
create index if not exists idx_inventory_business on inventory_transactions(business_id);
create index if not exists idx_members_user on business_members(user_id);
