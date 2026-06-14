import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';

export const styles = StyleSheet.create({
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
});
