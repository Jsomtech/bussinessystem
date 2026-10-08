import { supabaseAdmin } from '../config/supabase.js';
import { env } from '../config/env.js';

// Verifies JWT and attaches req.user — but does NOT require membership (used for onboarding bootstrap).
export async function requireUser(req, res, next) {
  try {
    if (env.mockAuth) {
      req.user = { id: req.header('x-user-id') || '00000000-0000-0000-0000-000000000001' };
      return next();
    }
    const token = req.headers.authorization?.replace(/^Bearer /, '');
    if (!token) return res.status(401).json({ error: 'Missing Authorization header' });
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ error: 'Invalid token' });
    req.user = data.user;
    next();
  } catch (err) { next(err); }
}

async function attachIdentity(req) {
  // platform admin check first
  const { data: admin } = await supabaseAdmin
    .from('platform_admins').select('role').eq('user_id', req.user.id).maybeSingle();
  if (admin) {
    req.isPlatformAdmin = true;
    req.role = admin.role;
    return;
  }
  const { data: membership } = await supabaseAdmin
    .from('business_members').select('business_id, role').eq('user_id', req.user.id).limit(1).maybeSingle();
  if (membership) {
    req.businessId = membership.business_id;
    req.role = membership.role;
  }
}

// Any authenticated user — attaches businessId/role/isPlatformAdmin when present.
export async function requireAuth(req, res, next) {
  try {
    if (env.mockAuth) {
      req.user = { id: '00000000-0000-0000-0000-000000000001' };
      req.businessId = req.header('x-business-id') || 'demo-business';
      req.role = 'BUSINESS_OWNER';
      return next();
    }
    const token = req.headers.authorization?.replace(/^Bearer /, '');
    if (!token) return res.status(401).json({ error: 'Missing Authorization header' });
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ error: 'Invalid token' });
    req.user = data.user;
    await attachIdentity(req);
    next();
  } catch (err) { next(err); }
}

// Tenant member required (business modules).
export async function requireBusiness(req, res, next) {
  await requireAuth(req, res, () => {
    if (!req.businessId) return res.status(403).json({ error: 'No business membership' });
    next();
  });
}

// Platform admin required (super admin modules).
export async function requirePlatformAdmin(req, res, next) {
  await requireAuth(req, res, () => {
    if (!req.isPlatformAdmin) return res.status(403).json({ error: 'Super Admin role required' });
    next();
  });
}
