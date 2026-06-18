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
  card: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySofter,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeName: {
    fontFamily: FONT.uiExtra,
    fontSize: 17,
    color: colors.ink,
    letterSpacing: -0.3,
  },
  routeIdentifier: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    color: colors.ink3,
    marginTop: 2,
  },
  activeBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeBadgeText: {
    fontFamily: FONT.uiBold,
    fontSize: 11.5,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
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
  allCardLabel: {
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
    textAlign: 'center',
  },
});
