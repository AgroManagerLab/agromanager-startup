import React, { createContext, useContext, useState, useCallback } from 'react';
import type { UserProfile } from '../types';
import { authenticate } from '../services/authService';

interface AuthState {
  profile: UserProfile | null;
  userId: string | null;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  profile: null,
  userId: null,
  signIn: () => false,
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ profile: null, userId: null });

  const signIn = useCallback((email: string, password: string): boolean => {
    if (!email.trim() || !password) return false;

    const result = authenticate(email);
    setState({ profile: result.profile, userId: result.userId });
    return true;
  }, []);

  const signOut = useCallback(() => {
    setState({ profile: null, userId: null });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
