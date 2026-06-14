import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 24,
  },
  spacer: {
    flex: 1,
  },
  formSection: {
    gap: 4,
  },
  brand: {
    alignItems: 'center',
    gap: 14,
    marginTop: 8,
  },
  brandCopy: {
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 32,
    color: colors.ink,
    letterSpacing: -1,
    lineHeight: 32,
  },
  brandAccent: {
    color: colors.primary,
  },
  brandSubtitle: {
    fontFamily: FONT.uiSemi,
    fontSize: 13,
    color: colors.ink2,
    marginTop: 6,
  },
  welcomeTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 22,
    color: colors.ink,
    letterSpacing: -0.6,
    lineHeight: 24,
    marginTop: 8,
  },
  welcomeSubtitle: {
    fontFamily: FONT.ui,
    fontSize: 14,
    color: colors.ink2,
    marginTop: 6,
    marginBottom: 18,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontFamily: FONT.uiBold,
    fontSize: 14,
    color: colors.ink2,
    marginBottom: 6,
  },
  fieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: colors.radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    minHeight: 56,
    paddingHorizontal: 16,
  },
  fieldBoxFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  fieldInput: {
    flex: 1,
    fontFamily: FONT.uiSemi,
    fontSize: 17,
    color: colors.ink,
  },
  fieldSuffix: {
    fontFamily: FONT.uiBold,
    fontSize: 13,
    color: colors.primary,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.dangerBg,
    borderRadius: colors.radii.md,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  errorContent: {
    flex: 1,
  },
  errorTitle: {
    fontFamily: FONT.uiBold,
    fontSize: 14,
    color: colors.danger,
  },
  errorDescription: {
    fontFamily: FONT.ui,
    fontSize: 13,
    color: colors.danger,
    opacity: 0.85,
    marginTop: 2,
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginTop: 2,
    marginBottom: 22,
  },
  forgot: {
    fontFamily: FONT.uiBold,
    fontSize: 14,
    color: colors.primary,
  },
  button: {
    height: 60,
    borderRadius: colors.radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONT.uiBold,
    fontSize: 17,
    color: colors.contrast,
    letterSpacing: -0.2,
  },
  footer: {
    textAlign: 'center',
    marginTop: 22,
    fontFamily: FONT.ui,
    fontSize: 13,
    color: colors.ink3,
  },
  footerStrong: {
    fontFamily: FONT.uiBold,
    color: colors.ink2,
  },
});
