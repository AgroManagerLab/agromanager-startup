import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { palette } from '../../../theme/palette';

export function Card({ children, style, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: palette.radii.lg,
  },
});
