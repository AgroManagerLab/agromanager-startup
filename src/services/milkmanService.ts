import { getDatabase } from '../database/client';
import type {
  MilkmanProfile,
  RouteProducer,
  MilkmanHomeData,
  MilkmanCollectionRow,
  MilkmanCollectionDetail,
  CollectionRow,
} from '../types';
import { todayDate, nowTime } from '../utils/date';

interface ProfileRow {
  id: string;
  name: string;
  routeId: string;
  routeName: string;
}

// Get milkman profile + first linked route
export function getMilkmanProfile(milkmanId: string): MilkmanProfile | null {
  const db = getDatabase();
  const row = db.getFirstSync<ProfileRow>(
    `SELECT m.id, m.name, mr.route_id AS routeId, r.name AS routeName
     FROM milkmen m
     JOIN milkman_routes mr ON mr.milkman_id = m.id
     JOIN routes r ON r.id = mr.route_id
     WHERE m.id = ?
     LIMIT 1`,
    [milkmanId],
  );
  if (!row) return null;
  return { id: row.id, name: row.name, routeId: row.routeId, routeName: row.routeName };
}

interface RouteProducerRow {
  id: string;
  name: string;
  farm: string;
  route_order: number;
  volume: number | null;
  status_text: string | null;
}

// Get all producers on milkman's route(s) with collection status for today
export function getMilkmanRouteProducers(milkmanId: string): RouteProducer[] {
  const db = getDatabase();
  const today = todayDate();
  const rows = db.getAllSync<RouteProducerRow>(
    `SELECT p.id, p.name, p.farm, p.route_order,
            c.volume,
            CASE WHEN c.id IS NULL THEN 'next'
                 WHEN c.status = 'synced' THEN 'synced'
                 ELSE 'pending' END AS status_text
     FROM producers p
     LEFT JOIN collections c ON c.producer_id = p.id AND c.date = ? AND c.milkman_id = ?
     WHERE EXISTS (
       SELECT 1 FROM milkman_routes mr
       WHERE mr.milkman_id = ? AND mr.route_id = p.route_id
     )
     ORDER BY p.route_order`,
    [today, milkmanId, milkmanId],
  );

  const HUES = [30, 200, 150, 350, 80, 260, 170, 40, 310, 100, 220, 60];
  let idx = 0;
  return rows.map((r) => {
    const hue = HUES[idx++ % HUES.length];
    return {
      id: r.id,
      name: r.name,
      farm: r.farm,
      seq: r.route_order,
      hue,
      status: (r.status_text ?? 'next') as RouteProducer['status'],
      volume: r.volume ?? undefined,
    };
  });
}

interface TodayCountRow {
  volume: number;
  status: string;
}

// Get today's collection summary
export function getMilkmanTodayCollections(milkmanId: string): {
  done: number;
  total: number;
  collected: number;
  pendingCount: number;
  syncedCount: number;
} {
  const db = getDatabase();
  const today = todayDate();

  const totalRow = db.getFirstSync<{ count: number }>(
    `SELECT COUNT(*) AS count
     FROM producers p
     WHERE EXISTS (
       SELECT 1 FROM milkman_routes mr
       WHERE mr.milkman_id = ? AND mr.route_id = p.route_id
     )`,
    [milkmanId],
  );
  const total = totalRow?.count ?? 0;

  const collections = db.getAllSync<TodayCountRow>(
    `SELECT volume, status FROM collections WHERE milkman_id = ? AND date = ?`,
    [milkmanId, today],
  );

  return {
    done: collections.length,
    total,
    collected: collections.reduce((a, c) => a + c.volume, 0),
    pendingCount: collections.filter((c) => c.status === 'pending').length,
    syncedCount: collections.filter((c) => c.status === 'synced').length,
  };
}

// Get next stops (producers not yet collected today)
export function getMilkmanNextStops(milkmanId: string): RouteProducer[] {
  return getMilkmanRouteProducers(milkmanId).filter((p) => p.status === 'next');
}

