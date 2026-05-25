import React from 'react';
import { View, Text } from 'react-native';
import { PhotoStripe } from '../../shared/ui/PhotoStripe';
import { SyncBadge } from '../../shared/ui/SyncBadge';
import { NumText } from '../../shared/ui/NumText';
import { Coleta } from '../types';

interface ColetaRowProps {
  row: Coleta;
  variant?: 'compact' | 'detailed';
  pricePerLiter?: number;
}

export function ColetaRow({ row, variant = 'compact', pricePerLiter = 0 }: ColetaRowProps) {
  if (variant === 'detailed') {
    const value = row.volume * pricePerLiter;
    return (
      <View className="flex-row items-center gap-3 py-3.5 px-4">
        <PhotoStripe variant="md" />
        <View className="flex-1 min-w-0">
          <Text className="font-ui-extrabold text-lg text-ink tracking-snug">{row.date}</Text>
          <View className="flex-row items-center gap-1.5 mt-0.5">
            <NumText className="font-mono-bold text-sm text-ink2">{row.time}</NumText>
            <View className="w-[3px] h-[3px] rounded-full bg-ink3" />
            <SyncBadge state="synced" />
          </View>
        </View>
        <View className="items-end">
          <NumText className="font-mono-extrabold text-2xl text-ink">
            {row.volume} <Text className="text-sm text-ink2">L</Text>
          </NumText>
          <NumText className="font-mono-bold text-xs text-ink3 mt-0.5">
            R$ {value.toFixed(2).replace('.', ',')}
          </NumText>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-row items-center gap-3 py-3 px-3.5">
      <PhotoStripe variant="sm" />
      <View className="flex-1 min-w-0">
        <Text className="font-ui-extrabold text-md text-ink">{row.date}</Text>
        <NumText className="font-mono text-sm text-ink2 mt-0.5">{row.time}</NumText>
      </View>
      <NumText className="font-mono-extrabold text-xl text-ink">
        {row.volume} <Text className="text-sm text-ink2">L</Text>
      </NumText>
    </View>
  );
}
