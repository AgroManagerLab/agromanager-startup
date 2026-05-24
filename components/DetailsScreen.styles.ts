import { StyleSheet } from "react-native";

import { theme } from "../styles/theme";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.screenX,
    paddingVertical: theme.spacing.screenY,
    gap: theme.spacing.md,
  },
  title: {
    color: theme.colors.ink,
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    lineHeight: theme.typography.title.lineHeight,
  },
  description: {
    color: theme.colors.ink2,
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    lineHeight: theme.typography.body.lineHeight,
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonText: {
    color: theme.colors.inverse,
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    lineHeight: theme.typography.button.lineHeight,
  },
});
