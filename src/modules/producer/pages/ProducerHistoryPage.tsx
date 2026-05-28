import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ScreenHeader, Card, Divider, Volume, NumText } from '../../../global/ui';
import { ColetaRow } from '../global/ColetaRow';
import { useProducerData } from '../service/useProducerData';
import { styles } from '../global/styles';

// Histórico de coletas sincronizadas do produtor — REQ-03.16.
export function ProducerHistoryPage() {
  const data = useProducerData();

  if (!data) {
    return <View style={styles.historyContainer} />;
  }

  return (
    <View style={styles.historyContainer}>
      <ScreenHeader title="Minhas coletas" subtitle={`Maio · ${data.synced.length} sincronizadas`} />

      <View style={styles.historySummaryWrap}>
        <Card style={styles.historySummaryCard}>
          <View style={styles.historySummaryRow}>
            <View>
              <Text style={styles.historySummaryLabel}>Total do mês</Text>
              <Volume value={data.monthVolume} variant="compact" />
            </View>
            <View style={styles.historyAvgWrap}>
              <Text style={styles.historySummaryLabel}>Média / dia</Text>
              <NumText style={styles.historyAvgValue}>
                {data.avgPerDay.toFixed(1).replace('.', ',')} <Text style={styles.historyAvgUnit}>L</Text>
              </NumText>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.historyListWrap}>
        <Card style={styles.historyListCard}>
          <FlatList
            data={data.synced}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <ColetaRow row={item} variant="detailed" pricePerLiter={data.pricePerLiter} />
            )}
          />
        </Card>
      </View>
    </View>
  );
}
