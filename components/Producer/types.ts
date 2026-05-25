export type ColetaStatus = 'synced' | 'pending';

export interface Coleta {
  id: string;
  date: string;
  time: string;
  volume: number;
  status: ColetaStatus;
}

export interface ProducerProfile {
  name: string;
  farm: string;
  route: string;
}
