import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 14,
  },
  cadastroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: colors.radii.xl,
    padding: 18,
  },
  cadastroIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cadastroInfo: {
    flex: 1,
  },
  cadastroTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 19,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  cadastroSubtitle: {
    fontFamily: FONT.uiSemi,
    fontSize: 13.5,
    color: colors.ink2,
    marginTop: 2,
  },
  cadastroCount: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    marginTop: 6,
  },
});
