import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Package, Boxes, ShoppingCart, ShoppingBag, Users, Truck,
  CreditCard, Wallet, UserCog, Store, Banknote, BarChart3, MessageSquare,
  Bell, Settings,
} from 'lucide-react';

const nav = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/sales', label: 'Sales', icon: ShoppingCart },
  { to: '/app/purchases', label: 'Purchases', icon: ShoppingBag },
  { to: '/app/products', label: 'Products', icon: Package },
  { to: '/app/inventory', label: 'Inventory', icon: Boxes },
  { to: '/app/customers', label: 'Customers', icon: Users },
  { to: '/app/suppliers', label: 'Suppliers', icon: Truck },
  { to: '/app/credit', label: 'Credit & Loans', icon: CreditCard },
  { to: '/app/expenses', label: 'Expenses', icon: Wallet },
  { to: '/app/employees', label: 'Employees', icon: UserCog },
  { to: '/app/pos', label: 'POS', icon: Store },
  { to: '/app/payments', label: 'Payments', icon: Banknote },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
  { to: '/app/sms', label: 'SMS', icon: MessageSquare },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export default function BusinessLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-64 flex-col bg-primary text-white p-4">
        <h1 className="text-xl font-bold mb-6">J-Som Business</h1>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive ? 'bg-accent text-primary font-semibold' : 'text-slate-200 hover:bg-white/10'
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
