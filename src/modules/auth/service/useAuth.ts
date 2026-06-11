import { useCallback } from 'react';
import type { RootStackParamList } from '../../../global/@types/navigation';
import { authenticate, routeForProfile } from './authService';

export interface SignInResult {
  ok: boolean;
  routeName?: keyof RootStackParamList;
}

export function useAuth() {
  const signIn = useCallback((email: string, password: string): SignInResult => {
    if (!email.trim() || !password) {
      return { ok: false };
    }

    const result = authenticate(email);
    return {
      ok: true,
      routeName: routeForProfile(result.profile),
    };
  }, []);

  return { signIn };
}
