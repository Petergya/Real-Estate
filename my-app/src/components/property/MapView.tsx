'use client';

import { useEffect, useRef } from 'react';

interface MapViewProps {
  address: string;
  className?: string;
}

export function MapView({ address, className }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      // In a real app, you would initialize a map here (Google Maps, Mapbox, etc.)
      // This is just a placeholder implementation
      console.log('Initializing map for address:', address);
    }
  }, [address]);

  return (
    <div
      ref={mapRef}
      className={`bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center ${className}`}
    >
      <div className="text-center p-4">
        <p className="text-gray-600 dark:text-gray-400">Map would display here</p>
        <p className="text-sm mt-2">{address}</p>
      </div>
    </div>
  );
}