import {
  getProducerCollectionDetail,
  getProducerCollections,
  getProducerProfile,
} from './producerQueries';
import type { CollectionDetailRow, ProducerCollectionDetail, ProducerData } from '../types';
import { avgPerDay, calcProjection, sumSyncedVolume, syncedCollections } from '../utils/projection';

export interface ProducerHomeSummary {
  firstName: string;
  recentCollections: ProducerData['synced'];
}

// Carrega tudo que o módulo Produtor precisa a partir do SQLite.
export function loadProducerData(producerId: string): ProducerData | null {
  const profileResult = getProducerProfile(producerId);
  if (!profileResult) return null;

  const collections = getProducerCollections(producerId);
  const synced = syncedCollections(collections);
  const monthVolume = sumSyncedVolume(collections);

  return {
    profile: profileResult.profile,
    pricePerLiter: profileResult.pricePerLiter,
    collections,
    synced,
    monthVolume,
    projection: calcProjection(monthVolume, profileResult.pricePerLiter),
    avgPerDay: avgPerDay(collections),
  };
}

// A tela só precisa da apresentação derivada; a regra fica aqui para manter
// `pages/` fino e testável.
export function buildProducerHomeSummary(data: ProducerData): ProducerHomeSummary {
  return {
    firstName: data.profile.name.split(' ')[0],
    recentCollections: data.synced.slice(0, 3),
  };
}

// Carrega o detalhe de uma coleta a partir do SQLite, já com o valor calculado
// usando o preço por litro da cooperativa do produtor. Retorna null se a coleta
// não existir ou o perfil não for encontrado.
export function loadProducerCollectionDetail(
  collectionId: string,
  producerId: string,
): ProducerCollectionDetail | null {
  const row = getProducerCollectionDetail(collectionId, producerId);
  if (!row) return null;

  const profileResult = getProducerProfile(producerId);
  if (!profileResult) return null;

  return buildProducerCollectionDetail(row, profileResult.pricePerLiter);
}

// Monta o detalhe da coleta a partir da linha do banco + preço por litro.
// Função pura (sem acesso a DB) para manter `pages/` fino e testável.
export function buildProducerCollectionDetail(
  row: CollectionDetailRow,
  pricePerLiter: number,
): ProducerCollectionDetail {
  return {
    id: row.id,
    date: row.date,
    time: row.time,
    volume: row.volume,
    status: row.status,
    photoUri: row.photo_uri,
    value: row.volume * pricePerLiter,
  };
}
