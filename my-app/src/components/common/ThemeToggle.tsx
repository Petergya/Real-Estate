// 'use client';

// import { useTheme } from '@/hooks/useTheme';
// import { Button } from '@/components/ui/Button';
// import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

// export function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       onClick={toggleTheme}
//       aria-label="Toggle theme"
//     >
//       {theme === 'dark' ? (
//         <SunIcon className="h-5 w-5" />
//       ) : (
//         <MoonIcon className="h-5 w-5" />
//       )}
//     </Button>
//   );
// }


// components/common/ThemeToggle.tsx
// interface ThemeToggleProps {
//     theme: 'light' | 'dark';
//     toggleTheme: () => void;
//   }
  
//   export function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
//     return (
//       <button 
//         onClick={toggleTheme}
//         className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
//         aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
//       >
//         {theme === 'light' ? (
//           <MoonIcon className="h-5 w-5" />
//         ) : (
//           <SunIcon className="h-5 w-5" />
//         )}
//       </button>
//     );
//   }



'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-gray-900 dark:text-white" />
      ) : (
        <SunIcon className="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
      )}
    </button>
  );
}
