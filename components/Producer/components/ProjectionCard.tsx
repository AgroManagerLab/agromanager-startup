import React from 'react';
import { View, Text } from 'react-native';
import { WalletIcon, InfoIcon } from '../../shared/ui/icons/Icon';
import { MoneyBRL } from '../../shared/ui/MoneyBRL';
import { NumText } from '../../shared/ui/NumText';
import { palette } from '../../../theme/palette';

interface ProjectionCardProps {
  projection: number;
  monthVolume: number;
  pricePerLiter: number;
}

export function ProjectionCard({ projection, monthVolume, pricePerLiter }: ProjectionCardProps) {
  return (
    <View className="mt-5 bg-accent rounded-lg p-4">
      <View className="flex-row gap-3.5 items-start">
        <View className="w-11 h-11 rounded-[14px] bg-white/40 items-center justify-center">
          <WalletIcon size={24} color={palette.accentInk} />
        </View>
        <View className="flex-1">
          <Text className="font-ui-extrabold text-xs tracking-wide uppercase text-accentInk/70">
            Projeção · maio
          </Text>
          <View className="mt-0.5">
            <MoneyBRL value={projection} />
          </View>
          <NumText className="font-mono-bold text-xs mt-1.5 text-accentInk/70">
            {monthVolume.toLocaleString('pt-BR')} L × R$ {pricePerLiter.toFixed(2).replace('.', ',')}/L
          </NumText>
        </View>
      </View>
      <View className="flex-row mt-3 p-2.5 bg-white/40 rounded-sm gap-1.5 items-start">
        <View className="mt-px">
          <InfoIcon size={14} color={palette.accentInk} />
        </View>
        <Text className="flex-1 font-ui-bold text-sm text-accentInk">
          Valor estimado. Não é o pagamento final do mês.
        </Text>
      </View>
    </View>
  );
}
