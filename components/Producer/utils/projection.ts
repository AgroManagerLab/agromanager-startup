import { Coleta } from '../types';

export function sumSyncedVolume(collections: Coleta[]): number {
  return collections
    .filter((c) => c.status === 'synced')
    .reduce((acc, c) => acc + c.volume, 0);
}

export function calcProjection(volume: number, pricePerLiter: number): number {
  return volume * pricePerLiter;
}
