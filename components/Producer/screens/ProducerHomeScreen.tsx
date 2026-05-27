import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
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
import { palette } from '../../../theme/palette';

export function ProducerHomeScreen() {
  const insets = useSafeAreaInsets();
  const producer = useProducerStore((s) => s.producer);
  const pricePerLiter = useProducerStore((s) => s.pricePerLiter);
  const monthVolume = useProducerStore(selectMonthVolume);
  const projection = useProducerStore(selectProjection);
  const recent = useProducerStore(useShallow(selectSyncedCollections)).slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerTop}>
          <Wordmark tone="light" />
          <View style={styles.settingsBtn}>
            <SettingsIcon size={20} color="#fff" />
          </View>
        </View>
        <Text style={styles.greeting}>Boa tarde, {producer.name.split(' ')[0]}</Text>
        <Text style={styles.farm}>{producer.farm}</Text>
        <View style={styles.volumeSection}>
          <Text style={styles.volumeLabel}>Volume do mês · maio</Text>
          <Volume value={monthVolume} variant="hero" />
        </View>
        <ProjectionCard projection={projection} monthVolume={monthVolume} pricePerLiter={pricePerLiter} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Últimas coletas</Text>
          <Text style={styles.viewAll}>Ver tudo</Text>
        </View>
        <Card style={styles.card}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  header: {
    backgroundColor: palette.primaryDark,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  farm: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 22,
    color: '#fff',
    letterSpacing: -0.4,
    marginTop: 2,
  },
  volumeSection: {
    marginTop: 24,
    gap: 4,
  },
  volumeLabel: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.70)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listTitle: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 14,
    color: palette.ink,
    letterSpacing: -0.4,
  },
  viewAll: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: palette.primary,
  },
  card: {
    overflow: 'hidden',
  },
});
