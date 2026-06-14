import { getDatabase } from './client';
import { SCHEMA_SQL, SCHEMA_VERSION } from './schema';
import { seedDatabase } from './seed';

// Cria as tabelas (guardadas por PRAGMA user_version) e popula o seed.
// Deve ser chamada uma vez no boot do app (App.tsx).
export function migrateDatabase(): void {
  const db = getDatabase();

  const row = db.getFirstSync<{ user_version: number }>('PRAGMA user_version;');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion < SCHEMA_VERSION) {
    db.execSync(SCHEMA_SQL);
    db.execSync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
  }

  seedDatabase(db);
}
