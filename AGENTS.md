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
App.tsx                # boot: fontes + migração do banco + RootScreens
src/
  components/          # UI reutilizável (Card, Volume, TabBar, ícones...)
  constants/           # valores fixos compartilhados
  context/             # AuthContext (sessão do usuário)
  database/            # conexão SQLite, schema, seed, migração
  global/themes.tsx    # tokens de cor e tipografia (tema claro único)
  pages/               # uma pasta por tela com index.tsx + styles.ts
  routes/              # navegação separada (auth.tsx + app.tsx)
  screens/             # switcher raiz (auth vs app)
  services/            # queries SQL, regras de negócio, hooks de dados
  types/               # tipos compartilhados
  utils/               # funções puras (ex.: projeção de pagamento)
ref/                   # mockups de design e DRS (não é código do app; ignorado no lint)
rules/                 # regras do projeto (abaixo)
.specs/                # planejamento spec-driven (visão, roadmap, memória, specs)
```

Os três perfis estão implementados de ponta a ponta: **Produtor** (home,
histórico, detalhe da coleta), **Leiteiro** (home, rotas, produtores da rota,
registro de coleta, histórico, detalhe) e **Admin** (dashboard, lista/detalhe/
cadastro/edição de produtores e leiteiros, cadastro de rotas). O leiteiro escolhe
uma **rota ativa** (`milkmen.active_route_id`) que foca Início/Produtores.

## Comandos

```bash
npm start          # expo start
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run lint       # eslint (ref/ é ignorado)
npm test           # jest
npx tsc --noEmit   # checagem de tipos
```

Banco local: `agromanager.db`. O seed (idempotente) popula a cooperativa, **admin**,
rotas, leiteiro, produtores (todos com e-mail de login) e coletas com **datas
relativas a hoje** no primeiro boot. Não há dados mockados em telas/serviços:
admin, leiteiro e produtor autenticam por e-mail+senha no banco.

## Regras do projeto (LEITURA OBRIGATÓRIA)

- [`rules/architecture.md`](./rules/architecture.md) — estrutura de pastas flat,
  camadas pages→services→database, como criar um novo módulo/página.
- [`rules/data-and-state.md`](./rules/data-and-state.md) — expo-sqlite como única
  fonte de dados, camadas pages→service→database, rastreabilidade de REQ, testes.
- [`rules/ui-and-style.md`](./rules/ui-and-style.md) — tema claro único, tokens de
  cor/fonte em `src/global/themes.tsx`, componentes em `src/components/`, pt-BR.

## Convenções rápidas

- Componentes reutilizáveis em `src/components/`.
- Páginas em `src/pages/<Nome>/index.tsx` + `styles.ts`.
- Navigators em `src/routes/`; queries em `src/services/*Queries.ts`.
- Comente regras de negócio com o ID do requisito (ex.: `// REQ-04.1`).
- Sempre rode `npx tsc --noEmit`, `npm run lint` e `npm test` antes de concluir.
