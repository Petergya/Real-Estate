import { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebr';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 p-6 ml-64">
        <main className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          {children}
        </main>
      </div>
    </div>
  );
}