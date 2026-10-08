import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, CreditCard, Package, Banknote,
  MessageSquare, BarChart3, LifeBuoy, Bell, ScrollText, SlidersHorizontal,
} from 'lucide-react';

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/businesses', label: 'Businesses', icon: Building2 },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { to: '/admin/plans', label: 'Plans', icon: Package },
  { to: '/admin/payments', label: 'Payments', icon: Banknote },
  { to: '/admin/sms', label: 'SMS', icon: MessageSquare },
  { to: '/admin/analytics', label: 'System Analytics', icon: BarChart3 },
  { to: '/admin/tickets', label: 'Support Tickets', icon: LifeBuoy },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/audit-logs', label: 'Audit Logs', icon: ScrollText },
  { to: '/admin/config', label: 'Platform Config', icon: SlidersHorizontal },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-64 flex-col bg-secondary text-white p-4">
        <h1 className="text-xl font-bold mb-6">BusinessOS Admin</h1>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive ? 'bg-accent text-secondary font-semibold' : 'text-slate-200 hover:bg-white/10'
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
