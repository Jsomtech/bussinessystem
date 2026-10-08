import { supabaseAdmin } from '../config/supabase.js';
import { env } from '../config/env.js';

const notConfigured = !env.supabaseUrl || env.supabaseUrl.includes('your-project');

// All reads/writes are forced through the caller's business_id — never trust
// a business_id present in the request body.
export function createResourceRepository(table) {
  return {
    async list(businessId) {
      if (notConfigured) return [];
      const { data, error } = await supabaseAdmin.from(table).select('*').eq('business_id', businessId).limit(100);
      if (error) throw error;
      return data;
    },
    async get(businessId, id) {
      if (notConfigured) return { id, business_id: businessId };
      const { data, error } = await supabaseAdmin.from(table).select('*').eq('business_id', businessId).eq('id', id).single();
      if (error) throw error;
      return data;
    },
    async create(businessId, payload) {
      if (notConfigured) return { id: crypto.randomUUID(), business_id: businessId, ...payload };
      const { data, error } = await supabaseAdmin.from(table).insert({ ...payload, business_id: businessId }).select().single();
      if (error) throw error;
      return data;
    },
    async update(businessId, id, payload) {
      if (notConfigured) return { id, business_id: businessId, ...payload };
      const { data, error } = await supabaseAdmin.from(table).update(payload).eq('business_id', businessId).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    async remove(businessId, id) {
      if (notConfigured) return { id };
      const { error } = await supabaseAdmin.from(table).delete().eq('business_id', businessId).eq('id', id);
      if (error) throw error;
      return { id };
    },
  };
}
