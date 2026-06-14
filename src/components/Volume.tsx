import React from 'react';
import { View, Text } from 'react-native';
import { NumText } from './NumText';
import { styles } from './styles';

interface VolumeProps {
  value: number;
  unit?: string;
  variant?: 'hero' | 'compact';
}

export function Volume({ value, unit = 'L', variant = 'compact' }: VolumeProps) {
  const hero = variant === 'hero';
  return (
    <View style={styles.volumeRow}>
      <NumText style={hero ? styles.volumeHeroNumber : styles.volumeCompactNumber}>
        {value.toLocaleString('pt-BR')}
      </NumText>
      <Text style={hero ? styles.volumeHeroUnit : styles.volumeCompactUnit}>{unit}</Text>
    </View>
  );
}
