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
  editBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Metric
  metricCard: {
    padding: 16,
    marginTop: 4,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricBlock: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.border,
  },
  metricLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 11.5,
    color: colors.ink3,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: FONT.monoBold,
    fontSize: 18,
    color: colors.ink,
  },
  metricValueSmall: {
    fontSize: 13,
    fontFamily: FONT.uiSemi,
    maxWidth: 80,
  },

  // Producers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 14,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  sectionCount: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    color: colors.ink3,
  },
  producerCard: {
    padding: 0,
  },
  producerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  producerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  producerAvatarText: {
    fontFamily: FONT.uiExtra,
    fontSize: 13,
    color: colors.primaryDark,
  },
  producerInfo: {
    flex: 1,
    minWidth: 0,
  },
  producerName: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  producerFarm: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.ink2,
    marginTop: 2,
  },
  volumeBadge: {
    backgroundColor: colors.surface2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  volumeText: {
    fontFamily: FONT.monoBold,
    fontSize: 12.5,
    color: colors.ink2,
  },

  emptyCard: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: FONT.ui,
    fontSize: 14,
    color: colors.ink3,
  },

  // Footer delete
  footer: {
    padding: 18,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: colors.radii.md,
    backgroundColor: colors.dangerBg,
    borderWidth: 1.5,
    borderColor: colors.dangerBorder,
  },
  deleteBtnText: {
    fontFamily: FONT.uiBold,
    fontSize: 16,
    color: colors.danger,
  },
});
