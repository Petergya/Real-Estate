


// 'use client';

// import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// type Theme = 'light' | 'dark';
// type ThemeContextType = {
//   theme: Theme;
//   systemTheme: Theme | null;
//   isDarkMode: boolean;
//   toggleTheme: () => void;
//   setTheme: (theme: Theme) => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function ThemeProvider({
//   children,
//   defaultTheme = 'light',
//   storageKey = 'real-estate-theme',
// }: {
//   children: ReactNode;
//   defaultTheme?: Theme;
//   storageKey?: string;
// }) {
//   const [theme, setThemeState] = useState<Theme>(defaultTheme);
//   const [systemTheme, setSystemTheme] = useState<Theme | null>(null);
//   const [isMounted, setIsMounted] = useState(false);

//   // Set theme state and persist to localStorage
//   const setTheme = (newTheme: Theme) => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem(storageKey, newTheme);
//     }
//     setThemeState(newTheme);
//   };

//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   };

//   useEffect(() => {
//     setIsMounted(true);

//     // Get saved theme from localStorage or use default
//     const savedTheme = typeof window !== 'undefined' 
//       ? (localStorage.getItem(storageKey) as Theme || defaultTheme
//       : defaultTheme;
    
//     setThemeState(savedTheme);

//     // System theme detection
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handleSystemThemeChange = (e: MediaQueryListEvent) => {
//       setSystemTheme(e.matches ? 'dark' : 'light');
//     };

//     // Set initial system theme
//     setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

//     // Listen for system theme changes
//     mediaQuery.addEventListener('change', handleSystemThemeChange);

//     return () => {
//       mediaQuery.removeEventListener('change', handleSystemThemeChange);
//     };
//   }, [defaultTheme, storageKey]);

//   // Apply theme class to document element
//   useEffect(() => {
//     if (!isMounted) return;

//     const root = document.documentElement;
//     root.classList.remove('light', 'dark');
//     root.classList.add(theme);
//     root.setAttribute('data-theme', theme);
//   }, [theme, isMounted]);

//   // Prevent SSR mismatch by only rendering when mounted
//   if (!isMounted) {
//     return null;
//   }

//   const value = {
//     theme,
//     systemTheme,
//     isDarkMode: theme === 'dark',
//     toggleTheme,
//     setTheme,
//   };

//   return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// }

// 'use client';

// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// type Theme = 'light' | 'dark';

// interface ThemeProviderProps {
//   children: ReactNode;
//   defaultTheme?: Theme;
//   storageKey?: string;
// }

// const ThemeContext = createContext<{
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
// } | null>(null);

// export function ThemeProvider({
//   children,
//   defaultTheme = 'light',
//   storageKey = 'real-estate-theme',
// }: ThemeProviderProps) {
//   const [theme, setThemeState] = useState<Theme>(defaultTheme);
//   const [isMounted, setIsMounted] = useState(false);

//   // Only access localStorage after mount
//   useEffect(() => {
//     setIsMounted(true);
//     const savedTheme = localStorage.getItem(storageKey) as Theme;
//     if (savedTheme) {
//       setThemeState(savedTheme);
//     }
//   }, [storageKey]);

//   const setTheme = (newTheme: Theme) => {
//     if (isMounted) {
//       localStorage.setItem(storageKey, newTheme);
//     }
//     setThemeState(newTheme);
//   };

//   // Apply theme class to HTML element
//   useEffect(() => {
//     if (!isMounted) return;
    
//     const root = document.documentElement;
//     root.classList.remove('light', 'dark');
//     root.classList.add(theme);
//     root.setAttribute('data-theme', theme);
//   }, [theme, isMounted]);

//   // Don't render until mounted to avoid hydration mismatch
//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// }


'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'real-estate-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isMounted, setIsMounted] = useState(false);

  // Only access localStorage after mount
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, [storageKey]);

  const setTheme = (newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
    setThemeState(newTheme);
  };

  // Apply theme class to HTML element
  useEffect(() => {
    if (!isMounted) return;
    
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme, isMounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {isMounted ? children : <div className="invisible">{children}</div>}
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
