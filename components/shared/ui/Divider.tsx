import React from 'react';
import { View, StyleSheet } from 'react-native';
import { palette } from '../../../theme/palette';

export function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: palette.divider,
  },
});
