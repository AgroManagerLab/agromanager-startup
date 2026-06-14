# Spec: Administrador (Cooperativa)

**Domínio:** Administrador da cooperativa
**Referência:** `ref/MilkRoute/screens/admin.jsx` — artboards `admin-home`, `admin-home-alt`, `admin-cadastros`, `admin-cad-produtor`, `admin-cad-rota`, `admin-cad-leiteiro`, `admin-list`, `admin-detail`
**Requisitos:** RF-02 (REQ-02.1 a REQ-02.18), REQ-01.5, REQ-04.5
**Página existente:** `src/pages/AdminHome/` (scaffold "Em breve")

---

## Telas do domínio

| # | Tela | Artboard `/ref` | Prioridade |
|---|------|-----------------|------------|
| A1 | AdminHome — Dashboard | `admin-home` | Alta |
| A2 | AdminCadastrosHub — Hub de cadastros | `admin-cadastros` | Alta |
| A3 | AdminCadastroProdutor — Formulário produtor | `admin-cad-produtor` | Alta |
| A4 | AdminCadastroRota — Formulário rota | `admin-cad-rota` | Alta |
| A5 | AdminCadastroLeiteiro — Formulário leiteiro | `admin-cad-leiteiro` | Alta |
| A6 | AdminListagemProdutores — Lista de produtores | `admin-list` | Alta |
| A7 | AdminDetalhamentoProdutor — Detalhe do produtor | `admin-detail` | Alta |

---

## A1. AdminHome — Dashboard

### 1.1 Layout (artboard `admin-home`)

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Hero dark (～35%) | Fundo `primaryDark` + Wordmark branco + settings + saudação "Olá, Helena" + nome da cooperativa + badge mês + métrica big volume + mini métricas (Hoje, Projeção, Preço/L) | `admin.jsx:16-60` |
| Atalhos | Grid 2×2: "Cadastros" (primarySoft) + "Produtores" (accentSoft) | `admin.jsx:63-68` |
| Equipe em rota | Seção "Equipe em rota agora" + Card com RouteRow (Avatar + nome + rota + progresso + badge status) | `admin.jsx:70-79` |
| TabBar | 4 abas: Início, Produtores, Cadastros, Perfil | `admin.jsx:82-90` |

### 1.2 Variação (artboard `admin-home-alt`)

Versão com `ScreenHeader` claro + hero card gradiente + grid 3 stats + timeline. **Implementar como segunda opção se houver tempo.**

### 1.3 RouteRow

```
[Avatar 42px]  [ Nome                          Badge status ]
               [ Rota · done/total                            ]
```

Status badges:
| Status | Fundo | Texto | Label |
|--------|-------|-------|-------|
| `rota` | `primarySoft` | verde escuro | "Em rota" |
| `concluida` | `syncBg` | verde escuro | "Concluída" |
| `esperando` | `surface2` | `ink2` | "Aguardando" |

---

## A2. AdminCadastrosHub — Hub de cadastros

### 2.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | "Cadastros" + "O que você quer cadastrar?" | `admin.jsx:234-237` |
| Lista | 3 `CadastroCard` empilhados: Produtor, Rota, Leiteiro | `admin.jsx:238-263` |
| TabBar | 4 abas, ativo = Cadastros | `admin.jsx:264-273` |

### 2.2 CadastroCard

```
[Ícone 60×60]  [ Título (19px bold)           > ]
               [ Subtítulo (13.5px ink2)         ]
               [ Contagem (mono, cor do tema)    ]
```

Cada card tem cor de fundo diferente no ícone:
| Card | Cor do ícone | Cor do texto contagem |
|------|-------------|----------------------|
| Produtor | `primarySoft` | `primaryDark` |
| Rota | `accentSoft` | âmbar escuro |
| Leiteiro | azul claro (240 hue) | azul escuro |

---

## A3. AdminCadastroProdutor — Formulário (REQ-02.1 a REQ-02.4)

