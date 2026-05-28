// Tipos das linhas das tabelas SQLite (espelham src/global/database/schema.ts).
// Ver rules/data-and-state.md

export type CollectionStatus = 'synced' | 'pending';

export interface CoopRow {
  id: string;
  name: string;
  price_per_liter: number;
}

export interface RouteRow {
  id: string;
  coop_id: string;
  name: string;
  identifier: string | null;
}

export interface MilkmanRow {
  id: string;
  coop_id: string;
  name: string;
  email: string;
  password: string;
}

export interface ProducerRow {
  id: string;
  coop_id: string;
  route_id: string | null;
  name: string;
  farm: string;
  password: string;
}

export interface CollectionRow {
  id: string;
  producer_id: string;
  milkman_id: string | null;
  date: string;
  time: string;
  volume: number;
  status: CollectionStatus;
  photo_uri: string | null;
  created_at: string;
  updated_at: string;
}
