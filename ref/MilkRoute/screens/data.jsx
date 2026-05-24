// MilkRoute — mock data shared across screens
const COOP_NAME = 'Coop. Vale do Leite';
const TODAY = 'Qui · 14 mai';
const PRICE_PER_LITER = 2.45; // R$/L mockado (REQ-04.2)

const PRODUCERS = [
  { id: 'P-014', name: 'João Carvalho',  farm: 'Faz. Santa Luzia',   route: 'Rota Norte', monthL: 2840, hue: 150 },
  { id: 'P-022', name: 'Maria Oliveira', farm: 'Faz. Boa Esperança', route: 'Rota Norte', monthL: 3120, hue: 75  },
  { id: 'P-031', name: 'Pedro Santos',   farm: 'Sítio do Vale',      route: 'Rota Sul',   monthL: 1980, hue: 200 },
  { id: 'P-045', name: 'Ana Costa',      farm: 'Faz. Três Irmãos',   route: 'Rota Sul',   monthL: 2410, hue: 320 },
  { id: 'P-053', name: 'Carlos Mendes',  farm: 'Sítio Beira-Rio',    route: 'Rota Leste', monthL: 1560, hue: 30  },
  { id: 'P-068', name: 'Beatriz Lima',   farm: 'Faz. Aurora',        route: 'Rota Norte', monthL: 2705, hue: 280 },
  { id: 'P-074', name: 'Antônio Rocha',  farm: 'Faz. Boa Vista',     route: 'Rota Sul',   monthL: 2090, hue: 100 },
];

// Coleta history shape: { date, time, volume, status }
const COLLECTIONS_LEITEIRO_TODAY = [
  { id: 'C-901', producer: 'João Carvalho',  farm: 'Faz. Santa Luzia',   volume: 142, time: '06:12', status: 'synced',  route: 'Rota Norte' },
  { id: 'C-902', producer: 'Maria Oliveira', farm: 'Faz. Boa Esperança', volume: 168, time: '06:48', status: 'synced',  route: 'Rota Norte' },
  { id: 'C-903', producer: 'Beatriz Lima',   farm: 'Faz. Aurora',        volume: 134, time: '07:22', status: 'pending', route: 'Rota Norte' },
  { id: 'C-904', producer: 'Antônio Rocha',  farm: 'Faz. Boa Vista',     volume: 121, time: '08:05', status: 'pending', route: 'Rota Norte' },
];

const PRODUTOR_HISTORY = [
  { date: '13 mai', time: '06:14', volume: 138, status: 'synced' },
  { date: '12 mai', time: '06:08', volume: 145, status: 'synced' },
  { date: '11 mai', time: '06:21', volume: 132, status: 'synced' },
  { date: '10 mai', time: '06:18', volume: 141, status: 'synced' },
  { date: '09 mai', time: '06:09', volume: 150, status: 'synced' },
  { date: '08 mai', time: '06:32', volume: 128, status: 'synced' },
  { date: '07 mai', time: '06:11', volume: 144, status: 'synced' },
  { date: '06 mai', time: '06:20', volume: 139, status: 'synced' },
];

const PRODUTOR_HISTORY_ADMIN = [
  { date: '13 mai', time: '06:14', volume: 138, leiteiro: 'Ricardo P.', status: 'synced' },
  { date: '12 mai', time: '06:08', volume: 145, leiteiro: 'Ricardo P.', status: 'synced' },
  { date: '11 mai', time: '06:21', volume: 132, leiteiro: 'Ricardo P.', status: 'synced' },
  { date: '10 mai', time: '06:18', volume: 141, leiteiro: 'Ricardo P.', status: 'synced' },
  { date: '09 mai', time: '06:09', volume: 150, leiteiro: 'Ricardo P.', status: 'synced' },
];

Object.assign(window, {
  COOP_NAME, TODAY, PRICE_PER_LITER,
  PRODUCERS, COLLECTIONS_LEITEIRO_TODAY, PRODUTOR_HISTORY, PRODUTOR_HISTORY_ADMIN,
});
