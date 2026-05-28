import type { TextStyle } from 'react-native';

// Números/dados usam fonte mono com tabular-nums. UI usa Manrope.
export const NUM_STYLE: TextStyle = { fontVariant: ['tabular-nums'] };

export const FONT = {
  ui: 'Manrope_500Medium',
  uiSemi: 'Manrope_600SemiBold',
  uiBold: 'Manrope_700Bold',
  uiExtra: 'Manrope_800ExtraBold',
  mono: 'JetBrainsMono_500Medium',
  monoBold: 'JetBrainsMono_700Bold',
  monoExtra: 'JetBrainsMono_800ExtraBold',
} as const;
