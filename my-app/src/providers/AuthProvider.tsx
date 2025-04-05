'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { authService } from '@/lib/api/auth';
import { User } from '@/types/auth';

type AuthContextType = {
  user: User | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();
  const [user, setUser] = useState<User | null>(null);

  // Sync session with local state
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }
  }, [session, status]);

  const login = async (email: string, password: string) => {
    try {
      const { user, accessToken } = await authService.login(email, password);
      await update({
        ...session,
        user,
        accessToken,
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const newUser = await authService.register(name, email, password);
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      await signOut({ redirect: false });
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      await update({
        ...session,
        user: updatedUser,
      });
    } catch (error) {
      throw error;
    }
  };

  const refreshSession = async () => {
    try {
      await update();
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    status: status as 'authenticated' | 'unauthenticated' | 'loading',
    login,
    register,
    logout,
    updateUser,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}