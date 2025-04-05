import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const favoritesService = {
  async getFavorites(userId: string): Promise<string[]> {
    const response = await axios.get(`${API_URL}/favorites?userId=${userId}`);
    return response.data;
  },

  async addFavorite(userId: string, propertyId: string): Promise<void> {
    await axios.post(`${API_URL}/favorites`, { userId, propertyId });
  },

  async removeFavorite(userId: string, propertyId: string): Promise<void> {
    await axios.delete(`${API_URL}/favorites`, {
      data: { userId, propertyId },
    });
  },
};