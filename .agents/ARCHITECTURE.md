# Padrão de Arquitetura

Este documento descreve um padrão de organização para aplicações client-side com navegação, telas, serviços de dados e persistência local.

## Visão Geral

A aplicação é estruturada em camadas com responsabilidades separadas:

- `entrypoint`: ponto de inicialização da aplicação.
- `navigation`: definição de fluxos e rotas.
- `pages` ou `screens`: telas responsáveis pela composição da interface.
- `components`: elementos reutilizáveis de UI.
- `services`: integração com APIs, persistência e regras de acesso a dados.
- `context` ou `state`: compartilhamento de estado e contratos globais.
- `database`: inicialização, acesso e manutenção do armazenamento local.
- `utils`: funções auxiliares sem dependência de UI.

O objetivo principal é manter a interface desacoplada da regra de negócio e da camada de acesso a dados.

## Estrutura De Pastas

Uma estrutura comum segue este formato:

```txt
src/
  components/
  constants/
  context/
  database/
  pages/
  routes/
  screens/
  services/
  types/
  utils/
```

### Responsabilidade De Cada Pasta

- `components`: apenas componentes reutilizáveis, independentes de uma tela específica.
- `constants`: valores fixos compartilhados pela aplicação.
- `context`: provedores e hooks de estado global.
- `database`: conexão, criação de tabelas, seed e acesso ao armazenamento local.
- `pages`: uma pasta por tela, cada uma representando uma rota ou fluxo específico.
- `screens`: alias ou camada complementar para telas, quando o projeto precisar dessa divisão.
- `routes`: definição de navegação e composição dos fluxos da aplicação.
- `services`: funções que concentram integração com backend, banco ou outras fontes de dados.
- `types`: contratos de tipos e modelos compartilhados.
- `utils`: helpers puros e independentes.

## Exemplos De Estrutura

### `routes`

As rotas devem ficar centralizadas e separar fluxos distintos.

```tsx
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} />
    </Stack.Navigator>
  );
}
```

### `context`

O contexto deve expor apenas o necessário para compartilhar estado global.

```tsx
export const AuthContext = createContext<AuthContextValue>({
  signIn: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}
```

### `database`

A camada de banco deve ter módulos separados para conexão e inicialização.

```ts
export const db = SQLite.openDatabaseSync('app.db');

export function initDatabase() {
  db.runSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
}
```

### `services`

Os serviços devem encapsular leitura, escrita e integração externa.

```ts
export function validateCredentials(username: string, password: string): boolean {
  const user = findUserByUsername(username);
  if (!user) return false;
  return user.password === password.trim();
}
```

### `constants`

Constantes fixas e listas estáticas devem ficar em arquivos dedicados.

```ts
export const ITEMS = [
  { id: 'a', name: 'Item A' },
  { id: 'b', name: 'Item B' },
];
```

### `types`

Os contratos de dados devem ser explícitos e compartilhados entre camadas.

```ts
export type Item = {
  id: string;
  name: string;
};
```

### `pages`

Cada página deve concentrar composição de UI, estado local e chamadas à camada de serviço.

```tsx
export default function ExampleScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### `global`

A pasta `global` deve centralizar tokens e hooks compartilhados de UI.

```ts
const lightTheme = {
  colors: {
    primary: '#1A73E8',
    background: '#F5F7FA',
    text: '#111827',
  },
};

