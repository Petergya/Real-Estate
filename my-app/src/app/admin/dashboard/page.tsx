import { AdminLayout } from '@/components/admin/AdminLayout';
import { DashboardCards } from '@/components/admin/DashboardCard';
import { RecentActivities } from '@/components/admin/RecentActivities';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <DashboardCards />
      <RecentActivities className="mt-8" />
    </AdminLayout>
  );
}