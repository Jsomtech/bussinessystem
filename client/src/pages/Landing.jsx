import { Link } from 'react-router-dom';
import {
  Check, Store, Truck, UtensilsCrossed, Pill, Armchair, Monitor, Wrench, LayoutGrid,
  Boxes, ShoppingCart, CreditCard, Smartphone, BarChart3, Users, Wallet,
} from 'lucide-react';

const why = [
  { icon: LayoutGrid, title: 'All-in-One System', text: 'Manage everything in one place.', tint: 'bg-indigo-100 text-indigo-600' },
  { icon: Users, title: 'Multi-Tenant', text: 'Each business has its own secure workspace.', tint: 'bg-violet-100 text-violet-600' },
  { icon: Smartphone, title: 'Local Payment & SMS', text: 'EVC payments and Hormuud SMS integration.', tint: 'bg-emerald-100 text-emerald-600' },
  { icon: Wallet, title: 'Easy to Use', text: 'Simple, clean and beautiful interface.', tint: 'bg-amber-100 text-amber-600' },
  { icon: CreditCard, title: 'Affordable Plans', text: 'Flexible pricing for every business.', tint: 'bg-sky-100 text-sky-600' },
  { icon: Check, title: '24/7 Support', text: 'We are always here to help.', tint: 'bg-lime-100 text-lime-700' },
];

const features = [
  { icon: Boxes, title: 'Inventory', text: 'Stock in/out & warehouses', tint: 'bg-lime-100 text-lime-700' },
  { icon: ShoppingCart, title: 'Sales & POS', text: 'Fast and easy sales', tint: 'bg-rose-100 text-rose-600' },
  { icon: Truck, title: 'Purchases', text: 'Manage suppliers', tint: 'bg-indigo-100 text-indigo-600' },
  { icon: Users, title: 'Customers', text: 'Credit & debt management', tint: 'bg-blue-100 text-blue-600' },
  { icon: Smartphone, title: 'SMS', text: 'Automated reminders', tint: 'bg-emerald-100 text-emerald-600' },
  { icon: BarChart3, title: 'Reports', text: 'Powerful analytics', tint: 'bg-violet-100 text-violet-600' },
];

const industries = [
  { icon: Store, label: 'Retail' },
  { icon: Truck, label: 'Wholesale' },
  { icon: UtensilsCrossed, label: 'Restaurant' },
  { icon: Pill, label: 'Pharmacy' },
  { icon: Armchair, label: 'Furniture' },
  { icon: Monitor, label: 'Electronics' },
  { icon: Wrench, label: 'Services' },
  { icon: LayoutGrid, label: 'And More' },
];

const testimonials = [
  { name: 'Ahmed Ali', role: 'Owner, ABC Furniture', quote: 'J-Som Biz has made my business so much easier. I can now manage my sales, stock and customers all from one place.' },
  { name: 'Fadumo Hassan', role: 'Owner, Horyaal Store', quote: 'The SMS feature is amazing! It helps me remind my customers about their payments.' },
  { name: 'Mohamed Farah', role: 'Owner, Modern Electronics', quote: 'The system is powerful and easy to use. The support team is also very helpful.' },
];

const faqs = [
  'Is there a free trial?',
  'Can I upgrade my plan later?',
  'Does it support EVC payments?',
  'Is my data secure?',
  'Can I use it on mobile?',
];

const plans = [
  { name: 'Free', price: '$0', note: '14 Days Trial' },
  { name: 'Starter', price: '$5', note: '/month (billed monthly)' },
  { name: 'Business', price: '$10', note: '/month (billed monthly)' },
  { name: 'Enterprise', price: 'Custom', note: 'Contact Sales' },
];

