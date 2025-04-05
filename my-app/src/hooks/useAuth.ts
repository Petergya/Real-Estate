
"use client"
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useSession } from 'next-auth/react';

export function useAuth() {
  const context = useContext(AuthContext);
  const { data: session, status } = useSession();

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    ...context,
    session,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  };
}



