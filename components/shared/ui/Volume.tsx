import React from 'react';
import { View, Text } from 'react-native';
import { NumText } from './NumText';

interface VolumeProps {
  value: number;
  unit?: string;
  variant?: 'hero' | 'compact';
}

export function Volume({ value, unit = 'L', variant = 'compact' }: VolumeProps) {
  const hero = variant === 'hero';
  return (
    <View className="flex-row items-baseline gap-1.5">
      <NumText className={`font-mono-bold tracking-tightest ${hero ? 'text-7xl text-white' : 'text-4xl text-ink'}`}>
        {value.toLocaleString('pt-BR')}
      </NumText>
      <Text className={`font-ui-semibold ${hero ? 'text-3xl text-white/70' : 'text-xs text-ink2'}`}>
        {unit}
      </Text>
    </View>
  );
}
