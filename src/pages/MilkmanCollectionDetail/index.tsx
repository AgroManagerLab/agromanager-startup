import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useFocusEffect, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Divider } from '../../components/Divider';
import { SyncBadge } from '../../components/SyncBadge';
import { MilkBottleIcon } from '../../components/icons/Icon';
import { useAuth } from '../../context/AuthContext';
import { getMilkmanCollectionDetail } from '../../services/milkmanService';
import { colors } from '../../global/themes';
import { styles } from './styles';

export function MilkmanCollectionDetailPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'MilkmanCollectionDetail'>>();
  const { collectionId } = route.params;
  const { userId } = useAuth();
  const [detail, setDetail] = useState(() => getMilkmanCollectionDetail(collectionId, userId!));

  useFocusEffect(
    useCallback(() => {
      setDetail(getMilkmanCollectionDetail(collectionId, userId!));
    }, [collectionId, userId]),
  );

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
      <ScreenHeader title="Detalhes da coleta" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} bounces={false} contentContainerStyle={styles.scrollContent}>
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
          {/* Producer info */}
          <View style={styles.producerRow}>
            <View style={styles.producerBadge}>
              <Text style={styles.producerBadgeText}>
                {detail.producer.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
              </Text>
            </View>
            <View style={styles.producerInfo}>
              <Text style={styles.producerName}>{detail.producer}</Text>
              <Text style={styles.producerFarm}>{detail.farm}</Text>
            </View>
          </View>

          <Divider />

          {/* Date and status */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValue}>{detail.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValue}>{detail.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <SyncBadge state={detail.status} />
          </View>

          <Divider />

          {/* Volume */}
          <View style={styles.volumeRow}>
            <Text style={styles.volumeLabel}>Volume coletado</Text>
            <Text style={styles.volumeValue}>
              {detail.volume} <Text style={styles.volumeUnit}>L</Text>
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
