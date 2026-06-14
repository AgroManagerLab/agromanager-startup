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
  { id: 'P-014', routeId: 'R-N', name: 'João Carvalho', farm: 'Faz. Santa Luzia' },
  { id: 'P-022', routeId: 'R-N', name: 'Maria Oliveira', farm: 'Faz. Boa Esperança' },
  { id: 'P-031', routeId: 'R-S', name: 'Pedro Santos', farm: 'Sítio do Vale' },
  { id: 'P-045', routeId: 'R-S', name: 'Ana Costa', farm: 'Faz. Três Irmãos' },
  { id: 'P-053', routeId: 'R-L', name: 'Carlos Mendes', farm: 'Sítio Beira-Rio' },
  { id: 'P-068', routeId: 'R-N', name: 'Beatriz Lima', farm: 'Faz. Aurora' },
  { id: 'P-074', routeId: 'R-S', name: 'Antônio Rocha', farm: 'Faz. Boa Vista' },
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
    return; // já populado — seed idempotente
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
        'INSERT INTO producers (id, coop_id, route_id, name, farm, password) VALUES (?, ?, ?, ?, ?, ?);',
        [p.id, COOP.id, p.routeId, p.name, p.farm, 'milkroute'],
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
