import { supabaseAdmin } from '../config/supabase.js';
import { env } from '../config/env.js';

// All reads/writes are forced through the caller's business_id — never trust
// a business_id present in the request body. Everything goes straight to the database.
export function createResourceRepository(table, { unscoped = false } = {}) {
  const scope = (q, businessId) => (unscoped ? q : q.eq('business_id', businessId));
  return {
    async list(businessId) {
      const { data, error } = await scope(supabaseAdmin.from(table).select('*'), businessId).limit(100);
      if (error) throw error;
      return data;
    },
    async get(businessId, id) {
      const { data, error } = await scope(supabaseAdmin.from(table).select('*'), businessId).eq('id', id).single();
      if (error) throw error;
      return data;
    },
    async create(businessId, payload) {
      const row = unscoped ? payload : { ...payload, business_id: businessId };
      const { data, error } = await supabaseAdmin.from(table).insert(row).select().single();
      if (error) throw error;
      return data;
    },
    async update(businessId, id, payload) {
      const { data, error } = await scope(supabaseAdmin.from(table).update(payload), businessId).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    async remove(businessId, id) {
      const { error } = await scope(supabaseAdmin.from(table).delete(), businessId).eq('id', id);
      if (error) throw error;
      return { id };
    },
  };
}
