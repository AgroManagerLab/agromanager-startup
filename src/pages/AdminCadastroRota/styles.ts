import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';
import { adminFooterStyles } from '../sharedAdminStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  charHint: {
    fontFamily: FONT.mono,
    fontSize: 12,
    color: colors.ink3,
  },
  sectionLabel: {
    fontFamily: FONT.uiBold,
    fontSize: 14,
    color: colors.ink2,
    marginTop: 6,
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  sectionLabelCount: {
    fontFamily: FONT.uiSemi,
    color: colors.ink3,
  },
  producerCard: {
    padding: 0,
  },
  producerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  producerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  producerAvatarText: {
    fontFamily: FONT.uiExtra,
    fontSize: 13,
    color: colors.primaryDark,
  },
  producerInfo: {
    flex: 1,
    minWidth: 0,
  },
  producerName: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.ink,
    letterSpacing: -0.2,
  },
  producerFarm: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.ink2,
    marginTop: 2,
  },
  orderBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    fontFamily: FONT.monoBold,
    fontSize: 13,
    color: colors.ink2,
  },
});

export { adminFooterStyles as footerStyles };