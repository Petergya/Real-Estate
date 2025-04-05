import { Property } from '@/modals/property';
import { PropertyGallery } from './PropertyGallery';
import { MapView } from './MapView';
import { ContactAgentForm } from './ContactAgentForm';
import { SimilarProperties } from './SimilarProperties';

interface PropertyDetailProps {
  property: Property;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {property.address}, {property.city}, {property.state} {property.zip}
          </p>
          
          <PropertyGallery images={property.images} />
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 dark:text-gray-300">{property.description}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-500">Price</p>
                <p className="font-bold">${property.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Bedrooms</p>
                <p className="font-bold">{property.bedrooms}</p>
              </div>
              <div>
                <p className="text-gray-500">Bathrooms</p>
                <p className="font-bold">{property.bathrooms}</p>
              </div>
              <div>
                <p className="text-gray-500">Square Feet</p>
                <p className="font-bold">{property.sqft.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <MapView address={`${property.address}, ${property.city}, ${property.state}`} />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
              <ContactAgentForm propertyId={property.id} />
            </div>
          </div>
        </div>
      </div>
      
      <SimilarProperties currentPropertyId={property.id} />
    </div>
  );
}