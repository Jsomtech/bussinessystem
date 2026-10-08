import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, CreditCard, Package, Banknote,
  MessageSquare, BarChart3, LifeBuoy, Bell, ScrollText, SlidersHorizontal,
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle.jsx';

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
      <aside className="hidden md:flex w-60 flex-col bg-primary text-slate-300 p-4">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-accent grid place-items-center text-white font-black">J</div>
          <div className="font-extrabold text-white leading-none">BusinessOS Admin</div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                  isActive ? 'bg-accent text-white font-bold' : 'hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-100 px-6 h-14 flex items-center justify-end gap-3">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-accent grid place-items-center text-white font-bold">S</div>
        </header>
        <div className="p-6 overflow-x-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
