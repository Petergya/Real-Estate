
"use client"
import { useState, useEffect } from 'react';
import { favoritesService } from '@/lib/api/favorites';

export function useFavorites(userId?: string) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const loadFavorites = async () => {
      try {
        const data = await favoritesService.getFavorites(userId);
        setFavorites(data);
      } catch (error) {
        console.error('Failed to load favorites', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [userId]);

  const toggleFavorite = async (propertyId: string) => {
    if (!userId) return;

    try {
      if (favorites.includes(propertyId)) {
        await favoritesService.removeFavorite(userId, propertyId);
        setFavorites(favorites.filter(id => id !== propertyId));
      } else {
        await favoritesService.addFavorite(userId, propertyId);
        setFavorites([...favorites, propertyId]);
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  return { favorites, loading, toggleFavorite };
}