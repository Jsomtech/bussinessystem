import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ModulePage from '../../components/ModulePage';
import ResourcePage from '../../components/ResourcePage';
import { api } from '../../api/client';

export function Overview() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: async () => (await api.get('/reports/summary')).data,
  });
  const stats = [
    { label: "Today's Sales", value: `$${data?.todaySales ?? 0}`, tint: 'bg-lime-100 text-lime-700' },
    { label: "Today's Profit", value: `$${data?.todayProfit ?? 0}`, tint: 'bg-emerald-100 text-emerald-700' },
    { label: 'Outstanding Debt', value: `$${data?.outstandingDebt ?? 0}`, tint: 'bg-rose-100 text-rose-600' },
    { label: 'Stock Value', value: `$${data?.stockValue ?? 0}`, tint: 'bg-blue-100 text-blue-600' },
    { label: 'Expenses', value: `$${data?.expenses ?? 0}`, tint: 'bg-amber-100 text-amber-600' },
  ];
  const bars = [40, 65, 50, 80, 60, 90, 75];
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-primary dark:text-white">Welcome back!</h1>
      <p className="text-slate-500 mb-6">Here's what's happening with your business today.</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-[#171033] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-5">
            <div className={`w-8 h-8 rounded-lg grid place-items-center mb-3 ${s.tint}`}>$</div>
            <div className="text-xl font-extrabold text-primary dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-[#171033] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-6 md:w-2/3">
        <div className="font-bold text-primary dark:text-white mb-4">Sales Overview</div>
        <div className="flex items-end gap-4 h-40">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 bg-accent/70 rounded-t-lg" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d}>{d}</span>)}
        </div>
      </div>
    </div>
  );
}

export const Sales = () => (
  <ResourcePage title="Sales" description="New sales, history, invoices, returns and reports."
    endpoint="/sales"
    columns={[{ key: 'invoice_number', label: 'Invoice' }, { key: 'total', label: 'Total' }, { key: 'paid', label: 'Paid' }, { key: 'balance', label: 'Balance' }, { key: 'status', label: 'Status' }, { key: 'created_at', label: 'Date' }]}
    fields={[{ key: 'invoice_number', label: 'Invoice #', required: true }, { key: 'total', label: 'Total', type: 'number' }, { key: 'paid', label: 'Paid', type: 'number' }, { key: 'payment_method', label: 'Payment method' }, { key: 'status', label: 'Status' }]} />
);

export const Purchases = () => (
  <ResourcePage title="Purchases" description="Purchase orders, returns and supplier payments."
    endpoint="/purchases"
    columns={[{ key: 'id', label: 'ID' }, { key: 'total', label: 'Total' }, { key: 'paid', label: 'Paid' }, { key: 'status', label: 'Status' }, { key: 'created_at', label: 'Date' }]}
    fields={[{ key: 'total', label: 'Total', type: 'number' }, { key: 'paid', label: 'Paid', type: 'number' }, { key: 'status', label: 'Status' }]} />
);

export const Products = () => (
  <ResourcePage title="Products" description="Catalog with SKU, barcode, pricing, variants and images."
    endpoint="/products"
    columns={[{ key: 'name', label: 'Name' }, { key: 'sku', label: 'SKU' }, { key: 'selling_price', label: 'Sell Price' }, { key: 'stock_quantity', label: 'Stock' }, { key: 'status', label: 'Status' }]}
    fields={[{ key: 'name', label: 'Name', required: true }, { key: 'sku', label: 'SKU' }, { key: 'selling_price', label: 'Sell Price', type: 'number' }, { key: 'purchase_price', label: 'Buy Price', type: 'number' }, { key: 'stock_quantity', label: 'Stock', type: 'number' }, { key: 'unit', label: 'Unit' }]} />
);

export const Inventory = () => (
  <ResourcePage title="Inventory" description="Stock in/out, adjustments, transfers, history and valuation."
    endpoint="/inventory"
    columns={[{ key: 'type', label: 'Type' }, { key: 'quantity', label: 'Qty' }, { key: 'note', label: 'Note' }, { key: 'created_at', label: 'Date' }]}
    fields={[{ key: 'type', label: 'Type (in/out/adjustment)', required: true }, { key: 'quantity', label: 'Quantity', type: 'number', required: true }, { key: 'note', label: 'Note' }]} />
);

export const Customers = () => (
  <ResourcePage title="Customers" description="Customer accounts, credit and statements."
    endpoint="/customers"
    columns={[{ key: 'name', label: 'Name' }, { key: 'phone', label: 'Phone' }, { key: 'balance', label: 'Balance' }]}
    fields={[{ key: 'name', label: 'Name', required: true }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'balance', label: 'Opening Balance', type: 'number' }]} />
);

