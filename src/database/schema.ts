export const SCHEMA_VERSION = 2;

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS coops (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  price_per_liter REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS routes (
  id TEXT PRIMARY KEY NOT NULL,
  coop_id TEXT NOT NULL,
  name TEXT NOT NULL,
  identifier TEXT,
  FOREIGN KEY (coop_id) REFERENCES coops (id)
);

CREATE TABLE IF NOT EXISTS milkmen (
  id TEXT PRIMARY KEY NOT NULL,
  coop_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  FOREIGN KEY (coop_id) REFERENCES coops (id)
);

CREATE TABLE IF NOT EXISTS producers (
  id TEXT PRIMARY KEY NOT NULL,
  coop_id TEXT NOT NULL,
  route_id TEXT,
  name TEXT NOT NULL,
  farm TEXT NOT NULL,
  password TEXT NOT NULL,
  route_order INTEGER DEFAULT 0,
  FOREIGN KEY (coop_id) REFERENCES coops (id),
  FOREIGN KEY (route_id) REFERENCES routes (id)
);

CREATE TABLE IF NOT EXISTS milkman_routes (
  milkman_id TEXT NOT NULL,
  route_id TEXT NOT NULL,
  PRIMARY KEY (milkman_id, route_id),
  FOREIGN KEY (milkman_id) REFERENCES milkmen (id),
  FOREIGN KEY (route_id) REFERENCES routes (id)
);

CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY NOT NULL,
  producer_id TEXT NOT NULL,
  milkman_id TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  volume REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'synced',
  photo_uri TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (producer_id) REFERENCES producers (id),
  FOREIGN KEY (milkman_id) REFERENCES milkmen (id)
);
`;
