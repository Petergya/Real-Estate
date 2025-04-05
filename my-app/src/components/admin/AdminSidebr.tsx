// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/db.ts/utils';

// const adminLinks = [
//   { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
//   { href: '/admin/properties', label: 'Properties', icon: 'home' },
//   { href: '/admin/users', label: 'Users', icon: 'users' },
// ];

// export function AdminSidebar() {
//   const pathname = usePathname();

//   return (
//     <div className="fixed h-full w-64 bg-white dark:bg-gray-900 border-r shadow-sm">
//       <div className="p-4 border-b">
//         <h1 className="text-xl font-bold">Admin Panel</h1>
//       </div>
//       <nav className="p-4 space-y-1">
//         {adminLinks.map((link) => (
//           <Link
//             key={link.href}
//             href={link.href}
//             className={cn(
//               'flex items-center px-4 py-2 rounded-lg transition-colors',
//               pathname === link.href
//                 ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
//                 : 'hover:bg-gray-100 dark:hover:bg-gray-800'
//             )}
//           >
//             <span className="mr-3">{link.icon}</span>
//             {link.label}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// }


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Settings,
  LogOut 
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/properties', icon: Home, label: 'Properties' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed h-full w-64 border-r bg-white dark:bg-gray-900">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">RealEstate Admin</h1>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
        <button className="flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
}