### 3.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | "Novo produtor" + "Dados cadastrais e acesso" | `admin.jsx:300-303` |
| Form | 4 campos: Nome, Identificador da fazenda, Rota (dropdown), Senha (com "GERAR") | `admin.jsx:304-318` |
| Footer fixo | Botões "Cancelar" (secondary) + "Cadastrar" (primary, ícone Check) | `admin.jsx:320-324` |

### 3.2 Campos do formulário

| Campo | Tipo | Placeholder / Valor | Observação |
|-------|------|---------------------|------------|
| Nome completo | Texto | — | Text input padrão |
| Identificador da fazenda | Texto | — | Text input padrão |
| Rota associada | Dropdown | — | Select com ícone Route + Chevron |
| Senha inicial | Texto (oculta) | — | Botão "GERAR" gera senha aleatória |

### 3.3 Persistência (REQ-02.1, REQ-02.3, REQ-02.4)

- Insert em `producers` com `coop_id` do admin logado
- Senha armazenada como texto plano (MVP)
- Campo `route_id` vinculado a `routes`

---

## A4. AdminCadastroRota — Formulário (REQ-02.5 a REQ-02.7)

### 4.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | "Nova rota" + "Sequência de coleta" | `admin.jsx:331-334` |
| Form | Nome da rota + Identificador (4 chars) | `admin.jsx:335-341` |
| Seleção produtores | Label "Produtores nesta rota · {n} selecionados" + Card com `ProdutorMini` checkboxes + botão "Adicionar produtor" (dashed) | `admin.jsx:343-359` |
| Footer fixo | "Cancelar" + "Salvar rota" | `admin.jsx:361-364` |

### 4.2 ProdutorMini

```
[Checkbox]  [Avatar 38px]  [ Nome (15px bold)    Ordem ]
                           [ Fazenda (13px ink2)        ]
```

- Tap no checkbox alterna seleção
- Ordem: badge 28×8 com número de sequência

### 4.3 Persistência

- Insert em `routes` com `coop_id`
- Associação produtores × rota via `producers.route_id` (update)
- Ordem dos produtores: campo `route_order` na tabela `producers` ou tabela associativa (definir)

**Ação:** Adicionar coluna `route_order INTEGER` na tabela `producers` (schema.ts + seed.ts).

---

## A5. AdminCadastroLeiteiro — Formulário (REQ-02.8 a REQ-02.10)

### 5.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | "Novo leiteiro" + "Dados de acesso e rotas" | `admin.jsx:397-400` |
| Form | Nome, E-mail, Senha (com "GERAR") | `admin.jsx:401-408` |
| Rotas vinculadas | Label + chips de rota selecionáveis (`RouteChip`) | `admin.jsx:410-417` |
| Footer fixo | "Cancelar" + "Cadastrar" | `admin.jsx:419-424` |

### 5.2 RouteChip

Chip arredondado (pill) com radio circular. Se selecionado: fundo `primary`, texto branco. Se não: fundo `surface`, borda `border`.

### 5.3 Persistência

- Insert em `milkmen` com `coop_id`
- Associação leiteiro × rotas: nova tabela `milkman_routes(milkman_id, route_id)` ou campo na tabela `milkmen` (definir)

**Ação:** Definir modelo de dados. Sugestão: criar tabela `milkman_routes` se suportar múltiplas rotas; caso contrário adicionar `route_id` em `milkmen`.

---

## A6. AdminListagemProdutores — Lista (REQ-02.11 a REQ-02.14)

### 6.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | "Produtores" + "34 ativos · todas as rotas" + botão "+" | `admin.jsx:448-455` |
| Busca | Campo com ícone `Search`, placeholder "Buscar por nome ou fazenda" | `admin.jsx:456-464` |
| Filtros | Pills horizontais: "Todas rotas" (active), "Rota Norte", "Rota Sul", "Rota Leste" | `admin.jsx:465-471` |
| Lista | Card com `ProdutorListItem` (Avatar + nome + fazenda + rota + volume do mês) | `admin.jsx:472-481` |
| TabBar | 4 abas, ativo = Produtores | `admin.jsx:482-492` |

