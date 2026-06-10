import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../global/theme';

// TODO: substituir por asset vetorial dedicado quando a identidade final estiver pronta.
export function CowMark({ size = 156 }: { size?: number }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>AM</Text>
      </View>
      <Text style={styles.caption}>Asset da marca pendente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
  },
  badge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
  badgeText: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 24,
    color: colors.primaryDark,
    letterSpacing: -1,
  },
  caption: {
    marginTop: 10,
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: colors.ink2,
    textAlign: 'center',
  },
});
