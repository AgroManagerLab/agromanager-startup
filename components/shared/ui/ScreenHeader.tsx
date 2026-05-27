import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { palette } from '../../../theme/palette';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.backBtn}>
            <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
              <Path d="M14 4l-7 7 7 7" stroke={palette.ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}
        {right ?? <View style={styles.spacer} />}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 44,
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 32,
    color: palette.ink,
    letterSpacing: -0.8,
    marginTop: 6,
  },
  subtitle: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    color: palette.ink2,
    marginTop: 6,
  },
});
