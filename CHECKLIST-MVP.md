# ✅ Checklist de Requisitos — AgroManager MVP

> RF-01 a RF-04 conforme DRS Seção 4.  
> **Status**: ✅ Feito · ⚠️ Parcial · ❌ Não feito · 🔲 Não iniciado

---

## RF-01 — Gestão de Acesso Multi-tenant (Prioridade: Alta)

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-01.1 | Tela de login com e-mail, senha e botão de autenticação | ✅ | `Login/index.tsx` |
| REQ-01.2 | Validar credenciais e identificar perfil (admin/leiteiro/produtor) | **❌** | `authenticate()` ignora `password`. Qualquer senha funciona. |
| REQ-01.3 | Mensagem de erro clara sem detalhes técnicos | ✅ | "E-mail ou senha incorretos" |
| REQ-01.4 | Associar usuário ao tenant (cooperativa) | ✅ | `coop_id` no schema |
| REQ-01.5 | Direcionar para tela inicial conforme perfil | ✅ | `AppNavigator` rotas por perfil |
| REQ-01.6 | Logout acessível de qualquer tela interna | ✅ | Tab Perfil → "Sair da conta" |
| REQ-01.7 | Bloquear acesso sem autenticação | ✅ | `RootScreens` → `AuthNavigator` |

### 🔧 O que falta

- [ ] **REQ-01.2**: Validar senha contra o banco (`producers.password`, `milkmen.password`, admin fixo)
- [ ] Admin deveria estar cadastrado no DB (hoje qualquer email começando com "admin" funciona)

---

## RF-02 — Cadastros Operacionais (Prioridade: Alta)

### Cadastro de Produtor

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-02.1 | Admin cadastra produtor (nome, fazenda, rota) | ✅ | `AdminRegisterProducer` |
| REQ-02.2 | Admin define senha inicial | ✅ | Campo com botão "GERAR" |
| REQ-02.3 | Associar automaticamente ao tenant do admin | ✅ | `(SELECT id FROM coops LIMIT 1)` |
| REQ-02.4 | Admin edita e exclui produtor | **❌** | Exclusão só no service (`deleteProducer`) sem UI. Edição não existe. |

### Cadastro de Rota

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-02.5 | Admin cadastra rota (nome/identificador) | ✅ | `AdminRegisterRoute` |
| REQ-02.6 | Associar produtores à rota com sequência | ✅ | Checkbox + order badge |
| REQ-02.7 | Admin edita e exclui rota | **❌** | Não implementado |

### Cadastro de Leiteiro

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-02.8 | Admin cadastra leiteiro (nome, e-mail, senha) | ✅ | `AdminRegisterMilkman` |
| REQ-02.9 | Vincular leiteiro a uma ou mais rotas | ✅ | Chips de seleção |
| REQ-02.10 | Associar automaticamente ao tenant | ✅ | `(SELECT id FROM coops LIMIT 1)` |

### Listagem de Produtores

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-02.11 | Listagem com rolagem vertical | ✅ | ScrollView / FlatList |
| REQ-02.12 | Filtrar por perfil (admin: todos; leiteiro: só da rota) | ✅ | Telas separadas |
| REQ-02.13 | Mecanismo de busca por nome ou identificador | ✅ | Search input |
| REQ-02.14 | Item exibe nome e rota | ✅ | Nome, fazenda, rota, volume |

### Detalhamento de Produtor

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-02.15 | Dados cadastrais completos | ✅ | `AdminProducerDetail` |
| REQ-02.16 | Histórico com data, volume e referência à foto da régua | **⚠️** | `PhotoStripe` é placeholder, sem imagem real |
| REQ-02.17 | Volume acumulado no mês corrente | ✅ | |
| REQ-02.18 | Projeção de pagamento | ✅ | Com disclaimer "Valor estimado" |

### 🔧 O que falta

- [ ] **REQ-02.4**: UI de exclusão de produtor (botão + confirmação)
- [ ] **REQ-02.4**: Tela de edição de produtor
- [ ] **REQ-02.7**: Exclusão e edição de rotas
- [ ] **REQ-02.16**: Exibir foto real (depende de câmera, REQ-03.3)

---

## RF-03 — Registro e Acompanhamento de Coleta (Prioridade: Alta)

