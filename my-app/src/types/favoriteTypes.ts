export interface Favorite {
    id: string;
    userId: string;
    propertyId: string;
    createdAt: string;
    updatedAt: string;
    property: {
      id: string;
      title: string;
      price: number;
      image: string;
    };
  }
  
  export interface FavoriteToggleResponse {
    action: 'added' | 'removed';
    favoritesCount: number;
  }