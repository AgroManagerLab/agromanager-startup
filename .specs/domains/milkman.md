# Spec: Leiteiro (Motorista)

**Domínio:** Leiteiro (motorista da coleta)
**Referência:** `ref/MilkRoute/screens/leiteiro.jsx` — artboards `leit-home`, `leit-list`, `leit-reg-a`, `leit-hist`
**Requisitos:** RF-03 (REQ-03.1 a REQ-03.17)
**Página existente:** `src/pages/MilkmanHome/` (scaffold "Em breve")

---

## Telas do domínio

| # | Tela | Artboard `/ref` | Prioridade |
|---|------|-----------------|------------|
| L1 | LeiteiroHome — Dashboard da rota do dia | `leit-home` | Alta |
| L2 | ListagemProdutores — Minha rota (com status) | `leit-list` | Alta |
| L3 | RegistroColeta — Variante padrão (A) | `leit-reg-a` | Alta |
| L4 | LeiteiroHistorico — Coletas do leiteiro | `leit-hist` | Alta |

**Nota:** As variantes B (camera-first) e C (wizard 2 etapas) de registro não serão implementadas nesta fase conforme decisão (Q8 = A).

---

## L1. LeiteiroHome — Dashboard da rota do dia

### 1.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Hero band (～45%) | Gradiente verde + Wordmark + badge data + saudação "Olá, {nome}" + nome da rota + cartão progresso | `leiteiro.jsx:6-48` |
| Corpo (～40%) | Botão "Registrar coleta" (accent) + seção "Próximas paradas" com Card + NextStop rows | `leiteiro.jsx:50-62` |
| TabBar | 4 abas: Hoje, Produtores, Histórico, Perfil | `leiteiro.jsx:64-72` |

### 1.2 Hero band

- Gradiente: `180deg, oklch(0.42 0.085 150) 0%, oklch(0.36 0.085 150) 100%`
- Wordmark branco (size 20) + settings icon (opcional, omitido no `/ref`)
- Badge: chip arredondado com bolinha `accent` + data (ex: "Qui · 14 mai")
- Saudação: "Olá, Ricardo" (extraído do nome completo do leiteiro)
- Nome da rota: 28px bold (ex: "Rota Norte")
- **Cartão progresso**: semi-transparente `rgba(255,255,255,0.10)`, blur, com:
  - Progresso: "4 / 6" (coletas feitas / total)
  - Barra de progresso: 8px altura, fundo `rgba(255,255,255,0.18)`, barra `accent` 67%
  - Mini métricas: Coletado (565 L), Pendentes (2, cor `accent`), Sincr. (2/4)

### 1.3 Corpo

- **Botão "Registrar coleta"** — estilo `accent` (fundo âmbar, texto escuro), ícone `Plus`
- **"Próximas paradas"** — label uppercase 13px bold
- **Card com `NextStop` rows**: seq (número em badge), nome, fazenda, distância

### 1.4 Componente NextStop

```
[ seq ]  [ Nome do produtor      distância ]
          Fazenda
```

- Seq: badge 40×40, fundo `primarySoft`, número em `JetBrains Mono` 16px bold
- Nome: 15.5px bold, fazenda: 13px ink2
- Distância: `JetBrains Mono` 13px ink2

---

## L2. ListagemProdutores — Minha rota

### 2.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | `ScreenHeader` "Minha rota" + subtítulo "Rota Norte · 6 produtores" | `leiteiro.jsx:109-116` |
| Banner | `OfflineBanner` (se offline) | `leiteiro.jsx:117` |
| Busca | Campo de busca com ícone `Search` | `leiteiro.jsx:118-127` |
| Lista | Card com `LeiteiroProdRow` — seq + Avatar + nome + fazenda + SyncBadge + volume | `leiteiro.jsx:128-141` |
| TabBar | 4 abas, ativo = Produtores | `leiteiro.jsx:143-151` |

### 2.2 Cores de estado por produtor

| Estado | SyncBadge/Status | Cor volume |
|--------|-----------------|------------|
| `synced` | Badge "Sincronizada" (verde) | `MR.ink` |
| `pending` | Badge "Pendente" (âmbar) | `oklch(0.45 0.140 60)` |
| `next` | Texto "Próximo" em mono uppercase | `MR.ink3` |

### 2.3 Busca

