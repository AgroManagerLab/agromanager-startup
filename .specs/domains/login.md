# Spec: Login (Autenticação)

**Domínio:** Comum a todos os perfis
**Referência:** `ref/MilkRoute/screens/login.jsx` — artboards `login` (padrão) e `login-error` (erro de credencial)
**Requisitos:** REQ-01.1 a REQ-01.7

---

## 1. Layout

### 1.1 Estrutura visual

A tela de login ocupa o canvas inteiro do telefone (402×874 no `/ref`). Dividida em 3 zonas verticais:

| Zona | Conteúdo | Referência |
|------|----------|------------|
| Topo (～40%) | CowMark ilustrativo + wordmark "MilkRoute" + tagline | `login.jsx:62-76` |
| Meio (～35%) | Título "Bem-vindo de volta" + subtítulo + formulário (e-mail, senha, erro opcional) | `login.jsx:78-118` |
| Base (～25%) | Link "Esqueci a senha" + botão "Entrar" + footer "Ainda não é cooperado?" | `login.jsx:120-128` |

### 1.2 Paleta (tokens do `/ref`)

Use os tokens de `ref/MilkRoute/screens/tokens.jsx` traduzidos para `src/global/themes.tsx`:

| Token `/ref` | Equivalente `themes.tsx` | Finalidade |
|---|---|---|
| `MR.bg` | `colors.bg (#F7F4EE)` | Fundo da página |
| `MR.surface` | `colors.surface (#FFFFFF)` | Campos de input |
| `MR.border` | `colors.border (#E5E1D9)` | Borda de input normal |
| `MR.primary` | `colors.primary (#2F6A4E)` | Botão principal, wordmark accent |
| `MR.ink` | `colors.ink (#292D34)` | Títulos, labels |
| `MR.ink2` | `colors.ink2 (#5E636B)` | Subtítulos, placeholders |
| `MR.ink3` | `colors.ink3 (#8B8F97)` | Texto secundário leve |
| `MR.dangerBg` | `colors.dangerBg (#F4E0DC)` | Fundo da caixa de erro |
| `MR.danger` | `colors.danger (#C0503F)` | Texto do erro |
| `MR.radii.md` | `colors.radii.md (16)` | Arredondamento campos/botão |

### 1.3 CowMark (ilustração da vaca)

Mantido como componente SVG existente em `src/components/CowMark.tsx`. Já reflete o design do `/ref` (vaca geométrica verde + branco + âmbar). **Nenhuma alteração necessária.**

---

## 2. Estados

| Estado | Gatilho | Comportamento visual |
|--------|---------|---------------------|
| **Default** | Tela recém-aberta | Campos: e-mail preenchido (`joao@coopvaleleite.coop.br`), senha preenchida (oculta). Sem caixa de erro. |
| **Foco e-mail** | Usuário toca campo e-mail | Borda do campo e-mail fica verde (`primary`), sombra `0 0 0 4px oklch(0.42 0.085 150 / 0.12)` |
| **Foco senha** | Usuário toca campo senha | Borda do campo senha fica verde, sombra igual |
| **Mostrar senha** | Usuário toca "MOSTRAR" | Alterna `secureTextEntry`, texto muda para "OCULTAR" |
| **Erro** | Login falha | Caixa de erro aparece abaixo dos campos: ícone alerta + título "E-mail ou senha incorretos" + descrição "Verifique seus dados e tente novamente." |
| **Sucesso** | Login OK | Transição para rota do perfil (sem feedback visual na tela de login) |

---

## 3. Dados

Não há consulta SQLite nesta tela. A autenticação usa `authService.authenticate(email: string)` que consulta `milkmen` e determina o perfil.

### Perfis × credenciais mockadas

| Perfil | Email | Senha | userId |
|--------|-------|-------|--------|
| Produtor | `joao@coopvaleleite.coop.br` | `milkroute` | `P-014` |
| Leiteiro | `ricardo@coopvaleleite.coop.br` | `milkroute` | `M-01` |
| Admin | `admin@coopvaleleite.coop.br` | `milkroute` | `ADMIN` |

### Fluxo de dados

```
LoginPage → useAuth().signIn(email, password)
  → authService.authenticate(email)
    → userRepository.findMilkmanIdByEmail(email)  // se for leiteiro
    → determineProfileFromEmail()                  // admin, milkman ou producer
  → AuthContext seta profile + userId
  → screens/index.tsx detecta profile != null → renderiza AppNavigator
```

---

## 4. Componentes

### Existentes (reutilizar)

| Componente | Uso na tela |
|---|---|
| `CowMark` | Ilustração central do topo |
| `MailIcon` | Ícone do campo e-mail |
| `LockIcon` | Ícone do campo senha |
| `AlertIcon` | Ícone da caixa de erro |

### A criar

Nenhum. Todo o layout é feito com `View`, `Text`, `TextInput`, `TouchableOpacity` e `SafeAreaView`. A página já está implementada em `src/pages/Login/index.tsx`.

---

## 5. Navegação

| Ação | Destino | Mecanismo |
|------|---------|-----------|
| Entrar (sucesso produtor) | `ProducerTabs` | `AppNavigator` → `ProducerTabs` |
| Entrar (sucesso leiteiro) | `Milkman` | `AppNavigator` → `Milkman` (scaffold) |
| Entrar (sucesso admin) | `Admin` | `AppNavigator` → `Admin` (scaffold) |
| "Esqueci a senha" | N/A (MVP) | Apenas texto, sem ação |
| "Fale com sua cooperativa" | N/A (MVP) | Apenas texto, sem ação |

---

## 6. Hooks/Services necessários

| Hook | Finalidade | Origem |
|------|-----------|--------|
| `useAuth().signIn` | Autenticar e redirecionar | `AuthContext` (já existe) |

---

## 7. Critérios de aceite

1. [ ] CowMark + MilkRoute wordmark renderizados no topo
2. [ ] Campos e-mail e senha com ícones, label, placeholder
3. [ ] Botão "MOSTRAR"/"OCULTAR" alterna visibilidade da senha
4. [ ] Foco no campo destaca borda verde com sombra
5. [ ] Click "Entrar" com credenciais válidas → navega para tela do perfil
6. [ ] Click "Entrar" com credenciais inválidas → exibe caixa de erro
7. [ ] Caixa de erro some se o usuário corrige e tenta novamente
8. [ ] Footer "Ainda não é cooperado?" + "Esqueci a senha" visíveis

---

## 8. Skills para implementação

```markdown
@skill impeccable
@skill frontend-design
```

Alinhar visual pixel a pixel com `ref/MilkRoute/screens/login.jsx`. Garantir fonte `Manrope` (carregada via `useFonts` no `App.tsx`), campos de 56px de altura, botão "Entrar" de 60px com cor `primary` e bordas `radii.md`.
