export default function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow p-5">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
      {hint && <div className="text-xs text-slate-400 mt-1">{hint}</div>}
    </div>
  );
}
