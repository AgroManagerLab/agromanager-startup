import { StyleSheet } from 'react-native';
import { colors, FONT } from '../global/themes';

export const adminFooterStyles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    gap: 10,
    padding: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  footerBtn: {
    flex: 1,
    height: 56,
    borderRadius: colors.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  footerBtnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  footerBtnSecondaryText: {
    fontFamily: FONT.uiBold,
    fontSize: 16,
    color: colors.ink,
  },
  footerBtnPrimary: {
    flex: 1.6,
    backgroundColor: colors.primary,
  },
  footerBtnPrimaryText: {
    fontFamily: FONT.uiBold,
    fontSize: 16,
    color: colors.contrast,
  },
});
