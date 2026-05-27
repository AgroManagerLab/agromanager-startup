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
import { styles } from '../styles';

export function ProducerHistoryScreen() {
  const pricePerLiter = useProducerStore((s) => s.pricePerLiter);
  const monthVolume = useProducerStore(selectMonthVolume);
  const avg = useProducerStore(selectAvgPerDay);
  const synced = useProducerStore(useShallow(selectSyncedCollections));

  return (
    <View style={styles.historyContainer}>
      <ScreenHeader title="Minhas coletas" subtitle={`Maio · ${synced.length} sincronizadas`} />

      <View style={styles.historySummaryWrap}>
        <Card style={styles.historySummaryCard}>
          <View style={styles.historySummaryRow}>
            <View>
              <Text style={styles.historySummaryLabel}>Total do mês</Text>
              <Volume value={monthVolume} variant="compact" />
            </View>
            <View style={styles.historyAvgWrap}>
              <Text style={styles.historySummaryLabel}>Média / dia</Text>
              <NumText style={styles.historyAvgValue}>
                {avg.toFixed(1).replace('.', ',')} <Text style={styles.historyAvgUnit}>L</Text>
              </NumText>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.historyListWrap}>
        <Card style={styles.historyListCard}>
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
