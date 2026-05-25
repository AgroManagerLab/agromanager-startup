import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';
import { Wordmark } from '../../shared/ui/Wordmark';
import { SettingsIcon } from '../../shared/ui/icons/Icon';
import { Volume } from '../../shared/ui/Volume';
import { Card } from '../../shared/ui/Card';
import { Divider } from '../../shared/ui/Divider';
import { ProjectionCard } from '../components/ProjectionCard';
import { ColetaRow } from '../components/ColetaRow';
import {
  useProducerStore,
  selectMonthVolume,
  selectProjection,
  selectSyncedCollections,
} from '../stores/producerStore';

export function ProducerHomeScreen() {
  const insets = useSafeAreaInsets();
  const producer = useProducerStore((s) => s.producer);
  const pricePerLiter = useProducerStore((s) => s.pricePerLiter);
  const monthVolume = useProducerStore(selectMonthVolume);
  const projection = useProducerStore(selectProjection);
  const recent = useProducerStore(useShallow(selectSyncedCollections)).slice(0, 3);

  return (
    <View className="flex-1 bg-bg">
      <View className="bg-primaryDark px-5 pb-6" style={{ paddingTop: insets.top + 8 }}>
        <View className="flex-row items-center justify-between mb-5">
          <Wordmark tone="light" />
          <View className="w-10 h-10 rounded-full bg-white/[0.14] items-center justify-center">
            <SettingsIcon size={20} color="#fff" />
          </View>
        </View>
        <Text className="font-ui-semibold text-base text-white/75">
          Boa tarde, {producer.name.split(' ')[0]}
        </Text>
        <Text className="font-ui-extrabold text-3xl text-white tracking-snug mt-0.5">
          {producer.farm}
        </Text>
        <View className="mt-6 gap-1">
          <Text className="font-ui-extrabold text-sm text-white/70 tracking-wide uppercase">
            Volume do mês · maio
          </Text>
          <Volume value={monthVolume} variant="hero" />
        </View>
        <ProjectionCard projection={projection} monthVolume={monthVolume} pricePerLiter={pricePerLiter} />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="p-5">
        <View className="flex-row items-baseline justify-between mb-2.5">
          <Text className="font-ui-extrabold text-md text-ink tracking-snug">Últimas coletas</Text>
          <Text className="font-ui-bold text-base text-primary">Ver tudo</Text>
        </View>
        <Card className="overflow-hidden">
          {recent.map((h, i) => (
            <View key={h.id}>
              {i > 0 ? <Divider /> : null}
              <ColetaRow row={h} variant="compact" />
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}
