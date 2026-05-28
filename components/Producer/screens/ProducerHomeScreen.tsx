import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';
import { Card } from '../../shared/ui/Card';
import { Divider } from '../../shared/ui/Divider';
import { Volume } from '../../shared/ui/Volume';
import { Wordmark } from '../../shared/ui/Wordmark';
import { ColetaRow } from '../components/ColetaRow';
import { ProjectionCard } from '../components/ProjectionCard';
import type { ProducerNavigatorParamList } from '../navigation/ProducerNavigator';
import {
  selectMonthVolume,
  selectProjection,
  selectSyncedCollections,
  useProducerStore,
} from '../stores/producerStore';
import { styles } from '../styles';

export function ProducerHomeScreen() {
  const insets = useSafeAreaInsets();
  const producer = useProducerStore((s) => s.producer);
  const pricePerLiter = useProducerStore((s) => s.pricePerLiter);
  const monthVolume = useProducerStore(selectMonthVolume);
  const projection = useProducerStore(selectProjection);
  const recent = useProducerStore(useShallow(selectSyncedCollections)).slice(0, 3);
  const navigation = useNavigation<BottomTabNavigationProp<ProducerNavigatorParamList>>();

  return (
    <View style={styles.homeContainer}>
      <View style={[styles.homeHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.homeHeaderTop}>
          <Wordmark tone="light" />
        </View>
        <Text style={styles.homeGreeting}>Boa tarde, {producer.name.split(' ')[0]}</Text>
        <Text style={styles.homeFarm}>{producer.farm}</Text>
        <View style={styles.homeVolumeSection}>
          <Text style={styles.homeVolumeLabel}>Volume do mês · maio</Text>
          <Volume value={monthVolume} variant="hero" />
        </View>
        <ProjectionCard projection={projection} monthVolume={monthVolume} pricePerLiter={pricePerLiter} />
      </View>

      <ScrollView style={styles.homeScroll} contentContainerStyle={styles.homeScrollContent}>
        <View style={styles.homeListHeader}>
          <Text style={styles.homeListTitle}>Últimas coletas</Text>
          <Pressable onPress={() => navigation.navigate('Historico')}>
            <Text style={styles.homeViewAll}>Ver tudo</Text>
          </Pressable>
        </View>
        <Card style={styles.homeListCard}>
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
