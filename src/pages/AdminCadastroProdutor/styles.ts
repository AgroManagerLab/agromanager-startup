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
  routeIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gerarButton: {
    fontFamily: FONT.uiBold,
    fontSize: 13,
    color: colors.primary,
  },
  picker: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: colors.radii.md,
    marginTop: -10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  pickerItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  pickerItemActive: {
    backgroundColor: colors.primarySofter,
  },
  pickerText: {
    fontFamily: FONT.uiSemi,
    fontSize: 16,
    color: colors.ink,
  },
  pickerTextActive: {
    color: colors.primary,
    fontFamily: FONT.uiBold,
  },
});

export { adminFooterStyles as footerStyles };