### 6.2 ProdutorListItem

```
[Avatar 44px]  [ Nome (16px bold)              Volume L (mono) ]
               [ Fazenda • Rota (13px ink2)    mai (label)     ]
```

---

## A7. AdminDetalhamentoProdutor — Detalhe (REQ-02.15 a REQ-02.18, REQ-04.5)

### 7.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | Nome do produtor + "Fazenda · Rota" + botão Edit | `admin.jsx:530-538` |
| Métricas | Grid 2 col: Volume do mês (card branco) + Projeção (card primaryDark) | `admin.jsx:542-564` |
| Histórico | "Histórico de coletas" + label "maio · 5 mais recentes" + Card com `ColetaRowAdmin` | `admin.jsx:567-578` |
| Footer | Botão "Ver todas as coletas" (secondary, ícone History) | `admin.jsx:580-582` |

### 7.2 ColetaRowAdmin

```
[PhotoStripe 52×52]  [ Data (14.5px bold)          Volume L (18px bold) ]
                     [ Hora (mono 12px) • Leiteiro                      ]
```

---

## 8. Estados

### AdminHome

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Loading** | Query em andamento | View vazia |
| **Populado** | Dados carregados | Hero + atalhos + equipe em rota |
| **Empty** | Sem rotas/leiteiros | Seção equipe vazia |

### Cadastros Hub

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Default** | Tela aberta | 3 cards sempre visíveis |

### Formulários (cadastro/edição)

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Default** | Tela aberta | Campos vazios (ou preenchidos se edição) |
| **Validação erro** | Campo obrigatório vazio | Borda vermelha, hint de erro |
| **Salvando** | Tap "Cadastrar" | Botão desabilitado, feedback visual |
| **Sucesso** | Insert OK | Navega de volta para hub/listagem |
| **Erro** | Insert falha | Mensagem de erro inline |

### Listagem Produtores

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Populado** | Produtores existem | Lista + filtros |
| **Buscando** | Texto no campo | Filtra por nome/fazenda |
| **Filtro rota** | Tap em pill | Filtra por rota |
| **Empty** | Nenhum produtor | Card vazio com mensagem |

### Detalhamento

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Populado** | Produtor com coletas | Métricas + histórico |
| **Empty** | Produtor sem coletas | Métricas zeradas, histórico vazio |
| **Loading** | Query em andamento | View vazia |

---

## 9. Dados

### Queries SQLite (a criar em `services/adminService.ts`)

| Query | Retorno | REQ |
|-------|---------|-----|
| `getAdminDashboard(coopId)` | Métricas: total produtores, rotas, leiteiros, volume mês, equipe em rota | REQ-01.5 |
| `getProducers(coopId, routeId?)` | Lista de produtores com volume do mês | REQ-02.11 |
| `getProducerDetail(producerId)` | Dados completos + histórico | REQ-02.15 |
| `insertProducer(data)` | Insert em `producers` | REQ-02.1 |
| `insertRoute(data)` | Insert em `routes` | REQ-02.5 |
| `insertMilkman(data)` | Insert em `milkmen` | REQ-02.8 |
| `updateProducer(id, data)` | Update em `producers` | REQ-02.4 |
| `deleteProducer(id)` | Delete em `producers` | REQ-02.4 |

### Novos tipos (em `src/types/index.ts`)

```typescript
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
}

export interface CadastroFormData {
  name: string;
  farm?: string;
  email?: string;
  password: string;
  routeId?: string;
}
```

### Novas tabelas de banco

