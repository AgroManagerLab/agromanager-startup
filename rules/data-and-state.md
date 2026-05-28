# Regra: Dados e estado

## Fonte única de dados: expo-sqlite

- **expo-sqlite é a única fonte de dados e de estado** do app. Não usar zustand,
  Redux, MobX ou qualquer biblioteca de estado global. Não usar ORM.
- O banco é aberto uma única vez em `src/global/database/client.ts`
  (`SQLite.openDatabaseSync`). Sempre obter a conexão via `getDatabase()`.
- Esquema do banco em `src/global/database/schema.ts` (cobre todo o domínio:
  `coops`, `routes`, `milkmen`, `producers`, `collections`). Tipos das linhas em
  `src/global/@types/db.ts` — mantenha os dois em sincronia.
- Criação de tabelas + seed rodam em `migrateDatabase()`
  (`src/global/database/migrate.ts`), chamado uma vez no boot (`App.tsx`).
  Versionamento por `PRAGMA user_version`.
- O **seed é idempotente** (só popula se vazio). Dados mockados espelham
  `ref/MilkRoute/screens/data.jsx`.

## Camadas de acesso

```
pages  ──>  service (hook + regra)  ──>  database (queries SQLite)  ──>  getDatabase()
```

- Queries SQL ficam em `<modulo>/database/*Queries.ts` e retornam tipos do módulo.
- Regra de negócio e funções puras de cálculo ficam em `<modulo>/service/`.
  Mantenha o cálculo **puro e separado** do acesso ao banco (ex.: `projection.ts`),
  para permitir testes sem o módulo nativo.
- Telas leem dados por um **hook** do service (ex.: `useProducerData`), que lê do
  SQLite com `useState`/`useEffect`. Sem store global.

## Rastreabilidade de requisitos

O comportamento do sistema vem do DRS em
`ref/MilkRoute/uploads/AgroManager_DRS_Secao4.txt` (RF-01..RF-04, REQ-xx.y).
Comente as regras-chave com o ID do requisito (ex.: `// REQ-04.1`).

## Testes

- Funções puras do `service/` devem ter testes Jest (`*.test.ts`).
- Rode `npm test`. Não importe o cliente do banco em testes de funções puras.
