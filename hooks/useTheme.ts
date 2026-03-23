import { useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light' | 'blue';

const STORAGE_KEY = 'portfolio-theme';

const CYCLE: ThemeMode[] = ['dark', 'light', 'blue'];

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light' || stored === 'blue') return stored;

  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? 'dark' : 'light';
};

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const idx = CYCLE.indexOf(prev);
      return CYCLE[(idx + 1) % CYCLE.length];
    });
  };

  return { theme, toggleTheme };
}
