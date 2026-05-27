import { StyleSheet } from 'react-native';
import { colors } from '../../theme/styles';
import { FONT } from '../../theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontFamily: FONT.uiBold,
    fontSize: 32,
    color: colors.primaryDark,
  },
  subtitle: {
    fontFamily: FONT.ui,
    fontSize: 18,
    color: colors.ink2,
    lineHeight: 24,
  },
  button: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    borderRadius: colors.radii.pill,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonText: {
    fontFamily: FONT.uiSemi,
    fontSize: 15,
    color: colors.bg,
  },
});
