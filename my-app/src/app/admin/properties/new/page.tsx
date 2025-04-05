import { AdminLayout } from '@/components/admin/AdminLayout';
import { PropertyForm } from '@/components/admin/PropertyForm';
import { createProperty } from '@/lib/api/properties';

export default function AdminNewPropertyPage() {
  const handleSubmit = async (data: any) => {
    'use server';
    await createProperty(data);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-8">Add New Property</h1>
      <PropertyForm onSubmit={handleSubmit} />
    </AdminLayout>
  );
}