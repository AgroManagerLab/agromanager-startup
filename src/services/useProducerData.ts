import { useMemo } from 'react';
import { loadProducerData } from './producerService';
import type { ProducerData } from '../types';

// Hook que lê os dados do produtor do SQLite. O id vem do AuthContext (FR-4.4);
// estado vem do banco. Ver rules/data-and-state.md
export function useProducerData(producerId: string | null): ProducerData | null {
  return useMemo(() => (producerId ? loadProducerData(producerId) : null), [producerId]);
}
