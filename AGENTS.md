# AGENTS.md — AgroManager

Guia para agentes de IA e devs que trabalham neste repositório. Leia isto e as
**regras em [`rules/`](./rules)** antes de alterar código.

## O que é

App mobile para cooperativas leiteiras digitalizarem a coleta de leite. Três
perfis (DRS RF-01): **administrador (cooperativa)**, **leiteiro (motorista)** e
**produtor**. Visão do produto em [`PRODUCT.md`](./PRODUCT.md); requisitos
funcionais (RF-01..RF-04 / REQ-xx.y) em
[`ref/MilkRoute/uploads/AgroManager_DRS_Secao4.txt`](./ref/MilkRoute/uploads/AgroManager_DRS_Secao4.txt);
telas de referência em [`ref/MilkRoute/screens/`](./ref/MilkRoute/screens).

## Stack (mantida mínima)

- **React Native + Expo** (SDK 54), TypeScript.
- **expo-sqlite** como única fonte de dados/estado (sem zustand/Redux/ORM).
- `@react-navigation` (stack raiz + bottom tabs), `react-native-svg`.
- **Apenas tema claro.**

## Estrutura

```
App.tsx                # boot: fontes + migração do banco + RootNavigator
src/global/            # camada compartilhada: theme, ui, database, @types, routes
src/modules/<modulo>/  # uma feature por módulo (producer, admin, milkman, auth)
                       # cada módulo tem: assets, @types, database, global, pages, routes, service
ref/                   # mockups de design e DRS (não é código do app; ignorado no lint)
rules/                 # regras do projeto (abaixo)
.specs/                # planejamento spec-driven (visão, roadmap, memória, specs)
```

Hoje só o módulo **producer** está implementado; **admin** e **milkman** são
scaffolds ("Em breve"); **auth** tem o login funcional que direciona por perfil.

## Comandos

```bash
npm start          # expo start
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run lint       # eslint (ref/ é ignorado)
npm test           # jest
npx tsc --noEmit   # checagem de tipos
```

Banco local: `agromanager.db`. O seed (idempotente) popula a cooperativa, rotas,
leiteiro, produtores e as coletas do produtor logado (P-014) no primeiro boot.

## Regras do projeto (LEITURA OBRIGATÓRIA)

- [`rules/architecture.md`](./rules/architecture.md) — estrutura de pastas, a
  fórmula de 7 pastas por módulo, camada `global`, como criar um novo módulo.
- [`rules/data-and-state.md`](./rules/data-and-state.md) — expo-sqlite como única
  fonte de dados, camadas pages→service→database, rastreabilidade de REQ, testes.
- [`rules/ui-and-style.md`](./rules/ui-and-style.md) — tema claro único, tokens de
  cor/fonte globais, primitivos de `src/global/ui`, diretrizes de design pt-BR.

## Convenções rápidas

- Não criar pasta `components/`. Reutilizáveis cross-module em `src/global/ui`;
  do módulo, no `global/` do módulo.
- Telas terminam em `*Page.tsx`; navigators em `*Routes.tsx`; queries em `*Queries.ts`.
- Comente regras de negócio com o ID do requisito (ex.: `// REQ-04.1`).
- Sempre rode `npx tsc --noEmit`, `npm run lint` e `npm test` antes de concluir.
