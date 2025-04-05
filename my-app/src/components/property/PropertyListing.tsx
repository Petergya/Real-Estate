'use client';

import { useProperties } from '@/hooks/useProperties';
import { PropertyCard } from './PropertyCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function PropertyListings() {
  const { properties, loading, error } = useProperties();

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading properties</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties?.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}