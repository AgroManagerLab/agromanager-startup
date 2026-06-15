import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../global/themes';
import { Card, Divider, SettingsIcon, Volume, Wordmark, ProjectionCard, CollectionRow } from '../../components';
import { CURRENT_PRODUCER_ID, loadProducerData, buildProducerHomeSummary } from '../../services/producerService';
import { styles } from './styles';

export function ProducerHomePage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const data = loadProducerData(CURRENT_PRODUCER_ID);

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
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Historico')}>
            <Text style={styles.homeViewAll}>Ver tudo</Text>
          </TouchableOpacity>
        </View>
        <Card style={styles.homeListCard}>
          {home.recentCollections.map((h, i) => (
            <View key={h.id}>
              {i > 0 ? <Divider /> : null}
              <CollectionRow row={h} variant="compact" />
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}
