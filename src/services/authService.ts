import type { RootStackParamList, UserProfile, AuthResult } from '../types';
import { findMilkmanIdByEmail } from './userRepository';

// Autenticação mockada sobre o SQLite — RF-01 / REQ-01.2.
// Identifica o perfil pelo e-mail informado. Nesta fase só o módulo Produtor
// está implementado; admin/leiteiro caem em telas "Em breve".
export function determineProfileFromEmail(normalized: string, milkmanId?: string): AuthResult {
  if (milkmanId) return { profile: 'milkman', userId: milkmanId };
  if (normalized.startsWith('admin')) return { profile: 'admin', userId: 'ADMIN' };
  return { profile: 'producer', userId: 'P-014' };
}

export function authenticate(email: string): AuthResult {
  const normalized = email.trim().toLowerCase();
  const milkmanId = findMilkmanIdByEmail(normalized);
  return determineProfileFromEmail(normalized, milkmanId);
}

const ROUTE_BY_PROFILE: Record<UserProfile, keyof RootStackParamList> = {
  producer: 'ProducerTabs',
  admin: 'Admin',
  milkman: 'Milkman',
};

export function routeForProfile(profile: UserProfile): keyof RootStackParamList {
  return ROUTE_BY_PROFILE[profile];
}
