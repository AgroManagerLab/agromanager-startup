import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../../global/theme';

// Estilo do scaffold. Segue a estilização global (cores/fontes compartilhadas).
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 10,
  },
  title: {
    fontFamily: FONT.uiExtra,
    fontSize: 28,
    color: colors.ink,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontFamily: FONT.ui,
    fontSize: 15,
    color: colors.ink2,
    textAlign: 'center',
  },
  link: {
    marginTop: 12,
  },
  linkText: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.primary,
  },
});