Campo de busca com ícone `Search`, texto placeholder "Buscar produtor", altura 52px, borda `border`, fundo `surface`.

---

## L3. RegistroColeta — Variante Padrão (A)

### 3.1 Requisitos funcionais (REQ-03.1 a REQ-03.6)

| REQ | Descrição | Como atender |
|-----|-----------|-------------|
| REQ-03.1 | Selecionar produtor da rota | Dropdown/selector no topo do formulário |
| REQ-03.2 | Informar volume em litros | Campo numérico grande com suffix "L" |
| REQ-03.3 | Foto da régua obrigatória | Botão câmera + `expo-camera` na implementação |
| REQ-03.4 | Impedir confirmação sem foto | Botão "Confirmar" desabilitado se foto ausente |
| REQ-03.5 | Data + hora + leiteiro + produtor automáticos | Timestamp + AuthContext + produtor selecionado |
| REQ-03.6 | Validar vínculo produtor → rota → leiteiro | Query SQL: `producer.route_id IN milkman.route_ids` |

### 3.2 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | "Registrar coleta" + subtítulo + badge "3/6" (ordem na rota) | `leiteiro.jsx:195-202` |
| Produtor | Card com Avatar + nome + fazenda + link "Trocar" | `leiteiro.jsx:203-217` |
| Volume | `Field` com label "Volume coletado", valor numérico grande, suffix "L", focused | `leiteiro.jsx:220-222` |
| Foto | Label "Foto da régua * obrigatória" + botão "Abrir câmera" com ícone Camera | `leiteiro.jsx:224-245` |
| Aviso offline | Banner laranja "Sem conexão · coleta pendente" (se offline) | `leiteiro.jsx:247-257` |
| Footer fixo | Botão "Confirmar coleta" (primary) com ícone Check | `leiteiro.jsx:260-262` |

### 3.3 Fluxo de registro

```
Usuário abre tela → produtor pré-selecionado (primeiro pendente da rota)
Usuário digita volume → habilita botão câmera
Usuário toca "Abrir câmera" → expo-camera abre (tela nativa)
Usuário tira foto → URI salva em estado, thumbnail aparece
Usuário toca "Confirmar coleta" → valida foto existe → SQLite insert collection com status "pending" (se offline) ou "synced" (se online)
→ Navega de volta para listagem ou home
```

### 3.4 Operação offline (REQ-03.7, REQ-03.8)

- Insert em SQLite com `status = 'pending'`
- Foto salva como URI no sistema de arquivos (não simular upload)
- Banner offline exibido no topo da listagem e na tela de registro
- SyncBadge "Pendente" nos itens não sincronizados

---

## L4. LeiteiroHistorico — Coletas do leiteiro

### 4.1 Layout

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Header | "Histórico" + "Suas coletas · todas as rotas" | `leiteiro.jsx:406-409` |
| Banner | `OfflineBanner` (se offline) | `leiteiro.jsx:410` |
| Filtros | Pills: "Todas" (active), "Pendentes 2", "Sincronizadas" | `leiteiro.jsx:411-415` |
| Lista | Agrupada por data: label "Hoje · 14 mai", Card com `ColetaRowLeiteiro` | `leiteiro.jsx:416-433` |
| TabBar | 4 abas, ativo = Histórico | `leiteiro.jsx:435-444` |

### 4.2 ColetaRowLeiteiro

```
[PhotoStripe 48×48]  [ Nome produtor          Volume L ]
                      [ hora • SyncBadge        >        ]
```

- PhotoStripe 48×48
- Nome produtor: 15px bold
- Hora: JetBrains Mono + SyncBadge
- Volume: 18px bold
- Chevron `>` no final (navega para detalhe — futura edição REQ-03.11)

---

## 5. Estados

### LeiteiroHome

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Loading** | `loadMilkmanHomeData()` em andamento | View vazia |
| **Populado** | Rota com produtores | Hero + progresso + próximas paradas |
| **Rota concluída** | done = total | Barra 100%, badge "Concluída", "Próximas paradas" vazio |
| **Rota vazia** | Nenhum produtor na rota | Hero sem próximas paradas, botão "Registrar coleta" desabilitado |

### ListagemProdutores

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Populado** | Produtores existem | Lista com status |
| **Offline** | Sem conexão | `OfflineBanner` no topo |
| **Empty** | Rota sem produtores | Card vazio com mensagem |
| **Buscando** | Texto no campo de busca | Filtra lista por nome/fazenda |

