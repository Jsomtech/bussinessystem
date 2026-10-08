import { supabaseAdmin } from '../../config/supabase.js';
import { env } from '../../config/env.js';

// Tenant-scoped upload path: businesses/{businessId}/products/{productId}/{file}
export async function uploadProductImage(businessId, productId, fileName, fileBuffer, contentType) {
  const path = `businesses/${businessId}/products/${productId}/${fileName}`;
  const { error } = await supabaseAdmin.storage
    .from(env.storageBucket)
    .upload(path, fileBuffer, { contentType, upsert: true });
  if (error) throw new Error(error.message);
  return path;
}
