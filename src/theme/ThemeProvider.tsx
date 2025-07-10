// src/ThemeProvider.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import ThemeContext from './ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // lazy-init from localStorage or matchMedia
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--color-bg', '#121212');
      root.style.setProperty('--color-surface', '#1e1e1e');
      root.style.setProperty('--color-text', '#eeeeee');
      root.style.setProperty('--color-primary', '#90caf9');
    } else {
      root.style.setProperty('--color-bg', '#ffffff');
      root.style.setProperty('--color-surface', '#f0f0f0');
      root.style.setProperty('--color-text', '#222222');
      root.style.setProperty('--color-primary', '#1976d2');
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = { theme, setTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

