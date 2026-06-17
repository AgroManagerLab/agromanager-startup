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
    paddingBottom: 24,
  },

  // Hero
  hero: {
    backgroundColor: colors.primaryDark,
    paddingBottom: 22,
    paddingHorizontal: 20,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  heroSettings: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCoop: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
  },
  heroGreeting: {
    fontFamily: FONT.uiExtra,
    fontSize: 28,
    color: '#fff',
    letterSpacing: -0.6,
    lineHeight: 31,
    marginTop: 4,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  heroBadge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  heroBadgeText: {
    fontFamily: FONT.uiSemi,
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },

  // Hero metric
  heroMetric: {
    marginTop: 20,
  },
  heroMetricLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  heroMiniStats: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 14,
    alignItems: 'center',
  },
  heroMiniLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.4,
  },
  heroMiniValue: {
    fontFamily: FONT.monoBold,
    fontSize: 18,
    color: '#fff',
    marginTop: 2,
  },
  heroMiniDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  // Body
  body: {
    paddingTop: 22,
    paddingHorizontal: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 13,
    color: colors.ink2,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  // Shortcuts
  shortcutGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  shortcutCard: {
    flex: 1,
    borderRadius: colors.radii.lg,
    padding: 14,
    height: 108,
    justifyContent: 'space-between',
  },
  shortcutIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 17,
    letterSpacing: -0.3,
    marginTop: 4,
  },
  shortcutHint: {
    fontFamily: FONT.uiSemi,
    fontSize: 12,
    marginTop: 2,
  },

  // Route card
  routeCard: {
    padding: 0,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  routeAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeAvatarText: {
    fontFamily: FONT.uiExtra,
    fontSize: 14,
    color: colors.primaryDark,
  },
  routeInfo: {
    flex: 1,
    minWidth: 0,
  },
  routeName: {
    fontFamily: FONT.uiBold,
    fontSize: 15.5,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  routeMeta: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.ink2,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: colors.radii.pill,
  },
  statusBadgeText: {
    fontFamily: FONT.uiExtra,
    fontSize: 12,
    letterSpacing: -0.1,
  },
  emptyRoute: {
    padding: 24,
    alignItems: 'center',
  },
  emptyRouteText: {
    fontFamily: FONT.ui,
    fontSize: 14,
    color: colors.ink3,
  },
});
