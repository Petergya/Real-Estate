export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    avatar?: string;
    role: 'user' | 'admin' | 'agent';
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SignInResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
  }