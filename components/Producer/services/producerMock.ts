import { Coleta, ProducerProfile } from '../types';

export const PRICE_PER_LITER = 2.45;

export const PRODUCER_PROFILE: ProducerProfile = {
  name: 'João Carvalho',
  farm: 'Faz. Santa Luzia',
  route: 'Rota Norte',
};

export const PRODUCER_COLLECTIONS: Coleta[] = [
  { id: 'C-13', date: '13 mai', time: '06:14', volume: 138, status: 'synced' },
  { id: 'C-12', date: '12 mai', time: '06:08', volume: 145, status: 'synced' },
  { id: 'C-11', date: '11 mai', time: '06:21', volume: 132, status: 'synced' },
  { id: 'C-10', date: '10 mai', time: '06:18', volume: 141, status: 'synced' },
  { id: 'C-09', date: '09 mai', time: '06:09', volume: 150, status: 'synced' },
  { id: 'C-08', date: '08 mai', time: '06:32', volume: 128, status: 'synced' },
  { id: 'C-07', date: '07 mai', time: '06:11', volume: 144, status: 'synced' },
  { id: 'C-06', date: '06 mai', time: '06:20', volume: 139, status: 'synced' },
];
