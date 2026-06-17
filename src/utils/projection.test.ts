import { avgPerDay, calcProjection, sumSyncedVolume, syncedCollections } from './projection';
import { buildProducerHomeSummary } from '../services/producerService';
import type { Collection } from '../types';

const collections: Collection[] = [
  { id: 'C-3', date: '13 mai', time: '06:14', volume: 138, status: 'synced', photoUri: null },
  { id: 'C-2', date: '12 mai', time: '06:08', volume: 142, status: 'synced', photoUri: null },
  { id: 'C-1', date: '11 mai', time: '07:22', volume: 100, status: 'pending', photoUri: null },
];

describe('producer projection', () => {
  it('keeps only synced collections', () => {
    expect(syncedCollections(collections)).toHaveLength(2);
  });

  it('sums only synced volumes (ignores pending) — REQ-03.17/04.3', () => {
    expect(sumSyncedVolume(collections)).toBe(280);
  });

  it('projects payment as volume × price — REQ-04.1', () => {
    expect(calcProjection(280, 2.45)).toBeCloseTo(686);
  });

  it('averages per synced day', () => {
    expect(avgPerDay(collections)).toBe(140);
  });

  it('returns 0 average when there are no synced collections', () => {
    expect(avgPerDay([{ id: 'x', date: '1', time: '1', volume: 9, status: 'pending', photoUri: null }])).toBe(0);
  });

  it('builds the home summary from derived producer data', () => {
    const summary = buildProducerHomeSummary({
      profile: { id: 'P-014', name: 'Joao Silva', farm: 'Sítio Verde', route: 'Rota A' },
      pricePerLiter: 2.45,
      collections: collections,
      synced: collections.slice(0, 2),
      monthVolume: 280,
      projection: 686,
      avgPerDay: 140,
    });

    expect(summary.firstName).toBe('Joao');
    expect(summary.recentCollections).toHaveLength(2);
  });
});
