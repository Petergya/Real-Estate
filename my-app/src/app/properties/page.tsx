
'use client';

import { useState } from 'react';
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { MotionDiv } from "@/components/motions/MotionDiv";
import { SearchFilters } from "@/components/property/SearchFilter";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Property } from "@/modals/property";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { PropertiesHero } from '@/components/propertyhero/PropertiesHero';

// Mock data matching the Property interface
const properties: Property[] = [
  {
    id: "1",
    title: "Luxury Beachfront Villa",
    description: "Stunning ocean views with modern amenities",
    type: "house",
    status: "for_sale",
    price: 1250000,
    address: "123 Coastal Drive",
    city: "Malibu",
    state: "CA",
    zip: "90265",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    images: [
      "/villa1.jpg",
      "/villa2.jpg",
      "/villa3.jpg"
    ],
    yearBuilt: 2018,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Downtown Loft",
    description: "Modern living in the heart of the city",
    type: "apartment",
    status: "for_rent",
    price: 3200,
    address: "456 Urban Ave",
    city: "New York",
    state: "NY",
    zip: "10001",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    images: [
      "/loft1.jpg",
      "/loft2.jpg"
    ],
    yearBuilt: 2015,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "10-Acre Farm Land",
    description: "Prime agricultural land with water rights",
    type: "land",
    status: "for_sale",
    price: 450000,
    address: "789 Rural Rd",
    city: "Austin",
    state: "TX",
    zip: "78701",
    bedrooms: 0,
    bathrooms: 0,
    sqft: 435600,
    images: [
      "/land1.jpg",
      "/land2.jpg"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
     <PropertiesHero />

      {/* Search Filter - Remove props if not needed */}
      <SearchFilters onFilter={function (_filters: { priceRange: [number, number]; selectedTypes: string[]; selectedAmenities: string[]; bedrooms: number | ''; bathrooms: number | ''; }): void {
              throw new Error('Function not implemented.');
          } } />

      {/* Properties Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <MotionDiv
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl t md:text-4xl font-bold mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8">Our agents can help you find the perfect property that meets all your needs.</p>
          <div className="flex gap-4 justify-center">
            <Button  className="bg-white text-primary-600 hover:bg-gray-100 border">
              Contact Agent
            </Button>
            <Button className="bg-white text-primary-600 hover:bg-gray-100 border">
              Browse All Properties
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}