### Registro de Coleta pelo Leiteiro

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-03.1 | Selecionar produtor da rota e registrar coleta | ✅ | `MilkmanRegisterCollection` |
| REQ-03.2 | Volume em litros, valor numérico positivo | ✅ | `keyboardType="decimal-pad"` |
| REQ-03.3 | Captura obrigatória de foto da régua (câmera nativa) | **❌** | `handleCamera` seta placeholder. `expo-camera` não está no `package.json` |
| REQ-03.4 | Impedir confirmação sem foto | ✅ | `canSubmit` depende de `photoUri !== null` |
| REQ-03.5 | Registrar data, hora, leiteiro, produtor automaticamente | ✅ | `registerCollection()` |
| REQ-03.6 | Validar que produtor pertence à rota do leiteiro | ✅ | `getMilkmanRouteProducers` |

### Operação Offline e Sincronização

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-03.7 | Registrar coleta sem conexão | ✅ | SQLite local |
| REQ-03.8 | Marcar visualmente coletas pendentes de sync | ✅ | `SyncBadge`, `OfflineBanner` |
| REQ-03.9 | Sincronizar automaticamente ao recuperar conexão | **❌** | Sem listener de rede, fila de sync ou push |
| REQ-03.10 | Coletas pendentes invisíveis para admin/produtor | **❌** | Queries não filtram por `status = 'synced'` |

### Edição de Coleta pelo Leiteiro

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-03.11 | Editar volume e fotografia de coletas próprias | **❌** | Não implementado |
| REQ-03.12 | Edição offline persiste localmente como pendente | **❌** | Não implementado |
| REQ-03.13 | Atualizar coleta já sincronizada na próxima sync | **❌** | Não implementado |
| REQ-03.14 | Registrar data/hora da última edição | **❌** | Não implementado |

### Acompanhamento

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-03.15 | Admin vê histórico sincronizado com data, volume e foto | **⚠️** | Sem filtro de sync; foto placeholder |
| REQ-03.16 | Produtor vê próprias coletas sincronizadas | ✅ | Filtro `data.synced` |
| REQ-03.17 | Produtor vê volume acumulado do mês | ✅ | |

### 🔧 O que falta

- [ ] **REQ-03.3**: Integrar `expo-camera` para captura real da foto da régua
- [ ] **REQ-03.9**: Implementar sincronização real (listener `NetInfo`, fila de sync, push)
- [ ] **REQ-03.10**: Filtrar coletas pendentes nas queries de admin e produtor (`WHERE status = 'synced'`)
- [ ] **REQ-03.11–14**: Implementar fluxo de edição de coleta

---

## RF-04 — Projeção de Pagamento ao Produtor (Prioridade: Média)

| REQ | Descrição | Status | Onde / Lacuna |
|-----|-----------|--------|---------------|
| REQ-04.1 | Projeção = soma dos volumes × preço base | ✅ | `calcProjection()` |
| REQ-04.2 | Preço base mockado em BRL | ✅ | R$ 2,45 no seed |
| REQ-04.3 | Apenas coletas sincronizadas no cálculo | ✅ | `sumSyncedVolume()` |
| REQ-04.4 | Exibir projeção ao produtor na tela inicial | ✅ | `ProjectionCard` |
| REQ-04.5 | Exibir projeção ao admin no detalhamento | ✅ | `AdminProducerDetail` |
| REQ-04.6 | Atualizar projeção quando houver alteração | ✅ | Recarregado do SQLite ao renderizar |
| REQ-04.7 | Indicar que é valor estimado | ✅ | "Valor estimado. Não é o pagamento final." |

### 🔧 O que falta

- Nada — RF-04 está completo para o MVP.

---

## Sumário

| RF | Total REQs | ✅ Feito | ⚠️ Parcial | ❌ Não feito |
|----|-----------|----------|------------|-------------|
| RF-01 | 7 | 5 | 0 | **1** (REQ-01.2) |
| RF-02 | 18 | 14 | **1** (REQ-02.16) | **2** (REQ-02.4, 02.7) |
| RF-03 | 17 | 10 | **1** (REQ-03.15) | **6** (03.3, 03.9, 03.10, 03.11, 03.12, 03.13, 03.14) |
| RF-04 | 7 | 7 | 0 | 0 |
| **Total** | **49** | **36** | **2** | **9** |

> 36/49 requisitos implementados (~73%).  
> Foco prioritário: validação de senha (01.2), câmera (03.3), sincronização (03.9), isolamento de pendentes (03.10).
