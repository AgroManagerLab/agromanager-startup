import { getDatabase } from '../database/client';

// Lookups de credenciais por e-mail + senha (texto plano — MVP). FR-4.2.
// Cada perfil tem sua tabela; o authService decide a prioridade.

export function findMilkmanIdByCredentials(
  normalizedEmail: string,
  password: string,
): string | undefined {
  const db = getDatabase();
  const row = db.getFirstSync<{ id: string }>(
    'SELECT id FROM milkmen WHERE lower(email) = ? AND password = ?;',
    [normalizedEmail, password],
  );
  return row ? row.id : undefined;
}

export function findAdminIdByCredentials(
  normalizedEmail: string,
  password: string,
): string | undefined {
  const db = getDatabase();
  const row = db.getFirstSync<{ id: string }>(
    'SELECT id FROM admins WHERE lower(email) = ? AND password = ?;',
    [normalizedEmail, password],
  );
  return row ? row.id : undefined;
}

export function findProducerIdByCredentials(
  normalizedEmail: string,
  password: string,
): string | undefined {
  const db = getDatabase();
  const row = db.getFirstSync<{ id: string }>(
    'SELECT id FROM producers WHERE lower(email) = ? AND password = ?;',
    [normalizedEmail, password],
  );
  return row ? row.id : undefined;
}
