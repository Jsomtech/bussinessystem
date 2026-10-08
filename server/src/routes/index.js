import { Router } from 'express';
import { requireAuth, requireUser, requireBusiness, requirePlatformAdmin } from '../middleware/auth.js';
import { resourceRouter } from './resourceRouter.js';
import { getSmsProvider } from '../integrations/sms/index.js';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// Onboarding bootstrap — creates the tenant + owner membership (first login).
router.post('/onboarding/bootstrap', requireUser, async (req, res, next) => {
  try {
    const { businessName, businessType, plan } = req.body;
    if (!businessName) return res.status(400).json({ error: 'businessName is required' });

    const { data: existing } = await supabaseAdmin
      .from('business_members').select('business_id').eq('user_id', req.user.id).limit(1);
    if (existing?.length) return res.json({ businessId: existing[0].business_id, already: true });

    const { data: biz, error: bErr } = await supabaseAdmin
      .from('businesses').insert({ name: businessName, type: businessType }).select().single();
    if (bErr) throw bErr;

    await supabaseAdmin.from('business_settings').insert({ business_id: biz.id });
    await supabaseAdmin.from('business_members').insert({ business_id: biz.id, user_id: req.user.id, role: 'BUSINESS_OWNER' });

    const { data: starterPlan } = await supabaseAdmin.from('plans').select('id').eq('name', plan || 'Free / Trial');
    if (starterPlan && starterPlan[0]) {
      await supabaseAdmin.from('subscriptions').insert({ business_id: biz.id, plan_id: starterPlan[0].id, status: 'trial' });
    } else {
      await supabaseAdmin.from('subscriptions').insert({ business_id: biz.id, status: 'trial' });
    }
    res.status(201).json({ businessId: biz.id });
  } catch (e) { next(e); }
});

router.use((req, res, next) => (req.path.startsWith('/admin') ? next() : requireBusiness(req, res, next)));

// Business-owned resources — all tenant-scoped via req.businessId
router.use('/products', resourceRouter('products'));
router.use('/categories', resourceRouter('categories'));
router.use('/brands', resourceRouter('brands'));
router.use('/customers', resourceRouter('customers'));
router.use('/suppliers', resourceRouter('suppliers'));
router.use('/sales', resourceRouter('sales'));
router.use('/purchases', resourceRouter('purchases'));
router.use('/expenses', resourceRouter('expenses'));
router.use('/payments', resourceRouter('payments'));
router.use('/inventory', resourceRouter('inventory_transactions'));
router.use('/credit', resourceRouter('customer_credit'));
router.use('/notifications', resourceRouter('notifications'));

// Employees — business owner/admin manages staff
router.get('/employees', async (req, res, next) => {
  try {
    const { data: members, error } = await supabaseAdmin
      .from('business_members').select('id, user_id, role, created_at').eq('business_id', req.businessId);
    if (error) throw error;
    const out = [];
    for (const m of members || []) {
      const { data: u } = await supabaseAdmin.auth.admin.getUserById(m.user_id);
      out.push({ id: m.id, user_id: m.user_id, email: u.user?.email, role: m.role, created_at: m.created_at });
    }
    res.json(out);
  } catch (e) { next(e); }
});

router.post('/employees', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    // find existing auth user by email
    const { data: list } = await supabaseAdmin.auth.admin.listUsers();
    let user = list.users.find((u) => u.email === email);
    if (!user) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({ email, password, email_confirm: true });
      if (error) throw error;
      user = data.user;
    }

    const { data: member, error: mErr } = await supabaseAdmin
      .from('business_members')
      .insert({ business_id: req.businessId, user_id: user.id, role: role || 'EMPLOYEE' })
      .select().single();
    if (mErr) throw mErr;
    res.status(201).json({ ...member, email: user.email });
  } catch (e) { next(e); }
});

router.delete('/employees/:id', async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('business_members').delete().eq('id', req.params.id).eq('business_id', req.businessId);
    if (error) throw error;
    res.json({ id: req.params.id });
  } catch (e) { next(e); }
});

// Business settings
router.get('/businesses/me', (req, res) => res.json({ businessId: req.businessId, role: req.role }));

// Subscriptions & plans (read-oriented stubs)
router.get('/plans', (req, res) => res.json(['free', 'starter', 'business', 'enterprise']));
router.get('/subscriptions/current', (req, res) => res.json({ businessId: req.businessId, plan: 'trial' }));

// Reports summary — real numbers from the database
router.get('/reports/summary', async (req, res, next) => {
  try {
    const bid = req.businessId;

    const [salesRes, expensesRes, productsRes, customersRes] = await Promise.all([
      supabaseAdmin.from('sales').select('total,paid,balance,created_at').eq('business_id', bid),
      supabaseAdmin.from('expenses').select('amount,created_at').eq('business_id', bid),
      supabaseAdmin.from('products').select('stock_quantity,purchase_price').eq('business_id', bid),
      supabaseAdmin.from('customers').select('balance').eq('business_id', bid),
    ]);
    if (salesRes.error) throw salesRes.error;
    if (expensesRes.error) throw expensesRes.error;

    const today = new Date().toDateString();
    const sum = (arr, f) => arr.reduce((s, r) => s + Number(r[f] || 0), 0);
    const isToday = (r) => new Date(r.created_at).toDateString() === today;

    res.json({
      businessId: bid,
      todaySales: sum((salesRes.data || []).filter(isToday), 'total'),
      todayProfit: 0,
      outstandingDebt: sum(customersRes.data || [], 'balance'),
      stockValue: (productsRes.data || []).reduce((s, p) => s + Number(p.stock_quantity || 0) * Number(p.purchase_price || 0), 0),
      expenses: sum((expensesRes.data || []).filter(isToday), 'amount'),
    });
  } catch (e) { next(e); }
});

// SMS send
router.post('/sms/send', async (req, res, next) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) return res.status(400).json({ error: 'to and message are required' });
    res.json(await getSmsProvider().send({ to, message }));
  } catch (e) { next(e); }
});

// Admin namespace — super admin roles only
const admin = Router();
admin.use(requirePlatformAdmin);
admin.use('/businesses', resourceRouter('businesses', { unscoped: true }));
router.use('/admin', admin);

export default router;
