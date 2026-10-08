import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { resourceRouter } from './resourceRouter.js';
import { getSmsProvider } from '../integrations/sms/index.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

router.use(requireAuth);

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

// Business settings
router.get('/businesses/me', (req, res) => res.json({ businessId: req.businessId, role: req.role }));

// Subscriptions & plans (read-oriented stubs)
router.get('/plans', (req, res) => res.json(['free', 'starter', 'business', 'enterprise']));
router.get('/subscriptions/current', (req, res) => res.json({ businessId: req.businessId, plan: 'trial' }));

// Reports stub
router.get('/reports/summary', (req, res) =>
  res.json({ businessId: req.businessId, todaySales: 0, todayProfit: 0, outstandingDebt: 0, stockValue: 0, expenses: 0 }),
);

// SMS send
router.post('/sms/send', async (req, res, next) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) return res.status(400).json({ error: 'to and message are required' });
    res.json(await getSmsProvider().send({ to, message }));
  } catch (e) { next(e); }
});

// Admin namespace (TODO: require PLATFORM_* roles)
const admin = Router();
admin.use('/businesses', resourceRouter('businesses'));
router.use('/admin', admin);

export default router;
