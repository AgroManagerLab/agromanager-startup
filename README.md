# Milkroute

Aplicativo mobile para cooperativas leiteiras gerenciarem a coleta de leite. Três perfis de acesso: **Administrador**, **Leiteiro (motorista)** e **Produtor**.

## Equipe

- Matheus Rezende
- Matheus Borges
- Sérgio Borges
- Wesley Sanches

## Stack

- React Native + Expo (SDK 54)
- TypeScript
- expo-sqlite (banco local)
- expo-camera (captura de foto da régua)
- expo-file-system (armazenamento de fotos)
- @react-native-community/netinfo (monitoramento de conexão)

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR Code com **Expo Go** ou pressione `a` (Android) / `i` (iOS) para abrir no emulador.

### Comandos auxiliares

```bash
npm run lint        # ESLint
npm test            # Jest
npx tsc --noEmit    # TypeScript check
```

## Funcionalidades

### RF-01 — Login e Autenticação

- Login com e-mail e senha
- Redirecionamento por perfil (admin / leiteiro / produtor)
- Logout no menu Perfil

### RF-02 — Cadastros (Administrador)

- CRUD de produtores (nome, fazenda, rota)
- Cadastro de rotas
- Cadastro de leiteiros com vínculo a uma ou mais rotas
- Listagem de produtores com busca e filtro por rota
- Detalhamento do produtor com histórico de coletas e projeção de pagamento

### RF-03 — Coleta (Leiteiro)

- Listagem da rota do dia com status (PRÓXIMO / Pendente / Registrada)
- Registro de coleta com volume e foto obrigatória da régua via câmera nativa
- Operação offline: coleta salva localmente como pendente
- Sincronização automática ao reconectar + botão manual de sincronia
- Histórico completo com fotos e filtro por status (Todas / Pendentes / Sincronizadas)
- Tela de detalhe da coleta com foto ampliada

### RF-04 — Projeção (Produtor)

- Painel inicial com volume do mês e projeção de pagamento
- Histórico de coletas sincronizadas
- Detalhe da coleta com foto e valor estimado

## Estrutura do projeto

```
App.tsx                  # Boot: fontes + migração SQLite + navegação
src/
  components/            # UI reutilizável (Card, TabBar, CameraModal, ícones...)
  context/               # AuthContext, ConnectivityContext
  database/              # Schema, seed, migração, cliente SQLite
  global/themes.tsx      # Tokens de cor e tipografia
  pages/                 # Uma pasta por tela (index.tsx + styles.ts)
    Login/
    AdminHome/
    AdminProducerList/
    AdminProducerDetail/
    AdminRegisterProducer/
    AdminRegisterRoute/
    AdminRegisterMilkman/
    MilkmanHome/
    MilkmanList/
    MilkmanRegisterCollection/
    MilkmanHistory/
    MilkmanCollectionDetail/
    ProducerHome/
    ProducerHistory/
    ProducerCollectionDetail/
  routes/                # Navegadores (auth.tsx + app.tsx)
  screens/               # Switcher raiz (auth vs app)
  services/              # Queries SQL e regras de negócio
  types/                 # Tipos compartilhados
  utils/                 # Funções puras (projeção, data)
```

## Screenshots

<!-- Adicionar prints aqui -->
