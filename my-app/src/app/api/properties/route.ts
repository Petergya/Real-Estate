import { NextResponse } from 'next/server';
import { Property } from '@/modals/property';

// Mock data - replace with actual database calls
const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    description: 'Beautiful modern apartment with great views',
    price: 350000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    type: 'apartment',
    status: 'for_sale',
    images: ['/images/default-property.jpg'],
    features: ['pool', 'garage'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more properties...
];

export async function GET() {
  return NextResponse.json(properties);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newProperty = {
    ...data,
    id: (properties.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  properties.push(newProperty);
  return NextResponse.json(newProperty);
}