### RegistroColeta

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Default** | Tela aberta | Produtor selecionado, volume vazio, foto vazia |
| **Volume digitado** | Usuário insere valor | Campo mostra valor, habilita câmera |
| **Foto capturada** | Câmera retorna URI | Thumbnail substitui botão "Abrir câmera" |
| **Foto ausente** | Tentar confirmar sem foto | Botão desabilitado |
| **Offline** | Sem conexão | Banner aviso + status pending |
| **Confirmando** | Tap no botão | Insert SQLite → navega para home/listagem |

### Historico

| Estado | Gatilho | Comportamento |
|--------|---------|---------------|
| **Populado** | Coletas existem | Agrupado por data |
| **Empty** | Nenhuma coleta | Mensagem "Nenhuma coleta registrada" |
| **Offline** | Sem conexão | `OfflineBanner` no topo |
| **Filtro ativo** | Tap em pill | Filtra lista por status |

---

## 6. Dados

### Queries SQLite (a criar em `services/milkmanService.ts`)

| Query | Retorno | REQ |
|-------|---------|-----|
| `getMilkmanRoute(milkmanId)` | Dados da rota + produtores | REQ-03.1 |
| `getMilkmanTodayCollections(milkmanId)` | Coletas do dia (synced + pending) | REQ-03.5 |
| `getMilkmanHistory(milkmanId)` | Coletas históricas agrupadas por data | REQ-03.8 |
| `getMilkmanProfile(milkmanId)` | Nome, rotas vinculadas | — |
| `insertCollection(producerId, milkmanId, volume, photoUri)` | Insert em `collections` | REQ-03.7 |
| `getProducersByRoute(routeId)` | Produtores ordenados por sequência | — |

### Novos tipos (em `src/types/index.ts`)

```typescript
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
  todayCollections: CollectionRow[];
}
```

### Seed — dados do leiteiro

O seed atual (`database/seed.ts`) já insere:
- Leiteiro Ricardo Pereira (M-01) vinculado à COOP-01
- Produtores nas rotas R-N, R-S, R-L
- Coletas apenas do produtor P-014

**Adicionar no seed:** Coletas de exemplo para o leiteiro M-01 (COLLECTIONS_LEITEIRO_TODAY do `data.jsx`).

### Cálculos

| Função | Fórmula |
|--------|---------|
| todayProgress | `doneCount / totalProducers` |
| collectedToday | `SUM(volume)` das coletas do dia |

---

## 7. Navegação

| Origem | Ação | Destino | Parâmetros |
|--------|------|---------|-----------|
| LeiteiroHome | Tap "Registrar coleta" | RegistroColeta | `{ producerId: nextPending.id }` |
| LeiteiroHome | Tap produtor na "Próximas paradas" | Listagem | — |
| Listagem | Tap produtor pendente | RegistroColeta | `{ producerId }` |
| Listagem | Tap produtor synced | (opcional) Detalhe da coleta | — |
| RegistroColeta | Confirmar | LeiteiroHome (ou Listagem) | — |
| RegistroColeta | Tap "Trocar" | Dropdown/selector produtor | — |
| Historico | Tap coleta | (futuro) Edição de coleta | `{ collectionId }` |

### MilkmanTabs (a criar)

Bottom tabs com 4 abas:

| Tab | Rótulo | Ícone | Tela |
|-----|--------|-------|------|
| 0 | Hoje | Home | `LeiteiroHomePage` |
| 1 | Produtores | Users | `LeiteiroListagemPage` |
| 2 | Histórico | History | `LeiteiroHistoricoPage` |
| 3 | Perfil | Settings | *placeholder* |

---

## 8. Componentes a criar/revisar

