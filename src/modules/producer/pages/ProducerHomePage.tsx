import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../global/theme';
import { Card, Divider, SettingsIcon, Volume, Wordmark } from '../../../global/ui';
import { ColetaRow } from '../global/ColetaRow';
import { ProjectionCard } from '../global/ProjectionCard';
import { styles } from '../global/styles';
import { buildProducerHomeSummary } from '../service/producerService';
import { useProducerData } from '../service/useProducerData';

// Tela inicial do produtor: volume do mês + projeção + últimas coletas.
// REQ-03.17 (volume acumulado) e REQ-04.4 / REQ-04.7 (projeção).
export function ProducerHomePage() {
  const insets = useSafeAreaInsets();
  const data = useProducerData();

  if (!data) {
    return <View style={styles.homeContainer} />;
  }

  const home = buildProducerHomeSummary(data);

  return (
    <View style={styles.homeContainer}>
      <View style={[styles.homeHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.homeHeaderTop}>
          <Wordmark tone="light" />
          <View style={styles.homeSettingsBtn}>
            <SettingsIcon size={20} color={colors.contrast} />
          </View>
        </View>
        <Text style={styles.homeGreeting}>Boa tarde, {home.firstName}</Text>
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
          {home.recentCollections.map((h, i) => (
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
