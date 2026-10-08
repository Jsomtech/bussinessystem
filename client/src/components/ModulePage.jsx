export default function ModulePage({ title, description, children }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-1">{title}</h2>
      <p className="text-slate-500 mb-6">{description}</p>
      {children ?? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-400">
          Module scaffolded — connect to <code>/api/v1</code> to build out this feature.
        </div>
      )}
    </div>
  );
}