```sql
-- Para vincular leiteiro a múltiplas rotas (REQ-02.9)
CREATE TABLE IF NOT EXISTS milkman_routes (
  milkman_id TEXT NOT NULL,
  route_id TEXT NOT NULL,
  PRIMARY KEY (milkman_id, route_id),
  FOREIGN KEY (milkman_id) REFERENCES milkmen (id),
  FOREIGN KEY (route_id) REFERENCES routes (id)
);

-- Para ordenação de produtores na rota (REQ-02.6)
ALTER TABLE producers ADD COLUMN route_order INTEGER;
```

---

## 10. Navegação

| Origem | Ação | Destino | Parâmetros |
|--------|------|---------|-----------|
| AdminHome | Tap "Cadastros" atalho | AdminCadastrosHub | — |
| AdminHome | Tap "Produtores" atalho | AdminListagemProdutores | — |
| AdminCadastrosHub | Tap "Produtor" | AdminCadastroProdutor | — |
| AdminCadastrosHub | Tap "Rota" | AdminCadastroRota | — |
| AdminCadastrosHub | Tap "Leiteiro" | AdminCadastroLeiteiro | — |
| AdminCadastro* | Tap "Cancelar" | Volta (hub ou listagem) | — |
| AdminCadastro* | Tap "Cadastrar/Salvar" | Volta (hub ou listagem) | — |
| AdminListagemProdutores | Tap produtor | AdminDetalhamentoProdutor | `{ producerId }` |
| AdminListagemProdutores | Tap "+" no header | AdminCadastroProdutor | — |
| AdminDetalhamentoProdutor | Tap "Ver todas" | AdminListagemProdutores (filtrado) | — |
| AdminDetalhamentoProdutor | Tap Edit | (futuro) AdminCadastroProdutor (edição) | `{ producerId }` |

### AdminTabs (a criar)

Bottom tabs com 4 abas:

| Tab | Rótulo | Ícone | Tela |
|-----|--------|-------|------|
| 0 | Início | Home | `AdminHomePage` |
| 1 | Produtores | Users | `AdminListagemProdutoresPage` |
| 2 | Cadastros | Plus | `AdminCadastrosHubPage` |
| 3 | Perfil | Settings | *placeholder* |

---

## 11. Componentes a criar/revisar

| Componente | Ação | Detalhes |
|---|---|---|
| `AdminHomePage` | **Criar** | Dashboard completo (hero + atalhos + equipe) |
| `AdminCadastrosHubPage` | **Criar** | 3 cards de opção de cadastro |
| `AdminCadastroProdutorPage` | **Criar** | Formulário com 4 campos + footer fixo |
| `AdminCadastroRotaPage` | **Criar** | Form + seleção de produtores |
| `AdminCadastroLeiteiroPage` | **Criar** | Form + chips de rota |
| `AdminListagemProdutoresPage` | **Criar** | Busca + filtros + lista |
| `AdminDetalhamentoProdutorPage` | **Criar** | Métricas + histórico |
| `ShortcutCard` | **Criar** | Card de atalho 2-col (ícone + label + hint) |
| `RouteRow` | **Criar** | Avatar + nome + progresso + badge na equipe |
| `CadastroCard` | **Criar** | Card hub com ícone + título + subtítulo + contagem |
| `ProdutorMini` | **Criar** | Checkbox + Avatar + nome + ordem (na rota) |
| `RouteChip` | **Criar** | Pill selecionável para rotas |
| `FilterPill` | **Criar** | Chip de filtro horizontal |
| `ProdutorListItem` | **Criar** | Avatar + nome + fazenda/rota + volume |
| `ColetaRowAdmin` | **Criar** | PhotoStripe + data + hora + leiteiro + volume |
| `Stat` | **Criar** | Mini card com label + valor grande (grid 3 stats) |
| `TimelineRow` | **Criar** | Hora + rota + leiteiro + barra progresso (variação) |
| `AdminField` | **Criar** | Field grande 72px para formulário admin |

### Componentes existentes a reutilizar

