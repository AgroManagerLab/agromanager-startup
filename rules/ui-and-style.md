# Regra: UI e estilização

## Tema único (claro)

- O app tem **apenas o tema claro**. Não existe troca de tema nem tema escuro.
- `app.json` usa `userInterfaceStyle: "light"`; `StatusBar` fica `style="dark"`
  (glifos escuros sobre fundo claro). Não reintroduzir blocos `dark`.
- Toda cor vem de `src/global/theme/colors.ts` (paleta única). **Não** hardcodar
  hex novos nos módulos — use os tokens (`colors.primary`, `colors.ink`, etc.).
  Exceção: opacidades sobre fundo escuro (`rgba(255,255,255,...)`) em heros.

## Estilização global compartilhada

- Tipografia em `src/global/theme/typography.ts`: UI em **Manrope**, números/dados
  em **JetBrains Mono** com `tabular-nums` (use o componente `NumText`).
- Primitivos visuais compartilhados em `src/global/ui` (Card, Divider, Volume,
  MoneyBRL, ScreenHeader, TabBar, Wordmark, PhotoStripe, SyncBadge, ícones).
  Reaproveite antes de criar algo novo.
- Estilos via `StyleSheet.create`, em arquivos `styles.ts` (no `global/` do módulo
  ou junto do primitivo). Sem estilos inline grandes; sem styled-components/Tailwind.

## Diretrizes de design (do design system MilkRoute)

- Textos da interface em **português (pt-BR)**.
- Áreas de toque generosas (alvos ~≥56px); ícones sempre acompanhados de rótulo.
- Alto contraste (uso ao ar livre). Cantos arredondados via `colors.radii`.
- As telas devem seguir as referências em `ref/MilkRoute/screens/*.jsx`.

## Ícones

- SVG via `react-native-svg`, definidos em `src/global/ui/icons/Icon.tsx`,
  recebendo `size` e `color`.
