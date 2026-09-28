'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type VeloraTheme = 'light' | 'dark';

type ThemeContextValue = {
  theme: VeloraTheme;
  darkMode: boolean;
  setTheme: (theme: VeloraTheme) => void;
  toggleTheme: () => void;
};

const VeloraThemeContext = createContext<ThemeContextValue | null>(null);

export function VeloraThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<VeloraTheme>('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('veloraTheme');
    if (saved === 'dark' || saved === 'light') {
      setThemeState(saved);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem('veloraTheme', theme);
    document.documentElement.dataset.veloraTheme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme, ready]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    darkMode: theme === 'dark',
    setTheme: setThemeState,
    toggleTheme: () => setThemeState(previous => previous === 'dark' ? 'light' : 'dark'),
  }), [theme]);

  return (
    <VeloraThemeContext.Provider value={value}>
      {children}
    </VeloraThemeContext.Provider>
  );
}

export function useVeloraTheme() {
  const context = useContext(VeloraThemeContext);

  if (!context) {
    throw new Error('useVeloraTheme must be used inside VeloraThemeProvider');
  }

  return context;
}
