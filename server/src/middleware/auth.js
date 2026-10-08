import { supabaseAdmin } from '../config/supabase.js';
import { env } from '../config/env.js';

// Verifies the Supabase JWT, resolves the caller's active business from
// business_members, and attaches { user, businessId, role } to the request.
// The client CANNOT be trusted to send business_id — we always derive it here.
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

    const { data: membership, error: mErr } = await supabaseAdmin
      .from('business_members')
      .select('business_id, role')
      .eq('user_id', data.user.id)
      .limit(1)
      .single();

    if (mErr || !membership) return res.status(403).json({ error: 'No business membership' });

    req.businessId = membership.business_id;
    req.role = membership.role;
    next();
  } catch (err) {
    next(err);
  }
}
