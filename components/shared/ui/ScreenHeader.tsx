import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../../theme/styles';
import { styles } from './styles';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 8 }]}>
      <View style={styles.headerRow}>
        {onBack ? (
          <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.headerBackBtn}>
            <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
              <Path d="M14 4l-7 7 7 7" stroke={colors.ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSpacer} />
        )}
        {right ?? <View style={styles.headerSpacer} />}
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}
