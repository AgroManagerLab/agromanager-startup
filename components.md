# Components Pattern

Este projeto usa uma base global mínima em `/styles` e um arquivo de estilos local por componente.

## Regras

- use `StyleSheet.create` em todo componente de UI de produto
- mantenha tokens globais mínimos em `styles/theme.ts`
- cada pasta de componente deve ter seu próprio arquivo `*.styles.ts` quando houver UI
- trate `ref/` apenas como referência visual, nunca como diretório de implementação
- evite valores soltos de cor, tamanho e espaçamento dentro dos componentes

## Estrutura

- `src/styles/theme.ts`: cores, tipografia, spacing e radius globais
- `components/AlgumComponente/AlgumComponente.tsx`
- `components/AlgumComponente/AlgumComponente.styles.ts`

## Convenções de nomes

No componente:

- `styles.root`
- `styles.container`
- `styles.content`
- `styles.title`
- `styles.description`
- `styles.button`
- `styles.buttonText`

No global:

- use apenas tokens básicos e estáveis
- não crie presets reutilizáveis amplos se o time quer simplicidade

## Exemplo

```tsx
import { Text, View } from "react-native";

import { styles } from "./ExampleScreen.styles";

export function ExampleScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Titulo</Text>
        <Text style={styles.description}>Descricao</Text>
      </View>
    </View>
  );
}
```

```ts
import { StyleSheet } from "react-native";

import { theme } from "../../src/styles/theme";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    paddingHorizontal: theme.spacing.screenX,
    paddingVertical: theme.spacing.screenY,
  },
  title: {
    color: theme.colors.ink,
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    lineHeight: theme.typography.title.lineHeight,
  },
});
```

## Exceções técnicas

Há APIs que exigem estilos fora do arquivo local do componente, como algumas opções de navegação do React Navigation. Nesses casos:

- use a exceção mínima necessária
- prefira consumir valores de `src/styles/theme.ts`
- não espalhe valores hexadecimais pelo app
