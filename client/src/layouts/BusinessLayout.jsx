import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Package, Boxes, ShoppingCart, ShoppingBag, Users, Truck,
  CreditCard, Wallet, UserCog, Store, Banknote, BarChart3, MessageSquare,
  Bell, Settings, Search,
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle.jsx';

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
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:flex w-60 flex-col bg-primary text-slate-300 p-4">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-accent grid place-items-center text-white font-black">J</div>
          <div className="font-extrabold text-white leading-none">J-Som Biz</div>
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
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-100 px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-100 rounded-xl px-3 py-2 w-72">
            <Search size={16} /> Search products, sales or customers…
          </div>
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-slate-400" />
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-accent grid place-items-center text-white font-bold">A</div>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
