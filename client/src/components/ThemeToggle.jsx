import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      className="w-9 h-9 grid place-items-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-jsom-primary transition"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
