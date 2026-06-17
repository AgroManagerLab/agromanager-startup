import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';

export const styles = StyleSheet.create({
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
    marginBottom: 16,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.contrast14,
  },
  dateDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  dateText: {
    fontFamily: FONT.uiBold,
    fontSize: 12,
    color: colors.contrast,
  },
  homeGreeting: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.contrast75,
  },
  homeFarm: {
    fontFamily: FONT.uiExtra,
    fontSize: 22,
    color: colors.contrast,
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
    color: colors.contrast70,
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
});
