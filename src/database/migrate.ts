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
    if (currentVersion < 2) {
      db.execSync('ALTER TABLE producers ADD COLUMN route_order INTEGER DEFAULT 0;');
    }
    if (currentVersion < 3) {
      // milkman_routes já é criada pelo SCHEMA_SQL acima;
      // só precisa ser populada em bancos existentes.
    }
    db.execSync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
  }

  seedDatabase(db);
}
