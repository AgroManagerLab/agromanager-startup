import type { SQLiteDatabase } from 'expo-sqlite';
import type {
  AdminRow,
  CollectionRow,
  CoopRow,
  MilkmanRow,
  ProducerRow,
  RouteRow,
} from '../types';
import { dateDaysAgo } from '../utils/date';

// Seed inicial com dados reais da cooperativa. Preço base por litro — REQ-04.2.
const COOP: CoopRow = { id: 'COOP-01', name: 'Coop. Vale do Leite', price_per_liter: 2.45 };

// Admin da cooperativa (FR-4.1) — antes era hardcoded em adminService/authService.
const ADMIN: Omit<AdminRow, 'coop_id'> = {
  id: 'A-01',
  name: 'Helena Martins',
  email: 'admin@coopvaleleite.coop.br',
  password: 'milkroute',
};

const ROUTES: Omit<RouteRow, 'coop_id'>[] = [
  { id: 'R-N', name: 'Rota Norte', identifier: 'N-01' },
  { id: 'R-S', name: 'Rota Sul', identifier: 'S-01' },
  { id: 'R-L', name: 'Rota Leste', identifier: 'L-01' },
];

const MILKMAN: Omit<MilkmanRow, 'coop_id' | 'active_route_id'> = {
  id: 'M-01',
  name: 'Ricardo Pereira',
  email: 'ricardo@coopvaleleite.coop.br',
  password: 'milkroute',
};

const PRODUCERS: (Omit<ProducerRow, 'coop_id' | 'route_id' | 'password'> & {
  routeId: string;
})[] = [
  { id: 'P-014', routeId: 'R-N', name: 'João Carvalho', farm: 'Faz. Santa Luzia', email: 'joao@coopvaleleite.coop.br', route_order: 1 },
  { id: 'P-022', routeId: 'R-N', name: 'Maria Oliveira', farm: 'Faz. Boa Esperança', email: 'maria@coopvaleleite.coop.br', route_order: 2 },
  { id: 'P-031', routeId: 'R-S', name: 'Pedro Santos', farm: 'Sítio do Vale', email: 'pedro@coopvaleleite.coop.br', route_order: 1 },
  { id: 'P-045', routeId: 'R-S', name: 'Ana Costa', farm: 'Faz. Três Irmãos', email: 'ana@coopvaleleite.coop.br', route_order: 2 },
  { id: 'P-053', routeId: 'R-L', name: 'Carlos Mendes', farm: 'Sítio Beira-Rio', email: 'carlos@coopvaleleite.coop.br', route_order: 1 },
  { id: 'P-068', routeId: 'R-N', name: 'Beatriz Lima', farm: 'Faz. Aurora', email: 'beatriz@coopvaleleite.coop.br', route_order: 3 },
  { id: 'P-074', routeId: 'R-S', name: 'Antônio Rocha', farm: 'Faz. Boa Vista', email: 'antonio@coopvaleleite.coop.br', route_order: 3 },
];

// Coletas de hoje do leiteiro (M-01) — datas relativas a hoje (FR-4.5).
const COLLECTIONS_TODAY: (Pick<CollectionRow, 'id' | 'time' | 'volume'> & { producerId: string })[] = [
  { id: 'C-901', producerId: 'P-014', time: '06:12', volume: 142 },
  { id: 'C-902', producerId: 'P-022', time: '06:48', volume: 168 },
  { id: 'C-903', producerId: 'P-068', time: '07:22', volume: 134 },
  { id: 'C-904', producerId: 'P-074', time: '08:05', volume: 121 },
];

// Coletas históricas do produtor logado (P-014) — REQ-03.16/REQ-03.17.
// daysAgo crescente para popular o mês corrente (FR-4.5).
const COLLECTIONS_P014: (Pick<CollectionRow, 'id' | 'time' | 'volume'> & { daysAgo: number })[] = [
  { id: 'C-13', daysAgo: 1, time: '06:14', volume: 138 },
  { id: 'C-12', daysAgo: 2, time: '06:08', volume: 145 },
  { id: 'C-11', daysAgo: 3, time: '06:21', volume: 132 },
  { id: 'C-10', daysAgo: 4, time: '06:18', volume: 141 },
  { id: 'C-09', daysAgo: 5, time: '06:09', volume: 150 },
  { id: 'C-08', daysAgo: 6, time: '06:32', volume: 128 },
  { id: 'C-07', daysAgo: 7, time: '06:11', volume: 144 },
  { id: 'C-06', daysAgo: 8, time: '06:20', volume: 139 },
];

