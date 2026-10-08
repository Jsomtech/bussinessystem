export default function ModulePage({ title, description, children }) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-primary dark:text-white mb-1">{title}</h2>
      <p className="text-slate-500 mb-6">{description}</p>
      {children ?? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/20 bg-white dark:bg-[#171033] p-10 text-center text-slate-400">
          Module scaffolded — wire this to its API endpoint when ready.
        </div>
      )}
    </div>
  );
}
