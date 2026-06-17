import React from 'react';
import { View } from 'react-native';
import { Logo } from './Logo';

export function CowMark({ size = 156 }: { size?: number }) {
  return (
    <View>
      <Logo size={size} />
    </View>
  );
}
