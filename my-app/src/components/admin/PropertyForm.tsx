'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Property } from '@/modals/property';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { propertyTypes } from '@/constants/propertyTypes';
import { amenities } from '@/constants/amenities';

const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  sqft: z.number().min(1, 'Square footage must be greater than 0'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  type: z.enum(['house', 'apartment', 'condo', 'land', 'commercial']),
  status: z.enum(['for_sale', 'for_rent', 'sold']),
  features: z.array(z.string()),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  initialData?: Property;
  onSubmit: (data: PropertyFormValues) => Promise<void>;
}

export function PropertyForm({ initialData, onSubmit }: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      features: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const selectedFeatures = watch('features') || [];

  const handleFeatureToggle = (feature: string) => {
    setValue(
      'features',
      selectedFeatures.includes(feature)
        ? selectedFeatures.filter((f) => f !== feature)
        : [...selectedFeatures, feature]
    );
  };

  const onFormSubmit = async (data: PropertyFormValues) => {
    try {
      setLoading(true);
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          {...register('title')}
          error={errors.title?.message}
        />
        
        <Select
          label="Property Type"
          {...register('type')}
          error={errors.type?.message}
        >
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
        
        <Input
          label="Price"
          type="number"
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message}
        />
        
        <Select
          label="Status"
          {...register('status')}
          error={errors.status?.message}
        >
          <option value="for_sale">For Sale</option>
          <option value="for_rent">For Rent</option>
          <option value="sold">Sold</option>
        </Select>
        
        <Input
          label="Bedrooms"
          type="number"
          {...register('bedrooms', { valueAsNumber: true })}
          error={errors.bedrooms?.message}
        />
        
        <Input
          label="Bathrooms"
          type="number"
          {...register('bathrooms', { valueAsNumber: true })}
          error={errors.bathrooms?.message}
        />
        
        <Input
          label="Square Feet"
          type="number"
          {...register('sqft', { valueAsNumber: true })}
          error={errors.sqft?.message}
        />
      </div>
      
      <Input
        label="Address"
        {...register('address')}
        error={errors.address?.message}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="City"
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          label="State"
          {...register('state')}
          error={errors.state?.message}
        />
        <Input
          label="ZIP Code"
          {...register('zip')}
          error={errors.zip?.message}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Features</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map((amenity) => (
            <div key={amenity.value} className="flex items-center">
              <input
                type="checkbox"
                id={`feature-${amenity.value}`}
                checked={selectedFeatures.includes(amenity.value)}
                onChange={() => handleFeatureToggle(amenity.value)}
                className="mr-2"
              />
              <label htmlFor={`feature-${amenity.value}`}>{amenity.label}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register('description')}
          rows={5}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          {initialData ? 'Update Property' : 'Create Property'}
        </Button>
      </div>
    </form>
  );
}