// Load full home data
export function loadMilkmanHomeData(milkmanId: string): MilkmanHomeData | null {
  const profile = getMilkmanProfile(milkmanId);
  if (!profile) return null;
  const routeProducers = getMilkmanRouteProducers(milkmanId);
  const todayColl = getMilkmanTodayCollections(milkmanId);
  return {
    profile,
    todayCollected: todayColl.collected,
    totalProducers: todayColl.total,
    doneCount: todayColl.done,
    pendingCount: todayColl.pendingCount,
    syncedCount: todayColl.syncedCount,
    nextStops: routeProducers.filter((p) => p.status === 'next'),
  };
}

// Register a collection
export function registerCollection(data: {
  producerId: string;
  milkmanId: string;
  volume: number;
  photoUri: string | null;
  isConnected?: boolean;
}): void {
  const db = getDatabase();
  const id = `C-${Date.now()}`;
  const date = todayDate();
  const time = nowTime();
  const status = data.isConnected === false ? 'pending' : 'synced';
  db.runSync(
    `INSERT INTO collections (id, producer_id, milkman_id, date, time, volume, status, photo_uri, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, data.producerId, data.milkmanId, date, time, data.volume, status, data.photoUri, date, date],
  );
}

// Sync all pending collections for a milkman
export function syncPendingCollections(milkmanId: string): number {
  const db = getDatabase();
  const today = todayDate();
  const result = db.runSync(
    `UPDATE collections SET status = 'synced', updated_at = ? WHERE milkman_id = ? AND status = 'pending'`,
    [today, milkmanId],
  );
  return result.changes;
}

interface HistoryQueryRow {
  id: string;
  producer_name: string;
  farm: string;
  volume: number;
  time: string;
  status: string;
  date: string;
  photo_uri: string | null;
}

// Get history grouped by date
export function getMilkmanHistory(
  milkmanId: string,
): { date: string; rows: MilkmanCollectionRow[] }[] {
  const db = getDatabase();
  const rows = db.getAllSync<HistoryQueryRow>(
    `SELECT c.id, p.name AS producer_name, p.farm, c.volume, c.time, c.status, c.date, c.photo_uri
     FROM collections c
     JOIN producers p ON p.id = c.producer_id
     WHERE c.milkman_id = ?
     ORDER BY c.date DESC, c.time DESC`,
    [milkmanId],
  );

  const groups: { date: string; rows: MilkmanCollectionRow[] }[] = [];
  for (const row of rows) {
    const last = groups[groups.length - 1];
    const item: MilkmanCollectionRow = {
      id: row.id,
      producer: row.producer_name,
      farm: row.farm,
      volume: row.volume,
      time: row.time,
      status: row.status as 'synced' | 'pending',
      photoUri: row.photo_uri,
    };
    if (last && last.date === row.date) {
      last.rows.push(item);
    } else {
      groups.push({ date: row.date, rows: [item] });
    }
  }
  return groups;
}

// Get existing collection for a producer today
export function getProducerTodayCollection(
  milkmanId: string,
  producerId: string,
): CollectionRow | null {
  const db = getDatabase();
  const today = todayDate();
  return db.getFirstSync<CollectionRow>(
    `SELECT * FROM collections WHERE milkman_id = ? AND producer_id = ? AND date = ?`,
    [milkmanId, producerId, today],
  );
}

// Get full collection detail for the milkman view (includes producer info)
export function getMilkmanCollectionDetail(
  collectionId: string,
  milkmanId: string,
): MilkmanCollectionDetail | null {
  const db = getDatabase();
  const row = db.getFirstSync<MilkmanCollectionDetail>(
    `SELECT c.id, p.name AS producer, p.farm, c.date, c.time, c.volume, c.status, c.photo_uri AS photoUri
     FROM collections c
     JOIN producers p ON p.id = c.producer_id
     WHERE c.id = ? AND c.milkman_id = ?`,
    [collectionId, milkmanId],
  );
  return row ?? null;
}
