import { getDatabase } from '../database';
import type {
  AdminDashboardData,
  AdminProducerSummary,
  AdminHistoryRow,
  ProducerRow,
  ProducerProfile,
  RouteStatusRow,
} from '../types';
import { todayDate, thisMonth } from '../utils/date';

function nameToHue(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function loadAdminDashboard(): AdminDashboardData {
  const db = getDatabase();
  const today = todayDate();
  const month = thisMonth();

  const coop = db.getFirstSync<{ name: string; price_per_liter: number }>(
    'SELECT name, price_per_liter FROM coops LIMIT 1',
  )!;

  const monthVol = db.getFirstSync<{ v: number }>(
    'SELECT COALESCE(SUM(volume), 0) AS v FROM collections WHERE date LIKE ?',
    [`%${month}%`],
  ) ?? { v: 0 };

  const todayVol = db.getFirstSync<{ v: number }>(
    'SELECT COALESCE(SUM(volume), 0) AS v FROM collections WHERE date = ?',
    [today],
  ) ?? { v: 0 };

  const producerCount = db.getFirstSync<{ c: number }>(
    'SELECT COUNT(*) AS c FROM producers',
  ) ?? { c: 0 };
  const routeCount = db.getFirstSync<{ c: number }>(
    'SELECT COUNT(*) AS c FROM routes',
  ) ?? { c: 0 };
  const milkmanCount = db.getFirstSync<{ c: number }>(
    'SELECT COUNT(*) AS c FROM milkmen',
  ) ?? { c: 0 };

  const projection = monthVol.v * coop.price_per_liter;

  const routes = db.getAllSync<{ id: string; name: string }>(
    'SELECT id, name FROM routes ORDER BY name',
  );

  const routeStatuses: RouteStatusRow[] = routes.map((route) => {
    const milkman = db.getFirstSync<{ name: string }>(
      `SELECT m.name FROM milkmen m
       JOIN milkman_routes mr ON mr.milkman_id = m.id
       WHERE mr.route_id = ? LIMIT 1`,
      [route.id],
    );

    const total = db.getFirstSync<{ c: number }>(
      'SELECT COUNT(*) AS c FROM producers WHERE route_id = ?',
      [route.id],
    ) ?? { c: 0 };

    const done = db.getFirstSync<{ c: number }>(
      `SELECT COUNT(*) AS c FROM collections c
       JOIN producers p ON p.id = c.producer_id
       WHERE p.route_id = ? AND c.date = ?`,
      [route.id, today],
    ) ?? { c: 0 };

    let status: 'rota' | 'concluida' | 'esperando';
    if (done.c >= total.c && total.c > 0) {
      status = 'concluida';
    } else if (done.c > 0) {
      status = 'rota';
    } else {
      status = 'esperando';
    }

    return {
      milkmanName: milkman?.name ?? '(sem leiteiro)',
      routeName: route.name,
      done: done.c,
      total: total.c,
      status,
    };
  });

  return {
    coopName: coop.name,
    adminName: 'Helena',
    monthVolume: monthVol.v,
    todayVolume: todayVol.v,
    projection,
    pricePerLiter: coop.price_per_liter,
    totalProducers: producerCount.c,
    totalRoutes: routeCount.c,
    totalMilkmen: milkmanCount.c,
    routeStatuses,
  };
}

export function getAdminProducers(
  search?: string,
  routeId?: string,
): AdminProducerSummary[] {
  const db = getDatabase();
  const month = thisMonth();

  let sql = `
    SELECT p.id, p.name, p.farm, COALESCE(r.name, 'Sem rota') AS route,
      COALESCE((
        SELECT SUM(c.volume) FROM collections c
        WHERE c.producer_id = p.id AND c.date LIKE ?
      ), 0) AS monthVolume
    FROM producers p
    LEFT JOIN routes r ON r.id = p.route_id
    WHERE 1=1
  `;
  const params: (string | number | null)[] = [`%${month}%`];

  if (search) {
    sql += ' AND (p.name LIKE ? OR p.farm LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (routeId) {
    sql += ' AND p.route_id = ?';
    params.push(routeId);
  }

  sql += ' ORDER BY p.name';

  const rows = db.getAllSync<
    Omit<AdminProducerSummary, 'hue'>
  >(sql, params);

  return rows.map((r) => ({ ...r, hue: nameToHue(r.name) }));
}

export function getAdminProducerDetail(producerId: string): {
  profile: ProducerProfile;
  monthVolume: number;
  projection: number;
  history: AdminHistoryRow[];
} {
  const db = getDatabase();

  const profile = db.getFirstSync<ProducerProfile>(
    `SELECT p.id, p.name, p.farm, COALESCE(r.name, 'Sem rota') AS route
     FROM producers p
     LEFT JOIN routes r ON r.id = p.route_id
     WHERE p.id = ?`,
    [producerId],
  )!;

  const month = thisMonth();
  const monthVol = db.getFirstSync<{ v: number }>(
    'SELECT COALESCE(SUM(volume), 0) AS v FROM collections WHERE producer_id = ? AND date LIKE ?',
    [producerId, `%${month}%`],
  ) ?? { v: 0 };

  const history = db.getAllSync<AdminHistoryRow>(
    `SELECT c.date, c.time, c.volume, COALESCE(m.name, '—') AS leiteiro, c.status
     FROM collections c
     LEFT JOIN milkmen m ON m.id = c.milkman_id
     WHERE c.producer_id = ?
     ORDER BY c.date DESC, c.time DESC
     LIMIT 5`,
    [producerId],
  );

  const price = db.getFirstSync<{ p: number }>(
    'SELECT price_per_liter FROM coops LIMIT 1',
  ) ?? { p: 0 };

  return {
    profile,
    monthVolume: monthVol.v,
    projection: monthVol.v * price.p,
    history,
  };
}

export function createProducer(data: {
  name: string;
  farm: string;
  routeId: string;
  password: string;
}): void {
  const db = getDatabase();
  const count = db.getFirstSync<{ c: number }>(
    "SELECT COUNT(*) AS c FROM producers WHERE id LIKE 'P-%'",
  ) ?? { c: 0 };
  const nextNum = String(count.c + 1).padStart(3, '0');
  const id = `P-${nextNum}`;

  const order = db.getFirstSync<{ o: number }>(
    'SELECT COALESCE(MAX(route_order), 0) + 1 AS o FROM producers WHERE route_id = ?',
    [data.routeId],
  ) ?? { o: 1 };

  db.runSync(
    `INSERT INTO producers (id, coop_id, route_id, name, farm, password, route_order)
     VALUES (?, (SELECT id FROM coops LIMIT 1), ?, ?, ?, ?, ?)`,
    [id, data.routeId, data.name, data.farm, data.password, order.o],
  );
}

export function createRoute(data: {
  name: string;
  identifier: string;
  producerIds: string[];
}): void {
  const db = getDatabase();
  const count = db.getFirstSync<{ c: number }>(
    "SELECT COUNT(*) AS c FROM routes WHERE id LIKE 'R-%'",
  ) ?? { c: 0 };
  const nextId = `R-${String(count.c + 1).padStart(1, '0')}`;

  db.withTransactionSync(() => {
    db.runSync(
      `INSERT INTO routes (id, coop_id, name, identifier)
       VALUES (?, (SELECT id FROM coops LIMIT 1), ?, ?)`,
      [nextId, data.name, data.identifier],
    );

    data.producerIds.forEach((pid, idx) => {
      db.runSync(
        'UPDATE producers SET route_id = ?, route_order = ? WHERE id = ?',
        [nextId, idx + 1, pid],
      );
    });
  });
}

export function createMilkman(data: {
  name: string;
  email: string;
  password: string;
  routeIds: string[];
}): void {
  const db = getDatabase();
  const count = db.getFirstSync<{ c: number }>(
    "SELECT COUNT(*) AS c FROM milkmen WHERE id LIKE 'M-%'",
  ) ?? { c: 0 };
  const nextId = `M-${String(count.c + 1).padStart(2, '0')}`;

  db.withTransactionSync(() => {
    db.runSync(
      `INSERT INTO milkmen (id, coop_id, name, email, password)
       VALUES (?, (SELECT id FROM coops LIMIT 1), ?, ?, ?)`,
      [nextId, data.name, data.email, data.password],
    );

    for (const routeId of data.routeIds) {
      db.runSync(
        'INSERT INTO milkman_routes (milkman_id, route_id) VALUES (?, ?)',
        [nextId, routeId],
      );
    }
  });
}

export function deleteProducer(producerId: string): void {
  const db = getDatabase();
  db.runSync('DELETE FROM collections WHERE producer_id = ?', [producerId]);
  db.runSync('DELETE FROM producers WHERE id = ?', [producerId]);
}

export function getRoutes(): { id: string; name: string }[] {
  const db = getDatabase();
  return db.getAllSync<{ id: string; name: string }>(
    'SELECT id, name FROM routes ORDER BY name',
  );
}

export function getProducersNotOnRoute(
  routeId: string,
): AdminProducerSummary[] {
  const db = getDatabase();
  const rows = db.getAllSync<
    Omit<AdminProducerSummary, 'hue'>
  >(
    `SELECT p.id, p.name, p.farm, 'Sem rota' AS route, 0 AS monthVolume
     FROM producers p
     WHERE p.route_id IS NULL OR p.route_id = ?
     ORDER BY p.name`,
    [routeId],
  );
  return rows.map((r) => ({ ...r, hue: nameToHue(r.name) }));
}

export function getAllProducers(): (ProducerRow & { route_name: string })[] {
  const db = getDatabase();
  return db.getAllSync(
    `SELECT p.*, COALESCE(r.name, 'Sem rota') AS route_name
     FROM producers p
     LEFT JOIN routes r ON r.id = p.route_id
     ORDER BY p.name`,
  );
}