export const Suppliers = () => (
  <ResourcePage title="Suppliers" description="Supplier accounts and balances."
    endpoint="/suppliers"
    columns={[{ key: 'name', label: 'Name' }, { key: 'phone', label: 'Phone' }, { key: 'balance', label: 'Balance' }]}
    fields={[{ key: 'name', label: 'Name', required: true }, { key: 'phone', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'balance', label: 'Opening Balance', type: 'number' }]} />
);

export const Credit = () => (
  <ResourcePage title="Credit & Loans" description="Customer and supplier debt, aging and reminders."
    endpoint="/credit"
    columns={[{ key: 'id', label: 'ID' }, { key: 'created_at', label: 'Date' }]}
    fields={[]} />
);

export const Expenses = () => (
  <ResourcePage title="Expenses" description="Track business expenses by category."
    endpoint="/expenses"
    columns={[{ key: 'category', label: 'Category' }, { key: 'amount', label: 'Amount' }, { key: 'note', label: 'Note' }, { key: 'created_at', label: 'Date' }]}
    fields={[{ key: 'category', label: 'Category', required: true }, { key: 'amount', label: 'Amount', type: 'number', required: true }, { key: 'note', label: 'Note' }]} />
);

export function Employees() {
  const qc = useQueryClient();
  const { data: staff = [] } = useQuery({ queryKey: ['employees'], queryFn: async () => (await api.get('/employees')).data });
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');
  const add = useMutation({
    mutationFn: async (body) => (await api.post('/employees', body)).data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['employees'] }); setForm({}); setMsg('Employee added'); },
    onError: (e) => setMsg(e.response?.data?.error || e.message),
  });
  const remove = useMutation({
    mutationFn: async (id) => (await api.delete(`/employees/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employees'] }),
  });
  const submit = (e) => { e.preventDefault(); add.mutate({ email: form.email, password: form.password, role: form.role }); };
  const roles = ['BUSINESS_ADMIN', 'MANAGER', 'ACCOUNTANT', 'CASHIER', 'SALES_AGENT', 'INVENTORY_MANAGER', 'EMPLOYEE'];
  return (
    <ModulePage title="Employees" description="Create your staff accounts and assign their roles.">
      <form onSubmit={submit} className="bg-white dark:bg-[#171033] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <input required placeholder="Email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border border-slate-200 rounded-xl p-2.5 text-sm" />
        <input required type="password" placeholder="Password" value={form.password || ''} onChange={(e) => setForm({ ...form, password: e.target.value })} className="border border-slate-200 rounded-xl p-2.5 text-sm" />
        <select value={form.role || 'EMPLOYEE'} onChange={(e) => setForm({ ...form, role: e.target.value })} className="border border-slate-200 rounded-xl p-2.5 text-sm">
          {roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <button className="bg-accent text-white font-bold rounded-xl text-sm">Add Staff</button>
      </form>
      {msg && <p className="text-sm text-slate-500 mb-4">{msg}</p>}
      <div className="bg-white dark:bg-[#171033] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Joined</th><th className="p-4" /></tr>
          </thead>
          <tbody>
            {staff.map((m) => (
              <tr key={m.id} className="border-t border-slate-50">
                <td className="p-4">{m.email}</td>
                <td className="p-4"><span className="bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded-lg">{m.role}</span></td>
                <td className="p-4">{m.created_at ? new Date(m.created_at).toLocaleDateString() : '—'}</td>
                <td className="p-4 text-right"><button onClick={() => remove.mutate(m.id)} className="text-rose-500 text-xs font-bold">Remove</button></td>
              </tr>
            ))}
            {staff.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-400">No staff yet — add your first employee above.</td></tr>}
          </tbody>
        </table>
      </div>
    </ModulePage>
  );
}

export function POS() {
  const qc = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ['/products'], queryFn: async () => (await api.get('/products')).data });
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const sell = useMutation({
    mutationFn: async (body) => (await api.post('/sales', body)).data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['/sales'] }); setCart([]); },
  });
  const filtered = Array.isArray(products) ? products.filter((p) => p.name?.toLowerCase().includes(search.toLowerCase())) : [];
  const add = (p) => setCart([...cart, { id: p.id, name: p.name, price: Number(p.selling_price || 0) }]);
  const total = cart.reduce((s, i) => s + i.price, 0);
  const checkout = (method) => sell.mutate({ invoice_number: `INV-${Date.now()}`, total, paid: total, payment_method: method, status: 'completed' });
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-primary dark:text-white mb-4">POS — Point of Sale</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product…" className="w-full border border-slate-200 rounded-xl p-3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((p) => (
              <button key={p.id} onClick={() => add(p)} className="bg-white dark:bg-[#171033] border border-slate-100 dark:border-white/10 rounded-2xl p-4 text-left shadow-sm hover:border-accent">
                <div className="font-bold text-primary dark:text-white text-sm">{p.name}</div>
                <div className="text-accent font-bold">${p.selling_price}</div>
              </button>
            ))}
            {filtered.length === 0 && <div className="text-slate-400 text-sm">No products found. Add products first.</div>}
          </div>
        </div>
        <div className="bg-white dark:bg-[#171033] border border-slate-100 dark:border-white/10 rounded-2xl p-5 shadow-sm">
          <div className="font-bold text-primary dark:text-white mb-4">Current Sale</div>
          <ul className="space-y-2 mb-4">
            {cart.map((i, idx) => (
              <li key={idx} className="flex justify-between text-sm"><span>{i.name}</span><span className="font-semibold">${i.price}</span></li>
            ))}
            {cart.length === 0 && <li className="text-slate-400 text-sm">Cart is empty</li>}
          </ul>
          <div className="text-xl font-extrabold text-primary dark:text-white border-t border-slate-100 dark:border-white/10 pt-3 mb-4">Total: ${total}</div>
          <div className="grid grid-cols-3 gap-2">
            {['Cash', 'EVC', 'Credit'].map((m) => (
              <button key={m} disabled={!cart.length} onClick={() => checkout(m)} className="bg-accent disabled:opacity-40 text-white font-bold rounded-xl py-2.5 text-sm">{m}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Payments = () => (
  <ResourcePage title="Payments" description="Cash, EVC, bank and card payments."
    endpoint="/payments"
    columns={[{ key: 'direction', label: 'Direction' }, { key: 'party', label: 'Party' }, { key: 'amount', label: 'Amount' }, { key: 'method', label: 'Method' }, { key: 'created_at', label: 'Date' }]}
    fields={[{ key: 'direction', label: 'Direction (in/out)', required: true }, { key: 'party', label: 'Party' }, { key: 'amount', label: 'Amount', type: 'number', required: true }, { key: 'method', label: 'Method' }, { key: 'reference', label: 'Reference' }]} />
);

export const Reports = () => {
  const { data } = useQuery({ queryKey: ['summary'], queryFn: async () => (await api.get('/reports/summary')).data });
  return (
    <ModulePage title="Reports" description="Sales, profit, stock and debt reports.">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(data || {}).filter(([k]) => k !== 'businessId').map(([k, v]) => (
          <div key={k} className="bg-white dark:bg-[#171033] rounded-2xl border border-slate-100 dark:border-white/10 p-5 shadow-sm">
            <div className="text-xl font-extrabold text-primary dark:text-white">${v}</div>
            <div className="text-xs text-slate-500">{k}</div>
          </div>
        ))}
      </div>
    </ModulePage>
  );
};

export function SMS() {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const send = useMutation({
    mutationFn: async () => (await api.post('/sms/send', { to, message })).data,
    onSuccess: (r) => setResult(`Sent: ${JSON.stringify(r)}`),
    onError: (e) => setResult(`Error: ${e.message}`),
  });
  return (
    <ModulePage title="SMS" description="Templates, reminders and delivery history.">
      <form onSubmit={(e) => { e.preventDefault(); send.mutate(); }} className="bg-white dark:bg-[#171033] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-6 max-w-xl">
        <div className="font-bold text-primary dark:text-white mb-4">Send SMS</div>
        <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To (e.g. +25261...)" className="w-full border border-slate-200 rounded-xl p-3 mb-3" required />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" rows={4} className="w-full border border-slate-200 rounded-xl p-3 mb-3" required />
        <button className="bg-accent text-white font-bold px-6 py-2.5 rounded-xl">Send</button>
        {result && <p className="text-sm text-slate-500 mt-3">{result}</p>}
      </form>
    </ModulePage>
  );
}

export const Notifications = () => (
  <ResourcePage title="Notifications" description="In-app alerts across your business."
    endpoint="/notifications"
    columns={[{ key: 'type', label: 'Type' }, { key: 'title', label: 'Title' }, { key: 'body', label: 'Body' }, { key: 'read', label: 'Read' }, { key: 'created_at', label: 'Date' }]}
    fields={[{ key: 'type', label: 'Type' }, { key: 'title', label: 'Title', required: true }, { key: 'body', label: 'Body' }]} />
);

export const Settings = () => <ModulePage title="Settings" description="Business profile, branding and preferences." />;