function insertCollection(
  db: SQLiteDatabase,
  c: { id: string; producerId: string; date: string; time: string; volume: number },
): void {
  db.runSync(
    `INSERT INTO collections
      (id, producer_id, milkman_id, date, time, volume, status, photo_uri, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'synced', NULL, ?, ?);`,
    [c.id, c.producerId, MILKMAN.id, c.date, c.time, c.volume, c.date, c.date],
  );
}

// Garante registros introduzidos em versões novas mesmo em bancos já populados (FR-4.1).
function backfill(db: SQLiteDatabase): void {
  const links = db.getFirstSync<{ c: number }>(
    "SELECT COUNT(*) AS c FROM milkman_routes WHERE milkman_id = 'M-01'",
  );
  if (!links || links.c === 0) {
    db.runSync('INSERT OR IGNORE INTO milkman_routes (milkman_id, route_id) VALUES (?, ?);', ['M-01', 'R-N']);
    db.runSync('INSERT OR IGNORE INTO milkman_routes (milkman_id, route_id) VALUES (?, ?);', ['M-01', 'R-S']);
  }

  const admin = db.getFirstSync<{ c: number }>('SELECT COUNT(*) AS c FROM admins');
  if (!admin || admin.c === 0) {
    db.runSync('INSERT INTO admins (id, coop_id, name, email, password) VALUES (?, ?, ?, ?, ?);', [
      ADMIN.id,
      COOP.id,
      ADMIN.name,
      ADMIN.email,
      ADMIN.password,
    ]);
  }

  for (const p of PRODUCERS) {
    db.runSync('UPDATE producers SET email = ? WHERE id = ? AND (email IS NULL OR email = \'\');', [p.email, p.id]);
  }
}

export function seedDatabase(db: SQLiteDatabase): void {
  const existing = db.getFirstSync<{ count: number }>('SELECT COUNT(*) AS count FROM coops;');
  if (existing && existing.count > 0) {
    backfill(db);
    return;
  }

  const today = dateDaysAgo(0);

  db.withTransactionSync(() => {
    db.runSync('INSERT INTO coops (id, name, price_per_liter) VALUES (?, ?, ?);', [
      COOP.id,
      COOP.name,
      COOP.price_per_liter,
    ]);

    db.runSync('INSERT INTO admins (id, coop_id, name, email, password) VALUES (?, ?, ?, ?, ?);', [
      ADMIN.id,
      COOP.id,
      ADMIN.name,
      ADMIN.email,
      ADMIN.password,
    ]);

    for (const r of ROUTES) {
      db.runSync('INSERT INTO routes (id, coop_id, name, identifier) VALUES (?, ?, ?, ?);', [
        r.id,
        COOP.id,
        r.name,
        r.identifier,
      ]);
    }

    db.runSync(
      'INSERT INTO milkmen (id, coop_id, name, email, password, active_route_id) VALUES (?, ?, ?, ?, ?, NULL);',
      [MILKMAN.id, COOP.id, MILKMAN.name, MILKMAN.email, MILKMAN.password],
    );

    for (const p of PRODUCERS) {
      db.runSync(
        'INSERT INTO producers (id, coop_id, route_id, name, farm, email, password, route_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [p.id, COOP.id, p.routeId, p.name, p.farm, p.email, 'milkroute', p.route_order],
      );
    }

    // Associa leiteiro M-01 às rotas R-N e R-S
    db.runSync('INSERT INTO milkman_routes (milkman_id, route_id) VALUES (?, ?);', [MILKMAN.id, 'R-N']);
    db.runSync('INSERT INTO milkman_routes (milkman_id, route_id) VALUES (?, ?);', [MILKMAN.id, 'R-S']);

    for (const c of COLLECTIONS_TODAY) {
      insertCollection(db, { ...c, date: today });
    }

    for (const c of COLLECTIONS_P014) {
      insertCollection(db, { id: c.id, producerId: 'P-014', date: dateDaysAgo(c.daysAgo), time: c.time, volume: c.volume });
    }
  });
}
