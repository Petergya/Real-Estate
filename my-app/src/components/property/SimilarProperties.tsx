import { PropertyCard } from './PropertyCard';
import { useProperties } from '@/hooks/useProperties';

interface SimilarPropertiesProps {
  currentPropertyId: string;
}

export function SimilarProperties({ currentPropertyId }: SimilarPropertiesProps) {
  const { properties } = useProperties();
  const similarProperties = properties
    ?.filter(property => property.id !== currentPropertyId)
    .slice(0, 3);

  if (!similarProperties || similarProperties.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}