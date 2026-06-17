import { getDatabase } from '../database/client';
import type { AuthResult } from '../types';

const DEMO_PASSWORD = 'milkroute';
const DEMO_PRODUCER_EMAIL = 'joao@coopvaleleite.coop.br';

function findMilkmanIdByCredentials(normalizedEmail: string, password: string): string | undefined {
  const db = getDatabase();
  const row = db.getFirstSync<{ id: string }>(
    'SELECT id FROM milkmen WHERE lower(email) = ? AND password = ?;',
    [normalizedEmail, password],
  );
  return row ? row.id : undefined;
}

export function determineProfileFromCredentials(
  normalized: string,
  password: string,
  milkmanId?: string,
): AuthResult | null {
  if (!normalized || !password) return null;
  if (milkmanId) return { profile: 'milkman', userId: milkmanId };
  if (normalized.startsWith('admin') && password === DEMO_PASSWORD) return { profile: 'admin', userId: 'ADMIN' };
  if (normalized === DEMO_PRODUCER_EMAIL && password === DEMO_PASSWORD) {
    return { profile: 'producer', userId: 'P-014' };
  }
  return null;
}

export function authenticate(email: string, password: string): AuthResult | null {
  const normalized = email.trim().toLowerCase();
  const milkmanId = findMilkmanIdByCredentials(normalized, password);
  return determineProfileFromCredentials(normalized, password, milkmanId);
}
