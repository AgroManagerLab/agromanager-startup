import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  searchWrap: {
    paddingBottom: 14,
  },
  searchInput: {
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
  searchField: {
    flex: 1,
    fontSize: 15.5,
    color: colors.ink3,
    fontFamily: FONT.ui,
    height: '100%',
    padding: 0,
  },
  listWrap: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listCard: {
    flex: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: FONT.ui,
    fontSize: 15,
    color: colors.ink3,
  },
  prodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  seqBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  seqText: {
    fontFamily: FONT.monoBold,
    fontSize: 13,
    color: colors.ink2,
  },
  prodInfo: {
    flex: 1,
    minWidth: 0,
  },
  prodName: {
    fontFamily: FONT.uiBold,
    fontSize: 15.5,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  prodStatus: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  nextLabel: {
    fontFamily: FONT.monoBold,
    fontSize: 12,
    color: colors.ink3,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  prodVolume: {
    fontFamily: FONT.monoBold,
    fontSize: 17,
  },
  prodVolumeUnit: {
    fontSize: 12,
    color: colors.ink2,
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary + '11',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  syncBtnText: {
    fontFamily: FONT.uiBold,
    fontSize: 13,
    color: colors.primary,
  },
});