export default function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Run Your Business<br />From One Powerful<br /><span className="text-accent">Platform</span>
            </h1>
            <p className="text-slate-300 mt-5 mb-8 max-w-md">
              Manage products, sales, purchases, customers, inventory, expenses and business credit — all in one simple system.
            </p>
            <div className="flex gap-4">
              <Link to="/register" className="bg-accent text-white font-bold px-6 py-3 rounded-xl">Start Free</Link>
              <a href="#features" className="border border-white/20 px-6 py-3 rounded-xl font-semibold">Watch Demo</a>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10 text-sm">
              {[['1,248+', 'Businesses'], ['25,000+', 'Active Users'], ['$2M+', 'Total Sales'], ['99.9%', 'Uptime']].map(([v, l]) => (
                <div key={l}><div className="text-accent font-extrabold text-xl">{v}</div><div className="text-slate-400 text-xs">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="bg-white rounded-xl p-5 shadow-2xl">
                <div className="text-primary font-bold mb-3">Today at a glance</div>
                <div className="grid grid-cols-2 gap-3">
                  {[['$1,250', "Today's Sales"], ['$340', "Today's Profit"], ['$4,230', 'Outstanding Debt'], ['$18,450', 'Stock Value']].map(([v, l]) => (
                    <div key={l} className="rounded-lg border border-slate-100 p-3">
                      <div className="text-accent font-extrabold">↗</div>
                      <div className="font-bold text-primary">{v}</div>
                      <div className="text-xs text-slate-400">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-extrabold text-primary text-center mb-10">Why Choose J-Som Biz?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {why.map(({ icon: Icon, title, text, tint }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className={`w-10 h-10 rounded-xl grid place-items-center mb-4 ${tint}`}><Icon size={20} /></div>
              <div className="font-bold text-primary">{title}</div>
              <p className="text-sm text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KEY FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-extrabold text-primary text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, text, tint }) => (
            <div key={title} className="flex items-start gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className={`w-10 h-10 rounded-xl grid place-items-center ${tint}`}><Icon size={20} /></div>
              <div>
                <div className="font-bold text-primary">{title}</div>
                <p className="text-sm text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-extrabold text-primary text-center mb-10">Industries We Serve</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-center">
          {industries.map(({ icon: Icon, label }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 grid place-items-center text-primary mb-2"><Icon size={18} /></div>
              <div className="text-xs font-semibold text-primary">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-secondary to-primary text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold">Ready to Grow Your Business?</h3>
            <p className="text-slate-300 mt-2">Join thousands of businesses already using J-Som Biz.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/register" className="bg-accent text-white font-bold px-6 py-3 rounded-xl">Get Started Free</Link>
            <a href="#demo" className="border border-white/20 px-6 py-3 rounded-xl font-semibold">View Demo</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-extrabold text-primary text-center mb-10">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent grid place-items-center font-bold text-white">{t.name[0]}</div>
                <div>
                  <div className="font-bold text-primary text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
              <p className="text-sm text-slate-600">"{t.quote}"</p>
              <div className="text-amber-400 mt-3 text-sm">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ + PRICING */}
      <section id="faq" className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-extrabold text-primary mb-6">Frequently Asked Questions</h2>
          <div className="divide-y divide-slate-100 border rounded-2xl bg-white">
            {faqs.map((q) => (
              <details key={q} className="p-4 group">
                <summary className="cursor-pointer font-semibold text-primary text-sm flex justify-between">
                  {q}<span className="text-slate-400 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="text-sm text-slate-500 mt-2">Yes — contact our support team for details.</p>
              </details>
            ))}
          </div>
        </div>
        <div id="pricing">
          <h2 className="text-2xl font-extrabold text-primary mb-6">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            {plans.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
                <div className="font-bold text-primary">{p.name}</div>
                <div className="text-3xl font-extrabold text-primary my-2">{p.price}</div>
                <div className="text-xs text-slate-400 mb-4">{p.note}</div>
                <Link to="/register" className="text-sm font-bold bg-accent text-white px-4 py-2 rounded-lg inline-block">Choose</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
