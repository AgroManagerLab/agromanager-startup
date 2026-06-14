import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerPlus: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: colors.radii.md,
    height: 52,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT.ui,
    fontSize: 15.5,
    color: colors.ink,
    height: '100%',
  },
  pillRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexGrow: 0,
  },

  // List
  listScroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  listCard: {
    padding: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  listAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listAvatarText: {
    fontFamily: FONT.uiExtra,
    fontSize: 15,
  },
  listInfo: {
    flex: 1,
    minWidth: 0,
  },
  listName: {
    fontFamily: FONT.uiExtra,
    fontSize: 16,
    color: colors.ink,
    letterSpacing: -0.3,
  },
  listMeta: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.ink2,
    marginTop: 2,
  },
  listRight: {
    alignItems: 'flex-end',
  },
  listVolume: {
    fontFamily: FONT.monoBold,
    fontSize: 15,
    color: colors.ink,
  },
  listMonthLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 11,
    color: colors.ink3,
    marginTop: 2,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
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
});
