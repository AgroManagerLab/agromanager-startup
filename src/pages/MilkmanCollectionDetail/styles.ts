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

  producerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  producerBadge: {
    width: 44,
    height: 44,
    borderRadius: 44,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  producerBadgeText: {
    fontFamily: FONT.uiBold,
    fontSize: 14,
    color: colors.ink2,
  },
  producerInfo: {
    flex: 1,
    minWidth: 0,
  },
  producerName: {
    fontFamily: FONT.uiBold,
    fontSize: 16,
    color: colors.ink,
  },
  producerFarm: {
    fontFamily: FONT.ui,
    fontSize: 13.5,
    color: colors.ink2,
    marginTop: 1,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontFamily: FONT.uiSemi,
    fontSize: 14,
    color: colors.ink2,
  },
  infoValue: {
    fontFamily: FONT.monoBold,
    fontSize: 14,
    color: colors.ink,
  },

  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volumeLabel: {
    fontFamily: FONT.uiSemi,
    fontSize: 14,
    color: colors.ink2,
  },
  volumeValue: {
    fontFamily: FONT.monoExtra,
    fontSize: 24,
    color: colors.ink,
  },
  volumeUnit: {
    fontSize: 14,
    color: colors.ink2,
  },
});
