// 'use client';

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from 'react';

// type Theme = 'light' | 'dark';
// type ThemeContextType = {
//   theme: Theme;
//   toggleTheme: () => void;
//   setTheme: (theme: Theme) => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// interface ThemeProviderProps {
//   children: ReactNode;
//   defaultTheme?: Theme;
//   storageKey?: string;
// }

// export function ThemeProvider({
//   children,
//   defaultTheme = 'light',
//   storageKey = 'real-estate-ui-theme',
// }: ThemeProviderProps) {
//   const [theme, setTheme] = useState<Theme>(() => {
//     if (typeof window !== 'undefined') {
//       const storedTheme = localStorage.getItem(storageKey) as Theme | null;
//       return storedTheme || defaultTheme;
//     }
//     return defaultTheme;
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
    
//     // Remove all theme classes
//     root.classList.remove('light', 'dark');
    
//     // Add current theme class
//     root.classList.add(theme);
    
//     // Update data-theme attribute
//     root.setAttribute('data-theme', theme);
    
//     // Persist to localStorage
//     localStorage.setItem(storageKey, theme);
//   }, [theme, storageKey]);

//   const toggleTheme = () => {
//     setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   const value = {
//     theme,
//     toggleTheme,
//     setTheme,
//   };

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// }


// contexts/ThemeContext.tsx

"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}