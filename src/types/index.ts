export type CollectionStatus = 'synced' | 'pending';

export type UserProfile = 'producer' | 'admin' | 'milkman';

export type RootStackParamList = {
  Login: undefined;
  ProducerTabs: undefined;
  Admin: undefined;
  Milkman: undefined;
};

export interface AuthResult {
  profile: UserProfile;
  userId: string;
}

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

export interface AdminHomeData {
  title: string;
  description: string;
}

export interface MilkmanHomeData {
  title: string;
  description: string;
}
