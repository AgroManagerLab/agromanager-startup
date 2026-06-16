import { useMemo } from 'react';
import { CURRENT_PRODUCER_ID, loadProducerData } from './producerService';
import type { ProducerData } from '../types';

// Hook que lê os dados do produtor do SQLite. Substitui o store zustand
// anterior — estado vem do banco. Ver rules/data-and-state.md
export function useProducerData(producerId: string = CURRENT_PRODUCER_ID): ProducerData | null {
  return useMemo(() => loadProducerData(producerId), [producerId]);
}
