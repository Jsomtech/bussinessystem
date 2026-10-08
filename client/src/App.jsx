import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import BusinessLayout from './layouts/BusinessLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Onboarding from './pages/Onboarding.jsx';
import * as B from './pages/business/BusinessPages.jsx';
import * as A from './pages/admin/AdminPages.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>

      <Route element={<BusinessLayout />}>
        <Route path="/app" element={<B.Overview />} />
        <Route path="/app/sales" element={<B.Sales />} />
        <Route path="/app/purchases" element={<B.Purchases />} />
        <Route path="/app/products" element={<B.Products />} />
        <Route path="/app/inventory" element={<B.Inventory />} />
        <Route path="/app/customers" element={<B.Customers />} />
        <Route path="/app/suppliers" element={<B.Suppliers />} />
        <Route path="/app/credit" element={<B.Credit />} />
        <Route path="/app/expenses" element={<B.Expenses />} />
        <Route path="/app/employees" element={<B.Employees />} />
        <Route path="/app/pos" element={<B.POS />} />
        <Route path="/app/payments" element={<B.Payments />} />
        <Route path="/app/reports" element={<B.Reports />} />
        <Route path="/app/sms" element={<B.SMS />} />
        <Route path="/app/notifications" element={<B.Notifications />} />
        <Route path="/app/settings" element={<B.Settings />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<A.AdminDashboard />} />
        <Route path="/admin/businesses" element={<A.Businesses />} />
        <Route path="/admin/users" element={<A.Users />} />
        <Route path="/admin/subscriptions" element={<A.Subscriptions />} />
        <Route path="/admin/plans" element={<A.Plans />} />
        <Route path="/admin/payments" element={<A.AdminPayments />} />
        <Route path="/admin/sms" element={<A.AdminSMS />} />
        <Route path="/admin/analytics" element={<A.Analytics />} />
        <Route path="/admin/tickets" element={<A.Tickets />} />
        <Route path="/admin/notifications" element={<A.AdminNotifications />} />
        <Route path="/admin/audit-logs" element={<A.AuditLogs />} />
        <Route path="/admin/config" element={<A.Config />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
