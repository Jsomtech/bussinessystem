import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary to-secondary text-white text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Run Your Business From One Powerful Platform</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Manage products, sales, purchases, customers, inventory, expenses and business credit — all in one simple system.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="bg-accent text-primary font-bold px-8 py-3 rounded-xl">Start Free</Link>
          <a href="#features" className="border border-white/30 px-8 py-3 rounded-xl">View Demo</a>
        </div>
      </section>

      <section id="features" className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        {['Multi-tenant workspaces', 'EVC & SMS integrations', 'Credit & debt reminders'].map((f) => (
          <div key={f} className="bg-white rounded-2xl shadow p-6 font-semibold text-primary">{f}</div>
        ))}
      </section>

      <section id="pricing" className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Pricing</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          {[
            ['Free / Trial', '$0'],
            ['Starter', '$5/mo'],
            ['Business', '$10/mo'],
            ['Enterprise', 'Custom'],
          ].map(([name, price]) => (
            <div key={name} className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow p-6">
              <div className="font-bold text-primary">{name}</div>
              <div className="text-2xl font-extrabold text-secondary my-2">{price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
