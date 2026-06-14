import type { Coleta } from '../types';

// Funções puras de cálculo (sem acesso ao banco) — fáceis de testar.
// Apenas coletas sincronizadas entram nos cálculos — REQ-03.17 / REQ-04.3.
export function syncedCollections(collections: Coleta[]): Coleta[] {
  return collections.filter((c) => c.status === 'synced');
}

export function sumSyncedVolume(collections: Coleta[]): number {
  return syncedCollections(collections).reduce((acc, c) => acc + c.volume, 0);
}

// Projeção = soma dos volumes × preço base por litro — REQ-04.1.
export function calcProjection(volume: number, pricePerLiter: number): number {
  return volume * pricePerLiter;
}

export function avgPerDay(collections: Coleta[]): number {
  const synced = syncedCollections(collections);
  return synced.length ? sumSyncedVolume(collections) / synced.length : 0;
}
