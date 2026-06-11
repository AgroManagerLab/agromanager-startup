import { getProducerCollections, getProducerProfile } from '../database/producerQueries';
import type { ProducerData } from '../@types/producer';
import { avgPerDay, calcProjection, sumSyncedVolume, syncedCollections } from './projection';

// Produtor "logado" (sessão mockada nesta fase). A camada de auth definirá
// isto futuramente. Ver src/modules/auth.
export const CURRENT_PRODUCER_ID = 'P-014';

export { avgPerDay, calcProjection, sumSyncedVolume, syncedCollections };

export interface ProducerHomeSummary {
  firstName: string;
  recentCollections: ProducerData['synced'];
}

// Carrega tudo que o módulo Produtor precisa a partir do SQLite.
export function loadProducerData(producerId: string = CURRENT_PRODUCER_ID): ProducerData | null {
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
