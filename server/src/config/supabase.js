import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Server-side client with the service role key — NEVER expose this to the browser.
// All tenant isolation is enforced by RLS + the business_id checks in our queries.
export const supabaseAdmin = createClient(env.supabaseUrl || 'http://localhost:54321', env.supabaseServiceKey || 'service-key', {
  auth: { persistSession: false },
});
