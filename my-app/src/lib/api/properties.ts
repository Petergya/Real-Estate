import axios from 'axios';
import { Property } from '@/modals/property';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function getProperties(): Promise<Property[]> {
  const response = await axios.get(`${API_URL}/properties`);
  return response.data;
}

export async function getPropertyById(id: string): Promise<Property> {
  const response = await axios.get(`${API_URL}/properties/${id}`);
  return response.data;
}

export async function createProperty(property: Omit<Property, 'id'>): Promise<Property> {
  const response = await axios.post(`${API_URL}/properties`, property);
  return response.data;
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<Property> {
  const response = await axios.put(`${API_URL}/properties/${id}`, property);
  return response.data;
}

export async function deleteProperty(id: string): Promise<void> {
  await axios.delete(`${API_URL}/properties/${id}`);
}