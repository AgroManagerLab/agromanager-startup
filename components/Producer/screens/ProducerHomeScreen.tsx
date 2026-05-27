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
import { styles } from '../styles';

export function ProducerHomeScreen() {
  const insets = useSafeAreaInsets();
  const producer = useProducerStore((s) => s.producer);
  const pricePerLiter = useProducerStore((s) => s.pricePerLiter);
  const monthVolume = useProducerStore(selectMonthVolume);
  const projection = useProducerStore(selectProjection);
  const recent = useProducerStore(useShallow(selectSyncedCollections)).slice(0, 3);

  return (
    <View style={styles.homeContainer}>
      <View style={[styles.homeHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.homeHeaderTop}>
          <Wordmark tone="light" />
          <View style={styles.homeSettingsBtn}>
            <SettingsIcon size={20} color="#fff" />
          </View>
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
          <Text style={styles.homeViewAll}>Ver tudo</Text>
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
