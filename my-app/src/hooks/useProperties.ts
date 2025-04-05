



'use client'; // Add this directive at the top

import { useState, useEffect } from 'react';
import { Property } from '@/modals/property';
import { getProperties } from '@/lib/api/properties';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch properties');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
}