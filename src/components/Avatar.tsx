import React from 'react';
import { View, Text } from 'react-native';
import { FONT } from '../global/themes';

interface AvatarProps {
  name: string;
  size?: number;
  hue?: number;
}

const HUES = [30, 200, 150, 350, 80, 260, 170, 40, 310, 100, 220, 60];

export function Avatar({ name, size = 42, hue }: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  const h = hue ?? HUES[name.length % HUES.length];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: `oklch(0.92 0.04 ${h})`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: FONT.monoBold,
          fontSize: size * 0.36,
          color: `oklch(0.32 0.08 ${h})`,
        }}
      >
        {initials}
      </Text>
    </View>
  );
}
