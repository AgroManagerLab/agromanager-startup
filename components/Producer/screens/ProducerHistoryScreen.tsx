import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { ScreenHeader } from '../../shared/ui/ScreenHeader';
import { Card } from '../../shared/ui/Card';
import { Divider } from '../../shared/ui/Divider';
import { Volume } from '../../shared/ui/Volume';
import { NumText } from '../../shared/ui/NumText';
import { ColetaRow } from '../components/ColetaRow';
import {
  useProducerStore,
  selectMonthVolume,
  selectAvgPerDay,
  selectSyncedCollections,
} from '../stores/producerStore';

export function ProducerHistoryScreen() {
  const pricePerLiter = useProducerStore((s) => s.pricePerLiter);
  const monthVolume = useProducerStore(selectMonthVolume);
  const avg = useProducerStore(selectAvgPerDay);
  const synced = useProducerStore(useShallow(selectSyncedCollections));

  return (
    <View className="flex-1 bg-bg">
      <ScreenHeader title="Minhas coletas" subtitle={`Maio · ${synced.length} sincronizadas`} />

      <View className="px-5 pb-3.5">
        <Card className="p-3.5">
          <View className="flex-row justify-between items-baseline">
            <View>
              <Text className="font-ui-extrabold text-xs text-ink3 tracking-wide uppercase">
                Total do mês
              </Text>
              <Volume value={monthVolume} variant="compact" />
            </View>
            <View className="items-end">
              <Text className="font-ui-extrabold text-xs text-ink3 tracking-wide uppercase">
                Média / dia
              </Text>
              <NumText className="font-mono-bold text-3xl text-ink mt-0.5">
                {avg.toFixed(1).replace('.', ',')} <Text className="text-sm text-ink2">L</Text>
              </NumText>
            </View>
          </View>
        </Card>
      </View>

      <View className="flex-1 px-5">
        <Card className="flex-1 overflow-hidden mb-5">
          <FlatList
            data={synced}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => <ColetaRow row={item} variant="detailed" pricePerLiter={pricePerLiter} />}
          />
        </Card>
      </View>
    </View>
  );
}
