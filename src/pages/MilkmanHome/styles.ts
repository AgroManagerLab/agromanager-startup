import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  card: {
    padding: 16,
  },
  body: {
    fontFamily: FONT.ui,
    fontSize: 15,
    color: colors.ink2,
  },
  link: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  linkText: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.primary,
  },
});
