# Regra: Arquitetura e estrutura de pastas

O AgroManager é um app **Expo / React Native** mantido o **mais simples possível**.
Stack permitida: **React Native + expo-sqlite**. Nada além disso (sem libs de
estado, sem ORM, sem back-end neste escopo).

## Layout do projeto

```
App.tsx                      # boot: carrega fontes, roda migração do banco, monta o RootNavigator
src/
  global/                    # camada compartilhada por TODOS os módulos (não é um módulo de feature)
    theme/                   # design tokens: cores (tema claro único) + tipografia
    ui/                      # primitivos visuais reutilizáveis (Card, Volume, MoneyBRL, TabBar, ícones...)
    database/                # cliente expo-sqlite, schema, seed, migração
    @types/                  # tipos compartilhados (navegação, linhas do banco)
    routes/                  # RootNavigator (stack raiz, direciona por perfil)
  modules/
    <modulo>/                # uma feature por módulo (producer, admin, milkman, auth)
```

## Fórmula de pastas — OBRIGATÓRIA para cada módulo em `src/modules/`

Cada módulo contém **somente** estas 7 pastas:

| Pasta       | Conteúdo                                                              |
|-------------|---------------------------------------------------------------------|
| `assets`    | imagens/ícones específicos do módulo                                 |
| `@types`    | tipos TypeScript do domínio do módulo                               |
| `database`  | queries SQLite do módulo (usam o cliente de `src/global/database`)   |
| `global`    | estilos e componentes reutilizáveis **dentro** do módulo            |
| `pages`     | telas (uma tela = um arquivo `XxxPage.tsx`)                          |
| `routes`    | navegação do módulo (`XxxRoutes.tsx`)                                |
| `service`   | regra de negócio, hooks de dados e acesso ao banco                  |

Regras rígidas:
- **NÃO** criar pasta `components/`. Componentes compartilhados entre módulos vão em
  `src/global/ui`; componentes reutilizáveis de um módulo vão no `global/` daquele módulo.
- `src/global/` é a **estilização global**: todo módulo importa cores/fontes de
  `src/global/theme` e primitivos de `src/global/ui` para manter o mesmo esquema visual.
- Módulos não importam pastas internas de outros módulos; o que for cross-module sobe para `src/global`.

## Novo módulo (scaffold)

1. Criar `src/modules/<nome>` com as 7 pastas.
2. Implementar `pages/`, `routes/` e `service/` reaproveitando `src/global`.
3. Registrar o navigator do módulo em `src/global/routes/RootNavigator.tsx`.

Perfis do sistema (DRS RF-01): **admin (cooperativa)**, **milkman (leiteiro)**,
**producer (produtor)**. Hoje só `producer` está implementado; `admin`/`milkman`
são scaffolds.
