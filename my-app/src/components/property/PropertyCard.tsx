

'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/modals/property';
import { Badge } from '@/components/ui/Badge';
import { FavoriteButton } from './FavoriteButton';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5 }}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image Swiper */}
      <div className="relative h-48">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={property.images.length > 1}
          className="h-full w-full"
        >
          {property.images.length > 0 ? (
            property.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image || '/images/default-property.jpg'}
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Image
                src="/images/default-property.jpg"
                alt="Default property image"
                fill
                className="object-cover"
              />
            </SwiperSlide>
          )}
        </Swiper>

        {/* Favorite Button */}
        <FavoriteButton 
          propertyId={property.id} 
          className="absolute top-2 right-2 z-10" 
        />

        {/* Status Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 z-10"
        >
          {property.status === 'for_sale' ? 'For Sale' : 
           property.status === 'for_rent' ? 'For Rent' : 'Sold'}
        </Badge>
      </div>

      {/* Property Details */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4"
      >
        <h3 className="font-bold text-lg mb-1">
          <Link 
            href={`/properties/${property.id}`} 
            className="hover:text-primary-600 transition-colors"
          >
            {property.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {property.address}, {property.city}, {property.state} {property.zip}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary-600">
            ${property.price.toLocaleString()}
            {property.status === 'for_rent' && '/mo'}
          </span>
          
          <div className="flex space-x-2 text-sm text-gray-500">
            <span>{property.bedrooms} beds</span>
            <span>{property.bathrooms} baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}