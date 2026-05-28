import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Wordmark, SettingsIcon, Volume, Card, Divider } from '../../../global/ui';
import { ProjectionCard } from '../global/ProjectionCard';
import { ColetaRow } from '../global/ColetaRow';
import { useProducerData } from '../service/useProducerData';
import { styles } from '../global/styles';

// Tela inicial do produtor: volume do mês + projeção + últimas coletas.
// REQ-03.17 (volume acumulado) e REQ-04.4 / REQ-04.7 (projeção).
export function ProducerHomePage() {
  const insets = useSafeAreaInsets();
  const data = useProducerData();

  if (!data) {
    return <View style={styles.homeContainer} />;
  }

  const recent = data.synced.slice(0, 3);

  return (
    <View style={styles.homeContainer}>
      <View style={[styles.homeHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.homeHeaderTop}>
          <Wordmark tone="light" />
          <View style={styles.homeSettingsBtn}>
            <SettingsIcon size={20} color="#fff" />
          </View>
        </View>
        <Text style={styles.homeGreeting}>Boa tarde, {data.profile.name.split(' ')[0]}</Text>
        <Text style={styles.homeFarm}>{data.profile.farm}</Text>
        <View style={styles.homeVolumeSection}>
          <Text style={styles.homeVolumeLabel}>Volume do mês · maio</Text>
          <Volume value={data.monthVolume} variant="hero" />
        </View>
        <ProjectionCard
          projection={data.projection}
          monthVolume={data.monthVolume}
          pricePerLiter={data.pricePerLiter}
        />
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
