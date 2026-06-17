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
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFoundText: {
    fontFamily: FONT.ui,
    fontSize: 15,
    color: colors.ink3,
  },

  photoWrap: {
    marginTop: 4,
  },
  photoBase: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: colors.radii.md,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  photoPlaceholderText: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.ink3,
  },

  infoCard: {
    marginTop: 14,
    padding: 16,
    gap: 14,
  },
  infoTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoDate: {
    fontFamily: FONT.uiExtra,
    fontSize: 16,
    color: colors.ink,
  },
  infoTime: {
    fontFamily: FONT.monoBold,
    fontSize: 13,
    color: colors.ink3,
    marginTop: 2,
  },
  infoMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoMetricLabel: {
    fontFamily: FONT.uiSemi,
    fontSize: 14,
    color: colors.ink2,
  },
  disclaimer: {
    fontFamily: FONT.uiSemi,
    fontSize: 11.5,
    color: colors.ink3,
    marginTop: 10,
    paddingLeft: 2,
  },
});
