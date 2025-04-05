import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { useEffect, useState } from 'react';

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme(); 

  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = session?.user
    ? {
        name: session.user.name || 'User',
        email: session.user.email || 'no-email@example.com',
        avatar: session.user.image ?? undefined,
      }
    : null;

  if (!mounted) {
    return (
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center h-[64px]">
          {/* Empty header during SSR */}
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-primary-600 dark:text-primary-400 hover:opacity-90 transition-opacity"
          aria-label="Home"
        >
          RealEstate
        </Link>

        <nav className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/properties"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Properties"
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="About"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Contact"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {status === 'authenticated' ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex gap-4">
                <Link href="/auth/login" passHref legacyBehavior>
                  <Button variant="outline" className="hidden sm:inline-flex">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" passHref legacyBehavior>
                  <Button variant="outline" className="hidden text-black sm:inline-flex">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
