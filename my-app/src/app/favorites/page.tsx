'use client';

import { useAuth } from '@/hooks/useAuth';
import { PropertyCard } from '@/components/property/PropertyCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/modals/property';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Fetch user's favorite properties
      // This would typically come from an API call
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to view your favorites</h2>
        <Link href="/auth/login" className="text-primary-600 hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Save properties you like by clicking the heart icon
          </p>
          <Link
            href="/properties"
            className="mt-4 inline-block text-primary-600 hover:underline"
          >
            Browse properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}