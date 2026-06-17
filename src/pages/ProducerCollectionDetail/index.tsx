import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { Volume } from '../../components/Volume';
import { NumText } from '../../components/NumText';
import { SyncBadge } from '../../components/SyncBadge';
import { MoneyBRL } from '../../components/MoneyBRL';
import { MilkBottleIcon } from '../../components/icons/Icon';
import { CURRENT_PRODUCER_ID, loadProducerCollectionDetail } from '../../services/producerService';
import { colors } from '../../global/themes';
import { styles } from './styles';

export function ProducerCollectionDetailPage() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProducerCollectionDetail'>>();
  const { collectionId } = route.params;

  const detail = loadProducerCollectionDetail(collectionId, CURRENT_PRODUCER_ID);

  if (!detail) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Detalhes da coleta" onBack={() => navigation.goBack()} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Coleta não encontrada</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Detalhes da coleta"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.photoWrap}>
          {detail.photoUri ? (
            <Image source={{ uri: detail.photoUri }} style={styles.photoBase} resizeMode="cover" />
          ) : (
            <View style={[styles.photoBase, styles.photoPlaceholder]}>
              <MilkBottleIcon size={40} color={colors.ink3} />
              <Text style={styles.photoPlaceholderText}>Sem foto disponível</Text>
            </View>
          )}
        </View>

        <Card style={styles.infoCard}>
          <View style={styles.infoTopRow}>
            <View>
              <Text style={styles.infoDate}>{detail.date}</Text>
              <NumText style={styles.infoTime}>{detail.time}</NumText>
            </View>
            <SyncBadge state={detail.status} />
          </View>

          <Divider />

          <View style={styles.infoMetricRow}>
            <Text style={styles.infoMetricLabel}>Volume</Text>
            <Volume value={detail.volume} variant="compact" />
          </View>

          <View style={styles.infoMetricRow}>
            <Text style={styles.infoMetricLabel}>Valor estimado</Text>
            <MoneyBRL value={detail.value} />
          </View>
        </Card>

        <Text style={styles.disclaimer}>* Valor estimado, não é o pagamento final.</Text>
      </ScrollView>
    </View>
  );
}
