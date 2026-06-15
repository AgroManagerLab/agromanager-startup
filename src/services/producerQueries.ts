import { getDatabase } from '../database';
import type { Collection, ProducerProfile } from '../types';

interface ProfileQueryRow {
  id: string;
  name: string;
  farm: string;
  route: string | null;
  price_per_liter: number;
}

// Perfil do produtor + rota associada + preço base por litro da cooperativa.
export function getProducerProfile(producerId: string): {
  profile: ProducerProfile;
  pricePerLiter: number;
} | null {
  const db = getDatabase();
  const row = db.getFirstSync<ProfileQueryRow>(
    `SELECT p.id, p.name, p.farm, r.name AS route, c.price_per_liter
       FROM producers p
       JOIN coops c ON c.id = p.coop_id
       LEFT JOIN routes r ON r.id = p.route_id
      WHERE p.id = ?;`,
    [producerId],
  );

  if (!row) return null;

  return {
    profile: { id: row.id, name: row.name, farm: row.farm, route: row.route ?? '' },
    pricePerLiter: row.price_per_liter,
  };
}

// Coletas do produtor (mais recentes primeiro). REQ-03.16.
export function getProducerCollections(producerId: string): Collection[] {
  const db = getDb();
  return db.getAllSync<Collection>(
    `SELECT id, date, time, volume, status
       FROM collections
      WHERE producer_id = ?
      ORDER BY id DESC;`,
    [producerId],
  );
}
