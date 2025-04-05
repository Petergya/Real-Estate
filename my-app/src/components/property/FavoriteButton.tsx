


'use client';

import { useState, useEffect } from 'react';
import { RiHeartFill } from 'react-icons/ri';
import { cn } from "@/lib/utils"; // Ensure this import is correct

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
}

export function FavoriteButton({ propertyId, className }: FavoriteButtonProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if property is in user's favorites (this should be fetched from an API)
    setIsFavorite(false);
  }, [propertyId, user]);

  const toggleFavorite = async () => {
    if (!user) {
      // Handle login modal or redirect
      return;
    }

    try {
      // Call API to toggle favorite status
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleFavorite}
      className={cn(
        'p-2 rounded-full bg-white/90 backdrop-blur-sm',
        isFavorite ? 'text-red-500' : 'text-gray-400',
        className
      )}
    >
      <RiHeartFill className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
    </Button>
  );
}
