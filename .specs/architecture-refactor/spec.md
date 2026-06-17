# Spec: Arquitetura do AgroManager

## Objetivo

Levar toda a codebase para aderir ao padrão definido em [ARCHITECTURE.md](../.agents/ARCHITECTURE.md), mantendo o app simples, com `expo-sqlite` como única fonte de dados e estado, UI compartilhada em `src/global`, e módulos organizados na fórmula obrigatória de 7 pastas.

## Resultado esperado

- `App.tsx` fica apenas com bootstrap: fontes, migração, navegação e renderização da árvore principal.
- `src/global/` concentra tema, UI compartilhada, banco, tipos globais e navegação raiz.
- Cada módulo em `src/modules/<modulo>/` segue exatamente a fórmula de `assets`, `@types`, `database`, `global`, `pages`, `routes` e `service`.
- Telas não acessam banco diretamente.
- SQL fica em `database/*Queries.ts`.
- Regra de negócio e cálculos puros ficam em `service/` e têm testes.
- Cores, fontes e tokens visuais vêm apenas do tema global.
- Não existem pastas `components/` dentro dos módulos.
- Não existem imports cruzando módulos por caminhos internos.

## Regras que esta spec aplica

- `src/global/database` é o ponto único de acesso ao SQLite.
- `migrateDatabase()` roda no boot e mantém schema, seed e `user_version` sincronizados.
- `src/global/theme` é a única fonte de tema visual.
- `src/global/ui` reúne primitivos compartilhados entre módulos.
- `producer`, `auth`, `admin` e `milkman` seguem a mesma convenção estrutural.

## Estado atual resumido

- O bootstrap e a navegação raiz já existem.
- O módulo `producer` está funcional, mas ainda precisa ser revisado para ficar totalmente fiel ao contrato de tema e organização.
- `auth`, `admin` e `milkman` existem como módulos, mas precisam ser normalizados para seguir a mesma linguagem arquitetural.
- Ainda há sinais de UI com tokens/literais fora do contrato global e de módulos scaffold que precisam ficar consistentes.

## Fases de implementação

### Fase 1: contrato global - implemented

Objetivo: fechar o contrato visual e estrutural compartilhado antes de mexer no restante.

Tarefas:

1. Consolidar todos os tokens visuais necessários em `src/global/theme`.
2. Remover cores/literais visuais espalhados fora do tema global.
3. Ajustar `src/global/ui` para consumir apenas tokens globais.
4. Padronizar ícones e primitivas compartilhadas para não dependerem de valores locais.

Critério de pronto:

- Nenhuma cor relevante fica definida diretamente em módulo quando existir token equivalente no tema global.
- Componentes compartilhados usam apenas `src/global/theme`.

### Fase 2: auth - implemented

Objetivo: deixar o fluxo de login totalmente aderente ao padrão de camadas.

Tarefas:

1. Garantir que `auth` use apenas `pages -> service -> database` para acesso a dados.
2. Manter todos os estilos específicos do módulo dentro de `src/modules/auth/global`.
3. Normalizar os tipos do módulo em `@types`.
4. Revisar o login para consumir somente UI global e tokens globais.
5. Garantir que a navegação do login continue direcionando por perfil sem criar acoplamento extra.

Critério de pronto:

- O login compõe UI, chama o service e não fala com banco.
- Nenhum detalhe visual do auth vaza para fora do módulo.

### Fase 3: producer

Objetivo: deixar o módulo de produtor como exemplo completo do padrão.

Tarefas:

1. Separar claramente composição de tela, acesso ao banco e cálculo puro.
2. Confirmar que queries ficam em `database/*Queries.ts`.
3. Confirmar que os cálculos puros ficam em `service/` com testes Jest.
4. Garantir que `pages` usem apenas hooks/serviços do módulo.
5. Eliminar literais visuais fora do tema global.
6. Revisar componentes locais em `global/` para manter reutilização interna do módulo.

Critério de pronto:

- As telas do produtor ficam finas.
- Os cálculos são testáveis sem o módulo nativo.
- O visual do módulo depende do tema global e de UI global.

### Fase 4: scaffolds de apoio

Objetivo: deixar `admin` e `milkman` prontos como módulos estruturados, mesmo que ainda sem fluxo completo.

Tarefas:

1. Garantir a fórmula das 7 pastas em cada módulo.
2. Garantir `routes`, `pages` e `service` mínimos e coerentes.
3. Usar `src/global/ui` e `src/global/theme` para qualquer visual comum.
4. Remover qualquer estrutura que sugira uma pasta `components/` por módulo.
5. Manter a navegação raiz registrando os módulos de forma centralizada.

Critério de pronto:

- Os módulos scaffold seguem a mesma forma do módulo implementado.
- Não há exceções estruturais que obriguem manutenção especial.

### Fase 5: persistência e tipos

Objetivo: manter schema, seed e tipos sincronizados.

Tarefas:

1. Revisar schema e tipos globais em paralelo.
2. Garantir que seed continue idempotente e alinhado ao domínio.
3. Verificar que o cliente do banco continua isolado em `src/global/database/client.ts`.
4. Validar que as queries do módulo usam somente `getDatabase()`.
5. Revisar a tipagem compartilhada de navegação e linhas do banco.

Critério de pronto:

- Schema, seed e tipos se mantêm consistentes.
- O banco continua centralizado e previsível.

## Ordem sugerida de execução

1. Contrato global.
2. Auth.
3. Producer.
4. Scaffolds de apoio.
5. Persistência e tipos.

## Critérios gerais de aceitação

- A aplicação segue a organização definida em [ARCHITECTURE.md](../.agents/ARCHITECTURE.md).
- O app continua funcionando sem introduzir nova fonte de estado.
- Não surgem imports cruzados entre módulos por caminhos internos.
- O tema visual fica centralizado e reutilizado.
- As regras de negócio ficam isoladas em `service/` e cobertas por testes quando puras.

## Observações

- Esta spec serve como roteiro de implementação por tarefas.
- Ela não cria issues nem altera o Git.
- Caso surjam decisões estruturais novas durante a execução, elas devem ser registradas antes de expandir o escopo.
