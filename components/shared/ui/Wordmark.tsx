import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../../../theme/styles';
import { styles } from './styles';

interface WordmarkProps {
  tone?: 'light' | 'dark';
}

export function Wordmark({ tone = 'dark' }: WordmarkProps) {
  const light = tone === 'light';
  return (
    <View style={styles.wordmarkRow}>
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Circle cx={12} cy={12} r={12} fill={colors.accent} />
        <Path d="M12 5c2.2 2.6 3.6 4.8 3.6 6.6a3.6 3.6 0 11-7.2 0C8.4 9.8 9.8 7.6 12 5z" fill="#fff" />
      </Svg>
      <Text style={light ? styles.wordmarkTextLight : styles.wordmarkTextDark}>
        Milk<Text style={styles.wordmarkAccent}>Route</Text>
      </Text>
    </View>
  );
}
