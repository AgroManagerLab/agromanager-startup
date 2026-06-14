import * as SQLite from 'expo-sqlite';

// Conexão única (síncrona) com o banco local. expo-sqlite é a ÚNICA fonte
// de dados/estado do app — não há zustand ou outra lib de estado.
// Ver rules/data-and-state.md
export const DB_NAME = 'agromanager.db';

let db: SQLite.SQLiteDatabase | null = null;

export function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) {
    db = SQLite.openDatabaseSync(DB_NAME);
    db.execSync('PRAGMA foreign_keys = ON;');
  }
  return db;
}