| Componente | Uso |
|---|---|
| `ScreenHeader` | Headers de todas as telas admin |
| `TabBar` | Bottom tabs |
| `Card` | Containers de listas |
| `Divider` | Separação entre linhas |
| `Avatar` | Iniciais coloridas |
| `Wordmark` | Logo no hero |
| `Volume` | Métricas de volume |
| `MoneyBRL` | Valores em R$ |
| `SyncBadge` | Badge de sincronização |
| `PhotoStripe` | Thumbnail de foto |
| `Button` / `BigButton` | Botão principal |

---

## 12. Hooks/Services (a criar)

| Hook/Service | Finalidade |
|---|---|
| `adminService.loadDashboard(coopId)` | Carrega métricas do dashboard |
| `adminService.getProducersList(coopId, filters?)` | Lista de produtores |
| `adminService.getProducerDetail(producerId)` | Detalhe + histórico |
| `adminService.createProducer(data)` | Insert produtor |
| `adminService.createRoute(data, producerIds)` | Insert rota + associações |
| `adminService.createMilkman(data, routeIds)` | Insert leiteiro + associações |
| `adminService.updateProducer(id, data)` | Update produtor |
| `adminService.deleteProducer(id)` | Delete produtor |
| `adminService.adminSignIn(email, password)` | Autenticação admin |

---

## 13. Critérios de aceite

### Dashboard
1. [ ] Hero `primaryDark` com Wordmark + settings + saudação + nome cooperativa
2. [ ] Métrica "Volume do mês" grande + mini stats (Hoje, Projeção, Preço/L)
3. [ ] Grid atalhos: Cadastros + Produtores
4. [ ] Seção "Equipe em rota agora" com RouteRows
5. [ ] TabBar 4 abas

### Hub Cadastros
1. [ ] 3 CadastroCards (Produtor, Rota, Leiteiro)
2. [ ] Cada card com ícone, título, subtítulo, contagem

### Cadastro Produtor
1. [ ] Formulário 4 campos (nome, fazenda, rota, senha)
2. [ ] Botão "GERAR" para senha
3. [ ] Footer fixo Cancelar + Cadastrar
4. [ ] Insert em SQLite

### Cadastro Rota
1. [ ] Formulário 2 campos (nome, identificador)
2. [ ] Lista de produtores com checkbox + ordem
3. [ ] Botão "Adicionar produtor" dashed
4. [ ] Insert em SQLite + associação produtores

### Cadastro Leiteiro
1. [ ] Formulário 3 campos (nome, email, senha)
2. [ ] Chips de rota selecionáveis
3. [ ] Insert em SQLite + associação rotas

### Listagem Produtores
1. [ ] Busca por nome/fazenda
2. [ ] Filtros por rota (pills)
3. [ ] Lista com Avatar + nome + fazenda + rota + volume
4. [ ] Tap navega para detalhe

### Detalhamento Produtor
1. [ ] Métricas: Volume mês + Projeção R$
2. [ ] Histórico de coletas com PhotoStripe + data + hora + leiteiro + volume
3. [ ] Botão "Ver todas as coletas"
4. [ ] Projeção calculada via REQ-04.5

---

## 14. Skills para implementação

```markdown
@skill impeccable
@skill frontend-design
```

Fidelidade ao `ref/MilkRoute/screens/admin.jsx`:
- Hero: fundo `primaryDark` (#234E3A), texto branco, métricas em `JetBrains Mono`
- Volume hero: 60px bold, letter-spacing -2
- ShortcutCard: cor de fundo variável, ícone sobre fundo branco 60% opacidade, texto escuro
- RouteRow: mesmo padding 14px 16px, Avatar 42px, badge pill com label uppercase
- CadastroCard: 60px icon wrap com borderRadius 18, chevron à direita
- Form fields: altura 56px (normal) ou 72px (big), borderRadius 16, foco com sombra verde
- ProdutorMini: checkbox 24×24 com borderRadius 6, ordem com badge surface2
- RouteChip: altura 44px, borderRadius pill, radio 18px
- TabBar: paddingBottom 28px + safeArea, label 11.5px bold
