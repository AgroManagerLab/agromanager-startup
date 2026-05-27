import { StyleSheet } from 'react-native';
import { colors } from '../../theme/styles';
import { FONT } from '../../theme/typography';

export const styles = StyleSheet.create({
  // ─── HomeScreen ────────────────────────────────────────
  homeContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  homeHeader: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  homeHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  homeSettingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeGreeting: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  homeFarm: {
    fontFamily: FONT.uiExtra,
    fontSize: 22,
    color: '#fff',
    letterSpacing: -0.4,
    marginTop: 2,
  },
  homeVolumeSection: {
    marginTop: 24,
    gap: 4,
  },
  homeVolumeLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 12,
    color: 'rgba(255,255,255,0.70)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  homeScroll: {
    flex: 1,
  },
  homeScrollContent: {
    padding: 20,
  },
  homeListHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  homeListTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 14,
    color: colors.ink,
    letterSpacing: -0.4,
  },
  homeViewAll: {
    fontFamily: FONT.uiBold,
    fontSize: 13,
    color: colors.primary,
  },
  homeListCard: {
    overflow: 'hidden',
  },

  // ─── HistoryScreen ─────────────────────────────────────
  historyContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  historySummaryWrap: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  historySummaryCard: {
    padding: 14,
  },
  historySummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  historySummaryLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 11,
    color: colors.ink3,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  historyAvgWrap: {
    alignItems: 'flex-end',
  },
  historyAvgValue: {
    fontFamily: FONT.monoBold,
    fontSize: 22,
    color: colors.ink,
    marginTop: 2,
  },
  historyAvgUnit: {
    fontSize: 12,
    color: colors.ink2,
  },
  historyListWrap: {
    flex: 1,
    paddingHorizontal: 20,
  },
  historyListCard: {
    flex: 1,
    overflow: 'hidden',
    marginBottom: 20,
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
    backgroundColor: 'rgba(255,255,255,0.4)',
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
    color: 'rgba(58,42,10,0.70)',
  },
  projectionMoneyWrap: {
    marginTop: 2,
  },
  projectionFormula: {
    fontFamily: FONT.monoBold,
    fontSize: 11,
    marginTop: 6,
    color: 'rgba(58,42,10,0.70)',
  },
  projectionNote: {
    flexDirection: 'row',
    marginTop: 12,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
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

  // ─── ColetaRow ─────────────────────────────────────────
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
});
