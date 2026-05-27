import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
import { palette } from '../../../theme/palette';

export function ProducerHistoryScreen() {
  const pricePerLiter = useProducerStore((s) => s.pricePerLiter);
  const monthVolume = useProducerStore(selectMonthVolume);
  const avg = useProducerStore(selectAvgPerDay);
  const synced = useProducerStore(useShallow(selectSyncedCollections));

  return (
    <View style={styles.container}>
      <ScreenHeader title="Minhas coletas" subtitle={`Maio · ${synced.length} sincronizadas`} />

      <View style={styles.summaryWrap}>
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Total do mês</Text>
              <Volume value={monthVolume} variant="compact" />
            </View>
            <View style={styles.avgWrap}>
              <Text style={styles.summaryLabel}>Média / dia</Text>
              <NumText style={styles.avgValue}>
                {avg.toFixed(1).replace('.', ',')} <Text style={styles.avgUnit}>L</Text>
              </NumText>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.listWrap}>
        <Card style={styles.listCard}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  summaryWrap: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  summaryCard: {
    padding: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  summaryLabel: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 11,
    color: palette.ink3,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  avgWrap: {
    alignItems: 'flex-end',
  },
  avgValue: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 22,
    color: palette.ink,
    marginTop: 2,
  },
  avgUnit: {
    fontSize: 12,
    color: palette.ink2,
  },
  listWrap: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listCard: {
    flex: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
});
