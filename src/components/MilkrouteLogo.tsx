import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogoSvg from '../../assets/images/logo.svg';
import { colors, FONT } from '../global/themes';

interface MilkrouteLogoProps {
  size?: number;
}

export function MilkrouteLogo({ size = 40 }: MilkrouteLogoProps) {
  return <LogoSvg width={size} height={size} />;
}

export function MilkrouteBrand({
  size = 40,
}: {
  size?: number;
}) {
  return (
      <View style={[styles.brandRow, { gap: 6 }]}>
      <LogoSvg width={size} height={size} />
      <Text style={[styles.brandText, { fontSize: 22 }]}>
        <Text style={styles.brandMilk}>Milk</Text>
        <Text style={styles.brandRoute}>route</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontFamily: FONT.uiExtra,
    letterSpacing: -0.4,
  },
  brandMilk: {
    color: colors.accent,
  },
  brandRoute: {
    color: colors.contrast,
  },
});
