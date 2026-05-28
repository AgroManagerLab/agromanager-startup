import { StyleSheet } from 'react-native';
import { colors, FONT } from '../theme';

export const styles = StyleSheet.create({
  // ─── Card ──────────────────────────────────────────────
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: colors.radii.lg,
  },

  // ─── Divider ───────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },

  // ─── ScreenHeader ──────────────────────────────────────
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  headerBackBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  headerTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 32,
    color: colors.ink,
    letterSpacing: -0.8,
    marginTop: 6,
  },
  headerSubtitle: {
    fontFamily: FONT.ui,
    fontSize: 15,
    color: colors.ink2,
    marginTop: 6,
  },

  // ─── Volume ────────────────────────────────────────────
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  volumeHeroNumber: {
    fontFamily: FONT.monoBold,
    fontSize: 64,
    color: '#fff',
    letterSpacing: -2,
  },
  volumeCompactNumber: {
    fontFamily: FONT.monoBold,
    fontSize: 28,
    color: colors.ink,
    letterSpacing: -2,
  },
  volumeHeroUnit: {
    fontFamily: FONT.uiSemi,
    fontSize: 22,
    color: 'rgba(255,255,255,0.70)',
  },
  volumeCompactUnit: {
    fontFamily: FONT.uiSemi,
    fontSize: 11,
    color: colors.ink2,
  },

  // ─── MoneyBRL ──────────────────────────────────────────
  moneyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  moneyCurrency: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.accentInk,
    marginRight: 2,
  },
  moneyInteger: {
    fontFamily: FONT.monoBold,
    fontSize: 32,
    color: colors.accentInk,
    letterSpacing: -1.5,
  },
  moneyDecimal: {
    fontFamily: FONT.monoBold,
    fontSize: 18,
    color: colors.accentInk,
    letterSpacing: -0.8,
  },

  // ─── Wordmark ──────────────────────────────────────────
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wordmarkTextLight: {
    fontFamily: FONT.uiExtra,
    fontSize: 15,
    color: '#fff',
    letterSpacing: -0.4,
  },
  wordmarkTextDark: {
    fontFamily: FONT.uiExtra,
    fontSize: 15,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  wordmarkAccent: {
    color: colors.accent,
  },

  // ─── PhotoStripe ───────────────────────────────────────
  photoBase: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoSm: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  photoMd: {
    width: 56,
    height: 56,
    borderRadius: colors.radii.sm,
  },
  photoCaption: {
    fontFamily: FONT.mono,
    fontSize: 9,
    color: colors.ink3,
    textTransform: 'uppercase',
  },

  // ─── TabBar ────────────────────────────────────────────
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    gap: 4,
  },
  tabBarIconWrap: {
    height: 24,
    justifyContent: 'center',
  },
  tabBarLabelActive: {
    fontFamily: FONT.uiExtra,
    fontSize: 11,
    color: colors.primary,
  },
  tabBarLabelInactive: {
    fontFamily: FONT.uiSemi,
    fontSize: 11,
    color: colors.ink3,
  },

  // ─── SyncBadge ─────────────────────────────────────────
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: colors.radii.pill,
    gap: 6,
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 10,
  },
  syncBadgeOk: {
    backgroundColor: colors.syncBg,
  },
  syncBadgePending: {
    backgroundColor: colors.pendingBg,
  },
  syncBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.pending,
  },
  syncBadgeTextOk: {
    fontFamily: FONT.uiBold,
    fontSize: 12,
    color: colors.syncInk,
  },
  syncBadgeTextPending: {
    fontFamily: FONT.uiBold,
    fontSize: 12,
    color: colors.pendingInk,
  },
});
