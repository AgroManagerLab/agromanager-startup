import type { SQLiteDatabase } from 'expo-sqlite';

import { getDatabase } from './client';
import { SCHEMA_SQL, SCHEMA_VERSION } from './schema';
import { seedDatabase } from './seed';

// Verifica se uma coluna já existe numa tabela.
// O SCHEMA_SQL cria as tabelas já com o schema mais recente; em instalação
// nova a coluna já existe e o ALTER incremental falharia com "duplicate column".
function columnExists(db: SQLiteDatabase, table: string, column: string): boolean {
  const cols = db.getAllSync<{ name: string }>(`PRAGMA table_info(${table});`);
  return cols.some((c) => c.name === column);
}

// Cria as tabelas (guardadas por PRAGMA user_version) e popula o seed.
// Deve ser chamada uma vez no boot do app (App.tsx).
export function migrateDatabase(): void {
  const db = getDatabase();

  const row = db.getFirstSync<{ user_version: number }>('PRAGMA user_version;');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion < SCHEMA_VERSION) {
    db.execSync(SCHEMA_SQL);
    if (currentVersion < 2 && !columnExists(db, 'producers', 'route_order')) {
      db.execSync('ALTER TABLE producers ADD COLUMN route_order INTEGER DEFAULT 0;');
    }
    if (currentVersion < 3) {
      // milkman_routes já é criada pelo SCHEMA_SQL acima;
      // só precisa ser populada em bancos existentes.
    }
    if (currentVersion < 4) {
      // admins já é criada pelo SCHEMA_SQL; só as colunas novas precisam de ALTER.
      if (!columnExists(db, 'producers', 'email')) {
        db.execSync('ALTER TABLE producers ADD COLUMN email TEXT;'); // FR-2.1
      }
      if (!columnExists(db, 'milkmen', 'active_route_id')) {
        db.execSync('ALTER TABLE milkmen ADD COLUMN active_route_id TEXT;'); // FR-3.2
      }
    }
    db.execSync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
  }

  seedDatabase(db);
}
