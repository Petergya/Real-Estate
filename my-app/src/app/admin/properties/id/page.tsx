import { notFound } from 'next/navigation';
import { getPropertyById } from '@/lib/api/properties';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PropertyForm } from '@/components/admin/PropertyForm';
import { updateProperty } from '@/lib/api/properties';

export default async function AdminPropertyEditPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  const handleSubmit = async (data: any) => {
    'use server';
    await updateProperty(params.id, data);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-8">Edit Property</h1>
      <PropertyForm initialData={property} onSubmit={handleSubmit} />
    </AdminLayout>
  );
}