// 'use client';

// import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: 'user' | 'admin';
// };

// type AuthContextType = {
//   user: User | null;
//   status: 'authenticated' | 'unauthenticated' | 'loading';
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { data: session, status } = useSession();
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user) {
//       setUser({
//         id: session.user.id,
//         name: session.user.name || '',
//         email: session.user.email || '',
//         role: session.user.role || 'user',
//       });
//     } else {
//       setUser(null);
//     }
//   }, [session, status]);

//   const login = async (email: string, password: string) => {
//     // Implement login logic
//   };

//   const logout = async () => {
//     // Implement logout logic
//   };

//   const register = async (name: string, email: string, password: string) => {
//     // Implement register logic
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       status: status as 'authenticated' | 'unauthenticated' | 'loading',
//       login,
//       logout,
//       register,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Session } from 'next-auth';

type AuthContextType = {
  user: Session['user'] | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Session['user'] | null>(null);

  const login = async (email: string, password: string) => {
    // Implement your login logic
  };

  const logout = async () => {
    // Implement logout logic
  };

  const register = async (name: string, email: string, password: string) => {
    // Implement registration logic
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}