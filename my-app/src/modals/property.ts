

export interface Property {
  id: string; 
  title: string;
  description: string;
  type: 'house' | 'apartment' | 'land' | 'commercial';
  status: 'for_sale' | 'for_rent' | 'sold';
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  yearBuilt?: number;
  createdAt: string; 
  updatedAt: string; 
}