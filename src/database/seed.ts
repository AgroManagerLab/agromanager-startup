import type { SQLiteDatabase } from 'expo-sqlite';
import type {
  CollectionRow,
  CoopRow,
  MilkmanRow,
  ProducerRow,
  RouteRow,
} from '../types';

// Dados iniciais (mockados), espelhando ref/MilkRoute/screens/data.jsx.
// Preço base por litro mockado no frontend — REQ-04.2.
const COOP: CoopRow = { id: 'COOP-01', name: 'Coop. Vale do Leite', price_per_liter: 2.45 };

const ROUTES: Omit<RouteRow, 'coop_id'>[] = [
  { id: 'R-N', name: 'Rota Norte', identifier: 'N-01' },
  { id: 'R-S', name: 'Rota Sul', identifier: 'S-01' },
  { id: 'R-L', name: 'Rota Leste', identifier: 'L-01' },
];

const MILKMAN: Omit<MilkmanRow, 'coop_id'> = {
  id: 'M-01',
  name: 'Ricardo Pereira',
  email: 'ricardo@coopvaleleite.coop.br',
  password: 'milkroute',
};

const PRODUCERS: (Omit<ProducerRow, 'coop_id' | 'route_id' | 'password'> & {
  routeId: string;
})[] = [
  { id: 'P-014', routeId: 'R-N', name: 'João Carvalho', farm: 'Faz. Santa Luzia', route_order: 1 },
  { id: 'P-022', routeId: 'R-N', name: 'Maria Oliveira', farm: 'Faz. Boa Esperança', route_order: 2 },
  { id: 'P-031', routeId: 'R-S', name: 'Pedro Santos', farm: 'Sítio do Vale', route_order: 1 },
  { id: 'P-045', routeId: 'R-S', name: 'Ana Costa', farm: 'Faz. Três Irmãos', route_order: 2 },
  { id: 'P-053', routeId: 'R-L', name: 'Carlos Mendes', farm: 'Sítio Beira-Rio', route_order: 1 },
  { id: 'P-068', routeId: 'R-N', name: 'Beatriz Lima', farm: 'Faz. Aurora', route_order: 3 },
  { id: 'P-074', routeId: 'R-S', name: 'Antônio Rocha', farm: 'Faz. Boa Vista', route_order: 3 },
];

// Coletas de hoje do leiteiro (M-01) — espelha COLLECTIONS_LEITEIRO_TODAY do data.jsx
const COLLECTIONS_TODAY: (Pick<CollectionRow, 'id' | 'date' | 'time' | 'volume'> & { producerId: string })[] = [
  { id: 'C-901', producerId: 'P-014', date: '14 mai', time: '06:12', volume: 142 },
  { id: 'C-902', producerId: 'P-022', date: '14 mai', time: '06:48', volume: 168 },
  { id: 'C-903', producerId: 'P-068', date: '14 mai', time: '07:22', volume: 134 },
  { id: 'C-904', producerId: 'P-074', date: '14 mai', time: '08:05', volume: 121 },
];

// Coletas sincronizadas do produtor logado (P-014) — REQ-03.16 / REQ-03.17.
const COLLECTIONS_P014: Pick<CollectionRow, 'id' | 'date' | 'time' | 'volume'>[] = [
  { id: 'C-13', date: '13 mai', time: '06:14', volume: 138 },
  { id: 'C-12', date: '12 mai', time: '06:08', volume: 145 },
  { id: 'C-11', date: '11 mai', time: '06:21', volume: 132 },
  { id: 'C-10', date: '10 mai', time: '06:18', volume: 141 },
  { id: 'C-09', date: '09 mai', time: '06:09', volume: 150 },
  { id: 'C-08', date: '08 mai', time: '06:32', volume: 128 },
  { id: 'C-07', date: '07 mai', time: '06:11', volume: 144 },
  { id: 'C-06', date: '06 mai', time: '06:20', volume: 139 },
];

export function seedDatabase(db: SQLiteDatabase): void {
  const existing = db.getFirstSync<{ count: number }>('SELECT COUNT(*) AS count FROM coops;');
  if (existing && existing.count > 0) {
    // Já populado — garante milkman_routes mesmo em upgrades
    const links = db.getFirstSync<{ c: number }>(
      "SELECT COUNT(*) AS c FROM milkman_routes WHERE milkman_id = 'M-01'",
    );
    if (!links || links.c === 0) {
      db.runSync('INSERT OR IGNORE INTO milkman_routes (milkman_id, route_id) VALUES (?, ?);', ['M-01', 'R-N']);
      db.runSync('INSERT OR IGNORE INTO milkman_routes (milkman_id, route_id) VALUES (?, ?);', ['M-01', 'R-S']);
    }
    return;
  }

  db.withTransactionSync(() => {
    db.runSync('INSERT INTO coops (id, name, price_per_liter) VALUES (?, ?, ?);', [
      COOP.id,
      COOP.name,
      COOP.price_per_liter,
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
      'INSERT INTO milkmen (id, coop_id, name, email, password) VALUES (?, ?, ?, ?, ?);',
      [MILKMAN.id, COOP.id, MILKMAN.name, MILKMAN.email, MILKMAN.password],
    );

    for (const p of PRODUCERS) {
      db.runSync(
        'INSERT INTO producers (id, coop_id, route_id, name, farm, password, route_order) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [p.id, COOP.id, p.routeId, p.name, p.farm, 'milkroute', p.route_order],
      );
    }

    // Associa leiteiro M-01 às rotas R-N e R-S
    db.runSync('INSERT INTO milkman_routes (milkman_id, route_id) VALUES (?, ?);', [MILKMAN.id, 'R-N']);
    db.runSync('INSERT INTO milkman_routes (milkman_id, route_id) VALUES (?, ?);', [MILKMAN.id, 'R-S']);

    for (const c of COLLECTIONS_TODAY) {
      db.runSync(
        `INSERT INTO collections
          (id, producer_id, milkman_id, date, time, volume, status, photo_uri, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, 'synced', NULL, ?, ?);`,
        [c.id, c.producerId, MILKMAN.id, c.date, c.time, c.volume, c.date, c.date],
      );
    }

    for (const c of COLLECTIONS_P014) {
      db.runSync(
        `INSERT INTO collections
          (id, producer_id, milkman_id, date, time, volume, status, photo_uri, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, 'synced', NULL, ?, ?);`,
        [c.id, 'P-014', MILKMAN.id, c.date, c.time, c.volume, c.date, c.date],
      );
    }
  });
}
