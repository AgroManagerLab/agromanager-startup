import React, { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { Volume } from '../../components/Volume';
import { NumText } from '../../components/NumText';
import { CollectionRow } from '../../components/CollectionRow';
import { CURRENT_PRODUCER_ID, loadProducerData } from '../../services/producerService';
import type { Collection } from '../../types';
import { styles } from './styles';

export function ProducerHistoryPage() {
  const navigation = useNavigation<any>();
  const data = loadProducerData(CURRENT_PRODUCER_ID);

  const renderCollection = useCallback(
    ({ item }: { item: Collection }) => (
      <CollectionRow
        row={item}
        variant="detailed"
        pricePerLiter={data?.pricePerLiter ?? 0}
        onPress={() => navigation.navigate('ProducerCollectionDetail', { collectionId: item.id })}
      />
    ),
    [data?.pricePerLiter, navigation],
  );

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
            renderItem={renderCollection}
          />
        </Card>
      </View>
    </View>
  );
}
