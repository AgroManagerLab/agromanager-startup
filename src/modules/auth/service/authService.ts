import { getDatabase } from '../../../global/database';
import type { RootStackParamList, UserProfile } from '../../../global/@types/navigation';
import type { AuthResult } from '../@types/auth';

// Autenticação mockada sobre o SQLite — RF-01 / REQ-01.2.
// Identifica o perfil pelo e-mail informado. Nesta fase só o módulo Produtor
// está implementado; admin/leiteiro caem em telas "Em breve".
export function authenticate(email: string): AuthResult {
  const db = getDatabase();
  const normalized = email.trim().toLowerCase();

  const milkman = db.getFirstSync<{ id: string }>(
    'SELECT id FROM milkmen WHERE lower(email) = ?;',
    [normalized],
  );
  if (milkman) {
    return { profile: 'milkman', userId: milkman.id };
  }

  if (normalized.startsWith('admin')) {
    return { profile: 'admin', userId: 'ADMIN' };
  }

  // Default desta fase: produtor logado (P-014).
  return { profile: 'producer', userId: 'P-014' };
}

const ROUTE_BY_PROFILE: Record<UserProfile, keyof RootStackParamList> = {
  producer: 'Producer',
  admin: 'Admin',
  milkman: 'Milkman',
};

export function routeForProfile(profile: UserProfile): keyof RootStackParamList {
  return ROUTE_BY_PROFILE[profile];
}
