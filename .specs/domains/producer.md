# Spec: Produtor

**Domínio:** Produtor cooperado
**Referência:** `ref/MilkRoute/screens/produtor.jsx` — artboards `prod-home` (hero escuro A), `prod-home-alt` (calmo + gráfico B), `prod-hist` (histórico)
**Requisitos:** RF-04 (REQ-04.1 a REQ-04.7), REQ-03.16, REQ-03.17
**Páginas existentes:** `src/pages/ProducerHome/`, `src/pages/ProducerHistory/`

---

## L1. ProducerHome — Dashboard

### 1.1 Layout (variante A — hero escuro)

Estrutura vertical, 3 zonas:

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Hero (～45%) | Fundo `primaryDark` + Wordmark + settings + saudação "Boa tarde, {nome}" + nome da fazenda + volume do mês (hero, 64px) + cartão de projeção âmbar | `produtor.jsx:6-58` |
| Rolagem (～40%) | Título "Últimas coletas" + link "Ver tudo" + Card com até 3 `ColetaRowProdutor` | `produtor.jsx:60-72` |
| TabBar | 3 abas: Início, Histórico, Perfil | `produtor.jsx:75-82` |

### 1.2 Variação B (artboard `prod-home-alt`)

Alternativa com fundo claro, gráfico de barras na primary card e projeção em card separado. **Implementar como segunda opção apenas se houver tempo.**

### 1.3 Componentes visuais do `/ref`

