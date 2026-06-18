import type { AuthResult } from '../types';
import {
  findAdminIdByCredentials,
  findMilkmanIdByCredentials,
  findProducerIdByCredentials,
} from './userRepository';

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Decisão pura de perfil a partir dos ids encontrados no banco (testável sem DB).
// Prioridade: leiteiro → admin → produtor. FR-4.2.
export function pickAuthResult(
  milkmanId?: string,
  adminId?: string,
  producerId?: string,
): AuthResult | null {
  if (milkmanId) return { profile: 'milkman', userId: milkmanId };
  if (adminId) return { profile: 'admin', userId: adminId };
  if (producerId) return { profile: 'producer', userId: producerId };
  return null;
}

export function authenticate(email: string, password: string): AuthResult | null {
  const normalized = normalizeEmail(email);
  if (!normalized || !password) return null;

  const milkmanId = findMilkmanIdByCredentials(normalized, password);
  const adminId = milkmanId ? undefined : findAdminIdByCredentials(normalized, password);
  const producerId =
    milkmanId || adminId ? undefined : findProducerIdByCredentials(normalized, password);

  return pickAuthResult(milkmanId, adminId, producerId);
}
