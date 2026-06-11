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
    padding: 24,
    gap: 16,
  },
  card: {
    padding: 20,
  },
  body: {
    fontFamily: FONT.uiExtra,
    fontSize: 18,
    color: colors.ink,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  link: {
    alignSelf: 'center',
  },
  linkText: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.primary,
  },
});