| Elemento `/ref` | Descrição |
|---|---|
| `Wordmark` (tone light) | Logo MilkRoute no canto superior esquerdo, branco sobre fundo escuro |
| `Volume` (size 64, cor #fff) | Volume do mês em `JetBrains Mono` 64px bold, branco |
| `MoneyBRL` (size 32) | Projeção em R$ no cartão âmbar |
| `ProjectionCard` interno | Cartão com fundo `accent`, ícone `Wallet`, label "Projeção · maio", valor R$, fórmula, disclaimer |
| `ColetaRowProdutor` | Linha com `PhotoStripe` 44×44 + data + hora + volume em L |
| `Card` | Container branco com borda `border` |
| `Divider` | Linha horizontal `divider` |

### 1.4 Adaptação do existente

A página atual `src/pages/ProducerHome/index.tsx` já implementa este layout com dados do SQLite via `useProducerData()`. Ajustes necessários:

1. Substituir `ScreenHeader` por dark hero band com Wordmark + settings + saudação
2. Aplicar cartão de projeção âmbar (já existe `ProjectionCard` mas verificar cores)
3. Garantir `ColetaRow` use `PhotoStripe` + data + hora + volume
4. TabBar com 3 abas (Início, Histórico, Perfil)
5. Ajustar paddingTop para `56px` + safe area (conforme `/ref`)

---

## L2. ProducerHistory — Histórico

### 2.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | `ScreenHeader` com título "Minhas coletas" + subtítulo "Maio · {n} sincronizadas" | `produtor.jsx:192-195` |
| Sumário | Card compacto: Total do mês (Volume) + Média/dia (valor numérico) | `produtor.jsx:196-209` |
| Lista | Scroll vertical com `ColetaRowProdutorBig` — PhotoStripe 56×56 + data + hora + SyncBadge + volume + valor R$ estimado | `produtor.jsx:210-218` |
| TabBar | 3 abas, ativo = Histórico | `produtor.jsx:220-227` |

### 2.2 `ColetaRowProdutorBig` (diferença da compact)

- PhotoStripe maior: **56×56** (vs 44×44 no dashboard)
- Exibe **data** (ex: "13 mai") + **hora** + **SyncBadge**
- Volume em **20px bold** + valor R$ abaixo (volume × pricePerLiter)

### 2.3 Adaptação do existente

A página `src/pages/ProducerHistory/index.tsx` já implementa este layout. Ajustes:

1. Adicionar `PhotoStripe` em cada linha
2. Adicionar `SyncBadge` em cada linha
3. Adicionar valor R$ estimado abaixo do volume
4. Remover `FlatList` se necessário (Card com scroll simples resolve)
5. TabBar com 3 abas

---

## 3. Estados

### ProducerHome

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Loading** | `useProducerData()` retorna null | View vazia (já implementado) |
| **Populado** | Dados carregados | Hero + projeção + últimas coletas |
| **Empty (sem coletas)** | Produtor novo, monthVolume = 0 | Hero mostra "0 L", projeção "R$ 0,00", lista vazia |
| **Error** | Falha na query SQLite | Não previsto no MVP (banco local sempre disponível) |

### ProducerHistory

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Loading** | Dados carregando | View vazia |
| **Populado** | Coletas existentes | Sumário + lista |
| **Empty** | Nenhuma coleta | Sumário com "0 L" e "0,0 L", lista vazia |

---

## 4. Dados

### Queries SQLite

Todas já implementadas em `services/producerQueries.ts` e `services/producerService.ts`:

| Query | Retorno | Usada em |
|-------|---------|----------|
| `getProducerProfile(id)` | `{ profile, pricePerLiter }` | Home |
| `getProducerCollections(id)` | `Coleta[]` (mais recentes primeiro) | Home + History |
| `loadProducerData(id)` | `ProducerData` (profile + collections + derivados) | Home + History |
| `buildProducerHomeSummary(data)` | `{ firstName, recentCollections }` | Home |
| `useProducerData(id)` | Hook que chama `loadProducerData` | Home + History |

### Cálculos (`src/utils/projection.ts`)

| Função | Fórmula | REQ |
|--------|---------|-----|
| `sumSyncedVolume` | `SUM(volume)` onde `status='synced'` | REQ-03.17 |
| `calcProjection` | `monthVolume × pricePerLiter` | REQ-04.1 |
| `avgPerDay` | `monthVolume / dias com coleta` | — |

O preço base é `2.45 R$/L` (vindo de `coops.price_per_liter` no seed). REQ-04.2.

---

## 5. Navegação

| Origem | Ação | Destino |
|--------|------|---------|
| Login (perfil produtor) | Auto | `ProducerTabs` → `Inicio` (Home) |
| Home → "Ver tudo" | Tap | `Historico` tab |
| Historico → back | Tap | `Inicio` tab |

### ProducerTabs (já implementado em `src/pages/ProducerTabs.tsx`)

| Tab | Rótulo | Ícone | Tela |
|-----|--------|-------|------|
| 0 | Início | Home | `ProducerHomePage` |
| 1 | Histórico | History | `ProducerHistoryPage` |
| 2 | Perfil | Settings | *placeholder — futura tela de perfil* |

**Ajuste necessário:** Adicionar terceira aba "Perfil" com ícone `Settings` (navegando para lugar nenhum ou mesma tela de home por enquanto).

---

## 6. Componentes a criar/revisar

| Componente | Ação | Detalhes |
|---|---|---|
| `ColetaRow` | **Revisar** | Adicionar `SyncBadge` no history; garantir `PhotoStripe` com tamanhos corretos (sm=44, md=56) |
| `ScreenHeader` | **Revisar** | Garantir paddingTop 56px + statusBar |
| `Wordmark` | OK | Já existe, com variante light/dark |
| `ProjectionCard` | **Revisar** | Ajustar cores para fundo `accent` com texto escuro |
| `Volume` | OK | Já existe, com variantes hero/compact |
| `MoneyBRL` | OK | Já existe |
| `TabBar` | OK | Já existe com sistema de abas |

---

## 7. Hooks/Services

| Hook/Service | Finalidade |
|---|---|
| `useProducerData()` | Já existe, carrega `ProducerData` do SQLite |
| `loadProducerData(id)` | Já existe |
| `buildProducerHomeSummary(data)` | Já existe |

---

## 8. Critérios de aceite

### Home
1. [ ] Fundo hero `primaryDark` com Wordmark branco e settings icon
2. [ ] Saudação "Boa tarde, {primeiro nome}" e nome da fazenda
3. [ ] Label "Volume do mês · maio" + valor em 64px bold branco
4. [ ] Cartão de projeção âmbar com ícone Wallet, valor R$, fórmula, disclaimer
5. [ ] Seção "Últimas coletas" com até 3 itens (PhotoStripe + data + hora + volume)
6. [ ] Link "Ver tudo" navega para tab Histórico
7. [ ] TabBar com 3 abas: Início, Histórico, Perfil

### History
1. [ ] Header "Minhas coletas" com contagem
2. [ ] Card sumário: Total do mês + Média/dia
3. [ ] Lista de coletas com PhotoStripe 56×56 + data + hora + SyncBadge + volume + valor R$
4. [ ] TabBar com aba Histórico ativa

---

## 9. Skills para implementação

```markdown
@skill impeccable
@skill frontend-design
```

Alinhar visual com `ref/MilkRoute/screens/produtor.jsx`:
- Hero escuro: gradiente `primaryDark` para `primary`
- Volume do mês: `JetBrains Mono` 64px bold, letter-spacing -2
- Cartão projeção: fundo `accent` (#DBA646), texto escuro
- FotoStripe: listrada diagonal, legenda "foto da régua" em mono 11px uppercase
- ColetaRow: mesma altura e padding do `/ref` (padding 12-14px)
