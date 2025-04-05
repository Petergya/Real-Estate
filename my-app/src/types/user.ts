export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'agent' | 'admin';
    emailVerified: boolean;
    favorites: string[]; // Array of property IDs
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserProfile extends Omit<User, 'favorites'> {
    favoritesCount: number;
  }
  
  export interface AuthUser extends User {
    accessToken: string;
  }
  
  export interface SocialLoginUser {
    provider: 'google' | 'facebook' | 'apple';
    providerId: string;
    email: string;
    name: string;
    avatar?: string;
  }