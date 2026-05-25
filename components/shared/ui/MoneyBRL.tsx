import React from 'react';
import { View, Text } from 'react-native';
import { NumText } from './NumText';

interface MoneyBRLProps {
  value: number;
  variant?: 'onAmber';
}

function formatBRLParts(value: number) {
  const [int, frac] = value.toFixed(2).split('.');
  const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return { intFmt, frac };
}

export function MoneyBRL({ value }: MoneyBRLProps) {
  const { intFmt, frac } = formatBRLParts(value);
  return (
    <View className="flex-row items-baseline gap-1">
      <Text className="font-ui-semibold text-base text-accentInk mr-0.5">R$</Text>
      <NumText className="font-mono-bold text-5xl text-accentInk tracking-tighter">
        {intFmt}
      </NumText>
      <NumText className="font-mono-bold text-xl text-accentInk tracking-tight">
        ,{frac}
      </NumText>
    </View>
  );
}
