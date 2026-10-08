import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import { api } from '../api/client';

// Generic fully-functional CRUD module: lists, creates and deletes rows
// through the tenant-scoped /api/v1 endpoints.
export default function ResourcePage({ title, description, endpoint, columns, fields }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);

  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => (await api.get(endpoint)).data,
  });
  const create = useMutation({
    mutationFn: async (body) => (await api.post(endpoint, body)).data,
    onSuccess: () => { qc.invalidateQueries({ queryKey: [endpoint] }); setForm({}); setOpen(false); },
  });
  const remove = useMutation({
    mutationFn: async (id) => (await api.delete(`${endpoint}/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: [endpoint] }),
  });

  const submit = (e) => {
    e.preventDefault();
    const body = {};
    fields.forEach((f) => {
      if (form[f.key] !== undefined && form[f.key] !== '') {
        body[f.key] = f.type === 'number' ? Number(form[f.key]) : form[f.key];
      }
    });
    create.mutate(body);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-primary dark:text-white">{title}</h2>
          <p className="text-slate-500">{description}</p>
        </div>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-2 bg-accent text-white font-bold px-4 py-2 rounded-xl text-sm">
          <Plus size={16} /> New
        </button>
      </div>

      {open && (
        <form onSubmit={submit} className="bg-white dark:bg-[#171033] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {fields.map((f) => (
            <input
              key={f.key}
              required={f.required}
              type={f.type || 'text'}
              placeholder={f.label}
              value={form[f.key] || ''}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="border border-slate-200 rounded-xl p-2.5 text-sm"
            />
          ))}
          <button className="bg-primary text-white rounded-xl text-sm font-bold px-4">Save</button>
        </form>
      )}

      <div className="bg-white dark:bg-[#171033] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm overflow-hidden">
        {error && (
          <div className="p-4 text-rose-500 text-sm flex items-center gap-2">
            Failed to load: {error.message}
            <button onClick={() => refetch()} className="underline"><RefreshCw size={14} /></button>
          </div>
        )}
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              {columns.map((c) => <th key={c.key} className="p-4 font-semibold">{c.label}</th>)}
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td className="p-4 text-slate-400" colSpan={columns.length + 1}>Loading…</td></tr>}
            {!isLoading && data.length === 0 && (
              <tr><td className="p-8 text-center text-slate-400" colSpan={columns.length + 1}>No records yet — click “New” to add one.</td></tr>
            )}
            {Array.isArray(data) && data.map((row) => (
              <tr key={row.id} className="border-t border-slate-50">
                {columns.map((c) => <td key={c.key} className="p-4">{String(row[c.key] ?? '—')}</td>)}
                <td className="p-4 text-right">
                  <button onClick={() => remove.mutate(row.id)} className="text-slate-400 hover:text-rose-500" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
