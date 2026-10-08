import { Link, NavLink, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">J-Som Business</Link>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/#features">Features</a>
          <a href="/#pricing">Pricing</a>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register" className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold">
            Start Free
          </NavLink>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-secondary text-slate-300 text-sm px-6 py-4 text-center">
        © {new Date().getFullYear()} J-Som Tech — Your Business. One Platform. Complete Control.
      </footer>
    </div>
  );
}
