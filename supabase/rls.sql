-- Row Level Security — run AFTER schema.sql
-- Rule: a user only sees rows belonging to a business they are a member of.

create or replace function public.is_member(b uuid)
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from public.business_members
    where business_id = b and user_id = auth.uid()
  );
$$;

-- Enable RLS on every tenant-owned table
alter table businesses enable row level security;
alter table business_settings enable row level security;
alter table branches enable row level security;
alter table warehouses enable row level security;
alter table business_members enable row level security;
alter table platform_admins enable row level security;
alter table plans enable row level security;
alter table plan_features enable row level security;
alter table subscriptions enable row level security;
alter table subscription_payments enable row level security;
alter table feature_usage enable row level security;
alter table categories enable row level security;
alter table brands enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table inventory_transactions enable row level security;
alter table customers enable row level security;
alter table suppliers enable row level security;
alter table sales enable row level security;
alter table sale_items enable row level security;
alter table purchases enable row level security;
alter table purchase_items enable row level security;
alter table payments enable row level security;
alter table expenses enable row level security;
alter table sms_templates enable row level security;
alter table sms_messages enable row level security;
alter table notifications enable row level security;
alter table audit_logs enable row level security;
alter table support_tickets enable row level security;

-- Generic per-table policies: business_id rows only for members
do $$
declare t text;
declare tables text[] := array[
  'business_settings','branches','warehouses','business_members','subscriptions',
  'subscription_payments','feature_usage','categories','brands','products',
  'product_images','inventory_transactions','customers','suppliers','sales',
  'sale_items','purchases','purchase_items','payments','expenses',
  'sms_templates','sms_messages','notifications'
];
begin
  foreach t in array tables loop
    execute format('drop policy if exists "tenant_select" on %I', t);
    execute format('create policy "tenant_select" on %I for select using (is_member(business_id))', t);
    execute format('drop policy if exists "tenant_insert" on %I', t);
    execute format('create policy "tenant_insert" on %I for insert with check (is_member(business_id))', t);
    execute format('drop policy if exists "tenant_update" on %I', t);
    execute format('create policy "tenant_update" on %I for update using (is_member(business_id))', t);
    execute format('drop policy if exists "tenant_delete" on %I', t);
    execute format('create policy "tenant_delete" on %I for delete using (is_member(business_id))', t);
  end loop;
end $$;

-- businesses: members can read their own business
create policy "business_select" on businesses for select using (is_member(id));
create policy "business_insert" on businesses for insert with check (true);
create policy "business_update" on businesses for update using (is_member(id));

-- business_members: members see their own memberships
create policy "members_select" on business_members for select using (is_member(business_id));

-- plans are public read
create policy "plans_select" on plans for select using (true);
create policy "plan_features_select" on plan_features for select using (true);

-- audit logs: read-only for members, writes via service role
create policy "audit_select" on audit_logs for select using (is_member(business_id));

-- a user may see their own memberships and create their own first membership
-- (service role normally handles bootstrap; this is a safety fallback)
create policy "members_select_own" on business_members for select using (user_id = auth.uid());
create policy "members_insert_own" on business_members for insert with check (user_id = auth.uid());

create policy "platform_admins_select_own" on platform_admins for select using (user_id = auth.uid());