export function useTheme() {
  return themes.light;
}
```

## Fluxo De Inicialização

O ponto de entrada da aplicação deve concentrar apenas o bootstrap:

1. Inicializar a camada de persistência.
2. Executar seeds ou ajustes necessários no armazenamento.
3. Subir o provedor de navegação.
4. Renderizar a árvore principal de telas.

Esse fluxo evita que telas ou componentes executem tarefas de infraestrutura diretamente.

## Navegação

A navegação deve ser separada por domínio de acesso:

- Fluxos autenticados.
- Fluxos públicos ou de acesso inicial.
- Pilhas ou abas para organização de rotas internas.

Boas práticas:

- Definir os parâmetros de rota em tipos explícitos.
- Ocultar o cabeçalho quando a experiência pedir composição customizada.
- Manter a declaração de rotas centralizada em arquivos de navegação.

## Estado Global

O estado global deve ser usado apenas para:

- autenticação,
- sessão,
- preferências compartilhadas,
- dados que atravessam múltiplas telas.

Regras recomendadas:

- expor apenas ações necessárias;
- evitar colocar lógica pesada dentro do provider;
- manter o contrato do contexto pequeno e previsível.

## Persistência E Banco

A camada de persistência local costuma seguir este padrão:

1. Abrir a conexão do banco em um módulo isolado.
2. Centralizar a criação de tabelas em uma função de inicialização.
3. Manter seeds separados da criação de schema.
4. Concentrar consultas e comandos de escrita em repositórios ou serviços específicos.

### Regras De Banco

- Não espalhar SQL ou comandos de persistência pela interface.
- Usar funções de acesso dedicadas para leitura e escrita.
- Preferir operações pequenas e previsíveis.
- Tratar seed como parte do bootstrap, não como regra de tela.

## Serviços E Repositórios

A camada de serviço deve funcionar como fronteira entre interface e dados.

Responsabilidades típicas:

- transformar chamadas de rede ou banco em operações reutilizáveis;
- encapsular detalhes do protocolo, SQL ou formato de resposta;
- devolver dados já normalizados para telas e componentes.

Quando houver separação adicional em repositórios:

- `repository` concentra acesso a dados;
- `service` pode aplicar regras de negócio e orquestração;
- a UI consome apenas interfaces estáveis.

## Tipagem

O uso de tipos explícitos ajuda a manter o contrato entre camadas:

- tipos para parâmetros de rota;
- tipos para entidades e DTOs;
- tipos para contextos e retornos de serviço.

Regras úteis:

- evitar `any`;
- nomear contratos de forma descritiva;
- compartilhar tipos entre UI e serviços quando fizer sentido.

## Estilos E Reaproveitamento Visual

A camada visual segue um padrão de estilos locais com tema compartilhado.

### Como Os Estilos São Organizados

- Cada tela ou componente mantém seu próprio arquivo de estilos.
- Os estilos são criados com uma função parametrizada por tema.
- A composição visual acontece no próprio componente usando objetos de estilo.

### Padrão De Tema

- O diretório `global` concentra o que é compartilhado por toda a interface.
- As cores e tokens visuais vivem em um módulo global de tema.
- Os componentes consomem o tema por meio de um hook ou função central.
- O tema serve como fonte única para cores, superfícies, bordas, texto e estados visuais.
- O contrato de tema deve ser estável e usado como referência para toda a aplicação.

### Conteúdo Esperado Em `global`

- tokens visuais e paleta de cores;
- hooks de acesso ao tema;
- tipos base para o contrato visual;
- outros valores globais de UI que precisem ser consumidos por múltiplas telas.

### Reaproveitamento

- Componentes visuais repetidos devem ficar em uma camada compartilhada.
- Regras de espaçamento, cores e variações devem vir do tema ou de constantes reutilizáveis.
- A mesma função de estilos pode ser reaproveitada em mais de uma tela, desde que o contrato visual seja o mesmo.

### Regras De Organização Visual

- Evitar duplicar valores de cor espalhados pela interface.
- Preferir tokens de tema em vez de literais soltos.
- Manter estilos específicos da tela junto da própria tela.
- Centralizar apenas o que for realmente global e estável.

### Padrão De Uso

1. Importar o tema central.
2. Gerar os estilos com uma função dedicada.
3. Aplicar os estilos no componente.
4. Reaproveitar componentes e tokens quando houver repetição.

### Exemplo De Uso

```tsx
const theme = useTheme();
const styles = createStyles(theme);
```

## Componentes Comuns

O projeto deve privilegiar componentes reutilizáveis para evitar duplicação de interface e de comportamento.

### Componentes Que Devem Ser Reaproveitados

- `Card` ou equivalente para exibir conteúdo agrupado.
- `Button` ou equivalente para ações primárias, secundárias e de estado de carregamento.
- `TouchableOpacity` como padrão para ações clicáveis com feedback visual.
- `Input` ou equivalente para formulários e autenticação.
- `Text` padronizado para títulos, rótulos, mensagens e estados vazios.
- `Modal` ou overlay para fluxos temporários de criação, confirmação ou edição.
- `Loading` ou indicador visual para carregamento assíncrono.
- `EmptyState` para listas vazias e ausência de dados.
- `ErrorState` para falhas de leitura, escrita ou carregamento.
- `ListItem` ou variação equivalente para itens repetidos em listas.
- `Container` ou wrapper de layout para padding, largura e alinhamento consistentes.

### Regra De Separação Entre `components` E `pages`

- Tudo que for genérico, reutilizável e independente de fluxo deve viver em `components`.
- Tudo que representar uma tela inteira deve viver em `pages`.
- Uma `page` pode compor vários `components`, mas não deve depender de UI específica que faça sentido apenas em outra tela.
- Se um bloco visual começar a ser usado por mais de uma `page`, ele deve ser extraído para `components`.

### Quando Criar Um Componente Reutilizável

Crie um componente compartilhado quando:

- a mesma estrutura visual aparecer em mais de uma tela;
- houver comportamento repetido em mais de um fluxo;
- existirem variações previsíveis de um mesmo padrão;
- o código da tela começar a ficar poluído com markup repetido;
- houver necessidade de uniformidade visual e semântica.

### Regras De Reuso

- Não duplicar blocos de UI com pequenas diferenças sem antes avaliar extração.
- O componente compartilhado deve receber dados por props, não por dependência direta de tela.
- O contrato do componente deve ser simples e previsível.
- Estados como `loading`, `disabled`, `error` e `empty` devem ser tratados de forma consistente.
- A composição da tela deve ficar acima do detalhe visual do componente.

### Padrão De Uso

1. Identificar repetição real de interface ou comportamento.
2. Extrair o bloco para a camada de componentes compartilhados.
3. Definir uma API mínima por props.
4. Reaproveitar o mesmo componente em todas as telas compatíveis.

### Exemplo De Componente Reutilizável

```tsx
export default function CityCard({ city, weather, onPress }: CityCardProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View>
        <Text>{city.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
```

## Regras De Organização

- Telas não devem falar diretamente com o banco.
- Componentes reutilizáveis não devem carregar regras de fluxo.
- Acesso a dados deve ficar isolado em serviços, repositórios ou módulos de persistência.
- Inicialização da aplicação deve ocorrer fora da árvore principal de UI.
- Configurações e constantes devem ser centralizadas.

## Resumo Do Padrão

O padrão segue uma arquitetura em camadas, com:

- inicialização centralizada;
- navegação desacoplada da UI;
- telas compondo experiência;
- serviços isolando acesso a dados;
- banco/persistência isolados em módulos próprios;
- tipos compartilhados para manter contratos consistentes.

Esse modelo reduz acoplamento, facilita manutenção e deixa a aplicação mais previsível para evoluções futuras.
