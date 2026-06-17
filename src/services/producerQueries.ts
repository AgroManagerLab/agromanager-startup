import { getDatabase } from '../database/client';
import type { Collection, CollectionDetailRow, ProducerProfile } from '../types';

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
  const db = getDatabase();
  return db.getAllSync<Collection>(
    `SELECT id, date, time, volume, status
       FROM collections
      WHERE producer_id = ?
      ORDER BY id DESC;`,
    [producerId],
  );
}

// Detalhe de uma coleta específica do produtor (inclui a foto).
// Filtra por producer_id para não vazar coleta de outro produtor. Null se não existir.
export function getProducerCollectionDetail(
  collectionId: string,
  producerId: string,
): CollectionDetailRow | null {
  const db = getDatabase();
  const row = db.getFirstSync<CollectionDetailRow>(
    `SELECT id, date, time, volume, status, photo_uri
       FROM collections
      WHERE id = ? AND producer_id = ?;`,
    [collectionId, producerId],
  );
  return row;
}
