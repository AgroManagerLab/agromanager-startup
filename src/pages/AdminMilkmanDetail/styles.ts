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
  metricLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 11.5,
    color: colors.ink3,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  metricHint: {
    fontFamily: FONT.uiSemi,
    fontSize: 12,
    color: colors.ink2,
    marginTop: 6,
  },

  // Routes
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
  routeCard: {
    padding: 14,
    marginBottom: 10,
  },
  routeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeName: {
    fontFamily: FONT.uiExtra,
    fontSize: 16,
    color: colors.ink,
    letterSpacing: -0.3,
  },
  routeIdentifier: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    color: colors.ink3,
    marginTop: 2,
  },
  progressBadge: {
    backgroundColor: colors.surface2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  progressBadgeText: {
    fontFamily: FONT.monoBold,
    fontSize: 12.5,
    color: colors.ink2,
  },
  routeMeta: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.ink2,
    marginTop: 8,
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
