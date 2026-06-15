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

  // Metrics
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metricCard: {
    flex: 1.4,
    padding: 14,
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

  // Projection card
  projectionCard: {
    flex: 1,
    padding: 14,
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
  },
  projectionLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  projectionPrice: {
    fontFamily: FONT.monoBold,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6,
  },

  disclaimer: {
    fontFamily: FONT.uiSemi,
    fontSize: 11.5,
    color: colors.ink3,
    marginTop: 6,
    paddingLeft: 2,
  },

  // History
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 10,
  },
  historyTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 14,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  historyPeriod: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    color: colors.ink3,
  },
  historyCard: {
    padding: 0,
  },
  emptyHistory: {
    padding: 24,
    alignItems: 'center',
  },
  emptyHistoryText: {
    fontFamily: FONT.ui,
    fontSize: 14,
    color: colors.ink3,
  },

  // ColetaRowAdmin
  coletaRow: {
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
  coletaDate: {
    fontFamily: FONT.uiExtra,
    fontSize: 14.5,
    color: colors.ink,
  },
  coletaTime: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    color: colors.ink3,
  },
  coletaLeiteiro: {
    fontFamily: FONT.uiSemi,
    fontSize: 12.5,
    color: colors.ink2,
    marginTop: 2,
  },
  coletaVolume: {
    fontFamily: FONT.monoExtra,
    fontSize: 18,
    color: colors.ink,
  },
  coletaVolumeUnit: {
    fontFamily: FONT.uiSemi,
    fontSize: 12,
    color: colors.ink2,
  },

  // All collections button
  allBtnWrap: {
    padding: 18,
  },
  allBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: colors.radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  allBtnText: {
    fontFamily: FONT.uiBold,
    fontSize: 16,
    color: colors.ink,
  },
});
