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
  gerarButton: {
    fontFamily: FONT.uiBold,
    fontSize: 13,
    color: colors.primary,
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
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: colors.radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  chipRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRadioActive: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  chipRadioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  chipLabel: {
    fontFamily: FONT.uiBold,
    fontSize: 14.5,
    color: colors.ink,
  },
  chipLabelActive: {
    color: '#fff',
  },
});

export { adminFooterStyles as footerStyles };