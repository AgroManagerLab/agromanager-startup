import React from 'react';
import { View, Text } from 'react-native';

interface PhotoStripeProps {
  caption?: string;
  variant?: 'sm' | 'md';
}

export function PhotoStripe({ caption = '', variant = 'md' }: PhotoStripeProps) {
  const sm = variant === 'sm';
  return (
    <View
      className={`bg-surface2 border border-border items-center justify-center ${
        sm ? 'w-11 h-11 rounded-[10px]' : 'w-14 h-14 rounded-sm'
      }`}
    >
      {caption ? (
        <Text className="font-mono text-2xs text-ink3 uppercase">{caption}</Text>
      ) : null}
    </View>
  );
}
