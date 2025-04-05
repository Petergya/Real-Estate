




'use client';

import { useState, useMemo } from 'react';
import { propertyTypes } from '@/constants/propertyTypes';
import { amenities } from '@/constants/amenities';
import { locations, type LocationItem, type LocationOption } from '@/constants/locations';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface SearchFiltersProps {
  onFilter: (filters: {
    priceRange: [number, number];
    selectedTypes: string[];
    selectedAmenities: string[];
    bedrooms: number | '';
    bathrooms: number | '';
    selectedLocation: string;
    selectedCommunity?: string;
  }) => void;
}

function isLocationGroup(item: LocationItem): item is { group: string; options: LocationOption[] } {
  return 'group' in item;
}

function isNestedLocation(item: LocationOption): item is { value: string; label: string; options?: LocationOption[] } {
  return 'options' in item;
}

export function SearchFilters({ onFilter }: SearchFiltersProps) {
  // Initial state values
  const initialPriceRange: [number, number] = [0, 1000000];
  const initialSelectedTypes: string[] = [];
  const initialSelectedAmenities: string[] = [];
  const initialBedrooms: number | '' = '';
  const initialBathrooms: number | '' = '';
  const initialLocation: string = '';
  const initialCommunity: string = '';

  // State management
  const [priceRange, setPriceRange] = useState<[number, number]>(initialPriceRange);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialSelectedTypes);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialSelectedAmenities);
  const [bedrooms, setBedrooms] = useState<number | ''>(initialBedrooms);
  const [bathrooms, setBathrooms] = useState<number | ''>(initialBathrooms);
  const [selectedLocation, setSelectedLocation] = useState<string>(initialLocation);
  const [selectedCommunity, setSelectedCommunity] = useState<string>(initialCommunity);

  // Get Jos communities if Jos is selected
  const josCommunities = useMemo(() => {
    if (selectedLocation !== 'jos') return [];
    
    const nigeriaGroup = locations.find(item => isLocationGroup(item) && item.group === 'Nigeria');
    if (!nigeriaGroup || !isLocationGroup(nigeriaGroup)) return [];
    
    const josOption = nigeriaGroup.options.find(opt => opt.value === 'jos');
    if (!josOption || !isNestedLocation(josOption) || !josOption.options) return [];
    
    return josOption.options.filter(opt => opt.value !== 'jos_all');
  }, [selectedLocation]);

  // Apply filters
  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      selectedTypes,
      selectedAmenities,
      bedrooms,
      bathrooms,
      selectedLocation,
      selectedCommunity: selectedLocation === 'jos' ? selectedCommunity : undefined
    });
  };

  // Reset all filters
  const handleReset = () => {
    setPriceRange(initialPriceRange);
    setSelectedTypes(initialSelectedTypes);
    setSelectedAmenities(initialSelectedAmenities);
    setBedrooms(initialBedrooms);
    setBathrooms(initialBathrooms);
    setSelectedLocation(initialLocation);
    setSelectedCommunity(initialCommunity);
    
    onFilter({
      priceRange: initialPriceRange,
      selectedTypes: initialSelectedTypes,
      selectedAmenities: initialSelectedAmenities,
      bedrooms: initialBedrooms,
      bathrooms: initialBathrooms,
      selectedLocation: initialLocation
    });
  };

  // Toggle property type selection
  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Toggle amenity selection
  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  // Flatten locations for main select
  const mainLocations = useMemo(() => {
    return locations.flatMap(item => {
      if (isLocationGroup(item)) {
        return item.options;
      }
      return item;
    });
  }, []);

  // Bedroom options
  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  // Bathroom options
  const bathroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Filters</h3>
      
      <div className="space-y-6 w-1/4">
        {/* Location Selector */}
        <div className="space-y-2">
          <Select
            label="Location"
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              setSelectedCommunity('');
            }}
            options={mainLocations.map(loc => ({
              value: loc.value,
              label: loc.label
            }))}
          />
          
          {selectedLocation === 'jos' && (
            <Select
              label="Community in Jos"
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              options={[
                { value: '', label: 'All Communities' },
                ...josCommunities.map(comm => ({
                  value: comm.value,
                  label: comm.label
                }))
              ]}
            />
          )}
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              min={0}
            />
            <span>to</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              min={priceRange[0]}
            />
          </div>
        </div>
        
        {/* Property Type - Fixed Checkboxes */}
        <div>
          <label className="block text-sm font-medium mb-1">Property Type</label>
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <div key={type.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`type-${type.value}`}
                  checked={selectedTypes.includes(type.value)}
                  onChange={() => handleTypeToggle(type.value)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor={`type-${type.value}`} className="text-sm text-gray-700 dark:text-gray-300">
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bedrooms */}
        <div className='w-full'>
          <Select
            label="Bedrooms"
            value={bedrooms.toString()}
            onChange={(e) => setBedrooms(e.target.value === '' ? '' : Number(e.target.value))}
            options={bedroomOptions}
          />
        </div>
        
        {/* Bathrooms */}
        <div className='w-full'>
          <Select
            label="Bathrooms"
            value={bathrooms.toString()}
            onChange={(e) => setBathrooms(e.target.value === '' ? '' : Number(e.target.value))}
            options={bathroomOptions}
          />
        </div>
        
        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium mb-1">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {amenities.map((amenity) => (
              <div key={amenity.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`amenity-${amenity.value}`}
                  checked={selectedAmenities.includes(amenity.value)}
                  onChange={() => handleAmenityToggle(amenity.value)}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor={`amenity-${amenity.value}`} className="text-sm text-gray-700 dark:text-gray-300">
                  {amenity.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className='flex justify-center items-center gap-x-6 pt-4'>
          <Button 
            variant="outline" 
            className="w-1/3"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button 
            variant="default" 
            className="w-1/2 bg-primary-600 text-black  hover:bg-primary-700"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}