import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    flexShrink: 0,
  },
  listWrap: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 4,
  },
  dateLabel: {
    fontFamily: FONT.uiExtra,
    fontSize: 12.5,
    color: colors.ink2,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginVertical: 6,
    marginLeft: 4,
  },
  groupCard: {
    overflow: 'hidden',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: FONT.ui,
    fontSize: 15,
    color: colors.ink3,
  },
  coletaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  photoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.border,
    flexShrink: 0,
  },
  coletaPhoto: {
    width: 48,
    height: 48,
    borderRadius: 10,
    flexShrink: 0,
  },
  coletaInfo: {
    flex: 1,
    minWidth: 0,
  },
  coletaName: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  coletaMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  coletaTime: {
    fontFamily: FONT.monoBold,
    fontSize: 12.5,
    color: colors.ink2,
  },
  coletaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.ink3,
  },
  coletaRight: {
    alignItems: 'flex-end',
  },
  coletaVolume: {
    fontFamily: FONT.monoExtra,
    fontSize: 18,
    color: colors.ink,
  },
  coletaVolumeUnit: {
    fontSize: 12,
    color: colors.ink2,
  },
  syncBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3D3530',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: colors.radii.md,
    marginBottom: 8,
  },
  syncBarText: {
    fontFamily: FONT.uiBold,
    fontSize: 13,
    color: colors.contrast,
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  syncBtnText: {
    fontFamily: FONT.uiBold,
    fontSize: 13,
    color: colors.contrast,
  },
});
