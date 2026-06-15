export type CollectionStatus = 'synced' | 'pending';

export type UserProfile = 'producer' | 'admin' | 'milkman';

export type RootStackParamList = {
  ProducerTabs: undefined;
  AdminTabs: undefined;
  MilkmanTabs: undefined;
  AdminCadastroProdutor: { producerId?: string } | undefined;
  AdminCadastroRota: { routeId?: string } | undefined;
  AdminCadastroLeiteiro: { milkmanId?: string } | undefined;
  AdminDetalhamentoProdutor: { producerId: string };
  MilkmanRegistroColeta: { producerId: string };
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
  route_order: number;
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

export interface Coleta {
  id: string;
  date: string;
  time: string;
  volume: number;
  status: CollectionStatus;
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

// ─── Milkman types ───
export interface MilkmanProfile {
  id: string;
  name: string;
  routeId: string;
  routeName: string;
}

export interface RouteProducer {
  id: string;
  name: string;
  farm: string;
  seq: number;
  hue: number;
  status: 'synced' | 'pending' | 'next';
  volume?: number;
}

export interface MilkmanHomeData {
  profile: MilkmanProfile;
  todayCollected: number;
  totalProducers: number;
  doneCount: number;
  pendingCount: number;
  syncedCount: number;
  nextStops: RouteProducer[];
}

export interface MilkmanCollectionRow {
  id: string;
  producer: string;
  farm: string;
  volume: number;
  time: string;
  status: CollectionStatus;
}

// ─── Admin types ───
export interface AdminDashboardData {
  coopName: string;
  adminName: string;
  monthVolume: number;
  todayVolume: number;
  projection: number;
  pricePerLiter: number;
  totalProducers: number;
  totalRoutes: number;
  totalMilkmen: number;
  routeStatuses: RouteStatusRow[];
}

export interface RouteStatusRow {
  milkmanName: string;
  routeName: string;
  done: number;
  total: number;
  status: 'rota' | 'concluida' | 'esperando';
}

export interface AdminProducerSummary {
  id: string;
  name: string;
  farm: string;
  route: string;
  monthVolume: number;
  hue: number;
}

export interface CadastroFormData {
  name: string;
  farm?: string;
  email?: string;
  password: string;
  routeId?: string;
}

export interface AdminHistoryRow {
  date: string;
  time: string;
  volume: number;
  leiteiro: string;
  status: CollectionStatus;
}
