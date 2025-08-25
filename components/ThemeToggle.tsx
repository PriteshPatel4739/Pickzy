'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const active = theme === 'system' ? systemTheme : theme;
  return (
       <button
      onClick={() => setTheme(active === 'dark' ? 'light' : 'dark')}
      className="rounded-full border px-3 py-1 text-sm hover:bg-accent"
      aria-label="Toggle theme"
    >
      {active === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
