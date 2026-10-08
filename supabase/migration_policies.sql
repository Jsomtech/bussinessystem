-- Run once if you already applied the original rls.sql
create policy "members_select_own" on business_members for select using (user_id = auth.uid());
create policy "members_insert_own" on business_members for insert with check (user_id = auth.uid());
create policy "platform_admins_select_own" on platform_admins for select using (user_id = auth.uid());
