import { getDatabase } from '../database/client';
import type {
  AdminDashboardData,
  AdminProducerSummary,
  AdminMilkmanSummary,
  AdminMilkmanDetailData,
  AdminRouteSummary,
  AdminRouteDetailData,
  AdminRouteProducer,
  AdminRouteMilkman,
  AdminHistoryRow,
  MilkmanRouteStatus,
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

export function loadAdminDashboard(adminId?: string): AdminDashboardData {
  const db = getDatabase();
  const today = todayDate();
  const month = thisMonth();

  const coop = db.getFirstSync<{ name: string; price_per_liter: number }>(
    'SELECT name, price_per_liter FROM coops LIMIT 1',
  )!;

  // Nome do admin vindo do banco (FR-4.3). Fallback genérico se id ausente.
  const admin = adminId
    ? db.getFirstSync<{ name: string }>('SELECT name FROM admins WHERE id = ?', [adminId])
    : db.getFirstSync<{ name: string }>('SELECT name FROM admins LIMIT 1');

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

    // Rota iniciada hoje por qualquer leiteiro (mesmo sem coleta ainda).
    const started = db.getFirstSync<{ c: number }>(
      'SELECT COUNT(*) AS c FROM route_starts WHERE route_id = ? AND date = ?',
      [route.id, today],
    ) ?? { c: 0 };

    let status: 'rota' | 'concluida' | 'esperando';
    if (done.c >= total.c && total.c > 0) {
      status = 'concluida';
    } else if (done.c > 0 || started.c > 0) {
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
    adminName: admin?.name ?? 'Administrador',
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
  pricePerLiter: number;
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
    `SELECT c.date, c.time, c.volume, COALESCE(m.name, '—') AS milkmanName, c.status
     FROM collections c
     LEFT JOIN milkmen m ON m.id = c.milkman_id
     WHERE c.producer_id = ?
     ORDER BY c.date DESC, c.time DESC
     LIMIT 5`,
    [producerId],
  );

  const price = db.getFirstSync<{ p: number }>(
    'SELECT price_per_liter AS p FROM coops LIMIT 1',
  ) ?? { p: 0 };

  return {
    profile,
    monthVolume: monthVol.v,
    projection: monthVol.v * price.p,
    pricePerLiter: price.p,
    history,
  };
}

export function createProducer(data: {
  name: string;
  farm: string;
  email: string;
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
    `INSERT INTO producers (id, coop_id, route_id, name, farm, email, password, route_order)
     VALUES (?, (SELECT id FROM coops LIMIT 1), ?, ?, ?, ?, ?, ?)`,
    [id, data.routeId, data.name, data.farm, data.email, data.password, order.o],
  );
}

export function getProducerById(
  producerId: string,
): { id: string; name: string; farm: string; email: string | null; route_id: string | null } | null {
  const db = getDatabase();
  const row = db.getFirstSync<{
    id: string;
    name: string;
    farm: string;
    email: string | null;
    route_id: string | null;
  }>(
    'SELECT id, name, farm, email, route_id FROM producers WHERE id = ?',
    [producerId],
  );
  return row ?? null;
}

export function isProducerEmailTaken(email: string, exceptId?: string): boolean {
  const db = getDatabase();
  const row = db.getFirstSync<{ c: number }>(
    'SELECT COUNT(*) AS c FROM producers WHERE lower(email) = ? AND id != ?',
    [email.trim().toLowerCase(), exceptId ?? ''],
  ) ?? { c: 0 };
  return row.c > 0;
}

export function updateProducer(data: {
  id: string;
  name: string;
  farm: string;
  email: string;
  routeId: string;
}): void {
  const db = getDatabase();
  const current = db.getFirstSync<{ route_id: string | null }>(
    'SELECT route_id FROM producers WHERE id = ?',
    [data.id],
  );

  // Rota mudou: reatribui route_order (MAX+1 na rota nova), como em createProducer.
  if (current && current.route_id !== data.routeId) {
    const order = db.getFirstSync<{ o: number }>(
      'SELECT COALESCE(MAX(route_order), 0) + 1 AS o FROM producers WHERE route_id = ?',
      [data.routeId],
    ) ?? { o: 1 };
    db.runSync(
      'UPDATE producers SET name = ?, farm = ?, email = ?, route_id = ?, route_order = ? WHERE id = ?',
      [data.name, data.farm, data.email, data.routeId, order.o, data.id],
    );
    return;
  }

  // Rota inalterada: mantém route_order.
  db.runSync(
    'UPDATE producers SET name = ?, farm = ?, email = ?, route_id = ? WHERE id = ?',
    [data.name, data.farm, data.email, data.routeId, data.id],
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

    for (const pid of data.producerIds) {
      db.runSync('UPDATE producers SET route_id = ? WHERE id = ?', [nextId, pid]);
    }
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

// ─── Listagem de rotas (admin) ───

// Lista de rotas com nº de produtores e leiteiros responsáveis.
export function getAdminRoutes(search?: string): AdminRouteSummary[] {
  const db = getDatabase();
  let sql = `
    SELECT r.id, r.name, r.identifier,
      (SELECT COUNT(*) FROM producers p WHERE p.route_id = r.id) AS producerCount
    FROM routes r
    WHERE 1=1
  `;
  const params: string[] = [];
  if (search) {
    sql += ' AND (r.name LIKE ? OR r.identifier LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  sql += ' ORDER BY r.name';

  const rows = db.getAllSync<{ id: string; name: string; identifier: string | null; producerCount: number }>(
    sql,
    params,
  );

  return rows.map((r) => {
    const milkmen = db.getAllSync<{ name: string }>(
      `SELECT m.name FROM milkmen m
       JOIN milkman_routes mr ON mr.milkman_id = m.id
       WHERE mr.route_id = ?
       ORDER BY m.name`,
      [r.id],
    );
    return {
      id: r.id,
      name: r.name,
      identifier: r.identifier,
      producerCount: r.producerCount,
      milkmanNames: milkmen.map((m) => m.name),
    };
  });
}

// Detalhe da rota: leiteiros responsáveis + produtores ordenados.
export function getAdminRouteDetail(routeId: string): AdminRouteDetailData | null {
  const db = getDatabase();
  const route = db.getFirstSync<{ id: string; name: string; identifier: string | null }>(
    'SELECT id, name, identifier FROM routes WHERE id = ?',
    [routeId],
  );
  if (!route) return null;

  const milkmenRows = db.getAllSync<{ id: string; name: string }>(
    `SELECT m.id, m.name FROM milkmen m
     JOIN milkman_routes mr ON mr.milkman_id = m.id
     WHERE mr.route_id = ?
     ORDER BY m.name`,
    [routeId],
  );
  const milkmen: AdminRouteMilkman[] = milkmenRows.map((m) => ({ ...m, hue: nameToHue(m.name) }));

  const producerRows = db.getAllSync<{ id: string; name: string; farm: string }>(
    'SELECT id, name, farm FROM producers WHERE route_id = ? ORDER BY name',
    [routeId],
  );
  const producers: AdminRouteProducer[] = producerRows.map((p) => ({
    id: p.id,
    name: p.name,
    farm: p.farm,
    hue: nameToHue(p.name),
  }));

  return {
    id: route.id,
    name: route.name,
    identifier: route.identifier,
    milkmen,
    producers,
  };
}

// ─── Gestão de leiteiros (FR-1) ───

// Lista de leiteiros com a contagem de rotas vinculadas. FR-1.1.
export function getAdminMilkmen(search?: string): AdminMilkmanSummary[] {
  const db = getDatabase();
  let sql = `
    SELECT m.id, m.name, m.email,
      (SELECT COUNT(*) FROM milkman_routes mr WHERE mr.milkman_id = m.id) AS routeCount
    FROM milkmen m
    WHERE 1=1
  `;
  const params: string[] = [];
  if (search) {
    sql += ' AND (m.name LIKE ? OR m.email LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  sql += ' ORDER BY m.name';

  const rows = db.getAllSync<Omit<AdminMilkmanSummary, 'hue'>>(sql, params);
  return rows.map((r) => ({ ...r, hue: nameToHue(r.name) }));
}

// Detalhe do leiteiro: dados + rotas vinculadas com progresso de hoje. FR-1.2.
export function getAdminMilkmanDetail(milkmanId: string): AdminMilkmanDetailData | null {
  const db = getDatabase();
  const today = todayDate();

  const milkman = db.getFirstSync<{ id: string; name: string; email: string; active_route_id: string | null }>(
    'SELECT id, name, email, active_route_id FROM milkmen WHERE id = ?',
    [milkmanId],
  );
  if (!milkman) return null;

  const routeRows = db.getAllSync<{ id: string; name: string; identifier: string | null }>(
    `SELECT r.id, r.name, r.identifier
     FROM routes r
     JOIN milkman_routes mr ON mr.route_id = r.id
     WHERE mr.milkman_id = ?
     ORDER BY r.name`,
    [milkmanId],
  );

  const routes: MilkmanRouteStatus[] = routeRows.map((r) => {
    const total = db.getFirstSync<{ c: number }>(
      'SELECT COUNT(*) AS c FROM producers WHERE route_id = ?',
      [r.id],
    ) ?? { c: 0 };
    const done = db.getFirstSync<{ c: number }>(
      `SELECT COUNT(*) AS c FROM collections c
       JOIN producers p ON p.id = c.producer_id
       WHERE p.route_id = ? AND c.date = ? AND c.milkman_id = ?`,
      [r.id, today, milkmanId],
    ) ?? { c: 0 };
    const started = db.getFirstSync<{ c: number }>(
      'SELECT COUNT(*) AS c FROM route_starts WHERE milkman_id = ? AND route_id = ? AND date = ?',
      [milkmanId, r.id, today],
    ) ?? { c: 0 };
    return {
      routeId: r.id,
      routeName: r.name,
      identifier: r.identifier,
      producerCount: total.c,
      done: done.c,
      total: total.c,
      active: milkman.active_route_id === r.id,
      startedToday: started.c > 0,
    };
  });

  const collected = db.getFirstSync<{ v: number }>(
    "SELECT COALESCE(SUM(volume), 0) AS v FROM collections WHERE milkman_id = ? AND date = ?",
    [milkmanId, today],
  ) ?? { v: 0 };

  return {
    id: milkman.id,
    name: milkman.name,
    email: milkman.email,
    todayCollected: collected.v,
    routes,
  };
}

// Dados do leiteiro para preencher o formulário de edição. FR-1.3.
export function getMilkmanById(milkmanId: string): {
  id: string;
  name: string;
  email: string;
  routeIds: string[];
} | null {
  const db = getDatabase();
  const row = db.getFirstSync<{ id: string; name: string; email: string }>(
    'SELECT id, name, email FROM milkmen WHERE id = ?',
    [milkmanId],
  );
  if (!row) return null;
  const links = db.getAllSync<{ route_id: string }>(
    'SELECT route_id FROM milkman_routes WHERE milkman_id = ?',
    [milkmanId],
  );
  return { ...row, routeIds: links.map((l) => l.route_id) };
}

export function isMilkmanEmailTaken(email: string, exceptId?: string): boolean {
  const db = getDatabase();
  const row = db.getFirstSync<{ c: number }>(
    'SELECT COUNT(*) AS c FROM milkmen WHERE lower(email) = ? AND id != ?',
    [email.trim().toLowerCase(), exceptId ?? ''],
  ) ?? { c: 0 };
  return row.c > 0;
}

export function isRouteIdentifierTaken(identifier: string, exceptId?: string): boolean {
  const db = getDatabase();
  const row = db.getFirstSync<{ c: number }>(
    'SELECT COUNT(*) AS c FROM routes WHERE lower(identifier) = ? AND id != ?',
    [identifier.trim().toLowerCase(), exceptId ?? ''],
  ) ?? { c: 0 };
  return row.c > 0;
}

// Atualiza dados do leiteiro e re-sincroniza os vínculos de rota. FR-1.3.
export function updateMilkman(data: {
  id: string;
  name: string;
  email: string;
  password?: string;
  routeIds: string[];
}): void {
  const db = getDatabase();
  db.withTransactionSync(() => {
    if (data.password && data.password.trim()) {
      db.runSync('UPDATE milkmen SET name = ?, email = ?, password = ? WHERE id = ?', [
        data.name,
        data.email,
        data.password.trim(),
        data.id,
      ]);
    } else {
      db.runSync('UPDATE milkmen SET name = ?, email = ? WHERE id = ?', [
        data.name,
        data.email,
        data.id,
      ]);
    }

    db.runSync('DELETE FROM milkman_routes WHERE milkman_id = ?', [data.id]);
    for (const routeId of data.routeIds) {
      db.runSync('INSERT INTO milkman_routes (milkman_id, route_id) VALUES (?, ?)', [data.id, routeId]);
    }

    // Limpa rota ativa se ela não pertence mais ao leiteiro. FR-3.2.
    db.runSync(
      `UPDATE milkmen SET active_route_id = NULL
       WHERE id = ? AND active_route_id IS NOT NULL
       AND active_route_id NOT IN (SELECT route_id FROM milkman_routes WHERE milkman_id = ?)`,
      [data.id, data.id],
    );
  });
}

// Remove o leiteiro preservando o histórico de coletas (desassocia). FR-1.4.
export function deleteMilkman(milkmanId: string): void {
  const db = getDatabase();
  db.withTransactionSync(() => {
    db.runSync('UPDATE collections SET milkman_id = NULL WHERE milkman_id = ?', [milkmanId]);
    db.runSync('DELETE FROM milkman_routes WHERE milkman_id = ?', [milkmanId]);
    db.runSync('DELETE FROM milkmen WHERE id = ?', [milkmanId]);
  });
}
