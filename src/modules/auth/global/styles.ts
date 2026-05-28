import { StyleSheet } from 'react-native';
import { colors, FONT } from '../../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 24,
  },
  brand: {
    alignItems: 'center',
    gap: 14,
    marginTop: 24,
    marginBottom: 'auto',
  },
  brandTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 32,
    color: colors.ink,
    letterSpacing: -1,
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
    marginTop: 8,
  },
  welcomeSubtitle: {
    fontFamily: FONT.ui,
    fontSize: 14,
    color: colors.ink2,
    marginTop: 6,
    marginBottom: 18,
  },
  fieldLabel: {
    fontFamily: FONT.uiBold,
    fontSize: 14,
    color: colors.ink2,
    marginBottom: 6,
  },
  fieldBox: {
    backgroundColor: colors.surface,
    borderRadius: colors.radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  fieldInput: {
    fontFamily: FONT.uiSemi,
    fontSize: 17,
    color: colors.ink,
  },
  button: {
    height: 60,
    borderRadius: colors.radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontFamily: FONT.uiBold,
    fontSize: 17,
    color: '#fff',
    letterSpacing: -0.2,
  },
  footer: {
    textAlign: 'center',
    marginTop: 22,
    fontFamily: FONT.ui,
    fontSize: 13,
    color: colors.ink3,
  },
});
