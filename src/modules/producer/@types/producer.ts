import type { CollectionStatus } from '../../../global/@types/db';

export type ColetaStatus = CollectionStatus;

export interface Coleta {
  id: string;
  date: string;
  time: string;
  volume: number;
  status: ColetaStatus;
}

export interface ProducerProfile {
  id: string;
  name: string;
  farm: string;
  route: string;
}

export interface ProducerData {
  profile: ProducerProfile;
  pricePerLiter: number;
  collections: Coleta[];
  synced: Coleta[];
  monthVolume: number;
  projection: number;
  avgPerDay: number;
}