| Componente | Ação | Detalhes |
|---|---|---|
| `MilkmanHomePage` | **Criar** | Dashboard da rota (hero + progresso + próximas paradas) |
| `LeiteiroListagemPage` | **Criar** | Lista de produtores da rota com status |
| `RegistroColetaPage` | **Criar** | Formulário de registro (volume + câmera + confirmar) |
| `LeiteiroHistoricoPage` | **Criar** | Histórico agrupado com filtros |
| `ProgressBar` | **Criar** | Barra horizontal 8px com cor `accent` |
| `MiniMetric` | **Criar** | Label uppercase + valor JetBrains Mono (usado no hero) |
| `NextStopRow` | **Criar** | Seq badge + nome + fazenda + distância |
| `LeiteiroProdRow` | **Criar** | Seq + Avatar + nome + SyncBadge + volume |
| `ColetaRowLeiteiro` | **Criar** | PhotoStripe + nome + hora + SyncBadge + volume + chevron |
| `Field` (volume) | **Criar** | Campo numérico grande com suffix "L" e foco verde |
| `CameraButton` | **Criar** | Botão "Abrir câmera" com ícone, estados (vazio / com foto) |
| `FilterPill` | **Criar** | Chip de filtro horizontal com active/inactive |
| `OfflineBanner` | **Criar** | Banner "Sem conexão" com contagem |

### Componentes existentes a reutilizar

| Componente | Uso |
|---|---|
| `ScreenHeader` | Header de listagem e histórico |
| `TabBar` | Bottom tabs |
| `Avatar` | Iniciais coloridas do produtor |
| `SyncBadge` | "Sincronizada" / "Pendente" |
| `PhotoStripe` | Thumbnail de foto da régua |
| `Card` | Container de listas |
| `Divider` | Separação entre linhas |
| `Wordmark` | Logo no hero |
| `Volume` | Valor numérico + unidade |

---

## 9. Hooks/Services (a criar)

| Hook/Service | Finalidade |
|---|---|
| `milkmanService.loadMilkmanHomeData(id)` | Carrega dashboard completo |
| `milkmanService.loadMilkmanRouteProducers(id)` | Produtores da rota com status |
| `milkmanService.loadMilkmanHistory(id)` | Coletas históricas |
| `milkmanService.registerCollection(producerId, milkmanId, volume, photoUri)` | Insert em collections |
| `useMilkmanData(id)` | Hook que consolida dados |
| `cameraService.takePhoto()` | Abre expo-camera e retorna URI |

---

## 10. Dependência externa

- **`expo-camera`** — câmera nativa para foto da régua (REQ-03.3). Instalar via `npx expo install expo-camera`.

---

## 11. Critérios de aceite

### LeiteiroHome
1. [ ] Hero gradiente verde com Wordmark + badge data + saudação + nome da rota
2. [ ] Cartão progresso: label + barra + mini métricas (coletado, pendentes, sincr.)
3. [ ] Botão "Registrar coleta" estilo accent
4. [ ] "Próximas paradas" com NextStopRows (seq, nome, fazenda, distância)
5. [ ] TabBar com 4 abas

### Listagem Produtores
1. [ ] Header "Minha rota" com contagem de produtores
2. [ ] Campo de busca
3. [ ] Lista com status visual (synced/pending/next)
4. [ ] Tap em produtor pendente → navega para RegistroColeta

### Registro Coleta
1. [ ] Produtor pré-selecionado com Avatar + nome + fazenda
2. [ ] Campo volume numérico grande com suffix "L"
3. [ ] Botão "Abrir câmera" com ícone Camera
4. [ ] Confirmar coleta só habilita com foto
5. [ ] Banner offline quando sem conexão
6. [ ] Badge posição na rota (ex: "3/6")
7. [ ] Insert em SQLite com status correto

### Histórico
1. [ ] Header + filtros (Todas, Pendentes, Sincronizadas)
2. [ ] Agrupamento por data
3. [ ] ColetaRow com PhotoStripe + nome + hora + SyncBadge + volume + chevron

---

## 12. Skills para implementação

```markdown
@skill impeccable
@skill frontend-design
```

Fidelidade ao `ref/MilkRoute/screens/leiteiro.jsx`:
- Hero gradiente usa `primary` → `primaryDark` (ou oklch equivalente)
- Cartão progresso com backdrop-filter/blur (simular com opacidade)
- Botão "Registrar coleta" fundo `accent` (#DBA646), texto escuro (#1c1408)
- Avatar do produtor: initials sobre disco `oklch(0.92 0.040 {hue})` com texto `oklch(0.32 0.080 {hue})`
- LeiteiroProdRow: seq badge 32×32 fundo `surface2`, número `JetBrains Mono`
- PhotoStripe: diagonal striped background, legenda "foto da régua"
- TabBar: paddingBottom 28px + safeArea, gap 4px, label 11.5px
