import type { TextStyle } from 'react-native';

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

export const colors = {
  bg: '#F7F4EE',
  surface: '#FFFFFF',
  surface2: '#F1EDE6',
  border: '#E5E1D9',
  divider: '#ECE8E1',
  ink: '#292D34',
  ink2: '#5E636B',
  ink3: '#8B8F97',
  contrast: '#FFFFFF',
  contrast14: 'rgba(255,255,255,0.14)',
  contrast40: 'rgba(255,255,255,0.4)',
  contrast70: 'rgba(255,255,255,0.70)',
  contrast75: 'rgba(255,255,255,0.75)',
  primary: '#2F6A4E',
  primaryDark: '#234E3A',
  primarySoft: '#DCEFE3',
  primarySofter: '#ECF6EF',
  accent: '#DBA646',
  accentSoft: '#F4E8CF',
  accentInk: '#3A2A0A',
  accentInk70: 'rgba(58,42,10,0.70)',
  syncOk: '#3D9468',
  syncBg: '#DCEFE2',
  syncInk: '#1F4D38',
  pending: '#C6883A',
  pendingBg: '#F3E4C6',
  pendingInk: '#7A521B',
  danger: '#C0503F',
  dangerBg: '#F4E0DC',
  dangerBorder: '#E7B9B2',
  radii: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
    pill: 999,
  },
} as const;

export type Colors = typeof colors;
export type Theme = typeof colors;

export function useTheme(): Theme {
  return colors;
}
