import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDbSetting } from '../api/mongoApi';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: '#0d382c',
    secondaryColor: '#c59d5f',
    backgroundColor: '#ffffff',
    fontMain: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontSerif: "'Playfair Display', Georgia, serif"
  });

  useEffect(() => {
    // Load theme from DB
    const loadTheme = async () => {
      const dbTheme = await getDbSetting('global_theme');
      if (dbTheme) {
        setTheme(prev => ({ ...prev, ...dbTheme }));
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    // Apply CSS variables
    const root = document.documentElement;
    if (theme.primaryColor) root.style.setProperty('--aevora-emerald', theme.primaryColor);
    if (theme.secondaryColor) root.style.setProperty('--aevora-gold', theme.secondaryColor);
    if (theme.fontMain) root.style.setProperty('--font-main', theme.fontMain);
    if (theme.fontSerif) root.style.setProperty('--font-serif', theme.fontSerif);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
