import { getDatabase } from '../database';
import type { AuthResult } from '../types';

function findMilkmanIdByEmail(normalizedEmail: string): string | undefined {
  const db = getDatabase();
  const row = db.getFirstSync<{ id: string }>(
    'SELECT id FROM milkmen WHERE lower(email) = ?;',
    [normalizedEmail],
  );
  return row ? row.id : undefined;
}

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
