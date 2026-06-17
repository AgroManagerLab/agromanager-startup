import { StyleSheet } from 'react-native';
import { colors, FONT } from '../global/themes';

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
  headerBackText: {
    fontFamily: FONT.uiExtra,
    fontSize: 28,
    color: colors.ink,
    lineHeight: 28,
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
    color: colors.contrast,
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
    color: colors.contrast70,
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
  moneyDarkRow: {
    fontFamily: FONT.monoBold,
    fontSize: 26,
    color: '#fff',
    letterSpacing: -1.5,
  },
  moneyDarkInt: {
    fontFamily: FONT.monoExtra,
    fontSize: 26,
    letterSpacing: -1.5,
  },
  moneyDarkFrac: {
    fontFamily: FONT.monoBold,
    fontSize: 16,
    letterSpacing: -0.8,
  },

  // ─── Wordmark ──────────────────────────────────────────
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wordmarkMark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmarkMarkText: {
    fontFamily: FONT.uiExtra,
    fontSize: 10,
    lineHeight: 10,
    color: colors.contrast,
  },
  wordmarkTextLight: {
    fontFamily: FONT.uiExtra,
    fontSize: 15,
    color: colors.contrast,
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

  // ─── ProjectionCard ────────────────────────────────────
  projectionCard: {
    marginTop: 20,
    backgroundColor: colors.accent,
    borderRadius: colors.radii.lg,
    padding: 16,
  },
  projectionRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  projectionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.contrast40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectionContent: {
    flex: 1,
  },
  projectionLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.accentInk70,
  },
  projectionMoneyWrap: {
    marginTop: 2,
  },
  projectionFormula: {
    fontFamily: FONT.monoBold,
    fontSize: 11,
    marginTop: 6,
    color: colors.accentInk70,
  },
  projectionNote: {
    flexDirection: 'row',
    marginTop: 12,
    padding: 10,
    backgroundColor: colors.contrast40,
    borderRadius: colors.radii.xs,
    gap: 6,
    alignItems: 'flex-start',
  },
  projectionNoteIcon: {
    marginTop: 1,
  },
  projectionNoteText: {
    flex: 1,
    fontFamily: FONT.uiBold,
    fontSize: 12,
    color: colors.accentInk,
  },

  // ─── CollectionRow ─────────────────────────────────────
  coletaDetailedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  coletaCompactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  coletaInfo: {
    flex: 1,
    minWidth: 0,
  },
  coletaDetailedDate: {
    fontFamily: FONT.uiExtra,
    fontSize: 15,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  coletaDetailedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  coletaDetailedTime: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    color: colors.ink2,
  },
  coletaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.ink3,
  },
  coletaDetailedRight: {
    alignItems: 'flex-end',
  },
  coletaDetailedVolume: {
    fontFamily: FONT.monoExtra,
    fontSize: 20,
    color: colors.ink,
  },
  coletaDetailedValue: {
    fontFamily: FONT.monoBold,
    fontSize: 11,
    color: colors.ink3,
    marginTop: 2,
  },
  coletaCompactDate: {
    fontFamily: FONT.uiExtra,
    fontSize: 14,
    color: colors.ink,
  },
  coletaCompactTime: {
    fontFamily: FONT.mono,
    fontSize: 12,
    color: colors.ink2,
    marginTop: 2,
  },
  coletaCompactVolume: {
    fontFamily: FONT.monoExtra,
    fontSize: 18,
    color: colors.ink,
  },
  coletaUnit: {
    fontSize: 12,
    color: colors.ink2,
  },

  // ─── OfflineBanner ─────────────────────────────────────
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#3D3530',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  offlineIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.8,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineIconLine: {
    position: 'absolute',
    top: 7,
    left: -1,
    width: 18,
    height: 1.8,
    backgroundColor: '#fff',
  },
  offlineText: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: -0.1,
  },
  offlineLabel: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
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
