import { create } from 'zustand';
import { Coleta, ProducerProfile } from '../types';
import { PRICE_PER_LITER, PRODUCER_PROFILE, PRODUCER_COLLECTIONS } from '../services/producerMock';
import { sumSyncedVolume, calcProjection } from '../utils/projection';

interface ProducerState {
  producer: ProducerProfile;
  pricePerLiter: number;
  collections: Coleta[];
}

export const useProducerStore = create<ProducerState>(() => ({
  producer: PRODUCER_PROFILE,
  pricePerLiter: PRICE_PER_LITER,
  collections: PRODUCER_COLLECTIONS,
}));

export const selectSyncedCollections = (s: ProducerState): Coleta[] =>
  s.collections.filter((c) => c.status === 'synced');

export const selectMonthVolume = (s: ProducerState): number => sumSyncedVolume(s.collections);

export const selectProjection = (s: ProducerState): number =>
  calcProjection(sumSyncedVolume(s.collections), s.pricePerLiter);

export const selectAvgPerDay = (s: ProducerState): number => {
  const synced = s.collections.filter((c) => c.status === 'synced');
  return synced.length ? sumSyncedVolume(s.collections) / synced.length : 0;
};
