# Regra: Arquitetura e estrutura de pastas

O AgroManager segue a arquitetura de estrutura flat
com camadas bem definidas.

## Layout do projeto

```
App.tsx                      # boot: carrega fontes, roda migração do banco, monta o RootScreens
src/
  components/                # componentes de UI reutilizáveis (Card, Volume, TabBar, ícones...)
  constants/                 # valores fixos compartilhados (preço do leite, IDs...)
  context/                   # estado global (AuthContext — sessão do usuário)
  database/                  # cliente expo-sqlite, schema, seed, migração
  global/
    themes.tsx               # tokens de cor + tipografia + hook useTheme (tema claro único)
  pages/                     # uma pasta por tela, cada uma com index.tsx + styles.ts
    Login/
    ProducerHome/
    ProducerHistory/
    ProducerTabs.tsx          # bottom tabs do produtor (não é página, é navigator)
    AdminHome/
    MilkmanHome/
  routes/                    # navegação separada por fluxo
    auth.tsx                 # AuthNavigator (stack de login)
    app.tsx                  # AppNavigator (stack principal do app autenticado)
  screens/                   # switcher raiz: decide se mostra auth ou app
    index.tsx
  services/                  # regras de negócio, queries SQLite e hooks de dados
  types/                     # contratos de tipos compartilhados
    index.ts
  utils/                     # funções auxiliares puras (ex.: projeção de pagamento)
```

## Responsabilidades

| Pasta       | Conteúdo                                                              |
|-------------|-----------------------------------------------------------------------|
| `components` | Componentes visuais reutilizáveis e independentes de tela            |
| `constants`  | Valores fixos e configurações compartilhadas                          |
| `context`    | Provedores e hooks de estado global (AuthContext)                    |
| `database`   | Conexão SQLite, schema, seed e migração versionada                   |
| `global`     | Tema único (cores, tipografia, hook useTheme)                        |
| `pages`      | Telas da aplicação, uma pasta por tela com `index.tsx` + `styles.ts` |
| `routes`     | Definição de navegação (auth stack + app stack)                      |
| `screens`    | Switcher raiz que alterna entre auth e app conforme sessão           |
| `services`   | Queries SQL, regras de negócio e hooks de dados                      |
| `types`      | Tipos compartilhados entre camadas                                   |
| `utils`      | Funções puras sem dependência de UI ou banco                         |

## Camadas de acesso

```
pages  ──>  services (hook + regra)  ──>  database (queries SQLite)  ──>  getDatabase()
```

- Telas não falam diretamente com o banco.
- Serviços encapsulam acesso a dados e regras de negócio.
- Componentes não carregam regras de fluxo.

## Navegação

- `src/screens/index.tsx` é o ponto de entrada da navegação.
- Usuário não autenticado → `routes/auth.tsx` (Login).
- Usuário autenticado → `routes/app.tsx` (navegação por perfil).
- Cada perfil (producer, admin, milkman) tem seu próprio fluxo dentro do app stack.

## Novo módulo/página

1. Criar pasta em `src/pages/<Nome>/` com `index.tsx` + `styles.ts`.
2. Adicionar a rota em `src/routes/app.tsx`.
3. Implementar services usando `getDatabase()` de `src/database/`.
4. Reaproveitar componentes de `src/components/` e tema de `src/global/themes.tsx`.
