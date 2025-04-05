import axios from 'axios';
import { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const usersService = {
  async getUsers(): Promise<User[]> {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  async getUserById(id: string): Promise<User> {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await axios.patch(`${API_URL}/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`${API_URL}/users/${id}`);
  },
};