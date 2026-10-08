import { Link, NavLink, Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle.jsx';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary grid place-items-center text-accent font-black">J</div>
            <div>
              <div className="font-extrabold text-primary leading-none">J-Som Biz</div>
              <div className="text-[10px] text-slate-400 leading-none">Your Business. One Platform.</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600 font-medium">
            <a href="/#why">Why J-Som Biz?</a>
            <a href="/#features">Features</a>
            <a href="/#industries">Industries</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#testimonials">Testimonials</a>
            <a href="/#faq">FAQ</a>
          </nav>
          <nav className="flex items-center gap-3 text-sm">
            <NavLink to="/login" className="px-4 py-2 rounded-lg border border-slate-200 font-semibold text-primary">Login</NavLink>
            <ThemeToggle />
            <NavLink to="/register" className="px-4 py-2 rounded-lg bg-accent text-white font-bold">Get Started Free</NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-slate-300 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-extrabold text-white text-lg mb-1">J-Som Biz</div>
            <p className="text-slate-400 text-xs">Your Business. One Platform. Complete Control.</p>
          </div>
          {[
            ['Product', ['Features', 'Pricing', 'Demo', 'Roadmap']],
            ['Company', ['About Us', 'Contact', 'Blog', 'Careers']],
            ['Support', ['Help Center', 'Terms of Service', 'Privacy Policy', 'Status']],
          ].map(([title, items]) => (
            <div key={title}>
              <div className="text-white font-bold mb-3">{title}</div>
              <ul className="space-y-2">
                {items.map((i) => <li key={i}><a href="#" className="hover:text-accent">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 text-center py-4 text-xs text-slate-500">
          © {new Date().getFullYear()} J-Som Tech. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
