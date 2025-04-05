import { z } from 'zod';

export const propertyFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  bedrooms: z.number().min(0, 'Bedrooms cannot be negative'),
  bathrooms: z.number().min(0, 'Bathrooms cannot be negative'),
  sqft: z.number().min(1, 'Square footage must be at least 1'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  type: z.enum(['house', 'apartment', 'condo', 'land', 'commercial']),
  status: z.enum(['for_sale', 'for_rent', 'sold']),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
});

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'agent', 'admin']),
});

export const paymentSchema = z.object({
  cardNumber: z.string().length(16, 'Card number must be 16 digits'),
  expDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiration date'),
  cvc: z.string().length(3, 'CVC must be 3 digits'),
  name: z.string().min(1, 'Name is required'),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
export type UserFormValues = z.infer<typeof userSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;