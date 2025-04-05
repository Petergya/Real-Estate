"use client"

import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function FeaturedListings() {
  const { properties, loading } = useProperties();
  const featuredProperties = properties?.slice(0, 3) || [];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Properties</h2>
          <Link href="/properties">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}